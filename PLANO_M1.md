# PLANO_M1.md — COTA 07 ARQUITETURA (M1.0)

## 1. Visão Geral e Objetivo
Desenvolvimento completo do website conceitual **COTA 07 Arquitetura e Interiores** (`COTA.07`), correspondente ao **CASE 07** do portfólio profissional de Tiago Quagliato.
Conceito estético: **Brutalismo Contemporâneo Brasileiro**, com direção editorial internacional, contraste entre superfícies claras e escuras, tipografia monumental, grid assimétrico e detalhes inspirados em desenhos técnicos.

## 2. Ambiente Inspecionado
- **Sistema Operacional**: Windows
- **Node.js**: v24.20.0
- **npm / npx**: v11.19.0 (`npm.cmd` / `npx.cmd` no PowerShell)
- **Git**: v2.55.0
- **Diretório de trabalho**: `c:\Users\User\Desktop\PROJETOS VSCODE\cota07-arquitetura` (inicialmente vazio)

## 3. Stack Tecnológica
- **Framework**: React 19 + Vite + TypeScript (`strict: true`)
- **Estilização**: Tailwind CSS v4 (ou v3 estável com `@tailwindcss/vite` / PostCSS) + tokens CSS customizados
- **Roteamento**: `react-router-dom` com `React.lazy` e `Suspense` para code splitting por rota
- **Animações**: `gsap` e `gsap/ScrollTrigger` carregados de forma diferida (`import('gsap')`), respeitando `prefers-reduced-motion` e sem jamais ocultar conteúdo permanentemente com `opacity: 0`
- **Ícones**: `lucide-react` (apenas onde funcional: setas, fechar, alternância grade/lista, menu)
- **Tipografia local (WOFF2)**: `@fontsource/space-grotesk`, `@fontsource/manrope`, `@fontsource/ibm-plex-mono`
- **Otimização de imagens (dev)**: `sharp` para conversão e geração de variantes WebP responsivas (`640w`, `1280w`, `1920w`)
- **Auditoria**: Playwright e Lighthouse (via `npx.cmd` / `playwright`)

## 4. Identidade Visual e Sistema de Design
- **Nome**: COTA 07 | **Assinatura**: `COTA.07` | **Complemento**: Arquitetura e Interiores
- **Slogan**: *Espaços que traduzem formas de viver.*
- **Logotipo**: SVG tipográfico autoral inspirado em cotas, eixos e precisão arquitetônica (sem ícones genéricos de casas, prédios ou telhados).
- **Paleta de Cores**:
  - Carbono: `#191B1A`
  - Concreto claro: `#EAE8E1`
  - Cimento: `#96978F`
  - Oliva: `#787D60`
  - Branco: `#FFFFFF`
- **Tipografia**:
  - Títulos: `Space Grotesk`
  - Corpo de texto: `Manrope`
  - Dados técnicos / numeração: `IBM Plex Mono`

## 5. Inventário de Imagens e Produção
Serão geradas 13 fotografias arquitetônicas conceituais originais, convertidas para WebP com variantes responsivas (`srcSet` e `sizes`) e registradas em `ASSETS_M1.md`:
1. **Casa Horizonte** (`horizonte-exterior`, `horizonte-interior`, `horizonte-piscina`)
2. **Casa Pátio** (`patio-exterior`, `patio-jardim`, `patio-interior`)
3. **Apartamento Matéria** (`materia-estar`, `materia-cozinha`, `materia-detalhe`)
4. **Pavilhão Sete** (`pavilhao-exterior`, `pavilhao-interior`, `pavilhao-detalhe`)
5. **Institucional** (`studio-editorial`)

## 6. Arquitetura de Rotas e Páginas
- `/` — Homepage (8 seções: Hero cinematográfico, Manifesto, Projetos selecionados, Áreas de atuação, O estúdio, Método, CTA final, Footer)
- `/projetos` — Catálogo com 4 filtros (`Todos`, `Residencial`, `Interiores`, `Comercial`), alternância Grade/Lista, sincronização com URL query params e acessibilidade por teclado
- `/projetos/:slug` — Página individual com área conceitual, descrição, materiais predominantes, galeria complementar com abertura em modal fullscreen e navegação anterior/próximo
- `/estudio` — Página editorial do estúdio conceitual, princípios e materialidade
- `/metodo` — Processo de trabalho em 4 etapas (Escuta, Conceito, Desenvolvimento, Detalhamento) com diagramação técnica
- `/contato` — Briefing demonstrativo interativo em 4 etapas (sem coleta de dados pessoais, sem envio a servidor, sem orçamento real)
- `/privacidade` — Política de privacidade e aviso legal de projeto conceitual
- `*` — Página 404 com retorno estruturado
- `vercel.json` — Rewrite SPA para publicação futura na Vercel

## 7. Performance, Acessibilidade e Auditoria
- `noindex, nofollow`, favicon SVG, Open Graph, HTML semântico (`header`, `main`, `nav`, `section`, `footer`)
- Hero com `fetchPriority="high"` e `<link rel="preload">` responsivo; imagens abaixo da dobra com `loading="lazy"`
- Galeria fullscreen carrega versão em alta resolução (`1920w`) sob demanda
- Auditoria automatizada com Playwright nas larguras `360`, `390`, `768`, `1024`, `1440` e `1920` pixels, validando todas as rotas, filtros, galeria, briefing, menu mobile, teclado, contraste, console/network e decodificação de imagens (`img.decode()`, `naturalWidth > 0`)
- Auditoria Lighthouse no build de produção
- Entregáveis finais: `README.md`, `PLANO_M1.md`, `ASSETS_M1.md`, `RELATORIO_M1.md`, `TESTES_M1.md` e capturas de tela reais.
