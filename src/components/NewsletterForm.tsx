import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { Arrow, CheckIcon } from './Icons'

type NewsletterFormProps = {
  compact?: boolean
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const inputId = useId()
  const errorId = useId()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = email.trim()
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setDone(true)
  }

  if (done) {
    return (
      <div className="newsletter" role="status">
        <p className="newsletter__success">
          <CheckIcon />
          <span>
            Thank you — you&apos;re on the list for notes on rituals, botanicals and new arrivals.
            <span className="newsletter__note" style={{ display: 'block', marginTop: 6 }}>
              This is a prototype: no email has been stored or sent.
            </span>
          </span>
        </p>
      </div>
    )
  }

  return (
    <form className="newsletter" onSubmit={onSubmit} noValidate>
      <label htmlFor={inputId} className="visually-hidden">
        Email address
      </label>
      <div className="newsletter__row">
        <input
          id={inputId}
          className="newsletter__input"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (error) setError('')
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        <button type="submit" className="newsletter__submit">
          Subscribe
          <Arrow size={18} />
        </button>
      </div>
      {error ? (
        <p className="form-error" id={errorId} role="alert" style={{ marginTop: 0 }}>
          {error}
        </p>
      ) : (
        <p className="newsletter__note">
          {compact
            ? 'Events, rituals and new arrivals. Unsubscribe at any time.'
            : 'A little more nature in your inbox. Events, rituals and new arrivals — never more than once a month.'}{' '}
          Prototype only; no emails are sent.
        </p>
      )}
    </form>
  )
}
