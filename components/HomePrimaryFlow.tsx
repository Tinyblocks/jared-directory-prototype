"use client";

import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { useLanguage } from "./useLanguage";

export function HomePrimaryFlow() {
  const router = useRouter();
  const { isEnglish } = useLanguage();

  return (
    <section className="flex h-screen items-center bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 text-center sm:px-8 sm:py-28 lg:px-10">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {isEnglish ? "Stop guessing with your money." : "Arrêtez de tâtonner avec votre argent."}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-600">
            {isEnglish
              ? "Answer 3 quick questions. We shortlist vetted advisors who match your situation, free, no commitment."
              : "Répondez à 3 questions rapides. Nous vous proposons des conseillers vérifiés qui correspondent à votre situation, gratuitement et sans engagement."}
          </p>
          <div className="mt-10 flex justify-center">
            <Button
              onClick={() => router.push("/find-my-advisor")}
              className="px-8 py-4 text-base"
            >
              {isEnglish ? "Find my advisor" : "Trouver mon conseiller"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-gray-200 sm:p-8">
          <div className="px-4 py-2">
            <p className="text-4xl font-bold text-gray-900">500+</p>
            <p className="mt-2 text-sm text-gray-600">
              {isEnglish ? "Vetted advisors" : "Conseillers vérifiés"}
            </p>
          </div>
          <div className="px-4 py-2">
            <p className="text-4xl font-bold text-gray-900">100%</p>
            <p className="mt-2 text-sm text-gray-600">
              {isEnglish ? "Free to use" : "Gratuit"}
            </p>
          </div>
          <div className="px-4 py-2">
            <p className="text-4xl font-bold text-gray-900">2 min</p>
            <p className="mt-2 text-sm text-gray-600">
              {isEnglish ? "To see your matches" : "Pour voir vos correspondances"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
