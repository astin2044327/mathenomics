# Feature map — where to touch what

**Audience:** new developers and coding agents.  
**Goal:** jump to the right file in one hop instead of scanning the whole tree.  
**Rules before editing:** [CODE_CHANGE.md](./CODE_CHANGE.md) · architecture: [ARCHITECTURE.md](./ARCHITECTURE.md) · product: [../DESIGN.md](../DESIGN.md).

> Mathenomics is a **static PWA**: no API, no database. Progress = `localStorage` only. Do not invent a backend layer.

---

## Quick “I want to…” index

| Goal | Primary files |
| --- | --- |
| Change home / grade map / lesson / play / mark UI | `js/app.js`, `css/app.css` |
| Add or edit a **core** K–12 lesson | `js/courses.js` |
| Add lessons to an existing band (bulk) | `js/more/arith.js`, `geo.js`, `trig.js`, `expand.js` |
| Add a **whole course** (Tables, Optional, HS, PABSON…) | `js/more/*.js` via `window.MK.course(...)` |
| Cheatsheet cards per grade | `js/more/cheats.js` |
| Diagram / SVG picture helper | `js/pics.js` |
| UI language chrome (globe menu) | `js/i18n.js` |
| Curriculum profile (US / Nepal, orthogonal to lang) | `js/profiles.js` → `window.MATH_PROFILES`; wired in `js/app.js` bar + `locC`/`locL` |
| Lesson text translation (ne/es packs) | `js/i18n/*-pack-*.js` + source JSON in `docs/i18n/` |
| Kids’ corner | `js/kids.js`, `js/sounds.js`, `sounds/` |
| Phrase audio (owner clips) | `js/narration.js`, `voices/`, `tools/record-owner.html` |
| Crash / localStorage hardening | `js/safe.js` |
| Offline cache / PWA | `sw.js`, `manifest.webmanifest` |
| Security headers (Firebase) | `firebase.json` |
| Fuzz every `gen()` | `tools/check.js` |
| Unit / integration / load CI | `tests/`, `.github/workflows/ci.yml`, `scripts/load-test.mjs` |
| Research mnemonics before shipping | `docs/research/MNEMONICS_SWARM.md`, `mnemonics.json` |
| Teaching / country / competitors / gaps (design pending) | `docs/research/TEACHING_MNEMONICS.md`, `COUNTRY_CURRICULUM.md`, `COMPETITORS.md`, `MNEMONICS_GAPS.md` |

---

## Boot order (do not reorder lightly)

`index.html` loads scripts **in this order**:

1. `js/safe.js` → `window.MATH_SAFE`
2. `js/pics.js` → `window.PICS`
3. `js/courses.js` → `window.COURSES` + `window.MK`
4. `js/more/arith.js` → `geo.js` → `trig.js` → `tables.js` → `expand.js` → `hs.js` → `pabson.js` → `optional.js` → mutate `COURSES` via `MK`
5. `js/more/cheats.js` → attaches `cheat[]` onto courses
6. `js/i18n.js` + `js/i18n/ne-pack-*.js` + `es-pack-*.js` → `window.I18N` / `I18N_CONTENT`
7. `js/kids.js`, `sounds.js`, `narration.js`, `keys.js`
8. `js/profiles.js` → `window.MATH_PROFILES` (curriculum; before `app.js`)
9. `js/app.js` → router + paint (`#app`)

Service worker (`sw.js`) registers from `app.js` and must list any new shell scripts you add to `index.html`.

---

## Lesson shape (every content author must know)

```js
{
  id, name, phrase,
  steps: string[],          // what the phrase stands for
  exception,                // “Watch out” — when the trick fails
  also?, pic?, work?,       // optional extras / worked examples
  gen() { return Q(...); }  // 4-choice quiz item; answers checked by tools/check.js
}
```

Helpers live on `window.MK`: `Q`, `R`, `pick`, `add`, `course`, `patch`, `P` (pics), etc. (`js/courses.js` end).

**Current inventory (runtime):** **14 courses · ~345 lessons** (core + more packs + cheats attached).

