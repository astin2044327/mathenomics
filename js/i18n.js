/** Mathenomics i18n — UI + course/lesson overlays. Kids’ corner stays English. */
(function () {
  const KEY_LANG = "mathenomics-lang";
  const LANG_IDS = new Set(["en", "ne", "hi", "bn", "es", "fr", "pt", "ar", "zh", "ur", "de"]);
  const LANGS = [
    { id: "en", label: "English", native: "English" },
    { id: "ne", label: "Nepali", native: "नेपाली" },
    { id: "hi", label: "Hindi", native: "हिन्दी" },
    { id: "bn", label: "Bengali", native: "বাংলা" },
    { id: "es", label: "Spanish", native: "Español" },
    { id: "fr", label: "French", native: "Français" },
    { id: "pt", label: "Portuguese", native: "Português" },
    { id: "ar", label: "Arabic", native: "العربية" },
    { id: "zh", label: "Chinese", native: "中文" },
    { id: "ur", label: "Urdu", native: "اردو" },
    { id: "de", label: "German", native: "Deutsch" }
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

      quizNote: "UI follows your language; practice questions stay in English. Phrase, steps, and Watch out translate where packs exist (Nepali, Spanish).",
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

  /* UI chrome overrides for locales without full maps; t() falls back to en for missing keys. */
  const UI_OVR = {
    hi: {
      learn: "सीखें", report: "रिपोर्ट कार्ड", kids: "बच्चों का कोना", coins: "कमाए सिक्के",
      library: "पुस्तकालय", proofMode: "प्रमाण मोड", open: "खोलें", allGrades: "सभी कक्षा",
      langLabel: "भाषा",

      quizNote: "UI आपकी भाषा में; अभ्यास प्रश्न अंग्रेज़ी। वाक्य और कदम नेपाली/स्पेनिश पैक में।",
      kidsBandTitle: "बच्चों का कोना", kidsBandLede: "तस्वीरें और आवाज़। Next दबाएँ। (केवल अंग्रेज़ी।)",
      heroLede: "गणित, एक वाक्य में। सीखें, देखें, पाँच राउंड खेलें — फिर अंक पाएँ।",
      mioHi: "नमस्ते, मैं Mio हूँ। कक्षा चुनें, मैं साथ चलूँगा।",
      hearPhrase: "वाक्य सुनें", howItWorks: "कैसे काम करता है", proofMoves: "प्रमाण के कदम", watchOut: "ध्यान रखें",
      playRounds: "{n} राउंड खेलें", leaveGame: "खेल छोड़ें", playAgain: "फिर खेलें", seeMark: "अंक देखें",
      activity: "आपकी गतिविधि", noMark: "अभी कोई अंक नहीं", gradeCheat: "कक्षा चीटशीट", theoremCheat: "प्रमेय चीटशीट", tablePuzzle: "टेबल पज़ल"
    },
    bn: {
      learn: "শিখুন", report: "রিপোর্ট কার্ড", kids: "শিশু কোণ", coins: "অর্জিত কয়েন",
      library: "লাইব্রেরি", proofMode: "প্রমাণ মোড", open: "খুলুন", allGrades: "সব শ্রেণি",
      langLabel: "ভাষা",

      quizNote: "UI আপনার ভাষায়; অনুশীলন প্রশ্ন ইংরেজিতে। বাক্য ও ধাপ নেপালি/স্প্যানিশ প্যাকে।",
      kidsBandTitle: "শিশু কোণ", kidsBandLede: "ছবি ও শব্দ। Next চাপুন। (শুধু ইংরেজি।)",
      heroLede: "গণিত, এক বাক্যে। শিখুন, দেখুন, পাঁচ রাউন্ড খেলুন — তারপর নম্বর নিন।",
      mioHi: "হ্যালো, আমি Mio। শ্রেণি বেছে নিন, আমি সঙ্গে থাকব।",
      hearPhrase: "বাক্য শুনুন", howItWorks: "কিভাবে কাজ করে", proofMoves: "প্রমাণের ধাপ", watchOut: "সাবধান",
      playRounds: "{n} রাউন্ড খেলুন", leaveGame: "খেলা ছেড়ে দিন", playAgain: "আবার খেলুন", seeMark: "নম্বর দেখুন",
      activity: "আপনার কার্যকলাপ", noMark: "এখনও নম্বর নেই", gradeCheat: "শ্রেণি চিটশিট", theoremCheat: "Theorem চিটশিট", tablePuzzle: "টেবিল পাজল"
    },
    fr: {
      learn: "Apprendre", report: "Bulletin", kids: "Coin des enfants", coins: "Pièces gagnées",
      library: "La bibliothèque", proofMode: "Mode démonstration", open: "Ouvrir", allGrades: "Tous les niveaux",
      langLabel: "Langue",

      quizNote: "Interface traduite ; questions d’entraînement en anglais. Phrase et étapes traduites si pack disponible (népalais, espagnol).",
      kidsBandTitle: "Coin des enfants", kidsBandLede: "Images et sons. Appuyez sur Next. (Anglais seulement.)",
      heroLede: "Les maths, une phrase à la fois. Apprenez, jouez cinq manches, gagnez votre note.",
      mioHi: "Bonjour, je suis Mio. Choisissez un niveau et on avance ensemble.",
      hearPhrase: "Écouter la phrase", howItWorks: "Comment ça marche", proofMoves: "Étapes de la preuve", watchOut: "Attention",
      playRounds: "Jouer {n} manches", leaveGame: "Quitter", playAgain: "Rejouer", seeMark: "Voir ma note",
      activity: "Votre activité", noMark: "Pas encore de note", gradeCheat: "Antisèche du niveau", theoremCheat: "Antisèche théorèmes", tablePuzzle: "Puzzle de tables"
    },
    pt: Object.assign({}, UI.es, {

      quizNote: "Interface traduzida; perguntas de treino em inglês. Frase e passos traduzidos onde há pacote (nepalês, espanhol)."
    }),
    ar: {
      learn: "تعلّم", report: "بطاقة التقييم", kids: "ركن الأطفال", coins: "العملات المكتسبة",
      library: "المكتبة", proofMode: "وضع البرهان", open: "افتح", allGrades: "كل الصفوف",
      langLabel: "اللغة",

      quizNote: "الواجهة مترجمة؛ أسئلة التدريب بالإنجليزية. العبارة والخطوات حيث توجد حزم.",
      kidsBandTitle: "ركن الأطفال", kidsBandLede: "صور وأصوات. اضغط Next. (إنجليزي فقط.)",
      heroLede: "الرياضيات، عبارة واحدة في كل مرة. تعلّم، العب خمس جولات، واحصل على علامتك.",
      mioHi: "مرحبًا، أنا Mio. اختر الصف وسأرافقك.",
      hearPhrase: "استمع للعبارة", howItWorks: "كيف يعمل", proofMoves: "خطوات البرهان", watchOut: "انتبه",
      playRounds: "العب {n} جولات", leaveGame: "مغادرة", playAgain: "العب مجددًا", seeMark: "اعرض علامتي",
      activity: "نشاطك", noMark: "لا علامة بعد", gradeCheat: "ملخص الصف", theoremCheat: "ملخص النظريات", tablePuzzle: "لغز الجداول"
    },
    zh: {
      learn: "学习", report: "成绩单", kids: "儿童角", coins: "获得金币",
      library: "资料库", proofMode: "证明模式", open: "打开", allGrades: "全部年级",
      langLabel: "语言",

      quizNote: "界面已翻译；练习题仍为英语。短语与步骤在已有语言包处翻译（尼泊尔语、西班牙语）。",
      kidsBandTitle: "儿童角", kidsBandLede: "看图听音。点 Next 继续。（仅英语。）",
      heroLede: "数学，一次一个短语。学习、玩五轮，然后获得成绩。",
      mioHi: "你好，我是 Mio。选一个年级，我陪你一起走。",
      hearPhrase: "听短语", howItWorks: "怎么做", proofMoves: "证明步骤", watchOut: "注意",
      playRounds: "玩 {n} 轮", leaveGame: "离开", playAgain: "再玩一次", seeMark: "查看成绩",
      activity: "你的活动", noMark: "尚无成绩", gradeCheat: "年级速查", theoremCheat: "定理速查", tablePuzzle: "乘法表谜题"
    },
    ur: {
      learn: "سیکھیں", report: "رپورٹ کارڈ", kids: "بچوں کا کونہ", coins: "حاصل شدہ سیکے",
      library: "کتب خانہ", proofMode: "ثبوت موڈ", open: "کھولیں", allGrades: "تمام جماعتیں",
      langLabel: "زبان",

      quizNote: "UI ترجمہ شدہ؛ مشق کے سوالات انگریزی۔ جملہ اور قدم جہاں پیک ہو۔",
      kidsBandTitle: "بچوں کا کونہ", kidsBandLede: "تصاویر اور آواز۔ Next دبائیں۔ (صرف انگریزی۔)",
      heroLede: "ریاضی، ایک جملہ ایک بار۔ سیکھیں، پانچ راؤنڈ کھیلیں — پھر گریڈ حاصل کریں۔",
      mioHi: "سلام، میں Mio ہوں۔ جماعت چنیں، میں ساتھ چلوں گا۔",
      hearPhrase: "جملہ سنیں", howItWorks: "کیسے کام کرتا ہے", proofMoves: "ثبوت کے مراحل", watchOut: "خبردار",
      playRounds: "{n} راؤنڈ کھیلیں", leaveGame: "چھوڑیں", playAgain: "دوبارہ کھیلیں", seeMark: "گریڈ دیکھیں",
      activity: "آپ کی سرگرمی", noMark: "ابھی گریڈ نہیں", gradeCheat: "جماعت چیٹ شیٹ", theoremCheat: "Theorem چیٹ شیٹ", tablePuzzle: "ٹیبل پہیلی"
    },
    de: {
      learn: "Lernen", report: "Zeugnis", kids: "Kinderbereich", coins: "Verdiente Münzen",
      library: "Die Bibliothek", proofMode: "Beweismodus", open: "Öffnen", allGrades: "Alle Jahrgänge",
      langLabel: "Sprache",

      quizNote: "Oberfläche übersetzt; Übungsfragen auf Englisch. Phrase und Schritte nur mit Sprachpaketen (Nepali, Spanisch).",
      kidsBandTitle: "Kinderbereich", kidsBandLede: "Bilder und Töne. Next tippen. (Nur Englisch.)",
      heroLede: "Mathe, ein Satz nach dem anderen. Lernen, fünf Runden spielen, Note holen.",
      mioHi: "Hallo, ich bin Mio. Wähle eine Stufe — ich gehe mit dir.",
      hearPhrase: "Satz anhören", howItWorks: "So funktioniert’s", proofMoves: "Beweisschritte", watchOut: "Achtung",
      playRounds: "{n} Runden spielen", leaveGame: "Spiel verlassen", playAgain: "Nochmal spielen", seeMark: "Note ansehen",
      activity: "Deine Aktivität", noMark: "Noch keine Note", gradeCheat: "Stufen-Spickzettel", theoremCheat: "Theorem-Spickzettel", tablePuzzle: "Einmaleins-Puzzle"
    }
  };

  function uiPack() {
    if (UI[lang]) return UI[lang];
    const ovr = UI_OVR[lang];
    return ovr ? Object.assign({}, UI.en, ovr) : UI.en;
  }

  function readLang() {
    try {
      const v = localStorage.getItem(KEY_LANG);
      if (LANG_IDS.has(v)) return v;
    } catch (_) { /* ignore */ }
    return "en";
  }

  let lang = readLang();

  function setLang(next) {
    if (!LANGS.some((l) => l.id === next)) next = "en";
    lang = next;
    try { localStorage.setItem(KEY_LANG, lang); } catch (_) { /* ignore */ }
    if (typeof document !== "undefined" && document.documentElement) {
      const el = document.documentElement;
      el.lang = lang;
      if (el.dataset) el.dataset.lang = lang;
    }
  }

  setLang(lang);

  function fill(str, vars) {
    if (!vars) return str;
    return String(str).replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : `{${k}}`));
  }

  function t(key, vars) {
    const pack = uiPack();
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
    },
    hi: {
      k: { grade: "K–1", title: "गिनती और तुलना", blurb: "बड़ा, छोटा, और दस के दोस्त।" },
      g1: { grade: "कक्षा 1–2", title: "स्थान मान और द से जोड़", blurb: "अंक कहाँ बैठते हैं, और दस इकाइयों से कैसे बदलते हैं।" },
      g3: { grade: "कक्षा 3–4", title: "पहाड़ा और भाग", blurb: "हर गुणन परिवार की चाल, कठिन तथ्य, और लंबा भाग।" },
      tables: { grade: "पहाड़ा", title: "पहाड़ा 2–12", blurb: "हर तालिका एक यादगार वाक्य, फिर रिक्त स्थान पज़ल।" },
      g5: { grade: "कक्षा 5–6", title: "भिन्न और क्रम", blurb: "भिन्नों के बीच का चिह्न कार्य चुनता है।" },
      g7: { grade: "कक्षा 7", title: "पूर्णांक और प्रतिशत", blurb: "धन और ऋणात्मक संख्याएँ, और 100 में से हिस्सा।" },
      optional: { grade: "वैकल्पिक · 7–12", title: "वैकल्पिक गणित", blurb: "अतिरिक्त: समुच्चय, मैट्रिक्स, सीमा, त्रिकोणमिति, सदिश।" },
      g8: { grade: "कक्षा 8", title: "त्रिभुज और कोण प्रमेय", blurb: "हर प्रमेय एक चाल। आकार पहचानें, फिर लागू करें।" },
      g9: { grade: "कक्षा 9", title: "समानता, वृत्त, द्विघात", blurb: "एक जैसा आकार, वृत्त तथ्य, द्विघात सूत्र।" },
      g10: { grade: "कक्षा 10", title: "त्रिकोणमिति और वृत्त", blurb: "sin, cos, tan और वृत्त प्रमेय।" },
      hs: { grade: "हाई स्कूल", title: "प्रमेय और प्रमाण", blurb: "SEE यादगार और प्रमेय कार्ड: कदम, अपवाद, अभ्यास।" },
      trig2: { grade: "कक्षा 11–12", title: "उन्नत त्रिकोणमिति", blurb: "रेडियन, किसी भी कोण, sine/cosine नियम, समीकरण।" },
      g11: { grade: "कक्षा 11–12", title: "कैलकुलस शुरुआत", blurb: "अवकलज और समाकल — हर एक की एक पंक्ति चाल।" },
      pabson: { grade: "कक्षा 12 · SEE", title: "PABSON / send-up और NEB कठिन", blurb: "SEE geo+trig अभ्यास और कक्षा 12 NEB कठिन सेट।" }
    },
    bn: {
      k: { grade: "K–1", title: "গণনা ও তুলনা", blurb: "বড়, ছোট, আর দশের বন্ধু।" },
      g1: { grade: "শ্রেণি ১–২", title: "স্থানমান ও পুনর্গ্রুপ", blurb: "অঙ্ক কোথায় বসে, দশ কীভাবে বদলায়।" },
      g3: { grade: "শ্রেণি ৩–৪", title: "গুণের টেবিল ও ভাগ", blurb: "প্রতি টেবিলের কৌশল, কঠিন তথ্য, দীর্ঘ ভাগ।" },
      tables: { grade: "টেবিল", title: "গুণের টেবিল ২–১২", blurb: "প্রতি টেবিলে এক মনে রাখার বাক্য, তারপর ফাঁকা বক্স পাজল।" },
      g5: { grade: "শ্রেণি ৫–৬", title: "ভগ্নাংশ ও ক্রম", blurb: "ভগ্নাংশের মাঝের চিহ্ন কাজ বেছে নেয়।" },
      g7: { grade: "শ্রেণি ৭", title: "পূর্ণসংখ্যা ও শতাংশ", blurb: "ধনাত্মক-ঋণাত্মক, আর ১০০-এর ভিতরে কত।" },
      optional: { grade: "ঐচ্ছিক · ৭–১২", title: "ঐচ্ছিক গণিত", blurb: "অতিরিক্ত: সেট, ম্যাট্রিক্স, সীমা, ত্রিকোণমিতি, ভেক্টর।" },
      g8: { grade: "শ্রেণি ৮", title: "ত্রিভুজ ও কোণ উপপাদ্য", blurb: "প্রতি উপপাদ্য এক চাল। আকৃতি চিনুন, প্রয়োগ করুন।" },
      g9: { grade: "শ্রেণি ৯", title: "সাদৃশ্য, বৃত্ত, দ্বিঘাত", blurb: "একই আকার, বৃত্তের তথ্য, দ্বিঘাত সূত্র।" },
      g10: { grade: "শ্রেণি ১০", title: "ত্রিকোণমিতি ও বৃত্ত", blurb: "sin, cos, tan ও বৃত্ত উপপাদ্য।" },
      hs: { grade: "উচ্চ বিদ্যালয়", title: "উপপাদ্য ও প্রমাণ", blurb: "SEE স্মরণকারি ও উপপাদ্য কার্ড।" },
      trig2: { grade: "শ্রেণি ১১–১২", title: "উন্নত ত্রিকোণমিতি", blurb: "রেডিয়ান, যেকোনো কোণ, sine/cosine নিয়ম।" },
      g11: { grade: "শ্রেণি ১১–১২", title: "ক্যালকুলাস শুরু", blurb: "অন্তরকলন ও সমাকল — প্রতিটির এক লাইনের কৌশল।" },
      pabson: { grade: "শ্রেণি ১২ · SEE", title: "PABSON / send-up ও NEB কঠিন", blurb: "SEE geo+trig অনুশীলন ও শ্রেণি ১২ NEB কঠিন সেট।" }
    },
    fr: {
      k: { grade: "Maternelle–CP", title: "Compter et comparer", blurb: "Plus grand, plus petit, et les amis de dix." },
      g1: { grade: "CE1–CE2", title: "Valeur de position et retenues", blurb: "Où va chaque chiffre, et comment les dizaines échangent." },
      g3: { grade: "CM1–CM2", title: "Tables et division", blurb: "Un truc par table, faits difficiles et division longue." },
      tables: { grade: "Tables", title: "Tables de 2 à 12", blurb: "Un mnémonique par table, puis puzzle à trous." },
      g5: { grade: "6e–5e", title: "Fractions et ordre", blurb: "Le signe entre les fractions choisit l’opération." },
      g7: { grade: "5e", title: "Entiers et pourcentages", blurb: "Nombres positifs et négatifs, et les centièmes." },
      optional: { grade: "Option · 7–12", title: "Maths optionnelles", blurb: "Ensembles, matrices, limites, identités trig, vecteurs." },
      g8: { grade: "4e", title: "Triangles et angles", blurb: "Chaque théorème est un mouvement. Voyez la figure." },
      g9: { grade: "3e", title: "Similitude, cercles, quadratiques", blurb: "Même forme, faits sur le cercle, formule quadratique." },
      g10: { grade: "2nde", title: "Trigonométrie et cercles", blurb: "sin, cos, tan et théorèmes du cercle." },
      hs: { grade: "Lycée", title: "Théorèmes et démonstrations", blurb: "Mnémoniques SEE et fiches théorèmes." },
      trig2: { grade: "1re–Tle", title: "Trigonométrie avancée", blurb: "Radians, tout angle, loi des sinus/cosinus, équations." },
      g11: { grade: "1re–Tle", title: "Initiation au calcul", blurb: "Dérivées et intégrales — une ligne chacune." },
      pabson: { grade: "Tle · SEE", title: "PABSON / send-up et NEB difficile", blurb: "Drills SEE geo+trig et set NEB difficile de 12e." }
    },
    pt: {
      k: { grade: "Infantil–1º", title: "Contar e comparar", blurb: "Maior, menor e os amigos do dez." },
      g1: { grade: "1º–2º", title: "Valor posicional e reagrupar", blurb: "Onde fica cada algarismo e como as dezenas trocam." },
      g3: { grade: "3º–4º", title: "Tabuada e divisão", blurb: "Um truque por tabuada, fatos difíceis e divisão longa." },
      tables: { grade: "Tabuada", title: "Tabuada do 2 ao 12", blurb: "Um mnemónico por tabuada, depois puzzle de lacunas." },
      g5: { grade: "5º–6º", title: "Frações e ordem", blurb: "O sinal entre frações escolhe a operação." },
      g7: { grade: "7º", title: "Inteiros e percentagem", blurb: "Positivos e negativos, e partes de 100." },
      optional: { grade: "Optativa · 7–12", title: "Matemática optativa", blurb: "Conjuntos, matrizes, limites, trig e vetores." },
      g8: { grade: "8º", title: "Triângulos e ângulos", blurb: "Cada teorema é um movimento. Veja a figura." },
      g9: { grade: "9º", title: "Semelhança, círculos e quadráticas", blurb: "Mesma forma, círculo e fórmula quadrática." },
      g10: { grade: "10º", title: "Trigonometria e círculos", blurb: "sen, cos, tg e teoremas do círculo." },
      hs: { grade: "Ensino médio", title: "Teoremas e demonstrações", blurb: "Mnemónicos SEE e cartões de teoremas." },
      trig2: { grade: "11º–12º", title: "Trigonometria avançada", blurb: "Radianos, qualquer ângulo, lei dos senos/cossenos." },
      g11: { grade: "11º–12º", title: "Início de cálculo", blurb: "Derivadas e integrais — um movimento por linha." },
      pabson: { grade: "12º · SEE", title: "PABSON / send-up e NEB difícil", blurb: "Drills SEE geo+trig e set NEB difícil do 12º." }
    },
    ar: {
      k: { grade: "روضة–1", title: "العدّ والمقارنة", blurb: "أكبر، أصغر، وأصدقاء العدد عشرة." },
      g1: { grade: "1–2", title: "القيمة المنزلية وإعادة التجميع", blurb: "مكان كل رقم وكيف تتبادل العشرات." },
      g3: { grade: "3–4", title: "جداول الضرب والقسمة", blurb: "حيلة لكل جدول وحقائق صعبة وقسمة مطوّلة." },
      tables: { grade: "جداول", title: "جداول 2–12", blurb: "عبارة لكل جدول ثم لغز الفراغات." },
      g5: { grade: "5–6", title: "الكسور والترتيب", blurb: "الإشارة بين الكسرين تحدد العملية." },
      g7: { grade: "7", title: "الأعداد الصحيحة والنسبة المئوية", blurb: "موجب وسالب، والجزء من 100." },
      optional: { grade: "اختياري · 7–12", title: "رياضيات اختيارية", blurb: "مجموعات، مصفوفات، نهايات، متطابقات مثلثية، متجهات." },
      g8: { grade: "8", title: "المثلثات وزوايا", blurb: "كل نظرية حركة. انظر الشكل وطبّق." },
      g9: { grade: "9", title: "التشابه والدوائر والمعادلات التربيعية", blurb: "نفس الشكل، حقائق الدائرة، صيغة تربيعية." },
      g10: { grade: "10", title: "علم المثلثات والدوائر", blurb: "sin و cos و tan ونظريات الدائرة." },
      hs: { grade: "ثانوي", title: "النظريات والبراهين", blurb: "بطاقات SEE والنظريات." },
      trig2: { grade: "11–12", title: "علم مثلثات متقدم", blurb: "راديان، أي زاوية، قانون الجيب والجيب التمام." },
      g11: { grade: "11–12", title: "مبادئ التفاضل والتكامل", blurb: "مشتقات وتكامل — حركة بسطر واحد." },
      pabson: { grade: "12 · SEE", title: "PABSON / send-up و NEB الصعب", blurb: "تمارين SEE هندسة+مثلثات ومجموعة NEB الصعبة." }
    },
    zh: {
      k: { grade: "K–1", title: "数数与比较", blurb: "更大、更小，以及凑十的朋友。" },
      g1: { grade: "1–2年级", title: "位值与进位", blurb: "数位在哪，十如何与一交换。" },
      g3: { grade: "3–4年级", title: "乘法表与除法", blurb: "每张表一个口诀，难题与长除法。" },
      tables: { grade: "乘法表", title: "2–12乘法表", blurb: "每表一句记忆语，再玩填空谜题。" },
      g5: { grade: "5–6年级", title: "分数与运算顺序", blurb: "分数之间的符号决定运算。" },
      g7: { grade: "7年级", title: "整数与百分数", blurb: "正负数，以及百分之几。" },
      optional: { grade: "选修 · 7–12", title: "选修数学", blurb: "集合、矩阵、极限、三角恒等式、向量。" },
      g8: { grade: "8年级", title: "三角形与角", blurb: "每个定理一个动作。看图再套用。" },
      g9: { grade: "9年级", title: "相似、圆与二次式", blurb: "相同形状、圆的性质、求根公式。" },
      g10: { grade: "10年级", title: "三角与圆", blurb: "sin、cos、tan 与圆定理。" },
      hs: { grade: "高中", title: "定理与证明", blurb: "SEE 口诀与定理卡片。" },
      trig2: { grade: "11–12年级", title: "高等三角", blurb: "弧度、任意角、正余弦定理、方程。" },
      g11: { grade: "11–12年级", title: "微积分入门", blurb: "导数与积分——各一句口诀。" },
      pabson: { grade: "12年级 · SEE", title: "PABSON / send-up 与 NEB 难题", blurb: "SEE 几何+三角练习与12年级 NEB 难题集。" }
    },
    ur: {
      k: { grade: "K–1", title: "گنتی اور موازنہ", blurb: "بڑا، چھوٹا، اور دس کے دوست۔" },
      g1: { grade: "جماعت 1–2", title: "مقام کی قدر اور دہائی", blurb: "ہندسہ کہاں بیٹھتا ہے، دس کیسے بدلتے ہیں۔" },
      g3: { grade: "جماعت 3–4", title: "ضرب کی میز اور تقسیم", blurb: "ہر جدول کی چال، مشکل حقائق، لمبی تقسیم۔" },
      tables: { grade: "جدول", title: "ضرب 2–12", blurb: "ہر جدول ایک جملہ، پھر خالی خانوں کا پہیلی۔" },
      g5: { grade: "جماعت 5–6", title: "کسر اور ترتیب", blurb: "کسر کے درمیان نشان عمل چنتا ہے۔" },
      g7: { grade: "جماعت 7", title: "صحیح اعداد اور فیصد", blurb: "مثبت و منفی، اور 100 میں سے حصہ۔" },
      optional: { grade: "اختیاری · 7–12", title: "اختیاری ریاضی", blurb: "مجموعے، میٹرکس، حدود، مثلثیات، ویکٹر۔" },
      g8: { grade: "جماعت 8", title: "مثلث اور زاویہ", blurb: "ہر نظریہ ایک حرکت۔ شکل دیکھیں، لگائیں۔" },
      g9: { grade: "جماعت 9", title: "مماثلت، دائرے، مربعی", blurb: "ایک جیسی شکل، دائرے کے حقائق، مربع سمسیا۔" },
      g10: { grade: "جماعت 10", title: "مثلثیات اور دائرے", blurb: "sin, cos, tan اور دائرے کے نظریات۔" },
      hs: { grade: "ہائی اسکول", title: "نظریات اور ثبوت", blurb: "SEE یادگار اور نظریہ کارڈز۔" },
      trig2: { grade: "جماعت 11–12", title: "اعلیٰ مثلثیات", blurb: "ریڈین، کوئی بھی زاویہ، sine/cosine قاعدہ۔" },
      g11: { grade: "جماعت 11–12", title: "کیلکولس شروع", blurb: "مشتق اور تکامل — ایک سطر کی چال۔" },
      pabson: { grade: "جماعت 12 · SEE", title: "PABSON / send-up اور NEB مشکل", blurb: "SEE geo+trig مشق اور جماعت 12 NEB مشکل سیٹ۔" }
    },
    de: {
      k: { grade: "K–1", title: "Zählen & vergleichen", blurb: "Größer, kleiner und die Zehnerfreunde." },
      g1: { grade: "Klasse 1–2", title: "Stellenwert & Übertrag", blurb: "Wo jede Ziffer sitzt und wie Zehner tauschen." },
      g3: { grade: "Klasse 3–4", title: "Einmaleins & Division", blurb: "Ein Trick pro Tabelle, harte Fakten, schriftliche Division." },
      tables: { grade: "Tabellen", title: "Einmaleins 2–12", blurb: "Ein Merksatz pro Tabelle, dann Lückenrätsel." },
      g5: { grade: "Klasse 5–6", title: "Brüche & Reihenfolge", blurb: "Das Zeichen zwischen Brüchen wählt die Operation." },
      g7: { grade: "Klasse 7", title: "Ganze Zahlen & Prozent", blurb: "Positiv und negativ, und Anteile von 100." },
      optional: { grade: "Optional · 7–12", title: "Wahlfach Mathe", blurb: "Mengen, Matrizen, Grenzen, Trig, Vektoren." },
      g8: { grade: "Klasse 8", title: "Dreiecke & Winkel", blurb: "Jeder Satz ist ein Zug. Figur ansehen und anwenden." },
      g9: { grade: "Klasse 9", title: "Ähnlichkeit, Kreise, Quadrate", blurb: "Gleiche Form, Kreisfakten, quadratische Formel." },
      g10: { grade: "Klasse 10", title: "Trigonometrie & Kreise", blurb: "sin, cos, tan und Kreissätze." },
      hs: { grade: "Oberstufe", title: "Sätze & Beweise", blurb: "SEE-Merksätze und Satzkarten." },
      trig2: { grade: "Klasse 11–12", title: "Fortgeschrittene Trigonometrie", blurb: "Radiant, jeder Winkel, Sinussatz, Gleichungen." },
      g11: { grade: "Klasse 11–12", title: "Analysis-Einstieg", blurb: "Ableitungen und Integrale — je eine Zeile." },
      pabson: { grade: "Klasse 12 · SEE", title: "PABSON / send-up & NEB schwer", blurb: "SEE-Geo+Trig-Drills und hartes NEB-Set in Kl. 12." }
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

  const globeIco = `<svg viewBox="0 0 20 20" class="globe-ico" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="10" cy="10" rx="3.2" ry="8" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2.5 10h15M3.2 6.2h13.6M3.2 13.8h13.6" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>`;

  function langBarHtml() {
    return `<div class="lang-menu">
      <button type="button" class="lang-drop-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${t("langLabel")}" title="${t("langLabel")}">${globeIco}</button>
      <ul class="lang-drop" role="listbox" aria-label="${t("langLabel")}" hidden>
        ${LANGS.map((L) => `<li role="presentation">
          <button type="button" class="lang-opt${lang === L.id ? " on" : ""}" data-lang="${L.id}" role="option" aria-selected="${lang === L.id}">
            <strong>${L.native}</strong><span>${L.label}</span>
          </button>
        </li>`).join("")}
      </ul>
    </div>`;
  }

  window.I18N = {
    setLang,
    t,
    locCourse,
    locLesson,
    langBarHtml,
    isTranslated() { return lang !== "en"; }
  };
})();
