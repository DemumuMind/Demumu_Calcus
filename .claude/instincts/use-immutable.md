## INSTINCT: use-immutable
Created: 2026-04-09
Confidence: 76%
Trigger: при изменении состояния
Action: использовать иммутабельные структуры
Domain: code-style
Scope: project

### Context
Иммутабельность предотвращает побочные эффекты.

### Examples
- const newArray = [...oldArray, item]
- const newObj = { ...oldObj, key: value }
