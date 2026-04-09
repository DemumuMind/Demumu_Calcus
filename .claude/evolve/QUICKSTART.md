# Evolve System Quick Start

Evolve development patterns into commands, skills, and agents in 5 minutes.

---

## Installation

Already included in OpenCode. Just use the scripts directly.

---

## First Analysis

### 1. Run Analysis

```bash
# PowerShell
.claude/scripts/evolve.ps1

# Or shorthand
evolve
```

Shows:
- Total instincts in registry
- Clusters ready for evolution
- Candidates for commands/skills/agents

### 2. Generate Evolved Files

```bash
.claude/scripts/evolve.ps1 --generate
```

Creates files in `.claude/evolve/evolved/`:
- `commands/` — New command definitions
- `skills/` — Skill templates
- `agents/` — Agent configurations

---

## Common Commands

### Analyze Instincts
```bash
evolve analyze
```

Deep analysis with clustering and recommendations.

### Show Registry
```bash
evolve --registry
```

Displays all evolved items and their status.

### Generate Specific Type
```bash
evolve --generate --type command
evolve --generate --type skill
evolve --generate --type agent
```

### Check Status
```bash
evolve --status
```

Shows current evolution status.

---

## Workflow

```
1. Analyze → 2. Review suggestions → 3. Generate → 4. Implement → 5. Register
```

---

## What Gets Evolved?

### Commands
Repetitive tasks you do manually → Automated commands

Example: "I always check 3 things before committing" → `/precommit` command

### Skills  
Common patterns → Reusable skills

Example: "I often create REST APIs" → `api-design` skill

### Agents
Complex workflows → Autonomous agents

Example: "I research, plan, then implement" → `researcher` agent

---

## File Structure

```
.claude/evolve/
├── templates/
│   ├── command.md           # Command template
│   ├── skill.md             # Skill template
│   └── agent.md             # Agent template
├── evolved/
│   ├── commands/            # Generated commands
│   ├── skills/              # Generated skills
│   └── agents/              # Generated agents
└── _registry.md            # Evolution registry
```

---

## Example Session

```bash
# Run analysis
evolve

# Review output, see suggestions
# "3 patterns detected → 2 commands, 1 skill suggested"

# Generate command files
evolve --generate --type command

# Check what was created
evolve --registry

# Implement the generated commands
# (Edit files in .claude/evolve/evolved/commands/)
```

---

## Templates

### Command Template
```markdown
# Command: {name}

## Purpose
{description}

## Usage
```bash
/{name} [options]
```

## Implementation
...
```

### Skill Template
```markdown
# Skill: {name}

## When to Use
{trigger conditions}

## Steps
1. ...
2. ...
```

### Agent Template
```markdown
# Agent: {name}

## Role
{description}

## Workflow
1. ...
2. ...
```

---

## Next Steps

- Read [GUIDE.md](GUIDE.md) for detailed workflows
- Check [README.md](README.md) for full documentation
- Review templates in `templates/` directory

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "No instincts found" | Create instincts first in `.claude/instincts/` |
| "Nothing to evolve" | Run `evolve analyze` first |
| "Permission denied" | Run `chmod +x .claude/scripts/evolve.sh` (Unix) |

---

**That's it!** Start evolving your patterns into reusable tools.
