# Kids’ Corner — next feature ideas

Research for Mathenomics Kids’ Corner beyond the current sets (**animals**, **fruits**, **things that go**, **music**) and the **keyboard smash** (`#/keys`).

**Product constraints (keep):** static PWA, hash routes, Mio fox guide, no accounts / no child profiles, no ads, no chat, owner-recorded names when present, one-picture-per-page flashcard pattern where it fits.

**Sources consulted (2024–2025 preschool apps):** Endless Learning Academy (Originator), Preschool Memory Games, Bimi Boo Academy, Khan Academy Kids / Duolingo ABC / Monkey Preschool Lunchbox roundups, TinyFingers game collection (tinyfingers.net), ABC Kids tracing apps, nursery-learning flashcard + rhyme apps.

---

## 1. Ranked next features (impact × effort)

Existing coverage is **picture → name → sound** A–Z sets. Highest leverage is more **same-shape sets** (reuse `#/kids/:set/:i`) before new interaction modes.

| Rank | Feature | Impact | Effort | Why next |
| --- | ---: | ---: | ---: | --- |
| 1 | **Colors** | High | Low | Universal preschool staple; ~8–12 cards; fits existing set renderer; pairs with fruits (“orange is a fruit and a color”). |
| 2 | **Shapes** | High | Low | Circle/square/triangle/etc.; same flashcard UX; bridges to later geometry language in grades. |
| 3 | **Numbers 1–20** | High | Low–Med | Direct bridge to Mathenomics brand; count dots + hear name; optional digit glyph beside emoji/art. |
| 4 | **Emotions / feelings** | High | Low | Strong in Endless + SEL apps; short set (happy, sad, angry, silly…); Mio face reactions fit brand. |
| 5 | **Body parts** | Med–High | Low | High vocab frequency; tap-to-hear “eyes / nose / hand”; keep non-anatomical / kid-safe labels only. |
| 6 | **Weather & seasons** | Med–High | Low | Rain, sun, snow, wind + four seasons; great for daily talk; emoji-friendly. |
| 7 | **Opposites** | Med–High | Med | big/small, hot/cold, up/down — show **pairs** on one page or flip A↔B; slight UX extension. |
| 8 | **ABC letter cards** (not tracing yet) | High | Med | Letter + picture word (A–apple); overlaps current letter strip; clearer phonics-ready naming. |
| 9 | **Nursery rhyme picture cards** | Med | Med | 6–10 familiar rhymes as illustrated cards + short spoken line; listening/language without video platform. |
| 10 | **Actions / verbs** | Med | Low | jump, clap, sleep, eat — Mio can mime; builds vocabulary beyond nouns. |
| 11 | **Family & helpers** | Med | Low | mom, dad, baby, doctor, teacher — common in preschool flashcard packs. |
| 12 | **Sizes / compare** | Med | Med | bigger/smaller, tall/short — one step toward early math language. |
| 13 | **ABC tracing (finger path)** | High | High | Duolingo ABC / ABC Kids pattern; new canvas interaction + stroke data; do after static letter cards. |
| 14 | **Simple match / memory** | Med | High | Preschool Memory Games pattern; needs new game shell, not just `KIDS` arrays. |
| 15 | **Day / night & routines** | Med | Med | morning/bedtime cards (Daniel Tiger–style themes without copying IP); optional quiet mode cue. |

**Skip / defer for now:** subscription curricula, Spanish tracks, sticker economies, multi-profile progress, open-world sandbox (Toca-style), marble runs / drawing pets (TinyFingers-adjacent toys).

---

## 2. Top 5 — UX sketches (Mathenomics-shaped)

All keep: crumb `← Kids’ corner`, Mio fox, big Hear / Next / Back, swipe + arrows, no login.

### 1) Colors — `#/kids/colors/0`

- Home tile on `#/kids` with swatch strip (red · blue · yellow…).
- Page: full-bleed color field or big emoji object in that color + title **Red** + line “Mio sees red.”
- Hear: owner clip `voices/kids-colors-red.*` if present, else speech synthesis fallback already used for kids.
- Alpha strip can be **first letter of color** or a simple 1…n dots; don’t force fake A–Z if the set is short.
- Done screen: “You mixed the rainbow!” → Next set: Shapes.

### 2) Shapes — `#/kids/shapes/0`

- Page: large outline shape (CSS or SVG) + name **Circle** + “Round like a ball.”
- Optional: Mio peeks from behind the shape.
- Same nav as animals; set id `shapes`, accent from DESIGN palette (e.g. teal/stone).
- Later hook: same shape names reappear in grade geometry lessons (no need to link yet).

