# Dead code sweep (language UI + i18n)

Audit date: 2025-11-20. Scope: `js/i18n.js`, `js/app.js`, `js/i18n/`, `scripts/`, hero/bar language CSS. **No edits applied** — removal candidates only.

Runtime load path: `index.html` + `sw.js` shell (all six `*-pack-*.js` files are live).

## Summary

| Safe to remove (`yes`) | Count |
| --- | ---: |
| High-confidence rows below | **3** |

Already cleaned (nothing to delete): hero `langPickerHtml` / `bindLangPicker` / `.lang-btn` wiring; bar uses `langBarHtml` + `bindLangMenu`. Old hero `.lang-picker` CSS block is **not** in current `css/app.css` (bar `.lang-menu` rules only).

---

## Removal candidates

| path | symbol | why dead | safe to remove? |
| --- | --- | --- | --- |
| `js/i18n.js` | `UI.*.langHint` (en, ne, es) | Left from hero language strip; zero `t("langHint")` in `app.js` or `i18n.js` (72 other UI keys are referenced). | **yes** |
| `js/i18n.js` | `window.I18N.LANGS` (public export) | `LANGS` array is used only inside the IIFE (`setLang`, `langBarHtml`). No `I18N.LANGS` reads anywhere in the repo. | **yes** (stop exporting; keep internal `LANGS`) |
| `js/i18n.js` | `window.I18N.lang` getter | No `I18N.lang` reads in repo; language changes go through `setLang` only. | **yes** (stop exporting getter) |

---

## Not dead / do not remove

| path | symbol | why | safe to remove? |
| --- | --- | --- | --- |
| `js/i18n.js` | `langBarHtml`, `globeIco`, `locCourse`, `locLesson`, `COURSE_META`, `t`, `setLang`, `isTranslated` | Bar dropdown, library cards, lesson overlays, quiz note gate. | **no** |
| `js/app.js` | `bindLangMenu`, `bar` / `paint` lang injection | Binds `.lang-opt` / `.lang-drop-btn` after each paint. | **no** |
| `js/i18n/ne-pack-a.js` … `es-pack-c.js` | (files) | All six listed in `index.html` and `sw.js` `SHELL`. | **no** |
| `scripts/bundle-i18n-pack.mjs` | (file) | Build path from `docs/i18n/*.json` → `js/i18n/*-pack-*.js`; not runtime but required for pack maintenance. | **no** |
| `scripts/audit-answer-spoilers.mjs` | (file) | Offline QA; referenced by `docs/research/ANSWER_SPOILERS.md`. Not in `index.html`/`sw.js` by design. | **no** |
| `css/app.css` | `.lang-menu`, `.lang-drop-btn`, `.lang-drop`, `.lang-opt`, `.bar-end` | Matches `langBarHtml` markup. | **no** |

---

## Stale / optional artifacts

| path | symbol | why dead | safe to remove? |
| --- | --- | --- | --- |
| `js/i18n/.tmp-build/ne-tables.json` | (file) | Appears in workspace index only; **not on disk** in this tree, not referenced by HTML/SW/scripts. Typical bundle intermediate. | **yes** if it reappears (add `.tmp-build/` to ignore) |

---

## Duplicate logic (intentional — note only)

| path | symbol | note | safe to remove? |
| --- | --- | --- | --- |
| `js/i18n.js` | `COURSE_META` vs `js/i18n/*-pack-*.js` course `grade`/`title`/`blurb` | `locCourse` merges English `COURSES` ← `COURSE_META[lang][id]` ← `I18N_CONTENT` pack. Duplication lets the library translate before packs load and when a course JSON is missing; packs win when present. Trimming `COURSE_META` would break non-pack courses or pre-pack-first-paint. | **no** (keep both; dedupe only if packs guaranteed for every shipped locale course) |
| `docs/i18n/*.json` vs generated packs | course headers | Source of truth for regeneration via `bundle-i18n-pack.mjs`; not runtime duplicates. | **no** |

---

## `js/app.js` / `js/i18n.js` export audit

- **Removed since dropdown move:** `langPickerHtml`, `bindLangPicker`, `.lang-btn` click handlers — **no remaining references** (grep clean).
- **All `t("…")` keys** in `app.js` map to defined `UI` entries except the orphaned `langHint`.
- **Public `window.I18N` surface:** `setLang`, `t`, `locCourse`, `locLesson`, `langBarHtml`, `isTranslated` are all used from `app.js`.

---

## CSS (old hero language picker)

- **Expected dead rules:** `.lang-picker`, `.lang-label`, `.lang-options`, `.lang-btn`, `.lang-hint` (hero strip).
- **Current tree:** none of these selectors exist in `css/app.css`; bar menu styles replaced them. **No CSS deletion needed** unless an older branch is merged back in.

---

## Scripts vs `index.html` / `sw.js`

| path | in index? | in sw? | verdict |
| --- | :---: | :---: | --- |
| `scripts/bundle-i18n-pack.mjs` | no | no | Dev-only; **keep** |
| `scripts/audit-answer-spoilers.mjs` | no | no | Dev-only; **keep** |

---

## Suggested follow-up (when editing)

1. Delete `langHint` from all three `UI` locale objects in `js/i18n.js`.
2. Remove unused `LANGS` and `lang` from `window.I18N` export object (keep internal `LANGS` + `lang` variable).
3. Ignore or delete `js/i18n/.tmp-build/` if it is recreated by local bundle runs.

None of the above affects kids corner (English-only path), learn/play routing, or loading of ne/es content packs.