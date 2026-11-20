/** Curriculum profiles — orthogonal to language (mathenomics-lang). Kids stay English. */
(function () {
  const KEY = "mathenomics-profile";
  const DEFAULT = "us";

  const PROFILES = {
    us: {
      id: "us",
      label: "United States",
      orderOps: "pemdas",
      units: "mixed",
      examTracks: [],
      courseLabels: {},
      lessonVariants: {
        "g5/pemdas": {
          also: "Also called BODMAS / BIDMAS / BEDMAS elsewhere — same levels, left to right within a rung."
        },
        "g3/longdiv": {
          also: "Dad, Mom, Sister, Brother, and Rover the dog repeats it."
        }
      },
      emphasize: ["pemdas", "tables"],
      deemphasize: []
    },
    np: {
      id: "np",
      label: "Nepal",
      orderOps: "bodmas",
      units: "metric",
      examTracks: [
        {
          id: "see",
          title: "SEE send-up week",
          items: [
            "hs/heron",
            "hs/compound",
            "g10/central",
            "g10/soh",
            "g9/semicircle",
            "g10/chord",
            "hs/hs-same-base",
            "g10/cyclic",
            "g10/heights",
            "hs/hs-combined"
          ]
        }
      ],
      courseLabels: {
        k: { grade: "Class K–1" },
        g1: { grade: "Class 1–2" },
        g3: { grade: "Class 3–4" },
        tables: { grade: "Tables · Class 3–5" },
        g5: { grade: "Class 5–6" },
        g7: { grade: "Class 7" },
        optional: { grade: "Optional · Class 7–12", blurb: "Extra track: sets, matrices, limits, trig identities, vectors — SEE/NEB style." },
        g8: { grade: "Class 8" },
        g9: { grade: "Class 9" },
        g10: { grade: "Class 10 · SEE" },
        hs: {
          grade: "SEE / NEB bridge",
          title: "Theorems & proofs",
          blurb: "SEE send-up mnemonics and theorem cards for geo + trig — then NEB bridge."
        },
        trig2: { grade: "Class 11–12 · NEB" },
        g11: { grade: "Class 11–12 · NEB" },
        pabson: {
          grade: "Class 10–12 · SEE / NEB",
          title: "PABSON / send-up & NEB hard set",
          blurb: "SEE geo+trig drills and Class 12 NEB hard set. SEE cards first; calculus/algebra later."
        }
      },
      lessonVariants: {
        "g5/pemdas": {
          name: "Order of operations (PEMDAS)",
          also: "Nepal classrooms often prefer BODMAS — same ladder: brackets/orders, then ÷×, then +− (left to right)."
        },
        "g5/bodmas": {
          name: "BODMAS",
          phrase: "BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction.",
          also: "Same order as PEMDAS — M/D and A/S are ties left-to-right."
        },
        "g5/bedmas": {
          also: "Same ladder as BODMAS / PEMDAS — E is exponents (orders)."
        },
        "g3/longdiv": {
          also: "Divide, multiply, subtract, bring down — then repeat. Formal long-division algorithm."
        }
      },
      emphasize: ["bodmas", "pabson", "hs", "hs-same-base", "hs-combined", "compound"],
      deemphasize: ["gallon", "gallon5"]
    },
    generic: {
      id: "generic",
      label: "Generic",
      orderOps: "pemdas",
      units: "metric",
      examTracks: [],
      courseLabels: {},
      lessonVariants: {},
      emphasize: [],
      deemphasize: []
    }
  };

  const IDS = Object.keys(PROFILES);
  let profileId = DEFAULT;

  function readStored() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw && PROFILES[raw]) return raw;
    } catch (_) { /* ignore */ }
    return DEFAULT;
  }

  function persist(id) {
    try { localStorage.setItem(KEY, id); } catch (_) { /* ignore */ }
  }

  profileId = readStored();

  function get() {
    return PROFILES[profileId] || PROFILES[DEFAULT];
  }

  function set(id) {
    if (!PROFILES[id]) return get();
    profileId = id;
    persist(id);
    return get();
  }

  function list() {
    return IDS.map((id) => PROFILES[id]);
  }

  /** Merge profile courseLabels onto a course (grade / title / blurb). */
  function locCourse(c) {
    if (!c) return c;
    const labels = (get().courseLabels && get().courseLabels[c.id]) || {};
    if (!labels.grade && !labels.title && !labels.blurb) return c;
    return Object.assign({}, c, {
      grade: labels.grade || c.grade,
      title: labels.title || c.title,
      blurb: labels.blurb || c.blurb
    });
  }

  /**
   * Apply phrase / also / name variants for order-ops / long-div when defined.
   * Same lesson ids — no course forks.
   */
  function lessonVariant(courseId, lessonId, lesson) {
    if (!lesson) return lesson;
    const key = `${courseId}/${lessonId}`;
    const v = get().lessonVariants && get().lessonVariants[key];
    if (!v) return lesson;
    return Object.assign({}, lesson, {
      name: v.name || lesson.name,
      phrase: v.phrase || lesson.phrase,
      also: v.also != null && v.also !== "" ? v.also : lesson.also
    });
  }

  function isEmphasized(lessonId) {
    const list = get().emphasize || [];
    return list.indexOf(lessonId) !== -1;
  }

  function isDeemphasized(lessonId) {
    const list = get().deemphasize || [];
    return list.indexOf(lessonId) !== -1;
  }

  function examTrack(id) {
    const tracks = get().examTracks || [];
    if (!tracks.length) return null;
    if (id) return tracks.find((t) => t.id === id) || null;
    return tracks[0];
  }

  function profileBarHtml() {
    const cur = get();
    return `<div class="lang-menu profile-menu">
      <button type="button" class="lang-drop-btn profile-drop-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="Curriculum" title="Curriculum">${esc(cur.id.toUpperCase())}</button>
      <ul class="lang-drop profile-drop" role="listbox" aria-label="Curriculum" hidden>
        ${list().map((p) => `<li role="presentation">
          <button type="button" class="lang-opt profile-opt${p.id === cur.id ? " on" : ""}" data-profile="${p.id}" role="option" aria-selected="${p.id === cur.id}">
            <strong>${esc(p.label)}</strong><span>${esc(p.id)}</span>
          </button>
        </li>`).join("")}
        <li class="profile-note" role="note">Language changes words; Curriculum changes grade names &amp; classroom mnemonics.</li>
      </ul>
    </div>`;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  window.MATH_PROFILES = {
    KEY,
    get,
    set,
    list,
    locCourse,
    lessonVariant,
    isEmphasized,
    isDeemphasized,
    examTrack,
    profileBarHtml,
    /** Documented merge: base → profile labels → i18n overlay. */
    MERGE: "base → profile → i18n"
  };
})();
