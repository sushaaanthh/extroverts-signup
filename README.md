# Extroverts Signup Wizard

A responsive frontend recreation of the Extroverts signup/onboarding experience, built for a Frontend Engineering Assessment.

The project was migrated from a Figma Make prototype into a clean React + TypeScript + Vite application while preserving the approved visual direction and implementing functional signup behavior.

## Signup Flow

Home → Account Required Bottom Sheet → Terms & Conditions → Step 1 — Email → Step 2 — OTP Verification → Step 3 — Profile → Step 4 — Location → Success

## Features

### Interface
- Responsive mobile-first interface
- Black-and-white visual system with Poppins typography
- Event/feed home screen
- Account-required bottom sheet
- Terms acceptance

### Signup Wizard
- Four-step wizard with centralized form state
- Email validation with whitespace prevention
- Six-digit OTP input with auto-advance, backspace, and paste support
- Frontend-only OTP verification simulation
- OTP resend with 24-second cooldown
- Loading states and duplicate-submission prevention
- Name and age validation with 18+ requirement
- Pronoun selection
- State → city → college dependent selection
- Automatic reset of dependent fields on parent change
- Contextual field errors and toast/global feedback
- Back navigation with form-state preservation
- Completion/success state

### Engineering
- React 19 + TypeScript + Vite
- Tailwind CSS with CSS custom properties for shared design tokens
- WizardContext as single source of truth
- Accessibility considerations (focus management, ARIA attributes, keyboard navigation)
- Mobile, tablet, and desktop layouts

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

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
│   └── events.ts
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

## Getting Started

### Prerequisites

Install Node.js and pnpm.

Check your versions:

```bash
node -v
pnpm -v
```

### Install

From the project root:

```bash
pnpm install
```

### Start the development server

```bash
pnpm run dev
```

Vite will normally serve the app at `http://localhost:5173`.

### Production build

```bash
pnpm run build
```

### Preview production build

```bash
pnpm run preview
```

### Type checking

```bash
pnpm run typecheck
```

## Demo OTP

This is a frontend-only assessment project, so there is no real authentication backend.

For demonstration purposes, the valid OTP is `123456`. The demo OTP is intentionally not displayed in the UI.

The simulated authentication functions are structured so they can later be replaced with real API calls.

## Validation

### Email
- Required
- Whitespace-only input rejected
- Invalid email format rejected

### OTP
- Exactly six digits required
- Numeric input only
- Incorrect OTP produces an error
- Resend cooldown prevents repeated requests

### Profile
- Name required
- Whitespace-only name rejected
- Age required
- Invalid age rejected
- Users under 18 cannot continue
- Pronouns required

### Location
- State required
- City required
- College/institution required
- City options depend on state
- College options depend on location
- Changing a parent selection resets dependent fields

## Architecture

Wizard state is initialized centrally in `src/hooks/useSignupWizard.ts` and exposed to every signup screen through `src/context/WizardContext.tsx`. Pages consume the shared state via `useWizard()`, making the wizard hook the single source of truth for form data and navigation.

There is no backend, database, Firebase, Supabase, or real authentication service. Asynchronous operations are simulated with short delays to demonstrate realistic loading and disabled states.

## Design Direction

The interface follows the visual direction of the reference mobile application:

- Predominantly black background
- White primary typography
- Muted secondary text
- White primary actions
- Outlined secondary actions
- Thin borders
- Rounded controls
- Generous spacing
- Mobile-first composition
- Narrow centered signup experience on larger screens

The goal is to preserve visual fidelity while improving interaction quality and handling important edge cases.

## Assessment Scope

This project focuses on:

- Visual replication
- Progressive disclosure
- Form validation
- Error handling
- Loading states
- Cross-field dependencies
- Responsive design
- Navigation
- UX improvements

## Status

- Figma Make scaffolding removed
- React/Vite application structure established
- Signup wizard implemented
- Validation implemented
- OTP interaction implemented
- Dependent location fields implemented
- Loading and error states implemented
- TypeScript check passes
- Production build passes
