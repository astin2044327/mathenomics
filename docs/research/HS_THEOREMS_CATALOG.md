# High School Theorems Catalog (Grades 9–12)

Research catalog for a Mathenomics **High School hub**: theorem + proof mnemonics aligned to Nepal **SEE / PABSON** (Compulsory Math 9–10) and **NEB Class 11–12** geometry & trigonometry.

**Scope:** topic patterns only (syllabus units, recurring exam types). No copyrighted exam wording.

**Sources (patterns):** CDC SEE Comp. Math unit map; PABSON pre-board/send-up topic clusters; NEB Secondary Math curriculum (trig, analytic geo, vectors). Cross-checked against existing packs in `js/courses.js`, `js/more/geo.js`, `js/more/trig.js`, `js/more/pabson.js`, `js/more/expand.js`, `js/more/optional.js`.

Proposed lesson-id prefix for new HS hub cards: `hs-*` (link to existing ids where overlap exists; do not duplicate generators).

---

## 1. Topic map by grade band

### Band A — Grades 9–10 (SEE / PABSON Compulsory Math)

| Unit cluster | Theorems / skills to mnemonic | Typical exam move |
| --- | --- | --- |
| Geometry — triangles | Angle sum, exterior angle, isosceles, congruence (SSS/SAS/ASA/RHS), midsegment, BPT / intercept, similarity (AA/SAS/SSS) | Prove or find lengths/angles from a figure |
| Geometry — parallelograms / area | Opposite sides/angles; diagonals; **same base & same parallels** → parallelogram = 2 × triangle | Relation write + short proof + construction |
| Geometry — circles | Chord ⊥ from centre; equal chords; angle in semicircle; central = 2 × inscribed; same segment; cyclic quad (opp. = 180°); tangent ⊥ radius; two tangents; alt. segment (optional depth) | Find angle + experimental verify |
| Trigonometry | SOH-CAH-TOA; recip. ratios; table 0–90; ASTC; heights & distances | Right-triangle solve / elevation–depression |
| Mensuration (geo-adjacent) | Pyramid / cone / cylinder / hemisphere / **combined solids**; cost | Formula → volume/TSA → cost |
| Algebra hooks (high exam hit) | Quadratic formula; AP/GP; ages/word linear systems | Short/long calculation |
| Arithmetic hooks | Compound interest; **growth / depreciation**; exchange | Formula recall + plug-in |
| Statistics / probability | Mean/median/mode; **quartiles**; independent events / tree | Formula + compute |

### Band B — Grades 11–12 (NEB Math; PABSON hard-set geo/trig)

| Domain | Theorems / skills | Typical exam move |
| --- | --- | --- |
| Trig — triangle laws | Sine rule; cosine rule; area ½ab sin C; (tangent / projection / half-angle laws as stretch) | Solve oblique triangle |
| Trig — identities & equations | Compound / double angles; Pythagorean ids; inverse trig intro; general solutions via ASTC | Prove / solve for θ |
| Analytic / 3D basics | Distance in plane; **distance in space**; direction cosines & ratios; (planes stretch) | Compute / interpret |
| Vectors (plane → space) | Collinear / linear combo; **dot** (angle, projection); **cross** mag/area (esp. Class 12) | Length, angle, area of parallelogram |
| Conics / coord (adjacent) | Parabola / ellipse / hyperbola quick ID; tangent to circle (Class 12) | Identify / standard form |

---

## 2. Theorem cards

Format: **Name** · mnemonic · 3 proof/solve steps · watch-out · exam tag · proposed `id` · overlap

### 2.1 SEE / PABSON core (9–10)

#### Pythagoras
- **Mnemonic:** Square the legs, add them — that is the hypotenuse squared.
- **Steps:** (1) Identify right angle and hyp. (2) Write a² + b² = c². (3) Solve for the missing side; sanity-check hyp is longest.
- **Watch-out:** Only right triangles; converse is a separate test (`a²+b²=c²` ⇒ right). Don’t put a leg as hyp.
- **Exam:** SEE / both (foundation) · `hs-pythag` · **exists** `g8/pythag`, `geo/pythagConv`, `expand/pythagleg`

