/** High School hub: theorem & proof cards with SEE/NEB-friendly mnemonics (geo + trig). */
(function () {
  if (!window.MK) return;
  const { P, R, pick, gcd, fr, deg, Q, TRIPLES, course } = window.MK;
  const { box, T, line, poly, circle, dot, right, side, arc } = P.kit;
  const ACC = "var(--accent)";

  const sfr = (n, d) => fr(n, d).replace("-", "−");
  const near = (ans, extras = []) =>
    [...extras, ans + 1, ans - 1, ans + 2, ans - 2, ans * 2, Math.floor(ans / 2)]
      .filter((x) => Number.isFinite(x) && x !== ans && String(x) !== String(ans));

  function heronPic(a, b, c, s) {
    const A = [40, 190], B = [280, 190], C = [150, 40];
    let body = poly([A, B, C]);
    body += side(B, C, [170, 140], a) + side(C, A, [170, 140], b) + side(A, B, [170, 140], c);
    body += T(160, 220, s != null ? `s = ${s}` : "s = (a+b+c)/2", { size: 13, weight: 500 });
    return box(320, 236, body, "Heron’s triangle");
  }

  function elevPic(ang, d, h) {
    const A = [48, 184], F = [260, 184], Tp = [260, 52];
    let body = line(16, 184, 304, 184, { w: 2 }) + poly([A, F, Tp]) + line(F[0], F[1], Tp[0], Tp[1], { stroke: ACC, w: 5 });
    body += right(F, A, Tp) + arc(A, F, Tp, 40, ang);
    if (d != null) body += side(A, F, [160, 150], d);
    if (h != null) body += side(F, Tp, [160, 150], h, { d: 26 });
    return box(320, 214, body, "Angle of elevation");
  }

  function abcArea(a, b, C) {
    const A = [40, 184], B = [286, 184], Cc = [196, 46];
    let body = poly([A, B, Cc]) + T(26, 202, "A") + T(302, 202, "B") + T(196, 32, "C");
    body += arc(Cc, A, B, 26, C != null ? `${C}°` : "C");
    if (a != null) body += side(B, Cc, [170, 140], a);
    if (b != null) body += side(Cc, A, [170, 140], b);
    return box(320, 214, body, "Area = ½ab sin C");
  }

  function bisectorPic(a, b, c, d) {
    const A = [40, 190], B = [280, 190], C = [160, 40];
    const t = typeof a === "number" && typeof b === "number" ? a / (a + b) : 0.4;
    const Pnt = [A[0] + (B[0] - A[0]) * t, A[1]];
    let body = poly([A, B, C]) + line(C[0], C[1], Pnt[0], Pnt[1], { stroke: ACC, w: 3 });
    body += arc(C, A, Pnt, 28, "") + arc(C, Pnt, B, 28, "");
    body += side(C, A, [140, 140], a) + side(C, B, [180, 140], b) + side(A, Pnt, [140, 170], c) + side(Pnt, B, [200, 170], d);
    return box(320, 214, body, "Angle bisector theorem");
  }

  function twoTangPic(t) {
    const O = [160, 120], A = [100, 70], B = [220, 70], Pp = [160, 40];
    let body = circle(O[0], O[1], 58) + line(Pp[0], Pp[1], A[0], A[1]) + line(Pp[0], Pp[1], B[0], B[1]);
    body += line(O[0], O[1], A[0], A[1], { dash: "5 4" }) + line(O[0], O[1], B[0], B[1], { dash: "5 4" });
    body += right(A, O, Pp) + right(B, O, Pp) + dot(O, "O", 0, 16) + dot(Pp, "P", 0, -12);
    body += T(112, 52, t != null ? String(t) : "t", { size: 13 }) + T(208, 52, t != null ? String(t) : "t", { size: 13 });
    return box(320, 200, body, "Equal tangents from a point");
  }

  function altSegPic(a, b) {
    const O = [160, 120], r = 70;
    const Tpt = [160, 50], C = [230, 140], R = [100, 160];
    let body = circle(O[0], O[1], r) + line(40, 50, 280, 50) + line(Tpt[0], Tpt[1], C[0], C[1]);
    body += line(Tpt[0], Tpt[1], R[0], R[1]) + line(R[0], R[1], C[0], C[1]);
    body += dot(O, "") + dot(Tpt, "T", 0, -12);
    body += arc(Tpt, [280, 50], C, 28, a) + arc(R, Tpt, C, 22, b, { fill: "var(--ink-hot)" });
    return box(320, 214, body, "Alternate segment");
  }

  course(
    {
      id: "hs",
      grade: "High School",
      title: "Theorems & proofs",
      color: "#3D4F5F",
      blurb:
        "Proof-mode cards for SEE send-up and NEB bridge: one mnemonic phrase, the moves, the trap, and an exam-style question.",
      cheat: [
        {
          title: "Geometry theorems (9–10)",
          rows: [
            ["Pythagoras", "a² + b² = c² — legs → hypotenuse"],
            ["Heron", "s = (a+b+c)/2; area = √[s(s−a)(s−b)(s−c)]"],
            ["BPT", "Parallel cut → same ratio on both sides"],
            ["Midsegment", "Join midpoints: half the base, parallel"],
            ["AAA similar", "Equal angles → proportional sides"],
            ["Angle bisector", "Splits opposite side in adjacent-side ratio"],
            ["Center vs rim", "Angle at center = 2 × angle at rim"],
            ["Cyclic opp", "Opposite angles of cyclic quad sum to 180°"],
            ["Tangent ⊥ radius", "Radius meets tangent at 90°"],
            ["Alt. segment", "Tangent–chord = angle in alternate segment"],
            ["Equal tangents", "From one outside point: equal lengths"],
            ["Chord ⊥ center", "Perp from center bisects the chord"],
            ["Exterior angle", "Outside = sum of two far insides"]
          ]
        },
        {
          title: "Trig (9–10 + 11–12 bridge)",
          rows: [
            ["SOHCAHTOA", "sin opp/hyp, cos adj/hyp, tan opp/adj"],
            ["ASTC", "All Sugar Tea Coffee — positive signs by quadrant"],
            ["Hand angles", "sin = √(fingers before)/2"],
            ["sin²+cos²", "= 1 (Pythagoras on unit hyp)"],
            ["Elevation", "Sketch → mark angle → SOHCAHTOA"],
            ["Sine rule", "a/sin A = b/sin B = c/sin C"],
            ["Cosine rule", "a² = b² + c² − 2bc cos A"],
            ["sin(A±B)", "sin cos cos sin, sign stays"],
            ["Area", "½ab sin C"]
          ]
        }
      ],
      lessons: [
        /* ---------- Geo 9–10 ---------- */
        {
          id: "pythag",
          name: "Pythagoras",
          tag: "Geo",
          phrase: "Legs square, add, then root the hypotenuse: a² + b² = c².",
          also: "SEE send-up staple — right triangles and ladders.",
          steps: [
            "Confirm a right angle; label the hypotenuse as the longest side.",
            "Square both legs and add.",
            "Take the square root for the missing hypotenuse (or rearrange for a leg)."
          ],
          exception: "Only right triangles. c must be the hypotenuse. Converse: if a²+b²=c², the angle between a and b is 90°.",
          pic: () => P.rightTri({ opp: "a", adj: "b", hyp: "c" }),
          gen() {
            const [a, b, c] = pick(TRIPLES);
            if (Math.random() < 0.55) {
              return Q(`Right triangle: legs ${a} and ${b}. Find the hypotenuse.`, c, near(c, [a + b, a * a + b * b]),
                `${a}² + ${b}² = ${a * a + b * b} = ${c}², so hyp = ${c}.`, P.rightTri({ opp: a, adj: b, hyp: "?" }));
            }
            return Q(`Right triangle: hyp ${c}, one leg ${a}. Find the other leg.`, b, near(b, [c - a, a + c]),
              `${c}² − ${a}² = ${c * c - a * a} = ${b}², so leg = ${b}.`, P.rightTri({ opp: "?", adj: a, hyp: c }));
          },
          worked: [
            {
              problem: "A ladder leans 5 m from a wall and reaches 12 m up. How long is the ladder?",
              steps: [
                ["Right triangle", "Ground and wall meet at 90°."],
                ["Pythagoras", "5² + 12² = 25 + 144 = 169."],
                ["Root", "√169 = 13 m."]
              ],
              answer: "13 m"
            }
          ]
        },
        {
          id: "heron",
          name: "Heron’s formula",
          tag: "SEE",
          phrase: "Semi-perimeter first: s = (a+b+c)/2, then √[s(s−a)(s−b)(s−c)].",
          also: "Group A send-up classic: write s, then the root.",
          steps: [
            "Add the three sides and halve: s = (a+b+c)/2.",
            "Form the product s(s−a)(s−b)(s−c).",
            "Take the positive square root for the area."
          ],
          exception: "Sides must satisfy the triangle inequality. Don’t forget to halve for s — using the perimeter instead of s breaks the formula.",
          pic: () => heronPic(5, 5, 6, 8),
          gen() {
            if (Math.random() < 0.4) {
              const a = R(5, 12), b = R(5, 12), c = R(Math.abs(a - b) + 1, a + b - 1);
              const s = (a + b + c) / 2;
              const ans = Number.isInteger(s) ? String(s) : sfr(a + b + c, 2);
              return Q(`Sides ${a}, ${b}, ${c}. Semi-perimeter s =`, ans, near(Number(s) || a + b + c, [a + b + c, (a + b + c) / 3]),
                `s = (${a}+${b}+${c})/2 = ${ans}.`, heronPic(a, b, c, "?"));
            }
            const pickTri = pick([
              [5, 5, 6, 12],
              [5, 5, 4, 6],
              [13, 14, 15, 84],
              [7, 15, 20, 42]
            ]);
            const [a, b, c, area] = pickTri;
            const s = (a + b + c) / 2;
            return Q(`Sides ${a}, ${b}, ${c}. Area by Heron?`, area, near(area, [s, a * b / 2]),
              `s = ${s}. √[${s}(${s}-${a})(${s}-${b})(${s}-${c})] = ${area}.`, heronPic(a, b, c, s));
          },
          worked: [
            {
              problem: "A triangle has sides 13, 14, 15. Find its area.",
              steps: [
                ["Semi-perimeter", "s = (13+14+15)/2 = 21."],
                ["Product", "21(21−13)(21−14)(21−15) = 21·8·7·6 = 7056."],
                ["Root", "√7056 = 84."]
              ],
              answer: "84"
            }
          ]
        },
        {
          id: "bpt",
          name: "Basic proportionality (BPT)",
          tag: "Geo",
          phrase: "A parallel cut slices both sides in the same ratio.",
          also: "Thales: DE ∥ BC ⇒ AD/DB = AE/EC.",
          steps: [
            "Confirm the line is parallel to the base.",
            "Write AD/DB = AE/EC (or AD/AB = AE/AC).",
            "Cross-multiply and solve the missing segment."
          ],
          exception: "The ratios match corresponding pieces — don’t mix a top segment with a whole side unless you rewrite consistently.",
          pic: () => P.bpt(2, 4, 3, "?"),
          gen() {
            const ad = R(2, 5), k = R(2, 3), db = ad * k;
            const ae = R(2, 6), ec = ae * k;
            if (Math.random() < 0.5) {
              return Q(`DE ∥ BC. AD=${ad}, DB=${db}, AE=${ae}. Find EC.`, ec, near(ec, [ae, ad]),
                `AD/DB = AE/EC ⇒ ${ad}/${db} = ${ae}/EC ⇒ EC = ${ec}.`, P.bpt(ad, db, ae, "?"));
            }
            return Q(`DE ∥ BC. AD=${ad}, DB=${db}, EC=${ec}. Find AE.`, ae, near(ae, [ec, ad]),
              `Same ratio: AE/EC = AD/DB ⇒ AE = ${ae}.`, P.bpt(ad, db, "?", ec));
          },
          worked: [
            {
              problem: "DE ∥ BC with AD = 3, DB = 6, AE = 4. Find EC.",
              steps: [
                ["BPT", "AD/DB = AE/EC."],
                ["Substitute", "3/6 = 4/EC."],
                ["Solve", "EC = 8."]
              ],
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
            "The segment joining them is parallel to the remaining side.",
            "Its length is half that base."
          ],
          exception: "Both ends must be midpoints. Joining a midpoint to a non-midpoint is not a midsegment.",
          pic: () => P.midseg(18, "9"),
          gen() {
            if (Math.random() < 0.5) {
              const base = 2 * R(4, 12);
              return Q(`Base ${base}. Midsegment joining the other midpoints?`, base / 2, near(base / 2, [base, base * 2]),
                `Midsegment = half the base = ${base / 2}.`, P.midseg(base, "?"));
            }
            const mid = R(4, 10);
            return Q(`Midsegment is ${mid}. Find the third side it is parallel to.`, mid * 2, near(mid * 2, [mid, mid / 2]),
              `Base = 2 × midsegment = ${mid * 2}.`, P.midseg("?", mid));
          },
          worked: [
            {
              problem: "A triangle has base 20. Find the midsegment parallel to that base.",
              steps: [["Midsegment theorem", "Half the base."], ["Compute", "20 ÷ 2 = 10."]],
              answer: "10"
            }
          ]
        },
        {
          id: "aaa",
          name: "AAA similarity",
          tag: "Geo",
          phrase: "Equal angles make similar triangles: sides stay in the same ratio.",
          steps: [
            "Match equal angles (AAA, or AA is enough).",
            "Write corresponding sides: short/short = long/long.",
            "Cross-multiply to find a missing length."
          ],
          exception: "Corresponding sides face corresponding angles — don’t pair the wrong sides. AAA proves similarity, not congruence.",
          pic: () => P.similar(4, 10),
          gen() {
            const s = R(2, 5), k = R(2, 4), big = s * k;
            const other = R(3, 8), ans = other * k;
            return Q(`Similar triangles. Small side ${s} matches big ${big}. Small other side ${other}. Find the matching big side.`, ans,
              near(ans, [other, s * other]),
              `Scale ${big}/${s} = ${k}. Big side = ${other}×${k} = ${ans}.`, P.similar(s, big));
          },
          worked: [
            {
              problem: "△ABC ∼ △DEF. AB=6 matches DE=9, and AC=8. Find DF.",
              steps: [
                ["Scale", "9/6 = 3/2."],
                ["Apply", "DF = 8 × 3/2 = 12."]
              ],
              answer: "12"
            }
          ]
        },
        {
          id: "bisector",
          name: "Angle bisector theorem",
          tag: "Geo",
          phrase: "The bisector cuts the opposite side in the ratio of the two adjacent sides.",
          steps: [
            "Confirm the ray bisects the angle.",
            "Write (left side)/(right side) = (left segment)/(right segment).",
            "Cross-multiply for the unknown piece."
          ],
          exception: "It splits the opposite side — not the bisector’s own length. Match the sides that form the angle.",
          pic: () => bisectorPic(4, 6, 2, 3),
          gen() {
            const a = R(2, 5), k = R(2, 3), b = a * k;
            const c = R(2, 5), d = c * k;
            return Q(`Bisector: adjacent sides ${a} and ${b}; one segment ${c}. Other segment?`, d, near(d, [c, a]),
              `${a}/${b} = ${c}/x ⇒ x = ${d}.`, bisectorPic(a, b, c, "?"));
          },
          worked: [
            {
              problem: "Bisector of ∠A meets BC at D. AB=6, AC=9, BD=4. Find DC.",
              steps: [["Theorem", "AB/AC = BD/DC."], ["Solve", "6/9 = 4/DC ⇒ DC = 6."]],
              answer: "6"
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
            "Read the rim (inscribed) angle.",
            "Double it for the central angle (or halve a central for the rim)."
          ],
          exception: "Same arc only. An angle in the alternate segment is a different theorem. Standing on a diameter gives a right angle at the rim (90°, so center would be 180°).",
          pic: () => P.central("α", "2α"),
          gen() {
            const rim = pick([20, 25, 30, 35, 40, 45, 50]);
            if (Math.random() < 0.5) {
              return Q(`Rim angle on an arc is ${rim}°. Central angle on the same arc?`, `${2 * rim}°`,
                [deg(rim), deg(180 - rim), deg(90 - rim)],
                `Center = 2 × rim = ${2 * rim}°.`, P.central(`${rim}°`, "?"));
            }
            return Q(`Central angle is ${2 * rim}°. Angle at the rim on the same arc?`, `${rim}°`,
              [deg(2 * rim), deg(180 - 2 * rim), deg(rim / 2)],
              `Rim = half the center = ${rim}°.`, P.central("?", `${2 * rim}°`));
          },
          worked: [
            {
              problem: "Central angle AOB = 110°. Find inscribed angle ACB on the same arc.",
              steps: [["Same arc AB", "Rim is half the center."], ["Halve", "110° ÷ 2 = 55°."]],
              answer: "55°"
            }
          ]
        },
        {
          id: "cyclic",
          name: "Cyclic opposite angles",
          tag: "Geo",
          phrase: "In a cyclic quadrilateral, opposite angles add to 180°.",
          steps: [
            "Confirm all four vertices lie on one circle.",
            "Pick a pair of opposite angles.",
            "Subtract the known from 180°."
          ],
          exception: "Adjacent angles need not sum to 180° (that’s a different story). Exterior angle of a cyclic quad equals the opposite interior.",
          pic: () => P.cyclic("α", "180−α"),
          gen() {
            const a = R(55, 125);
            return Q(`Cyclic quad: one angle ${a}°. Opposite angle?`, `${180 - a}°`,
              [deg(a), deg(90), deg(360 - a)],
              `Opposite angles sum to 180°: ${180 - a}°.`, P.cyclic(`${a}°`, "?"));
          },
          worked: [
            {
              problem: "Cyclic ABCD has ∠A = 95°. Find ∠C.",
              steps: [["Opposite pair", "∠A + ∠C = 180°."], ["Subtract", "∠C = 85°."]],
              answer: "85°"
            }
          ]
        },
        {
          id: "tanrad",
          name: "Tangent ⊥ radius",
          tag: "Geo",
          phrase: "A radius to the point of contact meets the tangent at 90°.",
          steps: [
            "Mark the touch point T.",
            "Draw OT (center to T).",
            "OT ⊥ tangent — use right-triangle tools from there."
          ],
          exception: "The right angle is at the contact point, not at the center. A line from the center that isn’t to the contact point need not be perpendicular to the tangent.",
          pic: () => P.tangent("θ", "90−θ"),
          gen() {
            const form = R(1, 2);
            if (form === 1) {
              return Q("Radius OT meets tangent at T. Angle at T?", "90°", ["45°", "60°", "180°"],
                "Tangent ⊥ radius at the point of contact.", P.tangent("?", "90°"));
            }
            const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]);
            return Q(`Tangent length ${a}, radius ${b}. Distance from center to external point?`, c, near(c, [a + b, a * b]),
              `Right triangle: √(${a}²+${b}²)=${c}.`, P.tangent(`${a}`, `${b}`));
          },
          worked: [
            {
              problem: "Tangent from P is 8, radius is 6. Find OP.",
              steps: [
                ["Right angle at T", "△OTP is right-angled at T."],
                ["Pythagoras", "OP = √(8²+6²) = √100 = 10."]
              ],
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
            "The inscribed angle there matches."
          ],
          exception: "“Alternate” means the other side of the chord — not the adjacent segment. The tangent must touch at an endpoint of the chord.",
          pic: () => altSegPic("α", "α"),
          gen() {
            const a = R(25, 70);
            return Q(`Tangent–chord angle is ${a}°. Angle in the alternate segment?`, `${a}°`,
              [deg(90 - a), deg(180 - a), deg(2 * a)],
              `Alternate segment: they match — ${a}°.`, altSegPic(`${a}°`, "?"));
          },
          worked: [
            {
              problem: "Tangent at A, chord AB, tangent–chord angle 38°. Find the angle in the alternate segment.",
              steps: [["Alt. segment theorem", "Equal angles."], ["Copy", "38°."]],
              answer: "38°"
            }
          ]
        },
        {
          id: "eqtang",
          name: "Equal tangents",
          tag: "Geo",
          phrase: "Two tangents from one outside point are equal in length.",
          steps: [
            "Name the external point P and touch points A, B.",
            "Write PA = PB.",
            "Often △OPA ≅ △OPB (radii ⊥ tangents) for angle facts too."
          ],
          exception: "Only tangents from the same external point. Tangents from different points need not match.",
          pic: () => twoTangPic(7),
          gen() {
            const t = R(5, 14);
            if (Math.random() < 0.65) {
              return Q(`Tangents from P: one is ${t}. Find the other.`, t, near(t, [2 * t, t + 1]),
                `Equal tangents from P: both ${t}.`, twoTangPic(t));
            }
            const pair = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
            const [leg, r, hyp] = pair;
            return Q(`Tangent ${leg}, radius ${r}. Distance OP?`, hyp, near(hyp, [leg + r, Math.abs(leg - r)]),
              `OT ⊥ tangent ⇒ OP = √(${leg}²+${r}²) = ${hyp}.`, twoTangPic(leg));
          },
          worked: [
            {
              problem: "PA and PB are tangents; PA = 11. Find PB.",
              steps: [["Equal tangents", "PA = PB."], ["Copy", "PB = 11."]],
              answer: "11"
            }
          ]
        },
        {
          id: "chord",
          name: "Chord ⊥ from center",
          tag: "Geo",
          phrase: "A perpendicular from the center to a chord bisects the chord.",
          steps: [
            "Drop a perpendicular from the center to the chord.",
            "It hits at the midpoint — two equal halves.",
            "Use Pythagoras in the right triangle: r² = d² + (half chord)²."
          ],
          exception: "The line must be from the center and perpendicular. A random line from the center does not bisect unless it is perpendicular (or a diameter along the chord).",
          pic: () => P.chord("r", "d", "½"),
          gen() {
            const [r, d, h] = pick([[5, 3, 4], [13, 5, 12], [10, 6, 8], [17, 8, 15], [25, 7, 24]]);
            if (Math.random() < 0.5) {
              return Q(`Radius ${r}, center ${d} from chord. Chord length?`, 2 * h, near(2 * h, [h, r + d]),
                `Half = √(${r}²−${d}²)=${h}; chord = ${2 * h}.`, P.chord(`r=${r}`, d, "?"));
            }
            return Q(`Radius ${r}, half-chord ${h}. Distance from center to chord?`, d, near(d, [h, r - h]),
              `d = √(${r}²−${h}²)=${d}.`, P.chord(`r=${r}`, "?", h));
          },
          worked: [
            {
              problem: "Radius 13. Center is 5 from a chord. Find the chord.",
              steps: [
                ["Right triangle", "Half chord = √(13²−5²)=√144=12."],
                ["Double", "Chord = 24."]
              ],
              answer: "24"
            }
          ]
        },
        {
          id: "exterior",
          name: "Exterior angle of a triangle",
          tag: "Geo",
          phrase: "An exterior angle equals the sum of the two far interior angles.",
          steps: [
            "Extend one side to make the exterior angle.",
            "Identify the two remote interior angles (not adjacent to the exterior).",
            "Add them — that sum is the exterior."
          ],
          exception: "Don’t add the adjacent interior angle — that one forms a straight line (180°) with the exterior. Polygon exterior angles sum to 360° (a different card).",
          pic: () => P.exterior("50°", "60°", "110°"),
          gen() {
            const a = R(20, 70), b = R(20, 80);
            if (a + b >= 160) return this.gen();
            const ext = a + b;
            if (Math.random() < 0.5) {
              return Q(`Remote interiors ${a}° and ${b}°. Exterior angle?`, `${ext}°`,
                [deg(180 - ext), deg(Math.abs(a - b)), deg(180 - a)],
                `Exterior = ${a}+${b} = ${ext}°.`, P.exterior(`${a}°`, `${b}°`, "?"));
            }
            return Q(`Exterior ${ext}°, one remote interior ${a}°. Other remote?`, `${b}°`,
              [deg(ext + a), deg(180 - ext), deg(ext - a - 10)],
              `${ext} − ${a} = ${b}°.`, P.exterior(`${a}°`, "?", `${ext}°`));
          },
          worked: [
            {
              problem: "Exterior angle is 130°. One remote interior is 55°. Find the other.",
              steps: [["Exterior = sum of remotes", "130 = 55 + x."], ["Solve", "x = 75°."]],
              answer: "75°"
            }
          ]
        },

        /* ---------- Trig 9–10 ---------- */
        {
          id: "soh",
          name: "SOHCAHTOA",
          tag: "Trig",
          phrase: "SOH CAH TOA: sine opp/hyp, cosine adj/hyp, tangent opp/adj.",
          also: "SEE heights & distances start here.",
          steps: [
            "Sketch the right triangle and mark the angle.",
            "Label opposite, adjacent, hypotenuse relative to that angle.",
            "Pick sin, cos, or tan from SOHCAHTOA and solve."
          ],
          exception: "Needs a right angle. Opp/adj swap if you use the other acute angle. Oblique triangles need sine/cosine rules.",
          pic: () => P.rightTri({ theta: "θ", opp: "opp", adj: "adj", hyp: "hyp" }),
          gen() {
            const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
            const kind = pick(["sin", "cos", "tan"]);
            if (kind === "sin") {
              return Q(`Right △: opp=${a}, hyp=${c}. sin θ?`, sfr(a, c), [sfr(b, c), sfr(a, b), sfr(c, a)],
                `SOH: sin = opp/hyp = ${a}/${c}.`, P.rightTri({ theta: "θ", opp: a, hyp: c }));
            }
            if (kind === "cos") {
              return Q(`Right △: adj=${b}, hyp=${c}. cos θ?`, sfr(b, c), [sfr(a, c), sfr(b, a), sfr(c, b)],
                `CAH: cos = adj/hyp = ${b}/${c}.`, P.rightTri({ theta: "θ", adj: b, hyp: c }));
            }
            return Q(`Right △: opp=${a}, adj=${b}. tan θ?`, sfr(a, b), [sfr(b, a), sfr(a, c), sfr(b, c)],
              `TOA: tan = opp/adj = ${a}/${b}.`, P.rightTri({ theta: "θ", opp: a, adj: b }));
          },
          worked: [
            {
              problem: "Opp = 5, hyp = 13. Find sin θ.",
              steps: [["SOH", "sin = opp/hyp."], ["Ratio", "5/13."]],
              answer: "5/13"
            }
          ]
        },
        {
          id: "astc",
          name: "ASTC quadrant signs",
          tag: "Trig",
          phrase: "All Sugar Tea Coffee: QI all +, QII sin +, QIII tan +, QIV cos +.",
          steps: [
            "Reduce to a reference angle in QI.",
            "Ask which quadrant the original angle sits in.",
            "Keep the ASTC-positive function’s sign; others flip negative."
          ],
          exception: "ASTC is about signs, not values. Axes (90°, 180°, …) need special care — some ratios are 0 or undefined.",
          pic: () => P.quadrant(2),
          gen() {
            const pool = [
              ["sin 150°", "1/2", ["−1/2", "√3/2", "−√3/2"], "QII: sin +; ref 30° → 1/2"],
              ["cos 120°", "−1/2", ["1/2", "√3/2", "−√3/2"], "QII: cos −; ref 60° → −1/2"],
              ["tan 210°", "1/√3", ["−1/√3", "√3", "−√3"], "QIII: tan +; ref 30° → 1/√3"],
              ["cos 300°", "1/2", ["−1/2", "√3/2", "−√3/2"], "QIV: cos +; ref 60° → 1/2"],
              ["sin 300°", "−1/2", ["1/2", "√3/2", "−√3/2"], "QIV: sin −; ref 60° → −1/2"]
            ];
            const [prompt, ans, wrongs, why] = pick(pool);
            const q = prompt.includes("150") || prompt.includes("120") ? 2 : prompt.includes("210") ? 3 : 4;
            return Q(`Find ${prompt}`, ans, wrongs, why, P.quadrant(q));
          },
          worked: [
            {
              problem: "Find cos 150°.",
              steps: [
                ["Quadrant", "150° is QII — cos negative."],
                ["Reference", "180°−150°=30°, cos 30°=√3/2."],
                ["Sign", "cos 150° = −√3/2."]
              ],
              answer: "−√3/2"
            }
          ]
        },
        {
          id: "hand",
          name: "Special angles (hand)",
          tag: "Trig",
          phrase: "Finger count: sin = √(fingers before)/2; cos = √(fingers after)/2.",
          steps: [
            "Hold up five fingers for 0°, 30°, 45°, 60°, 90°.",
            "Count fingers before the angle for sin; after for cos; divide by 2 under a square root.",
            "tan = sin ÷ cos (and watch 90°)."
          ],
          exception: "tan 90° and sec 90° are undefined. The hand gives exact QI values only — use ASTC for other quadrants.",
          pic: () => P.hand(60),
          gen() {
            const pool = [
              ["sin 30°", "1/2", ["√3/2", "1/√2", "0"]],
              ["cos 30°", "√3/2", ["1/2", "1/√2", "0"]],
              ["sin 45°", "1/√2", ["1/2", "√3/2", "1"]],
              ["cos 60°", "1/2", ["√3/2", "1/√2", "0"]],
              ["tan 60°", "√3", ["1/√3", "1", "0"]],
              ["tan 45°", "1", ["√3", "1/√3", "0"]]
            ];
            const [prompt, ans, wrongs] = pick(pool);
            const ang = Number(prompt.match(/\d+/)[0]);
            return Q(`Find ${prompt}`, ans, wrongs, `Hand / table: ${prompt} = ${ans}.`, P.hand(ang));
          },
          worked: [
            {
              problem: "Build sin 60° and cos 60° from the hand.",
              steps: [
                ["60° finger", "Three fingers before → sin = √3/2."],
                ["After", "One finger after → cos = √1/2 = 1/2."]
              ],
              answer: "sin 60° = √3/2, cos 60° = 1/2"
            }
          ]
        },
        {
          id: "pyid",
          name: "Pythagorean identity",
          tag: "Trig",
          phrase: "sin²θ + cos²θ = 1 — Pythagoras on hypotenuse 1.",
          steps: [
            "Start from sin²θ + cos²θ = 1.",
            "Divide by cos²θ → 1 + tan²θ = sec²θ.",
            "Divide by sin²θ → 1 + cot²θ = cosec²θ."
          ],
          exception: "sin²θ means (sin θ)², not sin(θ²). Sum of sin and cos is not 1. Square roots bring ± — use the quadrant.",
          pic: () => P.rightTri({ opp: "sin θ", adj: "cos θ", hyp: "1", theta: "θ" }),
          gen() {
            const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
            if (Math.random() < 0.45) {
              return Q(`sin θ = ${sfr(a, c)} (acute). cos θ?`, sfr(b, c), [sfr(a, b), sfr(c, a), sfr(a, c)],
                `cos² = 1 − (${a}/${c})² = ${b * b}/${c * c} ⇒ cos = ${b}/${c}.`,
                P.rightTri({ opp: a, adj: "?", hyp: c, theta: "θ" }));
            }
            return Q("Simplify sin²θ + cos²θ", "1", ["0", "2", "sin 2θ"],
              "Pythagorean identity: always 1.", P.rightTri({ opp: "sin θ", adj: "cos θ", hyp: "1", theta: "θ" }));
          },
          worked: [
            {
              problem: "sin θ = 8/17, θ acute. Find cos θ.",
              steps: [
                ["Identity", "cos² = 1 − 64/289 = 225/289."],
                ["Root (+)", "cos θ = 15/17."]
              ],
              answer: "15/17"
            }
          ]
        },
        {
          id: "elev",
          name: "Heights & distances",
          tag: "SEE",
          phrase: "Angle of elevation: sketch, mark θ from the eye up to the top, then SOHCAHTOA.",
          also: "Depression looks down from a high point — same trig, flipped sketch.",
          steps: [
            "Draw ground, vertical object, and the sight line.",
            "Mark the angle of elevation (or depression).",
            "Choose tan (often), or sin/cos; solve for height or distance."
          ],
          exception: "Elevation is from the lower point looking up. Don’t swap opp/adj. Keep units consistent.",
          pic: () => elevPic("θ", "d", "h"),
          gen() {
            const pack = pick([
              [30, 10, 10 / Math.sqrt(3), "10/√3"],
              [45, 12, 12, "12"],
              [60, 5, 5 * Math.sqrt(3), "5√3"],
              [30, 20, 20 / Math.sqrt(3), "20/√3"],
              [45, 8, 8, "8"]
            ]);
            const [ang, d, , exact] = pack;
            return Q(`Elevation ${ang}°, distance ${d}. Height of tower?`, exact,
              [String(d), String(2 * d), ang === 45 ? String(d + 1) : "10"],
              `tan ${ang}° = h/${d} ⇒ h = ${exact}.`, elevPic(`${ang}°`, d, "?"));
          },
          worked: [
            {
              problem: "From 40 m away, elevation to a tower top is 45°. Find the height.",
              steps: [
                ["Sketch", "Right triangle; tan 45° = h/40."],
                ["tan 45° = 1", "h = 40 m."]
              ],
              answer: "40 m"
            }
          ]
        },

        /* ---------- 11–12 bridge ---------- */
        {
          id: "sine",
          name: "Sine rule",
          tag: "Trig",
          phrase: "Each side over the sine of the angle it faces: a/sin A = b/sin B = c/sin C.",
          also: "NEB bridge — oblique triangles.",
          steps: [
            "Label: side a faces angle A (and so on).",
            "Use when you know a side and its opposite angle, plus one more piece.",
            "Cross-multiply; for SSA check the ambiguous case (B and 180°−B)."
          ],
          exception: "SSA can give two triangles. For two sides and the included angle, prefer the cosine rule.",
          pic: () => P.tri("A", "B", "C"),
          gen() {
            const c = pick([
              { A: 30, B: 60, a: 5, b: "5√3", why: "b = 5 sin60/sin30 = 5·(√3/2)/(1/2) = 5√3" },
              { A: 45, B: 45, a: 7, b: "7", why: "Equal angles ⇒ equal opposite sides" },
              { A: 60, B: 30, a: 10, b: "5√3", why: "b = 10 sin30/sin60 = 10·(1/2)/(√3/2) = 5√3" },
              { A: 30, B: 45, a: 6, b: "6√2", why: "b = 6 sin45/sin30 = 6·(1/√2)/(1/2) = 6√2" }
            ]);
            return Q(`A=${c.A}°, B=${c.B}°, a=${c.a}. Find b.`, c.b, [String(c.a), String(c.a * 2), "10", "5√2"].filter((x) => x !== c.b),
              c.why, P.tri(`${c.A}°`, `${c.B}°`, ""));
          },
          worked: [
            {
              problem: "A=45°, B=60°, a=10. Find b.",
              steps: [
                ["Sine rule", "b/sin60 = 10/sin45."],
                ["Compute", "b = 10·(√3/2)/(1/√2) = 5√6."]
              ],
              answer: "5√6"
            }
          ]
        },
        {
          id: "cosine",
          name: "Cosine rule",
          tag: "Trig",
          phrase: "Pythagoras with a correction: a² = b² + c² − 2bc cos A.",
          steps: [
            "Use for SAS (two sides + included angle) or SSS (three sides → angle).",
            "Side: a² = b² + c² − 2bc cos A, then root.",
            "Angle: cos A = (b² + c² − a²)/(2bc)."
          ],
          exception: "A must sit between sides b and c. If A is obtuse, cos A is negative and a grows. At 90° it collapses to Pythagoras.",
          pic: () => P.roof("a²", "b²+c²−2bc cos A", "included angle A"),
          gen() {
            const pack = pick([
              { A: 60, b: 5, c: 8, a: 7, why: "a² = 25+64−80·(1/2) = 49 ⇒ a=7" },
              { A: 90, b: 6, c: 8, a: 10, why: "cos90=0 ⇒ a=√(36+64)=10" },
              { A: 120, b: 3, c: 5, a: 7, why: "a² = 9+25−30(−1/2)=34+15=49 ⇒ a=7" },
              { A: 60, b: 3, c: 8, a: 7, why: "a² = 9+64−48·(1/2)=73−24=49 ⇒ a=7" }
            ]);
            return Q(`b=${pack.b}, c=${pack.c}, included A=${pack.A}°. Find a.`, pack.a, near(pack.a, [pack.b + pack.c, pack.b]),
              pack.why, P.roof(`a²`, `${pack.b}²+${pack.c}²−2·${pack.b}·${pack.c}·cos${pack.A}°`));
          },
          worked: [
            {
              problem: "b=5, c=8, A=60°. Find a.",
              steps: [
                ["Cosine rule", "a² = 25+64 − 2·5·8·(1/2)."],
                ["Simplify", "89 − 40 = 49."],
                ["Root", "a = 7."]
              ],
              answer: "7"
            }
          ]
        },
        {
          id: "compound",
          name: "Compound angle sin(A±B)",
          tag: "Trig",
          phrase: "sin cos cos sin, sign stays: sin(A±B) = sin A cos B ± cos A sin B.",
          steps: [
            "Write sin(A±B) = sin A cos B ± cos A sin B.",
            "Fill each factor from the triangle or table.",
            "For cos(A±B): cos cos ∓ sin sin — the sign swaps."
          ],
          exception: "sin(A+B) ≠ sin A + sin B. In cosine, the ± on the left flips on the right.",
          pic: () => P.roof("sin(A±B)", "sin A cos B ± cos A sin B", "sign stays"),
          gen() {
            const pool = [
              ["sin(60°+30°)", "1", ["1/2", "√3/2", "0"], "sin90°=1, or expand: (√3/2)(√3/2)+(1/2)(1/2)=1"],
              ["sin(60°−30°)", "1/2", ["1", "√3/2", "0"], "sin30°=1/2"],
              ["Expand sin(A+B)", "sin A cos B + cos A sin B", ["sin A + sin B", "cos A cos B − sin A sin B", "sin A cos B − cos A sin B"], "sin cos cos sin, sign stays"]
            ];
            const [prompt, ans, wrongs, why] = pick(pool);
            return Q(prompt.startsWith("Expand") ? prompt : `Simplify ${prompt}`, ans, wrongs, why,
              P.roof("sin(A±B)", "sin A cos B ± cos A sin B"));
          },
          worked: [
            {
              problem: "Expand sin(A+B).",
              steps: [
                ["Chant", "sin cos cos sin, sign stays."],
                ["Write", "sin A cos B + cos A sin B."]
              ],
              answer: "sin A cos B + cos A sin B"
            }
          ]
        },
        {
          id: "areasin",
          name: "Area ½ab sin C",
          tag: "Trig",
          phrase: "Half of two sides times the sine of the included angle: Area = ½ab sin C.",
          steps: [
            "Identify two sides and the angle between them.",
            "Write Area = ½ · a · b · sin C.",
            "Use a known exact sin, or rearrange for a side/angle."
          ],
          exception: "C must be the included angle. For a parallelogram drop the ½. Heron is for three sides with no angle given.",
          pic: () => abcArea("a", "b", null),
          gen() {
            const pack = pick([
              { a: 6, b: 10, C: 30, area: 15, why: "½·6·10·(1/2)=15" },
              { a: 8, b: 5, C: 90, area: 20, why: "½·8·5·1=20" },
              { a: 7, b: 8, C: 60, area: 14 * Math.sqrt(3), exact: "14√3", why: "½·7·8·(√3/2)=14√3" },
              { a: 10, b: 10, C: 45, area: 25 * Math.SQRT2, exact: "25√2", why: "½·10·10·(1/√2)=50/√2=25√2" }
            ]);
            const ans = pack.exact || String(pack.area);
            return Q(`Sides ${pack.a} and ${pack.b}, included angle ${pack.C}°. Area?`, ans,
              [String(pack.a * pack.b), String(pack.a * pack.b / 2), "12"],
              pack.why, abcArea(pack.a, pack.b, pack.C));
          },
          worked: [
            {
              problem: "a=6, b=10, C=30°. Find the area.",
              steps: [
                ["Formula", "½ab sin C."],
                ["Compute", "½·6·10·sin30° = 30·(1/2) = 15."]
              ],
              answer: "15"
            }
          ]
        }
      ]
    },
    "g10"
  );
})();
