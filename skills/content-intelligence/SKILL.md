---
name: content-intelligence
department: Marketing
description: Gera relatórios de inteligência de conteúdo com base em links, insumos textuais e contexto de campanhas. Use quando o usuário pedir análise, insights ou relatório semanal de conteúdo.
metadata:
  author: "Nil Moraes"
  version: "0.2.0"
  category: "marketing-automation"
---

# Content Intelligence

## Instructions

### Goal

- Analisar fontes de conteúdo (posts de concorrentes, artigos do setor AEC, tendências de mercado, performance de canais) e produzir relatórios de inteligência acionáveis para o marketing da Agio.
- Identificar gaps de conteúdo, oportunidades de posicionamento e tendências que a Agio pode explorar.
- Conectar cada insight às 5 Narrativas Agio e aos pilares de conteúdo para facilitar a produção de peças.

### Required Inputs

Perguntar um de cada vez. Aceitar qualquer combinação — a skill se adapta ao que o usuário fornecer.

1. **Tipo de análise** — Relatório semanal, análise de concorrente, tendência de mercado, auditoria de conteúdo próprio, análise de performance?
2. **Fontes/insumos** — Links de posts, artigos, URLs de perfis, textos colados, screenshots, dados de analytics, ou "use o que você sabe sobre o setor".
3. **Foco da análise (opcional)** — Segmento específico (varejo, hotelaria, corporativo), canal (LinkedIn, Instagram), persona, ou tema (retrofit, facilities, turnkey).
4. **Período (opcional)** — Semana atual, último mês, trimestre, ou período específico.
5. **Output desejado (opcional)** — Relatório completo, resumo executivo, lista de oportunidades, calendário de ideias.

### Workflow

1. **Receber e catalogar insumos.** Listar todas as fontes fornecidas pelo usuário. Classificar cada uma:
   - Conteúdo de concorrente
   - Artigo/notícia do setor
   - Post próprio da Agio
   - Dado de performance (analytics)
   - Tendência/pesquisa de mercado
   - Outro

2. **Analisar cada fonte individualmente.** Para cada item:
   - **Tema central:** Qual assunto aborda?
   - **Ângulo/posicionamento:** Como o autor se posiciona?
   - **Engajamento (se visível):** Curtidas, comentários, compartilhamentos.
   - **Tom e linguagem:** Técnico? Comercial? Institucional? Agressivo?
   - **Pontos fortes:** O que funciona bem nesse conteúdo?
   - **Pontos fracos:** O que está genérico, desatualizado ou mal posicionado?
   - **Relevância para Agio:** Esse conteúdo compete com nosso posicionamento? Podemos fazer melhor?

3. **Mapear landscape competitivo.** Se houver conteúdo de concorrentes:
   - Identificar quais narrativas eles estão usando (mesmo que inconscientemente).
   - Comparar com as 5 Narrativas Agio — onde há sobreposição? Onde há espaço vazio?
   - Notar termos e posicionamento: estão se vendendo como "construtora"? Como "empresa de engenharia"? Isso é oportunidade para a Agio se diferenciar.

4. **Identificar tendências.** Cruzar as fontes e detectar padrões:
   - Temas recorrentes no setor AEC (retrofit, sustentabilidade, ESG, BIM, facilities management)
   - Formatos que estão performando (carrosséis, vídeos curtos, artigos long-form)
   - Temas sazonais ou gatilhos de mercado (feiras, regulamentações, dados econômicos)

5. **Detectar gaps de conteúdo.** Comparar o que o mercado está falando com o que a Agio está (ou não está) publicando:
   - Temas que concorrentes abordam e a Agio não
   - Temas que ninguém aborda e a Agio tem autoridade para liderar
   - Formatos que a Agio não explora mas que performam bem no setor
   - Personas subatendidas no conteúdo atual

6. **Gerar oportunidades.** Para cada gap ou tendência identificada, criar uma oportunidade acionável:
   - **Tema sugerido:** Título ou ângulo
   - **Narrativa Agio:** Qual das 5 se aplica
   - **Pilar de conteúdo:** Técnico, Case, Institucional, Mercado ou Comercial
   - **Canal recomendado:** LinkedIn, Instagram, e-mail, etc.
   - **Persona-alvo:** Para quem falar
   - **Urgência:** Alta (tendência quente/timing), Média (relevante mas sem deadline), Baixa (evergreen)

7. **Sintetizar insights.** Condensar a análise em 3-5 insights principais. Cada insight deve:
   - Ser acionável (não apenas observação — deve levar a uma ação)
   - Conectar-se a uma narrativa Agio
   - Ter evidência das fontes analisadas

8. **Gerar recomendações.** Para cada insight, propor ação concreta:
   - Que peça criar (post, carrossel, artigo, e-mail)
   - Com qual skill do sistema (copy-generator, content-transformation, briefing-generator)
   - Em qual timeline (esta semana, próxima semana, este mês)

