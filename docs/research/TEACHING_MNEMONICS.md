# Teaching mnemonics better — design research (pending approval)

**Status:** design only — **do not implement** until the recommendations canvas is approved.  
**Source:** research swarm agent (teach-loop / evidence review).  
**Related:** [DESIGN.md](../../DESIGN.md), [ANSWER_SPOILERS.md](./ANSWER_SPOILERS.md), [FEATURE_MAP.md](../FEATURE_MAP.md).

## Verdict

The loop (phrase → steps → watch-out → 5 rounds → mark) is already strong on explicit mnemonics and feedback. Biggest gaps: **spacing**, **retrieving the phrase without scaffolding**, **fading worked help**, and **practicing the Watch-out** — all doable with `localStorage` only.

## Ranked backlog (impact × effort)

| # | Idea | Impact | Effort | Primary touch |
| --- | --- | --- | --- | --- |
| 1 | Due-for-review from marks (SM-lite) | H | M | `app.js`, `safe.js` |
| 2 | Fade coach phrase during play | H | S | `app.js` playScreen |
| 3 | Phrase → steps “map it” before Play | H | M | `app.js` lessonScreen; optional lesson JSON |
| 4 | Watch-out as trap round | H | M | `gen()` / lesson schema; playScreen |
| 5 | Backward fading on worked examples | H | M | `app.js` workedBox |
| 6 | Say/type phrase gate (cloze) | M | S | `app.js` lesson/done |
| 7 | Dual-code hotspots on learn figure | M | M | `pics.js`, lessonScreen |
| 8 | Interleave cousin lessons in review | M | M | `related: []`, review runner |
| 9 | Incorrect worked example (“find the slip”) | M | M | `worked` shape |
| 10 | Soft spacing UI (remindAt only) | M | S | home/done |
| 11 | Locale-aware Hear + cue-quality badge | M | L | `narration.js`, voices/, packs |
| 12 | Cheatsheet cover-and-recall warm-up | L | S | cheatScreen |

### Suggested build order (if approved)

1. Phrase fade + done-screen cloze  
2. Due-for-review + home queue  
3. Map-it gate + trap round  
4. Worked fading + find-the-slip  
5. Locale cue policy + voice paths  

## Locale rule

Treat each locale `phrase` as a **new mnemonic design**, not a literal English rhyme translation. Prefer regional classroom sayings; badge weak cues as “steps/diagram are the cue.”

## Non-goals

No accounts, no DB, no required AI tutor, no device TTS for phrases, no full Anki clone, no Kids graded SRS.
