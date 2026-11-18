/** Optional Mathematics (Nepal/CBSE-style): sets, matrices intro, limits intro, trig extras, vectors. */
(function () {
  if (!window.MK) return;
  const { P, R, pick, gcd, fr, Q, course } = window.MK;
  const { box, T, line, circle, poly } = P.kit;
  const ACC = "var(--accent)";

  const sfr = (n, d) => fr(n, d).replace("-", "−");
  const near = (ans, extras = []) =>
    [...extras, ans + 1, ans - 1, ans + 2, ans * 2, Math.floor(ans / 2)]
      .filter((x) => Number.isFinite(x) && x !== ans);

  function vennPic(note) {
    let body = circle(120, 110, 70, { w: 2.5 }) + circle(200, 110, 70, { w: 2.5 });
    body += T(95, 100, "A", { size: 16 }) + T(220, 100, "B", { size: 16 });
    body += T(160, 110, "∩", { size: 14, fill: ACC });
    body += T(160, 210, note || "A ∩ B in the overlap", { size: 13 });
    return box(320, 230, body, "Two sets");
  }

  function matPic(a, b, c, d, note) {
    return P.table(["", "c1", "c2"], [["r1", String(a), String(b)], ["r2", String(c), String(d)]], { note: note || "2 × 2" });
  }

  function numberLineLim(a) {
    const x = (v) => 40 + ((v + 2) / 8) * 240;
    let body = line(30, 100, 290, 100, { w: 2 });
    [-2, 0, a, 4, 6].forEach((v) => {
      body += line(x(v), 92, x(v), 108, { w: 2 });
      body += T(x(v), 128, String(v), { size: 12 });
    });
    body += circle(x(a), 100, 7, { fill: ACC });
    body += T(160, 160, `x approaches ${a}`, { size: 13 });
    return box(320, 180, body, "Limit idea on a line");
  }

  function vec2Pic() {
    let body = line(40, 160, 280, 160, { w: 1.5 }) + line(160, 40, 160, 200, { w: 1.5 });
    body += line(160, 160, 250, 100, { stroke: ACC, w: 4 });
    body += T(258, 96, "⟨3,2⟩", { size: 14, anchor: "start" });
    return box(320, 220, body, "A vector as an arrow");
  }

  course({
    id: "optional",
    grade: "Optional · 7–12",
    title: "Optional mathematics",
    color: "#2F4A3A",
    blurb: "Extra track: sets, matrices, limits, trig identities, and vectors — Nepal/CBSE optional style.",
    cheat: [
      {
        title: "Sets & matrices",
        rows: [
          ["∈ / ∉", "is / is not an element"],
          ["∪", "union — in A or B (or both)"],
          ["∩", "intersection — in both"],
          ["A′", "complement — not in A"],
          ["n(A∪B)", "n(A)+n(B)−n(A∩B)"],
          ["det 2×2", "ad − bc"],
          ["I₂", "[[1,0],[0,1]] identity"]
        ]
      },
      {
        title: "Limits, trig, vectors",
        rows: [
          ["Limit", "outputs approach L as x approaches a"],
          ["sin²+cos²", "= 1"],
          ["1+tan²", "= sec²"],
          ["|a|", "√(a₁²+a₂²)"],
          ["a·b", "a₁b₁+a₂b₂"]
        ]
      }
    ],
    lessons: [
      {
        id: "setlang",
        name: "Set language",
        phrase: "∈ means “in the club.” ∪ is or, ∩ is and, ′ is not.",
        steps: [
          "Curly braces list elements: {1,2,3}.",
          "x ∈ A means x is a member; x ∉ A means it is not.",
          "Union ∪ = or; intersection ∩ = both; complement A′ = not in A (inside the universe)."
        ],
        exception: "Order and repeats do not matter in a set: {1,2} = {2,1,1}. ∅ is empty — nothing is ∈ ∅. Do not confuse ⊂ (subset) with ∈ (element).",
        pic: () => vennPic("Overlap is ∩; both blobs together are ∪"),
        gen() {
          const form = R(1, 4);
          if (form === 1) {
            return Q("Which symbol means “is an element of”?", "∈", ["∪", "∩", "⊂", "∉"],
              "∈ reads “belongs to” or “is in”.", vennPic());
          }
          if (form === 2) {
            return Q("A ∪ B means elements that are in", "A or B (or both)", ["only A", "only both", "neither"],
              "Union is the “or” region.", vennPic("A ∪ B"));
          }
          if (form === 3) {
            return Q("A ∩ B means elements that are in", "both A and B", ["A or B", "only A", "neither"],
              "Intersection is the overlap.", vennPic("A ∩ B"));
          }
          return Q("If U = {1,2,3,4,5} and A = {1,2}, then A′ =", "{3,4,5}", ["{1,2}", "{1,2,3,4,5}", "∅", "{3,4}"],
            "Complement: everything in U not in A.", P.roof("A′", "{3,4,5}"));
        },
        worked: [
          {
            problem: "U = {a,b,c,d}, A = {a,c}. List A′.",
            steps: [
              ["Universe leftovers", "Not in A: b and d."],
              ["Write the set", "A′ = {b,d}."]
            ],
            answer: "{b, d}"
          },
          {
            problem: "Is 3 ∈ {1,2,3,4}?",
            steps: [
              ["Check membership", "3 appears in the list."],
              ["Symbol", "Yes: 3 ∈ {1,2,3,4}."]
            ],
            answer: "Yes"
          }
        ]
      },
      {
        id: "setcount",
        name: "Counting with sets",
        phrase: "n(A∪B) = n(A)+n(B)−n(A∩B). Subtract the double-counted overlap.",
        steps: [
          "Add the sizes of A and B.",
          "Subtract n(A∩B) once (it was counted twice).",
          "For three sets, use the full inclusion–exclusion formula."
        ],
        exception: "If A and B are disjoint, n(A∩B)=0 and you just add. n(A) counts elements, not a probability — divide by n(U) only when asked for a probability.",
        pic: () => vennPic("Overlap counted twice if you only add"),
        gen() {
          const a = R(8, 20), b = R(8, 20);
          const both = R(2, Math.min(7, a, b));
          const ans = a + b - both;
          return Q(`n(A)=${a}, n(B)=${b}, n(A∩B)=${both}. n(A∪B)?`, ans, near(ans, [a + b, a + b + both, both]),
            `${a}+${b}−${both}=${ans}.`, vennPic(`${a}+${b}−${both}`));
        },
        worked: [
          {
            problem: "In a class, 18 play football, 12 play basketball, 5 play both. How many play at least one?",
            steps: [
              ["Formula", "n(F∪B)=18+12−5."],
              ["Compute", "25."]
            ],
            answer: "25"
          },
          {
            problem: "n(A∪B)=30, n(A)=20, n(B)=18. Find n(A∩B).",
            steps: [
              ["Rearrange", "n(A∩B)=n(A)+n(B)−n(A∪B)."],
              ["Compute", "20+18−30=8."]
            ],
            answer: "8"
          }
        ]
      },
      {
        id: "matintro",
        name: "Matrix shape & add",
        phrase: "Rows by columns: m×n. Add entrywise — same shape only.",
        steps: [
          "Read size as rows × columns.",
          "Addition: add matching positions; sizes must match.",
          "Scalar multiply: multiply every entry by the number."
        ],
        exception: "You cannot add a 2×3 to a 3×2. Matrix multiplication is not entrywise addition — that comes later.",
        pic: () => matPic(1, 2, 3, 4, "2 rows, 2 columns → 2×2"),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const r = R(2, 4), c = R(2, 4);
            return Q(`A matrix with ${r} rows and ${c} columns is called`, `${r}×${c}`, [`${c}×${r}`, `${r}+${c}`, `${r}${c}`],
              `Rows first, then columns: ${r}×${c}.`, matPic(1, 0, 0, 1, "rows × columns"));
          }
          if (form === 2) {
            const a = R(1, 5), b = R(1, 5), c = R(1, 5), d = R(1, 5);
            const e = R(1, 5), f = R(1, 5), g = R(1, 5), h = R(1, 5);
            const ans = a + e;
            return Q(`[[${a},${b}],[${c},${d}]] + [[${e},${f}],[${g},${h}]]. Top-left entry?`, ans,
              near(ans, [a * e, a + b, b + f]),
              `Add matching entries: ${a}+${e}=${ans}.`, P.roof(`[[${a},?],[?,?]]`, `+ [[${e},?],[?,?]]`, "add matching entries"));
          }
          const k = R(2, 5), a = R(1, 6);
          return Q(`2×2 matrix has a₁₁ = ${a}. After multiplying by scalar ${k}, that entry is`, k * a,
            near(k * a, [a + k, a, k]),
            `Scalar: ${k}×${a}=${k * a}.`, P.roof(`${k} · matrix`, "every entry × " + k));
        },
        worked: [
          {
            problem: "Add [[1,2],[3,4]] + [[5,0],[1,1]].",
            steps: [
              ["Top row", "1+5=6, 2+0=2."],
              ["Bottom row", "3+1=4, 4+1=5."]
            ],
            answer: "[[6,2],[4,5]]"
          },
          {
            problem: "What is the size of [[1,2,3],[4,5,6]]?",
            steps: [
              ["Count rows", "2 rows."],
              ["Count columns", "3 columns → 2×3."]
            ],
            answer: "2×3"
          }
        ]
      },
      {
        id: "matdet",
        name: "Determinant & inverse idea",
        phrase: "det = ad − bc. Inverse exists only if det ≠ 0.",
        steps: [
          "For [[a,b],[c,d]], compute ad − bc.",
          "If det ≠ 0, A⁻¹ = (1/det) [[d,−b],[−c,a]].",
          "Check: A A⁻¹ = I."
        ],
        exception: "det = 0 means singular — no inverse. Do not swap the sign pattern on the off-diagonal by mistake.",
        pic: () => P.formula("ad − bc", "det", "main diagonal minus other"),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const a = R(1, 5), b = R(0, 4), c = R(0, 4), d = R(1, 5);
            const ans = a * d - b * c;
            return Q(`det [[${a},${b}],[${c},${d}]]`, ans, near(ans, [a * d + b * c, a * d, a + d]),
              `${a}·${d} − ${b}·${c} = ${ans}.`, matPic(a, b, c, d, "ad − bc"));
          }
          if (form === 2) {
            return Q("A 2×2 matrix has an inverse if and only if", "det ≠ 0", ["det = 0", "trace ≠ 0", "all entries positive"],
              "Non-singular ⇔ determinant nonzero.", P.roof("invertible?", "det ≠ 0"));
          }
          return Q("The 2×2 identity matrix is", "[[1,0],[0,1]]", ["[[0,1],[1,0]]", "[[1,1],[1,1]]", "[[1,0],[1,0]]"],
            "Ones on the main diagonal, zeros elsewhere.", matPic(1, 0, 0, 1, "I₂"));
        },
        worked: [
          {
            problem: "Find det [[4,1],[2,3]].",
            steps: [
              ["ad", "4×3=12."],
              ["minus bc", "1×2=2; 12−2=10."]
            ],
            answer: "10"
          },
          {
            problem: "Does [[2,1],[4,2]] have an inverse?",
            steps: [
              ["det", "2·2 − 1·4 = 0."],
              ["Conclusion", "Singular — no inverse."]
            ],
            answer: "No"
          }
        ]
      },
      {
        id: "limintro",
        name: "Limits intro",
        phrase: "A limit asks: what do the outputs approach as x approaches a?",
        steps: [
          "Try plugging x = a into f(x).",
          "If you get a normal number, that is usually the limit (for continuous pieces).",
          "If you get 0/0, factor or simplify, then plug in again."
        ],
        exception: "A hole or jump can make the limit differ from f(a), or make left/right limits disagree. “Approaches” is not the same as “equals” at a.",
        pic: () => numberLineLim(2),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const a = R(2, 6);
            const ans = a * a + 1;
            return Q(`lim x→${a} (x² + 1)`, ans, near(ans, [a + 1, a * a, 2 * a]),
              `Polynomial: plug in ${a} → ${ans}.`, numberLineLim(a));
          }
          if (form === 2) {
            const a = R(2, 5);
            return Q(`lim x→${a} (x² − ${a * a})/(x − ${a})`, 2 * a, near(2 * a, [a, 0, a * a]),
              `Factor (x−${a})(x+${a})/(x−${a}) → ${2 * a}.`, P.roof("0/0", `x+${a}`));
          }
          return Q("If lim x→a f(x) = L, then as x gets close to a, f(x) gets close to", "L", ["a", "0", "f(a) only"],
            "L is the limiting output value.", numberLineLim(3));
        },
        worked: [
          {
            problem: "Find lim x→2 (3x + 1).",
            steps: [
              ["Continuous line", "Just substitute x=2."],
              ["Value", "6+1=7."]
            ],
            answer: "7"
          },
          {
            problem: "Find lim x→4 (x²−16)/(x−4).",
            steps: [
              ["Indeterminate", "Plug-in gives 0/0."],
              ["Factor", "(x−4)(x+4)/(x−4)=x+4."],
              ["Limit", "4+4=8."]
            ],
            answer: "8"
          }
        ]
      },
      {
        id: "trigid",
        name: "Trig identity extras",
        phrase: "sin²θ + cos²θ = 1. Divide by cos² → 1 + tan²θ = sec²θ.",
        steps: [
          "Start from sin² + cos² = 1 on the unit circle.",
          "Divide by cos²θ: tan² + 1 = sec².",
          "Divide by sin²θ: 1 + cot² = cosec²."
        ],
        exception: "These assume cos θ ≠ 0 when you create tan/sec forms (and sin ≠ 0 for cot/cosec). Identities hold where the functions are defined.",
        pic: () => P.table(["identity"], [["sin²θ + cos²θ = 1"], ["1 + tan²θ = sec²θ"], ["1 + cot²θ = cosec²θ"]], { note: "Pythagorean family" }),
        gen() {
          const form = R(1, 4);
          if (form === 1) {
            return Q("sin²θ + cos²θ equals", "1", ["0", "tan θ", "2", "sec²θ"],
              "Fundamental Pythagorean identity.", P.roof("sin²+cos²", "1"));
          }
          if (form === 2) {
            return Q("1 + tan²θ equals", "sec²θ", ["cosec²θ", "cos²θ", "1", "tan²θ"],
              "Divide sin²+cos²=1 by cos².", P.roof("1+tan²", "sec²"));
          }
          if (form === 3) {
            const s = pick(["3/5", "5/13", "8/17"]);
            const c = { "3/5": "4/5", "5/13": "12/13", "8/17": "15/17" }[s];
            return Q(`If sin θ = ${s} and θ acute, cos θ =`, c, ["3/4", "5/12", s, "1"],
              `sin²+cos²=1 → cos = ${c} (acute).`, P.roof(`sin=${s}`, `cos=${c}`));
          }
          return Q("1 + cot²θ equals", "cosec²θ", ["sec²θ", "tan²θ", "1", "sin²θ"],
            "Divide sin²+cos² by sin².", P.roof("1+cot²", "cosec²"));
        },
        worked: [
          {
            problem: "Given sin θ = 5/13 (acute), find cos θ and tan θ.",
            steps: [
              ["Pythagorean", "cos θ = √(1−25/169)=12/13."],
              ["Tangent", "tan θ = sin/cos = 5/12."]
            ],
            answer: "cos 12/13, tan 5/12"
          },
          {
            problem: "Prove 1 + tan²θ = sec²θ from sin²+cos²=1.",
            steps: [
              ["Divide by cos²θ", "sin²/cos² + 1 = 1/cos²."],
              ["Rename", "tan²θ + 1 = sec²θ."]
            ],
            answer: "1 + tan²θ = sec²θ"
          }
        ]
      },
      {
        id: "trigcomp",
        name: "Cofunction & signs",
        phrase: "sin(90°−θ)=cos θ. ASTC: All Sugar Tea Coffee for signs.",
        steps: [
          "Complement: sin↔cos, tan↔cot, sec↔cosec with 90°−θ.",
          "For angles past 90°, reduce to a reference angle.",
          "ASTC tells which functions are positive in each quadrant."
        ],
        exception: "Cofunction identities need the complement (90°−θ), not 180°−θ (that keeps the name for sine). Know your calculator mode.",
        pic: () => P.table(["Q", "+"], [["I All", "all"], ["II Sugar", "sin"], ["III Tea", "tan"], ["IV Coffee", "cos"]], { note: "ASTC" }),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const t = pick([20, 25, 35, 40]);
            return Q(`sin(90° − ${t}°) =`, `cos ${t}°`, [`sin ${t}°`, `tan ${t}°`, `cos(90°−${t}°)`],
              "Cofunction: sin(90°−θ)=cos θ.", P.roof(`sin(90°−${t}°)`, `cos ${t}°`));
          }
          if (form === 2) {
            return Q("In quadrant II, which of sin, cos, tan is positive?", "sin", ["cos", "tan", "none"],
              "Sugar → sine (and cosec).", P.roof("QII", "sin +"));
          }
          return Q("cos(90° − θ) equals", "sin θ", ["cos θ", "−sin θ", "tan θ"],
            "Cofunction swap.", P.roof("cos(90°−θ)", "sin θ"));
        },
        worked: [
          {
            problem: "Simplify cos(90° − 35°).",
            steps: [
              ["Cofunction", "cos(90°−θ)=sin θ."],
              ["Apply", "sin 35°."]
            ],
            answer: "sin 35°"
          },
          {
            problem: "Is tan positive or negative at 200°?",
            steps: [
              ["Quadrant", "200° is in III."],
              ["ASTC", "Tea → tan positive."]
            ],
            answer: "Positive"
          }
        ]
      },
      {
        id: "vecintro",
        name: "Vectors intro",
        phrase: "A vector has size and direction. ⟨a,b⟩ adds componentwise; length √(a²+b²).",
        steps: [
          "Write a plane vector as ⟨a,b⟩ or ai + bj.",
          "Add/subtract matching components; multiply by a scalar on each.",
          "Magnitude |⟨a,b⟩| = √(a²+b²)."
        ],
        exception: "Position vs free vector: the same ⟨a,b⟩ can start anywhere. |a+b| is not usually |a|+|b|. A scalar has no direction.",
        pic: () => vec2Pic(),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const a = R(1, 6), b = R(1, 6), c = R(1, 6), d = R(1, 6);
            return Q(`⟨${a},${b}⟩ + ⟨${c},${d}⟩ =`, `⟨${a + c},${b + d}⟩`,
              [`⟨${a + b},${c + d}⟩`, `⟨${a * c},${b * d}⟩`, `⟨${a - c},${b - d}⟩`],
              `Add components: ⟨${a}+${c}, ${b}+${d}⟩.`,
              vec2Pic());
          }
          if (form === 2) {
            const pair = pick([[3, 4], [6, 8], [5, 12]]);
            const ans = String(Math.round(Math.sqrt(pair[0] ** 2 + pair[1] ** 2)));
            return Q(`|⟨${pair[0]}, ${pair[1]}⟩|`, ans, [String(pair[0] + pair[1]), String(pair[0] * pair[1]), String(pair[0] ** 2 + pair[1] ** 2)],
              `√(${pair[0]}²+${pair[1]}²)=${ans}.`, vec2Pic());
          }
          const k = R(2, 5), a = R(1, 4), b = R(1, 4);
          return Q(`${k}⟨${a},${b}⟩ =`, `⟨${k * a},${k * b}⟩`, [`⟨${k + a},${k + b}⟩`, `⟨${a},${b}⟩`, `${k + a + b}`],
            "Scalar multiplies each component.", P.roof(`${k}⟨${a},${b}⟩`, `⟨${k * a},${k * b}⟩`));
        },
        worked: [
          {
            problem: "Find ⟨2,−1⟩ + ⟨3,4⟩.",
            steps: [
              ["x-components", "2+3=5."],
              ["y-components", "−1+4=3 → ⟨5,3⟩."]
            ],
            answer: "⟨5, 3⟩"
          },
          {
            problem: "Find |⟨6,8⟩|.",
            steps: [
              ["Squares", "36+64=100."],
              ["Root", "√100=10."]
            ],
            answer: "10"
          }
        ]
      },
      {
        id: "vecdot",
        name: "Dot product intro",
        phrase: "a·b = a₁b₁ + a₂b₂. Zero dot means perpendicular.",
        steps: [
          "Multiply matching components and add.",
          "Also a·b = |a||b| cos θ.",
          "If a·b = 0 (and neither is zero), the vectors are perpendicular."
        ],
        exception: "Dot product is a number, not a vector. Parallel vectors have cos θ = ±1, not necessarily a zero dot.",
        pic: () => P.roof("a·b", "a₁b₁ + a₂b₂", "scalar result"),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const a = R(1, 5), b = R(1, 5), c = R(1, 5), d = R(-3, 4);
            const ans = a * c + b * d;
            return Q(`⟨${a},${b}⟩ · ⟨${c},${d}⟩`, ans, near(ans, [a * c, a + b + c + d, a * d + b * c]),
              `${a}·${c}+${b}·${d}=${ans}.`, P.roof("dot", String(ans)));
          }
          if (form === 2) {
            const a = R(2, 5), b = R(1, 4);
            return Q(`⟨${a},${b}⟩ · ⟨${b},${-a}⟩`, 0, near(0, [a * b, 1, a + b]),
              "Built to be perpendicular: dot 0.", P.roof("perpendicular", "dot = 0"));
          }
          return Q("If a·b = 0 with a,b nonzero, then a and b are", "perpendicular", ["parallel", "equal", "opposite"],
            "cos θ = 0 → θ = 90°.", P.roof("a·b=0", "⊥"));
        },
        worked: [
          {
            problem: "Compute ⟨1,2⟩ · ⟨3,−4⟩.",
            steps: [
              ["Products", "1·3 + 2·(−4)."],
              ["Sum", "3 − 8 = −5."]
            ],
            answer: "−5"
          },
          {
            problem: "Show ⟨2,1⟩ ⊥ ⟨−1,2⟩.",
            steps: [
              ["Dot", "2·(−1)+1·2=0."],
              ["Conclude", "Perpendicular."]
            ],
            answer: "dot 0 → perpendicular"
          }
        ]
      },
      {
        id: "setops",
        name: "Subset & power set",
        phrase: "A ⊆ B if every element of A sits in B. Power set: all subsets — 2ⁿ of them.",
        steps: [
          "Check subset: each member of A must be in B.",
          "Proper subset ⊂ usually means ⊆ but not equal.",
          "A finite set with n elements has 2ⁿ subsets (including ∅ and itself)."
        ],
        exception: "∈ is for elements; ⊆ is for sets. {1} ∈ {{1}} is true, but 1 ∈ {{1}} is false. ∅ is a subset of every set.",
        pic: () => P.roof("n elements", "2ⁿ subsets", "include ∅ and the whole set"),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const n = R(2, 5);
            const ans = 2 ** n;
            return Q(`A set with ${n} elements has how many subsets?`, ans, near(ans, [n * n, n * 2, n + 1]),
              `Power set size 2^${n} = ${ans}.`, P.roof(`${n} elements`, `${ans} subsets`));
          }
          if (form === 2) {
            return Q("Is ∅ a subset of {1,2}?", "yes", ["no", "only if 0 ∈ {1,2}", "undefined"],
              "The empty set is a subset of every set.", P.roof("∅ ⊆ A", "always"));
          }
          return Q("Which is true?", "{1,2} ⊆ {1,2,3}", ["{1,2,3} ⊆ {1,2}", "3 ∈ {1,2}", "{1} ∈ {1,2}"],
            "Every element of {1,2} lies in {1,2,3}.", P.roof("{1,2}", "⊆ {1,2,3}"));
        },
        worked: [
          {
            problem: "List all subsets of {a,b}.",
            steps: [
              ["Empty and singles", "∅, {a}, {b}."],
              ["Full set", "{a,b}. Total 4 = 2²."]
            ],
            answer: "∅, {a}, {b}, {a,b}"
          },
          {
            problem: "How many subsets does {1,2,3,4} have?",
            steps: [
              ["Count elements", "n=4."],
              ["Power of two", "2⁴=16."]
            ],
            answer: "16"
          }
        ]
      }
    ]
  }, "g7");
})();
