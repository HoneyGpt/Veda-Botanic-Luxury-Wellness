import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { getProduct } from '../data/products'
import type { Product, Variant } from '../data/products'

type StoredLine = { slug: string; variantId: string; qty: number }

export type BagLine = {
  key: string
  product: Product
  variant: Variant
  qty: number
  lineTotal: number
}

type ShopValue = {
  lines: BagLine[]
  count: number
  subtotal: number
  isBagOpen: boolean
  openBag: () => void
  closeBag: () => void
  addItem: (slug: string, variantId: string, qty?: number) => void
  setQty: (slug: string, variantId: string, qty: number) => void
  removeLine: (slug: string, variantId: string) => void
  clearBag: () => void
  toast: { id: number; message: string } | null
  notify: (message: string) => void
}

const STORAGE_KEY = 'veda-botanic-bag-v1'
const ShopContext = createContext<ShopValue | null>(null)

function readStoredLines(): StoredLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.flatMap((line) => {
      if (typeof line !== 'object' || line === null) return []
      const candidate = line as Partial<StoredLine>
      const product = getProduct(candidate.slug)
      if (!product) return []
      const variant = product.variants.find((item) => item.id === candidate.variantId)
      if (!variant) return []
      const qty = Math.min(Math.max(Math.round(Number(candidate.qty) || 1), 1), 9)
      return [{ slug: product.slug, variantId: variant.id, qty }]
    })
  } catch {
    return []
  }
}

function enrich(lines: StoredLine[]): BagLine[] {
  return lines.flatMap((line) => {
    const product = getProduct(line.slug)
    if (!product) return []
    const variant = product.variants.find((item) => item.id === line.variantId)
    if (!variant) return []
    return [
      {
        key: `${product.slug}:${variant.id}`,
        product,
        variant,
        qty: line.qty,
        lineTotal: variant.price * line.qty,
      },
    ]
  })
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredLine[]>(() =>
    typeof window === 'undefined' ? [] : readStoredLines(),
  )
  const [isBagOpen, setBagOpen] = useState(false)
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)
  const firstPersist = useRef(true)

  const lines = useMemo(() => enrich(stored), [stored])
  const count = lines.reduce((total, line) => total + line.qty, 0)
  const subtotal = lines.reduce((total, line) => total + line.lineTotal, 0)

  useEffect(() => {
    if (firstPersist.current) {
      firstPersist.current = false
      return
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    } catch {
      // Storage can be unavailable in private modes — the bag still works in memory.
    }
  }, [stored])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const notify = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), message })
    toastTimer.current = window.setTimeout(() => setToast(null), 3200)
  }, [])

  const addItem = useCallback((slug: string, variantId: string, qty = 1) => {
    const product = getProduct(slug)
    const variant = product?.variants.find((item) => item.id === variantId)
    if (!product || !variant) return
    setStored((current) => {
      const existing = current.find((line) => line.slug === slug && line.variantId === variantId)
      if (existing) {
        return current.map((line) =>
          line === existing ? { ...line, qty: Math.min(line.qty + qty, 9) } : line,
        )
      }
      return [...current, { slug, variantId, qty: Math.min(qty, 9) }]
    })
  }, [])

  const setQty = useCallback((slug: string, variantId: string, qty: number) => {
    setStored((current) => {
      if (qty <= 0) {
        return current.filter((line) => !(line.slug === slug && line.variantId === variantId))
      }
      return current.map((line) =>
        line.slug === slug && line.variantId === variantId
          ? { ...line, qty: Math.min(qty, 9) }
          : line,
      )
    })
  }, [])

  const removeLine = useCallback((slug: string, variantId: string) => {
    setStored((current) =>
      current.filter((line) => !(line.slug === slug && line.variantId === variantId)),
    )
  }, [])

  const clearBag = useCallback(() => setStored([]), [])

  const value = useMemo<ShopValue>(
    () => ({
      lines,
      count,
      subtotal,
      isBagOpen,
      openBag: () => setBagOpen(true),
      closeBag: () => setBagOpen(false),
      addItem,
      setQty,
      removeLine,
      clearBag,
      toast,
      notify,
    }),
    [lines, count, subtotal, isBagOpen, addItem, setQty, removeLine, clearBag, toast, notify],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used inside ShopProvider')
  return ctx
}
