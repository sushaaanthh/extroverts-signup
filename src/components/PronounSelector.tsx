import { FormError } from "./Input"

const PRONOUNS = ["He/Him", "She/Her", "They/Them", "Prefer not to say"]

interface PronounSelectorProps {
  value: string
  onChange: (val: string) => void
  error?: string
}

export function PronounSelector({
  value,
  onChange,
  error,
}: PronounSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Select your pronouns"
      >
        {PRONOUNS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-pressed={value === p}
            className={[
              "px-4 py-2.5 rounded-full text-[13px] font-medium tracking-wide",
              "border transition-all duration-150 focus-ring",
              value === p
                ? "bg-white text-black border-white"
                : "bg-transparent text-white/55 border-white/20 hover:border-white/45 hover:text-white/80",
            ].join(" ")}
          >
            {p}
          </button>
        ))}
      </div>
      {error && <FormError>{error}</FormError>}
    </div>
  )
}
