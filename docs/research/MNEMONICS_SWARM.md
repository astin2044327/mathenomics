# MNEMONICS_SWARM — K–12 / SEE textbook scope

Research harvest for mnemonic ingestion. **Do not treat jingles as proofs.** Cross-check `docs/research/VALIDATION_NOTES.md` and `mnemonics.json` (132 validated entries) before shipping phrases.

**Path:** `docs/research/MNEMONICS_SWARM.md`  
**Total mnemonic rows:** **181** (validated `mnemonics.json` corpus + supplemental classics; rejected spellings/stat jingles excluded — see bottom).

### Top gaps vs app (`js/more/cheats.js` + lesson phrases)

1. **NEB / 11–12 advanced** — matrices, complex numbers, binomial theorem, partial fractions, L'Hôpital, LIATE, limits: mostly in `pabson.js`, absent from grade `cheats.js`.
2. **Measurement & conversion** — King Henry (metric), Roman numerals, surface area nets, calendar months (knuckles rhyme): researched but not in cheats or core lessons.
3. **Properties & vocabulary** — commutative/associative/distributive named mnemonics; dividend/divisor house layout; GEMS/BODMAS variants beside PEMDAS.
4. **Statistics depth** — standard deviation, correlation/causation, quartiles/deciles: no reliable jingles; cheats stop at mean/median/mode/range.
5. **Probability & counting** — nPr vs nCr, inclusion–exclusion, tree-rule “multiply along branch”: partial in HS/PABSON, not in K–10 cheats.

## Row legend

| Column | Meaning |
| --- | --- |
| phrase | What the student says |
| meaning | What it encodes |
| topic | Curriculum bucket |
| source-ish | Common classroom / standard reference |
| risk notes | Wrong exceptions and overgeneralization |

## K–2

| phrase | meaning | topic | source-ish | risk notes |
| --- | --- | --- | --- | --- |
| The hungry alligator eats the bigger number. | Draw < or > as an open mouth.; Point the open side at the greater number. | Comparing numbers | Online Math Learning — classic K comparison mnemonic | Fails if students confuse left/right facing without comparing values first. |
| Put the big number in your head, then count on. | Identify the larger addend.; Count forward the smaller amount. | Addition | Common early-grades strategy phrase | Inefficient for large addends; may encourage counting by ones forever. |
| Make a ten, then add the rest. | Split one addend to complete a ten.; Add the leftover. | Addition | Standard early-arithmetic classroom phrase | Needs solid number-bond fluency. |
| Doubles plus one: double the small number, then add one more. | Recognize n+(n+1).; Double n, then add 1. | Near doubles | Common grade 1–2 fact strategy | Students sometimes double the larger number instead. |
| Even numbers share fair: everyone gets a buddy. Odd numbers leave one out. | Pair objects.; Even: no leftover; odd: one leftover. | Even and odd | Classroom pairing metaphor | Confuses with divisible-by-2 for large numbers if pairing is skipped. |
| Five or more, raise the score. Four or less, let it rest. | Underline the place.; Look next door.; 5–9 round up; 0–4 stay. | Rounding | LivePhysics classroom rounding rhyme | Banker's rounding / half-even not taught; nines carry can confuse. |
| Hour is a short word: short hand. Minute is a long word: long hand. | Short hand = hours.; Long hand = minutes. | Telling time | Common primary clock mnemonic | Digital clocks and 24-hour time break the metaphor. |
| More on top? No need to stop. More on the floor? Go next door and get ten more. | Compare digits in a place.; If bottom larger, borrow ten from next place. | Subtraction with regrouping | Widely used regrouping rhyme | Doesn't address zeros in the middle (cascading borrows). |
| Ten ones make a ten. Carry the one next door. | Add ones.; If 10+, write ones digit and carry a ten. | Addition with regrouping | Standard place-value carry phrase | Students carry without writing the ones digit. |
| Knuckles are 31-day months; dents between are shorter. | Fist knuckles = 31 days.; Valleys = 30 (Feb 28/29). | Calendar | Ian Gibbs / Online Math Learning calendar mnemonics | Leap year February; must skip thumb and continue to other hand correctly. |
| Thirty days hath September, April, June, and November. | List 30-day months from the rhyme.; All others 31 except February. | Calendar | Traditional English calendar rhyme | Leap year exception for February. |
| Zero is a placeholder | 0 holds a place so other digits keep their size | Place value / zero | Common primary classroom | 0 alone is not 'nothing' in 205 — it marks no tens |
| Left is less on the number line | Numbers increase as you move right | Number line order | Standard K–2 number line teaching | Negative numbers reverse the metaphor on the left of zero |
| Same order either way | You can add or multiply in any order (commutative) | Commutative property | Elementary properties of operations | Subtraction and division are not commutative |
| Adding zero changes nothing | n + 0 = n (additive identity) | Identity property | Common grades 1–2 | Students may think 0 + 0 = nothing |
| Roman I View X | I=1, V=5, X=10 (then L, C, D, M) | Roman numerals | Online Math Learning / primary supplements | Subtractive notation (IV not IIII) needs extra rules |
| One and one less (add 9) | For single-digit +9: tens +1, ones one less | Mental math +9 | Classic elementary trick (Synonym/classroom) | Breaks for two-digit addends without regrouping care |
| Split the ten frame | Use five-and-five structure to see 5+3=8 | Number bonds / five-frames | Singapore / CGI fact strategies | Not all sums use a ten; over-relies on 5-anchor |
| Subtraction is the opposite of addition | Same fact family: 8−3=5 ↔ 3+5=8 | Fact families | Everyday Math / standard K–2 | Does not replace place-value subtraction algorithm |

## 3–4

