## INSTINCT: add-table-step3
Created: 2026-04-09
Confidence: 80%
Trigger: когда пользователь просит добавить таблицу
Action: сгенерировать TypeScript типы
Domain: database
Scope: project

### Context
После обновления схемы нужно сгенерировать типы для TypeScript.

### Examples
- После: обновление schema.prisma
- Действие: запустить prisma generate
