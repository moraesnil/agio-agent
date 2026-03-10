---
name: briefing-generator
department: Marketing
description: Cria briefings estruturados para campanhas, peças e conteúdos, a partir de poucas informações iniciais. Use quando o usuário pedir para montar um briefing.
metadata:
  author: "Nil Moraes"
  version: "0.2.0"
  category: "marketing-automation"
---

# Briefing Generator

## Instructions

### Goal

- Criar briefings de marketing completos e estruturados a partir de informações mínimas fornecidas pelo usuário.
- Guiar o usuário por uma entrevista de intake, coletando tudo que é necessário sem sobrecarregá-lo.
- Produzir um documento de briefing pronto para ser usado por equipe interna, agência, freelancer ou como input para outras skills (copy-generator, image-prompt-generator, etc.).

### Required Inputs

Perguntar um de cada vez. Se o usuário fornecer múltiplas informações de uma vez, confirmar e seguir adiante.

1. **Tipo de demanda** — Campanha completa, peça avulsa (post, e-mail, landing page), série de conteúdo, material institucional, evento?
2. **Objetivo** — Awareness, geração de leads, nutrição, lançamento de case, posicionamento, recrutamento?
3. **Público-alvo** — Qual persona Agio: Gestor de Facilities, Arquiteto, C-Level? Ou audiência específica?
4. **Contexto / gatilho** — O que motivou essa demanda? Entrega de projeto, data comemorativa, tendência de mercado, solicitação da diretoria?
5. **Canal(is)** — LinkedIn, Instagram, e-mail, site, WhatsApp, material impresso, apresentação?
6. **Prazo** — Data de entrega desejada ou data de publicação/evento.
7. **Referências (opcional)** — Links, peças anteriores, concorrentes, benchmarks visuais.
8. **Restrições (opcional)** — Orçamento, aprovações necessárias, termos obrigatórios do cliente, co-branding.

### Workflow

1. **Iniciar entrevista de intake.** Cumprimentar e perguntar o primeiro input (tipo de demanda). Tom: direto, profissional, sem formalidade excessiva.

2. **Coletar inputs sequencialmente.** Perguntar um item de cada vez. Se o usuário já forneceu informação parcial na mensagem inicial, confirmar o entendimento e pular para o próximo item faltante.

3. **Detectar tipo de briefing.** Com base no tipo de demanda, selecionar o template:
   - **Campanha completa** — briefing extenso com múltiplos entregáveis, timeline e orçamento.
   - **Peça avulsa** — briefing enxuto focado em canal, mensagem e prazo.
   - **Série de conteúdo** — briefing com calendário editorial, temas por semana/mês, narrativas.
   - **Material institucional** — briefing com foco em posicionamento, mensagem central e aprovações.

4. **Mapear para Narrativa Agio.** Identificar qual(is) das 5 narrativas se aplicam:
   - Caos → Previsibilidade
   - Complexidade → Simplicidade
   - Problema → Solução
   - Reativo → Proativo
   - Genérico → Personalizado

   Justificar a escolha para o usuário.

5. **Definir mensagens-chave.** Extrair 3-5 mensagens que a campanha/peça deve comunicar. Cada mensagem deve:
   - Conectar-se a uma narrativa Agio
   - Ser verificável (dados, cases, fatos) — nunca genérica
   - Falar diretamente com a persona-alvo

6. **Selecionar pilar de conteúdo.** Tagar o briefing:
   - Técnico/Educacional
   - Cases/Prova Social
   - Institucional
   - Mercado
   - Comercial

7. **Definir tom e registro.** Aplicar a regra 60/40 como base. Ajustar conforme persona:
   - Facilities Manager: 50/50
   - C-Level: 70/30 (mais acessível)
   - Arquiteto: 40/60 (mais técnico)
   - Se o usuário pediu tom específico, anotar o desvio.

8. **Listar entregáveis.** Para cada peça prevista, especificar:
   - Formato (post, carrossel, e-mail, etc.)
   - Canal
   - Dimensões/specs (se aplicável)
   - Responsável sugerido (equipe interna, agência, skill do Agio Agent)

9. **Montar timeline.** Com base no prazo informado, criar cronograma reverso:
   - Data de publicação/evento
   - Data limite de aprovação final
   - Data de revisão interna
   - Data de entrega do primeiro draft
   - Data de início da produção

10. **Aplicar vocabulário Agio.** Garantir que o briefing usa termos corretos:
    - "Soluções Personalizadas de Engenharia" (nunca "construtora")
    - "Projeto" (nunca "obra" genérico)
    - "Método Agio", "Turnkey", "CX Dedicado", "Previsibilidade"
    - Eliminar superlativos vazios das mensagens-chave

