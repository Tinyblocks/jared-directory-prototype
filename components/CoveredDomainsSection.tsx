"use client";

import Link from "next/link";
import { useLanguage } from "./useLanguage";

const PILLARS_FR = [
  { label: "💰 Budget", value: "Budget" },
  { label: "🏦 Épargne & Sécurité", value: "Épargne & Sécurité" },
  { label: "📈 Investissements", value: "Investissements" },
  { label: "🏖️ Retraite", value: "Retraite" },
  { label: "📋 Fiscalité & Droits", value: "Fiscalité & Droits" },
  { label: "🏡 Projets de vie", value: "Projets de vie" },
];
const PILLARS_EN = [
  { label: "💰 Budget", value: "Budget" },
  { label: "🏦 Savings & Security", value: "Savings & Security" },
  { label: "📈 Investments", value: "Investments" },
  { label: "🏖️ Retirement", value: "Retirement" },
  { label: "📋 Tax & Legal", value: "Tax & Legal" },
  { label: "🏡 Life Goals", value: "Life Goals" },
];

export function CoveredDomainsSection() {
  const { isEnglish } = useLanguage();
  const pillars = isEnglish ? PILLARS_EN : PILLARS_FR;
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {isEnglish
            ? "Experts for every part of your financial life"
            : "Des experts pour chaque aspect de vos finances"}
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-gray-600">
          {isEnglish
            ? "Retirement, investments, taxes, or just getting started. Tell us what's on your mind and we'll find the right person."
            : "Retraite, investissements, fiscalité ou vous débutez. Dites-nous ce qui vous préoccupe et nous trouverons la bonne personne."}
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Link
              key={pillar.label}
              href={`/conseillers?q=${encodeURIComponent(pillar.value)}`}
              className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 text-gray-800 transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:bg-blue-50 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{pillar.label}</span>
                <span className="text-sm text-gray-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                  +
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
