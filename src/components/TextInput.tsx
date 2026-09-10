import { forwardRef } from "react"
import { FormError } from "./Input"

interface TextInputProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (val: string) => void
  onBlur?: () => void
  placeholder?: string
  error?: string
  autoFocus?: boolean
  autoComplete?: string
  inputMode?: "text" | "email" | "numeric" | "decimal" | "tel" | "search" | "url"
  maxLength?: number
  className?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      id,
      label,
      type = "text",
      value,
      onChange,
      onBlur,
      placeholder,
      error,
      autoFocus = false,
      autoComplete,
      inputMode,
      maxLength,
      className = "",
    },
    ref,
  ) {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder ?? label}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={[
            "w-full bg-transparent text-white placeholder-white/25",
            "border rounded-2xl py-[15px] px-4",
            "text-sm font-medium tracking-wide",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-0",
            error
              ? "border-red-500/60 focus:border-red-400/80"
              : "border-white/15 focus:border-white/50",
          ].join(" ")}
        />
        {error && <FormError id={`${id}-error`}>{error}</FormError>}
      </div>
    )
  },
)
