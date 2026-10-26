import { Link } from '../router'
import { ProductCard } from '../components/ProductCard'
import { StoryCard } from '../components/StoryCard'
import { Reveal } from '../components/Reveal'
import { Arrow, InfoIcon, Sprig } from '../components/Icons'
import { products } from '../data/products'
import { ingredients, botanicalIndex, FORMULATION_NOTE } from '../data/ingredients'
import { articles } from '../data/journal'
import { usePageMeta } from '../lib/seo'

export function HomePage() {
  usePageMeta(
    'Veda Botanic — Botanical Skincare & Everyday Rituals',
    'Considered botanical skincare, body care and bathing rituals inspired by Indian wellness traditions and the art of slowing down. Your daily ritual, naturally refined.',
  )

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__grid">
          <div className="hero__content">
            <p className="eyebrow">Botanical skincare &amp; everyday rituals</p>
            <h1 className="display-xl hero__title" id="hero-title">
              <span className="hero__line">Your Daily Ritual,</span>{' '}
              <span className="hero__line hero__line--em">Naturally Refined.</span>
            </h1>
            <p className="lede hero__lede">
              Discover thoughtful botanical essentials inspired by nature, traditional wellness
              rituals, and the art of slowing down.
            </p>
            <div className="hero__actions">
              <Link to="/shop" className="btn btn--primary">
                Explore the Collection
                <Arrow size={18} />
              </Link>
              <Link to="/philosophy" className="hero__secondary">
                Discover Our Philosophy
                <Arrow size={18} />
              </Link>
            </div>
            <div className="hero__meta">
              <span className="hero__meta-index">Collection 001</span>
              <p className="hero__meta-note">
                Four considered essentials — face, body and bath.
              </p>
            </div>
          </div>

          <div className="hero__media">
            <img
              src="/images/hero.webp"
              alt="Three botanical skincare vessels — an amber dropper bottle, a frosted glass bottle and a stoneware jar — arranged on limestone in warm window light."
              width={768}
              height={1376}
              fetchPriority="high"
              decoding="async"
            />
            <span className="hero__caption">Campaign 001 — Morning Light</span>
          </div>
        </div>
      </section>

      <div className="pillars" aria-label="Our approach">
        <div className="pillar">
          <span className="pillar__num" aria-hidden="true">
            01
          </span>
          <span className="pillar__text">Botanical-first thinking</span>
        </div>
        <div className="pillar">
          <span className="pillar__num" aria-hidden="true">
            02
          </span>
          <span className="pillar__text">Considered packaging</span>
        </div>
        <div className="pillar">
          <span className="pillar__num" aria-hidden="true">
            03
          </span>
          <span className="pillar__text">Rituals for every day</span>
        </div>
      </div>

      {/* Brand story ------------------------------------------------------- */}
      <section className="section" aria-labelledby="story-title">
        <div className="container">
          <div className="story__grid">
            <Reveal className="story__media-wrap">
              <div className="media story__media">
                <img
                  src="/images/story.webp"
                  alt="A stone mortar with crushed neem leaves and rose petals, glass apothecary bottles, folded linen and turmeric on a limestone shelf in afternoon light."
                  width={1264}
                  height={848}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="story__caption">The studio — botanicals, glass and stone</p>
            </Reveal>

            <Reveal className="story__content" delay={120}>
              <p className="eyebrow">Our Philosophy</p>
              <h2 className="display-l story__title" id="story-title">
                Wellness Begins with What You Return To.
              </h2>
              <div className="story__body">
                <p className="prose">
                  Veda Botanic is built around a simple idea: everyday care can be more
                  intentional. Inspired by botanical ingredients, traditional wellness knowledge
                  and modern design, we bring together thoughtful essentials for rituals that feel
                  personal, grounding and beautifully uncomplicated.
                </p>
              </div>
              <Link to="/philosophy" className="text-link">
                Our Philosophy
                <Arrow size={18} />
              </Link>
              <p className="story__sign">The Veda Botanic studio</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Collection -------------------------------------------------------- */}
      <section className="section section--hairline-top" aria-labelledby="collection-title">
        <div className="container">
          <Reveal className="collection__head">
            <div className="collection__head-text">
              <p className="eyebrow">The Collection</p>
              <h2 className="display-m" id="collection-title">
                Four essentials, <span className="serif-em">considered.</span>
              </h2>
            </div>
            <Link to="/shop" className="text-link">
              View All Products
              <Arrow size={18} />
            </Link>
          </Reveal>

          <div className="product-grid">
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={index * 70}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <div className="collection__note">
            <p className="fine">
              Prices are placeholders for this concept and are not an offer for sale.
            </p>
            <p className="fine">
              Four products, one point of view — fewer things, made more thoughtfully.
            </p>
          </div>
        </div>
      </section>

      {/* Ingredients ------------------------------------------------------- */}
      <section
        className="section section--hairline-top"
        id="ingredients"
        aria-labelledby="ingredients-title"
      >
        <div className="container">
          <div className="ingredients__head">
            <Reveal className="ingredients__head-text">
              <p className="eyebrow">Botanical Index</p>
              <h2 className="display-l" id="ingredients-title">
                Inspired by the Intelligence of Nature.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">
                Every botanical has its own character, history and place in a considered self-care
                ritual. Discover the ingredients and thoughtful formulation choices behind our
                collection.
              </p>
            </Reveal>
          </div>

          <div className="ingredients__grid">
            {ingredients.map((ingredient, index) => (
              <Reveal className="ingredient-card" key={ingredient.id} delay={index * 90}>
                <div className="media ingredient-card__media">
                  <img
                    src={ingredient.image}
                    alt={ingredient.imageAlt}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <div className="ingredient-card__name-row">
                    <h3 className="ingredient-card__name">{ingredient.name}</h3>
                    <span className="ingredient-card__latin">{ingredient.latin}</span>
                  </div>
                  <p className="ingredient-card__note" style={{ marginTop: 10 }}>
                    {ingredient.note}
                  </p>
                  <p className="ingredient-card__found">In {ingredient.foundIn}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="botanical-index">
            <div className="botanical-index__intro">
              <p className="eyebrow" style={{ marginBottom: 4 }}>
                Also in the library
              </p>
              <h3 className="botanical-index__title">Botanicals we return to</h3>
              <p className="small" style={{ maxWidth: '32ch' }}>
                Named for their character and their place in Indian botanical tradition — not for a
                promise.
              </p>
            </div>
            <ul className="botanical-index__list">
              {botanicalIndex.map((botanical) => (
                <li className="botanical-index__item" key={botanical.name}>
                  <span className="botanical-index__name">{botanical.name}</span>
                  <span className="botanical-index__latin">{botanical.latin}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="formulation-note">
            <InfoIcon />
            <p>{FORMULATION_NOTE}</p>
          </div>
        </div>
      </section>

      {/* Rituals ----------------------------------------------------------- */}
      <section className="section rituals" id="rituals" aria-labelledby="rituals-title">
        <div className="container">
          <Reveal className="rituals__head">
            <div>
              <p className="eyebrow">The Journal</p>
              <h2 className="display-l" id="rituals-title" style={{ marginTop: 16 }}>
                The Art of Everyday Rituals.
              </h2>
            </div>
            <Link to="/journal" className="text-link">
              All Stories
              <Arrow size={18} />
            </Link>
          </Reveal>

          <div className="rituals__grid">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 90}>
                <StoryCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature --------------------------------------------------------- */}
      <section className="section--forest signature on-dark" aria-labelledby="signature-title">
        <div className="container">
          <Reveal className="signature__inner">
            <Sprig className="signature__mark" size={26} />
            <h2 className="display-l signature__title" id="signature-title">
              Less Noise. <span className="serif-em">More Nature.</span>
            </h2>
            <p className="signature__copy">
              Make room for rituals that bring you back to yourself.
            </p>
            <Link to="/shop" className="btn btn--light">
              Explore the Collection
              <Arrow size={18} />
            </Link>
            <p className="signature__caption">Nature, made personal</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
