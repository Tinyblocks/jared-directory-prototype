"use client";

import { useLanguage } from "./useLanguage";

const PLACEHOLDER_COUNT = 8;

export function PartnersBanner() {
  const { isEnglish } = useLanguage();
  return (
    <section className="overflow-hidden border-y border-gray-200 bg-gray-50 py-8">
      <p className="mb-6 text-center text-sm font-medium text-gray-500">
        {isEnglish ? "They trust us" : "Ils nous font confiance"}
      </p>
      <div className="relative flex">
        <div className="flex animate-scroll-left gap-8">
          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
            <div
              key={i}
              className="flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-sm text-gray-500"
            >
              {isEnglish ? "Partner" : "Partenaire"}
            </div>
          ))}
          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
            <div
              key={`dup-${i}`}
              className="flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-sm text-gray-500"
            >
              {isEnglish ? "Partner" : "Partenaire"}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
