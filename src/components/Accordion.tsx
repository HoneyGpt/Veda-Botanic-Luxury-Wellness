import { useId, useState } from 'react'
import type { ReactNode } from 'react'

type AccordionProps = {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const buttonId = useId()

  return (
    <div className="accordion">
      <h2 style={{ margin: 0 }}>
        <button
          type="button"
          className="accordion__trigger"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {title}
          <span className="accordion__icon" aria-hidden="true" />
        </button>
      </h2>
      <div
        className={`accordion__panel ${open ? 'is-open' : ''}`}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
      >
        <div>
          <div className="accordion__content">{children}</div>
        </div>
      </div>
    </div>
  )
}
