"use client";

import Link from "next/link";
import { advisors } from "@/data/advisors";
import { AdvisorCard } from "@/components/AdvisorCard";
import { useLanguage } from "@/components/useLanguage";

const MATCH_REASONS_EN = [
  "you're planning for retirement and want to protect your savings long-term.",
  "you mentioned a recent financial change and need someone who specializes in wealth restructuring.",
  "you want to grow your money and prefer an independent advisor with no bank affiliation.",
  "you're just getting started and need guidance on building your first investment strategy.",
];

const MATCH_REASONS_FR = [
  "vous préparez votre retraite et souhaitez sécuriser votre épargne.",
  "votre situation a évolué récemment, vous cherchez un spécialiste en restructuration patrimoniale.",
  "vous souhaitez faire fructifier votre épargne avec un conseiller indépendant.",
  "vous débutez et souhaitez être accompagné pour vos premiers investissements.",
];

export default function YourAdvisorsPage() {
  const { isEnglish } = useLanguage();
  const matchedAdvisors = advisors.slice(0, 4);
  const matchReasons = isEnglish ? MATCH_REASONS_EN : MATCH_REASONS_FR;

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <h1 className="text-4xl font-semibold text-gray-900">
          {isEnglish ? "Your advisor matches" : "Vos recommandations"}
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          {isEnglish
            ? "Here is your curated shortlist based on your answers."
            : "Voici les conseillers que nous avons sélectionnés pour vous."}
        </p>
        <div className="mt-4">
          <Link href="/find-my-advisor" className="text-sm text-blue-600 hover:underline">
            {isEnglish ? "Start over" : "Recommencer"}
          </Link>
          <span className="mx-2 text-gray-400">·</span>
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            {isEnglish ? "Back to home" : "Retour à l'accueil"}
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
          {matchedAdvisors.map((advisor, index) => (
            <AdvisorCard
              key={advisor.id}
              advisor={advisor}
              layout="directory"
              matchReason={matchReasons[index % matchReasons.length]}
              showAiTag
              isBestMatch={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
