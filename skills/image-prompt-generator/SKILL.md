---
name: image-prompt-generator
department: Marketing
description: Gera prompts detalhados para modelos de imagem (Midjourney, DALL-E, Stable Diffusion) a partir de contexto de campanha, referências estéticas e objetivos de peça. Use quando o usuário pedir prompts para gerar imagens.
metadata:
  author: "Nil Moraes"
  version: "0.2.0"
  category: "marketing-automation"
---

# Image Prompt Generator

## Instructions

### Goal

- Gerar prompts detalhados e prontos para uso em modelos de geração de imagem (Midjourney, DALL-E, Stable Diffusion) alinhados à identidade visual da Agio.
- Cada prompt deve considerar: contexto de campanha, canal de destino, estética arquitetônica/engineering da Agio e requisitos técnicos do modelo.
- Entregar 3 variações por pedido, com parâmetros técnicos e negative prompts.

### Required Inputs

Perguntar um de cada vez.

1. **Objetivo da imagem** — Para que será usada? Post LinkedIn, carrossel Instagram, capa de e-mail, banner de landing page, apresentação, material impresso?
2. **Contexto/tema** — Qual projeto, campanha ou conceito a imagem deve representar? (ex.: "case Pandora", "Método Agio", "retrofit hoteleiro", "equipe em campo")
3. **Estilo desejado (opcional)** — Fotografia arquitetônica, render realista, flat design, minimalista, editorial? Se não informado, usar o padrão Agio.
4. **Modelo de IA (opcional)** — Midjourney v6, DALL-E 3, Stable Diffusion XL? Se não informado, gerar para Midjourney v6 como padrão.
5. **Aspect ratio (opcional)** — Se não informado, inferir do canal: LinkedIn (1200x627 → 16:9), Instagram feed (1:1), Instagram stories (9:16), banner (21:9).
6. **Elementos obrigatórios ou proibidos (opcional)** — Ex.: "deve ter a cor vermelha Agio", "sem pessoas", "com planta baixa".

### Workflow

1. **Confirmar inputs.** Garantir que objetivo e contexto estão claros. Se o modelo de IA não foi especificado, usar Midjourney v6 como padrão.

