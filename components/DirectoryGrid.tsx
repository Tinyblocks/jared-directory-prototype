"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { advisors } from "@/data/advisors";
import { AdvisorCard } from "./AdvisorCard";
import { Button } from "./Button";
import { useLanguage } from "./useLanguage";

const FAKE_ADVISORS = advisors.slice(0, 5);
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
const HARDCODED_CITIES = ["Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse"];

export function DirectoryGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isEnglish } = useLanguage();
  const quickSuggestions = isEnglish
    ? QUICK_SPECIALTY_SUGGESTIONS_EN
    : QUICK_SPECIALTY_SUGGESTIONS_FR;
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [city, setCity] = useState(searchParams.get("ville") ?? "");
  const [mode, setMode] = useState(searchParams.get("mode") ?? "");
  const [showKeywordSuggestions, setShowKeywordSuggestions] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    setCity(searchParams.get("ville") ?? "");
    setMode(searchParams.get("mode") ?? "");
  }, [searchParams]);

  const appliedQuery = searchParams.get("q") ?? "";
  const appliedCity = searchParams.get("ville") ?? "";
  const appliedMode = searchParams.get("mode") ?? "";

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (city.trim()) params.set("ville", city.trim());
    if (mode.trim()) params.set("mode", mode.trim());
    const nextQueryString = params.toString();
    router.push(nextQueryString ? `/conseillers?${nextQueryString}` : "/conseillers");
  };
  const clearAllFilters = () => {
    setQuery("");
    setCity("");
    setMode("");
    router.push("/conseillers");
  };
  const removeFilter = (key: "q" | "ville" | "mode") => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(params.toString() ? `/conseillers?${params.toString()}` : "/conseillers");
  };
  const activeFilters = [
    appliedQuery.trim()
      ? {
          key: "q" as const,
          label: appliedQuery.trim(),
        }
      : null,
    appliedCity.trim()
      ? {
          key: "ville" as const,
          label: appliedCity.trim(),
        }
      : null,
    appliedMode === "distance"
      ? { key: "mode" as const, label: isEnglish ? "Remote" : "À distance" }
      : appliedMode === "presentiel"
        ? {
            key: "mode" as const,
            label: isEnglish ? "In person" : "En présentiel",
          }
        : null,
  ].filter(Boolean) as Array<{ key: "q" | "ville" | "mode"; label: string }>;

  return (
    <section id="resultats" className="bg-gray-50 pb-12">
      <div className="sticky top-14 z-30 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={
                  isEnglish
                    ? "Name, specialty, situation..."
                    : "Nom, spécialité, situation..."
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowKeywordSuggestions(true)}
                onBlur={() => setTimeout(() => setShowKeywordSuggestions(false), 200)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
              />
              {showKeywordSuggestions && (
                <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                  {quickSuggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        onClick={() => {
                          setQuery(suggestion);
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
            <div className="relative w-full">
              <input
                type="text"
                placeholder={
                  isEnglish ? "City or zip code..." : "Ville ou code postal..."
                }
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onFocus={() => setShowCitySuggestions(true)}
                onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
              />
              {showCitySuggestions && (
                <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                  {HARDCODED_CITIES.map((c) => (
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
            <Button onClick={handleSearch} className="gap-2 self-end sm:self-auto">
              <Search className="h-4 w-4" />
              {isEnglish ? "Search" : "Rechercher"}
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {activeFilters.map((filter) => (
              <button
                key={`${filter.key}-${filter.label}`}
                type="button"
                onClick={() => removeFilter(filter.key)}
                className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
              >
                × {filter.label}
              </button>
            ))}
            {(activeFilters.length > 0 || mode) && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-sm font-medium text-[var(--color-primary)] hover:opacity-80"
              >
                {isEnglish ? "Clear all" : "Réinitialiser"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">
            {isEnglish ? "Format:" : "Format:"}
          </span>
          {[
            { label: isEnglish ? "All" : "Tous", value: "" },
            { label: isEnglish ? "Remote" : "À distance", value: "distance" },
            {
              label: isEnglish ? "In person" : "En présentiel",
              value: "presentiel",
            },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setMode(option.value)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                mode === option.value
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="mb-4 text-base font-bold text-gray-900">
          {FAKE_ADVISORS.length}{" "}
          {isEnglish ? "advisors found" : "conseillers trouvés"}
        </p>
        <div className="directory-results-grid">
          {FAKE_ADVISORS.map((advisor) => (
            <div key={advisor.id} className="directory-results-grid-item">
              <AdvisorCard advisor={advisor} layout="directory" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
