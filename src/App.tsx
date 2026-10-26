import type { ReactNode } from 'react'
import { useRouter } from './router'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { ProductPage } from './pages/ProductPage'
import { PhilosophyPage } from './pages/PhilosophyPage'
import { JournalPage } from './pages/JournalPage'
import { ArticlePage } from './pages/ArticlePage'
import { CheckoutPage } from './pages/CheckoutPage'
import { InfoPage } from './pages/InfoPage'
import { NotFoundPage } from './pages/NotFoundPage'

export const INFO_SLUGS = ['shipping-returns', 'privacy', 'terms', 'accessibility', 'contact']

export function App() {
  const { pathname } = useRouter()
  const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/'

  let page: ReactNode

  if (path === '/') {
    page = <HomePage />
  } else if (path === '/shop') {
    page = <ShopPage category="all" />
  } else if (path === '/shop/face') {
    page = <ShopPage category="face" />
  } else if (path === '/shop/body') {
    page = <ShopPage category="body" />
  } else if (path === '/shop/bath') {
    page = <ShopPage category="bath" />
  } else if (path.startsWith('/product/')) {
    page = <ProductPage slug={path.replace('/product/', '')} />
  } else if (path === '/philosophy') {
    page = <PhilosophyPage />
  } else if (path === '/journal') {
    page = <JournalPage />
  } else if (path.startsWith('/journal/')) {
    page = <ArticlePage slug={path.replace('/journal/', '')} />
  } else if (path === '/checkout') {
    page = <CheckoutPage />
  } else if (INFO_SLUGS.includes(path.replace('/', ''))) {
    page = <InfoPage slug={path.replace('/', '')} />
  } else {
    page = <NotFoundPage />
  }

  return <Layout>{page}</Layout>
}
