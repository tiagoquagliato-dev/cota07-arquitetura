# TESTES_M1.md — Auditoria Técnica e Evidências

## 1. Ambiente de Auditoria
- **URL Local (Vite Preview)**: `http://127.0.0.1:4173`
- **Ferramentas**: TypeScript `tsc -b`, ESLint, Vite `8.3.8`, Playwright `1.65.1` (Chrome headless), Lighthouse `13.6.0`
- **Arquivo de evidência bruta**: `audit/playwright-report.json`, `audit/lighthouse-desktop.json`, `audit/lighthouse-mobile.json`

## 2. Validação de Qualidade de Código e Build
| Verificação | Comando | Resultado |
| :--- | :--- | :--- |
| Typecheck | `npm.cmd run typecheck` | Passou (0 erros) |
| Lint | `npm.cmd run lint` | Passou (0 erros, 0 avisos) |
| Build de produção | `npm.cmd run build` | Passou (1.02s, code splitting ativo) |

## 3. Auditoria Automatizada Playwright
- **Console Errors**: `0`
- **Page Errors**: `0`
- **Failed Requests**: `0`
- **Rotas testadas (11/11 OK)**:
  `/`, `/projetos`, `/projetos/casa-horizonte`, `/projetos/casa-patio`, `/projetos/apartamento-materia`, `/projetos/pavilhao-sete`, `/estudio`, `/metodo`, `/contato`, `/privacidade`, `/rota-404-teste` (404)
- **Larguras obrigatórias sem overflow horizontal (`scrollWidth === clientWidth`)**:
  - `360px`: OK (`360 === 360`)
  - `390px`: OK (`390 === 390`)
  - `768px`: OK (`768 === 768`)
  - `1024px`: OK (`1024 === 1024`)
  - `1440px`: OK (`1440 === 1440`)
  - `1920px`: OK (`1920 === 1920`)
- **Fluxos interativos validados**:
  - **Filtros e Visualização (`/projetos`)**: Filtro `Residencial` retornou `2` projetos; alternância para `Lista` atualizou URL para `/projetos?vista=lista`.
  - **Galeria Fullscreen (`/projetos/casa-horizonte`)**: Abriu modal acessível, avançou de `01 / 03` para `02 / 03` via `ArrowRight` e fechou com `Escape`.
  - **Briefing Demonstrativo (`/contato`)**: Concluiu fluxo de 4 etapas (`Residencial` -> `300 m² a 500 m²` -> `Contemporâneo` -> confirmação local).
  - **Menu Mobile (`390px`)**: Abriu diálogo editorial, travou rolagem do `body` (`overflow: hidden`) e fechou via `Escape`.
  - **Navegação por Teclado**: `Tab` moveu foco para elementos interativos com indicador `:focus-visible` ativo.
- **Validação de Imagens WebP (`img.decode()` + visibilidade)**:
  Todas as imagens na Homepage e na página individual decodificaram com `naturalWidth > 0`, `naturalHeight > 0`, `opacity: "1"`, `visible: true`, `currentSrc` apontando para variantes `.webp` (`640w`/`1280w`/`1920w`) e respostas HTTP `200`/`304` com `Content-Type: image/webp`.

## 4. Auditoria Lighthouse (Build de Produção)
| Métrica | Desktop | Mobile | Meta M1.0 |
| :--- | :--- | :--- | :--- |
| Performance | **100** | **96** | 95+ / 90+ |
| Accessibility | **95** | **95** | 95+ |
| Best Practices | **100** | **100** | 95+ |
| LCP | **0.6 s** | **2.9 s** | <= 2.5 s (mobile) |
| CLS | **0** | **0** | 0 |

*(Nota: o score SEO em 58 decorre intencionalmente da diretiva `<meta name="robots" content="noindex, nofollow" />` exigida para projeto conceitual de portfólio.)*

## 5. Capturas de Tela Reais (`audit/screenshots/`)
1. `01-hero-desktop.png` — Hero desktop (`1440x900`)
2. `02-home-full-desktop.png` — Homepage completa desktop (`1440px`)
3. `03-home-full-mobile.png` — Homepage completa mobile (`390px`)
4. `04-home-tablet.png` — Tablet (`768x1024`)
5. `05-projetos-filtros.png` — Catálogo com filtros (`1440x900`)
6. `06-projetos-lista.png` — Visualização em lista (`1440x900`)
7. `07-projeto-individual.png` — Página individual de projeto (`1440x900`)
8. `08-galeria-fullscreen.png` — Galeria fullscreen (`1440x900`)
9. `09-estudio.png` — Estúdio (`1440x900`)
10. `10-metodo.png` — Método (`1440x900`)
11. `11-briefing-interativo.png` — Briefing interativo (`1440x900`)
12. `12-menu-mobile-aberto.png` — Menu mobile aberto (`390x844`)
