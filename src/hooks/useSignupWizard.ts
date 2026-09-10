import { useState, useCallback } from "react"
import type { FormState, SignupStep } from "../types/signup"

const EMPTY_FORM_STATE: FormState = {
  email: "",
  newsletterOptIn: false,
  otp: Array(6).fill(""),
  name: "",
  age: "",
  pronouns: "",
  state: "",
  city: "",
  college: "",
}

const STEP_ORDER: SignupStep[] = ["email", "otp", "profile", "location"]

export interface UseSignupWizardReturn {
  step: SignupStep
  form: FormState
  completed: boolean
  updateForm: (updates: Partial<FormState>) => void
  goNext: () => void
  goBack: () => void
  goToStep: (step: SignupStep) => void
  reset: () => void
  setCompleted: (completed: boolean) => void
}

export function useSignupWizard(): UseSignupWizardReturn {
  const [step, setStep] = useState<SignupStep>("email")
  const [form, setForm] = useState<FormState>(EMPTY_FORM_STATE)
  const [completed, setCompleted] = useState(false)

  const goNext = useCallback(() => {
    setStep((prev) => {
      const idx = STEP_ORDER.indexOf(prev)
      if (idx < STEP_ORDER.length - 1) {
        const next = STEP_ORDER[idx + 1]
        if (prev === "email" && next === "otp") {
          setForm((f) => ({ ...f, otp: Array(6).fill("") }))
        }
        return next
      }
      return prev
    })
  }, [])

  const goBack = useCallback(() => {
    setStep((prev) => {
      const idx = STEP_ORDER.indexOf(prev)
      if (idx > 0) {
        const prevStep = STEP_ORDER[idx - 1]
        if (prev === "otp" && prevStep === "email") {
          setForm((f) => ({ ...f, otp: Array(6).fill("") }))
        }
        return prevStep
      }
      return prev
    })
  }, [])

  const goToStep = useCallback((s: SignupStep) => setStep(s), [])

  const updateForm = useCallback((updates: Partial<FormState>) => {
    setForm((f) => ({ ...f, ...updates }))
  }, [])

  const reset = useCallback(() => {
    setForm(EMPTY_FORM_STATE)
    setStep("email")
    setCompleted(false)
  }, [])

  return {
    step,
    form,
    completed,
    updateForm,
    goNext,
    goBack,
    goToStep,
    reset,
    setCompleted,
  }
}