| phrase | meaning | topic | source-ish | risk notes |
| --- | --- | --- | --- | --- |
| Times means groups of. | Read a×b as a groups of b.; Draw arrays if needed. | Multiplication meaning | Elementary multiplication language | Order language can confuse commutative property. |
| Fold the finger for ×9. Left fingers are tens; right are ones. | Number fingers 1–10.; Fold the nth finger.; Left count = tens; right = ones. | Times tables | Classic finger ×9 trick | Only for 1–10 × 9; multi-digit needs place value. |
| Five, six, seven, eight: fifty-six is seven times eight. | Say the rhyme.; Recall 7×8=56. | Times tables | Common hard-fact rhyme | Only helps one fact. |
| Does McDonald's Sell Cheese Burgers? | Divide; Multiply; Subtract; Bring down; Repeat or remainder | Long division | Online Math Learning / Memory Joggers long-division family mnemonic | Omits 'compare' step; cheese/compare variants differ; doesn't build place-value sense. |
| 2-5-10 End, 3-9 Sum, 4-8 Back, 11 Alternate. | 2/5/10: last digit.; 3/9: digit sum.; 4/8: last 2/3 digits.; 11: alternating sum. | Divisibility | Compact divisibility mnemonic used in test-prep/teacher materials | Rule for 7 is omitted; 6 needs both 2 and 3. |
| Perimeter is the fence around. Area is the carpet inside. | Fence → add sides.; Carpet → cover with unit squares. | Area vs perimeter | Standard geometry distinction metaphor | Students still swap formulas under time pressure. |
| What you do to the top, you do to the bottom. | Multiply/divide numerator.; Do the same to denominator. | Equivalent fractions | Common fraction equivalence phrase | Does not apply to adding fractions; students may 'do the same' when adding. |
| Fives are half of tens — and they end in 0 or 5. | Find ×10, then half.; Or count 5,10,15… | Times tables | Elementary multiples of 5 | Half-of-tens fails for odd multiples if students forget halves. |
| ×2 is double. ×4 is double-double. ×8 is double-double-double. | Double once for ×2.; Double again for ×4/×8. | Times tables | Common doubling strategy | Error compounds with each double. |
| For ×11: split the digits and park their sum in the middle. | Write first digit.; Write digit sum in middle (carry if ≥10).; Write last digit. | Times tables | Popular ×11 digit trick | Two-digit ×11 needs carry handling. |
| I View X-rays: I=1, V=5, X=10. | Map letters to values.; Subtract when smaller precedes larger. | Roman numerals | Online Math Learning Roman numeral phrases | Subtractive notation (IV, XL) still trips students. |
| Commutative: the commute is the same either direction. | a+b=b+a; a×b=b×a | Properties | Online Math Learning property metaphor | Does not apply to subtraction/division. |
| Associative: associate means group up. | (a+b)+c = a+(b+c) | Properties | Online Math Learning | Not for subtraction/division. |
| Distributive: give what's outside to everyone inside. | a(b+c)=ab+ac | Properties | Online Math Learning | Forgetting to distribute to every term. |
| The dividend is at the end; the quotient is the result. | dividend ÷ divisor = quotient | Division vocabulary | Online Math Learning / Memory Joggers | House diagram orientation varies by curriculum. |
| King Henry Died By Drinking Chocolate Milk | Metric prefixes: kilo, hecto, deka, base, deci, centi, milli | Metric conversion | US classroom classic | Mega/micro/nano off ladder; 'By' is the base unit |
| Dividend goes inside the house | Dividend ÷ divisor = quotient (remainder optional) | Division vocabulary | Long-division pedagogy | Layout variants; remainder ≠ quotient |
| Rows × columns | An array’s total is rows times columns of unit squares | Multiplication / arrays | CCSS / classroom | Rotating the array swaps factors — same product |
| Square number: same × same | 1×1, 2×2, 3×3… make perfect squares | Square numbers | Primary number sense | Confuses with squaring in algebra later |
| Rectangle area: length × width | Cover with unit squares in rows | Mensuration | Grades 3–4 measurement | Must use perpendicular sides; not slant height |
| Perimeter: add all the sides | Fence distance around a polygon | Mensuration | Standard elementary | Students add only two dimensions on rectangles |
| Associative: group the friendly pair | (a+b)+c = a+(b+c) for addition | Associative property | Elementary properties | Not for subtraction without parentheses care |
| BODMAS (UK / Nepal texts) | Brackets, Orders, Division/Multiplication, Addition/Subtraction | Order of operations | International textbooks | × and ÷ same level L→R; not division before multiplication |
| DMSB / DMSBR | Divide, Multiply, Subtract, Bring down, Repeat | Long division steps | Synonym / UK variants | Compare remainder to divisor; place value critical |

## 5–6

