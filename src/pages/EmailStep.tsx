import { useState, useEffect, useCallback, useRef } from "react"
import { Logo } from "../components/Logo"
import { PrimaryButton, SecondaryButton } from "../components/Button"
import { TextInput } from "../components/TextInput"
import { Checkbox } from "../components/Checkbox"
import { ProgressIndicator } from "../components/ProgressIndicator"
import { useWizard } from "../context/WizardContext"

async function simulateEmailSubmission(_email: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 800))
}

function validateEmail(email: string): string | undefined {
  if (!email || !email.trim()) return "Email is required."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    return "Please enter a valid email address."
  return undefined
}

export function EmailStep() {
  const wizard = useWizard()
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState(false)
  const submittingRef = useRef(false)

  const validate = useCallback(() => {
    const err = validateEmail(wizard.form.email)
    setError(err)
    return !err
  }, [wizard.form.email])

  useEffect(() => {
    if (touched) setError(validateEmail(wizard.form.email))
  }, [wizard.form.email, touched])

  const handleProceed = async () => {
    if (submittingRef.current) return
    setTouched(true)
    if (!validate()) return
    submittingRef.current = true
    setLoading(true)
    try {
      await simulateEmailSubmission(wizard.form.email)
      wizard.goNext()
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
      submittingRef.current = false
    }
  }

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-[390px] min-h-screen flex flex-col relative">
        <div className="step-enter flex flex-col flex-1 px-5 pt-12 pb-8">
          <div className="flex items-start justify-between">
            <Logo size="lg" />
            <ProgressIndicator step={1} />
          </div>

          <div className="mt-10 mb-8">
            <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-[1.1]">
              Enter your
              <br />
              email
            </h1>
            <p className="text-white/35 text-sm mt-2.5">
              We'll send a one-time code to verify.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <TextInput
              id="email"
              label="Email address"
              type="email"
              value={wizard.form.email}
              onChange={(val) => wizard.updateForm({ email: val.trim() })}
              onBlur={() => {
                setTouched(true)
                validate()
              }}
              placeholder="EMAIL"
              error={error}
              autoFocus
              autoComplete="email"
              inputMode="email"
              maxLength={254}
            />

            <Checkbox
              id="newsletter"
              checked={wizard.form.newsletterOptIn}
              onChange={(val) => wizard.updateForm({ newsletterOptIn: val })}
              label="I'd like to subscribe to your newsletter"
            />
          </div>

          <div className="mt-auto pt-8">
            <PrimaryButton
              onClick={handleProceed}
              loading={loading}
              loadingText="Proceeding..."
              disabled={loading}
            >
              Proceed
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