9. **Compilar relatório.** Montar no formato do Output Template.

10. **Conectar com calendário.** Se o usuário mantém calendário editorial, sugerir onde encaixar as oportunidades identificadas.

### Anti-patterns

- **Nunca entregar análise puramente descritiva.** "O concorrente postou sobre retrofit" não é insight. "O concorrente postou sobre retrofit focando em custo, mas ignorou prazo — a Agio pode ocupar esse ângulo com a narrativa Caos→Previsibilidade" é insight.
- **Nunca analisar sem conectar às Narrativas Agio.** Toda análise deve mapear de volta ao posicionamento da empresa.
- **Nunca recomendar conteúdo genérico.** "Postar mais sobre engenharia" não é recomendação. "Criar carrossel no Instagram sobre o Pilar 2 do Método Agio (Obra Intelectual) usando o case DHL como exemplo" é recomendação.
- **Nunca ignorar o que a Agio já fez.** Se o usuário forneceu conteúdo próprio, a análise deve considerar o que já foi coberto para evitar repetição.
- **Nunca fabricar dados de engajamento.** Se não tem acesso a métricas reais, dizer explicitamente e basear a análise em conteúdo/posicionamento.
- **Nunca recomendar usar vocabulário proibido.** Se um concorrente usa "construtora" e funciona para ele, isso não significa que a Agio deve fazer o mesmo.
- **Nunca entregar oportunidades sem priorização.** Sem urgência/prioridade, o relatório vira lista de desejos.

### Output Template

```
# Relatório de Inteligência de Conteúdo

**Período:** [Data/semana/mês]
**Fontes analisadas:** [X fontes]
**Analista:** Agio Agent — Content Intelligence

---

## Resumo Executivo
[3-5 frases: principais descobertas e recomendação #1]

---

## Análise de Fontes

### Fonte 1: [Título/Descrição]
- **Tipo:** [Concorrente | Setor | Próprio | Performance]
- **Tema:** [Assunto central]
- **Posicionamento:** [Como se posiciona]
- **Ponto forte:** [O que funciona]
- **Ponto fraco:** [O que falta ou falha]
- **Relevância Agio:** [Como se conecta ao nosso posicionamento]

[Repetir para cada fonte]

---

## Tendências Identificadas
1. **[Tendência]** — [Evidência nas fontes] — Impacto para Agio: [Alto/Médio/Baixo]
2. ...

---

## Gaps de Conteúdo
| Gap | Evidência | Narrativa Agio | Oportunidade |
|---|---|---|---|
| [Tema não coberto] | [Fonte/dado] | [Narrativa] | [Ação sugerida] |

---

## Oportunidades Priorizadas

### 🔴 Alta prioridade (esta semana)
| # | Tema | Narrativa | Canal | Persona | Skill |
|---|---|---|---|---|---|
| 1 | [Tema] | [Narrativa] | [Canal] | [Persona] | [copy-generator] |

### 🟡 Média prioridade (este mês)
| # | Tema | Narrativa | Canal | Persona | Skill |
|---|---|---|---|---|---|
| 1 | [Tema] | [Narrativa] | [Canal] | [Persona] | [skill] |

### 🟢 Baixa prioridade (backlog)
| # | Tema | Narrativa | Canal | Persona | Skill |
|---|---|---|---|---|---|

---

## Insights Acionáveis
1. **[Insight]** → Ação: [O que fazer] → Skill: [Qual usar]
2. ...

---

## Recomendações para Calendário
| Semana | Tema | Canal | Formato | Narrativa |
|---|---|---|---|---|
| [Semana X] | [Tema] | [Canal] | [Formato] | [Narrativa] |
```

### Quality Gate

Antes de entregar, verificar:

- [ ] Cada fonte analisada individualmente com pontos fortes e fracos
- [ ] Tendências identificadas com evidência (não achismo)
- [ ] Gaps conectados a Narrativas Agio
- [ ] Oportunidades priorizadas (Alta/Média/Baixa) com skill recomendada
- [ ] Insights são acionáveis (levam a uma ação concreta, não apenas observação)
- [ ] Nenhuma recomendação usa vocabulário proibido
- [ ] Análise considera o que a Agio já publicou (se informação disponível)
- [ ] Output segue o template estruturado
- [ ] Recomendações mapeiam para skills do sistema (copy-generator, briefing-generator, etc.)

### Example

**Input do usuário:**

> Analisa esses 3 posts de concorrentes que vi no LinkedIn essa semana e me diz o que a gente pode fazer de diferente:
>
> 1. Post da Método Engenharia sobre entrega de escritório corporativo — "Mais um projeto entregue com excelência! 2.000m² de pura qualidade."
> 2. Post da Arccon sobre retrofit de hotel — "Retrofit completo do lobby do Hotel X. Inovação e tecnologia a serviço da hotelaria."
> 3. Artigo da revista Construção Mercado sobre tendência de retrofit corporativo pós-pandemia.

---