| Course `id` | Grade band | Typical owner file(s) |
| --- | --- | --- |
| `k` | K–1 | `courses.js` + `more/expand.js` / arith |
| `g1` | Grades 1–2 | `courses.js` + more packs |
| `g3` | Grades 3–4 | `courses.js` + more |
| `tables` | Times tables 2–12 | `more/tables.js` |
| `g5` | Grades 5–6 | `courses.js` + more |
| `g7` | Grade 7 | `courses.js` + more |
| `optional` | Optional · 7–12 | `more/optional.js` |
| `g8`–`g10` | 8–10 | `courses.js` + `geo.js` / `trig.js` / expand |
| `hs` | High School theorems | `more/hs.js` |
| `trig2`, `g11` | 11–12 | `courses.js` + `trig.js` / expand |
| `pabson` | SEE / NEB hard set | `more/pabson.js` |

Exact lesson counts drift as packs grow — re-count with a local `COURSES` load or `node tools/check.js`.

---

## Folder & file map

### Root shell

| Path | Owns | Touch when… |
| --- | --- | --- |
| `index.html` | Shell, CSP, script load order, `#app` | Adding a new global script; meta/CSP |
| `manifest.webmanifest` | Install metadata / icons | PWA name, icons, start URL |
| `sw.js` | Cache name + precache list (GET-only) | New first-party assets that must work offline; bump `CACHE` |
| `firebase.json` | Firebase Hosting headers / ignores | Deploy headers, cache rules |
| `package.json` | npm scripts: check, unit, e2e, load, CI | New test/tool entrypoints |
| `DESIGN.md` | Product vision, visual language, content rules | Changing the teaching product (not just code) |
| `README.md` | Human onboarding | High-level run/deploy notes |

### CSS

| Path | Owns | Touch when… |
| --- | --- | --- |
| `css/app.css` | All learner UI styles (grades, map, lesson, play, kids, lang menu, cheats) | Visual / layout changes |

### Core JS

| Path | Global | Owns | Touch when… |
| --- | --- | --- | --- |
| `js/safe.js` | `MATH_SAFE` | `esc`, save load/write clamps | XSS escape, corrupt localStorage |
| `js/pics.js` | `PICS` | SVG/HTML diagram builders used by lessons | New or fixed diagrams |
| `js/courses.js` | `COURSES`, `MK` | Core catalog + kit for packs | Core lessons; kit API |
| `js/app.js` | (router) | Hash routes, home/map/lesson/play/mark/cheat/kids/report, lang menu wiring, metrics | Screens, navigation, play loop UX |
| `js/i18n.js` | `I18N` | UI strings, globe menu HTML, `locCourse` / `locLesson` | New UI locale chrome; overlay merge rules |
| `js/profiles.js` | `MATH_PROFILES` | Curriculum region (`us`/`np`/`generic`): grade labels, order-ops variants, SEE playlist, customary de-emphasize | Country flavor without forking `COURSES`; never auto-bind to language |
| `js/narration.js` | (used by app) | Owner phrase audio from `voices/` | Hear-phrase behavior |
| `js/kids.js` | kids routes/content | Kids’ corner pages | Kids features (**English only**) |
| `js/sounds.js` | kids SFX map | Animal/MP3 mapping | Kids audio |
| `js/keys.js` | keyboard helpers | Optional keyboard / pad input | Input UX |

### Content modules (`js/more/`)

Loaded after `courses.js`. Prefer **`MK.add` / `MK.course` / `MK.patch`** — do not duplicate kit helpers.

| Path | Feature |
| --- | --- |
| `arith.js` | Extra arithmetic / number lessons spliced into bands |
| `geo.js` | Geometry / theorem playables |
| `trig.js` | Trigonometry expansions |
| `tables.js` | Dedicated times-tables course + puzzle fodder |
| `expand.js` | Large mid/upper expansion pack |
| `hs.js` | High School Proof mode course |
| `pabson.js` | Nepal PABSON / SEE / NEB-oriented hard set |
| `optional.js` | Optional mathematics course |
| `cheats.js` | Per-course `cheat[]` sheets (must run **last** among more/) |

