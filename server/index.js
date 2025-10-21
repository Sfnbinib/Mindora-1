import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import crypto from 'crypto';
import { cfAccessRequired } from './cloudflareAccess.js';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'let-me-in';
const BOT_TOKEN = process.env.BOT_TOKEN;            // токен твоего бота
const ADMIN_UI_TOKEN = process.env.ADMIN_UI_TOKEN || 'admin-ui';

// цены (USD за 1M токенов)
const PRICES = {
  'gpt-4o-mini': { in: 0.15 / 1_000_000, out: 0.60 / 1_000_000 }
};
const MODEL = 'gpt-4o-mini';

async function q(text, params) {
  const { rows } = await pool.query(text, params);
  return rows;
}

function sign(user) { return jwt.sign({ uid: user.id }, JWT_SECRET, { expiresIn: '180d' }); }

async function auth(req, res, next) {
  try {
    const token = req.cookies?.auth || req.headers.authorization?.replace('Bearer ','');
    if (!token) return res.status(401).json({ error: 'no auth' });
    const { uid } = jwt.verify(token, JWT_SECRET);
    req.uid = uid; next();
  } catch (e) { return res.status(401).json({ error: 'bad auth' }); }
}

// Проверка подписи initData (Telegram WebApp)
function checkTelegramInitData(initData) {
  // initData — это строка query (user=...&auth_date=...&hash=...)
  if (!initData) return null;
  const urlParams = new URLSearchParams(initData);
  const hash = urlParams.get('hash');
  urlParams.delete('hash');

  const dataCheckString = Array.from(urlParams.entries())
    .sort(([a],[b]) => a.localeCompare(b))
    .map(([k,v]) => `${k}=${v}`).join('\n');

  const secretKey = crypto.createHmac('sha256', 'WebAppData')
    .update(BOT_TOKEN).digest();

  const hmac = crypto.createHmac('sha256', secretKey)
    .update(dataCheckString).digest('hex');

  if (hmac !== hash) return null;

  // вернём всё как объект + распарсим user
  const obj = Object.fromEntries(new URLSearchParams(initData));
  try { obj.user = JSON.parse(obj.user); } catch {}
  return obj;
}

// простая проверка "админ-токена" через query ?token=...
function adminAuth(req,res,next){
  const t = req.query.token || req.headers['x-admin-ui-token'];
  if (t === ADMIN_UI_TOKEN) return next();
  return res.status(401).send('Unauthorized');
}

// --- Регистрация пользователя: email/username/name/tg_id ---
app.post('/api/register', async (req, res) => {
  const { email, username, name, tg_id } = req.body || {};
  if (!email && !tg_id) return res.status(400).json({ error: 'need email or tg_id' });

  const rows = await q(`
    insert into users(email, username, name, tg_id)
    values($1,$2,$3,$4)
    on conflict (email) do update set
      username = coalesce(excluded.username, users.username),
      name = coalesce(excluded.name, users.name),
      tg_id = coalesce(excluded.tg_id, users.tg_id)
    returning *;
  `, [email ?? null, username ?? null, name ?? null, tg_id ?? null]);

  const user = rows[0];
  const token = sign(user);
  res.cookie('auth', token, { httpOnly: true, sameSite: 'lax', maxAge: 180*24*3600*1000 });
  res.json({ ok: true, user: { id: user.id, email: user.email, username: user.username, name: user.name, tg_id: user.tg_id } });
});

