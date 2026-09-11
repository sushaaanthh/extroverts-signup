# Extroverts Signup Wizard

A responsive frontend recreation of the Extroverts signup experience, built for a frontend engineering assessment.

The project implements the complete signup flow with progressive disclosure, validation, OTP verification, dependent location fields, and accessibility-oriented input behavior.

## Signup Flow

Landing / Home
→ Account Required bottom sheet
→ Terms & consent
→ Email
→ OTP verification
→ Profile
→ Location
→ Success

## Key Features

- Responsive mobile-first layout
- Progressive disclosure via bottom sheet and terms gate
- Email validation with whitespace handling
- Six-digit OTP input with auto-advance, backspace, paste, and numeric keyboard support
- OTP resend with 24-second cooldown
- Profile validation with 18+ age restriction
- Pronoun selection
- State → city → college dependent fields with automatic reset on parent change
- Loading states on all async transitions
- Duplicate-submission prevention
- Contextual field errors
- Global toast/alert feedback for submission failures
- Back navigation with form-state preservation
- Success state personalized with the user's first name
- Mobile, tablet, and desktop support

## Technical Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- oxfmt

## Project Structure

```
src/
├── components/
│   ├── BottomSheet.tsx
│   ├── Button.tsx
│   ├── Checkbox.tsx
│   ├── Input.tsx
│   ├── Logo.tsx
│   ├── OTPInput.tsx
│   ├── PronounSelector.tsx
│   ├── ProgressIndicator.tsx
│   ├── Select.tsx
│   ├── Spinner.tsx
│   └── Toast.tsx
│
├── context/
│   └── WizardContext.tsx
│
├── data/
│   ├── events.ts
│   └── index.ts
│
├── hooks/
│   └── useSignupWizard.ts
│
├── pages/
│   ├── Home.tsx
│   ├── Terms.tsx
│   ├── EmailStep.tsx
│   ├── OTPStep.tsx
│   ├── ProfileStep.tsx
│   ├── LocationStep.tsx
│   └── Success.tsx
│
├── types/
│   └── signup.ts
│
├── App.tsx
├── index.css
└── main.tsx
```

## Architecture

- `App.tsx` owns top-level screen flow and global toast state.
- `useSignupWizard.ts` owns centralized wizard state and step transitions.
- `WizardContext.tsx` exposes that shared wizard state to signup screens via `useWizard()`.
- Individual step components consume shared state through context; they do not maintain independent wizard state.
- Reusable UI primitives live under `src/components`.
- Static data lives under `src/data.ts` and `src/data/events.ts`.

## Validation & UX

- **Email**: required, whitespace rejected, format validated, trimmed on entry, max length enforced.
- **OTP**: exactly six digits, numeric-only input, auto-advance between slots, backspace and paste supported, incorrect code shows contextual error.
- **Profile**: name required with minimum length, age required with 18+ guard, pronouns required.
- **Location**: state, city, and college all required; city options depend on state; college options depend on city; changing a parent selection resets dependent fields.
- **Back navigation**: previous values are preserved; OTP is cleared when returning to email; dependent fields are reset when their parent changes.
- **Loading**: visible spinner and disabled buttons during async transitions; duplicate submissions are prevented.
- **Errors**: contextual errors appear beneath fields; global toast/banner feedback is used for submission failures.
- **Accessibility**: focus-visible styles, ARIA attributes, labeled inputs, modal semantics for the bottom sheet.

## Development

```bash
pnpm install
pnpm run dev
pnpm run typecheck
pnpm run build
pnpm run preview
pnpm run format
```

## Deployment

Live preview: https://extroverts-signup-brown.vercel.app

## Assessment Notes

- Frontend-only implementation. No backend, database, or authentication service is required.
- OTP verification is simulated with a demo code (`123456`) that is intentionally not displayed in the UI.
- Simulated async delays demonstrate realistic loading states without relying on external services.
