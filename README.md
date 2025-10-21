# Mindora API (MVP)

Express + PostgreSQL бэкенд для персонального языкового коуча с ИИ:
- Регистрация пользователей (`/api/register`) → JWT в cookie
- Диалог с ИИ (`/api/chat`) + лог токенов/стоимости в БД
- Профиль обучения (`/api/profile`, `GET/POST`)
- Отслеживание расходов: `/api/usage/me`, админ: `/api/usage/admin/daily` с `x-admin-token`

## 🚀 Быстрый старт

### 1. Создай базу данных
Создай PostgreSQL БД (Supabase/Neon/Render) и примени схему:
```bash
psql $DATABASE_URL -f db/schema.sql
```

### 2. Настрой переменные окружения
Скопируй `env.example` в `.env` и заполни:
```bash
cp env.example .env
# Отредактируй .env с твоими данными
```

### 3. Установи зависимости и запусти
```bash
npm install
npm run start
# Локально: http://localhost:3001
```

## 📡 API Endpoints

### Регистрация пользователя
```bash
curl -X POST http://localhost:3001/api/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"you@mail.com","username":"you","name":"You","tg_id":12345}' \
  -i
```

### Чат с ИИ-коучем
```bash
curl -X POST http://localhost:3001/api/chat \
  -H 'Content-Type: application/json' \
  --cookie "auth=YOUR_JWT" \
  -d '{"text":"Hi coach, help me with travel phrases", "mode":"roleplay"}'
```

### Обновление профиля обучения
```bash
curl -X POST http://localhost:3001/api/profile \
  -H 'Content-Type: application/json' \
  --cookie "auth=YOUR_JWT" \
  -d '{"target_lang":"en","level_cefr":"A2","goal":"Travel basics"}'
```

### Получение профиля
```bash
curl -X GET http://localhost:3001/api/profile --cookie "auth=YOUR_JWT"
```

### Мои расходы
```bash
curl -X GET http://localhost:3001/api/usage/me --cookie "auth=YOUR_JWT"
```

### Админ-агрегаты (требует x-admin-token)
```bash
curl -X GET http://localhost:3001/api/usage/admin/daily \
  -H "x-admin-token: YOUR_ADMIN_TOKEN"
```

## 🏗️ Структура проекта

```
Mindora-1/
├─ server/
│  └─ index.js          # Express API сервер
├─ db/
│  └─ schema.sql        # PostgreSQL схема
├─ package.json         # Зависимости и скрипты
├─ env.example          # Пример переменных окружения
├─ .gitignore          # Git ignore файлы
└─ README.md           # Документация
```

## 🌐 Деплой

### Render.com
1. Подключи GitHub репозиторий
2. Environment: `Node`
3. Build Command: `npm install`
4. Start Command: `npm run start`
5. Добавь переменные окружения из `.env`

### Railway.app
1. Создай "New Project → Deploy from GitHub"
2. Добавь переменные окружения
3. Нажми **Deploy**

### Vercel (для фронта + бэка)
Если добавишь UI на Next.js:
- `api/` → сервер
- `app/` → UI

## 🔧 Переменные окружения

```env
DATABASE_URL=postgres://user:pass@host:5432/db
OPENAI_API_KEY=sk-...
JWT_SECRET=supersecret
ADMIN_TOKEN=long-admin-token
PORT=3001
```

## 📊 Мониторинг

- **Пользовательские расходы**: `/api/usage/me`
- **Админ-статистика**: `/api/usage/admin/daily`
- **Логи токенов**: автоматически в таблице `token_usage`

## 🎯 Следующие шаги

1. Добавь фронтенд (Next.js/React)
2. Настрой CI/CD с GitHub Actions
3. Добавь админ-дашборд
4. Интегрируй с Telegram Bot API