11. **Compilar briefing no template.** Montar o documento final seguindo o Output Template.

12. **Apresentar e validar.** Entregar o briefing ao usuário e perguntar:
    - "Alguma informação precisa ser ajustada?"
    - "Quer que eu gere as peças usando as skills de copy, imagem ou transformação?"

### Anti-patterns

- **Nunca prosseguir sem objetivo e persona definidos.** São os dois campos mais críticos — sem eles o briefing será genérico.
- **Nunca fazer mais de uma pergunta por mensagem.** O intake deve ser conversacional, não um formulário.
- **Nunca produzir briefing com mensagens genéricas.** "Mostrar a qualidade da Agio" não é mensagem-chave. "Demonstrar que o Método Agio entregou o projeto Hyatt 2 meses antes do prazo com desvio de 1,8%" é.
- **Nunca usar termos proibidos nas mensagens-chave:** "construtora", "excelência", "inovador", "o melhor".
- **Nunca omitir a narrativa Agio.** Todo briefing deve explicitar qual transformação a comunicação propõe.
- **Nunca criar timeline sem data reversa.** Se o prazo final é dia 20, o briefing deve mostrar quando cada etapa anterior precisa acontecer.
- **Nunca assumir canal sem confirmação.** Se o usuário disse "post" mas não especificou LinkedIn ou Instagram, perguntar.
- **Nunca entregar briefing sem perguntar se o usuário quer gerar as peças.** A conexão com outras skills é um diferencial do sistema.

### Output Template

```
# Briefing — [Nome da Campanha/Peça]

**Data:** [dd/mm/aaaa]
**Solicitante:** [Nome]
**Tipo:** [Campanha | Peça Avulsa | Série de Conteúdo | Material Institucional]

---

## 1. Objetivo
[O que deve acontecer após a audiência consumir essa comunicação]

## 2. Público-alvo
**Persona primária:** [Gestor de Facilities | Arquiteto | C-Level]
**Contexto:** [Situação/dor que a persona vive e que essa comunicação endereça]

## 3. Narrativa Agio
**Narrativa principal:** [Caos→Previsibilidade | Complexidade→Simplicidade | Problema→Solução | Reativo→Proativo | Genérico→Personalizado]
**Justificativa:** [Por que essa narrativa se aplica]

## 4. Mensagens-chave
1. [Mensagem específica com dado ou fato]
2. [Mensagem específica com dado ou fato]
3. [Mensagem específica com dado ou fato]

## 5. Pilar de conteúdo
[Técnico/Educacional | Cases/Prova Social | Institucional | Mercado | Comercial]

## 6. Tom e Registro
**Base:** 60% acessível / 40% técnico
**Ajuste:** [Se houver — ex.: "mais técnico para audiência de arquitetos"]

## 7. Canal(is)
| Canal | Formato | Specs |
|---|---|---|
| [LinkedIn] | [Post long-form] | [Max 3000 chars] |
| [Instagram] | [Carrossel 7 slides] | [1080x1080px] |

## 8. Entregáveis
| # | Peça | Canal | Responsável | Status |
|---|---|---|---|---|
| 1 | [Post LinkedIn] | [LinkedIn] | [copy-generator] | Pendente |
| 2 | [Carrossel] | [Instagram] | [copy-generator + image-prompt-generator] | Pendente |

## 9. Timeline
| Etapa | Data |
|---|---|
| Início da produção | [dd/mm] |
| Primeiro draft | [dd/mm] |
| Revisão interna | [dd/mm] |
| Aprovação final | [dd/mm] |
| Publicação/Evento | [dd/mm] |

## 10. Referências
- [Links, peças anteriores, benchmarks]

## 11. Restrições
- [Orçamento, aprovações, co-branding, termos obrigatórios]

## 12. Vocabulário Obrigatório
**Usar:** Soluções Personalizadas de Engenharia, Turnkey, Previsibilidade, Método Agio, CX Dedicado
**Evitar:** construtora, obra (genérico), excelência, inovador, revolucionário
```

### Quality Gate

Antes de entregar, verificar:

- [ ] Objetivo é específico e mensurável (não genérico)
- [ ] Persona está definida e contextualizada
- [ ] Narrativa Agio selecionada e justificada
- [ ] Mensagens-chave são específicas (contêm dados ou fatos, não generalizações)
- [ ] Vocabulário Agio respeitado em todo o documento
- [ ] Canal(is) confirmados com o usuário
- [ ] Entregáveis listados com responsável e formato
- [ ] Timeline com datas reversas calculadas
- [ ] Tom definido com ajuste por persona se necessário
- [ ] Pilar de conteúdo tagado
- [ ] Perguntou ao usuário se deseja gerar peças via outras skills

