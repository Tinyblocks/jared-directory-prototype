"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MATCHING_QUESTIONS_EN, MATCHING_QUESTIONS_FR } from "@/data/matchingFlow";
import { useLanguage } from "@/components/useLanguage";
import { Button } from "@/components/Button";

const LOADING_MIN_MS = 1800;

const INTRO_STEPS_EN = [
  { label: "Answer 3 questions", description: "Tell us a bit about your situation. It takes 2 minutes." },
  { label: "See your matches", description: "We show you advisors who fit your profile, with a short explanation of why." },
  { label: "Request a meeting", description: "Pick the one you like and get in touch. No account needed." },
];

const INTRO_STEPS_FR = [
  { label: "Répondez à 3 questions", description: "Décrivez-nous votre situation en quelques clics. Comptez 2 minutes." },
  { label: "Découvrez vos profils", description: "Nous vous proposons des conseillers adaptés à votre profil, avec une courte explication." },
  { label: "Demandez un rendez-vous", description: "Choisissez le conseiller qui vous convient et prenez contact. Aucun compte requis." },
];

export default function FindMyAdvisorPage() {
  const router = useRouter();
  const { isEnglish } = useLanguage();
  const [stepIndex, setStepIndex] = useState(0); // 0 = intro, 1–3 = Q1–Q3
  const [showLoading, setShowLoading] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [otherExpanded, setOtherExpanded] = useState(false);
  const [otherText, setOtherText] = useState("");

  const questions = isEnglish ? MATCHING_QUESTIONS_EN : MATCHING_QUESTIONS_FR;
  const totalQuestionSteps = questions.length;
  const isIntroStep = stepIndex === 0;
  const questionIndex = stepIndex - 1;
  const question = stepIndex >= 1 ? questions[questionIndex] : null;
  const isLastStep = stepIndex === totalQuestionSteps;

  const showContinueButton =
    otherExpanded && otherText.trim().length > 0;

  const handleBack = () => {
    if (stepIndex === 0) {
      router.push("/");
      return;
    }
    setStepIndex((prev) => prev - 1);
    setSelectedChoice(null);
    setOtherExpanded(false);
    setOtherText("");
  };

  const goToNextStep = () => {
    if (isLastStep) {
      setShowLoading(true);
      const start = Date.now();
      setTimeout(() => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, LOADING_MIN_MS - elapsed);
        setTimeout(() => router.push("/your-advisors"), remaining);
      }, 0);
      return;
    }
    setStepIndex((prev) => prev + 1);
    setSelectedChoice(null);
    setOtherExpanded(false);
    setOtherText("");
  };

  const handleSelectChoice = (choice: string) => {
    setSelectedChoice(choice);
    setOtherExpanded(false);
    setOtherText("");
    goToNextStep();
  };

  const handleToggleOther = () => {
    setOtherExpanded((prev) => !prev);
    if (!otherExpanded) {
      setSelectedChoice(null);
      setOtherText("");
    }
  };

  const handleContinue = () => {
    if (!showContinueButton) return;
    goToNextStep();
  };

  const introSteps = isEnglish ? INTRO_STEPS_EN : INTRO_STEPS_FR;

  if (showLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-gray-50 py-20">
        <div className="mx-auto max-w-md px-6 text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
          </div>
          <p className="text-lg text-gray-700">
            {isEnglish
              ? "Our AI is analyzing your answers to find the best advisors for you..."
              : "Nous analysons vos réponses pour vous proposer les conseillers les plus adaptés..."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-10">
          <div className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 hover:underline">
              {isEnglish ? "Home" : "Accueil"}
            </Link>
            <span className="mx-2">/</span>
            <span>{isEnglish ? "Find my advisor" : "Trouver mon conseiller"}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
                {isEnglish ? "Back" : "Retour"}
              </button>
            ) : (
              <div />
            )}
            <p className="text-sm font-medium text-gray-500">
              {isEnglish ? "Step" : "Étape"} {stepIndex} {isEnglish ? "of" : "sur"} {totalQuestionSteps}
            </p>
          </div>

          <div className="mt-6 h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-[var(--color-primary)] transition-all"
              style={{ width: `${(stepIndex / totalQuestionSteps) * 100}%` }}
            />
          </div>

          {isIntroStep ? (
            <>
              <h1 className="mt-8 text-3xl font-semibold text-gray-900">
                {isEnglish ? "Here's how it works" : "Voici comment ça marche"}
              </h1>
              <div className="mt-8 space-y-6">
                {introSteps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white"
                      aria-hidden
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{step.label}</p>
                      <p className="mt-1 text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button onClick={() => setStepIndex(1)} className="px-8 py-4 text-base">
                  {isEnglish ? "Let's go" : "C'est parti"}
                </Button>
              </div>
            </>
          ) : (
            <>
          <h1 className="mt-8 text-3xl font-semibold text-gray-900">
            {question!.title}
          </h1>

          <div className="mt-8 space-y-3">
            {question.choices.map((choice) => (
              <button
                key={choice}
                type="button"
                onClick={() => handleSelectChoice(choice)}
                className={`w-full rounded-xl border px-5 py-4 text-left text-base text-gray-800 transition-colors ${
                  selectedChoice === choice
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-muted)]"
                    : "border-gray-300 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-muted)]"
                }`}
              >
                {choice}
              </button>
            ))}
            <div>
              <button
                type="button"
                onClick={handleToggleOther}
                className={`w-full rounded-xl border px-5 py-4 text-left text-base text-gray-800 transition-colors ${
                  otherExpanded
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-muted)]"
                    : "border-gray-300 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-muted)]"
                }`}
              >
                {isEnglish ? "Something else" : "Autre"}
              </button>
              {otherExpanded && (
                <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <input
                    type="text"
                    placeholder={isEnglish ? "Describe your situation in a few words" : "Décrivez votre situation en quelques mots"}
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                  />
                </div>
              )}
            </div>
          </div>

          {showContinueButton && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleContinue}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                {isEnglish ? "Continue" : "Continuer"}
              </button>
            </div>
          )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
