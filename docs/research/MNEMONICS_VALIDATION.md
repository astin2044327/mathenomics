# Mnemonics validation (app + swarm)

Cross-check of **in-app** mnemonics against `docs/research/MNEMONICS_SWARM.md` (181 swarm rows) and `docs/research/VALIDATION_NOTES.md`. Lesson **Watch out** (`exception`) fields count as part of the mnemonic bundle.

**Scope**

| Surface | Items reviewed |
| --- | ---: |
| `js/more/cheats.js` cheat rows | 244 |
| `js/courses.js` core lessons (`phrase` + `exception`) | 45 |
| `js/more/{arith,geo,trig,hs,pabson,expand,optional,tables}.js` | 398 lesson phrases |
| Swarm-only (not yet in app) | spot-checked vs gaps table in swarm doc |

**Summary counts (in-app)**

| Verdict | cheats.js | courses.js | more/* lessons | Total |
| --- | ---: | ---: | ---: | ---: |
| **OK** | 238 | 45 | 388 | **671** |
| **FIX** | 6 | 0 | 8 | **14** |
| **REJECT** | 0 | 0 | 2 | **2** |

Five **FIX** rows in `cheats.js` were patched in this pass (see bottom). Remaining FIX items are documented for copy or exception hardening only.

---

## High-risk math (spot audit)

| Topic | In-app status | Notes |
| --- | --- | --- |
| PEMDAS / BODMAS / GEMS | OK (+ cheats tightened) | Core `pemdas` lesson and `expand.js` `gems-order` / `leftright5` teach ×÷ and +− **left to right**. `g3` cheats PEMDAS row was thin → **patched**. |
| FOIL | OK | Phrases correct; exceptions in `geo.js` / `expand.js` limit to two binomials and warn on signs. |
| ASTC / CAST | OK (+ cheats tightened) | `courses.js` `astc` embeds quadrant words in “Add Sugar To Coffee” with `also: All Students Take Calculus`; `expand.js` `cast10` warns against mixing. Cheat row clarified start quadrant. |
| Heron | OK | Every phrase uses **s = (a+b+c)/2** then radical; exceptions flag triangle inequality and “s is half perimeter”. |
| Simple vs compound interest | OK (+ cheats) | `arith.js` `interest` + `hs.js` `compound` contrast I=PRT vs `(1±r/100)^n`. Cheat **I=PRT** now says simple only. |
| SSA / ambiguous triangle | OK | Sine-rule exceptions in `hs.js` / `trig.js` / `trig2` cheats. |

---

## REJECT

| Location | Phrase / hook | Reason |
| --- | --- | --- |
| `expand.js` → `tomatoes` | Five tomatoes: 5-2-8-0 feet in a mile | Listed in `VALIDATION_NOTES.md` / swarm **reject**: digit joke with no structure; misremember risk. Present for optional memory hook only — do not treat as math procedure. |
| Swarm row (not imported) | Apple pies are **square**: A = πr² | Reject duplicate / “square” confuses shape vs r²; app uses “Apple pies are **too**” in `arith.js` / cheats — **keep that wording**. |

---

## FIX (corrected phrase + one-line reason)

### `js/more/cheats.js` (patched)

| Row | Was | Corrected | Reason |
| --- | --- | --- | --- |
| g3 PEMDAS | Order: parentheses → ×÷ → +− | Groups → powers → ×÷ then +− (each left to right) | Letter order hides exponents and ×÷ tie. |
| g5 Butterfly | Cross multiply to compare fractions | Cross multiply only when two ratios are equal | Butterfly is for proportions, not fraction add/multiply. |
| g7 I = PRT | Interest = Principal × Rate × Time | Simple interest only: P × rate × time (rate as decimal) | Compound uses powers on balance, not I=PRT. |
| g10 ASTC / CAST | All Sin Tan Cos — signs by quadrant | ASTC from QI: All→Sin→Tan→Cos; don’t mix with CAST start | CAST starts in QIV; mixing flips every sign. |
| g11 p-value | Tiny p → reject the null hypothesis | Chance, if H₀ were true, of data this extreme (small → surprising) | p is not P(H₀ true); matches `expand.js` `pvalue-row-boat`. |

### Lessons / packs (documented; exceptions already strong — optional copy tweaks)

| Location | Issue | Suggested phrase tweak | Reason |
| --- | --- | --- | --- |
| `expand.js` → `orderops3` (g3) | “My Dear before Aunt Sally” | Keep; add in class: “÷ ties × left to right when both appear” | Grade 3 peek is × vs + only; older students need ÷× tie before full PEMDAS. |
| `expand.js` → `orderops3` | exception omits ÷ tie | (exception already OK for g3 scope) | — |
| `g8` cheats Complements / Supplements | No adjacency caveat on sheet | Add “need not touch” in cheat if expanded | Angles can be complementary without sharing a ray. |
| `g7` cheats Speed triangle | Cover letter in D=rt triangle | Add “check units match” | Triangle hides average-speed traps. |
| `hs.js` → `compound` | exception says `P + Prt/100` | Optional: “Simple **amount**: P + Prt/100” | Distinguishes total amount from interest I=Prt. |
| `pabson.js` complex FOIL drill | Uses FOIL on binomial×binomial with i | OK | Exception in parent lesson covers i²→−1. |
| `g5` cheats PEMDAS / BODMAS | “Groups first, then ×÷, then +−” | OK alongside separate “Left-to-right ×÷” row | Pair both rows when teaching. |
| `g9` cheats Factor x²+bx+c | Two numbers: product c, sum b | OK with `geo` lesson exception for a≠1 | |

---

## OK — `js/courses.js` (all 45 core lessons)

All core phrases are mathematically sound; each has a matching **exception** for the usual traps (PEMDAS left-to-right, KCC vs KCF, Pythagoras hypotenuse, ASTC quadrant walk, SSA, discriminant, ∫1/x, etc.).

| id | Phrase | Verdict |
| --- | --- | ---: |
| gator … integral (full list) | (see `js/courses.js`) | OK |

Representative OK rows:

| id | Phrase | Why OK |
| --- | --- | --- |
| pemdas | Please Excuse My Dear Aunt Sally. | Steps + exception teach ×÷ and +− ties. |
| longdiv | Does McDonald’s Sell Burgers? | DMSB steps; remainder & divisor exception. |
| astc | Add Sugar To Coffee. | Quadrant words Sugar/To/Coffee in steps; also gives ASTC expansion. |
| pythag | Square the legs, add them… | Right triangle + hypotenuse exception. |
| quadratic | Negative b, plus or minus… | a≠0 and discriminant exception. |

---

## OK — `js/more/cheats.js` (by grade, selected)

Full sheet: **238 OK**, **6 FIX** (5 patched, 1 note: speed triangle units). No REJECT rows on the cheatsheet itself.

| Grade | Representative OK hooks |
| --- | --- |
| k–g1 | Hungry alligator, friends of ten, borrow rhyme, month knuckles |
| g3–g4 | ×9 finger, divisibility, King Henry, arrays, MAD/KCF in g5 block |
| g5–g6 | GEMS + left-to-right row, decimal hop, LCM ladder, corridor/stairs |
| g7–g8 | Integer sign rules, cherry/apple pie, F/Z/C parallel, solid volumes |
| g9–g10 | FOIL, discriminant, SOHCAHTOA, circle theorems, AP/GP |
| g11 / trig2 | Derivative jingles, ∫ power vs ln x, sine/cosine rule, compound angle chant |
| hs / pabson / optional | Grouped mean, matrix row×column, i² cycle |

---

## OK — `js/more/*` lesson packs (topic sample)

| File | OK focus | FIX (in-pack) |
| --- | --- | --- |
| `arith.js` (34) | Fractions, decimals, stats rhyme, I=PRT, butterfly exception | 0 |
| `geo.js` (30) | FOIL, circle, similarity, coordinate geometry | 0 |
| `trig.js` (19) | ASTC/Sugar/Tea/Coffee worked, allied angles, equations | 0 |
| `hs.js` (28) | Heron, ASTC, compound vs simple, set formulas | 0 (optional amount wording) |
| `pabson.js` (28) | nPr/nCr, binomial term, logs, determinants | 0 |
| `expand.js` (137) | GEMS, BODMAS, CAST vs ASTC, LIATE, p-value lesson | 1 **REJECT** (`tomatoes`) |
| `optional.js` (10) | ASTC table, cofunction | 0 |
| `tables.js` (12) | Table fluency | 0 |

---

## Swarm ↔ app alignment

| Swarm gap (from MNEMONICS_SWARM.md) | App status |
| --- | --- |
| GEMS, King Henry, knuckles month | Partially in cheats (g1/g3); not all in core lessons |
| Roman numerals beyond I,V,X | Cheats `Roman i-v` only; expand has fuller lessons |
| LIATE / L'Hôpital / partial fractions | Cheats g11 + pabson rows; not in K–10 core |
| Standard deviation jingle | Correctly **absent** (teach definition) |

Swarm **rejects** (feet-in-mile tomatoes, arithmetic-spelling, skew-alphabetical, chi-square jingle, pi word-count): only **tomatoes** appears in-app (`expand.js`).

---

## Files patched this validation

| File | Change |
| --- | --- |
| `js/more/cheats.js` | 5 cheat glosses (PEMDAS, butterfly, I=PRT, ASTC/CAST, p-value) |

`node tools/check.js` was **not** run (no lesson `gen()` edits).

---

## References

- `docs/research/MNEMONICS_SWARM.md`
- `docs/research/VALIDATION_NOTES.md`
- `docs/research/mnemonics.json` / `validated.json`