2. **Definir estilo visual Agio.** A identidade visual da Agio segue estas diretrizes:
   - **Fotografia arquitetônica:** Linhas limpas, iluminação natural ou controlada, espaços acabados ou em transformação (before/after).
   - **Paleta:** Tons neutros (cinza, branco, concreto) com acentos em vermelho Agio (#e83c3c). Evitar saturação excessiva.
   - **Composição:** Clean, geométrica, com profundidade. Preferir ângulos que mostrem escala e acabamento.
   - **Pessoas (quando presentes):** Em contexto real de trabalho, sem poses artificiais. Equipamentos de segurança autênticos, não de catálogo.
   - **Mood:** Profissional, confiável, preciso. Nem frio/corporativo demais, nem casual/startup.

3. **Mapear requisitos técnicos do canal.**
   | Canal | Aspect Ratio | Resolução min. | Notas |
   |---|---|---|---|
   | LinkedIn post | 1.91:1 ou 1:1 | 1200x627 ou 1080x1080 | Imagens claras, alto contraste |
   | Instagram feed | 1:1 | 1080x1080 | Visual-first, funcionar em thumbnail |
   | Instagram stories | 9:16 | 1080x1920 | Full-bleed, texto overlay friendly |
   | Instagram carrossel | 1:1 | 1080x1080 | Consistência visual entre slides |
   | E-mail header | 3:1 | 600x200 | Leve, carrega rápido |
   | Landing page hero | 21:9 | 1920x823 | Impactante, suporta texto overlay |
   | Apresentação | 16:9 | 1920x1080 | Fundo limpo, não compete com texto |

4. **Construir prompt principal.** Estrutura do prompt:
   ```
   [Sujeito principal], [ambiente/cenário], [iluminação], [composição/ângulo], [mood/atmosfera], [detalhes técnicos], [estilo artístico] --ar [ratio] --v 6 [flags adicionais]
   ```

   Regras de construção:
   - Começar com o sujeito mais importante
   - Ser específico sobre materiais e acabamentos (concreto aparente, vidro, aço, madeira de demolição — não apenas "bonito")
   - Especificar iluminação (natural lateral, golden hour, luz difusa overhead, spotlight)
   - Incluir escala humana quando relevante (pessoa caminhando ao fundo, não posando)
   - Prompts em inglês (modelos performam melhor em inglês)

5. **Construir negative prompt.** Listar explicitamente o que NÃO deve aparecer:
   - Estética stock photo genérica
   - Pessoas com sorriso artificial posando para câmera
   - Hard hats amarelos de catálogo (se pessoas presentes, usar EPIs realistas)
   - Cores oversaturadas, filtros Instagram, HDR excessivo
   - Renders de baixa qualidade com iluminação flat
   - Logos, textos ou watermarks na imagem
   - Elementos de "construtora" genérica (betoneira, pedreiro com pá, canteiro sujo)

6. **Gerar 3 variações.** Cada variação deve explorar um ângulo diferente:
   - **Variação A:** Ângulo principal — a representação mais direta do pedido.
   - **Variação B:** Ângulo artístico — composição mais ousada, close-up de detalhe, ou perspectiva inusitada.
   - **Variação C:** Ângulo conceitual — mais abstrato, focando no mood/narrativa (ex.: "transformação" mostrada como before/after, "previsibilidade" como geometria perfeita).

7. **Adicionar flags específicas do modelo.**
   - **Midjourney v6:** `--ar`, `--v 6`, `--s` (stylize 0-1000, padrão 100 para Agio), `--c` (chaos, manter baixo 0-20), `--no` (negative prompt)
   - **DALL-E 3:** Prompt em linguagem natural, especificar estilo no texto, quality: hd, size: conforme canal.
   - **Stable Diffusion XL:** Prompt positivo + negative prompt separado, steps: 30-50, CFG: 7-9, sampler: DPM++ 2M Karras.

8. **Adaptar para Narrativa Agio.** Se a imagem serve a uma peça de conteúdo específica, alinhar o visual à narrativa:
   - **Caos→Previsibilidade:** Espaços organizados, geometria precisa, cronogramas visuais, before/after de caos para ordem.
   - **Complexidade→Simplicidade:** Integração de sistemas, visão macro do projeto, fluxos visuais.
   - **Genérico→Personalizado:** Detalhes artesanais, acabamentos únicos, elementos de marca do cliente no espaço.

9. **Formatar e entregar.** Apresentar cada variação no Output Template.

10. **Oferecer iterações.** Após entrega, perguntar:
    - "Quer que eu ajuste alguma variação?"
    - "Precisa de versões para outro canal/aspect ratio?"
    - "Quer prompts complementares (ex.: close-up de detalhe, vista aérea)?"

### Anti-patterns

- **Nunca gerar prompts de "engenheiro/operário sorrindo com capacete amarelo."** Essa estética é clichê de construtora genérica — oposto do posicionamento Agio.
- **Nunca usar termos vagos.** "Escritório bonito" não é prompt. "Modern corporate office, polished concrete floor, floor-to-ceiling glass walls, natural daylight streaming from left, minimalist furniture, architectural photography" é prompt.
- **Nunca gerar imagens com texto embutido.** Modelos de IA geram texto ilegível — texto deve ser adicionado em pós-produção.
- **Nunca usar paleta oversaturada.** Agio é clean e profissional. Evitar filtros vibrantes, HDR excessivo, cores neon.
- **Nunca esquecer o negative prompt.** Sem negative prompt, o modelo vai gerar elementos indesejados.
- **Nunca gerar apenas 1 variação.** Sempre entregar 3 ângulos para dar opção ao usuário.
- **Nunca ignorar aspect ratio do canal.** Uma imagem 1:1 cortada para 16:9 perde composição.
- **Nunca gerar prompts em português para Midjourney/DALL-E.** Os modelos performam significativamente melhor em inglês.

### Output Template

```
# Prompts de Imagem — [Tema/Projeto]

**Objetivo:** [Para que será usada]
**Canal:** [Destino]
**Modelo:** [Midjourney v6 | DALL-E 3 | Stable Diffusion XL]
**Aspect Ratio:** [X:Y]
**Narrativa Agio:** [Se aplicável]

---

## Variação A — [Nome descritivo]

**Prompt:**
```
[Prompt completo em inglês]
```

**Negative prompt:**
```
[Lista de exclusões]
```

**Parâmetros:** [--ar X:Y --v 6 --s 100]
**Notas:** [Orientações de uso ou pós-produção]

---

## Variação B — [Nome descritivo]

**Prompt:**
```
[Prompt completo em inglês]
```

**Negative prompt:**
```
[Lista de exclusões]
```

**Parâmetros:** [--ar X:Y --v 6 --s 100]
**Notas:** [Orientações de uso ou pós-produção]

---

## Variação C — [Nome descritivo]

**Prompt:**
```
[Prompt completo em inglês]
```

**Negative prompt:**
```
[Lista de exclusões]
```

**Parâmetros:** [--ar X:Y --v 6 --s 100]
**Notas:** [Orientações de uso ou pós-produção]
```

### Quality Gate

Antes de entregar, verificar:

- [ ] Prompts em inglês (modelos performam melhor)
- [ ] Negative prompt incluído em todas as variações
- [ ] Aspect ratio correto para o canal de destino
- [ ] Estética alinhada à identidade Agio (clean, arquitetônica, profissional)
- [ ] Sem clichês de "construtora" (capacete amarelo, betoneira, canteiro genérico)
- [ ] 3 variações com ângulos distintos (principal, artístico, conceitual)
- [ ] Parâmetros técnicos do modelo especificados
- [ ] Sem texto embutido na imagem solicitado no prompt
- [ ] Paleta coerente (neutros + vermelho Agio quando relevante)
- [ ] Notas de pós-produção incluídas se necessário

### Example

**Input do usuário:**

> Preciso de prompts para imagens do carrossel do Instagram sobre o projeto da Pandora no Shopping Iguatemi. Quero mostrar a transformação do espaço vazio até a loja pronta.

---

**Output:**

# Prompts de Imagem — Case Pandora Shopping Iguatemi

**Objetivo:** Carrossel Instagram — case de projeto
**Canal:** Instagram feed (carrossel)
**Modelo:** Midjourney v6
**Aspect Ratio:** 1:1
**Narrativa Agio:** Genérico → Personalizado

---

## Variação A — Transformação Before/After

**Prompt:**
```
Split composition showing transformation of empty commercial space into luxury jewelry boutique, left side raw concrete shell with exposed ceiling ducts and construction lighting, right side finished Pandora store with warm spotlighting on display cases, polished floors reflecting light, glass storefront, shopping mall corridor visible, architectural photography, clean composition, natural color grading, high detail --ar 1:1 --v 6 --s 80
```

**Negative prompt:**
```
--no text, watermark, people posing, hard hat, oversaturated colors, HDR, stock photo, blurry, low quality, cartoon, illustration
```

**Parâmetros:** --ar 1:1 --v 6 --s 80
**Notas:** Ideal para slide 2 do carrossel (antes/depois). Adicionar seta ou label "Antes → Depois" em pós-produção com a cor #e83c3c.

---

## Variação B — Detalhe de Acabamento

**Prompt:**
```
Close-up architectural detail of luxury retail store interior, jewelry display case with warm LED spotlighting, polished marble counter surface reflecting soft light, precise geometric shelving in background, shallow depth of field, boutique aesthetic, clean minimal design, architectural photography, neutral tones with subtle warm accents --ar 1:1 --v 6 --s 120
```

**Negative prompt:**
```
--no people, text, watermark, oversaturated, HDR, stock photo, blurry, cheap materials, fluorescent lighting
```

**Parâmetros:** --ar 1:1 --v 6 --s 120
**Notas:** Para slide de detalhe mostrando a qualidade do acabamento. Stylize mais alto (120) para enfatizar a estética premium.

---

## Variação C — Espaço Completo em Grande Angular

**Prompt:**
```
Wide angle interior photograph of completed luxury jewelry boutique in upscale shopping mall, glass storefront entrance, warm ambient lighting, display cases with soft spotlights, polished floor reflecting ceiling lights, clean architectural lines, minimal decoration, professional real estate photography style, evening lighting from mall corridor, sophisticated retail space --ar 1:1 --v 6 --s 100
```

**Negative prompt:**
```
--no people, text, logo, watermark, oversaturated, HDR, fisheye distortion, stock photo, construction debris, messy
```

**Parâmetros:** --ar 1:1 --v 6 --s 100
**Notas:** Para slide final mostrando o resultado completo. Ângulo que transmite escala e acabamento. Pode ser usado também como imagem de destaque do case no Notion.
