import { Link } from '../router'
import { WordmarkMark } from './Icons'

type WordmarkProps = {
  light?: boolean
  stacked?: boolean
  onClick?: () => void
}

export function Wordmark({ light = false, stacked = false, onClick }: WordmarkProps) {
  return (
    <Link
      to="/"
      className={`wordmark ${light ? 'wordmark--light' : ''} ${stacked ? 'wordmark--stacked' : ''}`}
      aria-label="Veda Botanic — home"
      onClick={onClick}
    >
      <WordmarkMark className="wordmark__mark" />
      <span className="wordmark__text">Veda Botanic</span>
    </Link>
  )
}
