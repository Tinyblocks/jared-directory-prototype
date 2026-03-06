"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { CITIES } from "@/data/cities";
import { useLanguage } from "@/components/useLanguage";

const BESOIN_OPTIONS_FR = [
  {
    id: "budget",
    label: "Budget et dépenses",
    sub: "Mieux gérer mon argent au quotidien",
    icon: "💼",
  },
  {
    id: "epargne",
    label: "Épargne",
    sub: "Faire fructifier mon épargne",
    icon: "🏦",
  },
  {
    id: "investissement",
    label: "Investissement",
    sub: "Investir mon argent intelligemment",
    icon: "📈",
  },
  {
    id: "retraite",
    label: "Retraite",
    sub: "Préparer ma retraite",
    icon: "🏖️",
  },
  {
    id: "fiscalite",
    label: "Fiscalité",
    sub: "Optimiser ma fiscalité",
    icon: "📋",
  },
  {
    id: "patrimoine",
    label: "Patrimoine",
    sub: "Structurer et développer mon patrimoine",
    icon: "🏛️",
  },
  {
    id: "autre",
    label: "Je ne sais pas encore",
    sub: "Je souhaite être guidé",
    icon: "❓",
  },
];
const BESOIN_OPTIONS_EN = [
  { id: "budget", label: "Budgeting", sub: "Manage my money better", icon: "💼" },
  { id: "epargne", label: "Savings", sub: "Grow my savings", icon: "🏦" },
  {
    id: "investissement",
    label: "Investments",
    sub: "Invest my money wisely",
    icon: "📈",
  },
  { id: "retraite", label: "Retirement", sub: "Plan my retirement", icon: "🏖️" },
  { id: "fiscalite", label: "Tax", sub: "Optimize my taxes", icon: "📋" },
  {
    id: "patrimoine",
    label: "Wealth",
    sub: "Structure and grow my wealth",
    icon: "🏛️",
  },
  {
    id: "autre",
    label: "I’m not sure yet",
    sub: "I’d like guidance",
    icon: "❓",
  },
];

const SITUATION_OPTIONS_FR = [
  { id: "salarie", label: "Salarié", icon: "👔" },
  { id: "independant", label: "Indépendant / Freelance", icon: "💻" },
  { id: "chef", label: "Chef d'entreprise", icon: "🏢" },
  { id: "retraite", label: "Retraité", icon: "🎯" },
  { id: "autre", label: "Autre", icon: "➕" },
];
const SITUATION_OPTIONS_EN = [
  { id: "salarie", label: "Employee", icon: "👔" },
  { id: "independant", label: "Self-employed / Freelancer", icon: "💻" },
  { id: "chef", label: "Business owner", icon: "🏢" },
  { id: "retraite", label: "Retired", icon: "🎯" },
  { id: "autre", label: "Other", icon: "➕" },
];

const MODE_OPTIONS_FR = [
  { id: "visio", label: "En visio", sub: "Depuis chez moi", icon: "🖥️" },
  { id: "presentiel", label: "En présentiel", sub: "Dans votre cabinet", icon: "🤝" },
  { id: "les-deux", label: "Les deux me conviennent", sub: "Flexible", icon: "💬" },
];
const MODE_OPTIONS_EN = [
  { id: "visio", label: "Remote", sub: "From home", icon: "🖥️" },
  { id: "presentiel", label: "In person", sub: "At the office", icon: "🤝" },
  { id: "les-deux", label: "Either works", sub: "Flexible", icon: "💬" },
];

const BESOIN_LABELS: Record<string, string> = {
  budget: "Budget et dépenses",
  epargne: "Épargne",
  investissement: "Investissement",
  retraite: "Retraite",
  fiscalite: "Fiscalité",
  patrimoine: "Patrimoine",
  autre: "Je ne sais pas encore",
};

const SITUATION_LABELS: Record<string, string> = {
  salarie: "Salarié",
  independant: "Indépendant / Freelance",
  chef: "Chef d'entreprise",
  retraite: "Retraité",
  autre: "Autre",
};

const MODE_LABELS: Record<string, string> = {
  visio: "En visio",
  presentiel: "En présentiel",
  "les-deux": "Les deux me conviennent",
};
const BESOIN_LABELS_EN: Record<string, string> = {
  budget: "Budgeting",
  epargne: "Savings",
  investissement: "Investments",
  retraite: "Retirement",
  fiscalite: "Tax",
  patrimoine: "Wealth",
  autre: "I’m not sure yet",
};
const SITUATION_LABELS_EN: Record<string, string> = {
  salarie: "Employee",
  independant: "Self-employed / Freelancer",
  chef: "Business owner",
  retraite: "Retired",
  autre: "Other",
};
const MODE_LABELS_EN: Record<string, string> = {
  visio: "Remote",
  presentiel: "In person",
  "les-deux": "Either works",
};