#### Converse of Pythagoras
- **Mnemonic:** If a² + b² = c², the corner between a and b is 90°.
- **Steps:** (1) Take longest side as candidate hyp. (2) Compare a²+b² to c². (3) Equal ⇒ right; greater ⇒ acute at that corner; less ⇒ obtuse.
- **Watch-out:** Candidate hyp must be the longest side.
- **Exam:** SEE · `hs-pythag-conv` · **exists** `geo/pythagConv` — link, don’t rebuild

#### Basic Proportionality / intercept (BPT)
- **Mnemonic:** Parallel to the base cuts both sides in the same ratio.
- **Steps:** (1) Spot line ‖ base inside triangle. (2) Write segment ratios equal. (3) Cross-multiply for the unknown length.
- **Watch-out:** Not for areas unless you square the scale; need proven/ ‖ given.
- **Exam:** SEE · `hs-bpt` · **exists** `g9/bpt`

#### Similar triangles
- **Mnemonic:** Same angles, same shape — every side grows by one scale k.
- **Steps:** (1) Match equal angles (AA). (2) Write corresponding sides in order. (3) Set ratios = k; solve.
- **Watch-out:** Correspondence order matters; areas scale by k².
- **Exam:** SEE / both · `hs-similar` · **exists** `g9/similar`, `geo/scaleAV`

#### Midsegment (midpoint theorem)
- **Mnemonic:** Join the middles: half the third side, and parallel to it.
- **Steps:** (1) Mark midpoints of two sides. (2) Claim midseg ‖ third side. (3) Length = half the third side.
- **Watch-out:** Both points must be midpoints.
- **Exam:** SEE · `hs-midseg` · **exists** `g9/midseg`

#### Same base & same parallels (area)
- **Mnemonic:** Same base, same height → same area family; parallelogram is twice the triangle on that base.
- **Steps:** (1) Confirm shared base and ‖ lines (same height). (2) Area_para = base × height; Area_△ = ½ base × height. (3) Conclude Area_para = 2 × Area_△.
- **Watch-out:** “Same base” alone is not enough without same parallels/height.
- **Exam:** SEE (very frequent in PABSON geometry) · `hs-same-base` · **GAP** (priority)

#### Angle in a semicircle
- **Mnemonic:** A diameter always sees a right angle.
- **Steps:** (1) Confirm the side is a diameter. (2) Angle at circumference on that diameter is 90°. (3) Finish with triangle angle sum if needed.
- **Watch-out:** Chord must be diameter (through centre).
- **Exam:** SEE · `hs-semicircle` · **exists** `g9/semicircle`

#### Central angle = 2 × inscribed
- **Mnemonic:** The centre angle is double the rim angle on the same arc.
- **Steps:** (1) Name the common arc. (2) Mark centre vs circumference angles. (3) Write ∠centre = 2 × ∠rim.
- **Watch-out:** Same arc; don’t double an angle that stands on a different arc.
- **Exam:** SEE · `hs-central` · **exists** `g10/central` (+ experimental-verify flavour in papers)

#### Angles in the same segment
- **Mnemonic:** Same arc, same segment → equal angles at the rim.
- **Steps:** (1) Identify the arc. (2) Check both angles sit in the same segment. (3) Set them equal.
- **Watch-out:** Opposite segment ⇒ not equal (often supplementary via cyclic).
- **Exam:** SEE · `hs-sameseg` · **exists** `geo/sameseg`

#### Cyclic quadrilateral
- **Mnemonic:** Opposite corners in a circle add to 180°.
- **Steps:** (1) Confirm cyclic (or prove via exterior = opposite interior). (2) Pair opposite angles. (3) Sum = 180°; solve.
- **Watch-out:** Only cyclic quads; exterior-angle test is the prove tool.
- **Exam:** SEE · `hs-cyclic` · **exists** `g10/cyclic`

