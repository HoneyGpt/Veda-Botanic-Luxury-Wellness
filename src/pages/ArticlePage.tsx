import { Link } from '../router'
import { Reveal } from '../components/Reveal'
import { StoryCard } from '../components/StoryCard'
import { Arrow } from '../components/Icons'
import { articles, getArticle } from '../data/journal'
import { usePageMeta } from '../lib/seo'

export function ArticlePage({ slug }: { slug: string }) {
  const article = getArticle(slug)

  usePageMeta(
    article ? `${article.title} — Veda Botanic Journal` : 'Story not found — Veda Botanic',
    article ? article.excerpt : 'This story could not be found.',
  )

  if (!article) {
    return (
      <div className="container">
        <div className="not-found">
          <h1 className="display-m">That story isn&apos;t on the shelf.</h1>
          <p className="lede">Try the journal index — there are only three, and all are worth it.</p>
          <Link to="/journal" className="btn btn--primary">
            Return to the Journal
          </Link>
        </div>
      </div>
    )
  }

  const next = articles.filter((item) => item.slug !== article.slug).slice(0, 2)

  return (
    <>
      <article>
        <div className="article-head">
          <div className="container">
            <div className="article-head__inner">
              <nav className="crumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span className="crumbs__sep" aria-hidden="true">
                  /
                </span>
                <Link to="/journal">Journal</Link>
                <span className="crumbs__sep" aria-hidden="true">
                  /
                </span>
                <span aria-current="page">{article.title}</span>
              </nav>
              <p className="article-head__meta">
                <span>{article.kicker}</span>
                <span aria-hidden="true">·</span>
                <span>{article.number}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readingTime}</span>
              </p>
              <h1 className="display-l article-head__title">{article.title}</h1>
              <p className="article-head__intro">{article.intro}</p>
            </div>
          </div>
        </div>

        <div className="container container--narrow">
          <figure className="media article-media">
            <img
              src={article.image}
              alt={article.imageAlt}
              width={1264}
              height={848}
              fetchPriority="high"
              decoding="async"
              style={{ objectPosition: article.detailPosition }}
            />
          </figure>
        </div>

        <div className="container">
          <div className="article-body">
            {article.blocks.map((block, index) => {
              if (block.type === 'h2') {
                return <h2 key={index}>{block.text}</h2>
              }
              if (block.type === 'quote') {
                return (
                  <blockquote key={index}>
                    <p>{block.text}</p>
                  </blockquote>
                )
              }
              if (block.type === 'list') {
                return (
                  <ul key={index}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )
              }
              return <p key={index}>{block.text}</p>
            })}

            <div className="article-foot">
              <Link to="/journal" className="text-link">
                <span aria-hidden="true">←</span> All Stories
              </Link>
              <p className="fine">
                Written by the Veda Botanic studio. A concept publication — not medical advice.
              </p>
            </div>
          </div>
        </div>
      </article>

      <section className="section section--tight section--hairline-top" aria-labelledby="next-reads-title">
        <div className="container">
          <div className="section-head">
            <div className="section-head__text">
              <p className="eyebrow">Continue reading</p>
              <h2 className="display-m" id="next-reads-title">
                More from the Journal.
              </h2>
            </div>
            <Link to="/journal" className="text-link">
              All Stories
              <Arrow size={18} />
            </Link>
          </div>
          <div className="next-reads">
            {next.map((item, index) => (
              <Reveal key={item.slug} delay={index * 90}>
                <StoryCard article={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