// --- TWA регистрация через Telegram WebApp ---
app.post('/twa/register', async (req, res) => {
  try {
    const { initData, name, surname } = req.body || {};
    const parsed = checkTelegramInitData(initData);
    if (!parsed?.user?.id) return res.status(401).json({ error: 'bad_signature' });

    const tg = parsed.user;
    const displayName = [name || tg.first_name, surname || tg.last_name].filter(Boolean).join(' ') || tg.first_name || 'User';

    // апсерт пользователя по tg_id (и/или email если будет)
    const rows = await q(`
      insert into users(email, username, name, tg_id)
      values($1,$2,$3,$4)
      on conflict (tg_id) do update set
        username = coalesce(excluded.username, users.username),
        name     = coalesce(excluded.name, users.name)
      returning *;
    `, [null, tg.username ?? null, displayName, tg.id]);

    const user = rows[0];

    // если нет профиля — создадим базовый
    await q(`
      insert into learning_profile(user_id, target_lang, level_cefr, style, goal, summary)
      values($1,'en','A1','{}','Travel basics','New learner')
      on conflict (user_id) do nothing
    `, [user.id]);

    // выдадим JWT
    const token = sign(user);
    res.cookie('auth', token, { httpOnly: true, sameSite: 'lax', maxAge: 180*24*3600*1000 });
    res.json({ ok:true, user: { id:user.id, tg_id:user.tg_id, name:user.name, username:user.username } });
  } catch (e) {
    console.error('twa/register', e);
    res.status(500).json({ error:'server_error' });
  }
});

// --- Обновление профиля обучения (короткая сводка для LLM) ---
app.post('/api/profile', auth, async (req, res) => {
  const { target_lang, level_cefr, style, goal, summary } = req.body || {};
  await q(`
    insert into learning_profile(user_id, target_lang, level_cefr, style, goal, summary)
    values($1,$2,$3,$4,$5,$6)
    on conflict (user_id) do update set
      target_lang = coalesce($2, learning_profile.target_lang),
      level_cefr = coalesce($3, learning_profile.level_cefr),
      style = coalesce($4, learning_profile.style),
      goal = coalesce($5, learning_profile.goal),
      summary = coalesce($6, learning_profile.summary),
      updated_at = now()
  `, [req.uid, target_lang ?? null, level_cefr ?? null, style ?? null, goal ?? null, summary ?? null]);

  res.json({ ok: true });
});

// --- Получить профиль (для UI) ---
app.get('/api/profile', auth, async (req, res) => {
  const r = await q(`select * from learning_profile where user_id=$1`, [req.uid]);
  res.json({ profile: r[0] || null });
});

// --- Хелпер: цены и запись usage ---
function calcCost(model, prompt_tokens, completion_tokens) {
  const p = PRICES[model];
  const input_cost_usd = prompt_tokens * p.in;
  const output_cost_usd = completion_tokens * p.out;
  return {
    input_cost_usd,
    output_cost_usd,
    total_cost_usd: input_cost_usd + output_cost_usd
  };
}

async function logUsage({ user_id, model, usage }) {
  const { prompt_tokens=0, completion_tokens=0, total_tokens=0 } = usage || {};
  const costs = calcCost(model, prompt_tokens, completion_tokens);
  await q(`
    insert into token_usage(user_id, model, prompt_tokens, completion_tokens, total_tokens,
                            input_cost_usd, output_cost_usd, total_cost_usd)
    values($1,$2,$3,$4,$5,$6,$7,$8)
  `, [user_id, model, prompt_tokens, completion_tokens, total_tokens,
      costs.input_cost_usd, costs.output_cost_usd, costs.total_cost_usd]);
  return costs;
}

