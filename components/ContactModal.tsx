"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check } from "lucide-react";
import type { Advisor } from "@/data/advisors";
import { FakeSignIn } from "./FakeSignIn";
import { useLanguage } from "./useLanguage";

interface ContactModalProps {
  advisor: Advisor;
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ advisor, open, onClose }: ContactModalProps) {
  const { isEnglish } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [showAccountPrompt, setShowAccountPrompt] = useState(true);
  const [showFakeSignIn, setShowFakeSignIn] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim())
      newErrors.name = isEnglish
        ? "Please enter your name."
        : "Veuillez indiquer votre nom.";
    if (!email.trim())
      newErrors.email = isEnglish
        ? "Please enter your email."
        : "Veuillez indiquer votre email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = isEnglish
        ? "Please enter a valid email address."
        : "L'adresse email n'est pas valide.";
    }
    if (!message.trim())
      newErrors.message = isEnglish
        ? "Please write a message."
        : "Veuillez écrire un message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    if (field === "name" && !name.trim())
      setErrors((e) => ({
        ...e,
        name: isEnglish ? "Please enter your name." : "Veuillez indiquer votre nom.",
      }));
    if (field === "email") {
      if (!email.trim())
        setErrors((e) => ({
          ...e,
          email: isEnglish
            ? "Please enter your email."
            : "Veuillez indiquer votre email.",
        }));
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        setErrors((e) => ({
          ...e,
          email: isEnglish
            ? "Please enter a valid email address."
            : "L'adresse email n'est pas valide.",
        }));
      else setErrors((e) => ({ ...e, email: "" }));
    }
    if (field === "message" && !message.trim())
      setErrors((e) => ({
        ...e,
        message: isEnglish
          ? "Please write a message."
          : "Veuillez écrire un message.",
      }));
  };

  const isValid =
    name.trim() &&
    email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);
    setSubmitError(false);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setErrors({});
      setSubmitted(false);
      setSubmitError(false);
      setShowAccountPrompt(true);
      setShowFakeSignIn(false);
    }, 300);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
        aria-hidden
      />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label={isEnglish ? "Close" : "Fermer"}
        >
          <X className="h-5 w-5" />
        </button>

        {showFakeSignIn ? (
          <FakeSignIn
            onClose={() => setShowFakeSignIn(false)}
            onSuccess={() => {
              setShowFakeSignIn(false);
              handleClose();
            }}
          />
        ) : submitted ? (
          <div className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {isEnglish
                  ? "Your message has been sent!"
                  : "Votre message a bien été envoyé !"}
              </h2>
              <p className="mt-2 text-gray-600">
                {isEnglish
                  ? `${advisor.firstName} received your request and usually replies within 48 hours.`
                  : `${advisor.firstName} a reçu votre demande et vous répondra généralement sous 48h.`}
              </p>
            </div>

            {showAccountPrompt && (
              <div className="mt-6 rounded-lg bg-gray-50 p-4">
                <h3 className="text-sm font-medium text-gray-700">
                    {isEnglish
                      ? `Track your conversation with ${advisor.firstName}`
                      : `Gardez la main sur vos échanges avec ${advisor.firstName}`}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {isEnglish
                    ? "Create a free Jared account to keep track of your advisor requests."
                    : "Créez un compte gratuit pour suivre vos échanges et retrouver vos conseillers."}
                </p>
                <button
                  type="button"
                  onClick={() => setShowFakeSignIn(true)}
                  className="mt-3 w-full rounded-[var(--radius-button)] border-2 border-[var(--color-primary)] py-2 font-bold text-[var(--color-primary)] hover:bg-[var(--color-primary-muted)]"
                >
                  {isEnglish ? "Create my Jared account" : "Créer mon compte Jared"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAccountPrompt(false)}
                  className="mt-2 block w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  {isEnglish ? "Continue without account" : "Continuer sans compte"}
                </button>
              </div>
            )}

            <Link
              href="/conseillers"
              onClick={handleClose}
              className="mt-6 block text-center font-medium text-[var(--color-primary)] hover:opacity-80"
            >
              {isEnglish ? "See other advisors" : "Voir d'autres conseillers"}
            </Link>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src={advisor.photo}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {isEnglish ? "Contact" : "Contacter"} {advisor.firstName}{" "}
                  {advisor.lastName}
                </h2>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? `Your message will be sent directly to ${advisor.firstName}. No account required.`
                    : `Votre message sera envoyé directement à ${advisor.firstName}. Aucun compte requis.`}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  {isEnglish ? "Your name" : "Votre nom"}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder={isEnglish ? "Jane Doe" : "Marie Dupont"}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((e) => ({ ...e, name: "" }));
                  }}
                  onBlur={() => handleBlur("name")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  {isEnglish ? "Your email" : "Votre email"}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder={isEnglish ? "jane@example.com" : "marie@exemple.fr"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((e) => ({ ...e, email: "" }));
                  }}
                  onBlur={() => handleBlur("email")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-phone" className="sr-only">
                  {isEnglish ? "Your phone" : "Votre téléphone"}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder={isEnglish ? "+33 6 12 34 56 78" : "06 12 34 56 78"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">
                  {isEnglish ? "Your message" : "Votre message"}
                </label>
                <textarea
                  id="contact-message"
                  placeholder={
                    isEnglish
                      ? "Briefly describe your situation and what you're looking for..."
                      : "Décrivez brièvement votre situation et ce que vous recherchez..."
                  }
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message)
                      setErrors((e) => ({ ...e, message: "" }));
                  }}
                  onBlur={() => handleBlur("message")}
                  rows={4}
                  className="min-h-[120px] w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>
              {submitError && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  {isEnglish
                    ? "Something went wrong. Please try again or contact us at contact@jared.finance."
                    : "Une erreur s'est produite. Veuillez réessayer ou nous contacter à contact@jared.finance."}
                </div>
              )}
              <button
                type="submit"
                disabled={!isValid || submitting}
                className="btn-primary w-full py-4"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {isEnglish ? "Sending..." : "Envoi..."}
                  </span>
                ) : (
                  isEnglish ? "Send my request" : "Envoyer ma demande"
                )}
              </button>
            </form>
            <p className="mt-3 text-center text-sm text-gray-500">
              {isEnglish
                ? `Jared sends your message directly to ${advisor.firstName}. No account required.`
                : `Jared transmet votre message directement à ${advisor.firstName}. Aucun compte requis.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
