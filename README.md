# Veda Botanic

**Modern botanical rituals inspired by nature and traditional Indian wellness.**

A concept storefront for a luxury botanical skincare house — editorial art direction, a complete
shopping experience, and a small, reusable design system. Built to feel like a high-end niche
skincare brand: quiet, tactile and considered, rather than a generic ecommerce template.

---

## The brand in one paragraph

Veda Botanic pairs the botanical knowledge of the subcontinent with a contemporary, minimal
design language. Four essentials — a face oil, a body balm, a cleansing ritual and a bath soak —
are presented as objects for a carefully curated bathroom shelf. The writing is calm and plain:
botanicals are named for their character, not for claims they cannot support.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run preview  # serve the build
```

Requires Node 20+.

## Stack

- **React 19 + TypeScript** with **Vite** — no UI framework, no CSS-in-JS, no animation library.
- **Self-hosted typefaces** via Fontsource: *Cormorant Garamond* (editorial serif) and
  *Hanken Grotesk Variable* (contemporary sans). No external font requests.
- A small custom **history router** with scroll restoration and real, shareable URLs.
- **Custom CSS design system** in `src/styles` — tokens, components and page composition.
- **WebP campaign imagery**, lazy-loaded below the fold with intrinsic dimensions to avoid layout
  shift, and a preloaded hero for the LCP.

## Routes

| Route | Description |
| --- | --- |
| `/` | Homepage — hero, philosophy, collection, ingredients, rituals, signature |
| `/shop` | The collection with category filters |
| `/shop/face`, `/shop/body`, `/shop/bath` | Category views |
| `/product/:slug` | Product detail with variants, ritual steps and pairing |
| `/philosophy` | Brand story, principles, botanical index, labelling approach |
| `/journal` | Three editorial stories |
| `/journal/:slug` | Long-form story |
| `/checkout` | Working demonstration checkout |
| `/shipping-returns`, `/privacy`, `/terms`, `/accessibility`, `/contact` | Information pages |
| any other path | Designed 404 |

## Commerce prototype

The shopping experience is intentionally complete — quick add, variants, quantities, a persistent
bag, subtotal, and a checkout flow with validation and an order confirmation. It is **not connected
to a backend**:

- Bag state lives in `localStorage` on the visitor's device.
- No payment details are requested and no payment is processed.
- No order is placed and no email is sent.
- **All prices are editable placeholders** (`src/data/products.ts`) and are labelled as such in
  the interface, product detail pages, shop and footer.

This is signposted throughout rather than hidden: the announcement bar, product detail note,
checkout banner and footer all state that the storefront is a design concept.

## Where things live

```
src/
  components/      Header, Footer, BagDrawer, ProductCard, StoryCard, Accordion, Icons…
  data/            Products, ingredients and journal content (edit copy and prices here)
  lib/             Focus trap, body-scroll lock, page metadata
  pages/           Route-level composition
  shop/            Bag context and persistence
  styles/          base.css (tokens, type, layout) · components.css · pages.css
  router.tsx       Minimal history router
  App.tsx          Route table
public/images/     WebP campaign imagery
design/source-images/  Full-resolution source frames used to derive the web assets
```

## Quality checks

```bash
npm run qa   # typecheck + structure + interactions
```

- `qa:structure` server-renders all 23 routes and asserts one `h1` per page, no heading-level
  jumps, `alt` text on every image, accessible names on links and buttons, and no duplicate ids.
- `qa:interactions` mounts the app in a simulated DOM and exercises quick add, quantity changes,
  variant pricing, search filtering, client-side navigation, scroll locking and the demonstration
  checkout through to its confirmation state.

## Design system

| Token | Value | Use |
| --- | --- | --- |
| Ivory | `#F7F3EA` | Primary background |
| Forest | `#243D32` | Brand colour, type, footer, signature section |
| Sage | `#A5AE98` | Botanical accents, marks |
| Olive | `#777B53` | Captions and micro-labels |
| Sand | `#DCD0BE` | Section backgrounds |
| Champagne | `#B49A70` | Hairline detailing; a darker ink variant is used wherever text needs AA contrast |

Headlines are Cormorant Garamond Light with an italic accent; micro-labels are uppercase sans with
generous tracking. Photography is the primary ornament — the interface stays mostly ivory.

Motion is limited to slow fades and small vertical lifts on entry, a gentle scale on image hover,
and the bag drawer. Everything is disabled under `prefers-reduced-motion`.

## Accessibility

- Semantic landmarks, a skip link, and one `h1` per page with an ordered heading structure.
- Keyboard-operable navigation, search, bag, mobile menu, variant selectors and accordion.
- Focus trapping and focus restoration in the bag, search and menu overlays.
- Visible `:focus-visible` rings in champagne and ivory, with AA text contrast across ivory and
  forest backgrounds.
- Descriptive alt text for editorial imagery; decorative images are hidden from assistive tech.
- Reduced-motion support and responsive type from 320px upward.

## Imagery & honesty

All photography was generated specifically for this concept; source frames are kept in
`design/source-images`. Veda Botanic is a fictional brand. No product is for sale, no certification,
clinical result, customer review or family heritage is claimed anywhere on the site. Ingredient
copy describes a concept formulation and says so; a formulation note invites patch testing and
professional advice.

---

*Return to Your Natural Rhythm.*
