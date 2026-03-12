"use client";

import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { useLanguage } from "./useLanguage";

const PILL_TAGS_FR = [
  "Investissement",
  "Gestion de patrimoine",
  "Préparation de la retraite",
  "Optimisation fiscale",
  "Gestion de budget",
];
const PILL_TAGS_EN = [
  "Investment",
  "Wealth management",
  "Retirement planning",
  "Tax optimization",
  "Budget management",
];

export function HomePrimaryFlow() {
  const router = useRouter();
  const { isEnglish } = useLanguage();

  return (
    <section className="flex h-screen items-center bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 text-center sm:px-8 sm:py-28 lg:px-10">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {isEnglish ? "Find the best expert for your money" : "Trouvez le meilleur expert pour votre argent"}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-600">
            {isEnglish
              ? "In just a few minutes, Jared connects you with the financial advisor best suited to your situation and goals."
              : "En quelques minutes, Jared vous met en relation avec le conseiller financier le plus adapté à votre situation et à vos objectifs."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {(isEnglish ? PILL_TAGS_EN : PILL_TAGS_FR).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => router.push("/find-my-advisor")}
              className="px-8 py-4 text-base"
            >
              {isEnglish ? "Find my advisor" : "Trouver mon conseiller"}
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            {isEnglish
              ? "Quick proof — ORIAS/CIF → Verified status — Free, no commitment — Find your advisor in under 2 minutes"
              : "Preuve rapide — ORIAS/CIF → Statuts vérifiés — Gratuit et sans engagement — Trouvez votre conseiller en moins de 2 minutes"}
          </p>
        </div>
      </div>
    </section>
  );
}
