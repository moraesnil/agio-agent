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
| `web/public/logo-dark.png` | Logo para tema escuro |
| `web/.env.local` | Variáveis de ambiente (não commitado) |

## Variáveis de Ambiente

- `GOOGLE_GENERATIVE_AI_API_KEY` — Google Gemini (configurado em `web/.env.local`)

## Decisões Tomadas

- Memória migrada para `memory/MEMORY.md` dentro do repositório para sincronização entre máquinas via Git
- `.env.local` usado para chaves de API (já está no .gitignore)
- Dark theme como padrão; accent color `#e83c3c`

## Skills de Marketing — v0.2.0 (Completas)

Todas as 7 skills de Marketing foram reescritas com corpo completo v0.2.0 em 10/03/2026:

| Skill | Propósito | Destaque |
|---|---|---|
| `copy-generator` | Gera textos de marketing por canal | Templates LinkedIn/IG/email/ad/WhatsApp, regra 60/40 |
| `briefing-generator` | Cria briefings estruturados | Entrevista de intake, timeline reversa, 4 tipos de briefing |
| `content-intelligence` | Relatórios de inteligência de conteúdo | Análise competitiva, gap detection, oportunidades priorizadas |
| `content-transformation` | Transforma conteúdo entre formatos | Matriz de transformação, adaptação por canal/persona |
| `image-prompt-generator` | Prompts para IA de imagem | 3 variações, negative prompts, specs por canal, Midjourney/DALL-E |
| `input-triage` | Classifica inputs soltos | 9 categorias, roteamento para skills, priorização |
| `notion-report-builder` | Relatórios para Notion | 5 tipos, templates Notion-ready, métricas com variação |

Estrutura v0.2.0: Goal → Required Inputs → Workflow (8-15 steps) → Anti-patterns → Output Template → Quality Gate → Example

Todas têm `department: Marketing` no frontmatter. Skills são copiadas via `scripts/copy-skills.js` no prebuild.

## Skills Pendentes (12 — outros departamentos)

| Departamento | Skills |
|---|---|
| Comercial | `proposta-comercial`, `follow-up-comercial` |
| Financeiro | `relatorio-financeiro` |
| Orçamento | `composicao-orcamentaria`, `analise-desvio-orcamento` |
| Administrativo & Financeiro | `gestao-contratos` |
| Compras | `cotacao-fornecedores`, `pedido-compra` |
| Engenharia | `relatorio-visita-obra`, `memoria-de-calculo` |
| Arquitetura | `memorial-descritivo`, `especificacao-tecnica` |

## Próximos Passos

- Criar 12 skills dos outros departamentos (mesma estrutura v0.2.0)
- Sincronizar skills em `skills/` (Python agent) com os mesmos corpos v0.2.0
- Deploy no Vercel
- Testar skills no web app com interações reais

---

_Atualizado em: 2026-03-10_
