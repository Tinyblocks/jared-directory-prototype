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
      "J'ai de l'argent à faire fructifier mais je ne sais pas par où commencer",
      "Je paie trop d'impôts et je veux optimiser",
      "J'ai besoin d'aide pour un projet important (maison, retraite, etc.)",
      "Ma situation financière a changé (héritage, nouvel emploi, etc.)",
      "Je veux un avis sur mes placements actuels",
      "Je ne suis pas sûr, je sais juste que j'ai besoin d'aide",
    ],
  },
  {
    title: "Quelle est votre situation actuelle ?",
    choices: [
      "J'ai de l'épargne que je veux faire fructifier",
      "J'investis déjà mais je veux optimiser",
      "Je prépare une grosse dépense ou un événement de vie",
      "J'ai des finances complexes (entreprise, immobilier, etc.)",
      "Je débute en planification financière",
    ],
  },
  {
    title: "Pour vous recommander le bon conseiller, laquelle de ces situations vous correspond le mieux ?",
    choices: [
      "Je constitue ma première vraie épargne (moins de 10 k€)",
      "J'ai de l'argent de côté (10 k€ à 50 k€)",
      "Je gère activement mon patrimoine (50 k€ et plus)",
      "Je préfère ne pas le dire pour l'instant",
    ],
  },
];

export const MATCHING_QUESTIONS = MATCHING_QUESTIONS_EN;
