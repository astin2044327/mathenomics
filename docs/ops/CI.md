# CI, tests, and load

## Commands

| Script | What it does |
| --- | --- |
| `npm run check` | Fuzz every lesson `gen()` (legacy QA) |
| `npm run test:unit` | Vitest — `safe` helpers, i18n, lesson check |
| `npm run test:integration:http` | HTTP smoke (no browser) |
| `npm run test:e2e` | Playwright browser smoke (home, grade, kids) |
| `npm run test:integration` | HTTP smoke + Playwright |
| `npm run test:load` | Autocannon against static assets |
| `npm run ci` | check + unit + integration + load |

## GitHub Actions

Workflow: `.github/workflows/ci.yml` — Node **22**, three jobs (unit, integration, load).

## Load testing reality check

Mathenomics is a **static PWA** (no API, no DB). “How many users?” ≈ how many concurrent **file downloads** the host/CDN allows (GitHub Pages / Firebase), not concurrent DB sessions.

Default probe: **25 connections × 8s** on `/`, CSS, and main JS. Override with `LOAD_CONN`, `LOAD_DURATION`, or `BASE_URL` for production (Pages/Firebase). Local `python3 -m http.server` will show timeouts under burst — that measures the toy server, not product capacity.

## Libraries

Dev tooling is kept current via npm (`vitest`, `@playwright/test`, `autocannon`). The runtime app stays dependency-free vanilla JS for reliability and CSP simplicity.
