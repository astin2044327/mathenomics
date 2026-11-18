/** Hand-drawn style diagrams. Each returns an SVG or HTML string. */
(function () {
  const INK = "#1F1D1A";
  const GATOR = "#4C9A52";

  const box = (w, h, body, label) =>
    `<svg class="pic" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label || "diagram"}">${body}</svg>`;

  const T = (x, y, s, o = {}) =>
    `<text x="${x}" y="${y}" font-size="${o.size || 15}" text-anchor="${o.anchor || "middle"}" font-weight="${o.weight || 650}" fill="${o.fill || INK}">${s}</text>`;

  const line = (x1, y1, x2, y2, o = {}) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.stroke || INK}" stroke-width="${o.w || 2.5}" stroke-linecap="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;

  const poly = (pts, o = {}) =>
    `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${o.fill || "var(--paper2)"}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;

  const circle = (cx, cy, r, o = {}) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill || "none"}" stroke="${o.stroke || INK}" stroke-width="${o.w || 2.5}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}/>`;

  const dot = (p, label, dx = 0, dy = -10) =>
    `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="${INK}"/>` + (label ? T(p[0] + dx, p[1] + dy, label, { size: 13, weight: 600 }) : "");

  function unit(a, b) {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const l = Math.hypot(dx, dy) || 1;
    return [dx / l, dy / l];
  }

  function arc(V, P, Q, r, label, o = {}) {
    const u = unit(V, P);
    const v = unit(V, Q);
    const s = [V[0] + u[0] * r, V[1] + u[1] * r];
    const e = [V[0] + v[0] * r, V[1] + v[1] * r];
    const cross = u[0] * v[1] - u[1] * v[0];
    const bis = [u[0] + v[0], u[1] + v[1]];
    const bl = Math.hypot(bis[0], bis[1]) || 1;
    const lr = r + (o.gap || 17);
    const lx = V[0] + (bis[0] / bl) * lr;
    const ly = V[1] + (bis[1] / bl) * lr + 5;
    const path = `<path d="M${s[0]} ${s[1]} A${r} ${r} 0 0 ${cross > 0 ? 1 : 0} ${e[0]} ${e[1]}" fill="none" stroke="${o.stroke || "var(--accent)"}" stroke-width="2.5"/>`;
    return path + (label ? T(lx, ly, label, { size: o.size || 14, fill: o.fill }) : "");
  }

  function right(V, P, Q, s = 14) {
    const u = unit(V, P);
    const v = unit(V, Q);
    const a = [V[0] + u[0] * s, V[1] + u[1] * s];
    const b = [a[0] + v[0] * s, a[1] + v[1] * s];
    const c = [V[0] + v[0] * s, V[1] + v[1] * s];
    return `<path d="M${a} L${b} L${c}" fill="none" stroke="${INK}" stroke-width="2"/>`;
  }

  function ticks(A, B, n) {
    const m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const u = unit(A, B);
    const p = [-u[1], u[0]];
    let s = "";
    for (let k = 0; k < n; k += 1) {
      const off = (k - (n - 1) / 2) * 6;
      const c = [m[0] + u[0] * off, m[1] + u[1] * off];
      s += line(c[0] - p[0] * 7, c[1] - p[1] * 7, c[0] + p[0] * 7, c[1] + p[1] * 7, { w: 2.2 });
    }
    return s;
  }

  function side(A, B, inside, text, o = {}) {
    const m = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const u = unit(A, B);
    let p = [-u[1], u[0]];
    if (p[0] * (inside[0] - m[0]) + p[1] * (inside[1] - m[1]) > 0) p = [-p[0], -p[1]];
    const d = o.d || 18;
    return T(m[0] + p[0] * d, m[1] + p[1] * d + 5, text, { size: o.size || 15, fill: o.fill });
  }

  const P = {};

  P.gator = (a, b, o = {}) => {
    const la = o.maskSides ? "?" : a;
    const lb = o.maskSides ? "?" : b;
    let body = T(62, 94, la, { size: 56, weight: 700 }) + T(258, 94, lb, { size: 56, weight: 700 });
    if (o.hide) {
      body += `<rect x="128" y="44" width="64" height="64" rx="14" fill="var(--paper2)" stroke="${INK}" stroke-width="2.5" stroke-dasharray="6 5"/>` + T(160, 90, "?", { size: 34 });
      return box(320, 150, body, `Compare ${a} and ${b}`);
    }
    if (a === b) {
      body += `<rect x="126" y="58" width="68" height="12" rx="6" fill="${GATOR}"/><rect x="126" y="84" width="68" height="12" rx="6" fill="${GATOR}"/>`;
    } else {
      const vx = a > b ? 196 : 124;
      const ox = a > b ? 128 : 192;
      const top = [ox, 40];
      const bot = [ox, 112];
      const v = [vx, 76];
      body += `<path d="M${top} L${v} L${bot}" fill="none" stroke="${GATOR}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>`;
      for (let k = 1; k <= 3; k += 1) {
        const t = k / 4;
        const p1 = [top[0] + (v[0] - top[0]) * t, top[1] + (v[1] - top[1]) * t];
        const p2 = [bot[0] + (v[0] - bot[0]) * t, bot[1] + (v[1] - bot[1]) * t];
        body += `<path d="M${p1[0] - 4} ${p1[1] + 7} l4 8 l4 -8z" fill="#fff"/><path d="M${p2[0] - 4} ${p2[1] - 7} l4 -8 l4 8z" fill="#fff"/>`;
      }
      const ex = v[0] + (top[0] - v[0]) * 0.38;
      const ey = v[1] + (top[1] - v[1]) * 0.38 - 13;
      body += `<circle cx="${ex}" cy="${ey}" r="7" fill="#fff" stroke="${INK}" stroke-width="2"/><circle cx="${ex}" cy="${ey}" r="3" fill="${INK}"/>`;
    }
    body += T(160, 142, a === b ? "Same size, so it is =" : "The open mouth eats the bigger number", { size: 13, weight: 500 });
    return box(320, 150, body, `Alligator comparing ${a} and ${b}`);
  };

  P.tenFrame = (k, o = {}) => {
    let body = "";
    for (let i = 0; i < 10; i += 1) {
      const x = 60 + (i % 5) * 40;
      const y = 22 + Math.floor(i / 5) * 40;
      body += `<rect x="${x}" y="${y}" width="40" height="40" fill="var(--paper2)" stroke="${INK}" stroke-width="2"/>`;
      body += i < k
        ? `<circle cx="${x + 20}" cy="${y + 20}" r="13" fill="var(--accent)"/>`
        : `<circle cx="${x + 20}" cy="${y + 20}" r="12" fill="none" stroke="${INK}" stroke-width="1.6" stroke-dasharray="4 4"/>`;
    }
    if (!o.hideCaption) body += T(160, 128, `${k} filled · ${10 - k} empty`, { size: 14, weight: 500 });
    return box(320, 140, body, `Ten frame with ${k} filled`);
  };

  P.numberLine = (from, to, start, hops, o = {}) => {
    const hideTick = new Set((o.hideTicks || []).map((v) => String(v)));
    const hideHops = !!o.hideHops;
    const labelStep = o.labelEvery || 1;
    const x = (v) => 24 + ((v - from) * 272) / (to - from);
    let body = line(16, 96, 304, 96);
    for (let v = from; v <= to; v += 1) {
      body += line(x(v), 90, x(v), 102, { w: 2 });
      const showLabel = (v - from) % labelStep === 0 || v === start;
      if (showLabel) {
        const lab = hideTick.has(String(v)) ? "?" : v < 0 ? `−${-v}` : v;
        body += T(x(v), 122, lab, { size: 12, weight: 500 });
      }
    }
    let cur = start;
    hops.forEach((h) => {
      const a = x(cur);
      const b = x(cur + h);
      const lift = Math.min(60, 26 + Math.abs(b - a) * 0.25);
      body += `<path d="M${a} 90 Q${(a + b) / 2} ${90 - lift} ${b} 90" fill="none" stroke="var(--accent)" stroke-width="2.5"/>`;
      if (!hideHops) {
        body += T((a + b) / 2, 86 - lift * 0.55, h > 0 ? `+${h}` : `−${-h}`, { size: 12, fill: "var(--accent)" });
      }
      cur += h;
    });
    body += `<circle cx="${x(start)}" cy="96" r="6" fill="${INK}"/>`;
    if (hops.length) {
      body += `<circle cx="${x(cur)}" cy="96" r="5" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="4 3"/>`;
    }
    return box(320, 136, body, "Number line");
  };

  P.placeValue = (n, hideValue) => {
    const h = Math.floor(n / 100);
    const t = Math.floor(n / 10) % 10;
    const o = n % 10;
    let body = T(64, 22, "Hundreds", { size: 13 }) + T(184, 22, "Tens", { size: 13 }) + T(272, 22, "Ones", { size: 13 });
    for (let i = 0; i < h; i += 1) {
      const x = 14 + (i % 3) * 34;
      const y = 34 + Math.floor(i / 3) * 34;
      body += `<rect x="${x}" y="${y}" width="30" height="30" fill="var(--accent)" stroke="${INK}" stroke-width="1.5" opacity="0.9"/>`;
      body += `<path d="M${x + 10} ${y} v30 M${x + 20} ${y} v30 M${x} ${y + 10} h30 M${x} ${y + 20} h30" stroke="${INK}" stroke-width="0.6" opacity="0.5"/>`;
    }
    for (let i = 0; i < t; i += 1) {
      body += `<rect x="${136 + i * 10.5}" y="36" width="8" height="64" fill="var(--accent)" stroke="${INK}" stroke-width="1.2"/>`;
    }
    for (let i = 0; i < o; i += 1) {
      body += `<rect x="${246 + (i % 3) * 18}" y="${38 + Math.floor(i / 3) * 18}" width="13" height="13" fill="var(--accent)" stroke="${INK}" stroke-width="1.2"/>`;
    }
    if (!hideValue) {
      body += T(64, 150, h, { size: 30, weight: 700 }) + T(184, 150, t, { size: 30, weight: 700 }) + T(272, 150, o, { size: 30, weight: 700 });
    }
    body += line(124, 14, 124, 160, { w: 1.5, dash: "4 5" }) + line(232, 14, 232, 160, { w: 1.5, dash: "4 5" });
    return box(320, 164, body, `Place value blocks for ${n}`);
  };

  P.groups = (g, n) => {
    const cols = Math.min(g, 4);
    const rows = Math.ceil(g / cols);
    const cell = 320 / cols;
    const H = rows * 88 + 30;
    let body = "";
    for (let i = 0; i < g; i += 1) {
      const cx = cell * (i % cols) + cell / 2;
      const cy = 48 + Math.floor(i / cols) * 88;
      body += circle(cx, cy, 37, { fill: "var(--paper2)", w: 2 });
      const per = Math.ceil(Math.sqrt(n));
      const rr = Math.ceil(n / per);
      for (let j = 0; j < n; j += 1) {
        const dx = ((j % per) - (per - 1) / 2) * 14;
        const dy = (Math.floor(j / per) - (rr - 1) / 2) * 14;
        body += `<circle cx="${cx + dx}" cy="${cy + dy}" r="5" fill="var(--accent)"/>`;
      }
    }
    body += T(160, H - 6, `${g} groups of ${n}`, { size: 14, weight: 500 });
    return box(320, H, body, `${g} groups of ${n}`);
  };

  P.fingers = (n, o = {}) => {
    let body = "";
    for (let i = 0; i < 10; i += 1) {
      const x = 22 + i * 27 + (i >= 5 ? 14 : 0);
      const folded = i === n - 1;
      const h = folded ? 26 : 74;
      body += `<rect x="${x}" y="${112 - h}" width="20" height="${h}" rx="10" fill="${folded ? "var(--accent)" : "var(--paper2)"}" stroke="${INK}" stroke-width="2"/>`;
      if (!o.hideLabels) body += T(x + 10, 132, i + 1, { size: 11, weight: 500 });
    }
    if (n >= 1 && n <= 10 && !o.hideLabels) {
      body += T(82, 162, `${n - 1} tens`, { size: 16 }) + T(244, 162, `${10 - n} ones`, { size: 16 });
    }
    return box(320, 172, body, `Fingers for 9 times ${n}`);
  };

  P.fractionBars = (rows) => {
    let body = "";
    rows.forEach((r, i) => {
      const y = 16 + i * 46;
      body += T(32, y + 21, `${r.n}/${r.d}`, { size: 17, weight: 700 });
      const w = 226 / r.d;
      for (let k = 0; k < r.d; k += 1) {
        body += `<rect x="${72 + k * w}" y="${y}" width="${w}" height="28" fill="${k < r.n ? "var(--accent)" : "var(--paper2)"}" stroke="${INK}" stroke-width="2"/>`;
      }
    });
    return box(320, rows.length * 46 + 14, body, "Fraction bars");
  };

  P.grid100 = (p) => {
    let body = "";
    for (let i = 0; i < 100; i += 1) {
      const x = 60 + (i % 10) * 20;
      const y = 8 + Math.floor(i / 10) * 20;
      body += `<rect x="${x}" y="${y}" width="20" height="20" fill="${i < p ? "var(--accent)" : "var(--paper2)"}" stroke="${INK}" stroke-width="0.8"/>`;
    }
    body += T(160, 232, `${p} out of 100 squares`, { size: 13, weight: 500 });
    return box(320, 240, body, `${p} percent`);
  };

  P.tri = (a, b, c) => {
    const A = [40, 190], B = [290, 190], C = [130, 40];
    return box(320, 214, poly([A, B, C]) + arc(A, B, C, 26, a) + arc(B, A, C, 26, b) + arc(C, A, B, 22, c, { gap: 18 }), "Triangle");
  };

  P.exterior = (a, b, ext) => {
    const A = [36, 182], B = [206, 182], C = [104, 50], D = [306, 182];
    return box(320, 206,
      line(B[0], B[1], D[0], D[1]) + poly([A, B, C]) +
      arc(A, B, C, 26, a) + arc(C, A, B, 22, b) + arc(B, D, C, 24, ext, { stroke: "var(--ink-hot)" }),
      "Triangle with exterior angle");
  };

  P.iso = (top, left, rightL) => {
    const A = [60, 192], B = [260, 192], C = [160, 36];
    return box(320, 214, poly([A, B, C]) + ticks(A, C, 1) + ticks(B, C, 1) + arc(A, B, C, 26, left) + arc(B, A, C, 26, rightL) + arc(C, A, B, 24, top), "Isosceles triangle");
  };

  P.rightTri = (o = {}) => {
    const A = [60, 188], B = [282, 188], C = [60, 44];
    const inside = [130, 150];
    let body = poly([A, B, C]) + right(A, B, C);
    if (o.theta) body += arc(B, A, C, 34, o.theta);
    if (o.opp) body += side(A, C, inside, o.opp);
    if (o.adj) body += side(A, B, inside, o.adj);
    if (o.hyp) body += side(B, C, inside, o.hyp);
    return box(320, 214, body, "Right triangle");
  };

  P.parallel = (kind, known, ask) => {
    const top = [141.6, 70], bot = [198.4, 160];
    const spot = {
      ur: [26, -12], lr: [28, 24], ul: [-28, -12], ll: [-26, 24]
    };
    const place = { F: ["lr", "lr"], Z: ["lr", "ul"], C: ["lr", "ur"] }[kind];
    let body = line(16, 70, 304, 70) + line(16, 160, 304, 160) + line(110, 20, 230, 210, { stroke: "var(--accent)" });
    body += `<path d="M268 64 l8 6 l-8 6 M276 64 l8 6 l-8 6 M268 154 l8 6 l-8 6 M276 154 l8 6 l-8 6" fill="none" stroke="${INK}" stroke-width="2"/>`;
    const a = spot[place[0]], b = spot[place[1]];
    body += T(top[0] + a[0], top[1] + a[1], known, { size: 15 }) + T(bot[0] + b[0], bot[1] + b[1], ask, { size: 15, fill: "var(--ink-hot)" });
    body += T(40, 205, `${kind} shape`, { size: 13, anchor: "start", weight: 600 });
    return box(320, 216, body, "Parallel lines cut by a transversal");
  };

  P.congruence = (type) => {
    let body = "";
    const marks = {
      SSS: { s: [["A", "B", 1], ["B", "C", 2], ["C", "A", 3]], a: [] },
      SAS: { s: [["A", "B", 1], ["C", "A", 2]], a: ["A"] },
      ASA: { s: [["A", "B", 1]], a: ["A", "B"] },
      RHS: { s: [["B", "C", 1], ["A", "B", 2]], a: [], r: true },
      SSA: { s: [["A", "B", 1], ["B", "C", 2]], a: ["A"] },
      AAA: { s: [], a: ["A", "B", "C"] }
    }[type];
    [0, 160].forEach((dx) => {
      const A = [26 + dx, 172], B = [138 + dx, 172], C = marks.r ? [26 + dx, 58] : [66 + dx, 56];
      const pts = { A, B, C };
      const nb = { A: [B, C], B: [A, C], C: [A, B] };
      body += poly([A, B, C]);
      marks.s.forEach(([p, q, n]) => { body += ticks(pts[p], pts[q], n); });
      marks.a.forEach((v) => { body += arc(pts[v], nb[v][0], nb[v][1], 18, ""); });
      if (marks.r) body += right(A, B, C);
    });
    return box(320, 190, body, `${type} marks on two triangles`);
  };

  P.quad = (labels) => {
    const pts = [[46, 180], [276, 192], [246, 46], [96, 66]];
    let body = poly(pts);
    pts.forEach((p, i) => {
      body += arc(p, pts[(i + 3) % 4], pts[(i + 1) % 4], 24, labels[i]);
    });
    return box(320, 214, body, "Quadrilateral");
  };

  P.similar = (small, big) => {
    const s = [[24, 170], [104, 170], [44, 116]];
    const k = 1.9;
    const b = s.map(([x, y]) => [150 + (x - 24) * k, 170 - (170 - y) * k]);
    return box(320, 196,
      poly(s) + poly(b) + side(s[0], s[1], [60, 140], small) + side(b[0], b[1], [220, 120], big) +
      arc(s[0], s[1], s[2], 14, "") + arc(b[0], b[1], b[2], 22, "") + arc(s[1], s[0], s[2], 14, "") + arc(b[1], b[0], b[2], 22, ""),
      "Similar triangles");
  };

  P.bpt = (ad, db, ae, ec) => {
    const A = [170, 24], B = [40, 204], C = [300, 204];
    const t = typeof ad === "number" && typeof db === "number" ? ad / (ad + db) : 0.42;
    const D = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
    const E = [A[0] + (C[0] - A[0]) * t, A[1] + (C[1] - A[1]) * t];
    const inside = [170, 150];
    return box(320, 222,
      poly([A, B, C]) + line(D[0], D[1], E[0], E[1], { stroke: "var(--accent)", w: 3 }) +
      side(A, D, inside, ad, { size: 14 }) + side(D, B, inside, db, { size: 14 }) + side(A, E, inside, ae, { size: 14 }) + side(E, C, inside, ec, { size: 14, fill: "var(--ink-hot)" }) +
      dot(D, "") + dot(E, ""),
      "Triangle cut by a line parallel to its base");
  };

  P.midseg = (base, mid) => {
    const A = [160, 24], B = [36, 200], C = [292, 200];
    const D = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], E = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
    const inside = [160, 140];
    return box(320, 226,
      poly([A, B, C]) + line(D[0], D[1], E[0], E[1], { stroke: "var(--accent)", w: 3 }) +
      ticks(A, D, 1) + ticks(D, B, 1) + ticks(A, E, 2) + ticks(E, C, 2) +
      side(B, C, inside, base) + T(160, D[1] - 8, mid, { size: 15, fill: "var(--ink-hot)" }) + dot(D, "") + dot(E, ""),
      "Midsegment of a triangle");
  };

  P.semicircle = (la, lb) => {
    const O = [160, 122], A = [65, 122], B = [255, 122], Pt = [105.5, 44.2];
    return box(320, 230,
      circle(O[0], O[1], 95) + poly([A, B, Pt], { fill: "none" }) + right(Pt, A, B) + dot(O, "O", 0, 20) +
      arc(A, B, Pt, 26, la) + arc(B, A, Pt, 30, lb),
      "Triangle standing on a diameter");
  };

  P.tangent = (lp, lo) => {
    const O = [118, 132], Tt = [118, 62], Pp = [292, 62];
    return box(320, 214,
      circle(O[0], O[1], 70) + line(30, 62, 306, 62) + line(O[0], O[1], Tt[0], Tt[1]) + line(O[0], O[1], Pp[0], Pp[1], { stroke: "var(--accent)" }) +
      right(Tt, O, Pp) + dot(O, "O", -14, 6) + dot(Tt, "T", 0, -10) + dot(Pp, "P", 0, -10) +
      arc(Pp, Tt, O, 34, lp) + arc(O, Tt, Pp, 26, lo),
      "Tangent and radius");
  };

  P.central = (lp, lo) => {
    const O = [160, 115], A = [86.4, 157.5], B = [233.6, 157.5], Pt = [160, 30];
    return box(320, 214,
      circle(O[0], O[1], 85) + line(O[0], O[1], A[0], A[1], { stroke: "var(--accent)" }) + line(O[0], O[1], B[0], B[1], { stroke: "var(--accent)" }) +
      line(Pt[0], Pt[1], A[0], A[1]) + line(Pt[0], Pt[1], B[0], B[1]) + dot(O, "") + dot(A, "") + dot(B, "") + dot(Pt, "") +
      arc(Pt, A, B, 30, lp, { gap: 16 }) + arc(O, A, B, 22, lo, { gap: 14 }),
      "Central and inscribed angle on the same arc");
  };

  P.cyclic = (l1, l3) => {
    const pts = [[77.3, 84.9], [227.4, 58.4], [236.2, 159], [116, 191.2]];
    return box(320, 214,
      circle(160, 115, 88) + poly(pts, { fill: "none" }) +
      arc(pts[0], pts[3], pts[1], 24, l1) + arc(pts[2], pts[1], pts[3], 24, l3, { fill: "var(--ink-hot)" }),
      "Cyclic quadrilateral");
  };

  P.chord = (lr, ld, lh) => {
    const O = [160, 98], A = [85.2, 148], B = [234.8, 148], M = [160, 148];
    return box(320, 206,
      circle(O[0], O[1], 90) + line(A[0], A[1], B[0], B[1], { w: 3 }) + line(O[0], O[1], M[0], M[1], { dash: "5 5" }) +
      line(O[0], O[1], B[0], B[1], { stroke: "var(--accent)" }) + right(M, O, B) + dot(O, "O", -12, 4) +
      T(206, 116, lr, { size: 14, fill: "var(--accent)" }) + T(146, 130, ld, { size: 14 }) + T(198, 170, lh, { size: 14, fill: "var(--ink-hot)" }),
      "Chord bisected by a line from the center");
  };

  P.parabola = (r1, r2) => {
    const sx = 17;
    const X = (v) => 160 + v * sx;
    const half = Math.abs(r2 - r1) / 2;
    const sy = 76 / Math.max(1, half * half);
    const Y = (v) => 118 - (v - r1) * (v - r2) * sy;
    let d = "";
    for (let i = 0; i <= 80; i += 1) {
      const v = -8.5 + (i * 17) / 80;
      const y = Y(v);
      if (y < 6 || y > 206) continue;
      d += (d ? " L" : "M") + `${X(v).toFixed(1)} ${y.toFixed(1)}`;
    }
    let body = line(10, 118, 310, 118, { w: 1.6 }) + line(160, 6, 160, 206, { w: 1.6 });
    body += `<path d="${d}" fill="none" stroke="var(--accent)" stroke-width="3"/>`;
    body += `<circle cx="${X(r1)}" cy="118" r="5" fill="var(--ink-hot)"/><circle cx="${X(r2)}" cy="118" r="5" fill="var(--ink-hot)"/>`;
    return box(320, 212, body, "Parabola crossing the x-axis twice");
  };

  P.quadrant = (q) => {
    const cells = [
      { q: 1, x: 166, y: 14, word: "All", note: "all positive" },
      { q: 2, x: 14, y: 14, word: "Sugar", note: "sin positive" },
      { q: 3, x: 14, y: 116, word: "To", note: "tan positive" },
      { q: 4, x: 166, y: 116, word: "Coffee", note: "cos positive" }
    ];
    let body = "";
    cells.forEach((c) => {
      body += `<rect x="${c.x}" y="${c.y}" width="140" height="94" rx="10" fill="${c.q === q ? "var(--accent-soft)" : "transparent"}"/>`;
      body += T(c.x + 70, c.y + 44, c.word, { size: 22, weight: 700 }) + T(c.x + 70, c.y + 68, c.note, { size: 12, weight: 500 });
    });
    body += line(10, 112, 310, 112, { w: 2 }) + line(160, 8, 160, 216, { w: 2 });
    body += T(296, 30, "I", { size: 13 }) + T(26, 30, "II", { size: 13 }) + T(26, 204, "III", { size: 13 }) + T(296, 204, "IV", { size: 13 });
    return box(320, 222, body, "Add Sugar To Coffee quadrant signs");
  };

  P.hand = (angle) => {
    const labels = [0, 30, 45, 60, 90];
    let body = "";
    labels.forEach((a, i) => {
      const x = 46 + i * 52;
      const hot = a === angle;
      body += `<rect x="${x}" y="${30 + Math.abs(2 - i) * 10}" width="34" height="${110 - Math.abs(2 - i) * 10}" rx="17" fill="${hot ? "var(--accent)" : "var(--paper2)"}" stroke="${INK}" stroke-width="2"/>`;
      body += T(x + 17, 164, `${a}°`, { size: 13 });
    });
    body += `<rect x="36" y="128" width="268" height="24" rx="12" fill="var(--paper2)" stroke="${INK}" stroke-width="2"/>`;
    body += T(160, 192, "sin = √(fingers before) ÷ 2   ·   cos = √(fingers after) ÷ 2", { size: 11.5, weight: 600 });
    return box(320, 204, body, "Hand trick for special angles");
  };

  P.chain = (items, labels) =>
    `<div class="chain">${items.map((it, i) => `<b>${it}</b>${i < items.length - 1 ? `<i>${labels[i] || "→"}</i>` : ""}`).join("")}</div>`;

  P.elevens = (n, show) => {
    const a = Math.floor(n / 10);
    const b = n % 10;
    return `<div class="eleven"><b>${a}</b><span>${show ? a + b : `${a} + ${b}`}</span><b>${b}</b></div><p class="pic-note">Split ${n}. The sum of the digits parks in the middle.</p>`;
  };

  P.longDiv = (N, d) =>
    `<div class="ld"><div class="ld-sum"><span>${d}</span><span class="ld-bar">${N}</span></div>
     <ol class="family">
       <li><em>👨</em><b>D</b>Dad · Divide</li>
       <li><em>👩</em><b>M</b>Mom · Multiply</li>
       <li><em>👧</em><b>S</b>Sister · Subtract</li>
       <li><em>👦</em><b>B</b>Brother · Bring down</li>
       <li><em>🐶</em><b>R</b>Rover · Repeat</li>
     </ol></div>`;

  P.pemdas = () =>
    `<ol class="ladder">
       <li><b>P</b><span>Please</span><em>( ) brackets first</em></li>
       <li><b>E</b><span>Excuse</span><em>powers, like 3²</em></li>
       <li class="tie"><b>M D</b><span>My Dear</span><em>× and ÷, left to right</em></li>
       <li class="tie"><b>A S</b><span>Aunt Sally</span><em>+ and −, left to right</em></li>
     </ol>`;

  P.signs = () =>
    `<table class="signs"><tbody>
       <tr><td>+ × +</td><td>=</td><td>+</td><td>friends</td></tr>
       <tr><td>− × −</td><td>=</td><td>+</td><td>friends</td></tr>
       <tr><td>+ × −</td><td>=</td><td>−</td><td>strangers</td></tr>
       <tr><td>− × +</td><td>=</td><td>−</td><td>strangers</td></tr>
     </tbody></table>`;

  P.colAdd = (a, b, show) => {
    const at = Math.floor(a / 10), ao = a % 10, bt = Math.floor(b / 10), bo = b % 10;
    const carry = ao + bo >= 10;
    const s = a + b;
    return `<div class="col">
      <span></span><span class="carry">${carry && show ? "1" : ""}</span><span></span>
      <span></span><span>${at}</span><span>${ao}</span>
      <span>+</span><span>${bt}</span><span>${bo}</span>
      <span class="rule"></span><span class="rule"></span><span class="rule"></span>
      <span></span><span>${show ? Math.floor(s / 10) : "?"}</span><span>${show ? s % 10 : "?"}</span>
    </div>`;
  };

  P.colSub = (a, b, show) => {
    const at = Math.floor(a / 10), ao = a % 10, bt = Math.floor(b / 10), bo = b % 10;
    const borrow = ao < bo;
    const s = a - b;
    const tens = borrow && show ? `<s>${at}</s><small>${at - 1}</small>` : at;
    const ones = borrow && show ? `<small>1</small>${ao}` : ao;
    return `<div class="col">
      <span></span><span>${tens}</span><span>${ones}</span>
      <span>−</span><span>${bt}</span><span>${bo}</span>
      <span class="rule"></span><span class="rule"></span><span class="rule"></span>
      <span></span><span>${show ? Math.floor(s / 10) || "" : "?"}</span><span>${show ? s % 10 : "?"}</span>
    </div>`;
  };

  P.formula = (top, bottom, note) =>
    `<div class="formula"><div class="frac-big"><span>${top}</span><span>${bottom}</span></div>${note ? `<p class="pic-note">${note}</p>` : ""}</div>`;

  P.roof = (before, after, note) =>
    `<div class="formula"><p class="roof">${before} <i>→</i> ${after}</p>${note ? `<p class="pic-note">${note}</p>` : ""}</div>`;

  /** A small table. head: header cells; rows: arrays of cells; hot: [row, col] cells to highlight. */
  P.table = (head, rows, o = {}) =>
    `<div class="formula"><table class="pic-table"><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows
      .map((r, i) => `<tr>${r.map((cell, j) => `<${j === 0 ? "th" : "td"}${(o.hot || []).some(([a, b]) => a === i && b === j) ? ' class="hot"' : ""}>${cell}</${j === 0 ? "th" : "td"}>`).join("")}</tr>`)
      .join("")}</tbody></table>${o.note ? `<p class="pic-note">${o.note}</p>` : ""}</div>`;

  /** Drawing helpers for lesson packs that need their own diagrams. */
  P.kit = { INK, box, T, line, poly, circle, dot, unit, arc, right, ticks, side };

  window.PICS = P;
})();