**Output:**

# Relatório de Inteligência de Conteúdo

**Período:** Semana de 10/03/2026
**Fontes analisadas:** 3
**Analista:** Agio Agent — Content Intelligence

---

## Resumo Executivo
Os concorrentes diretos (Método, Arccon) estão publicando sobre projetos entregues, mas com linguagem genérica e sem diferenciação ("excelência", "inovação"). A revista Construção Mercado sinaliza retrofit corporativo como tendência consolidada. A Agio tem oportunidade imediata de se posicionar com linguagem diferenciada (dados concretos, Método Agio) enquanto concorrentes usam superlativos vazios.

---

## Análise de Fontes

### Fonte 1: Post Método Engenharia — Escritório corporativo
- **Tipo:** Concorrente
- **Tema:** Entrega de projeto corporativo
- **Posicionamento:** Genérico — foco em "entregar com excelência"
- **Ponto forte:** Publicou sobre entrega recente (timing bom)
- **Ponto fraco:** Zero dados (sem prazo, sem metragem detalhada, sem NPS). "Excelência" e "qualidade" são vazios. Qualquer empresa poderia assinar esse post.
- **Relevância Agio:** Oportunidade clara. Se a Agio postar um case similar COM dados (prazo, desvio orçamentário, NPS), a diferenciação será brutal.

### Fonte 2: Post Arccon — Retrofit de hotel
- **Tipo:** Concorrente
- **Tema:** Retrofit hoteleiro
- **Posicionamento:** Tecnológico — "inovação e tecnologia"
- **Ponto forte:** Segmento relevante (hotelaria é forte para Agio também)
- **Ponto fraco:** "Inovação" sem explicar qual inovação. Não menciona se o hotel operou durante o retrofit. Tom de release de imprensa.
- **Relevância Agio:** A Agio tem o case Hyatt com dados reais. Post comparativo (sem citar concorrente) mostrando O QUE significa retrofit hoteleiro com dados seria devastador.

### Fonte 3: Artigo Construção Mercado — Retrofit corporativo pós-pandemia
- **Tipo:** Setor
- **Tema:** Tendência de retrofit corporativo
- **Posicionamento:** Jornalístico/analítico
- **Ponto forte:** Dados de mercado sobre crescimento da demanda por retrofit
- **Ponto fraco:** Genérico, não cita players específicos
- **Relevância Agio:** Oportunidade de thought-leadership. A Agio pode se posicionar como voz autorizada nessa tendência, usando cases reais como evidência.

---

## Tendências Identificadas
1. **Retrofit corporativo em alta** — Artigo da Construção Mercado confirma. Impacto para Agio: **Alto** (segmento core).
2. **Concorrentes comunicam sem dados** — Método e Arccon usam linguagem vazia. Impacto para Agio: **Alto** (diferenciação imediata).

---

## Gaps de Conteúdo
| Gap | Evidência | Narrativa Agio | Oportunidade |
|---|---|---|---|
| Ninguém publica NPS de projeto | 0 de 2 concorrentes citam NPS | Genérico→Personalizado | Post "O que NPS 92.7% significa na prática" |
| Retrofit hoteleiro sem dados de operação | Arccon não menciona continuidade operacional | Caos→Previsibilidade | Case Hyatt com foco em "zero interrupção" |
| Tendência de retrofit sem voz autorizada | Artigo genérico sem player posicionado | Problema→Solução | Artigo/post posicionando Agio como referência |

---

## Oportunidades Priorizadas

### 🔴 Alta prioridade (esta semana)
| # | Tema | Narrativa | Canal | Persona | Skill |
|---|---|---|---|---|---|
| 1 | Case Hyatt — retrofit hoteleiro com dados | Caos→Previsibilidade | LinkedIn | C-Level | copy-generator |
| 2 | "O que NPS 92.7% significa" — thought-leadership | Genérico→Personalizado | LinkedIn | Facilities | copy-generator |

### 🟡 Média prioridade (este mês)
| # | Tema | Narrativa | Canal | Persona | Skill |
|---|---|---|---|---|---|
| 1 | Carrossel "Retrofit corporativo: o que avaliar" | Complexidade→Simplicidade | Instagram | Facilities | copy-generator + image-prompt-generator |
| 2 | E-mail nurture com case + artigo setor | Problema→Solução | E-mail | C-Level | content-transformation |

---

## Insights Acionáveis
1. **Concorrentes não usam dados — a Agio deve dobrar a aposta em números concretos.** → Ação: Todo post de case deve ter pelo menos 3 dados (prazo, desvio, NPS) → Skill: copy-generator
2. **Retrofit hoteleiro é território aberto — Arccon comunicou fraco.** → Ação: Publicar case Hyatt com profundidade esta semana → Skill: copy-generator
3. **Tendência de retrofit corporativo confirmada pela mídia setorial.** → Ação: Criar série de 3 posts posicionando a Agio como referência → Skill: briefing-generator
