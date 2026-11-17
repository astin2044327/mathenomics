# Mathenomics

Mathenomics is a grade-by-grade math mnemonic library you can play. Each lesson teaches one phrase that solves a whole kind of problem, shows the exception, then runs a short game so the phrase sticks.

Open `index.html` with any static server (for example `python3 -m http.server 8766`) and visit the local URL. It also installs as a progressive web app.

## Who can log in

Nobody logs in. There is no account, password, or server-side user.

- Progress (coins, best marks, last lesson) is saved in the browser under `localStorage` key `mathenomics-save`.
- Your own voice recordings stay in IndexedDB on that same device (`mathenomics-voice`).
- Clearing site data for this origin wipes progress and recordings.

## Who can play

Anyone who opens the app on that device can play every grade, every lesson, the report card, and Kids’ corner. There are no roles, locks, or paywalls. Every map stop is open from the start.

## How it works

1. **Home** — pick a grade band (K–1 through grades 11–12, plus Advanced trigonometry).
2. **Map** — Mio the fox walks a trail of lessons. Jump to any stop.
3. **Lesson** — see a diagram, hear the phrase (device voice or your recording), read the steps and the “Watch out” exception. Many lessons also have **Solve it with me** worked problems, revealed one step at a time.
4. **Play** — five generated rounds, three hearts, +10 coins per correct answer. Wrong answers show why.
5. **Mark** — letter grade and stars from that round; the report card averages played lessons per grade.
6. **Kids’ corner** — picture pages (animals, fruits, vehicles, music). Hear the name, a real animal sound where available, or your own voice; tap Next to keep going.

## Design

See [DESIGN.md](./DESIGN.md) for the product design, visual language, content sources, and file map.

## What is used

| Piece | Role |
| --- | --- |
| Vanilla HTML / CSS / JS | No build step, no framework |
| Hash router (`#/…`) | Screens without a backend |
| `manifest.webmanifest` + `sw.js` | Installable PWA, network-first offline cache |
| `localStorage` | Coins, marks, last lesson |
| IndexedDB (`js/voice.js`) | Own-voice clips |
| Web Speech API | Device voice for phrases and kids names |
| Web Audio API | Short game sound effects |
| MediaRecorder | Microphone capture for “Record my voice” |
| SVG / HTML diagrams (`js/pics.js`) | Lesson pictures |
| Wikimedia Commons clips (`sounds/`) | Real animal recordings (see `sounds/CREDITS.md`) |
| `js/courses.js` + `js/more/*.js` | Lesson catalog and question generators |
| `tools/check.js` | Fuzz test for every generator |

## Where AI is used

**At runtime in the shipped app: nowhere.** There is no OpenAI (or other) API call, no cloud tutor, and no account that talks to a model. Graded answers come only from the local lesson generators. Speech is either the browser’s built-in voice, your recording, or a fixed animal MP3.

**During building this project:** Cursor AI agents helped design the UI, write lesson packs and mnemonics, draw diagram helpers, and assemble the PWA. The resulting phrases and worked problems are checked into the repo as ordinary JavaScript, not generated on the fly for the learner.

An earlier experimental “optional cloud mnemonic lab” was removed and is not part of this build.

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

## License notes

App code is yours to use under the repository’s license terms. Animal sound clips keep their original Wikimedia Commons licences; credits appear on each kids page and in `sounds/CREDITS.md`.
