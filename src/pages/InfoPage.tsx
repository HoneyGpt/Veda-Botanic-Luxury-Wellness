import { Link } from '../router'
import { Reveal } from '../components/Reveal'
import { Arrow, MailIcon } from '../components/Icons'
import { usePageMeta } from '../lib/seo'

type Section = {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

type InfoContent = {
  title: string
  eyebrow: string
  intro: string
  callout?: string
  sections: Section[]
}

const CONTENT: Record<string, InfoContent> = {
  'shipping-returns': {
    eyebrow: 'Client Care',
    title: 'Shipping & Returns',
    intro:
      'A considered journey from our studio to your shelf. This describes how the full store would operate.',
    callout:
      'No orders are shipped from this concept. Veda Botanic is a design study — nothing on this site can be purchased.',
    sections: [
      {
        heading: 'Dispatch',
        paragraphs: [
          'Orders would be packed by hand at the Mumbai studio and dispatched within two working days. Each parcel would include a printed ritual card and be packed without plastic.',
          'You would receive a dispatch note by email with tracking as soon as the parcel leaves us.',
        ],
      },
      {
        heading: 'Delivery',
        list: [
          'India — 3 to 6 working days, fully tracked.',
          'International — 7 to 14 working days, fully tracked.',
          'Delivery charges would be shown clearly at checkout, before payment.',
        ],
      },
      {
        heading: 'Returns',
        paragraphs: [
          'Unopened products could be returned within 30 days of delivery for a refund to the original payment method. For hygiene reasons, opened skincare and bath products cannot be returned unless they are faulty.',
          'To begin a return, write to us with your order reference and we would send a prepaid label where applicable.',
        ],
      },
      {
        heading: 'If something arrives damaged',
        paragraphs: [
          'Please photograph the parcel and its contents within 48 hours of delivery and send the images with your order reference. A replacement would be arranged without charge.',
        ],
      },
      {
        heading: 'Questions',
        paragraphs: [
          'Write to hello@vedabotanic.com and a member of the studio would reply within two working days.',
        ],
      },
    ],
  },
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    intro:
      'How this concept handles information, and how a full store would handle it responsibly.',
    callout:
      'This prototype does not collect, store or transmit personal data. Your bag is saved in your own browser only.',
    sections: [
      {
        heading: 'What this concept does',
        list: [
          'No account, payment or order information is collected.',
          'Your bag is stored in localStorage on this device so it survives a refresh. Clearing your browser data removes it.',
          'The newsletter form validates an email address in the browser and does not send or store it anywhere.',
          'No advertising cookies, analytics scripts or third-party trackers are used on this site.',
        ],
      },
      {
        heading: 'What the full store would collect',
        paragraphs: [
          'A live store would need your name, contact details, delivery address and order history to fulfil an order. Payment details would be handled by a PCI-compliant provider and never stored on our servers.',
          'If you subscribed to the letter, we would store your email address and keep a record of consent. We would never sell or rent personal data to anyone.',
        ],
      },
      {
        heading: 'How long information would be kept',
        paragraphs: [
          'Order records would be retained for as long as accounting and tax law requires. Newsletter consent would be retained until you withdraw it.',
        ],
      },
      {
        heading: 'Your rights',
        list: [
          'Ask what personal data we hold about you.',
          'Request a correction or deletion.',
          'Withdraw consent to marketing at any time — every letter would include an unsubscribe link.',
          'Complain to your local data protection authority.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Privacy questions would go to hello@vedabotanic.com with “Privacy” in the subject line.',
        ],
      },
    ],
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms & Conditions',
    intro:
      'The basis on which this concept storefront is published and intended to be used.',
    callout:
      'These terms describe a fictional brand and design concept. Nothing on this site is an offer for sale.',
    sections: [
      {
        heading: 'Use of this site',
        paragraphs: [
          'You are welcome to browse, link to and reference this concept for non-commercial purposes. The site is provided as-is for demonstration and does not create a contract of sale.',
        ],
      },
      {
        heading: 'Products, prices and availability',
        paragraphs: [
          'All products, sizes and prices shown are placeholders. No payment is taken and no order is fulfilled. Product imagery is generated for the concept and does not represent a physical product.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'The Veda Botanic name, wordmark, copy and art direction form part of a design concept. Please ask before reproducing them commercially.',
        ],
      },
      {
        heading: 'No medical advice',
        paragraphs: [
          'Editorial content describes self-care ritual and botanical tradition. It is not medical advice, diagnosis or treatment, and it does not establish that any ingredient is safe, effective or suitable for everyone. Always patch test and consult a professional if you have concerns.',
        ],
      },
      {
        heading: 'Liability',
        paragraphs: [
          'To the fullest extent permitted by law, the studio is not liable for any loss arising from use of this concept site or reliance on its placeholder content.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'This concept and these terms may change without notice. Any future live store would publish its own complete terms before trading.',
        ],
      },
    ],
  },
  accessibility: {
    eyebrow: 'Client Care',
    title: 'Accessibility',
    intro:
      'A calm experience should also be an easy one — usable with a keyboard, a screen reader, or a slower connection.',
    sections: [
      {
        heading: 'What is built in',
        list: [
          'Semantic landmarks and a single, ordered heading structure on every page.',
          'Full keyboard navigation, including the bag, search, menu and checkout.',
          'Visible focus states in champagne and forest, with a skip link to main content.',
          'Text colours chosen to meet WCAG AA contrast on ivory and forest backgrounds.',
          'Motion is gentle and respects the operating system’s reduced-motion setting.',
          'Meaningful alternative text for editorial imagery; decorative images are hidden from assistive technology.',
          'Responsive type and layout from small phones to wide desktops.',
        ],
      },
      {
        heading: 'Known limitations',
        paragraphs: [
          'This concept has not been independently audited. Some generated imagery is decorative and its alt text is necessarily descriptive rather than definitive. If you rely on a screen reader and find something unclear, we would like to know.',
        ],
      },
      {
        heading: 'Feedback',
        paragraphs: [
          'Write to hello@vedabotanic.com with “Accessibility” in the subject line. In a live store, we would aim to reply within two working days and to fix confirmed issues promptly.',
        ],
      },
    ],
  },
  contact: {
    eyebrow: 'Client Care',
    title: 'Speak to the Studio',
    intro:
      'Questions about a ritual, a botanical or the collection? We read every message, and answer calmly.',
    callout:
      'Contact details are placeholders for this concept. No messages are received or stored by this site.',
    sections: [
      {
        heading: 'Client care',
        paragraphs: [
          'hello@vedabotanic.com — for orders, products and ritual questions.',
          'Monday to Friday, 10am to 6pm IST. In a live store, we would reply within two working days.',
        ],
      },
      {
        heading: 'Press & partnerships',
        paragraphs: [
          'studio@vedabotanic.com — for editorial requests, imagery and considered collaborations.',
        ],
      },
      {
        heading: 'The studio',
        paragraphs: ['Veda Botanic, Mumbai, India. Visits by appointment only.'],
      },
      {
        heading: 'Something not right?',
        paragraphs: [
          'If a parcel, product or page has not met your expectations, tell us plainly. It is the fastest way for a small studio to improve.',
        ],
      },
    ],
  },
}

