# Validation notes

Validated **132** researched mnemonics from `mnemonics.json` against mathematical soundness and current app coverage (**259** lessons).

## Counts

| Verdict | Count |
| --- | ---: |
| accept | 94 |
| accept_with_fix | 31 |
| reject | 7 |
| **implement: true** | **14** |

## Rejects

- **feet-in-mile-tomatoes** (`5-6` / Customary units): Joke digit scaffold with no mathematical structure; easy to misremember.
- **arithmetic-spelling** (`3-4` / Spelling): Spelling mnemonic for the word 'arithmetic', not a mathematical idea or procedure.
- **apple-pies-square** (`7` / Circle area): Duplicate of the cherry/apple pie circle mnemonic; 'square' confuses area with a square shape.
- **star-word-problems** (`9` / Word problems): Generic study heuristic, not a math mnemonic.
- **pi-may-i-have** (`optional` / Digits of pi): Letter-count entertainment, not a classroom procedure; typos silently corrupt digits.
- **skew-alphabetical** (`11-12` / Skewness): Unreliable rule frequently taught as fact; unsafe as a trusted phrase.
- **chi-square-old-macdonald** (`11-12` / Chi-square statistic): Letter mash does not map cleanly to Σ(O−E)²/E; teach the formula directly.

Two rejects (`feet-in-mile-tomatoes`, `arithmetic-spelling`) already appear in the expand pack — do not treat presence in-app as endorsement; prefer removing or replacing later.

## Common exception themes

1. **Left-to-right ties (PEMDAS/BODMAS/BEDMAS)** — Letter order falsely ranks × before ÷ and + before −. Teach shared precedence.
2. **Overgeneralized sign tricks (KCC, friends/enemies, “two negatives”)** — Fine for one operation family; lethal when applied to another.
3. **Cross-multiply / butterfly** — Valid for proportions only; not for adding or multiplying fractions.
4. **FOIL / MAD / Keep-Change-Flip** — Procedurally correct special cases that hide the general idea (distribution, reciprocal, place value).
5. **Radius vs diameter / slant vs perpendicular height** — Circle and solid-volume mnemonics fail when the wrong length is plugged in.
6. **Quadrant sign systems (ASTC vs CAST)** — Both work; mixing start corners flips every answer.
7. **Stats folklore** — Alphabetical skew and chi-square letter songs are unreliable; definitions beat jingles.
8. **Units and average rate** — D=RT triangles ignore unit consistency and “average of speeds” errors.

## High-value accept_with_fix (already in app)

These stay `implement: false` but their Watch out text should stay sharp (or be hardened later):

