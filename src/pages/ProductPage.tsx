import { useEffect, useState } from 'react'
import { Link } from '../router'
import { formatPrice, getProduct, PRICE_DISCLAIMER } from '../data/products'
import { useShop } from '../shop/store'
import { usePageMeta } from '../lib/seo'
import { Accordion } from '../components/Accordion'
import { Arrow, CareIcon, InfoIcon, LeafIcon, MinusIcon, PlusIcon } from '../components/Icons'

export function ProductPage({ slug }: { slug: string }) {
  const product = getProduct(slug)
  const { addItem, openBag, notify } = useShop()
  const [variantId, setVariantId] = useState(product?.variants[0].id ?? '')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setVariantId(product?.variants[0].id ?? '')
    setQty(1)
  }, [slug, product])

  usePageMeta(
    product ? `${product.name} — Veda Botanic` : 'Product not found — Veda Botanic',
    product ? product.description : 'This product could not be found.',
  )

  if (!product) {
    return (
      <div className="container">
        <div className="not-found">
          <h1 className="display-m">We couldn&apos;t find that product.</h1>
          <p className="lede">It may have moved, or never existed on this shelf.</p>
          <Link to="/shop" className="btn btn--primary">
            Return to the collection
          </Link>
        </div>
      </div>
    )
  }

  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0]
  const pair = getProduct(product.pairWith)

  const addToBag = () => {
    addItem(product.slug, variant.id, qty)
    notify(`${product.name} — ${variant.label} added to your bag.`)
    openBag()
  }

  return (
    <>
      <div className="container pdp">
        <nav className="crumbs" aria-label="Breadcrumb" style={{ paddingTop: 'clamp(22px, 3vw, 36px)' }}>
          <Link to="/">Home</Link>
          <span className="crumbs__sep" aria-hidden="true">
            /
          </span>
          <Link to="/shop">Shop All</Link>
          <span className="crumbs__sep" aria-hidden="true">
            /
          </span>
          <Link to={`/shop/${product.category}`}>{product.categoryLabel}</Link>
          <span className="crumbs__sep" aria-hidden="true">
            /
          </span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pdp__grid">
          <div className="pdp__media-col">
            <div className="media pdp__media">
              <img
                src={product.image}
                alt={product.imageAlt}
                width={928}
                height={1152}
                fetchPriority="high"
                decoding="async"
                style={{ objectPosition: product.detailPosition }}
              />
            </div>
            <p className="pdp__caption">
              <span>Photographed in natural daylight</span>
              <span aria-hidden="true">
                {product.index} / 04
              </span>
            </p>
          </div>

          <div className="pdp__info">
            <p className="pdp__kicker">
              Collection 001 <span aria-hidden="true">/</span> {product.categoryLabel}
            </p>
            <h1 className="display-m pdp__title">{product.name}</h1>
            <p className="pdp__tagline">{product.tagline}</p>

            <div className="pdp__price-row">
              <span className="pdp__price">{formatPrice(variant.price)}</span>
              <span className="pdp__price-note">Placeholder price — not an offer for sale</span>
            </div>

            <p className="pdp__desc">{product.description}</p>

            <div className="option-group">
              <div className="option-group__label">
                <span>Size</span>
                <span className="option-group__value">{variant.label}</span>
              </div>
              <div className="option-list" role="radiogroup" aria-label="Choose a size">
                {product.variants.map((item) => (
                  <label className="option" key={item.id}>
                    <input
                      type="radio"
                      name={`variant-${product.slug}`}
                      value={item.id}
                      checked={item.id === variant.id}
                      onChange={() => setVariantId(item.id)}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="pdp__buy">
              <div className="qty">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((value) => Math.max(1, value - 1))}
                  disabled={qty <= 1}
                >
                  <MinusIcon />
                </button>
                <span className="qty__value" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((value) => Math.min(9, value + 1))}
                  disabled={qty >= 9}
                >
                  <PlusIcon />
                </button>
              </div>
              <button type="button" className="btn btn--primary" onClick={addToBag}>
                Add to Bag · {formatPrice(variant.price * qty)}
              </button>
            </div>

            <div className="pdp__reassure">
              <span>
                <LeafIcon size={14} /> Botanical-first concept
              </span>
              <span>
                <CareIcon size={14} /> Patch test before use
              </span>
              <span>
                <InfoIcon size={14} /> Ingredient list to be confirmed
              </span>
            </div>

            <div className="pdp__prototype">
              <InfoIcon />
              <p>
                This is a design prototype. Adding to the bag is real, checkout is a demonstration
                and no payment is taken. {PRICE_DISCLAIMER}
              </p>
            </div>

            <div>
              <Accordion title="The Ritual" defaultOpen>
                <ul>
                  {product.ritual.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </Accordion>

              <Accordion title="Botanicals">
                <p style={{ marginBottom: 12 }}>
                  {product.keyBotanicals.join(' · ')}. {product.note}
                </p>
                <p>
                  Botanical ingredients are not automatically suitable for every skin. Patch test
                  first and discontinue if irritation occurs.
                </p>
              </Accordion>

              <Accordion title="Details & Care">
                <dl>
                  <dt>Format</dt>
                  <dd>{variant.label}</dd>
                  <dt>Texture</dt>
                  <dd>{product.texture}</dd>
                  <dt>Scent</dt>
                  <dd>{product.scent}</dd>
                  <dt>Care</dt>
                  <dd>Keep away from direct sunlight and heat. Use within twelve months of opening.</dd>
                  <dt>Ingredient list</dt>
                  <dd>Full INCI list to be confirmed before launch.</dd>
                </dl>
              </Accordion>

              <Accordion title="Delivery & Returns">
                <p style={{ marginBottom: 10 }}>
                  No orders are shipped from this concept. In the full store, orders would be
                  dispatched from Mumbai within two working days, with returns accepted on unopened
                  products within thirty days.
                </p>
                <Link to="/shipping-returns" className="text-link text-link--quiet">
                  Read the full policy
                  <Arrow size={16} />
                </Link>
              </Accordion>
            </div>
          </div>
        </div>

        <section className="ritual-steps" aria-labelledby="ritual-steps-title">
          <div className="ritual-steps__head">
            <p className="eyebrow">The ritual</p>
            <h2 className="display-s" id="ritual-steps-title">
              Three unhurried minutes.
            </h2>
            <p className="small" style={{ maxWidth: '30ch' }}>
              There is no correct order to any of this — only the one you will return to.
            </p>
          </div>
          <div className="ritual-steps__list">
            {product.ritual.map((step, index) => (
              <div className="ritual-step" key={step}>
                <span className="ritual-step__num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="ritual-step__text">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {pair && (
          <section className="pairing" aria-labelledby="pairing-title">
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Pair it with
              </p>
              <h2 className="display-s" id="pairing-title">
                A complete ritual.
              </h2>
            </div>
            <div className="pairing__card">
              <Link
                to={`/product/${pair.slug}`}
                className="media pairing__media"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={pair.image}
                  alt=""
                  width={928}
                  height={1152}
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <div>
                <h3 className="pairing__name">
                  <Link to={`/product/${pair.slug}`}>{pair.name}</Link>
                </h3>
                <p className="pairing__desc">{pair.tagline}</p>
              </div>
              <Link to={`/product/${pair.slug}`} className="btn btn--outline btn--small">
                View
                <Arrow size={16} />
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