#### Tangent ⊥ radius
- **Mnemonic:** A tangent meets the radius at a right angle.
- **Steps:** (1) Draw radius to contact point. (2) Mark 90°. (3) Use Pythagoras / SOH-CAH-TOA as needed.
- **Watch-out:** Right angle is at the contact point, not at the external point.
- **Exam:** SEE · `hs-tangent` · **exists** `g9/tangent`

#### Two tangents from an external point
- **Mnemonic:** Two tangents from one outside point are equal.
- **Steps:** (1) Mark both tangents and contact points. (2) Set tangent lengths equal. (3) Radii ⊥ tangents ⇒ congruent triangles / isosceles centre triangles.
- **Watch-out:** Lengths from the *same* external point only.
- **Exam:** SEE · `hs-twotang` · **exists** `geo/twotang`

#### Chord from the centre
- **Mnemonic:** From the centre, hit the chord at 90° → you cut it in half.
- **Steps:** (1) Drop ⊥ from centre to chord (or use given ⊥). (2) Bisect the chord. (3) Pythagoras in the right half-triangle.
- **Watch-out:** Converse: line from centre through midpoint is ⊥ to chord.
- **Exam:** SEE · `hs-chord` · **exists** `g10/chord`

#### Alternate segment theorem
- **Mnemonic:** Angle between tangent and chord equals the angle in the alternate segment.
- **Steps:** (1) Mark tangent–chord angle. (2) Find the segment on the *other* side of the chord. (3) Equate to the rim angle there.
- **Watch-out:** Wrong segment is the classic trap.
- **Exam:** SEE (optional depth / harder packs) · `hs-altseg` · **exists** `geo/altseg`

#### SOH-CAH-TOA
- **Mnemonic:** SOH CAH TOA — sine opp/hyp, cosine adj/hyp, tangent opp/adj.
- **Steps:** (1) Sketch right triangle; mark the angle. (2) Label opp/adj/hyp. (3) Pick the ratio that uses the known and unknown.
- **Watch-out:** Right angle required; opp/adj flip when the reference angle changes.
- **Exam:** SEE / both · `hs-soh` · **exists** `g10/soh`, `expand/sohcahtoa` — **dedupe**

#### ASTC (quadrant signs)
- **Mnemonic:** Add Sugar To Coffee (All–Sin–Tan–Cos positive, Q1→Q4).
- **Steps:** (1) Reduce to reference angle. (2) Read quadrant. (3) Apply ASTC sign to the function.
- **Watch-out:** Don’t mix with CAST (starts Q4). Reciprocals follow their partners.
- **Exam:** SEE / NEB · `hs-astc` · **exists** `g10/astc`, `expand/astc10`, `trig2/allied`

#### Special-angle table
- **Mnemonic:** Write 0,1,2,3,4 → ÷4 → √ for sin; cos is that row backwards.
- **Steps:** (1) Build sin row. (2) Reverse for cos. (3) tan = sin/cos; note undefined cases.
- **Watch-out:** tan 90° / sec 90° undefined; degrees ≠ radians without conversion.
- **Exam:** SEE / NEB · `hs-table` · **exists** `g10/table`, `g10/hand`

#### Heights & distances
- **Mnemonic:** Elevation looks up, depression looks down — both from the flat.
- **Steps:** (1) Sketch observer, object, horizontal. (2) Mark elevation or depression. (3) SOH-CAH-TOA for the missing length/angle.
- **Watch-out:** Depression from a height ≠ angle at the ground foot without a careful diagram.
- **Exam:** SEE · `hs-heights` · **exists** `trig/heights`

#### Heron’s formula
- **Mnemonic:** Semi-perimeter s, then √[s(s−a)(s−b)(s−c)].
- **Steps:** (1) s = (a+b+c)/2. (2) Form s(s−a)(s−b)(s−c). (3) Take positive square root.
- **Watch-out:** Triangle inequality first; s−side must stay positive.
- **Exam:** SEE (mensuration / area packs) · `hs-heron` · **GAP**

