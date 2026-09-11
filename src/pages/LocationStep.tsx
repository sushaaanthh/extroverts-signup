import { useState, useEffect, useCallback, useRef } from "react"
import { Logo } from "../components/Logo"
import { PrimaryButton, SecondaryButton } from "../components/Button"
import { SelectField } from "../components/Select"
import { ProgressIndicator } from "../components/ProgressIndicator"
import { states, getCities, getColleges } from "../data"
import { useWizard } from "../context/WizardContext"

async function simulateProfileCreation(): Promise<void> {
  await new Promise((r) => setTimeout(r, 1000))
}

export function LocationStep({ onToast }: { onToast: (msg: string) => void }) {
  const wizard = useWizard()
  const [errors, setErrors] = useState<{
    state?: string
    city?: string
    college?: string
  }>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)
  const submittingRef = useRef(false)

  const cities = wizard.form.state ? getCities(wizard.form.state) : []
  const colleges =
    wizard.form.state && wizard.form.city
      ? getColleges(wizard.form.state, wizard.form.city)
      : []

  const getErrors = useCallback(() => {
    const e: { state?: string; city?: string; college?: string } = {}
    if (!wizard.form.state) e.state = "Please select your state."
    if (!wizard.form.city) e.city = "Please select your city."
    if (!wizard.form.college) e.college = "Please select your institution."
    return e
  }, [wizard.form])

  useEffect(() => {
    const all = getErrors()
    setErrors({
      state: touched.state ? all.state : undefined,
      city: touched.city ? all.city : undefined,
      college: touched.college ? all.college : undefined,
    })
  }, [wizard.form, touched, getErrors])

  const handleStateChange = (val: string) => {
    wizard.updateForm({ state: val, city: "", college: "" })
    setTouched((t) => ({ ...t, state: true, city: false, college: false }))
  }

  const handleCityChange = (val: string) => {
    wizard.updateForm({ city: val, college: "" })
    setTouched((t) => ({ ...t, city: true, college: false }))
  }

  const handleFinish = async () => {
    if (submittingRef.current) return
    setTouched({ state: true, city: true, college: true })
    const e = getErrors()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    submittingRef.current = true
    setLoading(true)
    try {
      await simulateProfileCreation()
      wizard.setCompleted(true)
    } catch {
      onToast("Something went wrong. Please try again.")
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
            <ProgressIndicator step={4} />
          </div>

          <div className="mt-10 mb-8">
            <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-[1.1]">
              Where are
              <br />
              you based?
            </h1>
            <p className="text-white/35 text-sm mt-2.5">
              Help us surface events in your area.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <SelectField
              id="state"
              label="State"
              value={wizard.form.state}
              onChange={handleStateChange}
              onBlur={() => setTouched((t) => ({ ...t, state: true }))}
              options={states}
              placeholder="STATE"
              error={errors.state}
            />

            <SelectField
              id="city"
              label="City"
              value={wizard.form.city}
              onChange={handleCityChange}
              onBlur={() => setTouched((t) => ({ ...t, city: true }))}
              options={cities}
              placeholder="CITY"
              error={errors.city}
              disabled={!wizard.form.state}
            />

            <SelectField
              id="college"
              label="College / Institution"
              value={wizard.form.college}
              onChange={(val) => {
                wizard.updateForm({ college: val })
                setTouched((t) => ({ ...t, college: true }))
              }}
              onBlur={() => setTouched((t) => ({ ...t, college: true }))}
              options={colleges}
              placeholder="COLLEGE / INSTITUTION"
              error={errors.college}
              disabled={!wizard.form.city}
            />
          </div>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <PrimaryButton
              onClick={handleFinish}
              loading={loading}
              loadingText="Creating your profile..."
              disabled={loading}
            >
              Finish
            </PrimaryButton>
            <SecondaryButton onClick={wizard.goBack} disabled={loading}>
              Go Back
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
