"use client";

import { useEffect, useState } from "react";

export type Language = "fr" | "en";

const STORAGE_KEY = "jared-language";
const EVENT_NAME = "jared-language-change";

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") {
      setLanguageState(stored);
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      if (event.newValue === "fr" || event.newValue === "en") {
        setLanguageState(event.newValue);
      }
    };

    const onLanguageEvent = (event: Event) => {
      const custom = event as CustomEvent<Language>;
      if (custom.detail === "fr" || custom.detail === "en") {
        setLanguageState(custom.detail);
      }
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(EVENT_NAME, onLanguageEvent);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVENT_NAME, onLanguageEvent);
    };
  }, []);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.cookie = `jared-language=${next}; path=/; max-age=31536000`;
    window.dispatchEvent(new CustomEvent<Language>(EVENT_NAME, { detail: next }));
  };

  return { language, isEnglish: language === "en", setLanguage };
}
