---
name: notion-report-builder
department: Marketing
description: Estrutura relatórios e documentos de marketing para o Notion — relatórios semanais, resultados de campanha, calendários de conteúdo. Use quando o usuário pedir para organizar ou documentar resultados no Notion.
metadata:
  author: "Nil Moraes"
  version: "0.2.0"
  category: "marketing-automation"
---

# Notion Report Builder

## Instructions

### Goal

- Criar documentos e relatórios de marketing estruturados e prontos para o Notion — relatórios semanais, resultados de campanha, calendários de conteúdo, atas de reunião, retrospectivas.
- Formatar tudo em markdown compatível com Notion (headers, callouts, toggles, tabelas, checklists).
- Manter padrão visual e estrutural consistente entre relatórios da Agio.

### Required Inputs

Perguntar um de cada vez.

1. **Tipo de relatório** — Relatório semanal, resultado de campanha, calendário de conteúdo, ata de reunião, retrospectiva mensal, documento custom?
2. **Período** — Semana, mês, trimestre, ou data específica.
3. **Dados/conteúdo** — Métricas, destaques, decisões, itens do calendário — o que o usuário tiver disponível.
4. **Destinatário (opcional)** — Para quem é o relatório? CEO (Diogo), equipe de marketing, cliente externo?
5. **Nível de detalhe (opcional)** — Resumo executivo, relatório completo, ou ambos?

### Workflow

1. **Identificar tipo de relatório.** Com base no pedido, selecionar o template:

   | Tipo | Quando usar | Seções principais |
   |---|---|---|
   | Relatório Semanal | Toda semana, para acompanhamento de marketing | Resumo, Métricas por canal, Destaques, Próximos passos |
   | Resultado de Campanha | Após finalizar campanha ou ação específica | Objetivo, Execução, Métricas, Aprendizados |
   | Calendário de Conteúdo | Planejamento semanal/mensal de publicações | Tabela: data, canal, tema, narrativa, status |
   | Ata de Reunião | Após reuniões de marketing ou alinhamento | Pauta, Decisões, Ações, Responsáveis, Prazos |
   | Retrospectiva Mensal | Final do mês, visão consolidada | Overview, Wins, Gaps, Plano próximo mês |

2. **Coletar dados disponíveis.** Perguntar o que o usuário tem:
   - Métricas de LinkedIn (impressões, engajamento, seguidores)
   - Métricas de Instagram (alcance, engajamento, seguidores)
   - E-mail marketing (envios, abertura, cliques)
   - Conteúdos publicados (títulos, datas, performance)
   - Decisões tomadas, ações pendentes
   - Se não tem métricas, montar estrutura com campos "[preencher]"

3. **Estruturar no formato Notion.** Usar markdown compatível com Notion:
   - `#` `##` `###` para headers (Notion converte automaticamente)
   - `> ` para callouts (adicionar emoji indicativo: 💡 insight, ⚠️ alerta, ✅ win, 📌 ação)
   - `- [ ]` para checklists de ação
   - `|` tabelas para dados tabulares
   - `---` para divisores
   - **Bold** para destaques, *itálico* para observações

4. **Aplicar padrão visual Agio.** Manter consistência:
   - Header principal: `# [Tipo] — [Período]`
   - Metadados no topo: Data, Autor, Destinatário
   - Emojis nos headers de seção (usar com moderação, 1 por seção)
   - Tabelas para métricas (sempre com coluna de variação vs período anterior quando disponível)
   - Callouts para insights e alertas
   - Checklist para ações/próximos passos

5. **Calcular variações (se dados disponíveis).** Para métricas:
   - Variação vs semana/mês anterior (↑ ou ↓ com %)
   - Destaque verde para crescimento, vermelho para queda
   - Se não tem dado anterior, marcar como "baseline" sem variação

6. **Extrair insights.** Para cada bloco de dados, gerar pelo menos 1 insight:
   - O que os números dizem?
   - O que funcionou e por quê?
   - O que não funcionou e o que ajustar?
   - Conectar a uma Narrativa Agio quando relevante

7. **Gerar ações/próximos passos.** Cada ação deve ter:
   - Descrição clara da tarefa
   - Responsável (se conhecido)
   - Prazo (se aplicável)
   - Formato de checklist `- [ ]` para fácil acompanhamento no Notion

8. **Compilar documento final.** Montar usando o Output Template específico do tipo selecionado.

9. **Revisar tom.** Relatórios da Agio devem ser:
   - Diretos e objetivos (sem enrolação)
   - Baseados em dados (não em achismo)
   - Com recomendações acionáveis (não apenas observações)
   - No vocabulário Agio (sem termos proibidos)

10. **Entregar e oferecer próximos passos.** Apresentar o documento e perguntar:
    - "Quer que eu ajuste alguma seção?"
    - "Posso criar as peças de conteúdo listadas no calendário usando o copy-generator?"
    - "Quer que eu salve diretamente no Notion?" (se integração disponível)

