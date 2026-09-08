import { useState, useEffect } from 'react';
import { Logo } from '../components/Logo';
import { PrimaryButton } from '../components/Button';

interface SuccessProps {
  name: string;
}

export function Success({ name }: SuccessProps) {
  const first = name.trim().split(/\s+/)[0] || 'there';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-[390px] min-h-screen flex flex-col relative">
        <div className="flex flex-col flex-1 items-center justify-between px-5 py-16 text-center">
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Logo size="lg" />
          </div>

          <div
            className={`flex flex-col items-center gap-6 transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-2 rounded-full border border-white/20" />
              <div className="absolute inset-4 rounded-full border border-white/40" />
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path
                  d="M6 14l6 6L22 8"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-[48px] font-extrabold text-white tracking-tight leading-none uppercase">
                You're In
              </h1>
              <p className="text-white/40 text-[15px] leading-relaxed max-w-[260px] mx-auto">
                Welcome, {first}. Your profile is ready.
                Time to find your people and show up.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-full bg-white transition-all duration-500"
                  style={{
                    width: i === 2 ? 28 : 8,
                    height: 3,
                    opacity: i === 2 ? 1 : 0.18,
                    transitionDelay: `${300 + i * 60}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          <div
            className={`w-full max-w-xs transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <PrimaryButton onClick={() => window.location.reload()}>
              Continue
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
