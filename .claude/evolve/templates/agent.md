# Agent Template

Generated from instincts via evolve command.

## Metadata

```yaml
---
name: {{name}}
description: {{description}}
model: sonnet
evolved_from:
{{#instincts}}
  - {{id}} [{{scope}}]
{{/instincts}}
workflow:
{{#steps}}
  - {{number}}: {{description}}
{{/steps}}
avg_confidence: {{avgConfidence}}%
---
```

## Instincts

{{#instincts}}
### {{id}} ({{confidence}}%)
- **Step {{step}}:** {{description}}
- **Trigger:** {{trigger}}
- **Action:** {{action}}
{{/instincts}}

## Workflow

This agent implements a {{stepCount}}-step workflow:

{{#steps}}
### Step {{number}}: {{name}}

{{description}}

**Trigger:** {{trigger}}
**Action:** {{action}}
**Success Criteria:** {{successCriteria}}
{{/steps}}

## Usage

### Manual Trigger

```
/agent {{name}} <task>
```

### Auto-Trigger

{{#autoTriggers}}
- {{condition}}
{{/autoTriggers}}

## Isolation

This agent requires isolation because:
{{#isolationReasons}}
- {{.}}
{{/isolationReasons}}

## Examples

{{#examples}}
### {{description}}

**Task:** {{task}}

**Workflow:**
{{#steps}}
{{number}}. {{description}}
{{/steps}}
{{/examples}}

## Notes

- Generated: {{generatedDate}}
- Evolution confidence: {{avgConfidence}}%
- Steps: {{stepCount}}
- Manual review strongly recommended before production use
