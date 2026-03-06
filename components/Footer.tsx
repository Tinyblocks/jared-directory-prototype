"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage, type Language } from "./useLanguage";

export function Footer() {
  const { language, isEnglish, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const labels = isEnglish
    ? {
        blurb: "The simplest way to find a financial advisor who fits your life.",
        useful: "Useful links",
        home: "Home",
        find: "Find my advisor",
        pros: "Are you an advisor?",
        legal: "Legal",
        legalNotice: "Legal notice",
        privacy: "Privacy policy",
        terms: "Terms of service",
        rights: "All rights reserved.",
      }
    : {
        blurb: "La plateforme de confiance pour trouver le conseiller qui vous correspond.",
        useful: "Liens utiles",
        home: "Accueil",
        find: "Trouver mon conseiller",
        pros: "Vous êtes conseiller ?",
        legal: "Légal",
        legalNotice: "Mentions légales",
        privacy: "Politique de confidentialité",
        terms: "CGU",
        rights: "Tous droits réservés.",
      };

  const switchLanguage = (next: Language) => {
    setLanguage(next);
    setOpen(false);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-white">Jared</p>
            <p className="mt-2 text-sm">
              {labels.blurb}
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-sm hover:text-white">
                App Store
              </a>
              <a href="#" className="text-sm hover:text-white">
                Google Play
              </a>
            </div>
            <div className="relative mt-3 inline-block text-sm">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="text-gray-300 hover:text-white"
              >
                {isEnglish ? "🇬🇧 English" : "🇫🇷 Français"} ∨
              </button>
              {open && (
                <div className="absolute z-20 mt-2 w-40 rounded-md border border-gray-700 bg-gray-800 p-1 shadow-lg">
                  <button
                    type="button"
                    onClick={() => switchLanguage("fr")}
                    className={`block w-full rounded px-2 py-1 text-left hover:bg-gray-700 ${
                      language === "fr" ? "font-bold text-white" : "text-gray-300"
                    }`}
                  >
                    🇫🇷 Français
                  </button>
                  <button
                    type="button"
                    onClick={() => switchLanguage("en")}
                    className={`block w-full rounded px-2 py-1 text-left hover:bg-gray-700 ${
                      language === "en" ? "font-bold text-white" : "text-gray-300"
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="font-medium text-white">{labels.useful}</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  {labels.home}
                </Link>
              </li>
              <li>
                <Link href="/trouver-mon-conseiller" className="hover:text-white">
                  {labels.find}
                </Link>
              </li>
              <li>
                <Link href="/espace-professionnels" className="hover:text-white">
                  {labels.pros}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-white">{labels.legal}</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  {labels.legalNotice}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  {labels.privacy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  {labels.terms}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          © 2025 Jared. {labels.rights}
        </div>
      </div>
    </footer>
  );
}
