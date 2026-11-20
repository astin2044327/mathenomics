/** Shared crash-safe helpers (no secrets, no network). */
(function () {
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function clampInt(n, min, max) {
    const v = Math.max(min, Number(n) || 0) | 0;
    return max == null ? v : Math.min(max, v);
  }

  function loadSave(storage, key, blank) {
    let raw;
    try { raw = JSON.parse(storage.getItem(key) || "{}"); }
    catch (_) { return Object.assign({}, blank, { metrics: Object.assign({}, blank.metrics) }); }
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return Object.assign({}, blank, { metrics: Object.assign({}, blank.metrics) });
    }
    const out = Object.assign({}, blank, raw);
    out.coins = clampInt(out.coins, 0);
    out.best = out.best && typeof out.best === "object" && !Array.isArray(out.best) ? out.best : {};
    out.walkFrom = out.walkFrom && typeof out.walkFrom === "object" && !Array.isArray(out.walkFrom) ? out.walkFrom : {};
    out.last = out.last && typeof out.last === "object" ? out.last : null;
    out.srs = out.srs && typeof out.srs === "object" && !Array.isArray(out.srs) ? out.srs : {};
    const m = out.metrics && typeof out.metrics === "object" ? out.metrics : {};
    out.metrics = Object.assign({}, blank.metrics, m);
    Object.keys(blank.metrics).forEach((k) => {
      out.metrics[k] = clampInt(out.metrics[k], 0);
    });
    return out;
  }

  function writeSave(storage, key, data) {
    try {
      storage.setItem(key, JSON.stringify(data));
      return true;
    } catch (_) {
      return false;
    }
  }

  window.MATH_SAFE = { esc, clampInt, loadSave, writeSave };
})();
