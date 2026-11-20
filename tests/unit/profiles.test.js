import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

function loadProfiles() {
  const store = {};
  const ctx = {
    window: {},
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); }
    }
  };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, "js/profiles.js"), "utf8"), ctx);
  return { P: ctx.window.MATH_PROFILES, store };
}

describe("MATH_PROFILES", () => {
  it("defaults to us and lists us/np", () => {
    const { P } = loadProfiles();
    expect(P.get().id).toBe("us");
    const ids = P.list().map((p) => p.id);
    expect(ids).toContain("us");
    expect(ids).toContain("np");
  });

  it("persists set(id)", () => {
    const { P, store } = loadProfiles();
    P.set("np");
    expect(P.get().id).toBe("np");
    expect(store["mathenomics-profile"]).toBe("np");
  });

  it("rejects unknown ids", () => {
    const { P } = loadProfiles();
    P.set("nope");
    expect(P.get().id).toBe("us");
  });

  it("locCourse remaps np Class labels", () => {
    const { P } = loadProfiles();
    P.set("np");
    const c = P.locCourse({ id: "g10", grade: "Grade 10", title: "Trig", blurb: "x" });
    expect(c.grade).toMatch(/Class 10/);
  });

  it("lessonVariant applies BODMAS-facing also for np pemdas", () => {
    const { P } = loadProfiles();
    P.set("np");
    const l = P.lessonVariant("g5", "pemdas", {
      id: "pemdas",
      name: "Order of operations",
      phrase: "Please Excuse My Dear Aunt Sally.",
      also: "old"
    });
    expect(l.also).toMatch(/BODMAS/i);
  });

  it("np deemphasizes customary gallon lessons", () => {
    const { P } = loadProfiles();
    P.set("np");
    expect(P.isDeemphasized("gallon5")).toBe(true);
    expect(P.isEmphasized("bodmas")).toBe(true);
  });
});