// --- Чат с моделью (логируем usage) ---
app.post('/api/chat', auth, async (req, res) => {
  const { text, mode, profilePatch } = req.body || {};

  // подтянуть профиль (опционально обновить)
  if (profilePatch) {
    await q(`
      insert into learning_profile(user_id, target_lang, level_cefr, style, goal, summary)
      values ($1,$2,$3,$4,$5,$6)
      on conflict (user_id) do update set
        target_lang=coalesce($2,learning_profile.target_lang),
        level_cefr=coalesce($3,learning_profile.level_cefr),
        style=coalesce($4,learning_profile.style),
        goal=coalesce($5,learning_profile.goal),
        summary=coalesce($6,learning_profile.summary),
        updated_at=now()
    `, [req.uid, profilePatch.target_lang ?? null, profilePatch.level_cefr ?? null, profilePatch.style ?? null, profilePatch.goal ?? null, profilePatch.summary ?? null]);
  }
  const prof = (await q(`select target_lang, level_cefr, style, goal, summary from learning_profile where user_id=$1`, [req.uid]))[0]
            || { target_lang:'en', level_cefr:'A1', style:{}, goal:'Travel basics', summary:'User starting out.' };

  const system = `
You are a personal language coach-mascot.
Target language: ${prof.target_lang}.
Learner level (CEFR): ${prof.level_cefr}.
Learner prefs: ${JSON.stringify(prof.style || {})}.
Goal(30d): ${prof.goal}.
Compressed summary: ${prof.summary}
Rules:
- Short actionable replies (2–4 sentences).
- Correct mistakes and show improved version.
- End with a question or prompt to answer.
- Prefer roleplay in real situations.`;

  const payload = {
    model: MODEL,
    temperature: 0.4,
    max_tokens: 320,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: `Mode=${mode ?? 'roleplay'}; Learner says: ${text}` }
    ]
  };

  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method:'POST',
    headers:{
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!r.ok) {
    const err = await r.text();
    return res.status(500).json({ error: 'openai_error', detail: err.slice(0,400) });
  }

  const data = await r.json();
  const reply = data?.choices?.[0]?.message?.content ?? '…';

  // лог usage
  const costs = await logUsage({ user_id: req.uid, model: MODEL, usage: data.usage });

  res.json({ reply, usage: data.usage, cost_usd: costs.total_cost_usd });
});

// --- Сводка расходов для пользователя ---
app.get('/api/usage/me', auth, async (req, res) => {
  const rows = await q(`select * from v_usage_daily where user_id=$1 order by day desc limit 30`, [req.uid]);
  const total = rows.reduce((s, r)=> s + Number(r.total_cost_usd || 0), 0);
  res.json({ days: rows, total_30d_usd: total });
});

// --- Админ: агрегаты по всем ---
app.get('/api/usage/admin/daily', async (req, res) => {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(401).json({ error: 'admin auth' });
  const rows = await q(`
    select day, sum(total_tokens) as total_tokens, sum(total_cost_usd) as total_cost_usd
    from v_usage_daily
    group by day
    order by day desc
    limit 60;
  `, []);
  res.json({ days: rows });
});

// --- Админ: данные для таблицы (защищено CF Access) ---
app.get('/admin/data', cfAccessRequired, async (req,res)=>{
  const users = await q(`
    select u.id, u.tg_id, u.username, u.name, u.created_at
    from users u order by u.created_at desc limit 500
  `, []);

  // последние 30 дней токены/стоимость
  const costs = await q(`
    select user_id,
           sum(total_tokens) as total_tokens,
           sum(total_cost_usd) as total_cost_usd
    from token_usage
    where created_at >= now() - interval '30 days'
    group by user_id
  `, []);

  const today = await q(`
    select user_id,
           sum(total_tokens) as tokens_today,
           sum(total_cost_usd) as cost_today
    from token_usage
    where created_at::date = current_date
    group by user_id
  `, []);

  const byId = (arr, key) => Object.fromEntries(arr.map(r => [r[key], r]));
  const c30 = byId(costs, 'user_id');
  const tdy = byId(today, 'user_id');

  const rows = users.map(u => ({
    ...u,
    tokens_30d: Number(c30[u.id]?.total_tokens || 0),
    cost_30d_usd: Number(c30[u.id]?.total_cost_usd || 0).toFixed(4),
    tokens_today: Number(tdy[u.id]?.tokens_today || 0),
    cost_today_usd: Number(tdy[u.id]?.cost_today || 0).toFixed(4)
  }));

  const totals = {
    users: users.length,
    tokens_30d: rows.reduce((s,r)=>s+r.tokens_30d,0),
    cost_30d_usd: rows.reduce((s,r)=>s+Number(r.cost_30d_usd),0).toFixed(4),
    tokens_today: rows.reduce((s,r)=>s+r.tokens_today,0),
    cost_today_usd: rows.reduce((s,r)=>s+Number(r.cost_today_usd),0).toFixed(4),
  };

  res.json({ totals, rows });
});

// Админ-страница теперь на Vercel (admin/index.html)

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log('API listening on '+PORT));
