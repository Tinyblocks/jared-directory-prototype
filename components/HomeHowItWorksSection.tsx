"use client";

import { useLanguage } from "./useLanguage";

const STEPS_FR = [
  {
    title: "Décrivez votre situation",
    description:
      "Répondez à quelques questions simples pour nous aider à comprendre vos besoins.",
  },
  {
    title: "Recevez une sélection personnalisée",
    description:
      "Jared vous propose les conseillers les plus adaptés à votre profil.",
  },
  {
    title: "Prenez contact",
    description:
      "Choisissez votre conseiller et échangez directement, sans engagement.",
  },
];
const STEPS_EN = [
  {
    title: "Describe your situation",
    description:
      "Answer a few simple questions so we can understand your needs.",
  },
  {
    title: "Receive a personalized selection",
    description:
      "Jared matches you with the advisors best suited to your profile.",
  },
  {
    title: "Get in touch",
    description:
      "Choose your advisor and connect directly—no commitment required.",
  },
];

export function HomeHowItWorksSection() {
  const { isEnglish } = useLanguage();
  const steps = isEnglish ? STEPS_EN : STEPS_FR;
  return (
    <section className="border-t border-gray-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-[var(--color-primary)]">
          {isEnglish ? "How it works" : "Comment ça marche"}
        </p>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {isEnglish
            ? "Find your advisor in 3 steps"
            : "Trouvez votre conseiller en 3 étapes"}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-base font-bold text-white">
                {index + 1}
              </div>
              <h3 className="mt-3 text-base font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
