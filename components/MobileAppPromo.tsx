"use client";

import { useLanguage } from "./useLanguage";

export function MobileAppPromo() {
  const { isEnglish } = useLanguage();
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {isEnglish
                ? "More than a match."
                : "Plus qu'une mise en relation."}
            </h2>
            <p className="mt-4 text-gray-600">
              {isEnglish
                ? "Jared helps you understand your situation before the first call, and track where you stand after. No jargon, no pressure. Just a clear picture of your finances."
                : "L'application Jared analyse votre situation financière, identifie vos priorités (budget, épargne, investissements, retraite) et vous prépare à rencontrer le bon professionnel. Avant le rendez-vous, comprenez vos enjeux. Après, suivez vos progrès."}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li>
                <span className="font-semibold">
                  {isEnglish
                    ? "🎯 Know where you stand"
                    : "🎯 Sachez où vous en êtes"}
                </span>
                <span className="block text-gray-600">
                  {isEnglish
                    ? "Set your goals before meeting an advisor"
                    : "Fixez vos objectifs avant de rencontrer un conseiller"}
                </span>
              </li>
              <li>
                <span className="font-semibold">
                  {isEnglish ? "📚 Learn before you act" : "📚 Comprenez avant d'agir"}
                </span>
                <span className="block text-gray-600">
                  {isEnglish
                    ? "Guides written by certified professionals"
                    : "Contenus rédigés par des professionnels, clairs et neutres"}
                </span>
              </li>
              <li>
                <span className="font-semibold">
                  {isEnglish ? "🤝 Stay on track" : "🤝 Restez sur la bonne voie"}
                </span>
                <span className="block text-gray-600">
                  {isEnglish
                    ? "Follow up with your advisor and track your progress"
                    : "Suivez vos échanges avec votre conseiller et vos progrès"}
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
