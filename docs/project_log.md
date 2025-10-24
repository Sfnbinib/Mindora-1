# 🧭 Mindora Project Log

## 📌 Проект: Mindora - AI Language Learning Platform

**GitHub Repository:** https://github.com/Sfnbinib/Mindora-1.git  
**Основной чат:** Cursor AI Assistant  
**Дата создания:** 2025-01-27  
**Статус:** В разработке (MVP готов, админка настроена)

---

## 🏗️ Архитектура проекта

### Backend (Express + PostgreSQL)
- **API сервер:** `server/index.js`
- **База данных:** PostgreSQL схема в `db/schema.sql`
- **Аутентификация:** JWT + Telegram WebApp
- **Админ-панель:** Cloudflare Access защита

### Frontend (Vercel)
- **Публичная мини-апка:** `index.html`, `home.html`
- **Админ-панель:** `admin/index.html`
- **Защита:** Cloudflare Zero-Trust

### Деплой
- **API:** Render.com / Railway.app
- **Фронт:** Vercel
- **БД:** Supabase / Neon

---

## 📋 Выполненные задачи

### ✅ 1. Создание базовой структуры проекта
**Дата:** 2025-01-27  
**Коммит:** `2932ffc` - "Initial commit: Mindora API MVP"

**Что сделано:**
- Создана структура папок: `server/`, `db/`, `.github/workflows/`
- Express API сервер с полным функционалом
- PostgreSQL схема с таблицами и индексами
- Конфигурационные файлы: `package.json`, `env.example`, `.gitignore`
- GitHub Actions для автодеплоя
- Подробная документация в README.md

**Файлы:**
```
Mindora-1/
├─ server/index.js          # Express API сервер
├─ db/schema.sql            # PostgreSQL схема
├─ package.json             # Зависимости и скрипты
├─ env.example              # Переменные окружения
├─ .gitignore              # Git ignore файлы
├─ README.md               # Документация
└─ .github/workflows/      # GitHub Actions
```

### ✅ 2. Добавление лендинг-страницы
**Дата:** 2025-01-27  
**Коммит:** `90c78fb` - "add basic landing for Mindora"

**Что сделано:**
- Создан `index.html` с Telegram WebApp интеграцией
- Красивый дизайн с темной темой
- Адаптивный дизайн для мобильных устройств
- Кнопка "Запустить обучение" с интеграцией в Telegram

### ✅ 3. TWA регистрация + админ-панель
**Дата:** 2025-01-27  
**Коммит:** `1a3c2c8` - "Add TWA registration and admin panel"

**Что сделано:**
- TWA регистрация через `/twa/register` с проверкой подписи Telegram
- Админ-панель `/admin` с таблицей пользователей и метриками
- API данных `/admin/data` для админки
- Верификация подписи Telegram WebApp
- Автоматическое создание профиля для новых пользователей
- Обновлен `env.example` с `BOT_TOKEN` и `ADMIN_UI_TOKEN`

### ✅ 4. Cloudflare Access защита админки
**Дата:** 2025-01-27  
**Коммит:** `2e492c7` - "Add Cloudflare Access protected admin panel"

**Что сделано:**
- Создан `admin/index.html` для Vercel деплоя
- Cloudflare Access JWT middleware (`cloudflareAccess.js`)
- Защита `/admin/data` эндпойнта с CF Access аутентификацией
- Удалена старая админ-страница из бэкенда
- Добавлена зависимость `jwks-rsa` для JWT верификации
- Обновлен `env.example` с CF переменными

---

## 🔧 Настройки и конфигурация

### Переменные окружения (env.example)
```env
# База данных
DATABASE_URL=postgres://user:pass@host:5432/db

# OpenAI API
OPENAI_API_KEY=sk-...

# JWT и админка
JWT_SECRET=supersecret
ADMIN_TOKEN=long-admin-token

# Telegram Bot
BOT_TOKEN=123456:ABCDEF......

# Cloudflare Access (Zero-Trust)
CF_JWKS_URI=https://YOUR_TEAM.cloudflareaccess.com/cdn-cgi/access/certs
CF_AUD=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Порт
PORT=3001
```

### GitHub Actions (автодеплой)
**Файл:** `.github/workflows/deploy.yml`
- Триггер: push в main ветку
- Установка Node.js 18
- Установка зависимостей
- Запуск тестов (если есть)
- Деплой на Render (через webhook)

### API Endpoints
```
POST /api/register          # Регистрация пользователя
POST /twa/register          # TWA регистрация через Telegram
POST /api/profile           # Обновление профиля обучения
GET  /api/profile           # Получение профиля
POST /api/chat              # Чат с ИИ-коучем
GET  /api/usage/me          # Мои расходы
GET  /admin/data            # Админ-данные (защищено CF Access)
GET  /api/usage/admin/daily # Админ-агрегаты
```

---

## 🚀 Инструкции по деплою

