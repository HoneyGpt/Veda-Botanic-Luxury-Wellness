import { Link } from '../router'
import type { Article } from '../data/journal'
import { Arrow } from './Icons'

export function StoryCard({ article }: { article: Article }) {
  return (
    <article className="story-card">
      <Link
        to={`/journal/${article.slug}`}
        className="media media--zoom story-card__media"
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
      <div className="story-card__content">
        <p className="story-card__meta">
          <span>{article.number}</span>
          <span aria-hidden="true">/</span>
          <span>{article.kicker}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
        </p>
        <h3 className="story-card__title">
          <Link to={`/journal/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="story-card__excerpt">{article.excerpt}</p>
        <Link
          to={`/journal/${article.slug}`}
          className="text-link text-link--quiet story-card__link"
        >
          Read the Story
          <Arrow size={16} />
        </Link>
      </div>
    </article>
  )
}
