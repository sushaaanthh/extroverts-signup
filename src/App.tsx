import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Terms } from './pages/Terms';
import { EmailStep } from './pages/EmailStep';
import { OTPStep } from './pages/OTPStep';
import { ProfileStep } from './pages/ProfileStep';
import { LocationStep } from './pages/LocationStep';
import { Success } from './pages/Success';
import { Toast } from './components/Toast';
import { useSignupWizard } from './hooks/useSignupWizard';
import { WizardProvider } from './context/WizardContext';
import type { Screen } from './types/signup';

export default function App() {
  const wizard = useSignupWizard();
  const [screen, setScreen] = useState<Screen>('landing');
  const [toast, setToast] = useState<string | undefined>();

  useEffect(() => {
    if (wizard.completed) {
      setScreen('success');
    }
  }, [wizard.completed]);

  useEffect(() => {
    setToast(undefined);
  }, [screen]);

  const go = (s: Screen) => setScreen(s);

  return (
    <WizardProvider value={wizard}>
      <div className="min-h-screen bg-black">
        {toast && <Toast message={toast} onDismiss={() => setToast(undefined)} />}

        {screen === 'landing' && (
          <Home onGetStarted={() => go('terms')} />
        )}

        {screen === 'terms' && (
          <Terms onAccept={() => { wizard.goToStep('email'); go('email'); }} />
        )}

        {screen === 'email' && <EmailStep />}
        {screen === 'otp' && <OTPStep />}
        {screen === 'profile' && <ProfileStep />}
        {screen === 'location' && (
          <LocationStep onToast={(m) => setToast(m)} />
        )}

        {screen === 'success' && <Success name={wizard.form.name} />}
      </div>
    </WizardProvider>
  );
}
