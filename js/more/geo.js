/** Geometry and algebra pack: theorems for grades 8–10 with worked problems. */
(function () {
  const { P, R, pick, gcd, lcm, neg, deg, raw, fr, pow, Q, TRIPLES, add, course, patch } = window.MK;
  const K = P.kit;
  const ACC = "var(--accent)";

  /** An integer count of 10^-k as a tidy decimal: dp(314, 2) is "3.14". */
  function dp(n, k, keep) {
    if (k <= 0) return String(n * 10 ** -k);
    const s = String(n).padStart(k + 1, "0");
    const out = `${s.slice(0, -k)}.${s.slice(-k)}`;
    return keep ? out : out.replace(/0+$/, "").replace(/\.$/, "");
  }

  const SUPS = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", "-": "⁻" };
  const sup = (n) => String(n).split("").map((c) => SUPS[c] || c).join("");
  const term = (c, v = "x") => {
    if (!c) return "";
    const a = Math.abs(c);
    const body = a === 1 ? v : `${a}${v}`;
    return c < 0 ? ` − ${body}` : ` + ${body}`;
  };
  const qx = (a, b, c) => {
    let s = a === 1 ? "x²" : a === -1 ? "−x²" : `${neg(a)}x²`;
    s += term(b);
    if (c) s += c < 0 ? ` − ${-c}` : ` + ${c}`;
    return s;
  };

  /* ---------- diagrams ---------- */

  function polyPic(n, note) {
    const O = [160, 118], r = 88;
    const pts = [];
    for (let i = 0; i < n; i += 1) {
      const a = -90 + (360 * i) / n;
      pts.push([O[0] + r * Math.cos((a * Math.PI) / 180), O[1] + r * Math.sin((a * Math.PI) / 180)]);
    }
    let body = K.poly(pts);
    body += K.T(160, 230, note || `${n} sides`, { size: 13, weight: 500 });
    return K.box(320, 244, body, `${n}-gon`);
  }

  function lineAngles(o = {}) {
    let body = K.line(20, 110, 300, 110) + K.line(160, 30, 160, 190, { stroke: ACC });
    if (o.a) body += K.T(188, 96, o.a, { size: 15 });
    if (o.b) body += K.T(188, 138, o.b, { size: 15, fill: ACC });
    if (o.c) body += K.T(120, 96, o.c, { size: 15 });
    if (o.d) body += K.T(120, 138, o.d, { size: 15 });
    if (o.note) body += K.T(160, 214, o.note, { size: 13, weight: 500 });
    return K.box(320, o.note ? 228 : 210, body, "Angles on a line and around a point");
  }

  function slopePic(rise, run) {
    const O = [50, 180], s = 22;
    const X = (v) => O[0] + v * s, Y = (v) => O[1] - v * s;
    let body = K.line(30, 180, 300, 180) + K.line(50, 200, 50, 20);
    body += K.line(X(0), Y(0), X(run), Y(rise), { stroke: ACC, w: 3.5 });
    body += K.line(X(0), Y(0), X(run), Y(0), { dash: "6 5" }) + K.line(X(run), Y(0), X(run), Y(rise), { dash: "6 5", stroke: ACC });
    body += K.T(X(run / 2), Y(0) + 22, `run ${run}`, { size: 13 }) + K.T(X(run) + 18, Y(rise / 2) + 5, `rise ${rise}`, { size: 13, fill: ACC, anchor: "start" });
    body += K.dot([X(0), Y(0)], "") + K.dot([X(run), Y(rise)], "");
    return K.box(320, 214, body, "Rise over run");
  }

  function lineEq(m, b) {
    const O = [40, 170], s = 24;
    const X = (v) => O[0] + (v + 1) * s, Y = (v) => O[1] - v * s;
    let body = K.line(20, 170, 300, 170) + K.line(X(0), 200, X(0), 20);
    const x1 = -1, y1 = m * x1 + b, x2 = 5, y2 = m * x2 + b;
    body += K.line(X(x1), Y(y1), X(x2), Y(y2), { stroke: ACC, w: 3 });
    body += K.dot([X(0), Y(b)], `b = ${b}`, 14, -12);
    body += K.T(160, 208, `slope ${m}`, { size: 13, weight: 500 });
    return K.box(320, 220, body, "y = mx + b");
  }

  function cylPic(r, h) {
    let body = `<ellipse cx="160" cy="56" rx="70" ry="22" fill="var(--paper2)" stroke="${K.INK}" stroke-width="2.5"/>`;
    body += `<path d="M90 56 V170 A70 22 0 0 0 230 170 V56" fill="var(--accent-soft)" stroke="${K.INK}" stroke-width="2.5"/>`;
    body += `<ellipse cx="160" cy="170" rx="70" ry="22" fill="var(--paper2)" stroke="${K.INK}" stroke-width="2.5"/>`;
    body += K.line(160, 56, 230, 56, { stroke: ACC }) + K.T(200, 48, r != null ? `r = ${r}` : "r", { size: 14, fill: ACC });
    body += K.T(248, 120, h != null ? `h = ${h}` : "h", { size: 14, anchor: "start" });
    return K.box(320, 210, body, "Cylinder");
  }

  function conePic(r, h) {
    const tip = [160, 36], L = [70, 176], R = [250, 176];
    let body = K.poly([tip, L, R], { fill: "var(--accent-soft)" });
    body += `<ellipse cx="160" cy="176" rx="90" ry="22" fill="var(--paper2)" stroke="${K.INK}" stroke-width="2.5"/>`;
    body += K.line(160, 36, 160, 176, { dash: "6 5", stroke: ACC }) + K.right([160, 176], tip, R, 12);
    body += K.T(172, 110, h != null ? `h = ${h}` : "h", { size: 14, fill: ACC, anchor: "start" });
    body += K.T(210, 168, r != null ? `r = ${r}` : "r", { size: 14 });
    return K.box(320, 214, body, "Cone");
  }

  function spherePic(r) {
    const O = [160, 110];
    let body = K.circle(O[0], O[1], 78, { fill: "var(--accent-soft)" });
    body += `<ellipse cx="160" cy="110" rx="78" ry="28" fill="none" stroke="${K.INK}" stroke-width="2" stroke-dasharray="6 5"/>`;
    body += K.line(O[0], O[1], O[0] + 55, O[1] - 40, { stroke: ACC }) + K.dot(O, "");
    body += K.T(198, 84, r != null ? `r = ${r}` : "r", { size: 14, fill: ACC });
    return K.box(320, 210, body, "Sphere");
  }

  function foilPic(a, b) {
    return P.table(["", "x", String(b)], [["x", "x²", `${b}x`], [String(a), `${a}x`, String(a * b)]], {
      note: `(x + ${a})(x + ${b}) = x² + ${a + b}x + ${a * b}`
    });
  }

  function gridPts(pts, o = {}) {
    const O = [40, 192], s = 26;
    const X = (v) => O[0] + v * s, Y = (v) => O[1] - v * s;
    let body = "";
    for (let k = 0; k <= 6; k += 1) {
      body += K.line(X(k), Y(0), X(k), Y(6), { w: 0.8, stroke: "#CFC8BC" }) + K.line(X(0), Y(k), X(6), Y(k), { w: 0.8, stroke: "#CFC8BC" });
      body += K.T(X(k), O[1] + 18, k, { size: 11, weight: 500 });
      if (k) body += K.T(O[0] - 12, Y(k) + 4, k, { size: 11, weight: 500 });
    }
    body += K.line(X(0), Y(0), X(6) + 12, Y(0)) + K.line(X(0), Y(0), X(0), Y(6) - 12);
    if (o.seg) body += K.line(X(o.seg[0][0]), Y(o.seg[0][1]), X(o.seg[1][0]), Y(o.seg[1][1]), { stroke: ACC, w: 3 });
    pts.forEach((p) => {
      body += `<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="6" fill="${ACC}" stroke="${K.INK}" stroke-width="1.5"/>`;
      if (p[2]) body += K.T(X(p[0]) + 10, Y(p[1]) - 8, p[2], { size: 13, anchor: "start" });
    });
    return K.box(320, 222, body, "Coordinate grid");
  }

  function bisectorPic(a, b, c, d) {
    const A = [40, 190], B = [280, 190], C = [160, 40], D = [160, 190];
    const t = typeof a === "number" && typeof b === "number" ? a / (a + b) : 0.4;
    const Pnt = [A[0] + (B[0] - A[0]) * t, A[1]];
    let body = K.poly([A, B, C]) + K.line(C[0], C[1], Pnt[0], Pnt[1], { stroke: ACC, w: 3 });
    body += K.arc(C, A, Pnt, 28, "") + K.arc(C, Pnt, B, 28, "");
    body += K.side(C, A, [140, 140], a) + K.side(C, B, [180, 140], b) + K.side(A, Pnt, [140, 170], c) + K.side(Pnt, B, [200, 170], d);
    return K.box(320, 214, body, "Angle bisector theorem");
  }

  function chordCross(a, b, c, d) {
    const O = [160, 110], r = 86;
    const A = [O[0] - 70, O[1] - 50], B = [O[0] + 78, O[1] + 48];
    const C = [O[0] - 60, O[1] + 62], D = [O[0] + 72, O[1] - 55];
    const X = [160, 112];
    let body = K.circle(O[0], O[1], r, { fill: "var(--paper2)" });
    body += K.line(A[0], A[1], B[0], B[1]) + K.line(C[0], C[1], D[0], D[1]);
    body += K.dot(X, "") + K.T(118, 96, a, { size: 13 }) + K.T(198, 140, b, { size: 13 }) + K.T(118, 150, c, { size: 13 }) + K.T(198, 80, d, { size: 13 });
    return K.box(320, 214, body, "Intersecting chords");
  }

  function tanSecPic(t, out, whole) {
    const O = [170, 110], r = 70;
    const P = [40, 180], T = [120, 155], A = [100, 70], B = [230, 70];
    let body = K.circle(O[0], O[1], r, { fill: "var(--paper2)" });
    body += K.line(P[0], P[1], T[0], T[1], { stroke: ACC, w: 3 }) + K.line(P[0], P[1], A[0], A[1]) + K.line(A[0], A[1], B[0], B[1]);
    body += K.dot(P, "P", -14, 14) + K.dot(T, "T", 8, 14) + K.dot(A, "A", -12, -8) + K.dot(B, "B", 10, -8);
    body += K.T(70, 155, t, { size: 13, fill: ACC }) + K.T(60, 110, out, { size: 13 }) + K.T(160, 58, whole, { size: 13 });
    return K.box(320, 214, body, "Tangent-secant");
  }

  function twoTangPic(a) {
    const O = [180, 100], r = 64, P = [50, 180];
    const T1 = [130, 140], T2 = [150, 50];
    let body = K.circle(O[0], O[1], r, { fill: "var(--paper2)" });
    body += K.line(P[0], P[1], T1[0], T1[1], { stroke: ACC, w: 3 }) + K.line(P[0], P[1], T2[0], T2[1], { stroke: ACC, w: 3 });
    body += K.line(O[0], O[1], T1[0], T1[1], { dash: "5 5" }) + K.line(O[0], O[1], T2[0], T2[1], { dash: "5 5" });
    body += K.dot(P, "P", -12, 14) + K.dot(T1, "T", 10, 12) + K.dot(T2, "S", -14, -4) + K.dot(O, "O", 10, -8);
    body += K.T(80, 150, a, { size: 14, fill: ACC }) + K.T(90, 100, a, { size: 14, fill: ACC });
    return K.box(320, 214, body, "Two tangents from a point");
  }

  function altSegPic(rim, alt) {
    const O = [160, 120], r = 80;
    const T = [100, 60], A = [240, 80], B = [220, 180], C = [80, 180];
    let body = K.circle(O[0], O[1], r, { fill: "var(--paper2)" });
    body += K.line(40, 20, T[0], T[1], { stroke: ACC, w: 3 }) + K.line(T[0], T[1], 280, 40, { stroke: ACC, w: 3 });
    body += K.line(T[0], T[1], A[0], A[1]) + K.line(T[0], T[1], B[0], B[1]) + K.line(A[0], A[1], B[0], B[1]);
    body += K.T(150, 48, rim, { size: 14, fill: ACC }) + K.T(210, 140, alt, { size: 14 });
    body += K.dot(T, "T", -10, -10);
    return K.box(320, 214, body, "Alternate segment");
  }

  function sameSegPic(a, b) {
    const O = [160, 120], r = 82;
    const A = [90, 70], B = [250, 70], C = [100, 180], D = [230, 180];
    let body = K.circle(O[0], O[1], r, { fill: "var(--paper2)" });
    body += K.line(A[0], A[1], B[0], B[1]) + K.line(A[0], A[1], C[0], C[1]) + K.line(B[0], B[1], C[0], C[1]);
    body += K.line(A[0], A[1], D[0], D[1]) + K.line(B[0], B[1], D[0], D[1]);
    body += K.T(130, 130, a, { size: 14 }) + K.T(200, 150, b, { size: 14, fill: ACC });
    return K.box(320, 214, body, "Angles in the same segment");
  }

  function sectorPic(th, r) {
    const O = [160, 122], rad = 88;
    const start = [O[0] + rad, O[1]];
    const end = [O[0] + rad * Math.cos((th * Math.PI) / 180), O[1] - rad * Math.sin((th * Math.PI) / 180)];
    const big = th > 180 ? 1 : 0;
    let body = `<path d="M${O[0]} ${O[1]} L${start[0]} ${start[1]} A${rad} ${rad} 0 ${big} 0 ${end[0]} ${end[1]} Z" fill="var(--accent-soft)" stroke="${K.INK}" stroke-width="2.5"/>`;
    body += K.dot(O, "") + K.T(O[0] + 36, O[1] - 8, `${th}°`, { size: 14 });
    if (r != null) body += K.T(O[0] + rad / 2, O[1] + 18, `r = ${r}`, { size: 14 });
    return K.box(320, 220, body, "Sector");
  }

  function seqPic(terms, note) {
    return P.table(["term", ...terms.map((_, i) => `${i + 1}`)], [["value", ...terms.map(String)]], { note: note || "A sequence of terms" });
  }

  /* ---------- Grade 8: worked problems for existing lessons ---------- */

  patch("g8", "anglesum", {
    worked: [
      {
        problem: "A triangle has angles 52° and 67°. Find the third angle.",
        pic: P.tri("52°", "67°", "?"),
        steps: [
          ["Add the angles you know", "52 + 67 = 119."],
          ["Take that from 180°", "180 − 119 = 61."]
        ],
        answer: "61°"
      },
      {
        problem: "In a right triangle, one sharp angle is 38°. Find the other sharp angle.",
        steps: [
          ["A right triangle already has 90°", "The two sharp angles share the leftover 90°."],
          ["Subtract", "90 − 38 = 52."]
        ],
        answer: "52°"
      },
      {
        problem: "The angles of a triangle are x°, 2x°, and 3x°. Find x.",
        steps: [
          ["Three corners make 180°", "x + 2x + 3x = 180."],
          ["Tidy", "6x = 180, so x = 30."]
        ],
        answer: "x = 30 (angles 30°, 60°, 90°)"
      }
    ]
  });

  patch("g8", "exterior", {
    worked: [
      {
        problem: "The two far inside angles are 48° and 71°. Find the outside angle.",
        pic: P.exterior("48°", "71°", "?"),
        steps: [
          ["Outside = the two far insides", "Add 48 and 71."],
          ["Add", "48 + 71 = 119."]
        ],
        answer: "119°"
      },
      {
        problem: "An outside angle is 125°. One far inside angle is 58°. Find the other far inside angle.",
        steps: [
          ["Outside equals the two far insides", "58 + ? = 125."],
          ["Subtract", "125 − 58 = 67."]
        ],
        answer: "67°"
      },
      {
        problem: "Why can’t you use the inside angle next to the outside angle for this rule?",
        steps: [
          ["Those two sit on a straight line", "They already add to 180°."],
          ["The theorem needs the far pair", "Add the two insides that do not touch the outside angle."]
        ],
        answer: "The next-door inside angle makes 180° with the outside angle; it is not part of the sum rule."
      }
    ]
  });

  patch("g8", "iso", {
    worked: [
      {
        problem: "An isosceles triangle has a top angle of 40°. Find each base angle.",
        pic: P.iso("40°", "?", "?"),
        steps: [
          ["The two base angles are equal", "They share what is left of 180°."],
          ["Split the leftover", "(180 − 40) ÷ 2 = 70."]
        ],
        answer: "70° each"
      },
      {
        problem: "Each base angle is 55°. Find the top angle.",
        pic: P.iso("?", "55°", "55°"),
        steps: [
          ["Add the twin bases", "55 + 55 = 110."],
          ["Take from 180°", "180 − 110 = 70."]
        ],
        answer: "70°"
      },
      {
        problem: "An isosceles triangle has twin sides. The angle between them is 100°. Find a base angle.",
        steps: [
          ["The 100° sits between the twin sides", "The base angles are the twins."],
          ["Split the leftover", "(180 − 100) ÷ 2 = 40."]
        ],
        answer: "40°"
      }
    ]
  });

  patch("g8", "pythag", {
    worked: [
      {
        problem: "The legs are 6 and 8. Find the long side.",
        pic: P.rightTri({ opp: "6", adj: "8", hyp: "?" }),
        steps: [
          ["Square the legs and add", "6² + 8² = 36 + 64 = 100."],
          ["Take the square root", "√100 = 10."]
        ],
        answer: "10"
      },
      {
        problem: "The long side is 13 and one leg is 5. Find the other leg.",
        pic: P.rightTri({ opp: "5", adj: "?", hyp: "13" }),
        steps: [
          ["Subtract the known square from the long side squared", "13² − 5² = 169 − 25 = 144."],
          ["Take the square root", "√144 = 12."]
        ],
        answer: "12"
      },
      {
        problem: "A ladder leans against a wall. The base is 9 m from the wall and the ladder is 15 m long. How high does it reach?",
        steps: [
          ["The wall, ground, and ladder make a right triangle", "Legs 9 and h, long side 15."],
          ["Pythagoras", "15² − 9² = 225 − 81 = 144."],
          ["Root", "√144 = 12."]
        ],
        answer: "12 m"
      }
    ]
  });

  patch("g8", "parallel", {
    worked: [
      {
        problem: "On parallel lines, a corresponding (F) angle to 72° is marked. Find it.",
        pic: P.parallel("F", "72°", "?"),
        steps: [
          ["F angles copy", "Corresponding angles are equal when the lines are parallel."],
          ["Read the match", "The matching F angle is also 72°."]
        ],
        answer: "72°"
      },
      {
        problem: "On parallel lines, a co-interior (C) angle to 110° is marked. Find it.",
        pic: P.parallel("C", "110°", "?"),
        steps: [
          ["C angles make 180°", "They sit between the parallels on the same side of the transversal."],
          ["Subtract", "180 − 110 = 70."]
        ],
        answer: "70°"
      },
      {
        problem: "An alternate (Z) angle to 65° is marked on parallel lines. Find it.",
        pic: P.parallel("Z", "65°", "?"),
        steps: [
          ["Z angles copy", "Alternate angles are equal."],
          ["Match", "65°."]
        ],
        answer: "65°"
      }
    ]
  });

  patch("g8", "congruent", {
    worked: [
      {
        problem: "Two triangles share two sides and the angle between those sides. Which test proves they are congruent?",
        pic: P.congruence("SAS"),
        steps: [
          ["Name what matches", "Two sides and the included angle."],
          ["Pick the test", "That is SAS."]
        ],
        answer: "SAS"
      },
      {
        problem: "All three angles match, but no sides are given. Can you prove the triangles are congruent?",
        pic: P.congruence("AAA"),
        steps: [
          ["AAA gives the same shape", "The triangles are similar."],
          ["Same shape is not same size", "Without a side, you cannot prove congruence."]
        ],
        answer: "Not enough to prove it (AAA is not a congruence test)"
      },
      {
        problem: "Both triangles are right-angled, share the same hypotenuse, and share one more side. Which test?",
        pic: P.congruence("RHS"),
        steps: [
          ["List the matches", "Right angle, hypotenuse, and one more side."],
          ["Name the test", "RHS."]
        ],
        answer: "RHS"
      }
    ]
  });

  patch("g8", "quad", {
    worked: [
      {
        problem: "Three angles of a quadrilateral are 85°, 95°, and 110°. Find the fourth.",
        pic: P.quad(["85°", "95°", "110°", "?"]),
        steps: [
          ["Four corners make 360°", "Add the three you know: 85 + 95 + 110 = 290."],
          ["Take from 360°", "360 − 290 = 70."]
        ],
        answer: "70°"
      },
      {
        problem: "A parallelogram has one angle 58°. Find the opposite angle and a next-door angle.",
        steps: [
          ["Opposite angles match", "The opposite angle is also 58°."],
          ["Next-door angles on a parallelogram add to 180°", "180 − 58 = 122."]
        ],
        answer: "Opposite 58°, next-door 122°"
      },
      {
        problem: "The angles of a quadrilateral are x°, 2x°, 3x°, and 4x°. Find x.",
        steps: [
          ["Sum is 360°", "x + 2x + 3x + 4x = 360."],
          ["Tidy", "10x = 360, so x = 36."]
        ],
        answer: "x = 36"
      }
    ]
  });

  /* ---------- Grade 9: worked problems for existing lessons ---------- */

  patch("g9", "similar", {
    worked: [
      {
        problem: "Two similar triangles have scale factor 3. A small side is 5. Find the matching big side.",
        pic: P.similar("5", "?"),
        steps: [
          ["Scale multiplies every side", "Big = small × scale."],
          ["Multiply", "5 × 3 = 15."]
        ],
        answer: "15"
      },
      {
        problem: "Matching sides are 6 and 15. A small side is 4. Find the matching big side.",
        steps: [
          ["Find the scale", "15 ÷ 6 = 2.5."],
          ["Scale the other side", "4 × 2.5 = 10."]
        ],
        answer: "10"
      },
      {
        problem: "Why is AAA not enough to prove congruence, but enough for similarity?",
        steps: [
          ["Matching angles → same shape", "That is the definition of similar."],
          ["Same shape can still be different sizes", "Congruence needs the sizes to match too."]
        ],
        answer: "AAA proves similar (same shape), not congruent (same size)."
      }
    ]
  });

  patch("g9", "bpt", {
    worked: [
      {
        problem: "A line parallel to the base cuts the left side into 2 and 4, and the top-right piece is 3. Find the bottom-right piece.",
        pic: P.bpt(2, 4, 3, "?"),
        steps: [
          ["Parallel cut keeps the ratio", "2 : 4 = 3 : ?"],
          ["Each piece is ×2 on the left", "So the right bottom is 3 × 2 = 6."]
        ],
        answer: "6"
      },
      {
        problem: "Left pieces 3 and 5. Right top piece 6. Find the right bottom piece.",
        steps: [
          ["Same ratio", "3 : 5 = 6 : ?"],
          ["Scale is 2", "5 × 2 = 10."]
        ],
        answer: "10"
      },
      {
        problem: "What goes wrong if the cut is not parallel to the base?",
        steps: [
          ["The theorem needs a parallel cut", "Only then do the side pieces stay in the same ratio."],
          ["A slanted cut breaks the match", "You cannot set the ratios equal."]
        ],
        answer: "Without parallel, the side ratios need not match."
      }
    ]
  });

  patch("g9", "midseg", {
    worked: [
      {
        problem: "The base of a triangle is 18. Find the midsegment that joins the midpoints of the other two sides.",
        pic: P.midseg("18", "?"),
        steps: [
          ["Midsegment is half the base", "And parallel to it."],
          ["Halve", "18 ÷ 2 = 9."]
        ],
        answer: "9"
      },
      {
        problem: "A midsegment is 7. Find the third side (the base it is parallel to).",
        pic: P.midseg("?", "7"),
        steps: [
          ["The base is double the midsegment", "Double 7."],
          ["Multiply", "14."]
        ],
        answer: "14"
      },
      {
        problem: "Only one end of a segment is a midpoint. Can you use the half rule?",
        steps: [
          ["Both ends must be midpoints", "That is the midsegment theorem."],
          ["One midpoint is not enough", "The half-and-parallel rule does not apply."]
        ],
        answer: "No — both ends must be midpoints."
      }
    ]
  });

  patch("g9", "semicircle", {
    worked: [
      {
        problem: "AB is a diameter. Angle at A is 40°. Find the angle at B on the circle.",
        pic: P.semicircle("40°", "?"),
        steps: [
          ["Angle in a semicircle is 90°", "The rim angle at the circle, across from the diameter, is 90°."],
          ["The two sharp angles share 90°", "90 − 40 = 50."]
        ],
        answer: "50°"
      },
      {
        problem: "AB is a diameter and C is on the circle. Find angle ACB.",
        steps: [
          ["C sits on the circle across from diameter AB", "That is the angle in a semicircle."],
          ["It is a right angle", "Angle ACB = 90°."]
        ],
        answer: "90°"
      },
      {
        problem: "Is the angle at the center of a diameter also 90°?",
        steps: [
          ["A diameter through the center is a straight line", "That angle is 180°."],
          ["The 90° sits on the rim", "Not at the center."]
        ],
        answer: "No — the center angle on a diameter is 180°."
      }
    ]
  });

  patch("g9", "tangent", {
    worked: [
      {
        problem: "A tangent at T meets radius OT at 90°. Angle at P (outside) is 35°. Find the angle at the center O in triangle OTP.",
        pic: P.tangent("35°", "?"),
        steps: [
          ["Radius meets tangent at 90°", "Angle at T is 90°."],
          ["Angle sum in the triangle", "180 − 90 − 35 = 55."]
        ],
        answer: "55°"
      },
      {
        problem: "Two tangents from point P touch a circle at A and B. PA = 9. Find PB.",
        steps: [
          ["Two tangents from the same point are equal", "PA = PB."],
          ["Copy the length", "PB = 9."]
        ],
        answer: "9"
      },
      {
        problem: "A line cuts through a circle at two points. Is it a tangent?",
        steps: [
          ["A tangent touches once", "It does not cut through."],
          ["Two intersection points means a secant", "Not a tangent."]
        ],
        answer: "No — a tangent touches at exactly one point."
      }
    ]
  });

  patch("g9", "quadratic", {
    worked: [
      {
        problem: "Solve x² − 5x + 6 = 0.",
        pic: P.parabola(2, 3),
        steps: [
          ["Read a, b, c", "a = 1, b = −5, c = 6."],
          ["Discriminant", "b² − 4ac = 25 − 24 = 1."],
          ["Quadratic formula", "x = (5 ± 1) ÷ 2."],
          ["Both answers", "x = 3 or x = 2."]
        ],
        answer: "x = 2 or x = 3"
      },
      {
        problem: "Solve x² + 4x + 4 = 0.",
        steps: [
          ["Discriminant", "16 − 16 = 0."],
          ["One repeated root", "x = −4 ÷ 2 = −2."]
        ],
        answer: "x = −2 (repeated)"
      },
      {
        problem: "For x² + x + 1 = 0, how many real solutions?",
        steps: [
          ["Discriminant", "1 − 4 = −3."],
          ["Negative means no real root", "The parabola never hits the x-axis."]
        ],
        answer: "0 real solutions"
      }
    ]
  });

  /* ---------- Grade 8: new lessons ---------- */

  add("g8", [
    {
      id: "polyint", name: "Polygon interior angles", phrase: "Cut the polygon into triangles: (n − 2) × 180°.",
      steps: ["Count the sides n.", "A polygon splits into n − 2 triangles from one corner.", "Each triangle is 180°, so the interior sum is (n − 2) × 180°.", "For a regular polygon, each interior angle is that sum ÷ n."],
      exception: "n must be at least 3. Exterior angles are a different story: they always sum to 360°, not (n − 2) × 180°.",
      pic: () => polyPic(5, "(5 − 2) × 180° = 540°"),
      gen() {
        const n = R(3, 10);
        const sum = (n - 2) * 180;
        const ang = (x) => `${x}°`;
        if (Math.random() < 0.55) {
          return Q(`Find the sum of the interior angles of a ${n}-gon.`, ang(sum), [ang((n - 1) * 180), ang(n * 180), ang((n - 2) * 90), ang(360)],
            `(${n} − 2) × 180 = ${n - 2} × 180 = ${sum}.`, polyPic(n, `(${n} − 2) × 180°`));
        }
        const each = sum / n;
        if (each % 1 !== 0) {
          return Q(`Interior angle sum of a ${n}-gon?`, ang(sum), [ang((n - 1) * 180), ang(n * 90), ang(360)],
            `(${n} − 2) × 180 = ${sum}.`, polyPic(n));
        }
        return Q(`Each interior angle of a regular ${n}-gon?`, ang(each), [ang(sum), ang(360 / n), ang(180 - 360 / n), ang(each + 10)],
          `Sum ${(n - 2) * 180}°, then ÷ ${n} = ${each}.`, polyPic(n, `each = ${each}°`));
      },
      worked: [
        {
          problem: "Find the interior angle sum of a hexagon.",
          pic: polyPic(6, "(6 − 2) × 180° = 720°"),
          steps: [["Count sides", "A hexagon has n = 6."], ["(n − 2) × 180°", "(6 − 2) × 180 = 4 × 180 = 720."]],
          answer: "720°"
        },
        {
          problem: "Each interior angle of a regular pentagon?",
          steps: [["Sum first", "(5 − 2) × 180 = 540."], ["Divide by 5", "540 ÷ 5 = 108."]],
          answer: "108°"
        },
        {
          problem: "A regular polygon has interior angle 150°. How many sides?",
          steps: [["Each = sum ÷ n", "((n − 2) × 180) ÷ n = 150."], ["Solve", "180n − 360 = 150n → 30n = 360 → n = 12."]],
          answer: "12 sides"
        }
      ]
    },
    {
      id: "polyext", name: "Exterior angles of a polygon", phrase: "Walk around the shape: exterior angles always add to 360°.",
      steps: ["At each corner, the exterior is the turn you make.", "All the turns make one full spin: 360°.", "For a regular n-gon, each exterior angle is 360° ÷ n.", "Interior and exterior at a corner sit on a straight line: they add to 180°."],
      exception: "This is one exterior at each vertex, all the same way around. Do not mix interior sums with exterior sums.",
      pic: () => polyPic(6, "exteriors sum to 360°"),
      gen() {
        const n = pick([3, 4, 5, 6, 8, 9, 10, 12]);
        const each = 360 / n;
        if (Math.random() < 0.5) {
          return Q(`Each exterior angle of a regular ${n}-gon?`, `${each}°`, [deg((n - 2) * 180 / n), deg(180 - each), deg(360 - each), deg(n)],
            `Exteriors sum to 360°. Each = 360 ÷ ${n} = ${each}.`, polyPic(n, `each exterior ${each}°`));
        }
        return Q(`A regular polygon has exterior angle ${each}°. How many sides?`, n, [360 - each, (n - 2) * 180 / each, n + 1, 180 / each],
          `n = 360 ÷ ${each} = ${n}.`, polyPic(n));
      },
      worked: [
        {
          problem: "Each exterior angle of a regular octagon?",
          steps: [["Exteriors sum to 360°", "Split equally among 8 corners."], ["Divide", "360 ÷ 8 = 45."]],
          answer: "45°"
        },
        {
          problem: "A regular polygon has exterior angle 24°. How many sides?",
          steps: [["n = 360 ÷ exterior", "360 ÷ 24."], ["Divide", "15."]],
          answer: "15 sides"
        },
        {
          problem: "A regular polygon has exterior angle 40°. Find each interior angle.",
          steps: [["Interior + exterior = 180°", "They sit on a straight line."], ["Subtract", "180 − 40 = 140."]],
          answer: "140°"
        }
      ]
    },
    {
      id: "straight", name: "Angles on a line and around a point", phrase: "On a line: 180°. Around a point: 360°. Vertically opposite: equal.",
      steps: ["Angles on a straight line add to 180°.", "Angles around a point add to 360°.", "When two lines cross, vertically opposite angles are equal."],
      exception: "Adjacent angles on a cross are not equal — they make 180°. Only the ones across from each other match.",
      pic: () => lineAngles({ a: "70°", b: "110°", c: "70°", d: "110°", note: "Vertically opposite angles match" }),
      gen() {
        const kind = pick(["line", "point", "vert"]);
        if (kind === "line") {
          const a = R(20, 160);
          return Q(`Angles on a straight line: one is ${a}°. Find the other.`, `${180 - a}°`, [deg(a), deg(360 - a), deg(90 - a + 90)],
            `On a line: 180 − ${a} = ${180 - a}.`, lineAngles({ a: `${a}°`, b: "?" }));
        }
        if (kind === "point") {
          const a = R(40, 120), b = R(40, 120), c = R(40, 100);
          const d = 360 - a - b - c;
          if (d < 20 || d > 200) return this.gen();
          return Q(`Around a point: ${a}°, ${b}°, and ${c}°. Find the fourth.`, `${d}°`, [deg(180 - d), deg(a + b + c), deg(360 - a - b)],
            `360 − ${a + b + c} = ${d}.`, lineAngles({ note: "around a point → 360°" }));
        }
        const a = R(20, 160);
        return Q(`Two lines cross. One angle is ${a}°. Find the vertically opposite angle.`, `${a}°`, [deg(180 - a), deg(360 - a), deg(90)],
          `Vertically opposite angles are equal: ${a}°.`, lineAngles({ a: `${a}°`, c: "?" }));
      },
      worked: [
        {
          problem: "Angles on a straight line: one is 63°. Find the other.",
          steps: [["On a line they add to 180°", "180 − 63."], ["Subtract", "117."]],
          answer: "117°"
        },
        {
          problem: "Two lines cross. One angle is 128°. Find the vertically opposite angle and a next-door angle.",
          steps: [["Vertically opposite copy", "128°."], ["Next-door makes a straight line", "180 − 128 = 52."]],
          answer: "Opposite 128°, adjacent 52°"
        },
        {
          problem: "Three angles around a point are 80°, 95°, and 70°. Find the fourth.",
          steps: [["Around a point: 360°", "80 + 95 + 70 = 245."], ["Subtract", "360 − 245 = 115."]],
          answer: "115°"
        }
      ]
    },
    {
      id: "slope", name: "Slope", phrase: "Slope is rise over run.",
      steps: ["Pick two points on the line.", "Rise = change in y (up is positive).", "Run = change in x (right is positive).", "Slope m = rise ÷ run."],
      exception: "A horizontal line has slope 0 (rise 0). A vertical line has no slope (run 0 — you cannot divide by 0). Count the direction: down means negative rise.",
      pic: () => slopePic(3, 4),
      gen() {
        let x1, y1, x2, y2;
        do {
          x1 = R(0, 5); y1 = R(0, 5); x2 = R(0, 6); y2 = R(0, 6);
        } while (x1 === x2 || y1 === y2);
        const rise = y2 - y1, run = x2 - x1;
        const g = gcd(rise, run);
        const ans = fr(rise / g, run / g).replace("-", "−");
        const wrongs = [fr(run / g, rise / g), fr(-rise / g, run / g), String(rise), String(run)].map((s) => s.replace("-", "−"));
        return Q(`Points (${x1}, ${y1}) and (${x2}, ${y2}). Find the slope.`, ans, wrongs,
          `Rise ${neg(rise)}, run ${neg(run)}. m = ${ans}.`, slopePic(Math.abs(rise), Math.abs(run)));
      },
      worked: [
        {
          problem: "Points (1, 2) and (4, 8). Find the slope.",
          pic: slopePic(6, 3),
          steps: [["Rise", "8 − 2 = 6."], ["Run", "4 − 1 = 3."], ["Rise over run", "6 ÷ 3 = 2."]],
          answer: "2"
        },
        {
          problem: "Points (0, 5) and (5, 0). Find the slope.",
          steps: [["Rise", "0 − 5 = −5."], ["Run", "5 − 0 = 5."], ["Divide", "−5 ÷ 5 = −1."]],
          answer: "−1"
        },
        {
          problem: "A line goes through (2, 3) and (2, 9). What is its slope?",
          steps: [["Run", "2 − 2 = 0."], ["You cannot divide by 0", "A vertical line has no slope."]],
          answer: "No slope (vertical)"
        }
      ]
    },
    {
      id: "ymxb", name: "Slope-intercept form", phrase: "y = mx + b: m is the slope, b is where it hits the y-axis.",
      steps: ["Read m: the number in front of x (slope).", "Read b: the constant term (y-intercept).", "To find y, plug in x. To find x, plug in y and solve."],
      exception: "If the equation is not solved for y, rearrange first. The intercept is on the y-axis (x = 0), not the x-axis.",
      pic: () => lineEq(1, 2),
      gen() {
        const m = pick([-3, -2, -1, 1, 2, 3, 4]);
        const b = R(-4, 5);
        const mx = Math.abs(m) === 1 ? (m < 0 ? "−x" : "x") : `${neg(m)}x`;
        const eq = `y = ${mx}${b === 0 ? "" : b > 0 ? ` + ${b}` : ` − ${-b}`}`;
        const kind = pick(["y", "m", "b", "point"]);
        if (kind === "m") {
          return Q(`In ${eq}, what is the slope?`, neg(m), [neg(-m), neg(b), neg(m + b), "0"],
            `m is the coefficient of x: ${neg(m)}.`, lineEq(Math.abs(m) <= 4 ? m : 1, Math.max(0, b)));
        }
        if (kind === "b") {
          return Q(`In ${eq}, where does the line hit the y-axis?`, neg(b), [neg(m), neg(-b), neg(m + b)],
            `b is the constant: ${neg(b)}.`, lineEq(Math.abs(m) <= 4 ? m : 1, Math.max(0, b)));
        }
        const x = R(1, 4);
        const y = m * x + b;
        if (kind === "point") {
          return Q(`Does (${x}, ${y}) lie on ${eq}?`, "yes", ["no"],
            `Plug in x = ${x}: ${neg(m)}(${x})${b === 0 ? "" : b > 0 ? ` + ${b}` : ` − ${-b}`} = ${neg(y)}.`, lineEq(Math.abs(m) <= 4 ? m : 1, Math.max(0, b)));
        }
        return Q(`On ${eq}, find y when x = ${x}.`, neg(y), [neg(m * x), neg(y + 1), neg(x + b)],
          `${neg(m)} × ${x}${b === 0 ? "" : b > 0 ? ` + ${b}` : ` − ${-b}`} = ${neg(y)}.`, lineEq(Math.abs(m) <= 4 ? m : 1, Math.max(0, b)));
      },
      worked: [
        {
          problem: "For y = 3x − 2, find the slope and y-intercept.",
          steps: [["Slope is m", "m = 3."], ["Intercept is b", "b = −2: it hits the y-axis at (0, −2)."]],
          answer: "slope 3, y-intercept −2"
        },
        {
          problem: "On y = −2x + 5, find y when x = 3.",
          steps: [["Plug in x", "y = −2(3) + 5."], ["Compute", "−6 + 5 = −1."]],
          answer: "y = −1"
        },
        {
          problem: "A line has slope 4 and passes through (0, −1). Write its equation.",
          steps: [["Use y = mx + b", "m = 4 and the y-intercept is −1."], ["Write", "y = 4x − 1."]],
          answer: "y = 4x − 1"
        }
      ]
    },
    {
      id: "expLaws", name: "Laws of exponents", phrase: "Multiply → add powers. Divide → subtract. Power of a power → multiply.",
      steps: ["xᵃ × xᵇ = xᵃ⁺ᵇ.", "xᵃ ÷ xᵇ = xᵃ⁻ᵇ.", "(xᵃ)ᵇ = xᵃᵇ.", "x⁰ = 1 (for x ≠ 0)."],
      exception: "The bases must match before you add or subtract powers. (x²)³ is x⁶, not x⁵. And 2³ × 2⁴ = 2⁷, not 4⁷.",
      pic: () => P.chain(["x³ × x⁴", "x⁷"], ["add powers"]),
      gen() {
        const kind = pick(["mul", "div", "pow", "zero"]);
        const a = R(2, 6), b = R(2, 5);
        if (kind === "mul") {
          return Q(`x${sup(a)} × x${sup(b)}`, `x${sup(a + b)}`, [`x${sup(a * b)}`, `x${sup(a - b)}`, `x${sup(a + b + 1)}`, `${2 * a}x`],
            `Multiply → add powers: ${a} + ${b} = ${a + b}.`, P.chain([`x${sup(a)} × x${sup(b)}`, `x${sup(a + b)}`], ["add"]));
        }
        if (kind === "div") {
          const top = a + b;
          return Q(`x${sup(top)} ÷ x${sup(a)}`, `x${sup(b)}`, [`x${sup(top + a)}`, `x${sup(top * a)}`, `x${sup(Math.abs(top - 2 * a))}`],
            `Divide → subtract: ${top} − ${a} = ${b}.`);
        }
        if (kind === "pow") {
          return Q(`(x${sup(a)})${sup(b)}`, `x${sup(a * b)}`, [`x${sup(a + b)}`, `x${sup(a - b)}`, `x${sup(a)}`],
            `Power of a power → multiply: ${a} × ${b} = ${a * b}.`);
        }
        return Q(`x${sup(0)}`, "1", ["0", "x", "undefined"], "Any non-zero number to the power 0 is 1.");
      },
      worked: [
        {
          problem: "Simplify x⁵ × x³.",
          steps: [["Same base, multiply → add", "5 + 3 = 8."], ["Write", "x⁸."]],
          answer: "x⁸"
        },
        {
          problem: "Simplify (x⁴)³.",
          steps: [["Power of a power → multiply", "4 × 3 = 12."], ["Write", "x¹²."]],
          answer: "x¹²"
        },
        {
          problem: "Simplify x⁹ ÷ x⁴.",
          steps: [["Same base, divide → subtract", "9 − 4 = 5."], ["Write", "x⁵."]],
          answer: "x⁵"
        }
      ]
    },
    {
      id: "sci", name: "Scientific notation", phrase: "One digit, then a dot, times a power of ten.",
      steps: ["Move the dot until one non-zero digit sits in front.", "Count how many places you moved: that is the power of 10.", "Left moves give a positive power; right moves give a negative power."],
      exception: "The front number must be at least 1 and less than 10. 34 × 10³ is not scientific notation — write 3.4 × 10⁴.",
      pic: () => P.chain(["45000", "4.5 × 10⁴"], ["dot jumps 4 left"]),
      gen() {
        const exp = R(2, 5);
        const lead = pick([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const tenths = R(0, 9);
        const front = tenths ? `${lead}.${tenths}` : String(lead);
        const n = lead * 10 ** exp + tenths * 10 ** (exp - 1);
        const ans = `${front} × 10${sup(exp)}`;
        return Q(`Write ${n.toLocaleString("en-US")} in scientific notation.`, ans,
          [`${front} × 10${sup(exp - 1)}`, `${lead}${tenths ? tenths : ""} × 10${sup(exp)}`, `${front} × 10${sup(exp + 1)}`, `${dp(lead * 10 + tenths, 1)} × 10${sup(exp)}`],
          `Dot jumps ${exp} places left: ${ans}.`, P.chain([String(n), ans], [`${exp} places`]));
      },
      worked: [
        {
          problem: "Write 45000 in scientific notation.",
          steps: [["Park the dot after one digit", "4.5."], ["Count the jumps left", "4 places: 4.5 × 10⁴."]],
          answer: "4.5 × 10⁴"
        },
        {
          problem: "Write 0.0032 in scientific notation.",
          steps: [["Park the dot after 3", "3.2."], ["Count the jumps right", "3 places: 3.2 × 10⁻³."]],
          answer: "3.2 × 10⁻³"
        },
        {
          problem: "Write 7.1 × 10³ as an ordinary number.",
          steps: [["Power 3 means jump the dot 3 right", "7.100."], ["Tidy", "7100."]],
          answer: "7100"
        }
      ]
    },
    {
      id: "cylvol", name: "Cylinder volume", phrase: "Cylinder volume is the circle floor times the height: πr²h.",
      steps: ["Find the radius r of the circular base.", "Area of the base: πr².", "Multiply by the height h.", "Use π ≈ 3.14."],
      exception: "Use radius, not diameter. If you are given the diameter, halve it first. Volume is not surface area.",
      pic: () => cylPic("r", "h"),
      gen() {
        const r = R(2, 8), h = R(2, 10);
        const V = dp(314 * r * r * h, 2);
        const wrong = dp(314 * (2 * r) * (2 * r) * h, 2);
        return Q(`Cylinder: r = ${r}, h = ${h}. Find the volume. Use π ≈ 3.14.`, V,
          [dp(314 * r * h, 2), dp(314 * r * r, 2), wrong, String(r * r * h)],
          `πr²h = 3.14 × ${r} × ${r} × ${h} = ${V}.`, cylPic(r, h));
      },
      worked: [
        {
          problem: "A can has radius 3 cm and height 10 cm. Find its volume (π ≈ 3.14).",
          pic: cylPic(3, 10),
          steps: [["Base area", "3.14 × 3 × 3 = 28.26."], ["Times height", "28.26 × 10 = 282.6."]],
          answer: "282.6 cm³"
        },
        {
          problem: "A cylinder has diameter 8 m and height 5 m. Find its volume (π ≈ 3.14).",
          steps: [["Radius first", "8 ÷ 2 = 4."], ["πr²h", "3.14 × 16 × 5 = 3.14 × 80 = 251.2."]],
          answer: "251.2 m³"
        },
        {
          problem: "Volume 628 cm³, radius 5 cm, π ≈ 3.14. Find the height.",
          steps: [["V = πr²h", "628 = 3.14 × 25 × h."], ["3.14 × 25 = 78.5", "h = 628 ÷ 78.5 = 8."]],
          answer: "8 cm"
        }
      ]
    },
    {
      id: "conevol", name: "Cone volume", phrase: "A cone is one-third of the cylinder with the same base and height.",
      steps: ["Same base and height as a cylinder would give πr²h.", "A cone fills only one-third of that: V = (1/3)πr²h.", "Use π ≈ 3.14."],
      exception: "Do not forget the 1/3. Comparing a cone to a cylinder only works when r and h match.",
      pic: () => conePic("r", "h"),
      gen() {
        const r = R(2, 6);
        let h;
        do { h = R(3, 12); } while ((r * r * h) % 3 !== 0);
        const V = dp(314 * r * r * h / 3, 2);
        return Q(`Cone: r = ${r}, h = ${h}. Find the volume. Use π ≈ 3.14.`, V,
          [dp(314 * r * r * h, 2), dp(314 * r * r * h / 2, 2), dp(314 * r * h, 2), String((r * r * h) / 3)],
          `(1/3)πr²h = (1/3) × 3.14 × ${r} × ${r} × ${h} = ${V}.`, conePic(r, h));
      },
      worked: [
        {
          problem: "Cone with r = 3 and h = 6. Volume? (π ≈ 3.14)",
          pic: conePic(3, 6),
          steps: [["Cylinder with same base and height", "3.14 × 9 × 6 = 169.56."], ["Cone is one-third", "169.56 ÷ 3 = 56.52."]],
          answer: "56.52"
        },
        {
          problem: "Cone with r = 6 and h = 5. Volume? (π ≈ 3.14)",
          steps: [["(1/3)πr²h", "(1/3) × 3.14 × 36 × 5."], ["36 × 5 = 180", "(1/3) × 3.14 × 180 = 3.14 × 60 = 188.4."]],
          answer: "188.4"
        },
        {
          problem: "A cone and a cylinder share r and h. The cylinder’s volume is 90. What is the cone’s?",
          steps: [["Cone is one-third of the cylinder", "Same base and height."], ["Divide", "90 ÷ 3 = 30."]],
          answer: "30"
        }
      ]
    },
    {
      id: "spherevol", name: "Sphere volume", phrase: "Sphere volume: (4/3)πr³.",
      steps: ["Cube the radius: r³.", "Multiply by π.", "Multiply by 4/3.", "Use π ≈ 3.14."],
      exception: "r³ means r × r × r, not 3r. Diameter must be halved before you start.",
      pic: () => spherePic("r"),
      gen() {
        const r = pick([3, 6]);
        const V = dp((4 * 314 * r * r * r) / 3, 2);
        return Q(`Sphere: r = ${r}. Find the volume. Use π ≈ 3.14.`, V,
          [dp(314 * r * r * r, 2), dp((4 * 314 * r * r) / 3, 2), dp(314 * 4 * r, 2), String((4 * r * r * r) / 3)],
          `(4/3)πr³ = (4/3) × 3.14 × ${r}³ = ${V}.`, spherePic(r));
      },
      worked: [
        {
          problem: "Sphere with radius 3. Volume? (π ≈ 3.14)",
          pic: spherePic(3),
          steps: [["r³", "3 × 3 × 3 = 27."], ["(4/3)πr³", "(4/3) × 3.14 × 27 = 4 × 3.14 × 9 = 113.04."]],
          answer: "113.04"
        },
        {
          problem: "Sphere with diameter 12. Volume? (π ≈ 3.14)",
          steps: [["Radius", "12 ÷ 2 = 6."], ["r³", "216."],           ["(4/3) × 3.14 × 216", "4 × 3.14 × 72 = 904.32."]],
          answer: "904.32"
        },
        {
          problem: "Why is (4/3)πr² not the volume formula?",
          steps: [["Volume needs three lengths multiplied", "r³, not r²."], ["r² would give an area-like quantity", "The surface area uses 4πr²; volume uses (4/3)πr³."]],
          answer: "Volume needs r³; 4πr² is surface area"
        }
      ]
    },
    {
      id: "pythagConv", name: "Converse of Pythagoras", phrase: "If a² + b² = c², then the triangle is right-angled at the corner between a and b.",
      steps: ["Square all three sides.", "Check whether the two smaller squares add to the biggest square.", "If yes, it is right-angled. If the sum is too small or too big, it is not."],
      exception: "c must be the longest side. Checking the wrong side as “hypotenuse” can fool you.",
      pic: () => P.rightTri({ opp: "a", adj: "b", hyp: "c" }),
      gen() {
        if (Math.random() < 0.55) {
          const [a, b, c] = pick(TRIPLES);
          return Q(`Sides ${a}, ${b}, ${c}. Is it a right triangle?`, "yes", ["no"],
            `${a}² + ${b}² = ${a * a + b * b} = ${c}². So yes.`, P.rightTri({ opp: a, adj: b, hyp: c }));
        }
        const [a, b] = pick([[3, 4], [5, 12], [6, 8], [7, 24]]);
        const c = a + b - 1;
        return Q(`Sides ${a}, ${b}, ${c}. Is it a right triangle?`, "no", ["yes"],
          `${a}² + ${b}² = ${a * a + b * b}, but ${c}² = ${c * c}. Not equal.`, P.tri(String(a), String(b), String(c)));
      },
      worked: [
        {
          problem: "Sides 5, 12, 13. Right triangle?",
          steps: [["Square", "25 + 144 = 169."], ["Compare with 13²", "169 = 169. Yes."]],
          answer: "Yes"
        },
        {
          problem: "Sides 4, 5, 6. Right triangle?",
          steps: [["Square", "16 + 25 = 41."], ["6² = 36", "41 ≠ 36. No."]],
          answer: "No"
        },
        {
          problem: "Sides 9, 12, 15. Right triangle?",
          steps: [["Notice the 3-4-5 scale", "×3 gives 9-12-15."], ["Check", "81 + 144 = 225 = 15². Yes."]],
          answer: "Yes (scaled 3-4-5)"
        }
      ]
    },
    {
      id: "transform", name: "Transformations", phrase: "Slide, flip, or turn: translation, reflection, rotation.",
      steps: ["Translation: add the same (a, b) to every point.", "Reflection in the x-axis: (x, y) → (x, −y). In the y-axis: (x, y) → (−x, y).", "Rotation 90° anticlockwise about the origin: (x, y) → (−y, x).", "Rotation 180°: (x, y) → (−x, −y)."],
      exception: "Clockwise 90° is (x, y) → (y, −x), the other way. Reflections in other lines need different rules. Translations do not flip or turn the shape.",
      pic: () => gridPts([[2, 1, "A"], [2, 4, "A′"]], { seg: [[2, 1], [2, 4]] }),
      gen() {
        const x = R(1, 4), y = R(1, 4);
        const kind = pick(["trans", "rx", "ry", "r90", "r180"]);
        const pt = (a, b) => `(${neg(a)}, ${neg(b)})`;
        if (kind === "trans") {
          const a = R(1, 3), b = R(1, 3);
          return Q(`${pt(x, y)} translated by (${a}, ${b})`, pt(x + a, y + b), [pt(x - a, y - b), pt(x + b, y + a), pt(a, b)],
            `Add: (${x} + ${a}, ${y} + ${b}) = ${pt(x + a, y + b)}.`);
        }
        if (kind === "rx") {
          return Q(`${pt(x, y)} reflected in the x-axis`, pt(x, -y), [pt(-x, y), pt(-x, -y), pt(y, x)],
            `(x, y) → (x, −y): ${pt(x, -y)}.`);
        }
        if (kind === "ry") {
          return Q(`${pt(x, y)} reflected in the y-axis`, pt(-x, y), [pt(x, -y), pt(-x, -y), pt(y, x)],
            `(x, y) → (−x, y): ${pt(-x, y)}.`);
        }
        if (kind === "r90") {
          return Q(`${pt(x, y)} rotated 90° anticlockwise about O`, pt(-y, x), [pt(y, -x), pt(-x, -y), pt(y, x)],
            `(x, y) → (−y, x): ${pt(-y, x)}.`);
        }
        return Q(`${pt(x, y)} rotated 180° about O`, pt(-x, -y), [pt(-y, x), pt(x, -y), pt(-x, y)],
          `(x, y) → (−x, −y): ${pt(-x, -y)}.`);
      },
      worked: [
        {
          problem: "Translate (3, 1) by (2, −4).",
          steps: [["Add the vector", "(3 + 2, 1 + (−4))."], ["Tidy", "(5, −3)."]],
          answer: "(5, −3)"
        },
        {
          problem: "Reflect (4, −2) in the y-axis.",
          steps: [["Rule", "(x, y) → (−x, y)."], ["Apply", "(−4, −2)."]],
          answer: "(−4, −2)"
        },
        {
          problem: "Rotate (1, 5) by 90° anticlockwise about the origin.",
          steps: [["Rule", "(x, y) → (−y, x)."], ["Apply", "(−5, 1)."]],
          answer: "(−5, 1)"
        }
      ]
    }
  ]);

  /* ---------- Grade 9: new lessons ---------- */

  add("g9", [
    {
      id: "foil", name: "FOIL expanding", phrase: "First, Outside, Inside, Last.",
      steps: ["First: the two first terms.", "Outside: the two outer terms.", "Inside: the two inner terms.", "Last: the two last terms.", "Add them and tidy like terms."],
      exception: "Watch the signs: (x − 3)(x + 2) still uses FOIL, but the insides and lasts pick up minuses. FOIL is for two brackets; three brackets need more steps.",
      pic: () => foilPic(3, 2),
      gen() {
        let a, b;
        do { a = R(-6, 6); b = R(-6, 6); } while (!a || !b || a + b === 0 || a === b);
        const sum = a + b, prod = a * b;
        const ans = `x²${term(sum)}${prod < 0 ? ` − ${-prod}` : ` + ${prod}`}`;
        const wrongs = [
          `x²${term(sum)}${prod < 0 ? ` + ${-prod}` : ` − ${prod}`}`,
          `x²${term(a * b)}${sum < 0 ? ` − ${-sum}` : ` + ${sum}`}`,
          `x²${term(sum - 1)}${prod < 0 ? ` − ${-prod}` : ` + ${prod}`}`,
          `x²${term(sum)}${(-prod) < 0 ? ` − ${prod}` : ` + ${-prod}`}`
        ];
        const fa = a < 0 ? `x − ${-a}` : `x + ${a}`;
        const fb = b < 0 ? `x − ${-b}` : `x + ${b}`;
        return Q(`Expand (${fa})(${fb})`, ans, wrongs,
          `F: x². O: ${neg(b)}x. I: ${neg(a)}x. L: ${neg(prod)}. Tidy: ${ans}.`, foilPic(a, b));
      },
      worked: [
        {
          problem: "Expand (x + 3)(x + 2).",
          pic: foilPic(3, 2),
          steps: [["First", "x × x = x²."], ["Outside", "x × 2 = 2x."], ["Inside", "3 × x = 3x."], ["Last", "3 × 2 = 6."], ["Tidy", "x² + 5x + 6."]],
          answer: "x² + 5x + 6"
        },
        {
          problem: "Expand (x − 4)(x + 5).",
          steps: [["FOIL", "x² + 5x − 4x − 20."], ["Tidy", "x² + x − 20."]],
          answer: "x² + x − 20"
        },
        {
          problem: "Expand (x − 3)(x − 3).",
          steps: [["FOIL", "x² − 3x − 3x + 9."], ["Tidy", "x² − 6x + 9."]],
          answer: "x² − 6x + 9"
        }
      ]
    },
    {
      id: "dos", name: "Difference of two squares", phrase: "a² − b² = (a − b)(a + b).",
      steps: ["Spot two squares with a minus between them.", "Write (√first − √second)(√first + √second).", "Check by FOIL: the middle terms cancel."],
      exception: "It must be a minus. a² + b² does not factor over the reals this way. And 9x² − 4 is (3x − 2)(3x + 2), not (9x − 2)(x + 2).",
      pic: () => P.chain(["x² − 9", "(x − 3)(x + 3)"], ["difference of squares"]),
      gen() {
        const b = R(2, 9);
        const ans = `(x − ${b})(x + ${b})`;
        return Q(`Factorise x² − ${b * b}`, ans, [`(x − ${b})(x − ${b})`, `(x + ${b})(x + ${b})`, `x(x − ${b * b})`, `(x − ${b * b})(x + 1)`],
          `x² − ${b}² = (x − ${b})(x + ${b}).`);
      },
      worked: [
        {
          problem: "Factorise x² − 16.",
          steps: [["Squares", "x² and 4²."], ["Write the pair", "(x − 4)(x + 4)."]],
          answer: "(x − 4)(x + 4)"
        },
        {
          problem: "Factorise 9x² − 25.",
          steps: [["Squares", "(3x)² and 5²."], ["Write the pair", "(3x − 5)(3x + 5)."]],
          answer: "(3x − 5)(3x + 5)"
        },
        {
          problem: "Expand (x − 7)(x + 7).",
          steps: [["Difference of squares the other way", "x² − 7²."], ["Compute", "x² − 49."]],
          answer: "x² − 49"
        }
      ]
    },
    {
      id: "factor", name: "Factorising quadratics", phrase: "Find two numbers that multiply to c and add to b.",
      steps: ["For x² + bx + c, find two numbers with product c and sum b.", "Write (x + p)(x + q).", "Check by expanding."],
      exception: "If the numbers you need do not exist as integers, it may not factor nicely. Leading coefficient not 1 needs a different hunt (or the quadratic formula).",
      pic: () => P.chain(["x² + 5x + 6", "(x + 2)(x + 3)"], ["2 × 3 = 6, 2 + 3 = 5"]),
      gen() {
        let p, q;
        do { p = R(-8, 8); q = R(-8, 8); } while (!p || !q || p + q === 0 || Math.abs(p) === Math.abs(q) && p !== q && p * q > 0);
        const b = p + q, c = p * q;
        const ans = `(x${p < 0 ? ` − ${-p}` : ` + ${p}`})(x${q < 0 ? ` − ${-q}` : ` + ${q}`})`;
        const swap = `(x${q < 0 ? ` − ${-q}` : ` + ${q}`})(x${p < 0 ? ` − ${-p}` : ` + ${p}`})`;
        const wrongs = [
          `(x${p < 0 ? ` + ${-p}` : ` − ${p}`})(x${q < 0 ? ` + ${-q}` : ` − ${q}`})`,
          `(x + ${c})(x + ${b})`,
          `(x${b < 0 ? ` − ${-b}` : ` + ${b}`})(x${c < 0 ? ` − ${-c}` : ` + ${c}`})`,
          swap === ans ? `(x + ${p + 1})(x + ${q - 1})` : swap
        ];
        return Q(`Factorise ${qx(1, b, c)}`, ans, wrongs,
          `Need product ${c} and sum ${b}: ${p} and ${q}. So ${ans}.`);
      },
      worked: [
        {
          problem: "Factorise x² + 7x + 12.",
          steps: [["Product 12, sum 7", "3 and 4."], ["Write", "(x + 3)(x + 4)."]],
          answer: "(x + 3)(x + 4)"
        },
        {
          problem: "Factorise x² − 5x + 6.",
          steps: [["Product 6, sum −5", "−2 and −3."], ["Write", "(x − 2)(x − 3)."]],
          answer: "(x − 2)(x − 3)"
        },
        {
          problem: "Factorise x² + x − 12.",
          steps: [["Product −12, sum 1", "4 and −3."], ["Write", "(x + 4)(x − 3)."]],
          answer: "(x + 4)(x − 3)"
        }
      ]
    },
    {
      id: "ineq", name: "Inequalities", phrase: "Solve like an equation — but flip the sign when you × or ÷ by a negative.",
      steps: ["Move terms the same way you would for =.", "If you multiply or divide both sides by a negative, flip < ↔ >.", "Check with a test number."],
      exception: "Adding or subtracting never flips the sign. Only multiplying or dividing by a negative does. Swapping sides also flips the inequality sign.",
      pic: () => P.numberLine(-4, 6, 2, []),
      gen() {
        const kind = pick(["add", "flip", "safe"]);
        if (kind === "add") {
          const a = R(2, 9), b = R(1, 12);
          const ans = `x > ${b - a}`;
          return Q(`Solve x + ${a} > ${b}`, ans, [`x > ${b + a}`, `x < ${b - a}`, `x > ${a - b}`],
            `Subtract ${a}: x > ${b - a}.`);
        }
        if (kind === "safe") {
          const k = R(2, 5), r = R(2, 12);
          return Q(`Solve ${k}x < ${k * r}`, `x < ${r}`, [`x > ${r}`, `x < ${k * r}`, `x > ${k * r}`],
            `Divide by ${k} (positive, so no flip): x < ${r}.`);
        }
        const k = R(2, 5), r = R(1, 8);
        const right = -k * r;
        return Q(`Solve −${k}x > ${right}`, `x < ${r}`, [`x > ${r}`, `x < ${-r}`, `x > ${-r}`],
          `Divide by −${k}: flip the sign. x < ${r}.`);
      },
      worked: [
        {
          problem: "Solve x + 4 > 10.",
          steps: [["Subtract 4", "x > 6."], ["No flip", "You only subtracted."]],
          answer: "x > 6"
        },
        {
          problem: "Solve −3x < 12.",
          steps: [["Divide by −3", "Flip the sign."], ["Result", "x > −4."]],
          answer: "x > −4"
        },
        {
          problem: "Solve 5x ≤ 20.",
          steps: [["Divide by 5", "Positive, so keep ≤."], ["Result", "x ≤ 4."]],
          answer: "x ≤ 4"
        }
      ]
    },
    {
      id: "simul", name: "Simultaneous equations", phrase: "Elimination: make one letter match, then add or subtract to wipe it out.",
      steps: ["Line up the two equations.", "Multiply so one letter has the same (or opposite) coefficient.", "Add or subtract to eliminate that letter.", "Solve for the other letter, then back-substitute."],
      exception: "If both letters wipe out and you get 0 = 5, there is no solution. If you get 0 = 0, there are infinitely many. Check by plugging both answers back in.",
      pic: () => P.table(["", "x", "y", "total"], [["eq1", "2", "1", "7"], ["eq2", "1", "1", "4"], ["sub", "1", "0", "3"]], { note: "Subtract to wipe out y." }),
      gen() {
        const x = R(1, 6), y = R(1, 6);
        const a1 = R(1, 3), b1 = R(1, 3);
        let a2, b2;
        do { a2 = R(1, 3); b2 = R(1, 3); } while (a1 * b2 === a2 * b1);
        const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
        const ans = `x = ${x}, y = ${y}`;
        const eqLine = (ax, by, c) => `${ax === 1 ? "" : ax}x + ${by === 1 ? "" : by}y = ${c}`.replace("+ y", "+ y").replace(/\+ 1y/, "+ y");
        return Q(`Solve: ${eqLine(a1, b1, c1)} and ${eqLine(a2, b2, c2)}`, ans,
          [`x = ${y}, y = ${x}`, `x = ${x}, y = ${c1 - x}`, `x = ${c2}, y = ${y}`],
          `Elimination / substitution gives x = ${x}, y = ${y}. Check: ${a1}(${x}) + ${b1}(${y}) = ${c1}.`);
      },
      worked: [
        {
          problem: "Solve x + y = 10 and x − y = 2.",
          steps: [["Add the equations", "2x = 12, so x = 6."], ["Back-substitute", "6 + y = 10, so y = 4."]],
          answer: "x = 6, y = 4"
        },
        {
          problem: "Solve 2x + y = 11 and x + y = 7.",
          steps: [["Subtract the second from the first", "x = 4."], ["From x + y = 7", "4 + y = 7, y = 3."]],
          answer: "x = 4, y = 3"
        },
        {
          problem: "Solve 3x + 2y = 16 and x + 2y = 8.",
          steps: [["Subtract", "2x = 8, x = 4."], ["Plug into x + 2y = 8", "4 + 2y = 8, y = 2."]],
          answer: "x = 4, y = 2"
        }
      ]
    },
    {
      id: "distmid", name: "Distance and midpoint", phrase: "Distance is Pythagoras on the grid. Midpoint averages the coordinates.",
      steps: ["Distance: √((x₂ − x₁)² + (y₂ − y₁)²).", "Midpoint: ((x₁ + x₂)/2, (y₁ + y₂)/2).", "Count the run and rise first if that feels easier."],
      exception: "Do not add the coordinates for distance. Midpoint uses the average, not the difference.",
      pic: () => gridPts([[1, 1, "A"], [4, 5, "B"]], { seg: [[1, 1], [4, 5]] }),
      gen() {
        const [a, b, c] = pick(TRIPLES.filter((t) => t[0] <= 6 && t[1] <= 6));
        const x1 = R(0, 2), y1 = R(0, 2);
        const x2 = x1 + a, y2 = y1 + b;
        if (Math.random() < 0.5) {
          return Q(`Distance from (${x1}, ${y1}) to (${x2}, ${y2})`, c,
            [a + b, a, b, c + 1],
            `√(${a}² + ${b}²) = √${a * a + b * b} = ${c}.`, gridPts([[x1, y1, "A"], [Math.min(x2, 6), Math.min(y2, 6), "B"]]));
        }
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        if (mx % 1 !== 0 || my % 1 !== 0) {
          return Q(`Distance from (${x1}, ${y1}) to (${x2}, ${y2})`, c, [a + b, a * b, c + 2],
            `√(${a}² + ${b}²) = ${c}.`);
        }
        const ans = `(${mx}, ${my})`;
        return Q(`Midpoint of (${x1}, ${y1}) and (${x2}, ${y2})`, ans,
          [`(${x2 - x1}, ${y2 - y1})`, `(${mx}, ${y1})`, `(${x1}, ${my})`],
          `Average x: ${mx}. Average y: ${my}.`);
      },
      worked: [
        {
          problem: "Distance from (1, 2) to (4, 6).",
          steps: [["Run and rise", "3 and 4."], ["Pythagoras", "√(9 + 16) = √25 = 5."]],
          answer: "5"
        },
        {
          problem: "Midpoint of (2, 3) and (8, 11).",
          steps: [["Average x", "(2 + 8) ÷ 2 = 5."], ["Average y", "(3 + 11) ÷ 2 = 7."]],
          answer: "(5, 7)"
        },
        {
          problem: "Distance from (0, 0) to (5, 12).",
          steps: [["Squares", "25 + 144 = 169."], ["Root", "√169 = 13."]],
          answer: "13"
        }
      ]
    },
    {
      id: "perpgrad", name: "Parallel and perpendicular slopes", phrase: "Parallel: same slope. Perpendicular: flip the fraction and change the sign.",
      steps: ["Parallel lines have equal slopes.", "Perpendicular: take the slope, flip it, and multiply by −1.", "Check: m₁ × m₂ = −1 for perpendicular lines."],
      exception: "Horizontal (slope 0) is perpendicular to vertical (undefined slope). A negative slope flipped stays careful with two minuses.",
      pic: () => P.table(["relationship", "slopes"], [["parallel", "m = m"], ["perpendicular", "m₂ = −1/m₁"]], { note: "Flip and change sign for perpendicular." }),
      gen() {
        const m = pick([2, 3, 4, 5, 1 / 2, 1 / 3, 2 / 3, 3 / 4, -2, -3, -1 / 2]);
        const mText = (v) => {
          if (Number.isInteger(v)) return neg(v);
          const sign = v < 0 ? -1 : 1;
          const a = Math.abs(v);
          let den = 1;
          for (let d = 1; d <= 12; d += 1) {
            if (Math.abs(a * d - Math.round(a * d)) < 1e-9) { den = d; break; }
          }
          const num = Math.round(a * den) * sign;
          return fr(num, den).replace("-", "−");
        };
        if (Math.random() < 0.45) {
          return Q(`A line has slope ${mText(m)}. Slope of a parallel line?`, mText(m), [mText(-m), mText(-1 / m), mText(1 / m)],
            `Parallel lines share the slope: ${mText(m)}.`);
        }
        const perp = -1 / m;
        return Q(`A line has slope ${mText(m)}. Slope of a perpendicular line?`, mText(perp), [mText(m), mText(-m), mText(1 / m)],
          `Flip and change sign: ${mText(perp)}. Check: ${mText(m)} × ${mText(perp)} = −1.`);
      },
      worked: [
        {
          problem: "Slope 3. Find a parallel slope and a perpendicular slope.",
          steps: [["Parallel copies", "3."], ["Perpendicular: flip and change sign", "−1/3."]],
          answer: "parallel 3, perpendicular −1/3"
        },
        {
          problem: "Slope −2/5. Find the perpendicular slope.",
          steps: [["Flip", "5/2."], ["Change sign", "5/2 (positive)."]],
          answer: "5/2"
        },
        {
          problem: "Do slopes 4 and −1/4 look perpendicular?",
          steps: [["Multiply", "4 × (−1/4) = −1."], ["Product −1 means perpendicular", "Yes."]],
          answer: "Yes"
        }
      ]
    },
    {
      id: "discr", name: "Discriminant", phrase: "b² − 4ac tells how many real roots: positive two, zero one, negative none.",
      steps: ["From ax² + bx + c = 0, compute Δ = b² − 4ac.", "Δ > 0: two different real roots.", "Δ = 0: one repeated real root.", "Δ < 0: no real roots."],
      exception: "The discriminant does not give the roots themselves — only how many. Complex roots exist when Δ < 0, but this lesson stays with real numbers.",
      pic: () => P.parabola(1, 4),
      gen() {
        const kind = pick(["two", "one", "none"]);
        let a, b, c, delta, ans;
        if (kind === "two") {
          a = 1; b = R(3, 9); c = R(1, 5);
          delta = b * b - 4 * a * c;
          if (delta <= 0) c = 1;
          delta = b * b - 4 * a * c;
          ans = "2";
        } else if (kind === "one") {
          a = 1; b = pick([2, 4, 6, 8]); c = (b * b) / 4;
          delta = 0;
          ans = "1";
        } else {
          a = 1; b = R(1, 4); c = R(6, 12);
          delta = b * b - 4 * a * c;
          ans = "0";
        }
        return Q(`How many real solutions for ${qx(a, b, c)} = 0?`, ans, ["0", "1", "2"].filter((x) => x !== ans),
          `Δ = ${b}² − 4(${a})(${c}) = ${delta}. ${delta > 0 ? "Positive → 2." : delta === 0 ? "Zero → 1." : "Negative → 0."}`, P.parabola(kind === "none" ? 2 : 1, kind === "one" ? 1 : 3));
      },
      worked: [
        {
          problem: "x² − 4x + 3 = 0. How many real roots?",
          steps: [["Δ = 16 − 12 = 4", "Positive."], ["Two real roots", "2."]],
          answer: "2"
        },
        {
          problem: "x² + 2x + 1 = 0. How many real roots?",
          steps: [["Δ = 4 − 4 = 0", "Zero."], ["One repeated root", "1."]],
          answer: "1"
        },
        {
          problem: "x² + x + 2 = 0. How many real roots?",
          steps: [["Δ = 1 − 8 = −7", "Negative."], ["No real roots", "0."]],
          answer: "0"
        }
      ]
    },
    {
      id: "scaleAV", name: "Similar areas and volumes", phrase: "Lengths × k, areas × k², volumes × k³.",
      steps: ["Find the length scale factor k.", "Areas scale by k².", "Volumes scale by k³.", "If you are given areas, k = √(area scale)."],
      exception: "Do not scale area by k, or volume by k². A doubled length makes area ×4 and volume ×8.",
      pic: () => P.similar("1", "k"),
      gen() {
        const k = pick([2, 3, 4]);
        const kind = pick(["area", "vol", "fromArea"]);
        if (kind === "area") {
          const a = R(2, 9);
          return Q(`Length scale ${k}. A small area is ${a}. Find the big area.`, a * k * k,
            [a * k, a * k * k * k, a + k],
            `Areas × k²: ${a} × ${k * k} = ${a * k * k}.`, P.similar(a, "?"));
        }
        if (kind === "vol") {
          const v = R(2, 6);
          return Q(`Length scale ${k}. A small volume is ${v}. Find the big volume.`, v * k * k * k,
            [v * k, v * k * k, v + k * k],
            `Volumes × k³: ${v} × ${k * k * k} = ${v * k * k * k}.`);
        }
        const a = R(2, 5);
        return Q(`Similar shapes: area scale ${k * k}. Find the length scale.`, k,
          [k * k, k * k * k, 2 * k],
          `Length scale is √(area scale) = √${k * k} = ${k}.`);
      },
      worked: [
        {
          problem: "Length scale 3. Small area 5. Big area?",
          steps: [["Areas × k²", "k² = 9."], ["Multiply", "5 × 9 = 45."]],
          answer: "45"
        },
        {
          problem: "Length scale 2. Small volume 7. Big volume?",
          steps: [["Volumes × k³", "k³ = 8."], ["Multiply", "7 × 8 = 56."]],
          answer: "56"
        },
        {
          problem: "Areas are in ratio 9 : 1. Find the length scale (big : small).",
          steps: [["Length scale is the square root", "√9 = 3."], ["Ratio", "3 : 1."]],
          answer: "3 : 1"
        }
      ]
    },
    {
      id: "bisector", name: "Angle bisector theorem", phrase: "The bisector cuts the opposite side in the ratio of the two adjacent sides.",
      steps: ["Confirm the ray bisects the angle.", "Write adjacent side ÷ adjacent side = segment ÷ segment.", "Cross-multiply and solve."],
      exception: "It is the opposite side that is split. The ratio matches the two sides that form the angle, not the bisector length itself.",
      pic: () => bisectorPic(4, 6, 2, 3),
      gen() {
        const a = R(2, 6), k = R(2, 3), b = a * k;
        const c = R(2, 5), d = c * k;
        if (Math.random() < 0.5) {
          return Q(`Angle bisector: sides ${a} and ${b}, one segment ${c}. Find the other segment.`, d,
            [c * a, b - c, c + k],
            `${a} : ${b} = ${c} : ${d}. Scale ×${k}.`, bisectorPic(a, b, c, "?"));
        }
        return Q(`Angle bisector: sides ${a} and ${b}, segments ${c} and ?. Ratio matches.`, d,
          [Math.round(c * a / b) || c, c + a, d + 1],
          `${a}/${b} = ${c}/?, so ? = ${d}.`, bisectorPic(a, b, c, "?"));
      },
      worked: [
        {
          problem: "Sides 4 and 6. The bisector cuts the opposite side into 2 and ?. Find ?. ",
          pic: bisectorPic(4, 6, 2, "?"),
          steps: [["Set the ratio", "4 : 6 = 2 : ?"], ["Simplify 4 : 6 = 2 : 3", "? = 3."]],
          answer: "3"
        },
        {
          problem: "Sides 5 and 10. One segment is 3. Find the other.",
          steps: [["Ratio 5 : 10 = 1 : 2", "Segments in the same ratio."], ["Other = 3 × 2 = 6", "Check: 3 : 6 = 1 : 2."]],
          answer: "6"
        },
        {
          problem: "Sides 3 and 5, segments 6 and 10. Does this fit the bisector theorem?",
          steps: [["Side ratio", "3 : 5."], ["Segment ratio", "6 : 10 = 3 : 5."], ["Match", "Yes."]],
          answer: "Yes"
        }
      ]
    }
  ]);

  /* ---------- Grade 10: new lessons after chord ---------- */

  add("g10", [
    {
      id: "twotang", name: "Two tangents from a point", phrase: "Two tangents from one outside point are equal.",
      steps: ["Mark the two touch points.", "The tangent lengths from the outside point are equal.", "The line from the center to the outside point bisects the angle."],
      exception: "The equal lengths are the tangent segments, not the chords between touch points. A secant is a different theorem.",
      pic: () => twoTangPic("t"),
      gen() {
        const t = R(4, 15);
        if (Math.random() < 0.6) {
          return Q(`Two tangents from P. One is ${t}. Find the other.`, t, [t + 1, 2 * t, t - 1],
            `Two tangents from the same point are equal: ${t}.`, twoTangPic(t));
        }
        const r = R(3, 8);
        return Q(`Tangents from P are equal. Triangle OPT is right-angled at T with OP = ${Math.round(Math.hypot(t, r) * 10) / 10 || t}. If OT = ${r} and PT = ${t}, find angle at P is acute — find OT² + PT².`, r * r + t * t,
          [r + t, (r + t) * (r + t), Math.abs(r * r - t * t)],
          `Pythagoras in the right triangle: ${r}² + ${t}² = ${r * r + t * t}.`);
      },
      worked: [
        {
          problem: "Tangents PA and PB. PA = 11. Find PB.",
          pic: twoTangPic(11),
          steps: [["Two tangents from P are equal", "PA = PB."], ["Copy", "PB = 11."]],
          answer: "11"
        },
        {
          problem: "OT is a radius to touch point T, and OP is drawn. Why is angle OTP 90°?",
          steps: [["Radius meets tangent at 90°", "That is the tangent-radius theorem."], ["Use it with equal tangents", "The two right triangles are congruent."]],
          answer: "Radius ⊥ tangent"
        },
        {
          problem: "PA = PB = 8, and angle APB = 40°. Find angle PAB.",
          steps: [["Triangle PAB is isosceles", "PA = PB."], ["Base angles equal", "(180 − 40) ÷ 2 = 70."]],
          answer: "70°"
        }
      ]
    },
    {
      id: "altseg", name: "Alternate segment theorem", phrase: "The angle between tangent and chord equals the angle in the alternate segment.",
      steps: ["Find the angle between the tangent and a chord.", "Look to the other side of the chord (the alternate segment).", "The rim angle there matches."],
      exception: "“Alternate” means the segment on the other side of the chord, not the adjacent one. The tangent must touch at the chord’s endpoint.",
      pic: () => altSegPic("α", "α"),
      gen() {
        const a = R(25, 70);
        if (Math.random() < 0.5) {
          return Q(`Tangent-chord angle is ${a}°. Find the angle in the alternate segment.`, `${a}°`, [deg(90 - a), deg(180 - a), deg(2 * a)],
            `Alternate segment: they match — ${a}°.`, altSegPic(`${a}°`, "?"));
        }
        return Q(`Angle in the alternate segment is ${a}°. Find the tangent-chord angle.`, `${a}°`, [deg(90 - a), deg(180 - a), deg(a + 10)],
          `They are equal: ${a}°.`, altSegPic("?", `${a}°`));
      },
      worked: [
        {
          problem: "Tangent-chord angle is 55°. Find the angle in the alternate segment.",
          pic: altSegPic("55°", "?"),
          steps: [["Alternate segment theorem", "The rim angle matches the tangent-chord angle."], ["Copy", "55°."]],
          answer: "55°"
        },
        {
          problem: "Angle in the alternate segment is 32°. Find the angle between tangent and chord.",
          steps: [["They are equal", "Alternate segment."], ["Copy", "32°."]],
          answer: "32°"
        },
        {
          problem: "Why can’t you use the angle in the segment next to the tangent-chord angle?",
          steps: [["The theorem names the alternate segment", "The one on the other side of the chord."], ["The near segment is a different angle", "Often related by other circle theorems instead."]],
          answer: "Use the segment on the other side of the chord"
        }
      ]
    },
    {
      id: "intchord", name: "Intersecting chords", phrase: "When two chords cross, the products of the pieces are equal.",
      steps: ["Label the four pieces.", "Write (piece₁ × piece₂) on one chord = (piece₃ × piece₄) on the other.", "Solve for the missing piece."],
      exception: "Use the two pieces of the same chord in each product. Do not multiply ends from different chords together as a pair.",
      pic: () => chordCross(3, 4, 2, 6),
      gen() {
        const a = R(2, 8), b = R(2, 8);
        const factors = [];
        for (let c = 2; c <= a * b; c += 1) if ((a * b) % c === 0) factors.push(c);
        const c = pick(factors);
        const d = (a * b) / c;
        return Q(`Chords cross: pieces ${a} and ${b} on one, ${c} and ? on the other. Find ?.`, d,
          [a * b, a + b - c, d + 1, a * c].filter((x) => x !== d && x > 0),
          `${a} × ${b} = ${c} × ${d}.`, chordCross(a, b, c, "?"));
      },
      worked: [
        {
          problem: "Pieces 3 and 8 on one chord; 4 and ? on the other.",
          pic: chordCross(3, 8, 4, "?"),
          steps: [["Products equal", "3 × 8 = 4 × ?."], ["24 = 4 × ?", "? = 6."]],
          answer: "6"
        },
        {
          problem: "Pieces 5 and 6; 3 and ?. Find ?. ",
          steps: [["5 × 6 = 3 × ?", "30 = 3 × ?."], ["Divide", "? = 10."]],
          answer: "10"
        },
        {
          problem: "Pieces 2 and 9; 6 and ?. Find ?. ",
          steps: [["2 × 9 = 6 × ?", "18 = 6 × ?."], ["Divide", "? = 3."]],
          answer: "3"
        }
      ]
    },
    {
      id: "tansec", name: "Tangent-secant theorem", phrase: "Tangent² = outside × whole of the secant.",
      steps: ["From the outside point, one line is a tangent, the other cuts the circle (secant).", "Square the tangent length.", "That equals (outside secant piece) × (whole secant)."],
      exception: "Whole means the entire secant segment from the outside point through to the far side — not just the inside chord.",
      pic: () => tanSecPic("t", "out", "whole"),
      gen() {
        const out = R(2, 6), inn = R(2, 8);
        const whole = out + inn;
        const prod = out * whole;
        const root = Math.sqrt(prod);
        if (root % 1 === 0) {
          return Q(`Tangent from P is ?. Outside secant ${out}, whole secant ${whole}. Find the tangent.`, root,
            [out * inn, whole, out + whole],
            `t² = ${out} × ${whole} = ${prod}, t = ${root}.`, tanSecPic("?", out, whole));
        }
        return Q(`Outside secant ${out}, whole secant ${whole}. Find tangent².`, prod,
          [out * inn, out + whole, whole * inn],
          `t² = outside × whole = ${out} × ${whole} = ${prod}.`, tanSecPic("t", out, whole));
      },
      worked: [
        {
          problem: "Outside piece 4, whole secant 9. Find the tangent length.",
          steps: [["t² = outside × whole", "t² = 4 × 9 = 36."], ["Root", "t = 6."]],
          answer: "6"
        },
        {
          problem: "Tangent 6, outside piece 4. Find the whole secant.",
          steps: [["t² = outside × whole", "36 = 4 × whole."], ["Divide", "whole = 9."]],
          answer: "9"
        },
        {
          problem: "Outside 3, inside chord 6. Find tangent².",
          steps: [["Whole = outside + inside", "3 + 6 = 9."], ["t² = 3 × 9 = 27", "Leave as 27."]],
          answer: "27"
        }
      ]
    },
    {
      id: "sameseg", name: "Angles in the same segment", phrase: "Angles in the same segment that stand on the same arc are equal.",
      steps: ["Find the arc both angles stand on.", "If both sit in the same segment, they are equal.", "Use that to fill missing rim angles."],
      exception: "Angles in opposite segments are not equal (they often add to 180° in a cyclic quadrilateral instead). Same arc matters.",
      pic: () => sameSegPic("β", "β"),
      gen() {
        const a = R(25, 75);
        return Q(`Two angles in the same segment stand on the same arc. One is ${a}°. Find the other.`, `${a}°`,
          [deg(180 - a), deg(2 * a), deg(90 - a)],
          `Same segment, same arc: equal — ${a}°.`, sameSegPic(`${a}°`, "?"));
      },
      worked: [
        {
          problem: "Angles in the same segment: one is 48°. Find the other.",
          pic: sameSegPic("48°", "?"),
          steps: [["Same arc, same segment", "The angles are equal."], ["Copy", "48°."]],
          answer: "48°"
        },
        {
          problem: "Rim angle in a segment is 70°. Another angle on the same arc in that segment?",
          steps: [["Same segment theorem", "They match."], ["70°", "Done."]],
          answer: "70°"
        },
        {
          problem: "How is this different from the center-rim double rule?",
          steps: [["Same segment compares two rim angles", "Both on the circumference."], ["Center rule doubles", "Center angle = 2 × rim on the same arc."]],
          answer: "Same segment: rim = rim. Center: center = 2 × rim."
        }
      ]
    },
    {
      id: "ap", name: "Arithmetic progressions", phrase: "Each term adds the same d: aₙ = a + (n − 1)d. Sum = n/2 × (first + last).",
      steps: ["a is the first term, d is the common difference.", "nth term: a + (n − 1)d.", "Sum of n terms: n/2 × (first + last), or n/2 × (2a + (n − 1)d)."],
      exception: "n counts how many terms, not the last index alone. Geometric sequences multiply by a ratio instead — different formulas.",
      pic: () => seqPic([3, 7, 11, 15], "add 4 each time"),
      gen() {
        const a = R(1, 10), d = R(2, 6), n = R(4, 10);
        const kind = pick(["term", "sum", "d"]);
        if (kind === "term") {
          const an = a + (n - 1) * d;
          return Q(`AP: a = ${a}, d = ${d}. Find term ${n}.`, an,
            [a + n * d, a + (n - 2) * d, n * d],
            `a + (n − 1)d = ${a} + ${n - 1}×${d} = ${an}.`, seqPic([a, a + d, a + 2 * d], `d = ${d}`));
        }
        if (kind === "d") {
          const a2 = a + d;
          return Q(`AP terms ${a}, ${a2}, …. Find d.`, d, [a2, a, a2 + a],
            `d = ${a2} − ${a} = ${d}.`);
        }
        const last = a + (n - 1) * d;
        const sum = (n / 2) * (a + last);
        return Q(`AP: first ${a}, last ${last}, n = ${n}. Find the sum.`, sum,
          [n * (a + last), (n / 2) * (last - a), a + last],
          `Sum = n/2 × (first + last) = ${n}/2 × (${a} + ${last}) = ${sum}.`);
      },
      worked: [
        {
          problem: "AP: a = 3, d = 4. Find the 10th term.",
          steps: [["aₙ = a + (n − 1)d", "3 + 9×4."], ["Compute", "3 + 36 = 39."]],
          answer: "39"
        },
        {
          problem: "Sum the first 10 terms of 2, 5, 8, …",
          steps: [["d = 3, last = 2 + 9×3 = 29", "n = 10."], ["Sum = 10/2 × (2 + 29)", "5 × 31 = 155."]],
          answer: "155"
        },
        {
          problem: "Find d for the AP 7, 12, 17, …",
          steps: [["Subtract neighbours", "12 − 7 = 5."], ["Check", "17 − 12 = 5."]],
          answer: "5"
        }
      ]
    },
    {
      id: "gp", name: "Geometric sequences", phrase: "Each term multiplies by the same ratio r: aₙ = a · rⁿ⁻¹.",
      steps: ["a is the first term, r is the common ratio.", "nth term: a × rⁿ⁻¹.", "Divide a term by the previous term to find r."],
      exception: "If r is negative, signs alternate. Do not mix AP formulas (adding d) with GP formulas (multiplying by r).",
      pic: () => seqPic([2, 6, 18, 54], "×3 each time"),
      gen() {
        const a = pick([1, 2, 3, 5]), r = pick([2, 3, 4]), n = R(3, 6);
        if (Math.random() < 0.5) {
          const an = a * (r ** (n - 1));
          return Q(`GP: a = ${a}, r = ${r}. Find term ${n}.`, an,
            [a * r * n, a + (n - 1) * r, a * (r ** n)],
            `a × rⁿ⁻¹ = ${a} × ${r}${sup(n - 1)} = ${an}.`, seqPic([a, a * r, a * r * r], `r = ${r}`));
        }
        return Q(`GP terms ${a}, ${a * r}, ${a * r * r}. Find r.`, r,
          [a * r, r + a, a],
          `r = (${a * r}) ÷ ${a} = ${r}.`);
      },
      worked: [
        {
          problem: "GP: a = 2, r = 3. Find the 5th term.",
          steps: [["a × r⁴", "2 × 3⁴."], ["3⁴ = 81", "2 × 81 = 162."]],
          answer: "162"
        },
        {
          problem: "Terms 5, 10, 20, …. Find r.",
          steps: [["Divide", "10 ÷ 5 = 2."], ["Check", "20 ÷ 10 = 2."]],
          answer: "2"
        },
        {
          problem: "GP: a = 1, r = 2. Find term 6.",
          steps: [["1 × 2⁵", "2⁵ = 32."], ["Term", "32."]],
          answer: "32"
        }
      ]
    },
    {
      id: "sector", name: "Arc length and sector area", phrase: "A sector is a pizza slice: θ/360 of the whole circle.",
      steps: ["Arc length = (θ/360) × 2πr = (θ/360) × πd.", "Sector area = (θ/360) × πr².", "Use π ≈ 3.14, or leave answers in terms of π when asked."],
      exception: "θ must be in degrees for the θ/360 form. Using the radius for arc length without the fraction gives the whole circumference.",
      pic: () => sectorPic(90, "r"),
      gen() {
        const [r, th] = pick([[10, 90], [6, 60], [6, 120], [5, 72], [4, 90], [5, 36], [8, 45], [10, 36], [12, 30]]);
        const arcH = (314 * 2 * r * th) / 360;
        const areaH = (314 * r * r * th) / 360;
        if (Math.random() < 0.5) {
          const arc = dp(arcH, 2);
          return Q(`Arc length: r = ${r}, θ = ${th}°. Use π ≈ 3.14.`, arc,
            [dp(areaH, 2), dp(314 * 2 * r, 2), dp((314 * r * th) / 360, 2)],
            `(${th}/360) × 2 × 3.14 × ${r} = ${arc}.`, sectorPic(th, r));
        }
        const area = dp(areaH, 2);
        return Q(`Sector area: r = ${r}, θ = ${th}°. Use π ≈ 3.14.`, area,
          [dp(arcH, 2), dp(314 * r * r, 2), dp((314 * r * th) / 360, 2)],
          `(${th}/360) × 3.14 × ${r}² = ${area}.`, sectorPic(th, r));
      },
      worked: [
        {
          problem: "r = 10, θ = 90°. Arc length? (π ≈ 3.14)",
          pic: sectorPic(90, 10),
          steps: [["Fraction of the circle", "90/360 = 1/4."], ["Quarter of circumference", "(1/4) × 2 × 3.14 × 10 = 15.7."]],
          answer: "15.7"
        },
        {
          problem: "r = 6, θ = 60°. Sector area? (π ≈ 3.14)",
          steps: [["Fraction", "60/360 = 1/6."], ["(1/6) × 3.14 × 36", "3.14 × 6 = 18.84."]],
          answer: "18.84"
        },
        {
          problem: "r = 5, θ = 72°. Arc length? (π ≈ 3.14)",
          steps: [["Fraction", "72/360 = 1/5."], ["(1/5) × 2 × 3.14 × 5", "3.14 × 2 = 6.28."]],
          answer: "6.28"
        }
      ]
    }
  ], "chord");

})();
