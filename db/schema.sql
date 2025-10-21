-- PostgreSQL схема для Mindora API
-- Создание расширений
create extension if not exists pgcrypto;

-- Таблица пользователей
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  username text,
  name text,
  tg_id bigint unique,
  created_at timestamptz default now()
);

-- Профиль обучения пользователя
create table if not exists learning_profile (
  user_id uuid primary key references users(id) on delete cascade,
  target_lang text default 'en',
  level_cefr text default 'A1',
  style jsonb default '{}'::jsonb,
  goal text,
  summary text,
  updated_at timestamptz default now()
);

-- Логирование использования токенов и стоимости
create table if not exists token_usage (
  id bigserial primary key,
  user_id uuid references users(id) on delete cascade,
  model text not null,
  prompt_tokens int not null,
  completion_tokens int not null,
  total_tokens int not null,
  input_cost_usd numeric(12,6) not null,
  output_cost_usd numeric(12,6) not null,
  total_cost_usd numeric(12,6) not null,
  created_at timestamptz default now()
);

-- Индексы для оптимизации запросов
create index if not exists idx_token_usage_user_time
  on token_usage(user_id, created_at desc);

-- Представление для ежедневной статистики использования
create or replace view v_usage_daily as
select
  user_id,
  date_trunc('day', created_at)::date as day,
  sum(prompt_tokens) as prompt_tokens,
  sum(completion_tokens) as completion_tokens,
  sum(total_tokens) as total_tokens,
  sum(total_cost_usd) as total_cost_usd
from token_usage
group by user_id, date_trunc('day', created_at)::date;
