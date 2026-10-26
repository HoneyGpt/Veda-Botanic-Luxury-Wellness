import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { BagDrawer } from './BagDrawer'
import { useShop } from '../shop/store'
import { CheckIcon } from './Icons'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <BagDrawer />
      <Toast />
    </>
  )
}

function Toast() {
  const { toast } = useShop()
  if (!toast) return null
  return (
    <div className="toast" role="status" key={toast.id}>
      <CheckIcon />
      <span>{toast.message}</span>
    </div>
  )
}
