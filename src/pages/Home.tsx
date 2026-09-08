import { useState } from 'react';
import { Logo } from '../components/Logo';
import { PrimaryButton } from '../components/Button';
import { BottomSheet } from '../components/BottomSheet';
import { EVENTS } from '../data/events';

interface HomeProps {
  onGetStarted: () => void;
}

export function Home({ onGetStarted }: HomeProps) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex justify-center">
        <div className="w-full max-w-[390px] flex flex-col min-h-screen">
          <header className="flex items-center justify-between px-5 pt-10 pb-3">
            <Logo size="lg" />
            <button
              onClick={() => setShowSheet(true)}
              className="text-white/50 text-[13px] font-semibold border border-white/15 rounded-full px-4 py-2 hover:border-white/35 hover:text-white/70 transition-all focus-ring"
            >
              Sign In
            </button>
          </header>

          <div className="px-5 pt-1 pb-5">
            <p className="text-white/30 text-sm font-medium">Events near you. People like you.</p>
          </div>

          <div className="px-5 mb-3 flex items-center justify-between">
            <span className="text-[11px] text-white/25 font-semibold tracking-[0.14em] uppercase">
              Upcoming
            </span>
            <span className="text-[11px] text-white/25 font-semibold tracking-[0.14em] uppercase">
              See all
            </span>
          </div>

          <div className="flex-1 px-4 flex flex-col gap-2.5 pb-36">
            {EVENTS.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setShowSheet(true)}
                className="w-full text-left bg-white/[0.035] border border-white/[0.07] rounded-2xl p-4 flex items-start justify-between gap-3 hover:bg-white/[0.06] active:scale-[0.99] transition-all focus-ring"
                aria-label={`Join event: ${ev.title}`}
              >
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap gap-y-1">
                    {ev.tag && (
                      <span className="text-[10px] font-bold text-black bg-white rounded-full px-2 py-0.5 leading-tight tracking-wide flex-shrink-0">
                        {ev.tag}
                      </span>
                    )}
                    <p className="text-white font-semibold text-sm leading-snug">{ev.title}</p>
                  </div>
                  <p className="text-white/30 text-xs mt-0.5">{ev.location}</p>
                  <p className="text-white/20 text-[11px] mt-0.5">{ev.time}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-[11px] text-white/40 font-medium tabular-nums">
                    {ev.attendees} going
                  </span>
                  <span className="text-[10px] text-white/25 border border-white/12 rounded-full px-2.5 py-1 leading-none tracking-wide font-semibold">
                    JOIN
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 z-30">
            <PrimaryButton onClick={() => setShowSheet(true)}>
              Join the Party
            </PrimaryButton>
          </div>
        </div>
      </div>

      {showSheet && (
        <BottomSheet
          onClose={() => setShowSheet(false)}
          onGetStarted={onGetStarted}
        />
      )}
    </div>
  );
}
