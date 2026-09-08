import { useState, useEffect, useCallback, useRef } from 'react';
import { Logo } from '../components/Logo';
import { PrimaryButton, SecondaryButton, TextButton } from '../components/Button';
import { OTPInput } from '../components/OTPInput';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { Toast } from '../components/Toast';
import { useWizard } from '../context/WizardContext';

const DEMO_OTP = '123456';
const RESEND_COOLDOWN = 24;

async function verifyOtp(code: string): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 800));
  return code === DEMO_OTP;
}

export function OTPStep() {
  const wizard = useWizard();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(RESEND_COOLDOWN);
  const [toast, setToast] = useState<string | undefined>();
  const verifyingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = useCallback((secs: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setResendCountdown(secs);
    timerRef.current = setInterval(() => {
      setResendCountdown((c) => {
        if (c <= 1) { clearInterval(timerRef.current!); return 0; }
        return c - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startCountdown(RESEND_COOLDOWN);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startCountdown]);

  const handleResend = () => {
    if (resendCountdown > 0) return;
    wizard.updateForm({ otp: Array(6).fill('') });
    setError(undefined);
    setToast('OTP sent again.');
    startCountdown(RESEND_COOLDOWN);
  };

  const handleVerify = async () => {
    if (verifyingRef.current) return;
    const code = wizard.form.otp.join('');
    if (code.length < 6) {
      setError('Please enter the 6-digit OTP.');
      return;
    }
    verifyingRef.current = true;
    setLoading(true);
    setError(undefined);
    const ok = await verifyOtp(code);
    setLoading(false);
    verifyingRef.current = false;
    if (!ok) {
      setError('Incorrect OTP. Please check the code and try again.');
    } else {
      wizard.goNext();
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-[390px] min-h-screen flex flex-col relative">
        <div className="step-enter flex flex-col flex-1 px-5 pt-12 pb-8">
          <div className="flex items-start justify-between">
            <Logo size="lg" />
            <ProgressIndicator step={2} />
          </div>

          <div className="mt-10 mb-8">
            <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-[1.1] uppercase">
              Enter OTP
            </h1>
            <p className="text-white/35 text-[13px] mt-3 leading-relaxed">
              A 6-digit code was sent to{' '}
              <span className="text-white/65 font-semibold break-all">{wizard.form.email}</span>
            </p>
          </div>

          <OTPInput
            value={wizard.form.otp}
            onChange={(digits) => wizard.updateForm({ otp: digits })}
            error={error}
          />

          <div className="flex items-center justify-center mt-6 h-6">
            {toast ? (
              <Toast message={toast} onDismiss={() => setToast(undefined)} />
            ) : resendCountdown > 0 ? (
              <p className="text-[13px] text-white/30">
                Resend OTP in{' '}
                <span className="text-white/55 font-semibold tabular-nums">{resendCountdown}s</span>
              </p>
            ) : (
              <TextButton onClick={handleResend}>Resend OTP</TextButton>
            )}
          </div>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <PrimaryButton
              onClick={handleVerify}
              loading={loading}
              loadingText="Verifying..."
              disabled={loading}
            >
              Verify
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
