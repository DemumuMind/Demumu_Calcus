# Command Template

Generated from instincts via evolve command.

## Metadata

```yaml
---
name: {{name}}
description: {{description}}
command: {{command}}
evolved_from:
{{#instincts}}
  - {{id}} [{{scope}}]
{{/instincts}}
avg_confidence: {{avgConfidence}}%
---
```

## Instincts

{{#instincts}}
### {{id}} ({{confidence}}%)
- **Trigger:** {{trigger}}
- **Action:** {{action}}
{{/instincts}}

## Implementation

### Usage

```
{{command}} {{#args}}<{{name}}>{{/args}}
```

### Steps

{{#steps}}
{{number}}. {{description}}
{{/steps}}

### Example

```bash
{{command}} {{exampleArgs}}
```

## Notes

- Generated: {{generatedDate}}
- Evolution confidence: {{avgConfidence}}%
- Manual review recommended before production use