| phrase | meaning | topic | source-ish | risk notes |
| --- | --- | --- | --- | --- |
| Please Excuse My Dear Aunt Sally. | Parentheses; Exponents; Multiply/Divide L→R; Add/Subtract L→R | Order of operations | Math Is Fun / Mathnasium / Online Math Learning | Students do all M before D (or A before S); PEMDAS letter order misleads. |
| BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction. | Brackets; Orders/indices; ÷ and × L→R; + and − L→R | Order of operations | UK/Commonwealth classroom acronym | Same left-to-right trap as PEMDAS; D before M myth. |
| BEDMAS: Brackets, Exponents, Division/Multiplication, Addition/Subtraction. | Brackets; Exponents; ÷/× L→R; +/− L→R | Order of operations | Canadian classroom variant | Same M/D left-to-right misconception. |
| GEMS: Grouping, Exponents, Multiply/Divide, Subtract/Add. | Grouping symbols; Exponents; ×÷ together; +− together | Order of operations | Math Is Fun alternative to PEMDAS | Still needs left-to-right within levels. |
| Keep, Change, Flip. | Keep first fraction; Change ÷ to ×; Flip (reciprocal) second; Multiply | Dividing fractions | Memory Joggers / Online Math Learning KCF | Doesn't explain why; students flip the first fraction; mixed numbers need conversion first. |
| Same bottom, add the tops. | Need common denominator.; Add numerators.; Keep denominator. | Adding fractions | Pre-algebra fraction rule | Students add denominators too. |
| Straight across: tops times tops, bottoms times bottoms. | Multiply numerators.; Multiply denominators.; Simplify. | Multiplying fractions | Standard multiply-fractions phrase | Students seek common denominators unnecessarily. |
| Numerator up, denominator down. | N = top.; D = bottom. | Fraction vocabulary | Online Math Learning fraction part names | Doesn't help with improper vs mixed. |
| MAD face: Multiply, Add, Denominator stays. | Whole × denominator; Add numerator; Keep denominator | Mixed to improper | Classroom MAD acronym | Students multiply by numerator instead. |
| Line up the dots. | Align decimal points.; Add/subtract place by place. | Decimal operations | Standard decimal addition tip | Students right-align like whole numbers. |
| Ignore the dots, multiply, then count the places back in. | Multiply as whole numbers.; Count decimal places in factors.; Place point in product. | Decimal multiplication | Common decimal × algorithm phrase | Trailing zeros and place-count errors. |
| Make the divisor whole: hop both dots the same number of places. | Move divisor decimal to end.; Move dividend the same.; Divide. | Decimal division | Standard decimal ÷ tip | Unequal hops; remainder place value. |
| King Henry Died By Drinking Chocolate Milk. | Kilo Hecto Deca Base Deci Centi Milli; Move decimal by steps between units. | Metric prefixes | LivePhysics / Online Math Learning metric ladder | Skipping 'By/Base'; mega/micro not included. |
| Hey diddle diddle, the median's the middle; you add and divide for the mean. The mode is the most, and the range is the difference between. | Mean: average; Median: middle after sorting; Mode: most frequent; Range: max−min | Measures of center | Online Math Learning rhyme / Lesser statistics mnemonics | Even-count median needs average of two middles; multimodal data. |
| Mode and most share the first two letters. | Find the value that appears most. | Mode | Lesser / Online Math Learning | No mode or multiple modes. |
| The median splits the data down the middle, like a median strip in a road. | Sort data.; Pick middle value. | Median | Online Math Learning visual metaphor | Even n requires averaging two middles. |
| My friend's enemy is my enemy; my enemy's enemy is my friend. | +×+ = +; +×− = −; −×− = + | Multiplying signed numbers | Online Math Learning friendship analogy | Students over-apply to addition of signed numbers. |
| Along the corridor, up the stairs. | Move x (horizontal) first.; Then y (vertical). | Coordinate plane | Common coordinate mnemonic | Students swap x/y under pressure. |
| Cover the floor, then stack the floors: length × width × height. | Area of base.; Times height. | Rectangular prism volume | MemoryTricks / standard volume language | Using slant height; unit cubes vs formula disconnect. |
| A triangle is half the box: base × height ÷ 2. | Identify base and perpendicular height.; Compute (1/2)bh. | Triangle area | Standard triangle-area metaphor | Using a non-perpendicular side as height. |
| GEMS | Grouping, Exponents, Multiply/Divide, Subtract/Add | Order of operations | VALIDATION_NOTES high-value | Same ×/÷ and +/− precedence caveats as PEMDAS |
| Percent: per hundred | Move decimal two places; % means /100 | Percent | Grades 5–6 | 10% of 10% is 1%; percent change uses old as base |
| Point moves: percent ↔ decimal | Remove % and ÷100; or shift decimal left twice | Percent ↔ decimal | Classroom | 100% = 1; increase vs of confusion |
| Improper from mixed: MAD reversed | Divide top by bottom for whole; remainder/new bottom | Mixed ↔ improper | Complement to MAD face | MAD is mixed→improper; don't reverse steps |
| Probability: favorable over total | P = wanted outcomes ÷ sample space (if equally likely) | Probability intro | Grades 5–6 | Not for unequal likelihood without weighting |
| Quadrilateral family song | Square, rectangle, rhombus, parallelogram, trapezoid, kite | Shape classification | Elementary geometry | Hierarchy: square is also rectangle/rhombus |
| Volume: cubic units | Volume counts 3D blocks — units are cubed | Volume concept | Grades 5–6 | Confuses with area units² |
| Standard form vs expanded | Digits show value in each place | Place value / notation | Textbook | Scientific 'standard form' means different in UK |
| Rate = distance ÷ time | d = rt rearranged; dirt | Motion / rates | VALIDATION implement | Unit consistency; average of speeds trap |
| Hey diddle diddle (stats) | Median middle; mean average; mode most; range spread | Statistics | Classic poem / app lesson | Even n: median is mean of two middles |

## 7–8

