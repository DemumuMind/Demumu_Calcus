## INSTINCT: add-table-step1
Created: 2026-04-09
Confidence: 85%
Trigger: когда пользователь просит добавить таблицу
Action: создать миграцию базы данных
Domain: database
Scope: project

### Context
Первый шаг при добавлении новой таблицы - всегда создавать миграцию.

### Examples
- Пользователь: "добавь таблицу users"
- Действие: создать миграцию create_users_table
