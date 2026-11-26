# ASSETS_M1.md — Inventário de Imagens e Integração WebP

## Status da Produção Fotográfica
Os 13 assets arquitetônicos de `raw-images/` foram integrados e convertidos para **WebP** com variantes responsivas (`640w`, `1280w`, `1920w`) em `public/images/` via `npm run optimize:images`.

Na retomada da M2.1, **3 assets adicionais** foram produzidos em alta resolução (`materia-cozinha`, `materia-detalhe`, `pavilhao-exterior`). Os últimos 3 retornaram **HTTP 429 (`RESOURCE_EXHAUSTED`)** e permanecem provisórios até substituição externa antes da publicação.

- **Assets definitivos (10)**: `horizonte-exterior`, `horizonte-interior`, `horizonte-piscina`, `patio-exterior`, `patio-jardim`, `patio-interior`, `materia-estar`, `materia-cozinha`, `materia-detalhe`, `pavilhao-exterior`.
- **Assets provisórios pendentes (3)**: `pavilhao-interior`, `pavilhao-detalhe`, `studio-editorial`.

---

## Inventário Integrado (13 Assets)

| Projeto | ID do Asset | Proporção | Dimensões Base (px) | Posição Focal Mobile | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Casa Horizonte | `horizonte-exterior` | `16:9` | `1920 x 1080` | `60% 45%` | Integrado (definitivo) |
| Casa Horizonte | `horizonte-interior` | `16:9` | `1920 x 1080` | `50% 50%` | Integrado (definitivo) |
| Casa Horizonte | `horizonte-piscina` | `4:3` | `1600 x 1200` | `50% 60%` | Integrado (definitivo) |
| Casa Pátio | `patio-exterior` | `4:3` | `1600 x 1200` | `50% 40%` | Integrado (definitivo) |
| Casa Pátio | `patio-jardim` | `4:5` | `1200 x 1500` | `50% 45%` | Integrado (definitivo) |
| Casa Pátio | `patio-interior` | `16:9` | `1920 x 1080` | `50% 50%` | Integrado (definitivo) |
| Apartamento Matéria | `materia-estar` | `16:9` | `1920 x 1080` | `55% 45%` | Integrado (definitivo) |
| Apartamento Matéria | `materia-cozinha` | `4:3` | `1600 x 1200` | `50% 55%` | Integrado (definitivo M2.1) |
| Apartamento Matéria | `materia-detalhe` | `4:5` | `1200 x 1500` | `50% 50%` | Integrado (definitivo M2.1) |
| Pavilhão Sete | `pavilhao-exterior` | `16:9` | `1920 x 1080` | `58% 45%` | Integrado (definitivo M2.1) |
| Pavilhão Sete | `pavilhao-interior` | `16:9` | `1920 x 1080` | `50% 45%` | **Provisório (HTTP 429 — pendente)** |
| Pavilhão Sete | `pavilhao-detalhe` | `4:5` | `1200 x 1500` | `50% 50%` | **Provisório (HTTP 429 — pendente)** |
| Institucional | `studio-editorial` | `4:3` | `1600 x 1200` | `45% 50%` | **Provisório (HTTP 429 — pendente)** |
