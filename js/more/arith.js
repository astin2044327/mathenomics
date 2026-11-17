/** Arithmetic pack: number sense, operations, fractions, decimals, ratio, stats, early algebra. */
(function () {
  const { P, R, pick, gcd, lcm, neg, deg, raw, fr, pow, Q, add, course, patch } = window.MK;
  const { shuffle } = window.MK;
  const { INK, box, T, line, poly, circle, dot, right, side } = P.kit;

  const big = (n) => n.toLocaleString("en-US");
  const SUPS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  const sup = (n) => String(n).split("").map((c) => SUPS[c]).join("");
  const pad2 = (m) => String(m).padStart(2, "0");
  const par = (x) => (x < 0 ? `(${neg(x)})` : `${x}`);
  const sum = (list) => list.reduce((s, v) => s + v, 0);
  const sorted = (list) => list.slice().sort((p, q) => p - q);
  const money = (c) => (c % 100 ? `$${big(Math.floor(c / 100))}.${pad2(c % 100)}` : `$${big(c / 100)}`);

  /** An integer count of 10^-k as a tidy decimal: dp(250, 2) is "2.5". keep holds trailing zeros. */
  function dp(n, k, keep) {
    if (k <= 0) return String(n * 10 ** -k);
    const s = String(n).padStart(k + 1, "0");
    const out = `${s.slice(0, -k)}.${s.slice(-k)}`;
    return keep ? out : out.replace(/0+$/, "").replace(/\.$/, "");
  }

  /* ---------- diagrams ---------- */

  function twoRows(a, b) {
    const x = (i) => 40 + i * 28;
    let body = "";
    for (let i = 0; i < a; i += 1) body += `<circle cx="${x(i)}" cy="40" r="11" fill="var(--accent)"/>`;
    for (let i = 0; i < b; i += 1) body += `<circle cx="${x(i)}" cy="80" r="11" fill="${i < a ? "var(--accent)" : "var(--ink-hot)"}"/>`;
    body += T(160, 126, b > a ? `double ${a}, plus ${b - a} more` : `double ${a}`, { size: 14, weight: 500 });
    return box(320, 138, body, `${a} dots and ${b} dots in two rows`);
  }

  function teenPic(k, hide) {
    let body = "";
    [10, k].forEach((filled, f) => {
      const x0 = 14 + f * 156;
      for (let i = 0; i < 10; i += 1) {
        const x = x0 + (i % 5) * 26, y = 22 + Math.floor(i / 5) * 26;
        body += `<rect x="${x}" y="${y}" width="26" height="26" fill="var(--paper2)" stroke="${INK}" stroke-width="1.6"/>`;
        if (i < filled) body += `<circle cx="${x + 13}" cy="${y + 13}" r="8.5" fill="${f ? "var(--ink-hot)" : "var(--accent)"}"/>`;
      }
    });
    body += T(79, 100, "ten", { size: 15 }) + T(235, 100, hide ? "some more" : `${k} more`, { size: 15 });
    if (!hide) body += T(160, 128, `ten and ${k} more is ${10 + k}`, { size: 14, weight: 500 });
    return box(320, hide ? 112 : 140, body, "A full ten frame and some more");
  }

  function buddies(n, hide) {
    const cols = Math.ceil(n / 2);
    const x = (i) => 160 + (i - (cols - 1) / 2) * 34;
    let body = "";
    for (let i = 0; i < cols; i += 1) {
      const pair = 2 * i + 1 < n;
      if (pair) body += `<rect x="${x(i) - 15}" y="24" width="30" height="66" rx="15" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
      body += `<circle cx="${x(i)}" cy="41" r="10" fill="${pair || hide ? "var(--accent)" : "var(--ink-hot)"}"/>`;
      if (pair) body += `<circle cx="${x(i)}" cy="73" r="10" fill="var(--accent)"/>`;
    }
    const note = hide ? "Can everyone get a buddy?" : n % 2 ? `${n} is odd: one is left without a buddy` : `${n} is even: everyone has a buddy`;
    return box(320, 134, body + T(160, 122, note, { size: 14, weight: 500 }), `${n} dots in buddy pairs`);
  }

  function roundLine(lo, hi, n) {
    const x = (v) => 30 + ((v - lo) * 260) / (hi - lo);
    const mid = (lo + hi) / 2;
    let body = line(18, 96, 302, 96);
    [lo, mid, hi].forEach((v) => {
      body += line(x(v), 88, x(v), 104, { w: v === mid ? 1.8 : 2.5, dash: v === mid ? "3 3" : "" });
      body += T(x(v), 126, big(v), { size: 13, weight: v === mid ? 500 : 700 });
    });
    body += T(x(mid), 144, "halfway", { size: 11, weight: 500 });
    body += `<circle cx="${x(n)}" cy="96" r="7" fill="var(--accent)"/>` + T(x(n), 76, big(n), { size: 15, fill: "var(--accent)" });
    return box(320, 154, body, `${n} between ${lo} and ${hi}`);
  }

  function clock(h, m) {
    const c = [160, 112];
    const at = (a, r) => [
      Number((c[0] + r * Math.sin((a * Math.PI) / 180)).toFixed(1)),
      Number((c[1] - r * Math.cos((a * Math.PI) / 180)).toFixed(1))
    ];
    let body = circle(c[0], c[1], 98, { fill: "var(--paper2)" });
    for (let k = 0; k < 60; k += 1) {
      const a = at(k * 6, 98);
      const b = at(k * 6, k % 5 ? 93 : 87);
      body += line(a[0], a[1], b[0], b[1], { w: k % 5 ? 1 : 2 });
    }
    const hp = at(((h % 12) + m / 60) * 30, 46);
    const mp = at(m * 6, 80);
    body += line(c[0], c[1], hp[0], hp[1], { w: 7 }) + line(c[0], c[1], mp[0], mp[1], { w: 4, stroke: "var(--accent)" });
    body += `<circle cx="${c[0]}" cy="${c[1]}" r="6" fill="${INK}"/>`;
    for (let k = 1; k <= 12; k += 1) {
      const p = at(k * 30, 73);
      body += `<circle cx="${p[0]}" cy="${p[1]}" r="11" fill="var(--paper2)"/>` + T(p[0], p[1] + 6, k, { size: 17 });
    }
    return box(320, 224, body, "Clock face");
  }

  function rainbow(n) {
    const f = [];
    for (let k = 1; k <= n; k += 1) if (n % k === 0) f.push(k);
    const x = (i) => 30 + (i * 260) / Math.max(1, f.length - 1);
    let body = "";
    for (let i = 0; i < Math.floor(f.length / 2); i += 1) {
      const a = x(i);
      const b = x(f.length - 1 - i);
      const rx = (b - a) / 2;
      body += `<path d="M${a} 118 A${rx} ${Math.min(rx, 96)} 0 0 1 ${b} 118" fill="none" stroke="${i % 2 ? INK : "var(--accent)"}" stroke-width="2.5"/>`;
    }
    f.forEach((v, i) => { body += T(x(i), 140, v, { size: 15 }); });
    body += T(160, 168, `${n} has ${f.length} factors`, { size: 13, weight: 500 });
    return box(320, 178, body, `Factor rainbow for ${n}`);
  }

  function rectPic(l, w, o = {}) {
    const s = Math.min(220 / l, 120 / w, 30);
    const W = l * s, H = w * s, x0 = (320 - W) / 2, y0 = 16;
    let body = `<rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="var(--paper2)"/>`;
    if (o.grid) {
      for (let i = 1; i < l; i += 1) body += line(x0 + i * s, y0, x0 + i * s, y0 + H, { w: 1 });
      for (let j = 1; j < w; j += 1) body += line(x0, y0 + j * s, x0 + W, y0 + j * s, { w: 1 });
    }
    body += `<rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linejoin="round"/>`;
    body += T(160, y0 + H + 24, o.lt != null ? o.lt : l) + T(x0 + W + 12, y0 + H / 2 + 5, o.wt != null ? o.wt : w, { anchor: "start" });
    if (o.note) body += T(160, y0 + H + 50, o.note, { size: 13, weight: 500 });
    return box(320, y0 + H + (o.note ? 62 : 36), body, "Rectangle");
  }

  function slantPic(kind, b, h, s) {
    let body = "";
    if (kind === "tri") {
      const A = [40, 176], B = [280, 176], C = [200, 46], F = [200, 176];
      body += `<rect x="40" y="46" width="240" height="130" fill="none" stroke="${INK}" stroke-width="1.6" stroke-dasharray="6 5"/>`;
      body += poly([A, B, C]) + line(C[0], C[1], F[0], F[1], { stroke: "var(--accent)", dash: "6 5" }) + right(F, C, B, 12);
      body += T(160, 200, b) + T(192, 130, h, { anchor: "end", fill: "var(--accent)" }) + side(A, C, [170, 150], s);
    } else {
      const A = [30, 176], B = [230, 176], C = [290, 46], D = [90, 46], F = [90, 176];
      body += poly([A, B, C, D]) + line(D[0], D[1], F[0], F[1], { stroke: "var(--accent)", dash: "6 5" }) + right(F, D, B, 12);
      body += T(130, 200, b) + T(100, 130, h, { anchor: "start", fill: "var(--accent)" }) + side(B, C, [160, 110], s);
    }
    return box(320, 210, body, kind === "tri" ? "Triangle inside its box" : "Parallelogram with its height");
  }

  function boxPic(lt, wt, ht) {
    const F1 = [64, 190], F2 = [214, 190], F3 = [214, 100], F4 = [64, 100];
    const B2 = [268, 145], B3 = [268, 55], B4 = [118, 55];
    let body = poly([F1, F2, F3, F4]) + poly([F4, F3, B3, B4], { fill: "var(--accent-soft)" }) + poly([F2, B2, B3, F3]);
    body += T(139, 212, lt) + T(56, 150, ht, { anchor: "end" }) + side(F2, B2, [230, 120], wt);
    return box(320, 222, body, "Box");
  }

  function plane(pts, o = {}) {
    const O = [40, 192], s = 26;
    const X = (v) => O[0] + v * s, Y = (v) => O[1] - v * s;
    let body = "";
    for (let k = 0; k <= 6; k += 1) {
      body += line(X(k), Y(0), X(k), Y(6), { w: 0.8, stroke: "#CFC8BC" }) + line(X(0), Y(k), X(6), Y(k), { w: 0.8, stroke: "#CFC8BC" });
      body += T(X(k), O[1] + 18, k, { size: 11, weight: 500 });
      if (k) body += T(O[0] - 12, Y(k) + 4, k, { size: 11, weight: 500 });
    }
    body += line(X(0), Y(0), X(6) + 12, Y(0)) + line(X(0), Y(0), X(0), Y(6) - 12);
    body += T(X(6) + 22, Y(0) + 5, "x", { size: 14 }) + T(X(0), Y(6) - 18, "y", { size: 14 });
    if (o.shape) body += `<polygon points="${o.shape.map(([a, b]) => `${X(a)},${Y(b)}`).join(" ")}" fill="var(--accent-soft)" stroke="${INK}" stroke-width="2.5"/>`;
    if (o.walk) {
      const [wx, wy] = o.walk;
      body += line(X(0), Y(0), X(wx), Y(0), { stroke: "var(--accent)", w: 4 }) + line(X(wx), Y(0), X(wx), Y(wy), { stroke: "var(--accent)", w: 4, dash: "7 6" });
      body += T(262, 84, `along ${wx}`, { size: 14, fill: "var(--accent)" }) + T(262, 108, `up ${wy}`, { size: 14, fill: "var(--accent)" }) + T(262, 144, `(${wx}, ${wy})`, { size: 20 });
    }
    pts.forEach((p) => {
      body += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="6" fill="var(--accent)" stroke="${INK}" stroke-width="1.5"/>`;
      if (p.label) body += T(X(p.x) + 9, Y(p.y) - 8, p.label, { size: 14, anchor: "start" });
    });
    return box(320, 222, body, "Coordinate grid");
  }

  function circlePic(o = {}) {
    const c = [160, 108], r = 84;
    let body = circle(c[0], c[1], r, { fill: "var(--paper2)" });
    if (o.d) body += line(c[0] - r, c[1], c[0] + r, c[1], { dash: "7 6" }) + T(c[0] - 42, c[1] + 24, o.d, { size: 15 });
    if (o.r) {
      const e = [c[0] + r * 0.64, c[1] - r * 0.77];
      body += line(c[0], c[1], e[0], e[1], { stroke: "var(--accent)" }) + T(c[0] + 28, c[1] - 22, o.r, { size: 15, fill: "var(--accent)", anchor: "start" });
    }
    body += dot(c, "");
    return box(320, 200, body, "Circle with radius and diameter");
  }

  function ladderRows(a, b) {
    const rows = [];
    let x = a, y = b, p = 2;
    while (p <= Math.min(x, y)) {
      if (x % p === 0 && y % p === 0) { rows.push([p, x, y]); x /= p; y /= p; } else p += 1;
    }
    return { rows, left: rows.map((r) => r[0]), x, y };
  }

  function ladder(a, b) {
    const { rows, left, x, y } = ladderRows(a, b);
    const top = 14, h = 34, yb = top + rows.length * h;
    const g = left.reduce((s, v) => s * v, 1);
    let body = `<path d="M92 ${top + 16} V${yb + 19} H232" fill="none" stroke="var(--accent-soft)" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>`;
    rows.forEach(([p, u, v], i) => {
      const y0 = top + i * h;
      body += T(92, y0 + 23, p, { size: 17, fill: "var(--accent)" }) + T(150, y0 + 23, u, { size: 17 }) + T(210, y0 + 23, v, { size: 17 });
      body += line(112, y0 + 2, 112, y0 + h, { w: 2 }) + line(112, y0 + h, 240, y0 + h, { w: 2 });
    });
    body += T(150, yb + 25, x, { size: 17, fill: "var(--accent)" }) + T(210, yb + 25, y, { size: 17, fill: "var(--accent)" });
    body += T(160, yb + 62, `GCF = ${left.length ? left.join(" × ") : "1"}${left.length > 1 ? ` = ${g}` : ""}`, { size: 14 });
    body += T(160, yb + 86, `LCM = ${[...left, x, y].join(" × ")} = ${g * x * y}`, { size: 14 });
    return box(320, yb + 98, body, `Ladder for ${a} and ${b}`);
  }

  const MARBLE = { red: "#E4572E", blue: "#3D5A98", green: "#4C9A52" };
  function marbles(groups) {
    const all = groups.flatMap(([n, name]) => Array(n).fill(MARBLE[name]));
    const per = 10, rows = Math.ceil(all.length / per), inRow = Math.min(all.length, per);
    let body = "";
    all.forEach((c, i) => {
      body += `<circle cx="${160 + ((i % per) - (inRow - 1) / 2) * 28}" cy="${28 + Math.floor(i / per) * 30}" r="11" fill="${c}" stroke="${INK}" stroke-width="1.5"/>`;
    });
    body += T(160, rows * 30 + 32, groups.map(([n, name]) => `${n} ${name}`).join(" · "), { size: 13, weight: 500 });
    return box(320, rows * 30 + 44, body, "Marbles in a bag");
  }

  function butterfly(a, b, c, d) {
    let body = line(128, 46, 192, 104, { stroke: "var(--accent)", dash: "6 5" }) + line(128, 104, 192, 46, { stroke: "var(--accent)", dash: "6 5" });
    body += T(108, 64, a, { size: 28 }) + line(84, 76, 132, 76) + T(108, 108, b, { size: 28 });
    body += T(212, 64, c, { size: 28 }) + line(188, 76, 236, 76) + T(212, 108, d, { size: 28 });
    body += `<rect x="148" y="64" width="24" height="24" rx="6" fill="var(--paper2)" stroke="${INK}" stroke-width="1.6"/>` + T(160, 83, "=", { size: 22 }) + T(160, 148, `${a} × ${d} = ${b} × ${c}`, { size: 15, fill: "var(--accent)" });
    return box(320, 162, body, "Cross multiply");
  }

  /* ---------- K–1 ---------- */

  add("k", [
    {
      id: "maketen", name: "Make a ten", phrase: "Make a ten, then add the rest.",
      also: "8 + 5 = 8 + 2 + 3. The 2 fills the ten, and the 3 is the rest.",
      steps: ["Start with the bigger number.", "Take just enough from the other number to make 10.", "Add what is left to 10."],
      exception: "Take only what fills the ten: for 8 + 5, take 2, not 5. If the total is less than 10, there is no ten to make, so just count on.",
      pic: () => P.numberLine(8, 13, 8, [2, 3]),
      gen() {
        const a = R(6, 9);
        const b = R(11 - a, a);
        const need = 10 - a, rest = b - need, s = a + b;
        if (Math.random() < 0.35) {
          return Q(`${a} + ${b} = 10 + ?`, rest, [rest + 1, need, b, s, rest + 2],
            `${a} needs ${need} to make ten. ${b} splits into ${need} and ${rest}, so it is 10 + ${rest}.`, P.tenFrame(a));
        }
        return Q(`${a} + ${b}`, s, [s - 1, s + 1, rest, s + 10],
          `${a} needs ${need} to make ten. Split ${b} into ${need} and ${rest}. 10 + ${rest} = ${s}.`, P.tenFrame(a));
      },
      worked: [
        {
          problem: "9 + 6", pic: P.numberLine(9, 15, 9, [1, 5]),
          steps: [["Start big", "Start with 9."], ["Make a ten", "9 needs 1 more to make 10. Take 1 from the 6."], ["Add the rest", "6 − 1 leaves 5. 10 + 5 = 15."]],
          answer: "15"
        },
        {
          problem: "Mia has 7 red beads and 6 blue beads. How many beads does she have?",
          steps: [["Write it", "7 + 6."], ["Make a ten", "7 needs 3. Split 6 into 3 and 3."], ["Add the rest", "7 + 3 = 10. Then 10 + 3 = 13."]],
          answer: "13 beads"
        },
        {
          problem: "8 + 9",
          steps: [["Start big", "9 is bigger, so start with 9."], ["Make a ten", "9 needs 1. Take 1 from the 8."], ["Add the rest", "8 − 1 leaves 7. 10 + 7 = 17."]],
          answer: "17"
        }
      ]
    },
    {
      id: "teens", name: "Teen numbers", phrase: "A teen is ten and some more.",
      also: "Fourteen is ten and four. The 1 in front is the ten.",
      steps: ["The 1 in front stands for one ten.", "The last digit tells how many more.", "16 is ten and 6 more."],
      exception: "Eleven and twelve don’t say “teen”, but they are ten and 1, and ten and 2. Fourteen is written 14, not 41, and not 104.",
      pic: () => teenPic(6),
      gen() {
        const k = R(1, 9), n = 10 + k;
        const form = R(1, 3);
        if (form === 1) {
          return Q(`10 + ${k}`, n, [k * 10, Number(`${k}1`), 100 + k, n + 1], `Ten and ${k} more is ${n}.`, teenPic(k, true));
        }
        if (form === 2) {
          return Q(`${n} is ten and how many more?`, k, [1, 10, n, k + 1], `${n} has 1 ten and ${k} one${k > 1 ? "s" : ""}: ten and ${k} more.`, teenPic(k, true));
        }
        return Q(`Which number is ten and ${k} more?`, n, [k * 10, Number(`${k}1`), 100 + k, k], `Ten and ${k} more: a 1 for the ten, then ${k}. That is ${n}.`);
      },
      worked: [
        {
          problem: "What number is ten and 7 more?",
          steps: [["Ten first", "Write the ten as a 1 in the tens seat."], ["Some more", "Write 7 in the ones seat."], ["Read it", "1 ten and 7 ones is 17, seventeen."]],
          answer: "17"
        },
        {
          problem: "Sam has a full box of 10 crayons and 4 more crayons. How many crayons does he have?", pic: teenPic(4, true),
          steps: [["Ten first", "The full box is one ten."], ["Some more", "The 4 loose crayons are the ones."], ["Ten and some more", "Ten and 4 more is 14."]],
          answer: "14 crayons"
        }
      ]
    },
    {
      id: "neardbl", name: "Doubles and near doubles", phrase: "Doubles plus one: double the small number, then add one more.",
      also: "6 + 7 is double 6 plus 1: 12 + 1 = 13.",
      steps: ["A double is the same number twice: 6 + 6 = 12.", "For a near double, double the smaller number.", "Add 1 more."],
      exception: "Double the smaller number, then add 1. If you double the bigger one, take 1 away instead: 6 + 7 is 14 − 1. It only works for next-door numbers: 6 + 8 is double 6 plus 2.",
      pic: () => twoRows(6, 7),
      gen() {
        const a = R(1, 9);
        const near = Math.random() < 0.65;
        const b = near ? a + 1 : a;
        const [x, y] = Math.random() < 0.5 ? [a, b] : [b, a];
        const s = a + b;
        if (near) {
          return Q(`${x} + ${y}`, s, [2 * a, 2 * b, s + 2], `Double ${a} is ${2 * a}. ${b} is one more than ${a}, so add 1: ${s}.`, twoRows(a, b));
        }
        return Q(`${a} + ${a}`, s, [s + 1, s - 1, a * a, s + 2], `Double ${a} is ${s}.`, twoRows(a, a));
      },
      worked: [
        {
          problem: "7 + 8", pic: twoRows(7, 8),
          steps: [["Double the small one", "Double 7 is 14."], ["Plus one", "8 is one more than 7, so add 1: 14 + 1 = 15."]],
          answer: "15"
        },
        {
          problem: "Ben read 9 pages on Monday and 8 pages on Tuesday. How many pages did he read?",
          steps: [["Spot the near double", "9 and 8 are next-door numbers."], ["Double the small one", "Double 8 is 16."], ["Plus one", "16 + 1 = 17."]],
          answer: "17 pages"
        }
      ]
    },
    {
      id: "skip", name: "Counting by 2s, 5s, and 10s", phrase: "2, 4, 6, 8, who do we appreciate?",
      also: "Fives end in 5 or 0. Tens always end in 0.",
      steps: ["By 2s: say every other number: 2, 4, 6, 8, 10.", "By 5s: the last digit goes 5, 0, 5, 0.", "By 10s: the tens digit goes up by 1, and the ones digit stays 0."],
      exception: "Keep the jump the same every time. Counting by 10s from 20 goes 20, 30, 40, not 20, 21, 22. If you start on an odd number, counting by 2s gives odd numbers: 3, 5, 7.",
      pic: () => P.chain(["5", "10", "15", "20"], ["+5", "+5", "+5"]),
      gen() {
        const step = pick([2, 5, 10]);
        const start = step * R(1, step === 2 ? 8 : 6);
        const seq = [0, 1, 2, 3].map((i) => start + i * step);
        const h = pick([2, 3]);
        const ans = seq[h];
        const shown = seq.map((v, i) => (i === h ? "?" : v));
        const tip = step === 5 ? " Fives end in 5 or 0." : step === 10 ? " Tens end in 0." : "";
        return Q(`Count by ${step}s: ${shown.join(", ")}`, ans, [ans + 1, ans - 1, ans + step, ans + 2 * step],
          `Each jump is +${step}: ${seq.join(", ")}.${tip}`, P.chain(shown, Array(3).fill(`+${step}`)));
      },
      worked: [
        {
          problem: "Count by 5s: 15, 20, 25, ?",
          steps: [["Find the jump", "20 − 15 = 5, so each jump is 5."], ["Check the ending", "Fives end in 5 or 0. 25 ends in 5, so the next one ends in 0."], ["Jump", "25 + 5 = 30."]],
          answer: "30"
        },
        {
          problem: "There are 6 pairs of socks. How many socks is that?",
          steps: [["Pick the count", "A pair is 2, so count by 2s."], ["Count one pair at a time", "2, 4, 6, 8, 10, 12."], ["Stop at 6 pairs", "You said six numbers, so the last one is the answer: 12."]],
          answer: "12 socks"
        },
        {
          problem: "A dime is worth 10 cents. How much are 7 dimes worth?",
          steps: [["Pick the count", "Each dime is 10, so count by 10s."], ["Count", "10, 20, 30, 40, 50, 60, 70."], ["Check", "Tens end in 0, and 70 does."]],
          answer: "70 cents"
        }
      ]
    }
  ]);

  /* ---------- Grades 1–2 ---------- */

  add("g1", [
    {
      id: "evenodd", name: "Even and odd", phrase: "Even numbers share fair: everyone gets a buddy. Odd numbers leave one out.",
      also: "Only the last digit decides: 0, 2, 4, 6, 8 are even. 1, 3, 5, 7, 9 are odd.",
      steps: ["Look at the last digit only.", "0, 2, 4, 6, or 8: even.", "1, 3, 5, 7, or 9: odd."],
      exception: "Ignore the other digits: 58 is even, even though 5 is odd. And 0 is even, because zero splits into two equal teams of nothing.",
      pic: () => buddies(7),
      gen() {
        if (Math.random() < 0.3) {
          const n = R(3, 16);
          const ans = n % 2 ? "odd" : "even";
          return Q(`Is ${n} even or odd?`, ans, [n % 2 ? "even" : "odd"],
            n % 2 ? `${n} ends in ${n % 10}. One is left without a buddy, so it is odd.` : `${n} ends in ${n % 10}. Everyone has a buddy, so it is even.`, buddies(n, true));
        }
        const want = pick(["even", "odd"]);
        const fits = (n) => (n % 2 === 0) === (want === "even");
        let ans;
        do { ans = R(10, 99); } while (!fits(ans));
        const others = new Set();
        while (others.size < 3) {
          const n = R(10, 99);
          if (!fits(n)) others.add(n);
        }
        return Q(`Which number is ${want}?`, ans, [...others],
          `Only the last digit decides. ${ans} ends in ${ans % 10}, so it is ${want}. The others end in ${want === "even" ? "1, 3, 5, 7, or 9" : "0, 2, 4, 6, or 8"}.`);
      },
      worked: [
        {
          problem: "Is 746 even or odd?",
          steps: [["Last digit only", "The last digit is 6."], ["Check the list", "6 is one of 0, 2, 4, 6, 8."], ["Decide", "746 is even."]],
          answer: "Even"
        },
        {
          problem: "15 kids line up in pairs for a trip. Does everyone get a buddy?", pic: buddies(15),
          steps: [["Last digit only", "15 ends in 5."], ["Check the list", "5 is odd, so one is left out."], ["Picture it", "7 pairs make 14 kids, plus 1 extra."]],
          answer: "No. One kid is left without a buddy."
        }
      ]
    },
    {
      id: "round", name: "Rounding to 10 and 100", phrase: "Five or more, raise the score. Four or less, let it rest.",
      steps: ["Find the digit you are rounding to.", "Look at the digit just to its right.", "5 or more: your digit goes up 1. 4 or less: it stays.", "Every digit after it becomes 0."],
      exception: "Look only at the very next digit. 349 to the nearest hundred is 300, because the tens digit is 4. Don’t round twice (349 → 350 → 400). A 9 that goes up rolls over: 97 rounds to 100.",
      pic: () => roundLine(40, 50, 47),
      gen() {
        const r10 = (x) => x - (x % 10) + (x % 10 >= 5 ? 10 : 0);
        if (Math.random() < 0.5) {
          let n;
          do { n = R(11, 99); } while (n % 10 === 0);
          const d = n % 10, down = n - d, ans = r10(n);
          return Q(`Round ${n} to the nearest 10.`, ans, [ans === down ? down + 10 : down, ...[ans + 10, ans - 10, ans + 20].filter((v) => v > 0)],
            `The ones digit is ${d}. ${d >= 5 ? "Five or more, raise the score" : "Four or less, let it rest"}: ${ans}.`, roundLine(down, down + 10, n));
        }
        let n;
        do { n = R(101, 999); } while (n % 100 === 0);
        const t = Math.floor(n / 10) % 10, down = n - (n % 100);
        const ans = t >= 5 ? down + 100 : down;
        const twice = r10(n) - (r10(n) % 100) + (Math.floor(r10(n) / 10) % 10 >= 5 ? 100 : 0);
        return Q(`Round ${n} to the nearest 100.`, ans, [ans === down ? down + 100 : down, twice, r10(n), ...[ans + 100, ans - 100, ans + 200].filter((v) => v > 0)],
          `The tens digit is ${t}. ${t >= 5 ? "Five or more, raise the score" : "Four or less, let it rest"}: ${ans}.`, roundLine(down, down + 100, n));
      },
      worked: [
        {
          problem: "Round 63 to the nearest 10.", pic: roundLine(60, 70, 63),
          steps: [["Find the place", "The tens digit is 6, so it is 60 or 70."], ["Look next door", "The ones digit is 3."], ["Say the rhyme", "Four or less, let it rest: 60."]],
          answer: "60"
        },
        {
          problem: "Round 451 to the nearest 100.",
          steps: [["Find the place", "The hundreds digit is 4, so it is 400 or 500."], ["Look next door", "The tens digit is 5."], ["Say the rhyme", "Five or more, raise the score: 500."]],
          answer: "500"
        },
        {
          problem: "A school has 348 kids. About how many is that, to the nearest hundred?", pic: roundLine(300, 400, 348),
          steps: [["Find the place", "The hundreds digit is 3, so it is 300 or 400."], ["Look only next door", "The tens digit is 4. Ignore the 8."], ["Say the rhyme", "Four or less, let it rest: 300."]],
          answer: "About 300 kids"
        }
      ]
    },
    {
      id: "clock", name: "Telling time", phrase: "Hour is a short word: short hand. Minute is a long word: long hand.",
      also: "The long hand counts by 5s: the number it points to × 5 is the minutes.",
      steps: ["Short hand: the last number it has passed is the hour.", "Long hand: the number it points to × 5 is the minutes.", "Say the hour, then the minutes: 3:25."],
      exception: "After half past, the short hand is close to the next number, but the hour hasn’t changed yet: at 2:50 it is almost at 3, and it is still 2. The long hand on 12 means 0 minutes, o’clock.",
      pic: () => clock(3, 25),
      gen() {
        const h = R(1, 12), m = 5 * R(0, 11);
        const t = (hh, mm) => `${hh}:${pad2(mm)}`;
        const num = m / 5 || 12;
        const why = m
          ? `The short hand has passed ${h}, so the hour is ${h}. The long hand points at ${num}: ${num} × 5 = ${m} minutes.`
          : `The short hand is on ${h}, and the long hand is on 12, so it is ${h} o’clock.`;
        return Q("What time does the clock show?", t(h, m), [t((h % 12) + 1, m), t(num, (h * 5) % 60), t(h, m / 5), t(h === 1 ? 12 : h - 1, m)], why, clock(h, m));
      },
      worked: [
        {
          problem: "What time does this clock show?", pic: clock(4, 10),
          steps: [["Short hand, hours", "It has passed 4, so the hour is 4."], ["Long hand, minutes", "It points at 2. 2 × 5 = 10 minutes."], ["Say it", "4:10."]],
          answer: "4:10"
        },
        {
          problem: "What time does this clock show?", pic: clock(8, 45),
          steps: [["Short hand, hours", "It is almost at 9, but it hasn’t reached it. The hour is still 8."], ["Long hand, minutes", "It points at 9. 9 × 5 = 45 minutes."], ["Say it", "8:45, or quarter to 9."]],
          answer: "8:45"
        },
        {
          problem: "Soccer starts at 3:30 and lasts 1 hour. Where are the hands when it ends?",
          steps: [["Add the hour", "3:30 plus 1 hour is 4:30."], ["Long hand", "30 minutes ÷ 5 = 6, so the long hand points at 6."], ["Short hand", "Half past 4: halfway between 4 and 5."]],
          answer: "4:30: long hand on 6, short hand halfway between 4 and 5"
        }
      ]
    },
    {
      id: "add3", name: "Adding three numbers", phrase: "Hunt for a ten first, then add the last one.",
      steps: ["Look for two numbers that make 10.", "Add those two first.", "Add the third number to 10."],
      exception: "You can add in any order, but use all three numbers. If no pair makes 10, look for a double, or just add from left to right.",
      pic: () => P.chain(["4 + 7 + 6", "10 + 7", "17"], ["4 + 6 = 10", "add 7"]),
      gen() {
        const a = R(1, 9), b = 10 - a, c = R(2, 9), s = 10 + c;
        return Q(shuffle([a, b, c]).join(" + "), s, [s - 1, s + 1, s + 10, a + c], `${a} + ${b} = 10. Then 10 + ${c} = ${s}.`);
      },
      worked: [
        {
          problem: "3 + 8 + 7",
          steps: [["Hunt for a ten", "3 + 7 = 10."], ["Add the last one", "10 + 8 = 18."]],
          answer: "18"
        },
        {
          problem: "Ava has 6 stickers. She gets 9 more, then 4 more. How many does she have now?",
          steps: [["Write it", "6 + 9 + 4."], ["Hunt for a ten", "6 + 4 = 10."], ["Add the last one", "10 + 9 = 19."]],
          answer: "19 stickers"
        }
      ]
    }
  ]);

  /* ---------- Grades 3–4 ---------- */

  add("g3", [
    {
      id: "divis", name: "Divisibility rules", phrase: "Last digit for 2, 5, and 10. Add the digits for 3 and 9. Last two digits for 4. Six needs 2 and 3.",
      steps: ["2: the last digit is even.", "5: it ends in 0 or 5. 10: it ends in 0.", "3 or 9: add the digits. If the sum divides by 3 (or 9), so does the number.", "4: the last two digits divide by 4.", "6: it passes the test for 2 and the test for 3."],
      exception: "Adding the digits works only for 3 and 9, not for 4 or 7. Six needs both tests: 15 passes 3 but is odd, so it fails 6.",
      pic: () => P.table(["÷ by", "Check"], [["2", "last digit even"], ["3", "digit sum ÷ 3"], ["4", "last two digits ÷ 4"], ["5", "ends in 0 or 5"], ["6", "passes 2 and 3"], ["9", "digit sum ÷ 9"], ["10", "ends in 0"]]),
      gen() {
        const d = pick([2, 3, 4, 5, 6, 9, 10]);
        const tricky = {
          2: () => true,
          3: () => true,
          4: (n) => n % 2 === 0,
          5: () => true,
          6: (n) => n % 2 === 0 || n % 3 === 0,
          9: (n) => n % 3 === 0,
          10: (n) => n % 5 === 0 || n % 2 === 0
        }[d];
        let ans;
        do { ans = R(100, 999); } while (ans % d);
        const others = new Set();
        while (others.size < 3) {
          const n = R(100, 999);
          if (n % d && tricky(n)) others.add(n);
        }
        const digits = String(ans).split("");
        const s = sum(digits.map(Number));
        const why = {
          2: `${ans} ends in ${ans % 10}, an even digit.`,
          3: `Add the digits: ${digits.join(" + ")} = ${s}, and ${s} divides by 3.`,
          4: `The last two digits, ${String(ans).slice(-2)}, divide by 4.`,
          5: `${ans} ends in ${ans % 10}, and fives end in 0 or 5.`,
          6: `${ans} is even, so it passes 2. Its digits add to ${s}, so it passes 3.`,
          9: `Add the digits: ${digits.join(" + ")} = ${s}, and ${s} divides by 9.`,
          10: `${ans} ends in 0.`
        }[d];
        return Q(`Which number divides by ${d} with nothing left over?`, ans, [...others], why);
      },
      worked: [
        {
          problem: "Does 126 divide by 9?",
          steps: [["Add the digits", "1 + 2 + 6 = 9."], ["Check the sum", "9 divides by 9."], ["Decide", "Yes: 126 ÷ 9 = 14."]],
          answer: "Yes"
        },
        {
          problem: "Does 314 divide by 4?",
          steps: [["Last two digits", "Look at 14."], ["Check them", "14 ÷ 4 = 3 R2. It doesn’t fit."], ["Decide", "No, 314 does not divide by 4."]],
          answer: "No"
        },
        {
          problem: "Can 234 cookies go into boxes of 6 with none left over?",
          steps: [["Six needs two tests", "It must pass 2 and pass 3."], ["Test 2", "234 ends in 4, which is even. Pass."], ["Test 3", "2 + 3 + 4 = 9, and 9 divides by 3. Pass."], ["Decide", "Yes: 234 ÷ 6 = 39 boxes."]],
          answer: "Yes, 39 full boxes"
        }
      ]
    },
    {
      id: "primes", name: "Factors, multiples, and primes", phrase: "Factors are few, multiples are many. A prime has just two factors: 1 and itself.",
      also: "Factors fit into a number. Multiples are what you get when you times it.",
      steps: ["Factors of 12: numbers that divide 12 exactly: 1, 2, 3, 4, 6, 12.", "Multiples of 12: 12, 24, 36, and on forever.", "Prime: exactly two factors, like 7 (1 and 7).", "Composite: more than two factors, like 9 (1, 3, 9)."],
      exception: "1 is not prime: it has only one factor. 2 is the only even prime. Odd does not mean prime: 9, 15, and 21 are composite.",
      pic: () => rainbow(12),
      gen() {
        const form = R(1, 3);
        if (form === 1) {
          const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
          const comps = [[1, ""], [9, "3 × 3"], [15, "3 × 5"], [21, "3 × 7"], [27, "3 × 9"], [33, "3 × 11"], [39, "3 × 13"], [49, "7 × 7"], [51, "3 × 17"], [57, "3 × 19"], [63, "7 × 9"], [69, "3 × 23"], [77, "7 × 11"], [87, "3 × 29"], [91, "7 × 13"]];
          const ans = pick(primes);
          const w = shuffle(comps).slice(0, 3);
          const ex = w.find((c) => c[1]);
          return Q("Which number is prime?", ans, w.map((c) => c[0]), `${ans} has just two factors: 1 and ${ans}. The others split up, like ${ex[0]} = ${ex[1]}.`);
        }
        if (form === 2) {
          const N = pick([12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48]);
          const fs = [];
          for (let k = 2; k < N; k += 1) if (N % k === 0) fs.push(k);
          const ans = pick(fs);
          const non = [];
          while (non.length < 2) {
            const v = R(4, N - 1);
            if (N % v && !non.includes(v)) non.push(v);
          }
          return Q(`Which number is a factor of ${N}?`, ans, [N * 2, ...non], `${N} ÷ ${ans} = ${N / ans}, so ${ans} fits into ${N}. Factors are few and fit inside. ${N * 2} is a multiple, not a factor.`);
        }
        const k = R(3, 9), ans = k * R(3, 9);
        const factor = { 4: 2, 6: 3, 8: 4, 9: 3 }[k];
        const pool = shuffle([ans - 1, ans + 1, ans + 2, ans - 2, ans + k - 1].filter((v) => v > 1 && v % k));
        return Q(`Which number is a multiple of ${k}?`, ans, [factor, ...pool].filter((v) => v != null).slice(0, 3), `${ans} = ${k} × ${ans / k}. Multiples are many: ${k}, ${2 * k}, ${3 * k}, and on and on.`);
      },
      worked: [
        {
          problem: "List all the factors of 18.", pic: rainbow(18),
          steps: [["Start the rainbow", "1 × 18."], ["Try 2, then 3", "2 × 9 and 3 × 6."], ["Stop when they meet", "4 and 5 don’t fit, and 6 is already used."], ["List them", "1, 2, 3, 6, 9, 18."]],
          answer: "1, 2, 3, 6, 9, 18"
        },
        {
          problem: "Is 51 prime or composite?",
          steps: [["Try 2", "51 is odd, so 2 doesn’t fit."], ["Try 3", "5 + 1 = 6, which divides by 3."], ["Split it", "51 = 3 × 17."], ["Decide", "It has more than two factors (1, 3, 17, 51)."]],
          answer: "Composite"
        }
      ]
    },
    {
      id: "areaper", name: "Area and perimeter", phrase: "Perimeter is the fence around. Area is the carpet inside.",
      steps: ["Perimeter: add all four sides, or 2 × (length + width).", "Area: length × width.", "Perimeter is a length (cm). Area is squares (cm²)."],
      exception: "Don’t mix them up: a 5 by 3 rectangle has a fence of 16 but a carpet of 15. Two shapes with the same area can have different perimeters.",
      pic: () => rectPic(5, 3, { grid: true, note: "Fence: 5 + 3 + 5 + 3 = 16. Carpet: 5 × 3 = 15 squares." }),
      gen() {
        const l = R(3, 12);
        let w;
        do { w = R(2, 9); } while (w === l);
        const form = R(1, 3);
        if (form === 1) {
          return Q(`A rectangle is ${l} by ${w}. Find its area.`, l * w, [2 * (l + w), l + w, l * w + l], `Carpet inside: ${l} × ${w} = ${l * w} squares.`, rectPic(l, w));
        }
        if (form === 2) {
          return Q(`A rectangle is ${l} by ${w}. Find its perimeter.`, 2 * (l + w), [l * w, l + w, 2 * l + w], `Fence around: ${l} + ${w} + ${l} + ${w} = ${2 * (l + w)}.`, rectPic(l, w));
        }
        return Q(`A rectangle has area ${l * w} and length ${l}. Find its width.`, w, [l * w - l, (l * w) % 2 ? null : (l * w) / 2, w + 1, w - 1],
          `Carpet = length × width, so width = ${l * w} ÷ ${l} = ${w}.`, rectPic(l, w, { wt: "?" }));
      },
      worked: [
        {
          problem: "A rug is 6 m by 4 m. Find its perimeter and its area.", pic: rectPic(6, 4, { grid: true }),
          steps: [["Fence around", "6 + 4 + 6 + 4 = 20 m."], ["Carpet inside", "6 × 4 = 24 squares, so 24 m²."], ["Check the units", "The fence is a length (m). The carpet is squares (m²)."]],
          answer: "Perimeter 20 m, area 24 m²"
        },
        {
          problem: "A garden is 8 m long. The fence around it is 26 m. How wide is the garden?", pic: rectPic(8, 5, { wt: "?" }),
          steps: [["Fence around", "Two lengths and two widths make 26."], ["Take off the lengths", "26 − 8 − 8 = 10."], ["Share between the two widths", "10 ÷ 2 = 5 m."]],
          answer: "5 m"
        }
      ]
    },
    {
      id: "roundbig", name: "Rounding big numbers", phrase: "Underline the place. Look next door. Five or more, raise the score.",
      also: "Four or less, let it rest.",
      steps: ["Underline the digit in the place you want.", "Look at the digit next door, on its right.", "5 or more: the underlined digit goes up 1. 4 or less: it stays.", "Every digit after it becomes 0."],
      exception: "If the underlined digit is a 9 and it goes up, it rolls over: 3,960 to the nearest hundred is 4,000. Don’t round in steps: 3,449 → 3,450 → 3,500 is wrong. It is 3,400.",
      pic: () => roundLine(6300, 6400, 6382),
      gen() {
        const place = pick([10, 100, 1000]);
        let n;
        do { n = R(1000, 99999); } while (n % place === 0);
        const rnd = (x, p) => x - (x % p) + (Math.floor(x / (p / 10)) % 10 >= 5 ? p : 0);
        const next = Math.floor(n / (place / 10)) % 10;
        const down = n - (n % place);
        const ans = rnd(n, place);
        const name = { 10: "ten", 100: "hundred", 1000: "thousand" }[place];
        const wrongs = [ans === down ? down + place : down, place > 10 ? rnd(rnd(n, place / 10), place) : null, rnd(n, place * 10), place > 10 ? rnd(n, place / 10) : null, ans + place, ans - place];
        return Q(`Round ${big(n)} to the nearest ${name}.`, big(ans), wrongs.map((x) => (x ? big(x) : null)),
          `The digit next door is ${next}. ${next >= 5 ? "Five or more, raise the score" : "Four or less, let it rest"}: ${big(ans)}.`, roundLine(down, down + place, n));
      },
      worked: [
        {
          problem: "Round 6,382 to the nearest hundred.", pic: roundLine(6300, 6400, 6382),
          steps: [["Underline the place", "The hundreds digit is 3."], ["Look next door", "The tens digit is 8."], ["Raise the score", "8 is five or more, so the 3 goes up to 4."], ["Zeros after", "6,400."]],
          answer: "6,400"
        },
        {
          problem: "Round 47,962 to the nearest hundred.",
          steps: [["Underline the place", "The hundreds digit is 9."], ["Look next door", "The tens digit is 6: five or more."], ["Raise the score and roll over", "9 + 1 = 10. Write 0 and carry 1 into the thousands: 47 becomes 48."], ["Zeros after", "48,000."]],
          answer: "48,000"
        },
        {
          problem: "A stadium holds 54,519 people. About how many is that, to the nearest thousand?",
          steps: [["Underline the place", "The thousands digit is 4."], ["Look next door", "The hundreds digit is 5."], ["Raise the score", "Five or more, so the 4 goes up to 5."], ["Zeros after", "55,000."]],
          answer: "About 55,000 people"
        }
      ]
    },
    {
      id: "equivfr", name: "Equivalent fractions", phrase: "What you do to the top, you do to the bottom.",
      steps: ["Pick a number.", "Multiply (or divide) the top by it.", "Do the same to the bottom. It looks different, but it is the same amount."],
      exception: "Only × and ÷ work. Adding the same number to the top and bottom changes the amount: 1/2 is not 2/3.",
      pic: () => P.fractionBars([{ n: 1, d: 2 }, { n: 2, d: 4 }, { n: 4, d: 8 }]),
      gen() {
        let a, b;
        do { b = R(2, 6); a = R(1, b - 1); } while (gcd(a, b) !== 1);
        const k = R(2, 6), A = a * k, B = b * k;
        const form = R(1, 3);
        const bar = P.fractionBars([{ n: a, d: b }]);
        if (form === 1) {
          return Q(`${raw(a, b)} = ?/${B}`, A, [a + B - b, A + 1, B - A, A - 1], `The bottom went ${b} × ${k} = ${B}. Do the same to the top: ${a} × ${k} = ${A}.`, bar);
        }
        if (form === 2) {
          return Q(`${raw(a, b)} = ${A}/?`, B, [b + A - a, B + 1, B - 1, A * b], `The top went ${a} × ${k} = ${A}. Do the same to the bottom: ${b} × ${k} = ${B}.`, bar);
        }
        return Q(`Which fraction equals ${raw(a, b)}?`, raw(A, B), [raw(a + k, b + k), raw(A, b + k), raw(a + 1, b + 1), raw(A, B + 1)],
          `× ${k} on top: ${a} × ${k} = ${A}. The same on the bottom: ${b} × ${k} = ${B}.`, bar);
      },
      worked: [
        {
          problem: "3/4 = ?/20",
          steps: [["What happened to the bottom?", "4 × 5 = 20."], ["Do it to the top", "3 × 5 = 15."], ["Write it", "3/4 = 15/20."]],
          answer: "15"
        },
        {
          problem: "Simplify 18/24.",
          steps: [["Find a number that divides both", "6 divides 18 and 24."], ["Do it to the top", "18 ÷ 6 = 3."], ["Do it to the bottom", "24 ÷ 6 = 4."]],
          answer: "3/4"
        },
        {
          problem: "Lily ate 2/3 of a pizza. The pizza had 12 slices. How many slices did she eat?",
          steps: [["Name the new bottom", "12 slices, so the bottom is 12."], ["What happened to the bottom?", "3 × 4 = 12."], ["Do it to the top", "2 × 4 = 8, so 2/3 = 8/12."]],
          answer: "8 slices"
        }
      ]
    },
    {
      id: "times10", name: "× 10, 100, 1000", phrase: "Each zero slides the digits one place left.",
      also: "× 10: one place. × 100: two places. × 1000: three places. Zeros fill the empty seats.",
      steps: ["Count the zeros in 10, 100, or 1000.", "Slide every digit that many places to the left.", "Fill the empty seats with zeros."],
      exception: "Count the zeros in the 10, 100, or 1000 only. 40 × 100 is 4,000: the 0 in 40 moves too, and two new zeros join it.",
      pic: () => P.table(["", "Th", "H", "T", "O"], [["34", "", "", "3", "4"], ["× 10", "", "3", "4", "0"], ["× 100", "3", "4", "0", "0"]], { hot: [[1, 4], [2, 3], [2, 4]], note: "The digits slide left. Zeros fill the empty seats." }),
      gen() {
        const m = pick([10, 100, 1000]);
        const z = String(m).length - 1;
        const n = Math.random() < 0.6 ? R(2, 99) : R(101, 999);
        const places = `${z} place${z > 1 ? "s" : ""}`;
        if (Math.random() < 0.7) {
          return Q(`${n} × ${big(m)}`, big(n * m), [big((n * m) / 10), big(n * m * 10), big(n + m)],
            `${big(m)} has ${z} zero${z > 1 ? "s" : ""}. Slide ${n} ${places} left and fill with zeros: ${big(n * m)}.`);
        }
        return Q(`? × ${big(m)} = ${big(n * m)}`, n, [big(n * 10), big(n * 100), n + 1],
          `Slide back ${places} to the right: ${big(n * m)} ÷ ${big(m)} = ${n}.`);
      },
      worked: [
        {
          problem: "37 × 100",
          steps: [["Count the zeros", "100 has 2 zeros."], ["Slide the digits", "37 slides 2 places left: the 3 goes to the thousands, the 7 to the hundreds."], ["Fill the empty seats", "Zeros go in the tens and ones: 3,700."]],
          answer: "3,700"
        },
        {
          problem: "A box holds 250 paper clips. How many clips are in 1,000 boxes?",
          steps: [["Write it", "250 × 1,000."], ["Count the zeros", "1,000 has 3 zeros."], ["Slide and fill", "Every digit of 250 moves 3 places left, and 3 new zeros fill in behind: 250,000."]],
          answer: "250,000 paper clips"
        }
      ]
    }
  ]);

  /* ---------- Grades 5–6 ---------- */

  add("g5", [
    {
      id: "decadd", name: "Adding and subtracting decimals", phrase: "Line up the dots.",
      also: "Empty spots get a zero. Then add or subtract like whole numbers, and drop the dot straight down.",
      steps: ["Write the numbers in a column with the dots in one line.", "Fill empty spots with zeros. A whole number gets a dot at its end: 7 = 7.00.", "Add or subtract column by column.", "Bring the dot straight down."],
      exception: "Don’t line up the last digits: 2.45 + 1.3 is 3.75, not 2.58. This rule is for + and − only. For × you don’t line up the dots.",
      pic: () => P.table(["", "Ones", ".", "Tenths", "Hundredths"], [["", "4", ".", "5", "6"], ["+", "2", ".", "3", "0"], ["=", "6", ".", "8", "6"]], { hot: [[0, 2], [1, 2], [2, 2], [1, 4]], note: "The dots sit in one straight line. The empty spot gets a 0." }),
      gen() {
        const sub = Math.random() < 0.5;
        const whole = Math.random() < 0.3;
        let bd;
        do { bd = whole ? R(2, 9) : R(11, 99); } while (!whole && bd % 10 === 0);
        const bH = whole ? bd * 100 : bd * 10;
        let aH;
        do { aH = sub ? bH + R(11, 600) : R(105, 999); } while (aH % 10 === 0);
        const op = sub ? "−" : "+";
        const sH = sub ? aH - bH : aH + bH;
        const slip = sub ? aH - bd : aH + bd;
        const aS = dp(aH, 2), bS = whole ? String(bd) : dp(bd, 1), padded = whole ? `${bd}.00` : `${dp(bd, 1)}0`;
        return Q(`${aS} ${op} ${bS}`, dp(sH, 2), [dp(slip, 2), dp(sH + 10, 2), dp(sH, 1), dp(sH + 100, 2)],
          `Line up the dots: ${bS} becomes ${padded}. ${aS} ${op} ${padded} = ${dp(sH, 2)}.`);
      },
      worked: [
        {
          problem: "4.56 + 2.3",
          steps: [["Line up the dots", "4.56 over 2.30. The empty spot gets a 0."], ["Add each column", "6 + 0 = 6, 5 + 3 = 8, 4 + 2 = 6."], ["Drop the dot straight down", "6.86."]],
          answer: "6.86"
        },
        {
          problem: "7 − 2.45",
          steps: [["Give 7 a dot", "7 is 7.00."], ["Line up the dots", "7.00 over 2.45."], ["Subtract, borrowing as you go", "7.00 − 2.45 = 4.55."]],
          answer: "4.55"
        },
        {
          problem: "Tom has $20. He spends $8.75 on a book and $3.40 on a pen. How much does he have left?",
          steps: [["Line up the dots to add", "8.75 + 3.40 = 12.15."], ["Line up again to subtract", "20.00 over 12.15."], ["Subtract", "20.00 − 12.15 = 7.85."]],
          answer: "$7.85"
        }
      ]
    },
    {
      id: "decmul", name: "Multiplying decimals", phrase: "Ignore the dots, multiply, then count the places back in.",
      also: "Count the digits after the dots in both numbers. The answer gets that many.",
      steps: ["Take the dots out and multiply the whole numbers.", "Count the digits after the dot in each number, and add them.", "Count that many places from the right, and put the dot in."],
      exception: "Don’t line up the dots for ×: that is only for + and −. Count before you tidy up: 0.5 × 0.4 = 0.20, which is 0.2, not 0.02.",
      pic: () => P.chain(["0.3 × 0.4", "3 × 4 = 12", "0.12"], ["drop the dots", "2 places back"]),
      gen() {
        const p1 = pick([1, 2]), p2 = pick([0, 1]);
        let ai;
        do { ai = R(2, 99); } while (ai % 10 === 0);
        const bi = R(2, 9);
        const prod = ai * bi, p = p1 + p2;
        const ans = dp(prod, p), full = dp(prod, p, true);
        return Q(`${dp(ai, p1)} × ${dp(bi, p2)}`, ans, [dp(prod, p - 1), dp(prod, p + 1), dp(prod, Math.max(p1, p2)), dp(prod + ai, p)],
          `Drop the dots: ${ai} × ${bi} = ${prod}. Places: ${p1} + ${p2} = ${p}. Count back ${p}: ${full}${full !== ans ? `, which is ${ans}` : ""}.`);
      },
      worked: [
        {
          problem: "0.3 × 0.4",
          steps: [["Drop the dots", "3 × 4 = 12."], ["Count the places", "0.3 has 1, and 0.4 has 1. That makes 2."], ["Put the dot back", "Count 2 from the right: 0.12."]],
          answer: "0.12"
        },
        {
          problem: "2.5 × 1.6",
          steps: [["Drop the dots", "25 × 16 = 400."], ["Count the places", "1 + 1 = 2."], ["Put the dot back", "4.00, which is just 4."]],
          answer: "4"
        },
        {
          problem: "Grapes cost $1.50 a pound. How much do 4.2 pounds cost?",
          steps: [["Drop the dots", "1.50 is the same as 1.5. 15 × 42 = 630."], ["Count the places", "1.5 has 1, and 4.2 has 1. That makes 2."], ["Put the dot back", "6.30."]],
          answer: "$6.30"
        }
      ]
    },
    {
      id: "decdiv", name: "Dividing by a decimal", phrase: "Make the divisor whole: hop both dots the same number of places.",
      also: "Then divide like normal. The dot in the answer sits straight above the dot inside.",
      steps: ["Hop the divisor’s dot to the right until it is a whole number.", "Hop the other number’s dot the same number of places. Add zeros if you run out of digits.", "Divide like normal."],
      exception: "Both dots must hop the same number of places, or the answer changes. If only the number inside has a dot, don’t hop: just divide and keep the dot above.",
      pic: () => P.chain(["1.2 ÷ 0.3", "12 ÷ 3", "4"], ["hop both dots 1", "divide"]),
      gen() {
        const [dI, pd] = pick([[R(2, 9), 1], [R(2, 9), 2], [pick([12, 15, 25]), 1]]);
        const pq = Math.random() < 0.3 ? 1 : 0;
        let qI;
        do { qI = pq ? R(11, 99) : R(2, 40); } while (pq && qI % 10 === 0);
        const nI = dI * qI;
        const ans = dp(qI, pq);
        const s = pd > 1 ? "s" : "";
        return Q(`${dp(nI, pd + pq)} ÷ ${dp(dI, pd)}`, ans, [dp(qI, pq + pd), dp(qI, pq - pd), dp(qI, pq - 1), dp(qI, pq + 1), dp(qI, pq + 2), dp(qI, pq - 2)],
          `${dp(dI, pd)} has ${pd} decimal place${s}. Hop both dots ${pd} place${s}: ${dp(nI, pq)} ÷ ${dI} = ${ans}.`);
      },
      worked: [
        {
          problem: "4.8 ÷ 0.6",
          steps: [["Make the divisor whole", "0.6 becomes 6: one hop."], ["Hop the other dot the same", "4.8 becomes 48."], ["Divide", "48 ÷ 6 = 8."]],
          answer: "8"
        },
        {
          problem: "1.35 ÷ 0.05",
          steps: [["Make the divisor whole", "0.05 becomes 5: two hops."], ["Hop the other dot the same", "1.35 becomes 135."], ["Divide", "135 ÷ 5 = 27."]],
          answer: "27"
        },
        {
          problem: "A ribbon is 7.5 m long. How many 0.25 m pieces can you cut from it?",
          steps: [["Write it", "7.5 ÷ 0.25."], ["Make the divisor whole", "0.25 becomes 25: two hops."], ["Hop the other dot the same", "7.5 becomes 750. Add a zero to make the second hop."], ["Divide", "750 ÷ 25 = 30."]],
          answer: "30 pieces"
        }
      ]
    },
    {
      id: "mixed", name: "Mixed numbers and improper fractions", phrase: "MAD face: Multiply, Add, Denominator stays.",
      also: "Going back: divide. The answer is the wholes, the remainder goes on top, and the denominator stays.",
      steps: ["Multiply the whole number by the denominator.", "Add the numerator.", "Keep the same denominator.", "Going back: top ÷ bottom gives wholes, and the remainder goes on top."],
      exception: "The denominator never changes: 2 3/4 is 11/4, not 11/8. Multiply the whole by the bottom, not by the top.",
      pic: () => P.chain(["2 3/4", "2 × 4 + 3", "11/4"], ["Multiply, Add", "Denominator stays"]),
      gen() {
        let d, n;
        do { d = R(2, 9); n = R(1, d - 1); } while (gcd(n, d) !== 1);
        const w = R(1, 9), N = w * d + n;
        if (Math.random() < 0.55) {
          return Q(`Write ${w} ${raw(n, d)} as an improper fraction.`, raw(N, d), [raw(w * n + d, d), raw(w + n, d), raw(d * n + w, d), raw(N, w * d)],
            `Multiply: ${w} × ${d} = ${w * d}. Add: ${w * d} + ${n} = ${N}. Denominator stays: ${raw(N, d)}.`,
            w <= 3 ? P.fractionBars([...Array(w).fill({ n: d, d }), { n, d }]) : "");
        }
        return Q(`Write ${raw(N, d)} as a mixed number.`, `${w} ${raw(n, d)}`, [`${w + 1} ${raw(n, d)}`, `${w} ${raw(d - n, d)}`, `${n} ${raw(w, d)}`, `${w} ${raw(n, N)}`],
          `${N} ÷ ${d} = ${w} R${n}. That is ${w} wholes, ${n} left on top, and the denominator stays ${d}.`);
      },
      worked: [
        {
          problem: "Write 3 2/5 as an improper fraction.",
          steps: [["Multiply", "Whole × denominator: 3 × 5 = 15."], ["Add", "15 + 2 = 17."], ["Denominator stays", "17/5."]],
          answer: "17/5"
        },
        {
          problem: "Write 23/4 as a mixed number.",
          steps: [["Divide", "23 ÷ 4 = 5 R3."], ["Wholes", "5 wholes."], ["Remainder on top, denominator stays", "3/4. So it is 5 3/4."]],
          answer: "5 3/4"
        },
        {
          problem: "A recipe needs 2 3/4 cups of flour. Your scoop holds 1/4 cup. How many scoops do you need?", pic: P.fractionBars([{ n: 4, d: 4 }, { n: 4, d: 4 }, { n: 3, d: 4 }]),
          steps: [["Multiply", "2 × 4 = 8 quarters in the 2 wholes."], ["Add", "8 + 3 = 11."], ["Denominator stays", "11/4: eleven quarter cups."]],
          answer: "11 scoops"
        }
      ]
    },
    {
      id: "lcmgcf", name: "LCM and GCF (HCF)", phrase: "Climb the ladder. The left side is the GCF. Multiply the big L for the LCM.",
      also: "GCF (also called HCF): the biggest number that fits into both. LCM: the smallest number both fit into.",
      steps: ["Write the two numbers side by side.", "Divide both by a prime that fits both. Write the answers below.", "Stop when nothing fits both.", "GCF: multiply the left side. LCM: multiply the L, which is the left side and the bottom row."],
      exception: "The GCF can’t be bigger than the smaller number, and the LCM can’t be smaller than the bigger number. If nothing fits both, the GCF is 1 and the LCM is the two numbers multiplied.",
      pic: () => ladder(12, 18),
      gen() {
        const g = pick([2, 3, 4, 5, 6]);
        let x, y;
        do { x = R(2, 7); y = R(2, 7); } while (x >= y || gcd(x, y) !== 1);
        const a = g * x, b = g * y, L = g * x * y;
        const { left } = ladderRows(a, b);
        if (Math.random() < 0.5) {
          return Q(`GCF of ${a} and ${b}`, g, [L, a, x, y],
            `Ladder: ${left.join(", then ")} fit${left.length > 1 ? "" : "s"} both, leaving ${x} and ${y}. The left side is ${left.length > 1 ? `${left.join(" × ")} = ` : ""}${g}.`);
        }
        return Q(`LCM of ${a} and ${b}`, L, [a * b, g, b, 2 * L],
          `Ladder: the left side is ${left.join(" × ")}, and the bottom row is ${x} and ${y}. The big L: ${[...left, x, y].join(" × ")} = ${L}.`);
      },
      worked: [
        {
          problem: "Find the GCF and LCM of 12 and 18.", pic: ladder(12, 18),
          steps: [["Climb the ladder", "2 fits both: 6 and 9."], ["Climb again", "3 fits both: 2 and 3."], ["Stop", "Nothing else fits both 2 and 3."], ["GCF: the left side", "2 × 3 = 6."], ["LCM: the big L", "2 × 3 × 2 × 3 = 36."]],
          answer: "GCF 6, LCM 36"
        },
        {
          problem: "Hot dogs come in packs of 8. Buns come in packs of 12. What is the fewest of each you can buy so they match?", pic: ladder(8, 12),
          steps: [["Spot the clue", "Matching totals means a number both fit into: the LCM."], ["Climb the ladder", "2 fits both: 4 and 6. 2 again: 2 and 3."], ["The big L", "2 × 2 × 2 × 3 = 24."], ["Count the packs", "24 ÷ 8 = 3 packs of hot dogs. 24 ÷ 12 = 2 packs of buns."]],
          answer: "24 of each: 3 packs of hot dogs and 2 packs of buns"
        }
      ]
    },
    {
      id: "ratio", name: "Ratios and unit rates", phrase: "Find the rate for one, and then you’re done.",
      also: "Divide to get the amount for 1. Multiply to get any amount.",
      steps: ["Write what you know: 12 dollars for 4 pens.", "Divide to get the rate for one: 12 ÷ 4 = 3 dollars per pen.", "Multiply by how many you want."],
      exception: "Keep the order the question uses: 3 cats to 5 dogs is 3 : 5, not 5 : 3. Don’t add the difference: if 2 pens cost $6, 4 pens cost $12, not $8. For the better buy, compare the price for one, not the total.",
      pic: () => P.table(["Pens", "Cost"], [["4", "$12"], ["1", "$3"], ["7", "$21"]], { hot: [[1, 1]], note: "÷ 4 to find one pen, then × 7." }),
      gen() {
        const item = pick(["pens", "apples", "stickers", "notebooks", "tickets"]);
        const form = R(1, 3);
        const q = R(2, 8), u = R(2, 9);
        if (form === 1) {
          return Q(`${q} ${item} cost $${q * u}. What does 1 cost?`, `$${u}`, [`$${q * u - q}`, `$${q}`, `$${u + 1}`, `$${q * u * q}`],
            `Find the rate for one: $${q * u} ÷ ${q} = $${u}.`);
        }
        if (form === 2) {
          let m;
          do { m = R(2, 12); } while (m === q);
          return Q(`${q} ${item} cost $${q * u}. What do ${m} cost?`, `$${m * u}`, [`$${q * u + m - q}`, `$${q * u * m}`, `$${(m + 1) * u}`, `$${u}`],
            `Rate for one: $${q * u} ÷ ${q} = $${u}. Then ${m} × $${u} = $${m * u}.`);
        }
        let r, b;
        do { r = R(2, 7); b = R(2, 7); } while (r === b || gcd(r, b) !== 1);
        const k = R(2, 6);
        return Q(`Red to blue is ${r} : ${b}. There are ${b * k} blue. How many red?`, r * k, [b * k - (b - r), b * k, r * b * k, r + k],
          `${b * k} ÷ ${b} = ${k} groups. Each group has ${r} red, so ${k} × ${r} = ${r * k}.`);
      },
      worked: [
        {
          problem: "6 notebooks cost $18. What do 10 notebooks cost?",
          steps: [["Find the rate for one", "$18 ÷ 6 = $3 each."], ["Then you’re done", "10 × $3 = $30."]],
          answer: "$30"
        },
        {
          problem: "Which is the better buy: 3 juice boxes for $2.40, or 5 for $3.50?",
          steps: [["Rate for one, first deal", "$2.40 ÷ 3 = $0.80 each."], ["Rate for one, second deal", "$3.50 ÷ 5 = $0.70 each."], ["Compare", "$0.70 is less for each box."]],
          answer: "5 for $3.50 is the better buy"
        },
        {
          problem: "A recipe uses 2 cups of rice for every 3 cups of water. How much water goes with 8 cups of rice?",
          steps: [["Keep the order", "rice : water = 2 : 3."], ["Find the rate for one", "1 cup of rice needs 3 ÷ 2 = 1.5 cups of water."], ["Then you’re done", "8 × 1.5 = 12 cups."]],
          answer: "12 cups of water"
        }
      ]
    },
    {
      id: "mmmr", name: "Mean, median, mode, range", phrase: "Hey diddle diddle, the median’s the middle; you add and divide for the mean. The mode is the one you see the most, and the range is the difference between.",
      steps: ["Mean: add them all, then divide by how many there are.", "Median: put them in order and find the middle.", "Mode: the number you see most often.", "Range: biggest minus smallest."],
      exception: "Sort the numbers before you find the median. With an even count, the median is halfway between the two middle numbers. A list can have no mode, or more than one.",
      pic: () => P.table(["Word", "What to do"], [["Mean", "add, then divide"], ["Median", "sort, take the middle"], ["Mode", "the one you see most"], ["Range", "biggest − smallest"]]),
      gen() {
        const kind = pick(["mean", "median", "mode", "range"]);
        if (kind === "mean") {
          let list;
          do { list = Array.from({ length: 5 }, () => R(2, 20)); } while (sum(list) % 5);
          const s = sum(list), ans = s / 5, so = sorted(list);
          return Q(`Find the mean of ${list.join(", ")}.`, ans, [s, so[2], ans + 1, so[4] - so[0]],
            `You add and divide for the mean: ${list.join(" + ")} = ${s}, and ${s} ÷ 5 = ${ans}.`);
        }
        if (kind === "median") {
          const n = pick([5, 7]), mid = (n - 1) / 2;
          let list;
          do { list = Array.from({ length: n }, () => R(1, 30)); } while (list[mid] === sorted(list)[mid]);
          const so = sorted(list), ans = so[mid];
          return Q(`Find the median of ${list.join(", ")}.`, ans, [list[mid], so[mid + 1], Math.round(sum(list) / n), so[n - 1] - so[0]],
            `The median’s the middle, but sort first: ${so.join(", ")}. The middle one is ${ans}.`);
        }
        if (kind === "mode") {
          const m = R(2, 15), times = pick([2, 3]);
          const others = new Set();
          while (others.size < 6 - times) {
            const v = R(1, 20);
            if (v !== m) others.add(v);
          }
          const list = shuffle([...Array(times).fill(m), ...others]);
          const so = sorted(list);
          return Q(`Find the mode of ${list.join(", ")}.`, m, [times, so[5], so[5] - so[0], so[0]],
            `The mode is the one you see the most: ${m} shows up ${times} times.`);
        }
        const list = Array.from({ length: R(5, 6) }, () => R(1, 40));
        const so = sorted(list), ans = so[so.length - 1] - so[0];
        return Q(`Find the range of ${list.join(", ")}.`, ans, [so[so.length - 1], so[so.length - 1] + so[0], so[so.length - 1] - so[1], so[0]],
          `The range is the difference between the biggest and smallest: ${so[so.length - 1]} − ${so[0]} = ${ans}.`);
      },
      worked: [
        {
          problem: "Test scores: 7, 9, 6, 9, 4. Find the mean, median, mode, and range.",
          steps: [["Mean: add and divide", "7 + 9 + 6 + 9 + 4 = 35. 35 ÷ 5 = 7."], ["Median: the middle (sort first)", "4, 6, 7, 9, 9. The middle one is 7."], ["Mode: the one you see most", "9 shows up twice."], ["Range: the difference between", "9 − 4 = 5."]],
          answer: "Mean 7, median 7, mode 9, range 5"
        },
        {
          problem: "Find the median of 3, 12, 5, 8.",
          steps: [["Sort first", "3, 5, 8, 12."], ["Find the middle", "There are 4 numbers, so there are two middle ones: 5 and 8."], ["Halfway between", "(5 + 8) ÷ 2 = 6.5."]],
          answer: "6.5"
        }
      ]
    },
    {
      id: "expo", name: "Exponents", phrase: "The power tells how many times the base shows up.",
      also: "In 2⁴, 2 is the base and 4 is the power: 2 × 2 × 2 × 2.",
      steps: ["The big number is the base.", "The small raised number is the power.", "Write the base that many times, with × between, and multiply."],
      exception: "It is not base × power: 2³ is 2 × 2 × 2 = 8, not 6. Any number to the power 1 is itself, and any number (except 0) to the power 0 is 1.",
      pic: () => P.roof("2⁴", "2 × 2 × 2 × 2 = 16", "base 2, power 4: the 2 shows up four times"),
      gen() {
        const b = R(2, 10);
        const maxP = b <= 3 ? 5 : b <= 5 ? 4 : b === 10 ? 5 : 3;
        let p = R(2, maxP);
        if (Math.random() < 0.25) {
          return Q(`Write ${Array(p).fill(b).join(" × ")} as a power.`, `${b}${sup(p)}`, [`${p}${sup(b)}`, `${b * p}`, `${b}${sup(p + 1)}`],
            `${b} shows up ${p} times, so the base is ${b} and the power is ${p}: ${b}${sup(p)}.`);
        }
        if (Math.random() < 0.12) p = pick([0, 1]);
        const ans = b ** p;
        const why = p === 0 ? `Any number (except 0) to the power 0 is 1.` : p === 1 ? `Power 1 means ${b} shows up once: just ${b}.`
          : `${b}${sup(p)} = ${Array(p).fill(b).join(" × ")} = ${big(ans)}. Not ${b} × ${p}.`;
        return Q(`${b}${sup(p)}`, big(ans), [big(b * p), big(p ** b), big(b ** (p + 1)), p > 0 ? big(b ** (p - 1)) : null, b * 10 + p], why);
      },
      worked: [
        {
          problem: "Work out 3⁴.",
          steps: [["Read the power", "The power 4 says 3 shows up four times."], ["Write it out", "3 × 3 × 3 × 3."], ["Multiply", "3 × 3 = 9, and 9 × 9 = 81."]],
          answer: "81"
        },
        {
          problem: "Which is bigger, 2⁵ or 5²?",
          steps: [["2⁵: five 2s", "2 × 2 × 2 × 2 × 2 = 32."], ["5²: two 5s", "5 × 5 = 25."], ["Compare", "32 is bigger than 25."]],
          answer: "2⁵ is bigger"
        },
        {
          problem: "A cell splits into 2 every hour. You start with 1 cell. How many cells are there after 6 hours?",
          steps: [["Spot the repeat", "Each hour is × 2, six times."], ["Write the power", "The base is 2, and it shows up 6 times: 2⁶."], ["Multiply", "2, 4, 8, 16, 32, 64."]],
          answer: "2⁶ = 64 cells"
        }
      ]
    },
    {
      id: "triarea", name: "Area of triangles and parallelograms", phrase: "A triangle is half the box: base × height ÷ 2.",
      also: "A parallelogram is a box with a slant: base × height, no halving.",
      steps: ["Find the base.", "Find the height: the straight-up line that makes a right angle with the base.", "Triangle: base × height ÷ 2.", "Parallelogram: base × height."],
      exception: "Use the straight-up height, not the slanted side. Only the triangle gets halved: a parallelogram is a whole box.",
      pic: () => slantPic("tri", "base", "height", "slant"),
      gen() {
        const tri = Math.random() < 0.6;
        let b, h;
        do { b = R(4, 14); h = R(3, 12); } while (tri && (b * h) % 2);
        const s = h + R(1, 3);
        if (tri) {
          return Q(`A triangle has base ${b}, height ${h}, and a slanted side of ${s}. Find its area.`, (b * h) / 2, [b * h, (b * s) / 2, b + h + s, b * s],
            `Half the box: ${b} × ${h} = ${b * h}, then ÷ 2 = ${(b * h) / 2}. The slanted ${s} is not the height.`, slantPic("tri", b, h, s));
        }
        return Q(`A parallelogram has base ${b}, height ${h}, and a slanted side of ${s}. Find its area.`, b * h, [b * s, (b * h) / 2, 2 * (b + s), b + h],
          `Base × height, no halving: ${b} × ${h} = ${b * h}. Use the straight-up ${h}, not the slanted ${s}.`, slantPic("para", b, h, s));
      },
      worked: [
        {
          problem: "A triangle has base 10 cm and height 7 cm. Find its area.", pic: slantPic("tri", "10", "7", ""),
          steps: [["Draw the box", "10 × 7 = 70."], ["Half the box", "70 ÷ 2 = 35."]],
          answer: "35 cm²"
        },
        {
          problem: "A parallelogram has base 12, a slanted side of 6, and height 5. Find its area.", pic: slantPic("para", "12", "5", "6"),
          steps: [["Pick the straight-up height", "The height is 5, not the slanted 6."], ["Base × height", "12 × 5 = 60."], ["No halving", "A parallelogram is a whole box, so it stays 60."]],
          answer: "60 square units"
        },
        {
          problem: "A sail is a triangle 4 m wide at the bottom and 9 m tall. Cloth costs $5 per square meter. How much does the cloth cost?",
          steps: [["Draw the box", "4 × 9 = 36."], ["Half the box", "36 ÷ 2 = 18 m²."], ["Find the cost", "18 × $5 = $90."]],
          answer: "$90"
        }
      ]
    },
    {
      id: "volume", name: "Volume of a box", phrase: "Cover the floor, then stack the floors: length × width × height.",
      steps: ["Floor: length × width tells how many cubes cover the bottom.", "Stack: multiply by the height (how many floors).", "Volume is in cubic units, like cm³."],
      exception: "Don’t add the three sides: a 2 by 3 by 4 box holds 24 cubes, not 9. Volume (what fits inside) is not surface area (the wrapping paper).",
      pic: () => boxPic("length", "width", "height"),
      gen() {
        const l = R(2, 9), w = R(2, 6), h = R(2, 5), V = l * w * h;
        if (Math.random() < 0.65) {
          return Q(`A box is ${l} by ${w} by ${h}. Find its volume.`, V, [l + w + h, l * w, 2 * (l * w + l * h + w * h), V + l * w],
            `Cover the floor: ${l} × ${w} = ${l * w} cubes. Stack ${h} floors: ${l * w} × ${h} = ${V}.`, boxPic(l, w, h));
        }
        return Q(`A box has volume ${V}. Its floor is ${l} by ${w}. How tall is it?`, h, [V - l * w, l * w, V - l - w, h + 1],
          `The floor holds ${l} × ${w} = ${l * w} cubes. ${V} ÷ ${l * w} = ${h} floors.`, boxPic(l, w, "?"));
      },
      worked: [
        {
          problem: "A fish tank is 5 by 3 by 4. Find its volume.", pic: boxPic(5, 3, 4),
          steps: [["Cover the floor", "5 × 3 = 15 cubes."], ["Stack the floors", "4 floors: 15 × 4 = 60."]],
          answer: "60 cubic units"
        },
        {
          problem: "A sandbox is 6 ft long and 4 ft wide. You fill it 2 ft deep. Sand comes in bags of 8 cubic feet. How many bags do you need?",
          steps: [["Cover the floor", "6 × 4 = 24 square feet."], ["Stack the floors", "24 × 2 = 48 cubic feet."], ["Count the bags", "48 ÷ 8 = 6."]],
          answer: "6 bags"
        }
      ]
    },
    {
      id: "coords", name: "The coordinate plane", phrase: "Along the corridor, up the stairs.",
      also: "(x, y): x comes first, like in the alphabet.",
      steps: ["Start at (0, 0), where the two lines meet.", "First number: walk along the bottom (x).", "Second number: go up (y)."],
      exception: "Order matters: (2, 5) and (5, 2) are different points. You always walk along before you go up. Negative numbers mean go left or go down.",
      pic: () => plane([{ x: 3, y: 4 }], { walk: [3, 4] }),
      gen() {
        let x, y;
        do { x = R(0, 6); y = R(0, 6); } while (x === y);
        const pt = (a, b) => `(${a}, ${b})`;
        if (Math.random() < 0.6) {
          return Q("What are the coordinates of the dot?", pt(x, y), [pt(y, x), pt(x, y === 6 ? y - 1 : y + 1), pt(x === 0 ? 1 : x - 1, y)],
            `Along the corridor ${x}, then up the stairs ${y}: ${pt(x, y)}.`, plane([{ x, y }]));
        }
        const pts = [[x, y], [y, x]];
        while (pts.length < 4) {
          const p = [R(0, 6), R(0, 6)];
          if (!pts.some((q) => q[0] === p[0] && q[1] === p[1])) pts.push(p);
        }
        const order = shuffle(pts);
        const names = ["A", "B", "C", "D"];
        const ans = names[order.findIndex((p) => p[0] === x && p[1] === y)];
        return Q(`Which point is at ${pt(x, y)}?`, ans, names.filter((n) => n !== ans),
          `Along the corridor ${x}, then up the stairs ${y}. That is point ${ans}.`, plane(order.map((p, i) => ({ x: p[0], y: p[1], label: names[i] }))));
      },
      worked: [
        {
          problem: "Plot the point (4, 2).", pic: plane([{ x: 4, y: 2 }], { walk: [4, 2] }),
          steps: [["Start at (0, 0)", "The corner where the two lines meet."], ["Along the corridor", "Walk 4 along the bottom."], ["Up the stairs", "Climb 2 up, and put the dot there."]],
          answer: "The dot is 4 along and 2 up."
        },
        {
          problem: "A rectangle has corners at (1, 1), (5, 1), (5, 4), and (1, 4). How long and how tall is it?",
          pic: plane([{ x: 1, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 4 }, { x: 1, y: 4 }], { shape: [[1, 1], [5, 1], [5, 4], [1, 4]] }),
          steps: [["Along the corridor", "Along goes from 1 to 5: 5 − 1 = 4."], ["Up the stairs", "Up goes from 1 to 4: 4 − 1 = 3."], ["Say it", "4 long and 3 tall."]],
          answer: "4 units long, 3 units tall"
        }
      ]
    }
  ]);

  /* ---------- Grade 7 ---------- */

  add("g7", [
    {
      id: "intsub", name: "Subtracting integers", phrase: "Keep, Change, Change.",
      also: "Subtracting a number is the same as adding its opposite.",
      steps: ["Keep the first number.", "Change − to +.", "Change the sign of the second number.", "Add using the adding rules."],
      exception: "Change both things: the sign in the middle and the second number. Never change the first number. Don’t mix it up with “Keep, Change, Flip” for dividing fractions.",
      pic: () => P.chain(["5 − (−3)", "5 + 3", "8"], ["Keep, Change, Change", "add"]),
      gen() {
        let a, b;
        do { a = R(-12, 12); b = R(-12, 12); } while (!a || !b || a === b);
        if (b > 0 && Math.random() < 0.6) b = -b;
        const ans = a - b;
        return Q(`${neg(a)} − ${par(b)}`, neg(ans), [neg(a + b), neg(-ans), neg(-a - b)],
          `Keep ${neg(a)}, change − to +, change ${neg(b)} to ${neg(-b)}: ${neg(a)} + ${par(-b)} = ${neg(ans)}.`);
      },
      worked: [
        {
          problem: "−4 − 6",
          steps: [["Keep", "Keep −4."], ["Change", "− becomes +."], ["Change", "6 becomes −6."], ["Add", "−4 + (−6): same signs, so add and keep the sign: −10."]],
          answer: "−10"
        },
        {
          problem: "7 − (−5)",
          steps: [["Keep", "Keep 7."], ["Change", "− becomes +."], ["Change", "−5 becomes 5."], ["Add", "7 + 5 = 12."]],
          answer: "12"
        },
        {
          problem: "At 6 a.m. it was −3°C. At noon it was 8°C. How many degrees did it warm up?",
          steps: [["Write it", "Noon minus morning: 8 − (−3)."], ["Keep, Change, Change", "8 + 3."], ["Add", "11."]],
          answer: "11 degrees"
        }
      ]
    },
    {
      id: "intdiv", name: "Dividing integers", phrase: "Divide the sizes. Same signs, positive. Different signs, negative.",
      also: "It is the same sign rule as for ×.",
      steps: ["Ignore the signs and divide.", "Same signs: the answer is positive.", "Different signs: the answer is negative."],
      exception: "You can never divide by 0. 0 divided by any other number is 0, with no sign. Two negatives make a positive only for × and ÷, not for + or −.",
      pic: () => P.table(["÷", "+", "−"], [["+", "+", "−"], ["−", "−", "+"]], { hot: [[0, 1], [1, 2]], note: "Same signs give +. Different signs give −." }),
      gen() {
        const b = R(2, 12) * pick([1, -1]), q = R(2, 12) * pick([1, -1]), a = b * q;
        const sq = Math.sign(q);
        return Q(`${neg(a)} ÷ ${par(b)}`, neg(q), [neg(-q), neg(q + sq), neg(-q - sq)],
          `Divide the sizes: ${Math.abs(a)} ÷ ${Math.abs(b)} = ${Math.abs(q)}. ${(a < 0) === (b < 0) ? "Same signs, so positive" : "Different signs, so negative"}: ${neg(q)}.`);
      },
      worked: [
        {
          problem: "−42 ÷ 6",
          steps: [["Divide the sizes", "42 ÷ 6 = 7."], ["Check the signs", "− and +: different signs, so negative."]],
          answer: "−7"
        },
        {
          problem: "−56 ÷ (−8)",
          steps: [["Divide the sizes", "56 ÷ 8 = 7."], ["Check the signs", "− and −: same signs, so positive."]],
          answer: "7"
        },
        {
          problem: "A diver goes down 45 m in 9 equal moves. What is the change in depth for each move?",
          steps: [["Write it", "Down is negative: −45 ÷ 9."], ["Divide the sizes", "45 ÷ 9 = 5."], ["Check the signs", "Different signs, so negative: −5."]],
          answer: "−5 m each move (5 m down)"
        }
      ]
    },
    {
      id: "equations", name: "Solving equations", phrase: "Do the opposite to both sides.",
      also: "Undo in reverse order: + and − first, then × and ÷.",
      steps: ["See what is being done to x.", "Undo the + or − first: do the opposite to both sides.", "Then undo the × or ÷ the same way.", "Check: put your answer back in."],
      exception: "Whatever you do to one side, do to the other, or the two sides stop being equal. Undo the + or − before the ×: in 3x + 4 = 19, don’t divide 19 by 3 first.",
      pic: () => P.chain(["3x + 5 = 17", "3x = 12", "x = 4"], ["− 5 both sides", "÷ 3 both sides"]),
      gen() {
        const x = R(-6, 12) || 3;
        if (Math.random() < 0.65) {
          const a = R(2, 9), b = R(1, 15), plus = Math.random() < 0.5;
          const c = plus ? a * x + b : a * x - b;
          const undo = plus ? c - b : c + b;
          const wrongOp = plus ? c + b : c - b;
          const wrongs = [];
          if (wrongOp % a === 0) wrongs.push(wrongOp / a);
          if (c % a === 0) wrongs.push(plus ? c / a - b : c / a + b);
          wrongs.push(undo, -x, x + 1);
          return Q(`Solve ${a}x ${plus ? "+" : "−"} ${b} = ${neg(c)}`, neg(x), wrongs.map(neg),
            `Undo the ${plus ? "+" : "−"} ${b} first: ${plus ? "subtract" : "add"} ${b} on both sides, so ${a}x = ${neg(undo)}. Then undo × ${a}: ${neg(undo)} ÷ ${a} = ${neg(x)}.`);
        }
        const k = R(2, 9);
        const form = R(1, 4);
        if (form === 1) {
          const c = x + k;
          return Q(`Solve x + ${k} = ${neg(c)}`, neg(x), [neg(c + k), neg(-x), neg(c)], `Do the opposite of + ${k}: subtract ${k} from both sides. x = ${neg(c)} − ${k} = ${neg(x)}.`);
        }
        if (form === 2) {
          const c = x - k;
          return Q(`Solve x − ${k} = ${neg(c)}`, neg(x), [neg(c - k), neg(-x), neg(c)], `Do the opposite of − ${k}: add ${k} to both sides. x = ${neg(c)} + ${k} = ${neg(x)}.`);
        }
        if (form === 3) {
          const c = k * x;
          return Q(`Solve ${k}x = ${neg(c)}`, neg(x), [neg(c - k), neg(c * k), neg(-x)], `Do the opposite of × ${k}: divide both sides by ${k}. x = ${neg(c)} ÷ ${k} = ${neg(x)}.`);
        }
        const c = R(-6, 9) || 2, xx = c * k;
        return Q(`Solve x ÷ ${k} = ${neg(c)}`, neg(xx), [neg(c + k), neg(c - k), neg(-xx)], `Do the opposite of ÷ ${k}: multiply both sides by ${k}. x = ${neg(c)} × ${k} = ${neg(xx)}.`);
      },
      worked: [
        {
          problem: "Solve x + 9 = 4.",
          steps: [["See what is done to x", "9 is added."], ["Do the opposite to both sides", "Subtract 9: x = 4 − 9."], ["Work it out", "x = −5."]],
          answer: "x = −5"
        },
        {
          problem: "Solve 3x + 5 = 26.",
          steps: [["Undo in reverse order", "The + 5 comes off first, then the × 3."], ["Opposite of + 5", "Subtract 5 from both sides: 3x = 21."], ["Opposite of × 3", "Divide both sides by 3: x = 7."], ["Check", "3 × 7 + 5 = 26. It works."]],
          answer: "x = 7"
        },
        {
          problem: "A gym costs $20 to join, plus $15 a month. Maya has paid $110 in all. How many months has she paid for?",
          steps: [["Write the equation", "15m + 20 = 110."], ["Opposite of + 20", "Subtract 20 from both sides: 15m = 90."], ["Opposite of × 15", "Divide both sides by 15: m = 6."], ["Check", "15 × 6 + 20 = 110. It works."]],
          answer: "6 months"
        }
      ]
    },
    {
      id: "circle", name: "Circumference and area of a circle", phrase: "Cherry pie’s delicious: C = πd. Apple pies are too: A = πr².",
      also: "The diameter goes all the way across. The radius goes halfway: d = 2 × r.",
      steps: ["Find the radius r or the diameter d. d = 2 × r.", "Around the edge (circumference): C = π × d.", "Inside (area): A = π × r × r.", "Use π ≈ 3.14."],
      exception: "Area uses the radius, not the diameter. If you are given d, halve it first. r² means r × r, not r × 2.",
      pic: () => circlePic({ r: "r", d: "d" }),
      gen() {
        const r = R(1, 10), d = 2 * r;
        const giveD = Math.random() < 0.5;
        const C = dp(314 * d, 2), A = dp(314 * r * r, 2);
        const given = giveD ? `diameter ${d}` : `radius ${r}`;
        const pic = circlePic(giveD ? { d: `d = ${d}` } : { r: `r = ${r}` });
        if (Math.random() < 0.5) {
          return Q(`A circle has ${given}. Find its circumference. Use π ≈ 3.14.`, C, [dp(314 * r, 2), A, dp(314 * 2 * d, 2)],
            `Cherry pie’s delicious: C = πd.${giveD ? "" : ` d = 2 × ${r} = ${d}.`} 3.14 × ${d} = ${C}.`, pic);
        }
        return Q(`A circle has ${given}. Find its area. Use π ≈ 3.14.`, A, [dp(314 * d * d, 2), C, dp(314 * r, 2), String(r * r)],
          `Apple pies are too: A = πr².${giveD ? ` r = ${d} ÷ 2 = ${r}.` : ""} 3.14 × ${r} × ${r} = ${A}.`, pic);
      },
      worked: [
        {
          problem: "A wheel has a diameter of 50 cm. How far does it roll in one full turn?", pic: circlePic({ d: "d = 50" }),
          steps: [["One turn = the distance around", "So you need the circumference."], ["Cherry pie’s delicious: C = πd", "3.14 × 50 = 157."]],
          answer: "157 cm"
        },
        {
          problem: "A round rug has a diameter of 6 m. Find its area.",
          steps: [["Apple pie needs r", "r = 6 ÷ 2 = 3 m."], ["A = πr²", "3.14 × 3 × 3 = 3.14 × 9."], ["Multiply", "28.26."]],
          answer: "28.26 m²"
        },
        {
          problem: "Which is more pizza: one 12-inch pizza, or two 8-inch pizzas? (The inches are the diameter.)",
          steps: [["Find each radius", "12-inch: r = 6. 8-inch: r = 4."], ["Apple pie for the big one", "3.14 × 6 × 6 = 113.04."], ["Apple pie for a small one", "3.14 × 4 × 4 = 50.24."], ["Two small ones", "2 × 50.24 = 100.48."], ["Compare", "113.04 is more than 100.48."]],
          answer: "One 12-inch pizza is more"
        }
      ]
    },
    {
      id: "interest", name: "Simple interest", phrase: "I = PRT: Interest = Principal × Rate × Time.",
      also: "Principal is the money you start with. Rate is the percent per year. Time is in years.",
      steps: ["Write the rate as a decimal: 5% = 0.05.", "Write the time in years: 6 months = 0.5.", "Multiply P × R × T.", "For the total, add the interest to the principal."],
      exception: "Use the rate as a decimal, not the whole number: 5% is 0.05, not 5. Simple interest is the same every year. It does not grow on itself (that is compound interest).",
      pic: () => P.table(["Letter", "Means", "Example"], [["P", "money at the start", "$500"], ["R", "rate per year", "4% = 0.04"], ["T", "years", "3"], ["I", "interest", "$60"]], { hot: [[3, 2]], note: "500 × 0.04 × 3 = 60" }),
      gen() {
        const p = pick([100, 200, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000, 2500, 5000]);
        const rate = pick([2, 3, 4, 5, 6, 8, 10]);
        const t = R(1, 6);
        const I = (p * rate * t) / 100;
        const yrs = `${t} year${t > 1 ? "s" : ""}`;
        const why = `I = PRT = ${big(p)} × ${dp(rate, 2)} × ${t} = ${big(I)}.`;
        if (Math.random() < 0.6) {
          return Q(`$${big(p)} earns ${rate}% simple interest for ${yrs}. How much interest is that?`, money(I * 100),
            [money(p * rate * t * 100), money(p * rate), money(p * rate * t * 10), money((p + I) * 100)], why);
        }
        return Q(`$${big(p)} earns ${rate}% simple interest for ${yrs}. What is the total at the end?`, money((p + I) * 100),
          [money(I * 100), money((p + (p * rate) / 100) * 100), money((p + p * rate * t) * 100), money((p + I * 10) * 100)], `${why} Total: ${big(p)} + ${big(I)} = ${big(p + I)}.`);
      },
      worked: [
        {
          problem: "$400 earns 5% simple interest for 3 years. How much interest is that?",
          steps: [["Rate as a decimal", "5% = 0.05."], ["I = PRT", "400 × 0.05 × 3."], ["Multiply", "400 × 0.05 = 20, and 20 × 3 = 60."]],
          answer: "$60"
        },
        {
          problem: "Ana borrows $1,200 at 6% simple interest for 18 months. How much does she pay back in all?",
          steps: [["Time in years", "18 months = 1.5 years."], ["Rate as a decimal", "6% = 0.06."], ["I = PRT", "1,200 × 0.06 × 1.5 = 72 × 1.5 = 108."], ["Add it on", "1,200 + 108 = 1,308."]],
          answer: "$1,308"
        }
      ]
    },
    {
      id: "pchange", name: "Percent increase and decrease", phrase: "New minus old, over old, times 100.",
      steps: ["Find the change: new − old.", "Divide by the old (starting) number.", "Multiply by 100 to get a percent. Positive is an increase, negative is a decrease."],
      exception: "Always divide by the old number, not the new one. Up 50% then down 50% does not bring you back: 100 → 150 → 75.",
      pic: () => P.formula("new − old", "old", "× 100 = percent change"),
      gen() {
        const up = Math.random() < 0.5;
        const p = pick(up ? [10, 20, 25, 50, 75, 100] : [10, 20, 25, 40, 50, 75]);
        let old;
        do { old = pick([20, 40, 50, 60, 80, 120, 200, 240, 400]); } while ((old * p) % 100);
        const diff = (old * p) / 100, nw = up ? old + diff : old - diff;
        const pc = (x) => `${Number(x.toFixed(1))}%`;
        return Q(`A price goes from $${old} to $${nw}. What is the percent ${up ? "increase" : "decrease"}?`, `${p}%`, [pc((diff / nw) * 100), `${diff}%`, pc((nw / old) * 100)],
          `New minus old: ${nw} − ${old} = ${neg(nw - old)}. Over old: ${diff} ÷ ${old} = ${dp(p, 2)}. Times 100: ${p}% ${up ? "increase" : "decrease"}.`);
      },
      worked: [
        {
          problem: "A game went from $40 to $50. What is the percent increase?",
          steps: [["New minus old", "50 − 40 = 10."], ["Over old", "10 ÷ 40 = 0.25."], ["Times 100", "25%."]],
          answer: "25% increase"
        },
        {
          problem: "A town had 800 people. Now it has 680. What is the percent change?",
          steps: [["New minus old", "680 − 800 = −120."], ["Over old", "−120 ÷ 800 = −0.15."], ["Times 100", "−15%. Negative means a decrease."]],
          answer: "15% decrease"
        },
        {
          problem: "A shirt costs $50. The price goes up 20%, then down 20%. Is it back to $50?",
          steps: [["Up 20%", "20% of 50 is 10, so $60."], ["Down 20% of the new price", "Now the old price is 60. 20% of 60 is 12, so $48."], ["Compare", "$48 is not $50. The second 20% was taken from a bigger number."]],
          answer: "No, it ends at $48"
        }
      ]
    },
    {
      id: "discount", name: "Discount and sales tax", phrase: "Sale? Take it off. Tax? Put it on.",
      also: "20% off means you pay 80%. 5% tax means you pay 105%.",
      steps: ["Find the percent of the price.", "Discount: subtract it from the price.", "Tax: add it to the price.", "Both: take the discount off first, then find the tax on the new price."],
      exception: "Tax goes on the sale price, not the old price. 20% off and then 5% tax is not the same as 15% off.",
      pic: () => P.chain(["$80", "$64", "$67.20"], ["20% off: − $16", "5% tax: + $3.20"]),
      gen() {
        const thing = pick(["jacket", "game", "bike", "lamp", "backpack"]);
        const form = pick(["off", "tax", "both"]);
        let price, off, tax, sale, st;
        do {
          price = pick([20, 24, 30, 40, 45, 50, 60, 80, 120, 150]);
          off = pick([10, 20, 25, 30, 40, 50]);
          tax = pick([5, 8, 10]);
          sale = price * (100 - off);
          st = (sale * tax) / 100;
        } while (st % 1);
        const c = price * 100, dC = price * off, tC = price * tax;
        if (form === "off") {
          return Q(`A $${price} ${thing} is ${off}% off. What is the sale price?`, money(sale), [money(dC), money(c + dC), c > off * 100 ? money(c - off * 100) : null, dC % 10 ? null : money(c - dC / 10)],
            `Sale? Take it off: ${off}% of $${price} is ${money(dC)}. ${money(c)} − ${money(dC)} = ${money(sale)}.`);
        }
        if (form === "tax") {
          return Q(`A $${price} ${thing} has ${tax}% sales tax. What is the total?`, money(c + tC), [money(tC), money(c - tC), money(c + tax * 100)],
            `Tax? Put it on: ${tax}% of $${price} is ${money(tC)}. ${money(c)} + ${money(tC)} = ${money(c + tC)}.`);
        }
        return Q(`A $${price} ${thing} is ${off}% off, then ${tax}% tax is added. What do you pay?`, money(sale + st),
          [money(sale + tC), money(sale - st), money((price * (100 - off + tax))), money(sale)],
          `Take it off first: ${money(c)} − ${money(dC)} = ${money(sale)}. Then put the tax on that: ${tax}% of ${money(sale)} is ${money(st)}, so ${money(sale + st)}.`);
      },
      worked: [
        {
          problem: "Shoes cost $60 and are 25% off. What is the sale price?",
          steps: [["Find the percent", "25% of 60 = 0.25 × 60 = 15."], ["Sale? Take it off", "60 − 15 = 45."], ["Check with the shortcut", "25% off means you pay 75%: 0.75 × 60 = 45."]],
          answer: "$45"
        },
        {
          problem: "A $40 game is 10% off. Then 8% tax is added. What is the total?",
          steps: [["Sale? Take it off", "10% of 40 is 4, so $36."], ["Tax? Put it on the new price", "8% of 36 = 0.08 × 36 = 2.88."], ["Add", "36 + 2.88 = 38.88."]],
          answer: "$38.88"
        }
      ]
    },
    {
      id: "prob", name: "Probability", phrase: "What you want, over all you’ve got.",
      also: "P(event) = favorable outcomes ÷ total outcomes.",
      steps: ["Count the outcomes you want (favorable).", "Count all the possible outcomes.", "Write want ÷ total, then simplify."],
      exception: "The total includes the ones you want. With 3 red and 5 blue, P(red) is 3/8, not 3/5. A probability is always from 0 (impossible) to 1 (certain).",
      pic: () => marbles([[3, "red"], [5, "blue"]]),
      gen() {
        if (Math.random() < 0.6) {
          const names = ["red", "blue", "green"];
          const counts = names.map(() => R(1, 6));
          const i = R(0, 2), want = counts[i], tot = sum(counts);
          return Q(`A bag has ${counts[0]} red, ${counts[1]} blue, and ${counts[2]} green marbles. You pick one without looking. What is P(${names[i]})?`, fr(want, tot),
            [fr(want, tot - want), fr(tot - want, tot), raw(1, 3), fr(want + 1, tot)],
            `What you want: ${want} ${names[i]}. All you’ve got: ${tot}. P = ${raw(want, tot)}${fr(want, tot) !== raw(want, tot) ? ` = ${fr(want, tot)}` : ""}.`,
            marbles(names.map((n, k) => [counts[k], n])));
        }
        const [name, list] = pick([
          ["an even number", [2, 4, 6]], ["an odd number", [1, 3, 5]], ["a number greater than 4", [5, 6]], ["a number less than 3", [1, 2]],
          ["a 6", [6]], ["a prime number", [2, 3, 5]], ["a multiple of 3", [3, 6]], ["a number greater than 1", [2, 3, 4, 5, 6]]
        ]);
        const f = list.length;
        return Q(`You roll a number cube (1 to 6). What is P(${name})?`, fr(f, 6), [fr(f, 6 - f), fr(6 - f, 6), raw(1, 6), fr(f + 1, 6)],
          `What you want: ${list.join(", ")}, which is ${f}. All you’ve got: 6. P = ${raw(f, 6)}${fr(f, 6) !== raw(f, 6) ? ` = ${fr(f, 6)}` : ""}.`);
      },
      worked: [
        {
          problem: "A bag has 3 red and 5 blue marbles. You pick one without looking. What is P(red)?", pic: marbles([[3, "red"], [5, "blue"]]),
          steps: [["What you want", "3 red."], ["All you’ve got", "3 + 5 = 8 marbles."], ["Want over all", "3/8."]],
          answer: "3/8"
        },
        {
          problem: "You pick one letter at random from the word MISSISSIPPI. What is P(S)?",
          steps: [["What you want", "S shows up 4 times."], ["All you’ve got", "MISSISSIPPI has 11 letters."], ["Want over all", "4/11."]],
          answer: "4/11"
        },
        {
          problem: "In a class of 30, 12 kids walk to school. One kid is picked at random. What is the chance they do not walk?",
          steps: [["What you want", "Kids who don’t walk: 30 − 12 = 18."], ["All you’ve got", "30 kids."], ["Want over all, then simplify", "18/30 = 3/5."]],
          answer: "3/5"
        }
      ]
    },
    {
      id: "proportion", name: "Proportions", phrase: "Cross multiply: the butterfly method.",
      also: "Multiply across each diagonal. The two wings are equal. Then divide by the number next to x.",
      steps: ["Set up two equal fractions, with the same order on both sides.", "Multiply across the diagonals: the butterfly wings.", "Set the wings equal and divide to find x."],
      exception: "Only cross multiply when two fractions are equal. Never do it to add fractions. Keep the order the same: miles over hours = miles over hours.",
      pic: () => butterfly(3, 5, "x", 20),
      gen() {
        let a, b;
        do { a = R(2, 9); b = R(2, 9); } while (a === b);
        const m = R(2, 6), c = a * m, d = b * m;
        if (Math.random() < 0.35) {
          const extra = [b + c - a, (a * c) % b ? null : (a * c) / b, b * c, d + b];
          return Q(`On a map, ${a} cm stands for ${b} km. How many km is ${c} cm?`, d, extra,
            `Butterfly: ${a}/${b} = ${c}/x, so ${a}x = ${b} × ${c} = ${b * c}. x = ${b * c} ÷ ${a} = ${d}.`, butterfly(a, b, c, "x"));
        }
        const vals = [a, b, c, d];
        const h = R(0, 3);
        const show = vals.map((v, i) => (i === h ? "x" : v));
        const ans = vals[h];
        const partner = vals[3 - h];
        const prod = h === 0 || h === 3 ? b * c : a * d;
        const pairs = [[[b, d, c], [c, d, b]], [[a, c, d], [c, d, a]], [[b, d, a], [a, b, d]], [[a, c, b], [a, b, c]]][h];
        const wrongs = pairs.map(([p, q, r]) => ((p * q) % r ? null : (p * q) / r));
        const additive = [c - (d - b), d - (c - a), a + (d - b), b + (c - a)][h];
        wrongs.push(additive > 0 ? additive : null, ans * 2, ans + 1);
        return Q(`Solve ${show[0]}/${show[1]} = ${show[2]}/${show[3]}`, ans, wrongs,
          `Butterfly: ${show[0]} × ${show[3]} = ${show[1]} × ${show[2]}. That gives ${partner}x = ${prod}, so x = ${prod} ÷ ${partner} = ${ans}.`, butterfly(...show));
      },
      worked: [
        {
          problem: "Solve 3/5 = x/20.", pic: butterfly(3, 5, "x", 20),
          steps: [["Draw the butterfly", "Multiply across: 3 × 20 and 5 × x."], ["Set the wings equal", "5x = 60."], ["Divide by the number next to x", "x = 60 ÷ 5 = 12."]],
          answer: "x = 12"
        },
        {
          problem: "4 movie tickets cost $26. How much do 10 tickets cost?",
          steps: [["Same order on both sides", "tickets over dollars: 4/26 = 10/x."], ["Draw the butterfly", "4 × x = 26 × 10, so 4x = 260."], ["Divide by the number next to x", "x = 260 ÷ 4 = 65."]],
          answer: "$65"
        }
      ]
    }
  ]);
})();
