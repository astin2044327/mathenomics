#!/usr/bin/env node
/**
 * Sample every lesson gen() and flag play-mode answer spoilers in q.pic / q.prompt.
 * Load order matches index.html (pics, courses, js/more/*).
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SCRIPT_ORDER = [
  "js/pics.js",
  "js/courses.js",
  "js/more/arith.js",
  "js/more/geo.js",
  "js/more/trig.js",
  "js/more/tables.js",
  "js/more/expand.js",
  "js/more/hs.js",
  "js/more/pabson.js",
  "js/more/optional.js",
  "js/more/cheats.js",
];

const SAMPLES = 100;
const PRIORITY_COURSES = new Set(["hs", "pabson", "g8", "g9", "g10", "g11", "trig2", "geo"]);

function loadEnv() {
  const ctx = { window: {}, console };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const rel of SCRIPT_ORDER) {
    const file = path.join(ROOT, rel);
    const code = fs.readFileSync(file, "utf8");
    vm.runInContext(code, ctx, { filename: file });
  }
  return ctx.window;
}

function norm(s) {
  return String(s)
    .replace(/\u2212/g, "-")
    .replace(/−/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function tokensFromText(s) {
  const t = norm(s);
  const parts = t.match(/[A-Za-z]+|−?\d+(?:\.\d+)?(?:\/−?\d+)?|\d+°|√\d+(?:\.\d+)?/g) || [];
  return [...new Set(parts.map(norm))];
}

function extractPicLabels(pic) {
  if (!pic) return { svg: [], chain: [], table: [], col: [], note: [], other: [] };
  const html = String(pic);
  const grab = (re) => {
    const out = [];
    let m;
    const rx = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
    while ((m = rx.exec(html))) out.push(norm(m[1]));
    return out;
  };
  return {
    svg: grab(/<text[^>]*>([^<]*)<\/text>/gi),
    chain: grab(/<b>([^<]*)<\/b>/gi),
    table: grab(/<t[hd][^>]*>([^<]*)<\/t[hd]>/gi),
    col: grab(/<span[^>]*>([^<]*)<\/span>/gi),
    note: grab(/class="pic-note"[^>]*>([^<]*)</gi),
    other: grab(/class="formula"[^>]*>[\s\S]*?<span>([^<]*)<\/span>/gi),
  };
}

function allLabels(labels) {
  return [...labels.svg, ...labels.chain, ...labels.table, ...labels.col, ...labels.note, ...labels.other]
    .filter((x) => x && x !== "?" && !/^[\?\.…]+$/.test(x));
}

function isArithmeticOnlyPrompt(prompt) {
  const p = norm(prompt);
  if (/\?/.test(p)) return false;
  return /^[\d\s+\-×*÷/().,−]+$/.test(p.replace(/=/g, ""));
}

function answerInPrompt(prompt, answer) {
  const p = norm(prompt);
  const a = norm(answer);
  if (!a || a === "?") return false;
  if (tokensFromText(p).includes(a)) return true;
  let idx = p.indexOf(a);
  while (idx !== -1) {
    const before = idx === 0 ? "" : p[idx - 1];
    const after = p[idx + a.length] || "";
    const leftOk = !before || !/[0-9°.]/.test(before);
    const rightOk = !after || !/[0-9°.]/.test(after);
    if (leftOk && rightOk) return true;
    idx = p.indexOf(a, idx + 1);
  }
  return false;
}

function promptRevealsAnswer(prompt, answer) {
  const p = norm(prompt);
  const a = norm(answer);
  if (!a || a === "?") return false;
  if (!answerInPrompt(prompt, answer)) return false;
  if (isArithmeticOnlyPrompt(prompt)) return false;
  if (new RegExp(`=\\s*${escapeRe(a)}($|[^0-9/°.])`).test(p)) return true;
  if (new RegExp(`\\b(is|are|was|equals?|makes?)\\s+${escapeRe(a)}\\b`, "i").test(p)) return true;
  // Radicand only: √36 with answer 6 is not a prompt spoiler
  if (/^√\d+$/.test(p) && Number(p.slice(1)) === Number(a) ** 2) return false;
  if (/^√\d+$/.test(p)) return false;
  if (!p.includes("?") && !/\bfind\b|\bwhat\b|\bwhich\b|\bhow\b/i.test(p)) return true;
  return false;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function confidence({ answer, prompt, matchedLabels, allLbls }) {
  const promptNums = tokensFromText(prompt);
  const a = norm(answer);
  const answerInPromptGiven = promptNums.includes(a);
  const nonAnswerLabels = allLbls.filter((l) => l !== a && l !== "?");
  const answerAlsoGiven = nonAnswerLabels.includes(a);
  const promptStatesAnswer = new RegExp(
    `\\b(is|are|was|equals?|one is|angle is|find the (other|missing))?\\s*${escapeRe(a)}`,
    "i",
  ).test(norm(prompt));

  if (matchedLabels.some((l) => l.kind === "svg" || l.kind === "chain")) {
    if (answerInPromptGiven && !promptStatesAnswer && matchedLabels.every((m) => m.kind === "svg")) return "low";
    if (answerInPromptGiven && promptStatesAnswer) return "high";
    if (answerAlsoGiven) return "med";
    return "high";
  }
  if (matchedLabels.some((l) => l.kind === "table" || l.kind === "col")) {
    return answerInPromptGiven ? "low" : "med";
  }
  if (matchedLabels.some((l) => l.kind === "prompt")) {
    return answerInPromptGiven ? "low" : "med";
  }
  return "med";
}

function suggestFix(reason, example) {
  if (/chain/i.test(reason)) return "Omit last chain step or use `?` for unknown result";
  if (/svg|side|tri|parallel/i.test(reason)) return "Use `?` on the unknown side/angle label (P.side / arc labels)";
  if (/colAdd|colSub|col/i.test(reason)) return "Call P.colAdd(a,b) without `true` third arg, or hide answer spans";
  if (/table/i.test(reason)) return "Blank target cell or use `?`";
  if (/prompt/i.test(reason)) return "Rephrase prompt so answer is not stated; keep givens only";
  if (example?.includes("scientific")) return "Show only standard-form number; hide `4.5 × 10⁴` in chain";
  return "Replace answer label with `?` or omit";
}

function analyzeQuestion(c, lesson, q) {
  const answer = q.choices[q.answer];
  if (answer == null) return null;
  const labels = extractPicLabels(q.pic);
  const flat = allLabels(labels);
  const matched = [];
  const a = norm(answer);

  for (const [kind, list] of Object.entries(labels)) {
    for (const lab of list) {
      if (lab === "?" || !lab) continue;
      if (norm(lab) === a) matched.push({ kind, label: lab });
    }
  }

  const promptHit = promptRevealsAnswer(q.prompt, answer);
  if (promptHit) matched.push({ kind: "prompt", label: a });

  if (!matched.length) return null;

  const conf = confidence({ answer, prompt: q.prompt, matchedLabels: matched, allLbls: flat });
  const reasons = [...new Set(matched.map((m) => m.kind))].join("+");
  const spoiledLabel = matched.map((m) => `${m.kind}: ${m.label}`).join("; ");

  return {
    courseId: c.id,
    courseTitle: c.title,
    lessonId: lesson.id,
    lessonName: lesson.name,
    reason: reasons,
    confidence: conf,
    prompt: q.prompt.slice(0, 120),
    answer: a,
    spoiledLabel,
    suggestedFix: suggestFix(reasons, q.prompt),
    priority: PRIORITY_COURSES.has(c.id) ? 1 : 0,
  };
}

function main() {
  const win = loadEnv();
  const COURSES = win.COURSES;
  const byCourse = new Map();
  const uniqueLessons = new Map();

  for (const c of COURSES) {
    let hits = 0;
    let samples = 0;
    for (const lesson of c.lessons) {
      if (typeof lesson.gen !== "function") continue;
      const key = `${c.id}/${lesson.id}`;
      let lessonHits = 0;
      for (let i = 0; i < SAMPLES; i += 1) {
        let q;
        try {
          q = lesson.gen();
        } catch (e) {
          console.error(`gen() failed ${key}:`, e.message);
          break;
        }
        samples += 1;
        const row = analyzeQuestion(c, lesson, q);
        if (row) {
          hits += 1;
          lessonHits += 1;
          if (!uniqueLessons.has(key)) uniqueLessons.set(key, { ...row, hitRate: 0, samples: 0 });
          const u = uniqueLessons.get(key);
          u.samples += 1;
          if (row.confidence === "high") u.high = (u.high || 0) + 1;
          u.hitRate = lessonHits / (i + 1);
          if (!u.examplePic && q.pic) u.examplePic = String(q.pic).slice(0, 200);
        }
      }
    }
    byCourse.set(c.id, { title: c.title, hits, samples, lessons: c.lessons.length });
  }

  const rows = [...uniqueLessons.values()].sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    const score = (r) => (r.confidence === "high" ? 3 : r.confidence === "med" ? 2 : 1) + (r.hitRate || 0);
    return score(b) - score(a) || (b.high || 0) - (a.high || 0);
  });

  const top20 = rows.slice(0, 20);

  const helperSection = `## Pic helpers that echo values into the round diagram

| Helper | Where value appears | Spoiler risk |
|--------|---------------------|--------------|
| \`side()\` / \`arc()\` / \`dot()\` | SVG \`<text>\` on edges and angles | **High** when gen passes the computed answer instead of \`?\` |
| \`P.tri\`, \`P.iso\`, \`P.exterior\`, \`P.parallel\`, \`P.rightTri\`, \`P.similar\`, \`P.bpt\`, etc. | Angle/side labels via \`side\` / \`arc\` | **High** — same as above |
| \`P.chain(items, labels)\` | Each \`items[i]\` in \`<b>\` at top of round-pic | **High** when last item is the answer |
| \`P.table(head, rows)\` | Every cell in the table | **Med–high** when answer cell is filled |
| \`P.colAdd\` / \`P.colSub\` | Result digits in \`<span>\` when 3rd arg \`true\` | **High** in play when gen uses \`show: true\` |
| \`P.gator(a,b)\` without \`hide\` | Mouth direction reveals relation | Mitigated in play via \`hide: true\` in gator gen |
| \`P.formula\` / \`P.roof\` / \`pic-note\` | Caption under diagram | **Med** — still visible before click |
| \`P.elevens(n, show)\` | Middle sum when \`show\` is true | **High** when \`show\` is true in play pic |
| Lesson packs \`P.kit.side/T/arc\` (geo, arith locals) | Same as \`side()\` | **High** |

`;

  let md = `# Play-mode answer spoilers (automated audit)

Generated by \`scripts/audit-answer-spoilers.mjs\` — ${SAMPLES} samples per lesson \`gen()\`.

**Play UI order:** round-pic (\`q.pic\`) → prompt → choices. Verdict (\`q.why\`) only after answer.

## Summary by course

| Course | Title | Spoiler samples | Total samples | Lessons w/ hits |
|--------|-------|-----------------|---------------|-----------------|
`;

  const courseLessonHits = new Map();
  for (const r of rows) {
    courseLessonHits.set(r.courseId, (courseLessonHits.get(r.courseId) || 0) + 1);
  }

  for (const c of COURSES) {
    const stat = byCourse.get(c.id) || { title: c.title, hits: 0, samples: 0 };
    md += `| ${c.id} | ${stat.title} | ${stat.hits} | ${stat.samples} | ${courseLessonHits.get(c.id) || 0} |\n`;
  }

  md += `\n**Totals:** ${rows.length} lessons with ≥1 spoiler in sampling; ${[...byCourse.values()].reduce((s, x) => s + x.hits, 0)} spoiled question samples.\n\n`;

  md += helperSection;

  md += `## Flagged lessons (course | lesson | confidence | reason)

| Course | Lesson | Conf. | Reason | Example prompt | Spoiled label | Suggested fix |
|--------|--------|-------|--------|----------------|---------------|---------------|
`;

  for (const r of rows) {
    const esc = (s) => String(s).replace(/\|/g, "\\|").replace(/\n/g, " ");
    md += `| ${r.courseId} | ${r.lessonId} | ${r.confidence} | ${esc(r.reason)} | ${esc(r.prompt)} | ${esc(r.spoiledLabel)} | ${esc(r.suggestedFix)} |\n`;
  }

  md += `\n## Top 20 worst offenders (priority courses first)\n\n`;
  for (const [i, r] of top20.entries()) {
    md += `${i + 1}. **${r.courseId}/${r.lessonId}** (${r.lessonName}) — **${r.confidence}** — ${r.reason}; e.g. prompt: “${r.prompt}”; label: ${r.spoiledLabel}\n`;
  }

  md += `\n## Notes on false positives\n\n`;
  md += `- **Low confidence:** correct value also appears as a **given** in the prompt (same number used as a side length, etc.).\n`;
  md += `- **Med:** match in table/col/note or duplicate givens in diagram.\n`;
  md += `- **High:** exact answer in SVG text or chain \`<b>\` with no \`?\` placeholder.\n`;
  md += `- Static lesson \`pic:\` on the learn screen is ignored; only \`gen()\` return values are tested.\n`;

  const outPath = path.join(ROOT, "docs/research/ANSWER_SPOILERS.md");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, md);

  console.log(`Wrote ${outPath}`);
  console.log(`Lessons flagged: ${rows.length}`);
  console.log("\nTop 20:");
  for (const [i, r] of top20.entries()) {
    console.log(`${i + 1}. ${r.courseId}/${r.lessonId} [${r.confidence}] ${r.reason}`);
  }
}

main();