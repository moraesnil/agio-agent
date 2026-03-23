# Agio Agent — Memory

Arquivo de memória compartilhada entre máquinas via Git.

---

## Estado Atual do Projeto

- Web app Next.js 16 (Turbopack) rodando em `web/`
- **Modo agente ativo**: tools, subagentes paralelos, loop agente
- 7 skills ativas em `web/src/skills-data/` (copiadas de `skills/` via prebuild)
- Python CLI agent em `agent/` — funcional, faz streaming com Claude API (single-turn, sem tools/loops)

## Arquitetura Agente (Web)

- **AI SDK v6** (`ai@6.0.116`) + `@ai-sdk/react` para hooks
- `streamText` com `stopWhen: stepCountIs(10)` para loop agente
- `toUIMessageStreamResponse()` para streaming com tool calls visíveis
- `useChat` do `@ai-sdk/react` com `DefaultChatTransport`
- **2 tools disponíveis:**
  - `get_skill_instructions` — carrega instruções de uma skill
  - `run_skill_subtask` — subagente que executa tarefa com skill específica (paralelo)
- System prompt inclui contexto da Agio + lista de skills + instruções de uso de tools

## Arquivos Importantes

| Arquivo | Propósito |
|---------|-----------|
| `web/src/app/api/chat/route.ts` | Endpoint agente: streamText + tools + maxSteps |
| `web/src/lib/tools.ts` | Skills → tools + subagente pattern |
| `web/src/lib/skills.ts` | Descoberta de skills |
| `web/src/lib/prompts.ts` | System prompt (contexto + skills + instruções agente) |
| `web/src/components/AgentMessage.tsx` | Renderiza mensagens com tool calls expandíveis |
| `web/src/components/ChatInterface.tsx` | Chat livre com useChat + AgentMessage |
| `web/src/components/SkillGrid.tsx` | Painel de skills com useChat + AgentMessage |
| `web/src/context-docs/agio-contexto.md` | Documento Mestre da Agio |
| `web/public/logo.png` | Logo da Agio (tema claro) |
| `web/public/logo-dark.png` | Logo monograma (tema escuro) |
| `web/.env.local` | Variáveis de ambiente (não commitado) |

## Variáveis de Ambiente

- `GOOGLE_GENERATIVE_AI_API_KEY` — Google Gemini (configurado em `web/.env.local`)
- `ANTHROPIC_API_KEY` — Claude (não configurado ainda)

## Decisões Tomadas

- Memória migrada para `memory/MEMORY.md` no repo para sync via Git
- AI SDK v6: `inputSchema` (não `parameters`), `stopWhen: stepCountIs()` (não `maxSteps`), `toUIMessageStreamResponse()` (não `toDataStreamResponse`)
- `useChat` do `@ai-sdk/react` com `DefaultChatTransport` (não `api` direto)
- Dark theme como padrão; accent color `#e83c3c`
- Logo dark: `logo-dark.png` (monograma negativo)

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

- **Skill de Dashboard** — gerar dashboards interativos e visualizar inline no web app (pedido pelo usuário em 2026-03-23)
- Criar 12 skills dos outros departamentos (mesma estrutura v0.2.0)
- Integrar MCP servers (filesystem, browser, APIs externas)
- Adicionar mais tools ao web app (web search, image gen)
- Implementar tools no Python agent (hoje não tem nenhuma)
- Evoluir Python agent para multi-turn com agent loop
- Configurar ANTHROPIC_API_KEY para usar Claude models
- Deploy no Vercel

## Gaps entre Estado Atual e Spec GIO

A spec em `docs/GIO-spec-tecnica.md` descreve a visão completa. O que falta:
- Tools (search_index, read_file, notion_search, etc.) — zero implementadas
- Backend FastAPI — não existe
- Agent loop / multi-turn reasoning — não implementado
- Supervisor + sub-agentes por departamento — não implementado
- MCP servers (Sienge, WhatsApp, Calendar) — não iniciado
- Python agent não carrega context docs da Agio (corrigido em 2026-03-23 — agora carrega)

## Sessão 2026-03-23 — Revisão Geral

- Corrigido sync de skills v0.2.0 para o web app (antes eram placeholders v0.1.0)
- CLAUDE.md e MEMORY.md atualizados com estado real
- README.md criado na raiz
- Python agent melhorado: context docs, validação API key, try/catch, timestamps
- Web app: gray-matter, LanguageModel type, try/catch na API, fix hydration hooks, fix SkillGrid setTimeout
- Bug fix: `convertToModelMessages()` na API route — UIMessage vs ModelMessage (AI SDK v6)
- `.env.example` criado, `.gitignore` atualizado
- Build e app testados e funcionando (localhost:3000)

## Memory Files

- [feedback_use_skills.md](./feedback_use_skills.md) — Sempre usar skills instaladas do Claude Code quando aplicável
- [feedback_explain_decisions.md](./feedback_explain_decisions.md) — Explicar decisões técnicas de forma clara
- [project_gio_vision.md](./project_gio_vision.md) — Visão da plataforma GIO multi-agêntica
- [user_profile.md](./user_profile.md) — Perfil do usuário (não é dev, quer Agent SDK Python)
- [project_dashboard_skill.md](./project_dashboard_skill.md) — Próxima feature: skill de dashboards com visualização inline

---

_Atualizado em: 2026-03-23_
