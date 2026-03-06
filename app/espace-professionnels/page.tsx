"use client";

import { useState } from "react";
import { useLanguage } from "@/components/useLanguage";

export default function EspaceProfessionnelsPage() {
  const { isEnglish } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = Boolean(name.trim() && email.trim() && message.trim());

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
        {isEnglish ? "Advisor Space — Coming Soon" : "Vous êtes conseiller ?"}
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
        {isEnglish
          ? "Join the Jared network and connect with clients who genuinely need your expertise."
          : "Écrivez à l'équipe Jared pour rejoindre le réseau et être recontacté rapidement."}
      </p>

      {submitted ? (
        <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="text-lg font-semibold text-green-800">
            {isEnglish
              ? "Thanks — your message has been sent."
              : "Merci, votre message a bien été envoyé."}
          </p>
          <p className="mt-2 text-sm text-green-700">
            {isEnglish
              ? "The Jared team will reply shortly."
              : "L'équipe Jared vous répondra sous peu."}
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            setSubmitted(true);
          }}
          className="mt-8 space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label htmlFor="pro-name" className="mb-1 block text-sm font-medium text-gray-700">
              {isEnglish ? "Full name" : "Nom complet"}
            </label>
            <input
              id="pro-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isEnglish ? "Your name" : "Votre nom"}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label htmlFor="pro-email" className="mb-1 block text-sm font-medium text-gray-700">
              {isEnglish ? "Business email" : "Email professionnel"}
            </label>
            <input
              id="pro-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isEnglish ? "you@firm.com" : "vous@cabinet.fr"}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label htmlFor="pro-company" className="mb-1 block text-sm font-medium text-gray-700">
              {isEnglish
                ? "Firm / company (optional)"
                : "Cabinet / société (optionnel)"}
            </label>
            <input
              id="pro-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={
                isEnglish ? "Your company name" : "Nom de votre structure"
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label htmlFor="pro-message" className="mb-1 block text-sm font-medium text-gray-700">
              {isEnglish ? "Message" : "Message"}
            </label>
            <textarea
              id="pro-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder={
                isEnglish
                  ? "Tell us about your practice and request."
                  : "Présentez votre activité et votre demande."
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
            />
          </div>

          <button type="submit" disabled={!canSubmit} className="btn-primary w-full disabled:opacity-50">
            {isEnglish ? "Send message" : "Envoyer mon message"}
          </button>
        </form>
      )}
    </main>
  );
}
