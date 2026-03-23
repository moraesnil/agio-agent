# GIO — Spec Técnica v1.0

> Plataforma Agêntica Inteligente da Agio Engenharia

---

## 1. Visão Geral

O GIO é uma plataforma multi-agêntica onde cada departamento da Agio tem um agente supervisor inteligente. Os agentes buscam informações nos sistemas da empresa (OneDrive, Notion), executam workflows e criam documentos para os colaboradores.

**Não é um chatbot.** É um ecossistema de assistentes que planejam, decidem e executam.

---

## 2. Arquitetura

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND (Next.js)              │
│  Web App — Skills, Chat, Dashboard por depto     │
│  Deploy: VPS                                     │
└──────────────────────┬──────────────────────────┘
                       │ HTTP/WebSocket
┌──────────────────────▼──────────────────────────┐
│              BACKEND (Python)                     │
│         Anthropic Agent SDK                      │
│                                                   │
│  ┌─────────┐ ┌─────────┐ ┌──────────┐           │
│  │Marketing│ │ Compras │ │Orçamento │           │
│  │  Agent  │ │  Agent  │ │  Agent   │           │
│  └────┬────┘ └────┬────┘ └────┬─────┘           │
│       │           │           │                   │
│  ┌────┴────┐ ┌────┴────┐ ┌───┴──────┐           │
│  │Financ.  │ │Comercial│ │Subagentes│           │
│  │  Agent  │ │  Agent  │ │(sob dem.)│           │
│  └─────────┘ └─────────┘ └──────────┘           │
│                                                   │
│  ┌─── TOOLS ───────────────────────────────┐     │
│  │ File Index    │ File Reader│ PDF Reader │     │
│  │ Excel Parser  │ Notion MCP │ Doc Gen    │     │
│  └─────────────────────────────────────────┘     │
│                                                   │
│  ┌─── ÍNDICE LOCAL ───────────────────────┐      │
│  │ index.json / SQLite                     │      │
│  │ Varre OneDrive local → metadados+resumo │      │
│  └─────────────────────────────────────────┘     │
│                                                   │
│  ┌─── MCP SERVERS (futuro) ────────────────┐     │
│  │ Sienge ERP  │ WhatsApp │ Google Calendar│     │
│  └─────────────────────────────────────────┘     │
└─────────────────────────────────────────────────┘
```

---

## 3. Stack Técnica

| Camada | Tecnologia | Por quê |
|--------|-----------|---------|
| **Backend / Agentes** | Python + Anthropic Agent SDK | SDK oficial, suporte nativo a tool use, subagentes, loops agênticos |
| **Frontend** | Next.js 15 (App Router) + Tailwind | Já existe, boa UX, deploy fácil |
| **LLM** | Claude (Sonnet/Opus via API) | Melhor raciocínio para tool use e tarefas complexas |
| **OneDrive** | Microsoft Graph API | Acesso corporativo a arquivos, pastas, planilhas |
| **Notion** | Notion API (ou MCP server) | Base de conhecimento e documentação |
| **Hospedagem** | VPS (MVP) | Controle total, custo previsível |
| **API Key** | console.anthropic.com | Pay-as-you-go, separada do plano claude.ai |

---

## 4. Agentes por Departamento

### 4.1 Agente de Marketing
**Responsabilidade:** Criação de conteúdo, posts, briefings, análise de concorrência.

**Skills:**
- Criar post LinkedIn/Instagram baseado em dados de obra
- Gerar briefing de campanha
- Transformar conteúdo entre formatos
- Gerar prompts de imagem
- Análise de conteúdo da concorrência

**Tools necessárias:**
- `onedrive_read_file` — buscar fotos e dados de obras
- `onedrive_list_folder` — navegar pasta de obras
- `notion_search` — buscar contexto da Agio

---

### 4.2 Agente de Compras
**Responsabilidade:** Cotações, análise de fornecedores, dashboards de compras.

**Skills:**
- Criar dashboard a partir de planilha
- Gerar comparativo de cotações
- Pedido de compra estruturado

**Tools necessárias:**
- `onedrive_read_excel` — ler planilhas de compras
- `onedrive_read_file` — ler PDFs de cotação
- `python_execute` — processar dados, gerar gráficos

---

### 4.3 Agente de Orçamento
**Responsabilidade:** Composições orçamentárias, análise de desvios, memórias de cálculo.

**Skills:**
- Composição orçamentária
- Análise de desvio de orçamento
- Memória de cálculo

**Tools necessárias:**
- `onedrive_read_excel` — planilhas de orçamento
- `notion_search` — referências técnicas
- `python_execute` — cálculos

---

### 4.4 Agente Financeiro
**Responsabilidade:** Relatórios financeiros, fluxo de caixa, análises.

**Skills:**
- Relatório financeiro mensal
- Análise de fluxo de caixa
- Projeções

**Tools necessárias:**
- `onedrive_read_excel` — dados financeiros
- `python_execute` — cálculos e gráficos

---

### 4.5 Agente Comercial
**Responsabilidade:** Propostas comerciais, follow-ups, análise de pipeline.

**Skills:**
- Proposta comercial
- Follow-up estruturado
- Análise de pipeline

**Tools necessárias:**
- `onedrive_read_file` — templates de proposta
- `notion_search` — dados de clientes/projetos

---

## 5. Tools (Ferramentas)

### MVP — Tools essenciais

| Tool | Descrição | Prioridade |
|------|-----------|-----------|
| `search_index` | Buscar no índice local (nome, tipo, resumo) | P0 |
| `read_file` | Ler conteúdo de arquivo local (PDF, DOCX, TXT, imagens) | P0 |
| `read_excel` | Ler e processar planilhas Excel locais | P0 |
| `list_folder` | Listar arquivos de uma pasta local | P0 |
| `notion_search` | Buscar páginas e databases no Notion (via MCP) | P0 |
| `notion_read_page` | Ler conteúdo de uma página do Notion (via MCP) | P0 |
| `create_document` | Gerar PDF/DOCX formatado | P1 |
| `python_execute` | Executar código Python (cálculos, gráficos) | P1 |

### Futuro

| Tool | Descrição | Quando |
|------|-----------|--------|
| `onedrive_api_*` | Acesso remoto via Microsoft Graph API | Quando deploy na VPS |
| `sienge_query` | Consultar dados do ERP Sienge | Após migração |
| `web_search` | Buscar informações na web | MVP+ |
| `send_email` | Enviar emails | MVP+ |
| `image_generate` | Gerar imagens com IA | MVP+ |

---

## 5.1 Índice Local (Sistema de Busca MVP)

O MVP usa um **índice local** em vez de APIs externas ou vector stores.

### Como funciona

```
1. Script indexador varre a pasta do OneDrive local:
   C:\Users\Loni\OneDrive - G.A Empreiteira e Projetos Eireli\

