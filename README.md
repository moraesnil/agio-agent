# Agio Agent

Plataforma de automação baseada em skills para a **Agio Engenharia**.

## Estrutura

```
├── web/                  # Web app Next.js 16 (interface principal)
├── agent/                # Python CLI agent (streaming com Claude API)
├── skills/               # Skills compartilhadas (source of truth)
├── docs/                 # Spec técnica do projeto GIO
├── memory/               # Memória do projeto (sync via Git)
└── CLAUDE.md             # Instruções para Claude Code
```

## Quick Start

### Web App

```bash
cd web
cp .env.example .env.local   # preencher com suas API keys
npm install
npm run dev                   # http://localhost:3000
```

### Python Agent

```bash
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-...
python agent/agent.py --task "sua tarefa aqui" --output-mode stdout
```

## Skills

7 skills de Marketing ativas (v0.2.0):

| Skill | O que faz |
|-------|-----------|
| `copy-generator` | Textos de marketing por canal |
| `briefing-generator` | Briefings estruturados para campanhas |
| `content-intelligence` | Relatórios de inteligência de conteúdo |
| `content-transformation` | Transforma conteúdo entre formatos |
| `image-prompt-generator` | Prompts para IA de imagem |
| `input-triage` | Classifica inputs soltos em categorias |
| `notion-report-builder` | Relatórios formatados para Notion |

Skills ficam em `skills/` e são copiadas automaticamente para o web app no prebuild.

## Visão GIO

A spec completa da plataforma multi-agêntica está em `docs/GIO-spec-tecnica.md`.