### 3) Numbers 1–20 — `#/kids/numbers/0`

- Page: giant digit **7** + seven dots/stars + spoken “seven.”
- Strip: `1 2 3 …` tappable (like letter strip today).
- Keyboard: digit keys jump to that number (mirror letter jump on animal sets).
- Done: soft bridge CTA “Try a counting lesson?” → `#/` or a gentle grade-1 entry — never a paywall.

### 4) Emotions — `#/kids/feelings/0`

- Page: Mio expression variant (happy / sad / silly / brave) + word + short line (“It’s okay to feel mad.”).
- Hear plays name then a soft affirmation; no scores, no “wrong feeling.”
- Keep list short (8–12). Avoid clinical / trauma content.

### 5) Body parts — `#/kids/body/0`

- Page: simple Mio silhouette highlight (eyes, ears, nose, hands, feet, tummy…) + label.
- Tap highlight or Hear; Next cycles parts.
- Safety: kid vocabulary only; no medical diagrams; no photos of real children.

**Opposites (honorable mention UX):** `#/kids/opposites/0` with two panels side-by-side (Big 🐘 | Small 🐭) and one Hear that says both words — small extension of the single-card template.

---

## 3. Safety notes

| Rule | Practice |
| --- | --- |
| **No ads** | Keep Kids’ Corner free of third-party ad networks, affiliate tiles, and “download more apps” banners (TinyFingers *web* uses ads; Mathenomics must not). |
| **No chat / AI tutors for kids** | No free-text chat, no generative replies to children, no stranger-contact surfaces. |
| **No accounts** | Device-local only; no child profiles, emails, or cloud sync for kids play. |
| **Parental leave for keyboard** | Keyboard smash (`#/keys`) must keep a **deliberate adult exit** (long-press / hold gesture on chrome, not a single easy tap kids spam). Document in-UI: “Grown-ups: hold to leave.” Same pattern if any future full-screen play mode traps focus. |
| **Sound & motion** | Respect `prefers-reduced-motion`; sound toggle persisted locally (as keys already does). |
| **Content** | Age-appropriate vocab; no scary weather disaster framing; emotions stay validating, not diagnostic. |
| **Privacy** | No tracking SDKs in kids routes; no external iframes for rhymes/video. Prefer local audio/SVG. |
| **Offline** | Prefer assets that work under the existing SW cache model. |

---

## 4. What NOT to copy from TinyFingers (branding & product)

TinyFingers is a useful **interaction reference** (tap → delightful glyph/sound; parental settings; no account). Do **not** copy:

1. **Name, logo, wordmark, or “TinyFingers” / “tiny fingers” phrasing** in UI, meta, or store copy. Mathenomics already frames keyboard as original Mio playground — keep that.
2. **Visual brand language** — their pastel toy-app chrome, game-grid “21 games” catalog, Scribumi-style scribble-pet mascot, glowing trail keyboard identity.
3. **Marketing claims** that imply we are TinyFingers, “inspired by TinyFingers” in user-facing copy, or a TinyFingers clone.
4. **Web monetization pattern** — ad-supported free web + paid ad-free app. Mathenomics kids stay ad-free in-product.
5. **Subscription paywall to unlock the keyboard / basic sets.**
6. **Exact game roster cloning** as a checklist (xylophone + color-sort + marble run + scribble friend, etc.) — pick Mathenomics-native sets first; if adding music toys later, design as Mio xylophone under `#/kids`, not a TF lookalike.
7. **Parent settings IA** that mirrors their deliberate-gesture menu pixel-for-pixel; invent our own hold-to-leave + sound/motion toggles in Mathenomics chrome.

**OK to share as industry norms (not IP):** big targets, cause-and-effect taps, no high scores for toddlers, parental gate to leave immersive play, offline-friendly static content.

---

## 5. Suggested build order

1. Add `colors`, `shapes`, `numbers` (1–20), `feelings`, `body` as new entries in the kids data model (same flashcard shell).
2. Weather + opposites + actions as the next wave.
3. Nursery rhyme cards with short local audio lines.
4. Only then: tracing canvas and match/memory shells.

---

## Top 3 recommendations

1. **Colors** — highest preschool demand, lowest effort, reuses current `#/kids/:set/:i` UX.
2. **Shapes** — same shell; early math language that fits Mathenomics long-term.
3. **Numbers 1–20** — brand-aligned counting set with digit strip + keyboard digit jump.
