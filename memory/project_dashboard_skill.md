---
name: project-dashboard-skill
description: Próxima feature — skill de geração de dashboards interativos com visualização inline no web app
type: project
---

Usuário pediu uma skill (ou feature) para gerar dashboards quando solicitado, com possibilidade de visualizar o dashboard gerado diretamente dentro do web app.

**Why:** Expandir capacidades do agente para além de texto — gerar artefatos visuais (gráficos, KPIs, tabelas) úteis para Marketing e outros departamentos.

**How to apply:** Implementar como nova skill + componente de renderização no web app. Possível abordagem:
- Skill gera código HTML/React do dashboard (similar ao "artifacts" do Claude)
- Web app renderiza o output em iframe ou componente dedicado
- Pode usar bibliotecas como Recharts, Chart.js ou gerar HTML standalone
