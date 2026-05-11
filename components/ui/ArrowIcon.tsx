export function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TelegramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.5 4.2L18.4 19.3c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L6.5 13.4 2 12c-1-.3-1-1 .2-1.5L20.2 3c.8-.3 1.5.2 1.3 1.2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function PlusIcon({ open, size = 18 }: { open?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M3 9H15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M9 3V15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{ transition: "transform 400ms cubic-bezier(0.16,1,0.3,1)", transformOrigin: "center", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
      />
    </svg>
  );
}
