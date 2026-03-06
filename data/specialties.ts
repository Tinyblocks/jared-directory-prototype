export const SPECIALTIES = [
  "Budget",
  "Investissement",
  "Retraite",
  "Fiscalité",
  "Épargne",
  "Patrimoine",
] as const;

export type Specialty = (typeof SPECIALTIES)[number];
