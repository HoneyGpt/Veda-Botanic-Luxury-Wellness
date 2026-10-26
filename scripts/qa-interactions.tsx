/**
 * Interaction QA — mounts the real app in a simulated DOM and exercises the
 * shopping prototype end to end: quick add, quantities, variants, search,
 * navigation, checkout confirmation and scroll locking.
 *
 * Run with: npm run qa:interactions
 */
import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
})
const { window } = dom
const define = (key: string, value: unknown) =>
  Object.defineProperty(globalThis, key, { value, configurable: true, writable: true })
define('window', window)
define('document', window.document)
define('navigator', window.navigator)
define('localStorage', window.localStorage)
define('location', window.location)
define('history', window.history)
define('HTMLElement', window.HTMLElement)
define('Element', window.Element)
define('Node', window.Node)
define('HTMLInputElement', window.HTMLInputElement)
define('HTMLFormElement', window.HTMLFormElement)
define('PopStateEvent', window.PopStateEvent)
define('Event', window.Event)
define('MouseEvent', window.MouseEvent)
define('KeyboardEvent', window.KeyboardEvent)
define('getComputedStyle', window.getComputedStyle.bind(window))
Object.defineProperty(window, 'matchMedia', {
  configurable: true,
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  }),
})
window.scrollTo = (() => {}) as typeof window.scrollTo
;(window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = undefined
class NoopObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() { return [] }
}
;(window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = NoopObserver
define('IntersectionObserver', NoopObserver)

const { createRoot } = await import('react-dom/client')
const { createElement, StrictMode } = await import('react')
const { RouterProvider } = await import('../src/router')
const { ShopProvider } = await import('../src/shop/store')
const { App } = await import('../src/App')

const root = createRoot(window.document.getElementById('root')!)
root.render(
  createElement(
    StrictMode,
    null,
    createElement(RouterProvider, null, createElement(ShopProvider, null, createElement(App))),
  ),
)

const wait = (ms = 60) => new Promise((resolve) => setTimeout(resolve, ms))
const q = (selector: string) => window.document.querySelector<HTMLElement>(selector)
const qa = (selector: string) => [...window.document.querySelectorAll<HTMLElement>(selector)]
const click = (el: HTMLElement | null) => {
  if (!el) throw new Error('missing element to click')
  el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }))
}

let failures = 0
const check = (label: string, condition: boolean, extra = '') => {
  if (condition) console.log('  ok  ', label)
  else {
    failures += 1
    console.log('  FAIL', label, extra)
  }
}

await wait(220)
console.log('\nHOME')
check('hero headline present', Boolean(q('h1')?.textContent?.includes('Your Daily Ritual')))

console.log('\nQUICK ADD')
const quickAdd = q('.btn--quick')
click(quickAdd)
await wait(120)
check('bag badge shows 1', q('.bag-btn__count')?.textContent === '1', q('.bag-btn__count')?.textContent ?? 'none')
check('drawer stays closed for quick add', !q('.bag')?.classList.contains('is-open'))
check('drawer shows product', Boolean(q('.bag-line__name')?.textContent?.includes('Botanical Face Oil')))
check('toast shown', Boolean(q('.toast')))
check('localStorage persisted', Boolean(window.localStorage.getItem('veda-botanic-bag-v1')))

console.log('\nQUANTITY')
const plus = qa('.bag-line .qty button')[1]
click(plus)
await wait(100)
check('quantity increased to 2', q('.bag-line .qty__value')?.textContent === '2', q('.bag-line .qty__value')?.textContent)
check('subtotal updated', q('.bag__subtotal-value')?.textContent?.includes('4,900') === true, q('.bag__subtotal-value')?.textContent ?? '')

console.log('\nNAVIGATION')
click(qa('.bag-line__name a')[0])
await wait(200)
check('navigated to product page', window.location.pathname === '/product/botanical-face-oil', window.location.pathname)
check('product title rendered', q('.pdp__title')?.textContent === 'Botanical Face Oil')
check('bag auto-closed on navigation', !q('.bag')?.classList.contains('is-open'))

console.log('\nVARIANTS')
const radios = qa<HTMLInputElement>('.option input')
check('two variants offered', radios.length === 2, String(radios.length))
radios[1].click()
await wait(120)
check('50ml price shown', q('.pdp__price')?.textContent?.includes('3,350') === true, q('.pdp__price')?.textContent ?? '')
const addBtn = q('.pdp__buy .btn')
check('add button reflects variant', addBtn?.textContent?.includes('3,350') === true, addBtn?.textContent ?? '')
click(addBtn)
await wait(140)
check('add to bag opens the drawer', q('.bag')?.classList.contains('is-open') === true)
check('bag count now 3', q('.bag-btn__count')?.textContent === '3', q('.bag-btn__count')?.textContent ?? '')

console.log('\nSEARCH')
click(q('.icon-btn--search'))
await wait(120)
check('search dialog open', q('.modal-shell')?.classList.contains('is-open') === true)
const input = q<HTMLInputElement>('#site-search')
if (input) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
  setter?.call(input, 'balm')
  input.dispatchEvent(new window.Event('input', { bubbles: true }))
}
await wait(140)
check('search filtered to balm', qa('.search-result').length === 1, String(qa('.search-result').length))
input?.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
await wait(140)
check('escape closed search', !q('.modal-shell')?.classList.contains('is-open'))

console.log('\nCHECKOUT')
window.history.pushState({}, '', '/checkout')
window.dispatchEvent(new window.PopStateEvent('popstate'))
await wait(220)
check('checkout rendered', Boolean(q('.checkout')))
check('checkout banner shown', Boolean(q('.checkout-banner')))
const summaryItems = qa('.summary-line')
check('summary lists bag lines', summaryItems.length === 2, String(summaryItems.length))
const form = q('form')
form?.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }))
await wait(220)
check('confirmation shown', Boolean(q('.order-confirm')))
check('bag cleared after order', q('.bag-btn__count') === null)
check('reference generated', /VB-26-\d{4}/.test(q('.order-confirm__ref')?.textContent ?? ''), q('.order-confirm__ref')?.textContent ?? '')

console.log('\nROUTER')
window.history.pushState({}, '', '/does-not-exist')
window.dispatchEvent(new window.PopStateEvent('popstate'))
await wait(200)
check('404 page shown', Boolean(q('.not-found')))
check('single h1 on 404', window.document.querySelectorAll('h1').length === 1)

const bodyLocked = window.document.body.classList.contains('is-locked')
check('body scroll lock released', !bodyLocked)

console.log(failures === 0 ? '\nALL INTERACTIONS PASS' : `\n${failures} INTERACTION FAILURES`)
process.exit(failures === 0 ? 0 : 1)
