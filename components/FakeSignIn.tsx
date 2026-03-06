"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useLanguage } from "./useLanguage";

interface FakeSignInProps {
  onClose: () => void;
  onSuccess?: () => void;
  embedded?: boolean;
}

export function FakeSignIn({
  onClose,
  onSuccess,
  embedded = true,
}: FakeSignInProps) {
  const { isEnglish } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setSignedIn(true);
  };

  if (signedIn) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-700">
          {isEnglish
            ? "Your account is ready. You can find your advisors here."
            : "Votre compte est créé. Vous pouvez retrouver vos conseillers ici."}
        </p>
        <Link
          href="/"
          onClick={onSuccess}
          className="mt-4 inline-block font-medium text-[var(--color-primary)] hover:opacity-80"
        >
          {isEnglish
            ? "View advisor directory"
            : "Voir le répertoire des conseillers"}
        </Link>
      </div>
    );
  }

  return (
    <div className={embedded ? "p-6" : ""}>
      <h3 className="text-lg font-semibold text-gray-900">
        {isEnglish ? "Create my Jared account" : "Créer mon compte Jared"}
      </h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="signin-email" className="sr-only">
            {isEnglish ? "Email" : "Email"}
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder={isEnglish ? "you@email.com" : "votre@email.fr"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div>
          <label htmlFor="signin-password" className="sr-only">
            {isEnglish ? "Password" : "Mot de passe"}
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>
        <Button
          type="submit"
          disabled={!email.trim() || !password.trim()}
          fullWidth
        >
          {isEnglish ? "Create account" : "Créer mon compte"}
        </Button>
      </form>
      <button
        type="button"
        onClick={onClose}
        className="mt-3 block w-full text-sm text-gray-500 hover:text-gray-700"
      >
        {isEnglish ? "Continue without account" : "Continuer sans compte"}
      </button>
    </div>
  );
}
