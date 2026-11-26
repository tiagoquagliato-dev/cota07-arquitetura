# RELATORIO_M2.1.md — COTA 07 · FINALIZAÇÃO M2.1

## 1. Checkpoint e Preservação
- Checkpoint da M2.0 preservado via Git (`commit` `checkpoint: COTA 07 M2.0`, tag `m2.0-checkpoint`).
- Direção artística **Living Architecture** preservada integralmente (explorador interativo fullscreen, navegação flutuante, tipografia `Syne` / `Manrope` / `IBM Plex Mono`, paleta, controles circulares, galeria horizontal, materialidade, catálogo e rodapé monumental).

## 2. Assets Definitivos e Provisórios (`ASSETS_M1.md`)
Na retomada da M2.1, **3 assets adicionais** foram gerados em alta resolução e convertidos para WebP (`640w`, `1280w`, `1920w`):
- `materia-cozinha` (definitivo)
- `materia-detalhe` (definitivo)
- `pavilhao-exterior` (definitivo)

Ao tentar gerar os 3 últimos, a ferramenta `generate_image` retornou **HTTP 429 (`RESOURCE_EXHAUSTED`, reset em ~4h58m)** e as tentativas foram encerradas imediatamente. Permanecem como **provisórios pendentes de substituição antes da publicação**:
- `pavilhao-interior` (`16:9`, `1920 x 1080`)
- `pavilhao-detalhe` (`4:5`, `1200 x 1500`)
- `studio-editorial` (`4:3`, `1600 x 1200`)

Total atual: **10 assets definitivos** e **3 provisórios**.

## 3. Acabamento Visual e Motion Design Autoral
- **Navegação Flutuante (`src/components/Header.tsx`)**: contraste e legibilidade reforçados com `backdrop-blur-md`, bordas sutis e opacidade elevada sobre textos claros.
- **Indicador de Progresso do Briefing (`src/pages/ContactPage.tsx`)**: corrigido para progredir de `0%` (etapa 1 inicial) até `25%`, `50%`, `75%` e `100%` somente após confirmação da simulação, com `role="progressbar"`.
- **Coreografia Arquitetônica (`src/utils/motion.ts`)**:
  - Revelação de fotografias por máscaras horizontais e verticais (`data-reveal-mask="horizontal" | "vertical"`).
  - Escala e enquadramento vinculados à rolagem (`data-scroll-scale` com `scrub`) em seções da homepage e na expansão fotográfica de `/projetos/:slug`.
  - Parallax em múltiplas profundidades (`data-parallax`) reversível na rolagem.
  - Transição de escala cinematográfica no Explorador (`explorer-photo-enter`).
  - Suporte integral a `prefers-reduced-motion: reduce` e garantia de visibilidade contínua (`opacity: 1` após rolagem reversa).

## 4. Auditoria Técnica Final (`audit/playwright-report-m21-final.json`)
- **Typecheck (`tsc -b`)**: `0` erros.
- **Lint (`eslint .`)**: `0` erros, `0` avisos.
- **Build (`vite build`)**: concluído em `1.04s`.
- **Playwright**:
  - `11/11` rotas operacionais, `0` erros de console, `0` erros de página.
  - `0` overflows horizontais nas 6 larguras (`360`, `390`, `768`, `1024`, `1440`, `1920` px).
  - Explorador alternado nos 4 projetos; Galeria Horizontal avançada (`02 / 04`); Galeria Fullscreen (`ArrowRight` + `Escape`); Filtros (`/projetos`); Menu Mobile (`Escape`).
  - **Briefing Progress**: `0%` -> `25%` -> `75%` -> `100%` confirmado.
  - **Rolagem Reversa**: todas as imagens verificadas permaneceram visíveis (`opacity: 1`) após ida e volta completa.
  - **`prefers-reduced-motion: reduce`**: validado com `heroOpacity: "1"`.
- **Lighthouse (Produção `http://127.0.0.1:4173/`)**:
  - **Desktop**: Performance **100** | Accessibility **96** | Best Practices **100** | LCP **0.4 s** | CLS **0.001**
  - **Mobile**: Performance **100** | Accessibility **96** | Best Practices **100** | LCP **0.9 s** | CLS **0.001**

## 5. Artefatos Entregues
- **Gravação da navegação desktop**: `audit/video/cota07-desktop-navigation.webm`
- **Screenshots finais**: `audit/screenshots-m21-final/` (`m21-final-home-desktop.png`, `m21-final-home-mobile.png`, `m21-final-pavilhao-explorer.png`, `m21-final-briefing.png`) + capturas M2.1 anteriores em `audit/screenshots-m21/`.
