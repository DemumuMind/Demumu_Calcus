## INSTINCT: add-table-step2
Created: 2026-04-09
Confidence: 82%
Trigger: когда пользователь просит добавить таблицу
Action: обновить схему Prisma/ORM
Domain: database
Scope: project

### Context
После создания миграции нужно обновить схему ORM.

### Examples
- После: create_users_table
- Действие: добавить model User в schema.prisma
