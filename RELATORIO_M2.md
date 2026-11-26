# RELATORIO_M2.md — COTA 07 · REDESIGN CRIATIVO M2.0 (LIVING ARCHITECTURE)

## 1. Checkpoint da M1.0
Antes da reconstrução da M2.0, o estado integral da M1.0 foi preservado via Git (`commit` `checkpoint: COTA 07 M1.0` e tag `m1.0-checkpoint`).

## 2. Ruptura e Decisões Criativas (Living Architecture)
A M1.0 apresentava excesso de geometria rígida, botões retangulares, linhas divisórias horizontais e estrutura institucional convencional. Na **M2.0**, o website foi reconstruído como uma **exposição digital de arquitetura**:

- **Nova Tipografia e Assinatura**:
  - Adoção da família **Syne** (`500`, `600`, `700`) em escala monumental com tracking negativo (`-0.04em`) e caixa mista para títulos, combinada a **Manrope** e **IBM Plex Mono** apenas para metadados sutis de ficha técnica.
  - Redesenho do logotipo `COTA.07` (`src/components/Logo.tsx`) com anel de cota circular e ponto central dinâmico.
- **Nova Paleta e Cores Complementares por Obra**:
  - Superfície principal em Alabaster Mineral (`#F2EFE9`) e Carbono (`#191B1A`), eliminando caixas e bordas repetitivas.
  - Cada projeto do explorador aplica uma cor de destaque complementar sutil: **Casa Horizonte** (`#6E7458`), **Casa Pátio** (`#8C6D53`), **Apartamento Matéria** (`#737670`) e **Pavilhão Sete** (`#4C5D5E`).
- **Navegação Flutuante e Controles Circulares**:
  - Header flutuante em pílulas (`src/components/Header.tsx`) sem barra rígida de ponta a ponta.
  - Controles circulares (`w-12 h-12 rounded-full`) para alternância de obras e ações principais.
- **Explorador Interativo de Projetos (`src/components/ProjectExplorer.tsx`)**:
  - Substituiu o hero estático da M1.0 por uma sala de exposição interativa ocupando `100svh`.
  - Atualiza simultaneamente fotografia panorâmica, título monumental, categoria, metragem conceitual, descrição, cor complementar e link `/projetos/:slug`.
  - Suporte a navegação por teclado (`ArrowLeft` / `ArrowRight`), botões circulares e miniaturas dos 4 projetos, sem autoplay obrigatório.
- **Continuidade Orgânica nas Seções e Páginas Internas**:
  - Manifesto assimétrico com fotografia sobreposta; Estúdio e Áreas de atuação integrados com sobreposição controlada de pranchas (`studio-editorial` + `materia-detalhe`); Método em sequência fluida escalonada; Rodapé reconstruído como encerramento editorial monumental em Carbono.
  - `/projetos` transformada em galeria editorial com escalas variadas e títulos integrados às imagens (preservando filtros e modo lista como controles secundários).
  - `/projetos/:slug` com narrativa visual e galeria horizontal opcional (`overflow-x-auto`) + galeria fullscreen preservada.
  - `/contato` reconstruída como briefing focado em uma pergunta por etapa com barra de progresso contínua.

## 3. Resultados Técnicos e Auditoria M2.0
- **Build (`tsc -b && eslint . && vite build`)**: `0` erros, `0` avisos, compilado em `1.25s`.
- **Playwright** (`audit/playwright-report-m2.json`):
  - `11/11` rotas operacionais; `0` erros de console; `0` erros de página.
  - `0` overflows horizontais nas 6 larguras (`360`, `390`, `768`, `1024`, `1440`, `1920` px).
  - Explorador alternou corretamente entre Casa Horizonte, Casa Pátio e Pavilhão Sete.
  - Filtros, galeria fullscreen, briefing em 4 etapas e menu mobile validados.
- **Lighthouse (Produção `http://127.0.0.1:4173/`)**:
  - **Desktop**: Performance **100** | Accessibility **97** | Best Practices **100** | LCP **0.3 s** | CLS **0.001**
  - **Mobile**: Performance **100** | Accessibility **97** | Best Practices **100** | LCP **0.9 s** | CLS **0.001**

