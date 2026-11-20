# Security & dead-code sweep (static PWA)

Audit date: 2026-11-20. Thoroughness: **medium**. Scope: entire repo; runtime = `index.html` + `sw.js` shell. **No app code edited** — findings and removal candidates only.

Related: [DEAD_CODE_SWEEP.md](./DEAD_CODE_SWEEP.md) (i18n/language UI pass; partly superseded below).

---

## Executive summary

| Area | Verdict |
| --- | --- |
| Backend / DB | **None** — static hosting only |
| Dead code | Small surface: unused `NARRATION` exports, dev duplicate tooling, bundle temp file |
| XSS | **Low** for shipped content (trusted JS/JSON); `innerHTML` pattern is broad if untrusted data is ever interpolated |
| SW cache | Network-first same-origin + opportunistic `cache.put` — reasonable; version bump on deploy |
| Secrets | **None in tracked static JS**; Eleven Labs key only in dev `tools/generate-kids-voice.mjs` via env |
| Security headers | **Firebase Hosting** template in `firebase.json`; **GitHub Pages** has no equivalent in-repo |

---

## 1) Dead code

Format: `path | symbol | safe-to-remove (yes/no)`

### 1.1 Unused functions / exports

| path | symbol | why | safe-to-remove? |
| --- | --- | --- | --- |
| `js/narration.js` | `window.NARRATION.hasLesson` | Exported; zero call sites in repo | **yes** (drop from export or use in UI) |
| `js/narration.js` | `window.NARRATION.lessonKey` | Only used inside IIFE; exported unused | **yes** |
| `js/narration.js` | `window.NARRATION.kidKey` | Only used inside IIFE; exported unused | **yes** |
| `js/narration.js` | `window.NARRATION.resolve` | Only used inside IIFE; exported unused | **yes** |

All other runtime functions in `js/app.js`, `js/i18n.js`, `js/keys.js`, `js/courses.js`, `js/pics.js`, and `js/more/*` are referenced (directly or via `gen()` / `paint()` / router).

### 1.2 Unused CSS selectors

Heuristic scan of `css/app.css` (225 class tokens) against `index.html`, `js/*`, `js/more/*`: **no high-confidence dead rules**. Earlier false positives (`badge-geo`, `pic-note`, `frac-big`, etc.) are emitted from `js/pics.js` or `js/app.js` (`theorem-badge badge-${tag}`).

| path | symbol | why | safe-to-remove? |
| --- | --- | --- | --- |
| — | — | No confirmed orphan selectors at medium thoroughness | **no** |

### 1.3 Orphan files (not in `index.html` / `sw.js`)

By design (dev/ops/content — **keep** unless consolidating):

| path | symbol | why | safe-to-remove? |
| --- | --- | --- | --- |
| `scripts/bundle-i18n-pack.mjs` | (file) | Builds `js/i18n/*-pack-*.js` from `docs/i18n/*.json` | **no** |
| `scripts/audit-answer-spoilers.mjs` | (file) | QA; documented in `ANSWER_SPOILERS.md` | **no** |
| `tools/check.js` | (file) | Lesson `gen()` fuzzer | **no** |
| `tools/spoiler-scan.js` | (file) | Overlaps `scripts/audit-answer-spoilers.mjs` (older, narrower) | **yes** if team standardizes on `scripts/` |
| `tools/generate-kids-voice.mjs` | (file) | Owner voice generation (env API key) | **no** |
| `tools/record-owner.html` | (file) | Owner recording workflow | **no** |
| `tools/voice-sample.html` | (file) | Dev helper | **yes** if unused locally |
| `docs/**` | (tree) | Research, i18n sources, ops | **no** |
| `.venv-gdown/**` | (tree) | Local Python venv; not deployed (`firebase.json` ignores `**/.*`) | **yes** from repo / add to `.gitignore` if committed |

Runtime intermediates:

| path | symbol | why | safe-to-remove? |
| --- | --- | --- | --- |
| `js/i18n/.tmp-build/ne-tables.json` | (file) | Bundle intermediate; not loaded by HTML/SW | **yes** (and ignore `.tmp-build/`) |

