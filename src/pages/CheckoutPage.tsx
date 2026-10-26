import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from '../router'
import { formatPrice } from '../data/products'
import { useShop } from '../shop/store'
import { usePageMeta } from '../lib/seo'
import { Arrow, CheckIcon, InfoIcon } from '../components/Icons'

type Confirmation = { ref: string; email: string }

export function CheckoutPage() {
  const { lines, subtotal, count, clearBag } = useShop()
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null)
  const fieldId = useId()

  usePageMeta(
    'Checkout — Veda Botanic',
    'A demonstration checkout for the Veda Botanic concept storefront. No payment is taken and no order is placed.',
  )

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (lines.length === 0) return
    const form = event.currentTarget
    const emailField = form.elements.namedItem('email')
    const email = emailField && 'value' in emailField ? String(emailField.value) : ''
    const ref = `VB-26-${Math.floor(1000 + Math.random() * 9000)}`
    setConfirmation({ ref, email })
    clearBag()
    window.scrollTo({ top: 0 })
  }

  if (confirmation) {
    return (
      <div className="container">
        <div className="order-confirm">
          <span className="order-confirm__mark" aria-hidden="true">
            <CheckIcon size={22} />
          </span>
          <p className="eyebrow eyebrow--bare">Demonstration order</p>
          <h1 className="display-m">Thank you — your ritual is noted.</h1>
          <p className="lede" style={{ textAlign: 'inherit' }}>
            No payment was taken and nothing will be shipped. This page exists to show how a
            considered checkout might feel: calm, clear and free of pressure.
          </p>
          <p className="order-confirm__ref">Reference {confirmation.ref}</p>
          <p className="fine" style={{ maxWidth: '46ch' }}>
            In the full store, a confirmation would be sent to{' '}
            <strong>{confirmation.email || 'your email address'}</strong>. Your bag has been cleared
            for the demonstration.
          </p>
          <div className="order-confirm__actions">
            <Link to="/shop" className="btn btn--primary">
              Continue exploring
              <Arrow size={18} />
            </Link>
            <Link to="/journal" className="btn btn--outline">
              Read the Journal
            </Link>
          </div>
          <p className="fine" style={{ marginTop: 12 }}>
            Or return <Link to="/" style={{ borderBottom: '1px solid var(--line)' }}>home</Link>.
          </p>
        </div>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="container">
        <div className="not-found">
          <p className="eyebrow eyebrow--bare">Checkout</p>
          <h1 className="display-m">Your bag is empty.</h1>
          <p className="lede">There is nothing to check out just yet — begin with the collection.</p>
          <Link to="/shop" className="btn btn--primary">
            Explore the Collection
            <Arrow size={18} />
          </Link>
        </div>
      </div>
    )
  }

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
              <Link to="/shop">Shop</Link>
              <span className="crumbs__sep" aria-hidden="true">
                /
              </span>
              <span aria-current="page">Checkout</span>
            </nav>
            <h1 className="display-l">A considered finish.</h1>
            <p className="lede">
              {count} {count === 1 ? 'item' : 'items'} · a few details and your ritual is on its
              way — in spirit, at least.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 'clamp(56px, 8vw, 106px)' }}>
        <div className="checkout-banner" role="note" style={{ marginBottom: 24 }}>
          <InfoIcon />
          <p>
            <strong>Prototype checkout.</strong> This form demonstrates the experience only. No
            payment is processed, no data is sent and no order is placed.
          </p>
        </div>

        <div className="checkout">
          <form onSubmit={onSubmit} aria-label="Checkout details">
            <section className="checkout__section" aria-labelledby={`${fieldId}-contact`}>
              <h2 className="checkout__section-title" id={`${fieldId}-contact`}>
                <span aria-hidden="true">01</span> Contact
              </h2>
              <div className="form-grid">
                <div className="field field--full">
                  <label className="field__label" htmlFor={`${fieldId}-email`}>
                    Email address
                  </label>
                  <input
                    className="input"
                    id={`${fieldId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="field field--full">
                  <label className="field__label" htmlFor={`${fieldId}-phone`}>
                    Phone <span className="dim">(optional)</span>
                  </label>
                  <input
                    className="input"
                    id={`${fieldId}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91"
                  />
                </div>
              </div>
            </section>

            <section className="checkout__section" aria-labelledby={`${fieldId}-delivery`}>
              <h2 className="checkout__section-title" id={`${fieldId}-delivery`}>
                <span aria-hidden="true">02</span> Delivery
              </h2>
              <div className="form-grid">
                <div className="field">
                  <label className="field__label" htmlFor={`${fieldId}-first`}>
                    First name
                  </label>
                  <input
                    className="input"
                    id={`${fieldId}-first`}
                    name="firstName"
                    autoComplete="given-name"
                    required
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor={`${fieldId}-last`}>
                    Last name
                  </label>
                  <input
                    className="input"
                    id={`${fieldId}-last`}
                    name="lastName"
                    autoComplete="family-name"
                    required
                  />
                </div>
                <div className="field field--full">
                  <label className="field__label" htmlFor={`${fieldId}-address`}>
                    Address
                  </label>
                  <input
                    className="input"
                    id={`${fieldId}-address`}
                    name="address"
                    autoComplete="address-line1"
                    placeholder="Street and number"
                    required
                  />
                </div>
                <div className="field field--full">
                  <label className="field__label" htmlFor={`${fieldId}-address2`}>
                    Apartment, suite <span className="dim">(optional)</span>
                  </label>
                  <input
                    className="input"
                    id={`${fieldId}-address2`}
                    name="address2"
                    autoComplete="address-line2"
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor={`${fieldId}-city`}>
                    City
                  </label>
                  <input
                    className="input"
                    id={`${fieldId}-city`}
                    name="city"
                    autoComplete="address-level2"
                    required
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor={`${fieldId}-state`}>
                    State
                  </label>
                  <input
                    className="input"
                    id={`${fieldId}-state`}
                    name="state"
                    autoComplete="address-level1"
                    required
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor={`${fieldId}-pin`}>
                    PIN code
                  </label>
                  <input
                    className="input"
                    id={`${fieldId}-pin`}
                    name="pin"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    required
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor={`${fieldId}-country`}>
                    Country
                  </label>
                  <select className="input" id={`${fieldId}-country`} name="country" defaultValue="IN">
                    <option value="IN">India</option>
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="SG">Singapore</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="checkout__section" aria-labelledby={`${fieldId}-payment`}>
              <h2 className="checkout__section-title" id={`${fieldId}-payment`}>
                <span aria-hidden="true">03</span> Payment
              </h2>
              <div className="pay-options" role="radiogroup" aria-label="Payment method">
                <label className="pay-option">
                  <input type="radio" name="payment" value="card" defaultChecked />
                  Credit or debit card
                </label>
                <label className="pay-option">
                  <input type="radio" name="payment" value="upi" />
                  UPI
                </label>
                <label className="pay-option">
                  <input type="radio" name="payment" value="cod" />
                  Cash on delivery
                </label>
              </div>
              <p className="form-note">
                Payment fields are intentionally omitted from this prototype. In the full store,
                secure payment would be handled by a PCI-compliant provider. No card details are
                requested here.
              </p>
            </section>

            <div className="checkout__section" style={{ borderBottom: 0, paddingBottom: 0 }}>
              <button type="submit" className="btn btn--primary btn--block">
                Place demonstration order
                <Arrow size={18} />
              </button>
              <p className="form-note">
                By placing this demonstration order you agree that no purchase is made. Read our{' '}
                <Link to="/terms">terms</Link> and <Link to="/privacy">privacy policy</Link>.
              </p>
            </div>
          </form>

          <aside className="summary" aria-labelledby="summary-title">
            <h2 className="summary__title" id="summary-title">
              Your ritual
            </h2>
            <div className="summary__lines">
              {lines.map((line) => (
                <div className="summary-line" key={line.key}>
                  <div className="summary-line__media">
                    <img src={line.product.image} alt="" loading="lazy" />
                    <span className="summary-line__qty" aria-hidden="true">
                      {line.qty}
                    </span>
                  </div>
                  <div>
                    <p className="summary-line__name">{line.product.name}</p>
                    <p className="summary-line__variant">{line.variant.label}</p>
                  </div>
                  <span className="summary-line__price">{formatPrice(line.lineTotal)}</span>
                </div>
              ))}
            </div>
            <div className="summary__totals">
              <div className="summary__row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary__row">
                <span>Delivery</span>
                <span>Calculated in the full store</span>
              </div>
              <div className="summary__row summary__row--total">
                <span>Total</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
            </div>
            <p className="summary__note">
              Prices are placeholders for this concept. No payment will be taken and no order will
              be shipped.
            </p>
            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link to="/shipping-returns" className="text-link text-link--quiet">
                Shipping &amp; returns
                <Arrow size={16} />
              </Link>
              <Link to="/contact" className="text-link text-link--quiet">
                Client care
                <Arrow size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
