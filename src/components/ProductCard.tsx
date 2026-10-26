import { Link } from '../router'
import { useShop } from '../shop/store'
import { formatPrice, startingPrice } from '../data/products'
import type { Product } from '../data/products'
import { Arrow } from './Icons'

type ProductCardProps = {
  product: Product
  eager?: boolean
}

export function ProductCard({ product, eager = false }: ProductCardProps) {
  const { addItem, notify } = useShop()
  const defaultVariant = product.variants[0]
  const fromPrice = startingPrice(product)
  const hasVariants = product.variants.length > 1

  const quickAdd = () => {
    addItem(product.slug, defaultVariant.id, 1)
    notify(`${product.name} — ${defaultVariant.label} added to your bag.`)
  }

  return (
    <article className="product-card">
      <div className="product-card__media-wrap">
        <Link
          to={`/product/${product.slug}`}
          className="media media--portrait media--zoom product-card__media"
          aria-label={`${product.name} — discover product`}
        >
          <img
            src={product.image}
            alt={product.imageAlt}
            width={928}
            height={1152}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            style={{ objectPosition: product.detailPosition }}
          />
          <span className="product-card__index" aria-hidden="true">
            {product.index}
          </span>
        </Link>
        <div className="product-card__quick">
          <button
            type="button"
            className="btn btn--quick"
            onClick={quickAdd}
            aria-label={`Quick add ${product.name}, ${defaultVariant.label} — ${formatPrice(defaultVariant.price)}`}
          >
            Quick Add
            <Arrow size={16} />
          </button>
        </div>
      </div>

      <div className="product-card__body">
        <div className="product-card__row">
          <h3 className="product-card__name">
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <span className="product-card__price">
            {hasVariants ? 'From ' : ''}
            {formatPrice(fromPrice)}
          </span>
        </div>
        <p className="product-card__desc">{product.tagline}</p>
        <p className="product-card__botanicals">{product.keyBotanicals.join(' · ')}</p>
        <Link
          to={`/product/${product.slug}`}
          className="text-link text-link--quiet product-card__link"
        >
          Discover Product
          <Arrow size={16} />
        </Link>
      </div>
    </article>
  )
}
