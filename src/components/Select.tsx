import { FormError } from './Input';

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  options: string[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  error,
  disabled = false,
  className = '',
}: SelectFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          'w-full bg-transparent text-sm font-medium tracking-wide',
          'border rounded-2xl py-[15px] px-4',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-0',
          value ? 'text-white' : 'text-white/25',
          error
            ? 'border-red-500/60 focus:border-red-400/80'
            : 'border-white/15 focus:border-white/50',
          disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <option value="" disabled style={{ color: 'rgba(255,255,255,0.3)', background: '#0a0a0a' }}>
          {placeholder ?? label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: '#0a0a0a', color: '#fff' }}>
            {opt}
          </option>
        ))}
      </select>
      {error && <FormError id={`${id}-error`}>{error}</FormError>}
    </div>
  );
}
