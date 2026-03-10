---
name: input-triage
department: Marketing
description: Classifica e organiza inputs soltos do usuário (ideias, notas, links) em categorias de ação — conteúdo, pesquisa, briefing, etc. Use quando o usuário mandar um dump de informações sem pedido claro.
metadata:
  author: "Nil Moraes"
  version: "0.2.0"
  category: "marketing-automation"
---

# Input Triage

## Instructions

### Goal

- Receber qualquer tipo de input solto (ideias, notas, links, transcrições de áudio, dumps de informação) e classificá-los em categorias de ação.
- Rotear cada item para a skill mais adequada do sistema ou sinalizar para ação manual.
- Entregar uma lista organizada com prioridade, próximo passo e skill recomendada para cada item.

### Required Inputs

Esta skill aceita qualquer formato. Não há inputs obrigatórios além do dump do usuário. Se o contexto for insuficiente, perguntar:

1. **O dump em si** — Texto colado, lista de bullets, links, notas de voz transcritas, screenshot descrito, ou qualquer combinação.
2. **Contexto (opcional)** — "Isso veio de uma reunião sobre...", "Estou planejando a campanha de...", "São ideias soltas da semana".
3. **Urgência geral (opcional)** — "Preciso resolver isso hoje", "É planejamento do mês", "Só organizando backlog".

### Workflow

1. **Receber o dump.** Aceitar qualquer formato sem julgamento. Não pedir formatação — o propósito da skill é justamente processar informação desorganizada.

2. **Segmentar em itens discretos.** Dividir o dump em itens individuais. Cada item deve ser uma unidade acionável. Regras:
   - Uma ideia = um item (mesmo que esteja misturada com outra na mesma frase)
   - Um link = um item
   - Uma instrução/pedido = um item
   - Se um bloco é ambíguo, criar item com flag "⚠️ Ambíguo — confirmar com usuário"

3. **Classificar cada item.** Atribuir uma categoria de ação:

   | Categoria | Descrição | Skill recomendada |
   |---|---|---|
   | **Conteúdo novo** | Ideia para post, artigo, peça nova | copy-generator |
   | **Transformação** | Adaptar conteúdo existente para outro formato/canal | content-transformation |
   | **Briefing** | Campanha, série, peça complexa que precisa de planejamento | briefing-generator |
   | **Inteligência** | Análise de concorrente, tendência, pesquisa de mercado | content-intelligence |
   | **Imagem/Visual** | Necessidade de imagem, prompt, referência visual | image-prompt-generator |
   | **Relatório/Notion** | Documentação, relatório, registro no Notion | notion-report-builder |
   | **Ação manual** | Requer ação humana (ligar para alguém, aprovar algo, comprar) | — (flag para usuário) |
   | **Referência** | Informação para guardar, não requer ação imediata | — (arquivar) |
   | **Descarte** | Duplicata, obsoleto, irrelevante | — (remover) |

4. **Atribuir prioridade.** Para cada item:
   - **🔴 Urgente** — Tem deadline esta semana, é reativo a algo externo, ou bloqueia outras ações.
   - **🟡 Planejado** — Relevante, deve ser feito este mês, sem urgência imediata.
   - **🟢 Backlog** — Boa ideia, mas sem prazo. Guardar para planejamento futuro.

5. **Enriquecer com contexto Agio.** Para itens de conteúdo/marketing, conectar ao ecossistema Agio:
   - Qual **Narrativa Agio** se aplica? (Caos→Previsibilidade, Complexidade→Simplicidade, etc.)
   - Qual **pilar de conteúdo**? (Técnico, Cases, Institucional, Mercado, Comercial)
   - Qual **persona-alvo**? (Gestor de Facilities, Arquiteto, C-Level)
   - Qual **canal** faz mais sentido? (LinkedIn, Instagram, e-mail, etc.)

6. **Detectar dependências e agrupamentos.** Identificar itens que se conectam:
   - "Ideia de post sobre case Hyatt" + "Preciso de fotos do Hyatt" → agrupar como campanha
   - "Analisar concorrente X" + "Criar post diferenciado" → sequência (inteligência primeiro, depois conteúdo)

7. **Compilar tabela de triagem.** Montar o output organizado no template.

8. **Sugerir fluxo de execução.** Após a tabela, recomendar a ordem de execução:
   - Itens urgentes primeiro
   - Itens que dependem de outros (ex.: inteligência antes de conteúdo)
   - Itens que podem ser feitos em paralelo
   - Itens de backlog para próximo ciclo de planejamento

9. **Oferecer execução.** Perguntar ao usuário:
   - "Quer que eu comece pelo item #1? Posso usar o [skill] para executar."
   - "Quer que eu gere um briefing para os itens agrupados?"
   - "Os itens de ação manual estão sinalizados — precisa de ajuda com algum?"

### Anti-patterns

- **Nunca pedir que o usuário organize antes de enviar.** O propósito desta skill é processar bagunça. Se o input é caótico, ótimo — é para isso que ela existe.
- **Nunca ignorar itens ambíguos.** Se não está claro o que o usuário quis dizer, criar o item com flag de ambiguidade e perguntar. Não descartar silenciosamente.
- **Nunca atribuir tudo como "Conteúdo novo".** Triagem preguiçosa é pior que nenhuma triagem. Cada item deve ter a categoria mais específica possível.
- **Nunca entregar sem prioridade.** Lista sem prioridade é apenas outra lista desorganizada — o oposto do propósito da skill.
- **Nunca sugerir skills que não existem no sistema.** Rotear apenas para: copy-generator, briefing-generator, content-intelligence, content-transformation, image-prompt-generator, notion-report-builder. Se nenhuma se aplica, marcar como ação manual.
- **Nunca misturar a triagem com a execução.** Primeiro organiza, apresenta ao usuário, e SÓ DEPOIS oferece executar. Não sair executando sem validação.
- **Nunca descartar itens sem sinalizar.** Se algo parece irrelevante, marcar como "Descarte (sugestão)" e deixar o usuário confirmar.