#### Pyramid / cone volume
- **Mnemonic:** Solid with a pointy top is one-third of the “prism/cylinder” with the same base and height.
- **Steps:** (1) Base area B (or πr²). (2) V = (1/3)Bh. (3) Separate slant height for lateral area.
- **Watch-out:** Vertical height ≠ slant; don’t drop the 1/3.
- **Exam:** SEE · `hs-pyramid-cone` · **partial** `geo/conevol`; need pyramid + combined solids

#### Combined solids
- **Mnemonic:** Glue or dig: add volumes that stick out; subtract volumes that are hollowed.
- **Steps:** (1) Name each piece. (2) Same units; add or subtract V. (3) For surface, only count faces that remain exposed.
- **Watch-out:** Hidden faces are not in TSA.
- **Exam:** SEE · `hs-combined` · **GAP**

#### Compound depreciation
- **Mnemonic:** Value multiplies by (1 − R/100) each year — shrink, don’t grow.
- **Steps:** (1) Write V = P(1 − R/100)^T. (2) Plug P, R, T. (3) Difference from P is total depreciation.
- **Watch-out:** Growth uses (1 + R/100); half-year compounding changes the exponent structure.
- **Exam:** SEE · `hs-depreciation` · **GAP** (high frequency)

#### Quartiles (grouped / raw)
- **Mnemonic:** Quartiles cut the ordered list into fourths — Q2 is the median gate.
- **Steps:** (1) Order data or use cf table. (2) Locate N/4, N/2, 3N/4 positions. (3) Read or interpolate Q1, Q2, Q3; IQR = Q3 − Q1.
- **Watch-out:** Formula position conventions differ slightly by textbook; stay consistent with the paper’s formula box.
- **Exam:** SEE · `hs-quartiles` · **GAP** (boxplot IQR in expand is not SEE-style)

---

### 2.2 NEB / Class 11–12 geo & trig

#### Sine rule
- **Mnemonic:** Each side over the sine of the angle it faces: a/sin A = b/sin B = c/sin C.
- **Steps:** (1) Pair known side with its opposite angle. (2) Write the proportion. (3) Solve; watch SSA ambiguous case.
- **Watch-out:** SSA can give 0, 1, or 2 triangles.
- **Exam:** NEB / both · `hs-sine` · **exists** `trig2/sine`

#### Cosine rule
- **Mnemonic:** Pythagoras with a correction: a² = b² + c² − 2bc cos A.
- **Steps:** (1) Put the unknown side opposite the known included angle (or rearrange for cos A). (2) Substitute. (3) Square-root carefully (side > 0).
- **Watch-out:** Cos of obtuse is negative → a² > b² + c² is possible.
- **Exam:** NEB / both · `hs-cosine` · **exists** `trig2/cosine`

#### Area with sine
- **Mnemonic:** Half of two sides times the sine of the included angle.
- **Steps:** (1) Identify included angle. (2) Area = ½ab sin C. (3) If obtuse, sin still positive.
- **Watch-out:** Angle must be between the two sides used.
- **Exam:** NEB / SEE-adjacent · `hs-area-sine` · **exists** `trig2/area`

#### Compound-angle formulas
- **Mnemonic:** sin: cos-cos / sin-sin with sign staying; cos: cos-cos / sin-sin with sign swapping. (“sin cos cos sin, sign stays; cos cos sin sin, sign swaps.”)
- **Steps:** (1) Expand to sin/cos of singles. (2) Keep the sign rule for ±. (3) Simplify with known values.
- **Watch-out:** Mixing +/− patterns between sin and cos expansions.
- **Exam:** NEB · `hs-compound` · **exists** `trig2/compound`, `expand/compound2` — **dedupe**

#### Double angles
- **Mnemonic:** Double the angle: sin 2A = 2 sin A cos A (and cos 2A has three faces).
- **Steps:** (1) Choose form matching given data. (2) Substitute. (3) Back-solve if needed.
- **Watch-out:** cos 2A = cos²A − sin²A = 2cos²A − 1 = 1 − 2sin²A — pick the right twin.
- **Exam:** NEB · `hs-double` · **exists** `trig2/double`

