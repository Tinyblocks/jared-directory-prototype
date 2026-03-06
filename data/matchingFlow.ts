export interface MatchingQuestion {
  title: string;
  choices: string[];
}

export const MATCHING_QUESTIONS_EN: MatchingQuestion[] = [
  {
    title: "What brings you here today?",
    choices: [
      "I have money I want to grow, but I don't know where to start",
      "I'm paying too much in taxes and want to optimize",
      "I need help planning for a big goal (house, retirement, etc.)",
      "My financial situation changed (inheritance, new job, etc.)",
      "I want a second opinion on my current investments",
      "I'm not sure, I just know I need help",
    ],
  },
  {
    title: "What's your current situation?",
    choices: [
      "I have some savings I want to put to work",
      "I'm actively investing but want to optimize",
      "I'm planning for a major expense or life event",
      "I have complex finances (business, real estate, etc.)",
      "I'm just getting started with financial planning",
    ],
  },
  {
    title: "To recommend the right advisor, which best describes you?",
    choices: [
      "I'm building my first serious savings (less than €10k)",
      "I have some money set aside (€10k–€50k)",
      "I'm actively managing my wealth (€50k+)",
      "I'd rather not say right now",
    ],
  },
];

export const MATCHING_QUESTIONS_FR: MatchingQuestion[] = [
  {
    title: "Qu'est-ce qui vous amène aujourd'hui ?",
    choices: [
      "J'ai de l'épargne à faire fructifier, mais je ne sais pas par où commencer",
      "Je paie trop d'impôts, je cherche à optimiser",
      "Un projet en tête : achat immobilier, retraite, transmission...",
      "Ma situation a changé : héritage, nouvel emploi, création d'entreprise",
      "Je souhaite un avis sur mes placements actuels",
      "Je ne sais pas encore, mais j'ai besoin d'être accompagné",
    ],
  },
  {
    title: "Où en êtes-vous aujourd'hui ?",
    choices: [
      "J'ai de l'épargne disponible que je souhaite faire travailler",
      "J'investis déjà, mais je veux optimiser ma stratégie",
      "Je prépare un projet (achat, mariage, études des enfants...)",
      "Ma situation est complexe : entreprise, immobilier, succession",
      "Je débute et souhaite structurer ma situation",
    ],
  },
  {
    title: "Pour vous orienter vers le bon conseiller, quelle situation vous correspond le mieux ?",
    choices: [
      "Je constitue ma première épargne (moins de 10 k€)",
      "J'ai déjà de l'épargne (entre 10 k€ et 50 k€)",
      "Je gère activement mon patrimoine (plus de 50 k€)",
      "Je préfère ne pas préciser pour l'instant",
    ],
  },
];

export const MATCHING_QUESTIONS = MATCHING_QUESTIONS_EN;
