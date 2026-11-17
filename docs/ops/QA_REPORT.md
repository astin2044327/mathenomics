# Mathenomics PWA — QA Report

**Date:** 2026-11-16 (local)  
**Target:** http://127.0.0.1:8766/  
**Project:** `/Users/ravid/ai/mathenomics`  
**Methods:** `curl` static checks + cursor-ide-browser UI + `node tools/check.js`

**Pass rate: 10 / 10**

---

## Checklist

| # | Item | Result | Notes |
|---|------|--------|-------|
| 1 | Home loads; library grades include Optional & PABSON | **PASS** | Home `#/` loads. Grades include `Optional · 7–12 Optional mathematics` and `Grade 12 PABSON-hard set` among K–12 tracks. |
| 2 | Open lesson → Hear phrase → Play one round (A/B/C/D) | **PASS** | Opened `#/l/g3/groups` (“What × means”). Hear button activated. Play `#/play/g3/groups`: `5 × 5` → chose **D 25** → “Yes! … +10” and Next round. |
| 3 | Report card metrics strip | **PASS** | `#/report` shows `.metrics` strip: time learning, games finished, table puzzles, rounds answered. |
| 4 | Kids: animals → hear name+sound → Next → alpha jump | **PASS** | Fresh load: Animals **26 · A–Z**, full alpha strip A–Z. Ant → Hear; Next → Bee (real recording credit shown); alpha **Z** → Zebra (26 of 26). |
| 5 | Food set if present | **PASS** | Food card on kids home (**26 pictures · A–Z**). `#/kids/food/0` shows Avocado / full A–Z jump. |
| 6 | Keyboard smash `#/keys` → press/tap feedback → leave to kids | **PASS** | Pad/key smash updates hint (“Keep going…”); `.keys-fly` glyph (“Q”) appeared on stage. **Leave** → `#/kids`. |
| 7 | Table puzzle `#/puzzle/2` | **PASS** | “Fill the 2× table” grid + tabs ×2–×12. Answered `12 × 2` → **24** → “Nice. 5 blanks left.” |
| 8 | Cheatsheet on a grade map | **PASS** | Grade map `#/g/g3` has **Grade cheatsheet** link. `#/cheat/g3` renders “Grades 3–4 cheatsheet” with Times tables / Division / Measure sections. |
| 9 | Mobile ~390px smoke on kids | **PASS** | `Emulation.setDeviceMetricsOverride` 390×844: kids home renders all sets; `scrollWidth === 390`, no horizontal overflow. |
| 10 | `node tools/check.js` | **PASS** | `309 lessons, 123600 questions checked, 0 problems` |

---

## Static / curl notes

- `/` and `/index.html` → 200; scripts include `optional.js`, `pabson.js`, `kids.js`, `keys.js`, `sounds.js`.
- `/css/app.css`, `/manifest.webmanifest`, `/sw.js`, `/js/app.js`, `/js/kids.js`, `/js/keys.js` → 200.
- Legacy paths `/css/style.css`, `/manifest.json` → 404 (expected; app uses `app.css` / `manifest.webmanifest`).
- Server briefly went down mid-run; restarted `python3 -m http.server 8766` from project root.

---

## Bugs / issues found

1. **Incomplete kids real-sound coverage**  
   - Animals: **12/26** show “Sound coming soon” (e.g. Ant, Zebra). Present keys include Bee, Cat, Dog, … (~17).  
   - Food: **0/26** sound keys — every food item is “Sound coming soon.”  
   - Hear still announces name (device voice path); real clip missing.

2. **Orphan / stale sound keys**  
   `sounds.js` still has keys like `animals/Cow`, `animals/Duck`, `animals/Sheep` that are not in the current A–Z animals list (Ant…Zebra). Suggest align SOUNDS keys to current `KIDS` names.

3. **Service-worker / cache staleness (observed once)**  
   Mid-session, runtime `window.KIDS` still had **4 sets / Animals 20** (no Food) while disk/`curl` already had 5 sets × 26. Hard reload with cache-bust query (`?qa=3`) fixed it. Worth verifying SW update path so kids content ships without stuck old payloads.

4. **Metrics strip lag until game complete** (minor / likely by design)  
   After one correct round then leaving game early, report still showed `0` games finished / `0` rounds answered while time learning continued. Confirm whether rounds should bump per answer or only on full 5-round finish.

5. **Keys letter pad clipping** (minor visual)  
   On keys stage screenshot, rightmost pad columns can be clipped depending on viewport; smash still works via key/tap/pad remaining keys.

---

## Environment notes

- UI exercised via cursor-ide-browser (Glass tab after local server restart).  
- No product code fixes applied (report-only per charter).
