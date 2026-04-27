# Supabase Setup Guide

## Быстрый старт

### 1. Создание проекта Supabase (5 минут)

1. Перейдите на [supabase.com](https://supabase.com)
2. Нажмите "New Project" или "Start your project"
3. Выберите организацию (или создайте новую)
4. Заполните:
   - **Name**: `calcus-auth`
   - **Database Password**: сгенерируйте надёжный пароль
   - **Region**: выберите ближайший (Frankfurt для Европы, Mumbai для Азии)
   - **Pricing Plan**: Free Tier (достаточно для старта)
5. Нажмите "Create new project"
6. Подождите ~2 минуты пока проект инициализируется

### 2. Настройка Database Schema (3 минуты)

1. В проекте перейдите в **SQL Editor** (левое меню)
2. Создайте "New query"
3. Откройте файл `supabase/schema.sql` из этого репозитория
4. Скопируйте ВЕСЬ содержимое
5. Вставьте в SQL Editor
6. Нажмите **Run**
7. Проверьте что нет ошибок (должно быть "Success")

### 3. Получение API Keys (2 минуты)

1. В проекте перейдите в **Project Settings** → **API**
2. Скопируйте:
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon / public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Создайте файл `.env.local` в корне проекта:

```bash
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE
```

### 4. Настройка Email подтверждения (опционально)

По умолчанию Supabase требует email-подтверждения. Для тестирования можно отключить:

1. **Authentication** → **Providers** → **Email**
2. Выключите "Confirm email"
3. Или настройте SMTP для реальных писем:
   - **SMTP Settings** внизу страницы
   - Используйте Resend/Loops/SendGrid для транзакционных писем

### 5. Настройка OAuth провайдеров (опционально)

Для входа через Google/GitHub:

1. **Authentication** → **Providers**
2. Включите нужного провайдера
3. Добавьте Client ID и Secret от провайдера
4. Настройте Redirect URL: `https://calcus-site.vercel.app/api/auth/callback`

## Проверка работы

После настройки:

```bash
# Перезапустите dev сервер
npm run dev
```

1. Откройте http://localhost:3000
2. Нажмите "Войти" в шапке
3. Попробуйте зарегистрироваться
4. Добавьте калькулятор в избранное (иконка сердечка)
5. Проверьте что данные сохранились в Supabase:
   - **Table Editor** → `user_favorites` должна появиться запись

## Лимиты Free Tier

- 500 MB database
- 2 GB storage
- 500K Auth users
- 2M Edge Function invocations/month
- Для production: $25/month Pro tier даёт 8GB DB + 100GB storage

## Решение проблем

### "Invalid API key"
- Проверьте что `.env.local` создан и не в .gitignore
- Перезапустите `npm run dev`
- Убедитесь что ключи скопированы полностью (без пробелов)

### "new row violates row-level security policy"
- Проверьте что RLS policies созданы (запустите schema.sql ещё раз)

### Email не приходит
- Проверьте спам
- В Supabase: Authentication → Users → найдите пользователя → Confirm email
- Или отключите подтверждение email для тестирования

## Production checklist

- [ ] Переключить на Pro tier (для SLA)
- [ ] Настроить собственный SMTP (Resend/Loops)
- [ ] Включить email подтверждение
- [ ] Настроить OAuth провайдеры
- [ ] Включить 2FA для админов
- [ ] Настроить backups
- [ ] Добавить rate limiting в Edge Functions
