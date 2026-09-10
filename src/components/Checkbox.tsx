interface CheckboxProps {
  id: string
  checked: boolean
  onChange: (val: boolean) => void
  label: string
}

export function Checkbox({ id, checked, onChange, label }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
      <div className="relative flex-shrink-0 mt-px">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          aria-hidden="true"
          className={[
            "w-5 h-5 rounded-md border flex items-center justify-center",
            "transition-all duration-150",
            checked
              ? "bg-white border-white"
              : "bg-transparent border-white/25 group-hover:border-white/45",
          ].join(" ")}
        >
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="#000"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="text-[13px] text-white/45 leading-relaxed">{label}</span>
    </label>
  )
}