**Runtime JS:** Every script in `index.html` is also listed in `sw.js` `SHELL` (including `js/more/tables.js` and all six i18n packs). No orphan runtime modules.

### 1.4 Unused UI keys (`js/i18n.js`)

| path | symbol | why | safe-to-remove? |
| --- | --- | --- | --- |
| — | — | All 71 `UI.en` keys are referenced via `t("…")` in `js/app.js`, `js/keys.js`, or `js/i18n.js` (`langLabel` in `langBarHtml`) | **no** |
| `js/i18n.js` | `UI_OVR.*` partial locale maps | Intentional chrome-only overrides; `uiPack()` merges with `UI.en` fallback | **no** |

**Stale note:** Prior sweep listed `langHint` and `I18N.LANGS` / `I18N.lang` — **already removed** from current `js/i18n.js` export surface.

### 1.5 Duplicate helpers

| path | symbol | why | safe-to-remove? |
| --- | --- | --- | --- |
| `js/app.js` | `pick(list)` | Same idea as `window.MK.pick` in `js/courses.js`; separate IIFE scope | **no** (consolidation optional refactor) |
| `js/app.js` | `shuffleOf(list)` | Local Fisher–Yates; `MK.shuffle` exists for lesson `gen()` | **no** |
| `js/more/geo.js`, `js/more/trig.js`, `js/more/arith.js` | `sup(n)` | Per-file unicode superscript helpers | **no** (small, isolated packs) |
| `js/i18n.js` | `COURSE_META` vs `js/i18n/*-pack-*.js` headers | Library translates before packs load; packs override when present | **no** |
| `tools/spoiler-scan.js` | (file) | Duplicate intent vs `scripts/audit-answer-spoilers.mjs` | **yes** (one dev tool) |

---

## 2) Architecture

| Question | Answer |
| --- | --- |
| Database? | **No** — no SQLite, IndexedDB, Firebase SDK, or ORM in runtime |
| API backend? | **No** — no server routes; `fetch` is same-origin static assets (`voices/*`, narration probe) only |
| Auth? | **No** accounts (see `README.md`) |

### Client storage (should stay client-side: **yes**)

| path | key / pattern | purpose | client-side OK? |
| --- | --- | --- | --- |
| `js/app.js` | `localStorage` `mathenomics-save` | Coins, bests, last lesson, metrics | **yes** |
| `js/i18n.js` | `localStorage` `mathenomics-lang` | Locale preference | **yes** |
| `js/keys.js` | `mathenomics-sound`, `mathenomics-keys-mode` | Kids keyboard prefs | **yes** |
| `sw.js` | `CacheStorage` `mathenomics-v25` | Offline shell + cached GETs | **yes** (PWA) |

### Network

| path | pattern | notes |
| --- | --- | --- |
| `js/narration.js` | `fetch(voices/…)` HEAD/Range GET | Static files only |
| `index.html` | Google Fonts CSS | Third-party stylesheet (no cookies in typical use) |
| `tools/generate-kids-voice.mjs` | Eleven Labs API | **Dev-only**; not in browser bundle |

### Deploy shape

- **Firebase Hosting:** `firebase.json` serves `.`, ignores `docs/`, `tools/`, etc.
- **GitHub Pages / raw static:** Same files as repo root; no `firebase.json` enforcement.

---

## 3) Security (frontend-appropriate)

### 3.1 XSS / `innerHTML`

Primary pattern: `js/app.js` `paint()` → `app.innerHTML = …` with large HTML templates; also `verdict.innerHTML`, `grid.innerHTML`, `picks.innerHTML`, `js/keys.js` `pad.innerHTML`.

| path | risk | detail | severity |
| --- | --- | --- | --- |
| `js/app.js` | Trusted static content | Lesson text, cheats, quiz strings from in-repo `gen()` / i18n packs — not user-supplied at runtime | **Low** |
| `js/app.js` | `fill()` / `t(key, vars)` | Interpolates `{name}`, `{pct}`, etc. without HTML escaping; vars come from static lesson/course data today | **Low**; **Med** if future user-generated labels use `t()` |
| `js/app.js` | `q.pic` in play round | Injected as HTML from `P.*` diagram helpers | **Low** (author-controlled) |
| `js/i18n.js` | `langBarHtml` | `L.native` / `L.label` from fixed `LANGS` table | **Low** |
| `js/keys.js` | Emoji pad | Built from fixed `DIGITS` / emoji tables | **Low** |

