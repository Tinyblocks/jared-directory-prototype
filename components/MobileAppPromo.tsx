"use client";

import { useLanguage } from "./useLanguage";

export function MobileAppPromo() {
  const { isEnglish } = useLanguage();
  return (
    <section className="border-t border-gray-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {isEnglish
                ? "More than just a matching platform"
                : "Bien plus qu'une simple plateforme de mise en relation"}
            </h2>
            <p className="mt-4 text-gray-600">
              {isEnglish
                ? "The Jared app supports you before, during, and after your first meeting with your advisor."
                : "L'application Jared vous accompagne avant, pendant et après votre premier rendez-vous avec votre conseiller."}
            </p>
            <ul className="mt-6 space-y-4 text-sm text-gray-700">
              <li>
                <span className="font-semibold">
                  {isEnglish
                    ? "→ Clarify your financial goals"
                    : "→ Clarifiez vos objectifs financiers"}
                </span>
                <span className="block text-gray-600">
                  {isEnglish
                    ? "Before your first meeting, get clear on your situation and priorities: investment, retirement, tax optimization, or personal projects."
                    : "Avant votre premier rendez-vous, identifiez clairement votre situation et vos priorités : investissement, retraite, optimisation fiscale ou projets personnels."}
                </span>
              </li>
              <li>
                <span className="font-semibold">
                  {isEnglish
                    ? "→ Make informed decisions"
                    : "→ Prenez des décisions éclairées"}
                </span>
                <span className="block text-gray-600">
                  {isEnglish
                    ? "Access content written by certified experts to better understand the financial landscape."
                    : "Accédez à des contenus rédigés par des experts certifiés pour mieux comprendre les enjeux financiers."}
                </span>
              </li>
              <li>
                <span className="font-semibold">
                  {isEnglish
                    ? "→ Track your progress"
                    : "→ Suivez votre progression"}
                </span>
                <span className="block text-gray-600">
                  {isEnglish
                    ? "Keep a clear picture of your financial strategy and measure your progress over time."
                    : "Gardez une vision claire de votre stratégie financière et mesurez vos avancées dans le temps."}
                </span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#"
                className="rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
              >
                App Store
              </a>
              <a
                href="#"
                className="rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
              >
                Google Play
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[300px] rounded-[2.2rem] border-4 border-gray-300 bg-gray-100 p-4 shadow-sm">
              <div className="mb-3 h-6 w-20 rounded-full bg-gray-300" />
              <div className="space-y-3 rounded-2xl bg-white p-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
                  Laurent, voici vos priorités financières...
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
                  🎯 Investissements - Objectif ajouté
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700">
                  1. Évaluer votre portefeuille
                  <br />
                  2. Créer un budget
                  <br />
                  3. Trouver un expert
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
