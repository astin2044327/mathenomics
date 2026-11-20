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
        ["Counting back", "Start big, hop back one finger per step"],
        ["Skip by 2s", "2, 4, 6, 8… even parade"],
        ["Skip by 5s / 10s", "5s end in 5 or 0; 10s end in 0"],
        ["More / fewer", "Compare: how many more? → subtract"]
      ]
    },
    {
      title: "Friends of ten",
      rows: [
        ["Partners of 10", "1+9, 2+8, 3+7, 4+6, 5+5"],
        ["Make a ten", "Fill to 10, then add the rest"],
        ["Teen number", "A teen is ten and some more"],
        ["Ten more", "Next decade: 23 + 10 = 33"],
        ["Doubles", "Same + same (6+6=12)"],
        ["Near doubles", "Double the small, then +1"],
        ["Part–whole", "Whole = part + part; find the missing part"]
      ]
    },
    {
      title: "Word clues",
      rows: [
        ["All / altogether", "Put the parts together → add"],
        ["Left / remain", "Take away → subtract"],
        ["Each / groups of", "Equal groups → multiply"],
        ["Share / split", "Fair shares → divide"]
      ]
    },
    {
      title: "Quick facts",
      rows: [
        ["Zero stays", "Adding 0 changes nothing; ×0 wipes to 0"],
        ["Same both sides", "Both addends the same? Double it"],
        ["Finger add", "Hold up fingers for small sums"],
        ["Before / after", "Before is one less; after is one more"],
        ["Estimate", "Round to a friendly ten, then adjust"]
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
        ["Expanded form", "352 = 300 + 50 + 2"],
        ["Even / odd", "Last digit even → even; odd leaves one out"]
      ]
    },
    {
      title: "Regrouping",
      rows: [
        ["Carry", "Ten ones make a ten — carry next door"],
        ["Borrow rhyme", "More on the floor? Go next door, get ten more"],
        ["Add three numbers", "Hunt for a ten first"],
        ["Compare three digits", "Start hundreds, then tens, then ones"]
      ]
    },
    {
      title: "Round, time & calendar",
      rows: [
        ["Round", "5 or more, raise the score; 4 or less, let it rest"],
        ["Short hand", "Hour (short word → short hand)"],
        ["Long hand", "Minute; number it points to × 5"],
        ["Month knuckles", "High knuckle months have 31 days"],
        ["Thirty days hath", "…April, June, November… (except February)"]
      ]
    },
    {
      title: "Facts & properties",
      rows: [
        ["Commute (+)", "3 + 5 = 5 + 3 — flip addends"],
        ["Associate", "Group any two addends first"],
        ["Distribute", "a×(b+c) = a×b + a×c"],
        ["Fact family", "3, 4, 7 → 3+4, 4+3, 7−3, 7−4"],
        ["Half of even", "Split into two equal piles"],
        ["Identity", "+0 and ×1 leave the number alone"]
      ]
    },
    {
      title: "Words & money",
      rows: [
        ["Word: add / subtract", "Match clue words to + or −"],
        ["Word: each / share", "Each → ×; share → ÷"],
        ["Mental +10", "Tens digit +1; ones stay"],
        ["Cents", "100¢ = $1; count by 25s for quarters"],
        ["Estimate", "Round to nearest ten, then compute"]
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
        ["×11 (2 digits)", "Split digits; park their sum in the middle"],
        ["×12", "×10, then add a double of the number"],
        ["Tricky rhymes", "6×6=36, 7×8=56, 8×8=64…"]
      ]
    },
    {
      title: "Division & number sense",
      rows: [
        ["Long division", "Does McDonald’s Sell Burgers? (÷ × − bring down)"],
        ["Division house", "Dividend inside; divisor outside; quotient on the roof"],
        ["Remainder", "What’s left after fair shares"],
        ["Divisibility", "2/5/10: last digit; 3/9: digit sum; 4: last two"],
        ["Factors vs multiples", "Factors are few; multiples are many"],
        ["Prime", "Exactly two factors: 1 and itself"],
        ["Zero property", "n × 0 = 0; n ÷ 1 = n"]
      ]
    },
    {
      title: "Fractions & decimals",
      rows: [
        ["Equivalent", "What you do to the top, do to the bottom"],
        ["×10 / 100 / 1000", "Each zero slides digits one place left"],
        ["Tomatoes on a fence", "Numerator on top, denominator below"]
      ]
    },
    {
      title: "Measure & order",
      rows: [
        ["Perimeter", "Fence around"],
        ["Area", "Carpet inside"],
        ["King Henry", "King Henry Died By Drinking Chocolate Milk (kilo→milli)"],
        ["Gallon land", "4 quarts = 1 gallon; 2 pints = 1 quart"],
        ["PEMDAS", "Groups → powers → ×÷ then +− (each left to right)"],
        ["GEMS / BODMAS", "Same levels as PEMDAS; ×÷ and +− each left to right"],
        ["Arrays", "Rows × columns = total tiles"],
        ["Roman i-v", "I, V, X — no IV = 4 on the clock"]
      ]
    },
    {
      title: "Properties & patterns",
      rows: [
        ["Commute / associate", "Reorder factors freely when multiplying"],
        ["Distribute", "Break one factor into friendly parts"],
        ["Mental math", "Use compatible numbers (25, 50, 100)"],
        ["Number patterns", "What changes each step? Predict next"]
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
        ["N.D.D.", "Numerator ÷ Denominator → decimal"],
        ["Simplify", "Divide top and bottom by the same GCF"],
        ["Reciprocal", "Flip the fraction for division"],
        ["Butterfly", "Cross-multiply to compare or for proportions — not to add"]
      ]
    },
    {
      title: "Order & decimals",
      rows: [
        ["PEMDAS", "Groups → powers → ×÷ L→R → +− L→R"],
        ["BODMAS / BIDMAS / BEDMAS", "Brackets, Orders/Exponents; ×÷ and +− each left to right"],
        ["GEMS order", "Group, Exponent, Multiply/Divide, Subtract/Add"],
        ["Line up the dots", "Add/subtract decimals"],
        ["× decimals", "Ignore dots, multiply, count places back"],
        ["÷ by decimal", "Hop both dots until divisor is whole"],
        ["×10 / 100 / 1000", "Each zero slides digits one place left"],
        ["Benchmark fractions", "½, ¼, ¾ compared to 1"],
        ["King Henry", "Kilo→milli ladder; “By” = base; hop decimal"]
      ]
    },
    {
      title: "Ratio, stats & shapes",
      rows: [
        ["Unit rate", "Find the rate for one, then you’re done"],
        ["LCM / GCF ladder", "Left side = GCF; multiply big L = LCM"],
        ["Mean / median / mode / range", "Add÷n; middle; most; max−min"],
        ["Butterfly (proportion)", "Cross multiply to compare or solve a proportion — not to add fractions"],
        ["Triangle area", "½ × base × height"],
        ["Box volume", "l × w × h (floor, then stack)"],
        ["Coordinates", "Along the corridor, up the stairs"]
      ]
    },
    {
      title: "Exponents & shortcuts",
      rows: [
        ["Exponents", "Repeated multiplication: 2³ = 2×2×2"],
        ["Left-to-right ×÷", "Same row, go left to right"],
        ["Cancel before multiply", "Simplify fractions first across ×"],
        ["Mental ×", "Split: 48×5 = 48×10 ÷ 2"]
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
        ["Integer ÷", "Same sign rules as multiply"],
        ["Solve equations", "Do the opposite to both sides"],
        ["Absolute value", "|−5| = 5 — distance from zero"],
        ["Order with negatives", "Farther left on the number line is smaller"]
      ]
    },
    {
      title: "Percent & money",
      rows: [
        ["Percent of", "Hop decimal two places, then multiply"],
        ["% change", "(new − old) ÷ old × 100"],
        ["Sale / discount", "Take the percent off the price"],
        ["Tax / tip", "Add the percent on top"],
        ["I = PRT", "Simple interest only: P × rate × time (rate as decimal)"],
        ["Unit rate", "Divide to price per one item"]
      ]
    },
    {
      title: "Chance & circle",
      rows: [
        ["Probability", "What you want ÷ all you’ve got"],
        ["Proportions", "Cross multiply (butterfly)"],
        ["Scale drawing", "Map distance × scale = real distance"],
        ["Cherry pie", "C = πd"],
        ["Apple pies", "A = πr²"]
      ]
    },
    {
      title: "Distance & shortcuts",
      rows: [
        ["D = rt", "Distance = rate × time; cover the letter you need"],
        ["Speed triangle", "Rate = distance ÷ time; match units"],
        ["King Henry", "Kilo→milli ladder; “By” = base; hop decimal"],
        ["Distributive", "a(b + c) = ab + ac across negatives too"],
        ["Mental +/-", "Compensation: 199 + 57 ≈ 200 + 56"],
        ["Opposite signs", "−(−3) = +3; opposites sum to 0"]
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
        ["Congruence", "SSS, SAS, ASA, RHS"],
        ["Acute / obtuse / right", "Less, more, or equal to 90°"]
      ]
    },
    {
      title: "Polygons & space",
      rows: [
        ["Quad angles", "Four corners → full turn: 360°"],
        ["Interior sum", "(n − 2) × 180°"],
        ["Exterior sum", "Always 360°"],
        ["Complements", "Two angles that add to 90° (need not touch)"],
        ["Supplements", "Two angles that add to 180°"],
        ["Vertical angles", "Across an X — equal pairs"],
        ["Line / point", "On a line 180°; around a point 360°"]
      ]
    },
    {
      title: "3-D solids",
      rows: [
        ["Cylinder", "πr²h"],
        ["Cone", "⅓πr²h"],
        ["Sphere", "(4/3)πr³"],
        ["Surface nets", "Unwrap into a net; add every face (cuboid: 2(lw+wh+hl))"],
        ["Transform", "Slide, flip, turn"]
      ]
    },
    {
      title: "Linear & exponents",
      rows: [
        ["Slope", "Rise over run"],
        ["y = mx + b", "Begin at b, then Move with m"],
        ["Exponent laws", "× → add; ÷ → subtract; power→power multiply"],
        ["Negative exponent", "a⁻ⁿ = 1/aⁿ"],
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
        ["Lengths / areas / volumes", "×k, ×k², ×k³"],
        ["Angle bisector", "Splits opposite side in ratio of the sides"]
      ]
    },
    {
      title: "Algebra toolkit",
      rows: [
        ["FOIL", "First, Outside, Inside, Last"],
        ["Difference of squares", "a² − b² = (a − b)(a + b)"],
        ["Factor x²+bx+c", "Two numbers: product c, sum b"],
        ["Zero product", "AB = 0 → A = 0 or B = 0"],
        ["Complete the square", "Half b, square it, balance both sides"],
        ["Quadratic formula", "x = (−b ± √(b²−4ac)) / 2a"],
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
        ["Perpendicular", "Flip fraction, change sign (m₁m₂ = −1)"],
        ["Proportion", "a/b = c/d → cross multiply"],
        ["Expand powers", "(ab)ⁿ = aⁿbⁿ"]
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
        ["ASTC / CAST", "ASTC from QI: All→Sin→Tan→Cos; don’t mix with CAST start"],
        ["Special angles", "0,1,2,3,4 → ÷4 → √ = sin; cos reverses"],
        ["Hand triples", "Use 3-4-5 and cousins for exact ratios"],
        ["Sine is y", "On the unit circle, sin θ = y-coordinate"],
        ["Heights", "Elevation up, depression down from horizontal"]
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
        ["Same segment", "Angles on the same arc are equal"],
        ["Intersecting chords", "Products of pieces equal"],
        ["Tangent–secant", "tangent² = outside × whole secant"]
      ]
    },
    {
      title: "Sequences & sectors",
      rows: [
        ["AP", "aₙ = a+(n−1)d; sum = n/2(first+last)"],
        ["GP", "aₙ = a·rⁿ⁻¹"],
        ["Sector / arc", "θ/360 of the whole circle"],
        ["Pythagorean identity", "sin²θ + cos²θ = 1"],
        ["Complementary trig", "sin(90°−θ) = cos θ"]
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
        ["Trig diff", "sin → cos → −sin → −cos → sin"],
        ["ln and e", "d/dx ln x = 1/x; d/dx eˣ = eˣ"]
      ]
    },
    {
      title: "Integrals & logs",
      rows: [
        ["∫ power", "Raise power by 1, ÷ new power, + C"],
        ["∫ 1/x", "ln|x| + C (not the power rule)"],
        ["LIATE", "Pick u: Log, Inverse trig, Algebraic, Trig, Exp"],
        ["u-sub", "Chain rule in reverse; change du"],
        ["Log definition", "log_b x = y ↔ bʸ = x"],
        ["Log laws", "× → add; ÷ → subtract; power → front"]
      ]
    },
    {
      title: "FTC & data",
      rows: [
        ["FTC", "∫ₐᵇ f′(x) dx = f(b) − f(a)"],
        ["Average value", "Area ÷ width"],
        ["IQR boxplot", "Q3 − Q1; outliers past 1.5×IQR"],
        ["p-value", "Chance, if H₀ were true, of data this extreme (small → surprising)"]
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
        ["Solve trig eq", "Reference angle, then ASTC places it"],
        ["Inverse trig", "sin⁻¹x answers an angle, not a ratio"]
      ]
    },
    {
      title: "Triangle formulas",
      rows: [
        ["Sine rule", "a/sin A = b/sin B = c/sin C"],
        ["Cosine rule", "a² = b² + c² − 2bc cos A"],
        ["Area", "½ab sin C"],
        ["Heights", "Elevation up, depression down from flat"],
        ["SOH CAH TOA", "Right △ only — oblique needs sine/cosine rule"]
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

  /* ---------- Times tables pack (extra rows) ---------- */
  attach("tables", [
    {
      title: "Table patterns",
      rows: [
        ["Commutative", "a × b = b × a — flip the factors"],
        ["×0 / ×1", "Zero wipes; one leaves the number"],
        ["Doubles family", "×2 ×4 ×8 all use doubling"],
        ["Check with ÷", "Product ÷ factor = other factor"],
        ["Rhyme facts", "7×8=56; 8×8=64; 12×12=144"]
      ]
    }
  ]);

  /* ---------- High School theorems (extra) ---------- */
  attach("hs", [
    {
      title: "More SEE hooks",
      rows: [
        ["Grouped data", "Mean from frequency table: Σfx ÷ Σf"],
        ["Mensuration pack", "Match solid to formula: prism, cylinder, cone, sphere"],
        ["Equal tangents", "Two tangents from one point: equal lengths"],
        ["Exterior angle", "Outside = sum of far interior angles"],
        ["Similar proof", "AA similarity: two angles match → similar"],
        ["Compound angles", "Expand with sin/cos addition formulas"],
        ["nPr", "Order matters: n! / (n−r)!"],
        ["nCr", "Order does not: n! / (r!(n−r)!)"]
      ]
    }
  ]);

  /* ---------- PABSON / NEB (extra) ---------- */
  attach("pabson", [
    {
      title: "More hard-set hooks",
      rows: [
        ["Matrix multiply", "Row × column; sizes must match"],
        ["LIATE", "Pick u: Log, Inverse trig, Algebraic, Trig, Exp"],
        ["Partial fractions", "Split one fraction into simpler pieces"],
        ["Area under curve", "Definite ∫ between bounds"],
        ["Complex i", "i² = −1; powers cycle every 4"],
        ["Statics moments", "Force × perpendicular distance"],
        ["Sequence sum", "AP: n/2(first+last); GP: a(rⁿ−1)/(r−1)"]
      ]
    }
  ]);

  /* ---------- Optional track (extra) ---------- */
  attach("optional", [
    {
      title: "Matrices, limits & vectors",
      rows: [
        ["Matrix add", "Same size; add matching entries"],
        ["Matrix multiply", "Row × column; inner sizes must match"],
        ["Scalar × matrix", "Multiply every entry by the scalar"],
        ["Limit laws", "Sum/product of limits when they exist"],
        ["tan = sin/cos", "Quotient identity for tangent"],
        ["Unit vector", "Divide by length: v/|v|"],
        ["Dot gives angle", "cos θ = a·b / (|a||b|)"]
      ]
    }
  ]);
})();