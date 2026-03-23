---
name: gio-vision
description: Visão completa do projeto GIO - plataforma multi-agêntica da Agio com Agent SDK Python, OneDrive, Notion
type: project
---

## GIO - Plataforma Agêntica Inteligente da Agio

### Visão
Plataforma multi-agêntica onde cada departamento tem um agente supervisor que busca informações, executa workflows e cria documentos para os colaboradores.

### Departamentos (5 agentes)
- Marketing
- Compras
- Orçamento
- Financeiro
- Comercial

### Stack Definida
- **Backend:** Python + Anthropic Agent SDK
- **Frontend:** Web app (Next.js, similar ao atual)
- **Fontes de dados:** OneDrive corporativo (Microsoft 365) + Notion pessoal
- **Integração futura:** API Sienge (ERP, após migração)
- **Hospedagem:** VPS (MVP)
- **API:** Precisa criar conta em console.anthropic.com (separada do plano claude.ai)

### MVP - O que faz
1. Colaborador acessa web app
2. Escolhe skill ou faz pergunta livre
3. Agente do departamento busca info no OneDrive/Notion
4. Gera documento/resposta (post LinkedIn, dashboard, relatório, etc.)

### Exemplos de uso
- Compras: head tem planilha no OneDrive → agente cria dashboard
- Marketing: criar post LinkedIn baseado em dados de obra específica (pasta de obras)
- Skills guiam workflows, busca de informações e criação de documentos

### O que NÃO é o GIO
- Não é chatbot passivo
- Não é só RAG (busca + resposta)
- É agêntico: planeja, decide, executa, cria

### Estado atual (2026-03-19)
- Projeto precisa ser reestruturado de Vercel AI SDK para Anthropic Agent SDK Python
- Frontend Next.js pode continuar como interface
- Skills de marketing existentes podem ser reaproveitadas como base
