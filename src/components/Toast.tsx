import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4500);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="toast-enter fixed top-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100vw-2rem)] max-w-sm"
    >
      <div className="bg-[#1a1a1a] border border-white/12 rounded-2xl px-4 py-3.5 flex items-center justify-between gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3 min-w-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-red-400" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" />
            <path d="M8 5v3.5M8 10.5h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <p className="text-white text-sm font-medium leading-snug truncate">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-white/40 hover:text-white transition-colors flex-shrink-0 w-7 h-7 flex items-center justify-center focus-ring rounded-lg text-xl leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
