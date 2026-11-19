/* Mathenomics — es content pack. Generated from docs/i18n/es-{id}.json */
(function () {
  window.I18N_CONTENT = window.I18N_CONTENT || {};
  const root = (window.I18N_CONTENT.es = window.I18N_CONTENT.es || { courses: {} });
  Object.assign(root.courses, {
  "g5": {
    "grade": "Grados 5–6",
    "title": "Fracciones y orden",
    "blurb": "El signo entre las fracciones elige el movimiento.",
    "lessons": {
      "fadd": {
        "name": "Sumar fracciones",
        "phrase": "Mismo denominador, suma los numeradores.",
        "also": "",
        "steps": [
          "Si los denominadores difieren, renombra ambas fracciones hasta que coincidan.",
          "Suma los numeradores.",
          "Conserva el denominador común y simplifica."
        ],
        "exception": "Nunca sumes los denominadores. 1/2 + 1/3 no es 2/5. Medios y tercios pasan a sextos: 3/6 + 2/6 = 5/6.",
        "tag": ""
      },
      "fsub": {
        "name": "Restar fracciones",
        "phrase": "Mismo denominador, quita los numeradores.",
        "also": "",
        "steps": [
          "Haz coincidir los denominadores.",
          "Resta los numeradores.",
          "Conserva el denominador."
        ],
        "exception": "No restes los denominadores. 3/5 − 1/5 es 2/5, no 2/0.",
        "tag": ""
      },
      "fmul": {
        "name": "Multiplicar fracciones",
        "phrase": "En línea recta: numerador×numerador, denominador×denominador.",
        "also": "",
        "steps": [
          "Multiplica los numeradores.",
          "Multiplica los denominadores.",
          "Simplifica."
        ],
        "exception": "Los denominadores no tienen que coincidir para ×. Eso es solo para sumar. 1/2 × 1/2 es 1/4, no 1.",
        "tag": ""
      },
      "fdiv": {
        "name": "Dividir fracciones",
        "phrase": "Conserva, cambia, voltea.",
        "also": "",
        "steps": [
          "Conserva la primera fracción.",
          "Cambia ÷ por ×.",
          "Voltea solo la segunda fracción y multiplica en línea recta."
        ],
        "exception": "Voltea solo la segunda fracción. Voltear la primera, o ambas, da mal. Nunca divides entre cero.",
        "tag": ""
      },
      "pemdas": {
        "name": "Orden de operaciones",
        "phrase": "Please Excuse My Dear Aunt Sally (PEMDAS).",
        "also": "",
        "steps": [
          "Primero paréntesis y agrupación.",
          "Luego potencias.",
          "Luego × y ÷, de izquierda a derecha.",
          "Luego + y −, de izquierda a derecha."
        ],
        "exception": "× y ÷ empatan: ve de izquierda a derecha: 8 ÷ 2 × 4 = 16, no 1. Lo mismo con + y −.",
        "tag": ""
      },
      "ndd": {
        "name": "Fracción a decimal",
        "phrase": "N.D.D.: Numerador Dividido por Denominador.",
        "also": "",
        "steps": [
          "El numerador va dentro de la «casita» de división.",
          "Divídelo entre el denominador.",
          "Añade punto decimal y ceros según hagan falta."
        ],
        "exception": "No dividas denominador entre numerador: eso da la fracción volteada. 3/4 es 0,75, no 1,33.",
        "tag": ""
      },
      "decadd": {
        "name": "Sumar y restar decimales",
        "phrase": "Alinea los puntos.",
        "also": "Los huecos llevan cero. Luego suma o resta como enteros y baja el punto.",
        "steps": [
          "Escribe los números en columna con los puntos en una línea.",
          "Rellena huecos con ceros. Un entero lleva punto al final: 7 = 7,00.",
          "Suma o resta columna por columna.",
          "Baja el punto recto."
        ],
        "exception": "No alinees solo la última cifra: 2,45 + 1,3 es 3,75, no 2,58. Solo para + y −. En × no alineas puntos.",
        "tag": ""
      },
      "decmul": {
        "name": "Multiplicar decimales",
        "phrase": "Ignora los puntos, multiplica, luego cuenta lugares.",
        "also": "Cuenta las cifras tras el punto en ambos números. La respuesta lleva esa cantidad.",
        "steps": [
          "Quita los puntos y multiplica los enteros.",
          "Cuenta las cifras tras el punto en cada número y súmalas.",
          "Desde la derecha, pon el punto en esa cantidad de lugares."
        ],
        "exception": "No alinees puntos en ×: eso es solo + y −. Cuenta antes de acomodar: 0,5 × 0,4 = 0,20 = 0,2, no 0,02.",
        "tag": ""
      },
      "decdiv": {
        "name": "Dividir entre un decimal",
        "phrase": "Haz entero el divisor: mueve ambos puntos la misma cantidad.",
        "also": "Luego divide normal. El punto de la respuesta va encima del del dividendo.",
        "steps": [
          "Mueve el punto del divisor a la derecha hasta que sea entero.",
          "Mueve el del otro número la misma cantidad. Añade ceros si faltan cifras.",
          "Divide como siempre."
        ],
        "exception": "Ambos puntos deben moverse igual o cambia la respuesta. Si solo el dividendo tiene punto, no muevas: divide y coloca el punto arriba.",
        "tag": ""
      },
      "mixed": {
        "name": "Números mixtos y fracciones impropias",
        "phrase": "Cara Enojada (MAD): Multiplica, suma, el Denominador queda.",
        "also": "De vuelta: divide. El cociente son los enteros, el resto arriba, el denominador igual.",
        "steps": [
          "Multiplica el entero por el denominador.",
          "Suma el numerador.",
          "Conserva el mismo denominador.",
          "De vuelta: numerador ÷ denominador da enteros y el resto va arriba."
        ],
        "exception": "El denominador no cambia: 2 3/4 es 11/4, no 11/8. Multiplica el entero por el de abajo, no por el de arriba.",
        "tag": ""
      },
      "lcmgcf": {
        "name": "MCM y MCD (MCD)",
        "phrase": "Sube la escalera. El lado izquierdo es el MCD. Multiplica la L grande para el MCM.",
        "also": "MCD (HCF): el mayor que divide a ambos. MCM: el menor múltiplo común.",
        "steps": [
          "Escribe los dos números lado a lado.",
          "Divide ambos por un primo que los divide. Escribe abajo.",
          "Para cuando ninguno común quede.",
          "MCD: multiplica el lado izquierdo. MCM: multiplica la L, lado izquierdo y fila de abajo."
        ],
        "exception": "El MCD no puede ser mayor que el menor número, ni el MCM menor que el mayor. Si no hay común, MCD=1 y MCM es el producto.",
        "tag": ""
      },
      "ratio": {
        "name": "Razones y tasas unitarias",
        "phrase": "Halla la tasa de uno y ya terminaste.",
        "also": "Divide para obtener la cantidad de 1. Multiplica para cualquier cantidad.",
        "steps": [
          "Escribe lo que sabes: 12 dólares por 4 bolígrafos.",
          "Divide para la tasa unitaria: 12 ÷ 4 = 3 dólares por bolígrafo.",
          "Multiplica por cuántos quieras."
        ],
        "exception": "Conserva el orden del enunciado: 3 gatos a 5 perros es 3 : 5, no 5 : 3. No sumes la diferencia: 2 bolígrafos a $6, 4 cuestan $12, no $8. Para la mejor compra, compara precio por uno.",
        "tag": ""
      },
      "mmmr": {
        "name": "Media, mediana, moda, rango",
        "phrase": "La mediana es el del medio; la media es sumar y dividir. La moda es la que más ves; el rango es la diferencia entre extremos.",
        "also": "",
        "steps": [
          "Media: súmalos todos y divide entre cuántos hay.",
          "Mediana: ordénalos y encuentra el centro.",
          "Moda: el número que más se repite.",
          "Rango: máximo − mínimo."
        ],
        "exception": "Ordena antes de la mediana. Con cantidad par, la mediana está entre los dos del medio. Puede no haber moda, o varias.",
        "tag": ""
      },
      "expo": {
        "name": "Exponentes",
        "phrase": "El exponente dice cuántas veces aparece la base.",
        "also": "En 2⁴, 2 es la base y 4 el exponente: 2 × 2 × 2 × 2.",
        "steps": [
          "El número grande es la base.",
          "El número pequeño arriba es el exponente.",
          "Escribe la base tantas veces con × entre ellas y multiplica."
        ],
        "exception": "No es base × exponente: 2³ es 2 × 2 × 2 = 8, no 6. Cualquier número a la 1 es él mismo; (salvo 0) a la 0 es 1.",
        "tag": ""
      },
      "triarea": {
        "name": "Área de triángulos y paralelogramos",
        "phrase": "Un triángulo es media caja: base × altura ÷ 2.",
        "also": "Un paralelogramo es caja inclinada: base × altura, sin partir.",
        "steps": [
          "Halla la base.",
          "Halla la altura: la línea recta perpendicular a la base.",
          "Triángulo: base × altura ÷ 2.",
          "Paralelogramo: base × altura."
        ],
        "exception": "Usa la altura vertical, no el lado inclinado. Solo el triángulo se parte a la mitad.",
        "tag": ""
      },
      "volume": {
        "name": "Volumen de una caja",
        "phrase": "Cubre el piso, luego apila pisos: largo × ancho × alto.",
        "also": "",
        "steps": [
          "Piso: largo × ancho dice cuántos cubos cubren abajo.",
          "Apila: multiplica por la altura.",
          "El volumen va en unidades cúbicas, como cm³."
        ],
        "exception": "No sumes los tres lados: 2×3×4 caben 24 cubos, no 9. Volumen (interior) no es área de superficie (envoltorio).",
        "tag": ""
      },
      "coords": {
        "name": "Plano cartesiano",
        "phrase": "Por el pasillo, sube la escalera.",
        "also": "(x, y): x primero, como en el abecedario.",
        "steps": [
          "Empieza en (0, 0), donde se cruzan las rectas.",
          "Primer número: camina por el eje x.",
          "Segundo número: sube por y."
        ],
        "exception": "El orden importa: (2, 5) y (5, 2) son distintos. Siempre horizontal antes que vertical. Negativos: izquierda o abajo.",
        "tag": ""
      },
      "gems-order": {
        "name": "Orden GEMS",
        "phrase": "GEMS: Grouping, Exponents, Multiply/Divide, Subtract/Add.",
        "also": "× con ÷, − con + — izquierda a derecha en cada par.",
        "steps": [
          "Primero símbolos de agrupación: ( ), [ ], { }, barras de fracción, | |.",
          "Luego exponentes (y raíces).",
          "Luego × y ÷ juntos, izquierda a derecha.",
          "Luego + y − juntos, izquierda a derecha."
        ],
        "exception": "En Multiply/Divide y en Subtract/Add sigue izquierda a derecha. Agrupación incluye ( ), [ ], { }, barras y | |.",
        "tag": ""
      },
      "kcf": {
        "name": "Kentucky Chicken Fried (KCF)",
        "phrase": "KCF: Keep, Change, Flip — Conserva, Cambia, Voltea.",
        "also": "Conserva la primera fracción, cambia ÷ por ×, voltea la segunda.",
        "steps": [
          "Conserva la primera fracción.",
          "Cambia ÷ en ×.",
          "Voltea la segunda fracción (recíproco).",
          "Multiplica en línea recta."
        ],
        "exception": "No voltees la primera. Cancela factores comunes después del volteo, no antes de cambiar el signo.",
        "tag": ""
      },
      "bodmas": {
        "name": "BODMAS / BIDMAS",
        "phrase": "BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction.",
        "also": "Mismo orden que PEMDAS — ×÷ y +− empatan izquierda a derecha.",
        "steps": [
          "Primero corchetes/paréntesis.",
          "Orders (potencias).",
          "÷ y × de izquierda a derecha.",
          "+ y − de izquierda a derecha."
        ],
        "exception": "La división no va «antes» que la multiplicación — comparten nivel.",
        "tag": ""
      },
      "kinghenry5": {
        "name": "Saltos en la escalera métrica",
        "phrase": "King Henry Died By Drinking Chocolate Milk — mueve el punto decimal.",
        "also": "",
        "steps": [
          "Encuentra prefijos de inicio y fin.",
          "Cuenta saltos en la escalera de King Henry.",
          "Mueve el decimal un lugar por salto."
        ],
        "exception": "«By» es la unidad base. Mega/micro/nano quedan fuera de esta escalera. Hacia milli más piezas pequeñas; hacia kilo, menos.",
        "tag": ""
      },
      "gallon5": {
        "name": "Capacidad customary (EE. UU.)",
        "phrase": "Gallon Man: 4 quart, 2 pint cada uno, 2 cups cada uno — 16 cups en un galón.",
        "also": "",
        "steps": [
          "Dibuja a Gallon Man.",
          "Convierte con 4, 2 y 2.",
          "Multiplica saltos al ir a unidades más pequeñas."
        ],
        "exception": "Pint y cup son customary de EE. UU.; el pint del Reino Unido difiere.",
        "tag": ""
      },
      "commute5": {
        "name": "Repaso de propiedades",
        "phrase": "Commute (voltea), associate (reagrupa), distribute (reparte a cada uno).",
        "also": "",
        "steps": [
          "Nombra la propiedad.",
          "Reescribe volteando, reagrupando o distribuyendo.",
          "Calcula por el camino fácil."
        ],
        "exception": "Son para + y × (distribuir mezcla × sobre +). No para − sola.",
        "tag": ""
      },
      "wordkeys5": {
        "name": "Palabras clave de operaciones",
        "phrase": "En total suma, queda resta, cada una multiplica, reparte divide.",
        "also": "",
        "steps": [
          "Encuentra la palabra clave.",
          "Tradúcela a +, −, × o ÷.",
          "Resuelve y comprueba con el cuento."
        ],
        "exception": "Historias de varios pasos pueden necesitar dos palabras clave.",
        "tag": ""
      },
      "estimate5": {
        "name": "Estimar con decimales",
        "phrase": "Redondea a enteros, calcula — más o menos.",
        "also": "",
        "steps": [
          "Redondea cada decimal a un entero cercano.",
          "Suma, resta o multiplica los enteros.",
          "Llámalo una estimación."
        ],
        "exception": "Con dinero, a veces redondea a centavos, no a enteros.",
        "tag": ""
      },
      "benchmark": {
        "name": "Referencias de fracciones",
        "phrase": "Compara con 0, 1/2 y 1 — las referencias amigas.",
        "also": "",
        "steps": [
          "Pregunta: ¿menor que 1/2, cerca de 1/2 o mayor?",
          "Usa referencias para comparar dos fracciones.",
          "Confirma con denominadores comunes si hace falta."
        ],
        "exception": "Las referencias dan idea rápida; el desempate aún requiere comparación exacta.",
        "tag": ""
      },
      "recip5": {
        "name": "Recíprocos",
        "phrase": "El recíproco voltea la fracción — el producto es 1.",
        "also": "",
        "steps": [
          "Voltea numerador y denominador.",
          "Comprueba: original × volteada = 1.",
          "El entero n tiene recíproco 1/n."
        ],
        "exception": "Cero no tiene recíproco. No voltees solo una parte del mixto — convierte primero.",
        "tag": ""
      },
      "cancel5": {
        "name": "Simplificar antes de multiplicar",
        "phrase": "Cancela factores comunes entre numeradores y denominadores antes de multiplicar.",
        "also": "",
        "steps": [
          "Escribe el producto de fracciones.",
          "Busca un factor común entre cualquier numerador y denominador.",
          "Divídelo y luego multiplica lo que queda."
        ],
        "exception": "Solo cancela numerador con denominador — nunca dos numeradores juntos.",
        "tag": ""
      },
      "butterfly5": {
        "name": "Comparar con mariposa",
        "phrase": "Para comparar fracciones, multiplica en cruz — alas de mariposa.",
        "also": "",
        "steps": [
          "Escribe las dos fracciones.",
          "Multiplica en cruz ambas diagonales.",
          "La ala mayor queda bajo la fracción mayor."
        ],
        "exception": "La mariposa pide positivos. Si son iguales, las alas coinciden.",
        "tag": ""
      },
      "madface5": {
        "name": "Recordatorio cara Enojada (MAD)",
        "phrase": "MAD: Multiplica, suma, Denominador queda — mixto → impropia.",
        "also": "",
        "steps": [
          "Multiplica entero × denominador.",
          "Suma el numerador.",
          "Conserva el mismo denominador."
        ],
        "exception": "De impropia a mixta es dividir, no MAD. MAD solo es mixto a impropia.",
        "tag": ""
      },
      "mental5": {
        "name": "Referencias mentales de porcentaje",
        "phrase": "10% es ÷10. 50% es la mitad. 25% es un cuarto.",
        "also": "",
        "steps": [
          "Memoriza 10%, 25%, 50%, 75% como anclas.",
          "Arma otros desde trozos del 10%.",
          "Comprueba: porcentaje significa /100."
        ],
        "exception": "5% es mitad del 10%, no mitad del 50%.",
        "tag": ""
      },
      "leftright5": {
        "name": "Empates de izquierda a derecha",
        "phrase": "Cuando × y ÷ comparten nivel, camina de izquierda a derecha — no saltes.",
        "also": "",
        "steps": [
          "Busca una racha de ×/÷ sin paréntesis.",
          "Haz primero la operación más a la izquierda.",
          "Luego la siguiente."
        ],
        "exception": "Paréntesis y potencias van antes. Solo rachas puras de ×÷ (o +−) usan izquierda a derecha.",
        "tag": ""
      },
      "simplify5": {
        "name": "Simplificar fracciones",
        "phrase": "Divide arriba y abajo por el mismo factor — lo que hagas arriba, haz abajo.",
        "also": "",
        "steps": [
          "Encuentra un factor común de numerador y denominador.",
          "Divide ambos entre él.",
          "Repite hasta que solo 1 sea común."
        ],
        "exception": "Debes dividir ambos. Dividir solo arriba cambia el valor.",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Fracciones",
        "rows": [
          [
            "Sumar / restar",
            "Mismo denominador, suma (o quita) numeradores"
          ],
          [
            "Multiplicar",
            "En línea: num×num, den×den"
          ],
          [
            "Dividir (KCF)",
            "Keep, Change, Flip"
          ],
          [
            "Equivalentes",
            "Lo que hagas arriba, haz abajo"
          ],
          [
            "Cara MAD",
            "Mixto → impropia: Multiplica, suma, denom. igual"
          ],
          [
            "N.D.D.",
            "Numerador ÷ denominador → decimal"
          ],
          [
            "Simplificar",
            "Divide arriba y abajo por el mismo MCD"
          ],
          [
            "Recíproco",
            "Voltea la fracción para dividir"
          ]
        ]
      },
      {
        "title": "Orden y decimales",
        "rows": [
          [
            "PEMDAS / BODMAS",
            "Grupos primero, luego ×÷, luego +−"
          ],
          [
            "Orden GEMS",
            "Group, Exponent, Multiply/Divide, Subtract/Add"
          ],
          [
            "Alinea los puntos",
            "Sumar/restar decimales"
          ],
          [
            "× decimales",
            "Ignora puntos, multiplica, cuenta lugares"
          ],
          [
            "÷ entre decimal",
            "Mueve ambos puntos hasta divisor entero"
          ],
          [
            "×10 / 100 / 1000",
            "Cada cero deslaza una cifra"
          ],
          [
            "Fracciones referencia",
            "½, ¼, ¾ comparadas con 1"
          ],
          [
            "King Henry",
            "Escalera kilo→milli; «By» = base; mueve el punto"
          ]
        ]
      },
      {
        "title": "Razón, estadística y figuras",
        "rows": [
          [
            "Tasa unitaria",
            "Halla la tasa de uno y listo"
          ],
          [
            "Escalera MCM / MCD",
            "Izquierda = MCD; L grande × = MCM"
          ],
          [
            "Media / mediana / moda / rango",
            "Suma÷n; centro; más frecuente; máx−mín"
          ],
          [
            "Mariposa (proporción)",
            "Multiplica en cruz solo si dos razones son iguales"
          ],
          [
            "Área triángulo",
            "½ × base × altura"
          ],
          [
            "Volumen caja",
            "l × a × h (piso, luego apila)"
          ],
          [
            "Coordenadas",
            "Por el pasillo, sube la escalera"
          ]
        ]
      },
      {
        "title": "Exponentes y atajos",
        "rows": [
          [
            "Exponentes",
            "Multiplicación repetida: 2³ = 2×2×2"
          ],
          [
            "Izq. a der. ×÷",
            "Mismo nivel, de izquierda a derecha"
          ],
          [
            "Simplifica antes de ×",
            "Reduce fracciones antes de multiplicar"
          ],
          [
            "× mental",
            "Parte: 48×5 = 48×10 ÷ 2"
          ]
        ]
      }
    ]
  },
  "g7": {
    "grade": "Grado 7",
    "title": "Enteros y porcentaje",
    "blurb": "Números positivos y negativos, y todo lo que es «de cada cien».",
    "lessons": {
      "signs": {
        "name": "Multiplicar signos",
        "phrase": "Amigos dan positivo. Desconocidos dan negativo.",
        "also": "Mismos signos dan +. Distintos dan −.",
        "steps": [
          "Ignora los signos y multiplica.",
          "Mismos signos (amigos): respuesta positiva.",
          "Distintos (desconocidos): respuesta negativa."
        ],
        "exception": "Solo para × y ÷. Sumar es distinto: −3 + −4 es −7, no +7. Cualquier cosa × 0 es 0, sin signo.",
        "tag": ""
      },
      "intadd": {
        "name": "Sumar enteros",
        "phrase": "Mismos signos: suma y conserva. Distintos: resta y conserva el signo del mayor.",
        "also": "",
        "steps": [
          "Mira los dos signos.",
          "Iguales: suma magnitudes, conserva el signo.",
          "Distintos: resta la menor de la mayor y conserva el signo de la mayor."
        ],
        "exception": "No uses la regla de amigos aquí. −3 + −4 es −7, porque dos deudas hacen una deuda mayor.",
        "tag": ""
      },
      "percent": {
        "name": "Porcentaje de un número",
        "phrase": "Por ciento significa de cada 100. Mueve el punto dos lugares y multiplica.",
        "also": "",
        "steps": [
          "Escribe el porcentaje de 100: 25% es 0,25.",
          "Multiplica por la cantidad.",
          "En un cambio, compara siempre con el valor inicial."
        ],
        "exception": "10% del 10% es 1%, no 20%. Más de 100% vale: 150% de 40 es 60.",
        "tag": ""
      },
      "intsub": {
        "name": "Restar enteros",
        "phrase": "Keep, Change, Change (Conserva, Cambia, Cambia).",
        "also": "Restar un número es sumar su opuesto.",
        "steps": [
          "Conserva el primer número.",
          "Cambia − por +.",
          "Cambia el signo del segundo.",
          "Suma con las reglas de suma."
        ],
        "exception": "Cambia las dos cosas: el signo del medio y el segundo número. Nunca cambies el primero. No lo mezcles con Keep, Change, Flip de fracciones.",
        "tag": ""
      },
      "intdiv": {
        "name": "Dividir enteros",
        "phrase": "Divide magnitudes. Mismos signos, positivo. Distintos, negativo.",
        "also": "La misma regla de signos que en ×.",
        "steps": [
          "Ignora signos y divide.",
          "Mismos signos: positivo.",
          "Distintos: negativo."
        ],
        "exception": "Nunca divides entre 0. 0 entre cualquier otro es 0, sin signo. Dos negativos dan positivo solo en × y ÷, no en + o −.",
        "tag": ""
      },
      "equations": {
        "name": "Resolver ecuaciones",
        "phrase": "Haz lo contrario en ambos lados.",
        "also": "Deshaz en orden inverso: + y − primero, luego × y ÷.",
        "steps": [
          "Mira qué le hacen a x.",
          "Deshaz + o − primero: lo contrario en ambos lados.",
          "Luego deshaz × o ÷ igual.",
          "Comprueba: sustituye tu respuesta."
        ],
        "exception": "Lo que hagas a un lado, hazlo al otro o dejan de ser iguales. Deshaz +/− antes que ×: en 3x + 4 = 19, no dividas 19 entre 3 primero.",
        "tag": ""
      },
      "circle": {
        "name": "Circunferencia y área del círculo",
        "phrase": "Cherry pie’s delicious: C = πd. Apple pies are too: A = πr².",
        "also": "El diámetro va de lado a lado. El radio es la mitad: d = 2 × r.",
        "steps": [
          "Halla r o d. d = 2 × r.",
          "Alrededor (circunferencia): C = π × d.",
          "Dentro (área): A = π × r × r.",
          "Usa π ≈ 3,14."
        ],
        "exception": "El área usa el radio, no el diámetro. Si dan d, divídelo entre dos primero. r² es r × r, no r × 2.",
        "tag": ""
      },
      "interest": {
        "name": "Interés simple",
        "phrase": "I = PRT: Interés = Principal × Tasa × Tiempo.",
        "also": "Principal: dinero inicial. Tasa: porcentaje por año. Tiempo en años.",
        "steps": [
          "Escribe la tasa como decimal: 5% = 0,05.",
          "Escribe el tiempo en años: 6 meses = 0,5.",
          "Multiplica P × R × T.",
          "Para el total, suma el interés al principal."
        ],
        "exception": "Tasa como decimal, no entero: 5% es 0,05, no 5. El interés simple es igual cada año; no crece sobre sí mismo (eso es compuesto).",
        "tag": ""
      },
      "pchange": {
        "name": "Aumento y disminución porcentual",
        "phrase": "Nuevo menos viejo, entre viejo, por 100.",
        "also": "",
        "steps": [
          "Halla el cambio: nuevo − viejo.",
          "Divide entre el viejo (inicial).",
          "Multiplica por 100. Positivo es aumento, negativo disminución."
        ],
        "exception": "Siempre divide entre el viejo, no el nuevo. Subir 50% y bajar 50% no te devuelve: 100 → 150 → 75.",
        "tag": ""
      },
      "discount": {
        "name": "Descuento e impuesto",
        "phrase": "¿Oferta? Quítalo. ¿Impuesto? Ponlo encima.",
        "also": "20% off pagas 80%. 5% de impuesto pagas 105%.",
        "steps": [
          "Halla el porcentaje del precio.",
          "Descuento: réstalo del precio.",
          "Impuesto: súmalo.",
          "Ambos: descuento primero, impuesto sobre el precio nuevo."
        ],
        "exception": "El impuesto va sobre el precio de oferta, no el antiguo. 20% off y 5% tax no es 15% off.",
        "tag": ""
      },
      "prob": {
        "name": "Probabilidad",
        "phrase": "Lo que quieres, sobre todo lo que tienes.",
        "also": "P(evento) = casos favorables ÷ casos totales.",
        "steps": [
          "Cuenta los casos que quieres (favorables).",
          "Cuenta todos los posibles.",
          "Escribe quiero ÷ total y simplifica."
        ],
        "exception": "El total incluye los favorables. Con 3 rojos y 5 azules, P(rojo) es 3/8, no 3/5. Probabilidad entre 0 (imposible) y 1 (seguro).",
        "tag": ""
      },
      "proportion": {
        "name": "Proporciones",
        "phrase": "Multiplica en cruz: método mariposa.",
        "also": "Multiplica cada diagonal. Las dos alas son iguales. Luego divide junto a x.",
        "steps": [
          "Monta dos fracciones iguales con el mismo orden en ambos lados.",
          "Multiplica en cruz: alas de mariposa.",
          "Iguala las alas y divide para hallar x."
        ],
        "exception": "Solo multiplica en cruz cuando dos fracciones son iguales. Nunca para sumar fracciones. Mismo orden: millas sobre horas = millas sobre horas.",
        "tag": ""
      },
      "dirt-distance": {
        "name": "Distancia = rapidez × tiempo",
        "phrase": "d = rt — dirt.",
        "also": "Distancia, rapidez y tiempo comparten un triángulo de fórmulas.",
        "steps": [
          "Escribe d = rt.",
          "Sustituye lo conocido.",
          "Resuelve lo desconocido.",
          "Comprueba que las unidades coincidan."
        ],
        "exception": "Las unidades deben coincidir. Rapidez media ≠ rapidez instantánea.",
        "tag": ""
      },
      "speed-triangle": {
        "name": "Cubrir D–R–T",
        "phrase": "Distancia = rapidez × tiempo; tapa la incógnita en D–R–T.",
        "also": "",
        "steps": [
          "Identifica cuál de D, R, T necesitas.",
          "Tapa esa letra: las otras dos muestran × o ÷.",
          "Usa D = RT, R = D ÷ T o T = D ÷ R.",
          "Comprueba unidades."
        ],
        "exception": "Unidades coherentes. Rapidez media es distancia total ÷ tiempo total — no el promedio de rapideces.",
        "tag": ""
      },
      "scalene-odd-one": {
        "name": "Triángulos escalenos",
        "phrase": "Escaleno es el raro: sin lados iguales.",
        "also": "Equilátero: todos iguales. Isósceles: al menos dos iguales.",
        "steps": [
          "Compara las tres longitudes.",
          "Ningún par igual → escaleno.",
          "Dos iguales → isósceles; tres → equilátero."
        ],
        "exception": "Nombres de lados ≠ nombres de ángulos. Un escaleno puede ser agudo, recto u obtuso.",
        "tag": ""
      },
      "kcc": {
        "name": "Keep Change Change",
        "phrase": "KCC: conserva el primero, cambia − por +, cambia el signo del siguiente.",
        "also": "Restar un negativo es sumar: a − (−b) = a + b.",
        "steps": [
          "Conserva el primer número.",
          "Cambia la resta en suma.",
          "Cambia el signo del segundo.",
          "Luego suma enteros."
        ],
        "exception": "KCC es para resta de enteros. No KCC en una multiplicación.",
        "tag": ""
      },
      "arithspell": {
        "name": "Deletrear arithmetic",
        "phrase": "A Rat In The House May Eat The Ice Cream.",
        "also": "A-R-I-T-H-M-E-T-I-C.",
        "steps": [
          "Usa las iniciales de la oración.",
          "Escribe A R I T H M E T I C.",
          "Eso es «arithmetic»."
        ],
        "exception": "Es gancho de deletreo — no un método de cálculo.",
        "tag": ""
      },
      "commute7": {
        "name": "Propiedades con enteros",
        "phrase": "Voltear y reagrupar sigue valiendo con negativos en + y ×.",
        "also": "",
        "steps": [
          "Conmutativa: el orden puede voltearse en + y ×.",
          "Asociativa: reagrupa + o ×.",
          "Cuida signos al distribuir."
        ],
        "exception": "La resta no es conmutativa aunque uses KCC — primero reescribe como suma del opuesto.",
        "tag": ""
      },
      "distrib7": {
        "name": "Distribuir con signos",
        "phrase": "Reparte el factor de afuera — con su signo — a cada término.",
        "also": "",
        "steps": [
          "Escribe a(b + c) como ab + ac.",
          "Si afuera es negativo, cada término cambia de signo.",
          "Simplifica."
        ],
        "exception": "−(x − 3) = −x + 3, no −x − 3.",
        "tag": ""
      },
      "wordkeys7": {
        "name": "Pistas de palabras con enteros",
        "phrase": "En total sigue sumando; queda sigue restando — ahora los signos pueden ser negativos.",
        "also": "",
        "steps": [
          "Traduce palabras clave a operaciones.",
          "Pon signos del cuento (deuda, abajo, pérdida).",
          "Calcula con reglas de enteros."
        ],
        "exception": "«Más que» en la recta puede ser movimiento positivo aunque empezaras negativo.",
        "tag": ""
      },
      "estimate7": {
        "name": "Estimar porcentajes",
        "phrase": "Redondea la cantidad, usa un porcentaje amigo y ajusta.",
        "also": "",
        "steps": [
          "Redondea el número base.",
          "Toma 10% o 50% como ancla.",
          "Escala al porcentaje que necesitas."
        ],
        "exception": "Para propinas/impuestos basta estimar; interés bancario pide exacto.",
        "tag": ""
      },
      "absval": {
        "name": "Valor absoluto",
        "phrase": "Valor absoluto es distancia a cero — siempre positivo (o cero).",
        "also": "",
        "steps": [
          "Mira qué tan lejos está del 0.",
          "Quita el signo.",
          "Escribe |n| para esa distancia."
        ],
        "exception": "|−3| = 3, pero eso no hace −3 positivo en toda ecuación — importa el contexto.",
        "tag": ""
      },
      "unitrate7": {
        "name": "Tasa unitaria",
        "phrase": "Halla la tasa de uno y ya terminaste.",
        "also": "",
        "steps": [
          "Divide total entre la cantidad.",
          "Etiqueta «por uno».",
          "Multiplica la tasa unitaria para más."
        ],
        "exception": "Unidades coherentes: millas por hora, no mezclar millas por minuto.",
        "tag": ""
      },
      "cross7": {
        "name": "Resolver con multiplicación en cruz",
        "phrase": "Mariposa: multiplica en cruz, divide para liberar x.",
        "also": "",
        "steps": [
          "Monta razones iguales.",
          "Multiplica en cruz.",
          "Divide entre el coeficiente de x."
        ],
        "exception": "Solo cuando dos razones son iguales — no para sumar fracciones.",
        "tag": ""
      },
      "scale7": {
        "name": "Factor de escala",
        "phrase": "Nuevo = viejo × escala. Escala >1 crece; entre 0 y 1 encoge.",
        "also": "",
        "steps": [
          "Identifica el factor k.",
          "Multiplica cada longitud por k.",
          "Las áreas escalan por k² (¡cuidado!)."
        ],
        "exception": "Escala 2 duplica longitudes, pero el área queda ×4.",
        "tag": ""
      },
      "opposites7": {
        "name": "Inversos aditivos",
        "phrase": "Un número más su opuesto da cero.",
        "also": "",
        "steps": [
          "Halla el opuesto (cambia el signo).",
          "Súmalos.",
          "La suma es 0."
        ],
        "exception": "El opuesto de 0 es 0. Opuesto no es lo mismo que recíproco.",
        "tag": ""
      },
      "taxest7": {
        "name": "Impuesto y propina mental",
        "phrase": "10% mueve el punto; 20% es el doble; 15% es 10% + mitad del 10%.",
        "also": "",
        "steps": [
          "Halla 10% moviendo el punto una a la izquierda.",
          "Arma 5%, 15%, 20% desde ahí.",
          "Suma a la cuenta para propina/impuesto."
        ],
        "exception": "Tasas exactas pueden ser 6,25% — estima primero, luego calcula si hace falta.",
        "tag": ""
      },
      "orderint7": {
        "name": "Orden con negativos",
        "phrase": "En la recta, más a la izquierda es menor — aunque los dígitos parezcan mayores.",
        "also": "",
        "steps": [
          "Imagina la recta numérica.",
          "Más a la izquierda = menor.",
          "−10 es menor que −2."
        ],
        "exception": "|−10| > |−2|, pero −10 < −2.",
        "tag": ""
      },
      "convert7": {
        "name": "Fracción–decimal–porcentaje",
        "phrase": "Porcentaje son centésimas; mueve el punto dos lugares.",
        "also": "",
        "steps": [
          "Fracción → divide arriba entre abajo.",
          "Decimal → porcentaje: ×100 (dos saltos).",
          "Porcentaje → decimal: ÷100."
        ],
        "exception": "1/3 es 0,333… repetido — porcentaje ≈ 33,3%, no decimal exacto que termine.",
        "tag": ""
      },
      "mental7": {
        "name": "Cadenas mentales de enteros",
        "phrase": "Saltos fáciles en la recta: +10, −10, luego lo que sobra.",
        "also": "",
        "steps": [
          "Parte el segundo número en saltos amigos.",
          "Muévete en la recta.",
          "Llega a la respuesta."
        ],
        "exception": "No inviertas la dirección del salto si los signos se enredan — con resta usa KCC primero.",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Enteros",
        "rows": [
          [
            "× / ÷ signos",
            "Amigos (+): positivo; desconocidos (−): negativo"
          ],
          [
            "Sumar enteros",
            "Iguales: suma y conserva; distintos: resta, signo del mayor"
          ],
          [
            "Restar (KCC)",
            "Keep, Change, Change"
          ],
          [
            "÷ enteros",
            "Mismas reglas de signo que ×"
          ],
          [
            "Resolver ecuaciones",
            "Haz lo contrario en ambos lados"
          ],
          [
            "Valor absoluto",
            "|−5| = 5 — distancia a cero"
          ],
          [
            "Orden con negativos",
            "Más a la izquierda en la recta es menor"
          ]
        ]
      },
      {
        "title": "Porcentaje y dinero",
        "rows": [
          [
            "Porcentaje de",
            "Mueve el punto dos lugares y multiplica"
          ],
          [
            "% cambio",
            "(nuevo − viejo) ÷ viejo × 100"
          ],
          [
            "Oferta / descuento",
            "Quita el porcentaje del precio"
          ],
          [
            "Impuesto / propina",
            "Suma el porcentaje encima"
          ],
          [
            "I = PRT",
            "Interés simple: P × tasa × tiempo (tasa decimal)"
          ],
          [
            "Tasa unitaria",
            "Divide para precio por un artículo"
          ]
        ]
      },
      {
        "title": "Azar y círculo",
        "rows": [
          [
            "Probabilidad",
            "Lo que quieres ÷ todo lo que tienes"
          ],
          [
            "Proporciones",
            "Multiplica en cruz (mariposa)"
          ],
          [
            "Escala",
            "Distancia mapa × escala = distancia real"
          ],
          [
            "Cherry pie",
            "C = πd"
          ],
          [
            "Apple pies",
            "A = πr²"
          ]
        ]
      },
      {
        "title": "Distancia y atajos",
        "rows": [
          [
            "d = rt",
            "Distancia = rapidez × tiempo; tapa la letra que necesitas"
          ],
          [
            "Triángulo velocidad",
            "Rapidez = distancia ÷ tiempo; unidades coherentes"
          ],
          [
            "King Henry",
            "Escalera kilo→milli; «By» = base; mueve el punto"
          ],
          [
            "Distributiva",
            "a(b + c) = ab + ac también con negativos"
          ],
          [
            "+/− mental",
            "Compensación: 199 + 57 ≈ 200 + 56"
          ],
          [
            "Signos opuestos",
            "−(−3) = +3; opuestos suman 0"
          ]
        ]
      }
    ]
  },
  "optional": {
    "grade": "Opcional · 7–12",
    "title": "Matemática opcional",
    "blurb": "Ruta extra: conjuntos, matrices, límites, identidades trig y vectores — estilo opcional Nepal/CBSE.",
    "lessons": {
      "setlang": {
        "name": "Lenguaje de conjuntos",
        "phrase": "∈ significa «en el club». ∪ es o, ∩ es y, ′ es no.",
        "also": "",
        "steps": [
          "Las llaves listan elementos: {1,2,3}.",
          "x ∈ A significa que x es miembro; x ∉ A significa que no lo es.",
          "Unión ∪ = o; intersección ∩ = ambos; complemento A′ = no está en A (dentro del universo)."
        ],
        "exception": "El orden y las repeticiones no importan en un conjunto: {1,2} = {2,1,1}. ∅ es vacío — nada es ∈ ∅. No confundas ⊂ (subconjunto) con ∈ (elemento).",
        "tag": ""
      },
      "setcount": {
        "name": "Conteo con conjuntos",
        "phrase": "n(A∪B) = n(A)+n(B)−n(A∩B). Resta la intersección contada dos veces.",
        "also": "",
        "steps": [
          "Suma los tamaños de A y B.",
          "Resta n(A∩B) una vez (se contó dos veces).",
          "Para tres conjuntos, usa la fórmula completa de inclusión–exclusión."
        ],
        "exception": "Si A y B son disjuntos, n(A∩B)=0 y solo sumas. n(A) cuenta elementos, no una probabilidad — divide entre n(U) solo cuando pidan probabilidad.",
        "tag": ""
      },
      "matintro": {
        "name": "Forma de matriz y suma",
        "phrase": "Filas por columnas: m×n. Suma entrada por entrada — solo mismo tamaño.",
        "also": "",
        "steps": [
          "Lee el tamaño como filas × columnas.",
          "Suma: suma posiciones que coinciden; los tamaños deben coincidir.",
          "Multiplicación escalar: multiplica cada entrada por el número."
        ],
        "exception": "No puedes sumar una 2×3 con una 3×2. La multiplicación de matrices no es suma entrada por entrada — eso viene después.",
        "tag": ""
      },
      "matdet": {
        "name": "Determinante e idea de inversa",
        "phrase": "det = ad − bc. La inversa existe solo si det ≠ 0.",
        "also": "",
        "steps": [
          "Para [[a,b],[c,d]], calcula ad − bc.",
          "Si det ≠ 0, A⁻¹ = (1/det) [[d,−b],[−c,a]].",
          "Comprueba: A A⁻¹ = I."
        ],
        "exception": "det = 0 significa singular — no hay inversa. No cambies el patrón de signos en la diagonal secundaria por error.",
        "tag": ""
      },
      "limintro": {
        "name": "Introducción a límites",
        "phrase": "Un límite pregunta: ¿a qué se acercan las salidas cuando x se acerca a a?",
        "also": "",
        "steps": [
          "Intenta sustituir x = a en f(x).",
          "Si obtienes un número normal, ese suele ser el límite (en piezas continuas).",
          "Si obtienes 0/0, factoriza o simplifica, y sustituye otra vez."
        ],
        "exception": "Un hueco o salto puede hacer que el límite difiera de f(a), o que los límites izquierdo/derecho no coincidan. «Se acerca» no es lo mismo que «iguala» en a.",
        "tag": ""
      },
      "trigid": {
        "name": "Identidades trig extra",
        "phrase": "sin²θ + cos²θ = 1. Divide entre cos² → 1 + tan²θ = sec²θ.",
        "also": "",
        "steps": [
          "Parte de sin² + cos² = 1 en el círculo unitario.",
          "Divide entre cos²θ: tan² + 1 = sec².",
          "Divide entre sin²θ: 1 + cot² = cosec²."
        ],
        "exception": "Estas asumen cos θ ≠ 0 cuando creas formas tan/sec (y sin ≠ 0 para cot/cosec). Las identidades valen donde las funciones están definidas.",
        "tag": ""
      },
      "trigcomp": {
        "name": "Cofunción y signos",
        "phrase": "sin(90°−θ)=cos θ. ASTC: All Sugar Tea Coffee para los signos.",
        "also": "",
        "steps": [
          "Complemento: sin↔cos, tan↔cot, sec↔cosec con 90°−θ.",
          "Para ángulos mayores de 90°, reduce a un ángulo de referencia.",
          "ASTC indica qué funciones son positivas en cada cuadrante."
        ],
        "exception": "Las identidades de cofunción necesitan el complemento (90°−θ), no 180°−θ (eso mantiene el nombre para el seno). Conoce el modo de tu calculadora.",
        "tag": ""
      },
      "vecintro": {
        "name": "Introducción a vectores",
        "phrase": "Un vector tiene magnitud y dirección. ⟨a,b⟩ se suma componente a componente; longitud √(a²+b²).",
        "also": "",
        "steps": [
          "Escribe un vector del plano como ⟨a,b⟩ o ai + bj.",
          "Suma/resta componentes que coinciden; multiplica por un escalar en cada una.",
          "Magnitud |⟨a,b⟩| = √(a²+b²)."
        ],
        "exception": "Vector de posición vs libre: el mismo ⟨a,b⟩ puede empezar en cualquier punto. |a+b| no suele ser |a|+|b|. Un escalar no tiene dirección.",
        "tag": ""
      },
      "vecdot": {
        "name": "Introducción al producto punto",
        "phrase": "a·b = a₁b₁ + a₂b₂. Producto punto cero significa perpendicular.",
        "also": "",
        "steps": [
          "Multiplica componentes que coinciden y suma.",
          "También a·b = |a||b| cos θ.",
          "Si a·b = 0 (y ninguno es cero), los vectores son perpendiculares."
        ],
        "exception": "El producto punto es un número, no un vector. Vectores paralelos tienen cos θ = ±1, no necesariamente producto punto cero.",
        "tag": ""
      },
      "setops": {
        "name": "Subconjunto y conjunto potencia",
        "phrase": "A ⊆ B si cada elemento de A está en B. Conjunto potencia: todos los subconjuntos — 2ⁿ de ellos.",
        "also": "",
        "steps": [
          "Comprueba subconjunto: cada miembro de A debe estar en B.",
          "Subconjunto propio ⊂ suele significar ⊆ pero no igual.",
          "Un conjunto finito con n elementos tiene 2ⁿ subconjuntos (incluidos ∅ y él mismo)."
        ],
        "exception": "∈ es para elementos; ⊆ es para conjuntos. {1} ∈ {{1}} es verdadero, pero 1 ∈ {{1}} es falso. ∅ es subconjunto de todo conjunto.",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Conjuntos y matrices",
        "rows": [
          [
            "∈ / ∉",
            "es / no es un elemento"
          ],
          [
            "∪",
            "unión — en A o B (o ambos)"
          ],
          [
            "∩",
            "intersección — en ambos"
          ],
          [
            "A′",
            "complemento — no está en A"
          ],
          [
            "n(A∪B)",
            "n(A)+n(B)−n(A∩B)"
          ],
          [
            "det 2×2",
            "ad − bc"
          ],
          [
            "I₂",
            "[[1,0],[0,1]] identidad"
          ]
        ]
      },
      {
        "title": "Límites, trig y vectores",
        "rows": [
          [
            "Límite",
            "las salidas se acercan a L cuando x se acerca a a"
          ],
          [
            "sin²+cos²",
            "= 1"
          ],
          [
            "1+tan²",
            "= sec²"
          ],
          [
            "|a|",
            "√(a₁²+a₂²)"
          ],
          [
            "a·b",
            "a₁b₁+a₂b₂"
          ]
        ]
      },
      {
        "title": "Matrices, límites y vectores",
        "rows": [
          [
            "Suma de matrices",
            "Mismo tamaño; suma entradas que coinciden"
          ],
          [
            "Multiplicación de matrices",
            "Fila × columna; tamaños internos deben coincidir"
          ],
          [
            "Escalar × matriz",
            "Multiplica cada entrada por el escalar"
          ],
          [
            "Leyes de límites",
            "Suma/producto de límites cuando existen"
          ],
          [
            "tan = sin/cos",
            "Identidad cociente de la tangente"
          ],
          [
            "Vector unitario",
            "Divide entre la longitud: v/|v|"
          ],
          [
            "Punto da el ángulo",
            "cos θ = a·b / (|a||b|)"
          ]
        ]
      }
    ]
  },
  "g8": {
    "grade": "Grado 8",
    "title": "Teoremas de triángulos y ángulos",
    "blurb": "Cada teorema es un movimiento. Reconoce la figura y haz el movimiento.",
    "lessons": {
      "anglesum": {
        "name": "Suma de ángulos de un triángulo",
        "phrase": "Tres esquinas forman una línea recta: 180°.",
        "also": "",
        "steps": [
          "Suma los ángulos que conoces.",
          "Resta eso de 180°.",
          "Lo que queda es el ángulo que falta."
        ],
        "exception": "Esto es en papel plano. Un triángulo en una bola puede sumar más de 180°. Los ángulos exteriores, uno en cada esquina, suman 360°.",
        "tag": ""
      },
      "exterior": {
        "name": "Ángulo exterior",
        "phrase": "El ángulo exterior iguala los dos interiores lejanos.",
        "also": "",
        "steps": [
          "Encuentra el ángulo exterior en una esquina.",
          "Suma los dos ángulos interiores que no lo tocan.",
          "Coinciden."
        ],
        "exception": "No uses el ángulo interior vecino. Ese par está en una línea recta y hace 180°.",
        "tag": ""
      },
      "iso": {
        "name": "Triángulo isósceles",
        "phrase": "Lados gemelos, ángulos gemelos.",
        "also": "",
        "steps": [
          "Encuentra los dos lados iguales (las marcas).",
          "Los ángulos en la base de esos lados son iguales.",
          "Usa 180° para el resto."
        ],
        "exception": "Los ángulos gemelos están frente a los lados gemelos, en la base. El ángulo entre los lados gemelos suele ser distinto, salvo que los tres lados sean iguales.",
        "tag": ""
      },
      "pythag": {
        "name": "Pitágoras",
        "phrase": "Eleva al cuadrado los catetos, súmalos, y eso es el lado largo al cuadrado.",
        "also": "a² + b² = c², y c está frente al ángulo recto.",
        "steps": [
          "Encuentra el ángulo recto. El lado frente a él es c.",
          "Eleva al cuadrado los dos catetos y súmalos.",
          "Saca la raíz. Para un cateto, resta: c² − a²."
        ],
        "exception": "Solo en triángulos rectángulos. Y c está frente al ángulo recto, no solo el lado que parece más largo.",
        "tag": ""
      },
      "parallel": {
        "name": "Rectas paralelas",
        "phrase": "Ángulos F se copian, Z se copian, C suman 180°.",
        "also": "",
        "steps": [
          "Traza la letra que forman los dos ángulos con las rectas.",
          "F (correspondientes) o Z (alternos): los ángulos son iguales.",
          "C (co-interiores): los ángulos suman 180°."
        ],
        "exception": "Solo cuando las rectas son paralelas (marcas de flecha). Sin paralelas, los ángulos no están forzados a coincidir.",
        "tag": ""
      },
      "congruent": {
        "name": "Triángulos congruentes",
        "phrase": "Mismo tamaño y forma: SSS, SAS, ASA, RHS.",
        "also": "",
        "steps": [
          "SSS: tres lados coinciden.",
          "SAS: dos lados y el ángulo entre ellos.",
          "ASA: dos ángulos y el lado entre ellos.",
          "RHS: ángulo recto, hipotenusa y un lado más."
        ],
        "exception": "SSA no es prueba: dos lados y un ángulo que no está entre ellos pueden dar dos triángulos. AAA da la misma forma pero no el mismo tamaño.",
        "tag": ""
      },
      "quad": {
        "name": "Ángulos del cuadrilátero",
        "phrase": "Cuatro esquinas dan una vuelta completa: 360°.",
        "also": "",
        "steps": [
          "Suma los tres ángulos que conoces.",
          "Resta eso de 360°."
        ],
        "exception": "Los ángulos opuestos solo son iguales en un paralelogramo. No asumas un cuadrado solo porque tiene cuatro lados.",
        "tag": ""
      },
      "polyint": {
        "name": "Ángulos interiores del polígono",
        "phrase": "Parte el polígono en triángulos: (n − 2) × 180°.",
        "also": "",
        "steps": [
          "Cuenta los lados n.",
          "Un polígono se parte en n − 2 triángulos desde una esquina.",
          "Cada triángulo es 180°, así que la suma interior es (n − 2) × 180°.",
          "En un polígono regular, cada ángulo interior es esa suma ÷ n."
        ],
        "exception": "n debe ser al menos 3. Los ángulos exteriores son otra historia: siempre suman 360°, no (n − 2) × 180°.",
        "tag": ""
      },
      "polyext": {
        "name": "Ángulos exteriores del polígono",
        "phrase": "Recorre la figura: los exteriores siempre suman 360°.",
        "also": "",
        "steps": [
          "En cada esquina, el exterior es el giro que das.",
          "Todos los giros hacen una vuelta: 360°.",
          "En un n-ágono regular, cada exterior es 360° ÷ n.",
          "Interior y exterior en una esquina están en línea recta: suman 180°."
        ],
        "exception": "Es un exterior en cada vértice, siempre en el mismo sentido. No mezcles sumas interiores con exteriores.",
        "tag": ""
      },
      "straight": {
        "name": "Ángulos en una recta y alrededor de un punto",
        "phrase": "En una recta: 180°. Alrededor de un punto: 360°. Opuestos por el vértice: iguales.",
        "also": "",
        "steps": [
          "Los ángulos en una línea recta suman 180°.",
          "Los ángulos alrededor de un punto suman 360°.",
          "Cuando dos rectas se cruzan, los opuestos por el vértice son iguales."
        ],
        "exception": "Los ángulos adyacentes en una cruz no son iguales — hacen 180°. Solo los que están frente a frente coinciden.",
        "tag": ""
      },
      "slope": {
        "name": "Pendiente",
        "phrase": "La pendiente es subida entre avance.",
        "also": "",
        "steps": [
          "Elige dos puntos de la recta.",
          "Subida = cambio en y (arriba es positivo).",
          "Avance = cambio en x (derecha es positivo).",
          "Pendiente m = subida ÷ avance."
        ],
        "exception": "Recta horizontal: pendiente 0 (subida 0). Vertical: sin pendiente (avance 0 — no divides entre 0). Hacia abajo implica subida negativa.",
        "tag": ""
      },
      "ymxb": {
        "name": "Forma pendiente–intersección",
        "phrase": "y = mx + b: m es la pendiente, b es donde corta el eje y.",
        "also": "",
        "steps": [
          "Lee m: el número delante de x (pendiente).",
          "Lee b: el término constante (intersección con y).",
          "Para hallar y, sustituye x. Para hallar x, sustituye y y resuelve."
        ],
        "exception": "Si la ecuación no está despejada en y, reordena primero. La intersección está en el eje y (x = 0), no en el eje x.",
        "tag": ""
      },
      "expLaws": {
        "name": "Leyes de los exponentes",
        "phrase": "Multiplicar → sumar potencias. Dividir → restar. Potencia de potencia → multiplicar.",
        "also": "",
        "steps": [
          "xᵃ × xᵇ = xᵃ⁺ᵇ.",
          "xᵃ ÷ xᵇ = xᵃ⁻ᵇ.",
          "(xᵃ)ᵇ = xᵃᵇ.",
          "x⁰ = 1 (para x ≠ 0)."
        ],
        "exception": "Las bases deben coincidir antes de sumar o restar potencias. (x²)³ es x⁶, no x⁵. Y 2³ × 2⁴ = 2⁷, no 4⁷.",
        "tag": ""
      },
      "sci": {
        "name": "Notación científica",
        "phrase": "Un dígito, luego punto, por una potencia de diez.",
        "also": "",
        "steps": [
          "Mueve el punto hasta que un solo dígito no nulo quede delante.",
          "Cuenta cuántos lugares moviste: esa es la potencia de 10.",
          "Mover a la izquierda da exponente positivo; a la derecha, negativo."
        ],
        "exception": "El número inicial debe ser al menos 1 y menor que 10. 34 × 10³ no es notación científica — escribe 3.4 × 10⁴.",
        "tag": ""
      },
      "cylvol": {
        "name": "Volumen del cilindro",
        "phrase": "Volumen del cilindro: base circular por altura: πr²h.",
        "also": "",
        "steps": [
          "Halla el radio r de la base circular.",
          "Área de la base: πr².",
          "Multiplica por la altura h.",
          "Usa π ≈ 3.14."
        ],
        "exception": "Usa radio, no diámetro. Si dan el diámetro, divídelo entre dos primero. Volumen no es área de superficie.",
        "tag": ""
      },
      "conevol": {
        "name": "Volumen del cono",
        "phrase": "Un cono es un tercio del cilindro con la misma base y altura.",
        "also": "",
        "steps": [
          "La misma base y altura que un cilindro darían πr²h.",
          "Un cono llena solo un tercio: V = (1/3)πr²h.",
          "Usa π ≈ 3.14."
        ],
        "exception": "No olvides el 1/3. Comparar con un cilindro solo funciona cuando r y h coinciden.",
        "tag": ""
      },
      "spherevol": {
        "name": "Volumen de la esfera",
        "phrase": "Volumen de la esfera: (4/3)πr³.",
        "also": "",
        "steps": [
          "Eleva al cubo el radio: r³.",
          "Multiplica por π.",
          "Multiplica por 4/3.",
          "Usa π ≈ 3.14."
        ],
        "exception": "r³ significa r × r × r, no 3r. Divide el diámetro entre dos antes de empezar.",
        "tag": ""
      },
      "pythagConv": {
        "name": "Recíproco de Pitágoras",
        "phrase": "Si a² + b² = c², el triángulo es rectángulo en la esquina entre a y b.",
        "also": "",
        "steps": [
          "Eleva al cuadrado los tres lados.",
          "Comprueba si los dos cuadrados menores suman al mayor.",
          "Si sí, es rectángulo. Si la suma es muy pequeña o grande, no lo es."
        ],
        "exception": "c debe ser el lado más largo. Tomar el lado equivocado como «hipotenusa» engaña.",
        "tag": ""
      },
      "transform": {
        "name": "Transformaciones",
        "phrase": "Desliza, voltea o gira: traslación, reflexión, rotación.",
        "also": "",
        "steps": [
          "Traslación: suma el mismo (a, b) a cada punto.",
          "Reflexión en el eje x: (x, y) → (x, −y). En el eje y: (x, y) → (−x, y).",
          "Rotación 90° antihorario sobre el origen: (x, y) → (−y, x).",
          "Rotación 180°: (x, y) → (−x, −y)."
        ],
        "exception": "90° horario es (x, y) → (y, −x), al revés. Reflexiones en otras rectas tienen reglas distintas. Las traslaciones no voltean ni giran la figura.",
        "tag": ""
      },
      "neg-exponent-one-over": {
        "name": "Exponentes negativos",
        "phrase": "Exponente negativo: pasa a uno entre con potencia positiva.",
        "also": "a^(−n) = 1/a^n — el signo menos da el recíproco, no un valor negativo.",
        "steps": [
          "Reescribe a^(−n) como 1/a^n.",
          "Simplifica la potencia positiva en el denominador.",
          "Simplifica factores si puedes."
        ],
        "exception": "x^(−n)=1/x^n para x≠0. Un exponente negativo no hace negativo el valor por sí solo. 2^(−3)=1/8, no −8.",
        "tag": ""
      },
      "compsupp": {
        "name": "Complementarios y suplementarios",
        "phrase": "C antes de S: complementarios 90°, suplementarios 180°. Esquina luego Recta.",
        "also": "C de esquina (90). S de recta (180).",
        "steps": [
          "Complementarios: dos ángulos suman 90°.",
          "Suplementarios: dos ángulos suman 180°.",
          "C va antes que S; 90 antes que 180."
        ],
        "exception": "No tienen que ser adyacentes — solo deben sumar 90 o 180.",
        "tag": ""
      },
      "riserun": {
        "name": "Subida entre avance",
        "phrase": "La pendiente es subida entre avance — primero arriba, luego a lo largo.",
        "also": "",
        "steps": [
          "Cuenta el cambio vertical (subida).",
          "Cuenta el cambio horizontal (avance).",
          "Pendiente = subida/avance."
        ],
        "exception": "Recta horizontal: subida 0 → pendiente 0. Vertical: avance 0 → indefinida.",
        "tag": ""
      },
      "wordkeys8": {
        "name": "Aritmética en historias de geometría",
        "phrase": "Perímetro junta lados; área son grupos de unidades cuadradas; comparte ángulos con 180°.",
        "also": "",
        "steps": [
          "Traduce la historia a +, −, × o ÷.",
          "Usa el dato de geometría (180°, cerca vs alfombra).",
          "Resuelve."
        ],
        "exception": "«Alrededor» es perímetro; «cubre» es área — no intercambies fórmulas.",
        "tag": ""
      },
      "estimate8": {
        "name": "Estimar raíces y cuadrados",
        "phrase": "Eleva un entero cercano; mira si tu número queda entre dos cuadrados.",
        "also": "",
        "steps": [
          "Lista cuadrados perfectos cercanos.",
          "Encierra el número entre ellos.",
          "Estima la raíz entre esos enteros."
        ],
        "exception": "√50 es un poco más de 7 porque 7²=49.",
        "tag": ""
      },
      "acuteobtuse": {
        "name": "Nombres de ángulos",
        "phrase": "Un ángulo «lindo» es pequeño (agudo <90). Obtuso es «gordo» (entre 90 y 180).",
        "also": "",
        "steps": [
          "Agudo: menos de 90°.",
          "Recto: exactamente 90°.",
          "Obtuso: entre 90° y 180°.",
          "Llano: 180°."
        ],
        "exception": "Los reflexos son mayores de 180° — más allá de una recta.",
        "tag": ""
      },
      "distrib8": {
        "name": "Distribuir en expresiones",
        "phrase": "El factor de afuera llega a cada término — como el hermano pequeño de FOIL.",
        "also": "",
        "steps": [
          "Multiplica el de afuera por cada término de adentro.",
          "Cuida los signos.",
          "Combina términos semejantes si hay."
        ],
        "exception": "Si dos paréntesis se multiplican, usa FOIL / cuadrícula — no una sola distribución.",
        "tag": ""
      },
      "commute8": {
        "name": "Reordenar mentalmente",
        "phrase": "Commute y reagrupa para hacer dieces y productos fáciles.",
        "also": "",
        "steps": [
          "Busca números que hagan 10 o un producto conocido.",
          "Commute/asocia para emparejarlos.",
          "Termina mentalmente."
        ],
        "exception": "Con resta en la cadena, reescribe como suma de opuestos antes de reagrupar libremente.",
        "tag": ""
      },
      "pythagleg": {
        "name": "Hallar un cateto",
        "phrase": "Cateto² = hip² − otro cateto² — sigue siendo Pitágoras.",
        "also": "",
        "steps": [
          "Eleva al cuadrado la hipotenusa.",
          "Resta el otro cateto al cuadrado.",
          "Raíz cuadrada para el cateto que falta."
        ],
        "exception": "La hipotenusa es la más larga — no restes un cuadrado mayor de uno menor y esperes un cateto real.",
        "tag": ""
      },
      "vertopp": {
        "name": "Opuestos por el vértice",
        "phrase": "La X marca el sitio: los opuestos por el vértice son iguales.",
        "also": "",
        "steps": [
          "Encuentra la X de dos rectas que se cruzan.",
          "Los ángulos frente a frente coinciden.",
          "Los vecinos en una recta suman 180°."
        ],
        "exception": "Solo el par opuesto coincide — los adyacentes son suplementarios, no iguales (salvo 90).",
        "tag": ""
      },
      "scinote8": {
        "name": "Sentido de la notación científica",
        "phrase": "Un dígito, luego punto, por una potencia de diez.",
        "also": "",
        "steps": [
          "Pon el punto después del primer dígito distinto de cero.",
          "Cuenta los saltos hasta el punto original — ese es el exponente.",
          "Exponente positivo → grande; negativo → diminuto."
        ],
        "exception": "El número inicial debe ser ≥1 y <10 (forma estándar).",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Triángulos y paralelas",
        "rows": [
          [
            "Suma de ángulos",
            "Tres esquinas → línea recta: 180°"
          ],
          [
            "Ángulo exterior",
            "Exterior = dos interiores lejanos"
          ],
          [
            "Isósceles",
            "Lados gemelos → ángulos gemelos"
          ],
          [
            "Pitágoras",
            "a² + b² = c² (catetos → hipotenusa)"
          ],
          [
            "Paralelas (F, Z, C)",
            "F/Z copian; C (co-interior) → 180°"
          ],
          [
            "Congruencia",
            "SSS, SAS, ASA, RHS"
          ],
          [
            "Agudo / obtuso / recto",
            "Menos, más o igual a 90°"
          ]
        ]
      },
      {
        "title": "Polígonos y espacio",
        "rows": [
          [
            "Ángulos del cuadrilátero",
            "Cuatro esquinas → vuelta completa: 360°"
          ],
          [
            "Suma interior",
            "(n − 2) × 180°"
          ],
          [
            "Suma exterior",
            "Siempre 360°"
          ],
          [
            "Complementarios",
            "Dos ángulos que suman 90° (no tienen que tocarse)"
          ],
          [
            "Suplementarios",
            "Dos ángulos que suman 180°"
          ],
          [
            "Opuestos por el vértice",
            "En una X — pares iguales"
          ],
          [
            "Recta / punto",
            "En una recta 180°; alrededor de un punto 360°"
          ]
        ]
      },
      {
        "title": "Sólidos 3-D",
        "rows": [
          [
            "Cilindro",
            "πr²h"
          ],
          [
            "Cono",
            "⅓πr²h"
          ],
          [
            "Esfera",
            "(4/3)πr³"
          ],
          [
            "Transformar",
            "Deslizar, voltear, girar"
          ]
        ]
      },
      {
        "title": "Lineal y exponentes",
        "rows": [
          [
            "Pendiente",
            "Subida entre avance"
          ],
          [
            "y = mx + b",
            "m = pendiente; b = intersección con y"
          ],
          [
            "Leyes de exponentes",
            "× → suma; ÷ → resta; potencia→potencia multiplica"
          ],
          [
            "Exponente negativo",
            "a⁻ⁿ = 1/aⁿ"
          ],
          [
            "Notación científica",
            "Un dígito, luego punto, × 10ⁿ"
          ]
        ]
      }
    ]
  }
});
})();
