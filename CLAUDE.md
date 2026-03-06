# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Regra Obrigatória — Memory

**Ao final de toda sessão que envolver mudanças no projeto, atualizar obrigatoriamente:**

- `memory/MEMORY.md` (relativo à raiz do repositório — sincronizado via Git entre máquinas)

Incluir: novos arquivos, decisões tomadas, skills adicionadas, departamentos, estado atual. Fazer isso sem precisar ser solicitado.

---

## Project Overview

**Agio Agent** is a skills-based marketing automation platform for Agio Engenharia, consisting of:
- A **Next.js 15 web app** (`/web`) — the primary interface used daily
- A **Python CLI agent** (`/agent`) — early-stage, for batch automation tasks

GitHub: https://github.com/moraesnil/agio-agent

---

## Web App

### Running

```bash
cd web
npm run dev       # development server at http://localhost:3000
npm run build     # production build
```

### Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Vercel AI SDK (`ai` package) for streaming
- Supports Anthropic, Google Gemini, and OpenRouter models

### Key Files

| Path | Purpose |
|------|---------|
| `web/src/app/layout.tsx` | Root layout — header + main |
| `web/src/app/page.tsx` | Home page — loads skills and renders SkillGrid |
| `web/src/app/chat/page.tsx` | Free chat page |
| `web/src/app/api/chat/route.ts` | Streaming API endpoint (POST) |
| `web/src/app/globals.css` | Design tokens (CSS variables), dark + light themes |
| `web/src/components/Header.tsx` | Sticky header — logo, theme toggle, model selector, nav |
| `web/src/components/SkillGrid.tsx` | Skills panel with department tabs + task input |
| `web/src/components/SkillCard.tsx` | Individual skill card |
| `web/src/components/ChatInterface.tsx` | Free chat UI |
| `web/src/lib/skills.ts` | Skill discovery from `src/skills-data/` |
| `web/src/lib/context.ts` | Loads Agio context docs from `src/context-docs/` |
| `web/src/lib/prompts.ts` | Builds system prompt (context + skills) |
| `web/src/lib/providers.ts` | Model list (Anthropic, Google, OpenRouter) |
| `web/src/lib/useModel.ts` | Hook — persists selected model in localStorage |
| `web/src/lib/useTheme.ts` | Hook — persists dark/light theme in localStorage |

### Skills System (Web)

Skills are discovered from `web/src/skills-data/<skill-name>/SKILL.md`.

YAML frontmatter fields:
```yaml
---
name: skill-name
department: Marketing        # groups skills into tabs in the UI
description: When to use
metadata:
  author: ...
  version: "0.1.0"
  category: marketing-automation
---
```

To add a new skill: create `web/src/skills-data/<name>/SKILL.md` with the frontmatter above.
To add a new department: set `department: <DeptName>` — a new tab appears automatically.

### Agio Context Documents

Files in `web/src/context-docs/*.md` are automatically loaded and injected at the top of every agent system prompt.

- `agio-contexto.md` — Documento Mestre: company overview, positioning, Método Agio, brand voice, vocabulary, personas
- Add more `.md` files here as needed (e.g., per-campaign briefs, new product launches)

### Design System

CSS variables in `globals.css`. Dark theme is default; light theme activates via `html[data-theme="light"]` on `<html>` (with `suppressHydrationWarning`).

Accent color: `#e83c3c` (red from Agio logo)
Toggle stored in localStorage key `agio-theme`.

---

## Python CLI Agent

### Running

```bash
# Basic usage (requires ANTHROPIC_API_KEY env var)
python agent/agent.py --task "sua tarefa aqui"

# With specific model
python agent/agent.py --task "sua tarefa aqui" --model claude-sonnet-4-6

# Filter to specific skills
python agent/agent.py --task "sua tarefa aqui" --skills "copy-generator,briefing-generator"

# Output modes: file (default), stdout, none
python agent/agent.py --task "sua tarefa aqui" --output-mode stdout
python agent/agent.py --task "sua tarefa aqui" --output-mode file --output-dir ./output/raw
```

### Dependencies

```bash
pip install anthropic pyyaml
```

### Architecture

Skills for the Python agent live in `skills/<folder-name>/SKILL.md` (separate from the web app's `web/src/skills-data/`).

**Current state:** Early development. `agent.py` only builds a plan JSON — it does not yet execute Claude API calls or invoke skills.

**Config:** `agent/config.yaml` — model defaults and directory paths. CLI args override.

**Output:** `./output/raw/` by default. `./logs/` reserved for future logging.

---

## Adding a New Skill (Web)

1. Create `web/src/skills-data/<skill-name>/SKILL.md`
2. Add YAML frontmatter with `name`, `department`, `description`, `metadata`
3. Skill appears automatically on next page load

## Adding a New Skill (Python Agent)

Create `skills/<skill-name>/SKILL.md` with the same frontmatter structure.
