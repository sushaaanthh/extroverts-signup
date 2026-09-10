export function FormError({
  children,
  id,
}: {
  children: React.ReactNode
  id?: string
}) {
  return (
    <p
      id={id}
      role="alert"
      className="text-red-400/90 text-xs font-medium flex items-center gap-1.5 mt-0.5"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <circle
          cx="6"
          cy="6"
          r="5.5"
          stroke="currentColor"
          strokeOpacity="0.7"
        />
        <path
          d="M6 3.5v3M6 8h.01"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      {children}
    </p>
  )
}
