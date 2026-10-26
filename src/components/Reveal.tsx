import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'
import type { CSSProperties, ElementType, ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
  once?: boolean
  style?: CSSProperties
}

/**
 * A restrained viewport entrance: a short fade with a few pixels of lift.
 * Disabled entirely when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  once = true,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setVisible(false)
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-in' : ''} ${className}`.trim()}
      style={{
        ...(delay ? { transitionDelay: `${delay}ms` } : null),
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
