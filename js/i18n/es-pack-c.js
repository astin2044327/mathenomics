/* Mathenomics — es content pack. Generated from docs/i18n/es-{id}.json */
(function () {
  window.I18N_CONTENT = window.I18N_CONTENT || {};
  const root = (window.I18N_CONTENT.es = window.I18N_CONTENT.es || { courses: {} });
  Object.assign(root.courses, {
  "g9": {
    "grade": "Grado 9",
    "title": "Semejanza, círculos y cuadráticas",
    "blurb": "Misma forma, hechos del círculo y la fórmula cuadrática.",
    "lessons": {
      "similar": {
        "name": "Triángulos semejantes",
        "phrase": "Mismos ángulos, misma forma. Cada lado crece con la misma escala.",
        "also": "",
        "steps": [
          "Empareja los ángulos iguales.",
          "Hallar la escala: lado grande ÷ lado pequeño que corresponde.",
          "Multiplica cualquier lado pequeño por la escala."
        ],
        "exception": "Semejante no es igual que congruente. Los tamaños pueden ser distintos. Siempre empareja un lado con el que enfrenta el mismo ángulo.",
        "tag": ""
      },
      "bpt": {
        "name": "Corte paralelo en un triángulo",
        "phrase": "Una recta paralela a la base corta ambos lados en la misma razón.",
        "also": "",
        "steps": [
          "Lee los dos trozos en un lado.",
          "Iguala su razón a los dos trozos del otro lado.",
          "Resuelve."
        ],
        "exception": "Solo si el corte es paralelo a la base. Una recta inclinada no conserva la razón.",
        "tag": ""
      },
      "midseg": {
        "name": "Mediana media",
        "phrase": "Une los puntos medios: mitad de la base, y paralela a ella.",
        "also": "",
        "steps": [
          "Hallar el punto medio de dos lados.",
          "Únelos.",
          "Esa recta mide la mitad del tercer lado."
        ],
        "exception": "Ambos extremos deben ser puntos medios. Si uno no es el medio, la regla de la mitad no aplica.",
        "tag": ""
      },
      "semicircle": {
        "name": "Ángulo en un semicírculo",
        "phrase": "Un diámetro siempre ve un ángulo recto.",
        "also": "",
        "steps": [
          "Comprueba que un lado es diámetro.",
          "El ángulo en la circunferencia frente a él es 90°.",
          "Los otros dos ángulos suman 90°."
        ],
        "exception": "Los 90° están en la circunferencia, no en el centro. El ángulo central sobre un diámetro es línea recta, 180°.",
        "tag": ""
      },
      "tangent": {
        "name": "Tangente y radio",
        "phrase": "La tangente se encuentra con el radio en ángulo recto.",
        "also": "Dos tangentes desde el mismo punto tienen la misma longitud.",
        "steps": [
          "Traza el radio al punto de contacto.",
          "Esa esquina es 90°.",
          "Usa la suma de ángulos del triángulo para el resto."
        ],
        "exception": "Una recta que corta el círculo no es tangente. La tangente solo toca una vez.",
        "tag": ""
      },
      "quadratic": {
        "name": "Fórmula cuadrática",
        "phrase": "Menos b, más o menos la raíz de b² − 4ac, todo entre 2a.",
        "also": "",
        "steps": [
          "Lee a, b y c de ax² + bx + c = 0.",
          "Calcula b² − 4ac.",
          "Usa + y − para ambas respuestas. Divide entre 2a."
        ],
        "exception": "Si a es 0, no es cuadrática. Si b² − 4ac es negativo, no hay soluciones reales. Si es 0, ambas soluciones son iguales.",
        "tag": ""
      },
      "foil": {
        "name": "Expandir FOIL",
        "phrase": "First, Outside, Inside, Last.",
        "also": "",
        "steps": [
          "First: los dos primeros términos.",
          "Outside: los dos términos exteriores.",
          "Inside: los dos términos interiores.",
          "Last: los dos últimos términos.",
          "Súmalos y ordena términos semejantes."
        ],
        "exception": "Cuidado los signos: (x − 3)(x + 2) sigue usando FOIL, pero inside y last arrastran menos. FOIL es para dos paréntesis; tres piden más pasos.",
        "tag": ""
      },
      "dos": {
        "name": "Diferencia de dos cuadrados",
        "phrase": "a² − b² = (a − b)(a + b).",
        "also": "",
        "steps": [
          "Detecta dos cuadrados con menos entre ellos.",
          "Escribe (√primero − √segundo)(√primero + √segundo).",
          "Comprueba con FOIL: los términos centrales se cancelan."
        ],
        "exception": "Debe ser menos. a² + b² no factoriza así sobre los reales. Y 9x² − 4 es (3x − 2)(3x + 2), no (9x − 2)(x + 2).",
        "tag": ""
      },
      "factor": {
        "name": "Factorizar cuadráticas",
        "phrase": "Busca dos números que multipliquen a c y sumen b.",
        "also": "",
        "steps": [
          "Para x² + bx + c, busca dos números con producto c y suma b.",
          "Escribe (x + p)(x + q).",
          "Comprueba expandiendo."
        ],
        "exception": "Si los números que necesitas no existen como enteros, quizá no factoriza bien. Coeficiente principal distinto de 1 pide otra búsqueda (o la fórmula cuadrática).",
        "tag": ""
      },
      "ineq": {
        "name": "Desigualdades",
        "phrase": "Resuelve como ecuación — pero invierte el signo al × o ÷ por un negativo.",
        "also": "",
        "steps": [
          "Mueve términos igual que con =.",
          "Si multiplicas o divides ambos lados por un negativo, voltea < ↔ >.",
          "Comprueba con un número de prueba."
        ],
        "exception": "Sumar o restar nunca invierte el signo. Solo multiplicar o dividir por negativo. Intercambiar lados también invierte la desigualdad.",
        "tag": ""
      },
      "simul": {
        "name": "Sistemas de ecuaciones",
        "phrase": "Eliminación: iguala un literal, luego suma o resta para borrarlo.",
        "also": "",
        "steps": [
          "Alinea las dos ecuaciones.",
          "Multiplica para que un literal tenga el mismo (u opuesto) coeficiente.",
          "Suma o resta para eliminar ese literal.",
          "Resuelve el otro y sustituye de vuelta."
        ],
        "exception": "Si ambos literales desaparecen y queda 0 = 5, no hay solución. Si queda 0 = 0, hay infinitas. Comprueba sustituyendo ambas respuestas.",
        "tag": ""
      },
      "distmid": {
        "name": "Distancia y punto medio",
        "phrase": "Distancia es Pitágoras en la cuadrícula. Punto medio promedia coordenadas.",
        "also": "",
        "steps": [
          "Distancia: √((x₂ − x₁)² + (y₂ − y₁)²).",
          "Punto medio: ((x₁ + x₂)/2, (y₁ + y₂)/2).",
          "Cuenta recorrido y subida primero si es más fácil."
        ],
        "exception": "No sumes coordenadas para distancia. Punto medio usa el promedio, no la diferencia.",
        "tag": ""
      },
      "perpgrad": {
        "name": "Pendientes paralelas y perpendiculares",
        "phrase": "Paralelas: misma pendiente. Perpendiculares: invierte la fracción y cambia el signo.",
        "also": "",
        "steps": [
          "Rectas paralelas tienen pendientes iguales.",
          "Perpendicular: toma la pendiente, inviértela y multiplica por −1.",
          "Comprueba: m₁ × m₂ = −1 para perpendiculares."
        ],
        "exception": "Horizontal (pendiente 0) es perpendicular a vertical (pendiente indefinida). Pendiente negativa invertida: cuidado con dos menos.",
        "tag": ""
      },
      "discr": {
        "name": "Discriminante",
        "phrase": "b² − 4ac dice cuántas raíces reales: positivo dos, cero una, negativo ninguna.",
        "also": "",
        "steps": [
          "De ax² + bx + c = 0, calcula Δ = b² − 4ac.",
          "Δ > 0: dos raíces reales distintas.",
          "Δ = 0: una raíz real repetida.",
          "Δ < 0: ninguna raíz real."
        ],
        "exception": "El discriminante no da las raíces — solo cuántas. Raíces complejas existen si Δ < 0, pero esta lección se queda en reales.",
        "tag": ""
      },
      "scaleAV": {
        "name": "Áreas y volúmenes semejantes",
        "phrase": "Longitudes × k, áreas × k², volúmenes × k³.",
        "also": "",
        "steps": [
          "Hallar el factor de escala k en longitudes.",
          "Las áreas escalan con k².",
          "Los volúmenes escalan con k³.",
          "Si te dan áreas, k = √(escala de área)."
        ],
        "exception": "No escales área con k ni volumen con k². Longitud al doble hace área ×4 y volumen ×8.",
        "tag": ""
      },
      "bisector": {
        "name": "Teorema de la bisectriz",
        "phrase": "La bisectriz corta el lado opuesto en la razón de los dos lados adyacentes.",
        "also": "",
        "steps": [
          "Confirma que el rayo bisecta el ángulo.",
          "Escribe lado adyacente ÷ lado adyacente = segmento ÷ segmento.",
          "Haz regla de tres y resuelve."
        ],
        "exception": "Es el lado opuesto el que se parte. La razón coincide con los dos lados del ángulo, no con la longitud de la bisectriz.",
        "tag": ""
      },
      "wordkeys9": {
        "name": "Traducir palabras a álgebra",
        "phrase": "En total → +; diferencia → −; producto → ×; cociente → ÷; de → ×.",
        "also": "",
        "steps": [
          "Subraya palabras clave.",
          "Elige variable para la incógnita.",
          "Construye la expresión o ecuación."
        ],
        "exception": "«Menos que» invierte el orden: 3 menos que x es x − 3, no 3 − x.",
        "tag": ""
      },
      "estimate9": {
        "name": "Estimar raíces irracionales",
        "phrase": "Aprieta entre cuadrados perfectos para estimar √n.",
        "also": "",
        "steps": [
          "Busca cuadrados enteros alrededor de n.",
          "Mira cuál está más cerca.",
          "Estima √n cerca de ese entero."
        ],
        "exception": "√n es exacto solo para cuadrados perfectos.",
        "tag": ""
      },
      "commute9": {
        "name": "Reordenar álgebra",
        "phrase": "Los términos conmutan; los factores conmutan — los signos van pegados a su término.",
        "also": "",
        "steps": [
          "Junta términos semejantes.",
          "Suma coeficientes.",
          "Escribe en orden limpio (a menudo potencias de mayor a menor)."
        ],
        "exception": "El signo menos pertenece al término que le sigue al conmutar.",
        "tag": ""
      },
      "distrib9": {
        "name": "Mentalidad FOIL",
        "phrase": "FOIL: First, Outside, Inside, Last — luego ordena.",
        "also": "",
        "steps": [
          "First × first.",
          "Par exterior.",
          "Par interior.",
          "Last × last.",
          "Combina términos semejantes."
        ],
        "exception": "FOIL es dos binomios. Más términos → usa una cuadrícula.",
        "tag": ""
      },
      "compsupp9": {
        "name": "Pares de ángulos en álgebra",
        "phrase": "Complemento → suman 90. Suplemento → suman 180. Resuelve x.",
        "also": "",
        "steps": [
          "Traduce a x + y = 90 o 180.",
          "Sustituye expresiones.",
          "Resuelve."
        ],
        "exception": "No asumas adyacentes — el problema debe decir complementarios/suplementarios (o mostrar la figura).",
        "tag": ""
      },
      "zero9": {
        "name": "Propiedad del producto cero",
        "phrase": "Si un producto es cero, al menos un factor es cero.",
        "also": "",
        "steps": [
          "Pon la ecuación en = 0.",
          "Factoriza si hace falta.",
          "Cada factor = 0 y resuelve."
        ],
        "exception": "Solo funciona con cero al otro lado. ab = 6 no implica a=6.",
        "tag": ""
      },
      "complete9": {
        "name": "Gancho completar el cuadrado",
        "phrase": "Parte por dos el término medio, cuadra, equilibra en ambos lados.",
        "also": "",
        "steps": [
          "Mueve la constante.",
          "Toma la mitad del coeficiente de x.",
          "Cuadra esa mitad y suma en ambos lados.",
          "Escribe un binomio al cuadrado."
        ],
        "exception": "El coeficiente principal debe ser 1 (divide primero si no lo es).",
        "tag": ""
      },
      "quadform9": {
        "name": "Canción de la fórmula cuadrática",
        "phrase": "x es menos b, más o menos la raíz de b al cuadrado menos 4ac, todo entre 2a.",
        "also": "",
        "steps": [
          "Identifica a, b, c.",
          "Calcula el discriminante b² − 4ac.",
          "Sustituye en (−b ± √Δ)/(2a)."
        ],
        "exception": "Si Δ < 0 no hay raíces reales. No olvides que «todo entre 2a» aplica a todo.",
        "tag": ""
      },
      "prop9": {
        "name": "Razones de semejanza",
        "phrase": "Misma forma: lados que corresponden en proporción — mariposa si hace falta.",
        "also": "",
        "steps": [
          "Empareja lados correspondientes.",
          "Escribe una proporción.",
          "Regla de tres para resolver."
        ],
        "exception": "La correspondencia importa — no emparejes corto con largo al azar.",
        "tag": ""
      },
      "exp9": {
        "name": "Movimientos mentales de exponentes",
        "phrase": "Multiplicar → sumar potencias. Dividir → restar. Potencia de potencia → multiplicar.",
        "also": "",
        "steps": [
          "¿Misma base? Aplica la ley.",
          "Suma/resta/multiplica exponentes según la ley.",
          "Simplifica coeficientes aparte."
        ],
        "exception": "Bases distintas no se combinan con estas leyes (salvo que reescribas).",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Semejanza y círculos",
        "rows": [
          [
            "Triángulos semejantes",
            "Mismos ángulos; lados × misma escala"
          ],
          [
            "BPT (corte paralelo)",
            "Corta ambos lados en la misma razón"
          ],
          [
            "Mediana media",
            "Une medios: mitad de la base, paralela"
          ],
          [
            "Semicírculo",
            "Ángulo en semicírculo es 90°"
          ],
          [
            "Tangente ⊥ radio",
            "Se encuentran en ángulo recto"
          ],
          [
            "Longitudes / áreas / volúmenes",
            "×k, ×k², ×k³"
          ],
          [
            "Bisectriz",
            "Parte el opuesto en razón de los lados"
          ]
        ]
      },
      {
        "title": "Caja de herramientas álgebra",
        "rows": [
          [
            "FOIL",
            "First, Outside, Inside, Last"
          ],
          [
            "Diferencia de cuadrados",
            "a² − b² = (a − b)(a + b)"
          ],
          [
            "Factorizar x²+bx+c",
            "Dos números: producto c, suma b"
          ],
          [
            "Producto cero",
            "AB = 0 → A = 0 o B = 0"
          ],
          [
            "Completar cuadrado",
            "Mitad b, cuadra, equilibra ambos lados"
          ],
          [
            "Fórmula cuadrática",
            "x = (−b ± √(b²−4ac)) / 2a"
          ],
          [
            "Desigualdades",
            "Voltea el signo al × o ÷ por negativo"
          ],
          [
            "Sistemas",
            "Iguala un literal, suma/resta para borrarlo"
          ],
          [
            "Discriminante",
            "b²−4ac: +, 0, − → 2, 1, 0 raíces reales"
          ]
        ]
      },
      {
        "title": "Geometría analítica",
        "rows": [
          [
            "Distancia",
            "Pitágoras en la cuadrícula"
          ],
          [
            "Punto medio",
            "Promedia coordenadas"
          ],
          [
            "Pendientes paralelas",
            "Misma m"
          ],
          [
            "Perpendicular",
            "Invierte fracción, cambia signo (m₁m₂ = −1)"
          ],
          [
            "Proporción",
            "a/b = c/d → regla de tres"
          ],
          [
            "Expandir potencias",
            "(ab)ⁿ = aⁿbⁿ"
          ]
        ]
      }
    ]
  },
  "g10": {
    "grade": "Grado 10",
    "title": "Trigonometría y teoremas del círculo",
    "blurb": "sin, cos, tan, el opcional cosec, sec y cot, y los hechos del círculo.",
    "lessons": {
      "soh": {
        "name": "sin, cos, tan",
        "phrase": "SOH CAH TOA.",
        "also": "Some People Have Curly Brown Hair Through Proper Brushing: perpendicular, base, hipotenusa.",
        "steps": [
          "Seno = Opuesto ÷ Hipotenusa.",
          "Coseno = Adyacente ÷ Hipotenusa.",
          "Tangente = Opuesto ÷ Adyacente."
        ],
        "exception": "Nombra los lados desde el ángulo que usas, nunca desde el ángulo recto. Tangente no tiene valor en 90°.",
        "tag": ""
      },
      "recip": {
        "name": "cosec, sec, cot (opcional)",
        "phrase": "Invierte las tres principales: cosec invierte sin, sec invierte cos, cot invierte tan.",
        "also": "Cada par lleva exactamente un «co»: sin con cosec, cos con sec, tan con cot.",
        "steps": [
          "Hallar la razón principal.",
          "Inviértela.",
          "cosec θ = hipotenusa ÷ opuesto."
        ],
        "exception": "Indefinida donde la razón principal es 0. cosec 0° no existe. Nota el emparejamiento: cosec va con sin, no con cos.",
        "tag": ""
      },
      "astc": {
        "name": "Signos en cada cuadrante",
        "phrase": "Add Sugar To Coffee.",
        "also": "All Students Take Calculus.",
        "steps": [
          "Cuadrante I, All: todas las razones positivas.",
          "II, Sugar: solo sen positivo.",
          "III, To: solo tan positivo.",
          "IV, Coffee: solo cos positivo."
        ],
        "exception": "Empieza arriba a la derecha y ve en sentido antihorario. La frase da solo signos; tan sigue sin valor en 90° y 270°.",
        "tag": ""
      },
      "hand": {
        "name": "Valores de ángulos especiales",
        "phrase": "Dedos antes de ÷ 2 bajo raíz da sin. Dedos después da cos.",
        "also": "",
        "steps": [
          "Etiqueta dedos 0°, 30°, 45°, 60°, 90°.",
          "Dobla el dedo del ángulo.",
          "sin = √(dedos antes) ÷ 2. cos = √(dedos después) ÷ 2."
        ],
        "exception": "Solo funciona para esos cinco ángulos. Para tan, divide sin entre cos; tan 90° no existe.",
        "tag": ""
      },
      "table": {
        "name": "La tabla estándar de ángulos",
        "phrase": "Escribe 0, 1, 2, 3, 4. Divide entre 4. Saca raíz. Eso es sin.",
        "also": "cos es la fila sin al revés. tan es sin ÷ cos. cosec, sec y cot las invierten.",
        "steps": [
          "Escribe los ángulos 0°, 30°, 45°, 60°, 90°.",
          "Debajo escribe 0, 1, 2, 3, 4.",
          "Divide cada uno entre 4 y saca raíz: 0, 1/2, 1/√2, √3/2, 1. Esa es la fila sin.",
          "Escribe sin al revés para cos: 1, √3/2, 1/√2, 1/2, 0.",
          "tan = sin ÷ cos: 0, 1/√3, 1, √3, no definido.",
          "Fila opcional: invierte sin para cosec, cos para sec, tan para cot."
        ],
        "exception": "tan 90°, sec 90°, cosec 0° y cot 0° no existen porque dividirías entre 0. La tabla está en grados; en radianes 30° es π/6. Y sin 60° no es 2 × sin 30°: doblar el ángulo no duplica el seno.",
        "tag": ""
      },
      "pyid": {
        "name": "Identidades pitagóricas",
        "phrase": "sin² + cos² = 1. Divide entre cos² para 1 + tan² = sec². Divide entre sin² para 1 + cot² = cosec².",
        "also": "Es Pitágoras en un triángulo con hipotenusa 1.",
        "steps": [
          "En un triángulo con hipotenusa 1, los catetos son sin θ y cos θ.",
          "Pitágoras: sin²θ + cos²θ = 1.",
          "Divide cada término entre cos²θ: tan²θ + 1 = sec²θ.",
          "Divide cada término entre sin²θ: 1 + cot²θ = cosec²θ.",
          "Dada una razón, usa la identidad para hallar las demás."
        ],
        "exception": "sin²θ significa (sin θ)², no sin(θ²). sin θ + cos θ no es 1; solo los cuadrados suman 1. Raíz cuadrada da ±; ASTC elige el signo.",
        "tag": ""
      },
      "comp": {
        "name": "Ángulos complementarios",
        "phrase": "«Co» significa complemento: sin(90° − θ) = cos θ.",
        "also": "Cambia el nombre, cambia el ángulo: tan ↔ cot y sec ↔ cosec igual.",
        "steps": [
          "Dos ángulos que suman 90° son complementos.",
          "El lado opuesto a un ángulo agudo es adyacente al otro.",
          "Así sin(90° − θ) = cos θ y cos(90° − θ) = sin θ.",
          "Igual tan(90° − θ) = cot θ y sec(90° − θ) = cosec θ.",
          "Para sin 70° ÷ cos 20°, nota 70 + 20 = 90: arriba y abajo coinciden, vale 1."
        ],
        "exception": "Los ángulos deben sumar 90°, no 180°. sin 70° ÷ cos 70° es tan 70°, no 1. El cambio altera el nombre: sin(90° − θ) es cos θ, no sin θ.",
        "tag": ""
      },
      "heights": {
        "name": "Alturas y distancias",
        "phrase": "Elevación mira arriba, depresión abajo, y ambas desde la horizontal.",
        "also": "¿Altura y distancia horizontal? tan. ¿Escalera o cuerda inclinada? sin o cos.",
        "steps": [
          "Dibuja: suelo plano, altura vertical, ángulo recto en la base.",
          "Marca el ángulo en el ojo, medido desde la horizontal.",
          "Elige la razón (SOH CAH TOA) que une el lado conocido con el buscado.",
          "Resuelve con valores exactos: tan 30° = 1/√3, tan 45° = 1, tan 60° = √3."
        ],
        "exception": "El ángulo de depresión se mide abajo desde la horizontal arriba, no desde la pared. Iguala al de elevación desde el suelo (ángulos Z). Si dan altura del ojo, súmala al final.",
        "tag": ""
      },
      "central": {
        "name": "Ángulo en el centro",
        "phrase": "El ángulo central es el doble del del arco.",
        "also": "Ángulos en el mismo arco son iguales.",
        "steps": [
          "Comprueba que ambos ángulos abarcan el mismo arco.",
          "Ángulo central = 2 × ángulo en el arco.",
          "Ángulo en el arco = ángulo central ÷ 2."
        ],
        "exception": "Ambos ángulos deben usar los mismos extremos en el círculo. Otro arco da otro ángulo.",
        "tag": ""
      },
      "cyclic": {
        "name": "Cuadrilátero cíclico",
        "phrase": "Ángulos opuestos en un círculo suman 180°.",
        "also": "",
        "steps": [
          "Comprueba que las cuatro esquinas están en el círculo.",
          "Elige un par de opuestos.",
          "180° menos uno da el otro."
        ],
        "exception": "Si una esquina no está en el círculo, falla. Esquinas vecinas no tienen que sumar 180°.",
        "tag": ""
      },
      "chord": {
        "name": "Cuerda desde el centro",
        "phrase": "Una recta del centro que golpea una cuerda en 90° la parte por la mitad.",
        "also": "",
        "steps": [
          "Baja perpendicular del centro a la cuerda.",
          "Cae en el punto medio de la cuerda.",
          "Radio, recta del centro y mitad de cuerda forman triángulo recto."
        ],
        "exception": "La recta debe salir del centro. Una perpendicular desde otro punto no parte la cuerda por la mitad.",
        "tag": ""
      },
      "twotang": {
        "name": "Dos tangentes desde un punto",
        "phrase": "Dos tangentes desde el mismo punto exterior son iguales.",
        "also": "",
        "steps": [
          "Marca los dos puntos de contacto.",
          "Las longitudes tangentes desde el punto exterior son iguales.",
          "La recta del centro al punto exterior bisecta el ángulo."
        ],
        "exception": "Las longitudes iguales son los segmentos tangentes, no las cuerdas entre contactos. Una secante es otro teorema.",
        "tag": ""
      },
      "altseg": {
        "name": "Teorema del segmento alterno",
        "phrase": "El ángulo entre tangente y cuerda iguala al del segmento alterno.",
        "also": "",
        "steps": [
          "Hallar el ángulo entre la tangente y una cuerda.",
          "Mira al otro lado de la cuerda (segmento alterno).",
          "El ángulo en el arco allí coincide."
        ],
        "exception": "«Alterno» es el segmento al otro lado de la cuerda, no el adyacente. La tangente debe tocar en el extremo de la cuerda.",
        "tag": ""
      },
      "intchord": {
        "name": "Cuerdas que se cortan",
        "phrase": "Cuando dos cuerdas se cruzan, los productos de los trozos son iguales.",
        "also": "",
        "steps": [
          "Etiqueta los cuatro trozos.",
          "Escribe (trozo₁ × trozo₂) en una cuerda = (trozo₃ × trozo₄) en la otra.",
          "Resuelve el trozo que falta."
        ],
        "exception": "Usa los dos trozos de la misma cuerda en cada producto. No multipliques extremos de cuerdas distintas como pareja.",
        "tag": ""
      },
      "tansec": {
        "name": "Teorema tangente-secante",
        "phrase": "Tangent² = exterior × toda la secante.",
        "also": "",
        "steps": [
          "Desde el punto exterior, una recta es tangente, la otra corta el círculo (secante).",
          "Eleva al cuadrado la longitud tangente.",
          "Eso iguala (trozo exterior de secante) × (secante entera)."
        ],
        "exception": "Toda significa el segmento secante completo desde el punto exterior hasta el lado lejano — no solo la cuerda interior.",
        "tag": ""
      },
      "sameseg": {
        "name": "Ángulos en el mismo segmento",
        "phrase": "Ángulos en el mismo segmento sobre el mismo arco son iguales.",
        "also": "",
        "steps": [
          "Hallar el arco que abarcan ambos ángulos.",
          "Si ambos están en el mismo segmento, son iguales.",
          "Úsalo para completar ángulos en el arco."
        ],
        "exception": "Ángulos en segmentos opuestos no son iguales (a menudo suman 180° en un cíclico). El mismo arco importa.",
        "tag": ""
      },
      "ap": {
        "name": "Progresiones aritméticas",
        "phrase": "Cada término suma la misma d: aₙ = a + (n − 1)d. Suma = n/2 × (primero + último).",
        "also": "",
        "steps": [
          "a es el primer término, d la diferencia común.",
          "Término n: a + (n − 1)d.",
          "Suma de n términos: n/2 × (primero + último), o n/2 × (2a + (n − 1)d)."
        ],
        "exception": "n cuenta cuántos términos, no solo el último índice. Las geométricas multiplican por una razón — fórmulas distintas.",
        "tag": ""
      },
      "gp": {
        "name": "Progresiones geométricas",
        "phrase": "Cada término multiplica por la misma razón r: aₙ = a · rⁿ⁻¹.",
        "also": "",
        "steps": [
          "a es el primer término, r la razón común.",
          "Término n: a × rⁿ⁻¹.",
          "Divide un término entre el anterior para hallar r."
        ],
        "exception": "Si r es negativo, los signos alternan. No mezcles fórmulas AP (sumar d) con GP (multiplicar por r).",
        "tag": ""
      },
      "sector": {
        "name": "Longitud de arco y área de sector",
        "phrase": "Un sector es una porción de pizza: θ/360 del círculo entero.",
        "also": "",
        "steps": [
          "Longitud de arco = (θ/360) × 2πr = (θ/360) × πd.",
          "Área de sector = (θ/360) × πr².",
          "Usa π ≈ 3,14, o deja en términos de π si piden."
        ],
        "exception": "θ debe estar en grados para la forma θ/360. Usar el radio en longitud de arco sin la fracción da toda la circunferencia.",
        "tag": ""
      },
      "sine-is-y": {
        "name": "Coordenadas del círculo unitario",
        "phrase": "En el círculo unitario: coseno es x, seno es y.",
        "also": "Punto (cos θ, sin θ) — x luego y; cos↔x, sin↔y.",
        "steps": [
          "Sitúa el ángulo en el círculo unitario.",
          "Lee el punto como (cos θ, sin θ).",
          "Coordenada x es coseno; y es seno."
        ],
        "exception": "No intercambies x/y. Los signos siguen el cuadrante. Iguala el modo de la calculadora al problema.",
        "tag": ""
      },
      "sohcahtoa": {
        "name": "Canto SOH CAH TOA",
        "phrase": "SOH CAH TOA: seno opp/hyp, coseno adj/hyp, tangente opp/adj.",
        "also": "Some Old Horse Came A-Hopping Through Our Alley.",
        "steps": [
          "Etiqueta opuesto, adyacente, hipotenusa desde θ.",
          "Elige SOH, CAH o TOA.",
          "Escribe la razón y resuelve."
        ],
        "exception": "La hipotenusa es siempre el lado más largo, opuesta al ángulo recto — nunca opuesta a θ.",
        "tag": ""
      },
      "astc10": {
        "name": "All Students Take Calculus",
        "phrase": "ASTC: All, Sin, Tan, Cos — cuáles son positivas, cuadrante a cuadrante.",
        "also": "All Students Take Calculus (antihorario desde QI).",
        "steps": [
          "QI: todas positivas.",
          "QII: Sin (y cosec) positivo.",
          "QIII: Tan (y cot) positivo.",
          "QIV: Cos (y sec) positivo."
        ],
        "exception": "ASTC nombra las positivas; las demás son negativas en ese cuadrante.",
        "tag": ""
      },
      "wordkeys10": {
        "name": "Problemas de palabras trig",
        "phrase": "Elevación mira arriba, depresión abajo — ambas desde la horizontal.",
        "also": "",
        "steps": [
          "Esquematiza el triángulo rectángulo.",
          "Marca ángulo de elevación/depresión.",
          "Usa SOHCAHTOA para el lado o ángulo que falta."
        ],
        "exception": "Ángulo de depresión desde arriba iguala elevación desde abajo (ángulos alternos internos).",
        "tag": ""
      },
      "arith10": {
        "name": "Aritmética con valores exactos",
        "phrase": "Mantén surds ordenados: multiplica, luego simplifica la raíz.",
        "also": "",
        "steps": [
          "Escribe valores exactos (√2, √3, 1/2…).",
          "Multiplica o divide fracciones.",
          "Simplifica surds."
        ],
        "exception": "No sustituyas √2 por 1,4 en preguntas de valor exacto.",
        "tag": ""
      },
      "recip10": {
        "name": "Nombres trig recíprocos",
        "phrase": "Co-recíprocas: cosec invierte sin, sec invierte cos, cot invierte tan.",
        "also": "",
        "steps": [
          "cosec θ = 1/sin θ.",
          "sec θ = 1/cos θ.",
          "cot θ = 1/tan θ."
        ],
        "exception": "sec no es 1/sin — ese error es clásico.",
        "tag": ""
      },
      "estimate10": {
        "name": "Estimar lados trig",
        "phrase": "Comprobación rápida: en θ agudo, el opuesto es más corto que la hipotenusa.",
        "also": "",
        "steps": [
          "Dibuja y etiqueta.",
          "Pregunta si la respuesta puede superar la hipotenusa.",
          "Usa SOHCAHTOA y haz sentido común."
        ],
        "exception": "Seno y coseno de un ángulo agudo están siempre entre 0 y 1.",
        "tag": ""
      },
      "commute10": {
        "name": "Reordenar razones",
        "phrase": "Si sin θ = opp/hyp, entonces opp = hyp × sin θ — multiplica ambos lados.",
        "also": "",
        "steps": [
          "Parte de la definición de la razón.",
          "Multiplica ambos lados por el denominador.",
          "Resuelve el lado desconocido."
        ],
        "exception": "Mantén las etiquetas opp/adj de θ consistentes con el ángulo que marcaste.",
        "tag": ""
      },
      "distrib10": {
        "name": "Expandir paréntesis trig",
        "phrase": "Distribuye constantes en expresiones trig como en álgebra.",
        "also": "",
        "steps": [
          "Multiplica la constante en cada término.",
          "Conserva etiquetas sin/cos.",
          "Simplifica números."
        ],
        "exception": "sin(2θ) no es 2 sin θ — es otra identidad.",
        "tag": ""
      },
      "cast10": {
        "name": "CAST vs ASTC",
        "phrase": "CAST empieza en QIV; ASTC en QI — mismas positivas, distinto inicio.",
        "also": "",
        "steps": [
          "Prefiere un mnemónico y mantenlo.",
          "ASTC: All-Sin-Tan-Cos desde QI antihorario.",
          "Comprueba un ángulo conocido (p. ej. 120°)."
        ],
        "exception": "No mezcles orden CAST con inicio ASTC a mitad de problema.",
        "tag": ""
      },
      "mental10": {
        "name": "Mental 3-4-5 y 5-12-13",
        "phrase": "Memoriza las ternas rectas famosas — aceleran razones trig.",
        "also": "",
        "steps": [
          "Detecta 3-4-5 o 5-12-13 (o múltiplos).",
          "Escribe sin/cos/tan desde los lados.",
          "Escala ternas por el mismo factor."
        ],
        "exception": "6-8-10 es 3-4-5 ×2 — reduce antes de leer la razón si quieres forma simple.",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Trig del triángulo rectángulo",
        "rows": [
          [
            "SOH CAH TOA",
            "sin opp/hyp; cos adj/hyp; tan opp/adj"
          ],
          [
            "Recíprocas",
            "cosec↔sin, sec↔cos, cot↔tan"
          ],
          [
            "ASTC / CAST",
            "ASTC desde QI: All→Sin→Tan→Cos; no mezclar con inicio CAST"
          ],
          [
            "Ángulos especiales",
            "0,1,2,3,4 → ÷4 → √ = sin; cos al revés"
          ],
          [
            "Ternas mano",
            "Usa 3-4-5 y primas para razones exactas"
          ],
          [
            "Seno es y",
            "En el círculo unitario, sin θ = coordenada y"
          ],
          [
            "Alturas",
            "Elevación arriba, depresión abajo desde horizontal"
          ]
        ]
      },
      {
        "title": "Teoremas del círculo",
        "rows": [
          [
            "Centro vs arco",
            "Ángulo central = 2 × ángulo en arco (mismo arco)"
          ],
          [
            "Cíclico",
            "Ángulos opuestos suman 180°"
          ],
          [
            "Cuerda desde centro",
            "⊥ desde centro bisecta la cuerda"
          ],
          [
            "Dos tangentes",
            "Desde un punto exterior: longitudes iguales"
          ],
          [
            "Segmento alterno",
            "Ángulo tangente–cuerda = ángulo en seg. alterno"
          ],
          [
            "Mismo segmento",
            "Ángulos en el mismo arco son iguales"
          ],
          [
            "Cuerdas que se cortan",
            "Productos de trozos iguales"
          ],
          [
            "Tangente–secante",
            "tangente² = exterior × secante entera"
          ]
        ]
      },
      {
        "title": "Sucesiones y sectores",
        "rows": [
          [
            "PA",
            "aₙ = a+(n−1)d; suma = n/2(primero+último)"
          ],
          [
            "PG",
            "aₙ = a·rⁿ⁻¹"
          ],
          [
            "Sector / arco",
            "θ/360 del círculo entero"
          ],
          [
            "Identidad pitagórica",
            "sin²θ + cos²θ = 1"
          ],
          [
            "Trig complementaria",
            "sin(90°−θ) = cos θ"
          ]
        ]
      }
    ]
  },
  "hs": {
    "grade": "Secundaria",
    "title": "Teoremas y demostraciones",
    "blurb": "Mnemónicos SEE send-up y tarjetas de teoremas: movimientos de prueba, excepciones y ejercicios tipo examen en geo + trig.",
    "lessons": {
      "heron": {
        "name": "Fórmula de Herón",
        "phrase": "s = (a+b+c)/2. Área = √[s(s−a)(s−b)(s−c)].",
        "also": "Semiperímetro primero — luego el producto bajo la raíz.",
        "steps": [
          "Suma los tres lados y divide entre dos: s = (a+b+c)/2.",
          "Escribe s−a, s−b, s−c.",
          "Área = √[s(s−a)(s−b)(s−c)]. Toma la raíz positiva."
        ],
        "exception": "Los lados deben formar un triángulo (desigualdad triangular). s es la mitad del perímetro, no el área. No omitas la raíz.",
        "tag": "SEE"
      },
      "compound": {
        "name": "Interés compuesto / depreciación / población",
        "phrase": "Crecer: A = P(1 + r/100)^n. Depreciar: A = P(1 − r/100)^n.",
        "also": "Población e interés compuesto comparten la forma de crecimiento.",
        "steps": [
          "Escribe P (inicio), r% por período, n períodos.",
          "Crecimiento / compuesto / población: multiplica por (1 + r/100) cada período.",
          "Depreciación / decaimiento: multiplica por (1 − r/100) cada período.",
          "Eleva a n, luego multiplica por P."
        ],
        "exception": "Interés simple es I = Prt/100; monto simple P + Prt/100 — sin potencia. Compuesto usa (1±r/100)^n. Depreciación usa menos, no más. n es el número de períodos de capitalización, no siempre años calendario si capitaliza semestralmente.",
        "tag": "SEE"
      },
      "grouped": {
        "name": "Media / mediana / cuartil agrupados",
        "phrase": "Media: Σfm / Σf. Mediana y cuartiles: L + ((N/k − cf)/f)·h.",
        "also": "Para mediana k=2 (N/2); para Q₁ usa N/4; para Q₃ usa 3N/4.",
        "steps": [
          "Hallar frecuencia total N = Σf.",
          "Media: puntos medios × frecuencias, suma, divide entre N.",
          "Clase mediana: primera clase cuya frecuencia acumulada llega a N/2.",
          "Mediana = L + ((N/2 − cf)/f)·h. Cuartiles cambian N/2 por N/4 o 3N/4."
        ],
        "exception": "L es el límite inferior de la clase mediana/cuartil; cf es frecuencia acumulada antes de esa clase; f y h pertenecen solo a esa clase. No uses atajos de mediana en listas crudas en tablas agrupadas.",
        "tag": "SEE"
      },
      "ages": {
        "name": "Edades después de n años",
        "phrase": "Tras n años, cada edad gana n. Reescribe la relación con +n en cada persona.",
        "also": "",
        "steps": [
          "Deja las edades presentes como variables (o usa números dados).",
          "Tras n años: suma n a cada edad del enunciado.",
          "Escribe la ecuación con las nuevas edades y resuelve el presente."
        ],
        "exception": "«Hace n años» resta n. No sumes n solo a una persona. Razones tras n años usan (edad+n), no edad×n.",
        "tag": "SEE"
      },
      "sets": {
        "name": "Conjuntos y Venn (SEE)",
        "phrase": "n(A∪B)=n(A)+n(B)−n(A∩B). Solo A = n(A)−n(A∩B).",
        "also": "Ni uno ni otro = total − n(A∪B).",
        "steps": [
          "Dibuja dos círculos; etiqueta solo A, ambos, solo B, ni uno ni otro.",
          "Ambos = n(A∩B). Solo A = n(A) − ambos.",
          "Unión = solo A + ambos + solo B = n(A)+n(B)−ambos.",
          "Ni uno ni otro = total de encuesta − unión."
        ],
        "exception": "n(A) ya incluye la intersección — no sumes n(A∩B) otra vez al formar la unión. «Solo A» no es n(A).",
        "tag": "SEE"
      },
      "money": {
        "name": "Divisa / comisión / IVA",
        "phrase": "Porcentaje de la base indicada. Divisa: × tasa. Comisión/IVA: % del monto.",
        "also": "",
        "steps": [
          "Nombra la base: precio etiquetado, precio de venta o monto de cambio.",
          "Divisa: multiplica o divide por la tasa dada.",
          "Comisión o IVA: monto × tasa/100.",
          "Precio con IVA: monto × (1 + tasa/100)."
        ],
        "exception": "Revertir IVA inclusivo usa ÷(1+r/100), no ×(1−r/100). La comisión suele ser sobre ventas, no sobre ganancia salvo que digan.",
        "tag": "SEE"
      },
      "menspack": {
        "name": "Prisma / pirámide / empaque",
        "phrase": "Prisma: V = Bh. Pirámide: V = (1/3)Bh. Empaque: total ÷ una unidad.",
        "also": "",
        "steps": [
          "Prisma / ortoedro: área de base × altura.",
          "Pirámide / idea de cono: un tercio del área de base × altura.",
          "Ladrillo / empaque: volumen de muro o caja ÷ volumen de una unidad (mira huecos de mortero si dan)."
        ],
        "exception": "La pirámide necesita el 1/3 — olvidarlo triplica el volumen. Empaque cuenta unidades enteras; el espacio sobrante no es un ladrillo extra salvo que digan.",
        "tag": "SEE"
      },
      "probtree": {
        "name": "Árboles de probabilidad",
        "phrase": "Multiplica a lo largo de una rama. Suma caminos distintos. Sin reemplazo: cambia la segunda fracción.",
        "also": "",
        "steps": [
          "Dibuja las ramas de la primera etapa con sus probabilidades.",
          "Desde cada resultado, dibuja la siguiente etapa (actualiza si sin reemplazo).",
          "Un camino completo: multiplica las fracciones de ese camino.",
          "«O» entre caminos: suma las probabilidades de camino."
        ],
        "exception": "Con reemplazo el segundo sorteo sigue igual; sin reemplazo bajan los totales. No sumes probabilidades que están en el mismo camino.",
        "tag": "SEE"
      },
      "pythag": {
        "name": "Pitágoras",
        "phrase": "Catetos al cuadrado suman hipotenusa al cuadrado: a² + b² = c².",
        "also": "",
        "steps": [
          "Confirma el ángulo recto; c es el lado opuesto.",
          "Escribe a² + b² = c².",
          "Resuelve el lado que falta (raíz al final)."
        ],
        "exception": "Solo triángulos rectángulos. c debe ser el lado más largo. Recíproco: si a²+b²=c², el ángulo entre a y b es 90°.",
        "tag": "Geo"
      },
      "bpt": {
        "name": "Proporcionalidad básica (BPT)",
        "phrase": "Una recta paralela a un lado corta los otros dos en la misma razón.",
        "also": "",
        "steps": [
          "Confirma que el corte es paralelo al tercer lado.",
          "Escribe AD/DB = AE/EC (o la forma de lado completo AD/AB = AE/AC).",
          "Haz regla de tres y resuelve."
        ],
        "exception": "Se requiere paralelismo — una transversal cualquiera no da razones iguales. Empareja segmentos correspondientes en cada lado.",
        "tag": "Geo"
      },
      "midseg": {
        "name": "Teorema de la mediana",
        "phrase": "Une los puntos medios: la mediana es paralela al tercer lado y mide la mitad.",
        "also": "",
        "steps": [
          "Marca puntos medios de dos lados.",
          "El segmento que los une ∥ el tercer lado.",
          "Longitud = mitad de ese tercer lado."
        ],
        "exception": "Ambos extremos deben ser puntos medios. Mitad de la base — no igual a la base.",
        "tag": "Geo"
      },
      "similar": {
        "name": "Semejanza AAA",
        "phrase": "AAA: ángulos que coinciden → triángulos semejantes → lados con un factor de escala.",
        "also": "",
        "steps": [
          "Muestra tres ángulos iguales (dos suelen implicar el tercero).",
          "Escribe lados correspondientes en el mismo orden.",
          "Monta una proporción con un factor de escala y resuelve."
        ],
        "exception": "AAA da semejanza, no congruencia (SSS/SAS/ASA/RHS). Mantén correspondencia: el lado mayor enfrenta al ángulo mayor.",
        "tag": "Geo"
      },
      "bisector": {
        "name": "Teorema de la bisectriz",
        "phrase": "La bisectriz corta el lado opuesto en la razón de los lados adyacentes.",
        "also": "",
        "steps": [
          "Confirma que el rayo bisecta el ángulo.",
          "Escribe (lado)/(lado) = (segmento)/(segmento).",
          "Regla de tres."
        ],
        "exception": "Parte el lado opuesto — no la longitud propia de la bisectriz. La razón usa los dos lados del ángulo.",
        "tag": "Geo"
      },
      "central": {
        "name": "Centro = 2 × arco",
        "phrase": "El ángulo en el centro es el doble del del arco en el mismo arco.",
        "also": "",
        "steps": [
          "Identifica el arco compartido.",
          "Ángulo central = 2 × ángulo en el arco (mismo arco).",
          "Resuelve la incógnita."
        ],
        "exception": "Ambos ángulos deben apoyarse en el mismo arco. El ángulo en el arco mayor es distinto. El centro está en el centro del círculo, no en cualquier punto interior.",
        "tag": "Geo"
      },
      "cyclic": {
        "name": "Ángulos opuestos cíclicos",
        "phrase": "Un cuadrilátero es cíclico iff los opuestos suman 180°.",
        "also": "",
        "steps": [
          "Detecta un cuadrilátero cíclico (vértices en un círculo).",
          "Opuestos: A + C = 180°, B + D = 180°.",
          "Resuelve el ángulo desconocido."
        ],
        "exception": "Los adyacentes no están forzados a 180° (sería caso trapezoide con paralelos). Ángulo interior ≠ exterior salvo que digan.",
        "tag": "Geo"
      },
      "tangent": {
        "name": "Tangente ⊥ radio",
        "phrase": "La tangente encuentra al radio en el punto de contacto en 90°.",
        "also": "",
        "steps": [
          "Marca el punto de contacto T.",
          "Radio OT ⊥ tangente.",
          "Usa herramientas de triángulo recto (Pitágoras / trig) en OTP."
        ],
        "exception": "Perpendicular solo en el contacto — una recta de O a otro punto de la tangente no es radio. Dos tangentes desde un punto son iguales (teorema aparte).",
        "tag": "Geo"
      },
      "altseg": {
        "name": "Segmento alterno",
        "phrase": "Ángulo tangente–cuerda iguala al del segmento alterno.",
        "also": "",
        "steps": [
          "Hallar el ángulo entre tangente y cuerda.",
          "Mira el segmento al otro lado de la cuerda.",
          "Ese ángulo en el arco coincide."
        ],
        "exception": "«Alterno» es el otro segmento, no el adyacente. La tangente debe tocar en un extremo de la cuerda.",
        "tag": "Geo"
      },
      "eqtang": {
        "name": "Tangentes iguales",
        "phrase": "Dos tangentes desde un punto exterior tienen la misma longitud.",
        "also": "",
        "steps": [
          "Desde P, las tangentes tocan en A y B.",
          "PA = PB.",
          "Triángulos OAP y OBP son congruentes (radios ⊥ tangentes)."
        ],
        "exception": "Iguales solo si ambas tangentes salen del mismo punto exterior. Longitudes de cuerda es otra historia.",
        "tag": "Geo"
      },
      "chord": {
        "name": "Cuerda ⊥ desde el centro",
        "phrase": "La perpendicular del centro a una cuerda la bisecta.",
        "also": "",
        "steps": [
          "Baja perpendicular de O a cuerda AB en M.",
          "M es el punto medio: AM = MB.",
          "En triángulo recto OMA: r² = d² + (mitad de cuerda)²."
        ],
        "exception": "La propiedad de bisector necesita la perpendicular (o al revés: recta del centro al punto medio es ⊥). La cuerda entera es el doble de la mitad.",
        "tag": "Geo"
      },
      "exterior": {
        "name": "Ángulo exterior",
        "phrase": "El ángulo exterior de un triángulo iguala la suma de los dos interiores alejados.",
        "also": "",
        "steps": [
          "Prolonga un lado para formar el ángulo exterior.",
          "Exterior = suma de los dos interiores remotos.",
          "O: exterior = 180° − interior adyacente."
        ],
        "exception": "Usa los dos ángulos lejanos — no el interior adyacente. Suma exterior 360° en polígonos es otro teorema.",
        "tag": "Geo"
      },
      "sohcahtoa": {
        "name": "SOH CAH TOA",
        "phrase": "SOH CAH TOA: seno opp/hyp, coseno adj/hyp, tangente opp/adj.",
        "also": "",
        "steps": [
          "Marca el ángulo; etiqueta opuesto, adyacente, hipotenusa.",
          "Elige la razón que usa los lados que conoces / necesitas.",
          "Resuelve; conserva valores exactos si el ángulo es especial."
        ],
        "exception": "La hipotenusa nunca es opuesto ni adyacente en los nombres de razón. Triángulos oblicuos necesitan reglas seno/coseno — no solo SOHCAHTOA.",
        "tag": "Trig"
      },
      "astc": {
        "name": "Signos ASTC",
        "phrase": "All Sugar Tea Coffee: all → sin → tan → cos positivos, en sentido antihorario.",
        "also": "",
        "steps": [
          "Reduce a un ángulo de referencia en [0°, 90°].",
          "Hallar el cuadrante del ángulo original.",
          "Aplica ASTC para el signo; conserva el valor de referencia."
        ],
        "exception": "ASTC trata de signos, no magnitudes. Cot/sec/cosec siguen a sus parejas (tan/cos/sin).",
        "tag": "Trig"
      },
      "hand": {
        "name": "Mano de ángulos especiales",
        "phrase": "Truco del puño: sin = √(dedos antes)/2; cos = √(dedos después)/2.",
        "also": "",
        "steps": [
          "Cinco dedos para 0°, 30°, 45°, 60°, 90°.",
          "Cuenta dedos cerrados antes del ángulo para seno; después para coseno.",
          "tan = sin/cos; cuidado 90° (tan indefinido)."
        ],
        "exception": "Esto construye solo la tabla aguda. Otros ángulos necesitan ASTC + referencia. tan 90° no existe.",
        "tag": "Trig"
      },
      "pyid": {
        "name": "Identidad pitagórica",
        "phrase": "sin²θ + cos²θ = 1. Divide entre cos² → 1 + tan²θ = sec²θ.",
        "also": "",
        "steps": [
          "Parte de sin² + cos² = 1.",
          "Dada una razón, aísla el cuadrado de la otra.",
          "Raíz con ±; ASTC elige el signo."
        ],
        "exception": "sin²θ significa (sin θ)². sin+cos no es 1. Dividir entre cos² falla donde cos = 0.",
        "tag": "Trig"
      },
      "sinerule": {
        "name": "Regla del seno",
        "phrase": "a/sin A = b/sin B = c/sin C.",
        "also": "",
        "steps": [
          "Etiqueta lado a opuesto a A, etc.",
          "Úsala cuando conoces un lado y su ángulo opuesto, más otro dato.",
          "Regla de tres; en SSA comprueba el caso ambiguo."
        ],
        "exception": "SSA puede dar dos triángulos. Ángulos SAS / SSS necesitan regla del coseno.",
        "tag": "Trig"
      },
      "cosrule": {
        "name": "Regla del coseno",
        "phrase": "a² = b² + c² − 2bc cos A. (Pitágoras con corrección de coseno.)",
        "also": "",
        "steps": [
          "Úsala para SAS (dos lados + ángulo incluido) o SSS (tres lados → ángulo).",
          "Lado: a² = b² + c² − 2bc cos A, luego raíz.",
          "Ángulo: cos A = (b² + c² − a²)/(2bc)."
        ],
        "exception": "A debe estar entre b y c. A obtuso hace cos negativo y a crece. A 90° colapsa a Pitágoras.",
        "tag": "Trig"
      },
      "compoundang": {
        "name": "Ángulo compuesto sin(A±B)",
        "phrase": "sin cos cos sin, signo se queda: sin(A±B)=sin A cos B ± cos A sin B.",
        "also": "",
        "steps": [
          "Escribe sin(A±B) = sin A cos B ± cos A sin B.",
          "Rellena cada factor; conserva fracciones / surds exactos.",
          "Para cos(A±B): cos cos ∓ sin sin (signo cambia)."
        ],
        "exception": "sin(A+B) ≠ sin A + sin B. El coseno invierte el signo del medio. Comprueba cuadrante al expandir ángulos numéricos.",
        "tag": "Trig"
      },
      "areasine": {
        "name": "Área ½ab sin C",
        "phrase": "Área = ½ab sin C — mitad de dos lados por el seno del ángulo incluido.",
        "also": "",
        "steps": [
          "Identifica el ángulo incluido entre los dos lados.",
          "Escribe Área = ½ab sin C.",
          "Usa sin exacto para ángulos especiales."
        ],
        "exception": "C debe ser el ángulo entre a y b. En paralelogramo quita el ½. Seno obtuso sigue positivo.",
        "tag": "Trig"
      }
    },
    "cheat": [
      {
        "title": "Ganchos SEE Grupo A",
        "rows": [
          [
            "Herón",
            "s = (a+b+c)/2; Área = √[s(s−a)(s−b)(s−c)]"
          ],
          [
            "Depreciación",
            "A = P(1 − r/100)^n"
          ],
          [
            "Compuesto / población",
            "A = P(1 + r/100)^n"
          ],
          [
            "Edades tras n",
            "Suma n a cada edad; escribe la ecuación nueva"
          ],
          [
            "Clase cuartil",
            "L + ((N/4 − cf)/f)·h  (misma forma mediana con N/2)"
          ]
        ]
      },
      {
        "title": "Teoremas geo y trig",
        "rows": [
          [
            "Pitágoras",
            "a² + b² = c² (triángulo recto)"
          ],
          [
            "BPT",
            "Corte paralelo → mismas razones en lados"
          ],
          [
            "Mediana",
            "Une medios → mitad base, paralela"
          ],
          [
            "Centro / arco",
            "Ángulo en centro = 2 × ángulo en arco"
          ],
          [
            "Cíclico op",
            "Opuestos suman 180°"
          ],
          [
            "Tangente ⊥ radio",
            "Radio encuentra tangente en 90°"
          ],
          [
            "Seg. alterno",
            "Tangente–cuerda = ángulo en segmento alterno"
          ],
          [
            "SOH CAH TOA",
            "opp/hyp · adj/hyp · opp/adj"
          ],
          [
            "ASTC",
            "All Sugar Tea Coffee (signos por cuadrante)"
          ],
          [
            "Regla del seno",
            "a/sin A = b/sin B = c/sin C"
          ],
          [
            "Regla del coseno",
            "a² = b² + c² − 2bc cos A"
          ],
          [
            "Área (seno)",
            "½ab sin C"
          ],
          [
            "Alturas y distancias",
            "Usa g10 · Heights (elevación / depresión) — no duplicado aquí"
          ]
        ]
      },
      {
        "title": "SEE Grupos B–D rápido",
        "rows": [
          [
            "Conjuntos",
            "n(A∪B)=n(A)+n(B)−n(A∩B); solo A = n(A)−n(A∩B)"
          ],
          [
            "IVA / comisión",
            "% de etiqueta o venta; comprueba de qué"
          ],
          [
            "Divisa",
            "× tasa para convertir; % cambio en la tasa"
          ],
          [
            "Pirámide",
            "V = (1/3)Bh"
          ],
          [
            "Árbol P",
            "Multiplica en rama; suma caminos mutuamente excluyentes"
          ]
        ]
      },
      {
        "title": "Más ganchos SEE",
        "rows": [
          [
            "Datos agrupados",
            "Media en tabla: Σfx ÷ Σf"
          ],
          [
            "Paquete mensuration",
            "Empareja sólido con fórmula: prisma, cilindro, cono, esfera"
          ],
          [
            "Tangentes iguales",
            "Dos tangentes desde un punto: longitudes iguales"
          ],
          [
            "Ángulo exterior",
            "Exterior = suma de interiores lejanos"
          ],
          [
            "Prueba semejanza",
            "AA: dos ángulos iguales → semejantes"
          ],
          [
            "Ángulos compuestos",
            "Expande con fórmulas suma sin/cos"
          ],
          [
            "nPr",
            "Orden importa: n! / (n−r)!"
          ],
          [
            "nCr",
            "Orden no: n! / (r!(n−r)!)"
          ]
        ]
      }
    ]
  },
  "trig2": {
    "grade": "Grados 11–12",
    "title": "Trigonometría avanzada",
    "blurb": "Radianes, cualquier ángulo, reglas del seno y coseno, ángulos compuestos y ecuaciones trigonométricas.",
    "lessons": {
      "rad": {
        "name": "Radianes y longitud de arco",
        "phrase": "π es 180°. A radianes: × π/180. A grados: × 180/π.",
        "also": "Arco = radio × ángulo: s = rθ, con θ en radianes.",
        "steps": [
          "Recuerda un dato: π radianes = 180°.",
          "Grados a radianes: multiplica por π/180. 60° = 60π/180 = π/3.",
          "Radianes a grados: cambia π por 180°. 3π/4 = 3 × 180° ÷ 4 = 135°.",
          "Longitud de arco s = rθ y área de sector = ½r²θ, con θ en radianes."
        ],
        "exception": "s = rθ solo funciona con θ en radianes. Revisa el modo de la calculadora: sin 30 en modo radianes no es 1/2. Un radián es unos 57,3°, no 1°.",
        "tag": ""
      },
      "allied": {
        "name": "Ángulos aliados",
        "phrase": "Un múltiplo impar de 90° intercambia sin ↔ cos. ASTC decide el signo.",
        "also": "180° y 360° conservan el nombre. 90° y 270° lo cambian.",
        "steps": [
          "Escribe el ángulo como 90°, 180°, 270° o 360° más o menos θ.",
          "180° o 360° (múltiplos pares de 90°): conserva el nombre.",
          "90° o 270° (múltiplos impares): intercambia sin ↔ cos y tan ↔ cot.",
          "Imagina θ pequeño para ver en qué cuadrante caes.",
          "ASTC da el signo de la función original en ese cuadrante."
        ],
        "exception": "El signo viene de la función original en el cuadrante nuevo, no del nombre nuevo. cos(90° + θ) = −sin θ porque cos es negativo en el II. Además, sin(−θ) = −sin θ pero cos(−θ) = cos θ.",
        "tag": ""
      },
      "sine": {
        "name": "Regla del seno",
        "phrase": "Cada lado entre el seno del ángulo que enfrenta: a/sin A = b/sin B = c/sin C.",
        "also": "La letra minúscula enfrenta a la mayúscula.",
        "steps": [
          "Etiqueta: el lado a enfrenta al ángulo A, b a B, c a C.",
          "Úsala cuando conoces un lado y el ángulo que enfrenta, más otro lado o ángulo.",
          "Escribe las dos fracciones que necesitas y haz la proporción.",
          "Para un ángulo: sin B = b sin A ÷ a. Luego comprueba si 180° − B también encaja."
        ],
        "exception": "El caso ambiguo: con dos lados y un ángulo que no está entre ellos (SSA), sin B da dos ángulos, B y 180° − B. Ambos valen si los ángulos siguen sumando menos de 180°. Si conoces dos lados y el ángulo entre ellos, usa la regla del coseno.",
        "tag": ""
      },
      "cosine": {
        "name": "Regla del coseno",
        "phrase": "Pitágoras con corrección: a² = b² + c² − 2bc cos A.",
        "also": "Para un ángulo, al revés: cos A = (b² + c² − a²) ÷ 2bc.",
        "steps": [
          "Úsala con dos lados y el ángulo entre ellos (para hallar el tercer lado).",
          "O con tres lados (para hallar un ángulo).",
          "Lado: a² = b² + c² − 2bc cos A, luego saca la raíz.",
          "Ángulo: cos A = (b² + c² − a²) ÷ 2bc, luego cos⁻¹."
        ],
        "exception": "A debe ser el ángulo entre b y c. Si A es obtuso, cos A es negativo y a crece. Con A = 90°, la corrección es 0 y es Pitágoras puro. Calcula 2bc cos A antes de restar.",
        "tag": ""
      },
      "area": {
        "name": "Área con seno",
        "phrase": "La mitad de dos lados por el seno del ángulo entre ellos.",
        "also": "Área = ½ab sin C. En un paralelogramo, quita la mitad.",
        "steps": [
          "Elige dos lados que se encuentren en un ángulo conocido.",
          "Multiplica los dos lados.",
          "Multiplica por el seno del ángulo entre ellos.",
          "Divide entre dos."
        ],
        "exception": "El ángulo debe estar entre los dos lados que usas. Un ángulo obtuso vale: sin 150° = sin 30° = 1/2. Usa sin, no cos.",
        "tag": ""
      },
      "compound": {
        "name": "Ángulos compuestos",
        "phrase": "sin cos cos sin, el signo se queda. cos cos sin sin, el signo cambia.",
        "also": "tan(A + B) = (tan A + tan B) ÷ (1 − tan A tan B).",
        "steps": [
          "sin(A ± B) = sin A cos B ± cos A sin B.",
          "cos(A ± B) = cos A cos B ∓ sin A sin B.",
          "tan(A ± B) = (tan A ± tan B) ÷ (1 ∓ tan A tan B).",
          "Parte un ángulo incómodo en ángulos de tabla: 75° = 45° + 30°, 15° = 45° − 30°."
        ],
        "exception": "sin(A + B) no es sin A + sin B: sin 90° es 1, pero sin 60° + sin 30° es unos 1,37. En cos el signo se invierte: cos(A + B) lleva menos.",
        "tag": ""
      },
      "double": {
        "name": "Ángulos dobles",
        "phrase": "Doble el ángulo: sin 2A = 2 sin A cos A.",
        "also": "cos 2A tiene tres formas: cos²A − sin²A, 2cos²A − 1 y 1 − 2sin²A.",
        "steps": [
          "Pon B = A en las fórmulas compuestas.",
          "sin 2A = 2 sin A cos A.",
          "cos 2A = cos²A − sin²A = 2cos²A − 1 = 1 − 2sin²A.",
          "tan 2A = 2 tan A ÷ (1 − tan²A)."
        ],
        "exception": "sin 2A no es 2 sin A: sin 60° es √3/2, pero 2 sin 30° es 1. Elige la forma de cos 2A que encaje con lo que tienes: si solo tienes sin, usa 1 − 2sin²A.",
        "tag": ""
      },
      "equations": {
        "name": "Resolver ecuaciones trig",
        "phrase": "Hallar el ángulo de referencia; luego ASTC lo coloca.",
        "also": "I: θ. II: 180° − θ. III: 180° + θ. IV: 360° − θ.",
        "steps": [
          "Deja la razón sola, como sin θ = −1/2.",
          "Hallar el ángulo de referencia en la tabla, sin el signo: 30°.",
          "Usa ASTC para elegir cuadrantes con ese signo: sin negativo en III y IV.",
          "Colócalo: 180° + 30° = 210°, y 360° − 30° = 330°."
        ],
        "exception": "No te quedes con la única respuesta de la calculadora; la mayoría tienen dos entre 0° y 360°. sin θ = 2 no tiene solución, porque sin y cos están entre −1 y 1. Nunca dividas ambos lados entre sin θ o cos θ; pierdes soluciones donde valen 0. Factoriza.",
        "tag": ""
      },
      "prove": {
        "name": "Demostrar identidades",
        "phrase": "Trabaja el lado más feo; convierte todo a sin y cos.",
        "also": "Nunca cruces el =: reescribe un lado hasta que parezca el otro.",
        "steps": [
          "Elige el lado más enredado.",
          "Reescribe tan, cot, sec y cosec en sin y cos.",
          "Junta fracciones con un mismo denominador.",
          "Usa sin² + cos² = 1 para simplificar.",
          "Para cuando coincida con el otro lado."
        ],
        "exception": "No pases términos al otro lado del = ni hagas lo mismo en ambos lados; eso supone lo que quieres probar. Comprobar un ángulo no es demostración, pero un ángulo que falla sí refuta.",
        "tag": ""
      },
      "inverse": {
        "name": "Trig inversa",
        "phrase": "sin⁻¹ pregunta: ¿qué ángulo tiene este seno?",
        "also": "Rangos principales: sin⁻¹ y tan⁻¹ dan −90° a 90°. cos⁻¹ da 0° a 180°.",
        "steps": [
          "Lee sin⁻¹ x como «el ángulo cuyo seno es x».",
          "Hallar el ángulo de referencia en la tabla.",
          "Da la respuesta en el rango principal.",
          "sin⁻¹ y tan⁻¹: entradas negativas dan ángulos negativos. cos⁻¹: entradas negativas dan de 90° a 180°."
        ],
        "exception": "sin⁻¹x no es 1 ÷ sin x; eso es cosec x. sin⁻¹ 2 no existe, porque el seno no pasa de 1. cos⁻¹(−1/2) es 120°, no −60°: cos⁻¹ vive en 0° a 180°.",
        "tag": ""
      },
      "sohadv": {
        "name": "SOHCAHTOA sigue mandando",
        "phrase": "Incluso en trig avanzada, un triángulo rectángulo habla SOH CAH TOA.",
        "also": "",
        "steps": [
          "Baja una perpendicular si hace falta.",
          "Etiqueta opp/adj/hyp para el ángulo agudo.",
          "Lee la razón principal."
        ],
        "exception": "Triángulos oblicuos necesitan reglas del seno/coseno — no solo SOHCAHTOA.",
        "tag": ""
      },
      "astc2": {
        "name": "ASTC para ángulos aliados",
        "phrase": "All Students Take Calculus — fija el signo tras la reducción aliada.",
        "also": "",
        "steps": [
          "Reduce a un ángulo agudo relacionado.",
          "Pregunta en qué cuadrante está el ángulo original.",
          "Aplica ASTC para el signo."
        ],
        "exception": "Múltiplos impares de 90° pueden intercambiar sin ↔ cos — haz el cambio antes del signo.",
        "tag": ""
      },
      "wordkeys2": {
        "name": "Palabras del caso ambiguo",
        "phrase": "SSA es el caso ambiguo — dos triángulos, uno o ninguno.",
        "also": "",
        "steps": [
          "Detecta dos lados y un ángulo no incluido.",
          "Calcula la altura a sin A.",
          "Compara el lado opuesto con esa altura y con a."
        ],
        "exception": "Si el ángulo A es obtuso, la historia de «dos triángulos» cambia — comprueba con cuidado.",
        "tag": ""
      },
      "compound2": {
        "name": "Memoria de signos compuestos",
        "phrase": "sin cos cos sin, el signo se queda. cos cos sin sin, el signo cambia.",
        "also": "",
        "steps": [
          "Para sin(A±B): sin A cos B ± cos A sin B (signo se queda).",
          "Para cos(A±B): cos A cos B ∓ sin A sin B (signo cambia).",
          "Escribe con cuidado."
        ],
        "exception": "Las fórmulas de tan compuestas son distintas — no fuerces este canto en tan.",
        "tag": ""
      },
      "double2": {
        "name": "Paquete ángulo doble",
        "phrase": "sin 2A = 2 sin A cos A. cos 2A tiene tres disfraces.",
        "also": "",
        "steps": [
          "Seno doble: 2 sin cos.",
          "Coseno doble: cos²−sin², o 2cos²−1, o 1−2sin².",
          "Elige el disfraz que encaje con lo que sabes."
        ],
        "exception": "sin 2A no es sin² A.",
        "tag": ""
      },
      "arith2": {
        "name": "Aritmética con valores exactos",
        "phrase": "Construye ángulos mayores desde 30°, 45°, 60° con fórmulas compuestas.",
        "also": "",
        "steps": [
          "Escribe el ángulo como suma/resta de estándares.",
          "Aplica fórmulas compuestas.",
          "Simplifica valores exactos."
        ],
        "exception": "75° = 45°+30° vale; no inventes un estándar para 20°.",
        "tag": ""
      },
      "estimate2": {
        "name": "Acotar respuestas trig",
        "phrase": "Seno y coseno viven entre −1 y 1 — rechaza imposibles de la calculadora.",
        "also": "",
        "steps": [
          "Resuelve la ecuación.",
          "Comprueba que cada candidato está en rango.",
          "Usa ASTC para situar ángulos."
        ],
        "exception": "tan puede ser cualquier real — el límite −1…1 es solo para sin/cos (y dominios de sus recíprocas).",
        "tag": ""
      },
      "mental2": {
        "name": "Radianes mentales",
        "phrase": "π es 180°. La mitad es 90°, un tercio 60°, un cuarto 45°.",
        "also": "",
        "steps": [
          "Memoriza π ↔ 180°.",
          "Divide π para tener los amigos habituales.",
          "Convierte con ×180/π o ×π/180."
        ],
        "exception": "2π es un giro completo (360°), no 180°.",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Radianes y cualquier ángulo",
        "rows": [
          [
            "π = 180°",
            "A rad ×π/180; a grad ×180/π"
          ],
          [
            "Longitud de arco",
            "s = rθ (θ en radianes)"
          ],
          [
            "Ángulos aliados",
            "Impar×90° intercambia sin↔cos; ASTC para signo"
          ],
          [
            "Resolver ecuación trig",
            "Ángulo de referencia, luego ASTC"
          ],
          [
            "Trig inversa",
            "sin⁻¹x responde un ángulo, no una razón"
          ]
        ]
      },
      {
        "title": "Fórmulas del triángulo",
        "rows": [
          [
            "Regla del seno",
            "a/sin A = b/sin B = c/sin C"
          ],
          [
            "Regla del coseno",
            "a² = b² + c² − 2bc cos A"
          ],
          [
            "Área",
            "½ab sin C"
          ],
          [
            "Alturas",
            "Elevación arriba, depresión abajo desde la horizontal"
          ],
          [
            "SOH CAH TOA",
            "Solo △ recto — oblicuo → reglas seno/coseno"
          ]
        ]
      },
      {
        "title": "Identidades y compuestos",
        "rows": [
          [
            "Pitagórica",
            "sin²+cos²=1; 1+tan²=sec²; 1+cot²=cosec²"
          ],
          [
            "Complemento",
            "sin(90°−θ)=cos θ («co» = complemento)"
          ],
          [
            "sin(A±B)",
            "sin cos cos sin — signo se queda"
          ],
          [
            "cos(A±B)",
            "cos cos sin sin — signo cambia"
          ],
          [
            "sin 2A",
            "2 sin A cos A"
          ],
          [
            "Probar identidad",
            "Lado feo → todo sin y cos"
          ]
        ]
      }
    ]
  },
  "g11": {
    "grade": "Grados 11–12",
    "title": "Introducción al cálculo",
    "blurb": "Derivadas e integrales, cada una con su movimiento de una línea.",
    "lessons": {
      "power": {
        "name": "Regla de la potencia",
        "phrase": "Baja la potencia al frente; después quítale uno a la potencia.",
        "also": "",
        "steps": [
          "Multiplica por la potencia.",
          "Baja la potencia en 1.",
          "Una constante sola se vuelve 0."
        ],
        "exception": "Productos necesitan la regla del producto. Paréntesis dentro de paréntesis, la regla de la cadena. La derivada de 7 es 0, no 7.",
        "tag": ""
      },
      "product": {
        "name": "Regla del producto",
        "phrase": "Primero por derivada del segundo más segundo por derivada del primero.",
        "also": "d(uv) = u v′ + v u′.",
        "steps": [
          "Nombra los dos factores: primero u, segundo v.",
          "Conserva el primero, por la derivada del segundo: u v′.",
          "Suma el segundo por la derivada del primero: v u′.",
          "Ordena."
        ],
        "exception": "La derivada de un producto no es el producto de derivadas: d/dx (x · x) es 2x, no 1. Si un factor es solo un número, déjalo al frente; no hace falta regla del producto.",
        "tag": ""
      },
      "chain": {
        "name": "Regla de la cadena",
        "phrase": "Derivada de afuera, conserva adentro, por derivada de adentro.",
        "also": "dy/dx = dy/du × du/dx.",
        "steps": [
          "Detecta adentro (el paréntesis) y afuera (lo que se le hace).",
          "Deriva afuera dejando adentro intacto.",
          "Multiplica por la derivada de adentro."
        ],
        "exception": "No olvides el último «por»: d/dx (3x + 1)⁵ es 15(3x + 1)⁴, no 5(3x + 1)⁴. Conserva adentro sin cambiar dentro de la derivada de afuera.",
        "tag": ""
      },
      "trigdiff": {
        "name": "Derivadas de sin y cos",
        "phrase": "sin → cos → −sin → −cos → sin: cada derivada avanza un paso en el ciclo.",
        "also": "Cuatro pasos y vuelves al inicio.",
        "steps": [
          "Escribe el ciclo: sin x, cos x, −sin x, −cos x.",
          "Cada derivada avanza un paso a la derecha.",
          "Tras −cos x, vuelve a sin x.",
          "Los números al frente solo se arrastran."
        ],
        "exception": "Solo en radianes. En grados aparece un π/180 extra. Cuidado el signo: d/dx cos x es −sin x, no sin x.",
        "tag": ""
      },
      "quotient": {
        "name": "Regla del cociente",
        "phrase": "Abajo por derivada de arriba menos arriba por derivada de abajo, sobre abajo al cuadrado.",
        "also": "",
        "steps": [
          "Abajo = denominador, arriba = numerador, d = derivada de.",
          "Abajo × d(arriba) menos arriba × d(abajo).",
          "Divide entre abajo al cuadrado."
        ],
        "exception": "El orden importa por el menos: arriba d(abajo) primero da el signo mal. Si abajo es constante, solo divide; no hace falta cociente.",
        "tag": ""
      },
      "integral": {
        "name": "Integrar potencias",
        "phrase": "Sube la potencia uno, divide por la nueva potencia y suma C.",
        "also": "",
        "steps": [
          "Suma 1 a la potencia.",
          "Divide por esa nueva potencia.",
          "Suma + C por la constante que falta."
        ],
        "exception": "La regla falla en x⁻¹ porque dividirías entre 0. ∫ 1/x dx = ln|x| + C.",
        "tag": ""
      },
      "logdef": {
        "name": "Qué significa un log",
        "phrase": "log pregunta: ¿a qué potencia?",
        "also": "log₂ 8 = 3 significa 2³ = 8. La base sigue siendo la base.",
        "steps": [
          "Lee log₂ 8 como «¿2 elevado a qué da 8?»",
          "Escríbelo como potencia: 2^? = 8.",
          "2³ = 8, así log₂ 8 = 3.",
          "log sin base significa base 10."
        ],
        "exception": "Solo puedes tomar log de un número positivo: log₂ 0 y log₂(−4) no existen. Para toda base, log 1 = 0 y log de la base misma es 1.",
        "tag": ""
      },
      "loglaws": {
        "name": "Leyes de logaritmos",
        "phrase": "Multiplicar → sumar, dividir → restar, potencia → al frente.",
        "also": "",
        "steps": [
          "log(mn) = log m + log n.",
          "log(m ÷ n) = log m − log n.",
          "log(mᵏ) = k log m.",
          "Úsalas al revés para juntar varios logs en uno."
        ],
        "exception": "No hay regla para log(m + n): no es log m + log n. log m ÷ log n no es log(m ÷ n). Todos los log deben tener la misma base.",
        "tag": ""
      },
      "liate-parts": {
        "name": "Integración por partes (LIATE)",
        "phrase": "LIATE: prefiere u de Logarítmico, Trig inversa, Algebráico, Trig, Exponencial (el más a la izquierda gana).",
        "also": "",
        "steps": [
          "Elige u con LIATE (con flexibilidad).",
          "dv es el resto del integrando.",
          "Aplica ∫u dv = uv − ∫v du."
        ],
        "exception": "Heurística, no teorema — algunas integrales piden la elección opuesta o métodos cíclicos.",
        "tag": ""
      },
      "u-sub-chain-reverse": {
        "name": "Sustitución u",
        "phrase": "Si ves f(g(x))·g'(x), pon u = g(x) (deshaz la regla de la cadena).",
        "also": "",
        "steps": [
          "Define u = la función interior.",
          "Escribe du = u' dx.",
          "Reescribe la integral en u.",
          "Integra.",
          "Sustituye de vuelta, o cambia límites en integrales definidas."
        ],
        "exception": "Cuidado factores constantes. En definidas, cambia límites a valores de u (o sustituye de vuelta).",
        "tag": ""
      },
      "wordkeys11": {
        "name": "Pistas de palabras de razón",
        "phrase": "Razón, pendiente, marginal, instantánea — esas palabras apuntan a una derivada.",
        "also": "",
        "steps": [
          "Detecta lenguaje de tasa de cambio.",
          "Deriva el modelo.",
          "Sustituye el instante pedido."
        ],
        "exception": "Razón media es Δy/Δx — no la derivada salvo que la ventana tienda a un instante.",
        "tag": ""
      },
      "estimate11": {
        "name": "Estimación lineal",
        "phrase": "Cerca de un punto: Δy ≈ y′ · Δx — la subida de la tangente.",
        "also": "",
        "steps": [
          "Hallar y′ en el punto conocido.",
          "Multiplica por el Δx pequeño.",
          "Súmalo al y conocido."
        ],
        "exception": "Lejos del punto la tangente se desvía — usa un modelo mejor.",
        "tag": ""
      },
      "powerarith": {
        "name": "Aritmética regla de potencia",
        "phrase": "Baja la potencia al frente, luego resta uno a la potencia.",
        "also": "",
        "steps": [
          "Para axⁿ, la derivada es a·n·xⁿ⁻¹.",
          "Multiplica el coeficiente por la potencia vieja.",
          "Reduce la potencia en 1."
        ],
        "exception": "Derivada de una constante es 0, no la constante.",
        "tag": ""
      },
      "commute11": {
        "name": "Regla de la suma",
        "phrase": "La derivada de una suma es la suma de derivadas — término a término.",
        "also": "",
        "steps": [
          "Separa la expresión en términos.",
          "Deriva cada término.",
          "Suma los resultados."
        ],
        "exception": "Productos necesitan regla del producto — no termine a termine un producto.",
        "tag": ""
      },
      "distrib11": {
        "name": "Regla del múltiplo constante",
        "phrase": "Las constantes salen de las derivadas: (c·f)′ = c·f′.",
        "also": "",
        "steps": [
          "Saca la constante.",
          "Deriva lo que queda.",
          "Multiplica de nuevo por la constante."
        ],
        "exception": "La constante no debe depender de x.",
        "tag": ""
      },
      "intarith": {
        "name": "Aritmética integral de potencias",
        "phrase": "Sube la potencia uno, divide por la nueva — más C.",
        "also": "",
        "steps": [
          "Suma 1 al exponente.",
          "Divide por ese nuevo exponente.",
          "Suma + C en integrales indefinidas."
        ],
        "exception": "∫x⁻¹ dx es ln|x| + C, no x⁰/0.",
        "tag": ""
      },
      "mental11": {
        "name": "Derivadas mentales",
        "phrase": "sin → cos → −sin → −cos → sin: da un paso en el ciclo.",
        "also": "",
        "steps": [
          "Conoce el ciclo de cuatro pasos para sin/cos.",
          "Aparece menos al salir de cos hacia −sin.",
          "La regla de la cadena multiplica una derivada interior extra."
        ],
        "exception": "d/dx[cos x] = −sin x — no pierdas el menos.",
        "tag": ""
      },
      "logarith": {
        "name": "Aritmética de log",
        "phrase": "log pregunta: ¿a qué potencia? Multiplicar → sumar, dividir → restar, potencia → al frente.",
        "also": "",
        "steps": [
          "Reescribe la pregunta del log como exponencial.",
          "Aplica leyes de log para expandir o condensar.",
          "Resuelve la incógnita."
        ],
        "exception": "log(a + b) no es log a + log b.",
        "tag": ""
      },
      "ftc-inverses": {
        "name": "Teorema fundamental",
        "phrase": "Derivación e integración se deshacen (Teorema Fundamental).",
        "also": "",
        "steps": [
          "Reconoce una antiderivada F de f.",
          "En una integral definida, calcula F(b) − F(a).",
          "Lee el resultado como cambio neto cuando f es una razón."
        ],
        "exception": "Necesita hipótesis de continuidad. +C en indefinidas. √(x²)=|x|. Los límites importan en definidas.",
        "tag": ""
      },
      "pvalue-row-boat": {
        "name": "Qué es un p-valor",
        "phrase": "Un p-valor es la probabilidad, asumiendo H₀ cierta, de datos al menos tan extremos.",
        "also": "",
        "steps": [
          "Enuncia H₀ con claridad.",
          "Calcula el estadístico de prueba con los datos.",
          "Hallar la probabilidad de cola bajo H₀.",
          "Interpreta con cautela — p pequeño significa sorprendente bajo H₀, no «H₀ falsa con probabilidad p»."
        ],
        "exception": "p no es P(H₀ verdadera). p pequeño sugiere incompatibilidad con H₀ bajo el modelo — no prueba. Evita p-hacking.",
        "tag": ""
      },
      "boxplot-iqr-leash": {
        "name": "Bigotes del diagrama de caja (1,5 IQR)",
        "phrase": "Los bigotes llegan al punto más lejano dentro de 1,5 × IQR de los cuartiles; más allá son atípicos.",
        "also": "",
        "steps": [
          "Hallar Q1, Q3 e IQR = Q3 − Q1.",
          "Vallas en Q1 − 1,5·IQR y Q3 + 1,5·IQR.",
          "Bigotes hasta el dato más lejano aún dentro de las vallas; más allá, atípicos."
        ],
        "exception": "Algunos programas/currículos usan otras vallas (o min/max). Revisa la convención.",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Derivadas",
        "rows": [
          [
            "Regla de potencia",
            "Baja la potencia; quita uno a la potencia"
          ],
          [
            "Regla del producto",
            "Primero d-segundo + segundo d-primero"
          ],
          [
            "Regla del cociente",
            "Abajo d-arriba − arriba d-abajo, sobre abajo²"
          ],
          [
            "Regla de la cadena",
            "Afuera′(adentro) × adentro′"
          ],
          [
            "Derivada trig",
            "sin → cos → −sin → −cos → sin"
          ],
          [
            "ln y e",
            "d/dx ln x = 1/x; d/dx eˣ = eˣ"
          ]
        ]
      },
      {
        "title": "Integrales y logs",
        "rows": [
          [
            "∫ potencia",
            "Sube potencia 1, ÷ nueva potencia, + C"
          ],
          [
            "∫ 1/x",
            "ln|x| + C (no regla de potencia)"
          ],
          [
            "LIATE",
            "Elige u: Log, Trig inv., Alg., Trig, Exp"
          ],
          [
            "u-sub",
            "Regla de cadena al revés; cambia du"
          ],
          [
            "Definición log",
            "log_b x = y ↔ bʸ = x"
          ],
          [
            "Leyes log",
            "× → sumar; ÷ → restar; potencia → frente"
          ]
        ]
      },
      {
        "title": "TFC y datos",
        "rows": [
          [
            "TFC",
            "∫ₐᵇ f′(x) dx = f(b) − f(a)"
          ],
          [
            "Valor medio",
            "Área ÷ ancho"
          ],
          [
            "IQR caja",
            "Q3 − Q1; atípicos más allá de 1,5×IQR"
          ],
          [
            "p-valor",
            "Prob., si H₀ fuera cierta, de datos tan extremos (pequeño → sorprende)"
          ]
        ]
      }
    ]
  },
  "pabson": {
    "grade": "Grado 12 · SEE",
    "title": "PABSON / send-up y set difícil NEB",
    "blurb": "Ejercicios geo+trig send-up (SEE Groups) más el set difícil NEB de Clase 12. Tarjetas SEE send-up primero; cálculo/álgebra Clase 12 después.",
    "lessons": {
      "see-heron": {
        "name": "SEE · Área de Herón",
        "phrase": "Movimiento Grupo A: escribe s = (a+b+c)/2, luego área = √[s(s−a)(s−b)(s−c)].",
        "also": "",
        "steps": [
          "Suma los tres lados; divide entre 2 para s.",
          "Construye s(s−a)(s−b)(s−c).",
          "Saca la raíz cuadrada."
        ],
        "exception": "Desigualdad triangular primero. Usar el perímetro completo en lugar de s es la trampa clásica de send-up.",
        "tag": "SEE send-up"
      },
      "see-elev": {
        "name": "SEE · Ángulo de elevación",
        "phrase": "Alturas send-up: esquema, marca elevación θ, luego tan θ = opuesto/adyacente.",
        "also": "",
        "steps": [
          "Dibuja línea del suelo, torre y línea de visión desde el observador.",
          "Marca θ en el ojo mirando arriba.",
          "Suele ser tan θ = altura / distancia; resuelve."
        ],
        "exception": "Depresión es mirar abajo. No uses SOHCAHTOA en figura no recta sin bajar una perpendicular.",
        "tag": "SEE send-up"
      },
      "see-circle": {
        "name": "SEE · Centro y cíclico",
        "phrase": "Ganchos círculo Grupo D: centro = 2×arco; opuestos cíclicos suman 180°.",
        "also": "",
        "steps": [
          "Mismo arco: dobla un ángulo en arco para el centro (o mitad de uno central).",
          "Cíclico: opuestos → 180°.",
          "Tangente ⊥ radio cuando aparece tangente."
        ],
        "exception": "Ángulo en arco y central deben compartir el mismo arco. Ángulos cíclicos adyacentes no están forzados a 180°.",
        "tag": "SEE send-up"
      },
      "see-bpt": {
        "name": "SEE · BPT / semejanza",
        "phrase": "Corte paralelo → razones iguales; AAA → lados proporcionales.",
        "also": "",
        "steps": [
          "Detecta DE ∥ BC (o ángulos iguales para AAA).",
          "Escribe AD/DB = AE/EC (BPT) o lados correspondientes (semejantes).",
          "Regla de tres."
        ],
        "exception": "Empareja trozos correspondientes. AAA es semejanza, no congruencia.",
        "tag": "SEE send-up"
      },
      "see-soh": {
        "name": "SEE · Ejercicio SOHCAHTOA",
        "phrase": "Send-up triángulo recto: etiqueta opp/adj/hyp, luego SOH CAH TOA.",
        "also": "",
        "steps": [
          "Confirma el ángulo recto.",
          "Respecto a θ, marca opp, adj, hyp.",
          "Elige la razón que usa lo conocido y lo buscado."
        ],
        "exception": "Triángulos oblicuos necesitan reglas seno/coseno — no solo SOHCAHTOA.",
        "tag": "SEE send-up"
      },
      "perm": {
        "name": "Permutaciones nPr",
        "phrase": "El orden importa: alinéalos. nPr = n! / (n−r)!.",
        "also": "",
        "steps": [
          "Pregunta: ¿importa el orden? Sí → permutación.",
          "Escribe nPr = n! / (n−r)!, o n × (n−1) × … por r factores.",
          "Cancela el factorial que sobra abajo."
        ],
        "exception": "Si el orden no importa (comité, conjunto de libros), usa nCr. También nP0 = 1, y no puedes elegir más de n.",
        "tag": ""
      },
      "comb": {
        "name": "Combinaciones nCr",
        "phrase": "El orden no importa: bolsas, no filas. nCr = n! / (r!(n−r)!).",
        "also": "",
        "steps": [
          "Pregunta: ¿importa el orden? No → combinación.",
          "Escribe nCr = n! / (r!(n−r)!), o nPr / r!.",
          "Usa C(n,r) = C(n,n−r) para elegir el r más pequeño."
        ],
        "exception": "Si los asientos están numerados o las contraseñas ordenadas, usa nPr. C(n,0) = C(n,n) = 1. Nunca omitas r! del denominador.",
        "tag": ""
      },
      "binoms": {
        "name": "Término binomial",
        "phrase": "Elige r de los segundos factores: C(n,r) aⁿ⁻ʳ bʳ.",
        "also": "",
        "steps": [
          "Expande (a+b)ⁿ eligiendo cuántas b aparecen: r = 0,1,…,n.",
          "El término general es T_{r+1} = C(n,r) aⁿ⁻ʳ bʳ.",
          "Para una potencia concreta de x, iguala el exponente y resuelve r."
        ],
        "exception": "El primer término es T₁ (r = 0), no T₀. Los signos cambian si b es negativo. No olvides el coeficiente binomial.",
        "tag": ""
      },
      "logs": {
        "name": "Ecuaciones con log",
        "phrase": "log pregunta: ¿a qué potencia? Pasa a exponencial y revisa el dominio.",
        "also": "",
        "steps": [
          "Reescribe log_b a = c como bᶜ = a.",
          "Usa producto → suma, cociente → diferencia, potencia → al frente si hace falta.",
          "Resuelve y rechaza raíces que hagan argumento de log ≤ 0."
        ],
        "exception": "Argumentos > 0 y bases > 0, ≠ 1. log(A) + log(B) = log(AB) solo si A y B son positivos.",
        "tag": ""
      },
      "matmul": {
        "name": "Multiplicar matrices 2×2",
        "phrase": "Fila por punto columna: cada entrada es fila de A · columna de B.",
        "also": "",
        "steps": [
          "Comprueba tamaños: A es m×n, B es n×p → AB es m×p.",
          "Entrada (i,j) = fila i de A · columna j de B.",
          "Escribe las cuatro entradas en 2×2 con cuidado."
        ],
        "exception": "AB ≠ BA en general. No multiplicas si los tamaños internos no coinciden. Escalar es entrada a entrada — multiplicar matrices no.",
        "tag": ""
      },
      "det2": {
        "name": "Determinante 2×2",
        "phrase": "Producto diagonal principal menos la otra: ad − bc.",
        "also": "",
        "steps": [
          "Para [[a,b],[c,d]], calcula ad − bc.",
          "Si det = 0, la matriz es singular (sin inversa).",
          "Para inversa: (1/det) [[d,−b],[−c,a]]."
        ],
        "exception": "No sumes diagonales. El signo de bc se resta. En 3×3 usa expansión por cofactores, no una «regla diagonal» falsa.",
        "tag": ""
      },
      "conic": {
        "name": "Identificar cónicas rápido",
        "phrase": "Círculo x²+y², parábola un cuadrado, elipse ambos positivos, hipérbola signos opuestos.",
        "also": "",
        "steps": [
          "Pon la ecuación en forma estándar (completa cuadrado si hace falta).",
          "x² e y², mismo signo, coefs iguales → círculo; distintos → elipse.",
          "Signos opuestos → hipérbola. Solo una variable al cuadrado → parábola."
        ],
        "exception": "Términos xy rotan ejes. Casos degenerados (como x² − y² = 0) factorizan en rectas. Radio al cuadrado debe ser positivo para círculo real.",
        "tag": ""
      },
      "invtrig": {
        "name": "Valores trig inversos",
        "phrase": "arcsin rango [−90°,90°]; arccos [0°,180°]; arctan (−90°,90°).",
        "also": "",
        "steps": [
          "Lee la inversa como «el ángulo en rango principal cuyo trig es …».",
          "Usa ángulos especiales: 0, 30, 45, 60, 90.",
          "Cuidado el rango: arccos(−1/2) es 120°, no −60°."
        ],
        "exception": "Calculadora en radianes vs grados. arcsin y arccos no están definidos fuera de [−1,1]. arctan(−1) es −45°, no 135°.",
        "tag": ""
      },
      "limits": {
        "name": "Límites (0/0)",
        "phrase": "Sustituye primero. Si 0/0, factoriza, cancela, sustituye de nuevo.",
        "also": "",
        "steps": [
          "Sustituye el valor de aproximación.",
          "Si obtienes número, ese es el límite (racional con hueco cancelable).",
          "Si 0/0, factoriza numerador y denominador, cancela (x−a) común, sustituye."
        ],
        "exception": "Cancelar cambia la función en un punto pero no el límite. ∞/∞ necesita otra herramienta (dividir por la mayor potencia). Límites izquierdo y derecho pueden diferir.",
        "tag": ""
      },
      "diffapp": {
        "name": "Máx / mín con y′",
        "phrase": "Estacionario: y′ = 0. Concavidad: y′′ > 0 mín, y′′ < 0 máx.",
        "also": "",
        "steps": [
          "Deriva y para obtener y′.",
          "Resuelve y′ = 0 para valores x candidatos.",
          "Usa y′′ (o tabla de signos de y′) para clasificar máx/mín, luego halla y."
        ],
        "exception": "Extremos en intervalo cerrado pueden estar en puntos finales aunque y′ ≠ 0. y′ = 0 es necesario en abierto, no siempre suficiente (punto de inflexión plano).",
        "tag": ""
      },
      "integ": {
        "name": "Integrales definidas",
        "phrase": "Antiderivada F, luego F(arriba) − F(abajo). Sin +C.",
        "also": "",
        "steps": [
          "Hallar una antiderivada F del integrando.",
          "Evalúa F(b) − F(a) para ∫_a^b.",
          "Simplifica el número (fracción vale)."
        ],
        "exception": "No sumes C en integral definida. Si sustituyes, cambia límites. Valor absoluto en ∫1/x al cruzar 0 es sutil — evita ese caso aquí.",
        "tag": ""
      },
      "de1": {
        "name": "ED separables",
        "phrase": "dy/dx = f(x)g(y) → junta y con dy, x con dx, integra.",
        "also": "",
        "steps": [
          "Reescribe para que g(y) dy y f(x) dx queden en lados opuestos (o dy/g = f dx).",
          "Integra ambos lados.",
          "Despeja y si piden; conserva +C."
        ],
        "exception": "Dividir entre g(y) pierde soluciones donde g(y)=0 — revisa soluciones constantes. No toda ED es separable.",
        "tag": ""
      },
      "prob": {
        "name": "Conceptos básicos de probabilidad",
        "phrase": "P(A∪B) = P(A)+P(B)−P(A∩B). Independientes: multiplica.",
        "also": "",
        "steps": [
          "Lista el tamaño del espacio muestral si los resultados son equiprobables.",
          "Para «o», suma y resta el solapamiento.",
          "Para «y» independientes, multiplica probabilidades."
        ],
        "exception": "Mutuamente excluyentes implica P(A∩B)=0 — entonces solo suma. Independiente no es lo mismo que mutuamente excluyente. Probabilidades en [0,1].",
        "tag": ""
      },
      "binomprob": {
        "name": "Probabilidad binomial",
        "phrase": "C(n,k) pᵏ (1−p)ⁿ⁻ᵏ: elige quién triunfa, luego multiplica.",
        "also": "",
        "steps": [
          "Confirma n ensayos independientes, probabilidad de éxito p cada vez.",
          "Elige qué k ensayos triunfan: C(n,k).",
          "Multiplica por pᵏ (1−p)ⁿ⁻ᵏ."
        ],
        "exception": "No para ensayos dependientes. «Al menos uno» suele ser 1 − P(ninguno). p es probabilidad de éxito, no un conteo.",
        "tag": ""
      },
      "vectors": {
        "name": "Longitud y producto punto",
        "phrase": "|a| = √(a₁²+a₂²). a·b = a₁b₁+a₂b₂ = |a||b|cosθ.",
        "also": "",
        "steps": [
          "Magnitud: cuadra, suma, raíz.",
          "Punto: multiplica componentes pareadas y suma.",
          "Perpendicular ⇔ producto punto 0."
        ],
        "exception": "Producto punto es escalar, no vector. |a+b| ≠ |a|+|b| en general. Vector unitario es a/|a|, no 1/a componente a componente sin cuidado.",
        "tag": ""
      },
      "projectile": {
        "name": "Alcance de proyectil",
        "phrase": "Alcance = (u² sin 2θ)/g. Alcance máximo a 45°.",
        "also": "",
        "steps": [
          "Resuelve: uₓ = u cos θ, uᵧ = u sin θ.",
          "Tiempo de vuelo 2 u sinθ / g; alcance = uₓ × tiempo = u² sin2θ / g.",
          "sin2θ máximo en 2θ=90° → θ=45°."
        ],
        "exception": "La fórmula asume suelo plano y sin resistencia del aire. Ángulos complementarios θ y 90°−θ comparten el mismo alcance. La altura usa otra fórmula.",
        "tag": ""
      },
      "statics": {
        "name": "Estática: descomponer fuerzas",
        "phrase": "ΣFₓ = 0 y ΣFᵧ = 0 en equilibrio. Descompón en componentes.",
        "also": "",
        "steps": [
          "Dibuja diagrama de cuerpo libre.",
          "Descompón cada fuerza en x e y: F cosθ, F sinθ.",
          "Pon suma de componentes en cada dirección a cero; resuelve."
        ],
        "exception": "Momentos: Στ = 0 sobre un punto si puede haber rotación. Los signos de dirección deben ser consistentes. El peso actúa en el centro de masa.",
        "tag": ""
      },
      "newtonraphson": {
        "name": "Idea de Newton–Raphson",
        "phrase": "Siguiente aproximación: x₁ = x₀ − f(x₀)/f′(x₀). La tangente corta el eje.",
        "also": "",
        "steps": [
          "Empieza con una aproximación gruesa x₀.",
          "Calcula f(x₀) y f′(x₀).",
          "Actualiza x₁ = x₀ − f(x₀)/f′(x₀); repite."
        ],
        "exception": "Falla si f′(x₀)=0 (tangente horizontal). Malas aproximaciones pueden diverger. Busca raíz de f(x)=0, no un máximo.",
        "tag": ""
      },
      "partial": {
        "name": "Montaje de fracciones parciales",
        "phrase": "Factoriza abajo; factores lineales llevan A/(x−r), repetidos A/(x−r)+B/(x−r)².",
        "also": "",
        "steps": [
          "Factoriza el denominador por completo.",
          "Escribe plantilla: cada factor lineal distinto lleva constante sobre él.",
          "Quita denominadores y halla constantes sustituyendo raíces o igualando coeficientes."
        ],
        "exception": "Si grado arriba ≥ abajo, divide primero (polinomio + fracción propia). Cuadráticos irreducibles necesitan (Bx+C)/(cuadrático).",
        "tag": ""
      },
      "chainhard": {
        "name": "Regla de la cadena en exámenes",
        "phrase": "Derivada de afuera, por derivada de adentro: f′(g(x)) · g′(x).",
        "also": "",
        "steps": [
          "Nombra la función exterior y la interior.",
          "Deriva afuera dejando adentro intacto.",
          "Multiplica por la derivada de adentro."
        ],
        "exception": "Olvidar multiplicar por la derivada interior es el error clásico. Productos de dos compuestas necesitan producto + cadena.",
        "tag": ""
      },
      "areaunder": {
        "name": "Área bajo una curva",
        "phrase": "Área = ∫_a^b y dx cuando y ≥ 0. Bajo el eje, valor absoluto.",
        "also": "",
        "steps": [
          "Bosqueja o comprueba el signo de y en [a,b].",
          "Integra para obtener área con signo.",
          "Si la curva cruza el eje, parte la integral en las raíces."
        ],
        "exception": "Una sola integral de a a b da área neta con signo — hay cancelaciones. Para área geométrica total, parte donde y=0.",
        "tag": ""
      },
      "seqseries": {
        "name": "Movimientos de examen PA / PG",
        "phrase": "PA: a+(n−1)d. PG: arⁿ⁻¹. Suma PA n/2(2a+(n−1)d); PG a(rⁿ−1)/(r−1).",
        "also": "",
        "steps": [
          "Identifica aritmética (diferencia común) o geométrica (razón común).",
          "Escribe la fórmula del término n.",
          "Usa la suma que corresponda; para |r|<1 PG infinita, S=a/(1−r)."
        ],
        "exception": "Fórmula de suma PG cambia si r=1 (entonces S=na). Suma infinita necesita |r|<1. No mezcles fórmulas PA y PG.",
        "tag": ""
      },
      "complex": {
        "name": "Números complejos i",
        "phrase": "i² = −1. Multiplica como binomios; reemplaza i² con −1.",
        "also": "",
        "steps": [
          "Escribe z = a + bi.",
          "Suma/resta componentes; multiplica con FOIL luego i²→−1.",
          "Módulo |z|=√(a²+b²); conjugado a−bi."
        ],
        "exception": "i³ = −i, i⁴ = 1 — reduce potencias mod 4. División: multiplica por el conjugado del denominador. √(−1) es i, no un real.",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Patrones Grupo SEE (send-up)",
        "rows": [
          [
            "Grupo A",
            "Una línea: Herón s=(a+b+c)/2, depreciación, clase cuartil, vol esfera"
          ],
          [
            "Grupo B",
            "Apps cortas: conjuntos/Venn, CI/población, IVA/FX, mensuration"
          ],
          [
            "Grupo C",
            "Álgebra + sólidos: factorizar, cuadrática, PA/PG, cilindro/cono"
          ],
          [
            "Grupo D",
            "Más largo: teoremas círculo, semejanza/BPT, alturas, stats/prob"
          ],
          [
            "Herón",
            "s primero, luego √[s(s−a)(s−b)(s−c)]"
          ],
          [
            "Elevación",
            "Esquema → tan θ = h/d (a menudo)"
          ],
          [
            "Centro/arco",
            "∠centro = 2 × ∠arco (mismo arco)"
          ],
          [
            "Cíclico",
            "Opuestos suman 180°"
          ],
          [
            "SOHCAHTOA",
            "Solo △ recto; oblicuo → regla seno/coseno"
          ]
        ]
      },
      {
        "title": "Ganchos set difícil (NEB / Clase 12)",
        "rows": [
          [
            "nPr",
            "Orden importa: n! / (n−r)!"
          ],
          [
            "nCr",
            "Orden no: n! / (r!(n−r)!)"
          ],
          [
            "Binomial",
            "(a+b)ⁿ: elige r de las b → C(n,r) aⁿ⁻ʳ bʳ"
          ],
          [
            "Log",
            "log pregunta: ¿a qué potencia?"
          ],
          [
            "det 2×2",
            "ad − bc"
          ],
          [
            "Límites",
            "Sustituye; si 0/0, factoriza o cancela"
          ],
          [
            "Máx/mín",
            "y′ = 0, luego prueba y′′"
          ],
          [
            "ED separable",
            "dy/dx = f(x)g(y) → ∫ dy/g = ∫ f dx"
          ],
          [
            "Newton–Raphson",
            "x₁ = x₀ − f(x₀)/f′(x₀)"
          ],
          [
            "Alcance",
            "(u² sin 2θ)/g"
          ]
        ]
      },
      {
        "title": "Vectores y probabilidad",
        "rows": [
          [
            "Producto punto",
            "a·b = |a||b| cos θ = a₁b₁ + a₂b₂"
          ],
          [
            "Cruz (mag 2D)",
            "|a×b| = |a₁b₂ − a₂b₁|"
          ],
          [
            "P(A∪B)",
            "P(A)+P(B)−P(A∩B)"
          ],
          [
            "Binomial P",
            "C(n,k) pᵏ (1−p)ⁿ⁻ᵏ"
          ]
        ]
      },
      {
        "title": "Más ganchos set difícil",
        "rows": [
          [
            "Multiplicar matrices",
            "Fila × columna; tamaños deben coincidir"
          ],
          [
            "LIATE",
            "Elige u: Log, Trig inv., Alg., Trig, Exp"
          ],
          [
            "nPr",
            "Orden importa: n! / (n−r)!"
          ],
          [
            "nCr",
            "Orden no: n! / (r!(n−r)!)"
          ],
          [
            "Fracciones parciales",
            "Parte una fracción en piezas más simples"
          ],
          [
            "Área bajo curva",
            "∫ definida entre límites"
          ],
          [
            "Complejo i",
            "i² = −1; potencias ciclan cada 4"
          ],
          [
            "Momentos estática",
            "Fuerza × distancia perpendicular"
          ],
          [
            "Suma sucesión",
            "PA: n/2(primero+último); PG: a(rⁿ−1)/(r−1)"
          ]
        ]
      }
    ]
  }
});
})();
