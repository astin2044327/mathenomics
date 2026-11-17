/** High School: SEE send-up mnemonics + theorem/proof cards (geo & trig). */
(function () {
  if (!window.MK) return;
  const { P, R, pick, gcd, fr, Q, TRIPLES, course } = window.MK;
  const { box, T, line, poly, circle, dot, right, side, arc } = P.kit;
  const ACC = "var(--accent)";

  const near = (ans, extras = []) =>
    [...extras, ans + 1, ans - 1, ans + 2, ans - 2, ans * 2, Math.floor(ans / 2), ans + 10]
      .filter((x) => Number.isFinite(x) && x !== ans && String(x) !== String(ans));

  const sfr = (n, d) => fr(n, d).replace("-", "−");
  const deg = (x) => `${x}°`;

  function vennPic(note) {
    let body = circle(120, 110, 70, { w: 2.5 }) + circle(200, 110, 70, { w: 2.5 });
    body += T(95, 100, "A", { size: 16 }) + T(220, 100, "B", { size: 16 });
    body += T(160, 110, "∩", { size: 14, fill: ACC });
    body += T(160, 210, note || "only / both / neither", { size: 13 });
    return box(320, 230, body, "Venn survey");
  }

  function heronPic(a, b, c, s) {
    const A = [40, 190], B = [280, 190], C = [150, 40];
    let body = poly([A, B, C]);
    body += side(B, C, [160, 120], a) + side(C, A, [100, 120], b) + side(A, B, [160, 170], c);
    body += T(160, 220, s != null ? `s = ${s}` : "s = (a+b+c)/2", { size: 13 });
    return box(320, 236, body, "Heron’s formula");
  }

  function pyramidPic(note) {
    const tip = [160, 28], base = [[60, 190], [260, 190], [230, 140], [90, 140]];
    let body = poly([tip, base[0], base[1]], { fill: "var(--accent-soft)" });
    body += poly([base[0], base[1], base[2], base[3]], { fill: "var(--paper2)" });
    body += line(tip[0], tip[1], base[2][0], base[2][1], { dash: "5 4" }) + line(tip[0], tip[1], base[3][0], base[3][1], { dash: "5 4" });
    body += T(160, 220, note || "V = (1/3) × base area × height", { size: 12 });
    return box(320, 236, body, "Pyramid");
  }

  function treePic(note) {
    let body = T(160, 28, "start", { size: 14 });
    body += line(160, 40, 90, 90) + line(160, 40, 230, 90);
    body += T(70, 108, "A", { size: 15 }) + T(250, 108, "A′", { size: 15 });
    body += line(90, 118, 50, 170) + line(90, 118, 130, 170);
    body += line(230, 118, 190, 170) + line(230, 118, 270, 170);
    body += T(40, 190, "B", { size: 13 }) + T(130, 190, "B′", { size: 13 });
    body += T(180, 190, "B", { size: 13 }) + T(280, 190, "B′", { size: 13 });
    body += T(160, 220, note || "multiply along a branch", { size: 12 });
    return box(320, 236, body, "Probability tree");
  }

  function bisectorPic(a, b, c, d) {
    const A = [40, 190], B = [280, 190], C = [160, 40];
    const t = typeof a === "number" && typeof b === "number" ? a / (a + b) : 0.4;
    const Pnt = [A[0] + (B[0] - A[0]) * t, A[1]];
    let body = poly([A, B, C]) + line(C[0], C[1], Pnt[0], Pnt[1], { stroke: ACC, w: 3 });
    body += side(C, A, [140, 140], a) + side(C, B, [180, 140], b);
    body += side(A, Pnt, [140, 170], c) + side(Pnt, B, [200, 170], d);
    return box(320, 214, body, "Angle bisector theorem");
  }

  function abc(o = {}) {
    const A = [40, 184], B = [286, 184], C = [196, 46];
    const mid = [174, 140];
    let body = poly([A, B, C]) + T(26, 202, "A") + T(302, 202, "B") + T(196, 32, "C");
    if (o.A) body += arc(A, B, C, 30, o.A, { size: 13 });
    if (o.B) body += arc(B, A, C, 30, o.B, { size: 13 });
    if (o.C) body += arc(C, A, B, 24, o.C, { size: 13 });
    if (o.a != null) body += side(B, C, mid, o.a);
    if (o.b != null) body += side(C, A, mid, o.b);
    if (o.c != null) body += side(A, B, mid, o.c);
    return box(320, 214, body, "Triangle ABC");
  }

  function twoTangPic(t) {
    const O = [160, 120], A = [90, 70], B = [230, 70], Pp = [160, 30];
    let body = circle(O[0], O[1], 55) + line(Pp[0], Pp[1], A[0], A[1]) + line(Pp[0], Pp[1], B[0], B[1]);
    body += line(O[0], O[1], A[0], A[1], { dash: "5 4" }) + line(O[0], O[1], B[0], B[1], { dash: "5 4" });
    body += right(A, O, Pp) + right(B, O, Pp) + dot(O, "O", 0, 16) + dot(Pp, "P", 0, -12);
    body += T(160, 210, t != null ? `PA = PB = ${t}` : "PA = PB", { size: 13 });
    return box(320, 226, body, "Equal tangents");
  }

  function altSegPic(a, b) {
    const O = [160, 120], Tt = [90, 70], C = [230, 70], R = [220, 170];
    let body = circle(O[0], O[1], 70);
    body += line(40, 70, 300, 70) + line(Tt[0], Tt[1], C[0], C[1]) + line(Tt[0], Tt[1], R[0], R[1]);
    body += T(70, 58, a || "α", { size: 14, fill: ACC }) + T(200, 150, b || "α", { size: 14 });
    body += dot(Tt, "T", -14, -4) + dot(O, "");
    return box(320, 214, body, "Alternate segment");
  }

  course({
    id: "hs",
    grade: "High School",
    title: "Theorems & proofs",
    color: "#3D4F5F",
    blurb: "SEE send-up mnemonics and theorem cards: proof moves, exceptions, and exam-style drills for geo + trig.",
    cheat: [
      {
        title: "SEE Group A hooks",
        rows: [
          ["Heron", "s = (a+b+c)/2; Area = √[s(s−a)(s−b)(s−c)]"],
          ["Depreciation", "A = P(1 − r/100)^n"],
          ["Compound / population", "A = P(1 + r/100)^n"],
          ["Ages after n", "Add n to every age; write the new equation"],
          ["Quartile class", "L + ((N/4 − cf)/f)·h  (same shape for median with N/2)"]
        ]
      },
      {
        title: "Geo & trig theorems",
        rows: [
          ["Pythagoras", "a² + b² = c² (right triangle)"],
          ["BPT", "Parallel cut → same side ratios"],
          ["Midsegment", "Join midpoints → half base, parallel"],
          ["Center / rim", "Angle at center = 2 × angle at rim"],
          ["Cyclic opp", "Opposite angles sum to 180°"],
          ["Tangent ⊥ radius", "Radius meets tangent at 90°"],
          ["Alt. segment", "Tangent–chord = angle in alternate segment"],
          ["SOH CAH TOA", "opp/hyp · adj/hyp · opp/adj"],
          ["ASTC", "All Sugar Tea Coffee (signs by quadrant)"],
          ["Sine rule", "a/sin A = b/sin B = c/sin C"],
          ["Cosine rule", "a² = b² + c² − 2bc cos A"],
          ["Area (sine)", "½ab sin C"],
          ["Heights & distances", "Use g10 · Heights (elevation / depression) — not duplicated here"]
        ]
      },
      {
        title: "SEE Groups B–D quick",
        rows: [
          ["Sets", "n(A∪B)=n(A)+n(B)−n(A∩B); only A = n(A)−n(A∩B)"],
          ["VAT / commission", "% of marked or sale; check of what"],
          ["Currency", "× rate to convert; % change on the rate"],
          ["Pyramid", "V = (1/3)Bh"],
          ["Tree P", "Multiply along a branch; add mutually exclusive paths"]
        ]
      }
    ],
    lessons: [
      /* ========== Priority SEE gaps ========== */
      {
        id: "heron",
        name: "Heron’s formula",
        tag: "SEE",
        phrase: "s = (a+b+c)/2. Area = √[s(s−a)(s−b)(s−c)].",
        also: "Semi-perimeter first — then the product under the root.",
        steps: [
          "Add the three sides and halve: s = (a+b+c)/2.",
          "Write s−a, s−b, s−c.",
          "Area = √[s(s−a)(s−b)(s−c)]. Take the positive root."
        ],
        exception: "Sides must form a triangle (triangle inequality). s is half the perimeter, not the area. Do not skip the square root.",
        pic: () => heronPic(5, 5, 6, 8),
        gen() {
          if (Math.random() < 0.45) {
            const a = R(5, 12), b = R(5, 12), c = R(Math.abs(a - b) + 1, a + b - 1);
            const s = (a + b + c) / 2;
            const ans = s % 1 === 0 ? s : sfr(a + b + c, 2);
            return Q(`Sides ${a}, ${b}, ${c}. Find the semi-perimeter s.`, ans,
              near(typeof ans === "number" ? ans : (a + b + c) / 2, [a + b + c, (a + b + c) / 3, a + b]),
              `s = (${a}+${b}+${c})/2 = ${ans}.`, heronPic(a, b, c, "?"));
          }
          const sides = pick([[5, 5, 4], [5, 5, 6], [5, 5, 8], [6, 6, 6], [13, 14, 15]]);
          const [a, b, c] = sides;
          const s = (a + b + c) / 2;
          const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
          const ans = Number.isInteger(area) ? area : Math.round(area * 100) / 100;
          return Q(`Sides ${a}, ${b}, ${c}. Find the area (Heron).`, ans,
            near(Math.round(area), [s, a + b + c, Math.round(area) + 2]),
            `s = ${s}. Area = √[${s}(${s - a})(${s - b})(${s - c})] = ${ans}.`, heronPic(a, b, c, s));
        },
        worked: [
          {
            problem: "A triangle has sides 13, 14, 15. Find its area.",
            steps: [
              ["Semi-perimeter", "s = (13+14+15)/2 = 21."],
              ["Product", "21(21−13)(21−14)(21−15) = 21·8·7·6."],
              ["Root", "√7056 = 84."]
            ],
            answer: "84"
          }
        ]
      },
      {
        id: "compound",
        name: "Compound / depreciation / population",
        tag: "SEE",
        phrase: "Grow: A = P(1 + r/100)^n. Depreciate: A = P(1 − r/100)^n.",
        also: "Population and compound interest share the growth form.",
        steps: [
          "Write P (start), r% per period, n periods.",
          "Growth / compound / population: multiply by (1 + r/100) each period.",
          "Depreciation / decay: multiply by (1 − r/100) each period.",
          "Raise to n, then multiply by P."
        ],
        exception: "Simple interest is P + Prt/100 — no power. Depreciation uses minus, not plus. n is the number of compounding periods, not always calendar years if compounded half-yearly.",
        pic: () => P.roof("P", "P(1±r/100)^n", "grow + · decay −"),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const P0 = pick([1000, 2000, 5000, 8000]);
            const r = pick([5, 10, 20]);
            const n = pick([1, 2]);
            const ans = Math.round(P0 * Math.pow(1 + r / 100, n));
            return Q(`Principal ${P0} at ${r}% compound for ${n} year${n > 1 ? "s" : ""}. Find amount.`, ans,
              near(ans, [P0 + (P0 * r * n) / 100, P0 * (1 + r / 100), P0]),
              `A = ${P0}(1+${r}/100)^${n} = ${ans}.`, P.roof(`${P0}`, String(ans), "compound growth"));
          }
          if (form === 2) {
            const P0 = pick([10000, 20000, 50000]);
            const r = pick([10, 20]);
            const n = R(1, 2);
            const ans = Math.round(P0 * Math.pow(1 - r / 100, n));
            return Q(`Machine worth ${P0} depreciates ${r}% per year for ${n} year${n > 1 ? "s" : ""}. Value now?`, ans,
              near(ans, [P0 - (P0 * r * n) / 100, P0 * (1 - r / 100), P0]),
              `A = ${P0}(1−${r}/100)^${n} = ${ans}.`, P.roof(`${P0}`, String(ans), "depreciation"));
          }
          const P0 = pick([2000, 5000, 10000]);
          const r = pick([2, 5, 10]);
          const n = 2;
          const ans = Math.round(P0 * Math.pow(1 + r / 100, n));
          return Q(`Population ${P0} grows ${r}% per year for ${n} years. New population?`, ans,
            near(ans, [P0 + (P0 * r * n) / 100, P0 * (1 + r / 100)]),
            `Same as compound: ${P0}(1+${r}/100)^${n} = ${ans}.`, P.roof("population", String(ans), "+r each year"));
        },
        worked: [
          {
            problem: "Rs 8000 at 10% compound for 2 years. Find the amount.",
            steps: [
              ["Formula", "A = 8000(1.1)²."],
              ["Compute", "8000 × 1.21 = 9680."]
            ],
            answer: "9680"
          },
          {
            problem: "A bike costs Rs 50000 and depreciates 20% per year for 2 years. Find its value.",
            steps: [
              ["Decay", "A = 50000(0.8)²."],
              ["Compute", "50000 × 0.64 = 32000."]
            ],
            answer: "32000"
          }
        ]
      },
      {
        id: "grouped",
        name: "Grouped mean / median / quartile",
        tag: "SEE",
        phrase: "Mean: Σfm / Σf. Median & quartiles: L + ((N/k − cf)/f)·h.",
        also: "For median k=2 (N/2); for Q₁ use N/4; for Q₃ use 3N/4.",
        steps: [
          "Find total frequency N = Σf.",
          "Mean: midpoints × frequencies, sum, divide by N.",
          "Median class: first class whose cumulative frequency reaches N/2.",
          "Median = L + ((N/2 − cf)/f)·h. Quartiles swap N/2 for N/4 or 3N/4."
        ],
        exception: "L is the lower boundary of the median/quartile class; cf is cumulative frequency before that class; f and h belong to that class only. Do not use raw-list median shortcuts on grouped tables.",
        pic: () => P.table(["class", "f", "cf"], [["0–10", "4", "4"], ["10–20", "6", "10"], ["20–30", "5", "15"]], { note: "N = 15; median at N/2 = 7.5 → class 10–20" }),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const mids = [5, 15, 25];
            const f = [R(2, 5), R(3, 6), R(2, 5)];
            const N = f[0] + f[1] + f[2];
            const sum = mids[0] * f[0] + mids[1] * f[1] + mids[2] * f[2];
            const g = gcd(sum, N);
            const ans = N / g === 1 ? sum / g : sfr(sum / g, N / g);
            return Q(`Classes midpoints 5,15,25 with f = ${f.join(",")}. Find the mean.`, ans,
              [sfr(sum, N + 1), String(Math.round(sum / N) + 1), sfr(sum - mids[1], N)],
              `Σfm = ${sum}, N = ${N}, mean = ${ans}.`,
              P.table(["x", "f"], mids.map((m, i) => [String(m), String(f[i])]), { note: "grouped mean Σfm/Σf" }));
          }
          if (form === 2) {
            const f = [4, 6, 5];
            const N = 15;
            const L = 10, h = 10, cf = 4, ff = 6;
            const med = L + ((N / 2 - cf) / ff) * h;
            return Q(`f = 4,6,5 on classes 0–10,10–20,20–30. Find the median.`, med,
              near(med, [N / 2, L, 15]),
              `N/2 = 7.5 → class 10–20. L=10, cf=4, f=6, h=10 → ${med}.`,
              P.table(["class", "f", "cf"], [["0–10", "4", "4"], ["10–20", "6", "10"], ["20–30", "5", "15"]], { note: "median class 10–20" }));
          }
          const N = 40, L = 20, h = 10, cf = 8, ff = 12;
          const q1 = L + ((N / 4 - cf) / ff) * h;
          return Q(`N=40. Q₁ class 20–30 with L=20, cf(before)=8, f=12, h=10. Find Q₁.`, q1,
            near(q1, [N / 4, L, 25]),
            `Q₁ = 20 + ((10−8)/12)×10 = ${q1}.`,
            P.roof("Q₁", "L+((N/4−cf)/f)·h", "quartile class formula"));
        },
        worked: [
          {
            problem: "Classes 0–10,10–20,20–30 with f = 4,6,5. Find the median.",
            steps: [
              ["N", "4+6+5 = 15; N/2 = 7.5."],
              ["Class", "cf reaches 7.5 in 10–20."],
              ["Formula", "10 + ((7.5−4)/6)×10 = 15.83… ≈ 15.8."]
            ],
            answer: "≈ 15.8"
          }
        ]
      },
      {
        id: "ages",
        name: "Ages after n years",
        tag: "SEE",
        phrase: "After n years, every age gains n. Rewrite the relation with +n on each person.",
        steps: [
          "Let present ages be variables (or use given numbers).",
          "After n years: add n to each age in the story.",
          "Write the equation with the new ages and solve for the present."
        ],
        exception: "“n years ago” subtracts n. Do not add n only to one person. Ratios after n years use (age+n), not age×n.",
        pic: () => P.roof("now → +n", "new ages", "same add for everyone"),
        gen() {
          const form = R(1, 2);
          if (form === 1) {
            const now = R(10, 16);
            const n = R(3, 6);
            const ans = now + n;
            return Q(`A child is ${now} now. How old after ${n} years?`, ans,
              near(ans, [now - n, now * n, n]),
              `${now} + ${n} = ${ans}.`, P.roof(String(now), String(ans), `+${n}`));
          }
          const a = R(8, 14), b = a + R(4, 10), n = R(2, 5);
          const ans = (a + n) + (b + n);
          return Q(`Ages ${a} and ${b}. Sum of ages after ${n} years?`, ans,
            near(ans, [a + b, a + b + n, a + b + 2 * n + 1]),
            `(${a}+${n})+(${b}+${n}) = ${ans}.`, P.roof(`${a}+${b}`, String(ans), `each +${n}`));
        },
        worked: [
          {
            problem: "Ram is 12 and Sita is 18. What will be the sum of their ages after 5 years?",
            steps: [
              ["Add 5 each", "17 and 23."],
              ["Sum", "40."]
            ],
            answer: "40"
          }
        ]
      },
      {
        id: "sets",
        name: "Sets & Venn (SEE)",
        tag: "SEE",
        phrase: "n(A∪B)=n(A)+n(B)−n(A∩B). Only A = n(A)−n(A∩B).",
        also: "Neither = total − n(A∪B).",
        steps: [
          "Sketch two circles; label only A, both, only B, neither.",
          "Both = n(A∩B). Only A = n(A) − both.",
          "Union = only A + both + only B = n(A)+n(B)−both.",
          "Neither = survey total − union."
        ],
        exception: "n(A) already includes the intersection — do not add n(A∩B) again when forming the union. “Only A” is not n(A).",
        pic: () => vennPic("only · both · neither"),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const both = R(3, 8), onlyA = R(4, 12), onlyB = R(4, 12);
            const nA = onlyA + both, nB = onlyB + both;
            const ans = onlyA + both + onlyB;
            return Q(`n(A)=${nA}, n(B)=${nB}, n(A∩B)=${both}. Find n(A∪B).`, ans,
              near(ans, [nA + nB, onlyA + onlyB, nA + nB + both]),
              `${nA}+${nB}−${both} = ${ans}.`, vennPic(`∪ = ${ans}`));
          }
          if (form === 2) {
            const both = R(5, 10), nA = both + R(4, 10);
            const ans = nA - both;
            return Q(`n(A)=${nA}, n(A∩B)=${both}. How many in only A?`, ans,
              near(ans, [nA, both, nA + both]),
              `only A = ${nA}−${both} = ${ans}.`, vennPic(`only A = ${ans}`));
          }
          const uni = R(40, 60), total = uni + R(10, 25);
          const ans = total - uni;
          return Q(`In a survey of ${total}, n(A∪B)=${uni}. How many in neither?`, ans,
            near(ans, [total, uni, total + uni]),
            `neither = ${total}−${uni} = ${ans}.`, vennPic(`neither = ${ans}`));
        },
        worked: [
          {
            problem: "In a class of 40, 22 like tea, 18 like coffee, 10 like both. How many like neither?",
            steps: [
              ["Union", "22+18−10 = 30."],
              ["Neither", "40−30 = 10."]
            ],
            answer: "10"
          }
        ]
      },
      {
        id: "money",
        name: "Currency / commission / VAT",
        tag: "SEE",
        phrase: "Percent of the stated base. Currency: × rate. Commission/VAT: % of amount.",
        steps: [
          "Name the base: marked price, selling price, or exchange amount.",
          "Currency: multiply or divide by the given rate.",
          "Commission or VAT: amount × rate/100.",
          "Price with VAT: amount × (1 + rate/100)."
        ],
        exception: "VAT-inclusive reverse uses ÷(1+r/100), not ×(1−r/100). Commission is usually on sales, not on profit unless stated.",
        pic: () => P.roof("base", "base × (1 ± r/100)", "or × exchange rate"),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const usd = R(2, 9) * 10;
            const rate = pick([130, 132, 135]);
            const ans = usd * rate;
            return Q(`${usd} USD at Rs ${rate} per USD. Value in Rs?`, ans,
              near(ans, [usd + rate, usd * (rate - 2), Math.floor(usd / rate)]),
              `${usd} × ${rate} = ${ans}.`, P.roof(`${usd} USD`, `Rs ${ans}`, `× ${rate}`));
          }
          if (form === 2) {
            const sales = pick([20000, 50000, 80000]);
            const r = pick([2, 5, 10]);
            const ans = (sales * r) / 100;
            return Q(`Sales Rs ${sales}. Commission ${r}%. Find commission.`, ans,
              near(ans, [sales + r, sales * r, sales - ans]),
              `${sales} × ${r}/100 = ${ans}.`, P.roof("sales", String(ans), `${r}% commission`));
          }
          const price = pick([1000, 2000, 5000]);
          const r = pick([10, 13, 15]);
          const ans = price + (price * r) / 100;
          return Q(`Price Rs ${price}. Add VAT ${r}%. Total?`, ans,
            near(ans, [price - (price * r) / 100, (price * r) / 100, price * r]),
            `${price}(1+${r}/100) = ${ans}.`, P.roof(String(price), String(ans), `+${r}% VAT`));
        },
        worked: [
          {
            problem: "An item costs Rs 2000 before 13% VAT. Find the VAT-inclusive price.",
            steps: [
              ["Factor", "2000 × 1.13."],
              ["Compute", "2260."]
            ],
            answer: "2260"
          }
        ]
      },
      {
        id: "menspack",
        name: "Prism / pyramid / packing",
        tag: "SEE",
        phrase: "Prism: V = Bh. Pyramid: V = (1/3)Bh. Packing: total ÷ one unit.",
        steps: [
          "Prism / cuboid: base area × height.",
          "Pyramid / cone idea: one-third of base area × height.",
          "Brick / packing: volume of wall or box ÷ volume of one unit (watch mortar gaps if given)."
        ],
        exception: "Pyramid needs the 1/3 — forgetting it triples the volume. Packing counts whole units; leftover space is not an extra brick unless stated.",
        pic: () => pyramidPic(),
        gen() {
          const form = R(1, 3);
          if (form === 1) {
            const l = R(4, 10), w = R(3, 8), h = R(2, 6);
            const ans = l * w * h;
            return Q(`Cuboid ${l}×${w}×${h}. Find the volume.`, ans,
              near(ans, [l * w, l * w + h, 2 * (l * w + w * h + h * l)]),
              `V = ${l}×${w}×${h} = ${ans}.`, P.roof("Bh", String(ans), "prism / cuboid"));
          }
          if (form === 2) {
            const B = pick([12, 18, 24, 30]), h = R(4, 9);
            const ans = (B * h) / 3;
            return Q(`Pyramid base area ${B}, height ${h}. Find volume.`, ans,
              near(ans, [B * h, B * h * 3, B + h]),
              `V = (1/3)×${B}×${h} = ${ans}.`, pyramidPic(`V = ${ans}`));
          }
          const brick = pick([24, 30, 40]);
          const wall = brick * R(20, 50);
          const ans = wall / brick;
          return Q(`Wall volume ${wall}. Each brick volume ${brick} (no gap). How many bricks?`, ans,
            near(ans, [wall - brick, wall + brick, brick]),
            `${wall} ÷ ${brick} = ${ans}.`, P.roof("wall ÷ brick", String(ans), "packing"));
        },
        worked: [
          {
            problem: "A square pyramid has base area 36 and height 9. Find its volume.",
            steps: [
              ["Formula", "V = (1/3)Bh."],
              ["Compute", "(1/3)×36×9 = 108."]
            ],
            answer: "108"
          }
        ]
      },
      {
        id: "probtree",
        name: "Probability trees",
        tag: "SEE",
        phrase: "Multiply along a branch. Add separate paths. Without replacement: the second fraction changes.",
        steps: [
          "Draw the first-stage branches with their probabilities.",
          "From each outcome, draw the next stage (update if without replacement).",
          "A full path: multiply the fractions on that path.",
          "“Or” across paths: add the path probabilities."
        ],
        exception: "With replacement the second draw stays the same; without replacement the totals drop. Do not add probabilities that sit on the same path.",
        pic: () => treePic(),
        gen() {
          const form = R(1, 2);
          if (form === 1) {
            const r = R(3, 6), b = R(2, 5), n = r + b;
            const ans = sfr(r, n);
            return Q(`Bag: ${r} red, ${b} blue. P(red on first draw)?`, ans,
              [sfr(b, n), sfr(r, n - 1), sfr(1, n)],
              `P = ${r}/${n}.`, treePic(`${r} red / ${n}`));
          }
          const r = 4, b = 6, n = 10;
          // without replacement: P both red = (4/10)*(3/9)=12/90=2/15
          const ans = sfr(2, 15);
          return Q(`4 red, 6 blue. Two draws without replacement. P(both red)?`, ans,
            [sfr(4, 10), sfr(16, 100), sfr(4, 10) + "×" + sfr(4, 9), sfr(12, 90)],
            `(4/10)×(3/9) = 12/90 = 2/15.`, treePic("without replacement"));
        },
        worked: [
          {
            problem: "A bag has 3 red and 2 blue. Two draws without replacement. P(red then blue)?",
            steps: [
              ["First red", "3/5."],
              ["Then blue", "2/4 = 1/2."],
              ["Path", "(3/5)×(1/2) = 3/10."]
            ],
            answer: "3/10"
          }
        ]
      },

      /* ========== Core geo theorems ========== */
      {
        id: "pythag",
        name: "Pythagoras",
        tag: "Geo",
        phrase: "Legs squared add to hypotenuse squared: a² + b² = c².",
        steps: [
          "Confirm the right angle; c is the side opposite it.",
          "Write a² + b² = c².",
          "Solve for the missing side (root at the end)."
        ],
        exception: "Only right triangles. c must be the longest side. Converse: if a²+b²=c², the angle between a and b is 90°.",
        pic: () => P.rightTri({ opp: "a", adj: "b", hyp: "c" }),
        gen() {
          const [a, b, c] = pick(TRIPLES);
          if (Math.random() < 0.5) {
            return Q(`Right triangle legs ${a} and ${b}. Find the hypotenuse.`, c,
              near(c, [a + b, a * b, c + 1]),
              `${a}²+${b}² = ${a * a + b * b} = ${c}².`, P.rightTri({ opp: a, adj: b, hyp: "?" }));
          }
          return Q(`Hypotenuse ${c}, one leg ${a}. Find the other leg.`, b,
            near(b, [c - a, a + c, c]),
            `${c}²−${a}² = ${c * c - a * a} = ${b}².`, P.rightTri({ opp: "?", adj: a, hyp: c }));
        },
        worked: [
          {
            problem: "Legs 9 and 12. Find the hypotenuse.",
            steps: [["Squares", "81+144=225."], ["Root", "15."]],
            answer: "15"
          }
        ]
      },
      {
        id: "bpt",
        name: "Basic proportionality (BPT)",
        tag: "Geo",
        phrase: "A line parallel to one side cuts the other two sides in the same ratio.",
        steps: [
          "Confirm the cut is parallel to the third side.",
          "Write AD/DB = AE/EC (or the full-side form AD/AB = AE/AC).",
          "Cross-multiply and solve."
        ],
        exception: "Parallel is required — a random transversal does not give equal ratios. Match corresponding segments on each side.",
        pic: () => P.bpt(2, 4, 3, "?"),
        gen() {
          const ad = R(2, 5), k = R(2, 3), db = ad * k;
          const ae = R(2, 5), ec = ae * k;
          if (Math.random() < 0.5) {
            return Q(`BPT: AD=${ad}, DB=${db}, AE=${ae}. Find EC.`, ec,
              near(ec, [ae, ad, ae * ad]),
              `${ad}/${db} = ${ae}/EC → EC = ${ec}.`, P.bpt(ad, db, ae, "?"));
          }
          return Q(`BPT: AD=${ad}, DB=${db}, EC=${ec}. Find AE.`, ae,
            near(ae, [ec, ad, ec * k]),
            `${ad}/${db} = AE/${ec} → AE = ${ae}.`, P.bpt(ad, db, "?", ec));
        },
        worked: [
          {
            problem: "AD=3, DB=6, AE=4, and DE ∥ BC. Find EC.",
            steps: [["Ratio", "3/6 = 4/EC."], ["Solve", "EC = 8."]],
            answer: "8"
          }
        ]
      },
      {
        id: "midseg",
        name: "Midsegment theorem",
        tag: "Geo",
        phrase: "Join the midpoints: the midsegment is parallel to the third side and half as long.",
        steps: [
          "Mark midpoints of two sides.",
          "The segment joining them ∥ the third side.",
          "Length = half of that third side."
        ],
        exception: "Both endpoints must be midpoints. Half the base — not equal to the base.",
        pic: () => P.midseg(12, 6),
        gen() {
          if (Math.random() < 0.5) {
            const base = 2 * R(4, 12);
            return Q(`Base ${base}. Midsegment joining the other midpoints?`, base / 2,
              near(base / 2, [base, base * 2, base / 2 + 1]),
              `Midsegment = half of ${base} = ${base / 2}.`, P.midseg(base, "?"));
          }
          const mid = R(4, 10);
          return Q(`Midsegment is ${mid}. Find the parallel base.`, mid * 2,
            near(mid * 2, [mid, mid / 2, mid + 2]),
            `Base = 2 × ${mid} = ${mid * 2}.`, P.midseg("?", mid));
        },
        worked: [
          {
            problem: "A midsegment is 7. Find the third side.",
            steps: [["Double", "Base = 14."]],
            answer: "14"
          }
        ]
      },
      {
        id: "similar",
        name: "Similarity AAA",
        tag: "Geo",
        phrase: "AAA: matching angles → similar triangles → sides in one scale factor.",
        steps: [
          "Show three angles match (two often imply the third).",
          "Write corresponding sides in the same order.",
          "Set up a proportion with one scale factor and solve."
        ],
        exception: "AAA gives similarity, not congruence (SSS/SAS/ASA/RHS). Keep correspondence: largest side faces largest angle.",
        pic: () => P.similar(4, 10),
        gen() {
          const k = R(2, 4), small = R(3, 8), big = small * k;
          return Q(`Similar triangles. Side ${small} matches side ${big}. A side ${small + 1} matches?`, (small + 1) * k,
            near((small + 1) * k, [small + 1, big + 1, (small + 1) * (k + 1)]),
            `Scale ${big}/${small} = ${k}. Missing = ${small + 1}×${k}.`, P.similar(small, big));
        },
        worked: [
          {
            problem: "Triangles similar; sides 3 and 9 correspond. Side 5 matches?",
            steps: [["Scale", "9/3 = 3."], ["Apply", "5×3 = 15."]],
            answer: "15"
          }
        ]
      },
      {
        id: "bisector",
        name: "Angle bisector theorem",
        tag: "Geo",
        phrase: "The bisector cuts the opposite side in the ratio of the adjacent sides.",
        steps: [
          "Confirm the ray bisects the angle.",
          "Write (side)/(side) = (segment)/(segment).",
          "Cross-multiply."
        ],
        exception: "It splits the opposite side — not the bisector’s own length. Ratio uses the two sides that form the angle.",
        pic: () => bisectorPic(4, 6, 2, 3),
        gen() {
          const a = R(2, 6), k = R(2, 3), b = a * k, c = R(2, 5), d = c * k;
          return Q(`Bisector: adjacent sides ${a} and ${b}; one segment ${c}. Other segment?`, d,
            near(d, [c, a, c * a]),
            `${a}/${b} = ${c}/x → x = ${d}.`, bisectorPic(a, b, c, "?"));
        },
        worked: [
          {
            problem: "Sides 4 and 6; bisector cuts opposite into 2 and x. Find x.",
            steps: [["Proportion", "4/6 = 2/x."], ["Solve", "x = 3."]],
            answer: "3"
          }
        ]
      },
      {
        id: "central",
        name: "Center = 2 × rim",
        tag: "Geo",
        phrase: "Angle at the center is twice the angle at the rim on the same arc.",
        steps: [
          "Identify the shared arc.",
          "Center angle = 2 × rim angle (same arc).",
          "Solve for the unknown."
        ],
        exception: "Both angles must stand on the same arc. Rim angle on the major arc is different. Center is at the circle’s center, not any interior point.",
        pic: () => P.central("α", "2α"),
        gen() {
          const rim = R(20, 70);
          if (Math.random() < 0.5) {
            return Q(`Rim angle on an arc is ${rim}°. Center angle on the same arc?`, deg(2 * rim),
              [deg(rim), deg(180 - rim), deg(rim / 2)],
              `Center = 2 × ${rim}° = ${2 * rim}°.`, P.central(`${rim}°`, "?"));
          }
          return Q(`Center angle is ${2 * rim}°. Rim angle on the same arc?`, deg(rim),
            [deg(2 * rim), deg(180 - rim), deg(4 * rim)],
            `Rim = half of ${2 * rim}° = ${rim}°.`, P.central("?", `${2 * rim}°`));
        },
        worked: [
          {
            problem: "Angle at the center is 110°. Find the rim angle on the same arc.",
            steps: [["Half", "55°."]],
            answer: "55°"
          }
        ]
      },
      {
        id: "cyclic",
        name: "Cyclic opposite angles",
        tag: "Geo",
        phrase: "A quadrilateral is cyclic iff opposite angles sum to 180°.",
        steps: [
          "Spot a cyclic quad (all vertices on a circle).",
          "Opposite angles: A + C = 180°, B + D = 180°.",
          "Solve for the unknown angle."
        ],
        exception: "Adjacent angles are not forced to 180° (that would be a trapezoid-with-parallel case). Interior angle ≠ exterior unless stated.",
        pic: () => P.cyclic("α", "180°−α"),
        gen() {
          const a = R(50, 130);
          return Q(`Cyclic quad. One angle ${a}°. Opposite angle?`, deg(180 - a),
            [deg(a), deg(90), deg(360 - a)],
            `Opposite sum to 180° → ${180 - a}°.`, P.cyclic(`${a}°`, "?"));
        },
        worked: [
          {
            problem: "Cyclic ABCD with ∠A = 95°. Find ∠C.",
            steps: [["Opposite", "180 − 95 = 85°."]],
            answer: "85°"
          }
        ]
      },
      {
        id: "tangent",
        name: "Tangent ⊥ radius",
        tag: "Geo",
        phrase: "A tangent meets the radius at the point of contact at 90°.",
        steps: [
          "Mark the contact point T.",
          "Radius OT ⊥ tangent.",
          "Use right-triangle tools (Pythagoras / trig) in triangle OTP."
        ],
        exception: "Perpendicular only at the contact point — a line from O to another point on the tangent is not a radius. Two tangents from one point are equal (separate theorem).",
        pic: () => P.tangent("?", "90°"),
        gen() {
          const r = pick([5, 6, 8, 9, 12]), t = pick([8, 12, 15, 20]);
          const hyp2 = r * r + t * t;
          const hyp = Math.sqrt(hyp2);
          if (Number.isInteger(hyp)) {
            return Q(`Radius ${r}, tangent segment ${t}. Distance from center to external point?`, hyp,
              near(hyp, [r + t, hyp2, r * t]),
              `OT ⊥ tangent → OP = √(${r}²+${t}²) = ${hyp}.`, P.tangent(`${t}`, "90°"));
          }
          return Q(`Radius meets tangent at T. Angle OT–tangent?`, "90°", ["45°", "60°", "180°"],
            "Radius ⊥ tangent at contact.", P.tangent("α", "90°"));
        },
        worked: [
          {
            problem: "OT = 6, tangent PT = 8. Find OP.",
            steps: [["Right at T", "OP = √(36+64) = 10."]],
            answer: "10"
          }
        ]
      },
      {
        id: "altseg",
        name: "Alternate segment",
        tag: "Geo",
        phrase: "Tangent–chord angle equals the angle in the alternate segment.",
        steps: [
          "Find the angle between tangent and chord.",
          "Look to the segment on the other side of the chord.",
          "That rim angle matches."
        ],
        exception: "“Alternate” means the other segment, not the adjacent one. The tangent must touch at an endpoint of the chord.",
        pic: () => altSegPic("α", "α"),
        gen() {
          const a = R(25, 70);
          return Q(`Tangent–chord angle ${a}°. Angle in the alternate segment?`, deg(a),
            [deg(90 - a), deg(180 - a), deg(2 * a)],
            `They match: ${a}°.`, altSegPic(`${a}°`, "?"));
        },
        worked: [
          {
            problem: "Tangent–chord angle is 48°. Find the angle in the alternate segment.",
            steps: [["Match", "48°."]],
            answer: "48°"
          }
        ]
      },
      {
        id: "eqtang",
        name: "Equal tangents",
        tag: "Geo",
        phrase: "Two tangents from one outside point are equal in length.",
        steps: [
          "From P, tangents touch at A and B.",
          "PA = PB.",
          "Triangles OAP and OBP are congruent (radii ⊥ tangents)."
        ],
        exception: "Equal only when both tangents start from the same external point. Chord lengths are a different story.",
        pic: () => twoTangPic("t"),
        gen() {
          const t = R(6, 15);
          return Q(`Tangents from P: one is ${t}. Find the other.`, t,
            near(t, [t + 1, 2 * t, t - 1]),
            `Equal tangents: ${t}.`, twoTangPic(t));
        },
        worked: [
          {
            problem: "PA = 11 from external point P. Find PB.",
            steps: [["Equal tangents", "PB = 11."]],
            answer: "11"
          }
        ]
      },
      {
        id: "chord",
        name: "Chord ⊥ from center",
        tag: "Geo",
        phrase: "Perpendicular from the center to a chord bisects the chord.",
        steps: [
          "Drop a perpendicular from O to chord AB at M.",
          "M is the midpoint: AM = MB.",
          "In right triangle OMA: r² = d² + (half chord)²."
        ],
        exception: "The bisector property needs the perpendicular (or conversely: line from center to midpoint is ⊥). Full chord is twice the half.",
        pic: () => P.chord("r", "d", "h"),
        gen() {
          const trip = pick([[5, 3, 4], [13, 5, 12], [10, 6, 8], [15, 9, 12]]);
          const [r, d, h] = trip;
          if (Math.random() < 0.5) {
            return Q(`Radius ${r}, center ${d} from chord. Chord length?`, 2 * h,
              near(2 * h, [h, r + d, 2 * (r - d)]),
              `Half = √(${r}²−${d}²)=${h}; chord = ${2 * h}.`, P.chord(`r=${r}`, d, "?"));
          }
          return Q(`Radius ${r}, half-chord ${h}. Distance from center to chord?`, d,
            near(d, [h, r - h, r]),
            `d = √(${r}²−${h}²) = ${d}.`, P.chord(`r=${r}`, "?", h));
        },
        worked: [
          {
            problem: "Radius 13, distance from center to chord 5. Find the chord.",
            steps: [["Half", "√(169−25)=12."], ["Double", "24."]],
            answer: "24"
          }
        ]
      },
      {
        id: "exterior",
        name: "Exterior angle",
        tag: "Geo",
        phrase: "Exterior angle of a triangle equals the sum of the two far interior angles.",
        steps: [
          "Extend one side to form the exterior angle.",
          "Exterior = sum of the two remote interiors.",
          "Or: exterior = 180° − adjacent interior."
        ],
        exception: "Use the two far angles — not the adjacent interior. Polygon exterior sum 360° is a different theorem.",
        pic: () => P.exterior("40°", "60°", "100°"),
        gen() {
          const a = R(30, 70), b = R(20, Math.min(70, 160 - a));
          return Q(`Remote interiors ${a}° and ${b}°. Exterior angle?`, deg(a + b),
            [deg(180 - a - b), deg(a), deg(Math.abs(a - b))],
            `Exterior = ${a}+${b} = ${a + b}°.`, P.exterior(`${a}°`, `${b}°`, "?"));
        },
        worked: [
          {
            problem: "Remote interiors 45° and 70°. Find the exterior.",
            steps: [["Sum", "115°."]],
            answer: "115°"
          }
        ]
      },

      /* ========== Core trig (elevation lives in g10/heights — cheat links there) ========== */
      {
        id: "sohcahtoa",
        name: "SOH CAH TOA",
        tag: "Trig",
        phrase: "SOH CAH TOA: sine opp/hyp, cosine adj/hyp, tangent opp/adj.",
        steps: [
          "Mark the angle; label opposite, adjacent, hypotenuse.",
          "Pick the ratio that uses the sides you know / need.",
          "Solve; keep exact values when the angle is special."
        ],
        exception: "Hypotenuse is never opposite or adjacent in the ratio names. Oblique triangles need sine/cosine rules — not plain SOHCAHTOA alone.",
        pic: () => P.rightTri({ opp: "opp", adj: "adj", hyp: "hyp", theta: "θ" }),
        gen() {
          const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]);
          const form = R(1, 3);
          if (form === 1) {
            return Q(`Right triangle: opp=${a}, hyp=${c}. sin θ?`, sfr(a, c),
              [sfr(b, c), sfr(a, b), sfr(c, a)],
              `sin = opp/hyp = ${a}/${c}.`, P.rightTri({ opp: a, adj: b, hyp: c, theta: "θ" }));
          }
          if (form === 2) {
            return Q(`Right triangle: adj=${b}, hyp=${c}. cos θ?`, sfr(b, c),
              [sfr(a, c), sfr(b, a), sfr(c, b)],
              `cos = adj/hyp = ${b}/${c}.`, P.rightTri({ opp: a, adj: b, hyp: c, theta: "θ" }));
          }
          return Q(`Right triangle: opp=${a}, adj=${b}. tan θ?`, sfr(a, b),
            [sfr(b, a), sfr(a, c), sfr(b, c)],
            `tan = opp/adj = ${a}/${b}.`, P.rightTri({ opp: a, adj: b, hyp: c, theta: "θ" }));
        },
        worked: [
          {
            problem: "opp=5, adj=12, hyp=13. Find sin, cos, tan of θ.",
            steps: [
              ["SOH", "sin = 5/13."],
              ["CAH", "cos = 12/13."],
              ["TOA", "tan = 5/12."]
            ],
            answer: "5/13, 12/13, 5/12"
          }
        ]
      },
      {
        id: "astc",
        name: "ASTC signs",
        tag: "Trig",
        phrase: "All Sugar Tea Coffee: all → sin → tan → cos positive, going counterclockwise.",
        steps: [
          "Reduce to a reference angle in [0°, 90°].",
          "Find the quadrant of the original angle.",
          "Apply ASTC for the sign; keep the reference value."
        ],
        exception: "ASTC is about signs, not magnitudes. Cot/sec/cosec follow their partners (tan/cos/sin).",
        pic: () => P.quadrant(2),
        gen() {
          const pool = [
            [150, "sin", "1/2", "QII: sin +"],
            [150, "cos", "−√3/2", "QII: only sin +"],
            [210, "tan", "1/√3", "QIII: tan +"],
            [300, "cos", "1/2", "QIV: cos +"],
            [300, "sin", "−√3/2", "QIV: only cos +"]
          ];
          const [ang, f, ans, why] = pick(pool);
          const wrongs = ["1/2", "−1/2", "√3/2", "−√3/2", "1", "−1", "1/√3", "−1/√3"].filter((x) => x !== ans);
          return Q(`${f} ${ang}° = ?`, ans, wrongs, why, P.quadrant(Math.floor(ang / 90) + 1));
        },
        worked: [
          {
            problem: "Find cos 150°.",
            steps: [
              ["Reference", "30°; cos 30° = √3/2."],
              ["Quadrant II", "cos negative → −√3/2."]
            ],
            answer: "−√3/2"
          }
        ]
      },
      {
        id: "hand",
        name: "Special angles hand",
        tag: "Trig",
        phrase: "Fist trick: sin = √(fingers before)/2; cos = √(fingers after)/2.",
        steps: [
          "Hold five fingers for 0°, 30°, 45°, 60°, 90°.",
          "Count closed fingers before the angle for sine; after for cosine.",
          "tan = sin/cos; watch 90° (undefined tan)."
        ],
        exception: "This builds the acute table only. Other angles need ASTC + reference. tan 90° does not exist.",
        pic: () => P.hand(60),
        gen() {
          const pool = [
            [30, "sin", "1/2"], [45, "sin", "1/√2"], [60, "sin", "√3/2"],
            [30, "cos", "√3/2"], [45, "cos", "1/√2"], [60, "cos", "1/2"],
            [45, "tan", "1"], [60, "tan", "√3"], [30, "tan", "1/√3"]
          ];
          const [ang, f, ans] = pick(pool);
          return Q(`${f} ${ang}°`, ans, ["0", "1", "1/2", "√3/2", "1/√2", "√3", "1/√3"].filter((x) => x !== ans),
            `Hand / table: ${f} ${ang}° = ${ans}.`, P.hand(ang));
        },
        worked: [
          {
            problem: "Build sin 60° and cos 60° from the hand trick.",
            steps: [
              ["Before 60°", "3 fingers → sin = √3/2."],
              ["After 60°", "1 finger → cos = 1/2."]
            ],
            answer: "√3/2 and 1/2"
          }
        ]
      },
      {
        id: "pyid",
        name: "Pythagorean identity",
        tag: "Trig",
        phrase: "sin²θ + cos²θ = 1. Divide by cos² → 1 + tan²θ = sec²θ.",
        steps: [
          "Start from sin² + cos² = 1.",
          "Given one ratio, isolate the square of the other.",
          "Square root with ±; ASTC picks the sign."
        ],
        exception: "sin²θ means (sin θ)². sin+cos is not 1. Division by cos² fails where cos = 0.",
        pic: () => P.rightTri({ opp: "sin θ", adj: "cos θ", hyp: "1", theta: "θ" }),
        gen() {
          if (Math.random() < 0.4) {
            return Q("Simplify sin²θ + cos²θ", "1", ["0", "2", "sin 2θ"],
              "Pythagorean identity.", P.rightTri({ opp: "sin θ", adj: "cos θ", hyp: "1", theta: "θ" }));
          }
          const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]);
          return Q(`θ acute, sin θ = ${a}/${c}. Find cos θ.`, sfr(b, c),
            [sfr(a, b), sfr(c, a), sfr(a, c)],
            `cos² = 1 − (${a}/${c})² → cos = ${b}/${c}.`, P.rightTri({ opp: a, adj: "?", hyp: c, theta: "θ" }));
        },
        worked: [
          {
            problem: "sin θ = 8/17, θ acute. Find cos θ.",
            steps: [
              ["Identity", "cos² = 1 − 64/289 = 225/289."],
              ["Root", "cos = 15/17."]
            ],
            answer: "15/17"
          }
        ]
      },
      {
        id: "sinerule",
        name: "Sine rule",
        tag: "Trig",
        phrase: "a/sin A = b/sin B = c/sin C.",
        steps: [
          "Label side a opposite A, etc.",
          "Use when you know a side and its opposite angle, plus one more.",
          "Cross-multiply; for SSA check the ambiguous case."
        ],
        exception: "SSA can give two triangles. SAS / SSS angles need the cosine rule.",
        pic: () => abc({ A: "A", B: "B", a: "a", b: "b" }),
        gen() {
          // A=30,B=45 → sin30=1/2, sin45=1/√2; pick a multiple
          const a = 2 * R(3, 6);
          // b = a * sin45 / sin30 = a * (1/√2) / (1/2) = a√2
          // keep numeric multiple: use 30/60 with a=2k, b=2k√3? simpler integer case:
          // A=90,B=30,a=10 → b=5
          const A = 90, B = 30, sideA = 2 * R(4, 8), sideB = sideA / 2;
          return Q(`A=${A}°, B=${B}°, a=${sideA}. Find b.`, sideB,
            near(sideB, [sideA, sideA * 2, sideA - B]),
            `b = a sin B / sin A = ${sideA}×(1/2)/1 = ${sideB}.`,
            abc({ A: "90°", B: "30°", a: sideA, b: "?" }));
        },
        worked: [
          {
            problem: "A=90°, B=30°, a=10. Find b.",
            steps: [["Sine rule", "b/sin30 = 10/sin90."], ["Compute", "b = 10×1/2 = 5."]],
            answer: "5"
          }
        ]
      },
      {
        id: "cosrule",
        name: "Cosine rule",
        tag: "Trig",
        phrase: "a² = b² + c² − 2bc cos A. (Pythagoras with a cosine correction.)",
        steps: [
          "Use for SAS (two sides + included angle) or SSS (three sides → angle).",
          "Side: a² = b² + c² − 2bc cos A, then root.",
          "Angle: cos A = (b² + c² − a²)/(2bc)."
        ],
        exception: "A must sit between b and c. Obtuse A makes cos negative so a grows. At 90° it collapses to Pythagoras.",
        pic: () => abc({ A: "A", a: "a", b: "b", c: "c" }),
        gen() {
          // 60° with b=c=2 → a² = 4+4−2·2·2·(1/2)=8−4=4 → a=2 equilateral-ish
          // Use: A=90,b=3,c=4 → a=5
          const [b, c, a] = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10]]);
          return Q(`A=90°, b=${b}, c=${c}. Find a (cosine rule / Pythagoras).`, a,
            near(a, [b + c, b * c, a + 1]),
            `cos 90°=0 → a²=b²+c² → a=${a}.`, abc({ A: "90°", a: "?", b, c }));
        },
        worked: [
          {
            problem: "b=5, c=8, A=60°. Find a².",
            steps: [
              ["Formula", "a² = 25+64 − 2·5·8·(1/2)."],
              ["Simplify", "89 − 40 = 49."]
            ],
            answer: "49"
          }
        ]
      },
      {
        id: "compoundang",
        name: "Compound angle sin(A±B)",
        tag: "Trig",
        phrase: "sin cos cos sin, sign stays: sin(A±B)=sin A cos B ± cos A sin B.",
        steps: [
          "Write sin(A±B) = sin A cos B ± cos A sin B.",
          "Fill each factor; keep exact fractions / surds.",
          "For cos(A±B): cos cos ∓ sin sin (sign swaps)."
        ],
        exception: "sin(A+B) ≠ sin A + sin B. Cosine flips the middle sign. Check quadrant when expanding numerical angles.",
        pic: () => P.roof("sin(A±B)", "sin A cos B ± cos A sin B", "sign stays"),
        gen() {
          // sin(A+B) with sinA=3/5, cosA=4/5, sinB=5/13, cosB=12/13 → (36+20)/65=56/65
          const ans = sfr(56, 65);
          return Q(`sin A=3/5, cos A=4/5, sin B=5/13, cos B=12/13 (acute). sin(A+B)?`, ans,
            [sfr(16, 65), sfr(33, 65), sfr(63, 65), "1"],
            `sin A cos B + cos A sin B = 36/65 + 20/65 = 56/65.`,
            P.roof("sin(A+B)", ans, "sin cos + cos sin"));
        },
        worked: [
          {
            problem: "sin A=3/5, cos B=5/13, both acute; cos A=4/5, sin B=12/13. Find sin(A+B).",
            steps: [
              ["Expand", "sin A cos B + cos A sin B."],
              ["Multiply", "(3/5)(5/13)+(4/5)(12/13)=15/65+48/65=63/65."]
            ],
            answer: "63/65"
          }
        ]
      },
      {
        id: "areasine",
        name: "Area ½ab sin C",
        tag: "Trig",
        phrase: "Area = ½ab sin C — half of two sides times the sine of the included angle.",
        steps: [
          "Identify the included angle between the two sides.",
          "Write Area = ½ab sin C.",
          "Use exact sin for special angles."
        ],
        exception: "C must be the angle between a and b. For a parallelogram drop the ½. Obtuse sin is still positive.",
        pic: () => abc({ C: "C", a: "a", b: "b" }),
        gen() {
          const a = R(4, 10), b = R(4, 10), C = pick([30, 90, 150]);
          const sinC = C === 90 ? 1 : 0.5;
          const ans = (a * b * sinC) / 2;
          return Q(`Sides ${a} and ${b} include ${C}°. Find the area.`, ans,
            near(ans, [a * b * sinC, a * b / 2, a + b]),
            `½×${a}×${b}×sin ${C}° = ${ans}.`, abc({ C: `${C}°`, a, b }));
        },
        worked: [
          {
            problem: "a=6, b=10, C=30°. Find the area.",
            steps: [["Formula", "½×6×10×(1/2) = 15."]],
            answer: "15"
          }
        ]
      }
    ]
  }, "g10");
})();
