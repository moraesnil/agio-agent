# Agio Agent — Memory

Arquivo de memória compartilhada entre máquinas via Git.
Atualizar ao final de toda sessão com mudanças no projeto.

---

## Estado Atual do Projeto

- Web app Next.js 15 rodando em `web/`
- 7 skills ativas em `web/src/skills-data/` (copiadas de `skills/` via prebuild)
- Python CLI agent em `agent/` — early stage, só gera plan JSON ainda

## Arquivos Importantes

| Arquivo | Propósito |
|---------|-----------|
| `web/src/app/api/chat/route.ts` | Endpoint de streaming |
| `web/src/lib/skills.ts` | Descoberta de skills |
| `web/src/lib/prompts.ts` | Construção do system prompt |
| `web/src/context-docs/agio-contexto.md` | Documento Mestre da Agio |
| `web/public/logo.png` | Logo da Agio |
| `web/.env.local` | Variáveis de ambiente (não commitado) |

## Variáveis de Ambiente

- `GOOGLE_GENERATIVE_AI_API_KEY` — Google Gemini (configurado em `web/.env.local`)

## Decisões Tomadas

- Memória migrada para `memory/MEMORY.md` dentro do repositório para sincronização entre máquinas via Git
- `.env.local` usado para chaves de API (já está no .gitignore)
- Dark theme como padrão; accent color `#e83c3c`

## Skills Ativas

7 skills copiadas automaticamente via `scripts/copy-skills.js` no prebuild.
Para adicionar: criar `skills/<nome>/SKILL.md` com frontmatter YAML.

---

_Atualizado em: 2026-03-06_