const INFO_NAV = [
  { slug: 'shipping-returns', label: 'Shipping & Returns' },
  { slug: 'privacy', label: 'Privacy Policy' },
  { slug: 'terms', label: 'Terms & Conditions' },
  { slug: 'accessibility', label: 'Accessibility' },
  { slug: 'contact', label: 'Contact' },
]

export function InfoPage({ slug }: { slug: string }) {
  const content = CONTENT[slug]

  usePageMeta(
    content ? `${content.title} — Veda Botanic` : 'Information — Veda Botanic',
    content ? content.intro : 'Information about Veda Botanic.',
  )

  if (!content) {
    return (
      <div className="container">
        <div className="not-found">
          <h1 className="display-m">This page is still being written.</h1>
          <Link to="/" className="btn btn--primary">
            Return home
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
              <span aria-current="page">{content.title}</span>
            </nav>
            <p className="eyebrow">{content.eyebrow}</p>
            <h1 className="display-l page-head__title">{content.title}</h1>
            <p className="lede">{content.intro}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="info-layout">
          <nav className="info-nav" aria-label="Information pages">
            {INFO_NAV.map((item) => (
              <Link
                key={item.slug}
                to={`/${item.slug}`}
                aria-current={item.slug === slug ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="info-content">
            {content.callout && (
              <Reveal className="info-callout">
                <p>{content.callout}</p>
              </Reveal>
            )}
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {slug === 'contact' && (
              <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="mailto:hello@vedabotanic.com" className="btn btn--primary">
                  <MailIcon size={16} />
                  Email the studio
                </a>
                <Link to="/shipping-returns" className="btn btn--outline">
                  Shipping &amp; returns
                  <Arrow size={16} />
                </Link>
              </div>
            )}

            <Reveal className="info-callout" style={{ marginTop: 40 }}>
              <p>
                Veda Botanic is a concept brand. Prices, policies and contact details are
                illustrative placeholders and do not constitute an offer for sale.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  )
}
