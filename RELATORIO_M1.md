# RELATORIO_M1.md — COTA 07 ARQUITETURA (M1.0)

## 1. Resumo Executivo
A implementação da **M1.0** do website conceitual **COTA 07 Arquitetura e Interiores** (`COTA.07`) foi concluída em ambiente local, atendendo integralmente à arquitetura de rotas, direção artística editorial, acessibilidade por teclado, responsividade sem overflow horizontal e otimização de performance.

## 2. O Que Foi Implementado
- **Identidade Visual & Tipografia Local**:
  - Paleta aplicada via tokens CSS e Tailwind v4: Carbono (`#191B1A`), Concreto claro (`#EAE8E1`), Cimento (`#96978F`), Oliva (`#787D60`) e Branco (`#FFFFFF`).
  - Fontes WOFF2 locais via `@fontsource/space-grotesk`, `@fontsource/manrope` e `@fontsource/ibm-plex-mono`.
  - Logotipo tipográfico autoral em SVG (`src/components/Logo.tsx`) inspirado em linhas de cota e eixos técnicos.
- **Header & Menu Mobile**:
  - Header com transição automática de contraste sobre a fotografia do Hero (`src/components/Header.tsx`).
  - Menu mobile editorial numerado (`01` a `04`), gerenciamento de foco, fechamento por `Escape` e bloqueio de rolagem (`overflow: hidden`).
- **Homepage em 8 Seções (`src/pages/HomePage.tsx`)**:
  - Hero cinematográfico (`01 / Casa Horizonte`), Manifesto, Projetos selecionados em grid assimétrico, Áreas de atuação em estrutura editorial de linhas, O estúdio, Método com diagramação técnica, CTA final em Carbono e Footer completo com aviso legal e link para o portfólio de Tiago Quagliato.
- **Páginas Internas & Funcionalidades**:
  - Catálogo `/projetos` com filtros funcionais (`Todos`, `Residencial`, `Interiores`, `Comercial`), alternância Grade/Lista e parâmetros na URL.
  - Páginas individuais `/projetos/:slug` com área conceitual ilustrativa, materiais predominantes, galeria complementar e navegação anterior/próximo.
  - **Galeria Fullscreen (`src/components/FullscreenGallery.tsx`)**: abertura sob demanda da resolução `1920w`, setas do teclado (`ArrowLeft` / `ArrowRight`), indicador de posição (`01 / 03`), fechamento por `Escape`, bloqueio de rolagem e restauração de foco.
  - **Briefing Demonstrativo (`/contato`)**: fluxo interativo em 4 etapas com retorno, edição e reinício, sem coleta de dados pessoais e sem envio a servidor.
  - **Motion Design (`src/utils/motion.ts`)**: carregamento diferido de GSAP e ScrollTrigger, respeito a `prefers-reduced-motion` e garantia de visibilidade contínua (nenhum conteúdo oculto permanentemente com `opacity: 0`).
  - **SEO Técnico & SPA**: `noindex, nofollow`, favicon SVG, Open Graph, `vercel.json` com rewrite SPA e code splitting por rota.

## 3. Resultados Obtidos
- **Typecheck (`tsc -b`)**: 0 erros.
- **Lint (`eslint .`)**: 0 erros, 0 avisos.
- **Build (`vite build`)**: concluído em 1.02s com chunks separados por rota e para GSAP.
- **Playwright**: 11 rotas validadas, 6 larguras (`360`, `390`, `768`, `1024`, `1440`, `1920` px) sem overflow horizontal, 0 erros de console, 0 erros de página e 0 requisições falhas.
- **Lighthouse (Produção `http://127.0.0.1:4173/`)**:
  - **Desktop**: Performance **100** | Accessibility **95** | Best Practices **100** | LCP **0.6 s** | CLS **0**
  - **Mobile**: Performance **96** | Accessibility **95** | Best Practices **100** | LCP **2.9 s** | CLS **0**

## 4. Pendências e Limitações Conhecidas
1. **Produção Fotográfica Externa (HTTP 429)**: A ferramenta de geração de imagens retornou `RESOURCE_EXHAUSTED (HTTP 429)` com janela de reset de ~43 minutos em todas as tentativas iniciais. Conforme instrução, não houve insistência repetitiva e os **13 assets fotográficos definitivos** estão documentados em `ASSETS_M1.md` com proporções, dimensões e prompts para produção externa no ChatGPT. As imagens atualmente exibidas são pranchas técnicas provisórias em WebP (`640w`, `1280w`, `1920w`) para validação do pipeline responsivo e de auditoria.
2. **LCP Mobile em Rede Simulada**: O Lighthouse mobile registrou **2.9 s** (4G simulado), próximo à meta de até 2.5 s, com Performance geral em **96** e CLS **0**.
3. **Publicação**: Não publicada nesta etapa, conforme solicitado (projeto preparado com `vercel.json`).
