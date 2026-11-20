# Mathenomics — design

## Product idea

The free offline mnemonic map for school math — one phrase per skill, the exception on the same card, then a short game; no account, no solver.

## Audience

- Learners from early counting through introductory calculus
- Kids who need pictures and sounds (Kids’ corner is separate from the math trail)
- Teachers who want a shared, open library with no accounts

## Access model

No login. No roles. Anyone with the URL (or the installed PWA) can play every lesson and Kids’ corner. Progress never leaves the device. Owner narration files live in the shipped `voices/` folder (or are added by the owner before deploy).

## Play loop

1. Choose any grade or lesson.
2. Learn the phrase with a picture.
3. Optionally walk a worked problem step by step.
4. Play five rounds with hearts and coins.
5. Keep the best mark; Mio walks the map to the next stop.

## Visual language

- Paper tone (`#F4EEE3`) with a soft grid, ink borders, and hard offset shadows
- Display type for phrases; clean sans for body copy
- Grade colour bands on maps and report cards
- Mio: an original fox guide (not a licensed film or comic character)
- Diagrams are drawn SVG/HTML, not stock photos
- Kids pages use large emoji art plus letter tiles; Hear plays an owner clip when present, then a real animal MP3 when available

## Content rules

- One mnemonic phrase per lesson
- Steps explain what the phrase stands for
- “Watch out” always states when the trick fails
- Generators invent fresh numbers; answers are checked by `tools/check.js`
- Prefer well-known classroom mnemonics when they exist; otherwise a short original phrase

## Library shape (current)

About 128 lessons across:

| Course | Focus |
| --- | --- |
| K–1 | Counting, comparing, making ten |
| Grades 1–2 | Place value, regrouping, time, rounding |
| Grades 3–4 | Times tables, division, factors, area |
| Grades 5–6 | Fractions, decimals, ratio, stats |
| Grade 7 | Integers, percent, equations, circle |
| Grade 8 | Triangle & angle theorems, slope, volumes |
| Grade 9 | Similarity, circles, algebra, quadratic |
| Grade 10 | Trig table, identities, circle theorems, sequences |
| Advanced trigonometry | Sine/cosine rules, compound angles, equations |
| Grades 11–12 | Calculus starters, logs |

## Kids’ corner

Separate from marks. Sets: animals, fruits, things that go, music. One picture per page; Next / Back / swipe / arrows. Owner-recorded names play from `voices/` when present; animals then play real Commons MP3s. Learners do not record.

## Technical design

- Static PWA: `index.html`, `css/app.css`, `js/*`, `sw.js`, `manifest.webmanifest`
- Hash routes: `#/`, `#/g/:course`, `#/l/:course/:lesson`, `#/play/…`, `#/done/…`, `#/report`, `#/kids`, `#/kids/:set/:i`
- Service worker cache name bumps when shell assets change; fetch is network-first with cache fallback
- Save key: `mathenomics-save` → `{ coins, best, last, walkFrom }`
- Owner narration: `voices/{course}-{lesson}.webm` (see `voices/README.md`)
- Marks: A+ (100), A ≥90, B ≥80, C ≥70, D ≥60, else Retry; stars 3 / 2 / 1 / 0 on the same thresholds

## Intelligence / AI

Runtime grading and speech do not call AI services. Content was authored with AI assistance into static lesson files. See README “Where AI is used”.

## Files

| Path | Purpose |
| --- | --- |
| `js/courses.js` | Core lessons + `window.MK` kit for packs |
| `js/more/arith.js` | Arithmetic / number-sense pack |
| `js/more/geo.js` | Geometry and algebra pack |
| `js/more/trig.js` | Trig table, advanced trig, calculus extras |
| `js/pics.js` | Diagram library |
| `js/kids.js` | Kids sets |
| `js/sounds.js` | Animal sound index |
| `js/narration.js` | Plays owner clips from `voices/` |
| `js/more/tables.js` | Times tables 2–12 + puzzle entry |
| `js/more/expand.js` | Extra classroom mnemonics per grade |
| `js/more/pabson.js` | Grade 12 PABSON-style hard set |
| `js/more/cheats.js` | Per-grade cheatsheets |
| `js/app.js` | UI, game, marks, kids pager, cheatsheet, table puzzle |
| `tools/record-owner.html` | Owner-only narration recorder |
| `sounds/` | Trimmed animal MP3s + `CREDITS.md` |
| `tools/check.js` | Catalog fuzz checker |

## Out of scope (this version)

Accounts, classrooms, cloud sync, spaced-repetition servers, live AI tutoring, and licensed third-party characters.