| phrase | meaning | topic | source-ish | risk notes |
| --- | --- | --- | --- | --- |
| Friends are positive. Strangers are negative. | Same sign → friends → positive product.; Different → strangers → negative. | Integer signs | Classroom integer-sign metaphor | Metaphor stretched for addition/subtraction. |
| Same signs: add and keep. Different signs: subtract and keep the bigger one's sign. | Compare signs.; Same → add absolute values.; Different → subtract; keep larger magnitude's sign. | Integer addition | Standard integer rules | 'Bigger' means absolute value, not algebraically larger. |
| Keep, Change, Change. | Keep first number; Change − to +; Change sign of second; Add | Integer subtraction | Common integer-subtraction slogan | Confused with Keep-Change-Flip for fractions. |
| Per cent means out of 100. Hop the decimal two places. | % → decimal: two places left.; Decimal → %: two places right. | Percents | Standard percent language | Percent of percent; relative vs absolute change. |
| I = PRT — I am pretty. | Identify P, R, T.; Multiply. | Simple interest | Online Math Learning algebra mnemonics | Rate must match time unit; compound interest different. |
| d = rt — remember dirt. | Distance = rate × time. | Distance formula | Online Math Learning | Average vs instantaneous rate; unit consistency. |
| Cover up what you want in the D-S-T triangle. | Cover D → S×T; Cover S → D/T; Cover T → D/S | Speed distance time | Online Math Learning formula triangle | Triangle doesn't teach units or average speed pitfalls. |
| Do the opposite to both sides. | Undo with inverse ops.; Keep equation balanced. | Solving equations | Algebra one-step equation song theme | Forgetting to apply to every term; inequality flip omitted. |
| Cherry pie's delicious: C = πd. Apple pies are too: A = πr². | Circumference uses diameter.; Area uses radius squared. | Circle formulas | Online Math Learning / Lesser pi jingles | Using r with C=πd or d with A=πr²; diameter vs radius mix-ups. |
| Apple pies are square: A = π r². | Square the radius.; Multiply by π. | Circle area | Online Math Learning | 'Square' confuses with geometric square shape. |
| What you want, over all you've got. | Favorable / total equally likely outcomes. | Probability | Standard intro probability phrase | Assumes equally likely; compound events need care. |
| Cross multiply: the butterfly method. | a/b = c/d → ad = bc; Solve. | Proportions | Common proportion visual | Used incorrectly on non-proportions; sign errors. |
| New minus old, over old, times 100. | Compute difference.; Divide by original.; ×100. | Percent change | Standard percent-change formula phrase | Using new as denominator; successive percent changes. |
| Sale? Take it off. Tax? Put it on. | Discount: subtract percent of price.; Tax: add percent of price. | Percent applications | Classroom consumer-math tip | Sale-then-tax vs tax-then-sale order; successive discounts. |
| Slope is rise over run. | Vertical change / horizontal change.; m = (y2−y1)/(x2−x1) | Slope | Universal slope phrase | Run zero (undefined); sign of rise/run; counting graph squares wrong. |
| y = mx + b: Begin at b, then Move with m. | Plot y-intercept b.; Use slope m as rise/run. | Slope-intercept form | Online Math Learning Begin/Move | Positive/negative slope direction; confusing b with x-intercept. |
| Multiply → add powers. Divide → subtract. Power of a power → multiply. | a^m·a^n = a^(m+n); a^m/a^n = a^(m−n); (a^m)^n = a^(mn) | Exponent laws | Online Math Learning exponent song themes | Different bases; negative exponents forgotten. |
| Negative exponent: take one over with a positive power. | a^(−n) = 1/a^n | Negative exponents | Online Math Learning | Applying to the wrong factor; (−2)^(−3) sign errors. |
| One digit, then a dot, times a power of ten. | Move decimal to make 1≤\|m\|<10.; Count moves for exponent. | Scientific notation | Standard sci-notation phrase | Wrong exponent sign when moving left vs right. |
| Square the legs, add them, and that is the long side squared. | Identify hypotenuse (longest, opposite right angle).; a²+b²=c² | Pythagorean theorem | Standard Pythagoras phrasing | Using a non-hypotenuse as c; converse misuse. |
| Three corners make a straight line: 180°. | Interior angles of a triangle sum to 180°. | Triangle angle sum | Geometry angle-property songs | Spherical geometry; exterior vs interior confusion. |
| Four corners make a full turn: 360°. | Interior angles of a quadrilateral sum to 360°. | Quadrilateral angles | Standard polygon angle fact | Concave quads / complex polygons. |
| F angles copy, Z angles copy, C angles make 180°. | Identify transversal pattern.; Apply F/Z/C rules. | Parallel lines | UK-style parallel-line letter mnemonics | Mis-drawing F/Z/C on slanted diagrams. |
| Twin sides, twin angles. | Equal sides → equal base angles. | Isosceles triangle | Chloe Campbell Education / Online Math Learning | Assuming vertex angle also equal. |
| Complementary = Corner (90°). Supplementary = Straight (180°). | Comp → 90; Supp → 180 | Complementary & supplementary | Online Math Learning | Angles need not be adjacent; students require shared ray wrongly. |
| Acute is a 'cute' little angle (less than 90°). | Acute < 90; Right = 90; Obtuse > 90 and < 180 | Angle types | Teacher blog triangle/angle classification tricks | Obtuse vs reflex confusion. |
| Scalene is the odd one out: no equal sides. | Equilateral: 3 equal; Isosceles: 2 equal; Scalene: 0 equal | Triangle types | Chloe Campbell Education | Mixing side and angle classification names. |
| Slide, flip, or turn: translation, reflection, rotation. | Slide=translate; Flip=reflect; Turn=rotate | Transformations | Standard transformation language | Orientation/congruence after composition; glide reflections. |
| Cut the polygon into triangles: (n − 2) × 180°. | n sides → n−2 triangles.; Times 180°. | Polygon interiors | Standard polygon interior sum | Using exterior formula by mistake; regular vs irregular. |
| Walk around the shape: exterior angles always add to 360°. | One exterior per vertex.; Sum = 360°. | Polygon exteriors | Standard exterior-angle walk | Wrong exterior (adjacent interior) choice; concave polygons. |
| A cone is one-third of the cylinder with the same base and height. | V = (1/3)πr²h | Cone volume | MemoryTricks solids | Using slant height as h. |
| Cylinder volume is the circle floor times the height: πr²h. | Base area πr²; Times height | Cylinder volume | MemoryTricks | Surface area formula mix-up. |
| Sphere volume: (4/3)πr³. | Cube the radius.; Times 4/3 π. | Sphere volume | MemoryTricks | Confusing with surface area 4πr². |
| Same size and shape: SSS, SAS, ASA, RHS. | Match a valid congruence criterion. | Triangle congruence | Standard congruence criteria list | SSA is not generally valid (ambiguous case). |
| Absolute value: distance from zero | \|x\| ≥ 0; ignore the sign | Integers | Grade 7 | Not the same as 'make positive' in every expression |
| Distributive: multiply the rain | a(b+c) = ab + ac | Algebra | Middle school | Watch sign on each term |
| Like terms: same letter same power | Combine coefficients only | Algebra | Grade 7–8 | ab and ba are like; ab and ab² are not |
| Flip the sign on negative multiply/divide | Inequality direction reverses | Inequalities | Grade 8 algebra | Only when multiplying/dividing by negative |
| Surface area: wrap the net | Sum areas of all faces | Mensuration | Grade 8 | Different nets for same solid; curved surfaces need formulas |
| Hypotenuse only in right triangle | Longest side opposite right angle | Pythagoras | Grade 8 | Converse needed to prove right angle |
| CAST (from Q4) | Cos positive in Q4, then A, S, T counterclockwise | Trig signs | UK / alternative to ASTC | Do not mix start corner with ASTC |
| Rhombus: diagonals ⊥ bisect | Diagonals cross at right angles and halve each other | Quadrilaterals | Grade 8 geometry | Kite has one perpendicular diagonal pair |
| Percent change base is original | (new−old)/old × 100 | Percent | Grade 7 app lesson | Decrease uses same old base |
| Simple vs compound interest | I=PRT simple; compound repeats on balance | Financial math | Grade 7 / SEE | Rate period must match time units |
| Exponent zero rule: one | a⁰ = 1 (a≠0) | Exponents | Grade 8 | 0⁰ undefined in rigorous courses |
| Negative exponent: one over | a⁻ⁿ = 1/aⁿ | Exponents | VALIDATION implement | Not for a=0 |

