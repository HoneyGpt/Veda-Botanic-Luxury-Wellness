import { Link } from '../router'
import { Reveal } from '../components/Reveal'
import { Arrow, InfoIcon } from '../components/Icons'
import { botanicalIndex, ingredients, FORMULATION_NOTE } from '../data/ingredients'
import { usePageMeta } from '../lib/seo'

const PRINCIPLES = [
  {
    number: '01',
    title: 'Fewer, better things',
    text: 'A short collection, made to be used up rather than saved for a better day. We would rather refine four formulas than launch forty.',
  },
  {
    number: '02',
    title: 'Rooted in tradition, made for now',
    text: 'Our botanicals come from Indian wellness tradition; the textures, packaging and language are contemporary. We honour the material without borrowing authority from it.',
  },
  {
    number: '03',
    title: 'Ritual over routine',
    text: 'A routine is a checklist. A ritual is a few minutes you choose. We design for the second — for the moment of attention rather than the tally of steps.',
  },
]

const LABEL_PRINCIPLES = [
  {
    number: '01',
    title: 'No borrowed authority',
    text: 'We do not claim certifications, clinical results or a family lineage we cannot evidence. No “ancient secret” — just a considered formula.',
  },
  {
    number: '02',
    title: 'Ingredients named honestly',
    text: 'A botanical is named when it is actually in the formula, at a level that matters. Full ingredient lists will be published before any launch.',
  },
  {
    number: '03',
    title: 'No reviews, no ratings',
    text: 'Until there are real customers, there are no testimonials on this site. We would rather show you the product, plainly.',
  },
  {
    number: '04',
    title: 'Care, not cure',
    text: 'Nothing here treats a medical condition. If you have one, or you are pregnant or nursing, speak with a professional before changing your routine.',
  },
]

