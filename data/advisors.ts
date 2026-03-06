import type { Specialty } from "./specialties";

export type AdvisorMode = "visio" | "presentiel" | "both";

export interface Advisor {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  title: string;
  city: string;
  postalCode?: string;
  district?: string;
  region: string;
  photo: string;
  specialties: Specialty[];
  specialtyDescriptions: Record<string, string>;
  bio: string;
  whoIHelp: string;
  whatToExpect: string;
  experienceYears: number;
  clientReviews?: number;
  responseTime: string;
  mode: AdvisorMode;
  verified: boolean;
}

export const advisors: Advisor[] = [
  {
    id: "1",
    slug: "michel-lefevre-paris",
    firstName: "Michel",
    lastName: "Lefevre",
    title: "Conseiller en gestion de patrimoine",
    city: "Paris",
    postalCode: "75008",
    district: "8e",
    region: "Île-de-France",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    specialties: ["Fiscalité", "Patrimoine", "Retraite"],
    specialtyDescriptions: {
      Fiscalité: "Optimisation de la rémunération, déclaration, défiscalisation",
      Patrimoine: "Structuration et transmission du patrimoine",
      Retraite: "Préparation et stratégie de départ à la retraite",
    },
    bio: "Michel Lefevre accompagne les entrepreneurs et indépendants depuis plus de 15 ans. Diplômé de l'ESSEC et certifié CIF, il a développé une expertise reconnue en optimisation fiscale et en structuration patrimoniale. Son approche personnalisée permet à chaque client de bénéficier d'un accompagnement sur mesure, adapté à sa situation et à ses objectifs.",
    whoIHelp: "J'accompagne principalement les indépendants, entrepreneurs et jeunes actifs qui souhaitent structurer leur patrimoine et optimiser leur fiscalité.",
    whatToExpect:
      "Après votre prise de contact, Michel vous recontactera sous 48h pour convenir d'un premier appel de découverte de 30 minutes, gratuit et sans engagement.",
    experienceYears: 15,
    clientReviews: 127,
    responseTime: "Répond généralement sous 48h",
    mode: "both",
    verified: true,
  },
  {
    id: "2",
    slug: "sophie-martin-lyon",
    firstName: "Sophie",
    lastName: "Martin",
    title: "Conseillère en investissements",
    city: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
    specialties: ["Investissement", "Épargne", "Patrimoine"],
    specialtyDescriptions: {
      Investissement: "Stratégies d'investissement diversifiées",
      Épargne: "Faire fructifier votre épargne",
      Patrimoine: "Structuration et développement du patrimoine",
    },
    bio: "Sophie Martin est conseillère en investissements depuis 12 ans. Spécialisée dans l'accompagnement des particuliers souhaitant faire fructifier leur épargne, elle privilégie une approche pédagogique et transparente. Elle aide ses clients à comprendre les marchés et à construire un portefeuille adapté à leur profil de risque.",
    whoIHelp: "Je m'adresse aux particuliers qui souhaitent investir intelligemment, qu'ils soient débutants ou investisseurs confirmés.",
    whatToExpect:
      "Après votre prise de contact, Sophie vous recontactera sous 48h pour convenir d'un premier appel de découverte de 30 minutes, gratuit et sans engagement.",
    experienceYears: 12,
    clientReviews: 89,
    responseTime: "Répond généralement sous 48h",
    mode: "visio",
    verified: true,
  },
  {
    id: "3",
    slug: "jean-dupont-marseille",
    firstName: "Jean",
    lastName: "Dupont",
    title: "Conseiller retraite et prévoyance",
    city: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    specialties: ["Retraite", "Épargne", "Budget"],
    specialtyDescriptions: {
      Retraite: "Préparation et stratégie de départ à la retraite",
      Épargne: "Faire fructifier votre épargne",
      Budget: "Mieux gérer mon argent au quotidien",
    },
    bio: "Jean Dupont accompagne les futurs retraités dans la préparation de cette étape clé de la vie. Avec 18 ans d'expérience, il aide ses clients à optimiser leurs droits à la retraite, à constituer une épargne complémentaire et à anticiper sereinement leur départ.",
    whoIHelp: "J'accompagne les salariés et indépendants à partir de 45 ans qui souhaitent préparer leur retraite dans les meilleures conditions.",
    whatToExpect:
      "Après votre prise de contact, Jean vous recontactera sous 48h pour convenir d'un premier rendez-vous de découverte, gratuit et sans engagement.",
    experienceYears: 18,
    clientReviews: 156,
    responseTime: "Répond généralement sous 48h",
    mode: "presentiel",
    verified: true,
  },
  {
    id: "4",
    slug: "marie-bernard-bordeaux",
    firstName: "Marie",
    lastName: "Bernard",
    title: "Conseillère en gestion de patrimoine",
    city: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    specialties: ["Fiscalité", "Patrimoine", "Investissement"],
    specialtyDescriptions: {
      Fiscalité: "Optimisation de la rémunération et défiscalisation",
      Patrimoine: "Structuration et transmission du patrimoine",
      Investissement: "Stratégies d'investissement personnalisées",
    },
    bio: "Marie Bernard exerce à Bordeaux depuis 10 ans. Elle accompagne les familles et les professionnels dans la structuration de leur patrimoine, avec une attention particulière portée à l'optimisation fiscale et à la transmission. Son expertise en droit successoral complète son approche globale.",
    whoIHelp: "J'accompagne les familles, les entrepreneurs et les professions libérales qui souhaitent sécuriser et transmettre leur patrimoine.",
    whatToExpect:
      "Après votre prise de contact, Marie vous recontactera sous 48h pour convenir d'un premier échange de 30 minutes, gratuit et sans engagement.",
    experienceYears: 10,
    clientReviews: 72,
    responseTime: "Répond généralement sous 48h",
    mode: "both",
    verified: true,
  },
  {
    id: "5",
    slug: "pierre-durand-toulouse",
    firstName: "Pierre",
    lastName: "Durand",
    title: "Conseiller en épargne et placements",
    city: "Toulouse",
    region: "Occitanie",
    photo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop",
    specialties: ["Épargne", "Investissement", "Budget"],
    specialtyDescriptions: {
      Épargne: "Faire fructifier votre épargne",
      Investissement: "Placements adaptés à votre profil",
      Budget: "Mieux gérer mon argent au quotidien",
    },
    bio: "Pierre Durand aide les particuliers à faire fructifier leur épargne depuis 8 ans. Son approche pragmatique et son souci de la pédagogie lui permettent d'accompagner des profils variés, des épargnants débutants aux investisseurs plus aguerris.",
    whoIHelp: "Je m'adresse aux particuliers qui souhaitent optimiser leur épargne et leurs placements, quel que soit leur niveau de connaissance.",
    whatToExpect:
      "Après votre prise de contact, Pierre vous recontactera sous 48h pour convenir d'un premier appel de découverte de 30 minutes, gratuit et sans engagement.",
    experienceYears: 8,
    clientReviews: 54,
    responseTime: "Répond généralement sous 48h",
    mode: "visio",
    verified: true,
  },
  {
    id: "6",
    slug: "anne-petit-nantes",
    firstName: "Anne",
    lastName: "Petit",
    title: "Conseillère budgétaire et patrimoniale",
    city: "Nantes",
    region: "Pays de la Loire",
    photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
    specialties: ["Budget", "Épargne", "Retraite"],
    specialtyDescriptions: {
      Budget: "Mieux gérer mon argent au quotidien",
      Épargne: "Constituer une épargne de précaution",
      Retraite: "Anticiper sa retraite",
    },
    bio: "Anne Petit accompagne les particuliers dans la gestion de leur budget et la constitution d'une épargne saine. Diplômée en finance personnelle, elle aide ses clients à reprendre le contrôle de leurs finances et à atteindre leurs objectifs à court et long terme.",
    whoIHelp: "J'accompagne les jeunes actifs, les familles et les personnes en reconversion qui souhaitent mieux gérer leur argent.",
    whatToExpect:
      "Après votre prise de contact, Anne vous recontactera sous 48h pour convenir d'un premier échange de 30 minutes, gratuit et sans engagement.",
    experienceYears: 6,
    clientReviews: 43,
    responseTime: "Répond généralement sous 48h",
    mode: "both",
    verified: true,
  },
  {
    id: "7",
    slug: "thomas-roux-lyon",
    firstName: "Thomas",
    lastName: "Roux",
    title: "Conseiller en gestion de patrimoine",
    city: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    specialties: ["Patrimoine", "Fiscalité", "Investissement"],
    specialtyDescriptions: {
      Patrimoine: "Structuration et transmission du patrimoine",
      Fiscalité: "Optimisation fiscale pour les entrepreneurs",
      Investissement: "Stratégies patrimoniales sur mesure",
    },
    bio: "Thomas Roux est spécialisé dans l'accompagnement des chefs d'entreprise et des professions libérales. Avec 14 ans d'expérience, il les aide à structurer leur patrimoine professionnel et personnel, en optimisant la fiscalité et en préparant la transmission.",
    whoIHelp: "J'accompagne les chefs d'entreprise, les professions libérales et les entrepreneurs qui souhaitent optimiser leur patrimoine.",
    whatToExpect:
      "Après votre prise de contact, Thomas vous recontactera sous 48h pour convenir d'un premier rendez-vous de découverte, gratuit et sans engagement.",
    experienceYears: 14,
    clientReviews: 98,
    responseTime: "Répond généralement sous 48h",
    mode: "presentiel",
    verified: true,
  },
  {
    id: "8",
    slug: "isabelle-moreau-paris",
    firstName: "Isabelle",
    lastName: "Moreau",
    title: "Conseillère en épargne retraite",
    city: "Paris",
    postalCode: "75016",
    district: "16e",
    region: "Île-de-France",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    specialties: ["Retraite", "Épargne", "Patrimoine"],
    specialtyDescriptions: {
      Retraite: "Préparation et optimisation de la retraite",
      Épargne: "Épargne long terme et retraite complémentaire",
      Patrimoine: "Structuration patrimoniale pour la retraite",
    },
    bio: "Isabelle Moreau accompagne les salariés et indépendants dans la préparation de leur retraite. Spécialiste des produits d'épargne retraite (PER, assurance-vie), elle aide ses clients à constituer un complément de revenus pour une retraite sereine.",
    whoIHelp: "J'accompagne les salariés à partir de 40 ans et les indépendants qui souhaitent préparer leur retraite.",
    whatToExpect:
      "Après votre prise de contact, Isabelle vous recontactera sous 48h pour convenir d'un premier appel de découverte de 30 minutes, gratuit et sans engagement.",
    experienceYears: 11,
    clientReviews: 81,
    responseTime: "Répond généralement sous 48h",
    mode: "visio",
    verified: true,
  },
  {
    id: "9",
    slug: "laurent-girard-bordeaux",
    firstName: "Laurent",
    lastName: "Girard",
    title: "Conseiller fiscal et patrimonial",
    city: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    specialties: ["Fiscalité", "Patrimoine", "Budget"],
    specialtyDescriptions: {
      Fiscalité: "Optimisation de la rémunération et défiscalisation",
      Patrimoine: "Structuration du patrimoine",
      Budget: "Gestion budgétaire des indépendants",
    },
    bio: "Laurent Girard est expert en fiscalité des indépendants et des TPE. Il accompagne ses clients dans l'optimisation de leur rémunération, la gestion de leur trésorerie et la structuration de leur patrimoine professionnel.",
    whoIHelp: "J'accompagne les indépendants, freelances et chefs de très petites entreprises qui souhaitent optimiser leur fiscalité.",
    whatToExpect:
      "Après votre prise de contact, Laurent vous recontactera sous 48h pour convenir d'un premier échange de 30 minutes, gratuit et sans engagement.",
    experienceYears: 9,
    clientReviews: 67,
    responseTime: "Répond généralement sous 48h",
    mode: "both",
    verified: true,
  },
  {
    id: "10",
    slug: "claire-faure-marseille",
    firstName: "Claire",
    lastName: "Faure",
    title: "Conseillère en investissement durable",
    city: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    specialties: ["Investissement", "Épargne", "Patrimoine"],
    specialtyDescriptions: {
      Investissement: "Investissement responsable et durable",
      Épargne: "Épargne à impact positif",
      Patrimoine: "Patrimoine aligné avec vos valeurs",
    },
    bio: "Claire Faure accompagne les investisseurs souhaitant aligner leurs placements avec leurs valeurs. Spécialiste de l'ISR et de la finance durable, elle aide ses clients à construire un portefeuille performant et responsable.",
    whoIHelp: "J'accompagne les particuliers qui souhaitent investir de manière responsable tout en faisant fructifier leur épargne.",
    whatToExpect:
      "Après votre prise de contact, Claire vous recontactera sous 48h pour convenir d'un premier appel de découverte de 30 minutes, gratuit et sans engagement.",
    experienceYears: 7,
    clientReviews: 52,
    responseTime: "Répond généralement sous 48h",
    mode: "visio",
    verified: true,
  },
];

export function getAdvisorBySlug(slug: string): Advisor | undefined {
  return advisors.find((a) => a.slug === slug);
}

export function getAdvisorsForGetMatched(): Advisor[] {
  return [advisors[0], advisors[1], advisors[2]];
}

export function getAdvisorsForAISearch(): Advisor[] {
  return [advisors[0], advisors[1], advisors[2], advisors[3]];
}
