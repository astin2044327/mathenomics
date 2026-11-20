#!/usr/bin/env node
/** Browser-free integration smoke: serves the static app and asserts shell HTML/JS. */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = Number(process.env.PORT || 8799);
const base = `http://127.0.0.1:${PORT}`;
const root = fileURLToPath(new URL("../..", import.meta.url));

const server = spawn("python3", ["-m", "http.server", String(PORT)], {
  cwd: root,
  stdio: "ignore"
});

let failed = 0;
const assert = (cond, msg) => {
  if (!cond) {
    failed += 1;
    console.error("FAIL", msg);
  } else {
    console.log("ok", msg);
  }
};

try {
  await sleep(700);
  const index = await (await fetch(`${base}/`)).text();
  assert(index.includes("Mathenomics"), "index title");
  assert(index.includes("js/safe.js"), "safe.js wired");
  assert(index.includes("js/i18n.js"), "i18n wired");
  assert(index.includes("Content-Security-Policy"), "CSP meta present");

  const app = await (await fetch(`${base}/js/app.js`)).text();
  assert(app.includes("function boom"), "crash UI path");
  assert(app.includes("MATH_SAFE"), "uses MATH_SAFE");

  const sw = await (await fetch(`${base}/sw.js`)).text();
  assert(sw.includes("mathenomics-v27"), "SW cache version");
  assert(sw.includes("method !== \"GET\""), "SW ignores non-GET");

  const safe = await (await fetch(`${base}/js/safe.js`)).text();
  assert(safe.includes("loadSave"), "safe.loadSave exported");
} catch (err) {
  failed += 1;
  console.error("FAIL network", err.message);
} finally {
  server.kill("SIGTERM");
}

if (failed) {
  console.error(`\n${failed} integration assertion(s) failed`);
  process.exit(1);
}
console.log("\nhttp integration smoke passed");