#### Inverse trig intro
- **Mnemonic:** sin⁻¹ asks: which angle has this sine? (principal value)
- **Steps:** (1) Recall range of the inverse. (2) Evaluate principal value. (3) For equations, expand to general solution.
- **Watch-out:** Principal value ≠ all solutions; calculator mode deg/rad.
- **Exam:** NEB · `hs-inverse` · **exists** `trig2/inverse`, `pabson/invtrig` — link, thin wrapper OK

#### Solving trig equations
- **Mnemonic:** Find the reference angle, then let ASTC place it.
- **Steps:** (1) Isolate a single trig function. (2) Reference angle from absolute value. (3) List quadrant solutions + period.
- **Watch-out:** Lost solutions when dividing by trig expressions; check domain.
- **Exam:** NEB · `hs-trig-eq` · **exists** `trig2/equations`

#### Distance in 3D
- **Mnemonic:** Pythagoras twice — √[(Δx)²+(Δy)²+(Δz)²].
- **Steps:** (1) Subtract coordinates. (2) Square and add three. (3) Square root.
- **Watch-out:** Don’t drop a coordinate; units consistent.
- **Exam:** NEB · `hs-dist3d` · **GAP** (plane distance exists as `geo/distmid`)

#### Direction cosines / ratios
- **Mnemonic:** Cosines of angles with the axes; ratios are proportional direction numbers.
- **Steps:** (1) From vector/components get l,m,n or a:b:c. (2) For DCs, l²+m²+n² = 1. (3) Convert DR → DC by dividing by magnitude.
- **Watch-out:** DRs need normalization before using as cosines.
- **Exam:** NEB · `hs-dir-cos` · **GAP**

#### Vector length & addition
- **Mnemonic:** Tip-to-tail to add; length is Pythagoras on components.
- **Steps:** (1) Write components. (2) Add component-wise. (3) |v| = √(sum of squares).
- **Watch-out:** Position vs free vector; don’t add magnitudes for non-collinear.
- **Exam:** NEB / PABSON · `hs-vec-add` · **partial** `optional/vecintro`, `pabson` diagrams

#### Dot product
- **Mnemonic:** a·b = |a||b| cos θ = sum of component products.
- **Steps:** (1) Prefer components if given. (2) Or rearrange for cos θ / projection. (3) a·b = 0 ⇒ perpendicular.
- **Watch-out:** Cosine is of the angle *between* directions; signs matter.
- **Exam:** NEB / PABSON · `hs-dot` · **exists** `optional/vecdot`, `pabson/vectors` — **unify**

#### Cross product (plane magnitude / Class 12)
- **Mnemonic:** |a×b| = |a||b| sin θ — area of the parallelogram they span.
- **Steps:** (1) In 2D, |a₁b₂ − a₂b₁|. (2) Interpret as area. (3) Direction via right-hand rule only when 3D vector form is required.
- **Watch-out:** Magnitude vs vector; order a×b = −b×a.
- **Exam:** NEB · `hs-cross` · **partial** cheat row in `pabson` — need full lesson

#### Pythagorean identities
- **Mnemonic:** sin² + cos² = 1; divide by cos² → 1 + tan² = sec²; by sin² → 1 + cot² = cosec².
- **Steps:** (1) Start from sin²+cos²=1. (2) Divide to get the twin you need. (3) Rearrange for the prove target.
- **Watch-out:** Division invalid where cos or sin is 0.
- **Exam:** NEB / SEE optional · `hs-pyid` · **exists** `trig/pyid`

---

## 3. Priority list to implement first (~35)

Ranked by **impact × exam frequency** for Nepal SEE/PABSON + NEB geo/trig.  
**Action:** `NEW` = write HS card; `LINK` = deep-link / re-tag existing; `EXTEND` = add Nepal-exam flavour (figure proof / formula-first stem) without new id.

