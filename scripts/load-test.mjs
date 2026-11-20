#!/usr/bin/env node
/**
 * Static-asset load probe (not an app-server stress test).
 * Mathenomics has no API/DB — capacity ≈ CDN/host concurrent GETs.
 *
 * Usage:
 *   npm run test:load
 *   BASE_URL=https://astin2044327.github.io/mathenomics npm run test:load
 */
import autocannon from "autocannon";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = Number(process.env.PORT || 8766);
const external = process.env.BASE_URL;
const base = (external || `http://127.0.0.1:${PORT}`).replace(/\/$/, "");
const connections = Number(process.env.LOAD_CONN || 25);
const duration = Number(process.env.LOAD_DURATION || 8);
const paths = ["/", "/index.html", "/css/app.css", "/js/app.js", "/js/i18n.js", "/sw.js"];

let server;
if (!external) {
  server = spawn("python3", ["-m", "http.server", String(PORT)], {
    cwd: fileURLToPath(new URL("..", import.meta.url)),
    stdio: "ignore"
  });
  await sleep(800);
}

const results = [];
for (const p of paths) {
  const url = `${base}${p}`;
  const result = await new Promise((resolve, reject) => {
    const instance = autocannon({
      url,
      connections,
      duration,
      pipelining: 1,
      timeout: 10
    }, (err, res) => (err ? reject(err) : resolve(res)));
    process.once("SIGINT", () => instance.stop());
  });
  results.push({ path: p, ...summarize(result) });
  console.log(
    `${p.padEnd(16)} req/s=${result.requests.average.toFixed(0)} ` +
    `p99=${result.latency.p99}ms errors=${result.errors + result.timeouts} ` +
    `2xx=${result["2xx"]}`
  );
}

if (server) {
  server.kill("SIGTERM");
}

const worstErrors = Math.max(...results.map((r) => r.errors));
const minRps = Math.min(...results.map((r) => r.rps));
const totalOk = results.reduce((n, r) => n + r.ok, 0);
const totalErr = results.reduce((n, r) => n + r.errors, 0);
console.log("\n--- load summary ---");
console.log(`paths=${results.length} connections=${connections} duration=${duration}s`);
console.log(`min avg req/s=${minRps.toFixed(0)} max errors/timeouts=${worstErrors}`);
console.log(`total 2xx=${totalOk} total errors/timeouts=${totalErr}`);
console.log(
  "Note: for a static PWA, this estimates concurrent file downloads the host can serve, " +
  "not authenticated API users. Real traffic ceiling is CDN/GitHub Pages/Firebase quotas. " +
  "python -m http.server is a weak baseline; prefer BASE_URL against Pages/Firebase for capacity."
);

// Fail only when the host barely answers (local python often drops under burst — that is not a product bug).
const dead = results.filter((r) => r.ok === 0);
if (dead.length || totalOk < connections) {
  console.error("Load test failed: too few successful responses", dead.map((d) => d.path));
  process.exit(1);
}
console.log("Load test passed (static host responding under concurrency).");

function summarize(r) {
  return {
    rps: r.requests.average,
    p99: r.latency.p99,
    errors: r.errors + r.timeouts,
    ok: r["2xx"]
  };
}
