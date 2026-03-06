"use client";

import Link from "next/link";
import { useLanguage } from "./useLanguage";

export function Nav() {
  const { isEnglish } = useLanguage();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold text-gray-900">
          Jared
        </Link>
        <Link
          href="/espace-professionnels"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          {isEnglish ? "Are you an advisor?" : "Vous êtes conseiller ?"}
        </Link>
      </div>
    </header>
  );
}
