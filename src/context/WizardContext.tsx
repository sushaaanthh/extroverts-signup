import { createContext, useContext } from 'react';
import type { UseSignupWizardReturn } from '../hooks/useSignupWizard';

const WizardContext = createContext<UseSignupWizardReturn | null>(null);

export function WizardProvider({ children, value }: { children: React.ReactNode; value: UseSignupWizardReturn }) {
  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard(): UseSignupWizardReturn {
  const ctx = useContext(WizardContext);
  if (!ctx) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return ctx;
}
