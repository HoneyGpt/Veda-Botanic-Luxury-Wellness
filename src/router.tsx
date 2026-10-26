import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { prefersReducedMotion } from './lib/motion'

type RouterValue = {
  path: string
  pathname: string
  search: string
  navigate: (to: string, options?: { replace?: boolean }) => void
}

const RouterContext = createContext<RouterValue | null>(null)

const readPath = () => window.location.pathname + window.location.search

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const onPop = () => setPath(readPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Deep links such as /philosophy#ingredients should land on the section.
  useEffect(() => {
    if (!window.location.hash) return
    const id = decodeURIComponent(window.location.hash.slice(1))
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    }, 140)
    return () => window.clearTimeout(timer)
  }, [])

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const current = readPath()
    if (to === current) return
    if (options?.replace) window.history.replaceState({}, '', to)
    else window.history.pushState({}, '', to)
    setPath(to)
    const hashIndex = to.indexOf('#')
    if (hashIndex >= 0) {
      const id = decodeURIComponent(to.slice(hashIndex + 1))
      window.setTimeout(() => {
        const target = document.getElementById(id)
        if (!target) return
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        })
      }, 90)
    }
  }, [])

  const value = useMemo<RouterValue>(() => {
    const hashIndex = path.indexOf('#')
    const clean = hashIndex >= 0 ? path.slice(0, hashIndex) : path
    const queryIndex = clean.indexOf('?')
    return {
      path,
      pathname: queryIndex >= 0 ? clean.slice(0, queryIndex) : clean,
      search: queryIndex >= 0 ? clean.slice(queryIndex) : '',
      navigate,
    }
  }, [path, navigate])

  // Every new page starts at the top, unless we are moving to an in-page anchor.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [value.pathname])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used inside RouterProvider')
  return ctx
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string
  replace?: boolean
}

export function Link({ to, replace, children, onClick, target, ...rest }: LinkProps) {
  const { navigate } = useRouter()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (target && target !== '_self') return
    if (!to.startsWith('/')) return
    event.preventDefault()
    navigate(to, { replace })
  }

  return (
    <a href={to} target={target} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

export function useQueryParam(name: string) {
  const { search } = useRouter()
  const params = new URLSearchParams(search)
  return params.get(name)
}
