"use client";

import { useEffect, useState } from "react";

export type Language = "fr" | "en";

const LANGUAGE_STORAGE_KEY = "jared-language";
const LANGUAGE_EVENT = "jared-language-change";

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem(
      LANGUAGE_STORAGE_KEY
    ) as Language | null;
    if (stored === "fr" || stored === "en") {
      setLanguageState(stored);
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== LANGUAGE_STORAGE_KEY) return;
      if (event.newValue === "fr" || event.newValue === "en") {
        setLanguageState(event.newValue);
      }
    };

    const handleLanguageEvent = (event: Event) => {
      const customEvent = event as CustomEvent<Language>;
      if (customEvent.detail === "fr" || customEvent.detail === "en") {
        setLanguageState(customEvent.detail);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(LANGUAGE_EVENT, handleLanguageEvent);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(LANGUAGE_EVENT, handleLanguageEvent);
    };
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    window.dispatchEvent(
      new CustomEvent<Language>(LANGUAGE_EVENT, { detail: nextLanguage })
    );
  };

  return { language, setLanguage, isEnglish: language === "en" };
}
