export interface FormState {
  email: string;
  newsletterOptIn: boolean;
  otp: string[];
  name: string;
  age: string;
  pronouns: string;
  state: string;
  city: string;
  college: string;
}

export interface Errors {
  email?: string;
  otp?: string;
  name?: string;
  age?: string;
  pronouns?: string;
  state?: string;
  city?: string;
  college?: string;
}

export type SignupStep = 'email' | 'otp' | 'profile' | 'location';

export type Screen = 'landing' | 'terms' | 'email' | 'otp' | 'profile' | 'location' | 'success';
