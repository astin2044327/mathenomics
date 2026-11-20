import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

describe("lesson generators", () => {
  it("tools/check.js reports zero problems", () => {
    const r = spawnSync(process.execPath, ["tools/check.js"], {
      cwd: root,
      encoding: "utf8"
    });
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/0 problems/);
  });
});
