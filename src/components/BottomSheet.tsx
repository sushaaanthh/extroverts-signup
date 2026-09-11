import { useCallback, useEffect, useRef, useState } from "react"
import { PrimaryButton, SecondaryButton } from "./Button"

interface BottomSheetProps {
  onClose: () => void
  onGetStarted: () => void
}

export function BottomSheet({ onClose, onGetStarted }: BottomSheetProps) {
  const [exiting, setExiting] = useState(false)

  const close = useCallback(() => {
    setExiting(true)
    setTimeout(onClose, 280)
  }, [onClose])

  const sheetRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const first =
      sheetRef.current?.querySelector<HTMLElement>(focusableSelector)
    first?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close()
        return
      }
      if (e.key === "Tab") {
        const focusable =
          sheetRef.current?.querySelectorAll<HTMLElement>(focusableSelector)
        if (!focusable || focusable.length === 0) return
        const firstEl = focusable[0]
        const lastEl = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [close])

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sheet-title"
    >
      <div
        className="absolute inset-0 bg-black/75"
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={sheetRef}
        className={[
          "relative z-10 w-full max-w-sm bg-[#080808] border-t border-x border-white/[0.08]",
          "rounded-t-3xl px-6 pt-7 pb-12",
          exiting ? "sheet-exit" : "sheet-enter",
        ].join(" ")}
      >
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 w-9 h-[3px] bg-white/15 rounded-full"
          aria-hidden="true"
        />

        <button
          onClick={close}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors text-2xl leading-none focus-ring rounded-xl"
          aria-label="Close"
        >
          ×
        </button>

        <div className="mt-2 flex flex-col gap-7">
          <div className="flex flex-col gap-2.5">
            <h2
              id="sheet-title"
              className="text-[22px] font-bold tracking-tight text-white uppercase leading-tight"
            >
              You Need an Account
            </h2>
            <p className="text-[13px] text-white/45 leading-[1.7]">
              Create an account to join events, earn HVTs, and party with
              extroverts near you — all for free!
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <PrimaryButton onClick={onGetStarted}>Get Started</PrimaryButton>
            <SecondaryButton onClick={close}>Maybe Later</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
