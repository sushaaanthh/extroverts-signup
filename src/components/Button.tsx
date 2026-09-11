import type { ReactNode } from "react"
import { Spinner } from "./Spinner"

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: "button" | "submit"
  loading?: boolean
  loadingText?: string
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  loading = false,
  loadingText,
  disabled = false,
  className = "",
  "aria-label": ariaLabel,
}: PrimaryButtonProps) {
  const off = disabled || loading
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={off}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={[
        "w-full flex items-center justify-center gap-2",
        "bg-white text-black font-semibold text-sm tracking-[0.12em] uppercase",
        "rounded-full py-[19px] px-6 leading-none",
        "transition-all duration-150",
        "focus-ring",
        off
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-gray-100 active:scale-[0.98] cursor-pointer",
        className,
      ].join(" ")}
    >
      {loading && <Spinner size={15} color="#000" />}
      <span className="leading-none">
        {loading && loadingText ? loadingText : children}
      </span>
    </button>
  )
}

interface SecondaryButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  className?: string
  "aria-label"?: string
}

export function SecondaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  "aria-label": ariaLabel,
}: SecondaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={[
        "w-full flex items-center justify-center",
        "bg-transparent text-white font-semibold text-sm tracking-[0.12em] uppercase",
        "border border-white/25 rounded-full py-[19px] px-6 leading-none",
        "transition-all duration-150",
        "focus-ring",
        disabled
          ? "opacity-30 cursor-not-allowed"
          : "hover:border-white/50 active:scale-[0.98] cursor-pointer",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  )
}

interface TextButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function TextButton({
  children,
  onClick,
  disabled = false,
  className = "",
}: TextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "text-white/55 hover:text-white text-sm font-medium",
        "underline underline-offset-2 decoration-white/30",
        "transition-colors duration-150 focus-ring rounded",
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  )
}
