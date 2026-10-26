import { Link } from '../router'
import { Wordmark } from './Wordmark'
import { NewsletterForm } from './NewsletterForm'
import { InstagramIcon, MailIcon, PinterestIcon, Sprig } from './Icons'

const SHOP_LINKS = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Face', href: '/shop/face' },
  { label: 'Body', href: '/shop/body' },
  { label: 'Bath & Rituals', href: '/shop/bath' },
  { label: 'Botanical Bath Soak', href: '/product/botanical-bath-soak' },
]

const HOUSE_LINKS = [
  { label: 'Our Philosophy', href: '/philosophy' },
  { label: 'The Journal', href: '/journal' },
  { label: 'Ingredients', href: '/philosophy#ingredients' },
  { label: 'The Art of Everyday Rituals', href: '/#rituals' },
]

const CARE_LINKS = [
  { label: 'Contact', href: '/contact' },
  { label: 'Shipping & Returns', href: '/shipping-returns' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
]

export function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="site-footer__news">
          <div>
            <p className="eyebrow eyebrow--light">The Veda Botanic letter</p>
            <h2 className="site-footer__news-title" style={{ marginTop: 18 }}>
              A little more nature in your inbox.
            </h2>
            <p className="site-footer__news-copy">
              Notes on rituals, botanicals and the things we are making — sent quietly, and never
              more than once a month.
            </p>
          </div>
          <div className="site-footer__news-form">
            <NewsletterForm />
          </div>
        </div>

        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Wordmark light stacked />
            <p className="site-footer__brand-copy">
              Botanical skincare and everyday rituals, made for the quiet parts of the day.
            </p>
            <div className="site-footer__socials">
              <a
                className="site-footer__social"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Veda Botanic on Instagram (placeholder link)"
              >
                <InstagramIcon />
              </a>
              <a
                className="site-footer__social"
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Veda Botanic on Pinterest (placeholder link)"
              >
                <PinterestIcon />
              </a>
              <a
                className="site-footer__social"
                href="mailto:hello@vedabotanic.com"
                aria-label="Email Veda Botanic"
              >
                <MailIcon />
              </a>
            </div>
          </div>

          <div className="site-footer__col">
            <h3 className="footer-col__title">Shop</h3>
            <ul className="footer-col__list">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__col">
            <h3 className="footer-col__title">The House</h3>
            <ul className="footer-col__list">
              {HOUSE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__col">
            <h3 className="footer-col__title">Client Care</h3>
            <ul className="footer-col__list">
              {CARE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <address>
                  <a href="mailto:hello@vedabotanic.com">hello@vedabotanic.com</a>
                  <br />
                  Studio hours: Mon–Fri, 10–6 IST
                  <br />
                  Mumbai, India
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Veda Botanic. A design concept.</p>
          <div className="site-footer__legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/shipping-returns">Shipping & Returns</Link>
            <Link to="/accessibility">Accessibility</Link>
          </div>
        </div>

        <p className="site-footer__disclaimer">
          Veda Botanic is a fictional brand created as a design study. Products, prices, contact
          details and imagery are placeholders and do not constitute an offer for sale. Nothing
          here is medical advice. Please patch test any product and consult a professional if you
          have concerns about your skin.{' '}
          <Sprig size={14} className="footer-sprig" />
        </p>
      </div>
    </footer>
  )
}
