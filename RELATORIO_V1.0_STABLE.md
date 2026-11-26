# RELATORIO_V1.0_STABLE.md — COTA 07 ARQUITETURA (V1.0 STABLE)

## 1. Identificação Oficial da Release
- **URL Pública de Produção**: https://cota07-arquitetura.vercel.app
- **URL de Preview (V1.0)**: https://cota07-arquitetura-ntf4hanwo-tiago-quagliato.vercel.app
- **Repositório GitHub**: https://github.com/tiagoquagliato-dev/cota07-arquitetura
- **Tag**: `v1.0.0`
- **Commit SHA**: `c0081ef47a0171b17245cc80e4de455e5a63d1b5`
- **Projeto Vercel**: `cota07-arquitetura` (`prj_LLwbuQk35qrv21sAeKCrfNlhHPk7`)
- **Deployment ID (Produção)**: `dpl_B9DD5D1HGJvECDzUrqTzV5dwMC9C`
- **Deployment ID (Preview)**: `dpl_2B9CX8D4jEserU42XBSQK5tmiELr`
- **Acesso Público**: Verificado sem autenticação (`HTTP 200 OK`)

---

## 2. Inventário dos 13 Assets Definitivos
Todos os **13/13 assets definitivos** foram integrados e convertidos para **WebP** responsivo em `public/images/` sem ampliação acima da resolução original (`ASSETS_M1.md`):

| Projeto | ID do Asset | Dimensões Base | Variantes WebP | Origem |
| :--- | :--- | :--- | :--- | :--- |
| Casa Horizonte | `horizonte-exterior` | `1920 x 1080` | `640w`, `1280w`, `1920w` | Gemini |
| Casa Horizonte | `horizonte-interior` | `1920 x 1080` | `640w`, `1280w`, `1920w` | Gemini |
| Casa Horizonte | `horizonte-piscina` | `1600 x 1200` | `640w`, `1280w`, `1600w` | Gemini |
| Casa Pátio | `patio-exterior` | `1600 x 1200` | `640w`, `1280w`, `1600w` | Gemini |
| Casa Pátio | `patio-jardim` | `1200 x 1500` | `640w`, `1200w` | Gemini |
| Casa Pátio | `patio-interior` | `1920 x 1080` | `640w`, `1280w`, `1920w` | Gemini |
| Apartamento Matéria | `materia-estar` | `1920 x 1080` | `640w`, `1280w`, `1920w` | Gemini |
| Apartamento Matéria | `materia-cozinha` | `1200 x 900` | `640w`, `1200w` | Gemini |
| Apartamento Matéria | `materia-detalhe` | `896 x 1120` | `640w`, `896w` | Gemini |
| Pavilhão Sete | `pavilhao-exterior` | `1376 x 774` | `640w`, `1376w` | Gemini |
| Pavilhão Sete | `pavilhao-interior` | `1920 x 1080` | `640w`, `1280w`, `1920w` | ChatGPT |
| Pavilhão Sete | `pavilhao-detalhe` | `1200 x 1500` | `640w`, `1200w` | ChatGPT |
| Institucional | `studio-editorial` | `1600 x 1200` | `640w`, `1280w`, `1600w` | ChatGPT |

---

## 3. Resultados Lighthouse (URL Oficial de Produção)
| Métrica | Desktop | Mobile | Meta V1.0 |
| :--- | :--- | :--- | :--- |
| Performance | **100** | **99** | 95+ / 90+ |
| Accessibility | **96** | **96** | 95+ |
| Best Practices | **100** | **100** | 95+ |
| LCP | **0.4 s** | **0.9 s** | <= 2.5 s |
| CLS | **0.001** | **0.001** | ~0 |

*(Diretiva `<meta name="robots" content="noindex, nofollow" />` e avisos de projeto conceitual preservados.)*

---

## 4. Relatório de Regressão e Auditoria Técnica (`audit/playwright-report-v1.json`)
- **Typecheck (`tsc -b`)**: `0` erros.
- **Lint (`eslint .`)**: `0` erros, `0` avisos.
- **Build (`vite build`)**: concluído em `709ms` com prefetch de rotas internas e rolagem instantânea entre páginas.
- **Playwright na URL oficial de produção**:
  - `11/11` rotas operacionais (`/`, `/projetos`, `/projetos/:slug`, `/estudio`, `/metodo`, `/contato`, `/privacidade`, `*`).
  - `0` erros de console, `0` erros de página, `0` requisições falhas, `0` imagens quebradas (`Broken images: 0`).
  - `0` overflows horizontais nas 6 larguras obrigatórias (`360`, `390`, `768`, `1024`, `1440`, `1920` px).
  - Explorador interativo (4 obras), galeria horizontal, galeria fullscreen (`ArrowRight` + `Escape`), filtros (`/projetos`), briefing em 4 etapas (`/contato`), rolagem reversa (`opacity: 1`) e `prefers-reduced-motion: reduce` validados.

---

## 5. Screenshots Finais (`audit/screenshots-v1/`)
- `v1-home-desktop.png` — Homepage completa desktop (`1440px`)
- `v1-home-mobile.png` — Homepage completa mobile (`390px`)
- `v1-materialidade-home.png` — Seção Materialidade na homepage
- `v1-studio-editorial.png` — Página `/estudio` com `studio-editorial` definitivo
- `v1-pavilhao-sete.png` — Página `/projetos/pavilhao-sete` com `pavilhao-exterior`, `pavilhao-interior` e `pavilhao-detalhe`
