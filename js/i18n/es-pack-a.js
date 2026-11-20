/* Mathenomics — es content pack. Generated from docs/i18n/es-{id}.json */
(function () {
  window.I18N_CONTENT = window.I18N_CONTENT || {};
  const root = (window.I18N_CONTENT.es = window.I18N_CONTENT.es || { courses: {} });
  Object.assign(root.courses, {
  "k": {
    "grade": "K–1",
    "title": "Contar y comparar",
    "blurb": "Mayor, menor y los pares que suman diez.",
    "lessons": {
      "gator": {
        "name": "Mayor o menor",
        "phrase": "El cocodrilo hambriento se come el número mayor.",
        "also": "La punta apunta al número menor.",
        "steps": [
          "Mira los dos números.",
          "La boca abierta del cocodrilo mira al mayor.",
          "La punta señala al menor."
        ],
        "exception": "Si los dos números son iguales, no hay mayor que comerse. Usa =. La boca va al mayor, no al que esté primero.",
        "tag": ""
      },
      "bonds": {
        "name": "Pares que suman diez",
        "phrase": "Diez amigos de la mano: 1 y 9, 2 y 8, 3 y 7, 4 y 6, 5 y 5.",
        "also": "",
        "steps": [
          "Llena el marco de diez con el primer número.",
          "Cuenta las casillas vacías.",
          "Las vacías son el compañero."
        ],
        "exception": "Estos pares solo hacen 10. Para 20 cambian los compañeros: 7 necesita 13. Y el compañero de 0 es el 10 completo.",
        "tag": ""
      },
      "counton": {
        "name": "Contar hacia adelante",
        "phrase": "Guarda el número grande en la cabeza y cuenta hacia adelante.",
        "also": "",
        "steps": [
          "Di el número mayor.",
          "Sube un dedo por cada unidad del número menor.",
          "El último número que digas es la respuesta."
        ],
        "exception": "No vuelvas a empezar desde 1. No cuentes el número inicial dos veces: 8 + 3 es 9, 10, 11, no 8, 9, 10.",
        "tag": ""
      },
      "maketen": {
        "name": "Formar un diez",
        "phrase": "Forma un diez y suma lo que sobra.",
        "also": "8 + 5 = 8 + 2 + 3. El 2 completa el diez y el 3 es lo que resta.",
        "steps": [
          "Empieza con el número mayor.",
          "Toma justo lo necesario del otro número para hacer 10.",
          "Suma lo que queda al 10."
        ],
        "exception": "Toma solo lo que completa el diez: en 8 + 5, toma 2, no 5. Si el total es menor que 10, no hay diez que formar; cuenta hacia adelante.",
        "tag": ""
      },
      "teens": {
        "name": "Números del 11 al 19",
        "phrase": "Un «teen» es diez y algo más.",
        "also": "Catorce es diez y cuatro. El 1 adelante es el diez.",
        "steps": [
          "El 1 adelante representa un diez.",
          "El último dígito dice cuánto más.",
          "16 es diez y 6 más."
        ],
        "exception": "Once y doce no dicen «teen», pero son diez y 1, y diez y 2. Catorce se escribe 14, no 41 ni 104.",
        "tag": ""
      },
      "neardbl": {
        "name": "Dobles y casi dobles",
        "phrase": "Casi doble: duplica el menor y suma uno.",
        "also": "6 + 7 es doble de 6 más 1: 12 + 1 = 13.",
        "steps": [
          "Un doble es el mismo número dos veces: 6 + 6 = 12.",
          "En un casi doble, duplica el menor.",
          "Suma 1 más."
        ],
        "exception": "Duplica el menor y suma 1. Si duplicas el mayor, resta 1: 6 + 7 es 14 − 1. Solo sirve con números vecinos: 6 + 8 es doble de 6 más 2.",
        "tag": ""
      },
      "skip": {
        "name": "Contar de 2 en 2, de 5 en 5 y de 10 en 10",
        "phrase": "2, 4, 6, 8, ¿a quién vamos a aplaudir?",
        "also": "Los cincos terminan en 5 o 0. Los dieces siempre terminan en 0.",
        "steps": [
          "De 2 en 2: di uno sí y uno no: 2, 4, 6, 8, 10.",
          "De 5 en 5: la unidad va 5, 0, 5, 0.",
          "De 10 en 10: la decena sube 1 y las unidades quedan en 0."
        ],
        "exception": "Mantén el mismo salto siempre. De 10 en 10 desde 20: 20, 30, 40, no 20, 21, 22. Si empiezas en impar, de 2 en 2 salen impares: 3, 5, 7.",
        "tag": ""
      },
      "allword": {
        "name": "Palabras clave: todo / en total",
        "phrase": "Todo, en total, en conjunto, suma — esas palabras suelen indicar sumar.",
        "also": "¿Cuántos en total? Junta las partes.",
        "steps": [
          "Busca la palabra clave: todo, en total, suma, total.",
          "Escribe una suma.",
          "Suma las partes."
        ],
        "exception": "«Todo» con «quedan» o «se fueron» puede indicar restar. Lee toda la oración.",
        "tag": ""
      },
      "leftword": {
        "name": "Palabras clave: quedan / restan",
        "phrase": "Quedan, restan, quitar, cuántos más — suelen indicar restar.",
        "also": "",
        "steps": [
          "Busca la pista: quedan, restan, quitar, cuántos más, diferencia.",
          "Escribe una resta.",
          "Resta."
        ],
        "exception": "«Cuántos más» compara dos cantidades: mayor − menor. Empieza con el total, no con lo que sobra.",
        "tag": ""
      },
      "eachword": {
        "name": "Palabras clave: cada / grupos",
        "phrase": "Cada, cada uno, grupos de — suelen indicar multiplicar (o partes iguales).",
        "also": "3 bolsas con 4 en cada una: tres grupos de cuatro.",
        "steps": [
          "Localiza «cada», «cada uno» o «grupos de».",
          "Dibuja grupos iguales.",
          "Cuenta por grupos o multiplica."
        ],
        "exception": "«Cada» también puede indicar dividir al repartir: 12 pegatinas, 3 para cada uno — ¿cuántos niños?",
        "tag": ""
      },
      "shareword": {
        "name": "Palabras clave: repartir / dividir",
        "phrase": "Repartir por igual, dividir entre — indican división.",
        "also": "",
        "steps": [
          "Localiza «repartir», «dividir», «entre», «en grupos iguales».",
          "Escribe una división.",
          "Hallar cuántos en cada grupo (o cuántos grupos)."
        ],
        "exception": "El reparto debe ser justo. Lo que sobra es residuo — no lo ignores.",
        "tag": ""
      },
      "commute": {
        "name": "Orden de los sumandos",
        "phrase": "Puedes cambiar el orden: 3 + 5 es lo mismo que 5 + 3.",
        "also": "Conmutativa: el viaje es igual en ambos sentidos.",
        "steps": [
          "Escribe la suma en cualquier orden.",
          "Guarda el mayor en la cabeza.",
          "Cuenta hacia adelante el menor."
        ],
        "exception": "El orden no importa en + y ×. Sí importa en − y ÷: 5 − 3 no es 3 − 5.",
        "tag": ""
      },
      "countback": {
        "name": "Contar hacia atrás",
        "phrase": "Guarda el número grande en la cabeza y cuenta hacia atrás.",
        "also": "",
        "steps": [
          "Di el número mayor.",
          "Baja un dedo por cada unidad que restas.",
          "El último número que digas es la respuesta."
        ],
        "exception": "No cuentes el número inicial como dedo. 9 − 2 es 8, 7 — no 9, 8.",
        "tag": ""
      },
      "zeroadd": {
        "name": "Sumar cero",
        "phrase": "El cero no cambia nada al sumar.",
        "also": "Más cero deja el número igual.",
        "steps": [
          "Mira + 0 o 0 +.",
          "El otro número se queda igual.",
          "El cero no agrega nada."
        ],
        "exception": "El cero es distinto en + y en ×: n + 0 = n, pero n × 0 = 0.",
        "tag": ""
      },
      "estimate": {
        "name": "¿Aproximadamente cuántos?",
        "phrase": "Estima: ¿está más cerca de una decena amiga?",
        "also": "",
        "steps": [
          "Mira el dígito de las unidades.",
          "5 o más → sube a la siguiente decena.",
          "4 o menos → quédate en esta decena."
        ],
        "exception": "Estimar es «más o menos», no exacto. Úsalo para ver si una respuesta exacta se ve absurda.",
        "tag": ""
      },
      "morefewer": {
        "name": "Más y menos (cantidad)",
        "phrase": "Más significa mayor cantidad. Menos significa menor cantidad.",
        "also": "",
        "steps": [
          "Compara las dos cantidades.",
          "Más → el número mayor.",
          "Menos → el número menor."
        ],
        "exception": "«Menos» suele usarse con cosas contables; con medidas continuas a veces se dice «menor», pero la idea de comparar es la misma.",
        "tag": ""
      },
      "partwhole": {
        "name": "Parte–parte–todo",
        "phrase": "Dos partes forman el todo. El todo se divide en partes.",
        "also": "",
        "steps": [
          "Nombra el todo.",
          "Nombra cada parte.",
          "Las partes suman el todo; el todo menos una parte deja la otra."
        ],
        "exception": "No mezcles qué número es el todo. El todo es siempre el total, nunca un resto.",
        "tag": ""
      },
      "tenmore": {
        "name": "Diez más, diez menos",
        "phrase": "Diez más sube el dígito de las decenas. Diez menos lo baja.",
        "also": "",
        "steps": [
          "Ubica el dígito de las decenas.",
          "Diez más: suma 1 a las decenas.",
          "Diez menos: resta 1 de las decenas."
        ],
        "exception": "Las unidades no cambian al sumar o restar exactamente 10. 27 + 10 es 37, no 28.",
        "tag": ""
      },
      "sameboth": {
        "name": "Igual en ambos lados",
        "phrase": "Si ambos lados coinciden, usa el signo igual.",
        "also": "Balanza: lo que hagas en un lado debe mantener la historia verdadera.",
        "steps": [
          "Calcula cada lado si hace falta.",
          "Si las cantidades coinciden, escribe =.",
          "Si no, no son iguales."
        ],
        "exception": "Igual significa «mismo valor», no «se ven igual». 3 + 5 y 4 + 4 valen 8.",
        "tag": ""
      },
      "fingeradd": {
        "name": "Dedos para sumas pequeñas",
        "phrase": "Guarda el mayor; levanta dedos por el menor y cuenta hacia adelante.",
        "also": "",
        "steps": [
          "Pon el mayor en la cabeza (o en una mano).",
          "Levanta un dedo por cada unidad del menor.",
          "Cuenta hacia adelante desde el mayor."
        ],
        "exception": "Si la suma pasa de 10, forma un diez primero y usa los dedos que sobran.",
        "tag": ""
      },
      "beforeafter": {
        "name": "Antes y después",
        "phrase": "Antes es uno menos. Después es uno más.",
        "also": "",
        "steps": [
          "Después: cuenta uno hacia adelante.",
          "Antes: cuenta uno hacia atrás.",
          "La recta numérica ayuda."
        ],
        "exception": "Antes del 0 salimos de los naturales de uso cotidiano — en K–1 nos quedamos en 0 en adelante.",
        "tag": ""
      },
      "howmany": {
        "name": "¿Cuántos más?",
        "phrase": "¿Cuántos más? Empieza en el menor y cuenta hasta el mayor.",
        "also": "O resta: mayor − menor.",
        "steps": [
          "Hallar ambas cantidades.",
          "Resta el menor del mayor.",
          "Esa diferencia es «cuántos más»."
        ],
        "exception": "«Cuántos más» es una comparación, no un problema de «quedan en el plato».",
        "tag": ""
      },
      "dblfacts": {
        "name": "Hechos de dobles",
        "phrase": "Un doble es el mismo número dos veces: 6 + 6 = 12.",
        "also": "",
        "steps": [
          "Detecta dos números iguales.",
          "Doble significa sumar el número consigo mismo.",
          "Memoriza los dobles hasta 10 + 10."
        ],
        "exception": "Los casi dobles son vecinos (6 + 7). Los dobles puros son iguales exactos.",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Comparar y contar",
        "rows": [
          [
            "Cocodrilo hambriento",
            "La boca se abre al número mayor"
          ],
          [
            "Mismos números",
            "Usa = — no hay mayor"
          ],
          [
            "Contar hacia adelante",
            "Número grande en la cabeza, luego cuenta"
          ],
          [
            "Contar hacia atrás",
            "Empieza grande; un dedo por cada paso"
          ],
          [
            "Saltos de 2",
            "2, 4, 6, 8… los pares"
          ],
          [
            "Saltos de 5 / 10",
            "5 termina en 5 o 0; 10 termina en 0"
          ],
          [
            "Más / menos",
            "Comparar: ¿cuántos más? → resta"
          ]
        ]
      },
      {
        "title": "Pares que suman diez",
        "rows": [
          [
            "Compañeros del 10",
            "1+9, 2+8, 3+7, 4+6, 5+5"
          ],
          [
            "Formar un diez",
            "Completa 10 y suma lo que sobra"
          ],
          [
            "Número «teen»",
            "Es diez y algo más"
          ],
          [
            "Diez más",
            "Siguiente decena: 23 + 10 = 33"
          ],
          [
            "Dobles",
            "Igual + igual (6+6=12)"
          ],
          [
            "Casi dobles",
            "Doble el menor y +1"
          ],
          [
            "Parte–todo",
            "Todo = parte + parte; halla la parte faltante"
          ]
        ]
      },
      {
        "title": "Palabras clave",
        "rows": [
          [
            "Todo / en total",
            "Junta las partes → suma"
          ],
          [
            "Quedan / restan",
            "Quita → resta"
          ],
          [
            "Cada / grupos de",
            "Grupos iguales → multiplica"
          ],
          [
            "Repartir / dividir",
            "Partes iguales → divide"
          ]
        ]
      },
      {
        "title": "Datos rápidos",
        "rows": [
          [
            "El cero al sumar",
            "Sumar 0 no cambia nada; ×0 deja 0"
          ],
          [
            "Igual en ambos lados",
            "¿Mismos sumandos? Duplícalo"
          ],
          [
            "Suma con dedos",
            "Levanta dedos para sumas pequeñas"
          ],
          [
            "Antes / después",
            "Antes: uno menos; después: uno más"
          ],
          [
            "Estimar",
            "Redondea a una decena amiga y ajusta"
          ]
        ]
      }
    ]
  },
  "g1": {
    "grade": "Grados 1–2",
    "title": "Valor posicional y reagrupación",
    "blurb": "El lugar del dígito y cómo las decenas cambian con las unidades.",
    "lessons": {
      "place": {
        "name": "Valor posicional",
        "phrase": "El asiento le da el tamaño.",
        "also": "",
        "steps": [
          "Las unidades van a la derecha.",
          "Las decenas al lado.",
          "Las centenas un asiento más a la izquierda."
        ],
        "exception": "El dígito solo no es el valor. El 4 en 340 son 4 decenas, es decir 40.",
        "tag": ""
      },
      "carry": {
        "name": "Sumar con reagrupación",
        "phrase": "Diez unidades hacen una decena. Lleva la decena al siguiente asiento.",
        "also": "",
        "steps": [
          "Suma las unidades.",
          "Si tienes 10 o más, deja las unidades y lleva 1 decena.",
          "Suma las decenas más la decena que llevaste."
        ],
        "exception": "Solo llevas cuando las unidades hacen 10 o más. En 23 + 14 no hay llevada.",
        "tag": ""
      },
      "borrow": {
        "name": "Restar con reagrupación",
        "phrase": "¿Arriba más grande? Sigue. ¿Abajo más grande? Pide prestado una decena del vecino.",
        "also": "¿Iguales? El cero juega su papel.",
        "steps": [
          "Mira la columna de unidades.",
          "Si el de abajo es mayor, pide una decena al vecino.",
          "La unidad de arriba gana 10; la decena baja 1."
        ],
        "exception": "Nunca inviertas para restar el pequeño del grande. 52 − 27 es 25, no 35.",
        "tag": ""
      },
      "evenodd": {
        "name": "Pares e impares",
        "phrase": "Los pares reparten justo: todos tienen pareja. Los impares dejan uno solo.",
        "also": "Solo decide la última cifra: 0, 2, 4, 6, 8 son pares. 1, 3, 5, 7, 9 son impares.",
        "steps": [
          "Mira solo la última cifra.",
          "0, 2, 4, 6 u 8: par.",
          "1, 3, 5, 7 o 9: impar."
        ],
        "exception": "Ignora las demás cifras: 58 es par aunque el 5 sea impar. El 0 es par porque se divide en dos grupos iguales de nada.",
        "tag": ""
      },
      "round": {
        "name": "Redondear a 10 y 100",
        "phrase": "Cinco o más, sube el score. Cuatro o menos, déjalo.",
        "also": "",
        "steps": [
          "Ubica el dígito al que redondeas.",
          "Mira el dígito justo a su derecha.",
          "5 o más: sube 1. 4 o menos: se queda.",
          "Todas las cifras a la derecha pasan a 0."
        ],
        "exception": "Mira solo el dígito siguiente. 349 a la centena más cercana es 300 porque la decena es 4. No redondees dos veces (349 → 350 → 400). Un 9 que sube puede pasar de decena: 97 redondea a 100.",
        "tag": ""
      },
      "clock": {
        "name": "Leer la hora",
        "phrase": "Hora es palabra corta: manecilla corta. Minuto es palabra larga: manecilla larga.",
        "also": "La larga cuenta de 5 en 5: el número al que apunta × 5 son los minutos.",
        "steps": [
          "Corta: la última hora que ya pasó.",
          "Larga: número al que apunta × 5 = minutos.",
          "Di hora y minutos: 3:25."
        ],
        "exception": "Después de y media la corta se acerca a la siguiente hora, pero aún no cambió: a las 2:50 casi marca 3, pero sigue siendo 2. La larga en 12 son 0 minutos, en punto.",
        "tag": ""
      },
      "add3": {
        "name": "Sumar tres números",
        "phrase": "Busca un diez primero, luego suma el que falta.",
        "also": "",
        "steps": [
          "Busca dos números que sumen 10.",
          "Súmalos primero.",
          "Suma el tercero al 10."
        ],
        "exception": "Puedes sumar en cualquier orden, pero usa los tres. Si no hay par de 10, busca un doble o suma de izquierda a derecha.",
        "tag": ""
      },
      "month-knuckles": {
        "name": "Meses en los nudillos",
        "phrase": "Los nudillos son meses de 31 días; los valles entre ellos son más cortos.",
        "also": "Calendario con puños: cresta = 31, hueco = 30 (o febrero).",
        "steps": [
          "Junta los dos puños lado a lado.",
          "Nudillo = 31 días; el valle = menos días.",
          "Después de julio, sigue en el otro puño empezando en agosto.",
          "Febrero es el mes especial corto."
        ],
        "exception": "Febrero tiene 28 días, o 29 en año bisiesto. Después de julio continúas en el otro puño en agosto.",
        "tag": ""
      },
      "thirty-days-hath": {
        "name": "Thirty days hath…",
        "phrase": "Thirty days hath September, April, June, and November. (Treinta días tienen septiembre, abril, junio y noviembre.)",
        "also": "",
        "steps": [
          "Memoriza los cuatro meses de 30 días: septiembre, abril, junio, noviembre.",
          "El resto tienen 31.",
          "Excepto febrero: 28, o 29 en año bisiesto."
        ],
        "exception": "El resto tienen 31, excepto febrero (28 o 29 en bisiesto).",
        "tag": ""
      },
      "commute2": {
        "name": "Propiedad conmutativa",
        "phrase": "Puedes intercambiar el orden: a + b = b + a, y a × b = b × a.",
        "also": "",
        "steps": [
          "Cambia el orden.",
          "En + o × el resultado es el mismo.",
          "Usa el orden que te sea más cómodo."
        ],
        "exception": "La resta y la división no conmutan.",
        "tag": ""
      },
      "assoc2": {
        "name": "Propiedad asociativa",
        "phrase": "Asociar es reagrupar: (a + b) + c = a + (b + c).",
        "also": "Igual al multiplicar: agrupa factores cómodos primero.",
        "steps": [
          "Busca un par que sume 10 o un hecho conocido.",
          "Reagrupa ese par primero.",
          "Termina la suma o el producto."
        ],
        "exception": "Puedes reagrupar, pero no cambies los números. − y ÷ no son asociativas.",
        "tag": ""
      },
      "wordadd2": {
        "name": "Problemas verbales: sumar",
        "phrase": "En total, juntos, combinados, suma — junta las partes.",
        "also": "",
        "steps": [
          "Subraya la palabra clave.",
          "Escribe parte + parte.",
          "Suma."
        ],
        "exception": "«Suma» es adición. «Diferencia» es resta — no mezcles.",
        "tag": ""
      },
      "wordsub2": {
        "name": "Problemas verbales: restar",
        "phrase": "Quedan, restan, menos, quitar, diferencia — resta.",
        "also": "",
        "steps": [
          "Subraya la pista.",
          "Escribe todo − parte (o mayor − menor).",
          "Resta."
        ],
        "exception": "«Menos que» compara. «Quedan» quita del total. Alinea unidades bajo unidades.",
        "tag": ""
      },
      "wordmul2": {
        "name": "Problemas verbales: multiplicar",
        "phrase": "Cada, grupos de, filas de, veces — multiplica grupos iguales.",
        "also": "",
        "steps": [
          "Hallar grupos iguales.",
          "Cuenta grupos × tamaño del grupo.",
          "O cuenta saltando."
        ],
        "exception": "Grupos distintos se suman, no se multiplican de una sola vez.",
        "tag": ""
      },
      "worddiv2": {
        "name": "Problemas verbales: dividir",
        "phrase": "Repartir, dividir en partes iguales, cuántos en cada, cuántos grupos — divide.",
        "also": "",
        "steps": [
          "Hallar el total.",
          "¿Cuántos grupos o cuántos en cada grupo?",
          "Divide."
        ],
        "exception": "Pregunta qué buscas: tamaño de cada parte o número de partes.",
        "tag": ""
      },
      "estimate2": {
        "name": "Estimar sumas",
        "phrase": "Redondea ambos y suma — un estimado amigable.",
        "also": "",
        "steps": [
          "Redondea cada número a la decena más cercana.",
          "Suma los redondeados.",
          "Di «aproximadamente»."
        ],
        "exception": "Redondear ambos hacia arriba puede pasarse. El estimado comprueba el exacto, no lo reemplaza cuando necesitas precisión.",
        "tag": ""
      },
      "mental10": {
        "name": "Cálculo mental con decenas",
        "phrase": "Decenas con decenas, unidades con unidades — luego combina.",
        "also": "",
        "steps": [
          "Separa cada número en decenas y unidades.",
          "Suma decenas. Suma unidades.",
          "Vuelve a juntar."
        ],
        "exception": "Si las unidades hacen 10 o más, reagrupa una decena extra.",
        "tag": ""
      },
      "expanded": {
        "name": "Forma expandida",
        "phrase": "La forma expandida muestra cuánto vale cada asiento.",
        "also": "352 = 300 + 50 + 2.",
        "steps": [
          "Lee el asiento de cada dígito.",
          "Escribe su valor.",
          "Suma los valores con signos +."
        ],
        "exception": "No escribas 352 = 3 + 5 + 2. Importan los asientos: 300 + 50 + 2.",
        "tag": ""
      },
      "factfam": {
        "name": "Familias de operaciones",
        "phrase": "Una familia: dos sumas y dos restas con los mismos tres números.",
        "also": "",
        "steps": [
          "Lista los tres números (dos partes y el todo).",
          "Escribe las dos sumas.",
          "Escribe las dos restas."
        ],
        "exception": "Si dos números son iguales (dobles), la familia tiene menos frases distintas.",
        "tag": ""
      },
      "half2": {
        "name": "Mitades",
        "phrase": "Mitad significa dos partes iguales.",
        "also": "",
        "steps": [
          "Forma dos grupos iguales.",
          "Cada grupo es una mitad.",
          "La mitad de un par es un número entero."
        ],
        "exception": "La mitad de una cantidad impar deja residuo — no puedes repartir 7 manzanas en dos montones enteros iguales sin cortar.",
        "tag": ""
      },
      "compare3": {
        "name": "Comparar números de tres cifras",
        "phrase": "Compara de izquierda a derecha: centenas, decenas, unidades.",
        "also": "",
        "steps": [
          "Mira las centenas.",
          "Si empatan, mira las decenas.",
          "Si siguen, mira las unidades."
        ],
        "exception": "Un dígito mayor a la derecha no gana si a la izquierda ya decidió: 199 < 201.",
        "tag": ""
      },
      "moneycent": {
        "name": "Monedas hasta un dólar",
        "phrase": "100 centavos hacen un dólar. Cuenta saltos de moneda.",
        "also": "",
        "steps": [
          "Valores: quarter 25, dime 10, nickel 5, penny 1.",
          "Suma subiendo por valor de moneda.",
          "Para en 100 para un dólar."
        ],
        "exception": "Cuatro quarters hacen un dólar — no cuatro dimes.",
        "tag": ""
      },
      "skip2": {
        "name": "Contar saltando para multiplicar",
        "phrase": "Contar saltando es multiplicar a saltos.",
        "also": "",
        "steps": [
          "Elige el tamaño del salto.",
          "Salta esa cantidad de veces.",
          "Donde aterrizas es el producto."
        ],
        "exception": "Cada salto del mismo tamaño. Saltos distintos rompen la historia de multiplicar.",
        "tag": ""
      },
      "identity2": {
        "name": "Elementos neutros",
        "phrase": "Suma 0: sigues igual. Multiplica por 1: sigues igual.",
        "also": "",
        "steps": [
          "+ 0 no cambia el número.",
          "× 1 no cambia el número.",
          "Esas son reglas de identidad."
        ],
        "exception": "× 0 no es identidad — deja el número en 0.",
        "tag": ""
      },
      "distrib2": {
        "name": "Vista previa distributiva",
        "phrase": "Distribuir es repartir el factor de afuera a cada sumando dentro del paréntesis.",
        "also": "a × (b + c) = a × b + a × c.",
        "steps": [
          "Hay un número afuera con una suma adentro.",
          "Multiplica el de afuera por cada parte.",
          "Suma esos productos."
        ],
        "exception": "Distribuye sobre + o − adentro. No confundas (a + b) × c con a + (b × c) cuando buscas a(b + c).",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Valor posicional",
        "rows": [
          [
            "El asiento da el tamaño",
            "Unidades derecha, decenas al lado, centenas izquierda"
          ],
          [
            "Dígito ≠ valor",
            "4 en 340 = 4 decenas = 40"
          ],
          [
            "Forma expandida",
            "352 = 300 + 50 + 2"
          ],
          [
            "Par / impar",
            "Última cifra par → par; impar deja uno solo"
          ]
        ]
      },
      {
        "title": "Reagrupación",
        "rows": [
          [
            "Llevada",
            "Diez unidades = una decena — lleva al vecino"
          ],
          [
            "Pedir prestado",
            "¿Abajo más grande? Pide una decena"
          ],
          [
            "Tres sumandos",
            "Busca un diez primero"
          ],
          [
            "Tres cifras",
            "Centenas, decenas, unidades"
          ]
        ]
      },
      {
        "title": "Redondeo, hora y calendario",
        "rows": [
          [
            "Redondear",
            "5 o más sube; 4 o menos se queda"
          ],
          [
            "Manecilla corta",
            "Hora (palabra corta → mano corta)"
          ],
          [
            "Manecilla larga",
            "Minuto; número × 5"
          ],
          [
            "Nudillos",
            "Meses en nudillos = 31 días"
          ],
          [
            "Thirty days hath",
            "…abril, junio, noviembre… (excepto febrero)"
          ]
        ]
      },
      {
        "title": "Hechos y propiedades",
        "rows": [
          [
            "Conmutativa (+)",
            "3 + 5 = 5 + 3 — invierte sumandos"
          ],
          [
            "Asociativa",
            "Agrupa dos sumandos como quieras"
          ],
          [
            "Distributiva",
            "a×(b+c) = a×b + a×c"
          ],
          [
            "Familia",
            "3, 4, 7 → 3+4, 4+3, 7−3, 7−4"
          ],
          [
            "Mitad de par",
            "Dos montones iguales"
          ],
          [
            "Identidad",
            "+0 y ×1 dejan el número"
          ]
        ]
      },
      {
        "title": "Palabras y dinero",
        "rows": [
          [
            "Palabras: suma / resta",
            "Clave → + o −"
          ],
          [
            "Palabras: cada / repartir",
            "Cada → ×; repartir → ÷"
          ],
          [
            "Mental +10",
            "Decena +1; unidades igual"
          ],
          [
            "Centavos",
            "100¢ = $1; quarters de 25"
          ],
          [
            "Estimar",
            "Redondea a la decena y calcula"
          ]
        ]
      }
    ]
  },
  "g3": {
    "grade": "Grados 3–4",
    "title": "Tablas y división",
    "blurb": "Un truco por familia de multiplicación, rimas para los hechos difíciles y división larga.",
    "lessons": {
      "groups": {
        "name": "Qué significa ×",
        "phrase": "Veces significa grupos de.",
        "also": "",
        "steps": [
          "Lee 3 × 4 como 3 grupos de 4.",
          "Dibuja los grupos o cuenta saltando: 4, 8, 12.",
          "El orden no cambia el total: 4 grupos de 3 también es 12."
        ],
        "exception": "Veces no es más. 3 × 4 no es 7. Cualquier cosa × 0 es 0, y × 1 deja el número.",
        "tag": ""
      },
      "doubles": {
        "name": "×2, ×4, ×8",
        "phrase": "×2 es duplicar. ×4 es doble del doble. ×8 es triple doble.",
        "also": "",
        "steps": [
          "Duplica una vez para ×2.",
          "Duplica otra vez para ×4.",
          "Duplica una vez más para ×8."
        ],
        "exception": "Cuenta los duplicados. Dos duplicados son ×4, no ×8. ×6 no es familia de duplicados: es ×5 más un grupo.",
        "tag": ""
      },
      "fives": {
        "name": "×5",
        "phrase": "Los cincos son la mitad de los dieces.",
        "also": "Los cincos terminan en 5 o 0.",
        "steps": [
          "Multiplica por 10: pon un 0 al final.",
          "Toma la mitad de eso."
        ],
        "exception": "Par de cincos termina en 0; impar termina en 5. Si termina en otra cifra, revisa.",
        "tag": ""
      },
      "nines": {
        "name": "×9",
        "phrase": "Dobla el dedo. Izquierda = decenas, derecha = unidades.",
        "also": "Los dígitos siempre suman nueve.",
        "steps": [
          "Levanta diez dedos.",
          "Para 9 × 7, dobla el dedo 7.",
          "6 dedos a la izquierda, 3 a la derecha: 63."
        ],
        "exception": "Los dedos sirven hasta 9 × 10. Para 9 × 12, haz 10 × 12 y resta 12. 9 × 0 es 0.",
        "tag": ""
      },
      "rhymes": {
        "name": "Hechos difíciles",
        "phrase": "Five, six, seven, eight: fifty-six is seven times eight.",
        "also": "I ate and ate and got sick on the floor: eight times eight is sixty-four.",
        "steps": [
          "Six times six, magic tricks: thirty-six.",
          "I know now and you do too: six times seven is forty-two.",
          "Six and eight went on a date, came back as forty-eight.",
          "Seven and seven are doing fine: forty-nine.",
          "Five, six, seven, eight: fifty-six is seven times eight.",
          "I ate and ate and got sick on the floor: eight times eight is sixty-four."
        ],
        "exception": "Una rima es gancho, no demostración. Si la olvidas, construye desde un hecho: 7 × 8 = 7 × 7 + 7 = 49 + 7 = 56.",
        "tag": ""
      },
      "elevens": {
        "name": "×11 con dos dígitos",
        "phrase": "Separa los dígitos. Mete su suma en medio.",
        "also": "",
        "steps": [
          "Parte 23 en 2 y 3.",
          "Súmalos: 5.",
          "Mete el 5 en medio: 253."
        ],
        "exception": "Si la suma del medio es 10 o más, lleva 1 a la izquierda. 85 × 11: 8 + 5 = 13 → 9, 3, 5 = 935.",
        "tag": ""
      },
      "longdiv": {
        "name": "División larga",
        "phrase": "Does McDonald’s Sell Burgers? (¿McDonald’s vende hamburguesas?) — Divide, Multiplica, Resta, Baja.",
        "also": "Dad, Mom, Sister, Brother, and Rover — el perro repite el ciclo.",
        "steps": [
          "Divide: ¿cuántas veces cabe?",
          "Multiplica: ese resultado × el divisor.",
          "Resta: ¿qué queda?",
          "Baja el siguiente dígito y repite."
        ],
        "exception": "Lo que queda debe ser menor que el divisor. Si no, el cociente fue muy pequeño. Si no cabe, pon 0 en el cociente antes de bajar.",
        "tag": ""
      },
      "divis": {
        "name": "Reglas de divisibilidad",
        "phrase": "Última cifra para 2, 5 y 10. Suma de dígitos para 3 y 9. Dos últimas para 4. El 6 necesita 2 y 3.",
        "also": "",
        "steps": [
          "2: la última cifra es par.",
          "5: termina en 0 o 5. 10: termina en 0.",
          "3 o 9: suma dígitos; si divide por 3 (o 9), el número también.",
          "4: las dos últimas cifras dividen entre 4.",
          "6: pasa prueba de 2 y de 3."
        ],
        "exception": "Sumar dígitos solo sirve para 3 y 9, no para 4 o 7. El 6 exige ambas: 15 pasa 3 pero es impar, falla 6.",
        "tag": ""
      },
      "primes": {
        "name": "Factores, múltiplos y primos",
        "phrase": "Factores son pocos, múltiplos muchos. Un primo tiene solo dos factores: 1 y él mismo.",
        "also": "Los factores caben en el número. Los múltiplos salen al multiplicarlo.",
        "steps": [
          "Factores de 12: dividen 12 exacto: 1, 2, 3, 4, 6, 12.",
          "Múltiplos de 12: 12, 24, 36… sin fin.",
          "Primo: exactamente dos factores, como 7 (1 y 7).",
          "Compuesto: más de dos, como 9 (1, 3, 9)."
        ],
        "exception": "1 no es primo: solo tiene un factor. 2 es el único primo par. Impar no implica primo: 9, 15 y 21 son compuestos.",
        "tag": ""
      },
      "areaper": {
        "name": "Área y perímetro",
        "phrase": "Perímetro es la cerca alrededor. Área es la alfombra adentro.",
        "also": "",
        "steps": [
          "Perímetro: suma los cuatro lados, o 2 × (largo + ancho).",
          "Área: largo × ancho.",
          "Perímetro es longitud (cm). Área es cuadrados (cm²)."
        ],
        "exception": "No los mezcles: un rectángulo 5 × 3 tiene perímetro 16 y área 15. Dos figuras con igual área pueden tener distinto perímetro.",
        "tag": ""
      },
      "roundbig": {
        "name": "Redondear números grandes",
        "phrase": "Subraya la posición. Mira a la derecha. Cinco o más, sube el score.",
        "also": "Cuatro o menos, déjalo.",
        "steps": [
          "Subraya el dígito de la posición elegida.",
          "Mira el dígito de la derecha.",
          "5 o más: sube 1. 4 o menos: igual.",
          "Las cifras a la derecha pasan a 0."
        ],
        "exception": "Si sube un 9, puede pasar de decena: 3,960 a la centena más cercana es 4,000. No redondees por pasos: 3,449 → 3,400, no 3,500.",
        "tag": ""
      },
      "equivfr": {
        "name": "Fracciones equivalentes",
        "phrase": "Lo que hagas arriba, hazlo abajo.",
        "also": "",
        "steps": [
          "Elige un número.",
          "Multiplica (o divide) el numerador.",
          "Haz lo mismo al denominador. Se ve distinto, pero es la misma cantidad."
        ],
        "exception": "Solo × y ÷. Sumar lo mismo arriba y abajo cambia el valor: 1/2 no es 2/3.",
        "tag": ""
      },
      "times10": {
        "name": "× 10, 100, 1000",
        "phrase": "Cada cero desplaza los dígitos un lugar a la izquierda.",
        "also": "× 10: un lugar. × 100: dos. × 1000: tres. Los ceros llenan huecos.",
        "steps": [
          "Cuenta los ceros en 10, 100 o 1000.",
          "Desplaza todos los dígitos esa cantidad a la izquierda.",
          "Llena con ceros los asientos vacíos."
        ],
        "exception": "Cuenta solo los ceros del 10, 100 o 1000. 40 × 100 = 4,000: el 0 de 40 también se mueve.",
        "tag": ""
      },
      "roman-iview": {
        "name": "Números romanos I V X",
        "phrase": "I View Xylophones: I=1, V=5, X=10 (extiende: L=50, C=100, D=500, M=1000).",
        "also": "I View X-rays también sirve para los tres primeros.",
        "steps": [
          "Aprende I=1, V=5, X=10, L=50, C=100, D=500, M=1000.",
          "Lee de izquierda a derecha sumando.",
          "Usa resta cuando un símbolo menor va antes de uno mayor."
        ],
        "exception": "Resta: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900.",
        "tag": ""
      },
      "commute3": {
        "name": "Conmutativa de la multiplicación",
        "phrase": "Los factores pueden cambiar de lugar: 6 × 7 = 7 × 6.",
        "also": "",
        "steps": [
          "Escribe el producto en cualquier orden.",
          "Usa el orden que conozcas mejor.",
          "El resultado coincide."
        ],
        "exception": "El arreglo se ve distinto (2×6 vs 6×2) pero cuenta los mismos puntos.",
        "tag": ""
      },
      "assoc3": {
        "name": "Asociativa de la multiplicación",
        "phrase": "Reagrupa factores: (2 × 3) × 4 = 2 × (3 × 4).",
        "also": "",
        "steps": [
          "Busca un par cómodo (como ×10).",
          "Multiplica ese par primero.",
          "Multiplica por el factor que sobra."
        ],
        "exception": "Solo reagrupa — no pierdas ningún factor.",
        "tag": ""
      },
      "distrib3": {
        "name": "Propiedad distributiva",
        "phrase": "Parte un producto difícil en dos fáciles y suma.",
        "also": "7 × 6 = 7 × (5 + 1) = 35 + 7.",
        "steps": [
          "Divide un factor en partes amigas.",
          "Multiplica cada parte.",
          "Suma los productos parciales."
        ],
        "exception": "Divide en una suma (o resta), no en un producto — es otra regla.",
        "tag": ""
      },
      "wordkeys3": {
        "name": "Palabras clave en problemas",
        "phrase": "Todo/en total=suma · quedan/restan=resta · cada/grupos=multiplica · repartir=divide.",
        "also": "",
        "steps": [
          "Busca una palabra clave.",
          "Elige la operación que suele indicar.",
          "Escribe la oración numérica y resuelve."
        ],
        "exception": "Las palabras ayudan, pero gana la historia — «cada» puede dividir al repartir.",
        "tag": ""
      },
      "estimate3": {
        "name": "Estimar productos",
        "phrase": "Redondea y multiplica — ¿aproximadamente cuántos?",
        "also": "",
        "steps": [
          "Redondea cada factor a un número amigo.",
          "Multiplica los redondeados.",
          "Etiqueta «aproximadamente»."
        ],
        "exception": "Redondear ambos hacia arriba sobrestima. Sirve para comprobar el orden de magnitud.",
        "tag": ""
      },
      "gallon": {
        "name": "Gallon Man",
        "phrase": "King Gallon tenía 4 cuartos; cada cuarto 2 pintas; cada pinta 2 tazas.",
        "also": "4 quarts = 1 gallon. 2 pints = 1 quart. 2 cups = 1 pint.",
        "steps": [
          "Cuerpo = 4 cuartos (quarts).",
          "Cada cuarto: 2 pintas (pints).",
          "Cada pinta: 2 tazas (cups)."
        ],
        "exception": "Medidas líquidas de EE. UU. No mezcles con litros sin convertir.",
        "tag": ""
      },
      "kinghenry3": {
        "name": "King Henry (métrico)",
        "phrase": "King Henry Died By Drinking Chocolate Milk. (Rey Enrique murió bebiendo chocolate.)",
        "also": "Kilo, Hecto, Deca, base, Deci, Centi, Milli — cada paso ×10 o ÷10.",
        "steps": [
          "Alinea los prefijos con las palabras del rey.",
          "Cuenta saltos entre unidades.",
          "Mueve la coma decimal esa cantidad."
        ],
        "exception": "«By» es la unidad base. Mega/micro/nano quedan fuera de esta escalera. Millas y pulgadas necesitan otros puentes.",
        "tag": ""
      },
      "zeroprop": {
        "name": "Cero y uno al multiplicar",
        "phrase": "Por cero borra. Por uno conserva.",
        "also": "",
        "steps": [
          "n × 0 = 0.",
          "n × 1 = n.",
          "Úsalos como comprobación rápida."
        ],
        "exception": "Sumar cero conserva n; multiplicar por cero no.",
        "tag": ""
      },
      "remain3": {
        "name": "Residuos",
        "phrase": "Divide hasta no poder otro grupo completo — lo que sobra es el residuo.",
        "also": "",
        "steps": [
          "Divide cuántos grupos completos.",
          "Multiplica de vuelta.",
          "Resta del total — lo que queda es R."
        ],
        "exception": "El residuo debe ser menor que el divisor. Si no, cabe otro grupo.",
        "tag": ""
      },
      "array3": {
        "name": "Arreglos",
        "phrase": "Filas × columnas — un arreglo muestra la multiplicación.",
        "also": "",
        "steps": [
          "Cuenta las filas.",
          "Cuenta cuántos hay en cada fila.",
          "Multiplica filas × columnas."
        ],
        "exception": "Un montón suelto no es arreglo hasta que formes filas iguales.",
        "tag": ""
      },
      "orderops3": {
        "name": "× antes que +",
        "phrase": "My Dear antes que Aunt Sally: multiplica antes de sumar.",
        "also": "Vista temprana del orden de operaciones (PEMDAS / GEMS / BODMAS: mismos niveles).",
        "steps": [
          "Busca × o ÷.",
          "Hazlos primero (izquierda a derecha).",
          "Luego + y −."
        ],
        "exception": "Los paréntesis mandan. × y ÷ empatan izquierda a derecha; sin paréntesis, ×÷ van antes que +−.",
        "tag": ""
      },
      "northdakota": {
        "name": "Numerador y denominador",
        "phrase": "Nice Dog: Numerador arriba, Denominador abajo. N antes que D.",
        "also": "North Dakota — N sobre D.",
        "steps": [
          "Arriba: numerador (N).",
          "Abajo: denominador (D).",
          "N antes que D en el alfabeto — arriba antes que abajo en el nombre."
        ],
        "exception": "La barra significa dividir: arriba ÷ abajo, no al revés.",
        "tag": ""
      },
      "mental3": {
        "name": "Cálculo mental: ×10 y ×100",
        "phrase": "×10 agrega un cero. ×100 agrega dos ceros.",
        "also": "",
        "steps": [
          "En ×10, pon un 0 al final.",
          "En ×100, pon dos ceros.",
          "Es desplazar el valor posicional."
        ],
        "exception": "Con decimales los ceros funcionan distinto — los dígitos cruzan la coma.",
        "tag": ""
      },
      "patterns3": {
        "name": "Patrones numéricos",
        "phrase": "Hallar la regla del salto y seguir saltando.",
        "also": "",
        "steps": [
          "Resta vecinos para ver el salto.",
          "Comprueba que el salto sea constante.",
          "Aplica el salto al siguiente término."
        ],
        "exception": "Algunos patrones cambian de regla (cuadrados). Aquí trabajamos saltos constantes.",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Tablas de multiplicar",
        "rows": [
          [
            "Veces significa",
            "Grupos de"
          ],
          [
            "×2, ×4, ×8",
            "Doble → doble-doble → triple doble"
          ],
          [
            "×5",
            "Mitad de los dieces"
          ],
          [
            "×9 con dedos",
            "Izquierda = decenas, derecha = unidades"
          ],
          [
            "5-6-7-8",
            "56 es 7 × 8"
          ],
          [
            "×11 (2 dígitos)",
            "Separa; mete la suma en medio"
          ],
          [
            "×12",
            "×10, luego suma el doble del número"
          ],
          [
            "Rimas difíciles",
            "6×6=36, 7×8=56, 8×8=64…"
          ]
        ]
      },
      {
        "title": "División y sentido numérico",
        "rows": [
          [
            "División larga",
            "Does McDonald’s Sell Burgers? (÷ × − baja)"
          ],
          [
            "Residuo",
            "Lo que sobra tras repartir justo"
          ],
          [
            "Divisibilidad",
            "2/5/10: última cifra; 3/9: suma; 4: dos últimas"
          ],
          [
            "Factores vs múltiplos",
            "Factores son pocos; múltiplos, muchos"
          ],
          [
            "Primo",
            "Exactamente dos factores: 1 y él mismo"
          ],
          [
            "Propiedad del cero",
            "n × 0 = 0; n ÷ 1 = n"
          ]
        ]
      },
      {
        "title": "Fracciones y decimales",
        "rows": [
          [
            "Equivalentes",
            "Lo de arriba, lo de abajo — mismo × o ÷"
          ],
          [
            "×10 / 100 / 1000",
            "Cada cero desplaza un lugar a la izquierda"
          ],
          [
            "Tomatoes on a fence",
            "Numerador arriba, denominador abajo"
          ]
        ]
      },
      {
        "title": "Medida y orden",
        "rows": [
          [
            "Perímetro",
            "Cerca alrededor"
          ],
          [
            "Área",
            "Alfombra adentro"
          ],
          [
            "King Henry",
            "King Henry Died By Drinking Chocolate Milk (kilo→milli)"
          ],
          [
            "Gallon land",
            "4 quarts = 1 gallon; 2 pints = 1 quart"
          ],
          [
            "PEMDAS",
            "Paréntesis → potencias → ×÷ luego +− (cada uno izq. a der.)"
          ],
          [
            "GEMS / BODMAS",
            "Mismos niveles que PEMDAS; ×÷ y +− cada uno izq. a der."
          ],
          [
            "Arreglos",
            "Filas × columnas = total"
          ],
          [
            "Romano i-v",
            "I, V, X — IV = 4 en el reloj"
          ]
        ]
      },
      {
        "title": "Propiedades y patrones",
        "rows": [
          [
            "Conmutativa / asociativa",
            "Reordena factores al multiplicar"
          ],
          [
            "Distributiva",
            "Parte un factor en trozos amigos"
          ],
          [
            "Cálculo mental",
            "Números compatibles (25, 50, 100)"
          ],
          [
            "Patrones",
            "¿Qué cambia cada paso? Predice el siguiente"
          ]
        ]
      }
    ]
  },
  "tables": {
    "grade": "Tablas",
    "title": "Tablas del 2 al 12",
    "blurb": "Un truco mnemotécnico por tabla y un rompecabezas para completar los huecos.",
    "lessons": {
      "t2": {
        "name": "×2",
        "phrase": "Multiplicar por dos es duplicar.",
        "also": [
          "1 × 2 = 2",
          "2 × 2 = 4",
          "3 × 2 = 6",
          "4 × 2 = 8",
          "5 × 2 = 10",
          "6 × 2 = 12",
          "7 × 2 = 14",
          "8 × 2 = 16",
          "9 × 2 = 18",
          "10 × 2 = 20",
          "11 × 2 = 22",
          "12 × 2 = 24"
        ],
        "steps": [
          "Toma el otro número.",
          "Súmalo consigo mismo (o cuenta de 2 en 2).",
          "Ese total es el producto."
        ],
        "exception": "Duplicar es ×2, no ×4. ×4 requiere dos duplicados. Y 0 × 2 sigue siendo 0.",
        "tag": ""
      },
      "t3": {
        "name": "×3",
        "phrase": "Duplícalo y suma un grupo más.",
        "also": [
          "1 × 3 = 3",
          "2 × 3 = 6",
          "3 × 3 = 9",
          "4 × 3 = 12",
          "5 × 3 = 15",
          "6 × 3 = 18",
          "7 × 3 = 21",
          "8 × 3 = 24",
          "9 × 3 = 27",
          "10 × 3 = 30",
          "11 × 3 = 33",
          "12 × 3 = 36"
        ],
        "steps": [
          "Primero duplica el otro número (eso es ×2).",
          "Suma una copia más de ese número.",
          "Doble más un grupo es ×3."
        ],
        "exception": "No te quedes solo con el doble — eso es solo ×2. Y 3 × 3 es 9, no 6.",
        "tag": ""
      },
      "t4": {
        "name": "×4",
        "phrase": "Multiplicar por cuatro es doble del doble.",
        "also": [
          "1 × 4 = 4",
          "2 × 4 = 8",
          "3 × 4 = 12",
          "4 × 4 = 16",
          "5 × 4 = 20",
          "6 × 4 = 24",
          "7 × 4 = 28",
          "8 × 4 = 32",
          "9 × 4 = 36",
          "10 × 4 = 40",
          "11 × 4 = 44",
          "12 × 4 = 48"
        ],
        "steps": [
          "Duplica el otro número una vez.",
          "Vuelve a duplicar ese resultado.",
          "Dos duplicados hacen ×4."
        ],
        "exception": "Cuenta los duplicados: uno es ×2, dos son ×4, tres son ×8. Parar antes da la mitad del resultado.",
        "tag": ""
      },
      "t5": {
        "name": "×5",
        "phrase": "Los cincos son la mitad de los dieces — y terminan en 0 o 5.",
        "also": [
          "1 × 5 = 5",
          "2 × 5 = 10",
          "3 × 5 = 15",
          "4 × 5 = 20",
          "5 × 5 = 25",
          "6 × 5 = 30",
          "7 × 5 = 35",
          "8 × 5 = 40",
          "9 × 5 = 45",
          "10 × 5 = 50",
          "11 × 5 = 55",
          "12 × 5 = 60"
        ],
        "steps": [
          "Multiplica por 10: pon un 0 al final.",
          "Toma la mitad de ese resultado de los dieces.",
          "Comprueba: par ×5 termina en 0; impar ×5 termina en 5."
        ],
        "exception": "Si el resultado no termina en 0 o 5, está mal. Mitad del producto por diez, no la mitad del factor solo.",
        "tag": ""
      },
      "t6": {
        "name": "×6",
        "phrase": "El seis es cinco más un grupo más.",
        "also": [
          "1 × 6 = 6",
          "2 × 6 = 12",
          "3 × 6 = 18",
          "4 × 6 = 24",
          "5 × 6 = 30",
          "6 × 6 = 36",
          "7 × 6 = 42",
          "8 × 6 = 48",
          "9 × 6 = 54",
          "10 × 6 = 60",
          "11 × 6 = 66",
          "12 × 6 = 72"
        ],
        "steps": [
          "Calcula ×5 primero (mitad de los dieces).",
          "Suma una copia más del otro número.",
          "×5 más un grupo es ×6."
        ],
        "exception": "No olvides sumar el grupo extra después de ×5. Y 6 × 6 es 36 («magic tricks»), no 30.",
        "tag": ""
      },
      "t7": {
        "name": "×7",
        "phrase": "Five, six, seven, eight: fifty-six is seven times eight. (5, 6, 7, 8: 56 es 7 × 8.)",
        "also": [
          "1 × 7 = 7",
          "2 × 7 = 14",
          "3 × 7 = 21",
          "4 × 7 = 28",
          "5 × 7 = 35",
          "6 × 7 = 42",
          "7 × 7 = 49",
          "8 × 7 = 56",
          "9 × 7 = 63",
          "10 × 7 = 70",
          "11 × 7 = 77",
          "12 × 7 = 84"
        ],
        "steps": [
          "Usa las rimas famosas para los hechos difíciles (7×7, 7×8).",
          "Para otros factores, construye desde un hecho que sepas: 7 × 6 es 7 × 5 más 7.",
          "O cuenta de 7 en 7: 7, 14, 21, 28…"
        ],
        "exception": "La rima es un gancho, no la razón. Si la olvidas, usa 7 × 7 = 49 y suma o resta sietes. 7 × 0 es 0.",
        "tag": ""
      },
      "t8": {
        "name": "×8",
        "phrase": "Multiplicar por ocho es doble-doble-doble.",
        "also": [
          "1 × 8 = 8",
          "2 × 8 = 16",
          "3 × 8 = 24",
          "4 × 8 = 32",
          "5 × 8 = 40",
          "6 × 8 = 48",
          "7 × 8 = 56",
          "8 × 8 = 64",
          "9 × 8 = 72",
          "10 × 8 = 80",
          "11 × 8 = 88",
          "12 × 8 = 96"
        ],
        "steps": [
          "Duplica el otro número una vez (×2).",
          "Duplica otra vez (×4).",
          "Duplica una vez más (×8)."
        ],
        "exception": "Tres duplicados, no dos — parar en ×4 es la mitad de ×8. Cuadrado difícil: «I ate and ate and got sick on the floor: eight times eight is sixty-four.» (Comí y comí y me mareé: 8 × 8 = 64.)",
        "tag": ""
      },
      "t9": {
        "name": "×9",
        "phrase": "Dobla el dedo. Los dígitos siempre suman nueve.",
        "also": [
          "1 × 9 = 9",
          "2 × 9 = 18",
          "3 × 9 = 27",
          "4 × 9 = 36",
          "5 × 9 = 45",
          "6 × 9 = 54",
          "7 × 9 = 63",
          "8 × 9 = 72",
          "9 × 9 = 81",
          "10 × 9 = 90",
          "11 × 9 = 99",
          "12 × 9 = 108"
        ],
        "steps": [
          "Levanta diez dedos.",
          "Para 9 × n, dobla el dedo n.",
          "Dedos a la izquierda son decenas; a la derecha, unidades. Comprueba: los dos dígitos suman 9."
        ],
        "exception": "Los dedos sirven de 9 × 1 a 9 × 10. Para 9 × 11 o 9 × 12, haz 10 × ese número y réstalo. 9 × 0 es 0.",
        "tag": ""
      },
      "t10": {
        "name": "×10",
        "phrase": "Multiplicar por diez: pon un 0 al final.",
        "also": [
          "1 × 10 = 10",
          "2 × 10 = 20",
          "3 × 10 = 30",
          "4 × 10 = 40",
          "5 × 10 = 50",
          "6 × 10 = 60",
          "7 × 10 = 70",
          "8 × 10 = 80",
          "9 × 10 = 90",
          "10 × 10 = 100",
          "11 × 10 = 110",
          "12 × 10 = 120"
        ],
        "steps": [
          "Escribe el otro número.",
          "Pon un 0 al final.",
          "Ese es el producto."
        ],
        "exception": "Poner un 0 es ×10, no ×100 (ese necesita dos ceros). Y 10 × 0 es 0, no 10.",
        "tag": ""
      },
      "t11": {
        "name": "×11",
        "phrase": "Un dígito: escríbelo dos veces. Dos dígitos: parte y mete la suma en medio.",
        "also": [
          "1 × 11 = 11",
          "2 × 11 = 22",
          "3 × 11 = 33",
          "4 × 11 = 44",
          "5 × 11 = 55",
          "6 × 11 = 66",
          "7 × 11 = 77",
          "8 × 11 = 88",
          "9 × 11 = 99",
          "10 × 11 = 110",
          "11 × 11 = 121",
          "12 × 11 = 132"
        ],
        "steps": [
          "Del 1 al 9: escribe el dígito dos veces (7 × 11 = 77).",
          "Con dos dígitos: separa, súmalos y mete la suma en medio.",
          "Ejemplo: 23 → 2 y 3, suma 5, queda 253."
        ],
        "exception": "Si la suma del medio es 10 o más, lleva 1 al dígito de la izquierda. Más de dos dígitos usa el mismo idea con llevadas. 11 × 11 = 121; 11 × 12 = 132.",
        "tag": ""
      },
      "t12": {
        "name": "×12",
        "phrase": "Doce es diez más dos: ×10 y luego suma el doble.",
        "also": [
          "1 × 12 = 12",
          "2 × 12 = 24",
          "3 × 12 = 36",
          "4 × 12 = 48",
          "5 × 12 = 60",
          "6 × 12 = 72",
          "7 × 12 = 84",
          "8 × 12 = 96",
          "9 × 12 = 108",
          "10 × 12 = 120",
          "11 × 12 = 132",
          "12 × 12 = 144"
        ],
        "steps": [
          "Calcula ×10: pon un 0 al final.",
          "Calcula ×2: duplica el otro número.",
          "Suma esos dos resultados."
        ],
        "exception": "Suma ×10 y ×2 — no los multipliques entre sí. 12 × 12 es 144, no 120 + 12.",
        "tag": ""
      }
    },
    "cheat": [
      {
        "title": "Ganchos por tabla",
        "rows": [
          [
            "×2",
            "Duplícalo."
          ],
          [
            "×3",
            "Doble y luego un grupo más."
          ],
          [
            "×4",
            "Doble del doble."
          ],
          [
            "×5",
            "Mitad de los dieces; termina en 0 o 5."
          ],
          [
            "×6",
            "×5 más un grupo."
          ],
          [
            "×7",
            "5, 6, 7, 8 → 56 es 7×8."
          ],
          [
            "×8",
            "Triple doble; 8×8=64."
          ],
          [
            "×9",
            "Dobla un dedo; dígitos suman 9."
          ],
          [
            "×10",
            "Pon un 0 al final."
          ],
          [
            "×11",
            "Escribe dos veces, o parte y mete la suma."
          ],
          [
            "×12",
            "×10 y luego suma el doble."
          ]
        ]
      },
      {
        "title": "Patrones de las tablas",
        "rows": [
          [
            "Conmutativa",
            "a × b = b × a — invierte los factores"
          ],
          [
            "×0 / ×1",
            "Cero borra; uno deja el número"
          ],
          [
            "Familia de dobles",
            "×2, ×4 y ×8 usan duplicar"
          ],
          [
            "Comprueba con ÷",
            "Producto ÷ factor = el otro factor"
          ],
          [
            "Hechos con rima",
            "7×8=56; 8×8=64; 12×12=144"
          ]
        ]
      }
    ]
  }
});
})();
