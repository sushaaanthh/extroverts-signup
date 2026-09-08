import { useState, useEffect, useCallback, useRef } from 'react';
import { Logo } from '../components/Logo';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { PronounSelector } from '../components/PronounSelector';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { useWizard } from '../context/WizardContext';

function validateName(name: string): string | undefined {
  if (!name || !name.trim()) return 'Name is required.';
  if (name.trim().length < 2) return 'Name must be at least 2 characters.';
  return undefined;
}

function validateAge(age: string): string | undefined {
  if (!age || !age.trim()) return 'Age is required.';
  const n = parseInt(age, 10);
  if (isNaN(n) || n < 1 || n > 120) return 'Please enter a valid age.';
  if (n < 18) return 'You must be 18 or older to continue.';
  return undefined;
}

export function ProfileStep() {
  const wizard = useWizard();
  const [errors, setErrors] = useState<{ name?: string; age?: string; pronouns?: string }>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);

  const getErrors = useCallback(() => {
    const e: { name?: string; age?: string; pronouns?: string } = {};
    const ne = validateName(wizard.form.name);
    if (ne) e.name = ne;
    const ae = validateAge(wizard.form.age);
    if (ae) e.age = ae;
    if (!wizard.form.pronouns) e.pronouns = 'Please select your pronouns.';
    return e;
  }, [wizard.form]);

  useEffect(() => {
    const all = getErrors();
    setErrors({
      name: touched.name ? all.name : undefined,
      age: touched.age ? all.age : undefined,
      pronouns: touched.pronouns ? all.pronouns : undefined,
    });
  }, [wizard.form, touched, getErrors]);

  const handleNext = async () => {
    if (submittingRef.current) return;
    setTouched({ name: true, age: true, pronouns: true });
    const e = getErrors();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    submittingRef.current = true;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      wizard.goNext();
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-[390px] min-h-screen flex flex-col relative">
        <div className="step-enter flex flex-col flex-1 px-5 pt-12 pb-8">
          <div className="flex items-start justify-between">
            <Logo size="lg" />
            <ProgressIndicator step={3} />
          </div>

          <div className="mt-10 mb-8">
            <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-[1.1]">
              Tell us<br />about you
            </h1>
            <p className="text-white/35 text-sm mt-2.5">Your profile helps us find your people.</p>
          </div>

          <div className="flex flex-col gap-5">
            <TextInput
              id="name"
              label="Your name"
              value={wizard.form.name}
              onChange={(val) => wizard.updateForm({ name: val.trim() })}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="NAME"
              error={errors.name}
              autoFocus
              autoComplete="name"
              maxLength={60}
            />

            <TextInput
              id="age"
              label="Your age"
              type="text"
              inputMode="numeric"
              value={wizard.form.age}
              onChange={(val) => wizard.updateForm({ age: val.replace(/\D/g, '').slice(0, 3) })}
              onBlur={() => setTouched((t) => ({ ...t, age: true }))}
              placeholder="AGE"
              error={errors.age}
              maxLength={3}
            />

            <div className="flex flex-col gap-3">
              <label className="text-[11px] text-white/30 font-semibold tracking-[0.14em] uppercase">
                Pronouns
              </label>
              <PronounSelector
                value={wizard.form.pronouns}
                onChange={(val) => {
                  wizard.updateForm({ pronouns: val });
                  setTouched((t) => ({ ...t, pronouns: true }));
                }}
                error={errors.pronouns}
              />
            </div>
          </div>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <PrimaryButton onClick={handleNext} loading={loading} loadingText="Continuing..." disabled={loading}>
              Continue
            </PrimaryButton>
            <SecondaryButton onClick={wizard.goBack} disabled={loading}>
              Go Back
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
