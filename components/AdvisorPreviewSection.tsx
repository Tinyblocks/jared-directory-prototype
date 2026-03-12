"use client";

import Link from "next/link";
import { advisors } from "@/data/advisors";
import { AdvisorCard } from "./AdvisorCard";
import { Button } from "./Button";
import { useLanguage } from "./useLanguage";

const PREVIEW_PHOTOS = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
];

export function AdvisorPreviewSection() {
  const { isEnglish } = useLanguage();
  const previewAdvisors = advisors.slice(0, 3);
  return (
    <section className="border-t border-gray-200 bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-[var(--color-primary)]">
          {isEnglish ? "Our experts" : "Nos experts"}
        </p>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {isEnglish
            ? "Experts in every area of your financial life"
            : "Des experts spécialisés dans chaque domaine financier"}
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-gray-600">
          {isEnglish
            ? "Every advisor on Jared is verified and evaluated to ensure professional, transparent support tailored to your needs."
            : "Tous les conseillers présents sur Jared sont vérifiés et évalués afin de garantir un accompagnement sérieux, transparent et adapté à vos besoins."}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previewAdvisors.map((advisor, index) => (
            <AdvisorCard
              key={advisor.id}
              advisor={advisor}
              layout="preview"
              photoOverride={PREVIEW_PHOTOS[index]}
            />
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <Link href="/find-my-advisor">
            <Button>{isEnglish ? "Find my advisor" : "Trouver mon conseiller"}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