| # | Priority | Proposed id | Action | Why |
| ---: | --- | --- | --- | --- |
| 1 | P0 | `hs-same-base` | NEW | Ubiquitous PABSON geometry relation + proof |
| 2 | P0 | `hs-central` | LINK/EXTEND `g10/central` | Circle staple + experimental verify |
| 3 | P0 | `hs-cyclic` | LINK/EXTEND `g10/cyclic` | Opposite angles / exterior test |
| 4 | P0 | `hs-semicircle` | LINK `g9/semicircle` | High hit, short proof |
| 5 | P0 | `hs-depreciation` | NEW | SEE arithmetic Group A/B formula hit |
| 6 | P0 | `hs-soh` | LINK `g10/soh` | Compulsory trig chapter |
| 7 | P0 | `hs-heights` | LINK/EXTEND `trig/heights` | Entire SEE trig application lane |
| 8 | P0 | `hs-heron` | NEW | Area when only sides given |
| 9 | P0 | `hs-pyramid-cone` | EXTEND + NEW pyramid | Mensuration marks block |
| 10 | P0 | `hs-combined` | NEW | Combined solids cost/volume |
| 11 | P1 | `hs-bpt` | LINK `g9/bpt` | Similarity precursor |
| 12 | P1 | `hs-similar` | LINK `g9/similar` | Length/area scale problems |
| 13 | P1 | `hs-chord` | LINK `g10/chord` | Class 9–10 circle chord pack |
| 14 | P1 | `hs-tangent` | LINK `g9/tangent` | With two-tangents chain |
| 15 | P1 | `hs-twotang` | LINK `geo/twotang` | Length + right angles |
| 16 | P1 | `hs-sameseg` | LINK `geo/sameseg` | Angle chase |
| 17 | P1 | `hs-astc` | LINK `g10/astc` | Signs for allied / NEB eqs |
| 18 | P1 | `hs-table` | LINK `g10/table` | Formula/value recall |
| 19 | P1 | `hs-quartiles` | NEW | Stats partition values |
| 20 | P1 | `hs-pythag` | LINK `g8/pythag` | Foundation for mensuration/trig |
| 21 | P1 | `hs-sine` | LINK `trig2/sine` | NEB triangle solve |
| 22 | P1 | `hs-cosine` | LINK `trig2/cosine` | NEB triangle solve |
| 23 | P1 | `hs-area-sine` | LINK `trig2/area` | Oblique area |
| 24 | P2 | `hs-compound` | LINK `trig2/compound` | Class 11–12 identities |
| 25 | P2 | `hs-double` | LINK `trig2/double` | Follow-on to compound |
| 26 | P2 | `hs-inverse` | LINK `trig2/inverse` | NEB inverse circular |
| 27 | P2 | `hs-trig-eq` | LINK `trig2/equations` | General solutions |
| 28 | P2 | `hs-dot` | UNIFY `optional/vecdot` + `pabson/vectors` | PABSON + NEB vectors |
| 29 | P2 | `hs-cross` | NEW (from pabson cheat) | Area / sin θ applications |
| 30 | P2 | `hs-dist3d` | NEW | Class 11 coordinates in space |
| 31 | P2 | `hs-dir-cos` | NEW | DCs / DRs |
| 32 | P2 | `hs-midseg` | LINK `g9/midseg` | Theoretical prove item |
| 33 | P2 | `hs-altseg` | LINK `geo/altseg` | Harder circle chase |
| 34 | P2 | `hs-pyid` | LINK `trig/pyid` | Prove identities entry |
| 35 | P2 | `hs-vec-add` | EXTEND `optional/vecintro` | Plane vectors in papers |

**Explicitly defer (already covered elsewhere or lower geo/trig priority):** FOIL/factor packs in `geo.js`; calculus in `g11` / `pabson` (limits, DE, Newton); permutations/binomials; conics ID already in `pabson/conic` unless hub expands analytic geometry.

---

## 4. Overlap notes — avoid duplication

### `js/courses.js` (g8–g11 cores)

