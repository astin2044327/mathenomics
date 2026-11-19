#!/usr/bin/env node
/** Bundle docs/i18n/es-*.json into js/i18n/es-pack-a.js */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ids = process.argv.slice(2);
if (!ids.length) {
  console.error("Usage: bundle-i18n-pack.mjs <courseId>...");
  process.exit(1);
}

const lang = process.env.I18N_LANG || "es";
const packName = process.env.I18N_PACK || `${lang}-pack-a`;
const courses = {};
const counts = { courses: 0, lessons: 0, cheatSections: 0, cheatRows: 0, strings: 0 };

function countStrings(v) {
  if (v == null) return;
  if (typeof v === "string") {
    counts.strings++;
    return;
  }
  if (Array.isArray(v)) v.forEach(countStrings);
  else if (typeof v === "object") Object.values(v).forEach(countStrings);
}

for (const id of ids) {
  const path = join(root, "docs/i18n", `${lang}-${id}.json`);
  const data = JSON.parse(readFileSync(path, "utf8"));
  courses[id] = data;
  counts.courses++;
  if (data.lessons) counts.lessons += Object.keys(data.lessons).length;
  if (data.cheat) {
    counts.cheatSections += data.cheat.length;
    for (const sec of data.cheat) {
      if (sec.rows) counts.cheatRows += sec.rows.length;
    }
  }
  countStrings(data);
}

const outDir = join(root, "js/i18n");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, `${packName}.js`);
const body = JSON.stringify(courses, null, 2);
const js = `/* Mathenomics — ${lang} content pack. Generated from docs/i18n/${lang}-{id}.json */
(function () {
  window.I18N_CONTENT = window.I18N_CONTENT || {};
  const root = (window.I18N_CONTENT.${lang} = window.I18N_CONTENT.${lang} || { courses: {} });
  Object.assign(root.courses, ${body});
})();
`;

writeFileSync(outPath, js, "utf8");
console.log(JSON.stringify({ outPath, ...counts }, null, 2));