export type Category = 'face' | 'body' | 'bath'

export type Variant = {
  id: string
  label: string
  volume: string
  price: number
}

export type Product = {
  slug: string
  index: string
  name: string
  category: Category
  categoryLabel: string
  tagline: string
  description: string
  image: string
  imageAlt: string
  detailPosition: string
  keyBotanicals: string[]
  scent: string
  texture: string
  ritual: string[]
  variants: Variant[]
  pairWith: string
  note: string
}

/**
 * Prices are placeholders for the concept storefront.
 * Edit the numbers below and the entire site updates — they are not real prices.
 */
export const PRICE_DISCLAIMER =
  'Indicative pricing for this design concept. Not a live price and not an offer for sale.'

export const products: Product[] = [
  {
    slug: 'botanical-face-oil',
    index: '01',
    name: 'Botanical Face Oil',
    category: 'face',
    categoryLabel: 'Face',
    tagline: 'A weightless botanical oil for the last quiet moment of the day.',
    description:
      'A small, considered blend of plant oils, scented faintly with rose and sandalwood. It sinks in slowly and leaves skin soft rather than slick — a calm final step before sleep.',
    image: '/images/product-face-oil.webp',
    imageAlt:
      'Amber glass dropper bottle of botanical face oil with an ivory label, beside a fresh neem sprig and dried rose petals on pale stone.',
    detailPosition: '50% 62%',
    keyBotanicals: ['Rosehip', 'Sandalwood', 'Moringa', 'Damask rose'],
    scent: 'Rose, sandalwood and a trace of vetiver',
    texture: 'Lightweight dry oil',
    ritual: [
      'Warm three to four drops between clean palms.',
      'Press gently into damp skin — cheeks first, then forehead and jaw.',
      'Let it settle for a moment before you turn out the light.',
    ],
    variants: [
      { id: '30ml', label: '30 ml', volume: '30 ml', price: 2450 },
      { id: '50ml', label: '50 ml', volume: '50 ml', price: 3350 },
    ],
    pairWith: 'nourishing-body-balm',
    note: 'A note on ingredients: the botanicals named here describe this concept formulation. A complete INCI list and final proportions will be published before any product is offered for sale.',
  },
  {
    slug: 'nourishing-body-balm',
    index: '02',
    name: 'Nourishing Body Balm',
    category: 'body',
    categoryLabel: 'Body',
    tagline: 'A dense, slow-melting balm for limbs and tired shoulders.',
    description:
      'Kokum butter and a little shea make a balm that softens on contact and asks to be worked in slowly. Vetiver and tulsi keep the scent green and quiet rather than sweet.',
    image: '/images/product-body-balm.webp',
    imageAlt:
      'Cream-glazed ceramic jar of nourishing body balm with forest-green label detail, resting on natural linen with a smooth river stone.',
    detailPosition: '50% 55%',
    keyBotanicals: ['Kokum butter', 'Shea', 'Vetiver', 'Tulsi'],
    scent: 'Green vetiver, soft tulsi, a warm base of shea',
    texture: 'Dense balm that melts on contact',
    ritual: [
      'Take a small amount with the wooden spatula.',
      'Warm it between your hands until it turns to oil.',
      'Work into limbs in long, unhurried strokes, then dress.',
    ],
    variants: [
      { id: '60ml', label: '60 ml', volume: '60 ml', price: 950 },
      { id: '200ml', label: '200 ml', volume: '200 ml', price: 1950 },
    ],
    pairWith: 'botanical-face-oil',
    note: 'A note on ingredients: the botanicals named here describe this concept formulation. A complete INCI list and final proportions will be published before any product is offered for sale.',
  },
  {
    slug: 'herbal-cleansing-ritual',
    index: '03',
    name: 'Herbal Cleansing Ritual',
    category: 'face',
    categoryLabel: 'Face',
    tagline: 'A gentle gel that turns milky with water and leaves no film behind.',
    description:
      'A clear, low-foam cleanser with a soft green scent. Neem and tulsi meet aloe in a formula that rinses clean — the kind of first step that makes the rest of a routine feel unhurried.',
    image: '/images/product-cleanser.webp',
    imageAlt:
      'Frosted glass pump bottle of herbal cleansing gel with a sand-coloured pump and ivory label, tulsi leaves and a water droplet on travertine.',
    detailPosition: '50% 60%',
    keyBotanicals: ['Neem', 'Tulsi', 'Aloe'],
    scent: 'Fresh neem leaf and crushed tulsi',
    texture: 'Clear gel, low foam',
    ritual: [
      'Dispense two pumps into slightly damp hands.',
      'Massage over a dry or damp face for thirty seconds.',
      'Add water to emulsify, then rinse with warm — not hot — water.',
    ],
    variants: [{ id: '150ml', label: '150 ml', volume: '150 ml', price: 1650 }],
    pairWith: 'botanical-face-oil',
    note: 'A note on ingredients: the botanicals named here describe this concept formulation. A complete INCI list and final proportions will be published before any product is offered for sale.',
  },
  {
    slug: 'botanical-bath-soak',
    index: '04',
    name: 'Botanical Bath Soak',
    category: 'bath',
    categoryLabel: 'Bath & Rituals',
    tagline: 'Mineral salts, dried rose and vetiver, for an hour that belongs to you.',
    description:
      'Coarse mineral salts scattered with rose petals and vetiver root. Pour a handful into warm water and let the room fill with a soft, earthy quiet.',
    image: '/images/product-bath-soak.webp',
    imageAlt:
      'Sculptural olive-sand stoneware jar of botanical bath soak tied with twine, beside a dish of mineral salts, dried petals and sandalwood.',
    detailPosition: '50% 58%',
    keyBotanicals: ['Mineral salt', 'Damask rose', 'Vetiver', 'Sandalwood'],
    scent: 'Rose, vetiver and dry sandalwood',
    texture: 'Coarse mineral salt and dried botanicals',
    ritual: [
      'Run a warm bath and add one generous handful of salts.',
      'Light a single candle and leave your phone in another room.',
      'Soak for twenty minutes, then wrap yourself in linen.',
    ],
    variants: [
      { id: '400g', label: '400 g', volume: '400 g', price: 2250 },
      { id: '800g', label: '800 g', volume: '800 g', price: 3800 },
    ],
    pairWith: 'nourishing-body-balm',
    note: 'A note on ingredients: the botanicals named here describe this concept formulation. A complete INCI list and final proportions will be published before any product is offered for sale.',
  },
]

export function getProduct(slug: string | undefined) {
  return products.find((product) => product.slug === slug)
}

export function startingPrice(product: Product) {
  return Math.min(...product.variants.map((variant) => variant.price))
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export const categories: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'face', label: 'Face' },
  { id: 'body', label: 'Body' },
  { id: 'bath', label: 'Bath & Rituals' },
]
