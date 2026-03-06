"use client";

import { useLanguage } from "./useLanguage";

const STEPS_FR = [
  {
    title: "Recherchez",
    description:
      "Par spécialité, ville ou en décrivant votre situation. Notre outil fait le reste.",
  },
  {
    title: "Consultez les profils",
    description:
      "Chaque conseiller est vérifié par Jared. Expertise, spécialités et avis clients à portée de clic.",
  },
  {
    title: "Prenez contact",
    description:
      "Une demande en 2 minutes. Gratuit et sans engagement.",
  },
];
const STEPS_EN = [
  {
    title: "Search",
    description:
      "Search by specialty, location, or describe your situation in your own words",
  },
  {
    title: "Browse profiles",
    description:
      "Every advisor is vetted by Jared. Read about their expertise, specialties, and client reviews.",
  },
  {
    title: "Get in touch",
    description:
      "Send a request in 2 minutes. Free, no commitment.",
  },
];

export function HowItWorksSection() {
  const { isEnglish } = useLanguage();
  const steps = isEnglish ? STEPS_EN : STEPS_FR;
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {isEnglish
            ? "Find your advisor in 3 steps"
            : "Votre conseiller en 3 étapes"}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-base font-bold text-white">
                {index + 1}
              </div>
              <h3 className="mt-3 text-base font-bold text-gray-900">
                {step.title}
              </h3>
              <p
                className="mt-2 text-sm text-gray-600"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
