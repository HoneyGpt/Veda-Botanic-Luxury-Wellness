import { Link } from '../router'
import { Reveal } from '../components/Reveal'
import { Arrow } from '../components/Icons'
import { articles } from '../data/journal'
import { usePageMeta } from '../lib/seo'

export function JournalPage() {
  usePageMeta(
    'The Journal — Veda Botanic',
    'The Art of Everyday Rituals — editorial notes on morning resets, evening unwinding and the botanicals behind Veda Botanic.',
  )

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
              <span aria-current="page">The Journal</span>
            </nav>
            <p className="eyebrow">The Journal</p>
            <h1 className="display-l page-head__title">The Art of Everyday Rituals.</h1>
            <p className="lede">
              Notes on the moments that repeat — how we begin, how we unwind, and how a botanical
              finds its way into a life. Published slowly, on purpose.
            </p>
          </div>
        </div>
      </div>

      <section className="section section--flush" aria-label="Journal stories">
        <div className="container">
          <div className="journal-list">
            {articles.map((article) => (
              <article className="journal-row" key={article.slug}>
                <Reveal className="journal-row__media-wrap">
                  <Link
                    to={`/journal/${article.slug}`}
                    className="media media--zoom journal-row__media"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img
                      src={article.image}
                      alt=""
                      width={1264}
                      height={848}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: article.detailPosition }}
                    />
                  </Link>
                </Reveal>
                <Reveal className="journal-row__content" delay={100}>
                  <span className="journal-row__number" aria-hidden="true">
                    {article.number}
                  </span>
                  <p className="journal-row__meta">
                    <span>Ritual</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime}</span>
                  </p>
                  <h2 className="display-m journal-row__title">
                    <Link to={`/journal/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <p className="prose">{article.excerpt}</p>
                  <Link to={`/journal/${article.slug}`} className="text-link">
                    Read the Story
                    <Arrow size={18} />
                  </Link>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <Reveal className="closing-cta">
            <p className="eyebrow">From the studio</p>
            <blockquote className="journal-quote">
              “A ritual is not a rule. It is a place to return to.”
            </blockquote>
            <p className="lede">
              The Journal is written by the Veda Botanic studio — part field notes, part slow
              thinking. Read one over a cup of something warm.
            </p>
            <div className="closing-cta__actions">
              <Link to="/philosophy" className="btn btn--outline">
                Our Philosophy
                <Arrow size={18} />
              </Link>
              <Link to="/shop" className="text-link">
                Explore the Collection
                <Arrow size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
