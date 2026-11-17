// Fuzz every lesson: node tools/check.js [courseId]
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
global.window = {};
const load = ["js/pics.js", "js/courses.js"];
for (const f of fs.readdirSync(path.join(root, "js/more")).sort()) {
  if (f.endsWith(".js")) load.push("js/more/" + f);
}
for (const f of load) {
  if (fs.existsSync(path.join(root, f))) require(path.join(root, f));
}
const only = process.argv[2];
const fail = (where, msg) => { bad += 1; console.log("BAD", where, msg); };
const junk = /NaN|undefined|Infinity|null|\[object/;
let bad = 0, total = 0, lessons = 0;
const ids = new Set();
for (const c of window.COURSES) {
  if (only && c.id !== only) continue;
  for (const l of c.lessons) {
    lessons += 1;
    const where = `${c.id}/${l.id}`;
    if (ids.has(where)) fail(where, "duplicate id");
    ids.add(where);
    for (const k of ["id", "name", "phrase", "exception"]) if (!l[k]) fail(where, `missing ${k}`);
    if (!Array.isArray(l.steps) || !l.steps.length) fail(where, "missing steps");
    try { const p = l.pic(); if (typeof p !== "string" || junk.test(p)) fail(where, "pic output"); } catch (e) { fail(where, `pic ${e.message}`); }
    for (const w of l.worked || []) {
      if (!w.problem || !w.answer || !Array.isArray(w.steps) || !w.steps.length) fail(where, "worked shape");
      for (const s of w.steps || []) if (!Array.isArray(s) || s.length !== 2 || junk.test(s.join(""))) fail(where, `worked step ${JSON.stringify(s)}`);
      if (junk.test(w.problem + w.answer + (w.pic || ""))) fail(where, "worked text");
    }
    for (let i = 0; i < 400; i += 1) {
      total += 1;
      let q;
      try { q = l.gen(); } catch (e) { fail(where, `gen ${e.message}`); break; }
      const s = new Set(q.choices);
      if (q.answer < 0 || q.choices.length < 2 || s.size !== q.choices.length || q.choices.some((x) => junk.test(x)) || junk.test(q.prompt + q.why + q.pic)) {
        fail(where, JSON.stringify(q).slice(0, 300));
        break;
      }
    }
  }
}
console.log(`${lessons} lessons, ${total} questions checked, ${bad} problems`);
process.exit(bad ? 1 : 0);
