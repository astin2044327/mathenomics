// Flag gen() questions whose q.pic contains the exact string of the correct choice.
// Usage: node tools/spoiler-scan.js [hs|pabson|all]
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

const TARGET = (process.argv[2] || "all").toLowerCase();
const courseIds = TARGET === "all" ? ["hs", "pabson"] : [TARGET];

function answerInPic(ans, pic) {
  if (!pic || !ans) return false;
  const a = String(ans).trim();
  if (a.length < 2) return false;
  if (pic.includes(a)) return true;
  const deg = a.endsWith("°") ? a.slice(0, -1) : null;
  if (deg && pic.includes(`${deg}°`)) return true;
  return false;
}

let hits = 0;
for (const c of window.COURSES) {
  if (!courseIds.includes(c.id)) continue;
  for (const l of c.lessons) {
    const seen = new Set();
    for (let i = 0; i < 200; i += 1) {
      let q;
      try {
        q = l.gen();
      } catch (e) {
        console.log("ERR", `${c.id}/${l.id}`, e.message);
        break;
      }
      const ans = q.choices[q.answer];
      if (answerInPic(ans, q.pic)) {
        const key = `${c.id}/${l.id}|${ans}`;
        if (!seen.has(key)) {
          seen.add(key);
          hits += 1;
          console.log("SPOILER", `${c.id}/${l.id}`, "answer in pic:", JSON.stringify(ans).slice(0, 60));
        }
      }
    }
  }
}
console.log(`${hits} potential spoiler(s) in ${courseIds.join(", ")} (200 samples per lesson)`);
process.exit(hits ? 1 : 0);