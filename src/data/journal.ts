export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }

export type Article = {
  slug: string
  number: string
  title: string
  kicker: string
  readingTime: string
  excerpt: string
  image: string
  imageAlt: string
  detailPosition: string
  intro: string
  blocks: Block[]
}

export const articles: Article[] = [
  {
    slug: 'the-morning-reset',
    number: '01',
    title: 'The Morning Reset',
    kicker: 'Ritual',
    readingTime: '4 min read',
    excerpt:
      'A gentle, unhurried beginning to the day — and why the first twenty minutes are worth protecting.',
    image: '/images/ritual-morning.webp',
    imageAlt:
      'Morning light across a plaster ledge with a frosted glass bottle, a ceramic bowl of water, folded linen and a sprig of tulsi.',
    detailPosition: '50% 55%',
    intro:
      'There is a particular quality to the first twenty minutes of a day. Before the inbox, before the news, before the small negotiations of ordinary life, the morning is still soft at the edges. These are notes on keeping it that way.',
    blocks: [
      {
        type: 'p',
        text: 'Most mornings do not begin so much as arrive. An alarm, a screen, a list already forming behind the eyes. A morning ritual is not an argument with any of that. It is simply a small stretch of time you decide about in advance, so that the day does not decide for you.',
      },
      { type: 'h2', text: 'Begin before the phone' },
      {
        type: 'p',
        text: 'The simplest version costs nothing: open a window before you open an app. Let the room take on the temperature of the morning. Stand at the basin and let cool water run over your wrists for a few seconds longer than feels necessary. Three slow breaths, entirely without purpose.',
      },
      {
        type: 'quote',
        text: 'A ritual is not a rule. It is a place to return to.',
      },
      { type: 'h2', text: 'A short, repeatable sequence' },
      {
        type: 'list',
        items: [
          'Rinse the face with cool water. If skin feels comfortable, that may be enough.',
          'Cleanse only when it feels needed — a gentle gel, worked in briefly and rinsed warm.',
          'Press three drops of face oil into skin that is still slightly damp.',
          'Pour a glass of water and drink it standing by the window, not walking.',
          'Dress slowly. Choose one thing in the day to look forward to.',
        ],
      },
      {
        type: 'p',
        text: 'None of this takes long. That is the point. A ritual that asks too much of you will not survive a difficult week; a ritual of six minutes might. Keep it small enough to keep.',
      },
      {
        type: 'p',
        text: 'What changes is not the routine but the attention. The same three drops of oil, applied in a hurry, are simply a step. Applied slowly, they are the difference between starting a day and being started by it.',
      },
    ],
  },
  {
    slug: 'the-evening-unwind',
    number: '02',
    title: 'The Evening Unwind',
    kicker: 'Atmosphere',
    readingTime: '5 min read',
    excerpt:
      'On transition, warm water and the quiet architecture of an evening that asks nothing of you.',
    image: '/images/ritual-evening.webp',
    imageAlt:
      'A stoneware jar of bath soak with mineral salts, dried rose petals and a sandalwood stick in warm light.',
    detailPosition: '50% 50%',
    intro:
      'Evening is a threshold. The body knows when it is being hurried across one, and when it is allowed to cross slowly. A little atmosphere goes a long way.',
    blocks: [
      {
        type: 'p',
        text: 'We tend to treat the end of the day as a leftover — whatever time remains after work, after dinner, after the last message has been answered. But the evening is not a remainder. It is the part of the day with the most permission in it.',
      },
      { type: 'h2', text: 'Make the room first' },
      {
        type: 'p',
        text: 'Before the bath, before the balm, adjust the room. Lower the lights rather than turning on new ones. Close the laptop, or at least close it properly. Put a single candle somewhere you will see it. The room does most of the work; the products only continue it.',
      },
      {
        type: 'p',
        text: 'Warm — not hot — water, a handful of mineral salts, and the door closed. Twenty minutes is enough to feel the day let go of your shoulders. If a bath is not available to you, the same ritual works at a basin: warm water, a cloth, slow hands.',
      },
      {
        type: 'quote',
        text: 'The body keeps its own time. Evening is a way of agreeing with it.',
      },
      { type: 'h2', text: 'Then, something for the skin' },
      {
        type: 'p',
        text: 'Skin is warm and receptive after a soak, which makes it a good moment for a dense balm — worked into limbs in long strokes, then left to settle while you put on something soft. This is not a step to be efficient about. Efficiency belongs to the morning.',
      },
      {
        type: 'p',
        text: 'End with the smallest possible gesture: a drop of oil on the back of the hands, a final sip of water, the candle out. The evening has done its work. Tomorrow can begin on its own terms.',
      },
    ],
  },
  {
    slug: 'a-moment-with-botanicals',
    number: '03',
    title: 'A Moment with Botanicals',
    kicker: 'Ingredients',
    readingTime: '6 min read',
    excerpt:
      'Neem, rose and turmeric — three plants with long histories, and the considered way we choose to work with them.',
    image: '/images/ritual-botanicals.webp',
    imageAlt:
      'Stone mortar and pestle with crushed green leaves and rose petals, glass bottles of botanical oil and floral water on limestone.',
    detailPosition: '50% 50%',
    intro:
      'A botanical ingredient is not a shortcut to virtue. It is a material with character, a history, and limitations. Knowing a plant properly is more interesting than making claims about it.',
    blocks: [
      {
        type: 'p',
        text: 'Neem is green and unapologetically bitter, the smell of a warm afternoon in the subcontinent. Rose is softer: dusty, faintly sweet, closer to a memory than a flavour. Turmeric is golden and staining, generous and a little unruly. None of them are neutral, and that is what makes them worth using with care.',
      },
      { type: 'h2', text: 'Read the label, slowly' },
      {
        type: 'p',
        text: 'A botanical name on the front of a bottle tells you very little on its own. The useful questions are quieter: how much is in the formula, how was it extracted, and what else is in the base? We would rather answer those questions plainly than decorate a label with leaves.',
      },
      {
        type: 'quote',
        text: 'Nature is not a promise. It is a starting point.',
      },
      {
        type: 'p',
        text: 'It is also true that plants are not automatically gentle. Essential oils can sensitise skin; some botanicals are best avoided in pregnancy or alongside certain medications. If you have reactive skin, patch test on the inner arm for two nights before using anything new on the face.',
      },
      { type: 'h2', text: 'Working with, not around' },
      {
        type: 'p',
        text: 'Our approach is unfashionably simple. Use fewer botanicals, at meaningful levels, with a base that behaves well on skin. Let scent do the emotional work and let texture do the practical work. Name what is in the formula, and be honest about what has not yet been proven.',
      },
      {
        type: 'p',
        text: 'That is where the pleasure lives — not in a claim, but in a well-made thing used at the right moment. A moment with botanicals is not a cure for anything. It is a way of paying attention.',
      },
    ],
  },
]

export function getArticle(slug: string | undefined) {
  return articles.find((article) => article.slug === slug)
}