export function PhilosophyPage() {
  usePageMeta(
    'Our Philosophy — Veda Botanic',
    'Veda Botanic is built around a simple idea: everyday care can be more intentional. Read our approach to botanicals, formulation and everyday ritual.',
  )

  return (
    <>
      <div className="page-head">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="crumbs__sep" aria-hidden="true">
              /
            </span>
            <span aria-current="page">Our Philosophy</span>
          </nav>
          <div className="page-head__inner page-head__inner--split" style={{ marginTop: 26 }}>
            <div>
              <p className="eyebrow">Our Philosophy</p>
              <h1 className="display-l" style={{ marginTop: 18, maxWidth: '18ch' }}>
                A More Considered Kind of Wellness.
              </h1>
            </div>
            <div className="page-head__aside">
              <p className="lede">
                Modern botanical rituals inspired by nature and traditional Indian wellness —
                designed for everyday life, not for a special occasion.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="section section--flush" style={{ paddingTop: 'clamp(20px, 3vw, 40px)' }}>
        <div className="container">
          <div className="philosophy-intro">
            <Reveal className="media philosophy-intro__media">
              <img
                src="/images/story.webp"
                alt="A stone mortar with crushed botanicals, glass bottles of oil and floral water, linen and turmeric on limestone."
                width={1264}
                height={848}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: '42% 50%' }}
              />
            </Reveal>
            <Reveal className="philosophy-intro__content" delay={120}>
              <p className="eyebrow">The idea</p>
              <h2 className="display-l" style={{ maxWidth: '17ch' }}>
                Wellness Begins with What You Return To.
              </h2>
              <p className="prose">
                Veda Botanic is built around a simple idea: everyday care can be more intentional.
                Inspired by botanical ingredients, traditional wellness knowledge and modern
                design, we bring together thoughtful essentials for rituals that feel personal,
                grounding and beautifully uncomplicated.
              </p>
              <p className="prose">
                We are interested in the parts of the day that repeat — the basin, the bath, the
                last few minutes before sleep. Those are the places attention actually lives. Our
                work is to make them feel considered, rather than rushed.
              </p>
              <p className="story__sign">The Veda Botanic studio</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--forest on-dark" aria-labelledby="principles-title">
        <div className="container">
          <Reveal>
            <p className="eyebrow eyebrow--light">Our principles</p>
            <h2
              className="display-l"
              id="principles-title"
              style={{ color: 'var(--ivory)', marginTop: 18, maxWidth: '20ch' }}
            >
              Three things we hold to.
            </h2>
          </Reveal>
          <Reveal className="principle-grid" delay={120} style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}>
            {PRINCIPLES.map((principle) => (
              <div className="principle" key={principle.number}>
                <span className="principle__num" aria-hidden="true">
                  {principle.number}
                </span>
                <h3 className="principle__title">{principle.title}</h3>
                <p className="principle__text">{principle.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" id="ingredients" aria-labelledby="philosophy-ingredients-title">
        <div className="container">
          <div className="ingredients__head">
            <Reveal className="ingredients__head-text">
              <p className="eyebrow">Botanical Index</p>
              <h2 className="display-l" id="philosophy-ingredients-title">
                Inspired by the Intelligence of Nature.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="lede">
                Every botanical has its own character, history and place in a considered self-care
                ritual. These are the three we begin with.
              </p>
            </Reveal>
          </div>

          <div className="ingredient-rows">
            {ingredients.map((ingredient, index) => (
              <Reveal className="ingredient-row" key={ingredient.id} delay={index * 60}>
                <div className="media ingredient-row__media">
                  <img
                    src={ingredient.image}
                    alt={ingredient.imageAlt}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="ingredient-row__body">
                  <div className="ingredient-row__name-row">
                    <h3 className="ingredient-card__name">{ingredient.name}</h3>
                    <span className="ingredient-card__latin">{ingredient.latin}</span>
                  </div>
                  <p className="ingredient-card__note">{ingredient.note}</p>
                  <p className="ingredient-card__found">In {ingredient.foundIn}</p>
                </div>
                <span className="ingredient-row__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </Reveal>
            ))}
          </div>

          <div className="botanical-index">
            <div className="botanical-index__intro">
              <p className="eyebrow" style={{ marginBottom: 4 }}>
                Also in the library
              </p>
              <h3 className="botanical-index__title">Botanicals we return to</h3>
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

      <section className="section section--ivory-2" aria-labelledby="label-title">
        <div className="container">
          <div className="philosophy-split">
            <Reveal className="philosophy-split__content">
              <p className="eyebrow">The language</p>
              <h2 className="display-m" id="label-title">
                What we put on a label — and what we leave off.
              </h2>
              <p className="prose">
                Luxury does not need to exaggerate. The most useful thing a botanical brand can
                offer is clarity: what is inside, what it is for, and what it will not do.
              </p>
              <div className="philosophy-list">
                {LABEL_PRINCIPLES.map((item) => (
                  <div className="philosophy-list__item" key={item.number}>
                    <span className="philosophy-list__num" aria-hidden="true">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="philosophy-list__title">{item.title}</h3>
                      <p className="philosophy-list__text">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="media philosophy-split__media" delay={120}>
              <img
                src="/images/ritual-botanicals.webp"
                alt="Botanical ingredients and glass vessels arranged on limestone in warm daylight."
                width={1264}
                height={848}
                loading="lazy"
                decoding="async"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <Reveal className="closing-cta">
            <p className="eyebrow">Return to the shelf</p>
            <h2 className="display-m">Botanical Rituals for Everyday Living.</h2>
            <p className="lede">
              Four essentials, a short ingredient list and a little more attention. Begin wherever
              you are.
            </p>
            <div className="closing-cta__actions">
              <Link to="/shop" className="btn btn--primary">
                Explore the Collection
                <Arrow size={18} />
              </Link>
              <Link to="/journal" className="text-link">
                Read the Journal
                <Arrow size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
