/** Times tables pack: one mnemonic per table, plus links into the table puzzle. */
(function () {
  if (!window.MK) return;
  const { P, R, Q, course } = window.MK;

  const facts = (n) => Array.from({ length: 12 }, (_, i) => `${i + 1} × ${n} = ${(i + 1) * n}`);

  const near = (a, n) => {
    const ans = a * n;
    return [ans + n, ans - n, ans + a, ans - a, ans + 1, ans - 1, a * (n + 1), a * (n - 1), (a + 1) * n, (a - 1) * n, a + n]
      .filter((x) => Number.isFinite(x) && x > 0 && x !== ans);
  };

  function tablePic(n, hotA) {
    const head = ["×", ...Array.from({ length: 6 }, (_, i) => String(i + 1))];
    const row = [`${n}`, ...Array.from({ length: 6 }, (_, i) => String((i + 1) * n))];
    const hot = hotA != null && hotA >= 1 && hotA <= 6 ? [[0, hotA]] : [];
    return P.table(head, [row], { hot, note: `The ${n} times table` });
  }

  function L(n, o) {
    return {
      id: `t${n}`,
      name: `×${n}`,
      phrase: o.phrase,
      also: facts(n),
      steps: o.steps,
      exception: o.exception,
      pic: o.pic,
      gen() {
        const a = R(1, 12);
        const ans = a * n;
        return Q(`${a} × ${n}`, ans, near(a, n), o.why(a, ans), o.askPic ? o.askPic(a, ans) : "");
      },
      worked: o.worked
    };
  }

  course({
    id: "tables",
    grade: "Tables",
    title: "Times tables 2–12",
    color: "#1B7F5A",
    blurb: "One mnemonic per table, then a puzzle to fill the blanks yourself.",
    cheat: [{
      title: "Table hooks",
      rows: [
        ["×2", "Double it."],
        ["×3", "Double, then add one more group."],
        ["×4", "Double-double."],
        ["×5", "Half of tens; ends in 0 or 5."],
        ["×6", "×5 plus one more group."],
        ["×7", "5, 6, 7, 8 → 56 is 7×8."],
        ["×8", "Double-double-double; 8×8=64."],
        ["×9", "Fold a finger; digits sum to 9."],
        ["×10", "Stick a zero on the end."],
        ["×11", "Write twice, or split and park."],
        ["×12", "×10, then add a double."]
      ]
    }],
    lessons: [
      L(2, {
        phrase: "Times two means double it.",
        steps: [
          "Take the other number.",
          "Add it to itself (or skip-count by 2).",
          "That total is the product."
        ],
        exception: "Doubling is ×2, not ×4. ×4 needs two doubles. And 0 × 2 is still 0.",
        pic: () => P.groups(2, 6),
        why: (a, ans) => `Double ${a}: ${a} + ${a} = ${ans}.`,
        askPic: (a) => P.groups(2, a),
        worked: [
          {
            problem: "7 × 2",
            pic: P.chain(["7", "14"], ["double"]),
            steps: [["Say double", "Times two means double."], ["Add it to itself", "7 + 7 = 14."]],
            answer: "14"
          },
          {
            problem: "12 × 2",
            steps: [["Double", "12 + 12."], ["Total", "12 + 12 = 24."]],
            answer: "24"
          }
        ]
      }),
      L(3, {
        phrase: "Double it, then add one more group.",
        steps: [
          "Double the other number first (that is ×2).",
          "Add one more copy of that number.",
          "Double-plus-one-group is ×3."
        ],
        exception: "Do not stop after the double — that is only ×2. And 3 × 3 is 9, not 6.",
        pic: () => P.chain(["6", "12", "18"], ["double", "+6"]),
        why: (a, ans) => `Double ${a} is ${2 * a}. Add one more ${a}: ${2 * a} + ${a} = ${ans}.`,
        askPic: (a) => P.chain([String(a), String(2 * a), "?"], ["double", `+${a}`]),
        worked: [
          {
            problem: "8 × 3",
            pic: P.chain(["8", "16", "24"], ["double", "+8"]),
            steps: [["Double", "8 + 8 = 16."], ["One more group", "16 + 8 = 24."]],
            answer: "24"
          },
          {
            problem: "5 × 3",
            steps: [["Double", "5 + 5 = 10."], ["One more group", "10 + 5 = 15."]],
            answer: "15"
          }
        ]
      }),
      L(4, {
        phrase: "Times four is double-double.",
        steps: [
          "Double the other number once.",
          "Double that answer again.",
          "Two doubles make ×4."
        ],
        exception: "Count the doubles: one double is ×2, two doubles are ×4, three are ×8. Stopping early gives half the answer.",
        pic: () => P.chain(["7", "14", "28"], ["double", "double"]),
        why: (a, ans) => `Double ${a} → ${2 * a}. Double again → ${ans}.`,
        askPic: (a) => P.chain([String(a), String(2 * a), "?"], ["double", "double"]),
        worked: [
          {
            problem: "9 × 4",
            pic: P.chain(["9", "18", "36"], ["double", "double"]),
            steps: [["First double", "9 → 18."], ["Second double", "18 → 36."]],
            answer: "36"
          },
          {
            problem: "6 × 4",
            steps: [["First double", "6 → 12."], ["Second double", "12 → 24."]],
            answer: "24"
          }
        ]
      }),
      L(5, {
        phrase: "Fives are half of tens — and they end in 0 or 5.",
        steps: [
          "Multiply by 10: stick a zero on the end.",
          "Take half of that tens answer.",
          "Check: even ×5 ends in 0; odd ×5 ends in 5."
        ],
        exception: "If your answer ends in anything other than 0 or 5, it is wrong. Half of the tens product, not half of the other factor alone.",
        pic: () => P.chain(["8 × 10", "80", "40"], ["=", "half"]),
        why: (a, ans) => `${a} × 10 = ${a * 10}. Half of that is ${ans}.`,
        askPic: (a) => P.chain([`${a} × 10`, String(a * 10), "?"], ["=", "half"]),
        worked: [
          {
            problem: "7 × 5",
            pic: P.chain(["7 × 10", "70", "35"], ["=", "half"]),
            steps: [["Tens first", "7 × 10 = 70."], ["Half", "Half of 70 is 35."]],
            answer: "35"
          },
          {
            problem: "12 × 5",
            steps: [["Tens first", "12 × 10 = 120."], ["Half", "Half of 120 is 60."], ["Check ending", "Even ×5 ends in 0: 60."]],
            answer: "60"
          }
        ]
      }),
      L(6, {
        phrase: "Six is five plus one more group.",
        steps: [
          "Find ×5 first (half of tens).",
          "Add one more copy of the other number.",
          "×5 plus one group is ×6."
        ],
        exception: "Do not forget to add the extra group after ×5. And 6 × 6 is 36 (“magic tricks”), not 30.",
        pic: () => P.chain(["7 × 5", "35", "42"], ["=", "+7"]),
        why: (a, ans) => `${a} × 5 = ${a * 5}. Add one more ${a}: ${a * 5} + ${a} = ${ans}.`,
        askPic: (a) => P.chain([`${a} × 5`, String(a * 5), "?"], ["=", `+${a}`]),
        worked: [
          {
            problem: "8 × 6",
            pic: P.chain(["8 × 5", "40", "48"], ["=", "+8"]),
            steps: [["Fives first", "8 × 5 = 40."], ["One more group", "40 + 8 = 48."]],
            answer: "48"
          },
          {
            problem: "6 × 6",
            steps: [["Hook rhyme", "Six times six, magic tricks: thirty-six."], ["Or build it", "6 × 5 = 30, plus 6 = 36."]],
            answer: "36"
          }
        ]
      }),
      L(7, {
        phrase: "Five, six, seven, eight: fifty-six is seven times eight.",
        steps: [
          "Use the famous rhymes for the hard facts (7×7, 7×8).",
          "For other factors, build from a fact you know: 7 × 6 is 7 × 5 plus 7.",
          "Or skip-count by sevens: 7, 14, 21, 28…"
        ],
        exception: "A rhyme is a hook, not the reason. If you forget it, use 7 × 7 = 49 and add or take away sevens. 7 × 0 is 0.",
        pic: () => P.groups(7, 8),
        why: (a, ans) => {
          if (a === 8 || a === 7) {
            return a === 8
              ? "Five, six, seven, eight: fifty-six is seven times eight."
              : "Seven and seven are doing fine: forty-nine.";
          }
          return `Build from sevens: ${a} groups of 7 is ${ans}.`;
        },
        askPic: (a) => (a <= 6 ? P.groups(a, 7) : tablePic(7, Math.min(a, 6))),
        worked: [
          {
            problem: "7 × 8",
            pic: P.groups(7, 8),
            steps: [
              ["Say the rhyme", "Five, six, seven, eight…"],
              ["Finish it", "…fifty-six is seven times eight."]
            ],
            answer: "56"
          },
          {
            problem: "7 × 7",
            steps: [
              ["Rhyme hook", "Seven and seven are doing fine: forty-nine."],
              ["Check", "7 × 5 = 35, plus two more 7s: 35 + 14 = 49."]
            ],
            answer: "49"
          }
        ]
      }),
      L(8, {
        phrase: "Times eight is double-double-double.",
        steps: [
          "Double the other number once (×2).",
          "Double again (×4).",
          "Double one more time (×8)."
        ],
        exception: "Three doubles, not two — stopping at ×4 is half of ×8. Hard square: “I ate and ate and got sick on the floor: eight times eight is sixty-four.”",
        pic: () => P.chain(["6", "12", "24", "48"], ["double", "double", "double"]),
        why: (a, ans) => `Double three times: ${a} → ${2 * a} → ${4 * a} → ${ans}.`,
        askPic: (a) => P.chain([String(a), String(2 * a), String(4 * a), "?"], ["double", "double", "double"]),
        worked: [
          {
            problem: "8 × 8",
            pic: P.chain(["8", "16", "32", "64"], ["double", "double", "double"]),
            steps: [
              ["Rhyme", "I ate and ate and got sick on the floor: eight times eight is sixty-four."],
              ["Or doubles", "8 → 16 → 32 → 64."]
            ],
            answer: "64"
          },
          {
            problem: "5 × 8",
            steps: [["First double", "5 → 10."], ["Second", "10 → 20."], ["Third", "20 → 40."]],
            answer: "40"
          }
        ]
      }),
      L(9, {
        phrase: "Fold the finger. Digits always add to nine.",
        steps: [
          "Hold up ten fingers.",
          "For 9 × n, fold down finger n.",
          "Fingers on the left are tens; fingers on the right are ones. Check: the two digits sum to 9."
        ],
        exception: "Fingers work for 9 × 1 through 9 × 10. For 9 × 11 or 9 × 12, do 10 × that number and subtract it. 9 × 0 is 0.",
        pic: () => P.fingers(7),
        why: (a, ans) => {
          if (a >= 1 && a <= 10) return `Fold finger ${a}: ${a - 1} tens and ${10 - a} ones → ${ans}. Digits ${Math.floor(ans / 10)} + ${ans % 10} = 9.`;
          return `10 × ${a} = ${10 * a}, take away ${a}: ${ans}.`;
        },
        askPic: (a) => (a >= 1 && a <= 10 ? P.fingers(a) : P.chain([`10 × ${a}`, String(10 * a), "?"], ["=", `−${a}`])),
        worked: [
          {
            problem: "9 × 7",
            pic: P.fingers(7),
            steps: [
              ["Fold finger 7", "6 fingers left, 3 right."],
              ["Read it", "63. Check: 6 + 3 = 9."]
            ],
            answer: "63"
          },
          {
            problem: "9 × 12",
            steps: [
              ["Tens first", "10 × 12 = 120."],
              ["Take away one group", "120 − 12 = 108."],
              ["Check digits", "1 + 0 + 8 = 9."]
            ],
            answer: "108"
          }
        ]
      }),
      L(10, {
        phrase: "Times ten: stick a zero on the end.",
        steps: [
          "Write the other number.",
          "Put a zero on the end.",
          "That is the product."
        ],
        exception: "Sticking a zero is ×10, not ×100 (that needs two zeros). And 10 × 0 is 0, not 10.",
        pic: () => P.chain(["7", "70"], ["×10"]),
        why: (a, ans) => `${a} with a zero on the end is ${ans}.`,
        askPic: (a) => P.chain([String(a), "?"], ["×10"]),
        worked: [
          {
            problem: "6 × 10",
            pic: P.chain(["6", "60"], ["×10"]),
            steps: [["Write 6", "Start with 6."], ["Stick a zero", "6 → 60."]],
            answer: "60"
          },
          {
            problem: "12 × 10",
            steps: [["Write 12", "Start with 12."], ["Stick a zero", "12 → 120."]],
            answer: "120"
          }
        ]
      }),
      L(11, {
        phrase: "One digit: write it twice. Two digits: split and park the sum.",
        steps: [
          "For 1–9: write the digit twice (7 × 11 = 77).",
          "For a two-digit number: split the digits, add them, park the sum in the middle.",
          "Example: 23 → 2 and 3, sum 5, park it: 253."
        ],
        exception: "If the middle sum is 10 or more, carry 1 to the left digit. Beyond two digits the same idea needs place-value carrying. 11 × 11 = 121; 11 × 12 = 132.",
        pic: () => P.elevens(23, true),
        why: (a, ans) => {
          if (a <= 9) return `Write ${a} twice: ${ans}.`;
          if (a === 10) return "10 × 11 = 110.";
          const s = Math.floor(a / 10) + (a % 10);
          const lo = Math.floor(a / 10);
          const hi = a % 10;
          if (s < 10) return `Split ${a}: ${lo} and ${hi}. Park ${s} in the middle: ${ans}.`;
          return `Split ${a}: ${lo} + ${hi} = ${s}. Carry: ${ans}.`;
        },
        askPic: (a) => (a >= 10 && a <= 99 ? P.elevens(a) : P.chain([`${a}`, "?"], ["×11"])),
        worked: [
          {
            problem: "7 × 11",
            pic: P.chain(["7", "77"], ["twice"]),
            steps: [["One digit", "Write 7 twice."], ["Read it", "77."]],
            answer: "77"
          },
          {
            problem: "12 × 11",
            pic: P.elevens(12, true),
            steps: [
              ["Split", "12 → 1 and 2."],
              ["Park the sum", "1 + 2 = 3 in the middle: 132."]
            ],
            answer: "132"
          }
        ]
      }),
      L(12, {
        phrase: "Twelve is ten plus two: ×10, then add a double.",
        steps: [
          "Find ×10: stick a zero on the end.",
          "Find ×2: double the other number.",
          "Add those two results."
        ],
        exception: "Add ×10 and ×2 — do not multiply them together. 12 × 12 is 144 (“one forty-four”), not 120 + 12.",
        pic: () => P.chain(["8 × 10", "80", "16", "96"], ["=", "+ double", "="]),
        why: (a, ans) => `${a} × 10 = ${a * 10}, ${a} × 2 = ${2 * a}, sum ${ans}.`,
        askPic: (a) => P.chain([`${a} × 10`, String(a * 10), String(2 * a), "?"], ["=", `+ ${a}×2`, "="]),
        worked: [
          {
            problem: "7 × 12",
            pic: P.chain(["7 × 10", "70", "14", "84"], ["=", "+14", "="]),
            steps: [["×10", "7 × 10 = 70."], ["×2", "7 × 2 = 14."], ["Add", "70 + 14 = 84."]],
            answer: "84"
          },
          {
            problem: "12 × 12",
            steps: [
              ["Hook", "Twelve and twelve walk out the door: one forty-four."],
              ["Or build", "12 × 10 = 120, plus 12 × 2 = 24 → 144."]
            ],
            answer: "144"
          }
        ]
      })
    ]
  }, "g3");
})();
