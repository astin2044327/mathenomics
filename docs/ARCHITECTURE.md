# Architecture (Mathenomics)

## Shape

Mathenomics is a **static Progressive Web App**: HTML/CSS/JS on the CDN (GitHub Pages or Firebase Hosting). There is **no application server, no REST/GraphQL API, and no database**.

```
Browser (UI)
  → local JS modules (courses, i18n, kids, play)
  → localStorage (device-local progress only)
  → same-origin static assets (voices, pics, sounds)
```

## “Frontend → API → DB”

That three-tier pattern applies when there is a backend. Here:

| Layer | Mathenomics |
| --- | --- |
| Frontend | `index.html` + `js/*` + `css/*` |
| API | **None** — no privileged server endpoints |
| Database | **None** — no remote DB; **do not** add direct DB SDKs in the browser |

Device progress (`mathenomics-save`, language, kids pad prefs) is **localStorage only**. Treat it as untrusted on load (parse + validate). Never put secrets in client JS.

If a future cloud sync is needed: introduce a thin HTTPS API first; the browser must not talk to a database directly.

## Tests & CI

See `docs/ops/CI.md`. Unit (Vitest) + integration (Playwright) + static load probe (autocannon) run on GitHub Actions.

## Security notes

- CSP + referrer meta on `index.html` (GitHub Pages).
- Hosting headers (`nosniff`, frame, permissions) in `firebase.json` when using Firebase Hosting.
- Escape dynamic strings before `innerHTML` where feedback text is interpolated.
- Service worker caches same-origin shells only; bump `CACHE` in `sw.js` on release.
