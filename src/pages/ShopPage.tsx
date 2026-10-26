import { Link } from '../router'
import { categories, products } from '../data/products'
import type { Category } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { Reveal } from '../components/Reveal'
import { Arrow } from '../components/Icons'
import { usePageMeta } from '../lib/seo'

const COPY: Record<'all' | Category, { eyebrow: string; title: string; lede: string; intro: string }> = {
  all: {
    eyebrow: 'The Collection',
    title: 'Botanical essentials, quietly made.',
    lede: 'Four considered formulas for face, body and bath — each proposed around a small, purposeful set of botanicals.',
    intro:
      'Nothing more than the ritual needs. Four essentials, each developed around a short list of botanicals and a texture worth returning to.',
  },
  face: {
    eyebrow: 'Face',
    title: 'A slower kind of skincare.',
    lede: 'Two quiet steps — a gentle cleanse and a botanical oil — for mornings that begin softly and evenings that end there.',
    intro:
      'Skin does not need a long routine. It needs a few things that behave well, used with a little attention.',
  },
  body: {
    eyebrow: 'Body',
    title: 'For limbs, shoulders and the end of the day.',
    lede: 'A dense, slow-melting balm for the parts of you that carry the most — and ask for the least.',
    intro:
      'Body care is where ritual is easiest to keep. A handful of balm, a few unhurried minutes, the door closed.',
  },
  bath: {
    eyebrow: 'Bath & Rituals',
    title: 'An hour that belongs to you.',
    lede: 'Mineral salts, dried rose and vetiver root — a bath that asks nothing of you afterwards.',
    intro:
      'The bath is the oldest ritual we have. Ours is built around warmth, a soft scent and the decision to stay a while.',
  },
}

export function ShopPage({ category = 'all' }: { category?: 'all' | Category }) {
  const copy = COPY[category]
  const visible =
    category === 'all' ? products : products.filter((product) => product.category === category)

  usePageMeta(
    category === 'all'
      ? 'Shop All — Veda Botanic'
      : `${copy.eyebrow} — Veda Botanic Botanical Collection`,
    copy.lede,
  )

  const chipHref = (id: 'all' | Category) => (id === 'all' ? '/shop' : `/shop/${id}`)

  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="page-head__inner">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="crumbs__sep" aria-hidden="true">
                /
              </span>
              {category === 'all' ? (
                <span aria-current="page">Shop All</span>
              ) : (
                <>
                  <Link to="/shop">Shop All</Link>
                  <span className="crumbs__sep" aria-hidden="true">
                    /
                  </span>
                  <span aria-current="page">{copy.eyebrow}</span>
                </>
              )}
            </nav>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="display-l page-head__title">{copy.title}</h1>
            <p className="lede">{copy.lede}</p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 'clamp(56px, 8vw, 110px)' }}>
        <div className="shop-toolbar">
          <div className="chips" role="group" aria-label="Filter by category">
            {categories.map((item) => (
              <Link
                key={item.id}
                to={chipHref(item.id)}
                className="chip"
                aria-current={
                  (category === 'all' && item.id === 'all') || category === item.id
                    ? 'page'
                    : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="shop-count" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'product' : 'products'} · prices are placeholders
          </p>
        </div>

        <h2 className="visually-hidden">Products in this collection</h2>
        <div className="product-grid">
          {visible.map((product, index) => (
            <Reveal key={product.slug} delay={index * 70}>
              <ProductCard product={product} eager={index < 2} />
            </Reveal>
          ))}
        </div>

        <div className="collection__note">
          <p className="fine">
            Every price shown is an editable placeholder for this design concept — not an offer
            for sale.
          </p>
          <p className="fine">
            Products are concepts; full ingredient lists will be published before any launch.
          </p>
        </div>

        {category === 'all' && (
          <Reveal className="collection-banner">
            <div className="media collection-banner__media">
              <img
                src="/images/story.webp"
                alt="Botanical ingredients, glass vessels and linen arranged on limestone in warm afternoon light."
                width={1264}
                height={848}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="collection-banner__copy">
              <p className="eyebrow">Our point of view</p>
              <h2 className="display-m" style={{ maxWidth: '18ch' }}>
                Rooted in nature. Refined by ritual.
              </h2>
              <p className="prose">
                We begin with the ritual rather than the claim — the few minutes at a basin, the
                handful of salts, the oil warmed between the hands. Then we work backwards to
                something worth keeping on the shelf.
              </p>
              <Link to="/philosophy" className="text-link">
                Read our philosophy
                <Arrow size={18} />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </>
  )
}
