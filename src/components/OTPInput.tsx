import { useRef, useEffect, useCallback, type ClipboardEvent, type KeyboardEvent, type ChangeEvent } from 'react';
import { FormError } from './Input';

interface OTPInputProps {
  value: string[];
  onChange: (digits: string[]) => void;
  error?: string;
}

export function OTPInput({ value, onChange, error }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusAt = useCallback((idx: number) => {
    const el = inputRefs.current[Math.max(0, Math.min(5, idx))];
    el?.focus();
    setTimeout(() => el?.select(), 0);
  }, []);

  useEffect(() => {
    focusAt(0);
  }, [focusAt]);

  const handleChange = useCallback(
    (idx: number, e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, '');
      if (!raw) return;
      const digit = raw.slice(-1);
      const next = [...value];
      next[idx] = digit;
      onChange(next);
      if (idx < 5) focusAt(idx + 1);
    },
    [value, onChange, focusAt]
  );

  const handleKeyDown = useCallback(
    (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        const next = [...value];
        if (next[idx]) {
          next[idx] = '';
          onChange(next);
        } else if (idx > 0) {
          next[idx - 1] = '';
          onChange(next);
          focusAt(idx - 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        focusAt(idx - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        focusAt(idx + 1);
      }
    },
    [value, onChange, focusAt]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
      if (!text) return;
      const next = Array(6).fill('');
      text.split('').forEach((d, i) => { next[i] = d; });
      onChange(next);
      focusAt(Math.min(text.length, 5));
    },
    [onChange, focusAt]
  );

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div
        className="flex gap-2.5 w-full justify-between"
        role="group"
        aria-label="Enter the 6-digit one-time password"
        aria-describedby={error ? 'otp-error' : undefined}
      >
        {Array(6).fill(null).map((_, idx) => (
          <input
            key={idx}
            ref={(el) => { inputRefs.current[idx] = el; }}
            type="text"
            inputMode="numeric"
            autoComplete={idx === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={value[idx] ?? ''}
            onChange={(e) => handleChange(idx, e)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            aria-label={`Digit ${idx + 1} of 6`}
            className={[
              'flex-1 min-w-0 h-[60px] text-center text-2xl font-bold text-white',
              'bg-transparent border rounded-2xl',
              'transition-all duration-150',
              'focus:outline-none caret-transparent',
              error
                ? 'border-red-500/60 focus:border-red-400'
                : value[idx]
                  ? 'border-white/70 bg-white/[0.04]'
                  : 'border-white/15 focus:border-white/55',
            ].join(' ')}
          />
        ))}
      </div>
      {error && <FormError id="otp-error">{error}</FormError>}
    </div>
  );
}
