export function ProgressIndicator({ step, total = 4 }: { step: number; total?: number }) {
  return (
    <div
      className="flex flex-col items-end gap-2"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Step ${step} of ${total}`}
    >
      <span className="text-[11px] text-white/35 font-medium tracking-[0.15em] uppercase">
        Step {step} / {total}
      </span>
      <div className="flex gap-1.5">
        {Array(total).fill(null).map((_, i) => (
          <div
            key={i}
            className={[
              'h-[2px] rounded-full transition-all duration-500',
              i < step ? 'bg-white w-8' : 'bg-white/12 w-5',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}
