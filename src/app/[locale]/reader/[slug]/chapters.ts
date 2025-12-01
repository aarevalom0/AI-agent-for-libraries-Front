// src/data/chapters.ts

export type ChaptersMap = Record<
  string,
  { libroId?: string; title: string; chapters: string[] }
>;

/**
 * Español
 * NOTA: No ponemos "Capítulo N" en el contenido; el header ya lo renderiza.
 */
export const CHAPTERS_ES: ChaptersMap = {
  // ----- Lecturas actuales -----
  "1984": {
      libroId: "691f49fa3faa28be5ca3b4ca",
    title: "1984",
    chapters: [
      `El Ministerio de la Verdad
Winston camina por los pasillos grises del Ministerio. Los eslóganes del Partido repiten su eco en las paredes
mientras él escribe en su diario, un acto pequeño de rebeldía que late como un secreto.`,

      `La vigilancia
Las telepantallas nunca duermen. Un gesto, una mirada, incluso un suspiro puede traicionar a cualquiera.
Winston empieza a sospechar que no es el único que duda.`,

      `Palabras que cambian el mundo
La realidad se reescribe una y otra vez. Winston comprende que el lenguaje es una jaula: si quitas las palabras,
eliminas los pensamientos que la gente puede tener.`,
    ],
  },

  "girl-train": {
      libroId: "692cf04149a83d2851f4edef",
    title: "La chica del tren",
    chapters: [
      `La rutina del vagón
Cada mañana, el tren avanza junto a las mismas casas. Ella mira por la ventana e inventa la vida de una pareja
que observa desde la distancia. Un día, algo cambia.`,

      `Una fotografía borrosa
La memoria juega malas pasadas. Entre recuerdos confusos, aparece una imagen: una sombra en el jardín,
una figura que no encaja con la historia perfecta que imaginaba.`,

      `Pistas y ausencias
Lo que parecía un accidente quizá no lo fue. La protagonista decide involucrarse, aun cuando nadie le cree
y su propia credibilidad es el primer obstáculo que debe superar.`,
    ],
  },

  "harry-potter": {
      libroId: "692cf01749a83d2851f4eded",
    title: "Harry Potter y la piedra filosofal",
    chapters: [
      `Cartas sin respuesta
Las misteriosas cartas llegan una y otra vez. Harry, sin entender nada, siente que su vida está a punto
de cambiar de la forma más inesperada.`,

      `Andén nueve y tres cuartos
Un muro, una carrera corta y el Hogwarts Express. El mundo mágico se abre ante Harry con una mezcla de asombro
y nervios.`,

      `Secretos en los pasillos
Entre clases, hechizos y amistades nuevas, rumores sobre un objeto antiguo empiezan a circular. Algunos creen
que está mejor guardado bajo llaves… y con razón.`,
    ],
  },

  // ----- Catálogo -----
  "secret-garden": {
    title: "The Secret Garden",
    chapters: [
      `La llave oxidada
Mary descubre una puerta oculta entre la hiedra. Bajo la tierra húmeda, algo parece estar esperando ser despertado.`,

      `Susurros entre las hojas
Cada día, el jardín revela un matiz nuevo. La amistad y el cuidado empiezan a devolver el color a todo, incluso
al corazón de los que habían olvidado sonreír.`,

      `Renacer
El jardín florece y, con él, quienes lo cuidan. Mary entiende que la vida también crece hacia adentro.`,
    ],
  },

  "pride-prejudice": {
      libroId: "692cf04149a83d2851f4edef",
    title: "Pride and Prejudice",
    chapters: [
      `Primeras impresiones
Un baile, miradas cruzadas y comentarios afilados. Elizabeth Bennet no está dispuesta a dejarse impresionar
por la altivez de cierto caballero.`,

      `Conversaciones punzantes
Entre visitas y paseos, la ironía se vuelve un arte. Lo que parecía orgullo quizá esconda algo más complejo.`,

      `Corazón y juicio
La razón y el sentimiento negocian su tregua. Elizabeth empieza a ver más allá de las apariencias.`,
    ],
  },

  "to-kill-mockingbird": {
    title: "To Kill a Mockingbird",
    chapters: [
      `Veranos en Maycomb
Scout y Jem exploran su vecindario. Atticus les enseña que la valentía no siempre se ve desde afuera.`,

      `Un caso incómodo
El pueblo murmura. Atticus acepta defender a un hombre acusado injustamente; la justicia se pone a prueba.`,

      `Empatía
Scout aprende a “ponerse en los zapatos del otro” y caminar con ellos, aunque duela.`,
    ],
  },

  "great-gatsby": {
    title: "The Great Gatsby",
    chapters: [
      `Luces sobre la bahía
Nick llega a West Egg. En la distancia, una luz verde parpadea como una promesa imposible.`,

      `Fiestas y secretos
Champán, música y sonrisas perfectas. Pero entre las risas se esconde una melancolía que nadie sabe nombrar.`,

      `El precio del sueño
Gatsby persigue un pasado que ya no existe. La desilusión se refleja en la superficie tranquila del agua.`,
    ],
  },
};

