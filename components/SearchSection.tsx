"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "./Button";
import { useLanguage } from "./useLanguage";

const CITIES = ["Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse"];
const SPECIALTY_SUGGESTIONS = [
  "Investissement",
  "Épargne",
  "Retraite",
  "Fiscalité",
  "Budget",
  "Patrimoine",
  "Gestion de patrimoine",
];

type TabType = "keyword" | "ai";

export function SearchSection() {
  const router = useRouter();
  const { isEnglish } = useLanguage();
  const [tab, setTab] = useState<TabType>("keyword");
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [aiInput, setAiInput] = useState("");
  const [showKeywordSuggestions, setShowKeywordSuggestions] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  const handleKeywordSearch = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("q", keyword.trim());
    if (city.trim()) params.set("ville", city.trim());
    const query = params.toString();
    router.push(query ? `/conseillers?${query}` : "/conseillers");
  };

  const handleAiSearch = () => {
    const params = new URLSearchParams();
    if (aiInput.trim()) params.set("q", aiInput.trim());
    const query = params.toString();
    router.push(query ? `/recherche-ai?${query}` : "/recherche-ai");
  };

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
        <h2 className="text-center text-2xl font-semibold text-gray-900">
          {isEnglish ? "Already know what you're looking for?" : "Vous savez déjà ce que vous cherchez ?"}
        </h2>
        <p className="mt-3 text-center text-base text-gray-600">
          {isEnglish
            ? "Search by name, specialty, or describe your situation in your own words."
            : "Recherchez par nom, spécialité, ou décrivez votre situation avec vos mots."}
        </p>

        <div className="mt-10 flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setTab("keyword")}
            className={`flex-1 border-b-2 pb-4 text-base font-medium transition-colors ${
              tab === "keyword"
                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {isEnglish ? "Keyword search" : "Recherche par mots-clés"}
          </button>
          <button
            type="button"
            onClick={() => setTab("ai")}
            className={`flex-1 border-b-2 pb-4 text-base font-medium transition-colors ${
              tab === "ai"
                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {isEnglish ? "AI search" : "Recherche IA"}
          </button>
        </div>

        {tab === "keyword" ? (
          <div className="mt-8 space-y-5">
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={isEnglish ? "Name, specialty, situation..." : "Nom, spécialité, situation..."}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onFocus={() => setShowKeywordSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowKeywordSuggestions(false), 200)}
                  onKeyDown={(e) => e.key === "Enter" && handleKeywordSearch()}
                  className="w-full rounded-lg border border-gray-300 px-5 py-4 text-base focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                />
                {showKeywordSuggestions && (
                  <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                    {SPECIALTY_SUGGESTIONS.map((suggestion) => (
                      <li key={suggestion}>
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          onClick={() => {
                            setKeyword(suggestion);
                            setShowKeywordSuggestions(false);
                          }}
                        >
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={isEnglish ? "City or zip code..." : "Ville ou code postal..."}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onFocus={() => setShowCitySuggestions(true)}
                  onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                  onKeyDown={(e) => e.key === "Enter" && handleKeywordSearch()}
                  className="w-full rounded-lg border border-gray-300 px-5 py-4 text-base focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                />
                {showCitySuggestions && (
                  <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                    {CITIES.map((c) => (
                      <li key={c}>
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          onClick={() => {
                            setCity(c);
                            setShowCitySuggestions(false);
                          }}
                        >
                          {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex justify-center pt-2">
              <Button onClick={handleKeywordSearch} className="gap-2">
                <Search className="h-4 w-4" />
                {isEnglish ? "Search" : "Rechercher"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <textarea
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              rows={4}
              placeholder={isEnglish ? 'Describe your situation or what you need... e.g. "I need an investment advisor in Lyon, available soon."' : 'Décrivez votre situation ou vos besoins... ex. "J\'ai besoin d\'un conseiller en investissement à Lyon, disponible rapidement."'}
              className="w-full rounded-lg border border-gray-300 px-5 py-4 text-base focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
            <p className="mt-4 text-sm text-gray-500">
              {isEnglish ? "Describe your situation, goals, and constraints in your own words." : "Décrivez votre situation, vos objectifs et vos contraintes avec vos mots."}
            </p>
            <div className="mt-5 flex justify-center">
              <Button onClick={handleAiSearch}>{isEnglish ? "Search" : "Rechercher"}</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