**No `eval` / `new Function`** in repo JS.

**Hardening (optional):** central `escapeHtml()` for any string that ever comes from `localStorage`, URL/hash, or editable i18n; prefer `textContent` for simple text nodes.

### 3.2 `localStorage` integrity

| path | issue | notes |
| --- | --- | --- |
| `js/app.js` | `JSON.parse(localStorage.getItem(KEY) \|\| "{}")` | Uncaught throw if save is corrupted → app fails on load (self-DoS, not XSS) |
| `js/i18n.js` | `readLang()` | Validates against `LANG_IDS` — good |

### 3.3 Open redirects

| path | pattern | verdict |
| --- | --- | --- |
| `js/app.js` | Hash router `#/…` only; no `location.href =` from user input | **No open redirect** |
| `js/app.js` | External `snd.page` links | `target="_blank"` + `rel="noopener"` on kids credits | **OK** |

### 3.4 Service worker cache

```111:122:sw.js
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.status === 200) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
  );
});
```

| topic | assessment |
| --- | --- |
| Cross-origin | Ignored — **good** |
| Strategy | Network-first, cache 200 responses — updates propagate when online |
| Versioning | `CACHE = "mathenomics-v25"` + activate deletes old caches — **bump on every deploy** |
| Offline gap | `SHELL` lists subset of `pics/`; other assets fill on first visit then cache | Acceptable; document for testers |
| Poisoning | Attacker needs MITM on same-origin fetch or compromised host — standard static-site model |

### 3.5 Secrets in repo

| finding | status |
| --- | --- |
| `.env` / API keys in `js/` | **None found** |
| `tools/generate-kids-voice.mjs` | Reads `process.env.ELEVENLABS_API_KEY` — keep out of CI logs |
| `docs/ops/` | Documents Firebase/GCP; no committed credentials |

### 3.6 Security headers (GitHub Pages vs Firebase)

**Present in repo (`firebase.json`):** `Cache-Control` for `sw.js`, `index.html`, `manifest`, hashed assets.

**Not in repo (relevant if hosting on GitHub Pages or generic static CDN):**

| header | recommendation |
| --- | --- |
| `Content-Security-Policy` | Consider `default-src 'self'`; `style-src 'self' fonts.googleapis.com fonts.gstatic.com`; `font-src fonts.gstatic.com`; `img-src 'self' data:`; tighten `script-src` (no inline if you move to nonces later — today scripts are external files only, which helps) |
| `X-Content-Type-Options: nosniff` | Yes |
| `Referrer-Policy: strict-origin-when-cross-origin` | Yes |
| `Permissions-Policy` | Disable unused features (mic/camera not needed in learner UI) |
| `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'` | Reduce clickjacking |

GitHub Pages does not read `firebase.json`. Options: document limitations, use a reverse proxy (Cloudflare Pages `_headers`), or stay on Firebase Hosting for header control.

---

## 4) Cross-check: prior dead-code doc

| prior item | current tree |
| --- | --- |
| `UI.*.langHint` | **Absent** — already cleaned |
| `I18N.LANGS` / `I18N.lang` export | **Absent** from `window.I18N` |
| Hero `.lang-picker` CSS | **Absent** from `css/app.css` |

---

## 5) Suggested follow-up (when editing code)

1. Trim `window.NARRATION` to `playLesson`, `playKid`, `stop` only (or wire `hasLesson` into the Hear button UX).
2. Delete or gitignore `js/i18n/.tmp-build/`; add ignore rule in bundle script docs.
3. Retire `tools/spoiler-scan.js` in favor of `scripts/audit-answer-spoilers.mjs` (or vice versa) — one spoiler QA entrypoint.
4. Wrap `mathenomics-save` parse in try/catch with `{}` default to survive corrupted storage.
5. If deploying to GitHub Pages, add CSP/nosniff via supported mechanism or document Firebase Hosting as the header-complete target.