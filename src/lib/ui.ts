import { useEffect } from 'react'
import type { RefObject } from 'react'

let lockCount = 0

export function useBodyLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    lockCount += 1
    document.body.classList.add('is-locked')
    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) document.body.classList.remove('is-locked')
    }
  }, [active])
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap<T extends HTMLElement>(
  active: boolean,
  ref: RefObject<T | null>,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return
    const container = ref.current
    if (!container) return
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const getItems = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )

    const focusTimer = window.setTimeout(() => {
      const preferred = initialFocusRef?.current
      if (preferred) {
        preferred.focus({ preventScroll: true })
        return
      }
      const items = getItems()
      const target = items[0]
      if (target) target.focus({ preventScroll: true })
      else container.focus({ preventScroll: true })
    }, 90)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const items = getItems()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      if (previous && document.contains(previous)) previous.focus({ preventScroll: true })
    }
  }, [active, ref, initialFocusRef])
}

export function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [active, onEscape])
}
