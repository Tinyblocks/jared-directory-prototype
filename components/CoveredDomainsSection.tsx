"use client";

import Link from "next/link";
import { Button } from "./Button";
import { useLanguage } from "./useLanguage";

const PILLARS_FR = [
  {
    label: "Budget",
    value: "Budget",
    description:
      "Apprenez à mieux gérer vos finances, structurer vos dépenses et atteindre vos objectifs financiers.",
  },
  {
    label: "Épargne & Sécurité",
    value: "Épargne & Sécurité",
    description:
      "Constituez une épargne solide et sécurisez votre avenir financier grâce à une stratégie adaptée.",
  },
  {
    label: "Investissements",
    value: "Investissements",
    description:
      "Immobilier, marchés financiers, diversification : développez votre patrimoine intelligemment.",
  },
  {
    label: "Retraite",
    value: "Retraite",
    description:
      "Anticipez votre retraite et préparez votre avenir avec des stratégies financières adaptées.",
  },
  {
    label: "Fiscalité & Droits",
    value: "Fiscalité & Droits",
    description:
      "Optimisez votre fiscalité et protégez votre patrimoine en utilisant les dispositifs légaux.",
  },
  {
    label: "Projets de vie",
    value: "Projets de vie",
    description:
      "Achat immobilier, expatriation, création d'entreprise : prenez les bonnes décisions au bon moment.",
  },
];
const PILLARS_EN = [
  {
    label: "Budget",
    value: "Budget",
    description:
      "Learn to better manage your finances, structure your expenses and reach your financial goals.",
  },
  {
    label: "Savings & Security",
    value: "Savings & Security",
    description:
      "Build solid savings and secure your financial future with an adapted strategy.",
  },
  {
    label: "Investments",
    value: "Investments",
    description:
      "Real estate, financial markets, diversification: grow your wealth intelligently.",
  },
  {
    label: "Retirement",
    value: "Retirement",
    description:
      "Plan ahead for retirement and prepare your future with adapted financial strategies.",
  },
  {
    label: "Tax & Legal",
    value: "Tax & Legal",
    description:
      "Optimize your tax situation and protect your assets using legal mechanisms.",
  },
  {
    label: "Life Goals",
    value: "Life Goals",
    description:
      "Property purchase, expatriation, business creation: make the right decisions at the right time.",
  },
];

export function CoveredDomainsSection() {
  const { isEnglish } = useLanguage();
  const pillars = isEnglish ? PILLARS_EN : PILLARS_FR;

  return (
    <section className="border-t border-gray-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-[var(--color-primary)]">
          {isEnglish ? "Our areas of financial expertise" : "Nos domaines d'expertise financière"}
        </p>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {isEnglish
            ? "Support tailored to all your financial goals"
            : "Un accompagnement adapté pour tous vos objectifs financier"}
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-gray-600">
          {isEnglish
            ? "Whether you want to optimize your savings, plan for retirement, or grow your wealth, Jared connects you with the right financial expert at the right time."
            : "Qu'il s'agisse d'optimiser votre épargne, préparer votre retraite ou développer votre patrimoine, Jared vous connecte avec le bon expert financier au bon moment."}
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Link
              key={pillar.value}
              href={`/conseillers?q=${encodeURIComponent(pillar.value)}`}
              className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 text-gray-800 transition-all hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:bg-blue-50 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{pillar.label}</span>
                <span className="text-sm text-gray-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
                  +
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{pillar.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/conseillers">
            <Button>
              {isEnglish ? "See all advisors" : "Voir tous les conseillers"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
