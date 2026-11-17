/** PABSON / NEB Class 12 hard-problem course: exam-style types with original prompts. */
(function () {
  if (!window.MK) return;
  const { P, R, pick, gcd, neg, fr, pow, Q, course } = window.MK;
  const { box, T, line, poly, circle, dot, right, side } = P.kit;
  const ACC = "var(--accent)";

  const fact = (n) => {
    let p = 1;
    for (let i = 2; i <= n; i += 1) p *= i;
    return p;
  };
  const Pnr = (n, r) => fact(n) / fact(n - r);
  const Cnr = (n, r) => fact(n) / (fact(r) * fact(n - r));
  const sfr = (n, d) => fr(n, d).replace("-", "−");
  const near = (ans, extras = []) =>
    [...extras, ans + 1, ans - 1, ans + 2, ans - 2, ans * 2, Math.floor(ans / 2), ans + 10, ans - 10]
      .filter((x) => Number.isFinite(x) && x !== ans && String(x) !== String(ans));

  function mat2(a, b, c, d, note) {
    return P.table(["", "col 1", "col 2"], [["row 1", String(a), String(b)], ["row 2", String(c), String(d)]], { note: note || "2 × 2 matrix" });
  }

  function detPic(a, b, c, d) {
    return P.formula(`${a}·${d} − ${b}·${c}`, "ad − bc", `det = ${a * d - b * c}`);
  }

  function parabolaPic() {
    const pts = [];
    for (let i = 0; i <= 12; i += 1) {
      const x = 40 + i * 20;
      const t = (i - 6) / 3;
      pts.push([x, 40 + t * t * 28]);
    }
    let body = line(20, 180, 300, 180, { w: 1.5 }) + line(160, 20, 160, 200, { w: 1.5 });
    body += `<path d="M${pts.map((p) => p.join(",")).join(" L")}" fill="none" stroke="${ACC}" stroke-width="3"/>`;
    body += circle(160, 40, 5, { fill: ACC }) + T(178, 36, "vertex", { size: 12, anchor: "start" });
    body += circle(160, 88, 4) + T(178, 92, "focus", { size: 12, anchor: "start" });
    return box(320, 210, body, "Parabola y² = 4ax opens right; focus at (a, 0)");
  }

  function vecPic(ax, ay, bx, by) {
    const O = [160, 140];
    const A = [O[0] + ax * 18, O[1] - ay * 18];
    const B = [O[0] + bx * 18, O[1] - by * 18];
    const S = [O[0] + (ax + bx) * 18, O[1] - (ay + by) * 18];
    let body = line(40, 140, 280, 140, { w: 1.4 }) + line(160, 30, 160, 210, { w: 1.4 });
    body += line(O[0], O[1], A[0], A[1], { stroke: ACC, w: 3 }) + line(O[0], O[1], B[0], B[1], { w: 3 });
    body += line(O[0], O[1], S[0], S[1], { dash: "6 4", w: 2.5 });
    body += T(A[0] + 8, A[1], "a", { size: 13 }) + T(B[0] + 8, B[1], "b", { size: 13 }) + T(S[0] + 8, S[1], "a+b", { size: 13 });
    return box(320, 230, body, "Vector addition tip-to-tail");
  }

  function projPic() {
    const O = [36, 180], peak = [160, 70], land = [284, 180];
    let body = line(20, 180, 300, 180, { w: 2 });
    body += `<path d="M${O.join(",")} Q${peak.join(",")} ${land.join(",")}" fill="none" stroke="${ACC}" stroke-width="3"/>`;
    body += line(O[0], O[1], O[0] + 70, O[1] - 40, { w: 2, stroke: ACC });
    body += T(O[0] + 78, O[1] - 44, "u, θ", { size: 13, anchor: "start" });
    body += T(160, 200, "range = (u² sin 2θ)/g", { size: 13 });
    return box(320, 220, body, "Projectile path");
  }

  function nrPic() {
    return P.chain(["x₀", "x₁", "x₂", "…"], ["f/f′", "f/f′", "f/f′"]);
  }

  function limitPic() {
    return P.roof("lim x→a f(x)", "L", "Get close to a; the outputs get close to L");
  }

  course({
    id: "pabson",
    grade: "Grade 12",
    title: "PABSON-hard set",
    color: "#5C2A2A",
    blurb: "Exam-style problems up to Class 12. Each card is a mnemonic for a hard problem type, with guided steps.",
    cheat: [
      {
        title: "Hard-set hooks",
        rows: [
          ["nPr", "Order matters: n! / (n−r)!"],
          ["nCr", "Order does not: n! / (r!(n−r)!)"],
          ["Binomial", "(a+b)ⁿ: choose r of the b’s → C(n,r) aⁿ⁻ʳ bʳ"],
          ["Log", "log asks: what power?"],
          ["det 2×2", "ad − bc"],
          ["Limits", "Plug in; if 0/0, factor or cancel"],
          ["Max/min", "y′ = 0, then y′′ test"],
          ["DE separable", "dy/dx = f(x)g(y) → ∫ dy/g = ∫ f dx"],
          ["Newton–Raphson", "x₁ = x₀ − f(x₀)/f′(x₀)"],
          ["Range", "(u² sin 2θ)/g"]
        ]
      },
      {
        title: "Vectors & probability",
        rows: [
          ["Dot product", "a·b = |a||b| cos θ = a₁b₁ + a₂b₂"],
          ["Cross (2D mag)", "|a×b| = |a₁b₂ − a₂b₁|"],
          ["P(A∪B)", "P(A)+P(B)−P(A∩B)"],
          ["Binomial P", "C(n,k) pᵏ (1−p)ⁿ⁻ᵏ"]
        ]
      }
    ],
    lessons: [
      {
        id: "perm",
        name: "Permutations nPr",
        phrase: "Order matters: line them up. nPr = n! / (n−r)!.",
        steps: [
          "Ask: does order matter? Yes → permutation.",
          "Write nPr = n! / (n−r)!, or n × (n−1) × … for r factors.",
          "Cancel the unused factorial in the bottom."
        ],
        exception: "If order does not matter (a committee, a set of books), use nCr instead. Also nP0 = 1, and you cannot choose more than n.",
        pic: () => P.roof("5P3", "5×4×3", "three seats in a line"),
        gen() {
          const n = R(5, 9);
          const r = R(2, Math.min(4, n - 1));
          const ans = Pnr(n, r);
          return Q(`Compute ${n}P${r}.`, ans, near(ans, [Cnr(n, r), fact(n), Pnr(n, r - 1)]),
            `${n}P${r} = ${n}!/(${n - r})! = ${ans}. Order matters.`, P.roof(`${n}P${r}`, String(ans), "line them up"));
        },
        worked: [
          {
            problem: "How many 3-letter codes can be made from {A,B,C,D,E} with no letter repeated?",
            steps: [
              ["Order matters (codes)", "This is 5P3."],
              ["Expand", "5 × 4 × 3 = 60."]
            ],
            answer: "60"
          },
          {
            problem: "Evaluate 7P2.",
            steps: [
              ["Formula", "7P2 = 7! / 5!."],
              ["Cancel", "7 × 6 = 42."]
            ],
            answer: "42"
          }
        ]
      },
      {
        id: "comb",
        name: "Combinations nCr",
        phrase: "Order does not matter: bags, not lines. nCr = n! / (r!(n−r)!).",
        steps: [
          "Ask: does order matter? No → combination.",
          "Write nCr = n! / (r!(n−r)!), or nPr / r!.",
          "Use C(n,r) = C(n,n−r) to pick the smaller r."
        ],
        exception: "If seats are numbered or passwords are ordered, use nPr. C(n,0) = C(n,n) = 1. Never leave r! out of the bottom.",
        pic: () => P.roof("6C2", "15", "choose 2 from 6, order ignored"),
        gen() {
          const n = R(6, 10);
          const r = R(2, Math.min(4, Math.floor(n / 2)));
          const ans = Cnr(n, r);
          return Q(`Compute ${n}C${r}.`, ans, near(ans, [Pnr(n, r), Cnr(n, r - 1), Cnr(n, r + 1)]),
            `${n}C${r} = ${n}!/(${r}!(${n - r})!) = ${ans}.`, P.roof(`${n}C${r}`, String(ans), "bag, not line"));
        },
        worked: [
          {
            problem: "A club of 8 picks a 3-person committee. How many committees?",
            steps: [
              ["Order does not matter", "8C3."],
              ["Compute", "8×7×6 / (3×2×1) = 56."]
            ],
            answer: "56"
          },
          {
            problem: "Show 10C3 = 10C7, then find the value.",
            steps: [
              ["Symmetry", "C(n,r) = C(n,n−r), so 10C3 = 10C7."],
              ["Smaller r", "10×9×8 / 6 = 120."]
            ],
            answer: "120"
          }
        ]
      },
      {
        id: "binoms",
        name: "Binomial term",
        phrase: "Pick r of the second factors: C(n,r) aⁿ⁻ʳ bʳ.",
        steps: [
          "Expand (a+b)ⁿ by choosing how many b’s appear: r = 0,1,…,n.",
          "The general term is T_{r+1} = C(n,r) aⁿ⁻ʳ bʳ.",
          "For a specific power of x, set the exponent equal and solve for r."
        ],
        exception: "The first term is T₁ (r = 0), not T₀. Signs flip when b is negative. Do not forget the binomial coefficient.",
        pic: () => P.roof("(a+b)ⁿ", "Σ C(n,r) aⁿ⁻ʳ bʳ", "choose r copies of b"),
        gen() {
          const n = R(4, 7);
          const r = R(1, n - 1);
          const ans = Cnr(n, r);
          return Q(`In (x + 1)^${n}, the coefficient of x^${n - r} is`, ans, near(ans, [Cnr(n, r - 1), Cnr(n, r + 1), Pnr(n, r)]),
            `T with r = ${r}: C(${n},${r}) x^${n - r} (1)^${r} → coefficient ${ans}.`,
            P.roof(`C(${n},${r})`, String(ans), `power of x is ${n - r}`));
        },
        worked: [
          {
            problem: "Find the coefficient of x³ in (2 + x)⁵.",
            steps: [
              ["General term", "C(5,r) 2⁵⁻ʳ xʳ. Want r = 3."],
              ["Plug in", "C(5,3) × 2² × 1 = 10 × 4 = 40."]
            ],
            answer: "40"
          },
          {
            problem: "Write the middle term of (x + 2)⁶.",
            steps: [
              ["Even power: one middle", "n = 6 → middle is T₄ (r = 3)."],
              ["Compute", "C(6,3) x³ 2³ = 20 × 8 x³ = 160x³."]
            ],
            answer: "160x³"
          }
        ]
      },
      {
        id: "logs",
        name: "Log equations",
        phrase: "log asks: what power? Change to exponential, then check the domain.",
        steps: [
          "Rewrite log_b a = c as bᶜ = a.",
          "Use product → sum, quotient → difference, power → front when needed.",
          "Solve, then reject any root that makes a log argument ≤ 0."
        ],
        exception: "Arguments must be positive and bases > 0, ≠ 1. log(A) + log(B) = log(AB) only when both A and B are positive.",
        pic: () => P.roof("log_b a = c", "bᶜ = a", "power form"),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const b = pick([2, 3, 5, 10]);
            const c = R(2, 4);
            const a = b ** c;
            return Q(`Solve: log_${b} x = ${c}.`, a, near(a, [b * c, b + c, c ** b]),
              `log_${b} x = ${c} means ${b}^${c} = x, so x = ${a}.`, P.roof(`log_${b} x = ${c}`, `x = ${a}`));
          }
          if (form === 2) {
            const b = pick([2, 3, 10]);
            const n = R(2, 5);
            return Q(`Simplify: log_${b}(${b}^${n}).`, n, near(n, [b, n * b, 1]),
              `log_b(bⁿ) = n, so the answer is ${n}.`, P.roof(`log_${b}(${b}^${n})`, String(n)));
          }
          const a = R(2, 6);
          const b = R(2, 6);
          return Q(`log  ${a} + log  ${b}  (same base) equals log of`, a * b, [a + b, a - b, a / b, a ** b].filter((x) => x !== a * b),
            `Product rule: log A + log B = log(AB) = log ${a * b}.`, P.roof(`log ${a} + log ${b}`, `log ${a * b}`));
        },
        worked: [
          {
            problem: "Solve log₂(x − 1) = 3.",
            steps: [
              ["Exponential form", "2³ = x − 1."],
              ["Solve", "8 = x − 1 → x = 9."],
              ["Domain check", "x − 1 = 8 > 0, OK."]
            ],
            answer: "x = 9"
          },
          {
            problem: "Solve log₃ x + log₃(x − 2) = 1.",
            steps: [
              ["Combine", "log₃[x(x − 2)] = 1."],
              ["Exponential", "x(x − 2) = 3¹ = 3 → x² − 2x − 3 = 0."],
              ["Factor and check", "(x − 3)(x + 1) = 0. x = 3 works; x = −1 makes logs invalid."]
            ],
            answer: "x = 3"
          }
        ]
      },
      {
        id: "matmul",
        name: "Matrix multiply 2×2",
        phrase: "Row-dot-column: each entry is a row of A dotted with a column of B.",
        steps: [
          "Check sizes: A is m×n, B is n×p → AB is m×p.",
          "Entry (i,j) = row i of A · column j of B.",
          "Write all four entries for 2×2 carefully."
        ],
        exception: "AB ≠ BA in general. You cannot multiply if the inner sizes disagree. Scalar multiply is entrywise — matrix multiply is not.",
        pic: () => mat2(1, 2, 3, 4, "Row · column for each entry"),
        gen() {
          const a = R(1, 4), b = R(0, 3), c = R(1, 4), d = R(0, 3);
          const e = R(1, 4), f = R(0, 3), g = R(1, 4), h = R(0, 3);
          const p = a * e + b * g;
          const q = a * f + b * h;
          const r = c * e + d * g;
          const s = c * f + d * h;
          const which = pick(["(1,1)", "(1,2)", "(2,1)", "(2,2)"]);
          const ans = { "(1,1)": p, "(1,2)": q, "(2,1)": r, "(2,2)": s }[which];
          return Q(`A = [[${a},${b}],[${c},${d}]], B = [[${e},${f}],[${g},${h}]]. Entry ${which} of AB?`, ans,
            near(ans, [a * e, p + 1, a * e + b * f, c * f + d * h]),
            `Row·column for ${which}: ${ans}.`, mat2(p, q, r, s, "AB"));
        },
        worked: [
          {
            problem: "Multiply [[1,2],[0,3]] [[4,0],[1,5]].",
            pic: mat2(1, 2, 0, 3),
            steps: [
              ["(1,1)", "1·4 + 2·1 = 6."],
              ["(1,2)", "1·0 + 2·5 = 10."],
              ["Bottom row", "(2,1)=0·4+3·1=3; (2,2)=0·0+3·5=15."]
            ],
            answer: "[[6,10],[3,15]]"
          },
          {
            problem: "Why can you not multiply a 2×3 by a 2×2?",
            steps: [
              ["Inner sizes", "2×3 needs a 3×? on the right."],
              ["Mismatch", "2×2 has inner size 2, not 3."]
            ],
            answer: "Inner dimensions 3≠2 — product not defined"
          }
        ]
      },
      {
        id: "det2",
        name: "Determinant 2×2",
        phrase: "Main diagonal product minus other diagonal: ad − bc.",
        steps: [
          "For [[a,b],[c,d]], compute ad − bc.",
          "If det = 0, the matrix is singular (no inverse).",
          "For inverse: (1/det) [[d,−b],[−c,a]]."
        ],
        exception: "Do not add the diagonals. Sign of bc is subtracted. For 3×3 use cofactor expansion, not a fake “diagonal rule” without care.",
        pic: () => detPic(3, 1, 2, 4),
        gen() {
          const a = R(1, 6), b = R(0, 5), c = R(0, 5), d = R(1, 6);
          const ans = a * d - b * c;
          return Q(`det [[${a},${b}],[${c},${d}]]`, ans, near(ans, [a * d + b * c, a * d, b * c, a + d - b - c]),
            `ad − bc = ${a}·${d} − ${b}·${c} = ${ans}.`, detPic(a, b, c, d));
        },
        worked: [
          {
            problem: "Find det [[2,5],[1,3]].",
            steps: [
              ["ad", "2 × 3 = 6."],
              ["minus bc", "5 × 1 = 5; 6 − 5 = 1."]
            ],
            answer: "1"
          },
          {
            problem: "Does [[1,2],[2,4]] have an inverse?",
            steps: [
              ["Determinant", "1·4 − 2·2 = 0."],
              ["Singular", "det 0 → no inverse."]
            ],
            answer: "No (singular)"
          }
        ]
      },
      {
        id: "conic",
        name: "Conics quick ID",
        phrase: "Circle x²+y², parabola one square, ellipse both positive, hyperbola opposite signs.",
        steps: [
          "Put the equation in standard-ish form (complete the square if needed).",
          "Both x² and y², same sign, equal coeffs → circle; unequal → ellipse.",
          "Opposite signs → hyperbola. Only one squared variable → parabola."
        ],
        exception: "xy terms rotate axes. Degenerate cases (like x² − y² = 0) factor into lines. Radius squared must be positive for a real circle.",
        pic: () => parabolaPic(),
        gen() {
          const kind = pick([
            ["x² + y² = 25", "circle", ["ellipse", "parabola", "hyperbola"]],
            ["y² = 12x", "parabola", ["circle", "ellipse", "hyperbola"]],
            ["x²/9 + y²/4 = 1", "ellipse", ["circle", "hyperbola", "parabola"]],
            ["x²/9 − y²/4 = 1", "hyperbola", ["ellipse", "parabola", "circle"]],
            ["x² = 8y", "parabola", ["circle", "ellipse", "hyperbola"]],
            ["x² + 4y² = 16", "ellipse", ["circle", "hyperbola", "parabola"]]
          ]);
          return Q(`Identify the conic: ${kind[0]}.`, kind[1], kind[2],
            `Look at squares and signs: ${kind[0]} is a ${kind[1]}.`, P.roof(kind[0], kind[1]));
        },
        worked: [
          {
            problem: "Name the curve y² = 16x and find its focus.",
            pic: parabolaPic(),
            steps: [
              ["Form", "y² = 4ax with 4a = 16 → a = 4."],
              ["Focus", "Opens right; focus (a,0) = (4,0)."]
            ],
            answer: "Parabola; focus (4, 0)"
          },
          {
            problem: "Is x²/4 + y²/4 = 1 a circle or an ellipse?",
            steps: [
              ["Equal denominators", "Both coeffs of x² and y² match after clearing."],
              ["Radius", "x² + y² = 4 → circle radius 2."]
            ],
            answer: "Circle (radius 2)"
          }
        ]
      },
      {
        id: "invtrig",
        name: "Inverse trig values",
        phrase: "arcsin range [−90°,90°]; arccos [0°,180°]; arctan (−90°,90°).",
        steps: [
          "Read the inverse as “the angle in the principal range whose trig is …”.",
          "Use special angles: 0, 30, 45, 60, 90.",
          "Watch the range: arccos(−1/2) is 120°, not −60°."
        ],
        exception: "Calculator in radians vs degrees. arcsin and arccos are not defined outside [−1,1]. arctan(−1) is −45°, not 135°.",
        pic: () => P.table(["fn", "range"], [["arcsin", "[−π/2, π/2]"], ["arccos", "[0, π]"], ["arctan", "(−π/2, π/2)"]], { note: "Principal values" }),
        gen() {
          const items = [
            ["arcsin(1/2)", "30°", ["60°", "150°", "−30°"]],
            ["arcsin(√3/2)", "60°", ["30°", "120°", "−60°"]],
            ["arccos(1/2)", "60°", ["30°", "120°", "−60°"]],
            ["arccos(−1/2)", "120°", ["60°", "−60°", "240°"]],
            ["arctan(1)", "45°", ["135°", "−45°", "90°"]],
            ["arctan(√3)", "60°", ["30°", "120°", "−60°"]],
            ["arcsin(−1/2)", "−30°", ["30°", "210°", "150°"]],
            ["arccos(0)", "90°", ["0°", "180°", "−90°"]]
          ];
          const [p, a, w] = pick(items);
          return Q(`Principal value of ${p}`, a, w, `${p} in its principal range is ${a}.`, P.roof(p, a));
        },
        worked: [
          {
            problem: "Find arccos(−1/2).",
            steps: [
              ["Cosine −1/2", "Reference 60°; cosine negative in QII."],
              ["arccos range", "[0°,180°] → 180° − 60° = 120°."]
            ],
            answer: "120°"
          },
          {
            problem: "Find arcsin(−√2/2).",
            steps: [
              ["Magnitude", "sin 45° = √2/2."],
              ["arcsin range", "Negative → −45°."]
            ],
            answer: "−45°"
          }
        ]
      },
      {
        id: "limits",
        name: "Limits (0/0)",
        phrase: "Plug in first. If 0/0, factor, cancel, then plug in again.",
        steps: [
          "Substitute the approach value.",
          "If you get a number, that is the limit (for a rational with cancelable hole).",
          "If 0/0, factor numerator and denominator, cancel the common (x−a), then substitute."
        ],
        exception: "Canceling changes the function at one point but not the limit. ∞/∞ needs a different tool (divide by highest power). Left and right limits can disagree.",
        pic: () => limitPic(),
        gen() {
          const a = R(2, 6);
          const form = R(1, 3);
          if (form === 1) {
            const ans = 2 * a;
            return Q(`lim x→${a} (x² − ${a * a})/(x − ${a})`, ans, near(ans, [a, 0, a * a]),
              `Factor: (x−${a})(x+${a})/(x−${a}) → x+${a} → ${ans}.`, P.roof(`(x²−${a * a})/(x−${a})`, `x+${a}`));
          }
          if (form === 2) {
            const ans = 3 * a * a;
            return Q(`lim x→${a} (x³ − ${a ** 3})/(x − ${a})`, ans, near(ans, [a * a, 2 * a * a, a ** 3]),
              `x³−a³ = (x−a)(x²+ax+a²) → ${a}²+${a}²+${a}² = ${ans}.`, limitPic());
          }
          const aa = pick([4, 9]);
          const root = aa === 4 ? 2 : 3;
          const label = sfr(1, 2 * root);
          return Q(`lim x→${aa} (√x − ${root})/(x − ${aa})`, label,
            [sfr(1, root), sfr(1, aa), String(2 * root), "0"],
            `Rationalize or use 1/(2√x): at x=${aa} get 1/(2·${root}) = ${label}.`, limitPic());
        },
        worked: [
          {
            problem: "Evaluate lim x→3 (x² − 9)/(x − 3).",
            steps: [
              ["Plug in", "0/0 indeterminate."],
              ["Factor", "(x−3)(x+3)/(x−3) = x+3 for x≠3."],
              ["Limit", "3+3 = 6."]
            ],
            answer: "6"
          },
          {
            problem: "Evaluate lim x→2 (x³ − 8)/(x − 2).",
            steps: [
              ["Difference of cubes", "x³−8 = (x−2)(x²+2x+4)."],
              ["Cancel", "x²+2x+4 → at 2: 4+4+4 = 12."]
            ],
            answer: "12"
          }
        ]
      },
      {
        id: "diffapp",
        name: "Max / min with y′",
        phrase: "Stationary: y′ = 0. Concavity: y′′ > 0 min, y′′ < 0 max.",
        steps: [
          "Differentiate y to get y′.",
          "Solve y′ = 0 for candidate x-values.",
          "Use y′′ (or first-derivative sign chart) to classify max/min, then find y."
        ],
        exception: "Endpoints of a closed interval can be extrema even if y′ ≠ 0. y′ = 0 is necessary on an open set, not always sufficient (flat inflection).",
        pic: () => P.roof("y′ = 0", "test y′′", "max if y′′ < 0; min if y′′ > 0"),
        gen() {
          const a = R(2, 5);
          const b = R(2, 6);
          // y = x² − 2ax + b → min at x = a, y = b − a²
          const ymin = b - a * a;
          const form = R(1, 2);
          if (form === 1) {
            return Q(`y = x² − ${2 * a}x + ${b}. x-coordinate of the stationary point?`, a, near(a, [2 * a, -a, b]),
              `y′ = 2x − ${2 * a} = 0 → x = ${a}.`, P.roof("y′ = 0", `x = ${a}`));
          }
          return Q(`y = x² − ${2 * a}x + ${b}. Minimum value?`, ymin, near(ymin, [b, a, -ymin]),
            `At x = ${a}, y = ${a}² − ${2 * a}·${a} + ${b} = ${ymin}. y′′ = 2 > 0 → min.`, P.roof("min y", String(ymin)));
        },
        worked: [
          {
            problem: "Find the minimum of y = x² − 6x + 11.",
            steps: [
              ["Derivative", "y′ = 2x − 6 = 0 → x = 3."],
              ["Second derivative", "y′′ = 2 > 0 → minimum."],
              ["Value", "y(3) = 9 − 18 + 11 = 2."]
            ],
            answer: "Minimum 2 at x = 3"
          },
          {
            problem: "A rectangle has perimeter 20. Maximize area.",
            steps: [
              ["Relate", "2(l+w)=20 → l+w=10 → A = l(10−l)."],
              ["Derivative", "A′ = 10 − 2l = 0 → l = 5, w = 5."],
              ["Check", "Square gives max area 25."]
            ],
            answer: "25 (a square 5×5)"
          }
        ]
      },
      {
        id: "integ",
        name: "Definite integrals",
        phrase: "Antiderivative F, then F(top) − F(bottom). No +C.",
        steps: [
          "Find an antiderivative F of the integrand.",
          "Evaluate F(b) − F(a) for ∫_a^b.",
          "Simplify the number (fraction OK)."
        ],
        exception: "Do not add C on a definite integral. If you substitute, change the limits. Absolute value for ∫1/x when crossing 0 is subtle — avoid that case here.",
        pic: () => P.roof("∫_a^b f", "F(b) − F(a)", "top minus bottom"),
        gen() {
          const n = R(1, 4);
          const a = R(1, 3);
          const b = a + R(1, 3);
          const F = (x) => (x ** (n + 1)) / (n + 1);
          const ansN = b ** (n + 1) - a ** (n + 1);
          const ansD = n + 1;
          const g = gcd(ansN, ansD);
          const ans = fr(ansN / g, ansD / g);
          return Q(`∫ from ${a} to ${b} of ${pow(n)} dx`, ans,
            [fr(ansN, ansD + 1), fr(b ** (n + 1), n + 1), String(b ** n - a ** n), fr(ansN + ansD, ansD)],
            `F = ${pow(n + 1)}/${n + 1}. F(${b})−F(${a}) = ${ans}.`, P.roof(`∫_${a}^{${b}} ${pow(n)}`, ans));
        },
        worked: [
          {
            problem: "Evaluate ∫₀² (3x² + 1) dx.",
            steps: [
              ["Antiderivative", "x³ + x."],
              ["Top", "8 + 2 = 10."],
              ["Minus bottom", "0 → 10."]
            ],
            answer: "10"
          },
          {
            problem: "Evaluate ∫₁³ x dx.",
            steps: [
              ["Antiderivative", "x²/2."],
              ["Top minus bottom", "9/2 − 1/2 = 4."]
            ],
            answer: "4"
          }
        ]
      },
      {
        id: "de1",
        name: "Separable DEs",
        phrase: "dy/dx = f(x)g(y) → pile y’s with dy, x’s with dx, then integrate.",
        steps: [
          "Rewrite so g(y) dy and f(x) dx sit on opposite sides (or  dy/g = f dx).",
          "Integrate both sides.",
          "Solve for y if asked; keep +C."
        ],
        exception: "Dividing by g(y) loses solutions where g(y)=0 — check constant solutions. Not every DE is separable.",
        pic: () => P.roof("dy/dx = f(x)g(y)", "∫ dy/g = ∫ f dx", "separate, then integrate"),
        gen() {
          const k = R(2, 5);
          const form = R(1, 3);
          if (form === 1) {
            const yAns = k % 2 === 0 ? `${k / 2}${pow(2)}` : `${k}${pow(2)}/2`;
            return Q(`Solve dy/dx = ${k}x. Particular solution through (0,0) is y =`, yAns,
              [`${k}${pow(2)}`, `${k}x`, `${k}${pow(2)}/2`, "0"].filter((x) => x !== yAns),
              `∫ dy = ∫ ${k}x dx → y = ${k}x²/2 + C. Through origin C=0.`, P.roof("dy = kx dx", `y = ${k}x²/2`));
          }
          if (form === 2) {
            return Q(`If dy/dx = y and y(0) = ${k}, then y =`, `${k}eˣ`, [`eˣ`, `${k}x`, `e^{${k}x}`, `${k}`],
              `dy/y = dx → ln|y| = x + C → y = Aeˣ. y(0)=${k} → A=${k}.`, P.roof("dy/y = dx", `y = ${k}eˣ`));
          }
          return Q(`Separating dy/dx = x/y gives`, "y dy = x dx", ["y dx = x dy", "dy/x = y dx", "x dy = y dx"],
            "Cross: y dy = x dx.", P.roof("dy/dx = x/y", "y dy = x dx"));
        },
        worked: [
          {
            problem: "Solve dy/dx = 2x with y(0) = 3.",
            steps: [
              ["Integrate", "y = x² + C."],
              ["Initial condition", "3 = 0 + C → C = 3."],
              ["Solution", "y = x² + 3."]
            ],
            answer: "y = x² + 3"
          },
          {
            problem: "Solve dy/dx = y/x for x > 0 (general solution).",
            steps: [
              ["Separate", "dy/y = dx/x."],
              ["Integrate", "ln|y| = ln|x| + C."],
              ["Exponentiate", "y = Ax (A = ±eᶜ)."]
            ],
            answer: "y = Ax"
          }
        ]
      },
      {
        id: "prob",
        name: "Probability basics",
        phrase: "P(A∪B) = P(A)+P(B)−P(A∩B). Independent: multiply.",
        steps: [
          "List the sample space size when outcomes are equally likely.",
          "For “or”, add and subtract the overlap.",
          "For independent “and”, multiply the probabilities."
        ],
        exception: "Mutually exclusive means P(A∩B)=0 — then just add. Independent is not the same as mutually exclusive. Probabilities stay in [0,1].",
        pic: () => P.formula("P(A)+P(B)−P(A∩B)", "P(A∪B)", "include–exclude"),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const n = pick([6, 8, 10, 12]);
            const fav = R(2, n - 1);
            return Q(`A fair ${n}-sided die. P(rolling a number ≤ ${fav})?`, sfr(fav, n),
              [sfr(fav - 1, n), sfr(fav + 1, n), sfr(1, fav), sfr(fav, n - 1)].filter((x, i, a) => a.indexOf(x) === i && x !== sfr(fav, n)),
              `${fav} favorable over ${n}: ${sfr(fav, n)}.`, P.roof(`≤${fav}`, sfr(fav, n)));
          }
          if (form === 2) {
            const a = R(3, 6), b = R(3, 6);
            const both = R(1, Math.min(a, b) - 1);
            const ans = sfr(a + b - both, 10);
            return Q(`P(A)=${sfr(a, 10)}, P(B)=${sfr(b, 10)}, P(A∩B)=${sfr(both, 10)}. Find P(A∪B).`, ans,
              [sfr(a + b, 10), sfr(a + b + both, 10), sfr(Math.abs(a - b), 10), sfr(both, 10)].filter((x) => x !== ans),
              `P(A∪B)=${sfr(a, 10)}+${sfr(b, 10)}−${sfr(both, 10)}=${ans}.`,
              P.formula(`${sfr(a, 10)}+${sfr(b, 10)}−${sfr(both, 10)}`, "P(A∪B)"));
          }
          return Q("A fair coin. P(heads then heads) in two flips?", "1/4", ["1/2", "1/3", "1", "1/8"],
            "Independent: (1/2)×(1/2)=1/4.", P.roof("(1/2)(1/2)", "1/4"));
        },
        worked: [
          {
            problem: "P(A)=0.4, P(B)=0.5, P(A∩B)=0.2. Find P(A∪B).",
            steps: [
              ["Inclusion–exclusion", "0.4 + 0.5 − 0.2."],
              ["Compute", "0.7."]
            ],
            answer: "0.7"
          },
          {
            problem: "Two fair dice. P(sum = 7)?",
            steps: [
              ["Outcomes", "6×6 = 36 equally likely."],
              ["Favorable", "(1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6."],
              ["Probability", "6/36 = 1/6."]
            ],
            answer: "1/6"
          }
        ]
      },
      {
        id: "binomprob",
        name: "Binomial probability",
        phrase: "C(n,k) pᵏ (1−p)ⁿ⁻ᵏ: choose who succeeds, then multiply.",
        steps: [
          "Confirm n independent trials, success probability p each time.",
          "Choose which k trials succeed: C(n,k).",
          "Multiply by pᵏ (1−p)ⁿ⁻ᵏ."
        ],
        exception: "Not for dependent trials. “At least one” is often 1 − P(none). p is success probability, not a count.",
        pic: () => P.roof("P(X=k)", "C(n,k) pᵏ qⁿ⁻ᵏ", "q = 1−p"),
        gen() {
          const n = R(3, 6);
          const k = R(1, n - 1);
          const pNum = pick([1, 1, 1, 2]);
          const pDen = pNum === 2 ? 5 : pick([2, 3, 4]);
          const qNum = pDen - pNum;
          const coeff = Cnr(n, k);
          const ansNum = coeff * (pNum ** k) * (qNum ** (n - k));
          const ansDen = pDen ** n;
          const g = gcd(ansNum, ansDen);
          const ans = fr(ansNum / g, ansDen / g);
          return Q(`n=${n}, p=${sfr(pNum, pDen)}. P(exactly ${k} successes)?`, ans,
            [fr(ansNum, ansDen * 2), fr(coeff, ansDen), fr(ansNum + 1, ansDen), sfr(pNum, pDen)].map((x) => x.replace("-", "−")).filter((x, i, a) => a.indexOf(x) === i && x !== ans),
            `C(${n},${k})·(${sfr(pNum, pDen)})^${k}·(${sfr(qNum, pDen)})^${n - k} = ${ans}.`,
            P.roof(`C(${n},${k}) p^${k} q^${n - k}`, ans));
        },
        worked: [
          {
            problem: "A fair coin is flipped 4 times. P(exactly 2 heads)?",
            steps: [
              ["Binomial", "C(4,2) (1/2)² (1/2)²."],
              ["Compute", "6 × 1/16 = 3/8."]
            ],
            answer: "3/8"
          },
          {
            problem: "P(success)=1/3, n=3. P(exactly one success)?",
            steps: [
              ["Formula", "C(3,1)(1/3)(2/3)²."],
              ["Compute", "3 · (1/3) · (4/9) = 4/9."]
            ],
            answer: "4/9"
          }
        ]
      },
      {
        id: "vectors",
        name: "Vector length & dot",
        phrase: "|a| = √(a₁²+a₂²). a·b = a₁b₁+a₂b₂ = |a||b|cosθ.",
        steps: [
          "Magnitude: square, add, root.",
          "Dot: multiply matching components and add.",
          "Perpendicular ⇔ dot product 0."
        ],
        exception: "Dot product is a scalar, not a vector. |a+b| ≠ |a|+|b| in general. Unit vector is a/|a|, not 1/a componentwise without care.",
        pic: () => vecPic(3, 1, 1, 2),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const pair = pick([[3, 4], [5, 12], [6, 8], [8, 15], [9, 12]]);
            const x = pair[0], y = pair[1];
            const exact = String(Math.round(Math.sqrt(x * x + y * y)));
            return Q(`|⟨${x}, ${y}⟩|`, exact, [String(x + y), String(x * x + y * y), String(Math.abs(x - y)), String(x * y)],
              `√(${x}²+${y}²) = ${exact}.`, vecPic(x / 3, y / 3, 0, 0));
          }
          if (form === 2) {
            const a1 = R(1, 5), a2 = R(1, 5), b1 = R(1, 5), b2 = R(-3, 3);
            const ans = a1 * b1 + a2 * b2;
            return Q(`⟨${a1},${a2}⟩ · ⟨${b1},${b2}⟩`, ans, near(ans, [a1 * b1, a1 * b2 + a2 * b1, a1 + a2 + b1 + b2]),
              `${a1}·${b1} + ${a2}·${b2} = ${ans}.`, vecPic(a1, a2, b1, b2));
          }
          const a1 = R(1, 4), a2 = R(1, 4);
          const b1 = a2, b2 = -a1;
          return Q(`⟨${a1},${a2}⟩ · ⟨${b1},${b2}⟩ equals`, 0, near(0, [a1 * b1, 1, a1 + a2]),
            "Perpendicular pair: dot product 0.", vecPic(a1, a2, b1, b2));
        },
        worked: [
          {
            problem: "Find |⟨3,4⟩| and a unit vector in that direction.",
            steps: [
              ["Magnitude", "√(9+16)=5."],
              ["Unit", "⟨3/5, 4/5⟩."]
            ],
            answer: "5; ⟨3/5, 4/5⟩"
          },
          {
            problem: "Are ⟨2,−1⟩ and ⟨1,2⟩ perpendicular?",
            steps: [
              ["Dot", "2·1 + (−1)·2 = 0."],
              ["Conclude", "Yes — perpendicular."]
            ],
            answer: "Yes"
          }
        ]
      },
      {
        id: "projectile",
        name: "Projectile range",
        phrase: "Range = (u² sin 2θ)/g. Max range at 45°.",
        steps: [
          "Resolve: uₓ = u cos θ, uᵧ = u sin θ.",
          "Time of flight 2 u sinθ / g; range = uₓ × time = u² sin2θ / g.",
          "sin2θ max at 2θ=90° → θ=45°."
        ],
        exception: "Formula assumes flat ground and no air resistance. Complementary angles θ and 90°−θ share the same range. Height uses a different formula.",
        pic: () => projPic(),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            return Q("For fixed u on flat ground, maximum range occurs at", "45°", ["30°", "60°", "90°", "0°"],
              "sin2θ ≤ 1, equality at 2θ=90° → θ=45°.", projPic());
          }
          if (form === 2) {
            const u = pick([10, 14, 20]);
            const g = 10;
            const ans = (u * u) / g;
            return Q(`u=${u} m/s, g=${g}, θ=45°. Range?`, ans, near(ans, [u, u * u, ans / 2]),
              `R = u²/g at 45° → ${u}²/${g} = ${ans}.`, projPic());
          }
          return Q("Range formula (flat ground) is", "(u² sin 2θ)/g", ["(u² sin θ)/g", "(2u sin θ)/g", "(u cos θ)/g"],
            "R = (u² sin 2θ)/g.", projPic());
        },
        worked: [
          {
            problem: "u = 20 m/s, g = 10 m/s², θ = 45°. Find the range.",
            pic: projPic(),
            steps: [
              ["At 45°, sin90°=1", "R = u²/g."],
              ["Compute", "400/10 = 40 m."]
            ],
            answer: "40 m"
          },
          {
            problem: "Why do 30° and 60° give the same range?",
            steps: [
              ["Double angles", "2·30°=60°, 2·60°=120°."],
              ["Same sine", "sin60°=sin120° → same R."]
            ],
            answer: "sin 2θ matches for complementary angles"
          }
        ]
      },
      {
        id: "statics",
        name: "Statics: resolve forces",
        phrase: "ΣFₓ = 0 and ΣFᵧ = 0 for equilibrium. Resolve into components.",
        steps: [
          "Draw a free-body diagram.",
          "Resolve every force into x and y: F cosθ, F sinθ.",
          "Set sum of components in each direction to zero; solve."
        ],
        exception: "Moments: Στ = 0 about a point if rotation can occur. Signs for direction must stay consistent. Weight acts at the center of mass.",
        pic: () => {
          const O = [160, 160];
          let body = line(40, 160, 280, 160, { w: 2 }) + line(160, 40, 160, 200, { w: 2 });
          body += line(O[0], O[1], O[0] + 90, O[1], { stroke: ACC, w: 4 }) + T(250, 150, "Fₓ", { size: 14 });
          body += line(O[0], O[1], O[0], O[1] - 70, { stroke: ACC, w: 4 }) + T(170, 80, "Fᵧ", { size: 14 });
          body += T(160, 220, "ΣFₓ=0, ΣFᵧ=0", { size: 13 });
          return box(320, 236, body, "Resolve and balance");
        },
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const f = R(5, 12) * 2;
            const ans = f / 2;
            return Q(`A force ${f} N at 60° to the x-axis. x-component?`, ans, near(ans, [f, f * Math.sqrt(3) / 2, f / 3].map((x) => Math.round(x * 100) / 100)),
              `F cos60° = ${f}·1/2 = ${ans}.`, P.roof(`${f} cos 60°`, String(ans)));
          }
          if (form === 2) {
            const w = R(10, 30);
            return Q(`A weight of ${w} N hangs at rest on a vertical string. Tension equals`, w,
              near(w, [0, 2 * w, Math.floor(w / 2)]),
              "Vertical equilibrium: T = weight.", P.roof("ΣFᵧ = 0", "T = W"));
          }
          return Q("For a particle in equilibrium under coplanar forces,", "ΣFₓ = 0 and ΣFᵧ = 0", ["ΣFₓ = ΣFᵧ", "only ΣFₓ = 0", "net force is maximum"],
            "Both component sums vanish.", P.roof("equilibrium", "ΣF = 0"));
        },
        worked: [
          {
            problem: "A 20 N force acts at 30° to the horizontal. Find components.",
            steps: [
              ["x-component", "20 cos30° = 20·√3/2 = 10√3 N."],
              ["y-component", "20 sin30° = 20·1/2 = 10 N."]
            ],
            answer: "10√3 N horizontal, 10 N vertical"
          },
          {
            problem: "Two horizontal forces 5 N right and 3 N left act on a particle at rest. What third force is needed?",
            steps: [
              ["Net so far", "5 − 3 = 2 N right."],
              ["Balance", "Need 2 N left."]
            ],
            answer: "2 N to the left"
          }
        ]
      },
      {
        id: "newtonraphson",
        name: "Newton–Raphson idea",
        phrase: "Next guess: x₁ = x₀ − f(x₀)/f′(x₀). Tangent hits the axis.",
        steps: [
          "Start with a rough root guess x₀.",
          "Compute f(x₀) and f′(x₀).",
          "Update x₁ = x₀ − f(x₀)/f′(x₀); repeat."
        ],
        exception: "Fails if f′(x₀)=0 (horizontal tangent). Bad guesses can diverge. This finds a root of f(x)=0, not a maximum.",
        pic: () => nrPic(),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            return Q("Newton–Raphson iteration formula is", "x₁ = x₀ − f(x₀)/f′(x₀)", ["x₁ = x₀ + f(x₀)/f′(x₀)", "x₁ = f(x₀)/f′(x₀)", "x₁ = x₀ − f′(x₀)/f(x₀)"],
              "Subtract f/f′ from the current guess.", nrPic());
          }
          if (form === 2) {
            // f(x)=x²−4, x0=3 → x1 = 3 − 5/6 = 13/6
            return Q("f(x)=x²−4, x₀=3. One Newton step gives x₁ =", "13/6", ["5/6", "3", "2", "11/6"],
              "f(3)=5, f′(x)=2x, f′(3)=6 → 3−5/6=13/6.", P.roof("3 − 5/6", "13/6"));
          }
          return Q("Newton–Raphson fails at a guess where", "f′(x₀) = 0", ["f(x₀) = 0", "f(x₀) > 0", "x₀ = 1"],
            "Division by zero in f/f′.", nrPic());
        },
        worked: [
          {
            problem: "Use one Newton step on f(x)=x²−2 starting at x₀=1.",
            steps: [
              ["f and f′", "f(1)=−1, f′(x)=2x, f′(1)=2."],
              ["Update", "x₁ = 1 − (−1)/2 = 1.5."]
            ],
            answer: "1.5"
          },
          {
            problem: "Why avoid x₀=0 for f(x)=x²−2?",
            steps: [
              ["Derivative", "f′(0)=0."],
              ["Formula breaks", "Cannot divide by f′(x₀)."]
            ],
            answer: "f′(0)=0 — step not defined"
          }
        ]
      },
      {
        id: "partial",
        name: "Partial fractions setup",
        phrase: "Factor the bottom; linear factors get A/(x−r), repeats get A/(x−r)+B/(x−r)².",
        steps: [
          "Factor the denominator completely.",
          "Write a template: each distinct linear factor gets a constant over it.",
          "Clear denominators and solve for the constants by substituting roots or equating coeffs."
        ],
        exception: "If the top degree ≥ bottom degree, divide first (polynomial + proper fraction). Irreducible quadratics need (Bx+C)/(quadratic).",
        pic: () => P.roof("1/[(x−1)(x−2)]", "A/(x−1) + B/(x−2)", "cover-up / equate"),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            return Q("Decompose 1/[(x−1)(x+1)] as", "A/(x−1) + B/(x+1)", ["A/(x−1)²", "A(x−1)+B(x+1)", "A/x + B"],
              "Two distinct linear factors → two simple terms.", P.roof("proper fraction", "A/(x−1)+B/(x+1)"));
          }
          if (form === 2) {
            // 1/[(x-1)(x-2)] = -1/(x-1) + 1/(x-2) → A=-1,B=1; ask A
            return Q("1/[(x−1)(x−2)] = A/(x−1) + B/(x−2). Find A.", "−1", ["1", "2", "0", "−2"],
              "Cover x=1: 1/(1−2)=A → A=−1.", P.roof("x=1 cover-up", "A=−1"));
          }
          return Q("Before partial fractions, if deg(numerator) ≥ deg(denominator),", "divide polynomials first", ["factor the top only", "differentiate", "use L'Hôpital"],
            "Make the fraction proper first.", P.roof("improper", "divide, then decompose"));
        },
        worked: [
          {
            problem: "Decompose 1/[(x−1)(x−2)].",
            steps: [
              ["Template", "A/(x−1) + B/(x−2)."],
              ["Cover x=1", "1/(1−2)=A → A=−1."],
              ["Cover x=2", "1/(2−1)=B → B=1."]
            ],
            answer: "−1/(x−1) + 1/(x−2)"
          },
          {
            problem: "Set up (without solving) (2x+3)/[(x−1)²(x+2)].",
            steps: [
              ["Repeated factor", "A/(x−1) + B/(x−1)²."],
              ["Other linear", "+ C/(x+2)."]
            ],
            answer: "A/(x−1) + B/(x−1)² + C/(x+2)"
          }
        ]
      },
      {
        id: "chainhard",
        name: "Chain rule in exams",
        phrase: "Outside derivative, times inside derivative: f′(g(x)) · g′(x).",
        steps: [
          "Name the outside function and the inside.",
          "Differentiate the outside, leave the inside alone.",
          "Multiply by the inside’s derivative."
        ],
        exception: "Forgetting to multiply by the inside derivative is the classic error. Products of two composite functions need product + chain.",
        pic: () => P.roof("d/dx f(g(x))", "f′(g) · g′", "outside then inside"),
        gen() {
          const n = R(2, 5);
          const k = R(2, 6);
          const form = R(1, 3);
          if (form === 1) {
            return Q(`d/dx (x² + 1)^${n}`, `${n}(x² + 1)^${n - 1} · 2x`,
              [`${n}(x² + 1)^${n - 1}`, `(x² + 1)^${n - 1}`, `${n}(x² + 1)^${n} · 2x`, `2x(x² + 1)^${n}`],
              `Outside power ${n}, inside derivative 2x.`, P.roof(`( )^${n}`, `${n}( )^${n - 1}·2x`));
          }
          if (form === 2) {
            return Q(`d/dx sin(${k}x)`, `${k} cos(${k}x)`, [`cos(${k}x)`, `${k} sin(${k}x)`, `−${k} cos(${k}x)`, `cos x`],
              `Outside cos, inside ${k}x → multiply by ${k}.`, P.roof(`sin(${k}x)`, `${k} cos(${k}x)`));
          }
          return Q(`d/dx e^{${k}x}`, `${k}e^{${k}x}`, [`e^{${k}x}`, `${k}e^x`, `e^{${k}}`, `${k}x e^{${k}x}`],
            "Derivative of e^u is e^u · u′.", P.roof(`e^{${k}x}`, `${k}e^{${k}x}`));
        },
        worked: [
          {
            problem: "Differentiate y = (3x² + 1)⁵.",
            steps: [
              ["Outside", "5(3x²+1)⁴."],
              ["Inside", "· 6x."],
              ["Product", "30x (3x²+1)⁴."]
            ],
            answer: "30x(3x²+1)⁴"
          },
          {
            problem: "Differentiate y = cos(5x).",
            steps: [
              ["Outside", "−sin(5x)."],
              ["Inside", "× 5 → −5 sin(5x)."]
            ],
            answer: "−5 sin(5x)"
          }
        ]
      },
      {
        id: "areaunder",
        name: "Area under a curve",
        phrase: "Area = ∫_a^b y dx when y ≥ 0. Below the axis, take absolute value.",
        steps: [
          "Sketch or check the sign of y on [a,b].",
          "Integrate to get a signed area.",
          "If the curve crosses the axis, split the integral at roots."
        ],
        exception: "A single integral from a to b gives net signed area — cancellations happen. For total geometric area, split where y=0.",
        pic: () => P.roof("Area", "∫_a^b y dx", "split if y changes sign"),
        gen() {
          const a = 0;
          const b = R(2, 5);
          const ans = fr(b ** 3, 3);
          return Q(`Area under y = x² from x = 0 to x = ${b}?`, ans, [fr(b ** 2, 2), String(b ** 3), fr(b ** 3, 2), fr(b ** 3, 6)],
            `∫₀^${b} x² dx = [x³/3] = ${ans}.`, P.roof(`∫_0^{${b}} x²`, ans));
        },
        worked: [
          {
            problem: "Find the area under y = x from 1 to 4.",
            steps: [
              ["Integral", "∫₁⁴ x dx = [x²/2]₁⁴."],
              ["Evaluate", "16/2 − 1/2 = 15/2."]
            ],
            answer: "15/2"
          },
          {
            problem: "Why split ∫₋₂² x dx if you want geometric area?",
            steps: [
              ["Signed area", "∫₋₂² x dx = 0 by odd symmetry."],
              ["Geometric", "Two triangles: 2 × ∫₀² x dx = 4."]
            ],
            answer: "Split at 0; total area 4"
          }
        ]
      },
      {
        id: "seqseries",
        name: "AP / GP exam moves",
        phrase: "AP: a+(n−1)d. GP: arⁿ⁻¹. Sum AP n/2(2a+(n−1)d); GP a(rⁿ−1)/(r−1).",
        steps: [
          "Identify arithmetic (common difference) or geometric (common ratio).",
          "Write the nth term formula.",
          "Use the matching sum formula; for |r|<1 infinite GP, S=a/(1−r)."
        ],
        exception: "GP sum formula changes for r=1 (then S=na). Infinite sum needs |r|<1. Do not mix AP and GP formulas.",
        pic: () => P.table(["type", "nth term", "sum"], [["AP", "a+(n−1)d", "n/2 · (first+last)"], ["GP", "arⁿ⁻¹", "a(rⁿ−1)/(r−1)"]], { note: "Exam staples" }),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const a = R(2, 8), d = R(2, 5), n = R(5, 10);
            const ans = a + (n - 1) * d;
            return Q(`AP: a=${a}, d=${d}. Find term ${n}.`, ans, near(ans, [a + n * d, a + (n + 1) * d, n * d]),
              `a+(n−1)d = ${a}+${n - 1}·${d} = ${ans}.`, P.roof(`T_${n}`, String(ans)));
          }
          if (form === 2) {
            const a = R(2, 5), r = R(2, 3), n = R(3, 5);
            const ans = a * (r ** (n - 1));
            return Q(`GP: a=${a}, r=${r}. Find term ${n}.`, ans, near(ans, [a * r * n, a * (r ** n), a + (n - 1) * r]),
              `arⁿ⁻¹ = ${a}·${r}^${n - 1} = ${ans}.`, P.roof(`T_${n}`, String(ans)));
          }
          const a = R(2, 6);
          return Q(`Infinite GP a=${a}, r=1/2. Sum?`, 2 * a, near(2 * a, [a, a / 2, a / (1 / 2)]),
            `S=a/(1−r)=${a}/(1/2)=${2 * a}.`, P.roof("S=a/(1−r)", String(2 * a)));
        },
        worked: [
          {
            problem: "Find the 10th term of 3, 7, 11, …",
            steps: [
              ["Identify", "AP with a=3, d=4."],
              ["Formula", "T₁₀=3+9·4=39."]
            ],
            answer: "39"
          },
          {
            problem: "Sum the infinite GP 5 + 5/2 + 5/4 + …",
            steps: [
              ["a=5, r=1/2", "|r|<1 so S=a/(1−r)."],
              ["Compute", "5/(1/2)=10."]
            ],
            answer: "10"
          }
        ]
      },
      {
        id: "complex",
        name: "Complex numbers i",
        phrase: "i² = −1. Multiply like binomials; replace i² with −1.",
        steps: [
          "Write z = a + bi.",
          "Add/subtract components; multiply with FOIL then i²→−1.",
          "Modulus |z|=√(a²+b²); conjugate a−bi."
        ],
        exception: "i³ = −i, i⁴ = 1 — reduce powers mod 4. Division: multiply by the conjugate of the bottom. √(−1) is i, not a real.",
        pic: () => P.roof("i²", "−1", "powers of i cycle every 4"),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const p = R(1, 8);
            const cycle = ["1", "i", "−1", "−i"][p % 4];
            return Q(`Simplify i^${p}.`, cycle, ["1", "i", "−1", "−i"].filter((x) => x !== cycle),
              `i^${p}: reduce ${p} mod 4 → ${cycle}.`, P.roof(`i^${p}`, cycle));
          }
          if (form === 2) {
            const a = R(1, 4), b = R(1, 4), c = R(1, 4), d = R(1, 4);
            const re = a * c - b * d;
            const im = a * d + b * c;
            const ans = `${re}+${im}i`.replace("+−", "−").replace("+-", "−");
            const wrongs = [
              `${a * c}+${b * d}i`,
              `${re}+${-im}i`.replace("+−", "−").replace("+-", "−"),
              `${a * c + b * d}+${im}i`,
              `${re - 1}+${im}i`
            ].filter((x) => x !== ans);
            return Q(`(${a}+${b}i)(${c}+${d}i)`, ans, wrongs,
              `FOIL then i²=−1 → ${ans}.`, P.roof("FOIL", ans));
          }
          const pair = pick([[3, 4], [5, 12], [8, 15], [6, 8]]);
          const a = pair[0], b = pair[1];
          const exact = String(Math.round(Math.sqrt(a * a + b * b)));
          return Q(`|${a}+${b}i|`, exact, [String(a + b), String(a * a + b * b), String(Math.abs(a - b)), `√${a * a + b * b}`].filter((x) => x !== exact),
            `√(${a}²+${b}²)=${exact}.`, P.roof(`|${a}+${b}i|`, exact));
        },
        worked: [
          {
            problem: "Simplify i^7.",
            steps: [
              ["Mod 4", "7 = 4·1 + 3."],
              ["Cycle", "i³ = −i."]
            ],
            answer: "−i"
          },
          {
            problem: "Compute (2+3i)(1−i).",
            steps: [
              ["FOIL", "2·1 + 2(−i) + 3i·1 + 3i(−i) = 2 − 2i + 3i − 3i²."],
              ["i²=−1", "2 + i + 3 = 5 + i."]
            ],
            answer: "5 + i"
          }
        ]
      }
    ]
  }, "g11");
})();
