"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MATCHING_QUESTIONS_EN, MATCHING_QUESTIONS_FR } from "@/data/matchingFlow";
import { useLanguage } from "@/components/useLanguage";

const LOADING_MIN_MS = 1800;

export default function FindMyAdvisorPage() {
  const router = useRouter();
  const { isEnglish } = useLanguage();
  const [stepIndex, setStepIndex] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [otherExpanded, setOtherExpanded] = useState(false);
  const [otherText, setOtherText] = useState("");

  const questions = isEnglish ? MATCHING_QUESTIONS_EN : MATCHING_QUESTIONS_FR;
  const question = questions[stepIndex];
  const totalSteps = questions.length;
  const isLastStep = stepIndex === totalSteps - 1;

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

  const advance = () => {
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
    advance();
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
    advance();
  };

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
              : "Notre IA analyse vos réponses pour trouver les meilleurs conseillers pour vous..."}
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
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              {isEnglish ? "Back" : "Retour"}
            </button>
            <p className="text-sm font-medium text-gray-500">
              {isEnglish ? "Step" : "Étape"} {stepIndex + 1} {isEnglish ? "of" : "sur"} {totalSteps}
            </p>
          </div>

          <div className="mt-6 h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-[var(--color-primary)] transition-all"
              style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>

          <h1 className="mt-8 text-3xl font-semibold text-gray-900">
            {question.title}
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
        </div>
      </div>
    </section>
  );
}