## 9–10

| phrase | meaning | topic | source-ish | risk notes |
| --- | --- | --- | --- | --- |
| FOIL: First, Outside, Inside, Last. | First terms; Outside; Inside; Last; Combine like terms | Binomial multiplication | Online Math Learning / Mathematricks | Only for two binomials; misses general distribution; sign errors on negatives. |
| x equals negative b, plus or minus the square root of b squared minus four a c, all over two a. | Write ax²+bx+c=0; x = (−b±√(b²−4ac))/(2a) | Quadratic formula | Online Math Learning Pop Goes the Weasel song (paraphrased) | Sign of −b; forgetting ±; discriminant negative; dividing only part by 2a. |
| a² − b² = (a − b)(a + b). | Recognize perfect squares.; Write conjugate factors. | Factoring | Standard algebra identity | Trying a²+b² the same way. |
| Find two numbers that multiply to c and add to b. | For x²+bx+c; Find p,q with pq=c, p+q=b; (x+p)(x+q) | Factoring trinomials | Standard factoring tip | Fails when a≠1 without AC method; sign errors. |
| Solve like an equation — but flip the sign when you multiply or divide by a negative. | Isolate variable.; Flip inequality if ×/÷ by negative. | Inequalities | Standard inequality rule | Forgetting flip; flipping when subtracting negatives. |
| Parallel: same slope. Perpendicular: flip the fraction and change the sign. | m_parallel = m; m_perp = −1/m | Parallel & perpendicular slopes | Standard slope relationship | Horizontal/vertical special cases; forgetting the sign change. |
| b² − 4ac: positive two, zero one, negative none (real roots). | Compute Δ; Δ>0 two real; Δ=0 one real; Δ<0 none real | Discriminant | SAT/classroom discriminant summary | Complex roots still exist when Δ<0; multiplicity language. |
| STAR: Search, Translate, Answer, Review. | Search the problem; Translate to equation; Answer; Review | Word problems | Online Math Learning STAR strategy | Overly generic; doesn't ensure correct model. |
| SOH CAH TOA. | sin = opp/hyp; cos = adj/hyp; tan = opp/adj | Trig ratios | Online Math Learning / MathWorld / teacher lesson | Wrong opposite/adjacent relative to reference angle. |
| Oscar Had A Heap Of Apples. | O/H = sin; A/H = cos; O/A = tan | Trig ratios | Wolfram MathWorld alternate phrases | Phrase order must match sin/cos/tan. |
| All Students Take Calculus. | Q1 All +; Q2 Sin +; Q3 Tan +; Q4 Cos + | Trig signs by quadrant | Online Math Learning / teacher blog | CAST starts in Q4 and reverses letter order; reciprocal functions follow co-function's sign. |
| CAST rule (starting from Quadrant IV going counterclockwise): Cos, All, Sin, Tan positive. | Q4 Cos; Q1 All; Q2 Sin; Q3 Tan | Trig signs by quadrant | Online Math Learning / Brock University notes | Students mix CAST with ASTC starting corner. |
| Cosec flips sine, sec flips cosine, cot flips tangent. | csc=1/sin; sec=1/cos; cot=1/tan | Reciprocal trig | Online Math Learning | Thinking sec=1/sin. |
| sin²θ + cos²θ = 1; divide by cos² or sin² for the tan/cot forms. | Base: sin²+cos²=1; ÷cos² → 1+tan²=sec²; ÷sin² → 1+cot²=csc² | Pythagorean identities | Online Math Learning | Forgetting which form; mixing squared placement. |
| 'Co' means complement: sin(90°−θ)=cos θ. | Complementary angles swap sin↔cos, tan↔cot, sec↔csc. | Cofunctions | Standard cofunction phrase | Using 180° instead of 90°; radian form π/2. |
| Elevation looks up, depression looks down, both from the horizontal. | From eye-level horizontal.; Up = elevation; down = depression. | Angles of elevation | Standard applications language | Measuring from vertical; diagram orientation. |
| Sine is y, cosine is x on the unit circle. | Point (cos θ, sin θ) | Unit circle | Mathematricks | Swapping x/y; degrees vs radians. |
| Each side over the sine of the angle it faces. | Match side to opposite angle.; Set ratios equal. | Law of sines | Standard sine-rule phrasing | Ambiguous case (SSA). |
| Pythagoras with a correction: a² = b² + c² − 2bc cos A. | Identify included/opposite angle.; Apply cosine rule. | Law of cosines | Standard cosine-rule phrase | Sign of cosine in obtuse triangles; wrong opposite side. |
| Half of two sides times the sine of the included angle. | A = (1/2)ab sin C | Triangle area trig | Standard SAS area | Using non-included angle. |
| π is 180°. To radians × π/180; to degrees × 180/π. | deg → rad: ×π/180; rad → deg: ×180/π | Radians | Standard conversion phrase | Multiplying by π or 180 alone. |
| Lengths × k, areas × k², volumes × k³. | Linear scale k; Area scales k²; Volume scales k³ | Similarity scale | Standard similarity scaling | Applying k to area directly. |
| A diameter always sees a right angle. | Endpoint angle on diameter is right. | Circle theorems | Standard circle theorem phrase | Using a non-diameter chord. |
| A tangent meets the radius at a right angle. | Radius ⊥ tangent at contact point. | Circle theorems | Standard tangent-radius theorem | Confusing with alternate segment theorem. |
| The center angle is double the rim angle (same arc). | ∠ at center = 2 × ∠ at circumference on same arc. | Circle theorems | Standard circle theorem | Wrong arc; inscribed angle on different arc. |
| Opposite corners in a circle add to 180°. | Opposite angles of cyclic quad are supplementary. | Cyclic quadrilaterals | Standard circle theorem | Applying to non-cyclic quads. |
| AP sum = n/2 × (first + last). | Find n, first, last (or use 2a+(n−1)d form). | Arithmetic series | Standard AP formulas | Off-by-one in n; confusing AP with GP. |
| Each term multiplies by the same ratio r. | Identify first term and ratio.; Apply formula. | Geometric sequences | Standard GP language | r negative; \|r\|<1 infinite sum conditions. |
| A sector is a pizza slice: θ/360 of the whole circle. | Fraction θ/360 (or rad/2π) of circumference/area. | Circle sectors | Classroom sector metaphor | Mixing degrees and radians. |
| Elimination: make one letter match, then add or subtract to wipe it out. | Scale equations; Add/subtract to eliminate; Back-substitute | Systems of equations | Standard elimination language | Adding when signs same; arithmetic slips. |
| Midpoint averages the coordinates. Distance is Pythagoras on the grid. | Mid = ((x1+x2)/2,(y1+y2)/2); Dist = √[(Δx)²+(Δy)²] | Coordinate geometry | Standard coord-geo phrases | Forgetting to square; mixing mid with section formula. |
| Pop goes the Weasel (quadratic) | x = (−b ± √(b²−4ac)) / 2a | Quadratic formula | US classroom song | a=0 not quadratic; complex roots when Δ<0 |
| Vertex: −b/(2a) | Axis of symmetry for y=ax²+bx+c | Quadratics | Algebra II | Parabola opens up/down from sign of a |
| Complete the square: halve b, square it | Build (x+h)² + k form | Quadratics | Standard algebra | Coefficient a≠1 needs divide first |
| n(A∪B) = n(A)+n(B)−n(A∩B) | Inclusion–exclusion for two sets | Sets / counting | SEE / grade 9 | Three-set formula longer; mutually exclusive drops ∩ term |
| Sine is y, cosine is x | Unit circle coordinates | Trigonometry | VALIDATION implement | Only on unit circle; SOHCAHTOA for general right △ |
| Oblique triangle: no SOHCAHTOA alone | Use sine/cosine rule | Trigonometry | Grade 10 / SEE | Need correct angle-side pairing |
| Bearing: measure from North clockwise | Navigation angles from north | Heights & distances | Nepal SEE | Difference from angle of elevation |
| Intersecting chords product rule | If chords cross inside, segment products equal | Circle theorems | Grade 10 | Tangent-secant is different pattern |
| AP sum: average of ends × n | Sₙ = n/2(a₁+aₙ) | Sequences | Grade 10 | GP sum needs r≠1 formula |
| GP sum: first times (rⁿ−1)/(r−1) | Finite geometric series | Sequences | SEE | r=1 is just n×a |
| Similarity: angles match, sides scale | k on length, k² area, k³ volume | Similar figures | Grade 9 | Must check angle correspondence |

