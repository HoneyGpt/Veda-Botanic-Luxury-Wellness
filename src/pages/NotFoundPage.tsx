import { Link } from '../router'
import { Arrow, Sprig } from '../components/Icons'
import { usePageMeta } from '../lib/seo'

export function NotFoundPage() {
  usePageMeta(
    'Page not found — Veda Botanic',
    'This page does not exist. Return to the Veda Botanic collection, or read the journal.',
  )

  return (
    <div className="container">
      <div className="not-found">
        <Sprig className="not-found__mark" size={28} />
        <p className="eyebrow eyebrow--bare">404 — Page not found</p>
        <h1 className="display-l" style={{ maxWidth: '18ch' }}>
          A quiet corner, but not the one you were looking for.
        </h1>
        <p className="lede">
          The page may have moved, or it may never have existed. Either way, there are four
          essentials and three stories waiting.
        </p>
        <div className="closing-cta__actions" style={{ justifyContent: 'center', marginTop: 8 }}>
          <Link to="/shop" className="btn btn--primary">
            Explore the Collection
            <Arrow size={18} />
          </Link>
          <Link to="/journal" className="btn btn--outline">
            Read the Journal
          </Link>
        </div>
      </div>
    </div>
  )
}
