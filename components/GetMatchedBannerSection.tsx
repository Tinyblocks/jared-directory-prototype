"use client";

import Link from "next/link";
import { useLanguage } from "./useLanguage";

export function GetMatchedBannerSection() {
  const { isEnglish } = useLanguage();
  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEnglish ? "Not sure where to start?" : "Vous ne savez pas par où commencer ?"}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-gray-600">
          {isEnglish
            ? "Tell us about your situation in a few minutes. The Jared team will review your profile and send you a personalized selection of advisors by email."
            : "Décrivez-nous votre situation en quelques minutes, et on vous répond sous 48 h avec une sélection de conseillers adaptés à vos besoins."}
        </p>
        <Link
          href="/trouver-mon-conseiller"
          className="btn-primary mt-6 inline-block"
        >
          {isEnglish ? "Find my advisor" : "Trouver mon conseiller"}
        </Link>
      </div>
    </section>
  );
}
