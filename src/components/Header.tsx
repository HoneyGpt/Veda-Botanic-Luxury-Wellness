import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useRouter } from '../router'
import { useShop } from '../shop/store'
import { formatPrice, products } from '../data/products'
import { articles } from '../data/journal'
import { Arrow, AccountIcon, BagIcon, CloseIcon, SearchIcon } from './Icons'
import { Wordmark } from './Wordmark'
import { useBodyLock, useEscape, useFocusTrap } from '../lib/ui'

const NAV = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Face', href: '/shop/face' },
  { label: 'Body', href: '/shop/body' },
  { label: 'Bath & Rituals', href: '/shop/bath' },
  { label: 'Our Philosophy', href: '/philosophy' },
  { label: 'Journal', href: '/journal' },
]

export function Header() {
  const { pathname } = useRouter()
  const { count, openBag } = useShop()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [clientOpen, setClientOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
    setClientOpen(false)
  }, [pathname])

  useBodyLock(menuOpen || searchOpen || clientOpen)

  const openBagFromHeader = () => {
    setMenuOpen(false)
    setSearchOpen(false)
    setClientOpen(false)
    openBag()
  }

  const isCurrent = (href: string) =>
    href === '/shop'
      ? pathname === '/shop' || pathname.startsWith('/product/')
      : pathname === href

  return (
    <>
      <div className="announce">
        <span className="announce__item--lg">A design concept</span>
        <span className="announce__dot" aria-hidden="true" />
        <span className="announce__item--sm">Considered botanicals — prices are placeholders</span>
        <span className="announce__item--lg">Considered botanicals for everyday rituals</span>
        <span className="announce__dot" aria-hidden="true" />
        <span className="announce__item--lg">Prices shown are placeholders</span>
      </div>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="site-header__inner">
          <button
            type="button"
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="nav-toggle__bars" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>

          <Wordmark />

          <nav className="site-header__nav" aria-label="Primary">
            <ul className="primary-nav">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    className="nav-link"
                    to={item.href}
                    aria-current={isCurrent(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__utilities">
            <button
              type="button"
              className="icon-btn icon-btn--search"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              className="icon-btn icon-btn--account"
              aria-label="Client services"
              onClick={() => setClientOpen(true)}
            >
              <AccountIcon />
            </button>
            <button
              type="button"
              className="icon-btn bag-btn"
              aria-label={`Shopping bag, ${count} ${count === 1 ? 'item' : 'items'}`}
              onClick={openBagFromHeader}
            >
              <BagIcon />
              {count > 0 && <span className="bag-btn__count">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={() => {
          setMenuOpen(false)
          setSearchOpen(true)
        }}
        pathname={pathname}
        count={count}
        onOpenBag={openBagFromHeader}
      />

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      <ClientDialog open={clientOpen} onClose={() => setClientOpen(false)} />
    </>
  )
}

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  onSearch: () => void
  onOpenBag: () => void
  pathname: string
  count: number
}

function MobileMenu({ open, onClose, onSearch, onOpenBag, pathname, count }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useFocusTrap(open, panelRef, closeRef)
  useEscape(open, onClose)

  return (
    <div
      id="mobile-menu"
      className={`mobile-menu ${open ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      ref={panelRef}
    >
      <div className="mobile-menu__top">
        <Wordmark onClick={onClose} />
        <button
          type="button"
          className="mobile-menu__close"
          aria-label="Close menu"
          onClick={onClose}
          ref={closeRef}
        >
          <CloseIcon size={22} />
        </button>
      </div>

      <nav aria-label="Mobile navigation">
        <ul className="mobile-menu__links">
          {NAV.map((item, index) => (
            <li key={item.href}>
              <Link
                className="mobile-menu__link"
                to={item.href}
                onClick={onClose}
                aria-current={
                  pathname === item.href ||
                  (item.href === '/shop' && pathname.startsWith('/product'))
                    ? 'page'
                    : undefined
                }
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mobile-menu__foot">
        <div className="mobile-menu__meta">
          <button type="button" onClick={onSearch} style={{ letterSpacing: 'inherit' }}>
            Search
          </button>
          <button type="button" onClick={onOpenBag} style={{ letterSpacing: 'inherit' }}>
            Bag ({count})
          </button>
          <Link to="/contact" onClick={onClose}>
            Client care
          </Link>
        </div>
        <p className="fine" style={{ maxWidth: '34ch' }}>
          Considered botanicals for everyday rituals. A design concept — no orders are placed.
        </p>
      </div>
    </div>
  )
}

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { navigate } = useRouter()
  const [query, setQuery] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useFocusTrap(open, panelRef, inputRef)
  useEscape(open, onClose)

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const q = query.trim().toLowerCase()
  const productResults = useMemo(() => {
    if (!q) return products
    return products.filter((product) =>
      [product.name, product.description, product.tagline, product.categoryLabel, ...product.keyBotanicals]
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }, [q])

  const articleResults = useMemo(() => {
    if (!q) return []
    return articles.filter((article) =>
      [article.title, article.excerpt, article.kicker].join(' ').toLowerCase().includes(q),
    )
  }, [q])

  const go = (to: string) => {
    onClose()
    navigate(to)
  }

  return (
    <div
      className={`modal-shell ${open ? 'is-open' : ''}`}
      aria-hidden={!open}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
        ref={panelRef}
      >
        <div className="modal__head">
          <h2 className="modal__title" id="search-title">
            Search
          </h2>
          <button type="button" className="modal__close" aria-label="Close search" onClick={onClose}>
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="search-field">
          <label htmlFor="site-search" className="visually-hidden">
            Search products and journal
          </label>
          <input
            id="site-search"
            ref={inputRef}
            type="search"
            value={query}
            placeholder="Try “face oil” or “ritual”"
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
          />
          <SearchIcon />
        </div>

        <div className="search-hint">
          <span>Suggestions</span>
          {['Face oil', 'Balm', 'Bath', 'Botanicals'].map((term) => (
            <button key={term} type="button" onClick={() => setQuery(term)}>
              {term}
            </button>
          ))}
        </div>

        <div aria-live="polite">
          {productResults.length > 0 && (
            <>
              <p className="label" style={{ margin: '26px 0 6px' }}>
                {q ? 'Products' : 'The collection'}
              </p>
              <div className="search-results">
                {productResults.map((product) => (
                  <button
                    key={product.slug}
                    type="button"
                    className="search-result"
                    onClick={() => go(`/product/${product.slug}`)}
                    style={{ textAlign: 'left', width: '100%' }}
                  >
                    <span className="search-result__media">
                      <img src={product.image} alt="" loading="lazy" />
                    </span>
                    <span>
                      <span className="search-result__name" style={{ display: 'block' }}>
                        {product.name}
                      </span>
                      <span className="search-result__meta">{product.categoryLabel}</span>
                    </span>
                    <span className="search-result__price">
                      {formatPrice(product.variants[0].price)}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {articleResults.length > 0 && (
            <>
              <p className="label" style={{ margin: '26px 0 6px' }}>
                Journal
              </p>
              <div className="search-results">
                {articleResults.map((article) => (
                  <button
                    key={article.slug}
                    type="button"
                    className="search-result"
                    onClick={() => go(`/journal/${article.slug}`)}
                    style={{ textAlign: 'left', width: '100%', gridTemplateColumns: '1fr auto' }}
                  >
                    <span className="search-result__name">{article.title}</span>
                    <Arrow />
                  </button>
                ))}
              </div>
            </>
          )}

          {q && productResults.length === 0 && articleResults.length === 0 && (
            <p className="search-empty">
              Nothing matched “{query.trim()}”. Try a botanical, a product or a ritual.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function ClientDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  useFocusTrap(open, panelRef)
  useEscape(open, onClose)

  return (
    <div
      className={`modal-shell ${open ? 'is-open' : ''}`}
      aria-hidden={!open}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="modal modal--small"
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-title"
        ref={panelRef}
      >
        <div className="modal__head">
          <h2 className="modal__title" id="client-title">
            Client services
          </h2>
          <button type="button" className="modal__close" aria-label="Close" onClick={onClose}>
            <CloseIcon size={18} />
          </button>
        </div>
        <p className="prose" style={{ fontSize: '0.9375rem' }}>
          Accounts, saved rituals and order history belong to the full store. This concept is a
          design study — there is no sign-in and no data is collected.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <Link to="/contact" className="btn btn--outline btn--small" onClick={onClose}>
            Contact client care
            <Arrow size={16} />
          </Link>
          <Link to="/journal" className="btn btn--outline btn--small" onClick={onClose}>
            Read the journal
            <Arrow size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