## 11–12 / trig / calculus

| phrase | meaning | topic | source-ish | risk notes |
| --- | --- | --- | --- | --- |
| May I have a large container of coffee? (3.1415926) | Count letters in each word for digits. | Digits of pi | Online Math Learning pi word-length mnemonic | Letter-count typos; not a calculation aid. |
| Bring the power down in front, then take one off the power. | d/dx[x^n]=n x^(n−1) | Power rule | MemoryTricks / UMD calculus jingles | Constants, fractional/negative powers, chain rule needed for composites. |
| First d-second plus second d-first. | (uv)' = u'v + uv' | Product rule | Science Bowl Prep / MemoryTricks | Multiplying the two derivatives only. |
| Low d-high minus high d-low, over the low squared. | (f/g)' = (g f' − f g')/g² | Quotient rule | AutoGradeMath / Science Bowl Prep / MemoryTricks | Reversing subtraction order; forgetting square denominator. |
| Derivative of the outside, keep the inside, times derivative of the inside. | f(g(x))' = f'(g(x))·g'(x) | Chain rule | Science Bowl Prep / MemoryTricks | Forgetting to multiply by inner derivative. |
| sin → cos → −sin → −cos → sin. | Cycle derivatives of sin/cos.; tan → sec² | Trig derivatives | UMD jingles / Mathematricks | Missing negatives; degrees mode on calculators. |
| Raise the power by one, divide by the new power, and add C. | ∫x^n dx = x^(n+1)/(n+1)+C (n≠−1) | Power rule integration | Mathematricks / MemoryTricks | Forgetting +C; n=−1 needs ln. |
| LIATE: Logarithmic, Inverse trig, Algebraic, Trig, Exponential — choose u earlier in the list. | Pick u via LIATE; dv = rest; ∫u dv = uv − ∫v du | Integration by parts | Leaves of Math / MemoryTricks / Harvard Math 1A | Fails on some integrands (opportunistic choice better); cyclic integrals. |
| See f(g(x))·g'(x)? Let u = g(x). | Set u = inner; du = g'(x) dx; Integrate in u; Back-substitute | u-substitution | MemoryTricks | Missing constant factors; definite-integral bound conversion. |
| Log asks: what power? | log_b a = c means b^c = a | Logarithms | Mathematricks / standard log definition phrase | Change-of-base errors; log of negative. |
| Logs turn × into +, ÷ into −, and powers out front. | log(xy)=log x+log y; log(x/y)=log x−log y; log(x^n)=n log x | Log laws | Mathematricks | log(x+y) wrongly split; base issues. |
| Differentiation and integration are inverse operations. | Antiderivative then evaluate.; Or derivative of integral recovers f. | Fundamental theorem | MemoryTricks | Wrong limits; absolute value for √ etc. |
| Permutations when order matters; combinations when order does not. | Order matters → P; Order doesn't → C | Counting | Adler-n-Subtract / e-GMAT | With/without replacement; indistinguishable objects. |
| P-value: chance, with the null true, of data at least this extreme. | Assume H0; Find tail probability of observed (or more extreme) result | P-values | Lesser (paraphrased from jingle) | Treating p as P(H0 true); p-hacking. |
| Whiskers reach the furthest point within a 1.5 IQR leash from the quartiles. | Compute IQR; Fence at Q±1.5 IQR; Whisker to last inlier | Boxplots | Lesser citing Martin JSE analogy | Software defaults differ; some curricula use different multipliers. |
| sin cos cos sin, sign stays. cos cos sin sin, sign swaps. | sin(A±B)=sinA cosB ± cosA sinB; cos(A±B)=cosA cosB ∓ sinA sinB | Compound angles | Classroom compound-angle chant | Wrong sign patterns; tan formula separate. |
| Double the angle: sin 2A = 2 sin A cos A. | sin 2A = 2sinA cosA; cos 2A = cos²A−sin²A (and variants) | Double angle | Standard double-angle | Mixing cos double-angle forms. |
| LIATE | Pick u for ∫u dv: Log, Inverse trig, Algebraic, Trig, Exponential | Integration by parts | Calculus standard | Some integrals need tabular or substitution instead |
| L'Hôpital LIPS | Limit, Indeterminate 0/0 or ∞/∞, Problem, Separate derivatives | Limits | MemoryTricks / calc courses | Not for all indeterminate forms; may need repeat |
| FTC: derivative undoes integral | ∫ₐᵇ f = F(b)−F(b); d/dx ∫f = f | Fundamental theorem | VALIDATION implement | Part 1 needs variable upper limit care |
| u-sub: see inner and its derivative | ∫f(g(x))g′(x)dx → ∫f(u)du | Integration | VALIDATION implement | Missing factor needs algebra fix |
| Partial fractions: factor bottom first | Linear → A/(x−r); repeated powers stack | Integration / algebra | NEB / pabson | Irreducible quadratics need Ax+B |
| Newton–Raphson | x₁ = x₀ − f(x₀)/f′(x₀) | Numerical methods | NEB optional | May diverge; needs good x₀ |
| Row times column | Matrix product: dot row of A with column of B | Matrices | NEB | Dimensions must align; not commutative |
| Determinant 2×2: ad − bc | Cross multiply diagonals subtract | Matrices | NEB | 3×3 needs cofactor expansion |
| Binomial: choose r from n | Term has C(n,r) aⁿ⁻ʳ bʳ | Binomial theorem | NEB / pabson | Index starts at 0; signs if b negative |
| i² = −1 | Complex: replace i² with −1 when multiplying | Complex numbers | NEB | Powers of i cycle 4; conjugate for division |
| \|a\| = √(a₁²+a₂²) | Vector length in plane | Vectors | NEB optional | 3D adds z² |
| Limit: plug in if continuous | If 0/0 → factor, rationalize, or L'Hôpital | Limits | Calculus intro | ∞/∞ not always L'Hôpital-only |
| Product rule not multiply derivatives | d(fg)=f′g+fg′ | Derivatives | Calculus | Classic rookie error |
| Natural log: ∫1/x = ln\|x\|+C | Exception to power rule | Integrals | Calc I | Domain x≠0; absolute value |
| SOHCAHTOA reciprocals | csc=1/sin, sec=1/cos, cot=1/tan | Trigonometry | Grade 10+ | Undefined where denom=0 |
| Compound angle sign swap (cos) | cos(A±B): cos cos ∓ sin sin | Trig identities | trig2 pack | Sign swaps vs sin formula |
| Arc length s = rθ | θ must be in radians | Radians | trig2 | Degree formula needs π/180 |
| nPr vs nCr | Permutation order matters; combination bags don't | Counting | SEE / pabson | Formulas n!/(n−r)! vs n!/(r!(n−r)!) |

