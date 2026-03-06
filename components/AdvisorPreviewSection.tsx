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
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          {isEnglish ? "Meet some of our advisors" : "Découvrez quelques-uns de nos conseillers"}
        </h2>
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
          <p className="text-gray-600">
            {isEnglish ? "Not sure which advisor is right for you?" : "Vous ne savez pas quel conseiller vous convient ?"}
          </p>
          <Link href="/find-my-advisor">
            <Button>{isEnglish ? "Find my advisor" : "Trouver mon conseiller"}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
