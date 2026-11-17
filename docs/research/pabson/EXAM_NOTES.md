# PABSON SEE Compulsory Maths — exam notes for redesign

Internal notes comparing **observed** public send-up / pre-board patterns with **expected** Mathenomics coverage. Paraphrase only — do not paste long exam wording or solution keys.

## Papers consulted (structure)

| Paper (label) | Marks / time | Grouping | Structure source |
| --- | --- | --- | --- |
| PABSON SEE PRE BOARD 2077 Compulsory Mathematics (Drive: *SEE Sendup Mathematics.pdf*) | 100 / 3 hrs | A–D (classic send-up) | GENERATE brief + Syangja 2077 public header (Group A short items) |
| EducateNepal PABSON pre-board 2082 Set A / Set B | 75 / 3 hrs | Image-hosted papers (structure via listing) | https://blog.educatenepal.com/2026/02/see-pre-board-comp-mathematics.html and Set B sibling |
| PABSON Kathmandu 2082 pre-qualifying | 75 / 3 hrs | A–F topic bands | Public solution TOC (sets → probability) |

## Observed pattern (what papers ask)

### Group A (short)

Repeated formula-recall flavour:

- **Depreciation / compound-style value** after *k* years (write formula).
- **Heron** semi-perimeter *s* = (*p*+*q*+*r*)/2 (often paired with area).
- **Age** relations after a fixed number of years.
- **Quartile / class** formula for continuous or grouped data.
- Occasional **solid volume** one-liners (e.g. sphere in terms of *R*).

### Later groups (B–D, or A–F on 75-mark papers)

Stable compulsory SEE spine:

1. **Sets / Venn** survey cardinality and “only / both / neither”.
2. **Financial maths** — compound interest frequency, population growth, currency rate change, profit/loss %.
3. **Mensuration** — walls/bricks, cylinders/cones/spheres, sometimes pyramids.
4. **Algebra** — simplify, factor, quadratic, AP/GP, simultaneous.
5. **Geometry** — triangle congruence/similarity and **circle** angle/chord/tangent proofs.
6. **Trig** — **heights and distances** (elevation / depression).
7. **Statistics** — table of class intervals; mean / median / (quartile) formulas.
8. **Probability** — definitions, independence cue, tree / successive draws.

2082 public papers often **compress** this spine into more groups (A–F) at **75** marks instead of 100.

## Expected Mathenomics coverage (current)

| Strand | Expectation | Reality in app |
| --- | --- | --- |
| Triangle / circle geometry | Strong `g8`–`g10` + `geo.js` | **Met** for most theorem types |
| Trig heights & distances | Dedicated elevation/depression | **Met** — `g10/heights`, `wordkeys10` |
| Algebra / sequences | FOIL, quadratic, AP/GP | **Met** on `g9`/`g10` |
| Solids (cyl/cone/sphere) | Volume formulas | **Met** on `g8` via `geo.js` |
| Simple interest / percent | Middle-school money | **Met** — `g7/interest`, `pchange`, `discount` |
| Sets / Venn | Compulsory SEE staple | **Mis-homed** — only `optional` |
| Compound / depreciation / population | Formula + application | **Missing** (interest lesson explicitly not compound) |
| Heron | Area from three sides | **Missing** |
| Age word problems | Linear “after *n* years” | **Thin** / missing dedicated lesson |
| Grouped stats + quartile class | Continuous data formulas | **Missing** (raw `mmmr` + boxplot IQR only) |
| SEE probability trees | Without replacement | **Thin** — basic `g7/prob`; `pabson` is Class 12 |
| Currency / VAT / commission | Nepal SEE money stories | **Thin** |
| `pabson` course | Named like the exam board | **Wrong level** — NEB/Class 12 hard problems, not SEE send-up |
| `hs` pack | SEE-facing “new hs” | **File absent** — `js/more/hs.js` not in tree / not loaded in `index.html` |

## Observed vs expected — redesign implications

1. **Do not treat `pabson.js` as SEE prep.** Keep it as hard Grade 12; build SEE compulsory under a new **`hs`** (or promote sets into `g9`/`g10`).
2. **Group A gaps drive first `hs` lessons:** Heron, depreciation/compound mnemonic, (optional) age shift, quartile class — **skip** duplicating elevation/depression.
3. **Sets must be compulsory-visible.** Either link `optional/set*` from SEE paths or clone SEE-shaped survey drills into `hs`.
4. **Financial strand needs compound + FX**, not only PRT simple interest.
5. **Stats strand needs grouped-data** mean/median/quartiles to match table questions; list `mmmr` alone is insufficient.
6. **Marks schema:** support both **100 (A–D)** study paths and **75 (A–F)** pacing; content map stays the same, group labels shift.
7. **Copyright:** redesign from topic lists and original prompts only — never ship scanned paper text or solution keys as content.

## Gap list (actionable)

| # | Gap | Suggested home |
| --- | --- | --- |
| 1 | Heron (*s*, area) | `hs` |
| 2 | Depreciation / compound amount / population | `hs` |
| 3 | Elevation / depression | *none* — already `g10/heights` |
| 4 | Grouped mean / median / quartile class | `hs` |
| 5 | Age after *n* years | `hs` |
| 6 | Compulsory sets/Venn (vs optional-only) | `hs` or promote `optional` |
| 7 | Currency / commission / VAT stories | `hs` |
| 8 | Prism / pyramid / packing mensuration | `hs` |
| 9 | Probability tree / dependence | `hs` (not `pabson`) |

## Related public pages (structure bookmarks)

- https://blog.educatenepal.com/2026/02/see-pre-board-comp-mathematics.html  
- https://blog.educatenepal.com/2026/02/see-class-10-pre-board-mathematics.html  
- https://blog.educatenepal.com/2026/01/see-class-10-pre-qualifying-math-exam.html  
- https://www.dhanraj.com.np/2021/04/Compulsory-Mathematics-Class10-SEE-Sent-Up-Exam-Question-Paper-2077-Pabson.html  

See also: [`../PABSON_SENDUP_TOPICS.md`](../PABSON_SENDUP_TOPICS.md) for lesson-id mapping.
