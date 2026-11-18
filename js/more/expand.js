/** Extra classroom mnemonics across grades — breadth pack. */
(function () {
  if (!window.MK) return;
  const { P, R, pick, gcd, lcm, neg, deg, raw, fr, pow, Q, add } = window.MK;

  const wrongs = (ans, list) => list.filter((x) => x != null && String(x) !== String(ans));

  /** Works even if check.js loads packs alphabetically before trig.js creates trig2. */
  function addWhen(courseId, lessons) {
    if (window.COURSES.some((c) => c.id === courseId)) {
      add(courseId, lessons);
      return;
    }
    const prev = window.MK.course;
    window.MK.course = function (obj, afterId) {
      const out = prev.call(this, obj, afterId);
      if (obj && obj.id === courseId) add(courseId, lessons);
      return out;
    };
  }


  /* ================================================================== */
  /* K–1                                                                 */
  /* ================================================================== */
  add("k", [
    {
      id: "allword", name: "Word clues: all / altogether", phrase: "All, altogether, in all, total — those words mean add.",
      also: "How many in all? Put the parts together.",
      steps: ["Find the clue word: all, altogether, in all, total, sum.", "Write an addition.", "Add the parts."],
      exception: "“All” with “left” or “gone” can mean subtract. Read the whole sentence.",
      pic: () => P.chain(["3 red + 4 blue", "all together", "7"], ["+", "="]),
      gen() {
        const a = R(2, 9), b = R(2, 9);
        const clue = pick(["altogether", "in all", "in total"]);
        return Q(`Mia has ${a} apples and ${b} pears. How many ${clue}?`, a + b,
          wrongs(a + b, [a + b + 1, a + b - 1, Math.abs(a - b), a * b]),
          `"${clue}" means add: ${a} + ${b} = ${a + b}.`, P.chain([String(a), String(b), "?"], ["+", "="]));
      },
      worked: [
        { problem: "Sam has 4 cars and 5 trucks. How many vehicles in all?", steps: [["Clue", "“In all” means add."], ["Write", "4 + 5."], ["Add", "9."]], answer: "9" },
        { problem: "3 red beads and 6 blue beads altogether?", steps: [["Clue", "Altogether means add."], ["Add", "3 + 6 = 9."]], answer: "9" }
      ]
    },
    {
      id: "leftword", name: "Word clues: left / remain", phrase: "Left, remain, take away, how many more — those words mean subtract.",
      steps: ["Find the clue: left, remain, take away, how many more, difference.", "Write a subtraction.", "Take away."],
      exception: "“How many more” compares two amounts: bigger − smaller. Start with the whole, not the leftover.",
      pic: () => P.numberLine(2, 9, 8, [-3]),
      gen() {
        const whole = R(8, 18), take = R(2, whole - 2);
        const clue = pick(["left", "remain", "are left"]);
        return Q(`${whole} birds. ${take} fly away. How many ${clue}?`, whole - take,
          wrongs(whole - take, [whole + take, take, whole - take + 1, whole]),
          `"${clue}" means subtract: ${whole} − ${take} = ${whole - take}.`,
          P.numberLine(Math.max(0, whole - take - 1), whole + 1, whole, [-take], { hideTicks: [whole - take], hideHops: true }));
      },
      worked: [
        { problem: "10 cookies. 3 eaten. How many left?", steps: [["Clue", "“Left” means subtract."], ["Write", "10 − 3."], ["Subtract", "7."]], answer: "7" },
        { problem: "12 balloons. 5 pop. How many remain?", steps: [["Clue", "Remain means subtract."], ["Subtract", "12 − 5 = 7."]], answer: "7" }
      ]
    },
    {
      id: "eachword", name: "Word clues: each / groups", phrase: "Each, every, groups of — those words often mean multiply (or equal shares).",
      also: "3 bags with 4 each: three groups of four.",
      steps: ["Spot “each”, “every”, or “groups of”.", "Draw equal groups.", "Count by groups or multiply."],
      exception: "“Each” can also mean divide when you share: 12 stickers, 3 each means how many kids?",
      pic: () => P.groups(3, 4),
      gen() {
        const g = R(2, 5), n = R(2, 5);
        return Q(`${g} bags with ${n} apples each. How many apples?`, g * n,
          wrongs(g * n, [g + n, g * n + g, Math.abs(g - n), g * n - 1]),
          `"Each" makes equal groups: ${g} × ${n} = ${g * n}.`, P.groups(g, n));
      },
      worked: [
        { problem: "4 plates with 3 cookies each. How many cookies?", steps: [["Clue", "“Each” → equal groups."], ["Groups", "4 groups of 3."], ["Count", "12."]], answer: "12" },
        { problem: "5 boxes, 2 toys in each. How many toys?", steps: [["Write", "5 × 2."], ["Multiply", "10."]], answer: "10" }
      ]
    },
    {
      id: "shareword", name: "Word clues: share / split", phrase: "Share equally, split, divide among — those words mean divide.",
      steps: ["Spot “share”, “split”, “among”, “into equal groups”.", "Write a division.", "Find how many in each group (or how many groups)."],
      exception: "Sharing must be fair. Leftovers are a remainder — don’t pretend they vanish.",
      pic: () => P.groups(3, 4),
      gen() {
        const g = R(2, 5), n = R(2, 5), total = g * n;
        return Q(`Share ${total} stickers equally among ${g} friends. How many each?`, n,
          wrongs(n, [g, total, n + 1, total - g]),
          `Share means divide: ${total} ÷ ${g} = ${n}.`, P.groups(g, n));
      },
      worked: [
        { problem: "Share 12 grapes among 3 kids. How many each?", steps: [["Clue", "Share equally → divide."], ["Divide", "12 ÷ 3 = 4."]], answer: "4" },
        { problem: "Split 20 crayons into 5 equal boxes. How many per box?", steps: [["Write", "20 ÷ 5."], ["Divide", "4."]], answer: "4" }
      ]
    },
    {
      id: "commute", name: "Order of addends", phrase: "You can flip the addends: 3 + 5 is the same as 5 + 3.",
      also: "Commutative: the commute is the same both ways.",
      steps: ["Write the sum either way.", "Start with the bigger number in your head.", "Count on the smaller."],
      exception: "Order does not matter for + and ×. It does matter for − and ÷: 5 − 3 is not 3 − 5.",
      pic: () => P.chain(["3 + 5", "5 + 3", "8"], ["flip", "="]),
      gen() {
        const a = R(2, 9), b = R(2, 9);
        if (Math.random() < 0.5) {
          return Q(`${a} + ${b} equals which flip?`, `${b} + ${a}`,
            wrongs(`${b} + ${a}`, [`${a} − ${b}`, `${b} − ${a}`, `${a} + ${a}`]),
            `Flip the addends: ${a} + ${b} = ${b} + ${a} = ${a + b}.`);
        }
        return Q(`${a} + ${b}`, a + b, wrongs(a + b, [a + b + 1, Math.abs(a - b), a * b]),
          `Same either way: ${a} + ${b} = ${b} + ${a} = ${a + b}.`);
      },
      worked: [
        { problem: "Does 2 + 9 equal 9 + 2?", steps: [["Flip", "Same addends, either order."], ["Check", "Both make 11."]], answer: "yes, both 11" },
        { problem: "7 + 4", steps: [["Flip to big first", "4 + 7 → hold 7."], ["Count on", "8, 9, 10, 11."]], answer: "11" }
      ]
    },
    {
      id: "countback", name: "Counting back", phrase: "Put the big number in your head, then count back.",
      steps: ["Say the bigger number.", "Count back one finger for each you take away.", "The last number you say is the answer."],
      exception: "Do not count the starting number as a finger. 9 − 2 is 8, 7 — not 9, 8.",
      pic: () => P.numberLine(5, 10, 9, [-1, -1]),
      gen() {
        const a = R(6, 15), b = R(2, 4);
        const seq = Array.from({ length: b }, (_, i) => a - i - 1).join(", ");
        return Q(`${a} − ${b}`, a - b, wrongs(a - b, [a - b + 1, a - b - 1, a + b]),
          `Hold ${a}. Count back: ${seq}.`, P.numberLine(a - b - 1, a + 1, a, Array(b).fill(-1), { hideTicks: [a - b], hideHops: true }));
      },
      worked: [
        { problem: "8 − 3", steps: [["Hold 8", "Big number in your head."], ["Count back", "7, 6, 5."]], answer: "5" },
        { problem: "12 − 2", steps: [["Step", "Hold 12"], ["Count back", "11, 10."]], answer: "10" }
      ]
    },
    {
      id: "zeroadd", name: "Adding zero", phrase: "Zero is the do-nothing number for adding.",
      also: "Plus zero keeps the number the same.",
      steps: ["See + 0 or 0 +.", "The other number stays the same.", "Zero adds nothing."],
      exception: "Zero is special for + and × differently: n + 0 = n, but n × 0 = 0.",
      pic: () => P.chain(["6 + 0", "6"], ["="]),
      gen() {
        const n = R(0, 20);
        const form = Math.random() < 0.5 ? `${n} + 0` : `0 + ${n}`;
        return Q(form, n, wrongs(n, [0, n + 1, n - 1, 10]),
          `Zero adds nothing: ${form} = ${n}.`);
      },
      worked: [
        { problem: "9 + 0", steps: [["Zero rule", "Adding zero changes nothing."], ["Answer", "9."]], answer: "9" },
        { problem: "0 + 14", steps: [["Flip", "Same as 14 + 0."], ["Keep", "14."]], answer: "14" }
      ]
    },
    {
      id: "estimate", name: "About how many?", phrase: "Estimate: is it closer to a friendly ten?",
      steps: ["Look at the ones digit.", "5 or more → bump up to the next ten.", "4 or less → stay at this ten."],
      exception: "Estimating is a “about” answer, not exact. Use it to check if an exact answer looks wild.",
      pic: () => P.numberLine(10, 20, 14, []),
      gen() {
        const n = R(11, 89);
        const ans = n % 10 >= 5 ? n + (10 - (n % 10)) : n - (n % 10);
        return Q(`About how many is ${n}? (nearest 10)`, ans,
          wrongs(ans, [ans + 10, ans - 10, n, n + 1]),
          `${n % 10 >= 5 ? "5 or more, raise" : "4 or less, rest"}: ${n} ≈ ${ans}.`,
          P.numberLine(Math.floor(n / 10) * 10 - 10, Math.floor(n / 10) * 10 + 20, n, [], { labelEvery: 10, hideTicks: [ans] }));
      },
      worked: [
        { problem: "About how many is 37?", steps: [["Look at ones", "7 ≥ 5."], ["Raise", "Nearest ten is 40."]], answer: "40" },
        { problem: "About how many is 62?", steps: [["Ones", "2 < 5."], ["Rest", "Nearest ten is 60."]], answer: "60" }
      ]
    },
    {
      id: "morefewer", name: "More and fewer", phrase: "More means bigger. Fewer means smaller.",
      steps: ["Compare the two amounts.", "More → the bigger number.", "Fewer → the smaller number."],
      exception: "Fewer is for things you can count. For continuous stuff people say “less,” but the compare idea is the same.",
      pic: () => P.gator(9, 4),
      gen() {
        let a, b;
        do { a = R(1, 20); b = R(1, 20); } while (a === b);
        const askMore = Math.random() < 0.5;
        const ans = askMore ? Math.max(a, b) : Math.min(a, b);
        return Q(`Which is ${askMore ? "more" : "fewer"}: ${a} or ${b}?`, ans,
          wrongs(ans, [a + b, Math.abs(a - b), askMore ? Math.min(a, b) : Math.max(a, b)]),
          `${askMore ? "More" : "Fewer"} picks ${ans}.`, P.gator(a, b, { hide: true, maskSides: true }));
      },
      worked: [
        { problem: "Which is more: 6 or 9?", steps: [["Compare", "9 is bigger."], ["More", "9."]], answer: "9" },
        { problem: "Which is fewer: 12 or 8?", steps: [["Compare", "8 is smaller."], ["Fewer", "8."]], answer: "8" }
      ]
    },
    {
      id: "partwhole", name: "Part–part–whole", phrase: "Two parts make the whole. The whole splits into parts.",
      steps: ["Name the whole.", "Name each part.", "Parts add to the whole; whole minus a part leaves the other part."],
      exception: "Don’t mix which number is the whole. The whole is always the total, never a leftover part.",
      pic: () => P.chain(["4 + 5", "whole 9"], ["parts →"]),
      gen() {
        const p = R(2, 9), q = R(2, 9), whole = p + q;
        if (Math.random() < 0.5) {
          return Q(`Parts ${p} and ${q}. What is the whole?`, whole,
            wrongs(whole, [Math.abs(p - q), p, q, whole + 1]),
            `Parts add: ${p} + ${q} = ${whole}.`);
        }
        return Q(`Whole ${whole}, one part ${p}. Other part?`, q,
          wrongs(q, [whole + p, p, whole, q + 1]),
          `Whole − part: ${whole} − ${p} = ${q}.`);
      },
      worked: [
        { problem: "Parts 6 and 3. Whole?", steps: [["Add parts", "6 + 3 = 9."]], answer: "9" },
        { problem: "Whole 10, part 4. Other part?", steps: [["Subtract", "10 − 4 = 6."]], answer: "6" }
      ]
    },
    {
      id: "tenmore", name: "Ten more, ten less", phrase: "Ten more bumps the tens digit up. Ten less bumps it down.",
      steps: ["Find the tens digit.", "Ten more: add 1 to the tens.", "Ten less: subtract 1 from the tens."],
      exception: "Ones stay put when you add or subtract exactly 10. 27 + 10 is 37, not 28.",
      pic: () => P.placeValue(27),
      gen() {
        const n = R(10, 89);
        const more = Math.random() < 0.5;
        const ans = more ? n + 10 : n - 10;
        if (ans < 0 || ans > 99) return this.gen();
        return Q(`${more ? "Ten more than" : "Ten less than"} ${n}?`, ans,
          wrongs(ans, [n + 1, n - 1, more ? n - 10 : n + 10, n]),
          `${more ? "+10" : "−10"} changes the tens seat: ${n} → ${ans}.`, P.placeValue(n, true));
      },
      worked: [
        { problem: "Ten more than 34?", steps: [["Tens bump", "3 tens → 4 tens."], ["Ones stay", "4."], ["Result", "44."]], answer: "44" },
        { problem: "Ten less than 50?", steps: [["Tens bump down", "5 → 4."], ["Result", "40."]], answer: "40" }
      ]
    },
    {
      id: "sameboth", name: "Same on both sides", phrase: "If both sides match, use the equals sign.",
      also: "Balance: what you do to one side, keep the story true.",
      steps: ["Compute each side if needed.", "If the amounts match, write =.", "If not, they are not equal."],
      exception: "Equals means “same value,” not “looks the same.” 3 + 5 and 4 + 4 both equal 8.",
      pic: () => P.chain(["3 + 5", "8", "4 + 4"], ["=", "="]),
      gen() {
        const a = R(1, 9), b = R(1, 9), s = a + b;
        const form = Math.random() < 0.5;
        if (form) {
          const c = R(0, s), d = s - c;
          return Q(`${a} + ${b} = ${c} + ?`, d, wrongs(d, [s, c, a, b]),
            `Left is ${s}. So ${c} + ${d} = ${s}.`);
        }
        return Q(`Is ${a} + ${b} equal to ${s}?`, "yes",
          wrongs("yes", ["no", String(s), String(a + b + 1)]),
          `${a} + ${b} = ${s}, so yes.`);
      },
      worked: [
        { problem: "3 + 5 = 4 + ?", steps: [["Left", "3 + 5 = 8."], ["Match", "4 + 4 = 8."]], answer: "4" },
        { problem: "Does 6 + 2 equal 5 + 3?", steps: [["Both sides", "8 and 8."], ["Equal", "yes."]], answer: "yes" }
      ]
    },
    {
      id: "fingeradd", name: "Fingers for small sums", phrase: "Hold the bigger number; raise fingers for the smaller; count them on.",
      steps: ["Put the bigger number in your head (or on one hand).", "Raise one finger for each of the smaller number.", "Count on from the big number."],
      exception: "When the sum goes past 10, make a ten first, then use the leftover fingers.",
      pic: () => P.fingers(5),
      gen() {
        const a = R(4, 9), b = R(1, 5);
        return Q(`${a} + ${b}`, a + b, wrongs(a + b, [a + b + 1, a + b - 1, a - b]),
          `Hold ${a}. Count on ${b} fingers to ${a + b}.`, P.fingers(Math.min(b, 9), { hideLabels: true }));
      },
      worked: [
        { problem: "6 + 3", steps: [["Step", "Hold 6"], ["Three fingers", "7, 8, 9."]], answer: "9" },
        { problem: "8 + 2", steps: [["Step", "Hold 8"], ["Two fingers", "9, 10."]], answer: "10" }
      ]
    },
    {
      id: "beforeafter", name: "Before and after", phrase: "Before is one less. After is one more.",
      steps: ["After: count one forward.", "Before: count one back.", "The number line is your friend."],
      exception: "Before 0 you leave the everyday counting numbers — kindergarten stays at 0 and up.",
      pic: () => P.numberLine(4, 8, 6, []),
      gen() {
        const n = R(1, 20);
        const after = Math.random() < 0.5;
        const ans = after ? n + 1 : n - 1;
        return Q(`What number comes ${after ? "after" : "before"} ${n}?`, ans,
          wrongs(ans, [n, after ? n - 1 : n + 1, n + 2]),
          `${after ? "After" : "Before"} ${n} is ${ans}.`,
          P.numberLine(Math.max(0, n - 2), n + 2, n, [], { hideTicks: [ans] }));
      },
      worked: [
        { problem: "What comes after 7?", steps: [["One more", "8."]], answer: "8" },
        { problem: "What comes before 10?", steps: [["One less", "9."]], answer: "9" }
      ]
    },
    {
      id: "howmany", name: "How many more?", phrase: "How many more? Start at the smaller, count up to the bigger.",
      also: "Or subtract: bigger − smaller.",
      steps: ["Find both amounts.", "Subtract smaller from bigger.", "That difference is “how many more.”"],
      exception: "“How many more” is a compare, not a take-away story with leftovers on a plate.",
      pic: () => P.numberLine(3, 9, 3, [5]),
      gen() {
        let a, b;
        do { a = R(2, 15); b = R(2, 15); } while (a === b);
        const hi = Math.max(a, b), lo = Math.min(a, b);
        return Q(`${hi} is how many more than ${lo}?`, hi - lo,
          wrongs(hi - lo, [hi + lo, hi, lo, hi - lo + 1]),
          `Compare: ${hi} − ${lo} = ${hi - lo}.`, P.numberLine(lo - 1, hi + 1, lo, [hi - lo], { hideTicks: [hi, hi - lo], hideHops: true, labelEvery: Math.max(1, hi - lo) }));
      },
      worked: [
        { problem: "9 is how many more than 4?", steps: [["Subtract", "9 − 4 = 5."]], answer: "5" },
        { problem: "Ana has 7, Ben has 3. How many more does Ana have?", steps: [["Compare", "7 − 3 = 4."]], answer: "4" }
      ]
    },
    {
      id: "dblfacts", name: "Doubles facts", phrase: "A double is the same number twice: 6 + 6 = 12.",
      steps: ["Spot two matching numbers.", "Double means add the number to itself.", "Remember the common doubles through 10 + 10."],
      exception: "Near doubles are next door (6 + 7). Pure doubles are exact twins.",
      pic: () => P.groups(2, 6),
      gen() {
        const a = R(1, 10);
        return Q(`${a} + ${a}`, 2 * a, wrongs(2 * a, [2 * a + 1, 2 * a - 1, a, a * a]),
          `Double ${a} is ${2 * a}.`, P.groups(2, a));
      },
      worked: [
        { problem: "8 + 8", steps: [["Double", "Two eights."], ["Sum", "16."]], answer: "16" },
        { problem: "5 + 5", steps: [["Double", "10."]], answer: "10" }
      ]
    }
  ]);

  /* ================================================================== */
  /* Grades 1–2                                                          */
  /* ================================================================== */
  add("g1", [
    {
      id: "month-knuckles", name: "Knuckle months", phrase: "Knuckles are 31-day months; valleys between are shorter.",
      also: "Fist calendar: peak = 31, dent = 30 (or February).",
      steps: ["Make two fists side by side.", "Knuckle months have 31 days; valleys between are shorter.", "After July, continue on the other fist starting at August.", "February is the special short month."],
      exception: "February is 28 days, or 29 in a leap year. After July continue onto the other fist at August.",
      pic: () => P.chain(["Jan knuckle", "31", "Feb valley", "28/29"], ["→", "·", "→"]),
      gen() {
        const form = R(1, 3);
        if (form === 1) {
          return Q("On the knuckle calendar, knuckle months have how many days?", 31,
            wrongs(31, [30, 28, 29]),
            "Knuckles are the 31-day months.");
        }
        if (form === 2) {
          return Q("Which month sits in a valley and is shorter than 30 days?", "February",
            wrongs("February", ["April", "June", "November"]),
            "February is the short valley month: 28 or 29 days.");
        }
        return Q("After July on the fists, which month is the next knuckle?", "August",
          wrongs("August", ["September", "October", "June"]),
          "Continue on the other fist starting at August — a knuckle.");
      },
      worked: [
        {
          problem: "Does April land on a knuckle or a valley?",
          steps: [["Count from January", "Jan knuckle, Feb valley, Mar knuckle, Apr valley."], ["Read it", "Valley → not 31 days."]],
          answer: "valley (30 days)"
        },
        {
          problem: "How many days does July have on the knuckle calendar?",
          steps: [["Find July", "July is a knuckle."], ["Days", "Knuckles have 31."]],
          answer: "31"
        }
      ]
    },
    {
      id: "thirty-days-hath", name: "Thirty days hath…", phrase: "Thirty days hath September, April, June, and November.",
      steps: ["Remember the four 30-day months: September, April, June, November.", "All the rest have 31.", "Except February: 28, or 29 in a leap year."],
      exception: "All the rest have 31, except February (28, or 29 in a leap year).",
      pic: () => P.chain(["Sep", "Apr", "Jun", "Nov"], ["30", "30", "30"]),
      gen() {
        const thirty = ["September", "April", "June", "November"];
        const thirtyOne = ["January", "March", "May", "July", "August", "October", "December"];
        if (Math.random() < 0.45) {
          const m = pick(thirty);
          return Q(`How many days hath ${m}?`, 30, wrongs(30, [31, 28, 29]),
            `Thirty days hath September, April, June, and November — so ${m} has 30.`);
        }
        if (Math.random() < 0.5) {
          const m = pick(thirtyOne);
          return Q(`How many days in ${m}?`, 31, wrongs(31, [30, 28, 29]),
            `${m} is not in the “thirty days hath” list, so it has 31.`);
        }
        return Q("How many days in February in a common year?", 28, wrongs(28, [29, 30, 31]),
          "February has 28 days, or 29 in a leap year.");
      },
      worked: [
        {
          problem: "Name the four months with 30 days.",
          steps: [["Rhyme", "Thirty days hath September, April, June, and November."]],
          answer: "September, April, June, November"
        },
        {
          problem: "How many days in October?",
          steps: [["Check the rhyme", "October is not listed."], ["Rule", "The rest have 31 (except February)."]],
          answer: "31"
        }
      ]
    },
    {
      id: "commute2", name: "Commutative property", phrase: "Commuting either way: a + b = b + a, and a × b = b × a.",
      steps: ["Swap the order.", "For + or × the answer stays the same.", "Use the swap to start with a friendlier number."],
      exception: "Subtraction and division do not commute.",
      pic: () => P.chain(["4 × 3", "3 × 4", "12"], ["flip", "="]),
      gen() {
        const a = R(2, 9), b = R(2, 9);
        if (Math.random() < 0.5) {
          return Q(`${a} × ${b} = ? × ${a}`, b, wrongs(b, [a, a * b, b + a]),
            `Flip factors: ${a} × ${b} = ${b} × ${a}.`);
        }
        return Q(`${a} + ${b}`, a + b, wrongs(a + b, [a * b, Math.abs(a - b), a + b + 10]),
          `Order free for add: ${a} + ${b} = ${b} + ${a} = ${a + b}.`);
      },
      worked: [
        { problem: "Does 3 × 8 equal 8 × 3?", steps: [["Commutative", "Factors can flip."], ["Both", "24."]], answer: "yes, 24" },
        { problem: "2 + 19", steps: [["Flip", "19 + 2."], ["Count on", "21."]], answer: "21" }
      ]
    },
    {
      id: "assoc2", name: "Associative property", phrase: "Associate means regroup: (a + b) + c = a + (b + c).",
      also: "Same idea for multiply: group friendly factors first.",
      steps: ["Look for a pair that makes 10 or a known fact.", "Regroup those first.", "Then finish the sum or product."],
      exception: "You may regroup, but don’t change the numbers. And − / ÷ are not associative.",
      pic: () => P.chain(["(2 + 8) + 5", "10 + 5", "15"], ["regroup", "="]),
      gen() {
        const a = R(1, 9), b = 10 - a, c = R(2, 9);
        return Q(`(${a} + ${b}) + ${c}`, a + b + c,
          wrongs(a + b + c, [a + b, b + c, a + c, a * b + c]),
          `Regroup: ${a} + ${b} = 10, then 10 + ${c} = ${10 + c}.`);
      },
      worked: [
        { problem: "(7 + 3) + 6", steps: [["Inside", "7 + 3 = 10."], ["Then", "10 + 6 = 16."]], answer: "16" },
        { problem: "2 + (8 + 5)", steps: [["Inside", "8 + 5 = 13."], ["Then", "2 + 13 = 15."]], answer: "15" }
      ]
    },
    {
      id: "wordadd2", name: "Story problems: add", phrase: "Altogether, in all, combined, sum — add the parts.",
      steps: ["Underline the clue word.", "Write part + part.", "Add."],
      exception: "“Sum” is addition. “Difference” is subtraction — don’t mix the words.",
      pic: () => P.colAdd(28, 15, true),
      gen() {
        const a = R(11, 40), b = R(11, 40);
        return Q(`A class has ${a} girls and ${b} boys. How many students in all?`, a + b,
          wrongs(a + b, [a + b + 10, Math.abs(a - b), a, b]),
          `In all → add: ${a} + ${b} = ${a + b}.`, P.colAdd(a, b));
      },
      worked: [
        { problem: "24 red and 18 blue balloons combined?", steps: [["Clue", "Combined → add."], ["Add", "42."]], answer: "42" },
        { problem: "35 + 27 in all?", steps: [["Ones", "5 + 7 = 12, write 2 carry 1."], ["Tens", "3 + 2 + 1 = 6."]], answer: "62" }
      ]
    },
    {
      id: "wordsub2", name: "Story problems: subtract", phrase: "Left, remain, fewer, take away, difference — subtract.",
      steps: ["Underline the clue.", "Write whole − part (or bigger − smaller).", "Subtract."],
      exception: "“Fewer than” compares. “Left” takes away from a whole. Line up ones under ones.",
      pic: () => P.colSub(52, 18, true),
      gen() {
        const a = R(30, 80), b = R(10, a - 5);
        const clue = pick(["left", "remain", "are left"]);
        return Q(`${a} stickers. ${b} are used. How many ${clue}?`, a - b,
          wrongs(a - b, [a + b, b, a - b + 10]),
          `${clue} → subtract: ${a} − ${b} = ${a - b}.`, P.chain([String(a), `− ${b}`, "?"], ["", "="]));
      },
      worked: [
        { problem: "63 − 27 left?", steps: [["Borrow if needed", "Ones need help."], ["Subtract", "36."]], answer: "36" },
        { problem: "Difference of 50 and 18?", steps: [["Clue", "Difference → subtract."], ["50 − 18", "32."]], answer: "32" }
      ]
    },
    {
      id: "wordmul2", name: "Story problems: multiply", phrase: "Each, groups of, rows of, times — multiply equal groups.",
      steps: ["Find equal groups.", "Count groups × size of a group.", "Or skip-count."],
      exception: "Unequal groups are addition, not a single multiply.",
      pic: () => P.groups(4, 5),
      gen() {
        const g = R(2, 8), n = R(2, 9);
        return Q(`${g} rows of ${n} chairs. How many chairs?`, g * n,
          wrongs(g * n, [g + n, g * n + n, Math.abs(g - n)]),
          `Rows of → multiply: ${g} × ${n} = ${g * n}.`, P.groups(Math.min(g, 6), Math.min(n, 6)));
      },
      worked: [
        { problem: "6 bags with 4 oranges each?", steps: [["Each", "Equal groups."], ["6 × 4", "24."]], answer: "24" },
        { problem: "3 teams of 8?", steps: [["3 × 8", "24."]], answer: "24" }
      ]
    },
    {
      id: "worddiv2", name: "Story problems: divide", phrase: "Share, split equally, how many in each, how many groups — divide.",
      steps: ["Find the total.", "Find how many groups or how many per group.", "Divide."],
      exception: "Ask which question: size of each share, or number of shares?",
      pic: () => P.groups(4, 3),
      gen() {
        const g = R(2, 8), n = R(2, 9), total = g * n;
        const per = Math.random() < 0.5;
        if (per) {
          return Q(`Share ${total} pencils among ${g} kids equally. How many each?`, n,
            wrongs(n, [g, total, n + 1]),
            `${total} ÷ ${g} = ${n}.`, P.groups(g, n));
        }
        return Q(`${total} cookies in bags of ${n}. How many bags?`, g,
          wrongs(g, [n, total, g + 1]),
          `${total} ÷ ${n} = ${g} bags.`);
      },
      worked: [
        { problem: "24 ÷ 6 each?", steps: [["Share", "24 ÷ 6 = 4."]], answer: "4" },
        { problem: "30 apples, 5 per bag. Bags?", steps: [["30 ÷ 5", "6 bags."]], answer: "6" }
      ]
    },
    {
      id: "estimate2", name: "Estimate sums", phrase: "Round both, then add — a friendly estimate.",
      steps: ["Round each number to the nearest ten.", "Add the rounded numbers.", "Say “about.”"],
      exception: "Both rounding up can overshoot. Use estimate to check exact work, not replace it when you need exact.",
      pic: () => P.chain(["28 + 43", "30 + 40", "70"], ["round", "about"]),
      gen() {
        const a = R(21, 78), b = R(21, 78);
        const ra = a % 10 >= 5 ? a + (10 - a % 10) : a - a % 10;
        const rb = b % 10 >= 5 ? b + (10 - b % 10) : b - b % 10;
        const ans = ra + rb;
        return Q(`Estimate ${a} + ${b} (nearest 10s)`, ans,
          wrongs(ans, [a + b, ra, rb, ans + 10]),
          `${a} ≈ ${ra}, ${b} ≈ ${rb}, about ${ans}.`);
      },
      worked: [
        { problem: "Estimate 37 + 22", steps: [["Round", "40 + 20."], ["About", "60."]], answer: "60" },
        { problem: "Estimate 45 + 36", steps: [["Round", "50 + 40."], ["About", "90."]], answer: "90" }
      ]
    },
    {
      id: "mental10", name: "Mental math with tens", phrase: "Add tens to tens, ones to ones — then combine.",
      steps: ["Split each number into tens and ones.", "Add tens. Add ones.", "Put them back together."],
      exception: "If ones make 10 or more, regroup into an extra ten.",
      pic: () => P.placeValue(45),
      gen() {
        const at = R(1, 6), ao = R(1, 8), bt = R(1, 6), bo = R(1, 9 - ao);
        const a = at * 10 + ao, b = bt * 10 + bo;
        return Q(`${a} + ${b}`, a + b,
          wrongs(a + b, [a + b + 10, (at + bt) * 10, a + bo]),
          `Tens ${at}+${bt}=${at + bt}0, ones ${ao}+${bo}=${ao + bo}, total ${a + b}.`,
          P.placeValue(a));
      },
      worked: [
        { problem: "34 + 25", steps: [["Tens", "30 + 20 = 50."], ["Ones", "4 + 5 = 9."], ["Combine", "59."]], answer: "59" },
        { problem: "50 + 40", steps: [["Tens only", "5 + 4 tens = 90."]], answer: "90" }
      ]
    },
    {
      id: "expanded", name: "Expanded form", phrase: "Expanded form shows what each seat is worth.",
      also: "352 = 300 + 50 + 2.",
      steps: ["Read each digit’s seat.", "Write its value.", "Add the values with plus signs."],
      exception: "Don’t write 352 = 3 + 5 + 2. The seats matter: 300 + 50 + 2.",
      pic: () => P.placeValue(352),
      gen() {
        const h = R(1, 9), t = R(0, 9), o = R(0, 9);
        const n = h * 100 + t * 10 + o;
        const ans = `${h * 100} + ${t * 10} + ${o}`;
        return Q(`Expand ${n}`, ans,
          wrongs(ans, [`${h} + ${t} + ${o}`, `${h * 100} + ${t} + ${o}`, `${n}`]),
          `${n} = ${h} hundreds + ${t} tens + ${o} ones = ${ans}.`, P.placeValue(n));
      },
      worked: [
        { problem: "Expand 274", steps: [["Seats", "200 + 70 + 4."]], answer: "200 + 70 + 4" },
        { problem: "Expand 508", steps: [["Zero tens", "500 + 0 + 8."]], answer: "500 + 0 + 8" }
      ]
    },
    {
      id: "factfam", name: "Fact families", phrase: "A fact family: two adds and two subtracts from the same three numbers.",
      steps: ["List the three numbers (two parts and a whole).", "Write both addition facts.", "Write both subtraction facts."],
      exception: "If two numbers match (doubles), the family is smaller — fewer unique sentences.",
      pic: () => P.chain(["3 + 5 = 8", "8 − 5 = 3"], ["family"]),
      gen() {
        const a = R(2, 9), b = R(2, 9), s = a + b;
        if (Math.random() < 0.5) {
          return Q(`Fact family of ${a}, ${b}, ${s}: ${s} − ${a} = ?`, b,
            wrongs(b, [a, s, a + b]),
            `Whole − part: ${s} − ${a} = ${b}.`);
        }
        return Q(`Which belongs with ${a} + ${b} = ${s}?`, `${s} − ${b} = ${a}`,
          wrongs(`${s} − ${b} = ${a}`, [`${a} − ${b} = ${s}`, `${s} + ${a} = ${b}`, `${a} × ${b} = ${s}`]),
          `Same family: ${s} − ${b} = ${a}.`);
      },
      worked: [
        { problem: "Family 2, 6, 8. Missing: 8 − 2 = ?", steps: [["Part left", "6."]], answer: "6" },
        { problem: "4 + 7 = 11. Related subtract?", steps: [["One related", "11 − 7 = 4."]], answer: "11 − 7 = 4" }
      ]
    },
    {
      id: "half2", name: "Halves", phrase: "Half means split into two equal shares.",
      steps: ["Make two equal groups.", "Each group is one half.", "Half of an even number is a whole number."],
      exception: "Half of an odd count leaves a remainder — you can’t split 7 apples into two equal whole apples without cutting.",
      pic: () => P.groups(2, 4),
      gen() {
        const n = R(2, 10) * 2;
        return Q(`Half of ${n}`, n / 2, wrongs(n / 2, [n, n / 2 + 1, n * 2]),
          `Half splits into 2: ${n} ÷ 2 = ${n / 2}.`, P.groups(2, n / 2));
      },
      worked: [
        { problem: "Half of 16?", steps: [["÷ 2", "8."]], answer: "8" },
        { problem: "Half of 20?", steps: [["÷ 2", "10."]], answer: "10" }
      ]
    },
    {
      id: "compare3", name: "Comparing three-digit numbers", phrase: "Compare from the left: hundreds first, then tens, then ones.",
      steps: ["Look at hundreds.", "If tied, look at tens.", "If still tied, look at ones."],
      exception: "A bigger digit on the right doesn’t win if a left seat already decided it: 199 < 201.",
      pic: () => P.placeValue(352),
      gen() {
        let a, b;
        do {
          a = R(100, 899);
          b = Math.random() < 0.25 ? a : R(100, 899);
        } while (false);
        const s = a > b ? ">" : a < b ? "<" : "=";
        return Q(`Which sign: ${a} □ ${b}?`, s, wrongs(s, ["<", ">", "="]),
          a === b ? `Same number: ${a} = ${b}.` : `Leftmost different seat decides: ${a} ${s} ${b}.`,
          P.gator(a > b ? 9 : 3, a > b ? 3 : 9, { hide: true }));
      },
      worked: [
        { problem: "452 □ 425", steps: [["Hundreds tie", "Both 4."], ["Tens", "5 > 2, so 452 > 425."]], answer: ">" },
        { problem: "308 □ 310", steps: [["Step", "Hundreds tie"], ["Tens", "0 < 1, so 308 < 310."]], answer: "<" }
      ]
    },
    {
      id: "moneycent", name: "Coins to a dollar", phrase: "100 cents make a dollar. Count coin jumps.",
      steps: ["Know values: quarter 25, dime 10, nickel 5, penny 1.", "Count up by coin values.", "Stop at 100 for a dollar."],
      exception: "Four quarters make a dollar — not four dimes.",
      pic: () => P.chain(["4 quarters", "100¢", "$1"], ["=", "="]),
      gen() {
        const form = R(1, 3);
        if (form === 1) {
          const q = R(1, 4);
          return Q(`${q} quarter${q > 1 ? "s" : ""} = ? cents`, q * 25,
            wrongs(q * 25, [q * 10, q * 5, 100]),
            `Each quarter is 25¢: ${q} × 25 = ${q * 25}.`);
        }
        if (form === 2) {
          const d = R(2, 9);
          return Q(`${d} dimes = ? cents`, d * 10,
            wrongs(d * 10, [d * 5, d * 25, d]),
            `Each dime is 10¢: ${d * 10}.`);
        }
        return Q(`How many cents in $1?`, 100, wrongs(100, [10, 25, 50]),
          `A dollar is 100 cents.`);
      },
      worked: [
        { problem: "3 quarters = ? ¢", steps: [["25 + 25 + 25", "75."]], answer: "75" },
        { problem: "How many dimes in a dollar?", steps: [["100 ÷ 10", "10 dimes."]], answer: "10" }
      ]
    },
    {
      id: "skip2", name: "Skip-count to multiply", phrase: "Skip-counting is multiplying by hops.",
      steps: ["Pick the hop size.", "Hop that many times.", "The landing number is the product."],
      exception: "Keep every hop the same size. Uneven hops break the multiply story.",
      pic: () => P.chain(["0", "4", "8", "12"], ["+4", "+4", "+4"]),
      gen() {
        const step = pick([2, 3, 4, 5]), times = R(3, 8);
        const ans = step * times;
        return Q(`Skip-count by ${step}, ${times} times (from 0). Land on?`, ans,
          wrongs(ans, [ans + step, ans - step, step + times]),
          `${times} hops of ${step}: ${ans}.`,
          P.chain(["0", String(step), String(2 * step), "?"], [`+${step}`, `+${step}`, "…"]));
      },
      worked: [
        { problem: "Skip by 5, four times from 0?", steps: [["Step", "5, 10, 15, 20"], ["Land", "20."]], answer: "20" },
        { problem: "3 hops of 4?", steps: [["Step", "4, 8, 12"], ["Step", "12."]], answer: "12" }
      ]
    },
    {
      id: "identity2", name: "Identity properties", phrase: "Add 0, stay you. Multiply by 1, stay you.",
      steps: ["+ 0 leaves a number unchanged.", "× 1 leaves a number unchanged.", "Those are identity rules."],
      exception: "× 0 is not identity — it wipes the number to 0.",
      pic: () => P.chain(["7 + 0", "7", "7 × 1", "7"], ["=", "·", "="]),
      gen() {
        const n = R(2, 20);
        if (Math.random() < 0.5) {
          return Q(`${n} + 0`, n, wrongs(n, [0, n + 1, 1]), `Identity for add: ${n} + 0 = ${n}.`);
        }
        return Q(`${n} × 1`, n, wrongs(n, [0, 1, n + 1]), `Identity for multiply: ${n} × 1 = ${n}.`);
      },
      worked: [
        { problem: "15 + 0", steps: [["Add identity", "15."]], answer: "15" },
        { problem: "12 × 1", steps: [["Multiply identity", "12."]], answer: "12" }
      ]
    },
    {
      id: "distrib2", name: "Distributive sneak peek", phrase: "Distribute means give to everyone inside the brackets.",
      also: "a × (b + c) = a × b + a × c.",
      steps: ["See a number outside brackets with a sum inside.", "Multiply the outside by each inside part.", "Add those products."],
      exception: "Distribute over + or − inside. Don’t distribute a sum outside like (a + b) × c by adding first wrongly into multiply — actually (a+b)×c is fine either way, but a+(b×c) is not a(b+c).",
      pic: () => P.chain(["3 × (4 + 2)", "3×4 + 3×2", "18"], ["distribute", "="]),
      gen() {
        const a = R(2, 6), b = R(2, 8), c = R(2, 8);
        const ans = a * (b + c);
        return Q(`${a} × (${b} + ${c})`, ans,
          wrongs(ans, [a * b + c, a + b + c, a * b * c]),
          `Distribute: ${a}×${b} + ${a}×${c} = ${a * b} + ${a * c} = ${ans}.`);
      },
      worked: [
        { problem: "4 × (5 + 3)", steps: [["Distribute", "4×5 + 4×3."], ["20 + 12", "32."]], answer: "32" },
        { problem: "2 × (10 + 7)", steps: [["20 + 14", "34."]], answer: "34" }
      ]
    }
  ]);

  /* ================================================================== */
  /* Grades 3–4                                                          */
  /* ================================================================== */
  add("g3", [
    {
      id: "roman-iview", name: "Roman numerals I V X", phrase: "I View Xylophones: I=1, V=5, X=10 (extend: L=50, C=100, D=500, M=1000).",
      also: "I View X-rays works too for the first three.",
      steps: ["Learn the seven symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.", "Read left to right, adding values.", "Apply subtractive pairs when a smaller symbol sits before a larger one."],
      exception: "Subtractive notation: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900.",
      pic: () => P.chain(["I", "V", "X", "L"], ["1", "5", "10"]),
      gen() {
        const form = R(1, 4);
        if (form === 1) {
          return Q("Roman V equals?", 5, wrongs(5, [1, 10, 50]), "I View Xylophones: V = 5.");
        }
        if (form === 2) {
          return Q("Roman X equals?", 10, wrongs(10, [1, 5, 50]), "X in I View Xylophones is 10.");
        }
        if (form === 3) {
          return Q("What is IV in Hindu–Arabic?", 4, wrongs(4, [6, 5, 1]),
            "Subtractive pair: I before V means 5 − 1 = 4.");
        }
        return Q("What is IX in Hindu–Arabic?", 9, wrongs(9, [11, 10, 8]),
          "Subtractive pair: I before X means 10 − 1 = 9.");
      },
      worked: [
        {
          problem: "Write 14 in Roman numerals.",
          steps: [["Ten", "X = 10."], ["Four", "IV = 4."], ["Combine", "XIV."]],
          answer: "XIV"
        },
        {
          problem: "What is XL?",
          steps: [["Subtractive", "X before L means 50 − 10."], ["Value", "40."]],
          answer: "40"
        }
      ]
    },
    {
      id: "commute3", name: "Commutative multiply", phrase: "Factors can swap seats: 6 × 7 = 7 × 6.",
      steps: ["Write the product either way.", "Use the order you know better.", "The answer matches."],
      exception: "Arrays look different when swapped (2×6 vs 6×2) but count the same dots.",
      pic: () => P.groups(3, 7),
      gen() {
        const a = R(3, 9), b = R(3, 9);
        return Q(`${a} × ${b}`, a * b, wrongs(a * b, [a + b, a * b + a, (a - 1) * b]),
          `${a} × ${b} = ${b} × ${a} = ${a * b}.`, P.groups(Math.min(a, 5), Math.min(b, 6)));
      },
      worked: [
        { problem: "6 × 7", steps: [["Known fact / flip", "7 × 6 = 42."]], answer: "42" },
        { problem: "8 × 4", steps: [["Flip", "4 × 8 = 32."]], answer: "32" }
      ]
    },
    {
      id: "assoc3", name: "Associative multiply", phrase: "Regroup factors: (2 × 3) × 4 = 2 × (3 × 4).",
      steps: ["Look for a friendly pair (like ×10).", "Multiply that pair first.", "Multiply by the leftover factor."],
      exception: "Only regroup — don’t drop a factor.",
      pic: () => P.chain(["(5 × 2) × 6", "10 × 6", "60"], ["regroup", "="]),
      gen() {
        const a = R(2, 5), b = R(2, 5), c = R(2, 6);
        return Q(`(${a} × ${b}) × ${c}`, a * b * c,
          wrongs(a * b * c, [a * b + c, a + b * c, a * b]),
          `First ${a}×${b}=${a * b}, then ×${c} = ${a * b * c}.`);
      },
      worked: [
        { problem: "(4 × 5) × 2", steps: [["20 × 2", "40."]], answer: "40" },
        { problem: "2 × (3 × 10)", steps: [["Step", "3 × 10 = 30"], ["Step", "2 × 30 = 60"]], answer: "60" }
      ]
    },
    {
      id: "distrib3", name: "Distributive property", phrase: "Break a hard times into two easy times, then add.",
      also: "7 × 6 = 7 × (5 + 1) = 35 + 7.",
      steps: ["Split one factor into friendly parts.", "Multiply each part.", "Add the partial products."],
      exception: "Split into a sum (or difference), not a product — that’s a different rule.",
      pic: () => P.chain(["7 × 6", "7×5 + 7×1", "42"], ["split", "="]),
      gen() {
        const a = R(4, 9), t = R(3, 8), o = R(1, 5);
        const b = t + o;
        return Q(`${a} × ${b}`, a * b,
          wrongs(a * b, [a * t, a * o, a * b + a]),
          `${a} × (${t}+${o}) = ${a * t} + ${a * o} = ${a * b}.`);
      },
      worked: [
        { problem: "8 × 7", steps: [["Split 7", "5+2."], ["40 + 16", "56."]], answer: "56" },
        { problem: "6 × 15", steps: [["10+5", "60 + 30 = 90."]], answer: "90" }
      ]
    },
    {
      id: "wordkeys3", name: "Word-problem keywords", phrase: "All/altogether=add · left/remain=subtract · each/groups=multiply · share=divide.",
      steps: ["Scan for a keyword.", "Pick the operation it usually signals.", "Write the number sentence and solve."],
      exception: "Keywords help but the story wins — “each” can divide when sharing.",
      pic: () => P.table(["Word", "Op"], [["altogether", "+"], ["left", "−"], ["each", "×"], ["share", "÷"]], { note: "Keyword cheat sheet" }),
      gen() {
        const kind = pick(["add", "sub", "mul", "div"]);
        if (kind === "add") {
          const a = R(12, 40), b = R(12, 40);
          return Q(`${a} and ${b} marbles altogether?`, a + b, wrongs(a + b, [a - b, a * b, b]),
            `Altogether → ${a} + ${b} = ${a + b}.`);
        }
        if (kind === "sub") {
          const a = R(30, 90), b = R(10, 25);
          return Q(`${a} − ${b} left?`, a - b, wrongs(a - b, [a + b, b]),
            `Left → ${a} − ${b} = ${a - b}.`);
        }
        if (kind === "mul") {
          const g = R(3, 9), n = R(3, 9);
          return Q(`${g} groups of ${n}?`, g * n, wrongs(g * n, [g + n, g * n - n]),
            `Groups of → ${g} × ${n} = ${g * n}.`);
        }
        const g = R(3, 9), n = R(3, 9);
        return Q(`Share ${g * n} into ${g} equal groups. Each?`, n,
          wrongs(n, [g, g * n]), `Share → ${g * n} ÷ ${g} = ${n}.`);
      },
      worked: [
        { problem: "9 packs of 6 — total?", steps: [["each/packs → ×", "9 × 6 = 54."]], answer: "54" },
        { problem: "54 shared by 9?", steps: [["share → ÷", "6."]], answer: "6" }
      ]
    },
    {
      id: "estimate3", name: "Estimate products", phrase: "Round, then multiply — about how many?",
      steps: ["Round each factor to a friendly number.", "Multiply the rounded factors.", "Label it “about.”"],
      exception: "Rounding both up overestimates. Good for checking ballpark, not exact answers.",
      pic: () => P.chain(["19 × 4", "20 × 4", "80"], ["≈", "="]),
      gen() {
        const a = R(12, 48), b = R(3, 9);
        const ra = a % 10 >= 5 ? a + (10 - a % 10) : a - (a % 10 || 0);
        const ans = (ra || 10) * b;
        return Q(`Estimate ${a} × ${b}`, ans,
          wrongs(ans, [a * b, ra, ans + b]),
          `${a} ≈ ${ra || 10}, times ${b} ≈ ${ans}.`);
      },
      worked: [
        { problem: "Estimate 21 × 6", steps: [["20 × 6", "120."]], answer: "120" },
        { problem: "Estimate 38 × 5", steps: [["40 × 5", "200."]], answer: "200" }
      ]
    },
    {
      id: "gallon", name: "Gallon Man", phrase: "King Gallon had 4 quarts; each quart 2 pints; each pint 2 cups.",
      also: "4 quarts = 1 gallon. 2 pints = 1 quart. 2 cups = 1 pint.",
      steps: ["Remember Gallon Man’s body: 4 quarts.", "Each quart arm/leg holds 2 pints.", "Each pint holds 2 cups."],
      exception: "US liquid measures. Don’t mix with liters without converting.",
      pic: () => P.table(["Unit", "Equals"], [["1 gallon", "4 quarts"], ["1 quart", "2 pints"], ["1 pint", "2 cups"]], { note: "Gallon Man" }),
      gen() {
        const form = R(1, 4);
        if (form === 1) return Q(`1 gallon = ? quarts`, 4, wrongs(4, [2, 8, 16]), `Gallon Man: 4 quarts in a gallon.`);
        if (form === 2) return Q(`1 quart = ? pints`, 2, wrongs(2, [4, 8, 1]), `Each quart has 2 pints.`);
        if (form === 3) return Q(`1 pint = ? cups`, 2, wrongs(2, [4, 8, 1]), `Each pint has 2 cups.`);
        return Q(`1 gallon = ? cups`, 16, wrongs(16, [4, 8, 12]), `4 quarts × 2 pints × 2 cups = 16 cups.`);
      },
      worked: [
        { problem: "How many quarts in 2 gallons?", steps: [["2 × 4", "8 quarts."]], answer: "8" },
        { problem: "How many cups in a gallon?", steps: [["4×2×2", "16 cups."]], answer: "16" }
      ]
    },
    {
      id: "kinghenry3", name: "King Henry metric", phrase: "King Henry Died By Drinking Chocolate Milk.",
      also: "Kilo, Hecto, Deca, Base, Deci, Centi, Milli — each step is ×10 or ÷10.",
      steps: ["Line up the King Henry words with prefixes.", "Count hops between units.", "Move the decimal that many places."],
      exception: "“By” is the base unit. Mega/micro/nano are off this ladder. Each hop is ×10 or ÷10. Miles and inches need different bridges.",
      pic: () => P.chain(["kilo", "hecto", "deca", "unit", "deci", "centi", "milli"], ["×10 each →"]),
      gen() {
        const form = R(1, 3);
        if (form === 1) return Q(`1 kilometer = ? meters`, 1000, wrongs(1000, [100, 10, 10000]), `Kilo means 1000: 1 km = 1000 m.`);
        if (form === 2) return Q(`1 meter = ? centimeters`, 100, wrongs(100, [10, 1000, 50]), `Centi is 1/100: 1 m = 100 cm.`);
        return Q(`3 kilometers = ? meters`, 3000, wrongs(3000, [300, 30, 30000]), `3 × 1000 = 3000 m.`);
      },
      worked: [
        { problem: "2 km to meters?", steps: [["Step", "Kilo = 1000"], ["Step", "2 × 1000 = 2000 m"]], answer: "2000" },
        { problem: "1 m to cm?", steps: [["Centi ladder", "100 cm."]], answer: "100" }
      ]
    },
    {
      id: "zeroprop", name: "Zero and one in multiply", phrase: "Times zero wipes out. Times one keeps it.",
      steps: ["n × 0 = 0.", "n × 1 = n.", "Use these as quick checks."],
      exception: "Adding zero keeps n; multiplying by zero does not.",
      pic: () => P.chain(["9 × 0", "0", "9 × 1", "9"], ["=", "·", "="]),
      gen() {
        const n = R(2, 12);
        if (Math.random() < 0.5) return Q(`${n} × 0`, 0, wrongs(0, [n, 1, n + 0]), `Anything × 0 is 0.`);
        return Q(`${n} × 1`, n, wrongs(n, [0, 1, n + 1]), `Anything × 1 is itself.`);
      },
      worked: [
        { problem: "15 × 0", steps: [["Zero property", "0."]], answer: "0" },
        { problem: "15 × 1", steps: [["Identity", "15."]], answer: "15" }
      ]
    },
    {
      id: "remain3", name: "Remainders", phrase: "Divide until you can’t make another full group — what’s left is the remainder.",
      steps: ["Divide for how many full groups.", "Multiply back.", "Subtract from the total — that leftover is R."],
      exception: "Remainder must be smaller than the divisor. If not, you can make another group.",
      pic: () => P.longDiv(17, 5),
      gen() {
        const d = R(3, 9), q = R(2, 8), r = R(1, d - 1);
        const n = d * q + r;
        return Q(`${n} ÷ ${d}: remainder?`, r,
          wrongs(r, [q, d, r + 1, 0]),
          `${n} = ${d}×${q} + ${r}, so remainder ${r}.`, P.longDiv(n, d));
      },
      worked: [
        { problem: "17 ÷ 5", steps: [["3 full groups", "15."], ["Left", "2."]], answer: "R2" },
        { problem: "20 ÷ 6 remainder?", steps: [["Step", "3×6=18"], ["Step", "Left 2"]], answer: "2" }
      ]
    },
    {
      id: "array3", name: "Arrays", phrase: "Rows times columns — an array shows multiply.",
      steps: ["Count the rows.", "Count how many in each row.", "Multiply rows × columns."],
      exception: "A scattered pile is not an array until you line it into equal rows.",
      pic: () => P.groups(3, 5),
      gen() {
        const r = R(2, 6), c = R(2, 8);
        return Q(`Array: ${r} rows, ${c} in each row. Total?`, r * c,
          wrongs(r * c, [r + c, r * c + c, Math.abs(r - c)]),
          `${r} × ${c} = ${r * c}.`, P.groups(r, c));
      },
      worked: [
        { problem: "4×5 array total?", steps: [["4 rows of 5", "20."]], answer: "20" },
        { problem: "3 rows of 7?", steps: [["Step", "21."]], answer: "21" }
      ]
    },
    {
      id: "tomatoes", name: "Feet in a mile", phrase: "Silly optional hook: “five tomatoes” sounds like 5-2-8-0 (feet in a mile).",
      also: "Joke only — always confirm 5,280 ft/mi.",
      steps: ["Picture five tomatoes (optional silly picture).", "Hear 5, 2, 8, 0 as a sound-alike.", "Check the real fact: 5,280 feet per mile."],
      exception: "Not a math procedure — a joke scaffold with no structure. Digits scramble easily; verify 5,280 feet per mile.",
      pic: () => P.formula("1 mile", "5,280 feet", "Five tomatoes"),
      gen() {
        const form = R(1, 3);
        if (form === 1) return Q(`1 mile = ? feet`, 5280, wrongs(5280, [528, 5080, 5800]), `Five tomatoes: 5,280 feet.`);
        if (form === 2) return Q(`Half a mile ≈ ? feet`, 2640, wrongs(2640, [5280, 1320, 2500]), `5,280 ÷ 2 = 2,640.`);
        return Q(`In “five tomatoes,” the digits are?`, "5280", wrongs("5280", ["5028", "5820", "2805"]), `5-2-8-0.`);
      },
      worked: [
        { problem: "Feet in a mile?", steps: [["Five tomatoes", "5,280."]], answer: "5280" },
        { problem: "2 miles in feet?", steps: [["2 × 5280", "10560."]], answer: "10560" }
      ]
    },
    {
      id: "orderops3", name: "× before +", phrase: "My Dear before Aunt Sally: multiply before you add.",
      also: "A early peek at order of operations.",
      steps: ["Scan for × or ÷.", "Do those first (left to right).", "Then + and −."],
      exception: "Brackets still beat everything. × and ÷ tie left to right when both appear; without brackets, ×÷ beat +−.",
      pic: () => P.pemdas(),
      gen() {
        const a = R(2, 9), b = R(2, 8), c = R(2, 8);
        return Q(`${a} + ${b} × ${c}`, a + b * c,
          wrongs(a + b * c, [(a + b) * c, a * b + c, a + b + c]),
          `Multiply first: ${b}×${c}=${b * c}, then +${a} = ${a + b * c}.`);
      },
      worked: [
        { problem: "3 + 4 × 5", steps: [["Step", "4 × 5 = 20"], ["Step", "3 + 20 = 23"]], answer: "23" },
        { problem: "10 − 2 × 3", steps: [["Step", "2 × 3 = 6"], ["Step", "10 − 6 = 4"]], answer: "4" }
      ]
    },
    {
      id: "northdakota", name: "Numerator & denominator", phrase: "Nice Dog: Numerator up, Denominator down. N before D.",
      also: "North Dakota — N above D.",
      steps: ["Top is numerator (N).", "Bottom is denominator (D).", "N before D in the alphabet — top before bottom in the name."],
      exception: "The bar means divide: top ÷ bottom, not bottom ÷ top.",
      pic: () => P.formula("numerator", "denominator", "Nice Dog — N over D"),
      gen() {
        const n = R(1, 8), d = R(n + 1, 9);
        if (Math.random() < 0.5) {
          return Q(`In ${n}/${d}, the numerator is?`, n, wrongs(n, [d, n + d, d - n]),
            `Numerator is the top: ${n}.`);
        }
        return Q(`In ${n}/${d}, the denominator is?`, d, wrongs(d, [n, n + d, 1]),
          `Denominator is the bottom: ${d}.`);
      },
      worked: [
        { problem: "In 3/5, numerator?", steps: [["Top", "3."]], answer: "3" },
        { problem: "In 2/7, denominator?", steps: [["Bottom", "7."]], answer: "7" }
      ]
    },
    {
      id: "mental3", name: "Mental math: ×10 and ×100", phrase: "×10 adds a zero. ×100 adds two zeros.",
      steps: ["For ×10, write a zero on the end.", "For ×100, write two zeros.", "That’s sliding place value."],
      exception: "For decimals the zeros work differently — digits slide across the point.",
      pic: () => P.chain(["7 × 10", "70", "7 × 100", "700"], ["=", "·", "="]),
      gen() {
        const n = R(2, 25);
        if (Math.random() < 0.5) return Q(`${n} × 10`, n * 10, wrongs(n * 10, [n * 100, n + 10, n * 10 + 1]), `×10 → ${n * 10}.`);
        return Q(`${n} × 100`, n * 100, wrongs(n * 100, [n * 10, n + 100, n * 1000]), `×100 → ${n * 100}.`);
      },
      worked: [
        { problem: "14 × 10", steps: [["Add a zero", "140."]], answer: "140" },
        { problem: "9 × 100", steps: [["Two zeros", "900."]], answer: "900" }
      ]
    },
    {
      id: "patterns3", name: "Number patterns", phrase: "Find the jump rule, then keep jumping.",
      steps: ["Subtract neighbors to find the jump.", "Check the jump is steady.", "Apply the jump to find the next term."],
      exception: "Some patterns change rule (square numbers). These drills stay on constant jumps.",
      pic: () => P.chain(["3", "7", "11", "15"], ["+4", "+4", "+4"]),
      gen() {
        const jump = pick([3, 4, 5, 6, 8]), start = R(2, 12);
        const seq = [0, 1, 2, 3].map((i) => start + i * jump);
        const ans = seq[3];
        return Q(`Pattern: ${seq[0]}, ${seq[1]}, ${seq[2]}, ?`, ans,
          wrongs(ans, [ans + 1, ans - jump, seq[2] + 1]),
          `Jump +${jump}: next is ${ans}.`);
      },
      worked: [
        { problem: "5, 10, 15, ?", steps: [["Step", "Jump +5"], ["Step", "20"]], answer: "20" },
        { problem: "2, 6, 10, ?", steps: [["Step", "Jump +4"], ["Step", "14"]], answer: "14" }
      ]
    }
  ]);

  /* ================================================================== */
  /* Grades 5–6                                                          */
  /* ================================================================== */
  add("g5", [
    {
      id: "gems-order", name: "GEMS order of operations", phrase: "GEMS: Grouping, Exponents, Multiply/Divide, Subtract/Add.",
      also: "Multiply with divide, subtract with add — left to right inside each pair.",
      steps: ["Do grouping symbols first: ( ), [ ], { }, fraction bars, | |.", "Then exponents (and roots).", "Then × and ÷ together, left to right.", "Then + and − together, left to right."],
      exception: "Within Multiply/Divide and within Subtract/Add, still go left to right. Grouping includes ( ), [ ], { }, fraction bars, and | |.",
      pic: () => P.pemdas(),
      gen() {
        const form = R(1, 3);
        if (form === 1) {
          return Q("8 − 3 × 2", 2, wrongs(2, [10, 5, 16]),
            "GEMS: Multiply before Subtract: 3 × 2 = 6, then 8 − 6 = 2.");
        }
        if (form === 2) {
          return Q("24 ÷ 6 × 2", 8, wrongs(8, [2, 4, 12]),
            "× and ÷ share a step: left to right. 24 ÷ 6 = 4, then 4 × 2 = 8.");
        }
        return Q("(5 + 3)² ÷ 4", 16, wrongs(16, [11, 8, 64]),
          "Grouping first: 8. Exponent: 64. Divide: 64 ÷ 4 = 16.");
      },
      worked: [
        {
          problem: "6 + 4 × 5",
          steps: [["Multiply/Divide before Subtract/Add", "4 × 5 = 20."], ["Add", "6 + 20 = 26."]],
          answer: "26"
        },
        {
          problem: "18 − 12 ÷ 3 + 1",
          steps: [["÷ first", "12 ÷ 3 = 4."], ["Left to right for +/−", "18 − 4 = 14, then 14 + 1 = 15."]],
          answer: "15"
        }
      ]
    },
    {
      id: "kcf", name: "Kentucky Chicken Fried", phrase: "Kentucky Chicken Fried: Keep, Change, Flip.",
      also: "Keep the first fraction, change ÷ to ×, flip the second.",
      steps: ["Keep the first fraction.", "Change ÷ into ×.", "Flip the second fraction (reciprocal).", "Multiply straight across."],
      exception: "Don’t flip the first fraction. And cancel common factors after the flip, not before you change the sign.",
      pic: () => P.chain(["1/2 ÷ 1/4", "1/2 × 4/1", "2"], ["KCF", "="]),
      gen() {
        const d1 = pick([2, 3, 4, 5, 6, 8]), d2 = pick([2, 3, 4, 5, 6, 8]);
        const n1 = R(1, d1 - 1), n2 = R(1, d2 - 1);
        const ans = fr(n1 * d2, d1 * n2);
        return Q(`${raw(n1, d1)} ÷ ${raw(n2, d2)}`, ans,
          wrongs(ans, [fr(n1 * n2, d1 * d2), fr(d1 * n2, n1 * d2), fr(n1, d1 * n2)]),
          `KCF: ${raw(n1, d1)} × ${raw(d2, n2)} = ${ans}.`);
      },
      worked: [
        { problem: "2/3 ÷ 4/5", steps: [["KCF", "2/3 × 5/4."], ["Multiply", "10/12 = 5/6."]], answer: "5/6" },
        { problem: "1/2 ÷ 1/4", steps: [["Keep-change-flip", "1/2 × 4/1 = 2."]], answer: "2" }
      ]
    },
    {
      id: "bodmas", name: "BODMAS / BIDMAS", phrase: "BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction.",
      also: "Same order as PEMDAS — M/D and A/S are ties left-to-right.",
      steps: ["Brackets first.", "Orders (powers).", "÷ and × left to right.", "+ and − left to right."],
      exception: "Division is not “before” multiplication — they share a rung.",
      pic: () => P.pemdas(),
      gen() {
        const a = R(2, 9), b = R(2, 6), c = R(2, 6);
        if (Math.random() < 0.5) {
          return Q(`${a} + ${b} × ${c}`, a + b * c,
            wrongs(a + b * c, [(a + b) * c, a + b + c]),
            `BODMAS: × before +: ${b}×${c}=${b * c}, +${a}.`);
        }
        const x = b * c * R(1, 3);
        return Q(`${x} ÷ ${b} × ${c}`, (x / b) * c,
          wrongs((x / b) * c, [x / (b * c), x / b + c]),
          `÷ and × left to right: ${x}÷${b}=${x / b}, ×${c}.`);
      },
      worked: [
        { problem: "6 + 2 × 3", steps: [["× first", "6."], ["+ 6", "12? Wait 6+6=12."]], answer: "12" },
        { problem: "(6 + 2) × 3", steps: [["Brackets", "8 × 3 = 24."]], answer: "24" }
      ]
    },
    {
      id: "kinghenry5", name: "Metric ladder hops", phrase: "King Henry Died By Drinking Chocolate Milk — hop the decimal.",
      steps: ["Find start and end prefixes.", "Count hops on King Henry’s ladder.", "Move the decimal one place per hop."],
      exception: "“By” is the base unit. Mega/micro/nano are off this ladder. Hops toward milli use more small pieces; toward kilo, fewer.",
      pic: () => P.chain(["k", "h", "da", "u", "d", "c", "m"], ["King Henry ladder"]),
      gen() {
        const form = R(1, 3);
        if (form === 1) {
          const n = R(2, 15);
          return Q(`${n} m = ? cm`, n * 100, wrongs(n * 100, [n * 10, n * 1000, n]),
            `Unit → centi is 2 hops right: ×100.`);
        }
        if (form === 2) {
          const n = R(2, 20);
          return Q(`${n} km = ? m`, n * 1000, wrongs(n * 1000, [n * 100, n * 10]),
            `Kilo → unit is 3 hops: ×1000.`);
        }
        return Q(`500 cm = ? m`, 5, wrongs(5, [50, 0.5, 500]),
          `Centi → unit: 2 hops left: ÷100.`);
      },
      worked: [
        { problem: "3 m to cm?", steps: [["2 hops right", "300 cm."]], answer: "300" },
        { problem: "2 km to m?", steps: [["3 hops", "2000 m."]], answer: "2000" }
      ]
    },
    {
      id: "gallon5", name: "Customary capacity", phrase: "Gallon Man: 4 quarts, 2 pints each, 2 cups each — 16 cups a gallon.",
      steps: ["Sketch Gallon Man.", "Convert using 4, 2, and 2.", "Multiply hops when going smaller."],
      exception: "Pints and cups are US customary here; UK pints differ.",
      pic: () => P.table(["From", "To"], [["gallon", "4 qt"], ["quart", "2 pt"], ["pint", "2 cup"]], {}),
      gen() {
        const form = R(1, 3);
        if (form === 1) return Q(`3 gallons = ? quarts`, 12, wrongs(12, [6, 8, 16]), `3 × 4 = 12 quarts.`);
        if (form === 2) return Q(`5 quarts = ? pints`, 10, wrongs(10, [5, 20, 8]), `5 × 2 = 10 pints.`);
        return Q(`2 gallons = ? cups`, 32, wrongs(32, [16, 8, 24]), `2 × 16 = 32 cups.`);
      },
      worked: [
        { problem: "2 gal to quarts?", steps: [["2 × 4", "8."]], answer: "8" },
        { problem: "4 qt to cups?", steps: [["4×2×2", "16 cups."]], answer: "16" }
      ]
    },
    {
      id: "commute5", name: "Properties review", phrase: "Commute (flip), associate (regroup), distribute (give to each).",
      steps: ["Name the property used.", "Rewrite with flip, regroup, or distribute.", "Compute the friendly way."],
      exception: "These three are for + and × (distribute mixes × over +). Not for − alone.",
      pic: () => P.chain(["a(b+c)", "ab+ac"], ["distribute"]),
      gen() {
        const a = R(2, 8), b = R(2, 8), c = R(2, 8);
        const kind = pick(["comm", "assoc", "dist"]);
        if (kind === "comm") {
          return Q(`${a} × ${b} = ${b} × ?`, a, wrongs(a, [b, a * b]), `Commutative: flip factors.`);
        }
        if (kind === "assoc") {
          return Q(`(${a} × ${b}) × ${c}`, a * b * c, wrongs(a * b * c, [a * b + c, a + b * c]),
            `Associative regroup product = ${a * b * c}.`);
        }
        return Q(`${a}(${b} + ${c})`, a * (b + c), wrongs(a * (b + c), [a * b + c, a + b + c]),
          `Distribute: ${a * b} + ${a * c} = ${a * (b + c)}.`);
      },
      worked: [
        { problem: "5(6+2)", steps: [["Distribute", "30+10=40."]], answer: "40" },
        { problem: "(2×5)×7", steps: [["10×7", "70."]], answer: "70" }
      ]
    },
    {
      id: "wordkeys5", name: "Operation keywords", phrase: "Altogether add, left subtract, each multiply, share divide.",
      steps: ["Find the keyword.", "Translate to +, −, ×, or ÷.", "Solve and check with the story."],
      exception: "Multi-step stories may need two keywords.",
      pic: () => P.table(["Clue", "Op"], [["total / sum", "+"], ["difference / remain", "−"], ["product / each", "×"], ["quotient / share", "÷"]], {}),
      gen() {
        const g = R(4, 12), n = R(4, 12);
        const kind = pick(["mul", "div", "add", "sub"]);
        if (kind === "mul") return Q(`${g} crates with ${n} each. Product?`, g * n, wrongs(g * n, [g + n, g * n - n]), `${g}×${n}=${g * n}.`);
        if (kind === "div") return Q(`Share ${g * n} into ${g} shares. Each?`, n, wrongs(n, [g, g * n]), `${g * n}÷${g}=${n}.`);
        if (kind === "add") return Q(`${g} + ${n} altogether?`, g + n, wrongs(g + n, [g * n, Math.abs(g - n)]), `${g}+${n}=${g + n}.`);
        const hi = g + n + R(5, 20);
        return Q(`${hi}, then ${n} leave. Remain?`, hi - n, wrongs(hi - n, [hi + n, n]), `${hi}−${n}=${hi - n}.`);
      },
      worked: [
        { problem: "8 groups of 9?", steps: [["each → ×", "72."]], answer: "72" },
        { problem: "72 shared by 8?", steps: [["share → ÷", "9."]], answer: "9" }
      ]
    },
    {
      id: "estimate5", name: "Estimate with decimals", phrase: "Round to whole numbers, then compute — about right.",
      steps: ["Round each decimal to a nearby whole.", "Add, subtract, or multiply the wholes.", "Call it an estimate."],
      exception: "For money, sometimes round to cents instead of wholes.",
      pic: () => P.chain(["2.9 × 4.1", "3 × 4", "12"], ["≈", "about"]),
      gen() {
        const a = R(15, 85), b = R(15, 85);
        const ans = Math.round(a / 10) + Math.round(b / 10);
        return Q(`Estimate ${a / 10} + ${b / 10} (nearest whole)`, ans,
          wrongs(ans, [Math.floor(a / 10) + Math.floor(b / 10), ans + 1, ans - 1]),
          `${a / 10}≈${Math.round(a / 10)}, ${b / 10}≈${Math.round(b / 10)}, about ${ans}.`);
      },
      worked: [
        { problem: "Estimate 3.8 + 2.1", steps: [["4 + 2", "6."]], answer: "6" },
        { problem: "Estimate 6.7 × 2.1", steps: [["7 × 2", "14."]], answer: "14" }
      ]
    },
    {
      id: "benchmark", name: "Fraction benchmarks", phrase: "Compare to 0, 1/2, and 1 — the friendly benchmarks.",
      steps: ["Ask: smaller than 1/2, about 1/2, or bigger?", "Use benchmarks to compare two fractions.", "Confirm with common denominators if needed."],
      exception: "Benchmarks give quick sense — tie-breakers still need exact compare.",
      pic: () => P.fractionBars([{ n: 1, d: 2 }, { n: 2, d: 5 }, { n: 3, d: 4 }]),
      gen() {
        const d = pick([3, 4, 5, 6, 8]);
        const n = R(1, d - 1);
        let bench;
        if (n * 2 < d) bench = "less than 1/2";
        else if (n * 2 === d) bench = "equal to 1/2";
        else bench = "greater than 1/2";
        return Q(`${raw(n, d)} is…`, bench,
          wrongs(bench, ["less than 1/2", "equal to 1/2", "greater than 1/2"]),
          `${n}/${d} vs 1/2: ${bench}.`, P.fractionBars([{ n, d }, { n: 1, d: 2 }]));
      },
      worked: [
        { problem: "3/8 vs 1/2?", steps: [["Step", "Half of 8 is 4"], ["Step", "3 < 4 → less than 1/2"]], answer: "less than 1/2" },
        { problem: "5/6 vs 1/2?", steps: [["Step", "Greater than 1/2"]], answer: "greater than 1/2" }
      ]
    },
    {
      id: "recip5", name: "Reciprocals", phrase: "A reciprocal flips the fraction — product is 1.",
      steps: ["Flip numerator and denominator.", "Check: original × flip = 1.", "Whole number n has reciprocal 1/n."],
      exception: "Zero has no reciprocal. Don’t flip only one part of a mixed number — convert first.",
      pic: () => P.chain(["3/4", "4/3", "1"], ["flip", "product"]),
      gen() {
        const n = R(1, 8), d = R(1, 8);
        if (n === d) return this.gen();
        const ans = raw(d, n);
        return Q(`Reciprocal of ${raw(n, d)}?`, ans,
          wrongs(ans, [raw(n, d), raw(-d, n), String(n * d)]),
          `Flip to ${ans}; product is 1.`);
      },
      worked: [
        { problem: "Reciprocal of 2/5?", steps: [["Flip", "5/2."]], answer: "5/2" },
        { problem: "Reciprocal of 7?", steps: [["Step", "7 = 7/1"], ["Flip", "1/7"]], answer: "1/7" }
      ]
    },
    {
      id: "cancel5", name: "Cancel before multiplying", phrase: "Cancel common factors across the tops and bottoms before you multiply.",
      steps: ["Write the product of fractions.", "Find a factor shared by any numerator and any denominator.", "Divide those out, then multiply what’s left."],
      exception: "Only cancel a factor in a numerator with one in a denominator — never two numerators together.",
      pic: () => P.chain(["2/3 × 3/4", "2/4", "1/2"], ["cancel 3", "="]),
      gen() {
        const a = R(2, 6), b = R(2, 6), k = R(2, 5);
        const ans = fr(a, b);
        return Q(`${raw(a, k)} × ${raw(k, b)}`, ans,
          wrongs(ans, [raw(a * k, k * b), raw(a, k * b), raw(a * k, b)]),
          `Cancel ${k}: left with ${ans}.`);
      },
      worked: [
        { problem: "2/9 × 3/4", steps: [["Cancel…", "or multiply 6/36 = 1/6."], ["Simplify", "1/6."]], answer: "1/6" },
        { problem: "5/6 × 3/5", steps: [["Cancel 5", "1/6 × 3 = 3/6 = 1/2."]], answer: "1/2" }
      ]
    },
    {
      id: "butterfly5", name: "Butterfly compare", phrase: "To compare fractions, cross multiply — the butterfly wings.",
      steps: ["Write the two fractions.", "Cross multiply both diagonals.", "The bigger wing sits under the bigger fraction."],
      exception: "Butterfly compare needs positives. For equals, wings match.",
      pic: () => P.formula("3/4 ? 5/6", "3×6=18, 4×5=20", "20 bigger → 5/6 bigger"),
      gen() {
        let a, b, c, d;
        do {
          a = R(1, 8); b = R(a + 1, 9); c = R(1, 8); d = R(c + 1, 9);
        } while (a * d === b * c);
        const left = a * d, right = b * c;
        const ans = left > right ? `${a}/${b}` : `${c}/${d}`;
        return Q(`Which is larger: ${a}/${b} or ${c}/${d}?`, ans,
          wrongs(ans, [`${a}/${b}`, `${c}/${d}`, "equal"]),
          `Butterfly: ${a}×${d}=${left}, ${b}×${c}=${right} → ${ans} wins.`);
      },
      worked: [
        { problem: "3/4 vs 5/6", steps: [["3×6=18", "4×5=20"], ["Step", "20 bigger → 5/6"]], answer: "5/6" },
        { problem: "2/5 vs 3/7", steps: [["Step", "14 vs 15"], ["Step", "3/7 bigger"]], answer: "3/7" }
      ]
    },
    {
      id: "madface5", name: "MAD face reminder", phrase: "MAD face: Multiply, Add, Denominator stays — mixed → improper.",
      steps: ["Multiply whole × denominator.", "Add the numerator.", "Keep the same denominator."],
      exception: "Going improper → mixed is divide, not MAD. MAD is only mixed to improper.",
      pic: () => P.chain(["2 1/3", "2×3+1", "7/3"], ["MAD", "="]),
      gen() {
        const w = R(2, 6), d = R(2, 8), n = R(1, d - 1);
        const ans = raw(w * d + n, d);
        return Q(`Convert ${w} ${n}/${d} to improper`, ans,
          wrongs(ans, [raw(w * n, d), raw(w * d - n, d), raw(w + n, d)]),
          `MAD: ${w}×${d}+${n}=${w * d + n}, so ${ans}.`);
      },
      worked: [
        { problem: "3 1/4 to improper", steps: [["Step", "3×4+1=13"], ["Step", "13/4"]], answer: "13/4" },
        { problem: "2 2/5 to improper", steps: [["Step", "2×5+2=12"], ["Step", "12/5"]], answer: "12/5" }
      ]
    },
    {
      id: "mental5", name: "Mental percent benchmarks", phrase: "10% is ÷10. 50% is half. 25% is quarter.",
      steps: ["Memorize 10%, 25%, 50%, 75% as friendly hooks.", "Build others from 10% chunks.", "Check: percent means /100."],
      exception: "5% is half of 10%, not half of 50%.",
      pic: () => P.grid100(25),
      gen() {
        const n = pick([40, 60, 80, 120, 200]);
        const p = pick([10, 25, 50]);
        const ans = (p * n) / 100;
        return Q(`${p}% of ${n}`, ans, wrongs(ans, [p, n / p, ans * 2]),
          `${p}% of ${n} = ${ans}.`, P.grid100(p));
      },
      worked: [
        { problem: "10% of 80?", steps: [["÷10", "8."]], answer: "8" },
        { problem: "25% of 40?", steps: [["Quarter", "10."]], answer: "10" }
      ]
    },
    {
      id: "leftright5", name: "Left to right ties", phrase: "When × and ÷ share a rung, walk left to right — don’t leapfrog.",
      steps: ["Find a ×/÷ streak with no brackets.", "Do the leftmost operation first.", "Then the next."],
      exception: "Brackets and powers still go earlier. Only pure ×÷ (or +−) streaks use left-to-right.",
      pic: () => P.chain(["24 ÷ 3 × 2", "8 × 2", "16"], ["left first", "="]),
      gen() {
        const b = R(2, 6), c = R(2, 6), a = b * R(2, 6);
        return Q(`${a} ÷ ${b} × ${c}`, (a / b) * c,
          wrongs((a / b) * c, [a / (b * c), a * c / (b + 1) | 0, a - b * c].map((x) => (Number.isFinite(x) ? x : null))),
          `Left to right: ${a}÷${b}=${a / b}, then ×${c}=${(a / b) * c}.`);
      },
      worked: [
        { problem: "36 ÷ 6 × 3", steps: [["Step", "36÷6=6"], ["Step", "6×3=18"]], answer: "18" },
        { problem: "8 × 3 ÷ 4", steps: [["Step", "24÷4=6"]], answer: "6" }
      ]
    },
    {
      id: "simplify5", name: "Simplify fractions", phrase: "Divide top and bottom by the same common factor — what you do to the top, do to the bottom.",
      steps: ["Find a common factor of numerator and denominator.", "Divide both by it.", "Repeat until only 1 is left as common factor."],
      exception: "You must divide both. Dividing only the top changes the value.",
      pic: () => P.fractionBars([{ n: 4, d: 6 }, { n: 2, d: 3 }]),
      gen() {
        const g = pick([2, 3, 4, 5]), n = g * R(1, 5), d = g * R(n / g + 1, 8);
        const ans = fr(n, d);
        return Q(`Simplify ${n}/${d}`, ans,
          wrongs(ans, [raw(n, d), raw(n / g, d), raw(n, d / g)]),
          `Divide top and bottom by ${gcd(n, d)} → ${ans}.`);
      },
      worked: [
        { problem: "Simplify 8/12", steps: [["÷4", "2/3."]], answer: "2/3" },
        { problem: "Simplify 9/15", steps: [["÷3", "3/5."]], answer: "3/5" }
      ]
    }
  ]);

  /* ================================================================== */
  /* Grade 7                                                             */
  /* ================================================================== */
  add("g7", [
    {
      id: "dirt-distance", name: "Distance = rate × time", phrase: "d = rt — dirt.",
      also: "Distance, rate, time share one triangle of formulas.",
      steps: ["Write d = rt.", "Substitute the known values.", "Solve for the unknown.", "Check that units match."],
      exception: "Units must match. Average speed ≠ instantaneous speed.",
      pic: () => P.formula("d", "r × t", "dirt"),
      gen() {
        const r = R(3, 12) * 5, t = R(2, 8);
        const form = R(1, 3);
        if (form === 1) {
          return Q(`A bike goes ${r} km/h for ${t} h. How far?`, r * t,
            wrongs(r * t, [r + t, r * t + r, Math.abs(r - t)]),
            `d = rt: ${r} × ${t} = ${r * t} km.`);
        }
        if (form === 2) {
          const d = r * t;
          return Q(`Travel ${d} km at ${r} km/h. How many hours?`, t,
            wrongs(t, [r, d, t + 1]),
            `t = d ÷ r: ${d} ÷ ${r} = ${t} h.`);
        }
        const d = r * t;
        return Q(`Cover ${d} km in ${t} h. What average speed?`, r,
          wrongs(r, [d, t, r + t]),
          `r = d ÷ t: ${d} ÷ ${t} = ${r} km/h.`);
      },
      worked: [
        {
          problem: "A train at 80 km/h runs for 3 hours. How far?",
          steps: [["dirt", "d = rt."], ["Multiply", "80 × 3 = 240."]],
          answer: "240 km"
        },
        {
          problem: "240 km at 60 km/h. How long?",
          steps: [["Rearrange", "t = d ÷ r."], ["Divide", "240 ÷ 60 = 4."]],
          answer: "4 h"
        }
      ]
    },
    {
      id: "speed-triangle", name: "D–S–T cover-up", phrase: "Distance = speed × time; cover up the unknown in the D–S–T relation.",
      steps: ["Identify which of D, S, T you need.", "Cover that letter: the other two show multiply or divide.", "Use D = ST, S = D ÷ T, or T = D ÷ S.", "Check units."],
      exception: "Use consistent units. Average speed is total distance ÷ total time — not the average of speeds.",
      pic: () => P.chain(["D", "S × T"], ["="]),
      gen() {
        const s = R(4, 15) * 2, t = R(2, 6), d = s * t;
        const form = pick(["D", "S", "T"]);
        if (form === "D") {
          return Q(`Cover D: speed ${s}, time ${t}. Distance?`, d,
            wrongs(d, [s + t, s * t + s, t]),
            `Cover D → multiply: ${s} × ${t} = ${d}.`);
        }
        if (form === "S") {
          return Q(`Cover S: distance ${d}, time ${t}. Speed?`, s,
            wrongs(s, [d, t, d + t]),
            `Cover S → divide: ${d} ÷ ${t} = ${s}.`);
        }
        return Q(`Cover T: distance ${d}, speed ${s}. Time?`, t,
          wrongs(t, [s, d, t + 1]),
          `Cover T → divide: ${d} ÷ ${s} = ${t}.`);
      },
      worked: [
        {
          problem: "Distance 150 km, speed 50 km/h. Find time.",
          steps: [["Cover T", "T = D ÷ S."], ["Compute", "150 ÷ 50 = 3."]],
          answer: "3 h"
        },
        {
          problem: "Two legs: 60 km at 30 km/h, then 60 km at 60 km/h. Average speed for the whole trip?",
          steps: [["Total distance", "120 km."], ["Total time", "2 h + 1 h = 3 h."], ["Average", "120 ÷ 3 = 40 km/h — not (30+60)/2."]],
          answer: "40 km/h"
        }
      ]
    },
    {
      id: "scalene-odd-one", name: "Scalene triangles", phrase: "Scalene is the odd one out: no equal sides.",
      also: "Equilateral: all equal. Isosceles: at least two equal.",
      steps: ["Compare the three side lengths.", "No equals → scalene.", "Two equal → isosceles; three equal → equilateral."],
      exception: "Side names ≠ angle names (acute/right/obtuse). A scalene triangle can still be acute, right, or obtuse.",
      pic: () => P.tri("5", "6", "7"),
      gen() {
        const form = R(1, 3);
        if (form === 1) {
          return Q("A triangle with sides 5, 6, 7 is…", "scalene",
            wrongs("scalene", ["isosceles", "equilateral", "right"]),
            "No sides equal → scalene, the odd one out.");
        }
        if (form === 2) {
          return Q("A triangle with sides 5, 5, 7 is…", "isosceles",
            wrongs("isosceles", ["scalene", "equilateral", "obtuse"]),
            "Two sides equal → isosceles.");
        }
        return Q("Scalene means…", "no equal sides",
          wrongs("no equal sides", ["all sides equal", "two sides equal", "all angles 60°"]),
          "Scalene is the odd one out: no equal sides.");
      },
      worked: [
        {
          problem: "Sides 8, 8, 8. Classify by sides.",
          steps: [["Compare", "All three equal."], ["Name", "Equilateral (a special isosceles)."]],
          answer: "equilateral"
        },
        {
          problem: "Can a scalene triangle have a right angle?",
          steps: [["Side vs angle", "Scalene is about sides."], ["Example", "3-4-5 is scalene and right-angled."]],
          answer: "yes (e.g. 3-4-5)"
        }
      ]
    },
    {
      id: "kcc", name: "Keep Change Change", phrase: "Keep Change Change: keep the first, change − to +, change the next sign.",
      also: "Subtracting a negative is adding: a − (−b) = a + b.",
      steps: ["Keep the first number.", "Change the subtraction to addition.", "Change the sign of the second number.", "Then add integers."],
      exception: "KCC is for subtraction of integers. Don’t KCC a multiplication.",
      pic: () => P.chain(["5 − (−3)", "5 + (+3)", "8"], ["KCC", "="]),
      gen() {
        let a, b;
        do { a = R(-9, 9); b = R(-9, 9); } while (!a || !b);
        const ans = a - b;
        return Q(`${neg(a)} − (${neg(b)})`, neg(ans),
          wrongs(neg(ans), [neg(a + b), neg(-(a - b)), neg(b - a)]),
          `KCC: ${neg(a)} + (${neg(-b)}) = ${neg(ans)}.`,
          P.numberLine(Math.min(a, ans, 0) - 1, Math.max(a, ans, 0) + 1, a, [-b]));
      },
      worked: [
        { problem: "6 − (−2)", steps: [["KCC", "6 + 2."], ["Step", "8"]], answer: "8" },
        { problem: "−4 − 3", steps: [["KCC", "−4 + (−3) = −7."]], answer: "−7" }
      ]
    },
    {
      id: "arithspell", name: "Spelling arithmetic", phrase: "A Rat In The House May Eat The Ice Cream.",
      also: "A-R-I-T-H-M-E-T-I-C.",
      steps: ["Use the sentence initials.", "Write A R I T H M E T I C.", "That’s “arithmetic.”"],
      exception: "It’s a spelling hook — not a calculation method.",
      pic: () => P.chain(["A", "R", "I", "T", "H", "M", "E", "T", "I", "C"], ["Rat In The House…"]),
      gen() {
        const form = R(1, 3);
        if (form === 1) return Q(`Initial of “Rat” in the arithmetic spelling mnemonic?`, "R", wrongs("R", ["A", "I", "T"]), `A Rat… → R.`);
        if (form === 2) return Q(`How many letters in “arithmetic”?`, 10, wrongs(10, [9, 11, 8]), `A-R-I-T-H-M-E-T-I-C → 10.`);
        return Q(`Ice Cream stands for which ending letters?`, "IC", wrongs("IC", ["TI", "ME", "TH"]), `…Ice Cream → I C.`);
      },
      worked: [
        { problem: "Spell arithmetic with the rat sentence", steps: [["Step", "A Rat In The House May Eat The Ice Cream"], ["Step", "ARITHMETIC"]], answer: "ARITHMETIC" },
        { problem: "Third letter?", steps: [["A R I…", "I"]], answer: "I" }
      ]
    },
    {
      id: "commute7", name: "Integer properties", phrase: "Flip and regroup still work with negatives for + and ×.",
      steps: ["Commutative: order can flip for + and ×.", "Associative: regroup + or ×.", "Watch signs when you distribute."],
      exception: "Subtraction isn’t commutative even with KCC — rewrite as adding the opposite first.",
      pic: () => P.signs(),
      gen() {
        const a = R(2, 8) * pick([1, -1]), b = R(2, 8) * pick([1, -1]);
        return Q(`${neg(a)} + ${neg(b)}`, neg(a + b),
          wrongs(neg(a + b), [neg(a - b), neg(-(a + b)), neg(a * b)]),
          `Add integers (order free): ${neg(a + b)}.`);
      },
      worked: [
        { problem: "−3 + 5", steps: [["Different signs", "5−3=2."]], answer: "2" },
        { problem: "−2 × (−4)", steps: [["Friends", "+8."]], answer: "8" }
      ]
    },
    {
      id: "distrib7", name: "Distribute with signs", phrase: "Give the outside factor — including its sign — to each term inside.",
      steps: ["Write a(b + c) as ab + ac.", "If outside is negative, every term flips sign.", "Simplify."],
      exception: "−(x − 3) = −x + 3, not −x − 3.",
      pic: () => P.chain(["−2(x − 4)", "−2x + 8"], ["distribute"]),
      gen() {
        const a = R(2, 6) * pick([1, -1]), b = R(2, 8), c = R(2, 8) * pick([1, -1]);
        const ans = a * (b + c);
        return Q(`${neg(a)}(${b} + ${neg(c)})`, neg(ans),
          wrongs(neg(ans), [neg(a * b + c), neg(a * b - c), neg(a + b + c)]),
          `Distribute: ${neg(a * b)} + ${neg(a * c)} = ${neg(ans)}.`);
      },
      worked: [
        { problem: "−3(2 + 4)", steps: [["−6 + (−12)", "−18."]], answer: "−18" },
        { problem: "−2(5 − 1)", steps: [["−2×5 + (−2)×(−1)? Wait 5−1=4", "−8."]], answer: "−8" }
      ]
    },
    {
      id: "wordkeys7", name: "Integer word clues", phrase: "Altogether still adds; left still subtracts — now signs can be negative.",
      steps: ["Translate keywords to operations.", "Attach signs from the story (debt, below, loss).", "Compute with integer rules."],
      exception: "“More than” on a number line can mean move positive even if you started negative.",
      pic: () => P.numberLine(-5, 5, -2, [5]),
      gen() {
        const a = R(5, 20), b = R(2, 9);
        if (Math.random() < 0.5) {
          return Q(`A submarine at −${a} m rises ${b} m. New depth?`, neg(-a + b),
            wrongs(neg(-a + b), [neg(-a - b), neg(a + b), String(b - a)]),
            `−${a} + ${b} = ${neg(-a + b)}.`);
        }
        return Q(`Balance $${a}, then spend $${b}. What’s left?`, a - b,
          wrongs(a - b, [a + b, b - a, -b]),
          `${a} − ${b} = ${a - b}.`);
      },
      worked: [
        { problem: "−8 + 3", steps: [["Rise 3 from −8", "−5."]], answer: "−5" },
        { problem: "Debt 12, pay 5. Debt left?", steps: [["12 − 5", "7 debt → −7 if signed."]], answer: "7 (or −7 as signed debt)" }
      ]
    },
    {
      id: "estimate7", name: "Estimate percents", phrase: "Round the amount, use a friendly percent, then adjust.",
      steps: ["Round the base number.", "Take 10% or 50% as a hook.", "Scale up to the percent you need."],
      exception: "Estimates for tips/tax are fine; bank interest needs exact.",
      pic: () => P.grid100(10),
      gen() {
        const n = pick([80, 120, 200, 250]);
        const p = pick([10, 20, 25, 50]);
        const ans = (p * n) / 100;
        return Q(`About ${p}% of ${n}?`, ans, wrongs(ans, [p, n - ans, ans / 2]),
          `${p}% of ${n} = ${ans}.`);
      },
      worked: [
        { problem: "10% of 250?", steps: [["÷10", "25."]], answer: "25" },
        { problem: "20% of 80?", steps: [["2 × 10%", "16."]], answer: "16" }
      ]
    },
    {
      id: "absval", name: "Absolute value", phrase: "Absolute value is distance from zero — always positive (or zero).",
      steps: ["Find how far the number is from 0.", "Drop the sign.", "Write |n| for that distance."],
      exception: "|−3| = 3, but that doesn’t make −3 positive in every equation — context matters.",
      pic: () => P.numberLine(-4, 4, -3, []),
      gen() {
        const n = R(1, 12) * pick([1, -1]);
        return Q(`|${neg(n)}|`, Math.abs(n), wrongs(Math.abs(n), [n, -Math.abs(n), Math.abs(n) + 1]),
          `Distance from 0 is ${Math.abs(n)}.`);
      },
      worked: [
        { problem: "|−9|", steps: [["Distance", "9."]], answer: "9" },
        { problem: "|4|", steps: [["Already positive", "4."]], answer: "4" }
      ]
    },
    {
      id: "unitrate7", name: "Unit rate", phrase: "Find the rate for one, and then you’re done.",
      steps: ["Divide total by the count.", "Label “per one.”", "Multiply the unit rate for more."],
      exception: "Keep units matched: miles per hour, not miles per minute mixed in.",
      pic: () => P.chain(["120 miles / 3 h", "40 mph"], ["÷3"]),
      gen() {
        const u = R(2, 9), r = R(3, 12), total = u * r;
        return Q(`${total} for ${u} items. Cost each?`, r,
          wrongs(r, [u, total, r + u]),
          `Unit rate: ${total} ÷ ${u} = ${r}.`);
      },
      worked: [
        { problem: "$18 for 6 bottles. Each?", steps: [["18÷6", "$3."]], answer: "3" },
        { problem: "150 km in 3 h. Per hour?", steps: [["Step", "50 km/h"]], answer: "50" }
      ]
    },
    {
      id: "cross7", name: "Cross multiply solve", phrase: "Butterfly: cross multiply, then divide to free x.",
      steps: ["Set up equal ratios.", "Cross multiply.", "Divide by the coefficient of x."],
      exception: "Only when two ratios are equal — not for adding fractions.",
      pic: () => P.formula("2/5", "x/20", "2×20 = 5x"),
      gen() {
        const a = R(2, 8), m = R(2, 6), b = a * m, x = R(3, 9), d = x * m;
        return Q(`${a}/${b} = ${x}/?`, d, wrongs(d, [x, b, a * x]),
          `Butterfly: ${a}×? = ${b}×${x} → ? = ${d}.`);
      },
      worked: [
        { problem: "3/5 = x/20", steps: [["Step", "5x=60"], ["Step", "x=12"]], answer: "12" },
        { problem: "2/7 = 6/x", steps: [["Step", "2x=42"], ["Step", "x=21"]], answer: "21" }
      ]
    },
    {
      id: "scale7", name: "Scale factor", phrase: "New = old × scale. Scale >1 grows; between 0 and 1 shrinks.",
      steps: ["Identify the scale factor k.", "Multiply every length by k.", "Areas scale by k² (careful!)."],
      exception: "A scale of 2 doubles lengths, but area becomes ×4.",
      pic: () => P.similar("3", "6"),
      gen() {
        const old = R(4, 12), k = pick([2, 3, 4]);
        return Q(`Length ${old} scaled by ${k}. New length?`, old * k,
          wrongs(old * k, [old + k, old * k * k, old]),
          `${old} × ${k} = ${old * k}.`, P.similar(String(old), "?"));
      },
      worked: [
        { problem: "5 cm map, scale ×3?", steps: [["Step", "15 cm"]], answer: "15" },
        { problem: "12 scaled by 1/2?", steps: [["Step", "6"]], answer: "6" }
      ]
    },
    {
      id: "opposites7", name: "Additive inverses", phrase: "A number plus its opposite makes zero.",
      steps: ["Find the opposite (flip the sign).", "Add them.", "Sum is 0."],
      exception: "Opposite of 0 is 0. Opposite is not the same as reciprocal.",
      pic: () => P.numberLine(-5, 5, 3, [-6]),
      gen() {
        const n = R(1, 15) * pick([1, -1]);
        return Q(`${neg(n)} + ? = 0`, neg(-n), wrongs(neg(-n), [neg(n), 0, 1]),
          `Opposite of ${neg(n)} is ${neg(-n)}.`);
      },
      worked: [
        { problem: "Opposite of −11?", steps: [["Step", "+11"]], answer: "11" },
        { problem: "7 + ? = 0", steps: [["Step", "−7"]], answer: "−7" }
      ]
    },
    {
      id: "taxest7", name: "Mental tax & tip", phrase: "10% hop the decimal; 20% is double that; 15% is 10% + half of 10%.",
      steps: ["Find 10% by moving the decimal one left.", "Build 5%, 15%, 20% from that.", "Add to the bill for tip/tax."],
      exception: "Exact tax rates may be 6.25% — estimate first, then calculate exactly if needed.",
      pic: () => P.chain(["$40", "10%=$4", "15%=$6"], ["→", "→"]),
      gen() {
        const bill = pick([20, 40, 60, 80]);
        const p = pick([10, 15, 20]);
        const tip = (p * bill) / 100;
        return Q(`${p}% tip on $${bill}?`, tip, wrongs(tip, [bill * 0.1, tip + 1, bill]),
          `${p}% of ${bill} = ${tip}.`);
      },
      worked: [
        { problem: "15% of $40", steps: [["10%=4", "5%=2"], ["Step", "6"]], answer: "6" },
        { problem: "20% of $50", steps: [["10%=5", "×2=10"]], answer: "10" }
      ]
    },
    {
      id: "orderint7", name: "Order with negatives", phrase: "On the number line, left is smaller — even if the digits look bigger.",
      steps: ["Picture the number line.", "More left = smaller.", "−10 is less than −2."],
      exception: "|−10| > |−2|, but −10 < −2.",
      pic: () => P.numberLine(-6, 3, -5, []),
      gen() {
        let a, b;
        do { a = R(-12, 8); b = R(-12, 8); } while (a === b);
        const s = a > b ? ">" : "<";
        return Q(`${neg(a)} □ ${neg(b)}`, s, wrongs(s, ["<", ">", "="]),
          `${neg(a)} is ${a > b ? "right of" : "left of"} ${neg(b)} → ${s}.`);
      },
      worked: [
        { problem: "−3 □ −7", steps: [["−3 right of −7", ">"]], answer: ">" },
        { problem: "−8 □ 1", steps: [["−8 left", "<"]], answer: "<" }
      ]
    },
    {
      id: "convert7", name: "Fraction–decimal–percent", phrase: "Percent is hundredths; hop the decimal two places.",
      steps: ["Fraction → divide top by bottom.", "Decimal → percent: ×100 (hop 2).", "Percent → decimal: ÷100."],
      exception: "1/3 is 0.333… repeating — percent ≈ 33.3%, not a tidy terminating decimal.",
      pic: () => P.chain(["1/4", "0.25", "25%"], ["÷", "×100"]),
      gen() {
        const p = pick([10, 20, 25, 50, 75]);
        const form = R(1, 3);
        if (form === 1) return Q(`${p}% as a decimal`, p / 100, wrongs(p / 100, [p, p / 10, p * 100]), `Hop 2 left: ${p / 100}.`);
        if (form === 2) return Q(`${p / 100} as a percent`, `${p}%`, wrongs(`${p}%`, [`${p / 10}%`, `${p * 10}%`, `${100 - p}%`]), `Hop 2 right: ${p}%.`);
        return Q(`${p}% as a fraction (simplify)`, fr(p, 100), wrongs(fr(p, 100), [raw(p, 100), fr(p, 10)]), `${p}/100 = ${fr(p, 100)}.`);
      },
      worked: [
        { problem: "0.4 as %?", steps: [["×100", "40%."]], answer: "40%" },
        { problem: "25% as fraction?", steps: [["25/100", "1/4"]], answer: "1/4" }
      ]
    },
    {
      id: "mental7", name: "Mental integer chains", phrase: "Do easy jumps on the number line: +10, −10, then the leftovers.",
      steps: ["Chunk the second number into friendly jumps.", "Move on the number line.", "Land on the answer."],
      exception: "Don’t reverse a jump direction when signs get messy — rewrite with KCC first if subtracting.",
      pic: () => P.numberLine(-8, 8, -3, [5]),
      gen() {
        const a = R(-20, 20), b = pick([10, -10, 5, -5, 8, -8]);
        if (!a) return this.gen();
        return Q(`${neg(a)} + ${neg(b)}`, neg(a + b),
          wrongs(neg(a + b), [neg(a - b), neg(-(a + b))]),
          `${neg(a)} + ${neg(b)} = ${neg(a + b)}.`);
      },
      worked: [
        { problem: "−6 + 10", steps: [["Jump +10", "4."]], answer: "4" },
        { problem: "8 + (−5)", steps: [["Jump −5", "3."]], answer: "3" }
      ]
    }
  ]);

  /* ================================================================== */
  /* Grade 8                                                             */
  /* ================================================================== */
  add("g8", [
    {
      id: "neg-exponent-one-over", name: "Negative exponents", phrase: "Negative exponent: take one over with a positive power.",
      also: "a^(−n) = 1/a^n — the minus flips to a reciprocal, not a negative value.",
      steps: ["Rewrite a^(−n) as 1/a^n.", "Simplify the positive power in the denominator.", "Cancel if possible."],
      exception: "x^(−n)=1/x^n for x≠0. A negative exponent does not make the value negative by itself. 2^(−3)=1/8, not −8.",
      pic: () => P.chain(["2⁻³", "1/2³", "1/8"], ["=", "="]),
      gen() {
        const a = R(2, 5), n = R(2, 4);
        const den = a ** n;
        const form = R(1, 3);
        if (form === 1) {
          return Q(`${a}^(−${n})`, raw(1, den),
            wrongs(raw(1, den), [neg(-(den)), String(den), raw(1, a * n)]),
            `Take one over with a positive power: 1/${a}^${n} = 1/${den}.`);
        }
        if (form === 2) {
          return Q(`Which equals ${a}^(−${n})?`, `1/${a}^${n}`,
            wrongs(`1/${a}^${n}`, [`−${a}^${n}`, `${a}^${n}`, `1/${a}^(−${n})`]),
            `Negative exponent → reciprocal: 1/${a}^${n}.`);
        }
        return Q(`${a}^(−1)`, raw(1, a),
          wrongs(raw(1, a), [neg(-a), String(a), raw(1, a * a)]),
          `${a}^(−1) = 1/${a}.`);
      },
      worked: [
        {
          problem: "Simplify 5⁻².",
          steps: [["One over", "1/5²."], ["Power", "1/25."]],
          answer: "1/25"
        },
        {
          problem: "Is 3⁻² equal to −9?",
          steps: [["Check the myth", "Negative exponent ≠ negative value."], ["Correct", "3⁻² = 1/9."]],
          answer: "no — it is 1/9"
        }
      ]
    },
    {
      id: "compsupp", name: "Complementary & supplementary", phrase: "C before S: complementary 90°, supplementary 180°. Corner then Straight.",
      also: "C for corner (90). S for straight (180).",
      steps: ["Complementary: two angles add to 90°.", "Supplementary: two angles add to 180°.", "C comes before S; 90 comes before 180."],
      exception: "They need not be adjacent — they only need to add to 90 or 180.",
      pic: () => P.tri("90°", "35°", "55°"),
      gen() {
        const comp = Math.random() < 0.5;
        const a = comp ? R(15, 75) : R(20, 160);
        const ans = (comp ? 90 : 180) - a;
        return Q(`${comp ? "Complement" : "Supplement"} of ${a}°?`, deg(ans),
          wrongs(deg(ans), [deg((comp ? 180 : 90) - a), deg(a), deg(ans + 10)]),
          `${comp ? "C/90" : "S/180"}: ${a}° + ${ans}° = ${comp ? 90 : 180}°.`);
      },
      worked: [
        { problem: "Complement of 35°?", steps: [["90 − 35", "55°."]], answer: "55°" },
        { problem: "Supplement of 110°?", steps: [["180 − 110", "70°."]], answer: "70°" }
      ]
    },
    {
      id: "riserun", name: "Rise over run", phrase: "Slope is rise over run — up then along.",
      steps: ["Count vertical change (rise).", "Count horizontal change (run).", "Slope = rise/run."],
      exception: "Horizontal line: rise 0 → slope 0. Vertical line: run 0 → undefined.",
      pic: () => P.formula("rise", "run", "slope m"),
      gen() {
        const x1 = R(0, 4), y1 = R(0, 4), rx = R(1, 4), ry = R(-4, 4);
        if (!ry) return this.gen();
        const x2 = x1 + rx, y2 = y1 + ry;
        const g = gcd(ry, rx), ans = fr(ry / g, rx / g);
        return Q(`Slope from (${x1},${y1}) to (${x2},${y2})?`, ans,
          wrongs(ans, [fr(rx, ry), fr(-ry, rx), String(ry - rx)]),
          `Rise ${ry}, run ${rx} → ${ans}.`);
      },
      worked: [
        { problem: "(1,2) to (4,8)", steps: [["Step", "Rise 6, run 3"], ["Step", "6/3=2"]], answer: "2" },
        { problem: "(0,5) to (2,1)", steps: [["Step", "Rise −4, run 2"], ["Step", "−2"]], answer: "−2" }
      ]
    },
    {
      id: "wordkeys8", name: "Arithmetic in geometry stories", phrase: "Perimeter altogether adds sides; area is groups of square units; share angles with 180°.",
      steps: ["Translate the story to +, −, ×, or ÷.", "Use the geometry fact (180°, fence vs carpet).", "Solve."],
      exception: "“Around” is perimeter; “covers” is area — don’t swap formulas.",
      pic: () => P.chain(["fence", "perimeter", "carpet", "area"], ["→", "·", "→"]),
      gen() {
        const a = R(3, 12), b = R(3, 12);
        if (Math.random() < 0.5) {
          return Q(`Rectangle ${a} by ${b}: perimeter?`, 2 * (a + b),
            wrongs(2 * (a + b), [a * b, a + b, 2 * a * b]),
            `Fence: 2(${a}+${b}) = ${2 * (a + b)}.`);
        }
        return Q(`Rectangle ${a} by ${b}: area?`, a * b,
          wrongs(a * b, [2 * (a + b), a + b]),
          `Carpet: ${a}×${b}=${a * b}.`);
      },
      worked: [
        { problem: "5×8 rectangle area?", steps: [["Step", "40"]], answer: "40" },
        { problem: "5×8 perimeter?", steps: [["Step", "2(13)=26"]], answer: "26" }
      ]
    },
    {
      id: "estimate8", name: "Estimate roots & squares", phrase: "Square a nearby whole; see if your number sits between two squares.",
      steps: ["List nearby perfect squares.", "Sandwich the number.", "Estimate the root between those integers."],
      exception: "√50 is a bit more than 7 because 7²=49.",
      pic: () => P.chain(["7²=49", "√50≈7.1", "8²=64"], ["<", "<"]),
      gen() {
        const n = R(4, 12);
        return Q(`${n}²`, n * n, wrongs(n * n, [n * n + n, 2 * n, n * n - 1]),
          `${n}×${n}=${n * n}.`);
      },
      worked: [
        { problem: "9²?", steps: [["Step", "81"]], answer: "81" },
        { problem: "Between which integers is √20?", steps: [["Step", "16=4², 25=5²"], ["Step", "between 4 and 5"]], answer: "4 and 5" }
      ]
    },
    {
      id: "acuteobtuse", name: "Angle names", phrase: "A cute angle is small (acute <90). Obtuse is obese (between 90 and 180).",
      steps: ["Acute: less than 90°.", "Right: exactly 90°.", "Obtuse: between 90° and 180°.", "Straight: 180°."],
      exception: "Reflex angles are bigger than 180° — past a straight line.",
      pic: () => P.tri("40°", "60°", "80°"),
      gen() {
        const a = pick([20, 45, 90, 120, 180]);
        let name;
        if (a < 90) name = "acute";
        else if (a === 90) name = "right";
        else if (a < 180) name = "obtuse";
        else name = "straight";
        return Q(`${a}° is…`, name, wrongs(name, ["acute", "right", "obtuse", "straight"]),
          `${a}° → ${name}.`);
      },
      worked: [
        { problem: "45° type?", steps: [["<90", "acute"]], answer: "acute" },
        { problem: "120° type?", steps: [["between 90 and 180", "obtuse"]], answer: "obtuse" }
      ]
    },
    {
      id: "distrib8", name: "Distribute into expressions", phrase: "Outside factor hits every term — like FOIL’s little sibling.",
      steps: ["Multiply the outside by each inside term.", "Keep signs careful.", "Combine like terms if any."],
      exception: "If two brackets multiply, use FOIL / grid — not single distribute.",
      pic: () => P.chain(["3(2x+5)", "6x+15"], ["distribute"]),
      gen() {
        const a = R(2, 8), b = R(2, 9), c = R(1, 9);
        return Q(`${a}(${b}x + ${c})`, `${a * b}x + ${a * c}`,
          wrongs(`${a * b}x + ${a * c}`, [`${a * b}x + ${c}`, `${a + b}x + ${a * c}`, `${a * b}x − ${a * c}`]),
          `${a}×${b}x + ${a}×${c} = ${a * b}x + ${a * c}.`);
      },
      worked: [
        { problem: "4(3x+2)", steps: [["Step", "12x+8"]], answer: "12x + 8" },
        { problem: "−2(x−5)", steps: [["Step", "−2x+10"]], answer: "−2x + 10" }
      ]
    },
    {
      id: "commute8", name: "Mental rearrange", phrase: "Flip and regroup to make tens and easy products.",
      steps: ["Spot numbers that make 10 or a known product.", "Commute/associate to pair them.", "Finish mentally."],
      exception: "With subtraction sitting in the chain, rewrite as adding opposites before regrouping freely.",
      pic: () => P.chain(["2 × 17 × 5", "10 × 17", "170"], ["regroup", "="]),
      gen() {
        const a = pick([2, 4, 5]), b = R(11, 19), c = 10 / (a === 4 ? 2 : a) * (a === 4 ? 2 : 1);
        const c2 = a === 2 ? 5 : a === 5 ? 2 : 5;
        return Q(`${a} × ${b} × ${c2}`, a * b * c2,
          wrongs(a * b * c2, [a * b + c2, a + b * c2]),
          `Regroup ${(a * c2)} × ${b} = ${a * b * c2}.`);
      },
      worked: [
        { problem: "2 × 14 × 5", steps: [["Step", "(2×5)×14=10×14=140"]], answer: "140" },
        { problem: "4 × 9 × 25", steps: [["Step", "(4×25)×9=100×9=900"]], answer: "900" }
      ]
    },
    {
      id: "pythagleg", name: "Find a leg", phrase: "Leg² = hyp² − other leg² — still Pythagoras.",
      steps: ["Square the hypotenuse.", "Subtract the other leg squared.", "Square-root to get the missing leg."],
      exception: "Hypotenuse is the longest — never subtract a longer square from a shorter and expect a real leg.",
      pic: () => P.rightTri({ opp: "a", adj: "4", hyp: "5" }),
      gen() {
        const trip = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [9, 12, 15]]);
        const hyp = trip[2], known = trip[1], miss = trip[0];
        return Q(`Right triangle: legs ? and ${known}, hyp ${hyp}. Missing leg?`, miss,
          wrongs(miss, [hyp - known, known, hyp]),
          `${hyp}² − ${known}² = ${miss}² → ${miss}.`, P.rightTri({ opp: "?", adj: String(known), hyp: String(hyp) }));
      },
      worked: [
        { problem: "Legs ? and 8, hyp 10", steps: [["Step", "100−64=36"], ["Step", "√36=6"]], answer: "6" },
        { problem: "3-?-5 triangle", steps: [["Step", "25−9=16"], ["Step", "4"]], answer: "4" }
      ]
    },
    {
      id: "vertopp", name: "Vertically opposite", phrase: "X marks the spot: vertically opposite angles are equal.",
      steps: ["Find the X made by two crossing lines.", "Angles across from each other match.", "Neighbors on a straight line add to 180°."],
      exception: "Only the opposite pair matches — adjacent angles are supplementary, not equal (unless 90).",
      pic: () => P.chain(["70°", "vertically opposite", "70°"], ["=", "="]),
      gen() {
        const a = R(40, 140);
        return Q(`Two lines cross. One angle is ${a}°. Vertically opposite?`, deg(a),
          wrongs(deg(a), [deg(180 - a), deg(90), deg(a + 10)]),
          `Vertically opposite copies ${a}°.`);
      },
      worked: [
        { problem: "Cross lines, one angle 65°. Opposite?", steps: [["Same", "65°."]], answer: "65°" },
        { problem: "Adjacent to 65° on a line?", steps: [["180−65", "115°."]], answer: "115°" }
      ]
    },
    {
      id: "scinote8", name: "Scientific notation sense", phrase: "One digit, then a dot, times a power of ten.",
      steps: ["Put the point after the first nonzero digit.", "Count hops to the original point — that is the exponent.", "Positive exponent → big; negative → tiny."],
      exception: "The leading number must be ≥1 and <10 (for standard form).",
      pic: () => P.chain(["4500", "4.5 × 10³"], ["="]),
      gen() {
        const d = R(1, 9), e = R(2, 5);
        const n = d * 10 ** e;
        return Q(`${n} in scientific notation`, `${d} × 10${"⁰¹²³⁴⁵⁶⁷⁸⁹"[e]}`,
          wrongs(`${d} × 10${"⁰¹²³⁴⁵⁶⁷⁸⁹"[e]}`, [`${d}.${0} × 10${e}`, `${n} × 10`, `${d} × 10${e + 1}`]),
          `Point after ${d}, exponent ${e}.`);
      },
      worked: [
        { problem: "3600 as sci note?", steps: [["Step", "3.6 × 10³"]], answer: "3.6 × 10³" },
        { problem: "5 × 10⁴ as ordinary?", steps: [["Step", "50000"]], answer: "50000" }
      ]
    }
  ]);

  /* ================================================================== */
  /* Grade 9                                                             */
  /* ================================================================== */
  add("g9", [
    {
      id: "wordkeys9", name: "Translate words to algebra", phrase: "Altogether → +; difference → −; product → ×; quotient → ÷; of → ×.",
      steps: ["Underline keywords.", "Pick a variable for the unknown.", "Build the expression or equation."],
      exception: "“Less than” reverses order: 3 less than x is x − 3, not 3 − x.",
      pic: () => P.chain(["5 more than x", "x + 5"], ["→"]),
      gen() {
        const n = R(2, 9);
        const kind = pick(["more", "less", "product", "quotient"]);
        if (kind === "more") return Q(`${n} more than x`, `x + ${n}`, wrongs(`x + ${n}`, [`${n} + x + 1`, `${n} − x`, `x − ${n}`]), `More → x + ${n}.`);
        if (kind === "less") return Q(`${n} less than x`, `x − ${n}`, wrongs(`x − ${n}`, [`${n} − x`, `x + ${n}`]), `Less than → x − ${n}.`);
        if (kind === "product") return Q(`product of ${n} and x`, `${n}x`, wrongs(`${n}x`, [`x + ${n}`, `x/${n}`]), `Product → ${n}x.`);
        return Q(`quotient of x and ${n}`, `x/${n}`, wrongs(`x/${n}`, [`${n}/x`, `${n}x`]), `Quotient → x/${n}.`);
      },
      worked: [
        { problem: "7 less than x?", steps: [["Step", "x − 7"]], answer: "x − 7" },
        { problem: "Product of 4 and y?", steps: [["Step", "4y"]], answer: "4y" }
      ]
    },
    {
      id: "estimate9", name: "Estimate irrational squares", phrase: "Squeeze between perfect squares to estimate √n.",
      steps: ["Find whole squares around n.", "See which is closer.", "Estimate √n near that whole."],
      exception: "√n is exact only for perfect squares.",
      pic: () => P.chain(["36", "√40", "49"], ["4²", "≈6.3", "7²"]),
      gen() {
        const n = R(5, 12);
        return Q(`√${n * n}`, n, wrongs(n, [n + 1, n - 1, n * n]),
          `${n}² = ${n * n}, so √${n * n} = ${n}.`);
      },
      worked: [
        { problem: "√81?", steps: [["Step", "9"]], answer: "9" },
        { problem: "√50 between?", steps: [["Step", "7²=49, 8²=64"], ["Step", "≈7.1"]], answer: "between 7 and 8" }
      ]
    },
    {
      id: "commute9", name: "Rearrange algebra", phrase: "Terms can commute; factors can commute — keep signs glued to their terms.",
      steps: ["Move like terms together.", "Add coefficients.", "Write in a tidy order (often powers high to low)."],
      exception: "The minus sign belongs to the term that follows it when you commute.",
      pic: () => P.chain(["3x + 5 + 2x", "5x + 5"], ["tidy"]),
      gen() {
        const a = R(2, 8), b = R(2, 8), c = R(1, 9);
        return Q(`${a}x + ${c} + ${b}x`, `${a + b}x + ${c}`,
          wrongs(`${a + b}x + ${c}`, [`${a + b}x − ${c}`, `${a * b}x + ${c}`, `${a + b + c}x`]),
          `Like terms: (${a}+${b})x + ${c}.`);
      },
      worked: [
        { problem: "4x + 3 + 5x", steps: [["Step", "9x + 3"]], answer: "9x + 3" },
        { problem: "7 + 2x − 3", steps: [["Step", "2x + 4"]], answer: "2x + 4" }
      ]
    },
    {
      id: "distrib9", name: "FOIL mindset", phrase: "FOIL: First, Outside, Inside, Last — then tidy.",
      steps: ["First × first.", "Outside pair.", "Inside pair.", "Last × last.", "Combine like terms."],
      exception: "FOIL is two binomials. More terms → use a grid.",
      pic: () => P.chain(["(x+2)(x+3)", "x²+3x+2x+6", "x²+5x+6"], ["FOIL", "tidy"]),
      gen() {
        const a = R(1, 6), b = R(1, 6);
        const ans = `x² + ${a + b}x + ${a * b}`;
        return Q(`Expand (x + ${a})(x + ${b})`, ans,
          wrongs(ans, [`x² + ${a * b}x + ${a + b}`, `x² + ${a + b}x − ${a * b}`, `x² + ${Math.abs(a - b)}x + ${a * b}`]),
          `FOIL → ${ans}.`);
      },
      worked: [
        { problem: "(x+4)(x+5)", steps: [["Step", "x²+5x+4x+20"], ["Step", "x²+9x+20"]], answer: "x² + 9x + 20" },
        { problem: "(x+1)(x+7)", steps: [["Step", "x²+8x+7"]], answer: "x² + 8x + 7" }
      ]
    },
    {
      id: "compsupp9", name: "Angle pairs in algebra", phrase: "Complement → sum 90. Supplement → sum 180. Solve for x.",
      steps: ["Translate to x + y = 90 or 180.", "Substitute expressions.", "Solve."],
      exception: "Don’t assume adjacent — the problem must say complementary/supplementary (or show the figure).",
      pic: () => P.tri("90°", "x°", "(90−x)°"),
      gen() {
        const comp = Math.random() < 0.5;
        let x, other;
        do {
          x = R(20, comp ? 70 : 160);
          other = (comp ? 90 : 180) - x;
        } while (other === x || other <= 0);
        return Q(`If angles are ${comp ? "complementary" : "supplementary"} and one is ${x}°, the other is?`, deg(other),
          wrongs(deg(other), [deg((comp ? 180 : 90) - x), deg(x), deg(other + 10)]),
          `${x} + ? = ${comp ? 90 : 180} → ${other}°.`);
      },
      worked: [
        { problem: "Complement of (2x)° is 40°. x?", steps: [["Equation", "2x + 40 = 90"], ["Solve", "2x = 50, x = 25"]], answer: "25" },
        { problem: "Supplement of 2x is 100. x?", steps: [["Equation", "2x + 100 = 180"], ["Solve", "x = 40"]], answer: "40" }
      ]
    },
    {
      id: "zero9", name: "Zero product property", phrase: "If a product is zero, at least one factor is zero.",
      steps: ["Set the equation to = 0.", "Factor if needed.", "Set each factor = 0 and solve."],
      exception: "Only works for zero on the other side. ab = 6 does not mean a=6.",
      pic: () => P.chain(["(x−3)(x+2)=0", "x=3 or x=−2"], ["zero product"]),
      gen() {
        const a = R(1, 8), b = R(1, 8);
        if (Math.random() < 0.5) {
          return Q(`If (x − ${a})(x + ${b}) = 0, one solution is?`, a,
            wrongs(a, [-b, a + b, -a].map(String)),
            `x − ${a} = 0 → x = ${a} (also x = −${b}).`);
        }
        return Q(`If (x − ${a})(x + ${b}) = 0, the negative solution is?`, neg(-b),
          wrongs(neg(-b), [String(a), String(-a), String(b)]),
          `x + ${b} = 0 → x = −${b}.`);
      },
      worked: [
        { problem: "(x−4)(x+1)=0", steps: [["Step", "x=4 or x=−1"]], answer: "4 or −1" },
        { problem: "x(x−5)=0", steps: [["Step", "x=0 or x=5"]], answer: "0 or 5" }
      ]
    },
    {
      id: "complete9", name: "Completing the square hook", phrase: "Halve the middle, square it, park it on both sides.",
      steps: ["Move the constant.", "Take half of the x-coefficient.", "Square that half and add to both sides.", "Write a square binomial."],
      exception: "Leading coefficient must be 1 (divide through first if not).",
      pic: () => P.chain(["x² + 6x", "+9", "(x+3)²"], ["(+3)²", "="]),
      gen() {
        const h = R(2, 8);
        return Q(`What number completes x² + ${2 * h}x + □ to a square?`, h * h,
          wrongs(h * h, [h, 2 * h, h * h + h]),
          `Half of ${2 * h} is ${h}; ${h}² = ${h * h}.`);
      },
      worked: [
        { problem: "Complete x² + 8x + □", steps: [["Step", "Half 4"], ["Step", "16"]], answer: "16" },
        { problem: "Complete x² − 10x + □", steps: [["Step", "Half −5"], ["Step", "25"]], answer: "25" }
      ]
    },
    {
      id: "quadform9", name: "Quadratic formula song", phrase: "x equals opposite b, plus or minus the square root of b squared minus 4ac, all over 2a.",
      steps: ["Identify a, b, c.", "Compute the discriminant b² − 4ac.", "Plug into (−b ± √Δ)/(2a)."],
      exception: "If Δ < 0 there are no real roots. Don’t forget the “all over 2a” applies to everything.",
      pic: () => P.formula("−b ± √(b² − 4ac)", "2a", "quadratic formula"),
      gen() {
        const b = -R(2, 6), c = R(1, 5);
        const disc = b * b - 4 * c;
        const mid = b < 0 ? ` − ${-b}x` : ` + ${b}x`;
        return Q(`For x²${mid} + ${c}, discriminant b² − 4ac?`, disc,
          wrongs(disc, [b * b, 4 * c, -disc]),
          `b² − 4ac = ${b * b} − ${4 * c} = ${disc}.`);
      },
      worked: [
        { problem: "Discriminant of x² − 5x + 6", steps: [["Step", "25 − 24 = 1"]], answer: "1" },
        { problem: "Roots of x² − 5x + 6", steps: [["Step", "(x−2)(x−3)"], ["Step", "2 and 3"]], answer: "2 and 3" }
      ]
    },
    {
      id: "prop9", name: "Similar ratios", phrase: "Same shape: matching sides stay in proportion — butterfly if needed.",
      steps: ["Match corresponding sides.", "Write a proportion.", "Cross multiply to solve."],
      exception: "Correspondence matters — don’t match short to long casually.",
      pic: () => P.similar("4", "10"),
      gen() {
        const a = R(2, 8), k = R(2, 5), b = a * k, c = R(2, 8), d = c * k;
        return Q(`Sides ${a}/${b} = ${c}/x. x?`, d,
          wrongs(d, [c * a, b, c + b]),
          `Butterfly: ${a}x = ${b * c} → x = ${d}.`, P.similar(String(a), "?"));
      },
      worked: [
        { problem: "3/9 = 4/x", steps: [["Step", "3x=36"], ["Step", "x=12"]], answer: "12" },
        { problem: "5/2 = x/6", steps: [["Step", "2x=30"], ["Step", "x=15"]], answer: "15" }
      ]
    },
    {
      id: "exp9", name: "Exponent mental moves", phrase: "Multiply → add powers. Divide → subtract. Power of a power → multiply.",
      steps: ["Same base? Apply the law.", "Add/subtract/multiply the exponents as the law says.", "Simplify coefficients separately."],
      exception: "Different bases don’t combine with these laws (unless you rewrite).",
      pic: () => P.chain(["x³ · x²", "x⁵"], ["add powers"]),
      gen() {
        const m = R(2, 6), n = R(2, 6);
        const kind = pick(["mul", "div", "pow"]);
        if (kind === "mul") {
          return Q(`x${"²³⁴⁵⁶"[m - 2]} · x${"²³⁴⁵⁶"[n - 2]}`.replace(/x¹/g, "x"), `x${"²³⁴⁵⁶⁷⁸⁹"[m + n - 2] || (m + n)}`,
            wrongs(`x${"²³⁴⁵⁶⁷⁸⁹"[m + n - 2] || (m + n)}`, [`x${"²³⁴⁵⁶"[Math.abs(m - n) - 2] || ""}`, `x${m}${n}`]),
            `Add powers: ${m} + ${n} = ${m + n}.`);
        }
        if (kind === "div") {
          const hi = m + n;
          return Q(`x${"²³⁴⁵⁶⁷⁸⁹"[hi - 2] || hi} ÷ x${"²³⁴⁵⁶"[n - 2]}`, m === 1 ? "x" : `x${"²³⁴⁵⁶"[m - 2]}`,
            wrongs(m === 1 ? "x" : `x${"²³⁴⁵⁶"[m - 2]}`, [`x${"²³⁴⁵⁶"[hi - 2]}`, `x${hi + n}`]),
            `Subtract powers: ${hi} − ${n} = ${m}.`);
        }
        return Q(`(x${"²³⁴⁵⁶"[m - 2]})ⁿ with n=${n}`.replace("ⁿ", `${"²³⁴⁵⁶"[n - 2]}`), `x${m * n > 1 ? "²³⁴⁵⁶⁷⁸⁹"[m * n - 2] || (m * n) : ""}`.replace(/^x$/, "x") || `x${m * n}`,
          wrongs(`x${"²³⁴⁵⁶⁷⁸⁹"[m * n - 2] || (m * n)}`, [`x${m + n}`, `x${Math.abs(m - n)}`]),
          `Multiply powers: ${m} × ${n} = ${m * n}.`);
      },
      worked: [
        { problem: "x³ · x⁴", steps: [["Add", "x⁷."]], answer: "x⁷" },
        { problem: "(x²)⁵", steps: [["Multiply", "x¹⁰."]], answer: "x¹⁰" }
      ]
    }
  ]);

  /* ================================================================== */
  /* Grade 10                                                            */
  /* ================================================================== */
  add("g10", [
    {
      id: "sine-is-y", name: "Unit circle coordinates", phrase: "On the unit circle: cosine is x, sine is y.",
      also: "Point (cos θ, sin θ) — x then y, alphabetical cos before sin on the axes myth aside: cos↔x, sin↔y.",
      steps: ["Place the angle on the unit circle.", "Read the point as (cos θ, sin θ).", "x-coordinate is cosine; y-coordinate is sine."],
      exception: "Do not swap x/y. Signs follow the quadrant. Match calculator mode to the problem.",
      pic: () => P.quadrant(1),
      gen() {
        const form = R(1, 3);
        if (form === 1) {
          return Q("On the unit circle, sine is which coordinate?", "y",
            wrongs("y", ["x", "r", "θ"]),
            "Sine is y; cosine is x.");
        }
        if (form === 2) {
          return Q("On the unit circle, cosine is which coordinate?", "x",
            wrongs("x", ["y", "r", "θ"]),
            "Cosine is x; sine is y.");
        }
        return Q("A unit-circle point is written as…", "(cos θ, sin θ)",
          wrongs("(cos θ, sin θ)", ["(sin θ, cos θ)", "(θ, cos θ)", "(x, θ)"]),
          "Standard order: (cos θ, sin θ).");
      },
      worked: [
        {
          problem: "At θ = 0 on the unit circle, what is (x, y)?",
          steps: [["Cosine is x", "cos 0 = 1."], ["Sine is y", "sin 0 = 0."]],
          answer: "(1, 0)"
        },
        {
          problem: "In quadrant II, is sine positive or negative?",
          steps: [["Sine is y", "y is positive in QII."], ["Cosine is x", "x is negative there."]],
          answer: "positive"
        }
      ]
    },
    {
      id: "sohcahtoa", name: "SOH CAH TOA chant", phrase: "SOH CAH TOA: sine opp/hyp, cosine adj/hyp, tangent opp/adj.",
      also: "Some Old Horse Came A-Hopping Through Our Alley.",
      steps: ["Label opposite, adjacent, hypotenuse from θ.", "Pick SOH, CAH, or TOA.", "Write the ratio and solve."],
      exception: "Hypotenuse is always the longest side, opposite the right angle — never opposite θ.",
      pic: () => P.rightTri({ opp: "opp", adj: "adj", hyp: "hyp", theta: "θ" }),
      gen() {
        const trip = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17]]);
        const [a, b, c] = trip;
        const kind = pick(["sin", "cos", "tan"]);
        if (kind === "sin") return Q(`sin θ if opp=${a}, hyp=${c}`, raw(a, c), wrongs(raw(a, c), [raw(b, c), raw(a, b), raw(c, a)]), `SOH: ${a}/${c}.`, P.rightTri({ opp: String(a), adj: String(b), hyp: String(c), theta: "θ" }));
        if (kind === "cos") return Q(`cos θ if adj=${b}, hyp=${c}`, raw(b, c), wrongs(raw(b, c), [raw(a, c), raw(b, a)]), `CAH: ${b}/${c}.`, P.rightTri({ opp: String(a), adj: String(b), hyp: String(c), theta: "θ" }));
        return Q(`tan θ if opp=${a}, adj=${b}`, raw(a, b), wrongs(raw(a, b), [raw(b, a), raw(a, c)]), `TOA: ${a}/${b}.`, P.rightTri({ opp: String(a), adj: String(b), hyp: String(c), theta: "θ" }));
      },
      worked: [
        { problem: "opp 3, hyp 5: sin?", steps: [["SOH", "3/5."]], answer: "3/5" },
        { problem: "opp 3, adj 4: tan?", steps: [["TOA", "3/4."]], answer: "3/4" }
      ]
    },
    {
      id: "astc10", name: "All Students Take Calculus", phrase: "ASTC: All, Sin, Tan, Cos — which are positive, quadrant by quadrant.",
      also: "All Students Take Calculus (counterclockwise from QI).",
      steps: ["QI: All positive.", "QII: Sin (and cosec) positive.", "QIII: Tan (and cot) positive.", "QIV: Cos (and sec) positive."],
      exception: "ASTC names the positive ones; the others are negative in that quadrant.",
      pic: () => P.quadrant(2),
      gen() {
        const q = R(1, 4);
        const ans = ["all", "sin", "tan", "cos"][q - 1];
        return Q(`ASTC: which are positive in quadrant ${q}?`, ans,
          wrongs(ans, ["all", "sin", "tan", "cos"]),
          `Quadrant ${q}: ${ans}.`, P.quadrant(q));
      },
      worked: [
        { problem: "Positive in QII?", steps: [["S in ASTC", "sin."]], answer: "sin" },
        { problem: "Positive in QIV?", steps: [["C", "cos."]], answer: "cos" }
      ]
    },
    {
      id: "wordkeys10", name: "Trig word problems", phrase: "Elevation looks up, depression looks down — both from the flat.",
      steps: ["Sketch the right triangle.", "Mark the angle of elevation/depression.", "Use SOHCAHTOA for the missing side or angle."],
      exception: "Angle of depression from the top equals the angle of elevation from the bottom (alternate interior angles).",
      pic: () => P.rightTri({ opp: "height", adj: "run", hyp: "sight", theta: "θ" }),
      gen() {
        const adj = pick([8, 12, 15, 20]), ratio = pick([[3, 4], [5, 12], [8, 15]]);
        const opp = (adj / ratio[1]) * ratio[0];
        if (opp !== Math.floor(opp)) return this.gen();
        return Q(`From flat ground, tan θ = ${ratio[0]}/${ratio[1]} and adjacent run is ${adj}. Height?`, opp,
          wrongs(opp, [adj, ratio[0], adj + opp]),
          `TOA: height = ${adj} × ${ratio[0]}/${ratio[1]} = ${opp}.`);
      },
      worked: [
        { problem: "tan θ = 3/4, run 8. Height?", steps: [["8×3/4", "6."]], answer: "6" },
        { problem: "Elevation: opp 5, hyp 13. sin?", steps: [["Step", "5/13"]], answer: "5/13" }
      ]
    },
    {
      id: "arith10", name: "Exact value arithmetic", phrase: "Keep surds tidy: multiply, then simplify the square root.",
      steps: ["Write exact values (√2, √3, 1/2…).", "Multiply or divide fractions.", "Simplify surds."],
      exception: "Don’t replace √2 with 1.4 in exact-value questions.",
      pic: () => P.chain(["sin 45°", "√2/2"], ["="]),
      gen() {
        const form = R(1, 3);
        if (form === 1) return Q(`sin 30°`, "1/2", wrongs("1/2", ["√3/2", "√2/2", "0"]), `Standard: sin 30° = 1/2.`);
        if (form === 2) return Q(`cos 60°`, "1/2", wrongs("1/2", ["√3/2", "0", "1"]), `cos 60° = 1/2.`);
        return Q(`tan 45°`, "1", wrongs("1", ["0", "√3", "1/2"]), `tan 45° = 1.`);
      },
      worked: [
        { problem: "sin 90°?", steps: [["Step", "1"]], answer: "1" },
        { problem: "cos 0°?", steps: [["Step", "1"]], answer: "1" }
      ]
    },
    {
      id: "recip10", name: "Reciprocal trig names", phrase: "Co-reciprocals: cosec flips sin, sec flips cos, cot flips tan.",
      steps: ["cosec θ = 1/sin θ.", "sec θ = 1/cos θ.", "cot θ = 1/tan θ."],
      exception: "sec is not 1/sin — that mix-up is classic.",
      pic: () => P.chain(["sin", "cosec", "cos", "sec"], ["flip", "·", "flip"]),
      gen() {
        const kind = pick(["csc", "sec", "cot"]);
        const trip = [3, 4, 5];
        if (kind === "csc") return Q(`If sin θ = 3/5, cosec θ?`, "5/3", wrongs("5/3", ["3/5", "5/4", "4/3"]), `Flip: 5/3.`);
        if (kind === "sec") return Q(`If cos θ = 4/5, sec θ?`, "5/4", wrongs("5/4", ["4/5", "5/3"]), `Flip: 5/4.`);
        return Q(`If tan θ = 3/4, cot θ?`, "4/3", wrongs("4/3", ["3/4", "5/3"]), `Flip: 4/3.`);
      },
      worked: [
        { problem: "sin = 5/13. cosec?", steps: [["Step", "13/5"]], answer: "13/5" },
        { problem: "tan = 1. cot?", steps: [["Step", "1"]], answer: "1" }
      ]
    },
    {
      id: "estimate10", name: "Estimate trig sides", phrase: "Rough check: for acute θ, opposite is shorter than hypotenuse.",
      steps: ["Sketch and label.", "Ask if the answer can exceed the hypotenuse.", "Use SOHCAHTOA, then sanity-check."],
      exception: "Sine and cosine of an acute angle are always between 0 and 1.",
      pic: () => P.rightTri({ opp: "3", adj: "4", hyp: "5" }),
      gen() {
        const hyp = pick([10, 15, 20]), opp = hyp / 2;
        return Q(`If sin θ = 1/2 and hyp = ${hyp}, opposite?`, opp,
          wrongs(opp, [hyp, hyp * 2, opp + 1]),
          `opp = hyp × sin = ${hyp}/2 = ${opp}.`);
      },
      worked: [
        { problem: "sin θ=0.5, hyp 10. opp?", steps: [["Step", "5"]], answer: "5" },
        { problem: "Can cos θ be 1.2 for real θ?", steps: [["Step", "No — cos ≤ 1."]], answer: "no" }
      ]
    },
    {
      id: "commute10", name: "Ratio rearrange", phrase: "If sin θ = opp/hyp, then opp = hyp × sin θ — multiply both sides.",
      steps: ["Start from the ratio definition.", "Multiply both sides by the denominator.", "Solve for the unknown side."],
      exception: "Keep θ’s opposite/adjacent labels consistent with the angle you marked.",
      pic: () => P.chain(["sin θ = o/h", "o = h sin θ"], ["×h"]),
      gen() {
        const h = pick([10, 12, 15]), o = h / pick([2, 5]) * pick([1, 2]);
        if (o !== Math.floor(o) || o >= h) return this.gen();
        return Q(`sin θ = ${o}/${h}. If hyp=${h}, opp?`, o,
          wrongs(o, [h, h - o, o + h]),
          `opp = ${h} × ${o}/${h} = ${o}.`);
      },
      worked: [
        { problem: "cos θ = 4/5, hyp 15. adj?", steps: [["Step", "15×4/5=12"]], answer: "12" },
        { problem: "tan θ = 3/4, adj 8. opp?", steps: [["Step", "8×3/4=6"]], answer: "6" }
      ]
    },
    {
      id: "distrib10", name: "Expand trig brackets", phrase: "Distribute constants through trig expressions just like algebra.",
      steps: ["Multiply the constant into each term.", "Keep sin/cos labels.", "Simplify numbers."],
      exception: "sin(2θ) is not 2 sin θ — that’s a different identity.",
      pic: () => P.chain(["2(sin θ + cos θ)", "2 sin θ + 2 cos θ"], ["distribute"]),
      gen() {
        const k = R(2, 6);
        return Q(`${k}(sin θ + cos θ)`, `${k} sin θ + ${k} cos θ`,
          wrongs(`${k} sin θ + ${k} cos θ`, [`${k} sin θ + cos θ`, `sin(${k}θ) + cos(${k}θ)`, `${k} + sin θ + cos θ`]),
          `Distribute ${k} to each term.`);
      },
      worked: [
        { problem: "3(sin θ − cos θ)", steps: [["Step", "3 sin θ − 3 cos θ"]], answer: "3 sin θ − 3 cos θ" },
        { problem: "−2(sin θ)", steps: [["Step", "−2 sin θ"]], answer: "−2 sin θ" }
      ]
    },
    {
      id: "cast10", name: "CAST vs ASTC", phrase: "CAST starts in QIV; ASTC starts in QI — same positives, different starting point.",
      steps: ["Prefer one mnemonic and stick to it.", "ASTC: All-Sin-Tan-Cos from QI counterclockwise.", "Check a known angle (e.g. 120°) to verify."],
      exception: "Don’t mix CAST order with ASTC starting quadrant mid-problem.",
      pic: () => P.quadrant(3),
      gen() {
        const ang = pick([30, 150, 210, 330]);
        let ans;
        if (ang < 90) ans = "positive";
        else if (ang < 180) ans = "positive"; // sin
        else if (ang < 270) ans = "negative";
        else ans = "negative";
        // ask specifically about sin
        if (ang === 30 || ang === 150) ans = "positive";
        if (ang === 210 || ang === 330) ans = "negative";
        return Q(`sin ${ang}° is…`, ans, wrongs(ans, ["positive", "negative", "zero"]),
          `ASTC for sin at ${ang}° → ${ans}.`, P.quadrant(ang < 90 ? 1 : ang < 180 ? 2 : ang < 270 ? 3 : 4));
      },
      worked: [
        { problem: "sin 150° sign?", steps: [["QII", "positive"]], answer: "positive" },
        { problem: "cos 120° sign?", steps: [["QII — only sin +", "negative"]], answer: "negative" }
      ]
    },
    {
      id: "mental10", name: "Mental 3-4-5 & 5-12-13", phrase: "Memorize the famous right triples — they power quick trig ratios.",
      steps: ["Spot 3-4-5 or 5-12-13 (or multiples).", "Write sin/cos/tan from the sides.", "Scale triples by the same factor."],
      exception: "6-8-10 is 3-4-5 ×2 — reduce before reading the ratio if you like simplest form.",
      pic: () => P.rightTri({ opp: "3", adj: "4", hyp: "5" }),
      gen() {
        const k = R(1, 4), a = 3 * k, b = 4 * k, c = 5 * k;
        return Q(`In a ${a}-${b}-${c} triangle, sin (opp ${a})?`, fr(a, c),
          wrongs(fr(a, c), [fr(b, c), fr(a, b), fr(c, a)]),
          `${a}/${c} = ${fr(a, c)}.`, P.rightTri({ opp: String(a), adj: String(b), hyp: String(c) }));
      },
      worked: [
        { problem: "5-12-13: cos adj12?", steps: [["Step", "12/13"]], answer: "12/13" },
        { problem: "6-8-10: tan opp6?", steps: [["Step", "6/8=3/4"]], answer: "3/4" }
      ]
    }
  ]);

  /* ================================================================== */
  /* Grade 11 (calculus)                                                 */
  /* ================================================================== */
  add("g11", [
    {
      id: "liate-parts", name: "Integration by parts (LIATE)", phrase: "LIATE: prefer u from Logarithmic, Inverse trig, Algebraic, Trig, Exponential (earlier wins).",
      steps: ["Choose u via LIATE (flexibly).", "dv is the rest of the integrand.", "Apply ∫u dv = uv − ∫v du."],
      exception: "Heuristic, not a theorem — some integrals need the opposite choice or cyclic methods.",
      pic: () => P.chain(["L", "I", "A", "T", "E"], ["u preference →"]),
      gen() {
        const form = R(1, 3);
        if (form === 1) return Q("LIATE: which type comes first?", "Logs", wrongs("Logs", ["Trig", "Exponential", "Algebraic"]), "L first in LIATE.");
        if (form === 2) return Q("For ∫x sin x dx, LIATE suggests u = ?", "x", wrongs("x", ["sin x", "cos x", "1"]), "Algebraic before Trig → u = x.");
        return Q("LIATE last letter stands for?", "Exponential", wrongs("Exponential", ["Logs", "Trig", "Algebraic"]), "E = Exponential.");
      },
      worked: [
        { problem: "∫x e^x dx: choose u?", steps: [["Algebraic before Exp", "u = x"], ["dv", "e^x dx"]], answer: "x" },
        { problem: "What does T in LIATE mean?", steps: [["Letter", "Trig"]], answer: "Trig" }
      ]
    },
    {
      id: "u-sub-chain-reverse", name: "u-substitution", phrase: "If you see f(g(x))·g'(x), let u = g(x) (undo the chain rule).",
      steps: ["Set u = the inner function.", "Write du = u' dx.", "Rewrite the integral in u.", "Integrate.", "Back-substitute, or convert limits for definite integrals."],
      exception: "Watch constant factors. For definite integrals, change limits to u-values (or substitute back).",
      pic: () => P.roof("∫2x cos(x²) dx", "u = x²", "du = 2x dx"),
      gen() {
        const form = R(1, 3);
        if (form === 1) {
          return Q("For ∫2x cos(x²) dx, a good u is…", "x²",
            wrongs("x²", ["2x", "cos(x²)", "x"]),
            "Inner function of the composition: u = x², and du = 2x dx.");
        }
        if (form === 2) {
          return Q("u-sub undoes which differentiation rule?", "chain rule",
            wrongs("chain rule", ["product rule", "quotient rule", "power rule"]),
            "Seeing f(g(x))·g'(x) is the chain rule in reverse.");
        }
        return Q("After ∫cos u du, you should…", "replace u with the inner expression",
          wrongs("replace u with the inner expression", ["leave the answer in u forever", "differentiate again", "drop + C"]),
          "Back-substitute so the answer is in x (unless limits were changed to u).");
      },
      worked: [
        {
          problem: "∫2x cos(x²) dx",
          steps: [["u", "u = x², du = 2x dx."], ["Integrate", "∫cos u du = sin u + C."], ["Back", "sin(x²) + C."]],
          answer: "sin(x²) + C"
        },
        {
          problem: "Definite ∫₀¹ 2x e^(x²) dx — what are the u-limits?",
          steps: [["u = x²", "x=0 → u=0; x=1 → u=1."], ["Integral", "∫₀¹ e^u du."]],
          answer: "0 to 1"
        }
      ]
    },
    {
      id: "wordkeys11", name: "Rate-word clues", phrase: "Rate, slope, marginal, instantaneous — those words point to a derivative.",
      steps: ["Spot rate-of-change language.", "Differentiate the model.", "Plug in the instant asked."],
      exception: "Average rate is Δy/Δx — not the derivative unless the window shrinks to an instant.",
      pic: () => P.roof("y = x²", "dy/dx = 2x", "rate"),
      gen() {
        const a = R(2, 6), x = R(2, 5);
        return Q(`If y = ${a}x², instantaneous rate at x = ${x}?`, 2 * a * x,
          wrongs(2 * a * x, [a * x, a * x * x, 2 * a]),
          `dy/dx = ${2 * a}x → at ${x}: ${2 * a * x}.`);
      },
      worked: [
        { problem: "y = 3x², rate at x = 2?", steps: [["Step", "y′ = 6x"], ["Step", "12"]], answer: "12" },
        { problem: "Word “marginal cost” suggests?", steps: [["Step", "derivative"]], answer: "derivative" }
      ]
    },
    {
      id: "estimate11", name: "Linear estimate", phrase: "Near a point: Δy ≈ y′ · Δx — the tangent’s rise.",
      steps: ["Find y′ at the known point.", "Multiply by the small Δx.", "Add to the known y."],
      exception: "Far from the point, the tangent estimate drifts — use a better model.",
      pic: () => P.chain(["y ≈ y₀ + y′Δx"], ["linearization"]),
      gen() {
        const x0 = R(2, 5), dx = pick([1, 2]);
        const approx = x0 * x0 + 2 * x0 * dx;
        return Q(`y = x² near x = ${x0}: estimate y(${x0 + dx}) with the tangent`, approx,
          wrongs(approx, [x0 * x0, (x0 + dx) ** 2, approx + x0]),
          `y′ = 2x = ${2 * x0}. Δy ≈ ${2 * x0}×${dx}. Estimate ${approx}.`);
      },
      worked: [
        { problem: "y = x² at x = 3, estimate y(4)", steps: [["Step", "y′ = 6"], ["Step", "9 + 6 = 15"]], answer: "15" },
        { problem: "Linearization idea?", steps: [["Step", "use tangent"]], answer: "Δy ≈ y′Δx" }
      ]
    },
    {
      id: "powerarith", name: "Power rule arithmetic", phrase: "Bring the power down, then subtract one from the power.",
      steps: ["For axⁿ, derivative is a·n·xⁿ⁻¹.", "Multiply the coefficient by the old power.", "Reduce the power by 1."],
      exception: "Derivative of a constant is 0, not the constant.",
      pic: () => P.roof("5x⁴", "20x³", "power down"),
      gen() {
        const n = R(2, 7), a = R(2, 6);
        const coef = a * n, p = n - 1;
        const ans = p === 1 ? `${coef}x` : `${coef}x${"²³⁴⁵⁶"[p - 2]}`;
        const wrongsList = [
          p === 1 ? `${a}x` : `${a}x${"²³⁴⁵⁶"[p - 2]}`,
          p === 0 ? String(coef) : `${coef}x${"²³⁴⁵⁶"[Math.max(0, p - 3)]}`,
          `${coef + a}x${p === 1 ? "" : "²³⁴⁵⁶"[p - 2]}`,
          `${a * (n + 1)}x${"²³⁴⁵⁶"[Math.min(5, n - 1)]}`
        ];
        return Q(`d/dx[${a}x${"²³⁴⁵⁶⁷"[n - 2]}]`, ans, wrongs(ans, wrongsList),
          `Bring down ${n}: ${a}×${n} = ${coef}, power ${n} → ${p}: ${ans}.`);
      },
      worked: [
        { problem: "d/dx[4x³]", steps: [["Step", "12x²"]], answer: "12x²" },
        { problem: "d/dx[7x]", steps: [["Step", "7"]], answer: "7" }
      ]
    },
    {
      id: "commute11", name: "Sum rule", phrase: "Derivative of a sum is the sum of derivatives — term by term.",
      steps: ["Split the expression into terms.", "Differentiate each term.", "Add the results."],
      exception: "Products need the product rule — don’t term-by-term a product.",
      pic: () => P.roof("x³ + 5x", "3x² + 5", "term by term"),
      gen() {
        const a = R(2, 6), b = R(2, 9);
        return Q(`d/dx[x² + ${a}x + ${b}]`, `2x + ${a}`,
          wrongs(`2x + ${a}`, [`2x + ${a} + ${b}`, `x + ${a}`, `2x − ${a}`]),
          `Term by term: 2x + ${a} + 0.`);
      },
      worked: [
        { problem: "d/dx[x³ − 4x + 1]", steps: [["Step", "3x² − 4"]], answer: "3x² − 4" },
        { problem: "d/dx[10]", steps: [["Step", "0"]], answer: "0" }
      ]
    },
    {
      id: "distrib11", name: "Constant multiple rule", phrase: "Constants factor out of derivatives: (c·f)′ = c·f′.",
      steps: ["Pull the constant out.", "Differentiate the leftover function.", "Multiply back by the constant."],
      exception: "The constant must not depend on x.",
      pic: () => P.roof("6x⁵", "30x⁴", "6 × 5x⁴"),
      gen() {
        const c = R(2, 8), n = R(2, 6);
        const ans = n === 2 ? `${c * n}x` : `${c * n}x${"²³⁴⁵⁶"[n - 3]}`;
        return Q(`d/dx[${c}x${"²³⁴⁵⁶"[n - 2]}]`, ans,
          wrongs(ans, [`${c}x${"²³⁴⁵⁶"[n - 3] || ""}`, `${c + n}x`, `${c * (n - 1)}x${"²³⁴⁵⁶"[Math.max(0, n - 3)]}`]),
          `${c} × ${n}x${n - 1 === 1 ? "" : "²³⁴⁵"[n - 3]} = ${ans}.`);
      },
      worked: [
        { problem: "d/dx[9x⁴]", steps: [["Step", "9×4x³ = 36x³"]], answer: "36x³" },
        { problem: "d/dx[−3x²]", steps: [["Step", "−6x"]], answer: "−6x" }
      ]
    },
    {
      id: "intarith", name: "Integral power arithmetic", phrase: "Raise the power by one, then divide by the new power — plus C.",
      steps: ["Add 1 to the exponent.", "Divide by that new exponent.", "Add + C for indefinite integrals."],
      exception: "∫x⁻¹ dx is ln|x| + C, not x⁰/0.",
      pic: () => P.roof("∫x³ dx", "x⁴/4 + C", "power up"),
      gen() {
        const n = R(1, 5);
        const SUP = ["", "", "²", "³", "⁴", "⁵", "⁶", "⁷"];
        const nice = `x${SUP[n + 1]}/${n + 1} + C`;
        return Q(`∫x${n === 1 ? "" : SUP[n]} dx`, nice,
          wrongs(nice, [`x${SUP[n]}/${n} + C`, `x${SUP[n + 1]}/${n} + C`, `${n}x${SUP[n] || ""} + C`, "5x + C"]),
          `Power ${n} → ${n + 1}, divide by ${n + 1}: ${nice}.`);
      },
      worked: [
        { problem: "∫x² dx", steps: [["Step", "x³/3 + C"]], answer: "x³/3 + C" },
        { problem: "∫5 dx", steps: [["Step", "5x + C"]], answer: "5x + C" }
      ]
    },
    {
      id: "mental11", name: "Mental derivatives", phrase: "sin → cos → −sin → −cos → sin: walk one step around the cycle.",
      steps: ["Know the four-step cycle for sin/cos.", "A minus appears when you leave cos toward −sin.", "Chain rule multiplies an extra inside derivative."],
      exception: "d/dx[cos x] = −sin x — don’t drop the minus.",
      pic: () => P.chain(["sin", "cos", "−sin", "−cos", "sin"], ["→", "→", "→", "→"]),
      gen() {
        const kind = pick(["sin", "cos", "negSin"]);
        if (kind === "sin") return Q("d/dx[sin x]", "cos x", wrongs("cos x", ["−cos x", "sin x", "−sin x"]), "sin → cos.");
        if (kind === "cos") return Q("d/dx[cos x]", "−sin x", wrongs("−sin x", ["sin x", "cos x", "−cos x"]), "cos → −sin.");
        return Q("d/dx[−sin x]", "−cos x", wrongs("−cos x", ["cos x", "sin x", "−sin x"]), "−sin → −cos.");
      },
      worked: [
        { problem: "d/dx[sin x]", steps: [["Step", "cos x"]], answer: "cos x" },
        { problem: "d/dx[cos x]", steps: [["Step", "−sin x"]], answer: "−sin x" }
      ]
    },
    {
      id: "logarith", name: "Log arithmetics", phrase: "log asks: what power? Multiply → add, divide → subtract, power → front.",
      steps: ["Rewrite the log question as an exponential.", "Apply log laws to expand or condense.", "Solve for the unknown."],
      exception: "log(a + b) is not log a + log b.",
      pic: () => P.chain(["log(ab)", "log a + log b"], ["="]),
      gen() {
        const a = R(2, 5), p = R(2, 4);
        const n = a ** p;
        return Q(`log_${a}(${n})`, p, wrongs(p, [a, n, p + 1]),
          `${a}^${p} = ${n}, so the log is ${p}.`);
      },
      worked: [
        { problem: "log₂ 8", steps: [["Step", "2³ = 8"], ["Step", "3"]], answer: "3" },
        { problem: "log₁₀ 1000", steps: [["Step", "10³ = 1000"], ["Step", "3"]], answer: "3" }
      ]
    },
    {
      id: "ftc-inverses", name: "Fundamental theorem", phrase: "Differentiation and integration undo each other (Fundamental Theorem).",
      steps: ["Recognize an antiderivative F of f.", "For a definite integral, compute F(b) − F(a).", "Read the result as net change when f is a rate."],
      exception: "Needs continuity hypotheses. +C for indefinite integrals. √(x²)=|x|. Limits matter for definite integrals.",
      pic: () => P.formula("F(b) − F(a)", "∫ₐᵇ f", "end minus start"),
      gen() {
        const a = R(1, 3), b = a + R(1, 4);
        const ans = b * b - a * a;
        if (Math.random() < 0.4) {
          return Q("d/dx [∫₀ˣ cos t dt] equals…", "cos x",
            wrongs("cos x", ["sin x", "−cos x", "cos t"]),
            "FTC: differentiating the integral undoes it → cos x.");
        }
        return Q(`∫ from ${a} to ${b} of 2x dx`, ans,
          wrongs(ans, [b * b, a * a, b - a, 2 * (b - a)]),
          `Antiderivative x²: ${b}² − ${a}² = ${ans}.`);
      },
      worked: [
        { problem: "∫₀² 3x² dx", steps: [["Antiderivative", "x³."], ["Evaluate", "8 − 0 = 8."]], answer: "8" },
        { problem: "Why +C for indefinite integrals?", steps: [["Undo", "Many antiderivatives differ by a constant."], ["Write", "F(x) + C."]], answer: "+C" }
      ]
    },
    {
      id: "pvalue-row-boat", name: "What a p-value is", phrase: "A p-value is the chance, assuming H₀ is true, of data at least this extreme.",
      steps: ["State H₀ clearly.", "Compute the test statistic from the data.", "Find the tail probability under H₀.", "Interpret cautiously — small p means surprising under H₀, not “H₀ is false with probability p”."],
      exception: "p is not P(H₀ true). Small p suggests incompatibility with H₀ under the model — not proof. Avoid p-hacking.",
      pic: () => P.chain(["H₀ true", "tail probability", "p-value"], ["assume", "→"]),
      gen() {
        const form = R(1, 3);
        if (form === 1) {
          return Q("A p-value is computed assuming…", "H₀ is true",
            wrongs("H₀ is true", ["Hₐ is true", "the data are fake", "p = 0.05 always"]),
            "By definition, p is a tail probability under H₀.");
        }
        if (form === 2) {
          return Q("Is a p-value the probability that H₀ is true?", "no",
            wrongs("no", ["yes", "only if p < 0.05", "only in two-tailed tests"]),
            "p is not P(H₀ true).");
        }
        return Q("Smaller p-values mean the data are… under H₀.", "more surprising",
          wrongs("more surprising", ["more likely", "proof of H₀", "irrelevant"]),
          "Small p: data at least this extreme would be rare if H₀ were true.");
      },
      worked: [
        {
          problem: "A study reports p = 0.03. Does that mean P(H₀ true) = 3%?",
          steps: [["Definition", "p is not P(H₀)."], ["Meaning", "Assuming H₀, seeing data this extreme (or more) has probability about 0.03."]],
          answer: "no"
        },
        {
          problem: "What must you assume to compute a p-value?",
          steps: [["Assume", "H₀ is true."], ["Then", "Find the tail probability of the statistic."]],
          answer: "H₀ is true"
        }
      ]
    },
    {
      id: "boxplot-iqr-leash", name: "Boxplot whiskers (1.5 IQR)", phrase: "Boxplot whiskers reach the furthest point within 1.5 × IQR of the quartiles; beyond that are outliers.",
      steps: ["Find Q1, Q3, and IQR = Q3 − Q1.", "Fences sit at Q1 − 1.5·IQR and Q3 + 1.5·IQR.", "Whiskers stretch to the furthest data points still inside the fences; points beyond are outliers."],
      exception: "Some software/curricula use different fences (or min/max whiskers). Check the convention.",
      pic: () => P.chain(["Q1", "median", "Q3", "1.5 IQR fences"], ["—", "—", "→"]),
      gen() {
        const q1 = R(2, 8) * 2, iqr = R(3, 8), q3 = q1 + iqr;
        const form = R(1, 3);
        if (form === 1) {
          return Q(`Q1 = ${q1}, Q3 = ${q3}. What is the IQR?`, iqr,
            wrongs(iqr, [q3, q1, q3 + q1]),
            `IQR = Q3 − Q1 = ${q3} − ${q1} = ${iqr}.`);
        }
        if (form === 2) {
          const hi = q3 + 1.5 * iqr;
          return Q(`Q3 = ${q3}, IQR = ${iqr}. Upper fence (1.5·IQR rule)?`, hi,
            wrongs(hi, [q3 + iqr, q3 + 2 * iqr, q3 - 1.5 * iqr]),
            `Upper fence = Q3 + 1.5·IQR = ${q3} + 1.5×${iqr} = ${hi}.`);
        }
        const lo = q1 - 1.5 * iqr;
        return Q(`Q1 = ${q1}, IQR = ${iqr}. Lower fence (1.5·IQR rule)?`, lo,
          wrongs(lo, [q1 - iqr, q1 + 1.5 * iqr, q1 - 2 * iqr]),
          `Lower fence = Q1 − 1.5·IQR = ${q1} − 1.5×${iqr} = ${lo}.`);
      },
      worked: [
        {
          problem: "Q1 = 10, Q3 = 18. Find the upper 1.5·IQR fence.",
          steps: [["IQR", "18 − 10 = 8."], ["Fence", "18 + 1.5×8 = 18 + 12 = 30."]],
          answer: "30"
        },
        {
          problem: "A point sits past the upper fence. What is it called on a Tukey boxplot?",
          steps: [["Rule", "Beyond 1.5·IQR fences → plotted separately."], ["Name", "Outlier."]],
          answer: "outlier"
        }
      ]
    }
  ]);

  /* ================================================================== */
  /* Advanced trig (trig2)                                               */
  /* ================================================================== */
  addWhen("trig2", [
    {
      id: "sohadv", name: "SOHCAHTOA still rules", phrase: "Even in advanced trig, a right triangle still speaks SOH CAH TOA.",
      steps: ["Drop a perpendicular if needed.", "Label opp/adj/hyp for the acute angle.", "Read the primary ratio."],
      exception: "Oblique triangles need sine/cosine rules — not plain SOHCAHTOA alone.",
      pic: () => P.rightTri({ opp: "opp", adj: "adj", hyp: "hyp", theta: "θ" }),
      gen() {
        const [a, b, c] = pick([[3, 4, 5], [5, 12, 13]]);
        return Q(`cos θ with adj ${b}, hyp ${c}`, raw(b, c),
          wrongs(raw(b, c), [raw(a, c), raw(b, a)]),
          `CAH: ${b}/${c}.`);
      },
      worked: [
        { problem: "adj 12, hyp 13: cos?", steps: [["Step", "12/13"]], answer: "12/13" },
        { problem: "When SOHCAHTOA fails?", steps: [["Step", "non-right / oblique"]], answer: "use sine/cosine rule" }
      ]
    },
    {
      id: "astc2", name: "ASTC for allied angles", phrase: "All Students Take Calculus — fix the sign after the allied reduction.",
      steps: ["Reduce to a related acute angle.", "Ask which quadrant the original angle sits in.", "Apply ASTC for the sign."],
      exception: "Odd multiples of 90° can swap sin ↔ cos — do the swap before the sign.",
      pic: () => P.quadrant(3),
      gen() {
        const q = R(1, 4);
        const fn = pick(["sin", "cos", "tan"]);
        const pos = (q === 1) || (q === 2 && fn === "sin") || (q === 3 && fn === "tan") || (q === 4 && fn === "cos");
        return Q(`${fn} in quadrant ${q} is…`, pos ? "positive" : "negative",
          wrongs(pos ? "positive" : "negative", ["positive", "negative"]),
          `ASTC in Q${q} for ${fn}: ${pos ? "positive" : "negative"}.`, P.quadrant(q));
      },
      worked: [
        { problem: "tan in QIII?", steps: [["T in ASTC", "positive"]], answer: "positive" },
        { problem: "cos in QII?", steps: [["only sin +", "negative"]], answer: "negative" }
      ]
    },
    {
      id: "wordkeys2", name: "Ambiguous case words", phrase: "SSA is the ambiguous case — two triangles, one, or none.",
      steps: ["Spot two sides and a non-included angle.", "Compute the height a sin A.", "Compare the opposite side to that height and to a."],
      exception: "If angle A is obtuse, the “two triangles” story changes — check carefully.",
      pic: () => P.tri("A", "b", "a"),
      gen() {
        return Q("Which condition is the ambiguous case?", "SSA",
          wrongs("SSA", ["SAS", "ASA", "SSS"]),
          "Two sides and a non-included angle: SSA.");
      },
      worked: [
        { problem: "SAS ambiguous?", steps: [["Step", "No — SAS is unique."]], answer: "no" },
        { problem: "Name the ambiguous letters", steps: [["Step", "SSA"]], answer: "SSA" }
      ]
    },
    {
      id: "compound2", name: "Compound sign memory", phrase: "sin cos cos sin, sign stays. cos cos sin sin, sign swaps.",
      steps: ["For sin(A±B): sin A cos B ± cos A sin B (sign stays).", "For cos(A±B): cos A cos B ∓ sin A sin B (sign swaps).", "Write carefully."],
      exception: "tan compound formulas are different — don’t force this chant onto tan.",
      pic: () => P.chain(["sin(A+B)", "sAcB + cAsB"], ["="]),
      gen() {
        const form = pick(["sin+", "cos+"]);
        if (form === "sin+") {
          return Q("sin(A+B) = ?", "sin A cos B + cos A sin B",
            wrongs("sin A cos B + cos A sin B", [
              "sin A cos B − cos A sin B",
              "cos A cos B − sin A sin B",
              "cos A cos B + sin A sin B"
            ]), "Sign stays for sine addition.");
        }
        return Q("cos(A+B) = ?", "cos A cos B − sin A sin B",
          wrongs("cos A cos B − sin A sin B", [
            "cos A cos B + sin A sin B",
            "sin A cos B + cos A sin B",
            "sin A cos B − cos A sin B"
          ]), "Sign swaps for cosine addition.");
      },
      worked: [
        { problem: "sin(A−B)", steps: [["Step", "sAcB − cAsB"]], answer: "sin A cos B − cos A sin B" },
        { problem: "cos(A−B)", steps: [["Step", "cAcB + sAsB"]], answer: "cos A cos B + sin A sin B" }
      ]
    },
    {
      id: "double2", name: "Double-angle pack", phrase: "sin 2A = 2 sin A cos A. cos 2A has three outfits.",
      steps: ["Sine double: 2 sin cos.", "Cosine double: cos²−sin², or 2cos²−1, or 1−2sin².", "Pick the outfit that matches what you know."],
      exception: "sin 2A is not sin² A.",
      pic: () => P.chain(["sin 2A", "2 sin A cos A"], ["="]),
      gen() {
        if (Math.random() < 0.5) {
          return Q("sin 2A = ?", "2 sin A cos A",
            wrongs("2 sin A cos A", ["sin² A", "2 cos A", "sin A + cos A"]),
            "Double sine: 2 sin A cos A.");
        }
        return Q("One form of cos 2A is?", "cos² A − sin² A",
          wrongs("cos² A − sin² A", ["2 sin A cos A", "sin² A − cos² A", "cos A − sin A"]),
          "cos² − sin² is the basic outfit.");
      },
      worked: [
        { problem: "sin 2A", steps: [["Step", "2 sin A cos A"]], answer: "2 sin A cos A" },
        { problem: "cos 2A (in sin)", steps: [["Step", "1 − 2 sin² A"]], answer: "1 − 2 sin² A" }
      ]
    },
    {
      id: "arith2", name: "Exact-value arithmetic", phrase: "Build bigger angles from 30°, 45°, 60° with compound formulas.",
      steps: ["Write the angle as a sum/difference of standards.", "Apply compound formulas.", "Simplify exact values."],
      exception: "75° = 45°+30° works; don’t invent a standard for 20°.",
      pic: () => P.chain(["75°", "45°+30°", "exact"], ["=", "→"]),
      gen() {
        const form = R(1, 3);
        if (form === 1) return Q("sin 45°", "√2/2", wrongs("√2/2", ["1/2", "√3/2", "1"]), "Standard 45°.");
        if (form === 2) return Q("cos 30°", "√3/2", wrongs("√3/2", ["1/2", "√2/2", "0"]), "Standard 30°.");
        return Q("tan 60°", "√3", wrongs("√3", ["1", "1/√3", "0"]), "Standard 60°.");
      },
      worked: [
        { problem: "sin 30°", steps: [["Step", "1/2"]], answer: "1/2" },
        { problem: "cos 45°", steps: [["Step", "√2/2"]], answer: "√2/2" }
      ]
    },
    {
      id: "estimate2", name: "Bound trig answers", phrase: "Sine and cosine live between −1 and 1 — reject impossible calculator slips.",
      steps: ["Solve the equation.", "Check each candidate is in range.", "Use ASTC to place angles."],
      exception: "tan can be any real number — the −1…1 bound is only for sin/cos (and their reciprocals’ domains).",
      pic: () => P.chain(["sin θ", "between −1 and 1"], ["∈"]),
      gen() {
        const v = pick(["1.2", "0.3", "−0.5", "2"]);
        const ok = Math.abs(Number(v)) <= 1;
        return Q(`Can sin θ equal ${v}?`, ok ? "yes" : "no",
          wrongs(ok ? "yes" : "no", ["yes", "no"]),
          `|sin| ≤ 1, so ${v} → ${ok ? "yes" : "no"}.`);
      },
      worked: [
        { problem: "sin θ = 1.5 possible?", steps: [["Step", "no"]], answer: "no" },
        { problem: "cos θ = −1 possible?", steps: [["Step", "yes (180°)"]], answer: "yes" }
      ]
    },
    {
      id: "mental2", name: "Mental radians", phrase: "π is 180°. Half is 90°, a third is 60°, a quarter is 45°.",
      steps: ["Memorize π ↔ 180°.", "Divide π to get the common friends.", "Convert by ×180/π or ×π/180."],
      exception: "2π is a full turn (360°), not 180°.",
      pic: () => P.chain(["π", "180°", "π/2", "90°"], ["=", "·", "="]),
      gen() {
        const form = pick([["π/2", "90°"], ["π/3", "60°"], ["π/4", "45°"], ["π/6", "30°"], ["2π", "360°"]]);
        return Q(`${form[0]} in degrees?`, form[1],
          wrongs(form[1], ["180°", "90°", "45°", "30°"].filter((x) => x !== form[1])),
          `${form[0]} = ${form[1]}.`);
      },
      worked: [
        { problem: "π/6 to degrees?", steps: [["Step", "30°"]], answer: "30°" },
        { problem: "3π/2 to degrees?", steps: [["Step", "270°"]], answer: "270°" }
      ]
    }
  ]);

})();
