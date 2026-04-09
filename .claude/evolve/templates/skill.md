# Skill Template

Generated from instincts via evolve command.

## Metadata

```yaml
---
name: {{name}}
description: {{description}}
evolved_from:
{{#instincts}}
  - {{id}} [{{scope}}]
{{/instincts}}
triggers:
{{#triggers}}
  - {{pattern}}
{{/triggers}}
avg_confidence: {{avgConfidence}}%
---
```

## Instincts

{{#instincts}}
### {{id}} ({{confidence}}%)
- **Trigger:** {{trigger}}
- **Action:** {{action}}
- **Pattern:** `{{pattern}}`
{{/instincts}}

## Behavior

### Auto-Trigger Conditions

{{#triggers}}
- `{{pattern}}` → {{action}}
{{/triggers}}

### Implementation Notes

{{#notes}}
- {{.}}
{{/notes}}

## Usage

This skill is automatically applied when matching patterns are detected.

## Examples

{{#examples}}
### {{description}}

**Input:**
```
{{input}}
```

**Output:**
```
{{output}}
```
{{/examples}}

## Notes

- Generated: {{generatedDate}}
- Evolution confidence: {{avgConfidence}}%
- Auto-triggers: {{triggerCount}} patterns