## GAPS vs `js/more/cheats.js`

Cheatsheets are **dense but uneven**: strong on geo/trig/calculus rules, thinner on properties, measurement systems, stats depth, and NEB-only topics.

| Gap | In swarm? | In `cheats.js`? | In lesson phrases (`courses.js` + `more/*`)? |
| --- | ---: | ---: | ---: |
| Metric conversion (King Henry) | Yes | No | No |
| Calendar months (knuckles / thirty days) | Yes | No | No |
| GEMS order-of-operations variant | Yes | No | No (PEMDAS only) |
| Roman numerals | Yes | No | No |
| Associative / distributive property labels | Yes | No | Partial (implicit in lessons) |
| Surface area nets | Yes | No | No |
| Venn inclusion–exclusion phrase | Yes | No | Partial (pabson/hs) |
| Bearing / navigation | Yes | No | Partial (heights lesson) |
| LIATE / L'Hôpital / FTC / partial fractions | Yes | Partial (∫ power, quotient) | Partial (pabson only) |
| Matrices row×column and 2×2 determinant | Yes | No | pabson only |
| Binomial coefficient mnemonic | Yes | No | pabson only |
| Complex i² | Yes | No | pabson only |
| Limits / continuity plug-in | Yes | No | pabson only |
| nPr vs nCr counting | Yes | No | pabson + hs partial |
| Standard deviation (no classic rhyme — teach definition) | Gap noted | No | No |
| Correlation vs causation (concept, not a jingle) | Gap noted | No | No |

