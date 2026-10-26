/**
 * Structure QA — server-renders every route and asserts document semantics:
 * one h1 per page, no heading-level jumps, alt text on every image, accessible
 * names on links and buttons, and no duplicate element ids.
 *
 * Run with: npm run qa:structure
 */
import { JSDOM } from 'jsdom'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'

const routes = [
  '/', '/shop', '/shop/face', '/shop/body', '/shop/bath',
  '/product/botanical-face-oil', '/product/nourishing-body-balm', '/product/herbal-cleansing-ritual', '/product/botanical-bath-soak',
  '/philosophy', '/journal', '/journal/the-morning-reset', '/journal/the-evening-unwind', '/journal/a-moment-with-botanicals',
  '/checkout', '/privacy', '/terms', '/shipping-returns', '/accessibility', '/contact', '/nope',
]

const { RouterProvider } = await import('../src/router')
const { ShopProvider } = await import('../src/shop/store')
const { App } = await import('../src/App')

let failures = 0
for (const route of routes) {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'http://localhost' + route })
  const define = (key: string, value: unknown) => Object.defineProperty(globalThis, key, { value, configurable: true, writable: true })
  define('window', dom.window)
  define('document', dom.window.document)
  define('navigator', dom.window.navigator)
  define('localStorage', dom.window.localStorage)
  define('location', dom.window.location)

  const html = renderToString(createElement(RouterProvider, null, createElement(ShopProvider, null, createElement(App))))
  const doc = dom.window.document
  doc.body.innerHTML = html
  const issues: string[] = []

  const h1s = doc.querySelectorAll('h1')
  if (h1s.length !== 1) issues.push(`h1 count ${h1s.length}`)
  const levels = [...doc.querySelectorAll('h1,h2,h3,h4,h5')].map((h) => Number(h.tagName[1]))
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      issues.push(`heading jump h${levels[i - 1]}→h${levels[i]}`)
      break
    }
  }
  const imgs = [...doc.querySelectorAll('img')]
  if (imgs.some((img) => !img.hasAttribute('alt'))) issues.push('img without alt')
  const links = [...doc.querySelectorAll('a')]
  const badLinks = links.filter((a) => !a.textContent?.trim() && !a.getAttribute('aria-label') && !a.getAttribute('aria-hidden'))
  if (badLinks.length) issues.push(`${badLinks.length} unnamed links`)
  const buttons = [...doc.querySelectorAll('button')]
  const badButtons = buttons.filter((b) => !b.textContent?.trim() && !b.getAttribute('aria-label'))
  if (badButtons.length) issues.push(`${badButtons.length} unnamed buttons`)
  const ids = [...doc.querySelectorAll('[id]')].map((el) => el.id)
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
  if (dupes.length) issues.push(`duplicate ids: ${[...new Set(dupes)].join(',')}`)

  if (issues.length) {
    failures++
    console.log('ISSUE', route.padEnd(38), issues.join(' | '))
  } else {
    console.log('ok   ', route.padEnd(38), `${html.length} chars, ${imgs.length} images, ${links.length} links`)
  }
}
console.log(failures === 0 ? '\nALL ROUTES PASS STRUCTURAL CHECKS' : `\n${failures} ROUTES WITH ISSUES`)
process.exit(failures === 0 ? 0 : 1)
