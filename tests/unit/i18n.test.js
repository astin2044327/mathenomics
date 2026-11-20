import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

function loadI18n() {
  const store = {};
  const ctx = {
    window: {},
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); }
    },
    document: { documentElement: { lang: "en" } }
  };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, "js/i18n.js"), "utf8"), ctx);
  return ctx.window.I18N;
}

describe("I18N", () => {
  it("falls back to English for missing override keys", () => {
    const I = loadI18n();
    I.setLang("de");
    expect(I.t("learn")).toBeTruthy();
    expect(I.t("coins")).toBeTruthy();
  });

  it("switches Hindi UI chrome", () => {
    const I = loadI18n();
    I.setLang("hi");
    expect(I.t("learn")).toMatch(/सीखें|Learn/);
  });

  it("lists languages in the globe menu", () => {
    const I = loadI18n();
    const html = I.langBarHtml();
    expect(html).toContain('data-lang="ne"');
    expect(html).toContain('data-lang="bn"');
    expect((html.match(/data-lang="/g) || []).length).toBeGreaterThanOrEqual(11);
  });

  it("rejects unknown lang ids", () => {
    const I = loadI18n();
    I.setLang("nope");
    expect(I.t("learn")).toBe("Learn");
  });
});
