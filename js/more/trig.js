/** Trigonometry and calculus pack: the angle table, identities, sine and cosine rules, worked problems. */
(function () {
  const { P, R, pick, gcd, lcm, neg, deg, raw, fr, pow, Q, TRIPLES, add, course, patch } = window.MK;
  const K = P.kit;
  const ACC = "var(--accent)";

  const ND = "not defined";
  const ANG = [0, 30, 45, 60, 90];
  const ROWS = ["sin", "cos", "tan", "cosec", "sec", "cot"];
  const TAB = {
    sin: ["0", "1/2", "1/√2", "√3/2", "1"],
    cos: ["1", "√3/2", "1/√2", "1/2", "0"],
    tan: ["0", "1/√3", "1", "√3", ND],
    cosec: [ND, "2", "√2", "2/√3", "1"],
    sec: ["1", "2/√3", "√2", "2", ND],
    cot: [ND, "√3", "1", "1/√3", "0"]
  };
  const FLIP = { sin: "cosec", cosec: "sin", cos: "sec", sec: "cos", tan: "cot", cot: "tan" };
  const CO = { sin: "cos", cos: "sin", tan: "cot", cot: "tan", sec: "cosec", cosec: "sec" };
  const SIN = { 30: "1/2", 45: "1/√2", 60: "√3/2", 90: "1", 120: "√3/2", 135: "1/√2", 150: "1/2" };
  const KS = { 30: 1, 45: 2, 60: 3, 90: 4, 120: 3, 135: 2, 150: 1 };
  const ROMAN = ["I", "II", "III", "IV"];
  const PRIM = TRIPLES.filter(([a, b, c]) => gcd(gcd(a, b), c) === 1);

  const SUPS = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", "-": "⁻" };
  const sup = (n) => (n === 1 ? "" : String(n).split("").map((c) => SUPS[c]).join(""));
  const sub = (n) => String(n).split("").map((c) => "₀₁₂₃₄₅₆₇₈₉"[c]).join("");
  const lg = (b) => (b === 10 ? "log" : `log${sub(b)}`);
  const dg = (x) => `${neg(x)}°`;
  const sfr = (n, d) => fr(n, d).replace("-", "−");
  const par = (s) => (String(s).includes("/") ? `(${s})` : s);
  const an = (n) => ([8, 11, 18].includes(n) || String(n).startsWith("8") ? "An" : "A");
  const signed = (s, pos) => (pos ? s : s === "0" ? "0" : `−${s}`);
  const refOf = (a) => {
    const x = ((a % 360) + 360) % 360;
    return x <= 90 ? x : x <= 180 ? 180 - x : x <= 270 ? x - 180 : 360 - x;
  };
  const quadOf = (a) => {
    const x = ((a % 360) + 360) % 360;
    return x < 90 ? 1 : x < 180 ? 2 : x < 270 ? 3 : 4;
  };
  const positive = (f, q) => q === 1 || (q === 2 && f === "sin") || (q === 3 && f === "tan") || (q === 4 && f === "cos");

  /** n = m² × s with s square-free. */
  function sq(n) {
    let m = 1, s = n;
    for (let k = 2; k * k <= s; k += 1) while (s % (k * k) === 0) { s /= k * k; m *= k; }
    return [m, s];
  }

  /** (p/q)√n as [text, value]. */
  function S(p, q, n) {
    const [m, s] = sq(n);
    let a = p * m, b = q;
    const g = gcd(a, b) || 1;
    a /= g; b /= g;
    if (b < 0) { a = -a; b = -b; }
    const v = (a / b) * Math.sqrt(s);
    if (s === 1) return [sfr(a, b), v];
    const top = `${a === 1 ? "" : a === -1 ? "−" : neg(a)}√${s}`;
    return [b === 1 ? top : `${top}/${b}`, v];
  }

  /** Q() for surd answers: wrongs are [text, value] pairs, and any with the answer’s value are dropped. */
  function QV(prompt, ans, wrongs, why, pic, unit = "") {
    const seen = [ans[1]];
    const keep = [];
    for (const w of wrongs) {
      if (!w || !Number.isFinite(w[1]) || seen.some((v) => Math.abs(v - w[1]) < 1e-9)) continue;
      seen.push(w[1]);
      keep.push(w[0] + unit);
    }
    return Q(prompt, ans[0] + unit, keep, why, pic);
  }

  const PQN = {
    sin: { 30: [1, 2, 1], 45: [1, 2, 2], 60: [1, 2, 3] },
    cos: { 30: [1, 2, 3], 45: [1, 2, 2], 60: [1, 2, 1] },
    tan: { 30: [1, 3, 3], 45: [1, 1, 1], 60: [1, 1, 3] },
    cot: { 30: [1, 1, 3], 45: [1, 1, 1], 60: [1, 3, 3] }
  };
  const mul = (d, f, a) => { const [p, q, n] = PQN[f][a]; return S(d * p, q, n); };

  const piFr = (n, d) => {
    const g = gcd(n, d);
    const a = n / g, b = d / g;
    const top = a === 1 ? "π" : `${a}π`;
    return b === 1 ? top : `${top}/${b}`;
  };

  /* ---------- pictures ---------- */

  const xy = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  const onCircle = (O, r, a) => [O[0] + r * Math.cos((a * Math.PI) / 180), O[1] - r * Math.sin((a * Math.PI) / 180)];

  const tableAt = (hide = [], note = "Recite 0, 1, 2, 3, 4. Divide by 4. Take the root. — means not defined.") =>
    P.table(["", ...ANG.map((a) => `${a}°`)],
      ROWS.map((f) => [f, ...TAB[f].map((v, i) => (hide.some(([g, j]) => g === f && j === i) ? "?" : v === ND ? "—" : v))]),
      { hot: hide.map(([g, j]) => [ROWS.indexOf(g), j + 1]), note });

  function towerPic(o) {
    const A = [50, 184], F = [262, 184], Tp = [262, 48];
    const mid = [196, 140];
    let body = K.line(14, 184, 306, 184, { w: 2 }) + K.poly([A, F, Tp]) + K.line(F[0], F[1], Tp[0], Tp[1], { stroke: ACC, w: 5 }) + K.right(F, A, Tp);
    if (o.down) body += K.line(Tp[0], Tp[1], 66, 48, { dash: "6 5", w: 2 }) + K.arc(Tp, [66, 48], A, 46, o.ang);
    else body += K.arc(A, F, Tp, 46, o.ang);
    if (o.d) body += K.side(A, F, mid, o.d);
    if (o.h) body += K.side(F, Tp, mid, o.h, { d: 26 });
    if (o.s) body += K.side(A, Tp, mid, o.s);
    return K.box(320, 214, body, o.down ? "Angle of depression" : "Angle of elevation");
  }

  function twoPic(o) {
    const F = [270, 184], Tp = [270, 44];
    const A = [28, 184], B = [o.nearX || 189, 184];
    const mid = [200, 120];
    let body = K.line(12, 184, 308, 184, { w: 2 }) + K.line(A[0], A[1], Tp[0], Tp[1]) + K.line(B[0], B[1], Tp[0], Tp[1]) +
      K.line(F[0], F[1], Tp[0], Tp[1], { stroke: ACC, w: 5 }) + K.right(F, A, Tp) + K.dot(A, "") + K.dot(B, "");
    if (o.down) {
      body += K.line(Tp[0], Tp[1], 40, 44, { dash: "6 5", w: 2 }) + K.arc(Tp, [40, 44], A, 70, o.far) + K.arc(Tp, [40, 44], B, 34, o.near);
    } else {
      body += K.arc(A, F, Tp, 40, o.far) + K.arc(B, F, Tp, 28, o.near);
    }
    if (o.gap) body += K.side(A, B, mid, o.gap);
    if (o.x) body += K.side(B, F, mid, o.x);
    if (o.h) body += K.side(F, Tp, mid, o.h, { d: 26 });
    return K.box(320, 214, body, "Two angles to the same top");
  }

  function buildingPic(o) {
    const Bt = [112, 150], Tf = [180, 218], Tt = [180, 32], M = [180, 150];
    let body = K.line(20, 218, 300, 218, { w: 2 }) + K.poly([[84, 218], [112, 218], Bt, [84, 150]]) +
      K.line(Tf[0], Tf[1], Tt[0], Tt[1], { stroke: ACC, w: 5 }) + K.line(Bt[0], Bt[1], M[0], M[1], { dash: "6 5", w: 2 }) +
      K.line(Bt[0], Bt[1], Tt[0], Tt[1]) + K.line(Bt[0], Bt[1], Tf[0], Tf[1]) +
      K.arc(Bt, M, Tt, 30, o.up, { size: 13 }) + K.arc(Bt, M, Tf, 24, o.down, { size: 13 });
    body += K.T(76, 190, o.b, { size: 13, anchor: "end" }) + K.T(192, 190, o.b, { size: 13, anchor: "start" }) + K.T(192, 96, o.h, { size: 14, anchor: "start" });
    return K.box(320, 228, body, "Building and tower");
  }

  function abc(o = {}) {
    const A = [40, 184], B = [286, 184], C = [196, 46];
    const mid = [174, 140];
    let body = K.poly([A, B, C]) + K.T(26, 202, "A") + K.T(302, 202, "B") + K.T(196, 32, "C");
    if (o.A) body += K.arc(A, B, C, 30, o.A, { size: 13 });
    if (o.B) body += K.arc(B, A, C, 30, o.B, { size: 13 });
    if (o.C) body += K.arc(C, A, B, 24, o.C, { size: 13 });
    if (o.a != null) body += K.side(B, C, mid, o.a);
    if (o.b != null) body += K.side(C, A, mid, o.b);
    if (o.c != null) body += K.side(A, B, mid, o.c);
    return K.box(320, 214, body, "Triangle ABC");
  }

  function wheel(angles, o = {}) {
    const O = [160, 110], r = 80;
    let body = "";
    if (o.range) {
      const [a1, a2] = o.range;
      body += `<path d="M${xy(onCircle(O, r, a1))} A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${xy(onCircle(O, r, a2))}" fill="none" stroke="${ACC}" stroke-width="9" opacity="0.35"/>`;
    }
    body += K.line(52, 110, 268, 110, { w: 1.8 }) + K.line(160, 18, 160, 202, { w: 1.8 }) + K.circle(O[0], O[1], r, { w: 2 });
    body += K.T(292, 36, "A") + K.T(28, 36, "S") + K.T(28, 196, "T") + K.T(292, 196, "C");
    angles.forEach((a) => {
      const pt = onCircle(O, r, a);
      body += K.line(O[0], O[1], pt[0], pt[1], { stroke: ACC, w: 3 }) + K.dot(pt, "");
      const ref = refOf(a);
      if (ref > 0 && ref < 90) {
        const x = ((a % 360) + 360) % 360;
        const axis = x > 90 && x < 270 ? [O[0] - r, O[1]] : [O[0] + r, O[1]];
        body += K.arc(O, axis, pt, 30, o.refLabel || `${ref}°`, { size: 12, gap: 14 });
      }
    });
    if (o.note) body += K.T(160, 216, o.note, { size: 12, weight: 500 });
    return K.box(320, o.note ? 224 : 210, body, "Unit circle with All Sugar Tea Coffee quadrants");
  }

  function sectorPic(a, o = {}) {
    const O = [160, 122], r = 88;
    const start = [O[0] + r, O[1]];
    const end = onCircle(O, r, a);
    const big = a > 180 ? 1 : 0;
    let body = `<path d="M${xy(O)} L${xy(start)} A${r} ${r} 0 ${big} 0 ${xy(end)} Z" fill="var(--accent-soft)" stroke="${K.INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
    body += `<path d="M${xy(start)} A${r} ${r} 0 ${big} 0 ${xy(end)}" fill="none" stroke="${ACC}" stroke-width="5"/>`;
    body += `<path d="M${xy([O[0] + 22, O[1]])} A22 22 0 ${big} 0 ${xy(onCircle(O, 22, a))}" fill="none" stroke="${K.INK}" stroke-width="2"/>`;
    const lab = onCircle(O, 40, a / 2);
    body += K.T(lab[0], lab[1] + 5, o.th || "θ", { size: 13 }) + K.dot(O, "");
    if (o.r) body += K.T(O[0] + r / 2, O[1] + 20, o.r, { size: 14 });
    if (o.s) { const sp = onCircle(O, r + 22, a / 2); body += K.T(sp[0], sp[1] + 5, o.s, { size: 14, fill: ACC }); }
    return K.box(320, 220, body, "Sector with arc length");
  }

  function compPic() {
    const A = [60, 176], B = [282, 176], C = [60, 40];
    const inside = [130, 140];
    const body = K.poly([A, B, C]) + K.right(A, B, C) + K.arc(B, A, C, 36, "θ") + K.arc(C, A, B, 28, "90° − θ", { size: 13, gap: 24 }) +
      K.side(A, C, inside, "a") + K.side(A, B, inside, "b") + K.side(B, C, inside, "c") +
      K.T(160, 216, "sin θ = a/c = cos(90° − θ)", { size: 13, weight: 600 });
    return K.box(320, 224, body, "The two sharp angles of a right triangle are complements");
  }

  const compTable = (hot) => P.table(["", "A + B", "A − B"], [
    ["sin", "sin A cos B + cos A sin B", "sin A cos B − cos A sin B"],
    ["cos", "cos A cos B − sin A sin B", "cos A cos B + sin A sin B"],
    ["tan", "(tan A + tan B) ÷ (1 − tan A tan B)", "(tan A − tan B) ÷ (1 + tan A tan B)"]
  ], { hot: hot || [], note: "sin: sign stays. cos: sign swaps." });

  const doubleTable = () => P.table(["Double", "Formula"], [
    ["sin 2A", "2 sin A cos A"], ["cos 2A", "cos²A − sin²A"], ["", "2cos²A − 1"], ["", "1 − 2sin²A"], ["tan 2A", "2 tan A ÷ (1 − tan²A)"]
  ], { note: "Put B = A in the compound formulas." });

  const toolbox = () => P.table(["Swap", "for"], [
    ["tan θ", "sin θ ÷ cos θ"], ["cot θ", "cos θ ÷ sin θ"], ["sec θ", "1 ÷ cos θ"], ["cosec θ", "1 ÷ sin θ"], ["sin²θ + cos²θ", "1"]
  ], { note: "Turn everything into sin and cos." });

  /* ---------- Grade 10: worked problems for the existing lessons ---------- */

  patch("g10", "soh", {
    worked: [
      {
        problem: "In a right triangle, the side opposite θ is 5 and the hypotenuse is 13. Find cos θ and tan θ.",
        pic: P.rightTri({ opp: "5", adj: "?", hyp: "13", theta: "θ" }),
        steps: [
          ["Name the sides from θ", "Opposite = 5, hypotenuse = 13, adjacent = unknown."],
          ["Pythagoras for the missing side", "Adjacent = √(13² − 5²) = √(169 − 25) = √144 = 12."],
          ["CAH", "cos θ = adjacent ÷ hypotenuse = 12/13."],
          ["TOA", "tan θ = opposite ÷ adjacent = 5/12."]
        ],
        answer: "cos θ = 12/13, tan θ = 5/12"
      },
      {
        problem: "A right triangle has an angle of 30° and a hypotenuse of 12 cm. Find the side opposite 30° and the side next to it.",
        pic: P.rightTri({ opp: "?", adj: "?", hyp: "12", theta: "30°" }),
        steps: [
          ["SOH links opposite and hypotenuse", "sin 30° = opposite ÷ 12."],
          ["Use the exact value", "sin 30° = 1/2, so opposite = 12 × 1/2 = 6 cm."],
          ["CAH links adjacent and hypotenuse", "cos 30° = adjacent ÷ 12, so adjacent = 12 × √3/2 = 6√3 cm."]
        ],
        answer: "Opposite = 6 cm, adjacent = 6√3 cm (about 10.4 cm)"
      },
      {
        problem: "The two legs of a right triangle are both 7 cm. Find the angle θ.",
        pic: P.rightTri({ opp: "7", adj: "7", theta: "θ" }),
        steps: [
          ["Pick the ratio for the sides you have", "You know opposite and adjacent, so use TOA."],
          ["TOA", "tan θ = 7 ÷ 7 = 1."],
          ["Which angle has tan 1?", "tan 45° = 1, so θ = 45°."]
        ],
        answer: "θ = 45°"
      }
    ]
  });

  patch("g10", "recip", {
    worked: [
      {
        problem: "sin θ = 3/5 and θ is acute. Find cosec θ, sec θ and cot θ.",
        pic: P.rightTri({ opp: "3", adj: "?", hyp: "5", theta: "θ" }),
        steps: [
          ["Draw the triangle from SOH", "Opposite 3, hypotenuse 5."],
          ["Pythagoras", "Adjacent = √(25 − 9) = 4."],
          ["cosec flips sin", "cosec θ = 5/3."],
          ["sec flips cos", "cos θ = 4/5, so sec θ = 5/4."],
          ["cot flips tan", "tan θ = 3/4, so cot θ = 4/3."]
        ],
        answer: "cosec θ = 5/3, sec θ = 5/4, cot θ = 4/3"
      },
      {
        problem: "Find sec 60° + cosec 30°.",
        steps: [
          ["sec flips cos", "cos 60° = 1/2, so sec 60° = 2."],
          ["cosec flips sin", "sin 30° = 1/2, so cosec 30° = 2."],
          ["Add", "2 + 2 = 4."]
        ],
        answer: "4"
      },
      {
        problem: "cot θ = 8/15 and θ is acute. Find sec θ.",
        steps: [
          ["cot flips tan", "tan θ = 15/8: opposite 15, adjacent 8."],
          ["Pythagoras", "Hypotenuse = √(225 + 64) = √289 = 17."],
          ["CAH", "cos θ = 8/17."],
          ["sec flips cos", "sec θ = 17/8."]
        ],
        answer: "sec θ = 17/8"
      }
    ]
  });

  patch("g10", "astc", {
    worked: [
      {
        problem: "sin θ = 3/5 and θ is in quadrant II. Find cos θ and tan θ.",
        pic: P.quadrant(2),
        steps: [
          ["Find the sizes with a triangle", "Opposite 3, hypotenuse 5, so adjacent 4. Sizes: cos 4/5, tan 3/4."],
          ["Quadrant II is Sugar", "Only sin is positive there."],
          ["Give the signs", "cos θ = −4/5 and tan θ = −3/4."]
        ],
        answer: "cos θ = −4/5, tan θ = −3/4"
      },
      {
        problem: "tan θ = 5/12 and θ is in quadrant III. Find sin θ and cos θ.",
        pic: P.quadrant(3),
        steps: [
          ["Find the sizes with a triangle", "Opposite 5, adjacent 12, hypotenuse 13."],
          ["Quadrant III is To", "Only tan is positive, so sin and cos are negative."],
          ["Give the signs", "sin θ = −5/13 and cos θ = −12/13."]
        ],
        answer: "sin θ = −5/13, cos θ = −12/13"
      },
      {
        problem: "Is sin 200° × cos 300° positive or negative?",
        steps: [
          ["Place 200°", "200° is between 180° and 270°: quadrant III, To. sin is negative."],
          ["Place 300°", "300° is between 270° and 360°: quadrant IV, Coffee. cos is positive."],
          ["Multiply the signs", "Negative × positive = negative."]
        ],
        answer: "Negative"
      }
    ]
  });

  patch("g10", "hand", {
    worked: [
      {
        problem: "Use your hand to find sin 60°.",
        pic: P.hand(60),
        steps: [
          ["Fold the 60° finger", "It is the fourth finger: 0°, 30°, 45°, 60°."],
          ["Count the fingers before it", "0°, 30°, 45°: that is 3."],
          ["Root, then ÷ 2", "sin 60° = √3 ÷ 2 = √3/2."]
        ],
        answer: "sin 60° = √3/2"
      },
      {
        problem: "Use your hand to find cos 30°, then tan 30°.",
        pic: P.hand(30),
        steps: [
          ["Fold the 30° finger and count after it", "45°, 60°, 90°: that is 3. cos 30° = √3/2."],
          ["Count before it for sin", "Only 0°: that is 1. sin 30° = √1/2 = 1/2."],
          ["tan = sin ÷ cos", "(1/2) ÷ (√3/2) = 1/√3."]
        ],
        answer: "cos 30° = √3/2, tan 30° = 1/√3"
      },
      {
        problem: "Find sin²45° + cos²45°.",
        pic: P.hand(45),
        steps: [
          ["Fold the 45° finger", "2 fingers before, 2 after. sin 45° = cos 45° = √2/2."],
          ["Square each", "(√2/2)² = 2/4 = 1/2."],
          ["Add", "1/2 + 1/2 = 1."]
        ],
        answer: "1 (it always is: sin²θ + cos²θ = 1)"
      }
    ]
  });

  /* ---------- Grade 10: new lessons ---------- */

  const COMBOS = [
    ["sin 30° + cos 60°", "1", ["1/2", "2", "√3/2"], "1/2 + 1/2 = 1.", [["sin", 1], ["cos", 3]]],
    ["tan 45° × sin 90°", "1", ["0", "1/2", "√3"], "1 × 1 = 1.", [["tan", 2], ["sin", 4]]],
    ["2 sin 30° cos 30°", "√3/2", ["√3", "1/2", "1"], "2 × 1/2 × √3/2 = √3/2. It equals sin 60°.", [["sin", 1], ["cos", 1]]],
    ["sin²60° + cos²60°", "1", ["3/4", "1/2", "2"], "3/4 + 1/4 = 1.", [["sin", 3], ["cos", 3]]],
    ["cos 0° + sin 90°", "2", ["1", "0", "1/2"], "1 + 1 = 2.", [["cos", 0], ["sin", 4]]],
    ["tan²60°", "3", ["√3", "9", "1/3"], "(√3)² = 3.", [["tan", 3]]],
    ["sin 45° × cos 45°", "1/2", ["1", "1/√2", "2"], "1/√2 × 1/√2 = 1/2.", [["sin", 2], ["cos", 2]]],
    ["cos²30° − sin²30°", "1/2", ["1", "√3/2", "0"], "3/4 − 1/4 = 2/4 = 1/2.", [["cos", 1], ["sin", 1]]],
    ["tan 30° × tan 60°", "1", ["√3", "1/3", "3"], "1/√3 × √3 = 1.", [["tan", 1], ["tan", 3]]],
    ["sec 60° − tan 45°", "1", ["2", "0", "3"], "2 − 1 = 1.", [["sec", 3], ["tan", 2]]],
    ["cosec 30° + cot 45°", "3", ["2", "1", "5/2"], "2 + 1 = 3.", [["cosec", 1], ["cot", 2]]],
    ["4 sin²30°", "1", ["2", "1/4", "4"], "4 × (1/2)² = 4 × 1/4 = 1.", [["sin", 1]]],
    ["sin 30° × cos 60°", "1/4", ["1", "1/2", "√3/4"], "1/2 × 1/2 = 1/4.", [["sin", 1], ["cos", 3]]],
    ["tan 60° ÷ tan 30°", "3", ["1", "√3", "1/3"], "√3 ÷ (1/√3) = √3 × √3 = 3.", [["tan", 3], ["tan", 1]]],
    ["sin 60° cos 30° + cos 60° sin 30°", "1", ["√3/2", "1/2", "3/4"], "√3/2 × √3/2 + 1/2 × 1/2 = 3/4 + 1/4 = 1. It equals sin 90°.", [["sin", 3], ["cos", 1], ["cos", 3], ["sin", 1]]],
    ["2 tan 30° ÷ (1 − tan²30°)", "√3", ["1/√3", "1", "2/√3"], "2/√3 ÷ (1 − 1/3) = 2/√3 × 3/2 = 3/√3 = √3.", [["tan", 1]]],
    ["cos 60° + sin²45°", "1", ["1/2", "3/2", "1/√2"], "1/2 + (1/√2)² = 1/2 + 1/2 = 1.", [["cos", 3], ["sin", 2]]],
    ["3 tan²30°", "1", ["√3", "3", "1/3"], "3 × (1/√3)² = 3 × 1/3 = 1.", [["tan", 1]]]
  ];

  const PYID = [
    ["1 − sin²θ", "cos²θ", ["sin²θ", "1 + sin²θ", "tan²θ"], "sin²θ + cos²θ = 1, so 1 − sin²θ = cos²θ."],
    ["1 − cos²θ", "sin²θ", ["cos²θ", "tan²θ", "sec²θ"], "sin²θ + cos²θ = 1, so 1 − cos²θ = sin²θ."],
    ["sec²θ − 1", "tan²θ", ["cot²θ", "1", "sin²θ"], "1 + tan²θ = sec²θ, so sec²θ − 1 = tan²θ."],
    ["cosec²θ − 1", "cot²θ", ["tan²θ", "1", "cos²θ"], "1 + cot²θ = cosec²θ, so cosec²θ − 1 = cot²θ."],
    ["sec²θ − tan²θ", "1", ["0", "−1", "2 tan²θ"], "1 + tan²θ = sec²θ, so the difference is 1."],
    ["cosec²θ − cot²θ", "1", ["0", "−1", "2 cot²θ"], "1 + cot²θ = cosec²θ, so the difference is 1."],
    ["sin²θ + cos²θ + tan²θ", "sec²θ", ["1", "cosec²θ", "1 + tan θ"], "sin²θ + cos²θ = 1, and 1 + tan²θ = sec²θ."],
    ["(1 + cot²θ) sin²θ", "1", ["cos²θ", "cosec²θ", "0"], "1 + cot²θ = cosec²θ, and cosec²θ × sin²θ = 1."],
    ["(1 − cos²θ)(1 + cot²θ)", "1", ["sin²θ", "cos²θ", "0"], "1 − cos²θ = sin²θ and 1 + cot²θ = cosec²θ. sin²θ × cosec²θ = 1."]
  ];

  add("g10", [
    {
      id: "table", name: "The standard angle table", phrase: "Write 0, 1, 2, 3, 4. Divide by 4. Take the root. That is sin.",
      also: "cos is the sin row backwards. tan is sin ÷ cos. cosec, sec, and cot flip them.",
      steps: [
        "Write the angles 0°, 30°, 45°, 60°, 90°.",
        "Under them write 0, 1, 2, 3, 4.",
        "Divide each by 4 and take the square root: 0, 1/2, 1/√2, √3/2, 1. That is the sin row.",
        "Write the sin row backwards for cos: 1, √3/2, 1/√2, 1/2, 0.",
        "tan = sin ÷ cos: 0, 1/√3, 1, √3, not defined.",
        "Optional row: flip sin for cosec, cos for sec, tan for cot."
      ],
      exception: "tan 90°, sec 90°, cosec 0°, and cot 0° do not exist, because you would divide by 0. The table is in degrees; in radians 30° is π/6. And sin 60° is not 2 × sin 30°: doubling the angle does not double the sine.",
      pic: () => tableAt(),
      gen() {
        if (Math.random() < 0.35) {
          const [prompt, ans, wrongs, why, hide] = pick(COMBOS);
          return Q(`Find ${prompt}`, ans, wrongs, why, tableAt(hide, "Find each value, then do the sum."));
        }
        const f = pick(ROWS);
        const i = R(0, 4);
        const ans = TAB[f][i];
        const wrongs = [TAB[CO[f]][i], TAB[f][i === 4 ? 3 : i + 1], TAB[FLIP[f]][i], TAB[f][i === 0 ? 1 : i - 1], ...TAB[f], ...TAB[CO[f]]];
        const A = ANG[i];
        let why;
        if (f === "sin") why = `Recite: √(${i}/4) = ${ans}.`;
        else if (f === "cos") why = `cos is the sin row backwards: cos ${A}° = sin ${90 - A}° = ${ans}.`;
        else if (f === "tan") why = i === 4 ? "tan 90° = sin ÷ cos = 1 ÷ 0, which does not exist." : `tan = sin ÷ cos = ${par(TAB.sin[i])} ÷ ${par(TAB.cos[i])} = ${ans}.`;
        else {
          const base = FLIP[f];
          why = ans === ND ? `${base} ${A}° = 0, and you cannot divide by 0, so ${f} ${A}° does not exist.` : `${f} flips ${base}: ${base} ${A}° = ${TAB[base][i]}, so ${f} ${A}° = ${ans}.`;
        }
        return Q(`${f} ${A}°`, ans, wrongs, why, tableAt([[f, i]], `Find the ? cell.`));
      },
      worked: [
        {
          problem: "Build sin 60°, cos 60°, and tan 60° from the recite trick.",
          pic: tableAt([["sin", 3], ["cos", 3], ["tan", 3]]),
          steps: [
            ["Write 0, 1, 2, 3, 4", "60° is the fourth angle, so it gets 3."],
            ["Divide by 4, take the root", "sin 60° = √(3/4) = √3/2."],
            ["cos is the sin row backwards", "The sin row backwards puts 1/2 under 60°, so cos 60° = 1/2."],
            ["tan = sin ÷ cos", "tan 60° = (√3/2) ÷ (1/2) = √3."]
          ],
          answer: "sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3"
        },
        {
          problem: "Find 2 tan²45° + cos²30° − sin²60°.",
          steps: [
            ["Read the table", "tan 45° = 1, cos 30° = √3/2, sin 60° = √3/2."],
            ["Square", "tan²45° = 1, cos²30° = 3/4, sin²60° = 3/4."],
            ["Put them in", "2 × 1 + 3/4 − 3/4."],
            ["Tidy", "The 3/4s cancel, leaving 2."]
          ],
          answer: "2"
        },
        {
          problem: "Find (sin 30° + tan 45° − cosec 60°) ÷ (sec 30° + cos 60° + cot 45°).",
          steps: [
            ["Read the table", "sin 30° = 1/2, tan 45° = 1, cosec 60° = 2/√3, sec 30° = 2/√3, cos 60° = 1/2, cot 45° = 1."],
            ["Top", "1/2 + 1 − 2/√3 = 3/2 − 2/√3 = (3√3 − 4)/(2√3)."],
            ["Bottom", "2/√3 + 1/2 + 1 = 2/√3 + 3/2 = (3√3 + 4)/(2√3)."],
            ["Divide: the 2√3 cancels", "(3√3 − 4) ÷ (3√3 + 4)."],
            ["Rationalise: × (3√3 − 4) top and bottom", "(27 − 24√3 + 16) ÷ (27 − 16) = (43 − 24√3)/11."]
          ],
          answer: "(43 − 24√3)/11, about 0.13"
        }
      ]
    },
    {
      id: "pyid", name: "Pythagorean identities", phrase: "sin² + cos² = 1. Divide by cos² to get 1 + tan² = sec². Divide by sin² to get 1 + cot² = cosec².",
      also: "It is Pythagoras on a triangle with hypotenuse 1.",
      steps: [
        "In a triangle with hypotenuse 1, the legs are sin θ and cos θ.",
        "Pythagoras: sin²θ + cos²θ = 1.",
        "Divide every term by cos²θ: tan²θ + 1 = sec²θ.",
        "Divide every term by sin²θ: 1 + cot²θ = cosec²θ.",
        "Given one ratio, use the identity to find the others."
      ],
      exception: "sin²θ means (sin θ)², not sin(θ²). sin θ + cos θ is not 1; only the squares add to 1. Taking a square root gives ±, so the quadrant (ASTC) picks the sign.",
      pic: () => P.rightTri({ opp: "sin θ", adj: "cos θ", hyp: "1", theta: "θ" }),
      gen() {
        if (Math.random() < 0.35) {
          const [expr, ans, wrongs, why] = pick(PYID);
          const tri = ans === "1" ? { opp: "sin θ", adj: "cos θ", hyp: "?", theta: "θ" } : { opp: "sin θ", adj: "cos θ", hyp: "1", theta: "θ" };
          return Q(`Simplify ${expr}`, ans, wrongs, why, P.rightTri(tri));
        }
        let [a, b, c] = pick(PRIM);
        if (Math.random() < 0.5) [a, b] = [b, a];
        const V = { sin: raw(a, c), cos: raw(b, c), tan: raw(a, b), cosec: raw(c, a), sec: raw(c, b), cot: raw(b, a) };
        const g = pick(["sin", "cos", "tan"]);
        const t = pick(ROWS.filter((x) => x !== g));
        const line = {
          sin: `cos²θ = 1 − ${a * a}/${c * c} = ${b * b}/${c * c}, so cos θ = ${b}/${c}`,
          cos: `sin²θ = 1 − ${b * b}/${c * c} = ${a * a}/${c * c}, so sin θ = ${a}/${c}`,
          tan: `sec²θ = 1 + ${a * a}/${b * b} = ${c * c}/${b * b}, so sec θ = ${c}/${b}`
        }[g];
        const wrongs = [g === "sin" && t === "cos" ? raw(c - a, c) : null, V[FLIP[t]], V[CO[t]], ...ROWS.map((x) => V[x])];
        const pic = { sin: { opp: a, adj: "?", hyp: c }, cos: { opp: "?", adj: b, hyp: c }, tan: { opp: a, adj: b, hyp: "?" } }[g];
        return Q(`θ is acute and ${g} θ = ${V[g]}. Find ${t} θ.`, V[t], wrongs, `${line}. Then ${t} θ = ${V[t]}.`, P.rightTri({ ...pic, theta: "θ" }));
      },
      worked: [
        {
          problem: "sin θ = 8/17 and θ is acute. Find cos θ, tan θ, and sec θ.",
          steps: [
            ["sin² + cos² = 1", "cos²θ = 1 − (8/17)² = 1 − 64/289 = 225/289."],
            ["Square root (θ acute, so +)", "cos θ = 15/17."],
            ["tan = sin ÷ cos", "tan θ = (8/17) ÷ (15/17) = 8/15."],
            ["sec flips cos", "sec θ = 17/15."]
          ],
          answer: "cos θ = 15/17, tan θ = 8/15, sec θ = 17/15"
        },
        {
          problem: "tan θ = 3/4 and θ is acute. Find sec θ and cos θ without drawing a triangle.",
          steps: [
            ["Divide by cos²: 1 + tan² = sec²", "sec²θ = 1 + 9/16 = 25/16."],
            ["Square root (θ acute, so +)", "sec θ = 5/4."],
            ["cos flips sec", "cos θ = 4/5."]
          ],
          answer: "sec θ = 5/4, cos θ = 4/5"
        },
        {
          problem: "Prove (1 − cos²θ)(1 + cot²θ) = 1.",
          steps: [
            ["sin² + cos² = 1, rearranged", "1 − cos²θ = sin²θ."],
            ["Divide by sin²: 1 + cot² = cosec²", "1 + cot²θ = cosec²θ."],
            ["Multiply", "sin²θ × cosec²θ = sin²θ × 1/sin²θ = 1."],
            ["Matches the right side", "Left side = 1 = right side."]
          ],
          answer: "Proved: the left side simplifies to 1."
        }
      ]
    },
    {
      id: "comp", name: "Complementary angles", phrase: "“Co” means complement: sin(90° − θ) = cos θ.",
      also: "Swap the name, swap the angle: tan ↔ cot and sec ↔ cosec work the same way.",
      steps: [
        "Two angles that add to 90° are complements.",
        "The side opposite one sharp angle is next to the other one.",
        "So sin(90° − θ) = cos θ and cos(90° − θ) = sin θ.",
        "Likewise tan(90° − θ) = cot θ and sec(90° − θ) = cosec θ.",
        "For sin 70° ÷ cos 20°, spot 70 + 20 = 90: top and bottom match, so it is 1."
      ],
      exception: "The angles must add to 90°, not 180°. sin 70° ÷ cos 70° is tan 70°, not 1. The swap changes the name: sin(90° − θ) is cos θ, not sin θ.",
      pic: () => compPic(),
      gen() {
        let x;
        do { x = R(10, 80); } while (x === 45);
        const y = 90 - x;
        const f = pick(["sin", "cos", "tan", "sec", "cosec", "cot"]);
        const form = R(1, 4);
        const why = `${x}° + ${y}° = 90°, so ${CO[f]} ${y}° = ${f} ${x}°.`;
        if (form === 1) return Q(`${f} ${x}° ÷ ${CO[f]} ${y}°`, "1", ["0", "−1", "2", `tan ${x}°`], `${why} Anything ÷ itself is 1.`, compPic());
        if (form === 2) return Q(`${f} ${x}° − ${CO[f]} ${y}°`, "0", ["1", "−1", `2 ${f} ${x}°`], `${why} The two cancel.`, compPic());
        if (form === 3) return Q(`tan ${x}° × tan ${y}°`, "1", ["0", `tan²${x}°`, "2"], `tan ${y}° = cot ${x}°, and tan × cot = 1.`, compPic());
        return Q(`${f} ${x}° = ${CO[f]} ?`, `${y}°`, [deg(x), deg(180 - x), deg(90 + x), deg(360 - x)], `“Co” means complement: 90° − ${x}° = ${y}°.`, compPic());
      },
      worked: [
        {
          problem: "Find sin 36° ÷ cos 54°.",
          steps: [
            ["Spot complements", "36° + 54° = 90°."],
            ["“Co” means complement", "cos 54° = sin(90° − 54°) = sin 36°."],
            ["Divide", "sin 36° ÷ sin 36° = 1."]
          ],
          answer: "1"
        },
        {
          problem: "Find tan 10° × tan 20° × tan 70° × tan 80°.",
          steps: [
            ["Pair the complements", "10° with 80°, and 20° with 70°."],
            ["Swap the name", "tan 80° = cot 10°, and tan 70° = cot 20°."],
            ["tan × cot = 1", "tan 10° cot 10° = 1 and tan 20° cot 20° = 1."],
            ["Multiply", "1 × 1 = 1."]
          ],
          answer: "1"
        },
        {
          problem: "sin 3A = cos(A − 26°), and 3A is acute. Find A.",
          steps: [
            ["Turn cos into sin with the complement", "cos(A − 26°) = sin(90° − (A − 26°)) = sin(116° − A)."],
            ["Match the angles", "sin 3A = sin(116° − A), so 3A = 116° − A."],
            ["Solve", "4A = 116°, so A = 29°."],
            ["Check", "3A = 87° is acute, and A − 26° = 3° is fine."]
          ],
          answer: "A = 29°"
        }
      ]
    },
    {
      id: "heights", name: "Heights and distances", phrase: "Elevation looks up, depression looks down, and both start from the flat.",
      also: "Height and ground distance? tan. A slanted ladder or string? sin or cos.",
      steps: [
        "Draw it: flat ground, the height straight up, a right angle at the foot.",
        "Mark the angle at the eye, measured from the horizontal.",
        "Pick the ratio (SOH CAH TOA) that links the side you know to the side you want.",
        "Solve with exact values: tan 30° = 1/√3, tan 45° = 1, tan 60° = √3."
      ],
      exception: "The angle of depression is measured down from the horizontal at the top, not from the wall. It equals the angle of elevation from the ground (Z angles). If an eye height is given, add it on at the end.",
      pic: () => towerPic({ ang: "θ", d: "distance", h: "height" }),
      gen() {
        const ang = pick([30, 45, 60]);
        const i = ANG.indexOf(ang);
        const form = R(1, 4);
        const others = [30, 45, 60].filter((a) => a !== ang);
        if (form === 1) {
          const d = 3 * R(2, 10);
          return QV(`From ${d} m away from the foot of a tower, the angle of elevation of the top is ${ang}°. How tall is the tower?`, mul(d, "tan", ang),
            [mul(d, "cot", ang), mul(d, "sin", ang), mul(d, "cos", ang), ...others.map((a) => mul(d, "tan", a))],
            `TOA: tan ${ang}° = height ÷ ${d}. Height = ${d} × ${TAB.tan[i]} = ${mul(d, "tan", ang)[0]} m.`, towerPic({ ang: `${ang}°`, d: `${d} m`, h: "?" }), " m");
        }
        if (form === 2) {
          const h = 3 * R(2, 10);
          return QV(`From the top of ${an(h).toLowerCase()} ${h} m cliff, the angle of depression of a boat is ${ang}°. How far is the boat from the foot of the cliff?`, mul(h, "cot", ang),
            [mul(h, "tan", ang), mul(h, "sin", ang), mul(h, "cos", ang), ...others.map((a) => mul(h, "cot", a))],
            `The angle of elevation from the boat is also ${ang}°. tan ${ang}° = ${h} ÷ distance, so distance = ${h} ÷ ${par(TAB.tan[i])} = ${mul(h, "cot", ang)[0]} m.`,
            towerPic({ down: true, ang: `${ang}°`, h: `${h} m`, d: "?" }), " m");
        }
        const L = 2 * R(2, 10);
        if (form === 3) {
          const kite = Math.random() < 0.5;
          return QV(kite ? `A kite string is ${L} m long and makes ${ang}° with the ground. How high is the kite? (Treat the string as straight.)` : `${an(L)} ${L} m ladder leans on a wall and makes ${ang}° with the ground. How high up the wall does it reach?`,
            mul(L, "sin", ang), [mul(L, "cos", ang), mul(L, "tan", ang), [String(L), L], ...others.map((a) => mul(L, "sin", a))],
            `The ${kite ? "string" : "ladder"} is the hypotenuse. SOH: height = ${L} × sin ${ang}° = ${L} × ${TAB.sin[i]} = ${mul(L, "sin", ang)[0]} m.`,
            towerPic({ ang: `${ang}°`, s: `${L} m`, h: "?" }), " m");
        }
        return QV(`${an(L)} ${L} m ladder leans on a wall and makes ${ang}° with the ground. How far is its foot from the wall?`,
          mul(L, "cos", ang), [mul(L, "sin", ang), mul(L, "tan", ang), [String(L), L], ...others.map((a) => mul(L, "cos", a))],
          `The ladder is the hypotenuse. CAH: distance = ${L} × cos ${ang}° = ${L} × ${TAB.cos[i]} = ${mul(L, "cos", ang)[0]} m.`,
          towerPic({ ang: `${ang}°`, s: `${L} m`, d: "?" }), " m");
      },
      worked: [
        {
          problem: "From a point on the ground, the angle of elevation of the top of a tower is 30°. After walking 20 m towards the tower, it is 60°. Find the height of the tower.",
          pic: twoPic({ far: "30°", near: "60°", gap: "20 m", x: "x", h: "h" }),
          steps: [
            ["Name the unknowns", "Let the height be h and the distance from the nearer point be x."],
            ["TOA at the near point (60°)", "tan 60° = h ÷ x, so h = x√3."],
            ["TOA at the far point (30°)", "tan 30° = h ÷ (x + 20), so x + 20 = h√3."],
            ["Substitute h = x√3", "x + 20 = x√3 × √3 = 3x, so 2x = 20 and x = 10."],
            ["Find h", "h = 10√3 m."]
          ],
          answer: "10√3 m, about 17.3 m"
        },
        {
          problem: "From the top of a 75 m lighthouse, the angles of depression of two ships on the same side are 30° and 45°. How far apart are the ships?",
          pic: twoPic({ down: true, nearX: 130, far: "30°", near: "45°", gap: "?", h: "75 m" }),
          steps: [
            ["Depression = elevation from each ship", "The ships see the top at 45° (near) and 30° (far)."],
            ["TOA for the near ship", "tan 45° = 75 ÷ d₁, so d₁ = 75 m."],
            ["TOA for the far ship", "tan 30° = 75 ÷ d₂, so d₂ = 75 ÷ (1/√3) = 75√3 m."],
            ["Subtract", "Gap = 75√3 − 75 = 75(√3 − 1) m."]
          ],
          answer: "75(√3 − 1) m, about 54.9 m"
        },
        {
          problem: "From the top of a 7 m building, the angle of elevation of the top of a tower is 60°, and the angle of depression of its foot is 45°. Find the height of the tower.",
          pic: buildingPic({ up: "60°", down: "45°", b: "7 m", h: "?" }),
          steps: [
            ["Draw the horizontal from the building top", "It splits the tower into a bottom part (7 m) and a top part (h)."],
            ["Depression 45° to the foot: TOA", "tan 45° = 7 ÷ d, so the gap d = 7 m."],
            ["Elevation 60° to the top: TOA", "tan 60° = h ÷ 7, so h = 7√3 m."],
            ["Add the two parts", "Tower = 7 + 7√3 = 7(1 + √3) m."]
          ],
          answer: "7(1 + √3) m, about 19.1 m"
        }
      ]
    }
  ], "hand");

  /* ---------- Grades 11–12: advanced trigonometry ---------- */

  const C15 = "(√6 − √2)/4", C75 = "(√6 + √2)/4", N15 = "(√2 − √6)/4", N75 = "−(√6 + √2)/4";
  const EXACT = {
    15: { split: "45° − 30°", sin: [C15, "(√2 − 1)/2", "15° = 45° − 30°. sin cos cos sin, sign stays: sin 45° cos 30° − cos 45° sin 30° = (√3 − 1)/(2√2) = (√6 − √2)/4."],
      cos: [C75, "(√2 − √3)/2", "15° = 45° − 30°. cos cos sin sin, sign swaps: cos 45° cos 30° + sin 45° sin 30° = (√3 + 1)/(2√2) = (√6 + √2)/4."],
      tan: ["2 − √3", "1 − 1/√3", "tan(45° − 30°) = (1 − 1/√3) ÷ (1 + 1/√3) = (√3 − 1)/(√3 + 1) = 2 − √3."] },
    75: { split: "45° + 30°", sin: [C75, "(√2 + 1)/2", "75° = 45° + 30°. sin cos cos sin, sign stays: sin 45° cos 30° + cos 45° sin 30° = (√3 + 1)/(2√2) = (√6 + √2)/4."],
      cos: [C15, "(√2 + √3)/2", "75° = 45° + 30°. cos cos sin sin, sign swaps: cos 45° cos 30° − sin 45° sin 30° = (√3 − 1)/(2√2) = (√6 − √2)/4."],
      tan: ["2 + √3", "1 + 1/√3", "tan(45° + 30°) = (1 + 1/√3) ÷ (1 − 1/√3) = (√3 + 1)/(√3 − 1) = 2 + √3."] },
    105: { split: "60° + 45°", sin: [C75, "(√2 + √3)/2", "105° = 60° + 45°. sin cos cos sin, sign stays: sin 60° cos 45° + cos 60° sin 45° = (√3 + 1)/(2√2) = (√6 + √2)/4."],
      cos: [N15, "(1 + √2)/2", "105° = 60° + 45°. cos cos sin sin, sign swaps: cos 60° cos 45° − sin 60° sin 45° = (1 − √3)/(2√2) = (√2 − √6)/4."],
      tan: ["−2 − √3", "1 + √3", "tan(60° + 45°) = (√3 + 1) ÷ (1 − √3) = −2 − √3."] },
    165: { split: "120° + 45°", sin: [C15, "(√3 + √2)/2", "165° = 120° + 45°. sin cos cos sin, sign stays: sin 120° cos 45° + cos 120° sin 45° = (√3 − 1)/(2√2) = (√6 − √2)/4."],
      cos: [N75, "(√2 − 1)/2", "165° = 120° + 45°. cos cos sin sin, sign swaps: cos 120° cos 45° − sin 120° sin 45° = (−1 − √3)/(2√2) = −(√6 + √2)/4."],
      tan: ["√3 − 2", "1 − √3", "tan(120° + 45°) = (1 − √3) ÷ (1 + √3) = √3 − 2."] }
  };

  const DOUBLE_VALUES = [
    ["2 sin 15° cos 15°", "1/2", ["√3/2", "1", "1/4"], "2 sin A cos A = sin 2A, so this is sin 30° = 1/2."],
    ["2 sin 22.5° cos 22.5°", "1/√2", ["1/2", "1", "√3/2"], "2 sin A cos A = sin 2A, so this is sin 45° = 1/√2."],
    ["cos²15° − sin²15°", "√3/2", ["1", "1/2", "0"], "cos²A − sin²A = cos 2A, so this is cos 30° = √3/2."],
    ["1 − 2 sin²22.5°", "1/√2", ["1/2", "√3/2", "0"], "1 − 2sin²A = cos 2A, so this is cos 45° = 1/√2."],
    ["2 cos²30° − 1", "1/2", ["√3 − 1", "√3/2", "1"], "2cos²A − 1 = cos 2A, so this is cos 60° = 1/2."],
    ["2 tan 22.5° ÷ (1 − tan²22.5°)", "1", ["1/√3", "√3", "0"], "2 tan A ÷ (1 − tan²A) = tan 2A, so this is tan 45° = 1."],
    ["2 tan 30° ÷ (1 − tan²30°)", "√3", ["1/√3", "1", "2/√3"], "2 tan A ÷ (1 − tan²A) = tan 2A, so this is tan 60° = √3."],
    ["2 sin 75° cos 75°", "1/2", ["√3/2", "−1/2", "1"], "This is sin 150° = sin 30° = 1/2."],
    ["cos²75° − sin²75°", "−√3/2", ["√3/2", "−1/2", "1/2"], "This is cos 150°. Quadrant II, so cos is negative: −√3/2."],
    ["1 − 2 sin²60°", "−1/2", ["1/2", "−√3/2", "0"], "This is cos 120°. Quadrant II, so cos is negative: −1/2."]
  ];

  const DOUBLE_FORMS = [
    ["2 sin A cos A", "sin 2A", ["cos 2A", "tan 2A", "2 sin 2A"]],
    ["1 − 2 sin²A", "cos 2A", ["sin 2A", "cos²A", "−cos 2A"]],
    ["2 cos²A − 1", "cos 2A", ["sin 2A", "cos A", "sin²A"]],
    ["cos²A − sin²A", "cos 2A", ["1", "sin 2A", "−cos 2A"]],
    ["2 tan A ÷ (1 − tan²A)", "tan 2A", ["sin 2A", "2 tan A", "cot 2A"]],
    ["1 + cos 2A", "2 cos²A", ["2 sin²A", "2 cos A", "cos²A"]],
    ["1 − cos 2A", "2 sin²A", ["2 cos²A", "sin²A", "2 sin A"]]
  ];

  const PROVE = [
    ["tan θ cos θ", "sin θ", ["cos θ", "tan θ", "1"], "tan θ cos θ = (sin θ ÷ cos θ) × cos θ = sin θ."],
    ["sin θ ÷ tan θ", "cos θ", ["sin θ", "sec θ", "tan θ"], "sin θ ÷ (sin θ ÷ cos θ) = cos θ."],
    ["(1 − cos²θ) ÷ sin θ", "sin θ", ["cos θ", "1 − cos θ", "sin²θ"], "1 − cos²θ = sin²θ, and sin²θ ÷ sin θ = sin θ."],
    ["sec θ − cos θ", "sin θ tan θ", ["tan²θ", "sin θ", "1"], "1/cos θ − cos θ = (1 − cos²θ)/cos θ = sin²θ/cos θ = sin θ tan θ."],
    ["(sec²θ − 1) cos²θ", "sin²θ", ["1", "cos²θ", "tan²θ"], "sec²θ − 1 = tan²θ, and tan²θ cos²θ = sin²θ."],
    ["1 ÷ (sin θ cos θ)", "tan θ + cot θ", ["sec θ + cosec θ", "1", "sin θ + cos θ"], "tan θ + cot θ = sin/cos + cos/sin = (sin² + cos²)/(sin cos) = 1/(sin θ cos θ)."],
    ["(1 + tan²θ) cos²θ", "1", ["sec²θ", "cos²θ", "sin²θ"], "1 + tan²θ = sec²θ, and sec²θ cos²θ = 1."],
    ["cosec θ − sin θ", "cos θ cot θ", ["cot θ", "cos θ", "tan θ sin θ"], "1/sin θ − sin θ = (1 − sin²θ)/sin θ = cos²θ/sin θ = cos θ cot θ."],
    ["(sin θ + cos θ)²", "1 + 2 sin θ cos θ", ["1", "1 − 2 sin θ cos θ", "2 sin θ cos θ"], "Expand: sin²θ + 2 sin θ cos θ + cos²θ = 1 + 2 sin θ cos θ."],
    ["cos⁴θ − sin⁴θ", "cos²θ − sin²θ", ["1", "(cos θ − sin θ)²", "sin²θ − cos²θ"], "Difference of squares: (cos²θ − sin²θ)(cos²θ + sin²θ) = cos²θ − sin²θ."],
    ["sin θ ÷ (1 − cos θ)", "(1 + cos θ) ÷ sin θ", ["(1 − cos θ) ÷ sin θ", "1 + cos θ", "cosec θ"], "× (1 + cos θ) top and bottom: sin θ(1 + cos θ)/(1 − cos²θ) = sin θ(1 + cos θ)/sin²θ = (1 + cos θ)/sin θ."],
    ["cot θ ÷ cosec θ", "cos θ", ["sin θ", "tan θ", "sec θ"], "(cos θ ÷ sin θ) × sin θ = cos θ."],
    ["sec θ ÷ cosec θ", "tan θ", ["cot θ", "1", "sin θ"], "(1/cos θ) × sin θ = sin θ ÷ cos θ = tan θ."]
  ];

  course({
    id: "trig2", grade: "Grades 11–12", title: "Advanced trigonometry", color: "#1D6A72",
    blurb: "Radians, any angle, the sine and cosine rules, compound angles, and trig equations.",
    lessons: [
      {
        id: "rad", name: "Radians and arc length", phrase: "π is 180°. To radians, × π/180. To degrees, × 180/π.",
        also: "Arc = radius × angle: s = rθ, with θ in radians.",
        steps: [
          "Remember one fact: π radians = 180°.",
          "Degrees to radians: multiply by π/180. 60° = 60π/180 = π/3.",
          "Radians to degrees: swap π for 180°. 3π/4 = 3 × 180° ÷ 4 = 135°.",
          "Arc length s = rθ and sector area = ½r²θ, with θ in radians."
        ],
        exception: "s = rθ only works with θ in radians. Check your calculator mode: sin 30 in radian mode is not 1/2. One radian is about 57.3°, not 1°.",
        pic: () => sectorPic(60, { r: "r", s: "s = rθ", th: "θ" }),
        gen() {
          const form = R(1, 3);
          if (form < 3) {
            const x = 15 * R(1, 24);
            if (form === 1) {
              return Q(`Write ${x}° in radians.`, piFr(x, 180), [piFr(x, 360), piFr(x, 90), piFr(180, x), sfr(x, 180)], `${x} × π/180 = ${piFr(x, 180)}.`, sectorPic(Math.min(x, 330), { th: `${x}°` }));
            }
            return Q(`Write ${piFr(x, 180)} in degrees.`, `${x}°`, [dg(x / 2), dg(2 * x), dg(x + 180), dg(360 - x), dg(x + 90)],
              `Swap π for 180°: ${piFr(x, 180)} = ${x}°.`, sectorPic(Math.min(x, 330), { th: piFr(x, 180) }));
          }
          const r = R(2, 12);
          const x = pick([30, 45, 60, 90, 120, 135, 150, 180, 270]);
          const shown = Math.random() < 0.5 ? `${x}°` : piFr(x, 180);
          return Q(`A circle has radius ${r} cm. Find the arc length for an angle of ${shown}.`, `${piFr(r * x, 180)} cm`,
            [`${r * x} cm`, `${piFr(r * x, 360)} cm`, `${piFr(r * r * x, 360)} cm`, `${piFr(2 * r * x, 180)} cm`, `${piFr(r * x, 90)} cm`],
            `s = rθ with θ in radians: ${x}° = ${piFr(x, 180)}, so s = ${r} × ${piFr(x, 180)} = ${piFr(r * x, 180)} cm.`, sectorPic(x, { r: `${r} cm`, s: "s = ?", th: shown }));
        },
        worked: [
          {
            problem: "Write 225° in radians.",
            steps: [
              ["Degrees to radians: × π/180", "225 × π/180 = 225π/180."],
              ["Simplify the fraction", "225/180 = 5/4 (divide both by 45)."]
            ],
            answer: "5π/4"
          },
          {
            problem: "Write 7π/6 in degrees.",
            steps: [
              ["π is 180°", "7π/6 = 7 × 180° ÷ 6."],
              ["Work it out", "180 ÷ 6 = 30, and 7 × 30 = 210."]
            ],
            answer: "210°"
          },
          {
            problem: "A sector has radius 12 cm and angle 150°. Find its arc length and area.",
            pic: sectorPic(150, { r: "12 cm", s: "s", th: "150°" }),
            steps: [
              ["Change to radians first", "150° = 150π/180 = 5π/6."],
              ["Arc: s = rθ", "s = 12 × 5π/6 = 10π cm."],
              ["Area: ½r²θ", "½ × 144 × 5π/6 = 72 × 5π/6 = 60π cm²."]
            ],
            answer: "Arc 10π cm (about 31.4 cm), area 60π cm² (about 188.5 cm²)"
          }
        ]
      },
      {
        id: "allied", name: "Allied angles", phrase: "Odd multiple of 90° swaps sin ↔ cos. ASTC decides the sign.",
        also: "180° and 360° keep the name. 90° and 270° change it.",
        steps: [
          "Write the angle as 90°, 180°, 270°, or 360° plus or minus θ.",
          "180° or 360° (even multiples of 90°): keep the name.",
          "90° or 270° (odd multiples): swap sin ↔ cos and tan ↔ cot.",
          "Pretend θ is small to see which quadrant you land in.",
          "ASTC gives the sign of the original function in that quadrant."
        ],
        exception: "The sign comes from the original function in the new quadrant, not from the new name. cos(90° + θ) = −sin θ because cos is negative in quadrant II. Also, sin(−θ) = −sin θ but cos(−θ) = cos θ.",
        pic: () => wheel([150], { note: "150° = 180° − 30°: keep sin, quadrant II, positive" }),
        gen() {
          const f = pick(["sin", "cos", "tan"]);
          if (Math.random() < 0.5) {
            const base = pick([90, 180, 270, 360]);
            const sg = base === 360 ? -1 : pick([1, -1]);
            const q = quadOf(base + sg * 10);
            const pos = positive(f, q);
            const odd = base % 180 === 90;
            const swap = { sin: "cos", cos: "sin", tan: "cot" }[f];
            const name = odd ? swap : f;
            const other = odd ? f : swap;
            const ans = `${pos ? "" : "−"}${name} θ`;
            return Q(`Simplify ${f}(${base}° ${sg > 0 ? "+" : "−"} θ)`, ans, [`${pos ? "−" : ""}${name} θ`, `${pos ? "" : "−"}${other} θ`, `${pos ? "−" : ""}${other} θ`],
              `${base}° is an ${odd ? "odd" : "even"} multiple of 90°, so ${odd ? `${f} turns into ${name}` : `${f} keeps its name`}. ${base}° ${sg > 0 ? "+" : "−"} θ is in quadrant ${ROMAN[q - 1]}, where ${f} is ${pos ? "positive" : "negative"}.`,
              wheel([base + sg * 30], { refLabel: "θ" }));
          }
          const r = pick([30, 45, 60]);
          const q = R(2, 4);
          const angle = [0, r, 180 - r, 180 + r, 360 - r][q];
          const form = ["", "", `180° − ${r}°`, `180° + ${r}°`, `360° − ${r}°`][q];
          const pos = positive(f, q);
          const i = ANG.indexOf(r);
          const ans = signed(TAB[f][i], pos);
          const swap = { sin: "cos", cos: "sin", tan: "cot" }[f];
          const near = TAB[f][r === 30 ? 3 : 1];
          return Q(`${f} ${angle}°`, ans, [signed(TAB[f][i], !pos), signed(TAB[swap][i], pos), signed(TAB[swap][i], !pos), signed(near, pos), signed(near, !pos)],
            `${angle}° = ${form}, quadrant ${ROMAN[q - 1]}. 180° and 360° keep the name, and ${f} is ${pos ? "positive" : "negative"} there: ${signed(`${f} ${r}°`, pos)} = ${ans}.`, wheel([angle]));
        },
        worked: [
          {
            problem: "Find sin 150°.",
            pic: wheel([150]),
            steps: [
              ["Write it from a quarter turn", "150° = 180° − 30°."],
              ["180° is an even multiple: keep the name", "sin 150° = ± sin 30°."],
              ["ASTC: quadrant II is Sugar", "sin is positive there."],
              ["Read the table", "sin 30° = 1/2."]
            ],
            answer: "sin 150° = 1/2"
          },
          {
            problem: "Find cos 240°.",
            pic: wheel([240]),
            steps: [
              ["Write it from a quarter turn", "240° = 180° + 60°."],
              ["Even multiple: keep the name", "cos 240° = ± cos 60°."],
              ["ASTC: quadrant III is To", "Only tan is positive, so cos is negative."],
              ["Read the table", "cos 240° = −cos 60° = −1/2."]
            ],
            answer: "cos 240° = −1/2"
          },
          {
            problem: "Simplify [cos(90° + θ) · sec(−θ) · tan(180° − θ)] ÷ [sec(360° − θ) · sin(180° + θ) · cot(90° − θ)].",
            steps: [
              ["cos(90° + θ): odd, swap; quadrant II, cos negative", "= −sin θ."],
              ["sec(−θ): cos ignores the minus", "= sec θ."],
              ["tan(180° − θ): even, keep; quadrant II, tan negative", "= −tan θ."],
              ["Top", "(−sin θ)(sec θ)(−tan θ) = sin θ sec θ tan θ."],
              ["Bottom, the same way", "sec(360° − θ) = sec θ, sin(180° + θ) = −sin θ, cot(90° − θ) = tan θ. Bottom = −sin θ sec θ tan θ."],
              ["Divide", "Everything cancels except the minus sign."]
            ],
            answer: "−1"
          }
        ]
      },
      {
        id: "sine", name: "Sine rule", phrase: "Each side over the sine of the angle it faces: a/sin A = b/sin B = c/sin C.",
        also: "Small letter faces capital letter.",
        steps: [
          "Label: side a faces angle A, b faces B, c faces C.",
          "Use it when you know a side and the angle it faces, plus one more side or angle.",
          "Write the two fractions you need and cross-multiply.",
          "For an angle: sin B = b sin A ÷ a. Then check whether 180° − B also fits."
        ],
        exception: "The ambiguous case: with two sides and an angle that is not between them (SSA), sin B gives two angles, B and 180° − B. Both work if the angles still add to less than 180°. If you know two sides and the angle between them, use the cosine rule instead.",
        pic: () => abc({ A: "A", B: "B", a: "a", b: "b", c: "c" }),
        gen() {
          const form = Math.random();
          if (form < 0.5) {
            let A, B;
            do { A = pick([30, 45, 60, 90, 120, 135, 150]); B = pick([30, 45, 60, 90, 120]); } while (A === B || A + B >= 180 || KS[A] === KS[B]);
            const kA = KS[A], kB = KS[B];
            const a = (kA === 4 ? 2 : kA) * R(2, 6);
            const ans = S(a, kA, kA * kB);
            return QV(`In triangle ABC, A = ${A}°, B = ${B}°, and a = ${a}. Find b.`, ans,
              [S(a, kB, kA * kB), S(a, 2, kB), S(a * kB, kA, 1), [String(a), a]],
              `b = a sin B ÷ sin A = ${a} × ${par(SIN[B])} ÷ ${par(SIN[A])} = ${ans[0]}.`, abc({ A: `${A}°`, B: `${B}°`, a, b: "?" }));
          }
          if (form < 0.8) {
            const t = R(2, 9);
            const [A, an, bn, ak, bk, B, sB] = pick([
              [90, 2, 1, 1, 1, 30, "1/2"], [90, 2, 1, 1, 3, 60, "√3/2"], [90, 1, 1, 2, 1, 45, "1/√2"], [120, 1, 1, 3, 1, 30, "1/2"],
              [135, 1, 1, 2, 1, 30, "1/2"], [60, 1, 1, 3, 2, 45, "1/√2"], [60, 1, 1, 3, 1, 30, "1/2"], [45, 1, 1, 2, 1, 30, "1/2"]
            ]);
            const aS = S(an * t, 1, ak)[0], bS = S(bn * t, 1, bk)[0];
            return Q(`In triangle ABC, A = ${A}°, a = ${aS}, and b = ${bS}. Find B.`, `${B}°`, [deg(180 - B), deg(90 - B), ...[30, 45, 60].map(deg)],
              `sin B = b sin A ÷ a = ${bS} × ${par(SIN[A])} ÷ ${aS} = ${sB}, so B = ${B}°. b is shorter than a, so B is smaller than A and 180° − ${B}° does not fit.`,
              abc({ A: `${A}°`, B: "?", a: aS, b: bS }));
          }
          const b = 2 * R(3, 8);
          const h = b / 2;
          const kind = R(0, 3);
          const a = [R(1, h - 1), h, R(h + 1, b - 1), R(b, b + 4)][kind];
          const ans = ["No triangle", "One triangle", "Two triangles", "One triangle"][kind];
          const why = [`${a} is shorter than the height ${h}, so side a cannot reach.`, `a equals the height ${h}, so it just touches: one right-angled triangle.`,
            `${a} is between the height ${h} and b = ${b}, so a can swing to two places: two triangles.`, `a = ${a} is at least b = ${b}, so only one position works.`][kind];
          return Q(`A = 30°, b = ${b}, and a = ${a}. How many triangles fit?`, ans, ["No triangle", "One triangle", "Two triangles"],
            `The height from C is b sin A = ${b} × 1/2 = ${h}. ${why}`, abc({ A: "30°", a, b }));
        },
        worked: [
          {
            problem: "In triangle ABC, A = 45°, B = 60°, and a = 10. Find b.",
            pic: abc({ A: "45°", B: "60°", a: "10", b: "?" }),
            steps: [
              ["Each side over the sine it faces", "b ÷ sin 60° = 10 ÷ sin 45°."],
              ["Cross-multiply", "b = 10 sin 60° ÷ sin 45°."],
              ["Exact values", "b = 10 × (√3/2) ÷ (1/√2) = 10 × √3/2 × √2."],
              ["Tidy", "b = 5√6."]
            ],
            answer: "b = 5√6, about 12.2"
          },
          {
            problem: "Ambiguous case: A = 30°, a = 6 cm, b = 10 cm. Find angle B (to 1 dp).",
            pic: abc({ A: "30°", B: "?", a: "6", b: "10" }),
            steps: [
              ["Sine rule for an angle", "sin B = b sin A ÷ a = 10 × 0.5 ÷ 6 = 5/6."],
              ["Calculator (degree mode)", "B = sin⁻¹(5/6) = 56.4°."],
              ["Sugar: sin is also positive in quadrant II", "The other angle is 180° − 56.4° = 123.6°."],
              ["Check each fits", "30° + 56.4° and 30° + 123.6° are both under 180°, so both work."],
              ["Finish both triangles", "C = 93.6° or C = 26.4°."]
            ],
            answer: "B = 56.4° or B = 123.6° (two triangles)"
          }
        ]
      },
      {
        id: "cosine", name: "Cosine rule", phrase: "Pythagoras with a correction: a² = b² + c² − 2bc cos A.",
        also: "For an angle, flip it round: cos A = (b² + c² − a²) ÷ 2bc.",
        steps: [
          "Use it for two sides and the angle between them (to find the third side).",
          "Or for three sides (to find an angle).",
          "Side: a² = b² + c² − 2bc cos A, then take the root.",
          "Angle: cos A = (b² + c² − a²) ÷ 2bc, then use cos⁻¹."
        ],
        exception: "A must be the angle between b and c. If A is obtuse, cos A is negative, so the correction adds and a gets longer. At A = 90°, the correction is 0 and it is plain Pythagoras. Work out 2bc cos A before subtracting.",
        pic: () => abc({ A: "A", a: "a", b: "b", c: "c" }),
        gen() {
          const form = Math.random();
          if (form < 0.4) {
            let A, b, c;
            if (Math.random() < 0.5) {
              [A, b, c] = pick([[60, 3, 8], [60, 5, 8], [60, 7, 15], [60, 8, 15], [60, 5, 21], [120, 3, 5], [120, 7, 8], [120, 5, 16], [120, 6, 10]]);
              if (Math.random() < 0.5) [b, c] = [c, b];
            } else {
              A = pick([60, 120, 90]);
              do { b = R(2, 9); c = R(2, 9); } while (b === c);
            }
            const corr = A === 60 ? -b * c : A === 120 ? b * c : 0;
            const N = b * b + c * c + corr;
            const ans = S(1, 1, N);
            const cosText = { 60: "1/2", 120: "−1/2", 90: "0" }[A];
            return QV(`b = ${b}, c = ${c}, and A = ${A}°. Find a.`, ans,
              [S(1, 1, b * b + c * c), S(1, 1, b * b + c * c - corr), [String(N), N], [String(Math.abs(b - c)), Math.abs(b - c)], [String(b + c), b + c]],
              `a² = ${b}² + ${c}² − 2 × ${b} × ${c} × cos ${A}° = ${b * b} + ${c * c} ${corr < 0 ? "−" : "+"} ${Math.abs(corr)} = ${N} (cos ${A}° = ${cosText}). So a = ${ans[0]}.`,
              abc({ A: `${A}°`, a: "?", b, c }));
          }
          if (form < 0.7) {
            const k = R(1, 3);
            const [b0, c0, a0, A] = pick([[3, 5, 7, 120], [5, 8, 7, 60], [3, 8, 7, 60], [7, 8, 13, 120], [5, 16, 19, 120], [7, 15, 13, 60], [5, 21, 19, 60], [3, 4, 5, 90], [5, 12, 13, 90]]);
            const [a, b, c] = [a0 * k, b0 * k, c0 * k];
            const top = b * b + c * c - a * a;
            return Q(`a = ${a}, b = ${b}, c = ${c}. Find angle A.`, `${A}°`, [deg(180 - A), "30°", "45°", "150°", "90°"],
              `cos A = (b² + c² − a²) ÷ 2bc = (${b * b} + ${c * c} − ${a * a}) ÷ ${2 * b * c} = ${sfr(top, 2 * b * c)}, so A = ${A}°.`, abc({ A: "?", a, b, c }));
          }
          let a, b, c, top;
          do { b = R(3, 9); c = R(3, 9); a = R(Math.abs(b - c) + 1, Math.min(b + c - 1, 12)); top = b * b + c * c - a * a; } while (!top);
          return Q(`a = ${a}, b = ${b}, c = ${c}. Find cos A as a fraction.`, sfr(top, 2 * b * c),
            [sfr(top, b * c), sfr(-top, 2 * b * c), sfr(a * a + b * b - c * c, 2 * a * b), sfr(a * a + c * c - b * b, 2 * a * c)],
            `cos A = (b² + c² − a²) ÷ 2bc = (${b * b} + ${c * c} − ${a * a}) ÷ ${2 * b * c} = ${sfr(top, 2 * b * c)}.`, abc({ A: "?", a, b, c }));
        },
        worked: [
          {
            problem: "Two boats leave a harbour. One goes 6 km, the other 10 km, and the angle between their paths is 120°. How far apart are they?",
            pic: abc({ A: "120°", a: "?", b: "6", c: "10" }),
            steps: [
              ["Two sides and the angle between: cosine rule", "d² = 6² + 10² − 2 × 6 × 10 × cos 120°."],
              ["cos 120° = −1/2", "2 × 6 × 10 × (−1/2) = −60."],
              ["Minus a minus is plus", "d² = 36 + 100 + 60 = 196."],
              ["Square root", "d = 14."]
            ],
            answer: "14 km"
          },
          {
            problem: "Sine rule, then cosine rule: in triangle ABC, A = 60°, a = 7, and c = 5. Find C, then B, then b.",
            pic: abc({ A: "60°", a: "7", c: "5", b: "?" }),
            steps: [
              ["Sine rule for C", "sin C = c sin A ÷ a = 5 × (√3/2) ÷ 7 = 5√3/14 ≈ 0.619."],
              ["c is shorter than a, so C is acute", "C = sin⁻¹(0.619) ≈ 38.2°."],
              ["Angle sum", "B = 180° − 60° − 38.2° = 81.8°."],
              ["Cosine rule for b", "b² = 7² + 5² − 2 × 7 × 5 × cos 81.8° ≈ 49 + 25 − 10 = 64."],
              ["Square root", "b ≈ 8."]
            ],
            answer: "C ≈ 38.2°, B ≈ 81.8°, b = 8"
          },
          {
            problem: "A triangle has sides 3, 5, and 7. Find its largest angle.",
            pic: abc({ A: "?", a: "7", b: "3", c: "5" }),
            steps: [
              ["The largest angle faces the longest side", "Call it A, facing a = 7."],
              ["Cosine rule for an angle", "cos A = (3² + 5² − 7²) ÷ (2 × 3 × 5) = (9 + 25 − 49) ÷ 30."],
              ["Work it out", "cos A = −15/30 = −1/2."],
              ["Negative cos means obtuse", "A = 120°."]
            ],
            answer: "120°"
          }
        ]
      },
      {
        id: "area", name: "Area with sine", phrase: "Half of two sides times the sine of the angle between.",
        also: "Area = ½ab sin C. For a parallelogram, drop the half.",
        steps: [
          "Pick two sides that meet at a known angle.",
          "Multiply the two sides.",
          "Multiply by the sine of the angle between them.",
          "Halve it."
        ],
        exception: "The angle must be between the two sides you use. An obtuse angle is fine: sin 150° = sin 30° = 1/2. Use sin, not cos.",
        pic: () => abc({ C: "C", a: "a", b: "b" }),
        gen() {
          if (Math.random() < 0.7) {
            const a = R(2, 12), b = R(2, 12);
            const C = pick([30, 45, 60, 90, 120, 135, 150]);
            const k = KS[C];
            const ans = S(a * b, 4, k);
            return QV(`a = ${a}, b = ${b}, and the angle C between them is ${C}°. Find the area.`, ans,
              [S(a * b, 2, k), [sfr(a * b, 2), (a * b) / 2], k === 4 ? null : S(a * b, 4, 4 - k), [String(a * b), a * b], S(a + b, 4, k), S(a * b, 8, k), [String(a + b), a + b]],
              `Area = ½ × ${a} × ${b} × sin ${C}° = ½ × ${a * b} × ${SIN[C]} = ${ans[0]}.`, abc({ C: "C", a: "a", b: "b" }));
          }
          const C = pick([30, 45, 60, 90]);
          let a, b;
          do { a = R(2, 12); b = R(2, 12); } while (C === 30 && (a * b) % 4);
          const area = S(a * b, 4, KS[C])[0];
          return Q(`The area is ${area}, a = ${a}, and b = ${b}. C is not obtuse. Find C.`, `${C}°`, [...[30, 45, 60, 90].map(deg), deg(180 - C)],
            `sin C = 2 × area ÷ ab = ${SIN[C]}, so C = ${C}°.`, abc({ C: "?", a: "a", b: "b" }));
        },
        worked: [
          {
            problem: "Find the area of a triangle with a = 8, b = 10, and C = 30°.",
            pic: abc({ C: "30°", a: "8", b: "10" }),
            steps: [
              ["Half of two sides", "½ × 8 × 10 = 40."],
              ["Times the sine of the angle between", "40 × sin 30° = 40 × 1/2 = 20."]
            ],
            answer: "20 square units"
          },
          {
            problem: "A triangle has sides 5, 7, and 8. Find the angle opposite 7, then the area.",
            pic: abc({ A: "?", a: "7", b: "5", c: "8" }),
            steps: [
              ["Cosine rule for the angle", "cos A = (5² + 8² − 7²) ÷ (2 × 5 × 8) = 40/80 = 1/2, so A = 60°."],
              ["A sits between 5 and 8", "So use those two sides."],
              ["Half of two sides times sin", "½ × 5 × 8 × sin 60° = 20 × √3/2 = 10√3."]
            ],
            answer: "A = 60°, area = 10√3 (about 17.3)"
          },
          {
            problem: "A parallelogram has sides 6 cm and 9 cm with an angle of 135° between them. Find its area.",
            steps: [
              ["A parallelogram is two equal triangles", "So drop the half: area = 6 × 9 × sin 135°."],
              ["sin 135° = sin 45°", "= 1/√2."],
              ["Multiply", "54 × 1/√2 = 54/√2 = 27√2."]
            ],
            answer: "27√2 cm², about 38.2 cm²"
          }
        ]
      },
      {
        id: "compound", name: "Compound angles", phrase: "sin cos cos sin, sign stays. cos cos sin sin, sign swaps.",
        also: "tan(A + B) = (tan A + tan B) ÷ (1 − tan A tan B).",
        steps: [
          "sin(A ± B) = sin A cos B ± cos A sin B.",
          "cos(A ± B) = cos A cos B ∓ sin A sin B.",
          "tan(A ± B) = (tan A ± tan B) ÷ (1 ∓ tan A tan B).",
          "Split an awkward angle into table angles: 75° = 45° + 30°, 15° = 45° − 30°."
        ],
        exception: "sin(A + B) is not sin A + sin B: sin 90° is 1, but sin 60° + sin 30° is about 1.37. In cos the sign flips: cos(A + B) has a minus.",
        pic: () => compTable(),
        gen() {
          const form = Math.random();
          if (form < 0.35) {
            const x = pick([15, 75, 105, 165]);
            const f = pick(["sin", "cos", "tan"]);
            const [ans, naive, why] = EXACT[x][f];
            const pool = f === "tan" ? ["2 + √3", "2 − √3", "−2 − √3", "√3 − 2"] : [C75, C15, N75, N15];
            return Q(`Find ${f} ${x}° exactly.`, ans, [naive, ...pool], why, compTable([[{ sin: 0, cos: 1, tan: 2 }[f], x === 15 ? 2 : 1]]));
          }
          if (form < 0.65) {
            const T = pick([30, 45, 60, 90]);
            const kind = R(1, 4);
            let A, B;
            if (kind % 2) { A = 5 * R(1, T / 5 - 1); B = T - A; } else { B = 5 * R(1, 8); A = T + B; }
            const f = kind <= 2 ? "sin" : "cos";
            const expr = {
              1: `sin ${A}° cos ${B}° + cos ${A}° sin ${B}°`, 2: `sin ${A}° cos ${B}° − cos ${A}° sin ${B}°`,
              3: `cos ${A}° cos ${B}° − sin ${A}° sin ${B}°`, 4: `cos ${A}° cos ${B}° + sin ${A}° sin ${B}°`
            }[kind];
            const i = ANG.indexOf(T);
            const ans = TAB[f][i];
            return Q(expr, ans, [TAB[CO[f]][i], ...TAB.sin], `This is the ${f}(A ${kind % 2 ? "+" : "−"} B) pattern: ${f}(${A}° ${kind % 2 ? "+" : "−"} ${B}°) = ${f} ${T}° = ${ans}.`,
              compTable([[f === "sin" ? 0 : 1, kind % 2 ? 1 : 2]]));
          }
          let a1, b1, c1, a2, b2, c2;
          do {
            [a1, b1, c1] = pick(PRIM); [a2, b2, c2] = pick(PRIM);
            if (Math.random() < 0.5) [a1, b1] = [b1, a1];
            if (Math.random() < 0.5) [a2, b2] = [b2, a2];
          } while (a1 * c2 === a2 * c1);
          const d = c1 * c2;
          const V = {
            "sin(A + B)": [a1 * b2 + b1 * a2, `${a1 * b2} + ${b1 * a2}`, "sin A cos B + cos A sin B"],
            "sin(A − B)": [a1 * b2 - b1 * a2, `${a1 * b2} − ${b1 * a2}`, "sin A cos B − cos A sin B"],
            "cos(A + B)": [b1 * b2 - a1 * a2, `${b1 * b2} − ${a1 * a2}`, "cos A cos B − sin A sin B"],
            "cos(A − B)": [b1 * b2 + a1 * a2, `${b1 * b2} + ${a1 * a2}`, "cos A cos B + sin A sin B"]
          };
          const t = pick(Object.keys(V));
          const [n, text, rule] = V[t];
          return Q(`A and B are acute, sin A = ${a1}/${c1}, and cos B = ${b2}/${c2}. Find ${t}.`, sfr(n, d),
            [...Object.keys(V).filter((k) => k !== t).map((k) => sfr(V[k][0], d)), sfr(a1 * c2 + a2 * c1, d), sfr(-n, d)],
            `Pythagoras: cos A = ${b1}/${c1} and sin B = ${a2}/${c2}. ${t} = ${rule} = (${text})/${d} = ${sfr(n, d)}.`,
            compTable([[t[0] === "s" ? 0 : 1, t.includes("+") ? 1 : 2]]));
        },
        worked: [
          {
            problem: "Find sin 75° exactly.",
            steps: [
              ["Split into table angles", "75° = 45° + 30°."],
              ["sin cos cos sin, sign stays", "sin 45° cos 30° + cos 45° sin 30°."],
              ["Exact values", "(1/√2)(√3/2) + (1/√2)(1/2) = (√3 + 1)/(2√2)."],
              ["Rationalise: × √2/√2", "(√6 + √2)/4."]
            ],
            answer: "(√6 + √2)/4, about 0.966"
          },
          {
            problem: "Find tan 75° exactly.",
            steps: [
              ["Split into table angles", "tan(45° + 30°)."],
              ["tan(A + B) rule", "(tan 45° + tan 30°) ÷ (1 − tan 45° tan 30°) = (1 + 1/√3) ÷ (1 − 1/√3)."],
              ["Clear the small fractions: × √3 top and bottom", "(√3 + 1) ÷ (√3 − 1)."],
              ["Rationalise: × (√3 + 1) top and bottom", "(3 + 2√3 + 1) ÷ (3 − 1) = (4 + 2√3)/2."],
              ["Tidy", "2 + √3."]
            ],
            answer: "2 + √3, about 3.73"
          },
          {
            problem: "A and B are acute, sin A = 3/5, and cos B = 5/13. Find sin(A + B).",
            steps: [
              ["Fill in the missing ratios (Pythagoras)", "cos A = 4/5 and sin B = 12/13."],
              ["sin cos cos sin, sign stays", "sin(A + B) = sin A cos B + cos A sin B."],
              ["Substitute", "(3/5)(5/13) + (4/5)(12/13) = 15/65 + 48/65."],
              ["Add", "63/65."]
            ],
            answer: "63/65"
          }
        ]
      },
      {
        id: "double", name: "Double angles", phrase: "Double the angle: sin 2A = 2 sin A cos A.",
        also: "cos 2A has three faces: cos²A − sin²A, 2cos²A − 1, and 1 − 2sin²A.",
        steps: [
          "Put B = A in the compound formulas.",
          "sin 2A = 2 sin A cos A.",
          "cos 2A = cos²A − sin²A = 2cos²A − 1 = 1 − 2sin²A.",
          "tan 2A = 2 tan A ÷ (1 − tan²A)."
        ],
        exception: "sin 2A is not 2 sin A: sin 60° is √3/2, but 2 sin 30° is 1. Pick the cos 2A face that fits what you know: if only sin is given, use 1 − 2sin²A.",
        pic: () => doubleTable(),
        gen() {
          const form = Math.random();
          if (form < 0.45) {
            let [a, b, c] = pick(PRIM);
            if (Math.random() < 0.5) [a, b] = [b, a];
            const giveSin = Math.random() < 0.5;
            const given = giveSin ? `sin A = ${a}/${c}` : `cos A = ${b}/${c}`;
            const other = giveSin ? `cos A = ${b}/${c}` : `sin A = ${a}/${c}`;
            const t = pick(["sin 2A", "cos 2A", "tan 2A"]);
            const vals = { "sin 2A": sfr(2 * a * b, c * c), "cos 2A": sfr(b * b - a * a, c * c), "tan 2A": sfr(2 * a * b, b * b - a * a) };
            const wrongs = {
              "sin 2A": [sfr(2 * a, c), sfr(a * b, c * c), vals["cos 2A"], sfr(2 * b, c)],
              "cos 2A": [sfr(a * a - b * b, c * c), sfr(c - 2 * a, c), sfr(2 * b, c), vals["sin 2A"]],
              "tan 2A": [sfr(2 * a, b), sfr(-2 * a * b, b * b - a * a), vals["sin 2A"], sfr(2 * b, a)]
            }[t];
            const why = {
              "sin 2A": `sin 2A = 2 sin A cos A = 2 × ${a}/${c} × ${b}/${c} = ${vals["sin 2A"]}.`,
              "cos 2A": `cos 2A = cos²A − sin²A = ${b * b}/${c * c} − ${a * a}/${c * c} = ${vals["cos 2A"]}.`,
              "tan 2A": `tan A = ${sfr(a, b)}. tan 2A = 2 tan A ÷ (1 − tan²A) = ${sfr(2 * a, b)} ÷ ${sfr(b * b - a * a, b * b)} = ${vals["tan 2A"]}.`
            }[t];
            return Q(`A is acute and ${given}. Find ${t}.`, vals[t], wrongs, `${other}. ${why}`, doubleTable());
          }
          if (form < 0.8) {
            const [expr, ans, wrongs, why] = pick(DOUBLE_VALUES);
            return Q(`Find ${expr}`, ans, wrongs, why, doubleTable());
          }
          const [expr, ans, wrongs] = pick(DOUBLE_FORMS);
          return Q(`Which is equal to ${expr}?`, ans, wrongs, `${expr} = ${ans}. ${ans.startsWith("2") ? "Rearrange a face of cos 2A." : "It is one of the double-angle faces."}`);
        },
        worked: [
          {
            problem: "A is acute and sin A = 3/5. Find sin 2A, cos 2A, and tan 2A.",
            steps: [
              ["Fill in cos A", "cos A = 4/5 (3-4-5 triangle)."],
              ["sin 2A = 2 sin A cos A", "2 × 3/5 × 4/5 = 24/25."],
              ["cos 2A: only sin needed, so 1 − 2sin²A", "1 − 2 × 9/25 = 1 − 18/25 = 7/25."],
              ["tan 2A = sin 2A ÷ cos 2A", "(24/25) ÷ (7/25) = 24/7."]
            ],
            answer: "sin 2A = 24/25, cos 2A = 7/25, tan 2A = 24/7"
          },
          {
            problem: "Prove sin 2A ÷ (1 + cos 2A) = tan A.",
            steps: [
              ["Work on the messier left side", "Top: sin 2A = 2 sin A cos A."],
              ["Pick the cos 2A face that kills the 1", "cos 2A = 2cos²A − 1, so 1 + cos 2A = 2cos²A."],
              ["Divide", "2 sin A cos A ÷ 2cos²A = sin A ÷ cos A."],
              ["Name it", "sin A ÷ cos A = tan A, the right side."]
            ],
            answer: "Proved"
          },
          {
            problem: "Find cos²15° − sin²15° without a calculator.",
            steps: [
              ["Spot a face of cos 2A", "cos²A − sin²A = cos 2A with A = 15°."],
              ["Double the angle", "cos 30°."],
              ["Table", "√3/2."]
            ],
            answer: "√3/2"
          }
        ]
      },
      {
        id: "equations", name: "Solving trig equations", phrase: "Find the reference angle, then let ASTC place it.",
        also: "Quadrant I: θ. II: 180° − θ. III: 180° + θ. IV: 360° − θ.",
        steps: [
          "Get the ratio alone, like sin θ = −1/2.",
          "Find the reference angle from the table, ignoring the sign: 30°.",
          "Use ASTC to pick the quadrants where the sign is right: sin negative is III and IV.",
          "Place it: 180° + 30° = 210°, and 360° − 30° = 330°."
        ],
        exception: "Don’t stop at the calculator’s one answer; most equations have two in 0° to 360°. sin θ = 2 has none, because sin and cos stay between −1 and 1. Never divide both sides by sin θ or cos θ; you lose the answers where it is 0. Factor instead.",
        pic: () => wheel([210, 330], { note: "sin θ = −1/2: reference 30°, placed in III and IV" }),
        gen() {
          const show = (list) => `θ = ${list.map((x) => `${x}°`).join(" or ")}`;
          if (Math.random() < 0.2) {
            const SPECIAL = [
              ["sin θ = 0", [0, 180, 360]], ["sin θ = 1", [90]], ["sin θ = −1", [270]], ["cos θ = 0", [90, 270]],
              ["cos θ = 1", [0, 360]], ["cos θ = −1", [180]], ["tan θ = 0", [0, 180, 360]]
            ];
            const [eq, sols] = pick(SPECIAL);
            return Q(`Solve ${eq} for 0° ≤ θ ≤ 360°.`, show(sols), SPECIAL.map((s) => show(s[1])), `Read it off the unit circle: ${show(sols)}.`, wheel([]));
          }
          const f = pick(["sin", "cos", "tan"]);
          const r = pick([30, 45, 60]);
          const pos = Math.random() < 0.5;
          const i = ANG.indexOf(r);
          const mag = TAB[f][i];
          const value = signed(mag, pos);
          const QS = { sin: [[1, 2], [3, 4]], cos: [[1, 4], [2, 3]], tan: [[1, 3], [2, 4]] }[f];
          const qs = QS[pos ? 0 : 1];
          const place = (q) => [r, 180 - r, 180 + r, 360 - r][q - 1];
          const placeText = (q) => [`${r}°`, `180° − ${r}° = ${180 - r}°`, `180° + ${r}° = ${180 + r}°`, `360° − ${r}° = ${360 - r}°`][q - 1];
          const sols = qs.map(place);
          const opp = QS[pos ? 1 : 0].map(place);
          const others = [[1, 2], [3, 4], [1, 4], [2, 3], [1, 3], [2, 4]].map((p) => p.map(place));
          const MAG = { "1/2": ["2", "1"], "√3/2": ["2", "√3"], "1/√2": ["√2", "1"], "1/√3": ["√3", "1"], "√3": ["", "√3"], "1": ["", "1"] };
          const [cf, rhs] = MAG[mag];
          const eq = Math.random() < 0.5 ? `${f} θ = ${value}` : `${cf ? `${cf} ` : ""}${f} θ ${pos ? "−" : "+"} ${rhs} = 0`;
          return Q(`Solve ${eq} for 0° ≤ θ ≤ 360°.`, show(sols), [show(opp), show([pos ? r : place(qs[0])]), ...others.map(show)],
            `${f} θ = ${value}. Reference angle ${r}°. ${f} is ${pos ? "positive" : "negative"} in quadrants ${qs.map((q) => ROMAN[q - 1]).join(" and ")}: ${qs.map(placeText).join(" and ")}.`,
            wheel([r], { note: `reference angle ${r}°` }));
        },
        worked: [
          {
            problem: "Solve 2 sin θ + 1 = 0 for 0° ≤ θ ≤ 360°.",
            pic: wheel([210, 330]),
            steps: [
              ["Get sin alone", "sin θ = −1/2."],
              ["Reference angle (ignore the sign)", "sin 30° = 1/2, so the reference is 30°."],
              ["ASTC: where is sin negative?", "Quadrants III and IV."],
              ["Place it", "III: 180° + 30° = 210°. IV: 360° − 30° = 330°."]
            ],
            answer: "θ = 210° or 330°"
          },
          {
            problem: "Solve 2cos²θ − cos θ − 1 = 0 for 0° ≤ θ ≤ 360°.",
            steps: [
              ["Treat cos θ like x and factor", "(2cos θ + 1)(cos θ − 1) = 0."],
              ["First factor", "cos θ = −1/2: reference 60°, cos negative in II and III, so 120° and 240°."],
              ["Second factor", "cos θ = 1, so θ = 0° or 360°."],
              ["Collect them", "0°, 120°, 240°, 360°."]
            ],
            answer: "θ = 0°, 120°, 240°, or 360°"
          },
          {
            problem: "Solve sin 2θ = sin θ for 0° ≤ θ ≤ 360°.",
            steps: [
              ["Double angle", "2 sin θ cos θ = sin θ."],
              ["Do not divide by sin θ: bring it over and factor", "2 sin θ cos θ − sin θ = 0, so sin θ(2cos θ − 1) = 0."],
              ["sin θ = 0", "θ = 0°, 180°, 360°."],
              ["cos θ = 1/2: reference 60°, quadrants I and IV", "θ = 60° or 360° − 60° = 300°."]
            ],
            answer: "θ = 0°, 60°, 180°, 300°, or 360°"
          }
        ]
      },
      {
        id: "prove", name: "Proving identities", phrase: "Work on the messier side; turn everything into sin and cos.",
        also: "Never cross the = sign: reshape one side until it looks like the other.",
        steps: [
          "Pick the messier side.",
          "Rewrite tan, cot, sec, and cosec in sin and cos.",
          "Combine fractions over one bottom.",
          "Use sin² + cos² = 1 to simplify.",
          "Stop when it matches the other side."
        ],
        exception: "Do not move terms across the = sign or do the same thing to both sides; that assumes what you want to prove. Checking one angle is not a proof, but one angle that fails does disprove it.",
        pic: () => P.chain(["tan θ + cot θ", "sin/cos + cos/sin", "1 ÷ (sin θ cos θ)", "sec θ cosec θ"], ["sin and cos", "one bottom", "flip"]),
        gen() {
          const [expr, ans, wrongs, why] = pick(PROVE);
          return Q(`Which is equal to ${expr}?`, ans, wrongs, why, toolbox());
        },
        worked: [
          {
            problem: "Prove tan θ + cot θ = sec θ cosec θ.",
            pic: toolbox(),
            steps: [
              ["Messier side: the left. Turn it into sin and cos", "sin θ/cos θ + cos θ/sin θ."],
              ["One bottom", "(sin²θ + cos²θ) ÷ (sin θ cos θ)."],
              ["sin² + cos² = 1", "1 ÷ (sin θ cos θ)."],
              ["Split", "(1/cos θ)(1/sin θ) = sec θ cosec θ, the right side."]
            ],
            answer: "Proved"
          },
          {
            problem: "Prove (1 + cos θ)/sin θ + sin θ/(1 + cos θ) = 2 cosec θ.",
            steps: [
              ["Messier side: the left. One bottom", "[(1 + cos θ)² + sin²θ] ÷ [sin θ(1 + cos θ)]."],
              ["Expand the top", "1 + 2cos θ + cos²θ + sin²θ."],
              ["sin² + cos² = 1", "Top = 2 + 2cos θ = 2(1 + cos θ)."],
              ["Cancel (1 + cos θ)", "2 ÷ sin θ."],
              ["Name it", "2 cosec θ, the right side."]
            ],
            answer: "Proved"
          },
          {
            problem: "θ is acute. Prove √[(1 + sin θ)/(1 − sin θ)] = sec θ + tan θ.",
            steps: [
              ["Messier side: the root. × (1 + sin θ) top and bottom", "√[(1 + sin θ)² ÷ (1 − sin²θ)]."],
              ["1 − sin² = cos²", "√[(1 + sin θ)² ÷ cos²θ]."],
              ["Square root (θ acute, so all positive)", "(1 + sin θ) ÷ cos θ."],
              ["Split the fraction", "1/cos θ + sin θ/cos θ = sec θ + tan θ."]
            ],
            answer: "Proved"
          }
        ]
      },
      {
        id: "inverse", name: "Inverse trig", phrase: "sin⁻¹ asks: which angle has this sine?",
        also: "Principal ranges: sin⁻¹ and tan⁻¹ give −90° to 90°. cos⁻¹ gives 0° to 180°.",
        steps: [
          "Read sin⁻¹ x as “the angle whose sine is x”.",
          "Find the reference angle from the table.",
          "Give the one answer in the principal range.",
          "sin⁻¹ and tan⁻¹: negative inputs give negative angles. cos⁻¹: negative inputs give angles from 90° to 180°."
        ],
        exception: "sin⁻¹x is not 1 ÷ sin x; that is cosec x. sin⁻¹ 2 does not exist, because sine never passes 1. cos⁻¹(−1/2) is 120°, not −60°: cos⁻¹ answers live in 0° to 180°.",
        pic: () => wheel([-30], { range: [-90, 90], note: "sin⁻¹ and tan⁻¹ live on the right half" }),
        gen() {
          if (Math.random() < 0.2) {
            const [expr, ans, wrongs, why] = pick([
              ["sin⁻¹(sin 150°)", 30, [150, -30, 60], "sin 150° = 1/2, and the angle from −90° to 90° with sine 1/2 is 30°."],
              ["sin⁻¹(sin 120°)", 60, [120, -60, 30], "sin 120° = √3/2, and the angle from −90° to 90° with that sine is 60°."],
              ["sin⁻¹(sin 135°)", 45, [135, -45, 90], "sin 135° = 1/√2, and the angle from −90° to 90° with that sine is 45°."],
              ["cos⁻¹(cos 300°)", 60, [300, -60, 120], "cos 300° = 1/2, and the angle from 0° to 180° with that cosine is 60°."],
              ["cos⁻¹(cos 240°)", 120, [240, 60, -120], "cos 240° = −1/2, and the angle from 0° to 180° with that cosine is 120°."],
              ["tan⁻¹(tan 120°)", -60, [120, 60, 300], "tan 120° = −√3, and the angle from −90° to 90° with that tangent is −60°."],
              ["tan⁻¹(tan 225°)", 45, [225, -45, 135], "tan 225° = 1, and the angle from −90° to 90° with tangent 1 is 45°."]
            ]);
            return Q(`Find ${expr}`, dg(ans), wrongs.map(dg), why, wheel([], { note: "principal range" }));
          }
          const f = pick(["sin", "cos", "tan"]);
          const i = R(0, f === "tan" ? 3 : 4);
          const mag = TAB[f][i];
          const pos = mag === "0" || Math.random() < 0.5;
          const r = ANG[i];
          const ans = f === "cos" ? (pos ? r : 180 - r) : pos ? r : -r;
          const vs = signed(mag, pos);
          const range = f === "cos" ? "0° to 180°" : "−90° to 90°";
          return Q(`Find ${f}⁻¹(${vs}) in degrees.`, dg(ans), [-ans, 180 - ans, ans < 0 ? 360 + ans : 90 + ans, 90 - ans, f === "cos" ? -r : 180 + ans].map(dg),
            `Which angle from ${range} has ${{ sin: "sine", cos: "cosine", tan: "tangent" }[f]} ${vs}? The reference angle is ${r}°, so it is ${dg(ans)}.`,
            wheel([], { range: f === "cos" ? [0, 180] : [-90, 90], note: `${f}⁻¹ answers: ${range}` }));
        },
        worked: [
          {
            problem: "Find cos⁻¹(−1/2).",
            pic: wheel([120], { range: [0, 180] }),
            steps: [
              ["Which angle has cosine −1/2?", "The reference angle is 60°, because cos 60° = 1/2."],
              ["cos⁻¹ lives in 0° to 180°", "cos is negative in quadrant II of that range."],
              ["Place it", "180° − 60° = 120°."]
            ],
            answer: "120°"
          },
          {
            problem: "Find sin⁻¹(−√3/2).",
            pic: wheel([-60], { range: [-90, 90] }),
            steps: [
              ["Reference angle", "sin 60° = √3/2, so 60°."],
              ["sin⁻¹ lives in −90° to 90°", "A negative sine there means a negative angle."],
              ["Answer", "−60°."]
            ],
            answer: "−60°"
          },
          {
            problem: "Find tan(sin⁻¹(3/5)).",
            steps: [
              ["Name the angle", "Let θ = sin⁻¹(3/5), so sin θ = 3/5 with θ in quadrant I."],
              ["Draw the triangle", "Opposite 3, hypotenuse 5, so adjacent 4."],
              ["TOA", "tan θ = 3/4."]
            ],
            answer: "3/4"
          }
        ]
      }
    ]
  }, "g10");

  /* ---------- Grades 11–12 calculus: new lessons ---------- */

  const CYC = ["sin x", "cos x", "−sin x", "−cos x"];
  const ORD = ["", "", "second ", "third ", "fourth "];

  add("g11", [
    {
      id: "product", name: "Product rule", phrase: "First d-second plus second d-first.",
      also: "d(uv) = u v′ + v u′.",
      steps: ["Name the two factors: first u, second v.", "Keep the first, times the derivative of the second: u v′.", "Add the second times the derivative of the first: v u′.", "Tidy up."],
      exception: "The derivative of a product is not the product of the derivatives: d/dx (x · x) is 2x, not 1. If one factor is just a number, keep it in front; no product rule needed.",
      pic: () => P.roof("d/dx (u · v)", "u · v′ + v · u′", "first d-second plus second d-first"),
      gen() {
        const m = R(2, 5);
        const xm = pow(m), dm = `${m}${pow(m - 1)}`;
        const form = R(1, 4);
        if (form === 1) {
          return Q(`d/dx of ${xm} sin x`, `${xm} cos x + ${dm} sin x`, [`${dm} cos x`, `${xm} cos x − ${dm} sin x`, `${xm} cos x`, `${dm} sin x`],
            `First d-second: ${xm} × cos x. Plus second d-first: sin x × ${dm}.`);
        }
        if (form === 2) {
          return Q(`d/dx of ${xm} cos x`, `${dm} cos x − ${xm} sin x`, [`${dm} cos x + ${xm} sin x`, `−${dm} sin x`, `${xm} sin x`, `−${xm} sin x`],
            `First d-second: ${xm} × (−sin x). Plus second d-first: cos x × ${dm}.`);
        }
        if (form === 3) {
          const k = R(1, 9);
          return Q(`d/dx of ${xm}(x + ${k})`, `${m + 1}${xm} + ${k * m}${pow(m - 1)}`, [dm, `${m + 1}${xm}`, `${xm} + ${k * m}${pow(m - 1)}`, `${m + 1}${xm} + ${k}${pow(m - 1)}`],
            `First d-second: ${xm} × 1. Plus second d-first: (x + ${k}) × ${dm} = ${m}${xm} + ${k * m}${pow(m - 1)}. Total: ${m + 1}${xm} + ${k * m}${pow(m - 1)}.`);
        }
        return Q("d/dx of sin x cos x", "cos²x − sin²x", ["cos²x + sin²x", "−sin x cos x", "sin²x − cos²x"],
          "First d-second: sin x × (−sin x). Plus second d-first: cos x × cos x. Total: cos²x − sin²x.");
      },
      worked: [
        {
          problem: "Differentiate y = x³ sin x.",
          steps: [
            ["Name the factors", "First u = x³, second v = sin x."],
            ["Their derivatives", "u′ = 3x², v′ = cos x."],
            ["First d-second", "x³ cos x."],
            ["Plus second d-first", "+ 3x² sin x."]
          ],
          answer: "dy/dx = x³ cos x + 3x² sin x"
        },
        {
          problem: "Differentiate y = (2x + 1)(x² − 3), and check by expanding.",
          steps: [
            ["Name the factors", "u = 2x + 1, v = x² − 3. u′ = 2, v′ = 2x."],
            ["First d-second", "(2x + 1)(2x) = 4x² + 2x."],
            ["Second d-first", "(x² − 3)(2) = 2x² − 6."],
            ["Add", "6x² + 2x − 6."],
            ["Check by expanding first", "y = 2x³ + x² − 6x − 3, so dy/dx = 6x² + 2x − 6. It matches."]
          ],
          answer: "dy/dx = 6x² + 2x − 6"
        },
        {
          problem: "Find the gradient of y = x² cos x at x = π.",
          steps: [
            ["First d-second plus second d-first", "dy/dx = x²(−sin x) + cos x(2x) = 2x cos x − x² sin x."],
            ["Put in x = π", "2π cos π − π² sin π."],
            ["cos π = −1, sin π = 0", "2π(−1) − 0 = −2π."]
          ],
          answer: "−2π"
        }
      ]
    },
    {
      id: "chain", name: "Chain rule", phrase: "Derivative of the outside, keep the inside, times derivative of the inside.",
      also: "dy/dx = dy/du × du/dx.",
      steps: ["Spot the inside (the bracket) and the outside (what is done to it).", "Differentiate the outside, leaving the inside alone.", "Multiply by the derivative of the inside."],
      exception: "Don’t forget the last “times”: d/dx (3x + 1)⁵ is 15(3x + 1)⁴, not 5(3x + 1)⁴. Keep the inside unchanged inside the outside’s derivative.",
      pic: () => P.chain(["(3x + 1)⁵", "5(3x + 1)⁴", "15(3x + 1)⁴"], ["outside, keep inside", "× 3 (inside)"]),
      gen() {
        const form = R(1, 4);
        if (form === 1) {
          const a = R(2, 5), b = R(1, 9), n = R(2, 6);
          const inner = `(${a}x + ${b})`;
          return Q(`d/dx of ${inner}${sup(n)}`, `${n * a}${inner}${sup(n - 1)}`, [`${n}${inner}${sup(n - 1)}`, `${n * a}${inner}${sup(n)}`, `${a}${inner}${sup(n - 1)}`],
            `Outside: ${n}${inner}${sup(n - 1)}. Inside: ${a}x + ${b} gives ${a}. ${n} × ${a} = ${n * a}.`);
        }
        if (form === 2) {
          const k = R(2, 9);
          if (Math.random() < 0.5) {
            return Q(`d/dx of sin ${k}x`, `${k} cos ${k}x`, [`cos ${k}x`, `−${k} cos ${k}x`, `${k} cos x`], `Outside: sin → cos, keep ${k}x. Inside: ${k}x gives ${k}.`);
          }
          return Q(`d/dx of cos ${k}x`, `−${k} sin ${k}x`, [`${k} sin ${k}x`, `−sin ${k}x`, `−${k} sin x`], `Outside: cos → −sin, keep ${k}x. Inside: ${k}x gives ${k}.`);
        }
        if (form === 3) {
          const c = R(1, 9), n = R(2, 5);
          const inner = `(x² + ${c})`;
          return Q(`d/dx of ${inner}${sup(n)}`, `${2 * n}x${inner}${sup(n - 1)}`, [`${n}${inner}${sup(n - 1)}`, `${2 * n}x${inner}${sup(n)}`, `${n}x${inner}${sup(n - 1)}`],
            `Outside: ${n}${inner}${sup(n - 1)}. Inside: x² + ${c} gives 2x. ${n} × 2x = ${2 * n}x.`);
        }
        const p = R(2, 4);
        const f = pick(["sin", "cos"]);
        const d = `${p}${pow(p - 1)}`;
        return f === "sin"
          ? Q(`d/dx of sin(${pow(p)})`, `${d} cos(${pow(p)})`, [`cos(${pow(p)})`, `cos(${d})`, `−${d} cos(${pow(p)})`], `Outside: sin → cos, keep ${pow(p)}. Inside: ${pow(p)} gives ${d}.`)
          : Q(`d/dx of cos(${pow(p)})`, `−${d} sin(${pow(p)})`, [`−sin(${pow(p)})`, `${d} sin(${pow(p)})`, `−sin(${d})`], `Outside: cos → −sin, keep ${pow(p)}. Inside: ${pow(p)} gives ${d}.`);
      },
      worked: [
        {
          problem: "Differentiate y = (3x + 1)⁵.",
          steps: [
            ["Spot inside and outside", "Inside: 3x + 1. Outside: (something)⁵."],
            ["Derivative of the outside, keep the inside", "5(3x + 1)⁴."],
            ["Times derivative of the inside", "× 3."],
            ["Tidy", "15(3x + 1)⁴."]
          ],
          answer: "dy/dx = 15(3x + 1)⁴"
        },
        {
          problem: "Differentiate y = sin(x²).",
          steps: [
            ["Spot inside and outside", "Inside: x². Outside: sin."],
            ["Derivative of the outside, keep the inside", "cos(x²)."],
            ["Times derivative of the inside", "× 2x."]
          ],
          answer: "dy/dx = 2x cos(x²)"
        },
        {
          problem: "Find the gradient of y = √(x² + 9) at x = 4.",
          steps: [
            ["Write the root as a power", "y = (x² + 9)^(1/2)."],
            ["Outside, keep the inside", "½(x² + 9)^(−1/2)."],
            ["Times the inside’s derivative, 2x", "dy/dx = x ÷ √(x² + 9)."],
            ["Put in x = 4", "4 ÷ √25 = 4/5."]
          ],
          answer: "4/5"
        }
      ]
    },
    {
      id: "trigdiff", name: "Derivatives of sin and cos", phrase: "sin → cos → −sin → −cos → sin: each derivative is one step round the cycle.",
      also: "Four steps bring you back to the start.",
      steps: ["Write the cycle: sin x, cos x, −sin x, −cos x.", "Each derivative moves one step to the right.", "After −cos x, go back to sin x.", "Numbers in front just come along."],
      exception: "Only in radians. In degrees, an extra π/180 appears. Watch the sign: d/dx cos x is −sin x, not sin x.",
      pic: () => P.chain(["sin x", "cos x", "−sin x", "−cos x", "sin x"], ["d/dx", "d/dx", "d/dx", "d/dx"]),
      gen() {
        if (Math.random() < 0.7) {
          const i = R(0, 3), k = R(1, 4);
          const ans = CYC[(i + k) % 4];
          const path = Array.from({ length: k + 1 }, (_, j) => CYC[(i + j) % 4]).join(" → ");
          const start = CYC[i] === ans ? "f(x)" : CYC[i];
          return Q(k === 1 ? `d/dx of ${CYC[i]}` : `The ${ORD[k]}derivative of ${CYC[i]}`, ans, CYC,
            `${k} step${k > 1 ? "s" : ""} round the cycle: ${path}.`, P.chain([start, ...Array(k).fill("→"), "?"], ["d/dx", ...Array(k).fill("")]));
        }
        const a = R(2, 9), b = R(2, 9);
        return Q(`d/dx of ${a} sin x + ${b} cos x`, `${a} cos x − ${b} sin x`, [`${a} cos x + ${b} sin x`, `−${a} cos x + ${b} sin x`, `${b} cos x − ${a} sin x`],
          `sin x → cos x, and cos x → −sin x. The ${a} and ${b} come along.`, P.roof(`${a} sin x + ${b} cos x`, "?", "d/dx"));
      },
      worked: [
        {
          problem: "Differentiate y = 3 sin x − 2 cos x.",
          steps: [
            ["One step round the cycle for sin", "3 sin x → 3 cos x."],
            ["One step for cos", "cos x → −sin x, so −2 cos x → −2(−sin x) = 2 sin x."],
            ["Put together", "3 cos x + 2 sin x."]
          ],
          answer: "dy/dx = 3 cos x + 2 sin x"
        },
        {
          problem: "y = sin x. Show that d²y/dx² + y = 0.",
          steps: [
            ["One step", "dy/dx = cos x."],
            ["Two steps", "d²y/dx² = −sin x."],
            ["Add y", "−sin x + sin x = 0."]
          ],
          answer: "Shown: d²y/dx² + y = 0"
        },
        {
          problem: "Find the gradient of y = sin x + cos x at x = π/4.",
          steps: [
            ["Step each round the cycle", "dy/dx = cos x − sin x."],
            ["Put in π/4 (that is 45°)", "cos 45° − sin 45° = 1/√2 − 1/√2."],
            ["Work it out", "0, so the curve is flat there (its top)."]
          ],
          answer: "0"
        }
      ]
    }
  ], "power");

  add("g11", [
    {
      id: "logdef", name: "What a log means", phrase: "log asks: what power?",
      also: "log₂ 8 = 3 means 2³ = 8. The base stays the base.",
      steps: ["Read log₂ 8 as “2 to what power gives 8?”", "Write it as a power: 2^? = 8.", "2³ = 8, so log₂ 8 = 3.", "log with no base means base 10."],
      exception: "You can only take the log of a positive number: log₂ 0 and log₂(−4) do not exist. For every base, log 1 = 0 and the log of the base itself is 1.",
      pic: () => P.roof("log₂ 8", "3", "2 to what power gives 8? 2³ = 8"),
      gen() {
        const b = pick([2, 3, 4, 5, 10]);
        const form = Math.random();
        if (form < 0.6) {
          const top = { 2: 6, 3: 4, 4: 3, 5: 3, 10: 4 }[b];
          const k = R(-2, top);
          const x = k >= 0 ? String(b ** k) : `1/${b ** -k}`;
          const arg = k >= 0 ? x : `(${x})`;
          return Q(`${lg(b)} ${arg}`, neg(k), [neg(k + 1), neg(k - 1), neg(-k), k > 1 ? String(b ** k / b) : null, neg(b * k)],
            `${b} to what power gives ${x}? ${b}${k === 1 ? "¹" : sup(k)} = ${x}, so the answer is ${neg(k)}.`, P.roof(`${lg(b)} ${arg}`, "?", `${b} to what power gives ${x}?`));
        }
        const k = R(2, b === 10 ? 3 : 4);
        if (form < 0.8) {
          return Q(`Solve ${lg(b)} x = ${k}. Find x.`, String(b ** k), [b * k, k ** b, b + k, b ** (k - 1), b ** (k + 1), 2 * b ** k],
            `log asks what power: ${b}${sup(k)} = x, so x = ${b ** k}.`);
        }
        return Q(`Write ${b}${sup(k)} = ${b ** k} as a log.`, `${lg(b)} ${b ** k} = ${k}`, [`${lg(b)} ${k} = ${b ** k}`, `${lg(k)} ${b ** k} = ${b}`, `log${sub(b ** k)} ${b} = ${k}`],
          `The base stays the base, and the log is the power: ${lg(b)} ${b ** k} = ${k}.`);
      },
      worked: [
        {
          problem: "Find log₂ 64.",
          steps: [
            ["log asks: what power?", "2 to what power gives 64?"],
            ["Count the doublings", "2, 4, 8, 16, 32, 64: that is 2⁶."]
          ],
          answer: "6"
        },
        {
          problem: "Solve log₃(x − 1) = 2.",
          steps: [
            ["Turn the log into a power", "3² = x − 1."],
            ["Work it out", "9 = x − 1, so x = 10."],
            ["Check the inside is positive", "10 − 1 = 9 > 0, so it is fine."]
          ],
          answer: "x = 10"
        },
        {
          problem: "Find log₅(1/25).",
          steps: [
            ["log asks: what power?", "5^? = 1/25."],
            ["A fraction means a negative power", "1/25 = 1/5² = 5⁻²."]
          ],
          answer: "−2"
        }
      ]
    },
    {
      id: "loglaws", name: "Log laws", phrase: "Multiply → add, divide → subtract, power → front.",
      steps: ["log(mn) = log m + log n.", "log(m ÷ n) = log m − log n.", "log(mᵏ) = k log m.", "Use them backwards to squash several logs into one."],
      exception: "There is no rule for log(m + n): it is not log m + log n. log m ÷ log n is not log(m ÷ n). Every log must have the same base.",
      pic: () => P.table(["Inside the log", "Outside"], [["multiply m × n", "add"], ["divide m ÷ n", "subtract"], ["power mᵏ", "k in front"]], { note: "Multiply → add, divide → subtract, power → front." }),
      gen() {
        if (Math.random() < 0.5) {
          const [b, k] = pick([[6, 2], [10, 2], [10, 3], [2, 3], [2, 4], [2, 5], [3, 2], [3, 3], [3, 4], [12, 2], [5, 2], [5, 3]]);
          const N = b ** k;
          const isPow = (m) => { let x = m; while (x % b === 0) x /= b; return x === 1; };
          if (Math.random() < 0.5) {
            const divs = [];
            for (let m = 2; m < N; m += 1) if (N % m === 0) divs.push(m);
            const nice = divs.filter((m) => !isPow(m) && !isPow(N / m));
            const m = pick(nice.length ? nice : divs);
            return Q(`${lg(b)} ${m} + ${lg(b)} ${N / m}`, String(k), [k + 1, k - 1, 2 * k, `${lg(b)} ${m + N / m}`],
              `Multiply → add, used backwards: ${lg(b)} (${m} × ${N / m}) = ${lg(b)} ${N} = ${k}, since ${b}${sup(k)} = ${N}.`);
          }
          let m;
          do { m = R(2, 9); } while (isPow(m));
          return Q(`${lg(b)} ${N * m} − ${lg(b)} ${m}`, String(k), [k + 1, k - 1, 2 * k, `${lg(b)} ${N * m - m}`],
            `Divide → subtract, used backwards: ${lg(b)} (${N * m} ÷ ${m}) = ${lg(b)} ${N} = ${k}.`);
        }
        const form = R(1, 3);
        if (form === 1) {
          const p = R(2, 9), q = R(2, 9);
          return Q(`Write log ${p} + log ${q} as one log.`, `log ${p * q}`, [`log ${p + q}`, `log ${p}${sup(q)}`, `2 log ${p * q}`], `Multiply → add: log ${p} + log ${q} = log (${p} × ${q}) = log ${p * q}.`);
        }
        if (form === 2) {
          const p = R(2, 9), q = R(2, 9);
          return Q(`Write log ${p * q} − log ${q} as one log.`, `log ${p}`, [`log ${p * q - q}`, `log ${p * q * q}`, `log ${p * q} ÷ log ${q}`], `Divide → subtract: log (${p * q} ÷ ${q}) = log ${p}.`);
        }
        const k = R(2, 3);
        let p;
        do { p = R(2, 5); } while (p === k);
        return Q(`Write ${k} log ${p} as one log.`, `log ${p ** k}`, [`log ${p * k}`, `log ${k ** p}`, `log ${p + k}`], `Power → front, used backwards: ${k} log ${p} = log ${p}${sup(k)} = log ${p ** k}.`);
      },
      worked: [
        {
          problem: "Find log₂ 40 − log₂ 5.",
          steps: [
            ["Divide → subtract, backwards", "log₂(40 ÷ 5) = log₂ 8."],
            ["log asks: what power?", "2³ = 8, so the answer is 3."]
          ],
          answer: "3"
        },
        {
          problem: "Find 2 log 5 + log 4 (base 10).",
          steps: [
            ["Power → front, backwards", "2 log 5 = log 5² = log 25."],
            ["Multiply → add, backwards", "log 25 + log 4 = log 100."],
            ["log asks: what power?", "10² = 100, so the answer is 2."]
          ],
          answer: "2"
        },
        {
          problem: "Solve log₂ x + log₂(x − 2) = 3.",
          steps: [
            ["Multiply → add, backwards", "log₂[x(x − 2)] = 3."],
            ["Turn the log into a power", "x(x − 2) = 2³ = 8."],
            ["Solve the quadratic", "x² − 2x − 8 = 0, so (x − 4)(x + 2) = 0, and x = 4 or x = −2."],
            ["Logs need positive insides", "x = −2 would mean log₂(−2), which does not exist. Reject it."]
          ],
          answer: "x = 4"
        }
      ]
    }
  ]);

  /* ---------- Grades 11–12 calculus: worked problems for the existing lessons ---------- */

  patch("g11", "power", {
    worked: [
      {
        problem: "Differentiate y = 4x³ − 5x² + 7x − 9, then find the gradient at x = 2.",
        steps: [
          ["Bring the power down, take one off: 4x³", "12x²."],
          ["Same for −5x²", "−10x."],
          ["7x is 7x¹", "7."],
          ["A constant on its own", "−9 becomes 0. So dy/dx = 12x² − 10x + 7."],
          ["Put in x = 2", "48 − 20 + 7 = 35."]
        ],
        answer: "dy/dx = 12x² − 10x + 7, gradient 35"
      },
      {
        problem: "Differentiate y = 6√x.",
        steps: [
          ["Write the root as a power", "y = 6x^(1/2)."],
          ["Bring the power down", "6 × ½ = 3."],
          ["Take one off the power", "½ − 1 = −½, so dy/dx = 3x^(−1/2)."],
          ["Write it back as a root", "3 ÷ √x."]
        ],
        answer: "dy/dx = 3/√x"
      },
      {
        problem: "Differentiate y = 2/x³.",
        steps: [
          ["Write it as a power", "y = 2x⁻³."],
          ["Bring the power down", "2 × (−3) = −6."],
          ["Take one off the power", "−3 − 1 = −4, so dy/dx = −6x⁻⁴."],
          ["Write it as a fraction", "−6 ÷ x⁴."]
        ],
        answer: "dy/dx = −6/x⁴"
      }
    ]
  });

  patch("g11", "quotient", {
    worked: [
      {
        problem: "Differentiate y = (x² + 1) ÷ (x − 1).",
        steps: [
          ["Name them", "High = x² + 1, d-high = 2x. Low = x − 1, d-low = 1."],
          ["Low d-high", "(x − 1)(2x) = 2x² − 2x."],
          ["Minus high d-low", "− (x² + 1)(1) = −x² − 1."],
          ["Over the low squared", "(x² − 2x − 1) ÷ (x − 1)²."]
        ],
        answer: "dy/dx = (x² − 2x − 1)/(x − 1)²"
      },
      {
        problem: "Differentiate y = sin x ÷ x.",
        steps: [
          ["Name them", "High = sin x, d-high = cos x. Low = x, d-low = 1."],
          ["Low d-high minus high d-low", "x cos x − sin x."],
          ["Over the low squared", "(x cos x − sin x) ÷ x²."]
        ],
        answer: "dy/dx = (x cos x − sin x)/x²"
      },
      {
        problem: "Show that d/dx (tan x) = sec²x.",
        steps: [
          ["Write tan as a quotient", "tan x = sin x ÷ cos x."],
          ["Low d-high minus high d-low", "cos x · cos x − sin x · (−sin x) = cos²x + sin²x."],
          ["sin² + cos² = 1", "The top is 1."],
          ["Over the low squared", "1 ÷ cos²x = sec²x."]
        ],
        answer: "d/dx (tan x) = sec²x"
      }
    ]
  });

  patch("g11", "integral", {
    worked: [
      {
        problem: "Find ∫ (3x² + 4x − 5) dx.",
        steps: [
          ["3x²: raise to 3, divide by 3", "x³."],
          ["4x: raise to 2, divide by 2", "2x²."],
          ["−5 is −5x⁰: raise to 1", "−5x."],
          ["Add C", "x³ + 2x² − 5x + C."]
        ],
        answer: "x³ + 2x² − 5x + C"
      },
      {
        problem: "Find ∫ x² dx from x = 1 to x = 3.",
        steps: [
          ["Raise the power, divide by the new power", "x³/3 (no C needed for a definite integral)."],
          ["Top limit", "3³/3 = 9."],
          ["Bottom limit", "1³/3 = 1/3."],
          ["Top minus bottom", "9 − 1/3 = 26/3."]
        ],
        answer: "26/3"
      },
      {
        problem: "Find ∫ 1/x² dx.",
        steps: [
          ["Write it as a power", "x⁻²."],
          ["Raise the power by one", "−2 + 1 = −1."],
          ["Divide by the new power", "x⁻¹ ÷ (−1) = −x⁻¹."],
          ["Add C and tidy", "−1/x + C."]
        ],
        answer: "−1/x + C"
      }
    ]
  });
})();
