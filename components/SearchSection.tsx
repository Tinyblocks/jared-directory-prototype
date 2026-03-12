"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "./Button";
import { useLanguage } from "./useLanguage";

const CITIES = ["Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse"];
const SPECIALTY_SUGGESTIONS_FR = [
  "Investissement",
  "Épargne",
  "Retraite",
  "Fiscalité",
  "Budget",
  "Patrimoine",
  "Gestion de patrimoine",
];
const SPECIALTY_SUGGESTIONS_EN = [
  "Investment",
  "Savings",
  "Retirement",
  "Tax",
  "Budget",
  "Wealth management",
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
          {isEnglish ? "Have a specific financial need?" : "Vous avez un besoin financier en particulier ?"}
        </h2>
        <p className="mt-3 text-center text-base text-gray-600">
          {isEnglish
            ? "Search for a financial expert by specialty, concern, or location. Jared helps you identify the most relevant advisors based on your financial goals."
            : "Recherchez un expert financier par spécialité, problématique ou localisation. Jared vous aide à identifier les conseillers les plus pertinents selon vos objectifs financiers."}
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
            {isEnglish ? "Classic search" : "Recherche classique"}
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
            {isEnglish ? "Guided search" : "Recherche assistée"}
          </button>
        </div>

        {tab === "keyword" ? (
          <div className="mt-8 space-y-5">
            <h3 className="text-lg font-medium text-gray-900">
              {isEnglish ? "Search" : "Recherche"}
            </h3>
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
                    {(isEnglish ? SPECIALTY_SUGGESTIONS_EN : SPECIALTY_SUGGESTIONS_FR).map((suggestion) => (
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
                {isEnglish ? "Find my advisor" : "Trouver mon conseiller"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">
              {isEnglish ? "Need guidance?" : "Vous avez besoin d'être guidé ?"}
            </h3>
            <p className="mt-2 text-gray-600">
              {isEnglish
                ? "Describe your situation and receive a selection of financial advisors suited to your profile and goals."
                : "Ecrivez votre demande et recevez une sélection de conseillers financiers adaptés à votre profil et vos objectifs."}
            </p>
            <textarea
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              rows={4}
              placeholder={isEnglish ? 'e.g. "I need an investment advisor in Lyon to help plan for retirement"' : 'Ex : "Je cherche un conseiller en investissement à Lyon pour préparer ma retraite"'}
              className="mt-4 w-full rounded-lg border border-gray-300 px-5 py-4 text-base focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
            <div className="mt-5 flex justify-center">
              <Button onClick={handleAiSearch}>{isEnglish ? "Search" : "Trouver mon conseiller"}</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