/**
 * Inglés (ejemplos)
 */
export const CHAPTERS_EN: ChaptersMap = {
  "1984": {
      libroId: "691f49fa3faa28be5ca3b4ca",
    title: "1984",
    chapters: [
      `The Ministry of Truth
Winston walks through the Ministry’s grey corridors. Party slogans echo on the walls
while he writes in his diary—a small act of rebellion that beats like a secret.`,

      `Constant vigilance
Telescreens never sleep. A gesture, a glance, even a sigh can betray anyone.
Winston begins to suspect he is not the only one who doubts.`,

      `Words that reshape the world
Reality is rewritten again and again. Winston understands language is a cage: remove the words
and you remove the thoughts people can have.`,
    ],
  },

  "girl-train": {
    title: "The Girl on the Train",
    chapters: [
      `The carriage routine
Every morning, the train passes the same houses. She looks out the window and invents the life of a couple
she watches from afar. One day, something changes.`,

      `A blurred photograph
Memory plays tricks. Amid confusing recollections appears an image: a shadow in the garden,
a figure that doesn’t fit the perfect story she imagined.`,

      `Clues and absences
What looked like an accident might not have been. She decides to get involved, even if no one believes her—
and her own credibility is the first obstacle to overcome.`,
    ],
  },

  "harry-potter": {
      libroId: "692cf01749a83d2851f4eded",
    title: "Harry Potter and the Philosopher’s Stone",
    chapters: [
      `Letters without reply
Mysterious letters arrive again and again. Harry, understanding nothing, feels his life is about to change
in the most unexpected way.`,

      `Platform Nine and Three-Quarters
A wall, a short run, and the Hogwarts Express. The magical world opens to Harry with a mix of awe and nerves.`,

      `Secrets in the corridors
Between classes, spells and new friendships, rumours of an ancient object start to spread.
Some believe it’s safer under lock and key… for good reason.`,
    ],
  },

  "secret-garden": {
    title: "The Secret Garden",
    chapters: [
      `The rusty key
Mary finds a hidden door beneath the ivy. Under the damp soil, something seems to wait to be awakened.`,

      `Whispers among the leaves
Each day the garden reveals a new hue. Care and friendship bring colour back to everything—even to those
who had forgotten how to smile.`,

      `Rebirth
The garden blossoms, and so do those who tend it. Mary understands that life also grows inward.`,
    ],
  },

  "pride-prejudice": {
    title: "Pride and Prejudice",
    chapters: [
      `First impressions
A ball, crossed glances and sharp remarks. Elizabeth Bennet will not be dazzled by a certain gentleman’s pride.`,

      `Pointed conversations
Between visits and walks, irony becomes an art. What seemed like pride may hide something more complex.`,

      `Heart and judgement
Reason and feeling negotiate a truce. Elizabeth begins to see beyond appearances.`,
    ],
  },

  "to-kill-mockingbird": {
    title: "To Kill a Mockingbird",
    chapters: [
      `Summers in Maycomb
Scout and Jem explore their neighbourhood. Atticus shows them that courage isn’t always visible from the outside.`,

      `An uncomfortable case
The town murmurs. Atticus agrees to defend a man unjustly accused; justice is put to the test.`,

      `Empathy
Scout learns to “climb into another’s skin and walk around in it,” even when it hurts.`,
    ],
  },

  "great-gatsby": {
    title: "The Great Gatsby",
    chapters: [
      `Lights across the bay
Nick arrives in West Egg. In the distance, a green light flickers like an impossible promise.`,

      `Parties and secrets
Champagne, music and perfect smiles. But behind the laughter lies a melancholy no one can name.`,

      `The cost of the dream
Gatsby chases a past that no longer exists. Disillusion shimmers on the calm surface of the water.`,
    ],
  },
};

/** Helper para elegir por locale con fallback a ES */
export function getChapters(locale: string): ChaptersMap {
  return locale === "en" ? CHAPTERS_EN : CHAPTERS_ES;
}