### Anti-patterns

- **Nunca entregar relatório sem insights.** Tabela de métricas sem interpretação é planilha, não relatório. Cada bloco precisa de pelo menos 1 insight.
- **Nunca inventar métricas.** Se o usuário não forneceu dados, usar "[preencher]" como placeholder. Nunca fabricar números.
- **Nunca entregar ações sem responsável ou prazo.** "Melhorar conteúdo do Instagram" não é ação. "Criar 2 carrosséis sobre cases até sexta — responsável: Marketing" é ação.
- **Nunca usar formatação que não funciona no Notion.** Evitar HTML, tags customizadas, ou markdown estendido que o Notion não suporta.
- **Nunca esquecer a variação vs período anterior.** Métricas isoladas não contam história. Sempre mostrar tendência quando possível.
- **Nunca produzir relatório genérico.** O relatório deve ter a cara da Agio — vocabulário correto, referência a narrativas, conexão com estratégia.
- **Nunca misturar tipos de relatório.** Se o usuário pediu relatório semanal, entregar relatório semanal. Se precisa de calendário também, são dois documentos.

### Output Template

**Relatório Semanal:**
```
# 📊 Relatório Semanal de Marketing — [Semana dd/mm a dd/mm]

**Data:** [dd/mm/aaaa]
**Autor:** Marketing Agio
**Destinatário:** [Nome/Cargo]

---

## 📋 Resumo Executivo
[3-5 frases: principais resultados da semana e prioridade #1 da próxima]

---

## 📈 Métricas por Canal

### LinkedIn
| Métrica | Esta semana | Semana anterior | Variação |
|---|---|---|---|
| Impressões | [X] | [X] | [↑/↓ X%] |
| Engajamento | [X] | [X] | [↑/↓ X%] |
| Novos seguidores | [X] | [X] | [↑/↓ X%] |
| Posts publicados | [X] | [X] | — |

> 💡 **Insight:** [O que os números dizem e por quê]

### Instagram
| Métrica | Esta semana | Semana anterior | Variação |
|---|---|---|---|
| Alcance | [X] | [X] | [↑/↓ X%] |
| Engajamento | [X] | [X] | [↑/↓ X%] |
| Novos seguidores | [X] | [X] | [↑/↓ X%] |
| Posts publicados | [X] | [X] | — |

> 💡 **Insight:** [O que os números dizem e por quê]

---

## ✅ Destaques da Semana
1. [Conquista ou entrega relevante]
2. [Conquista ou entrega relevante]
3. [Conquista ou entrega relevante]

---

## ⚠️ Pontos de Atenção
- [Algo que não performou bem ou precisa de ajuste]
- [Risco ou bloqueio identificado]

---

## 📌 Conteúdos Publicados

| # | Data | Canal | Tema | Pilar | Engajamento |
|---|---|---|---|---|---|
| 1 | [dd/mm] | [LinkedIn] | [Título/tema] | [Pilar] | [Métrica] |
| 2 | [dd/mm] | [Instagram] | [Título/tema] | [Pilar] | [Métrica] |

---

## 🎯 Próximos Passos (Semana dd/mm a dd/mm)

- [ ] [Ação concreta — Responsável — Prazo]
- [ ] [Ação concreta — Responsável — Prazo]
- [ ] [Ação concreta — Responsável — Prazo]
```

**Calendário de Conteúdo:**
```
# 📅 Calendário de Conteúdo — [Mês/Semana]

**Período:** [dd/mm a dd/mm]
**Autor:** Marketing Agio

---

| Data | Canal | Formato | Tema | Narrativa Agio | Pilar | Persona | Status |
|---|---|---|---|---|---|---|---|
| [dd/mm] | [LinkedIn] | [Post] | [Tema] | [Narrativa] | [Pilar] | [Persona] | [🟡 Rascunho / 🟢 Aprovado / 🔴 Pendente] |
| [dd/mm] | [Instagram] | [Carrossel] | [Tema] | [Narrativa] | [Pilar] | [Persona] | [Status] |

---

## Notas
- [Observações sobre timing, dependências, ou contexto]
```

**Ata de Reunião:**
```
# 📝 Ata — [Título da Reunião]

**Data:** [dd/mm/aaaa]
**Participantes:** [Nomes]
**Duração:** [X min]

---

## Pauta
1. [Tópico discutido]
2. [Tópico discutido]

## Decisões
- [Decisão tomada e contexto]

## Ações
- [ ] [Ação — Responsável — Prazo]
- [ ] [Ação — Responsável — Prazo]

## Próxima reunião
**Data:** [dd/mm] — **Pauta preliminar:** [Tópicos]
```

### Quality Gate

Antes de entregar, verificar:

