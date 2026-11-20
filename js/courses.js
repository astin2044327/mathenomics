/** Grade library. Each lesson: one phrase, the steps it stands for, the exception, and a question generator. */
(function () {
  const P = window.PICS;

  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const lcm = (a, b) => (a * b) / gcd(a, b);
  const neg = (x) => (x < 0 ? `−${-x}` : `${x}`);
  const deg = (x) => (x > 0 && x < 360 ? `${x}°` : null);
  const raw = (n, d) => `${n}/${d}`;
  const SUP = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
  const pow = (n) => (n === 1 ? "x" : n === 0 ? "" : `x${String(n).split("").map((c) => SUP[c]).join("")}`);

  function fr(n, d) {
    const g = gcd(n, d) || 1;
    let a = n / g;
    let b = d / g;
    if (b < 0) { a = -a; b = -b; }
    return b === 1 ? String(a) : `${a}/${b}`;
  }

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function val(s) {
    const t = String(s).replace(/−/g, "-").replace(/°/g, "").trim();
    if (/^-?\d+\/-?\d+$/.test(t)) {
      const [n, d] = t.split("/").map(Number);
      return d ? n / d : null;
    }
    if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t);
    return null;
  }

  function Q(prompt, answer, wrongs, why, pic) {
    const a = String(answer);
    const av = val(a);
    const out = [a];
    for (const w of wrongs) {
      if (w == null) continue;
      const s = String(w);
      if (out.includes(s) || /NaN|Infinity|undefined/.test(s)) continue;
      const wv = val(s);
      if (av != null && wv != null && Math.abs(av - wv) < 1e-9) continue;
      out.push(s);
      if (out.length === 4) break;
    }
    const choices = shuffle(out);
    return { prompt, choices, answer: choices.indexOf(a), why, pic: pic || "" };
  }

  function L(o) { return o; }

  const RHYMES = [
    [6, 6, 36, "Six times six, magic tricks: thirty-six."],
    [6, 7, 42, "I know now and you do too: six times seven is forty-two."],
    [6, 8, 48, "Six and eight went on a date, came back as forty-eight."],
    [7, 7, 49, "Seven and seven are doing fine: forty-nine."],
    [7, 8, 56, "Five, six, seven, eight: fifty-six is seven times eight."],
    [8, 8, 64, "I ate and ate and got sick on the floor: eight times eight is sixty-four."],
    [4, 4, 16, "You can drive a four-by-four when you turn sixteen."],
    [9, 9, 81, "Nine and nine are having fun: they play tag with eighty-one."],
    [12, 12, 144, "Twelve and twelve walk out the door. Who is out there? One forty-four."]
  ];

  const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [7, 24, 25], [9, 12, 15], [20, 21, 29]];

  window.COURSES = [
    {
      id: "k", grade: "K–1", title: "Counting & comparing", color: "#E4572E",
      blurb: "Bigger, smaller, and the friends that make ten.",
      lessons: [
        L({
          id: "gator", name: "Bigger or smaller", phrase: "The hungry alligator eats the bigger number.",
          also: "The pointy end points at the smaller number.",
          steps: ["Look at both numbers.", "The alligator’s open mouth faces the bigger one.", "The point faces the smaller one."],
          exception: "If both numbers are the same, there is nothing bigger to eat. Use = instead. The mouth faces the bigger number, not whichever number comes first.",
          pic: () => P.gator(8, 3),
          gen() {
            const a = R(0, 20);
            const b = Math.random() < 0.2 ? a : R(0, 20);
            const s = a > b ? ">" : a < b ? "<" : "=";
            return Q(`Which sign goes between ${a} and ${b}?`, s, ["<", ">", "="],
              a === b ? `They are the same, so it is ${a} = ${b}.` : `The mouth opens toward ${Math.max(a, b)}: ${a} ${s} ${b}.`, P.gator(a, b, { hide: true, maskSides: true }));
          }
        }),
        L({
          id: "bonds", name: "Friends of ten", phrase: "Ten friends hold hands: 1 and 9, 2 and 8, 3 and 7, 4 and 6, 5 and 5.",
          steps: ["Fill the ten frame with the first number.", "Count the empty boxes.", "The empty boxes are the partner."],
          exception: "These partners only make 10. For 20, the partners change: 7 needs 13. And 0’s partner is the whole 10.",
          pic: () => P.tenFrame(7),
          gen() {
            const k = R(0, 10);
            return Q(`${k} + ? = 10`, 10 - k, [11 - k, 9 - k, k, 10 + k], `${k} filled, ${10 - k} empty. ${k} and ${10 - k} make ten.`, P.tenFrame(k, { hideCaption: true }));
          }
        }),
        L({
          id: "counton", name: "Counting on", phrase: "Put the big number in your head, then count on.",
          steps: ["Say the bigger number.", "Count up one finger for each of the smaller number.", "The last number you say is the answer."],
          exception: "Do not start again from 1. And do not count the starting number twice: 8 + 3 is 9, 10, 11, not 8, 9, 10.",
          pic: () => P.numberLine(6, 13, 8, [1, 1, 1]),
          gen() {
            const a = R(6, 14);
            const b = R(2, 4);
            const seq = Array.from({ length: b }, (_, i) => a + i + 1).join(", ");
            return Q(`${a} + ${b}`, a + b, [a + b - 1, a + b + 1, a + b + 2], `Hold ${a}. Count on: ${seq}.`, P.numberLine(a - 1, a + b + 1, a, Array(b).fill(1), { hideTicks: [a + b], hideHops: true }));
          }
        })
      ]
    },
    {
      id: "g1", grade: "Grades 1–2", title: "Place value & regrouping", color: "#E9A23B",
      blurb: "Where a digit sits, and how tens trade with ones.",
      lessons: [
        L({
          id: "place", name: "Place value", phrase: "The seat gives the size.",
          steps: ["Ones sit on the right.", "Tens sit next door.", "Hundreds sit one more seat to the left."],
          exception: "The digit alone is not the value. The 4 in 340 means 4 tens, which is 40.",
          pic: () => P.placeValue(352),
          gen() {
            let h, t, o;
            do { h = R(1, 9); t = R(1, 9); o = R(1, 9); } while (h === t || t === o || h === o);
            const n = h * 100 + t * 10 + o;
            const seat = pick(["hundreds", "tens", "ones"]);
            const digit = { hundreds: h, tens: t, ones: o }[seat];
            const value = digit * { hundreds: 100, tens: 10, ones: 1 }[seat];
            return Q(`In ${n}, what is the ${digit} worth?`, value, [digit, digit * 10, digit * 100, n].filter((x) => x !== value),
              `The ${digit} sits in the ${seat} seat, so it is worth ${value}.`, P.placeValue(n, true));
          }
        }),
        L({
          id: "carry", name: "Adding with regrouping", phrase: "Ten ones make a ten. Carry the one next door.",
          steps: ["Add the ones.", "If you get 10 or more, keep the ones digit and carry 1 ten.", "Add the tens, plus the carried ten."],
          exception: "Only carry when the ones make 10 or more. 23 + 14 has nothing to carry.",
          pic: () => P.colAdd(47, 26, true),
          gen() {
            const ao = R(3, 9);
            const a = R(1, 6) * 10 + ao;
            const b = R(1, 2) * 10 + R(10 - ao, 9);
            const s = a + b;
            const ones = (a % 10) + (b % 10);
            return Q(`${a} + ${b}`, s, [s - 10, s + 10, (Math.floor(a / 10) + Math.floor(b / 10)) * 100 + ones],
              `${a % 10} + ${b % 10} = ${ones}. Write ${ones % 10}, carry 1 ten. Tens: ${Math.floor(a / 10)} + ${Math.floor(b / 10)} + 1 = ${Math.floor(s / 10)}.`, P.colAdd(a, b));
          }
        }),
        L({
          id: "borrow", name: "Subtracting with regrouping", phrase: "More on top? No need to stop. More on the floor? Go next door and get ten more.",
          also: "Numbers the same? Zero’s the game.",
          steps: ["Look at the ones column.", "If the bottom digit is bigger, borrow a ten from next door.", "The top ones digit gets 10 more. The tens digit goes down by 1."],
          exception: "Never flip the ones to subtract the small digit from the big one. 52 − 27 is 25, not 35.",
          pic: () => P.colSub(52, 27, true),
          gen() {
            const at = R(3, 9);
            const bt = R(1, at - 1);
            const ao = R(0, 8);
            const bo = R(ao + 1, 9);
            const a = at * 10 + ao;
            const b = bt * 10 + bo;
            const s = a - b;
            return Q(`${a} − ${b}`, s, [(at - bt) * 10 + (bo - ao), s + 10, s - 1],
              `${bo} is more than ${ao}, so go next door. ${ao + 10} − ${bo} = ${ao + 10 - bo}. Tens: ${at - 1} − ${bt} = ${at - 1 - bt}.`, P.colSub(a, b));
          }
        })
      ]
    },
    {
      id: "g3", grade: "Grades 3–4", title: "Times tables & division", color: "#2A9D8F",
      blurb: "A trick for each times family, the tricky-fact rhymes, and long division.",
      lessons: [
        L({
          id: "groups", name: "What × means", phrase: "Times means groups of.",
          steps: ["Read 3 × 4 as 3 groups of 4.", "Draw the groups, or skip-count: 4, 8, 12.", "Order does not change the total: 4 groups of 3 is also 12."],
          exception: "Times is not plus. 3 × 4 is not 7. Anything times 0 is 0, and anything times 1 stays the same.",
          pic: () => P.groups(3, 4),
          gen() {
            const a = R(2, 6);
            const b = R(2, 6);
            return Q(`${a} × ${b}`, a * b, [a + b, a * b + a, a * b - b], `${a} groups of ${b} is ${a * b}.`, P.groups(a, b));
          }
        }),
        L({
          id: "doubles", name: "×2, ×4, ×8", phrase: "×2 is double. ×4 is double-double. ×8 is double-double-double.",
          steps: ["Double the number once for ×2.", "Double it again for ×4.", "Double one more time for ×8."],
          exception: "Count your doubles. Doubling twice is ×4, not ×8. And ×6 is not a doubling family: it is ×5 plus one more group.",
          pic: () => P.chain(["7", "14", "28", "56"], ["double", "double", "double"]),
          gen() {
            const k = pick([2, 4, 8]);
            const n = R(3, 12);
            const times = { 2: 1, 4: 2, 8: 3 }[k];
            const chainVals = [n];
            for (let i = 0; i < times; i += 1) chainVals.push(chainVals[chainVals.length - 1] * 2);
            return Q(`${n} × ${k}`, n * k, [n * k / 2, n * k * 2, n * k + n, n + k],
              `Double ${times === 1 ? "once" : times === 2 ? "twice" : "three times"}: ${chainVals.join(" → ")}.`,
              P.chain([n, ...Array(times).fill("?")], Array(times).fill("double")));
          }
        }),
        L({
          id: "fives", name: "×5", phrase: "Fives are half of tens.",
          also: "Fives end in 5 or 0.",
          steps: ["Multiply by 10: put a 0 on the end.", "Take half of that."],
          exception: "An even number of fives ends in 0. An odd number ends in 5. If your answer ends in anything else, check again.",
          pic: () => P.chain(["8 × 10", "80", "40"], ["=", "half"]),
          gen() {
            const n = R(2, 12);
            return Q(`${n} × 5`, n * 5, [n * 5 + 5, n * 5 - 5, n + 5, n * 10], `${n} × 10 = ${n * 10}. Half of that is ${n * 5}.`,
              P.chain([`${n} × 10`, n * 10, "?"], ["=", "half"]));
          }
        }),
        L({
          id: "nines", name: "×9", phrase: "Fold the finger. Left fingers are tens, right fingers are ones.",
          also: "The digits always add to nine.",
          steps: ["Hold up ten fingers.", "For 9 × 7, fold down finger 7.", "6 fingers on the left, 3 on the right: 63."],
          exception: "The fingers work up to 9 × 10. For 9 × 12, do 10 × 12 and take away 12. And 9 × 0 is 0.",
          pic: () => P.fingers(7),
          gen() {
            const n = R(2, 10);
            return Q(`9 × ${n}`, 9 * n, [n * 10 + (9 - n), 9 * n + 9, 9 * n - 9, (n + 1) * 10 + (8 - n)],
              `Fold finger ${n}: ${n - 1} on the left, ${10 - n} on the right. ${9 * n}.`, P.fingers(n));
          }
        }),
        L({
          id: "rhymes", name: "Tricky facts", phrase: "Five, six, seven, eight: fifty-six is seven times eight.",
          also: "I ate and ate and got sick on the floor: eight times eight is sixty-four.",
          steps: RHYMES.slice(0, 6).map((r) => r[3]),
          exception: "A rhyme is a hook, not the reason. If you forget it, build from a fact you know: 7 × 8 is 7 × 7 plus one more 7, which is 49 + 7 = 56.",
          pic: () => P.groups(7, 8),
          gen() {
            const [a, b, ans, rhyme] = pick(RHYMES);
            const [x, y] = Math.random() < 0.5 ? [a, b] : [b, a];
            return Q(`${x} × ${y}`, ans, [ans + a, ans - b, ans + 2, ans - 1], rhyme);
          }
        }),
        L({
          id: "elevens", name: "×11 for two digits", phrase: "Split the digits. Park their sum in the middle.",
          steps: ["Split 23 into 2 and 3.", "Add them: 5.", "Park the 5 in the middle: 253."],
          exception: "If the middle sum is 10 or more, carry the 1 to the left digit. 85 × 11: 8 + 5 = 13, so 8 + 1 = 9, then 3, then 5: 935.",
          pic: () => P.elevens(23, true),
          gen() {
            const a = R(1, 9);
            const b = R(0, 9);
            const n = a * 10 + b;
            const s = a + b;
            const ans = n * 11;
            return Q(`${n} × 11`, ans, [s >= 10 ? ans - 100 : ans + 100, ans + 10, ans - 11, n + 11],
              s >= 10 ? `${a} + ${b} = ${s}. Carry: ${a + 1}, then ${s % 10}, then ${b}. ${ans}.` : `${a} + ${b} = ${s}, parked in the middle: ${ans}.`, P.elevens(n));
          }
        }),
        L({
          id: "longdiv", name: "Long division", phrase: "Does McDonald’s Sell Burgers?",
          also: "Dad, Mom, Sister, Brother, and Rover the dog repeats it.",
          steps: ["Divide: how many times does it fit?", "Multiply: that answer times the divisor.", "Subtract: what is left?", "Bring down the next digit, then repeat."],
          exception: "What is left must be smaller than the divisor. If it is not, your divide step was too small. If the divisor does not fit at all, write a 0 in the answer before you bring down.",
          pic: () => P.longDiv(586, 4),
          gen() {
            const d = R(2, 9);
            const zero = Math.random() < 0.3;
            let q = R(12, Math.floor(999 / d));
            if (zero && q >= 100) q = Math.floor(q / 100) * 100 + (q % 10);
            const r = R(0, d - 1);
            const N = q * d + r;
            const f = (qq, rr) => (rr ? `${qq} R${rr}` : `${qq}`);
            const dropped = String(q).includes("0") && q >= 100 ? f(Number(String(q).replace(/0/g, "")), r) : null;
            return Q(`${N} ÷ ${d}`, f(q, r), [dropped, f(q + 1, r), f(q - 1, r + d), f(q, (r + 1) % d)],
              `${d} × ${q} = ${q * d}${r ? `, and ${r} is left, which is smaller than ${d}` : ""}.`, P.longDiv(N, d));
          }
        })
      ]
    },
    {
      id: "g5", grade: "Grades 5–6", title: "Fractions & order", color: "#3D5A98",
      blurb: "The sign between the fractions picks the move.",
      lessons: [
        L({
          id: "fadd", name: "Add fractions", phrase: "Same bottom, add the tops.",
          steps: ["If the bottoms differ, rename both fractions so the bottoms match.", "Add the tops.", "Keep the shared bottom, then simplify."],
          exception: "Never add the bottoms. 1/2 + 1/3 is not 2/5. Halves and thirds both turn into sixths: 3/6 + 2/6 = 5/6.",
          pic: () => P.fractionBars([{ n: 1, d: 2 }, { n: 1, d: 3 }, { n: 5, d: 6 }]),
          gen() {
            let d1, d2;
            do { d1 = pick([2, 3, 4, 5, 6, 8]); d2 = pick([2, 3, 4, 5, 6, 8]); } while (d1 === d2);
            const n1 = R(1, d1 - 1);
            const n2 = R(1, d2 - 1);
            const m = lcm(d1, d2);
            const top = (n1 * m) / d1 + (n2 * m) / d2;
            return Q(`${raw(n1, d1)} + ${raw(n2, d2)}`, fr(top, m), [raw(n1 + n2, d1 + d2), raw(n1 + n2, d1 * d2), fr(n1 * n2, d1 * d2)],
              `Make the bottoms ${m}: ${raw((n1 * m) / d1, m)} + ${raw((n2 * m) / d2, m)} = ${raw(top, m)}${fr(top, m) !== raw(top, m) ? `, which is ${fr(top, m)}` : ""}.`,
              P.fractionBars([{ n: n1, d: d1 }, { n: n2, d: d2 }]));
          }
        }),
        L({
          id: "fsub", name: "Subtract fractions", phrase: "Same bottom, take away the tops.",
          steps: ["Match the bottoms.", "Subtract the tops.", "Keep the bottom."],
          exception: "Do not subtract the bottoms. 3/5 − 1/5 is 2/5, not 2/0.",
          pic: () => P.fractionBars([{ n: 3, d: 5 }, { n: 1, d: 5 }, { n: 2, d: 5 }]),
          gen() {
            const d = R(4, 12);
            const n1 = R(2, d - 1);
            const n2 = R(1, n1 - 1);
            return Q(`${raw(n1, d)} − ${raw(n2, d)}`, raw(n1 - n2, d), [`${n1 - n2}/0`, raw(n1 + n2, d), raw(n1 - n2, 2 * d)],
              `${n1} − ${n2} = ${n1 - n2}. The bottom stays ${d}${fr(n1 - n2, d) !== raw(n1 - n2, d) ? `, and it simplifies to ${fr(n1 - n2, d)}` : ""}.`,
              P.fractionBars([{ n: n1, d }, { n: n2, d }]));
          }
        }),
        L({
          id: "fmul", name: "Multiply fractions", phrase: "Straight across: tops times tops, bottoms times bottoms.",
          steps: ["Multiply the tops.", "Multiply the bottoms.", "Simplify."],
          exception: "The bottoms do not need to match for ×. That is only an adding rule. 1/2 × 1/2 is 1/4, not 1.",
          pic: () => P.formula("2 × 3", "3 × 5", "2/3 × 3/5 = 6/15 = 2/5"),
          gen() {
            const d1 = R(2, 9), d2 = R(2, 9);
            const n1 = R(1, d1 - 1), n2 = R(1, d2 - 1);
            return Q(`${raw(n1, d1)} × ${raw(n2, d2)}`, fr(n1 * n2, d1 * d2), [fr(n1 * d2, d1 * n2), raw(n1 + n2, d1 + d2), raw(n1 * n2, d1 + d2)],
              `${n1} × ${n2} = ${n1 * n2} on top, ${d1} × ${d2} = ${d1 * d2} below: ${raw(n1 * n2, d1 * d2)}${fr(n1 * n2, d1 * d2) !== raw(n1 * n2, d1 * d2) ? ` = ${fr(n1 * n2, d1 * d2)}` : ""}.`);
          }
        }),
        L({
          id: "fdiv", name: "Divide fractions", phrase: "Keep, change, flip.",
          steps: ["Keep the first fraction.", "Change ÷ to ×.", "Flip only the second fraction, then go straight across."],
          exception: "Flip the second fraction only. Flipping the first, or both, gives a wrong answer. You can never divide by zero.",
          pic: () => P.chain(["1/2 ÷ 1/4", "1/2 × 4/1", "2"], ["keep, change, flip", "straight across"]),
          gen() {
            const d1 = R(2, 9), d2 = R(2, 9);
            const n1 = R(1, d1 - 1), n2 = R(1, d2 - 1);
            return Q(`${raw(n1, d1)} ÷ ${raw(n2, d2)}`, fr(n1 * d2, d1 * n2), [fr(n1 * n2, d1 * d2), fr(d1 * n2, n1 * d2), fr(d1 * d2, n1 * n2)],
              `Keep ${raw(n1, d1)}, change to ×, flip to ${raw(d2, n2)}. ${raw(n1 * d2, d1 * n2)} = ${fr(n1 * d2, d1 * n2)}.`);
          }
        }),
        L({
          id: "pemdas", name: "Order of operations", phrase: "Please Excuse My Dear Aunt Sally.",
          steps: ["Brackets first.", "Then powers.", "Then × and ÷, left to right.", "Then + and −, left to right."],
          exception: "× and ÷ are a tie, so work left to right: 8 ÷ 2 × 4 = 16, not 1. The same goes for + and −.",
          pic: () => P.pemdas(),
          gen() {
            const form = R(1, 5);
            if (form === 1) {
              const a = R(2, 9), b = R(2, 6), c = R(2, 6);
              return Q(`${a} + ${b} × ${c}`, a + b * c, [(a + b) * c, a * b + c, a + b + c], `My Dear comes before Aunt Sally: ${b} × ${c} = ${b * c}, then + ${a}.`);
            }
            if (form === 2) {
              const b = R(2, 4), c = R(2, 4), a = R(b * c + 1, 30);
              return Q(`${a} − ${b} × ${c}`, a - b * c, [(a - b) * c, a - b - c, a * b - c], `Multiply first: ${b * c}. Then ${a} − ${b * c}.`);
            }
            if (form === 3) {
              const b = R(2, 5), c = R(2, 5), a = b * c * R(1, 4);
              return Q(`${a} ÷ ${b} × ${c}`, (a / b) * c, [a / (b * c), a / b + c, a * c], `× and ÷ tie, so go left to right: ${a} ÷ ${b} = ${a / b}, then × ${c}.`);
            }
            if (form === 4) {
              const a = R(2, 9), b = R(2, 9), c = R(2, 5);
              return Q(`(${a} + ${b}) × ${c}`, (a + b) * c, [a + b * c, a * c + b, a + b + c], `Please first: brackets make ${a + b}, then × ${c}.`);
            }
            const a = R(2, 9), b = R(2, 5);
            return Q(`${a} + ${b}²`, a + b * b, [(a + b) ** 2, a + b * 2, a * b], `Excuse (the power) first: ${b}² = ${b * b}. Then + ${a}.`);
          }
        }),
        L({
          id: "ndd", name: "Fraction to decimal", phrase: "No Dirty Dogs: numerator divided by denominator.",
          steps: ["The top number goes inside the division house.", "Divide it by the bottom number.", "Add a decimal point and zeros as you need them."],
          exception: "Do not divide the bottom by the top: that gives the flipped fraction. 3/4 is 0.75, not 1.33.",
          pic: () => P.chain(["3/4", "3 ÷ 4", "0.75"], ["top ÷ bottom", "="]),
          gen() {
            const d = pick([2, 4, 5, 8, 10, 20, 25]);
            const n = R(1, d - 1);
            const f = (x) => String(Number(x.toFixed(3)));
            return Q(`${raw(n, d)} as a decimal`, f(n / d), [f(d / n), `${n}.${d}`, f((n / d) * 10)], `${n} ÷ ${d} = ${f(n / d)}.`);
          }
        })
      ]
    },
    {
      id: "g7", grade: "Grade 7", title: "Integers & percent", color: "#8C5383",
      blurb: "Positive and negative numbers, and anything out of 100.",
      lessons: [
        L({
          id: "signs", name: "Multiplying signs", phrase: "Friends are positive. Strangers are negative.",
          also: "Same signs give +. Different signs give −.",
          steps: ["Ignore the signs and multiply.", "Same signs (friends): the answer is positive.", "Different signs (strangers): the answer is negative."],
          exception: "This is only for × and ÷. Adding is different: −3 + −4 is −7, not +7. Anything times 0 is 0, with no sign.",
          pic: () => P.signs(),
          gen() {
            const a = R(2, 9) * pick([1, -1]);
            const b = R(2, 9) * pick([1, -1]);
            const show = (x) => (x < 0 ? `(${neg(x)})` : `${x}`);
            return Q(`${show(a)} × ${show(b)}`, neg(a * b), [neg(-a * b), neg(a + b), neg(-(a + b))],
              `${(a < 0) === (b < 0) ? "Same signs, friends, so positive" : "Different signs, strangers, so negative"}: ${neg(a * b)}.`);
          }
        }),
        L({
          id: "intadd", name: "Adding integers", phrase: "Same signs: add and keep. Different signs: subtract and keep the bigger one’s sign.",
          steps: ["Check the two signs.", "Same: add the sizes, keep the sign.", "Different: subtract the smaller size from the bigger, and keep the sign of the bigger size."],
          exception: "Do not use the friends-and-strangers rule here. −3 + −4 is −7, because adding two debts makes a bigger debt.",
          pic: () => P.numberLine(-4, 4, -3, [5]),
          gen() {
            let a, b;
            do { a = R(-9, 9); b = R(-9, 9); } while (!a || !b);
            const s = a + b;
            return Q(`${neg(a)} + ${neg(b)}`, neg(s), [neg(-s), neg(a - b), neg((Math.abs(a) + Math.abs(b)) * Math.sign(a))],
              (a < 0) === (b < 0) ? `Same signs: add ${Math.abs(a)} and ${Math.abs(b)}, keep the sign: ${neg(s)}.` : `Different signs: ${Math.max(Math.abs(a), Math.abs(b))} − ${Math.min(Math.abs(a), Math.abs(b))}, keep the bigger one’s sign: ${neg(s)}.`,
              Math.abs(a) <= 9 && Math.abs(s) <= 12 ? P.numberLine(Math.min(a, s, 0) - 1, Math.max(a, s, 0) + 1, a, [b], { hideTicks: [s] }) : "");
          }
        }),
        L({
          id: "percent", name: "Percent of a number", phrase: "Per cent means out of 100. Hop the decimal two places, then multiply.",
          steps: ["Write the percent out of 100: 25% is 0.25.", "Multiply by the amount.", "For a change, always compare with the starting amount."],
          exception: "10% of 10% is 1%, not 20%. More than 100% is fine: 150% of 40 is 60.",
          pic: () => P.grid100(25),
          gen() {
            const p = pick([5, 10, 15, 20, 25, 30, 50, 75]);
            let n;
            do { n = R(1, 20) * 20; } while ((p * n) % 100 !== 0);
            const ans = (p * n) / 100;
            return Q(`${p}% of ${n}`, ans, [ans * 10, p + n, ans + p, n - ans], `${p}% is ${p / 100}. ${p / 100} × ${n} = ${ans}.`, P.grid100(p));
          }
        })
      ]
    },
    {
      id: "g8", grade: "Grade 8", title: "Triangle & angle theorems", color: "#4F7F3A",
      blurb: "Each theorem is one move. Spot the shape, then make the move.",
      lessons: [
        L({
          id: "anglesum", name: "Angle sum of a triangle", phrase: "Three corners make a straight line: 180°.",
          steps: ["Add the angles you know.", "Take that from 180°.", "What is left is the missing angle."],
          exception: "This is for flat paper. A triangle drawn on a ball can add to more than 180°. The outside angles, one at each corner, add to 360°.",
          pic: () => P.tri("50°", "60°", "?"),
          gen() {
            const a = R(25, 80), b = R(25, 80);
            const c = 180 - a - b;
            return Q(`Two angles of a triangle are ${a}° and ${b}°. Find the third.`, `${c}°`, [deg(a + b), deg(360 - a - b), deg(c + 10)], `180 − ${a} − ${b} = ${c}.`, P.tri(`${a}°`, `${b}°`, "?"));
          }
        }),
        L({
          id: "exterior", name: "Exterior angle", phrase: "The outside angle equals the two far insides.",
          steps: ["Find the outside angle at one corner.", "Add the two inside angles that do not touch it.", "They match."],
          exception: "Do not use the inside angle next to it. That pair sits on a straight line and makes 180°.",
          pic: () => P.exterior("50°", "60°", "110°"),
          gen() {
            const a = R(30, 75), b = R(30, 75);
            return Q(`The two far inside angles are ${a}° and ${b}°. Find the outside angle.`, `${a + b}°`, [deg(180 - a - b), deg(Math.abs(a - b)), deg(180 - a)], `${a} + ${b} = ${a + b}.`, P.exterior(`${a}°`, `${b}°`, "?"));
          }
        }),
        L({
          id: "iso", name: "Isosceles triangle", phrase: "Twin sides, twin angles.",
          steps: ["Find the two equal sides (the tick marks).", "The angles at the bottom of those sides are equal.", "Use 180° for the rest."],
          exception: "The twin angles sit across from the twin sides, at the base. The angle between the twin sides is usually different, unless all three sides match.",
          pic: () => P.iso("40°", "70°", "70°"),
          gen() {
            const v = R(10, 50) * 2;
            const base = (180 - v) / 2;
            if (Math.random() < 0.5) {
              return Q(`An isosceles triangle has a top angle of ${v}°. Find one base angle.`, `${base}°`, [deg(v), deg(180 - v), deg(base + 10)], `(180 − ${v}) ÷ 2 = ${base}.`, P.iso(`${v}°`, "?", ""));
            }
            return Q(`Each base angle is ${base}°. Find the top angle.`, `${v}°`, [deg(base), deg(180 - base), deg(90 - base)], `180 − ${base} − ${base} = ${v}.`, P.iso("?", `${base}°`, `${base}°`));
          }
        }),
        L({
          id: "pythag", name: "Pythagoras", phrase: "Square the legs, add them, and that is the long side squared.",
          also: "a² + b² = c², and c is across from the square corner.",
          steps: ["Find the right angle. The side across from it is c.", "Square the two legs and add them.", "Take the square root. To find a leg, subtract instead: c² − a²."],
          exception: "Only for right triangles. And c is across from the right angle, not just the side that looks longest.",
          pic: () => P.rightTri({ opp: "3", adj: "4", hyp: "5" }),
          gen() {
            const [a, b, c] = pick(TRIPLES);
            if (Math.random() < 0.5) {
              return Q(`The legs are ${a} and ${b}. Find the long side.`, c, [a + b, c + 2, c - 1], `${a}² + ${b}² = ${a * a + b * b}. √${a * a + b * b} = ${c}.`, P.rightTri({ opp: a, adj: b, hyp: "?" }));
            }
            return Q(`The long side is ${c} and one leg is ${a}. Find the other leg.`, b, [c - a, c + a, b + 1], `${c}² − ${a}² = ${c * c - a * a}. √${c * c - a * a} = ${b}.`, P.rightTri({ opp: a, adj: "?", hyp: c }));
          }
        }),
        L({
          id: "parallel", name: "Parallel lines", phrase: "F angles copy, Z angles copy, C angles make 180°.",
          steps: ["Trace the letter the two angles make with the lines.", "F (corresponding) or Z (alternate): the angles are equal.", "C (co-interior): the angles add to 180°."],
          exception: "Only when the lines are parallel (the arrow marks). Without parallel lines, the angles are not forced to match.",
          pic: () => P.parallel("Z", "65°", "65°"),
          gen() {
            const kind = pick(["F", "Z", "C"]);
            let x;
            do { x = R(40, 140); } while (x === 90);
            const ans = kind === "C" ? 180 - x : x;
            const word = { F: "corresponding (F)", Z: "alternate (Z)", C: "co-interior (C)" }[kind];
            return Q(`On parallel lines, find the ${word} angle to ${x}°.`, `${ans}°`, [deg(kind === "C" ? x : 180 - x), deg(360 - x), deg(Math.abs(90 - x))],
              kind === "C" ? `C angles add to 180: 180 − ${x} = ${ans}.` : `${kind} angles copy: ${ans}°.`, P.parallel(kind, kind === "C" ? `${x}°` : "θ", "?"));
          }
        }),
        L({
          id: "congruent", name: "Congruent triangles", phrase: "Same size and shape: SSS, SAS, ASA, RHS.",
          steps: ["SSS: three sides match.", "SAS: two sides and the angle between them.", "ASA: two angles and the side between them.", "RHS: right angle, hypotenuse, and one more side."],
          exception: "SSA is not a test: two sides and an angle that is not between them can make two different triangles. AAA shows the same shape but not the same size.",
          pic: () => P.congruence("SAS"),
          gen() {
            const pool = [
              ["SAS", "Two sides and the angle between them match."],
              ["SSS", "All three sides match."],
              ["ASA", "Two angles and the side between them match."],
              ["RHS", "Both have a right angle, the same hypotenuse, and one more equal side."],
              ["SSA", "Two sides and an angle that is not between them match."],
              ["AAA", "All three angles match, but no sides are given."]
            ];
            const [type, text] = pick(pool);
            const ok = ["SSA", "AAA"].includes(type) ? "Not enough to prove it" : type;
            return Q(`${text} Which test proves they are congruent?`, ok, ["SSS", "SAS", "ASA", "RHS", "Not enough to prove it"].filter((x) => x !== ok),
              type === "SSA" ? "SSA is not a test. The angle has to be between the two sides." : type === "AAA" ? "Matching angles give the same shape, not the same size." : `That is ${type}.`, P.congruence(type));
          }
        }),
        L({
          id: "quad", name: "Quadrilateral angles", phrase: "Four corners make a full turn: 360°.",
          steps: ["Add the three angles you know.", "Take that from 360°."],
          exception: "Opposite angles are only equal in a parallelogram. Do not assume a shape is a square because it has four sides.",
          pic: () => P.quad(["80°", "100°", "90°", "?"]),
          gen() {
            let a, b, c, d;
            do { a = R(60, 120); b = R(60, 120); c = R(60, 120); d = 360 - a - b - c; } while (d < 40 || d > 170);
            return Q(`Three angles of a quadrilateral are ${a}°, ${b}°, and ${c}°. Find the fourth.`, `${d}°`, [deg(a + b + c - 180), deg(d + 20), deg(180 - d)], `360 − ${a + b + c} = ${d}.`, P.quad([`${a}°`, `${b}°`, `${c}°`, "?"]));
          }
        })
      ]
    },
    {
      id: "g9", grade: "Grade 9", title: "Similarity, circles & quadratics", color: "#B5651D",
      blurb: "Same shape, circle facts, and the quadratic formula.",
      lessons: [
        L({
          id: "similar", name: "Similar triangles", phrase: "Same angles, same shape. Every side grows by the same scale.",
          steps: ["Match the equal angles.", "Find the scale: big side ÷ matching small side.", "Multiply any small side by the scale."],
          exception: "Similar is not the same as congruent. The sizes can be different. Always pair a side with the side across from the same angle.",
          pic: () => P.similar("4", "8"),
          gen() {
            const k = pick([2, 3, 1.5, 2.5]);
            let s = R(2, 9);
            if (k % 1) s = R(1, 5) * 2;
            return Q(`Scale factor ${k}. A small side is ${s}. Find the matching big side.`, s * k, [s + k, s * k + 1, s * k * 2], `${s} × ${k} = ${s * k}.`, P.similar(s, "?"));
          }
        }),
        L({
          id: "bpt", name: "Parallel cut in a triangle", phrase: "A line parallel to the base cuts both sides in the same ratio.",
          steps: ["Read the two pieces on one side.", "Set their ratio equal to the two pieces on the other side.", "Solve."],
          exception: "Only if the cut is parallel to the base. A slanted line does not keep the ratio.",
          pic: () => P.bpt(2, 4, 3, 6),
          gen() {
            const a = R(2, 5), b = R(2, 8), k = R(2, 3);
            return Q(`Left side pieces: ${a} and ${b}. Right side: ${a * k} and ?`, b * k, [b + a * k - a, a * k, b * k + 1], `${a} : ${b} = ${a * k} : ${b * k}. Each piece is ×${k}.`, P.bpt(a, b, a * k, "?"));
          }
        }),
        L({
          id: "midseg", name: "Midsegment", phrase: "Join the middles: half the base, and parallel to it.",
          steps: ["Find the midpoint of two sides.", "Join them.", "That line is half as long as the third side."],
          exception: "Both ends must be midpoints. If one end is not the middle, the half rule does not apply.",
          pic: () => P.midseg("14", "7"),
          gen() {
            const m = R(3, 15);
            if (Math.random() < 0.5) {
              return Q(`The base is ${2 * m}. Find the midsegment.`, m, [2 * m, 4 * m, m + 2], `Half of ${2 * m} is ${m}.`, P.midseg(2 * m, "?"));
            }
            return Q(`The midsegment is ${m}. Find the base.`, 2 * m, [m, m / 2, m + 2], `The base is double: ${2 * m}.`, P.midseg("?", m));
          }
        }),
        L({
          id: "semicircle", name: "Angle in a semicircle", phrase: "A diameter always sees a right angle.",
          steps: ["Check that one side is a diameter.", "The angle on the circle across from it is 90°.", "The other two angles add to 90°."],
          exception: "The 90° is on the circle, not at the center. The center angle on a diameter is a straight line, 180°.",
          pic: () => P.semicircle("35°", "55°"),
          gen() {
            const x = R(20, 70);
            return Q(`AB is a diameter. The angle at A is ${x}°. Find the angle at B.`, `${90 - x}°`, [deg(180 - x), deg(x), deg(90 + x)], `The rim angle is 90°, so 90 − ${x} = ${90 - x}.`, P.semicircle(`${x}°`, "?"));
          }
        }),
        L({
          id: "tangent", name: "Tangent and radius", phrase: "A tangent meets the radius at a right angle.",
          also: "Two tangents from the same point are the same length.",
          steps: ["Draw the radius to the touching point.", "That corner is 90°.", "Use the triangle angle sum for the rest."],
          exception: "A line that cuts through the circle is not a tangent. A tangent only touches once.",
          pic: () => P.tangent("30°", "60°"),
          gen() {
            const x = R(20, 70);
            return Q(`The angle at P is ${x}°. Find the angle at the center O.`, `${90 - x}°`, [deg(180 - x), deg(x), deg(90 + x)], `The angle at T is 90°. 180 − 90 − ${x} = ${90 - x}.`, P.tangent(`${x}°`, "?"));
          }
        }),
        L({
          id: "quadratic", name: "Quadratic formula", phrase: "Negative b, plus or minus the root of b² − 4ac, all over 2a.",
          steps: ["Read a, b, and c from ax² + bx + c = 0.", "Work out b² − 4ac.", "Use + and − to get both answers. Divide by 2a."],
          exception: "If a is 0, it is not a quadratic. If b² − 4ac is negative, there are no real answers. If it is 0, both answers are the same.",
          pic: () => P.parabola(2, 3),
          gen() {
            let r1, r2;
            do { r1 = R(-6, 6); r2 = R(-6, 6); } while (!r1 || !r2 || r1 === r2 || r1 + r2 === 0);
            const b = -(r1 + r2);
            const c = r1 * r2;
            let eq = "x²";
            if (b) eq += `${b > 0 ? " + " : " − "}${Math.abs(b) === 1 ? "" : Math.abs(b)}x`;
            eq += `${c > 0 ? " + " : " − "}${Math.abs(c)} = 0`;
            const pair = (p, q) => `x = ${neg(Math.min(p, q))} or ${neg(Math.max(p, q))}`;
            const disc = b * b - 4 * c;
            return Q(`Solve ${eq}`, pair(r1, r2), [pair(-r1, -r2), pair(r1, -r2), pair(b, c)],
              `b² − 4ac = ${disc}, √${disc} = ${Math.sqrt(disc)}. (${neg(-b)} ± ${Math.sqrt(disc)}) ÷ 2 gives ${neg(Math.min(r1, r2))} and ${neg(Math.max(r1, r2))}.`, P.parabola(r1, r2));
          }
        })
      ]
    },
    {
      id: "g10", grade: "Grade 10", title: "Trigonometry & circle theorems", color: "#2E4057",
      blurb: "sin, cos, tan, the optional cosec, sec, and cot, and the circle facts.",
      lessons: [
        L({
          id: "soh", name: "sin, cos, tan", phrase: "SOH CAH TOA.",
          also: "Some People Have Curly Brown Hair Through Proper Brushing: perpendicular, base, hypotenuse.",
          steps: ["Sine = Opposite ÷ Hypotenuse.", "Cosine = Adjacent ÷ Hypotenuse.", "Tangent = Opposite ÷ Adjacent."],
          exception: "Name the sides from the angle you are using, never from the right angle. Tangent has no value at 90°.",
          pic: () => P.rightTri({ opp: "opposite", adj: "adjacent", hyp: "hypotenuse", theta: "θ" }),
          gen() {
            const [a, b, c] = pick(TRIPLES.slice(0, 4));
            const fn = pick(["sin", "cos", "tan"]);
            const ans = { sin: raw(a, c), cos: raw(b, c), tan: raw(a, b) }[fn];
            return Q(`Opposite ${a}, adjacent ${b}, hypotenuse ${c}. Find ${fn} θ.`, ans, [raw(a, c), raw(b, c), raw(a, b), raw(b, a), raw(c, a)].filter((x) => x !== ans),
              { sin: "SOH: opposite over hypotenuse.", cos: "CAH: adjacent over hypotenuse.", tan: "TOA: opposite over adjacent." }[fn], P.rightTri({ opp: a, adj: b, hyp: c, theta: "θ" }));
          }
        }),
        L({
          id: "recip", name: "cosec, sec, cot (optional)", phrase: "Flip the main three: cosec flips sin, sec flips cos, cot flips tan.",
          also: "Each pair has exactly one “co”: sin with cosec, cos with sec, tan with cot.",
          steps: ["Find the main ratio.", "Turn it upside down.", "cosec θ = hypotenuse ÷ opposite."],
          exception: "Undefined where the main ratio is 0. cosec 0° does not exist. Note the pairing: cosec goes with sin, not cos.",
          pic: () => P.chain(["sin = 3/5", "cosec = 5/3"], ["flip"]),
          gen() {
            const [a, b, c] = pick(TRIPLES.slice(0, 4));
            const pairs = [["sin", "cosec", raw(a, c), raw(c, a)], ["cos", "sec", raw(b, c), raw(c, b)], ["tan", "cot", raw(a, b), raw(b, a)]];
            const [main, flip, given, ans] = pick(pairs);
            return Q(`${main} θ = ${given}. Find ${flip} θ.`, ans, [given, raw(c, b), raw(c, a), raw(b, a)].filter((x) => x !== ans), `${flip} flips ${main}: ${given} turns into ${ans}.`);
          }
        }),
        L({
          id: "astc", name: "Signs in each quadrant", phrase: "Add Sugar To Coffee.",
          also: "All Students Take Calculus.",
          steps: ["Quadrant I, All: every ratio is positive.", "II, Sugar: only sin is positive.", "III, To: only tan is positive.", "IV, Coffee: only cos is positive."],
          exception: "Start in the top right and go anticlockwise. The phrase gives signs only; tan still has no value at 90° and 270°.",
          pic: () => P.quadrant(2),
          gen() {
            const q = R(1, 4);
            let base;
            do { base = R(10, 80); } while (base === 45);
            const angle = base + 90 * (q - 1);
            const fn = pick(["sin", "cos", "tan"]);
            const positive = q === 1 || (q === 2 && fn === "sin") || (q === 3 && fn === "tan") || (q === 4 && fn === "cos");
            const word = ["All", "Sugar", "To", "Coffee"][q - 1];
            return Q(`Is ${fn} ${angle}° positive or negative?`, positive ? "positive" : "negative", [positive ? "negative" : "positive"],
              `${angle}° is in quadrant ${["I", "II", "III", "IV"][q - 1]}, “${word}”. ${q === 1 ? "All are positive." : `Only ${["", "sin", "tan", "cos"][q - 1]} is positive there.`}`, P.quadrant(q));
          }
        }),
        L({
          id: "hand", name: "Special angle values", phrase: "Fingers before ÷ 2 under a root gives sin. Fingers after gives cos.",
          steps: ["Label your fingers 0°, 30°, 45°, 60°, 90°.", "Fold the angle’s finger.", "sin = √(fingers before it) ÷ 2. cos = √(fingers after it) ÷ 2."],
          exception: "This works for those five angles only. For tan, divide sin by cos; tan 90° does not exist.",
          pic: () => P.hand(60),
          gen() {
            const angles = [0, 30, 45, 60, 90];
            const values = ["0", "1/2", "√2/2", "√3/2", "1"];
            const i = R(0, 4);
            const fn = pick(["sin", "cos"]);
            const k = fn === "sin" ? i : 4 - i;
            const ans = values[k];
            return Q(`${fn} ${angles[i]}°`, ans, values.filter((v) => v !== ans),
              `${fn === "sin" ? "Before" : "After"} the ${angles[i]}° finger: ${k}. √${k} ÷ 2 = ${ans}.`, P.hand(angles[i]));
          }
        }),
        L({
          id: "central", name: "Angle at the center", phrase: "The center angle is double the rim angle.",
          also: "Angles on the same arc are equal.",
          steps: ["Check both angles stand on the same arc.", "Center angle = 2 × rim angle.", "Rim angle = center angle ÷ 2."],
          exception: "Both angles must use the same two endpoints on the circle. A different arc gives a different angle.",
          pic: () => P.central("40°", "80°"),
          gen() {
            const x = R(15, 80);
            if (Math.random() < 0.5) {
              return Q(`The rim angle is ${x}°. Find the center angle on the same arc.`, `${2 * x}°`, [deg(x), deg(180 - x), deg(x + 90)], `Double ${x}: ${2 * x}.`, P.central(`${x}°`, "?"));
            }
            return Q(`The center angle is ${2 * x}°. Find the rim angle on the same arc.`, `${x}°`, [deg(2 * x), deg(4 * x), deg(180 - 2 * x)], `Half of ${2 * x}: ${x}.`, P.central("?", `${2 * x}°`));
          }
        }),
        L({
          id: "cyclic", name: "Cyclic quadrilateral", phrase: "Opposite corners in a circle add to 180°.",
          steps: ["Check all four corners sit on the circle.", "Pick a pair of opposite corners.", "180° minus one gives the other."],
          exception: "If a corner is not on the circle, this fails. Next-door corners do not have to add to 180°.",
          pic: () => P.cyclic("70°", "110°"),
          gen() {
            const x = R(50, 130);
            return Q(`A cyclic quadrilateral has an angle of ${x}°. Find the opposite angle.`, `${180 - x}°`, [deg(x), deg(360 - x), deg(Math.abs(90 - x))], `180 − ${x} = ${180 - x}.`, P.cyclic(`${x}°`, "?"));
          }
        }),
        L({
          id: "chord", name: "Chord from the center", phrase: "A line from the center that hits a chord at 90° cuts it in half.",
          steps: ["Drop a perpendicular from the center to the chord.", "It lands on the middle of the chord.", "Radius, center line, and half the chord make a right triangle."],
          exception: "The line must start at the center. A perpendicular from anywhere else does not halve the chord.",
          pic: () => P.chord("r = 5", "3", "4"),
          gen() {
            const [r, d, h] = pick([[5, 3, 4], [13, 5, 12], [10, 6, 8], [17, 8, 15], [25, 7, 24], [15, 9, 12]]);
            return Q(`Radius ${r}. The center is ${d} from the chord. How long is the chord?`, 2 * h, [h, 2 * (r - d), r + d],
              `Half chord: √(${r}² − ${d}²) = ${h}. Double it: ${2 * h}.`, P.chord(`r = ${r}`, d, "?"));
          }
        })
      ]
    },
    {
      id: "g11", grade: "Grades 11–12", title: "Calculus starters", color: "#6D597A",
      blurb: "Derivatives and integrals, each with its one-line move.",
      lessons: [
        L({
          id: "power", name: "Power rule", phrase: "Bring the power down in front, then take one off the power.",
          steps: ["Multiply by the power.", "Lower the power by 1.", "A constant on its own becomes 0."],
          exception: "Products need the product rule. Brackets inside brackets need the chain rule. The derivative of 7 is 0, not 7.",
          pic: () => P.roof("3x⁴", "12x³", "4 comes down, 4 becomes 3"),
          gen() {
            if (Math.random() < 0.15) {
              const k = R(2, 9);
              return Q(`d/dx of ${k}`, "0", [String(k), `${k}x`, "1"], "A constant does not change, so its derivative is 0.");
            }
            const a = R(1, 9), n = R(2, 6);
            const fmt = (c, p) => `${c === 1 && p > 0 ? "" : c}${pow(p)}`;
            return Q(`d/dx of ${fmt(a, n)}`, fmt(a * n, n - 1), [fmt(a, n - 1), fmt(a * n, n), fmt(a * (n + 1), n + 1)], `Bring ${n} down: ${a} × ${n} = ${a * n}. Power ${n} − 1 = ${n - 1}.`);
          }
        }),
        L({
          id: "quotient", name: "Quotient rule", phrase: "Low d-high minus high d-low, over the low squared.",
          steps: ["Low = bottom, high = top, d = derivative of.", "Low × d(high) minus high × d(low).", "Divide by the bottom squared."],
          exception: "Order matters because of the minus: high d-low first gives the wrong sign. If the bottom is a constant, just divide; no quotient rule needed.",
          pic: () => P.formula("low · d(high) − high · d(low)", "low²"),
          gen() {
            const pool = [
              () => Q("For y = top ÷ bottom, what comes first on top?", "bottom × d(top)", ["top × d(bottom)", "d(top) ÷ d(bottom)", "top × bottom"], "Low d-high comes first."),
              () => Q("What goes underneath?", "the bottom, squared", ["the top, squared", "the bottom", "d(bottom)"], "Over the low squared."),
              () => Q("d/dx of x ÷ (x + 1)", "1/(x + 1)²", ["1", "−1/(x + 1)²", "2x/(x + 1)²"], "(x + 1)(1) − x(1) = 1, over (x + 1)²."),
              () => Q("d/dx of 2x ÷ (x + 3)", "6/(x + 3)²", ["−6/(x + 3)²", "2", "2/(x + 3)²"], "(x + 3)(2) − 2x(1) = 6, over (x + 3)².")
            ];
            return pick(pool)();
          }
        }),
        L({
          id: "integral", name: "Integrating powers", phrase: "Raise the power by one, divide by the new power, and add C.",
          steps: ["Add 1 to the power.", "Divide by that new power.", "Add + C for the missing constant."],
          exception: "The rule breaks at x⁻¹, because you would divide by 0. ∫ 1/x dx = ln|x| + C.",
          pic: () => P.roof("∫ x² dx", "x³/3 + C", "power 2 → 3, divide by 3"),
          gen() {
            if (Math.random() < 0.2) {
              return Q("∫ 1/x dx", "ln|x| + C", ["x⁰/0 + C", "−1/x² + C", "1 + C"], "This is the one power the rule cannot do. It gives ln|x| + C.");
            }
            const n = R(1, 5);
            return Q(`∫ ${pow(n)} dx`, `${pow(n + 1)}/${n + 1} + C`, [`${pow(n + 1)}/${n + 1}`, `${n}${pow(n - 1) || ""} + C`, `${pow(n + 1)} + C`],
              `Power ${n} becomes ${n + 1}. Divide by ${n + 1}. Add C.`);
          }
        })
      ]
    }
  ];

  const courseById = (id) => window.COURSES.find((c) => c.id === id);

  /** Kit for the lesson packs in js/more/. */
  window.MK = {
    P, R, pick, gcd, lcm, neg, deg, raw, fr, pow, shuffle, val, Q, TRIPLES,
    /** Append lessons to a course, or insert them after a given lesson id. */
    add(courseId, lessons, afterId) {
      const c = courseById(courseId);
      if (!c) throw new Error(`No course ${courseId}`);
      const at = afterId ? c.lessons.findIndex((l) => l.id === afterId) + 1 : c.lessons.length;
      c.lessons.splice(at || c.lessons.length, 0, ...lessons);
    },
    /** Add a whole course after another course id (or at the end). */
    course(obj, afterId) {
      const at = afterId ? window.COURSES.findIndex((c) => c.id === afterId) + 1 : window.COURSES.length;
      window.COURSES.splice(at || window.COURSES.length, 0, obj);
    },
    /** Add or replace fields on an existing lesson, e.g. worked examples. */
    patch(courseId, lessonId, props) {
      const l = courseById(courseId).lessons.find((x) => x.id === lessonId);
      if (!l) throw new Error(`No lesson ${courseId}/${lessonId}`);
      Object.assign(l, props);
    }
  };
})();