### i18n

| Path | Role |
| --- | --- |
| `js/i18n.js` | Runtime UI + overlay apply |
| `js/i18n/ne-pack-*.js` | Nepali lesson overlays (bundled) |
| `js/i18n/es-pack-*.js` | Spanish lesson overlays (bundled) |
| `docs/i18n/*.json` | Editable source packs per locale × band |
| `scripts/bundle-i18n-pack.mjs` | Rebuild JS packs from JSON |

**Policy:** UI chrome can be many locales; full lesson overlays only where packs exist; Kids stay English ([CODE_CHANGE.md](./CODE_CHANGE.md)).

### Assets

| Path | Role |
| --- | --- |
| `icons/` | App icons |
| `voices/` | Owner-recorded phrase clips (not learner-generated) |
| `sounds/` | Kids animal MP3s + `CREDITS.md` |
| `pics/` (if present) | Static images (diagrams prefer `js/pics.js`) |

### Tests & CI

| Path | Role |
| --- | --- |
| `tests/unit/*.test.js` | Vitest: safe, i18n, lessons |
| `tests/integration/smoke.spec.js` | Playwright UI smoke |
| `tests/integration/http-smoke.mjs` | HTTP smoke without browser when needed |
| `vitest.config.mjs` / `playwright.config.mjs` | Runners |
| `scripts/load-test.mjs` | Autocannon static GET capacity probe |
| `scripts/audit-answer-spoilers.mjs` | Spoiler QA |
| `.github/workflows/ci.yml` | PR/main CI |
| `docs/ops/CI.md` | How CI/load relate to CDN capacity |

### Docs (by intent)

| Path | Role |
| --- | --- |
| `docs/FEATURE_MAP.md` | **This file** — agent/dev touch map |
| `docs/ARCHITECTURE.md` | Static PWA / no FE→DB |
| `docs/CODE_CHANGE.md` | Smallest-change + i18n rules |
| `docs/ops/*` | Deploy, Pages, QA, metrics, CI |
| `docs/research/MNEMONICS_*.md` | Phrase harvest & validation |
| `docs/research/ANSWER_SPOILERS.md` | Anti-spoiler rules |
| `docs/research/PABSON_*` / `HS_*` | Exam / theorem research |
| `docs/SWARM.md` | Prior swarm process notes |

### Tools

| Path | Role |
| --- | --- |
| `tools/check.js` | Fuzz every lesson `gen()` |
| `tools/record-owner.html` | Owner records phrase clips |
| `tools/voice-sample.html` / `generate-kids-voice.mjs` | Voice helpers |

---

## Global registry (`window.*`)

| Global | Set by | Used by |
| --- | --- | --- |
| `MATH_SAFE` | `safe.js` | `app.js` |
| `PICS` | `pics.js` | `courses.js`, all `more/*` |
| `COURSES` / `MK` | `courses.js` (+ `more/*`) | `app.js`, `i18n.js`, `check.js` |
| `I18N` | `i18n.js` | `app.js` |
| `I18N_CONTENT` | `i18n/*-pack-*.js` | `i18n.js` |
| `MATH_PROFILES` | `profiles.js` | `app.js` (`locC`/`locL` merge: base → profile → i18n) |
| `KIDS` | `kids.js` | `app.js`, `keys.js` |
| `SOUNDS` | `sounds.js` | `app.js` kids hear |
| `NARRATION` | `narration.js` | `app.js` |
| `KEYS` | `keys.js` | `#/keys` smash pad |
| `MATH_METRICS` | `app.js` | `keys.js` |

Home library pin order for special courses lives in `app.js` → `libraryCourses()` (hs / tables / pabson / optional).

### i18n pack splits (ne & es)

| Pack | Courses |
| --- | --- |
| `*-pack-a.js` | `k`, `g1`, `g3`, `tables` |
| `*-pack-b.js` | `g5`, `g7`, `optional`, `g8` |
| `*-pack-c.js` | `g9`, `g10`, `hs`, `trig2`, `g11`, `pabson` |

