# ASSETS_M1.md — Inventário de Imagens e Produção

## Status da Produção Fotográfica
Durante a execução da M1.0, a ferramenta de geração de imagens do ambiente (`generate_image`) retornou **HTTP 429 (`RESOURCE_EXHAUSTED`)** com janela de reset de ~43 minutos em todas as tentativas iniciais.
Conforme diretriz do projeto, **não houve insistência repetitiva** e **não é declarada conclusão fotográfica com placeholders**.

Para viabilizar a compilação, o carregamento responsivo (`srcSet` / `sizes`), a galeria fullscreen e a auditoria técnica de rede, decodificação e Lighthouse em ambiente local, foram geradas **pranchas técnicas provisórias em WebP** via `scripts/generate-study-webp.mjs`. Assim que as fotografias definitivas forem produzidas externamente (ex.: ChatGPT / DALL-E) e salvas em `raw-images/`, basta executar `npm run optimize:images` para gerar automaticamente todas as variantes WebP (`640w`, `1280w`, `1920w`).

---

## Inventário Completo para Produção Externa (13 Assets Pendentes)

| Projeto | ID do Asset | Proporção | Dimensões Base (px) | Variantes WebP Geradas | Origem Atual |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Casa Horizonte | `horizonte-exterior` | `16:9` | `1920 x 1080` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |
| Casa Horizonte | `horizonte-interior` | `16:9` | `1920 x 1080` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |
| Casa Horizonte | `horizonte-piscina` | `4:3` | `1600 x 1200` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |
| Casa Pátio | `patio-exterior` | `4:3` | `1600 x 1200` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |
| Casa Pátio | `patio-jardim` | `4:5` | `1200 x 1500` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |
| Casa Pátio | `patio-interior` | `16:9` | `1920 x 1080` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |
| Apartamento Matéria | `materia-estar` | `16:9` | `1920 x 1080` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |
| Apartamento Matéria | `materia-cozinha` | `4:3` | `1600 x 1200` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |
| Apartamento Matéria | `materia-detalhe` | `4:5` | `1200 x 1500` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |
| Pavilhão Sete | `pavilhao-exterior` | `16:9` | `1920 x 1080` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |
| Pavilhão Sete | `pavilhao-interior` | `16:9` | `1920 x 1080` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |
| Pavilhão Sete | `pavilhao-detalhe` | `4:5` | `1200 x 1500` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |
| Institucional | `studio-editorial` | `4:3` | `1600 x 1200` | `640w`, `1280w`, `1920w` | Prancha provisória (pendente ChatGPT) |

---

## Direção Fotográfica e Prompts Recomendados (ChatGPT)
Para todas as imagens: realismo arquitetônico, lentes de 24mm a 50mm sem distorção excessiva, iluminação natural, materiais fisicamente coerentes, sem textos, sem marcas d'água e sem cópia de obras reais identificáveis.

1. **`horizonte-exterior.png` (16:9)**: Residência horizontal contemporânea em brutalismo brasileiro, concreto aparente ripado em balanço, forro em madeira cumaru, grandes panos de vidro sem caixilho aparente, piscina de borda infinita integrada, vegetação tropical, luz dourada de fim de tarde.
2. **`horizonte-interior.png` (16:9)**: Sala de estar ampla da mesma residência, vigas de concreto aparente, painel em madeira natural, portas de vidro abertas para o jardim tropical e piscina, sofá em linho cru, mesa em travertino, luz natural difusa.
3. **`horizonte-piscina.png` (4:3)**: Deck da piscina em pedra basalto escura refletindo a laje em balanço de concreto e palmeiras tropicais, espreguiçadeiras em madeira, luz natural de tarde.
4. **`patio-exterior.png` (4:3)**: Fachada introspectiva em concreto arquitetônico monolítico, embasamento em pedra natural rústica, brises em madeira freijó, jogo geométrico de luz e sombras.
5. **`patio-jardim.png` (4:5)**: Jardim central em pátio interno com árvore escultural nativa (jabuticabeira ou ipê) emoldurada por pórticos de concreto, piso em pedra natural, luz solar filtrada.
6. **`patio-interior.png` (16:9)**: Galeria interna e sala de jantar em concreto e pedra voltadas para o pátio ajardinado através de vidro piso teto, mesa em madeira maciça.
7. **`materia-estar.png` (16:9)**: Sala de estar de apartamento contemporâneo de alto padrão, parede estrutural em concreto aparente, marcenaria em madeira freijó, mobiliário brasileiro minimalista em bouclé e linho cru, luz difusa.
8. **`materia-cozinha.png` (4:3)**: Cozinha arquitetônica com ilha monolítica em pedra sabão fosca, marcenaria escura minimalista e aço escovado, teto em concreto aparente.
9. **`materia-detalhe.png` (4:5)**: Detalhe tátil do encontro entre concreto ripado, marcenaria em madeira natural, prateleira em travertino bruto e cortina de linho sob luz rasante.
10. **`pavilhao-exterior.png` (16:9)**: Edifício comercial contemporâneo (Pavilhão Sete), pórtico rítmico em concreto aparente, pé-direito duplo envidraçado, paisagismo tropical integrado às passarelas.
11. **`pavilhao-interior.png` (16:9)**: Átrio interno de convivência em pé-direito duplo, laje nervurada em concreto aparente, bancos monolíticos, transparência para área verde externa.
12. **`pavilhao-detalhe.png` (4:5)**: Detalhe construtivo de pilar em concreto aparente encontrando montante metálico grafite, vidro e vegetação externa com sombras nítidas.
13. **`studio-editorial.png` (4:3)**: Fotografia editorial em ângulo alto de mesa de trabalho de arquitetura com amostras de concreto, travertino, madeira e metal escovado, maquete volumétrica branca e desenhos técnicos conceituais sem texto legível.
