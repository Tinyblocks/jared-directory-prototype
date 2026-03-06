"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAdvisorsForAISearch } from "@/data/advisors";
import { AdvisorCard } from "@/components/AdvisorCard";
import { useLanguage } from "@/components/useLanguage";

function RechercheAIContent() {
  const { isEnglish } = useLanguage();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [input, setInput] = useState(initialQuery);
  const [screen, setScreen] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(!!initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setInput(initialQuery);
      const timer = setTimeout(() => {
        setLoading(false);
        setScreen(2);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [initialQuery]);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setScreen(2);
  };

  const handleModifier = () => {
    setScreen(1);
  };

  const handleVoirProfils = () => {
    setScreen(3);
  };

  const advisors = getAdvisorsForAISearch();

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          {isEnglish
            ? "Back to classic search"
            : "Revenir à la recherche classique"}
        </Link>
      </header>

      {screen === 1 && (
        <div className="mx-auto max-w-2xl px-4 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
              <p className="mt-4 text-gray-600">
                {isEnglish ? "Analyzing..." : "Analyse en cours..."}
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900">
                {isEnglish
                  ? "Describe what you're looking for"
                  : "Décrivez ce que vous cherchez"}
              </h2>
              <p className="mt-2 text-gray-600">
                {isEnglish
                  ? "In a few words, tell us about your situation. AI handles the rest."
                  : "Quelques mots suffisent. Notre outil identifie les conseillers adaptés à votre profil."}
              </p>
              <textarea
                placeholder={
                  isEnglish
                    ? 'Describe your situation or what you need... e.g. "I\'m looking for an investment advisor in Lyon, available soon"'
                    : "Ex: je suis indépendant installé à Lyon, je cherche un conseiller en fiscalité pour optimiser ma rémunération..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={5}
                className="mt-6 min-h-[120px] w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
              />
              <p className="mt-3 text-sm text-gray-500">
                {isEnglish
                  ? "Describe your situation, goals, and constraints in your own words."
                  : "Situation, objectifs, contraintes : décrivez librement."}
              </p>
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!input.trim()}
                className="btn-primary mt-6 w-full py-4 disabled:opacity-50"
              >
                {isEnglish ? "Search" : "Analyser ma recherche"}
              </button>
            </>
          )}
        </div>
      )}

      {screen === 2 && (
        <div className="mx-auto max-w-2xl px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEnglish ? "Here’s what I understood" : "Voici ce que j'ai compris"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isEnglish
              ? "Please confirm this information before viewing profiles."
              : "Vérifiez ces informations avant de consulter les profils."}
          </p>
          <div className="mt-8 space-y-6">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900">
                {isEnglish ? "Your profile" : "Votre profil"}
              </h3>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>{isEnglish ? "Situation: Self-employed" : "Situation: Indépendant"}</li>
                <li>{isEnglish ? "Main need: Tax" : "Besoin principal: Fiscalité"}</li>
              </ul>
              <button
                type="button"
                onClick={handleModifier}
                className="mt-2 text-sm font-medium text-[var(--color-primary)] hover:opacity-80"
              >
                {isEnglish ? "Edit" : "Modifier"}
              </button>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900">
                {isEnglish ? "Your preferences" : "Vos préférences"}
              </h3>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>{isEnglish ? "Location: Lyon" : "Localisation: Lyon"}</li>
                <li>{isEnglish ? "Format: Any" : "Mode: Peu importe"}</li>
              </ul>
              <button
                type="button"
                onClick={handleModifier}
                className="mt-2 text-sm font-medium text-[var(--color-primary)] hover:opacity-80"
              >
                {isEnglish ? "Edit" : "Modifier"}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={handleVoirProfils}
            className="btn-primary mt-8 w-full py-4"
          >
            {isEnglish ? "View matching profiles" : "Voir les profils correspondants"}
          </button>
          <button
            type="button"
            onClick={handleModifier}
            className="mt-4 block w-full text-center text-sm text-gray-600 hover:text-gray-900"
          >
            {isEnglish ? "Edit my search" : "Modifier ma recherche"}
          </button>
        </div>
      )}

      {screen === 3 && (
        <div className="mx-auto max-w-7xl px-4 py-12">
          <nav className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              {isEnglish ? "Home" : "Accueil"}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">
              {isEnglish ? "AI Search" : "Recherche AI"}
            </span>
          </nav>
          <p className="mb-6 text-gray-600">
            {isEnglish ? "4 profiles selected for you" : "4 conseillers sélectionnés pour vous"}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advisors.map((advisor) => (
              <AdvisorCard key={advisor.id} advisor={advisor} />
            ))}
          </div>
          <Link
            href="/conseillers"
            className="mt-8 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {isEnglish ? "Back to classic search" : "Revenir à la recherche classique"}
          </Link>
        </div>
      )}
    </div>
  );
}

export default function RechercheAIPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
      </div>
    }>
      <RechercheAIContent />
    </Suspense>
  );
}
