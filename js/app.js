(function () {
  const app = document.getElementById("app");
  const KEY = "mathenomics-save";
  const C = window.COURSES;
  const K = window.KIDS;
  const ROUNDS = 5;
  const HEARTS = 3;

  const S = Object.assign({
    coins: 0, best: {}, last: null, walkFrom: {},
    metrics: { totalMs: 0, gamesPlayed: 0, puzzlesPlayed: 0, roundsPlayed: 0, sessions: 0 }
  }, JSON.parse(localStorage.getItem(KEY) || "{}"));
  if (!S.metrics) S.metrics = { totalMs: 0, gamesPlayed: 0, puzzlesPlayed: 0, roundsPlayed: 0, sessions: 0 };
  ["totalMs", "gamesPlayed", "puzzlesPlayed", "roundsPlayed", "sessions"].forEach((k) => {
    if (S.metrics[k] == null) S.metrics[k] = 0;
  });
  const save = () => localStorage.setItem(KEY, JSON.stringify(S));

  /* ---------- usage metrics (device-local) ---------- */
  S.metrics.sessions += 1;
  save();
  let activeMs = 0;
  let tickOn = !document.hidden;
  let lastTick = Date.now();
  function flushTime() {
    if (!tickOn) { lastTick = Date.now(); return; }
    const now = Date.now();
    const dt = Math.min(now - lastTick, 60000);
    if (dt > 0) {
      activeMs += dt;
      S.metrics.totalMs += dt;
      save();
    }
    lastTick = now;
  }
  window.setInterval(() => { if (tickOn) flushTime(); }, 15000);
  document.addEventListener("visibilitychange", () => {
    flushTime();
    tickOn = !document.hidden;
    lastTick = Date.now();
  });
  window.addEventListener("beforeunload", flushTime);

  function fmtTime(ms) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const r = s % 60;
    if (h) return `${h}h ${m}m`;
    if (m) return `${m}m ${r}s`;
    return `${r}s`;
  }

  const t = (key, vars) => (window.I18N ? window.I18N.t(key, vars) : key);
  const locC = (c) => (window.I18N ? window.I18N.locCourse(c) : c);
  const locL = (c, l) => (window.I18N ? window.I18N.locLesson(c, l) : l);

  function metricsStrip() {
    const M = S.metrics;
    return `<aside class="metrics" aria-label="${t("activity")}">
      <div><b>${fmtTime(M.totalMs)}</b><span>${t("timeLearning")}</span></div>
      <div><b>${M.gamesPlayed}</b><span>${t("gamesFinished")}</span></div>
      <div><b>${M.puzzlesPlayed}</b><span>${t("tablePuzzles")}</span></div>
      <div><b>${M.roundsPlayed}</b><span>${t("roundsAnswered")}</span></div>
    </aside>`;
  }

  function bindLangPicker() {
    app.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!window.I18N) return;
        window.I18N.setLang(btn.dataset.lang);
        if (location.hash === "#/" || location.hash === "" || location.hash === "#") home();
        else route();
      });
    });
  }

  /* Optional hook for keyboard smash (and similar kids toys) */
  window.MATH_METRICS = {
    bumpKeys() {
      try {
        S.metrics.gamesPlayed += 1;
        save();
      } catch (_) { /* ignore */ }
    }
  };

  const course = (id) => C.find((c) => c.id === id);
  const lessonOf = (c, id) => c && c.lessons.find((l) => l.id === id);
  const key = (c, l) => `${c.id}/${l.id}`;

  function letter(p) {
    if (p == null) return "—";
    if (p === 100) return "A+";
    if (p >= 90) return "A";
    if (p >= 80) return "B";
    if (p >= 70) return "C";
    if (p >= 60) return "D";
    return "Retry";
  }

  const starsFor = (p) => (p == null ? 0 : p === 100 ? 3 : p >= 80 ? 2 : p >= 60 ? 1 : 0);

  function courseMark(c) {
    const scores = c.lessons.map((l) => S.best[key(c, l)]).filter((v) => v != null);
    const pct = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
    return { pct, letter: letter(pct), done: scores.length };
  }

  /* ---------- sound ---------- */
  let ctx = null;
  function sfx(kind) {
    const A = window.AudioContext || window.webkitAudioContext;
    if (!A) return;
    ctx = ctx || new A();
    if (ctx.state === "suspended") ctx.resume();
    const notes = { ok: [660, 880], no: [220, 165], win: [523, 659, 784, 1047], coin: [988, 1319] }[kind];
    notes.forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const t = ctx.currentTime + i * 0.09;
      o.type = kind === "no" ? "triangle" : "square";
      o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.06, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.18);
    });
  }

  let clip = null;
  function hush() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (clip) { clip.pause(); clip = null; }
    if (window.NARRATION) window.NARRATION.stop();
  }

  function playFile(src, onend) {
    if (clip) { clip.pause(); clip = null; }
    clip = new Audio(src);
    if (onend) {
      clip.addEventListener("ended", onend, { once: true });
      clip.addEventListener("error", onend, { once: true });
    }
    return clip.play().then(() => true).catch(() => { if (onend) onend(); return false; });
  }

  function sayText(text, opts = {}) {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) { resolve(false); return; }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = opts.rate || 0.9;
      u.pitch = opts.pitch || 1.15;
      let done = false;
      const end = () => { if (!done) { done = true; resolve(true); } };
      u.addEventListener("end", end);
      u.addEventListener("error", end);
      window.setTimeout(end, 800 + text.length * 90);
      window.speechSynthesis.speak(u);
    });
  }

  /** Lesson phrases: owner clip only. Kids names: owner clip, else announce with device voice, then real sound. */
  function bindHear(btn, playFn, missTip) {
    btn.addEventListener("click", async () => {
      hush();
      const ok = await playFn();
      if (!ok) {
        btn.classList.add("miss");
        const tip = btn.parentElement.querySelector(".voice-miss") || Object.assign(document.createElement("span"), { className: "voice-miss" });
        tip.textContent = missTip || "Voice clip not added yet. The owner records phrases into the voices/ folder.";
        if (!tip.parentElement) btn.after(tip);
        window.setTimeout(() => btn.classList.remove("miss"), 1200);
      }
    });
  }

  /* ---------- character ---------- */
  function fox(cls = "") {
    return `<svg class="fox ${cls}" viewBox="0 0 120 132" aria-hidden="true">
      <ellipse class="shadow" cx="60" cy="126" rx="30" ry="5" fill="rgba(31,29,26,.15)"/>
      <g class="tail"><path d="M80 104 C112 100 118 70 100 58 C106 78 94 90 76 92 Z" fill="#E8773A" stroke="#1F1D1A" stroke-width="2.2" stroke-linejoin="round"/><path d="M100 58 C110 64 112 74 106 82 C104 72 102 64 100 58Z" fill="#FFF6EA"/></g>
      <g class="body">
        <path d="M36 100 C36 84 46 78 60 78 C74 78 84 84 84 100 C84 114 74 122 60 122 C46 122 36 114 36 100Z" fill="#E8773A" stroke="#1F1D1A" stroke-width="2.2"/>
        <path d="M50 100 C50 92 54 88 60 88 C66 88 70 92 70 100 C70 110 66 116 60 116 C54 116 50 110 50 100Z" fill="#FFF6EA"/>
        <path class="scarf" d="M38 80 Q60 92 82 80 L80 90 Q60 98 40 90Z" fill="var(--accent)" stroke="#1F1D1A" stroke-width="2"/>
        <path d="M70 88 l8 16 l-9 -2z" fill="var(--accent)" stroke="#1F1D1A" stroke-width="2" stroke-linejoin="round"/>
        <ellipse cx="48" cy="122" rx="8" ry="4.5" fill="#1F1D1A"/><ellipse cx="72" cy="122" rx="8" ry="4.5" fill="#1F1D1A"/>
      </g>
      <g class="head">
        <path d="M30 20 L42 50 L54 36 Z" fill="#E8773A" stroke="#1F1D1A" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M35 29 L42 45 L49 37 Z" fill="#1F1D1A"/>
        <path d="M90 20 L78 50 L66 36 Z" fill="#E8773A" stroke="#1F1D1A" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M85 29 L78 45 L71 37 Z" fill="#1F1D1A"/>
        <path d="M26 54 Q28 30 60 30 Q92 30 94 54 Q92 74 60 82 Q28 74 26 54Z" fill="#E8773A" stroke="#1F1D1A" stroke-width="2.2"/>
        <path d="M33 60 Q46 57 60 68 Q74 57 87 60 Q80 78 60 82 Q40 78 33 60Z" fill="#FFF6EA"/>
        <g class="eyes"><ellipse cx="46" cy="53" rx="3.6" ry="4.6" fill="#1F1D1A"/><ellipse cx="74" cy="53" rx="3.6" ry="4.6" fill="#1F1D1A"/>
        <circle cx="47.2" cy="51.4" r="1.2" fill="#fff"/><circle cx="75.2" cy="51.4" r="1.2" fill="#fff"/></g>
        <path d="M55 67 h10 l-5 5z" fill="#1F1D1A"/>
        <path class="mouth" d="M54 74 q6 5 12 0" stroke="#1F1D1A" fill="none" stroke-width="2" stroke-linecap="round"/>
        <circle cx="38" cy="66" r="4" fill="#F4A3A3" opacity=".7"/><circle cx="82" cy="66" r="4" fill="#F4A3A3" opacity=".7"/>
      </g>
    </svg>`;
  }

  const coin = `<svg viewBox="0 0 20 20" class="coin-ico" aria-hidden="true"><circle cx="10" cy="10" r="8.5" fill="#F2B134" stroke="#1F1D1A" stroke-width="1.8"/><path d="M10 5.5v9M7.5 7.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4" stroke="#1F1D1A" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`;
  const heart = (on) => `<svg viewBox="0 0 24 22" class="heart ${on ? "" : "lost"}" aria-hidden="true"><path d="M12 20 C4 14 1 10 1 6.5 A5.5 5.5 0 0 1 12 4 A5.5 5.5 0 0 1 23 6.5 C23 10 20 14 12 20Z" fill="${on ? "#C84F2E" : "none"}" stroke="#1F1D1A" stroke-width="2"/></svg>`;
  const star = (on) => `<svg viewBox="0 0 24 24" class="star ${on ? "on" : ""}" aria-hidden="true"><path d="M12 2 L14.9 8.6 L22 9.3 L16.6 14 L18.2 21 L12 17.3 L5.8 21 L7.4 14 L2 9.3 L9.1 8.6 Z" fill="${on ? "#F2B134" : "none"}" stroke="#1F1D1A" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
  const stars = (n) => `<span class="stars">${[0, 1, 2].map((i) => star(i < n)).join("")}</span>`;

  function bar(active) {
    const kidsLabel = active === "kids" ? "Kids’ corner" : t("kids");
    return `<header class="bar">
      <a class="brand" href="#/">${fox("mini")}<span>Mathenomics</span></a>
      <nav>
        <a href="#/" class="${active === "learn" ? "on" : ""}">${t("learn")}</a>
        <a href="#/report" class="${active === "report" ? "on" : ""}">${t("report")}</a>
        <a href="#/kids" class="${active === "kids" ? "on" : ""}">${kidsLabel}</a>
      </nav>
      <span class="coins" title="${t("coins")}">${coin}<b id="coin-count">${S.coins}</b></span>
    </header>`;
  }

  function paint(active, accent, html) {
    document.body.style.setProperty("--accent", accent || "#C84F2E");
    app.innerHTML = bar(active) + `<main class="view">${html}</main>`;
    window.scrollTo(0, 0);
  }

  /* Prefer High School theorems right after Grade 10 (near PABSON in the shelf). */
  function libraryCourses() {
    const pin = ["k", "g1", "g3", "g5", "g7", "g8", "g9", "g10", "hs", "g11", "trig2", "tables", "pabson", "optional"];
    const rank = (id) => {
      const i = pin.indexOf(id);
      return i === -1 ? pin.length + 1 : i;
    };
    return C.slice().sort((a, b) => rank(a.id) - rank(b.id) || C.indexOf(a) - C.indexOf(b));
  }

  /* ---------- screens ---------- */
  function home() {
    const last = S.last && course(S.last.c);
    const lastLesson = last && lessonOf(last, S.last.l);
    const lastView = lastLesson ? locL(last, lastLesson) : null;
    const picker = window.I18N ? window.I18N.langPickerHtml() : "";
    paint("learn", "#C84F2E", `
      <section class="hero">
        <div class="hero-copy">
          <h1 class="brand-hero">Mathenomics</h1>
          <p class="lede">${t("heroLede")}</p>
          ${picker}
          ${lastLesson ? `<a class="btn primary big" href="#/l/${last.id}/${lastLesson.id}">${t("keepGoing", { name: lastView.name })}</a>` : `<a class="btn primary big" href="#/g/g3">${t("tryTables")}</a>`}
        </div>
        <div class="hero-scene">
          <div class="bubble">${t("mioHi")}</div>
          ${fox("idle big")}
          <div class="hill"></div>
        </div>
      </section>
      <h2 class="section-title">${t("library")}</h2>
      <section class="grades">
        ${libraryCourses().map((raw) => {
          const c = locC(raw);
          const m = courseMark(raw);
          const hs = raw.id === "hs";
          return `<a class="grade${hs ? " grade-hs" : ""}" href="#/g/${raw.id}" style="--accent:${raw.color}">
            <span class="grade-band">${c.grade}</span>
            ${hs ? `<span class="grade-proof-tag">${t("proofMode")}</span>` : ""}
            <strong>${c.title}</strong>
            <span class="grade-blurb">${c.blurb}</span>
            <span class="grade-foot">
              <span class="meter"><i style="width:${(m.done / raw.lessons.length) * 100}%"></i></span>
              <span>${m.done}/${raw.lessons.length}</span>
            </span>
            <span class="stamp ${m.pct == null ? "blank" : ""}">${m.letter}</span>
          </a>`;
        }).join("")}
      </section>
      <a class="kids-band" href="#/kids">
        ${fox("mini")}
        <span><strong>${t("kidsBandTitle")}</strong><em>${t("kidsBandLede")}</em></span>
        <span class="btn">${t("open")}</span>
      </a>
    `);
    bindLangPicker();
  }

  const standAt = ([x]) => (x > 50 ? `calc(${x}% + 38px)` : `calc(${x}% - 112px)`);

  function mapScreen(c) {
    const m = courseMark(c);
    const n = c.lessons.length;
    const H = n * 128 + 40;
    const pts = c.lessons.map((_, i) => [50 + 30 * Math.sin(i * 1.25 + 0.4), 64 + i * 128]);
    let path = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < n; i += 1) {
      const [px, py] = pts[i - 1];
      const [qx, qy] = pts[i];
      path += ` C${px} ${py + 64} ${qx} ${qy - 64} ${qx} ${qy}`;
    }
    const playedIdx = c.lessons.map((l, i) => (S.best[key(c, l)] != null ? i : -1)).filter((i) => i >= 0);
    const target = Math.min(n - 1, playedIdx.length ? Math.max(...playedIdx) + 1 : 0);
    const from = S.walkFrom[c.id] != null ? S.walkFrom[c.id] : target;
    delete S.walkFrom[c.id];
    save();

    const hs = c.id === "hs";
    const vc = locC(c);
    const mapEyebrow = hs ? t("proofMode") : vc.grade;
    const mapLede = hs
      ? t("hsLede")
      : `${vc.blurb} ${t("everyStop")}`;

    paint("learn", c.color, `
      <a class="crumb" href="#/">← ${t("allGrades")}</a>
      <header class="course-head${hs ? " course-head-hs" : ""}">
        <div>
          <p class="eyebrow">${mapEyebrow}</p>
          <h1>${vc.title}</h1>
          <p class="lede">${mapLede}</p>
        </div>
        <div class="course-mark">
          <span class="stamp big ${m.pct == null ? "blank" : ""}">${m.letter}</span>
          <span>${m.pct == null ? t("noMark") : t("avgMark", { pct: m.pct })}<br>${t("played", { done: m.done, n })}</span>
          ${vc.cheat && vc.cheat.length ? `<a class="btn ghost" href="#/cheat/${c.id}">${hs ? t("theoremCheat") : t("gradeCheat")}</a>` : ""}
          ${c.id === "tables" ? `<a class="btn primary" href="#/puzzle/2">${t("tablePuzzle")}</a>` : ""}
        </div>
      </header>
      <section class="map${hs ? " map-hs" : ""}" style="height:${H}px">
        <svg class="trail" viewBox="0 0 100 ${H}" preserveAspectRatio="none" aria-hidden="true">
          <path d="${path}" fill="none" stroke="#1F1D1A" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
        </svg>
        ${c.lessons.map((l, i) => {
          const best = S.best[key(c, l)];
          const [x, y] = pts[i];
          const vl = locL(c, l);
          const tag = vl.tag ? `<span class="theorem-badge badge-${String(vl.tag).toLowerCase()}">${vl.tag}</span>` : "";
          return `<a class="stop ${best != null ? "done" : ""} ${x > 50 ? "flip" : ""}" href="#/l/${c.id}/${l.id}" style="left:${x}%;top:${y}px">
            <span class="stop-dot">${i + 1}</span>
            <span class="stop-card">${tag}<strong>${vl.name}</strong><em>${vl.phrase}</em>${best != null ? `<span class="stop-meta">${stars(starsFor(best))}<b>${letter(best)}</b></span>` : ""}</span>
          </a>`;
        }).join("")}
        <div class="walker" style="left:${standAt(pts[from])};top:${pts[from][1]}px">${fox("idle")}</div>
      </section>
    `);

    if (from !== target) {
      const walker = app.querySelector(".walker");
      walker.classList.add("walking");
      requestAnimationFrame(() => requestAnimationFrame(() => {
        walker.style.left = standAt(pts[target]);
        walker.style.top = `${pts[target][1]}px`;
      }));
      walker.addEventListener("transitionend", () => walker.classList.remove("walking"), { once: true });
      window.setTimeout(() => walker.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
    }
  }

  function lessonScreen(c, l) {
    const best = S.best[key(c, l)];
    const idx = c.lessons.indexOf(l);
    const next = c.lessons[idx + 1];
    const hs = c.id === "hs";
    const vc = locC(c);
    const vl = locL(c, l);
    const vn = next ? locL(c, next) : null;
    const badge = vl.tag
      ? `<span class="theorem-badge badge-${String(vl.tag).toLowerCase()}">${vl.tag}</span>`
      : "";
    const stepsClass = hs ? "steps proof-steps" : "steps";
    const stepsTitle = hs ? t("proofMoves") : t("howItWorks");
    const quizNote = window.I18N && window.I18N.isTranslated()
      ? `<p class="quiz-note">${t("quizNote")}</p>`
      : "";
    paint("learn", c.color, `
      <a class="crumb" href="#/g/${c.id}">← ${vc.grade} · ${vc.title}</a>
      <article class="lesson${hs ? " lesson-hs" : ""}">
        <figure class="figure">
          <div class="figure-pic">${l.pic()}</div>
          <figcaption>${t("stopOf", { i: idx + 1, n: c.lessons.length })}</figcaption>
          <div class="figure-fox">${fox("idle")}</div>
        </figure>
        <div class="lesson-copy">
          <p class="eyebrow">${badge}${vl.name}</p>
          <h1 class="phrase">“${vl.phrase}”</h1>
          <button type="button" class="btn ghost" id="hear">▶ ${t("hearPhrase")}</button>
          <span class="voice-hint">${t("voiceHint")}</span>
          ${vl.also ? `<p class="also"><span>${t("alsoSaid")}</span>${vl.also}</p>` : ""}
          <h3 class="small-title">${stepsTitle}</h3>
          <ol class="${stepsClass}">${vl.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
          <aside class="watch"><strong>${t("watchOut")}</strong><p>${vl.exception}</p></aside>
          ${quizNote}
          <div class="lesson-actions">
            <a class="btn primary" href="#/play/${c.id}/${l.id}">${t("playRounds", { n: ROUNDS })}</a>
            ${best != null ? `<span class="best">${t("best", { letter: letter(best), pct: best })} ${stars(starsFor(best))}</span>` : `<span class="best">${t("heartsHint", { hearts: HEARTS, rounds: ROUNDS })}</span>`}
          </div>
          ${vn ? `<a class="next-link" href="#/l/${c.id}/${next.id}">${t("nextStop", { name: vn.name })}</a>` : ""}
        </div>
      </article>
      ${l.worked && l.worked.length ? `<section class="worked" id="worked">
        <header class="worked-head">
          <div><p class="eyebrow">${t("solveWithMe")}</p><h2>${t("stepByStep")}</h2></div>
          <div class="worked-tabs">${l.worked.map((_, k) => `<button type="button" class="tab" data-w="${k}">${t("problem")} ${k + 1}</button>`).join("")}</div>
        </header>
        <div class="worked-body"></div>
      </section>` : ""}
    `);
    bindHear(app.querySelector("#hear"), () => window.NARRATION.playLesson(c.id, l.id));
    if (l.worked && l.worked.length) workedBox(l.worked);
  }

  function workedBox(list) {
    const body = app.querySelector(".worked-body");
    const tabs = [...app.querySelectorAll(".worked-tabs .tab")];
    let shown = 0;
    let w = null;
    const draw = () => {
      body.innerHTML = `
        <div class="worked-problem">
          ${w.pic ? `<div class="worked-pic">${w.pic}</div>` : ""}
          <p class="worked-q"><span>${t("problem")}</span>${w.problem}</p>
        </div>
        <ol class="worked-steps">
          ${w.steps.map(([move, work], k) => `<li class="${k < shown ? "on" : ""}" ${k < shown ? "" : "hidden"}><strong>${move}</strong><span>${work}</span></li>`).join("")}
        </ol>
        ${shown >= w.steps.length ? `<p class="worked-answer"><span>${t("answer")}</span>${w.answer}</p>` : ""}
        <div class="worked-actions">
          ${shown < w.steps.length
            ? `<button type="button" class="btn primary" id="wstep">${shown ? t("nextStep") : t("showFirst")}</button>
               <button type="button" class="btn ghost" id="wall">${t("showAll")}</button>`
            : `<button type="button" class="btn" id="wagain">${t("hideSteps")}</button>`}
        </div>`;
      const step = body.querySelector("#wstep");
      if (step) step.addEventListener("click", () => { shown += 1; draw(); sfx("coin"); });
      const all = body.querySelector("#wall");
      if (all) all.addEventListener("click", () => { shown = w.steps.length; draw(); });
      const again = body.querySelector("#wagain");
      if (again) again.addEventListener("click", () => { shown = 0; draw(); });
    };
    const open = (k) => {
      w = list[k];
      shown = 0;
      tabs.forEach((t, i) => t.classList.toggle("on", i === k));
      draw();
    };
    tabs.forEach((t, k) => t.addEventListener("click", () => open(k)));
    open(0);
  }

  /* ---------- game ---------- */
  let run = null;

  function startRun(c, l) {
    const qs = [];
    const seen = new Set();
    let tries = 0;
    while (qs.length < ROUNDS && tries < 60) {
      const q = l.gen();
      tries += 1;
      if (seen.has(q.prompt) && tries < 40) continue;
      seen.add(q.prompt);
      qs.push(q);
    }
    run = { c, l, qs, i: 0, hearts: HEARTS, right: 0, marks: [], locked: false };
    S.last = { c: c.id, l: l.id };
    save();
  }

  function playScreen() {
    const { c, l, qs, i } = run;
    const q = qs[i];
    const vl = locL(c, l);
    paint("learn", c.color, `
      <div class="hud">
        <a class="crumb" href="#/l/${c.id}/${l.id}">✕ ${t("leaveGame")}</a>
        <div class="pips">${qs.map((_, k) => `<i class="${k < i ? (run.marks[k] ? "ok" : "no") : k === i ? "now" : ""}"></i>`).join("")}</div>
        <div class="hearts">${Array.from({ length: HEARTS }, (_, k) => heart(k < run.hearts)).join("")}</div>
      </div>
      <section class="arena">
        <div class="coach">
          <div class="bubble small">${vl.phrase}</div>
          <div class="coach-fox">${fox("idle")}</div>
        </div>
        <div class="round">
          <p class="eyebrow">${t("roundOf", { i: i + 1, n: qs.length, name: vl.name })}</p>
          ${q.pic ? `<div class="round-pic">${q.pic}</div>` : ""}
          <h2 class="prompt">${q.prompt}</h2>
          <div class="answers ${q.choices.length < 3 ? "two" : ""}">
            ${q.choices.map((ch, k) => `<button type="button" class="answer" data-k="${k}"><span class="key">${"ABCD"[k]}</span><span>${ch}</span></button>`).join("")}
          </div>
          <div class="verdict" id="verdict" hidden></div>
        </div>
      </section>
    `);
    app.querySelectorAll(".answer").forEach((b) => b.addEventListener("click", () => answer(Number(b.dataset.k))));
  }

  function answer(k) {
    if (run.locked) return;
    run.locked = true;
    const q = run.qs[run.i];
    const ok = k === q.answer;
    const buttons = [...app.querySelectorAll(".answer")];
    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === q.answer) b.classList.add("right");
      else if (idx === k) b.classList.add("wrong");
    });
    const foxEl = app.querySelector(".coach .fox");
    foxEl.classList.remove("idle");
    foxEl.classList.add(ok ? "cheer" : "oops");
    run.marks.push(ok);
    if (ok) {
      run.right += 1;
      S.coins += 10;
      save();
      sfx("ok");
      const counter = document.getElementById("coin-count");
      counter.textContent = S.coins;
      counter.parentElement.classList.add("bump");
      buttons[k].insertAdjacentHTML("beforeend", `<span class="plus">+10</span>`);
    } else {
      run.hearts -= 1;
      sfx("no");
      const lostHeart = app.querySelectorAll(".hearts .heart")[run.hearts];
      if (lostHeart) lostHeart.classList.add("break");
    }
    const last = run.i === run.qs.length - 1 || run.hearts === 0;
    const verdict = document.getElementById("verdict");
    verdict.hidden = false;
    verdict.className = `verdict ${ok ? "good" : "bad"}`;
    const praise = ok ? pick([t("nice"), t("gotIt"), t("yes"), t("spotOn")]) : run.hearts === 0 ? t("outOfHearts") : t("notQuite");
    verdict.innerHTML = `<p><strong>${praise}</strong> ${q.why}</p>
      <button type="button" class="btn primary" id="go">${last ? t("seeMark") : t("nextRound")}</button>`;
    const go = document.getElementById("go");
    go.focus({ preventScroll: true });
    go.addEventListener("click", () => {
      run.locked = false;
      if (last) finish();
      else { run.i += 1; playScreen(); }
    });
    verdict.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

  function finish() {
    const { c, l } = run;
    const pct = Math.round((run.right / run.qs.length) * 100);
    const k = key(c, l);
    const prev = S.best[k];
    S.best[k] = prev == null ? pct : Math.max(prev, pct);
    S.walkFrom[c.id] = c.lessons.indexOf(l);
    S.metrics.gamesPlayed += 1;
    S.metrics.roundsPlayed += run.qs.length;
    save();
    run.result = { pct, prev };
    location.hash = `#/done/${c.id}/${l.id}`;
  }

  function doneScreen(c, l) {
    if (!run || !run.result || run.l !== l) { location.hash = `#/l/${c.id}/${l.id}`; return; }
    const { pct, prev } = run.result;
    const next = c.lessons[c.lessons.indexOf(l) + 1];
    const s = starsFor(pct);
    const vl = locL(c, l);
    const vn = next ? locL(c, next) : null;
    const lede = (pct === 100 ? t("perfect") : pct >= 60 ? t("goodWork") : t("tryAgain"))
      + (prev != null && pct > prev ? t("newBest") : "");
    paint("learn", c.color, `
      <section class="result">
        <div class="result-fox">${fox(pct >= 60 ? "cheer loop" : "oops")}</div>
        <div class="result-card">
          <p class="eyebrow">${vl.name} · ${t("yourMark")}</p>
          <div class="result-row">
            <span class="stamp huge ${pct < 60 ? "low" : ""}">${letter(pct)}</span>
            <div>
              <p class="score">${run.right} / ${run.qs.length} · ${pct}%</p>
              ${stars(s)}
              <p class="lede">${lede}</p>
            </div>
          </div>
          <p class="remember"><span>★</span>“${vl.phrase}”</p>
          <div class="result-actions">
            ${vn ? `<a class="btn primary" href="#/l/${c.id}/${next.id}">${t("nextLesson", { name: vn.name })}</a>` : `<a class="btn primary" href="#/g/${c.id}">← ${t("allGrades")}</a>`}
            <a class="btn" href="#/play/${c.id}/${l.id}">${t("playAgain")}</a>
            <a class="btn ghost" href="#/g/${c.id}">Map</a>
          </div>
        </div>
      </section>
    `);
    if (pct >= 60) sfx("win");
  }

  function cheatScreen(c) {
    const vc = locC(c);
    const sheets = vc.cheat || [];
    const hs = c.id === "hs";
    paint("learn", c.color, `
      <a class="crumb" href="#/g/${c.id}">← ${vc.grade} · ${vc.title}</a>
      <header class="course-head${hs ? " course-head-hs" : ""}">
        <div>
          <p class="eyebrow">${hs ? t("cheatEyebrowHs") : t("cheatEyebrow", { grade: vc.grade })}</p>
          <h1>${hs ? t("cheatTitleHs") : t("cheatTitle")}</h1>
          <p class="lede">${hs ? t("cheatLedeHs") : t("cheatLede")}</p>
        </div>
      </header>
      <section class="cheat${hs ? " cheat-hs" : ""}">
        ${sheets.map((block) => `
          <article class="cheat-card">
            <h2>${block.title}</h2>
            <table><tbody>
              ${block.rows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}
            </tbody></table>
          </article>`).join("") || `<p class="lede">…</p>`}
      </section>
    `);
  }

  function randInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function shuffleOf(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function puzzleScreen(n) {
    n = Math.max(2, Math.min(12, Number(n) || 2));
    const size = 12;
    const missing = [];
    while (missing.length < 6) {
      const key = `${randInt(1, size)}x${n}`;
      if (!missing.includes(key)) missing.push(key);
    }
    const asked = new Set(missing);
    let focus = missing[0];
    let right = 0;
    paint("learn", "#2A9D8F", `
      <a class="crumb" href="#/g/tables">← Times tables</a>
      <header class="course-head">
        <div>
          <p class="eyebrow">Table puzzle</p>
          <h1>Fill the ${n}× table</h1>
          <p class="lede">Six blanks on the ${n} times table. Tap a yellow cell, then pick the product.</p>
          <div class="worked-tabs">${[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((k) => `<a class="tab ${k === n ? "on" : ""}" href="#/puzzle/${k}">×${k}</a>`).join("")}</div>
        </div>
      </header>
      <section class="puzzle">
        <div class="puzzle-grid" id="pgrid" style="grid-template-columns: repeat(13, minmax(0, 1fr))"></div>
        <div class="puzzle-choices" id="picks"></div>
        <p class="lede" id="pstatus"></p>
      </section>
    `);
    const grid = app.querySelector("#pgrid");
    const picks = app.querySelector("#picks");
    const status = app.querySelector("#pstatus");
    const cell = (html, cls, data) => `<button type="button" class="cell ${cls || ""}" ${data || ""}>${html}</button>`;
    let html = cell("×", "head") + Array.from({ length: size }, (_, i) => cell(String(i + 1), "head")).join("");
    for (let a = 1; a <= size; a += 1) {
      html += cell(String(a), "head");
      for (let c = 1; c <= size; c += 1) {
        if (c !== n) {
          html += cell("", "");
          continue;
        }
        const key = `${a}x${n}`;
        html += asked.has(key)
          ? cell("?", `ask${key === focus ? " on" : ""}`, `data-k="${key}"`)
          : cell(String(a * n), "ok");
      }
    }
    grid.innerHTML = html;

    const showChoices = () => {
      const a = Number(focus.split("x")[0]);
      const ans = a * n;
      const wrongs = new Set([ans]);
      while (wrongs.size < 4) wrongs.add(ans + pick([-n, n, -1, 1, 2, -2, 10, -10]));
      picks.innerHTML = shuffleOf([...wrongs]).map((v) => `<button type="button" class="answer" data-v="${v}"><span>${v}</span></button>`).join("");
      picks.querySelectorAll(".answer").forEach((b) => b.addEventListener("click", () => {
        const ok = Number(b.dataset.v) === ans;
        const cellEl = grid.querySelector(`[data-k="${focus}"]`);
        if (ok) {
          cellEl.textContent = String(ans);
          cellEl.classList.remove("ask", "on");
          cellEl.classList.add("ok");
          cellEl.disabled = true;
          asked.delete(focus);
          right += 1;
          sfx("ok");
          const next = [...asked][0];
          if (!next) {
            status.textContent = `Done — ${right} right on the ${n}× table. Try another table above.`;
            picks.innerHTML = "";
            S.metrics.puzzlesPlayed += 1;
            save();
            sfx("win");
            return;
          }
          focus = next;
          grid.querySelectorAll(".ask").forEach((el) => el.classList.toggle("on", el.dataset.k === focus));
          status.textContent = `Nice. ${asked.size} blank${asked.size === 1 ? "" : "s"} left.`;
          showChoices();
        } else {
          cellEl.classList.add("no");
          window.setTimeout(() => cellEl.classList.remove("no"), 400);
          sfx("no");
          status.textContent = "Not that one — say the table mnemonic, then try again.";
        }
      }));
    };

    grid.querySelectorAll(".ask").forEach((el) => el.addEventListener("click", () => {
      focus = el.dataset.k;
      grid.querySelectorAll(".ask").forEach((x) => x.classList.toggle("on", x === el));
      status.textContent = `What is ${focus.replace("x", " × ")}?`;
      showChoices();
    }));
    status.textContent = `What is ${focus.replace("x", " × ")}?`;
    showChoices();
  }

  function report() {
    flushTime();
    paint("report", "#2E4057", `
      <header class="course-head">
        <div>
          <p class="eyebrow">${t("report")}</p>
          <h1>${t("yourMark")}</h1>
          <p class="lede">${t("cheatLede")}</p>
        </div>
      </header>
      ${metricsStrip()}
      <section class="report">
        ${C.map((raw) => {
          const c = locC(raw);
          const m = courseMark(raw);
          return `<article class="report-row" style="--accent:${raw.color}">
            <header>
              <span class="grade-band">${c.grade}</span>
              <strong>${c.title}</strong>
              <span class="report-pct">${m.pct == null ? t("noMark") : `${m.pct}%`}</span>
              <span class="stamp ${m.pct == null ? "blank" : ""}">${m.letter}</span>
            </header>
            <ul>
              ${raw.lessons.map((l) => {
                const b = S.best[key(raw, l)];
                const vl = locL(raw, l);
                return `<li><a href="#/l/${raw.id}/${l.id}">${vl.name}</a><span>${b == null ? "—" : `${b}%`}</span>${stars(starsFor(b))}<b>${b == null ? "" : letter(b)}</b></li>`;
              }).join("")}
            </ul>
          </article>`;
        }).join("")}
      </section>
    `);
  }

  /* ---------- kids ---------- */
  function isKidImg(pic) {
    return typeof pic === "string" && (/^(\.\/)?pics\//.test(pic) || /\.(svg|png|webp|jpe?g)$/i.test(pic));
  }

  function kidPic(name, pic, o = {}) {
    if (isKidImg(pic)) {
      return `<img class="kid-img${o.tiny ? " kid-img-tiny" : ""}" src="${pic}" alt="${name}" draggable="false">`;
    }
    return `<span class="emoji" role="img" aria-label="${name}">${pic}</span>`;
  }

  function kidsEntry(set) {
    return set.id === "ocean" ? `#/kids/ocean/intro` : `#/kids/${set.id}/0`;
  }

  function kidsHome() {
    paint("kids", "#C84F2E", `
      <header class="course-head">
        <div>
          <p class="eyebrow">Kids’ corner</p>
          <h1>Look, say, listen.</h1>
          <p class="lede">Each set goes <b>A to Z</b>. Tap <b>Hear it</b> to hear the letter and name, then the real sound. Try the <b>keyboard smash</b> to get used to keys on a phone or laptop.</p>
        </div>
        <div class="kids-fox">${fox("idle")}</div>
      </header>
      <a class="kid-set keyboard-cta" href="#/keys" style="--accent:#2E4057">
        <span class="kid-set-pics keyboard-preview"><span>A</span><span>B</span><span>C</span><span>🎹</span></span>
        <strong>Keyboard smash</strong>
        <em>Like TinyFingers — press any key or tap the screen</em>
      </a>
      <section class="kid-sets">
        ${K.map((set) => `
          <a class="kid-set" href="${kidsEntry(set)}" style="--accent:${set.color}">
            <span class="kid-set-pics">${set.items.slice(0, 4).map((it) => `<span>${kidPic(it[0], it[1], { tiny: true })}</span>`).join("")}</span>
            <strong>${set.title}</strong>
            <em>${set.items.length} pictures · A–Z</em>
          </a>`).join("")}
      </section>
    `);
  }

  function kidsOceanIntro(set) {
    paint("kids", set.color, `
      <div class="kid-top">
        <a class="crumb" href="#/kids">← All sets</a>
        <p class="kid-count">${set.title}</p>
      </div>
      <section class="aquarium">
        <div class="aquarium-frame">
          <span class="aquarium-bubbles" aria-hidden="true">
            <i></i><i></i><i></i><i></i><i></i><i></i>
          </span>
          <img class="aquarium-scene" src="./pics/ocean/aquarium.svg" alt="All ocean animals swimming together" width="1000" height="560">
        </div>
        <div class="aquarium-copy">
          <h1>Ocean animals</h1>
          <p class="lede">Everyone swimming together</p>
          <a class="btn primary big" href="#/kids/ocean/0">Meet them A to Z →</a>
        </div>
      </section>
    `);
  }

  function letterOf(name) {
    const ch = String(name).replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase();
    return ch || "?";
  }

  function kidsPage(set, i) {
    const n = set.items.length;
    if (i >= n) return kidsDone(set);
    const [name, emoji, line] = set.items[i];
    const setIdx = K.indexOf(set);
    const letter = letterOf(name);
    const snd = (window.SOUNDS || {})[`${set.id}/${name}`];
    const byLetter = {};
    set.items.forEach((it, idx) => { byLetter[letterOf(it[0])] = idx; });
    paint("kids", set.color, `
      <div class="kid-top">
        <a class="crumb" href="#/kids">← All sets</a>
        <p class="kid-count">${set.title} · <b>${letter}</b> · ${i + 1} of ${n}</p>
      </div>
      <nav class="alpha-strip" aria-label="Jump to a letter">
        ${"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((L) => {
          const idx = byLetter[L];
          const on = L === letter ? "on" : "";
          return idx == null
            ? `<span class="alpha-gap">${L}</span>`
            : `<a class="alpha ${on}" href="#/kids/${set.id}/${idx}">${L}</a>`;
        }).join("")}
      </nav>
      <section class="flash" id="flash">
        <div class="flash-pic">
          <span class="letter-badge" aria-hidden="true">${letter}</span>
          ${kidPic(name, emoji)}
        </div>
        <div class="flash-copy">
          <p class="flash-letter-line"><span>Letter</span>${letter} is for ${name}</p>
          <h1 class="flash-name">${name}</h1>
          <p class="flash-letters">${name.toUpperCase().split("").map((ch) => `<span>${ch === " " ? "&nbsp;" : ch}</span>`).join("")}</p>
          <p class="flash-line"><span>${set.verb}</span>${line}</p>
          <button type="button" class="btn primary big" id="hear">Hear name & sound</button>
          ${snd ? `<p class="credit">${snd.real ? "Real recording" : "Recording"}: <a href="${snd.page}" target="_blank" rel="noopener">${snd.title}</a>, ${snd.artist}, ${snd.license}</p>` : `<p class="credit">Sound coming soon for this one.</p>`}
        </div>
      </section>
      <nav class="pager">
        <button type="button" class="btn" id="prev" ${i === 0 && set.id !== "ocean" && setIdx === 0 ? "disabled" : ""}>← Back</button>
        <div class="pager-dots">${set.items.map((_, k) => `<i class="${k === i ? "on" : k < i ? "seen" : ""}"></i>`).join("")}</div>
        <button type="button" class="btn primary" id="next">Next →</button>
      </nav>
    `);

    const wiggle = () => {
      const pic = app.querySelector(".flash-pic");
      pic.classList.remove("wiggle");
      void pic.offsetWidth;
      pic.classList.add("wiggle");
    };
    const announce = async () => {
      wiggle();
      const lineSay = `${letter} is for ${name}. ${name}.`;
      const owner = await window.NARRATION.playKid(set.id, name);
      if (!owner) await sayText(lineSay, { rate: 0.85, pitch: 1.2 });
      if (snd) {
        await new Promise((r) => window.setTimeout(r, owner ? 200 : 120));
        await playFile(snd.src);
      }
      return true;
    };
    const hearBtn = app.querySelector("#hear");
    bindHear(hearBtn, announce, "Could not play audio on this device.");
    const hear = () => hearBtn.click();
    const go = (to) => {
      if (to < 0) {
        if (set.id === "ocean") {
          hush();
          location.hash = `#/kids/ocean/intro`;
          return;
        }
        const prevSet = K[setIdx - 1];
        if (prevSet) location.hash = `#/kids/${prevSet.id}/${prevSet.items.length - 1}`;
        return;
      }
      hush();
      kidsAutoHear = to < n;
      location.hash = `#/kids/${set.id}/${to}`;
    };

    app.querySelector(".flash-pic").addEventListener("click", hear);
    if (kidsAutoHear) { kidsAutoHear = false; window.setTimeout(hear, 250); }
    app.querySelector("#next").addEventListener("click", () => go(i + 1));
    app.querySelector("#prev").addEventListener("click", () => go(i - 1));

    const flash = app.querySelector("#flash");
    let x0 = null;
    flash.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    flash.addEventListener("touchend", (e) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1);
      x0 = null;
    });
    kidsKeys = (e) => {
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
      if (e.key === " ") { e.preventDefault(); hear(); }
      const L = e.key.toUpperCase();
      if (/^[A-Z]$/.test(L) && byLetter[L] != null) {
        hush();
        kidsAutoHear = true;
        location.hash = `#/kids/${set.id}/${byLetter[L]}`;
      }
    };
  }

  function kidsDone(set) {
    const nextSet = K[K.indexOf(set) + 1];
    paint("kids", set.color, `
      <section class="result">
        <div class="result-fox">${fox("cheer loop")}</div>
        <div class="result-card">
          <p class="eyebrow">${set.title}</p>
          <h1>You named all ${set.items.length}!</h1>
          <p class="kid-done-pics">${set.items.map((it) => kidPic(it[0], it[1], { tiny: true })).join("")}</p>
          <div class="result-actions">
            ${nextSet ? `<a class="btn primary" href="${kidsEntry(nextSet)}">Next set: ${nextSet.title} →</a>` : ""}
            <a class="btn" href="${kidsEntry(set)}">Start again</a>
            <a class="btn ghost" href="#/kids">All sets</a>
          </div>
        </div>
      </section>
    `);
    sfx("win");
  }

  let kidsKeys = null;
  let kidsAutoHear = false;
  document.addEventListener("keydown", (e) => {
    if (kidsKeys && location.hash.startsWith("#/kids/")) kidsKeys(e);
    if (run && location.hash.startsWith("#/play/") && !run.locked) {
      const n = "abcd".indexOf(e.key.toLowerCase());
      if (n >= 0 && n < run.qs[run.i].choices.length) answer(n);
    }
  });

  /* ---------- router ---------- */
  function route() {
    kidsKeys = null;
    hush();
    if (window.KEYS && typeof window.KEYS.teardown === "function") window.KEYS.teardown();
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    const [view, a, b] = parts;
    const c = course(a);
    const l = lessonOf(c, b);
    if (view === "g" && c) return mapScreen(c);
    if (view === "l" && l) return lessonScreen(c, l);
    if (view === "play" && l) { startRun(c, l); return playScreen(); }
    if (view === "done" && l) return doneScreen(c, l);
    if (view === "report") return report();
    if (view === "cheat" && c) return cheatScreen(c);
    if (view === "puzzle") return puzzleScreen(a);
    if (view === "keys") {
      if (window.KEYS && window.KEYS.mount) return window.KEYS.mount(paint, fox);
      paint("kids", "#2E4057", `<a class="crumb" href="#/kids">← Kids’ corner</a><p class="lede">Keyboard smash is loading…</p>`);
      return;
    }
    if (view === "kids" && !a) return kidsHome();
    if (view === "kids") {
      const set = K.find((s) => s.id === a);
      if (set) {
        if (set.id === "ocean" && (b == null || b === "" || b === "intro")) {
          return kidsOceanIntro(set);
        }
        return kidsPage(set, Math.max(0, Number(b) || 0));
      }
    }
    return home();
  }

  window.addEventListener("hashchange", route);
  route();

  if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
})();
