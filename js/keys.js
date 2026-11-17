/** Kids keyboard smash — original Mathenomics / Mio playground. */
(function () {
  const ACCENT = "#C84F2E";
  const SHAPES = ["★", "●", "▲", "◆", "■", "✦"];
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const LETTERS_LO = "abcdefghijklmnopqrstuvwxyz".split("");
  const DIGITS = "0123456789".split("");
  const COLORS = [
    "#C84F2E", "#2A7A52", "#2E4057", "#E9A23B", "#2A9D8F",
    "#B83328", "#5C574F", "#6D597A", "#1A1916", "#E4572E"
  ];
  const FW_COLORS = [
    "#C84F2E", "#E9A23B", "#2A9D8F", "#E4572E", "#2E4057",
    "#FF6B4A", "#F4C95F", "#5CC8A0", "#FF8FAB", "#7EB8DA"
  ];
  const FALLBACK_EMOJIS = [
    "🐶", "🐱", "🦁", "🐸", "🦄", "🐝", "🐘", "🦓",
    "🍎", "🍌", "🍓", "🍉", "🍊", "🍇", "🥝", "🍑",
    "🍕", "🍩", "🍦", "🍪", "🌮", "🍔", "🧁", "🥐",
    "🚗", "🚌", "🚒", "🚀", "✈️", "🚂", "🚁", "🛸",
    "🎸", "🥁", "🎺", "🎹", "🎷", "🔔"
  ];
  const SOUND_KEY = "mathenomics-keys-sound";
  const MODE_KEY = "mathenomics-keys-mode";
  const MODES = [
    { id: "upper", label: "ABC", title: "Capital letters" },
    { id: "lower", label: "abc", title: "Small letters" },
    { id: "digits", label: "123", title: "Numbers" }
  ];

  let alive = false;
  let soundOn = true;
  let padMode = "upper";
  let audioCtx = null;
  let holdTimer = null;
  let smashCount = 0;
  let tracked = false;
  let reduced = false;
  let stage = null;
  let fireworks = null;
  let root = null;
  let soundBtn = null;
  let emojiBtn = null;
  let lastEmoji = "😀";
  let emojiPool = FALLBACK_EMOJIS.slice();

  const onKey = (e) => {
    if (!alive) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if ([" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab", "Spacebar"].includes(e.key)) {
      e.preventDefault();
    }
    spawnFromKey(e.key);
  };

  const onPointer = (e) => {
    if (!alive || !root) return;
    if (e.target.closest(".keys-chrome")) return;
    if (e.target.closest(".keys-pad button")) return;
    e.preventDefault();
    const g = randomGlyph();
    spawnGlyph(g.text, g.kind);
  };

  const onHash = () => {
    if (!location.hash.startsWith("#/keys")) teardown();
  };

  function randomLetter() {
    return LETTERS[(Math.random() * LETTERS.length) | 0];
  }

  function randomGlyph() {
    if (padMode === "digits") {
      return { text: DIGITS[(Math.random() * DIGITS.length) | 0], kind: "digit" };
    }
    if (padMode === "lower") {
      return { text: LETTERS_LO[(Math.random() * LETTERS_LO.length) | 0], kind: "letter" };
    }
    return { text: randomLetter(), kind: "letter" };
  }

  function randomColor() {
    return COLORS[(Math.random() * COLORS.length) | 0];
  }

  function randomFwColor() {
    return FW_COLORS[(Math.random() * FW_COLORS.length) | 0];
  }

  function randomShape() {
    return SHAPES[(Math.random() * SHAPES.length) | 0];
  }

  function buildEmojiPool() {
    const seen = new Set();
    const out = [];
    const push = (em) => {
      if (!em || seen.has(em)) return;
      seen.add(em);
      out.push(em);
    };
    const kids = window.KIDS || window.K || [];
    kids.forEach((set) => {
      (set.items || []).forEach((it) => {
        const pic = it[1];
        if (typeof pic === "string" && !/^(\.\/)?pics\//.test(pic) && !/\.(svg|png|webp|jpe?g)$/i.test(pic)) {
          push(pic);
        }
      });
    });
    FALLBACK_EMOJIS.forEach(push);
    emojiPool = out.length ? out : FALLBACK_EMOJIS.slice();
  }

  function randomEmoji() {
    if (!emojiPool.length) buildEmojiPool();
    let next = emojiPool[(Math.random() * emojiPool.length) | 0];
    if (emojiPool.length > 1) {
      let guard = 0;
      while (next === lastEmoji && guard++ < 8) {
        next = emojiPool[(Math.random() * emojiPool.length) | 0];
      }
    }
    lastEmoji = next;
    if (emojiBtn) emojiBtn.textContent = next;
    return next;
  }

  function glyphForKey(key) {
    if (!key) return randomGlyph();
    if (key === "`" || key === "~") {
      return { text: randomEmoji(), kind: "emoji" };
    }
    if (key.length === 1) {
      if (/[0-9]/.test(key)) return { text: key, kind: "digit" };
      if (/[a-z]/.test(key)) return { text: key, kind: "letter" };
      if (/[A-Z]/.test(key)) {
        // Caps Lock / Shift: show capital; otherwise follow pad mode for letter keys
        if (padMode === "lower") return { text: key.toLowerCase(), kind: "letter" };
        return { text: key, kind: "letter" };
      }
    }
    return { text: randomShape(), kind: "shape" };
  }

  function ensureAudio() {
    const A = window.AudioContext || window.webkitAudioContext;
    if (!A) return null;
    audioCtx = audioCtx || new A();
    if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
    return audioCtx;
  }

  function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return h;
  }

  function toneFor(text, kind) {
    if (!soundOn) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    let idx = 0;
    if (kind === "letter") idx = LETTERS.indexOf(String(text).toUpperCase());
    else if (kind === "digit") idx = DIGITS.indexOf(text);
    else if (kind === "emoji") idx = Math.abs(hashStr(text)) % 12;
    else idx = SHAPES.indexOf(text);
    if (idx < 0) idx = (Math.random() * 12) | 0;
    const base = kind === "digit" ? 392 : kind === "shape" ? 294 : kind === "emoji" ? 349 : 262;
    const f = base * Math.pow(2, (idx % 12) / 12);
    const t0 = ctx.currentTime;

    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = kind === "shape" ? "triangle" : kind === "emoji" ? "square" : "sine";
    o.frequency.setValueAtTime(f, t0);
    if (kind === "emoji") o.frequency.exponentialRampToValueAtTime(f * 1.4, t0 + 0.14);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(kind === "emoji" ? 0.05 : 0.08, t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.26);
    o.connect(g).connect(ctx.destination);
    o.start(t0);
    o.stop(t0 + 0.28);

    // Firework crackle / pop under the note
    const n = ctx.createOscillator();
    const ng = ctx.createGain();
    n.type = "sawtooth";
    n.frequency.setValueAtTime(180 + Math.random() * 220, t0);
    n.frequency.exponentialRampToValueAtTime(60, t0 + 0.12);
    ng.gain.setValueAtTime(0.0001, t0);
    ng.gain.exponentialRampToValueAtTime(0.035, t0 + 0.01);
    ng.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);
    n.connect(ng).connect(ctx.destination);
    n.start(t0);
    n.stop(t0 + 0.15);

    const sparkle = ctx.createOscillator();
    const sg = ctx.createGain();
    sparkle.type = "sine";
    sparkle.frequency.setValueAtTime(880 + Math.random() * 600, t0 + 0.04);
    sg.gain.setValueAtTime(0.0001, t0 + 0.04);
    sg.gain.exponentialRampToValueAtTime(0.04, t0 + 0.06);
    sg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
    sparkle.connect(sg).connect(ctx.destination);
    sparkle.start(t0 + 0.04);
    sparkle.stop(t0 + 0.24);
  }

  function trackOnce() {
    if (tracked) return;
    tracked = true;
    try {
      if (window.MATH_METRICS && typeof window.MATH_METRICS.bumpKeys === "function") {
        window.MATH_METRICS.bumpKeys();
      }
    } catch (_) { /* optional */ }
  }

  /** Smashes fill the open play area (top + middle), never over the bottom pad. */
  function playSpawnXY() {
    return {
      x: 8 + Math.random() * 84,
      y: 10 + Math.random() * 55
    };
  }

  function spawnFirework(xPct, yPct, big) {
    if (!fireworks || reduced) return;
    const burst = document.createElement("div");
    burst.className = "keys-fw-burst" + (big ? " keys-fw-big" : "");
    burst.style.left = `${xPct}%`;
    burst.style.top = `${yPct}%`;
    const n = big ? 18 : 12;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("i");
      const ang = (Math.PI * 2 * i) / n + (Math.random() * 0.35 - 0.17);
      const dist = (big ? 56 : 38) + Math.random() * (big ? 70 : 48);
      p.style.setProperty("--fw-x", `${Math.cos(ang) * dist}px`);
      p.style.setProperty("--fw-y", `${Math.sin(ang) * dist}px`);
      p.style.setProperty("--fw-c", randomFwColor());
      p.style.setProperty("--fw-d", `${0.55 + Math.random() * 0.45}s`);
      p.style.setProperty("--fw-s", `${4 + Math.random() * 6}px`);
      burst.appendChild(p);
    }
    const flash = document.createElement("span");
    flash.className = "keys-fw-flash";
    flash.style.setProperty("--fw-c", randomFwColor());
    burst.appendChild(flash);
    fireworks.appendChild(burst);
    window.setTimeout(() => {
      if (burst.parentNode) burst.parentNode.removeChild(burst);
    }, 1200);
    while (fireworks.childElementCount > 20) {
      fireworks.removeChild(fireworks.firstChild);
    }
  }

  function spawnFromKey(key) {
    const g = glyphForKey(key);
    spawnGlyph(g.text, g.kind, null);
  }

  function spawnGlyph(text, kind) {
    if (!alive || !stage) return;
    trackOnce();
    smashCount += 1;
    const k = kind || (/[A-Za-z]/.test(text) ? "letter" : /[0-9]/.test(text) ? "digit" : "shape");
    const pos = playSpawnXY();

    const el = document.createElement("span");
    el.className = "keys-fly"
      + (k === "emoji" ? " keys-fly-emoji" : "")
      + (k === "letter" && text === text.toLowerCase() && /[a-z]/.test(text) ? " keys-fly-lower" : "")
      + (k === "digit" ? " keys-fly-digit" : "")
      + (reduced ? " keys-fly-static" : "");
    el.textContent = text;
    if (k !== "emoji") el.style.color = randomColor();
    const size = k === "emoji" ? (3.4 + Math.random() * 3.4) : (2.8 + Math.random() * 3.2);
    el.style.fontSize = `${size}rem`;
    const rot = reduced ? 0 : (Math.random() * 40 - 20);
    el.style.setProperty("--keys-rot", `${rot}deg`);
    const bounce = reduced ? 0 : 36 + Math.random() * 56;
    el.style.setProperty("--keys-bounce", `${bounce}px`);
    const dur = reduced ? 0.9 : 1.25 + Math.random() * 0.55;
    el.style.setProperty("--keys-dur", `${dur}s`);
    el.style.left = `${pos.x}%`;
    el.style.top = `${pos.y}%`;

    stage.appendChild(el);
    spawnFirework(pos.x, pos.y + 2, k === "emoji");
    if (!reduced && Math.random() > 0.35) {
      spawnFirework(
        Math.min(92, Math.max(8, pos.x + (Math.random() * 16 - 8))),
        Math.min(70, Math.max(8, pos.y + (Math.random() * 12 - 6))),
        false
      );
    }
    toneFor(text, k);
    updateHint();

    const ttl = (dur + 0.05) * 1000;
    window.setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, ttl);

    while (stage.childElementCount > 40) {
      stage.removeChild(stage.firstChild);
    }
  }

  function updateHint() {
    const hint = root && root.querySelector(".keys-hint");
    if (!hint) return;
    if (smashCount === 0) {
      hint.textContent = "Keyboard stays at the bottom — smash into the open sky above";
    } else if (smashCount < 4) {
      hint.textContent = "Keep going — every smash lights the sky!";
    } else {
      hint.hidden = true;
    }
  }

  function smashEmoji() {
    spawnGlyph(randomEmoji(), "emoji");
  }

  function setSound(on) {
    soundOn = !!on;
    try { localStorage.setItem(SOUND_KEY, soundOn ? "1" : "0"); } catch (_) {}
    if (soundBtn) {
      soundBtn.setAttribute("aria-pressed", soundOn ? "true" : "false");
      soundBtn.textContent = soundOn ? "Sound on" : "Sound off";
    }
    if (soundOn) ensureAudio();
  }

  function startHold(e) {
    e.preventDefault();
    e.stopPropagation();
    const btn = e.currentTarget;
    btn.classList.add("holding");
    clearHold();
    holdTimer = window.setTimeout(() => {
      holdTimer = null;
      location.hash = "#/kids";
    }, 1500);
  }

  function clearHold() {
    if (holdTimer) {
      window.clearTimeout(holdTimer);
      holdTimer = null;
    }
    if (root) {
      const btn = root.querySelector(".keys-hold");
      if (btn) btn.classList.remove("holding");
    }
  }

  function modeHtml() {
    return MODES.map((m) =>
      `<button type="button" class="keys-mode-btn${padMode === m.id ? " on" : ""}" data-mode="${m.id}" title="${m.title}" aria-pressed="${padMode === m.id ? "true" : "false"}">${m.label}</button>`
    ).join("");
  }

  function padKeys() {
    if (padMode === "digits") {
      return DIGITS.map((ch) =>
        `<button type="button" class="keys-key keys-digit" data-ch="${ch}" data-kind="digit" aria-label="Number ${ch}">${ch}</button>`
      ).join("");
    }
    const chars = padMode === "lower" ? LETTERS_LO : LETTERS;
    return chars.map((ch) =>
      `<button type="button" class="keys-key${padMode === "lower" ? " keys-lower" : ""}" data-ch="${ch}" data-kind="letter" aria-label="Letter ${ch}">${ch}</button>`
    ).join("");
  }

  function padHtml() {
    const emoji = `<button type="button" class="keys-key keys-emoji" data-emoji="1" aria-label="Smash a random emoji">${lastEmoji}</button>`;
    return padKeys() + emoji;
  }

  function refreshPad() {
    if (!root) return;
    const pad = root.querySelector(".keys-pad");
    if (pad) {
      pad.innerHTML = padHtml();
      emojiBtn = pad.querySelector(".keys-emoji");
    }
    root.querySelectorAll(".keys-mode-btn").forEach((btn) => {
      const on = btn.dataset.mode === padMode;
      btn.classList.toggle("on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    try { localStorage.setItem(MODE_KEY, padMode); } catch (_) {}
  }

  function setPadMode(mode) {
    if (!MODES.some((m) => m.id === mode)) return;
    padMode = mode;
    refreshPad();
  }

  function bind() {
    document.addEventListener("keydown", onKey, true);
    root.addEventListener("pointerdown", onPointer);
    window.addEventListener("hashchange", onHash);

    const hold = root.querySelector(".keys-hold");
    if (hold) {
      hold.addEventListener("pointerdown", startHold);
      hold.addEventListener("pointerup", clearHold);
      hold.addEventListener("pointerleave", clearHold);
      hold.addEventListener("pointercancel", clearHold);
    }

    if (soundBtn) {
      soundBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSound(!soundOn);
      });
    }

    const modes = root.querySelector(".keys-modes");
    if (modes) {
      modes.addEventListener("pointerdown", (e) => {
        const btn = e.target.closest("button[data-mode]");
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        setPadMode(btn.dataset.mode);
      });
    }

    const pad = root.querySelector(".keys-pad");
    if (pad) {
      pad.addEventListener("pointerdown", (e) => {
        const emojiHit = e.target.closest("button[data-emoji]");
        if (emojiHit) {
          e.preventDefault();
          e.stopPropagation();
          smashEmoji();
          return;
        }
        const btn = e.target.closest("button[data-ch]");
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        const kind = btn.dataset.kind === "digit" ? "digit" : "letter";
        spawnGlyph(btn.dataset.ch, kind);
      });
    }

    root.focus({ preventScroll: true });
  }

  function teardown() {
    if (!alive) return;
    alive = false;
    clearHold();
    document.removeEventListener("keydown", onKey, true);
    window.removeEventListener("hashchange", onHash);
    document.body.classList.remove("keys-mode");
    if (root) root.removeEventListener("pointerdown", onPointer);
    stage = null;
    fireworks = null;
    root = null;
    soundBtn = null;
    emojiBtn = null;
  }

  function mount(paint, fox) {
    teardown();
    reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    try {
      const saved = localStorage.getItem(SOUND_KEY);
      soundOn = saved == null ? true : saved !== "0";
      const modeSaved = localStorage.getItem(MODE_KEY);
      padMode = MODES.some((m) => m.id === modeSaved) ? modeSaved : "upper";
    } catch (_) {
      soundOn = true;
      padMode = "upper";
    }
    smashCount = 0;
    tracked = false;
    lastEmoji = "😀";
    buildEmojiPool();

    document.body.classList.add("keys-mode");
    paint("kids", ACCENT, `
      <section class="keys-smash" id="keys-smash" tabindex="0" aria-label="Keyboard smash playground">
        <div class="keys-chrome keys-top">
          <button type="button" class="keys-hold" aria-label="Hold one and a half seconds to leave">
            <span class="keys-hold-ring"></span>
            <span class="keys-hold-label">Hold</span>
          </button>
          <div class="keys-brand">
            ${fox ? fox("mini") : ""}
            <span>Mio smash</span>
          </div>
          <button type="button" class="keys-sound" aria-pressed="${soundOn ? "true" : "false"}">${soundOn ? "Sound on" : "Sound off"}</button>
        </div>
        <div class="keys-play" aria-hidden="true">
          <div class="keys-fireworks" id="keys-fireworks"></div>
          <div class="keys-stage" id="keys-stage"></div>
          <p class="keys-hint">Pick ABC, abc, or 123 — smash into the open sky above</p>
        </div>
        <div class="keys-chrome keys-bottom">
          <div class="keys-bottom-bar">
            <a class="keys-leave" href="#/kids">Leave</a>
            <div class="keys-modes" role="group" aria-label="Pad mode">${modeHtml()}</div>
          </div>
          <div class="keys-pad" role="group" aria-label="On-screen smash pad">${padHtml()}</div>
        </div>
      </section>
    `);

    root = document.getElementById("keys-smash");
    stage = document.getElementById("keys-stage");
    fireworks = document.getElementById("keys-fireworks");
    soundBtn = root && root.querySelector(".keys-sound");
    emojiBtn = root && root.querySelector(".keys-emoji");
    alive = true;
    if (root) bind();
  }

  window.KEYS = { mount, teardown };
})();
