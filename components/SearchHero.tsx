"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/Button";
import { useLanguage } from "./useLanguage";

const HARDCODED_CITIES = ["Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse"];
const QUICK_SPECIALTY_SUGGESTIONS_FR = [
  "Investissement",
  "Épargne",
  "Retraite",
  "Fiscalité",
  "Budget",
  "Patrimoine",
  "Gestion de patrimoine",
];
const QUICK_SPECIALTY_SUGGESTIONS_EN = [
  "Investments",
  "Savings",
  "Retirement",
  "Tax",
  "Budget",
  "Wealth",
  "Wealth Management",
];

type TabType = "keyword" | "ai";

export function SearchHero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isEnglish } = useLanguage();
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("keyword");
  const [keyword, setKeyword] = useState(searchParams.get("q") ?? "");
  const [city, setCity] = useState(searchParams.get("ville") ?? "");
  const [aiInput, setAiInput] = useState("");
  const [showKeywordSuggestions, setShowKeywordSuggestions] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showScrollAffordance, setShowScrollAffordance] = useState(true);

  useEffect(() => {
    setKeyword(searchParams.get("q") ?? "");
    setCity(searchParams.get("ville") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const updateAffordanceVisibility = () => {
      if (!heroRef.current) return;
      const heroBottom =
        heroRef.current.offsetTop + heroRef.current.offsetHeight - 20;
      setShowScrollAffordance(window.scrollY < heroBottom);
    };

    updateAffordanceVisibility();
    window.addEventListener("scroll", updateAffordanceVisibility, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateAffordanceVisibility);
    };
  }, []);

  const handleCityFocus = () => {
    setCitySuggestions(HARDCODED_CITIES);
    setShowCitySuggestions(true);
  };
  const specialtySuggestions = isEnglish
    ? QUICK_SPECIALTY_SUGGESTIONS_EN
    : QUICK_SPECIALTY_SUGGESTIONS_FR;

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setShowCitySuggestions(false);
  };

  const handleKeywordSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (city) params.set("ville", city);
    const queryString = params.toString();
    router.push(queryString ? `/conseillers?${queryString}` : "/conseillers");
  };

  const handleAiSearch = () => {
    const params = new URLSearchParams();
    if (aiInput.trim()) params.set("q", aiInput.trim());
    router.push(`/recherche-ai?${params.toString()}`);
  };

  return (
    <section ref={heroRef} className="relative flex h-screen items-center bg-gray-50">
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {isEnglish
            ? "Find the financial advisor that's right for you"
            : "Trouvez le conseiller qui vous correspond"}
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {isEnglish
            ? "Verified professionals, matched to your needs."
            : "Des professionnels vérifiés, adaptés à votre profil."}
        </p>

        <div className="mt-8 flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab("keyword")}
            className={`flex-1 border-b-2 pb-3 text-sm font-medium transition-colors ${
              activeTab === "keyword"
                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {isEnglish ? "🔍 Keyword search" : "🔍 Recherche classique"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`flex flex-1 items-center justify-center gap-1 border-b-2 pb-3 text-sm font-medium transition-colors ${
              activeTab === "ai"
                ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {isEnglish ? "✨ AI Search Beta" : "✨ Recherche assistée"}
          </button>
        </div>

        {activeTab === "keyword" ? (
          <>
            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={
                      isEnglish
                        ? "Name, specialty, situation..."
                        : "Nom, spécialité, situation..."
                    }
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={() => setShowKeywordSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowKeywordSuggestions(false), 200)
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleKeywordSearch()}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                  />
                  {showKeywordSuggestions && (
                    <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                      {specialtySuggestions.map((suggestion) => (
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
                    placeholder={
                      isEnglish ? "City or zip code..." : "Ville ou code postal..."
                    }
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onFocus={handleCityFocus}
                    onBlur={() =>
                      setTimeout(() => setShowCitySuggestions(false), 200)
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleKeywordSearch()
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                  />
                  {showCitySuggestions && citySuggestions.length > 0 && (
                    <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                      {citySuggestions.map((c) => (
                        <li key={c}>
                          <button
                            type="button"
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                            onClick={() => handleCitySelect(c)}
                          >
                            {c}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleKeywordSearch} className="gap-2">
                  <Search className="h-4 w-4" />
                  {isEnglish ? "Search" : "Rechercher"}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-6">
              <textarea
                placeholder={
                  isEnglish
                    ? 'Describe your situation or what you need... e.g. "I\'m looking for an investment advisor in Lyon, available soon"'
                    : 'Décrivez votre situation ou ce que vous cherchez... ex : "Je cherche un conseiller en investissement à Lyon, spécialisé dans la retraite anticipée, disponible rapidement"'
                }
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
              />
              <p className="mt-3 text-left text-sm text-gray-500">
                {isEnglish
                  ? "Describe your situation, goals, and constraints in your own words."
                  : "Décrivez librement votre situation, vos objectifs et vos contraintes."}
              </p>
              <div className="mt-4 flex justify-center">
                <Button onClick={handleAiSearch}>
                  {isEnglish ? "Search ✨" : "Lancer la recherche ✨"}
                </Button>
              </div>
            </div>
          </>
        )}

        <p className="mt-6 text-base text-[var(--color-primary)]">
          <Link
            href="/trouver-mon-conseiller"
            className="font-semibold hover:opacity-80"
          >
            {isEnglish
              ? "Not sure where to start?"
              : "Vous hésitez ? Laissez-vous guider"}
          </Link>
        </p>
      </div>
      {showScrollAffordance && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 animate-pulse text-xl text-gray-400"
        >
          ↓
        </div>
      )}
    </section>
  );
}