2. Para cada arquivo encontrado, salva:
   - nome, extensão, caminho completo
   - pasta/departamento
   - tamanho, data de modificação
   - resumo curto (primeiras linhas ou metadados)

3. Gera um index.json (ou SQLite para volumes maiores)

4. O agente usa a tool search_index(query) para achar arquivos relevantes
   → depois usa read_file(caminho) para ler o conteúdo
```

### Estrutura do índice

```json
{
  "files": [
    {
      "name": "Planilha_Compras_2026.xlsx",
      "path": "C:/Users/Loni/OneDrive - G.A .../Compras/Planilha_Compras_2026.xlsx",
      "type": "xlsx",
      "folder": "Compras",
      "size_kb": 245,
      "modified": "2026-03-15",
      "summary": "Planilha com cotações de fornecedores, 3 abas: Aço, Concreto, Elétrica"
    }
  ]
}
```

### Atualização

- Script roda manualmente ou via cron (ex: a cada 6h)
- Detecta arquivos novos/modificados/removidos
- No futuro: watcher automático com watchdog

### Evolução

```
MVP:     Índice JSON + busca por texto simples
v2:      SQLite + busca full-text (FTS5)
v3:      Vector store (ChromaDB) + busca semântica
```

---

## 6. Skills vs Tools

```
SKILL = Workflow que orquestra múltiplas tools
TOOL  = Ação atômica (ler arquivo, buscar dados, calcular)

Exemplo — Skill "Criar Post LinkedIn sobre Obra":
  1. Tool: onedrive_list_folder("/Obras/Residencial Aurora")
  2. Tool: onedrive_read_file("descricao.docx")
  3. Tool: onedrive_read_file("foto_fachada.jpg")
  4. Agente: Sintetiza informações + tom de voz da Agio
  5. Resultado: Post pronto para LinkedIn
