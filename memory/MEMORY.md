# Agio Agent — Memory

Arquivo de memória compartilhada entre máquinas via Git.

---

## Estado Atual do Projeto

- Web app Next.js 16 (Turbopack) rodando em `web/`
- **Modo agente ativo**: tools, subagentes paralelos, loop agente
- 7 skills ativas em `web/src/skills-data/` (copiadas de `skills/` via prebuild)
- Python CLI agent em `agent/` — early stage, só gera plan JSON

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

- Criar 12 skills dos outros departamentos (mesma estrutura v0.2.0)
- Sincronizar skills em `skills/` (Python agent) com os mesmos corpos v0.2.0
- Integrar MCP servers (filesystem, browser, APIs externas)
- Adicionar mais tools (web search, image gen)
- Testar subagentes paralelos com múltiplas skills
- Configurar ANTHROPIC_API_KEY para usar Claude models
- Deploy no Vercel

---

_Atualizado em: 2026-03-19_