### Cheatsheet coverage already strong (avoid duplicate work)

- Order of ops, fraction drills, integer signs, circle π rhymes, congruence codes, SOHCAHTOA/ASTC, circle theorems, AP/GP, derivative rules (power/product/quotient/chain), basic ∫ power and log laws.

### Research corpus not yet in app (`mnemonics.json`, `already_in_app: false`) — top picks

- **Knuckles are 31-day months; dents between are shorter.** (1-2, Calendar) — Leap year February; must skip thumb and continue to other hand correctly.
- **Thirty days hath September, April, June, and November.** (1-2, Calendar) — Leap year exception for February.
- **2-5-10 End, 3-9 Sum, 4-8 Back, 11 Alternate.** (3-4, Divisibility) — Rule for 7 is omitted; 6 needs both 2 and 3.
- **BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtractio** (5-6, Order of operations) — Same left-to-right trap as PEMDAS; D before M myth.
- **BEDMAS: Brackets, Exponents, Division/Multiplication, Addition/Subtrac** (5-6, Order of operations) — Same M/D left-to-right misconception.
- **GEMS: Grouping, Exponents, Multiply/Divide, Subtract/Add.** (5-6, Order of operations) — Still needs left-to-right within levels.
- **Numerator up, denominator down.** (5-6, Fraction vocabulary) — Doesn't help with improper vs mixed.
- **King Henry Died By Drinking Chocolate Milk.** (5-6, Metric prefixes) — Skipping 'By/Base'; mega/micro not included.
- **Mode and most share the first two letters.** (5-6, Mode) — No mode or multiple modes.
- **The median splits the data down the middle, like a median strip in a r** (5-6, Median) — Even n requires averaging two middles.
- **My friend's enemy is my enemy; my enemy's enemy is my friend.** (5-6, Multiplying signed numbers) — Students over-apply to addition of signed numbers.
- **I View X-rays: I=1, V=5, X=10.** (3-4, Roman numerals) — Subtractive notation (IV, XL) still trips students.
- **Commutative: the commute is the same either direction.** (3-4, Properties) — Does not apply to subtraction/division.
- **Associative: associate means group up.** (3-4, Properties) — Not for subtraction/division.
- **Distributive: give what's outside to everyone inside.** (3-4, Properties) — Forgetting to distribute to every term.
- **The dividend is at the end; the quotient is the result.** (3-4, Division vocabulary) — House diagram orientation varies by curriculum.
- **d = rt — remember dirt.** (7, Distance formula) — Average vs instantaneous rate; unit consistency.
- **Cover up what you want in the D-S-T triangle.** (7, Speed distance time) — Triangle doesn't teach units or average speed pitfalls.
- **Apple pies are square: A = π r².** (7, Circle area) — 'Square' confuses with geometric square shape.
- **y = mx + b: Begin at b, then Move with m.** (8, Slope-intercept form) — Positive/negative slope direction; confusing b with x-intercept.
- **Negative exponent: take one over with a positive power.** (8, Negative exponents) — Applying to the wrong factor; (−2)^(−3) sign errors.
- **Complementary = Corner (90°). Supplementary = Straight (180°).** (8, Complementary & supplementary) — Angles need not be adjacent; students require shared ray wrongly.
- **Acute is a 'cute' little angle (less than 90°).** (7, Angle types) — Obtuse vs reflex confusion.
- … and 14 more (see `mnemonics.json`).

## Rejected / unsafe (do not import)

From `VALIDATION_NOTES.md`: feet-in-mile-tomatoes, arithmetic-spelling-only, skew-alphabetical, chi-square-old-macdonald, pi-may-i-have; duplicate/confusing **apple-pies-square**.

## Sources consulted

- [Online Math Learning — Math Mnemonics](https://www.onlinemathlearning.com/math-mnemonics.html)
- [Online Math Learning — Trigonometry Mnemonics](https://www.onlinemathlearning.com/mnemonics-for-trigonometry.html)
- [Wikipedia — Mnemonics in trigonometry](https://en.wikipedia.org/wiki/Mnemonics_in_trigonometry)
- [MemoryTricks — Calculus](https://memorytricks.com/math-calculus)
- Repository: `docs/research/mnemonics.json`, `VALIDATION_NOTES.md`, `js/more/cheats.js`, lesson packs in `js/courses.js` and `js/more/{arith,geo,trig,hs,pabson}.js`