### Output Template

```
# Triagem de Inputs

**Data:** [dd/mm/aaaa]
**Itens recebidos:** [X]
**Itens classificados:** [X]

---

## Tabela de Triagem

| # | Item | Categoria | Skill | Prioridade | Narrativa Agio | Próximo passo |
|---|---|---|---|---|---|---|
| 1 | [Descrição do item] | [Categoria] | [Skill] | [🔴/🟡/🟢] | [Narrativa] | [Ação concreta] |
| 2 | ... | ... | ... | ... | ... | ... |

---

## Agrupamentos Detectados
- **Grupo A — [Nome]:** Itens #X, #Y, #Z → [Sugestão de tratamento conjunto]

---

## Itens Ambíguos (confirmar)
- Item #X: "[texto original]" → Interpretei como [interpretação]. Correto?

---

## Fluxo de Execução Sugerido
1. **Agora:** [Item(ns) urgentes]
2. **Esta semana:** [Item(ns) planejados]
3. **Backlog:** [Item(ns) para depois]

---

## Ações Manuais Necessárias
- [ ] [Item que requer ação humana — descrição + responsável sugerido]
```

### Quality Gate

Antes de entregar, verificar:

- [ ] Cada item do dump foi classificado (nenhum ignorado)
- [ ] Categorias são específicas (não tudo como "Conteúdo novo")
- [ ] Prioridade atribuída a todos os itens
- [ ] Skills recomendadas existem no sistema
- [ ] Itens ambíguos sinalizados com flag
- [ ] Dependências e agrupamentos identificados
- [ ] Fluxo de execução sugerido com ordem lógica
- [ ] Ações manuais separadas e claras
- [ ] Não executou nada — apenas organizou e apresentou
- [ ] Ofereceu executar após apresentar a triagem

### Example

**Input do usuário:**

> me ajuda a organizar isso aqui:
> - vi um post da Método Engenharia no LinkedIn falando de projeto corporativo, muito genérico
> - tive uma ideia: fazer um carrossel mostrando os 5 pilares do Método Agio
> - preciso mandar o relatório semanal pro Diogo até sexta
> - alguém me mandou esse link sobre tendência de retrofit https://exemplo.com/retrofit-2026
> - a Pandora pediu pra gente não usar o nome deles sem aprovação prévia
> - quero fazer um post sobre o case do Hyatt mas preciso de fotos boas
> - tem que renovar o contrato do Canva semana que vem

---

**Output:**

# Triagem de Inputs

**Data:** 10/03/2026
**Itens recebidos:** 7
**Itens classificados:** 7

---

## Tabela de Triagem

| # | Item | Categoria | Skill | Prioridade | Narrativa Agio | Próximo passo |
|---|---|---|---|---|---|---|
| 1 | Post da Método Engenharia — análise de concorrente | Inteligência | content-intelligence | 🟡 Planejado | — | Analisar post e identificar gaps para Agio |
| 2 | Carrossel 5 Pilares do Método Agio | Conteúdo novo | copy-generator + image-prompt-generator | 🟡 Planejado | Genérico→Personalizado | Gerar copy dos 7 slides + prompts visuais |
| 3 | Relatório semanal para Diogo (sexta) | Relatório/Notion | notion-report-builder | 🔴 Urgente | — | Montar relatório semanal de marketing |
| 4 | Link sobre tendência de retrofit | Inteligência | content-intelligence | 🟡 Planejado | Caos→Previsibilidade | Incluir na próxima análise semanal de conteúdo |
| 5 | Restrição de uso do nome Pandora | Referência | — | 🔴 Urgente | — | Registrar como restrição. Revisar materiais que citam Pandora |
| 6 | Post case Hyatt (precisa de fotos) | Conteúdo novo | briefing-generator | 🟡 Planejado | Caos→Previsibilidade | Montar briefing. Bloqueia: obter fotos (ação manual) |
| 7 | Renovação contrato Canva | Ação manual | — | 🟡 Planejado | — | Renovar até semana que vem |

---

## Agrupamentos Detectados
- **Grupo A — Inteligência competitiva:** Itens #1 e #4 → Podem ser analisados juntos em um relatório de inteligência semanal usando content-intelligence.
- **Grupo B — Case Hyatt:** Item #6 depende de fotos (ação manual). Após obter fotos, usar briefing-generator → copy-generator → image-prompt-generator.

---

## Itens Ambíguos (confirmar)
- Nenhum nesta triagem.

---

## Fluxo de Execução Sugerido
1. **Agora (urgente):** Item #3 — relatório semanal (deadline sexta). Item #5 — registrar restrição Pandora.
2. **Esta semana:** Item #1 + #4 — análise de inteligência (agrupar). Item #2 — carrossel Método Agio.
3. **Quando fotos disponíveis:** Item #6 — briefing do case Hyatt.
4. **Ação manual (delegar):** Item #7 — renovar Canva.

---

## Ações Manuais Necessárias
- [ ] Obter fotos do projeto Hyatt para o case (item #6) — solicitar ao time de engenharia
- [ ] Renovar contrato do Canva (item #7) — responsável: administrativo
- [ ] Confirmar com jurídico a restrição de uso do nome Pandora (item #5) — verificar escopo

---

*Quer que eu comece pelo relatório semanal (#3)? Posso usar o notion-report-builder agora.*
