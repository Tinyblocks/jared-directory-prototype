export const CITIES = [
  "Paris",
  "Lyon",
  "Marseille",
  "Bordeaux",
  "Toulouse",
  "Nantes",
  "Strasbourg",
  "Montpellier",
  "Lille",
  "Rennes",
] as const;

export type City = (typeof CITIES)[number];
