import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

function loadSafe() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, "js/safe.js"), "utf8"), ctx);
  return ctx.window.MATH_SAFE;
}

describe("MATH_SAFE", () => {
  const Safe = loadSafe();
  const blank = {
    coins: 0,
    best: {},
    last: null,
    walkFrom: {},
    metrics: { totalMs: 0, gamesPlayed: 0, puzzlesPlayed: 0, roundsPlayed: 0, sessions: 0 }
  };

  it("escapes HTML", () => {
    expect(Safe.esc(`<img src=x onerror=alert(1)>`)).toBe(
      "&lt;img src=x onerror=alert(1)&gt;"
    );
    expect(Safe.esc(`a&b"c'd`)).toContain("&amp;");
  });

  it("survives corrupt localStorage JSON", () => {
    const storage = {
      getItem: () => "{not-json",
      setItem() {}
    };
    const s = Safe.loadSave(storage, "k", blank);
    expect(s.coins).toBe(0);
    expect(s.metrics.gamesPlayed).toBe(0);
  });

  it("rejects array / non-object saves", () => {
    const storage = {
      getItem: () => "[1,2,3]",
      setItem() {}
    };
    const s = Safe.loadSave(storage, "k", blank);
    expect(s.best).toEqual({});
  });

  it("clamps negative metrics and coins", () => {
    const storage = {
      getItem: () => JSON.stringify({ coins: -9, metrics: { gamesPlayed: -3, totalMs: 12 } }),
      setItem() {}
    };
    const s = Safe.loadSave(storage, "k", blank);
    expect(s.coins).toBe(0);
    expect(s.metrics.gamesPlayed).toBe(0);
    expect(s.metrics.totalMs).toBe(12);
  });

  it("writeSave returns false when storage throws", () => {
    const storage = {
      getItem: () => "{}",
      setItem() { throw new Error("quota"); }
    };
    expect(Safe.writeSave(storage, "k", blank)).toBe(false);
  });

  it("keeps a plain srs object and resets corrupt srs", () => {
    const ok = Safe.loadSave({
      getItem: () => JSON.stringify({ srs: { "g3/nines": { nextDue: 1, lastPct: 100 } } }),
      setItem() {}
    }, "k", blank);
    expect(ok.srs["g3/nines"].nextDue).toBe(1);

    const bad = Safe.loadSave({
      getItem: () => JSON.stringify({ srs: ["nope"] }),
      setItem() {}
    }, "k", blank);
    expect(bad.srs).toEqual({});
  });
});
