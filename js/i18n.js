/** Mathenomics i18n — UI + course/lesson overlays. Kids’ corner stays English. */
(function () {
  const KEY_LANG = "mathenomics-lang";
  const LANGS = [
    { id: "en", label: "English", native: "English" },
    { id: "ne", label: "Nepali", native: "नेपाली" },
    { id: "es", label: "Spanish", native: "Español" }
  ];

  const UI = {
    en: {
      learn: "Learn",
      report: "Report card",
      kids: "Kids’ corner",
      coins: "Coins earned",
      heroLede: "Math, one phrase at a time. Learn it, see it, play five rounds — then earn your mark. Start wherever you are.",
      keepGoing: "Keep going: {name}",
      tryTables: "Try times tables",
      mioHi: "Hi, I’m Mio. Choose a grade and I’ll walk it with you.",
      library: "The library",
      proofMode: "Proof mode",
      kidsBandTitle: "Kids’ corner",
      kidsBandLede: "Pictures to name, sounds to hear. Tap Next to keep going. (English only.)",
      open: "Open",
      allGrades: "All grades",
      everyStop: "Every stop is open, so jump to the one you need.",
      hsLede: "One mnemonic per theorem, then the proof moves and the trap. Built for SEE send-up and NEB bridge — every stop is open.",
      gradeCheat: "Grade cheatsheet",
      theoremCheat: "Theorem cheatsheet",
      tablePuzzle: "Table puzzle",
      noMark: "No mark yet",
      avgMark: "{pct}% average",
      played: "{done} of {n} played",
      hearPhrase: "Hear the phrase",
      voiceHint: "Owner voice when a clip is in voices/",
      alsoSaid: "Also said as",
      howItWorks: "How it works",
      proofMoves: "Proof moves",
      watchOut: "Watch out",
      playRounds: "Play {n} rounds",
      best: "Best: {letter} · {pct}%",
      heartsHint: "{hearts} hearts · {rounds} rounds · coins for every right answer",
      nextStop: "Next stop: {name} →",
      leaveGame: "Leave game",
      roundOf: "Round {i} of {n} · {name}",
      nice: "Nice.",
      gotIt: "Got it.",
      yes: "Yes!",
      spotOn: "Spot on.",
      outOfHearts: "Out of hearts.",
      notQuite: "Not quite.",
      seeMark: "See my mark",
      nextRound: "Next round →",
      yourMark: "your mark",
      perfect: "Perfect round. Say the phrase once more and it will stick.",
      goodWork: "Good work. Play again to push your mark up.",
      tryAgain: "Read the phrase and the Watch out box, then try again.",
      newBest: " New best!",
      playAgain: "Play again",
      nextLesson: "Next: {name}",
      cheatEyebrow: "{grade} cheatsheet",
      cheatEyebrowHs: "Proof mode · cheatsheet",
      cheatTitle: "Say it. Spot the trap.",
      cheatTitleHs: "Theorems at a glance.",
      cheatLede: "Hooks and traps for this grade — tap a row when you need a quick refresh.",
      cheatLedeHs: "One line per theorem. Use it before a proof or a send-up drill.",
      langLabel: "Language",
      langHint: "Math lessons follow your language. Kids’ corner stays in English.",
      quizNote: "Practice questions stay in English for now; the phrase, steps, and Watch out are translated.",
      solveWithMe: "Solve it with me",
      stepByStep: "Step-by-step problems",
      problem: "Problem",
      answer: "Answer",
      showFirst: "Show the first step",
      nextStep: "Next step →",
      showAll: "Show all",
      hideSteps: "Hide the steps and try it alone",
      timeLearning: "time learning",
      gamesFinished: "games finished",
      tablePuzzles: "table puzzles",
      roundsAnswered: "rounds answered",
      activity: "Your activity",
      stopOf: "Stop {i} of {n}"
    },
    ne: {
      learn: "सिक्नुहोस्",
      report: "रिपोर्ट कार्ड",
      kids: "केटाकेटी कुना",
      coins: "कमाएका सिक्का",
      heroLede: "गणित, एक वाक्यमा। सिक्नुहोस्, हेर्नुहोस्, पाँच राउन्ड खेल्नुहोस् — अनि अंक पाउनुहोस्। जहाँ हुनुहुन्छ त्यहींबाट सुरु गर्नुहोस्।",
      keepGoing: "जारी राख्नुहोस्: {name}",
      tryTables: "गुणा तालिका प्रयास गर्नुहोस्",
      mioHi: "नमस्ते, म मिओ हुँ। कक्षा छान्नुहोस् — म सँगै हिँड्छु।",
      library: "पुस्तकालय",
      proofMode: "प्रमाण मोड",
      kidsBandTitle: "केटाकेटी कुना",
      kidsBandLede: "नाम भन्नका लागि तस्बिर, सुन्नका लागि आवाज। Next थिच्नुहोस्। (अङ्ग्रेजी मात्र।)",
      open: "खोल्नुहोस्",
      allGrades: "सबै कक्षा",
      everyStop: "हरेक स्टप खुला छ — चाहेको ठाउँमा जानुहोस्।",
      hsLede: "प्रत्येक प्रमेयको एक स्मरण वाक्य, प्रमाणका कदम, र पासो। SEE र NEB का लागि — हरेक स्टप खुला।",
      gradeCheat: "कक्षा चिट्सिट",
      theoremCheat: "प्रमेय चिट्सिट",
      tablePuzzle: "तालिका पजल",
      noMark: "अंक छैन",
      avgMark: "औसत {pct}%",
      played: "{n} मध्ये {done} खेलियो",
      hearPhrase: "वाक्य सुन्नुहोस्",
      voiceHint: "voices/ मा क्लिप हुँदा मालिकको आवाज",
      alsoSaid: "अर्को रूपमा",
      howItWorks: "कसरी काम गर्छ",
      proofMoves: "प्रमाणका कदम",
      watchOut: "ध्यान दिनुहोस्",
      playRounds: "{n} राउन्ड खेल्नुहोस्",
      best: "उत्तम: {letter} · {pct}%",
      heartsHint: "{hearts} मुटु · {rounds} राउन्ड · सही जवाफमा सिक्का",
      nextStop: "अर्को स्टप: {name} →",
      leaveGame: "खेल छोड्नुहोस्",
      roundOf: "राउन्ड {i}/{n} · {name}",
      nice: "राम्रो।",
      gotIt: "मिल्‍यो।",
      yes: "हो!",
      spotOn: "एकदम सही।",
      outOfHearts: "मुटु सकियो।",
      notQuite: "अलि मिलेन।",
      seeMark: "मेरो अंक हेर्नुहोस्",
      nextRound: "अर्को राउन्ड →",
      yourMark: "तपाईंको अंक",
      perfect: "उत्तम राउन्ड। वाक्य फेरि भन्नुहोस् — टाँसिन्छ।",
      goodWork: "राम्रो काम। अंक बढाउन फेरि खेल्नुहोस्।",
      tryAgain: "वाक्य र «ध्यान दिनुहोस्» पढेर फेरि प्रयास गर्नुहोस्।",
      newBest: " नयाँ उत्तम!",
      playAgain: "फेरि खेल्नुहोस्",
      nextLesson: "अर्को: {name}",
      cheatEyebrow: "{grade} चिट्सिट",
      cheatEyebrowHs: "प्रमाण मोड · चिट्सिट",
      cheatTitle: "भन्नुहोस्। पासो चिन्नुहोस्।",
      cheatTitleHs: "प्रमेय एक झलकमा।",
      cheatLede: "यस कक्षाका हुक र पासो — छिटो सम्झाउन पङ्क्ति छुनुहोस्।",
      cheatLedeHs: "प्रत्येक प्रमेय एक हरफ। प्रमाण वा send-up अघि हेर्नुहोस्।",
      langLabel: "भाषा",
      langHint: "गणितका पाठ तपाईंको भाषामा। केटाकेटी कुना अङ्ग्रेजीमै रहन्छ।",
      quizNote: "अभ्यास प्रश्न अहिले अङ्ग्रेजीमै छन्; वाक्य, कदम र ध्यान दिनुहोस् अनुवादित छन्।",
      solveWithMe: "सँगै समाधान गरौं",
      stepByStep: "चरणबद्ध समस्या",
      problem: "समस्या",
      answer: "उत्तर",
      showFirst: "पहिलो कदम देखाउनुहोस्",
      nextStep: "अर्को कदम →",
      showAll: "सबै देखाउनुहोस्",
      hideSteps: "कदम लुकाएर एक्लै प्रयास गर्नुहोस्",
      timeLearning: "सिकाइ समय",
      gamesFinished: "सकिएका खेल",
      tablePuzzles: "तालिका पजल",
      roundsAnswered: "जवाफ दिएका राउन्ड",
      activity: "तपाईंको गतिविधि",
      stopOf: "स्टप {i}/{n}"
    },
    es: {
      learn: "Aprender",
      report: "Boletín",
      kids: "Rincón infantil",
      coins: "Monedas ganadas",
      heroLede: "Mate, una frase a la vez. Apréndela, mírala, juega cinco rondas y gana tu nota. Empieza donde estés.",
      keepGoing: "Seguir: {name}",
      tryTables: "Probar las tablas",
      mioHi: "Hola, soy Mio. Elige un grado y lo recorremos juntos.",
      library: "La biblioteca",
      proofMode: "Modo demostración",
      kidsBandTitle: "Rincón infantil",
      kidsBandLede: "Imágenes para nombrar, sonidos para oír. Pulsa Next. (Solo en inglés.)",
      open: "Abrir",
      allGrades: "Todos los grados",
      everyStop: "Cada parada está abierta: salta a la que necesites.",
      hsLede: "Un mnemónico por teorema, luego los pasos de la prueba y la trampa. Para SEE y NEB — cada parada abierta.",
      gradeCheat: "Chuleta del grado",
      theoremCheat: "Chuleta de teoremas",
      tablePuzzle: "Puzzle de tablas",
      noMark: "Sin nota aún",
      avgMark: "Media {pct}%",
      played: "{done} de {n} jugados",
      hearPhrase: "Oír la frase",
      voiceHint: "Voz del dueño si hay un clip en voices/",
      alsoSaid: "También se dice",
      howItWorks: "Cómo funciona",
      proofMoves: "Pasos de la prueba",
      watchOut: "Cuidado",
      playRounds: "Jugar {n} rondas",
      best: "Mejor: {letter} · {pct}%",
      heartsHint: "{hearts} corazones · {rounds} rondas · monedas por acierto",
      nextStop: "Siguiente: {name} →",
      leaveGame: "Salir del juego",
      roundOf: "Ronda {i} de {n} · {name}",
      nice: "Bien.",
      gotIt: "¡Eso es!",
      yes: "¡Sí!",
      spotOn: "Exacto.",
      outOfHearts: "Sin corazones.",
      notQuite: "Casi.",
      seeMark: "Ver mi nota",
      nextRound: "Siguiente ronda →",
      yourMark: "tu nota",
      perfect: "Ronda perfecta. Di la frase otra vez y se queda.",
      goodWork: "Buen trabajo. Juega otra vez para subir la nota.",
      tryAgain: "Lee la frase y el aviso Cuidado, luego inténtalo otra vez.",
      newBest: " ¡Nuevo récord!",
      playAgain: "Jugar otra vez",
      nextLesson: "Siguiente: {name}",
      cheatEyebrow: "Chuleta de {grade}",
      cheatEyebrowHs: "Modo demostración · chuleta",
      cheatTitle: "Dilo. Detecta la trampa.",
      cheatTitleHs: "Teoremas de un vistazo.",
      cheatLede: "Ganchos y trampas de este grado — toca una fila para refrescar.",
      cheatLedeHs: "Una línea por teorema. Úsala antes de una prueba o un send-up.",
      langLabel: "Idioma",
      langHint: "Las lecciones de mate siguen tu idioma. El rincón infantil sigue en inglés.",
      quizNote: "Las preguntas de práctica siguen en inglés por ahora; la frase, los pasos y Cuidado están traducidos.",
      solveWithMe: "Resuélvelo conmigo",
      stepByStep: "Problemas paso a paso",
      problem: "Problema",
      answer: "Respuesta",
      showFirst: "Mostrar el primer paso",
      nextStep: "Siguiente paso →",
      showAll: "Mostrar todo",
      hideSteps: "Ocultar pasos e intentarlo solo",
      timeLearning: "tiempo aprendiendo",
      gamesFinished: "juegos terminados",
      tablePuzzles: "puzzles de tablas",
      roundsAnswered: "rondas respondidas",
      activity: "Tu actividad",
      stopOf: "Parada {i} de {n}"
    }
  };

  function readLang() {
    try {
      const v = localStorage.getItem(KEY_LANG);
      if (v === "ne" || v === "es" || v === "en") return v;
    } catch (_) { /* ignore */ }
    return "en";
  }

  let lang = readLang();

  function setLang(next) {
    if (!LANGS.some((l) => l.id === next)) next = "en";
    lang = next;
    try { localStorage.setItem(KEY_LANG, lang); } catch (_) { /* ignore */ }
    if (typeof document !== "undefined" && document.documentElement) {
      document.documentElement.lang = lang === "ne" ? "ne" : lang === "es" ? "es" : "en";
      document.documentElement.dataset.lang = lang;
    }
  }

  setLang(lang);

  function fill(str, vars) {
    if (!vars) return str;
    return String(str).replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : `{${k}}`));
  }

  function t(key, vars) {
    const pack = UI[lang] || UI.en;
    const str = pack[key] != null ? pack[key] : (UI.en[key] || key);
    return fill(str, vars);
  }

  /* Fallback course cards so the library translates even before full lesson packs load. */
  const COURSE_META = {
    ne: {
      k: { grade: "के–१", title: "गन्ती र तुलना", blurb: "ठूलो, सानो, र दश बनाउने साथीहरू।" },
      g1: { grade: "कक्षा १–२", title: "स्थानीय मान र पुनर्समूहीकरण", blurb: "अंक कहाँ बस्छ, र दशले एकसँग कसरी साट्छ।" },
      g3: { grade: "कक्षा ३–४", title: "गुणा तालिका र भाग", blurb: "हरेक गुणा परिवारको चाल, कठिन तथ्यका कविता, र लामो भाग।" },
      tables: { grade: "तालिका", title: "गुणा तालिका २–१२", blurb: "हरेक तालिकाको एक स्मरण वाक्य, अनि खाली ठाउँ भर्ने पजल।" },
      g5: { grade: "कक्षा ५–६", title: "भिन्न र क्रम", blurb: "भिन्नबीचको चिन्हले चाल छान्छ।" },
      g7: { grade: "कक्षा ७", title: "पूर्णाङ्क र प्रतिशत", blurb: "धनात्मक–ऋणात्मक संख्या, र १०० मध्ये केही।" },
      optional: { grade: "ऐच्छिक · ७–१२", title: "ऐच्छिक गणित", blurb: "थप ट्र्याक: समूह, म्याट्रिक्स, सीमा, त्रिकोणमितीय पहिचान, भेक्टर — नेपाल/CBSE शैली।" },
      g8: { grade: "कक्षा ८", title: "त्रिभुज र कोण प्रमेय", blurb: "हरेक प्रमेय एक चाल। आकार चिन्नुहोस्, अनि चाल गर्नुहोस्।" },
      g9: { grade: "कक्षा ९", title: "समानता, वृत्त र द्विघात", blurb: "उही आकार, वृत्तका तथ्य, र द्विघात सूत्र।" },
      g10: { grade: "कक्षा १०", title: "त्रिकोणमिति र वृत्त प्रमेय", blurb: "sin, cos, tan, ऐच्छिक cosec/sec/cot, र वृत्तका तथ्य।" },
      hs: { grade: "हाइ स्कूल", title: "प्रमेय र प्रमाण", blurb: "SEE send-up स्मरण र प्रमेय कार्ड: प्रमाणका कदम, अपवाद, geo + trig अभ्यास।" },
      trig2: { grade: "कक्षा ११–१२", title: "उन्नत त्रिकोणमिति", blurb: "रेडियन, जुनसुकै कोण, sine/cosine नियम, संयुक्त कोण, त्रिकोणमितीय समीकरण।" },
      g11: { grade: "कक्षा ११–१२", title: "क्यालकुलस सुरुआत", blurb: "व्युत्पन्न र समाकलन — प्रत्येकको एक हरफको चाल।" },
      pabson: { grade: "कक्षा १२ · SEE", title: "PABSON / send-up र NEB कठिन सेट", blurb: "SEE समूह geo+trig अभ्यास र कक्षा–१२ NEB कठिन सेट। SEE कार्ड पहिले; क्यालकुलस/बीजगणित पछि।" }
    },
    es: {
      k: { grade: "Infantil–1º", title: "Contar y comparar", blurb: "Más grande, más pequeño y los amigos que suman diez." },
      g1: { grade: "1º–2º", title: "Valor posicional y reagrupar", blurb: "Dónde se sienta cada cifra, y cómo los dieces cambian con las unidades." },
      g3: { grade: "3º–4º", title: "Tablas y división", blurb: "Un truco por familia de tablas, rimas de hechos difíciles y división larga." },
      tables: { grade: "Tablas", title: "Tablas del 2 al 12", blurb: "Un mnemónico por tabla, luego un puzzle para rellenar huecos." },
      g5: { grade: "5º–6º", title: "Fracciones y orden", blurb: "El signo entre las fracciones elige la operación." },
      g7: { grade: "7º", title: "Enteros y porcentaje", blurb: "Números positivos y negativos, y todo lo que es de 100." },
      optional: { grade: "Optativa · 7–12", title: "Matemáticas optativas", blurb: "Extra: conjuntos, matrices, límites, identidades trig y vectores — estilo Nepal/CBSE." },
      g8: { grade: "8º", title: "Triángulos y ángulos", blurb: "Cada teorema es un movimiento. Mira la figura y aplícalo." },
      g9: { grade: "9º", title: "Semejanza, círculos y cuadráticas", blurb: "Misma forma, hechos del círculo y la fórmula cuadrática." },
      g10: { grade: "10º", title: "Trigonometría y círculos", blurb: "sen, cos, tan, las optativas cosec/sec/cot y los hechos del círculo." },
      hs: { grade: "Secundaria", title: "Teoremas y demostraciones", blurb: "Mnemónicos SEE send-up y tarjetas de teoremas: pasos, excepciones y drills geo + trig." },
      trig2: { grade: "11º–12º", title: "Trigonometría avanzada", blurb: "Radianes, cualquier ángulo, seno/coseno, ángulos compuestos y ecuaciones trig." },
      g11: { grade: "11º–12º", title: "Inicio de cálculo", blurb: "Derivadas e integrales, cada una con su movimiento en una línea." },
      pabson: { grade: "12º · SEE", title: "PABSON / send-up y NEB duro", blurb: "Drills SEE geo+trig y el set duro NEB de 12º. Tarjetas SEE primero; cálculo/álgebra después." }
    }
  };

  function contentRoot() {
    if (lang === "en") return null;
    const packs = window.I18N_CONTENT || {};
    return packs[lang] || null;
  }

  function locCourse(c) {
    if (!c) return c;
    const meta = (COURSE_META[lang] && COURSE_META[lang][c.id]) || {};
    const root = contentRoot();
    const over = (root && root.courses && root.courses[c.id]) || {};
    return Object.assign({}, c, {
      grade: over.grade || meta.grade || c.grade,
      title: over.title || meta.title || c.title,
      blurb: over.blurb || meta.blurb || c.blurb,
      cheat: over.cheat && over.cheat.length ? over.cheat : c.cheat
    });
  }

  function locLesson(c, l) {
    if (!c || !l) return l;
    const root = contentRoot();
    const over = root && root.courses && root.courses[c.id] && root.courses[c.id].lessons && root.courses[c.id].lessons[l.id];
    if (!over) return l;
    return Object.assign({}, l, {
      name: over.name || l.name,
      phrase: over.phrase || l.phrase,
      also: over.also != null && over.also !== "" ? over.also : l.also,
      steps: over.steps && over.steps.length ? over.steps : l.steps,
      exception: over.exception || l.exception,
      tag: over.tag || l.tag
    });
  }

  function langPickerHtml() {
    return `<div class="lang-picker" role="group" aria-label="${t("langLabel")}">
      <span class="lang-label">${t("langLabel")}</span>
      <div class="lang-options">
        ${LANGS.map((L) => `<button type="button" class="lang-btn${lang === L.id ? " on" : ""}" data-lang="${L.id}" aria-pressed="${lang === L.id}">
          <strong>${L.native}</strong><em>${L.label}</em>
        </button>`).join("")}
      </div>
      <p class="lang-hint">${t("langHint")}</p>
    </div>`;
  }

  window.I18N = {
    LANGS,
    get lang() { return lang; },
    setLang,
    t,
    locCourse,
    locLesson,
    langPickerHtml,
    isTranslated() { return lang !== "en"; }
  };
})();