```

---

## 7. Estrutura do Projeto (Nova)

```
Agio_agent/
├── backend/
│   ├── agents/
│   │   ├── marketing.py        # Agente supervisor Marketing
│   │   ├── compras.py          # Agente supervisor Compras
│   │   ├── orcamento.py        # Agente supervisor Orçamento
│   │   ├── financeiro.py       # Agente supervisor Financeiro
│   │   └── comercial.py        # Agente supervisor Comercial
│   ├── tools/
│   │   ├── onedrive.py         # Tools OneDrive (list, read, excel)
│   │   ├── notion.py           # Tools Notion (search, read)
│   │   ├── documents.py        # Tools criação de docs (PDF, DOCX)
│   │   └── python_exec.py      # Tool execução Python
│   ├── skills/
│   │   ├── marketing/          # Skills de Marketing (SKILL.md)
│   │   ├── compras/            # Skills de Compras
│   │   ├── orcamento/          # Skills de Orçamento
│   │   ├── financeiro/         # Skills de Financeiro
│   │   └── comercial/          # Skills de Comercial
│   ├── config/
│   │   └── agents.yaml         # Config dos agentes (model, limits)
│   ├── server.py               # API HTTP (FastAPI)
│   └── requirements.txt
├── web/                         # Frontend Next.js (existente, adaptado)
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── package.json
├── docs/
│   └── GIO-spec-tecnica.md     # Este documento
├── memory/
├── CLAUDE.md
└── README.md
```

---

## 8. Plano de Execução (MVP)

### Fase 1 — Fundação (semana 1-2)
- [ ] Criar conta API em console.anthropic.com e gerar ANTHROPIC_API_KEY
- [ ] Configurar backend Python com Agent SDK
- [ ] Criar script indexador (varrer OneDrive local → index.json)
- [ ] Implementar tools: search_index, read_file, read_excel, list_folder
- [ ] Criar primeiro agente (Marketing — já temos skills)
- [ ] Testar fluxo: pergunta → agente → busca no índice → lê arquivo → resposta

### Fase 2 — Conectar Notion + Expandir (semana 3)
- [ ] Configurar Notion MCP server
- [ ] Agente de Marketing usando índice local + Notion
- [ ] Testar skill "Criar post baseado em obra"
- [ ] Agente de Compras (planilha → dashboard)

### Fase 3 — Mais Agentes (semana 4-5)
- [ ] Agente de Orçamento
- [ ] Agente Financeiro
- [ ] Agente Comercial
- [ ] Refinar skills de cada departamento

### Fase 4 — Frontend Integrado (semana 6)
- [ ] Adaptar web app Next.js para chamar backend Python (FastAPI)
- [ ] Interface de skills por departamento
- [ ] Chat com agente do departamento

### Fase 5 — Abrir para o escritório (semana 7)
- [ ] Subir backend + frontend na máquina local
- [ ] Configurar acesso via IP da rede (ex: http://192.168.0.225:3000)
- [ ] Teste com colaboradores reais no escritório

### Fase 6 — Produção (quando MVP validar)
- [ ] Contratar VPS
- [ ] Trocar leitura local → OneDrive API (Microsoft Graph)
- [ ] Deploy backend + frontend na VPS
- [ ] Acesso externo para todos

---

## 9. Decisões Técnicas

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| SDK de agentes | Anthropic Agent SDK (Python) | Suporte nativo a tool use, subagentes, controle total |
| Frontend | Next.js (manter existente) | Já existe, adaptar para chamar backend Python |
| Comunicação front↔back | REST API (FastAPI) | Simples, streaming via SSE |
| Base de conhecimento | ChromaDB local (vector store) + Notion MCP | Busca semântica, zero API externa, roda local |
| Busca | ChromaDB com embeddings locais | Semântica desde o MVP, evolui para embeddings via API depois |
| Hospedagem MVP | Máquina local + acesso via rede do escritório | Zero custo, funcionários acessam via navegador |
| Hospedagem Produção | VPS (migração fácil, só troca leitura OneDrive local → API) | Quando MVP validar |

---

_Documento criado em: 2026-03-19_
_Próxima revisão: após Fase 1_
