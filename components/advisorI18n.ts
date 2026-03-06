import type { Advisor } from "@/data/advisors";

const SPECIALTY_MAP: Record<string, string> = {
  Budget: "Budget",
  Investissement: "Investments",
  Retraite: "Retirement",
  Fiscalité: "Tax",
  Épargne: "Savings",
  Patrimoine: "Wealth",
};

const TITLE_MAP: Record<string, string> = {
  "Conseiller en gestion de patrimoine": "Wealth Management Advisor",
  "Conseillère en gestion de patrimoine": "Wealth Management Advisor",
  "Conseillère en investissements": "Investment Advisor",
  "Conseiller retraite et prévoyance": "Retirement & Planning Advisor",
  "Conseiller en épargne et placements": "Savings & Investment Advisor",
  "Conseillère en épargne et placements": "Savings & Investment Advisor",
  "Conseillère budgétaire et patrimoniale": "Budget & Wealth Advisor",
  "Conseillère en épargne retraite": "Retirement Savings Advisor",
  "Conseiller fiscal et patrimonial": "Tax & Wealth Advisor",
  "Conseillère en investissement durable": "Sustainable Investment Advisor",
};

const DESCRIPTION_MAP: Record<string, string> = {
  "Optimisation de la rémunération, déclaration, défiscalisation":
    "Compensation optimization, filing support, and tax efficiency",
  "Structuration et transmission du patrimoine":
    "Wealth structuring and estate transfer planning",
  "Préparation et stratégie de départ à la retraite":
    "Retirement preparation and transition strategy",
  "Stratégies d'investissement diversifiées":
    "Diversified investment strategies",
  "Faire fructifier votre épargne": "Grow your savings effectively",
  "Structuration et développement du patrimoine":
    "Wealth structuring and long-term growth",
  "Mieux gérer mon argent au quotidien":
    "Manage day-to-day finances more effectively",
  "Optimisation de la rémunération et défiscalisation":
    "Compensation optimization and tax strategy",
  "Stratégies d'investissement personnalisées":
    "Personalized investment strategies",
  "Placements adaptés à votre profil":
    "Investments tailored to your profile",
  "Constituer une épargne de précaution": "Build an emergency savings buffer",
  "Anticiper sa retraite": "Prepare early for retirement",
  "Optimisation fiscale pour les entrepreneurs":
    "Tax optimization for entrepreneurs",
  "Stratégies patrimoniales sur mesure":
    "Tailored wealth strategy planning",
  "Préparation et optimisation de la retraite":
    "Retirement preparation and optimization",
  "Épargne long terme et retraite complémentaire":
    "Long-term savings and supplemental retirement",
  "Structuration patrimoniale pour la retraite":
    "Retirement-focused wealth structuring",
  "Structuration du patrimoine": "Wealth structuring",
  "Gestion budgétaire des indépendants":
    "Budget management for self-employed professionals",
  "Investissement responsable et durable":
    "Responsible and sustainable investing",
  "Épargne à impact positif": "Impact-oriented savings strategy",
  "Patrimoine aligné avec vos valeurs":
    "Wealth strategy aligned with your values",
};

const RESPONSE_TIME_MAP: Record<string, string> = {
  "Répond généralement sous 48h": "Usually replies within 48 hours",
};

export function tSpecialty(value: string, isEnglish: boolean) {
  return isEnglish ? SPECIALTY_MAP[value] ?? value : value;
}

export function tAdvisorTitle(value: string, isEnglish: boolean) {
  return isEnglish ? TITLE_MAP[value] ?? value : value;
}

export function tSpecialtyDescription(value: string, isEnglish: boolean) {
  return isEnglish ? DESCRIPTION_MAP[value] ?? value : value;
}

export function tResponseTime(value: string, isEnglish: boolean) {
  return isEnglish ? RESPONSE_TIME_MAP[value] ?? value : value;
}

export function tAdvisorLongform(
  advisor: Advisor,
  isEnglish: boolean
): Pick<Advisor, "bio" | "whoIHelp" | "whatToExpect"> {
  if (!isEnglish) {
    return {
      bio: advisor.bio,
      whoIHelp: advisor.whoIHelp,
      whatToExpect: advisor.whatToExpect,
    };
  }

  return {
    bio: `${advisor.firstName} ${advisor.lastName} supports clients with practical, personalized financial guidance tailored to their goals and situation.`,
    whoIHelp:
      "I work with individuals and families who want clearer financial decisions and a strategy that matches their profile.",
    whatToExpect:
      "After your request, you'll typically be contacted within 48 hours to schedule a first introductory call, free and with no commitment.",
  };
}