## 4. Capturas de Aprovação M2.0 (`audit/screenshots-m2/`)
- `m2-hero-1440.png` — Hero / Explorador em 1440px (Casa Horizonte)
- `m2-hero-390.png` — Hero / Explorador em 390px (Mobile)
- `m2-explorer-patio.png` — Explorador com Casa Pátio selecionada
- `m2-explorer-pavilhao.png` — Explorador com Pavilhão Sete selecionado
- `m2-home-full-1440.png` — Homepage completa em 1440px
- `m2-home-full-390.png` — Homepage completa em 390px

## 5. Fotografias Pendentes (HTTP 429 Contínuo)
Em nova verificação na M2.0, a ferramenta `generate_image` manteve erro **HTTP 429 (`RESOURCE_EXHAUSTED`)**. Conforme instruído, as tentativas foram encerradas imediatamente. Abaixo estão os **13 arquivos pendentes** para produção externa:

| Nome Exato | Proporção | Resolução Recomendada | Finalidade | Enquadramento Necessário |
| :--- | :--- | :--- | :--- | :--- |
| `horizonte-exterior` | `16:9` | `1920 x 1080` | Hero / Explorador e capa Casa Horizonte | Plano aberto panorâmico em altura do olhar mostrando balanços em concreto, madeira cumaru, vidro, piscina e jardim tropical ao entardecer |
| `horizonte-interior` | `16:9` | `1920 x 1080` | Galeria Casa Horizonte | Plano amplo do estar integrado com vigas de concreto e portas envidraçadas abertas para o jardim |
| `horizonte-piscina` | `4:3` | `1600 x 1200` | Galeria Casa Horizonte | Enquadramento médio do deck em basalto escuro refletindo a cobertura em balanço e vegetação |
| `patio-exterior` | `4:3` | `1600 x 1200` | Explorador e capa Casa Pátio | Plano médio-aberto da volumetria monolítica em concreto e pedra natural com sombras geométricas |
| `patio-jardim` | `4:5` | `1200 x 1500` | Manifesto Home e galeria Casa Pátio | Enquadramento vertical do pátio central com árvore escultural emoldurada por pórticos e luz filtrada |
| `patio-interior` | `16:9` | `1920 x 1080` | Galeria Casa Pátio | Plano horizontal da galeria interna e jantar voltados ao jardim central através de vidro piso teto |
| `materia-estar` | `16:9` | `1920 x 1080` | Explorador e capa Apartamento Matéria | Plano aberto da sala de estar com concreto aparente, marcenaria freijó, linho cru e luz difusa |
| `materia-cozinha` | `4:3` | `1600 x 1200` | Galeria Apartamento Matéria | Plano médio frontal/diagonal da ilha monolítica em pedra escura e marcenaria minimalista |
| `materia-detalhe` | `4:5` | `1200 x 1500` | Sobreposição Home e galeria Matéria | Close-up vertical tátil do encontro entre concreto ripado, madeira, travertino e tecido sob luz rasante |
| `pavilhao-exterior` | `16:9` | `1920 x 1080` | Explorador e capa Pavilhão Sete | Plano aberto da fachada comercial com pórticos rítmicos de concreto, pé-direito duplo e paisagismo |
| `pavilhao-interior` | `16:9` | `1920 x 1080` | Galeria Pavilhão Sete | Plano amplo do átrio corporativo em pé-direito duplo, laje nervurada e transparência para área verde |
| `pavilhao-detalhe` | `4:5` | `1200 x 1500` | Página Estúdio e galeria Pavilhão Sete | Enquadramento vertical de detalhe construtivo entre pilar de concreto, caixilho metálico e vegetação |
| `studio-editorial` | `4:3` | `1600 x 1200` | Seção Estúdio (Home e `/estudio`) | Ângulo alto/editorial sobre mesa de trabalho com amostras de concreto, pedra, madeira, maquete e plantas |
