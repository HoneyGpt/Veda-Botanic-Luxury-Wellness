import { useRef } from 'react'
import { Link } from '../router'
import { formatPrice } from '../data/products'
import { useShop } from '../shop/store'
import { useBodyLock, useEscape, useFocusTrap } from '../lib/ui'
import { BagIcon, CareIcon, CloseIcon, MinusIcon, PlusIcon } from './Icons'

export function BagDrawer() {
  const { isBagOpen, closeBag, lines, subtotal, count, setQty, removeLine } = useShop()
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(isBagOpen, panelRef)
  useEscape(isBagOpen, closeBag)
  useBodyLock(isBagOpen)

  return (
    <>
      <div
        className={`overlay ${isBagOpen ? 'is-open' : ''}`}
        onClick={closeBag}
        aria-hidden="true"
      />
      <aside
        className={`bag ${isBagOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        aria-hidden={!isBagOpen}
        ref={panelRef}
      >
        <div className="bag__head">
          <h2 className="bag__title">
            Your bag
            <span aria-live="polite">{count > 0 ? `(${count})` : ''}</span>
          </h2>
          <button type="button" className="bag__close" aria-label="Close bag" onClick={closeBag}>
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="bag__body">
          {lines.length === 0 ? (
            <div className="bag__empty">
              <BagIcon size={44} className="bag__empty-icon" />
              <div>
                <p className="bag__empty-title">Your bag is empty.</p>
                <p className="small" style={{ marginTop: 6, maxWidth: '30ch' }}>
                  Four essentials, considered for slow mornings and quiet evenings.
                </p>
              </div>
              <Link to="/shop" className="btn btn--outline btn--small" onClick={closeBag}>
                Explore the collection
              </Link>
            </div>
          ) : (
            <ul aria-label="Items in your bag">
              {lines.map((line) => (
                <li className="bag-line" key={line.key}>
                  <Link
                    to={`/product/${line.product.slug}`}
                    className="bag-line__media"
                    onClick={closeBag}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img src={line.product.image} alt="" loading="lazy" />
                  </Link>
                  <div>
                    <div className="bag-line__top">
                      <h3 className="bag-line__name">
                        <Link to={`/product/${line.product.slug}`} onClick={closeBag}>
                          {line.product.name}
                        </Link>
                      </h3>
                      <span className="bag-line__price">{formatPrice(line.lineTotal)}</span>
                    </div>
                    <p className="bag-line__variant">{line.variant.label}</p>
                    <div className="bag-line__controls">
                      <div className="qty">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${line.product.name}`}
                          onClick={() =>
                            setQty(line.product.slug, line.variant.id, line.qty - 1)
                          }
                        >
                          <MinusIcon />
                        </button>
                        <span className="qty__value" aria-live="polite">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${line.product.name}`}
                          onClick={() =>
                            setQty(line.product.slug, line.variant.id, line.qty + 1)
                          }
                          disabled={line.qty >= 9}
                        >
                          <PlusIcon />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="bag-line__remove"
                        onClick={() => removeLine(line.product.slug, line.variant.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="bag__foot">
            <div className="bag__subtotal">
              <span className="bag__subtotal-label">Subtotal</span>
              <span className="bag__subtotal-value">{formatPrice(subtotal)}</span>
            </div>
            <p className="bag__note">
              Shipping and taxes calculated at checkout. A concept storefront — no payment is
              taken and no order is placed.
            </p>
            <Link to="/checkout" className="btn btn--primary btn--block" onClick={closeBag}>
              Continue to checkout
            </Link>
            <p className="bag__reassure">
              <CareIcon size={14} />
              Complimentary ritual notes with every order
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