- [ ] Tipo de relatório correto para o pedido
- [ ] Todas as seções do template preenchidas (ou com "[preencher]" se dado faltante)
- [ ] Métricas com variação vs período anterior (quando disponível)
- [ ] Pelo menos 1 insight por bloco de dados
- [ ] Ações com responsável e prazo
- [ ] Formatação compatível com Notion (markdown padrão)
- [ ] Vocabulário Agio respeitado (sem termos proibidos)
- [ ] Tom direto e baseado em dados
- [ ] Emojis usados com moderação (1 por seção header)
- [ ] Nenhum dado inventado — placeholders onde necessário

### Example

**Input do usuário:**

> Monta o relatório semanal pra eu mandar pro Diogo. Essa semana a gente publicou 3 posts no LinkedIn (um sobre Método Agio com 45 curtidas, um sobre o case DHL com 67 curtidas, e um institucional com 28 curtidas) e 2 carrosséis no Instagram (case Pandora com alcance de 1.200 e dicas de retrofit com alcance de 890). Semana passada foram 2 posts LinkedIn (média 35 curtidas) e 1 carrossel IG (alcance 750).

---

**Output:**

# 📊 Relatório Semanal de Marketing — Semana 03/03 a 09/03

**Data:** 10/03/2026
**Autor:** Marketing Agio
**Destinatário:** Diogo Pires (CEO)

---

## 📋 Resumo Executivo
Semana de alta produtividade: 5 publicações (3 LinkedIn + 2 Instagram), acima das 3 da semana anterior. O post do case DHL foi o destaque com 67 curtidas no LinkedIn — quase o dobro da média da semana passada. Instagram também cresceu: alcance médio de 1.045 vs 750 na semana anterior (+39%). Prioridade da próxima semana: manter frequência de 3 posts LinkedIn e publicar case Hyatt.

---

## 📈 Métricas por Canal

### LinkedIn
| Métrica | Esta semana | Semana anterior | Variação |
|---|---|---|---|
| Posts publicados | 3 | 2 | ↑ 50% |
| Curtidas (total) | 140 | ~70 | ↑ 100% |
| Curtidas (média/post) | 46.7 | 35 | ↑ 33% |
| Impressões | [preencher] | [preencher] | — |
| Novos seguidores | [preencher] | [preencher] | — |

> 💡 **Insight:** O case DHL (67 curtidas) performou 91% acima da média anterior. Cases com dados concretos de projeto engajam significativamente mais que posts institucionais (28 curtidas). Recomendação: priorizar pilar Cases/Prova Social com números reais.

### Instagram
| Métrica | Esta semana | Semana anterior | Variação |
|---|---|---|---|
| Posts publicados | 2 | 1 | ↑ 100% |
| Alcance (total) | 2.090 | 750 | ↑ 179% |
| Alcance (média/post) | 1.045 | 750 | ↑ 39% |
| Engajamento | [preencher] | [preencher] | — |
| Novos seguidores | [preencher] | [preencher] | — |

> 💡 **Insight:** Carrossel do case Pandora (1.200 alcance) performou 35% melhor que dicas de retrofit (890). Cases visuais com storytelling de antes/depois têm maior potencial de alcance orgânico no Instagram.

---

## ✅ Destaques da Semana
1. Case DHL no LinkedIn — melhor post do mês com 67 curtidas
2. Frequência de publicação aumentou 67% (de 3 para 5 publicações)
3. Carrossel Pandora atingiu 1.200 de alcance — novo benchmark para IG

---

## ⚠️ Pontos de Atenção
- Post institucional teve engajamento baixo (28 curtidas). Considerar reformular abordagem institucional para incluir dados ou storytelling.
- Dados de impressões e seguidores não coletados — implementar tracking semanal.

---

## 📌 Conteúdos Publicados

| # | Data | Canal | Tema | Pilar | Performance |
|---|---|---|---|---|---|
| 1 | Semana 10 | LinkedIn | Método Agio | Institucional | 45 curtidas |
| 2 | Semana 10 | LinkedIn | Case DHL | Cases/Prova Social | 67 curtidas ⭐ |
| 3 | Semana 10 | LinkedIn | Institucional | Institucional | 28 curtidas |
| 4 | Semana 10 | Instagram | Case Pandora (carrossel) | Cases/Prova Social | 1.200 alcance ⭐ |
| 5 | Semana 10 | Instagram | Dicas retrofit (carrossel) | Técnico/Educacional | 890 alcance |

---

## 🎯 Próximos Passos (Semana 10/03 a 16/03)

- [ ] Publicar case Hyatt no LinkedIn (narrativa: Caos→Previsibilidade) — Marketing — 14/03
- [ ] Criar carrossel IG sobre os 5 Pilares do Método Agio — Marketing — 13/03
- [ ] Implementar tracking semanal de impressões e seguidores — Marketing — 12/03
- [ ] Avaliar reformulação de posts institucionais (incluir dados) — Marketing — 16/03