- **rounding-five-or-more**: School rule: 5 or more raises the digit. Carry through 9s (1.96→2.0 at 1 d.p.). Banker's rounding differs and is usually not school policy.
- **long-div-dmsbr**: Place value matters. Remainder must be < divisor. Chant ≠ understanding remainders as fractions/decimals.
- **divisibility-2-5-10**: Omits a clean rule for 7. Digit sum for 9 is repeated until small. Alternating sum for 11 may be 0.
- **equiv-frac-top-bottom**: Multiply or divide top and bottom by the same nonzero number. Never 'do the same' when adding fractions.
- **pemdas-aunt-sally**: × and ÷ are the same level (left to right): 8 ÷ 2 × 4 = 16, not 1. Same for + and −. Grouping includes brackets, fraction bars, and | | — no…
- **bodmas**: Division is not before multiplication — shared precedence, left to right. Same for +/−. 'Orders' means powers and roots.
- **bedmas**: Do not do all division before multiplication. Work × and ÷ left to right; + and − left to right.
- **keep-change-flip**: Flip only the second fraction. Convert mixed numbers first. Never divide by zero.
- **mad-mixed**: Denominator never changes. Multiply by the bottom, not the top. 2 3/4 = 11/4, not 11/8.
- **dec-div-hop-dots**: Move both decimal points the same number of places so the divisor is whole. Unequal hops change the quotient.
- **metric-king-henry**: 'By' is the base unit. Mega/micro/nano are off this ladder. Each step is ×10 or ÷10.
- **signed-friend-enemy**: Applies only to multiplication and division — never to addition or subtraction.
- **friends-positive**: Only for × and ÷. For addition use absolute values and direction, not 'friends'.
- **dividend-end**: In the 'house' diagram the dividend is inside; layouts vary. Remainder ≠ quotient.
- **keep-change-change**: Only for subtraction → addition of the opposite. Do not apply to ×/÷. Do not confuse with Keep-Change-Flip.
- **percent-out-of-100**: Percent means per 100. 10% of 10% is 1%, not 20%. More than 100% is allowed.
- **do-opposite-both-sides**: Apply the inverse to every term on both sides. For inequalities, ×/÷ by a negative flips the inequality.
- **butterfly-cross**: Only when two ratios are equal. Never cross-multiply to add or multiply fractions. Keep units matched.
- **slope-rise-run**: Slope = rise/run. Horizontal → 0; vertical → undefined. Downward means negative rise.
- **foil**: Only for (a+b)(c+d). Prefer distribute each-by-each. Watch signs. Longer polynomials need general distribution.
- **quadratic-pop-weasel**: If a=0 it is not quadratic. Δ<0 → no real roots. Divide the entire −b±√… by 2a.
- **factor-multiply-add**: For x²+bx+c (a=1): two numbers multiply to c and add to b. If a≠1 use AC method or the formula.
- **discriminant-roots**: Δ>0 two distinct real roots; =0 repeated real root; <0 no real roots (complex conjugates exist).
- **astc-all-students**: Different from CAST (starts in Q4). Reciprocals follow partner signs. Tan undefined where cos=0.
- **cast-rule**: Do not mix with ASTC (starts in Quadrant I). Reciprocals match their partner's sign.

## Implement: true (not fully covered)

- **month-knuckles** [accept] — Knuckles are 31-day months; valleys between are shorter.
- **thirty-days-hath** [accept] — Thirty days hath September, April, June, and November.
- **gems-order** [accept] — GEMS: Grouping, Exponents, Multiply/Divide, Subtract/Add.
- **roman-iview** [accept_with_fix] — I View Xylophones: I=1, V=5, X=10 (extend: L=50, C=100, D=500, M=1000).
- **dirt-distance** [accept] — d = rt — dirt.
- **speed-triangle** [accept_with_fix] — Distance = speed × time; cover up the unknown in the D–S–T relation.
- **neg-exponent-one-over** [accept] — Negative exponent: take one over with a positive power.
- **scalene-odd-one** [accept] — Scalene is the odd one out: no equal sides.
- **sine-is-y** [accept] — On the unit circle: cosine is x, sine is y.
- **liate-parts** [accept_with_fix] — LIATE: prefer u from Logarithmic, Inverse trig, Algebraic, Trig, Exponential (earlier wins).
- **u-sub-chain-reverse** [accept] — If you see f(g(x))·g'(x), let u = g(x) (undo the chain rule).
- **ftc-inverses** [accept_with_fix] — Differentiation and integration undo each other (Fundamental Theorem).
- **pvalue-row-boat** [accept_with_fix] — A p-value is the chance, assuming the null is true, of data at least this extreme.
- **boxplot-iqr-leash** [accept_with_fix] — Boxplot whiskers reach the furthest point within 1.5 × IQR of the quartiles; beyond that are outliers.

## Sources for trap judgment

- Nix the Tricks (PEMDAS, FOIL, butterfly, KCC, formula triangles, Keep-Change-Flip)
- Classroom write-ups on order-of-operations misconceptions and integer-operation overgeneralization
- Research `suspected_exception` fields cross-checked against existing lesson Watch out boxes
