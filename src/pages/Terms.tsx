import { useState } from "react"
import { Logo } from "../components/Logo"
import { PrimaryButton } from "../components/Button"
import { Checkbox } from "../components/Checkbox"

interface TermsProps {
  onAccept: () => void
}

export function Terms({ onAccept }: TermsProps) {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-[390px] min-h-screen flex flex-col relative">
        <div className="step-enter flex flex-col flex-1 px-5 pt-12 pb-8">
          <Logo size="lg" />

          <div className="mt-8 mb-6">
            <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-[1.1]">
              Terms &amp;
              <br />
              Conditions
            </h1>
            <p className="text-white/35 text-sm mt-2.5 leading-relaxed">
              Please review and accept to continue.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 min-h-0">
            <div className="flex flex-col gap-6 text-white/40 text-[13px] leading-[1.7]">
              <section>
                <h2 className="text-white/80 font-semibold mb-1.5 text-[15px]">
                  1. Eligibility
                </h2>
                <p>
                  You must be 18 years or older to use Extroverts. By accepting,
                  you confirm you meet this requirement.
                </p>
              </section>
              <section>
                <h2 className="text-white/80 font-semibold mb-1.5 text-[15px]">
                  2. Community Standards
                </h2>
                <p>
                  Extroverts exists for genuine connection. Respect all members.
                  Harassment, hate speech, or harmful conduct results in
                  immediate account removal.
                </p>
              </section>
              <section>
                <h2 className="text-white/80 font-semibold mb-1.5 text-[15px]">
                  3. HVT Tokens
                </h2>
                <p>
                  High-Vibe Tokens (HVTs) are earned through attendance and
                  participation. They carry no monetary value and cannot be
                  exchanged for cash.
                </p>
              </section>
              <section>
                <h2 className="text-white/80 font-semibold mb-1.5 text-[15px]">
                  4. Events & Safety
                </h2>
                <p>
                  We facilitate discovery but are not liable for third-party
                  events. Always share your plans with someone you trust.
                </p>
              </section>
              <section>
                <h2 className="text-white/80 font-semibold mb-1.5 text-[15px]">
                  5. Privacy
                </h2>
                <p>
                  Your data is used solely to provide the Extroverts experience.
                  We do not sell personal information. See our Privacy Policy
                  for full details.
                </p>
              </section>
              <section>
                <h2 className="text-white/80 font-semibold mb-1.5 text-[15px]">
                  6. Termination
                </h2>
                <p>
                  We may suspend accounts that violate these terms. You can
                  delete your account at any time from profile settings.
                </p>
              </section>
              <section>
                <h2 className="text-white/80 font-semibold mb-1.5 text-[15px]">
                  7. Updates
                </h2>
                <p>
                  These terms may change. Continued use of the platform
                  constitutes acceptance of any revisions.
                </p>
              </section>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <Checkbox
              id="accept-terms"
              checked={accepted}
              onChange={setAccepted}
              label="I accept the Terms & Conditions"
            />
            <PrimaryButton onClick={onAccept} disabled={!accepted}>
              Accept &amp; Continue
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
