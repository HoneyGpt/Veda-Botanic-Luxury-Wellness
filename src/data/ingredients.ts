export type Ingredient = {
  id: string
  name: string
  latin: string
  image: string
  imageAlt: string
  note: string
  foundIn: string
}

export const ingredients: Ingredient[] = [
  {
    id: 'neem',
    name: 'Neem',
    latin: 'Azadirachta indica',
    image: '/images/ingredient-neem.webp',
    imageAlt:
      'Close-up of fresh neem leaves on a warm ivory surface, showing serrated edges, visible veins and fine water droplets.',
    note:
      'Green, bitter and unmistakably Indian. Long used in household care and bathing preparations, neem brings a clean, astringent character to our cleansing concept.',
    foundIn: 'Herbal Cleansing Ritual',
  },
  {
    id: 'rose',
    name: 'Damask Rose',
    latin: 'Rosa × damascena',
    image: '/images/ingredient-rose.webp',
    imageAlt:
      'Loose dried damask rose petals in dusty pink and deep burgundy with a few rosebuds on pale stone.',
    note:
      'Soft, dusty and faintly sweet. Distilled for its water and oil, rose is the quiet thread that runs through our face oil and bath soak.',
    foundIn: 'Botanical Face Oil & Bath Soak',
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    latin: 'Curcuma longa',
    image: '/images/ingredient-turmeric.webp',
    imageAlt:
      'Fresh turmeric rhizomes beside a small stone dish of golden turmeric powder on a warm ivory plaster surface.',
    note:
      'Golden, warming and deeply familiar. We use turmeric sparingly, for its colour and scent as much as its place in Indian botanical tradition.',
    foundIn: 'Botanical Bath Soak',
  },
]

export const botanicalIndex = [
  { name: 'Tulsi', latin: 'Ocimum tenuiflorum' },
  { name: 'Sandalwood', latin: 'Santalum album' },
  { name: 'Vetiver', latin: 'Chrysopogon zizanioides' },
  { name: 'Amla', latin: 'Phyllanthus emblica' },
  { name: 'Aloe', latin: 'Aloe barbadensis' },
  { name: 'Kokum', latin: 'Garcinia indica' },
]

export const FORMULATION_NOTE =
  'Botanical ingredients are not automatically suitable for everyone. Patch test before first use and stop if irritation occurs. If you are pregnant, nursing or under medical care, speak with a professional before adding new products. No efficacy, safety or certification claims are made for this concept range.'
