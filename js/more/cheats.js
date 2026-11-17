/** Per-grade cheatsheets attached to window.COURSES after lesson packs load. */
(function () {
  if (!window.MK || !window.COURSES) return;

  function attach(id, sections) {
    const c = window.COURSES.find((x) => x.id === id);
    if (!c) return;
    c.cheat = (c.cheat || []).concat(sections);
  }

  /* ---------- K–1 ---------- */
  attach("k", [
    {
      title: "Compare & count",
      rows: [
        ["Hungry alligator", "Mouth opens to the bigger number"],
        ["Same numbers", "Use = — nothing bigger to eat"],
        ["Counting on", "Big number in your head, then count on"],
        ["Skip by 2s", "2, 4, 6, 8… even parade"],
        ["Skip by 5s / 10s", "5s end in 5 or 0; 10s end in 0"]
      ]
    },
    {
      title: "Friends of ten",
      rows: [
        ["Partners of 10", "1+9, 2+8, 3+7, 4+6, 5+5"],
        ["Make a ten", "Fill to 10, then add the rest"],
        ["Teen number", "A teen is ten and some more"],
        ["Doubles", "Same + same (6+6=12)"],
        ["Near doubles", "Double the small, then +1"]
      ]
    }
  ]);

  /* ---------- Grades 1–2 ---------- */
  attach("g1", [
    {
      title: "Place value",
      rows: [
        ["The seat gives the size", "Ones right, tens next, hundreds left"],
        ["Digit ≠ value", "4 in 340 means 4 tens = 40"],
        ["Even / odd", "Last digit even → even; odd leaves one out"]
      ]
    },
    {
      title: "Regrouping",
      rows: [
        ["Carry", "Ten ones make a ten — carry next door"],
        ["Borrow rhyme", "More on the floor? Go next door, get ten more"],
        ["Hunt for a ten", "When adding three, make 10 first"]
      ]
    },
    {
      title: "Round & time",
      rows: [
        ["Round", "5 or more, raise the score; 4 or less, let it rest"],
        ["Short hand", "Hour (short word → short hand)"],
        ["Long hand", "Minute; number it points to × 5"]
      ]
    }
  ]);

  /* ---------- Grades 3–4 ---------- */
  attach("g3", [
    {
      title: "Times tables",
      rows: [
        ["Times means", "Groups of"],
        ["×2, ×4, ×8", "Double → double-double → triple double"],
        ["×5", "Fives are half of tens"],
        ["×9 finger fold", "Left = tens, right = ones"],
        ["5-6-7-8", "Fifty-six is seven times eight"],
        ["×11 (2 digits)", "Split digits; park their sum in the middle"]
      ]
    },
    {
      title: "Division & number sense",
      rows: [
        ["Long division", "Does McDonald’s Sell Burgers? (÷ × − bring down)"],
        ["Divisibility", "2/5/10: last digit; 3/9: digit sum; 4: last two"],
        ["Factors vs multiples", "Factors are few; multiples are many"],
        ["Prime", "Exactly two factors: 1 and itself"]
      ]
    },
    {
      title: "Measure",
      rows: [
        ["Perimeter", "Fence around"],
        ["Area", "Carpet inside"],
        ["Round big numbers", "Underline place; look next door"]
      ]
    }
  ]);

  /* ---------- Grades 5–6 ---------- */
  attach("g5", [
    {
      title: "Fractions",
      rows: [
        ["Add / subtract", "Same bottom, add (or take) the tops"],
        ["Multiply", "Straight across: top×top, bottom×bottom"],
        ["Divide (KCF)", "Keep, Change, Flip"],
        ["Equivalent", "What you do to the top, do to the bottom"],
        ["MAD face", "Mixed → improper: Multiply, Add, Denom stays"],
        ["N.D.D.", "Numerator ÷ Denominator → decimal"]
      ]
    },
    {
      title: "Order & decimals",
      rows: [
        ["PEMDAS", "Please Excuse My Dear Aunt Sally"],
        ["Line up the dots", "Add/subtract decimals"],
        ["× decimals", "Ignore dots, multiply, count places back"],
        ["÷ by decimal", "Hop both dots until divisor is whole"],
        ["×10 / 100 / 1000", "Each zero slides digits one place left"]
      ]
    },
    {
      title: "Ratio, stats & shapes",
      rows: [
        ["Unit rate", "Find the rate for one, then you’re done"],
        ["LCM / GCF ladder", "Left side = GCF; multiply big L = LCM"],
        ["Mean / median / mode / range", "Add÷n; middle; most; max−min"],
        ["Triangle area", "½ × base × height"],
        ["Box volume", "l × w × h (floor, then stack)"],
        ["Coordinates", "Along the corridor, up the stairs"]
      ]
    }
  ]);

  /* ---------- Grade 7 ---------- */
  attach("g7", [
    {
      title: "Integers",
      rows: [
        ["× / ÷ signs", "Friends (+): positive; strangers (−): negative"],
        ["Add integers", "Same signs: add & keep; different: subtract, keep bigger sign"],
        ["Subtract (KCC)", "Keep, Change, Change"],
        ["Solve equations", "Do the opposite to both sides"]
      ]
    },
    {
      title: "Percent & money",
      rows: [
        ["Percent of", "Hop decimal two places, then multiply"],
        ["% change", "(new − old) ÷ old × 100"],
        ["Sale / tax", "Sale: take it off; tax: put it on"],
        ["I = PRT", "Interest = Principal × Rate × Time"]
      ]
    },
    {
      title: "Chance & circle",
      rows: [
        ["Probability", "What you want ÷ all you’ve got"],
        ["Proportions", "Cross multiply (butterfly)"],
        ["Cherry pie", "C = πd"],
        ["Apple pies", "A = πr²"]
      ]
    }
  ]);

  /* ---------- Grade 8 ---------- */
  attach("g8", [
    {
      title: "Triangles & parallels",
      rows: [
        ["Angle sum", "Three corners → straight line: 180°"],
        ["Exterior angle", "Outside = two far insides"],
        ["Isosceles", "Twin sides → twin angles"],
        ["Pythagoras", "a² + b² = c² (legs → hypotenuse)"],
        ["Parallel (F, Z, C)", "F/Z copy; C (co-interior) → 180°"],
        ["Congruence", "SSS, SAS, ASA, RHS"]
      ]
    },
    {
      title: "Polygons & space",
      rows: [
        ["Quad angles", "Four corners → full turn: 360°"],
        ["Interior sum", "(n − 2) × 180°"],
        ["Exterior sum", "Always 360°"],
        ["Line / point", "On a line 180°; around a point 360°"],
        ["Cylinder / cone / sphere", "πr²h; ⅓πr²h; (4/3)πr³"],
        ["Transform", "Slide, flip, turn"]
      ]
    },
    {
      title: "Linear & exponents",
      rows: [
        ["Slope", "Rise over run"],
        ["y = mx + b", "m = slope; b = y-intercept"],
        ["Exponent laws", "× → add; ÷ → subtract; power→power multiply"],
        ["Scientific notation", "One digit, then a dot, × 10ⁿ"]
      ]
    }
  ]);

  /* ---------- Grade 9 ---------- */
  attach("g9", [
    {
      title: "Similarity & circles",
      rows: [
        ["Similar triangles", "Same angles; sides × same scale"],
        ["BPT (parallel cut)", "Cuts both sides in the same ratio"],
        ["Midsegment", "Join middles: half the base, parallel"],
        ["Semicircle", "Angle in a semicircle is 90°"],
        ["Tangent ⊥ radius", "Meets at a right angle"],
        ["Lengths / areas / volumes", "×k, ×k², ×k³"]
      ]
    },
    {
      title: "Algebra toolkit",
      rows: [
        ["FOIL", "First, Outside, Inside, Last"],
        ["Difference of squares", "a² − b² = (a − b)(a + b)"],
        ["Factor x²+bx+c", "Two numbers: product c, sum b"],
        ["Inequalities", "Flip the sign when × or ÷ by a negative"],
        ["Simultaneous", "Match a letter, add/subtract to wipe it"],
        ["Discriminant", "b²−4ac: +, 0, − → 2, 1, 0 real roots"]
      ]
    },
    {
      title: "Coordinate geometry",
      rows: [
        ["Distance", "Pythagoras on the grid"],
        ["Midpoint", "Average the coordinates"],
        ["Parallel slopes", "Same m"],
        ["Perpendicular", "Flip fraction, change sign (m₁m₂ = −1)"]
      ]
    }
  ]);

  /* ---------- Grade 10 ---------- */
  attach("g10", [
    {
      title: "Right-triangle trig",
      rows: [
        ["SOH CAH TOA", "sin opp/hyp; cos adj/hyp; tan opp/adj"],
        ["Reciprocals", "cosec↔sin, sec↔cos, cot↔tan"],
        ["ASTC", "Add Sugar To Coffee (All Sin Tan Cos +)"],
        ["Special angles", "0,1,2,3,4 → ÷4 → √ = sin; cos reverses"]
      ]
    },
    {
      title: "Circle theorems",
      rows: [
        ["Center vs rim", "Center angle = 2 × rim (same arc)"],
        ["Cyclic quad", "Opposite angles add to 180°"],
        ["Chord from center", "⊥ from center bisects the chord"],
        ["Two tangents", "From one outside point: equal lengths"],
        ["Alternate segment", "Tangent–chord angle = angle in alt. segment"],
        ["Intersecting chords", "Products of pieces equal"],
        ["Tangent–secant", "tangent² = outside × whole secant"]
      ]
    },
    {
      title: "Sequences & sectors",
      rows: [
        ["AP", "aₙ = a+(n−1)d; sum = n/2(first+last)"],
        ["GP", "aₙ = a·rⁿ⁻¹"],
        ["Sector / arc", "θ/360 of the whole circle"]
      ]
    }
  ]);

  /* ---------- Grades 11–12 calculus ---------- */
  attach("g11", [
    {
      title: "Derivatives",
      rows: [
        ["Power rule", "Bring power down; take one off the power"],
        ["Product rule", "First d-second + second d-first"],
        ["Quotient rule", "Low d-high − high d-low, over low²"],
        ["Chain rule", "Outside′(inside) × inside′"],
        ["sin / cos cycle", "sin → cos → −sin → −cos → sin"]
      ]
    },
    {
      title: "Integrals & logs",
      rows: [
        ["∫ power", "Raise power by 1, ÷ new power, + C"],
        ["∫ 1/x", "ln|x| + C (not the power rule)"],
        ["Log means", "log asks: what power?"],
        ["Log laws", "× → add; ÷ → subtract; power → front"]
      ]
    }
  ]);

  /* ---------- Advanced trigonometry (trig2) ---------- */
  attach("trig2", [
    {
      title: "Radians & any angle",
      rows: [
        ["π = 180°", "To rad ×π/180; to deg ×180/π"],
        ["Arc length", "s = rθ (θ in radians)"],
        ["Allied angles", "Odd×90° swaps sin↔cos; ASTC for sign"],
        ["Solve trig eq", "Reference angle, then ASTC places it"]
      ]
    },
    {
      title: "Triangle formulas",
      rows: [
        ["Sine rule", "a/sin A = b/sin B = c/sin C"],
        ["Cosine rule", "a² = b² + c² − 2bc cos A"],
        ["Area", "½ab sin C"],
        ["Heights", "Elevation up, depression down from flat"]
      ]
    },
    {
      title: "Identities & compounds",
      rows: [
        ["Pythagorean", "sin²+cos²=1; 1+tan²=sec²; 1+cot²=cosec²"],
        ["Complement", "sin(90°−θ)=cos θ (“co” = complement)"],
        ["sin(A±B)", "sin cos cos sin — sign stays"],
        ["cos(A±B)", "cos cos sin sin — sign swaps"],
        ["sin 2A", "2 sin A cos A"],
        ["Prove identity", "Messier side → all sin and cos"]
      ]
    }
  ]);
})();