| Course | Already ships | HS hub should… |
| --- | --- | --- |
| **g8** | anglesum, exterior, iso, pythag, parallel, congruent, quad | Link pythag/parallel/congruent; don’t re-author |
| **g9** | similar, bpt, midseg, semicircle, tangent, quadratic | Primary SEE geometry spine — **retag into hub**, extend proofs |
| **g10** | soh, recip, astc, hand, central, cyclic, chord | Primary SEE trig + circle spine — same |
| **g11** | power, quotient, integral | Out of geo/trig hub scope (calc starters) |

### `js/more/geo.js`

- Patches g8–g9 cores; **adds** poly angles, slope, solids (cyl/cone/sphere), pythagConv, algebra tools, **circle power theorems** (twotang, altseg, intchord, tansec, sameseg), AP/GP, sector.
- **Reuse:** all circle extensions + pythagConv + scaleAV + conevol.
- **Do not duplicate** intersecting chords / tangent-secant unless hub wants a “circle power” mini-track (lower SEE frequency than central/cyclic/semicircle).

### `js/more/trig.js`

- Adds to g10: table, pyid, comp, heights.
- New course **`trig2`**: rad, allied, sine, cosine, area, compound, double, equations, prove, inverse.
- Adds calc/log to g11.
- **HS hub:** consume `trig2` for NEB band; only add Nepal-specific stems (solve-the-triangle exam framing), not second generators.

### `js/more/pabson.js` (`course id: pabson`, Grade 12 hard-set)

- Broad Class 12: perm/comb, binomial, logs, matrices, conics, invtrig, limits, max/min, integrals, DE, prob, **vectors**, projectile, statics, NR, etc.
- **Overlap with hub:** `invtrig`, `vectors` (dot/length), conics peripheral.
- **Rule:** geo/trig hub owns teaching mnemonics; pabson keeps *exam-hard* generators. Share phrases; don’t clone `gen()`.

### `js/more/expand.js`

- Near-duplicates: `sohcahtoa` ≈ `g10/soh`; `astc10`/`astc2` ≈ `g10/astc`; `compound2` ≈ `trig2/compound`; `pythagleg` ≈ pythag.
- **Rule:** hub links canonical course ids; expand variants stay as alternate phrases or get folded later.

### `js/more/optional.js`

- `vecintro`, `vecdot`, `trigid`, `trigcomp` — treat as optional-math siblings; unify vector story under `hs-dot` / `hs-vec-add`.

### Gaps vs Nepal papers (implement NEW)

1. Same-base / same-parallels area theorem  
2. Heron  
3. Depreciation / growth formula card  
4. Quartiles (SEE formula style)  
5. Pyramid + combined solids (beyond cone/cyl/sphere)  
6. 3D distance + direction cosines/ratios  
7. Cross-product lesson (beyond cheat row)

---

## 5. Hub build guidance (research → implement)

1. Ship a **hub index** that deep-links LINK rows first (fast coverage).  
2. Author NEW P0 gaps next (`same-base`, `depreciation`, `heron`, `combined`, pyramid).  
3. NEB layer: ensure `trig2` + vector unification visible under Grades 11–12.  
4. Keep proof steps ≤3 on the card; put experimental-verify as a fourth *practice* mode, not a fourth memorized step.  
5. Pair with `docs/research/PABSON_SENDUP_TOPICS.md` for send-up practice routes.

---

## 6. Top 10 to ship first

1. `hs-same-base` — NEW  
2. `hs-central` — LINK/EXTEND  
3. `hs-cyclic` — LINK/EXTEND  
4. `hs-semicircle` — LINK  
5. `hs-depreciation` — NEW  
6. `hs-soh` — LINK  
7. `hs-heights` — LINK/EXTEND  
8. `hs-heron` — NEW  
9. `hs-pyramid-cone` / `hs-combined` — NEW/EXTEND  
10. `hs-sine` + `hs-cosine` (pair) — LINK `trig2`

---

*Last updated: research pass for Mathenomics HS hub. Topic patterns only; no verbatim exam items.*