Edit JSON under `docs/i18n/`, then `scripts/bundle-i18n-pack.mjs`. Quiz **prompts stay English** even when lesson chrome is translated.

---

## Routes (hash) — owned by `js/app.js`

| Pattern | Screen |
| --- | --- |
| `#/` | Home (grades + kids entry + lang globe) |
| `#/g/:courseId` | Grade map (Mio trail) |
| `#/l/:courseId/:lessonId` | Lesson (phrase, steps, watch-out, work) |
| `#/play/:courseId/:lessonId` | Five-round quiz |
| `#/done/:courseId/:lessonId` | Round results / mark |
| `#/report` | Report card |
| `#/cheat/:courseId` | Grade / theorem cheatsheet |
| `#/puzzle/:n` | Times-table blank puzzle (`n` = 2–12) |
| `#/kids` | Kids’ corner home |
| `#/kids/:set/:i` | Kids pager (ocean intro: `#/kids/ocean/intro`) |
| `#/keys` | Mio smash keyboard pad |

---

## Persistence keys

| Key | Where | What |
| --- | --- | --- |
| `mathenomics-save` | `safe.js` / `app.js` | Coins, marks, last lesson, metrics |
| `mathenomics-lang` | `i18n.js` | Selected UI/content lang |
| `mathenomics-profile` | `profiles.js` | Curriculum region (`us` default; `np`, `generic`) — orthogonal to lang |
| `mathenomics-keys-sound` | `keys.js` | Smash pad sound pref |
| `mathenomics-keys-mode` | `keys.js` | Smash pad mode (ABC/abc/123) |

Always go through `MATH_SAFE.loadSave` / `writeSave` when touching save shape.

---

## Component / module mental model (no framework)

There are **no React/Vue components**. Think in **screens + content packs**:

```
index.html
  └─ #app  ← painted by app.js screens
       ├─ grades / map / lesson / play / mark / cheat / kids
       └─ data from COURSES (+ I18N overlays)
            ├─ pics via PICS.*
            ├─ audio via narration / sounds
            └─ progress via MATH_SAFE + localStorage
```

**To add a lesson safely**

1. Prefer validating phrase in `docs/research/` first.
2. Add lesson object via `MK.add` / `MK.course` in the right `js/more/*.js` (or `courses.js` for core).
3. Add cheatsheet row in `cheats.js` if it belongs on the grade sheet.
4. Add pic helper in `pics.js` if needed.
5. Run `node tools/check.js`.
6. If translated: update `docs/i18n/` + rebuild packs; keep Kids English.
7. Bump `sw.js` `CACHE` if shell/scripts changed.
8. Avoid putting answers in Learn-mode diagrams ([ANSWER_SPOILERS.md](./research/ANSWER_SPOILERS.md)).

---

## Agent cheat sheet

| Change type | Start here | Also check |
| --- | --- | --- |
| New mnemonic / missing grade topic | `docs/research/MNEMONICS_SWARM.md` → `js/more/*` + `cheats.js` | `tools/check.js`, spoilers |
| Teach-loop UX | `js/app.js` + `css/app.css` | `DESIGN.md` |
| Country / exam flavor | `profiles.js` + `pabson.js`, research docs — **do not** fork whole tree | i18n packs, CODE_CHANGE |
| New UI language chrome only | `js/i18n.js` `UI` / overlays | fonts in `index.html` |
| Full lesson locale | `docs/i18n/` → `bundle-i18n-pack.mjs` → `js/i18n/*-pack-*.js` | Kids English |
| Offline broken after deploy | `sw.js` cache list + version | `index.html` script list |
| CI red | `.github/workflows/ci.yml` + failing test file | `docs/ops/CI.md` |

---

## Out of scope (do not invent)

- Browser → database SDKs  
- Learner accounts / cloud progress sync (needs a real API first)  
- Device TTS for lesson phrases (owner clips only)  
- Rewriting the app into a SPA framework without an explicit product decision  

When in doubt: **smallest change**, reuse `MK` / `I18N` / `MATH_SAFE`, update this map if you add a new top-level module.
