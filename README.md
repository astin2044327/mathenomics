# Mathenomics

Mathenomics is a grade-by-grade math mnemonic library you can play. Each lesson teaches one phrase that solves a whole kind of problem, shows the exception, then runs a short game so the phrase sticks.

Open `index.html` with any static server (for example `python3 -m http.server 8766`) and visit the local URL. It also installs as a progressive web app.

## Who can log in

Nobody logs in. There is no account, password, or server-side user.

- Progress (coins, best marks, last lesson) is saved in the browser under `localStorage` key `mathenomics-save`.
- Clearing site data for this origin wipes that progress.
- Spoken phrases come from files the **project owner** drops into `voices/` (recorded with `tools/record-owner.html`). Learners do not log in to record, and the app does not use device TTS for lesson phrases.

## Who can play

Anyone who opens the app on that device can play every grade, every lesson, the report card, Kids’ corner, cheatsheets, and the table puzzle. There are no roles, locks, or paywalls. Every map stop is open from the start. Recording narration is an owner workflow outside the learner UI.

## How it works

1. **Home** — pick a grade band (K–1 through grades 11–12, plus Advanced trigonometry).
2. **Map** — Mio the fox walks a trail of lessons. Jump to any stop.
3. **Lesson** — see a diagram, hear the phrase (owner clip from `voices/` when present), read the steps and the “Watch out” exception. Many lessons also have **Solve it with me** worked problems, revealed one step at a time.
4. **Play** — five generated rounds, three hearts, +10 coins per correct answer. Wrong answers show why.
5. **Mark** — letter grade and stars from that round; the report card averages played lessons per grade.
6. **Kids’ corner** — picture pages (animals, fruits, vehicles, music). Hear the owner’s recorded name when a clip exists, then a real animal sound where available; tap Next to keep going.
7. **Cheatsheet** — each grade map links to a one-page sheet of that grade’s mnemonics.
8. **Table puzzle** — fill blanks on the 2–12 times tables.

## Design

See [DESIGN.md](./DESIGN.md) for the product design, visual language, and content rules.  
For “where do I edit X?” use [docs/FEATURE_MAP.md](./docs/FEATURE_MAP.md) (file/folder → feature map for humans and agents).

## What is used

| Piece | Role |
| --- | --- |
| Vanilla HTML / CSS / JS | No build step, no framework |
| Hash router (`#/…`) | Screens without a backend |
| `manifest.webmanifest` + `sw.js` | Installable PWA, network-first offline cache |
| `localStorage` | Coins, marks, last lesson |
| `voices/` + `js/narration.js` | Owner-recorded phrase audio (no learner mic, no TTS for phrases) |
| `tools/record-owner.html` | Local helper for the owner to record and download clips |
| Web Audio API | Short game sound effects |
| SVG / HTML diagrams (`js/pics.js`) | Lesson pictures |
| Wikimedia Commons clips (`sounds/`) | Real animal recordings (see `sounds/CREDITS.md`) |
| `js/courses.js` + `js/more/*.js` | Lesson catalog and question generators |
| `tools/check.js` | Fuzz test for every generator |

## Where AI is used

**At runtime in the shipped app: nowhere.** There is no OpenAI (or other) API call, no cloud tutor, and no account that talks to a model. Graded answers come only from the local lesson generators. Lesson “Hear the phrase” plays **your** (the owner’s) files from `voices/` when present — not device TTS and not a learner microphone. Kids animal sounds are fixed MP3s from Wikimedia Commons.

**During building this project:** Cursor AI agents helped design the UI, write lesson packs and mnemonics, draw diagram helpers, and assemble the PWA. The resulting phrases and worked problems are checked into the repo as ordinary JavaScript, not generated on the fly for the learner.

An earlier user “Record my voice” feature and optional cloud mnemonic lab were removed and are not part of this build.

## Run locally

```bash
cd mathenomics
python3 -m http.server 8766
```

Then open http://127.0.0.1:8766/

Check the catalog:

```bash
node tools/check.js
```

## Deploy (Google Cloud)

Recommended stack is **Firebase Hosting**. Full plan, headers, cost, and rollback: [docs/ops/GCP_DEPLOY.md](./docs/ops/GCP_DEPLOY.md). Helper script: `./docs/ops/deploy.sh` (set `FIREBASE_PROJECT_ID` first; nothing ships until you run it on purpose).

## License notes

App code is yours to use under the repository’s license terms. Animal sound clips keep their original Wikimedia Commons licences; credits appear on each kids page and in `sounds/CREDITS.md`.