### 1. Настройка базы данных
1. Создай PostgreSQL БД (Supabase/Neon/Render)
2. Получи строку подключения
3. Примени схему: `psql $DATABASE_URL -f db/schema.sql`

### 2. Деплой API (Render.com)
1. Подключи GitHub репозиторий
2. Environment: `Node`
3. Build Command: `npm install`
4. Start Command: `npm run start`
5. Добавь переменные окружения из `env.example`

### 3. Деплой фронтенда (Vercel)
1. Подключи GitHub репозиторий
2. Автоматический деплой
3. Настрой кастомный домен (например: `mindora.app`)

### 4. Настройка Cloudflare Access
1. Заведи домен в Cloudflare (оранжевое облачко)
2. Cloudflare Zero Trust → Access → Applications → Add
3. Type: `Self-hosted`
4. App domain: `admin.mindora.app`
5. Identity providers: `Google` / `GitHub` / `Email OTP`
6. Policy: `Allow → Emails is any of: you@yourmail.com`

### 5. Настройка Telegram бота
1. Создай бота через @BotFather
2. Получи `BOT_TOKEN`
3. Настрой Web App: `/setmenubutton web_app "Mindora" https://mindora.app`

---

## 📊 Админ-панель

### Доступ
- **URL:** `https://admin.mindora.app`
- **Защита:** Cloudflare Access (только твой email)
- **Аутентификация:** Google/GitHub SSO

### Метрики
- **Пользователи:** имя, username, tg_id, дата регистрации
- **Токены:** за 30 дней и за сегодня
- **Стоимость:** в USD за 30 дней и за сегодня
- **Итого:** общие показатели по всем пользователям

---

## 🔄 Следующие шаги

### Краткосрочные (1-2 недели)
1. **Настройка доменов и деплоя**
   - Подключить кастомный домен к Vercel
   - Настроить Cloudflare Access
   - Получить CF переменные и добавить в API

2. **Тестирование системы**
   - Проверить TWA регистрацию
   - Протестировать админ-панель
   - Убедиться в работе всех эндпойнтов

### Среднесрочные (1-2 месяца)
1. **Добавление чат-функционала**
   - Интеграция с OpenAI API
   - Логирование токенов и стоимости
   - Персонализация на основе профиля

2. **Расширение админки**
   - Графики и аналитика
   - Экспорт данных
   - Уведомления о превышении лимитов

### Долгосрочные (3+ месяца)
1. **Мобильное приложение**
   - React Native или Flutter
   - Push-уведомления
   - Офлайн режим

2. **Монетизация**
   - Telegram Payments интеграция
   - Подписки и планы
   - Партнерская программа

---

## 📝 Логи сессий

### Сессия 2025-01-27
**Время:** ~2 часа  
**Результат:** Полный MVP готов к деплою

**Выполнено:**
- Создана базовая структура проекта
- Настроен Express API с PostgreSQL
- Добавлена TWA регистрация
- Создана админ-панель с Cloudflare Access
- Настроен GitHub Actions
- Создана документация

**Коммиты:**
- `2932ffc` - Initial commit: Mindora API MVP
- `90c78fb` - add basic landing for Mindora  
- `1a3c2c8` - Add TWA registration and admin panel
- `2e492c7` - Add Cloudflare Access protected admin panel

**Следующие шаги:**
1. Настроить домены и деплой
2. Протестировать все функции
3. Добавить чат с ИИ

---

## 🛠️ Технические детали

### Стек технологий
- **Backend:** Node.js, Express, PostgreSQL, JWT
- **Frontend:** HTML, CSS, JavaScript, Telegram WebApp API
- **Деплой:** Render/Railway (API), Vercel (фронт)
- **Безопасность:** Cloudflare Access, Telegram подписи
- **Мониторинг:** Встроенная админ-панель

### Зависимости
```json
{
  "body-parser": "^1.20.3",
  "cookie-parser": "^1.4.6", 
  "express": "^4.19.2",
  "jsonwebtoken": "^9.0.2",
  "jwks-rsa": "^3.1.0",
  "node-fetch": "^3.3.2",
  "pg": "^8.12.0"
}
```

### Структура базы данных
- **users** - пользователи (email, username, name, tg_id)
- **learning_profile** - профиль обучения (target_lang, level_cefr, style, goal, summary)
- **token_usage** - логирование использования токенов и стоимости
- **v_usage_daily** - представление для ежедневной статистики

---

## 📞 Контакты и поддержка

**Автор:** Saveliy Filchagin  
**GitHub:** https://github.com/Sfnbinib/Mindora-1  
**Email:** [указать email]  
**Telegram:** [указать username]

**Документация:**
- README.md - основная документация
- docs/project_log.md - этот файл с логами
- env.example - пример переменных окружения

---

*Последнее обновление: 2025-01-27*  
*Версия: 1.0*  
*Статус: MVP готов к деплою*
