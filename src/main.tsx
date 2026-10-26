import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/cormorant-garamond/300.css'
import '@fontsource/cormorant-garamond/300-italic.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource-variable/hanken-grotesk'
import './styles/index.css'
import { App } from './App'
import { RouterProvider } from './router'
import { ShopProvider } from './shop/store'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <RouterProvider>
      <ShopProvider>
        <App />
      </ShopProvider>
    </RouterProvider>
  </StrictMode>,
)
