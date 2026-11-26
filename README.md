# COTA 07 ARQUITETURA — M1.0

Website conceitual de arquitetura e interiores (**CASE 07** do portfólio profissional de Tiago Quagliato).
Identidade visual inspirada no **Brutalismo Contemporâneo Brasileiro**, com direção editorial internacional, tipografia local em WOFF2 (`Space Grotesk`, `Manrope`, `IBM Plex Mono`), logotipo SVG técnico (`COTA.07`), galeria fullscreen acessível e briefing demonstrativo interativo.

> **Aviso obrigatório:** Projeto conceitual de portfólio. Escritório fictício. As imagens representam estudos arquitetônicos ilustrativos e não correspondem a obras executadas.

## Stack Tecnológica
- **React 19** + **Vite 8** + **TypeScript strict**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router v7** (code splitting por rota via `React.lazy`)
- **GSAP + ScrollTrigger** (carregamento dinâmico diferido, com suporte a `prefers-reduced-motion`)
- **Lucide React**
- **Sharp** (otimização e geração de variantes WebP responsivas)

## Scripts Disponíveis
```bash
npm run dev              # Servidor de desenvolvimento Vite
npm run typecheck        # Verificação TypeScript strict (tsc -b)
npm run lint             # ESLint
npm run build            # Typecheck + Build de produção
npm run preview          # Preview local do build de produção
npm run optimize:images  # Converte raw-images/ (ou gera pranchas provisórias) para WebP 640w/1280w/1920w
```

## Rotas Implementadas
- `/` — Homepage em 8 seções (Hero, Manifesto, Projetos selecionados, Áreas de atuação, O estúdio, Método, CTA final, Footer)
- `/projetos` — Catálogo com filtros (`Todos`, `Residencial`, `Interiores`, `Comercial`), alternância Grade/Lista e sincronização com query params
- `/projetos/:slug` — Ficha técnica conceitual, materiais predominantes, galeria complementar e navegação anterior/próximo
- `/estudio` — Página editorial do estúdio conceitual
- `/metodo` — Metodologia em 4 etapas com diagrama técnico SVG
- `/contato` — Briefing demonstrativo interativo em 4 etapas (sem coleta de dados pessoais ou envio a servidor)
- `/privacidade` — Política de privacidade e aviso conceitual
- `*` — Página 404

## Documentação M1.0
- [PLANO_M1.md](./PLANO_M1.md) — Plano arquitetônico e técnico
- [ASSETS_M1.md](./ASSETS_M1.md) — Inventário de imagens e pendências externas (HTTP 429)
- [RELATORIO_M1.md](./RELATORIO_M1.md) — Relatório de implementação e resultados
- [TESTES_M1.md](./TESTES_M1.md) — Evidências de testes, Playwright, Lighthouse e capturas