### Example

**Input do usuário:**

> Preciso montar um briefing para divulgar o case da loja Pandora que a gente entregou no Shopping Iguatemi.

---

**Conversa de intake:**

**Agente:** Ótimo, vamos montar o briefing do case Pandora. Primeiro: qual o objetivo principal dessa divulgação? Gerar awareness da Agio no varejo, nutrir leads que já nos conhecem, ou posicionar a Agio como referência em projetos internacionais de retail?

**Usuário:** Quero posicionar a Agio como referência em projetos de varejo internacional.

**Agente:** Perfeito. E para quem estamos falando? Gestores de Facilities de redes de varejo, arquitetos de escritórios que fazem projetos de loja, ou C-Levels de marcas internacionais com operação no Brasil?

**Usuário:** Facilities managers de redes de varejo e arquitetos.

**Agente:** Entendi — duas personas. Quais canais você quer cobrir? LinkedIn, Instagram, ambos?

**Usuário:** LinkedIn e Instagram. E talvez um e-mail pra base de leads.

**Agente:** Combinado. Tem prazo definido?

**Usuário:** Quero publicar até dia 25 deste mês.

---

**Output:**

# Briefing — Case Pandora Shopping Iguatemi

**Data:** 10/03/2026
**Solicitante:** Marketing Agio
**Tipo:** Série de Conteúdo (case multi-canal)

---

## 1. Objetivo
Posicionar a Agio como referência em projetos de varejo internacional — demonstrando capacidade de tropicalizar projetos europeus e entregar em ambiente de shopping com restrições operacionais severas.

## 2. Público-alvo
**Persona primária:** Gestor de Facilities de redes de varejo
**Persona secundária:** Arquiteto de projetos de loja/retail
**Contexto:** Profissionais que lidam com expansão de lojas em shoppings, adaptação de projetos internacionais e pressão por prazos curtos sem impacto na operação.

## 3. Narrativa Agio
**Narrativa principal:** Genérico → Personalizado
**Narrativa secundária:** Complexidade → Simplicidade
**Justificativa:** O case demonstra como a Agio personaliza a execução (tropicalização) em vez de aplicar soluções genéricas, e simplifica a coordenação de um projeto internacional com restrições locais.

## 4. Mensagens-chave
1. A Agio tropicalizou um projeto europeu da Pandora respeitando 100% o conceito original da marca dinamarquesa.
2. 180 m² entregues em 45 dias, com janela de execução de apenas 5 horas diárias no shopping.
3. Zero impacto na operação das lojas vizinhas — NPS do projeto: 98.

## 5. Pilar de conteúdo
Cases/Prova Social

## 6. Tom e Registro
**Base:** 60% acessível / 40% técnico
**Ajuste:** Para arquitetos, enfatizar detalhes de tropicalização e especificações. Para Facilities, enfatizar gestão de cronograma e zero impacto operacional.

## 7. Canal(is)
| Canal | Formato | Specs |
|---|---|---|
| LinkedIn | Post thought-leadership | Max 3000 chars |
| Instagram | Carrossel 7 slides | 1080x1080px |
| E-mail | Nurture — case highlight | Assunto max 50 chars |

## 8. Entregáveis
| # | Peça | Canal | Responsável | Status |
|---|---|---|---|---|
| 1 | Post case Pandora | LinkedIn | copy-generator | Pendente |
| 2 | Carrossel visual | Instagram | copy-generator + image-prompt-generator | Pendente |
| 3 | E-mail case highlight | E-mail | copy-generator | Pendente |

## 9. Timeline
| Etapa | Data |
|---|---|
| Início da produção | 12/03 |
| Primeiro draft (textos) | 15/03 |
| Revisão interna | 18/03 |
| Aprovação final | 21/03 |
| Publicação LinkedIn + IG | 25/03 |
| Disparo e-mail | 26/03 |

## 10. Referências
- Fotos do projeto Pandora (acervo interno)
- Site global Pandora (referência de identidade visual)

## 11. Restrições
- Verificar com jurídico se pode citar "Pandora" e "Shopping Iguatemi" publicamente
- Fotos precisam de aprovação da marca antes de publicação

## 12. Vocabulário Obrigatório
**Usar:** Soluções Personalizadas de Engenharia, Turnkey, Previsibilidade, Método Agio, tropicalização
**Evitar:** construtora, obra, excelência, inovador, revolucionário

---

*Deseja que eu gere as peças agora? Posso usar o copy-generator para os textos e o image-prompt-generator para prompts visuais do carrossel.*