function TrouverMonConseillerContent() {
  const { isEnglish } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [besoin, setBesoin] = useState("");
  const [ville, setVille] = useState("");
  const [visioOnly, setVisioOnly] = useState(false);
  const [situation, setSituation] = useState("");
  const [mode, setMode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleCityChange = (value: string) => {
    setVille(value);
    if (value.length >= 2) {
      const filtered = CITIES.filter((c) =>
        c.toLowerCase().includes(value.toLowerCase())
      );
      setCitySuggestions(filtered);
      setShowCitySuggestions(true);
    } else {
      setShowCitySuggestions(false);
    }
  };

  const canProceedStep2 = visioOnly || ville.trim().length >= 2;
  const besoinLabels = isEnglish ? BESOIN_LABELS_EN : BESOIN_LABELS;
  const situationLabels = isEnglish ? SITUATION_LABELS_EN : SITUATION_LABELS;
  const modeLabels = isEnglish ? MODE_LABELS_EN : MODE_LABELS;
  const besoinOptions = isEnglish ? BESOIN_OPTIONS_EN : BESOIN_OPTIONS_FR;
  const situationOptions = isEnglish ? SITUATION_OPTIONS_EN : SITUATION_OPTIONS_FR;
  const modeOptions = isEnglish ? MODE_OPTIONS_EN : MODE_OPTIONS_FR;
  const recap =
    besoin && situation && mode
      ? `${besoinLabels[besoin] ?? besoin} · ${ville || (isEnglish ? "Remote" : "Visio")} · ${situationLabels[situation] ?? situation} · ${modeLabels[mode] ?? mode}`
      : "";

  const canSubmitStep5 =
    name.trim() && email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
        <Link href="/" className="text-xl font-semibold text-gray-900">
          Jared
        </Link>
        <div className="flex items-center gap-4">
          <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200 lg:w-48">
            <div
              className="h-full bg-[var(--color-primary)] transition-all"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">
            {isEnglish ? "Step" : "Étape"} {Math.min(step, 4)}{" "}
            {isEnglish ? "of" : "sur"} 4
          </span>
        </div>
      </header>

      <div className="flex flex-1 flex-col">
        {step === 1 && !submitted && (
          <div className="flex flex-1 flex-col px-4 py-8">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              {isEnglish ? "Back" : "Retour"}
            </button>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEnglish
                ? "What's your main financial goal?"
                : "Quel est votre principal besoin ?"}
            </h2>
            <p className="mt-2 text-gray-600">
              {isEnglish
                ? "Choose what best matches your situation."
                : "Sélectionnez la situation qui vous correspond le mieux."}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {besoinOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setBesoin(opt.id);
                    setStep(2);
                  }}
                  className={`rounded-lg border-2 p-4 text-left transition-colors ${
                    besoin === opt.id
                      ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-muted)]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <p className="mt-2 font-medium text-gray-900">{opt.label}</p>
                  <p className="text-sm text-gray-600">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && !submitted && (
          <div className="flex flex-1 flex-col px-4 py-8">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              {isEnglish ? "Back" : "Retour"}
            </button>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEnglish ? "Where are you located?" : "Où vous trouvez-vous ?"}
            </h2>
            <p className="mt-2 text-gray-600">
              {isEnglish
                ? "So we can find advisors near you."
                : "Pour trouver des conseillers proches de chez vous."}
            </p>
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700">
                {isEnglish ? "City or zip code" : "Ville ou code postal"}
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder={
                    visioOnly
                      ? isEnglish
                        ? "Location not required"
                        : "Localisation non requise"
                      : isEnglish
                        ? "Paris, Lyon, Bordeaux..."
                        : "Paris, Lyon, Bordeaux..."
                  }
                  value={ville}
                  onChange={(e) => handleCityChange(e.target.value)}
                  onFocus={() => ville.length >= 2 && setShowCitySuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowCitySuggestions(false), 200)
                  }
                  disabled={visioOnly}
                  className={`w-full rounded-[var(--radius-input)] border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] ${
                    visioOnly ? "bg-gray-100 text-gray-500" : ""
                  }`}
                />
                {showCitySuggestions && citySuggestions.length > 0 && (
                  <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                    {citySuggestions.map((c) => (
                      <li key={c}>
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          onClick={() => {
                            setVille(c);
                            setShowCitySuggestions(false);
                          }}
                        >
                          {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <label className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={visioOnly}
                  onChange={(e) => setVisioOnly(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  {isEnglish
                    ? "No preference — I prefer remote consultation"
                    : "Peu importe, je préfère une consultation en visio"}
                </span>
              </label>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className="btn-primary mt-6 w-full py-4 disabled:opacity-50"
              >
                {isEnglish ? "Next" : "Suivant"}
              </button>
            </div>
          </div>
        )}

        {step === 3 && !submitted && (
          <div className="flex flex-1 flex-col px-4 py-8">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              {isEnglish ? "Back" : "Retour"}
            </button>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEnglish ? "What's your current situation?" : "Quelle est votre situation ?"}
            </h2>
            <p className="mt-2 text-gray-600">
              {isEnglish
                ? "This helps us find the advisor who fits best."
                : "Cela nous aide à trouver le conseiller le plus adapté."}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {situationOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSituation(opt.id);
                    setStep(4);
                  }}
                  className={`rounded-lg border-2 p-4 text-left transition-colors ${
                    situation === opt.id
                      ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-muted)]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <p className="mt-2 font-medium text-gray-900">{opt.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && !submitted && (
          <div className="flex flex-1 flex-col px-4 py-8">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              {isEnglish ? "Back" : "Retour"}
            </button>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEnglish
                ? "How would you like to be supported?"
                : "Comment souhaitez-vous être accompagné ?"}
            </h2>
            <p className="mt-2 text-gray-600">
              {isEnglish ? "Remote or in person?" : "En visio ou en présentiel ?"}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {modeOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setMode(opt.id);
                    setStep(5);
                  }}
                  className={`rounded-lg border-2 p-4 text-left transition-colors ${
                    mode === opt.id
                      ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary-muted)]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <p className="mt-2 font-medium text-gray-900">{opt.label}</p>
                  <p className="text-sm text-gray-600">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && !submitted && (
          <div className="flex flex-1 flex-col px-4 py-8">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              {isEnglish ? "Back" : "Retour"}
            </button>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEnglish
                ? "Great — how can we contact you?"
                : "Parfait. Dites-nous comment vous contacter."}
            </h2>
            <p className="mt-2 text-gray-600">
              {isEnglish
                ? "We’ve identified advisors that match your profile."
                : "Nous avons identifié des conseillers adaptés à votre profil."}
            </p>
            {recap && (
              <p className="mt-4 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
                {recap}
              </p>
            )}
            <div className="mt-8 space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Marie Dupont"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-[var(--radius-input)] border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder={isEnglish ? "jane@example.com" : "marie@exemple.fr"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-[var(--radius-input)] border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="06 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-[var(--radius-input)] border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </div>
              {submitError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  {isEnglish
                    ? "Something went wrong. Please try again."
                    : "Une erreur s'est produite. Veuillez réessayer."}
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setSubmitError(false);
                  if (searchParams.get("error") === "1") {
                    setSubmitError(true);
                  } else {
                    setSubmitted(true);
                  }
                }}
                disabled={!canSubmitStep5}
                className="btn-primary w-full py-4 disabled:opacity-50"
              >
                {isEnglish ? "Send my request" : "Envoyer ma demande"}
              </button>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              {isEnglish
                ? "Free, no commitment. Your data will never be sold."
                : "Gratuit et sans engagement. Vos données ne seront jamais revendues."}
            </p>
          </div>
        )}

        {submitted && (
          <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle2 className="h-12 w-12 text-[var(--color-success)]" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {isEnglish
                ? "Your request has been sent"
                : "Votre demande a bien été envoyée"}
            </h2>
            <p className="mt-4 max-w-2xl text-gray-700">
              {isEnglish
                ? "The Jared team will review your profile and personally select the advisors best suited to your situation. You'll receive a curated shortlist by email within 24 to 48 hours."
                : "L'équipe Jared va analyser votre profil et sélectionner manuellement les conseillers les plus adaptés à votre situation. Vous recevrez une sélection personnalisée par email dans les 24 à 48 heures."}
            </p>
            <p className="mt-3 text-sm text-gray-500">
              {isEnglish
                ? "Check your inbox — our team will reach out to the email address you provided."
                : "Vérifiez votre boîte mail — notre équipe vous contactera à l'adresse que vous avez fournie."}
            </p>
            <Link
              href="/"
              className="mt-8 block text-center font-medium text-[var(--color-primary)] hover:opacity-80"
            >
              {isEnglish ? "← Back to home" : "← Retour à l'accueil"}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrouverMonConseillerPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Chargement...</div>}>
      <TrouverMonConseillerContent />
    </Suspense>
  );
}
