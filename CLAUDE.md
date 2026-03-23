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
- A **Next.js 16 web app** (`/web`) — the primary interface used daily
- A **Python CLI agent** (`/agent`) — streaming single-turn agent with skill injection

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

- Next.js 16 (App Router, Turbopack)
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

Skills live in `skills/<folder-name>/SKILL.md` at the root. The web app copies them via `web/scripts/copy-skills.js` (runs automatically on `npm run dev` and `npm run build`).

**Current state:** Functional single-turn agent. Streams Claude API responses with skill context injected in the system prompt. Does NOT have tools, agent loops, or multi-turn reasoning yet.

**Config:** `agent/config.yaml` — model defaults and directory paths. CLI args override.

**Output:** `./output/raw/` by default. `./logs/` reserved for future logging.

### What's NOT built yet (vs. GIO spec)

The `docs/GIO-spec-tecnica.md` describes the full vision. Key gaps:
- No tools (search_index, read_file, notion_search, etc.)
- No agent loop or multi-turn reasoning
- No supervisor/sub-agent pattern
- No backend server (FastAPI)
- No MCP servers (Sienge, WhatsApp, Calendar)
- Agent doesn't load Agio context docs (web app does)

---

## Adding a New Skill

1. Create `skills/<skill-name>/SKILL.md` at the **root** (source of truth)
2. Add YAML frontmatter with `name`, `department`, `description`, `metadata`
3. Run `npm run dev` or `npm run build` in `/web` — the prebuild script copies skills automatically
4. Skill appears in both the web app and Python agent

**Important:** Never edit skills directly in `web/src/skills-data/` — they get overwritten by the prebuild copy.
