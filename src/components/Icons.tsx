type IconProps = {
  className?: string
  size?: number
}

export function Arrow({ className, size = 20 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.5}
      viewBox="0 0 24 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0.5 6h21M17.5 1.5 22 6l-4.5 4.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function SearchIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function BagIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 7.5h14l-1 13H6l-1-13Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 9.5V6a3 3 0 0 1 6 0v3.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function AccountIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="8.5" r="3.7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 20.5c.7-3.9 3.8-6 7.5-6s6.8 2.1 7.5 6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function CloseIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function PlusIcon({ className, size = 14 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function MinusIcon({ className, size = 14 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 7h12" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function CheckIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m3 8.5 3.2 3.2L13 4.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

export function CareIcon({ className, size = 15 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 14s5-3.2 5-7A3 3 0 0 0 8 5a3 3 0 0 0-5 2c0 3.8 5 7 5 7Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  )
}

export function LeafIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M13.5 2.5C6 2.5 2.5 6 2.5 10.5c3.3 1.7 8.1 1.4 10-.8 1.2-1.4 1-4.2 1-7.2Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M2.5 13.5c1.8-4.3 4.6-7 8.5-8.6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

export function InfoIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.1" />
      <path d="M8 7.2v4" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="8" cy="4.9" r="0.8" fill="currentColor" />
    </svg>
  )
}

export function WordmarkMark({ className, size = 26 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <path
        d="M16 5.5c5.2 4.1 7.4 8 7.4 11.9 0 4.6-3.3 7.9-7.4 7.9s-7.4-3.3-7.4-7.9c0-3.9 2.2-7.8 7.4-11.9Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M16 10.5v18" stroke="currentColor" strokeWidth="0.9" opacity="0.65" />
      <path
        d="M16 19.5c-2.1-1.6-4-1.8-5.7-1.2M16 24.2c2.1-1.5 3.9-1.7 5.6-1.2"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.65"
      />
    </svg>
  )
}

export function Sprig({ className, size = 34 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.5}
      viewBox="0 0 40 60"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 58C20 44 20 26 20 4" stroke="currentColor" strokeWidth="0.9" />
      <path
        d="M20 45c-6.6-.5-11-3.6-12.6-9.6 6.2-.9 11.1 2.6 12.6 9.6Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M20 36.5c6.2-.7 10.5-3.9 11.8-9.8-6-.7-10.5 2.8-11.8 9.8Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M20 26.5c-5.5-.5-9.2-3.2-10.5-8.2 5.2-.8 9.2 2.2 10.5 8.2Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M20 19c5.1-.6 8.7-3.3 9.7-8.2-5-.6-8.7 2.4-9.7 8.2Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  )
}

export function InstagramIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  )
}

export function PinterestIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 3a9 9 0 0 0-3.3 17.4c-.1-.8-.2-2 0-2.9l1.3-5.3s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.5-1 3.9-.3 1.1.6 2.1 1.7 2.1 2 0 3.5-2.1 3.5-5.2 0-2.7-1.9-4.6-4.7-4.6-3.2 0-5 2.4-5 4.8 0 1 .3 2 .8 2.6.1.1.1.2.1.3l-.3 1.2c0 .2-.2.3-.4.2-1.3-.6-2.1-2.6-2.1-4.2 0-3.4 2.5-6.5 7.1-6.5 3.7 0 6.6 2.6 6.6 6.1 0 3.7-2.3 6.6-5.6 6.6-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2-1.3 2.7A9 9 0 1 0 12 3Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function MailIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="5.5" width="18" height="13" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
