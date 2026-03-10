"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Advisor } from "@/data/advisors";
import { ContactModal } from "@/components/ContactModal";
import { useLanguage } from "@/components/useLanguage";

interface AdvisorProfileClientProps {
  advisor: Advisor;
  trigger: "hero" | "sidebar" | "mobile";
  variant?: "default" | "sidebar" | "mobile";
  className?: string;
}

export function AdvisorProfileClient({
  advisor,
  trigger,
  variant = "default",
  className,
}: AdvisorProfileClientProps) {
  const { isEnglish } = useLanguage();
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileBarVisible, setMobileBarVisible] = useState(false);

  useEffect(() => {
    if (variant !== "mobile") return;
    const handleScroll = () => {
      const heroCta = document.getElementById("hero-cta");
      if (heroCta) {
        const rect = heroCta.getBoundingClientRect();
        setMobileBarVisible(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  if (variant === "sidebar") {
    return (
      <>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100">
              <Image
                src={advisor.photo}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <span className="font-medium text-gray-900">
              {advisor.firstName} {advisor.lastName}
            </span>
          </div>
          <Link
            href={`/conseillers/${advisor.slug}/book`}
            className="btn-primary mt-4 flex w-full items-center justify-center py-2.5 text-sm"
          >
            {isEnglish ? "Request a meeting" : "Réserver un rendez-vous"}
          </Link>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="mt-2 block w-full text-center text-sm text-gray-500 hover:text-gray-700"
          >
            {isEnglish
              ? "Prefer to send a message instead?"
              : "Préférer envoyer un message ?"}
          </button>
          <Link
            href="/conseillers"
            className="mt-2 block text-center text-sm text-gray-500 hover:text-gray-700"
          >
            {isEnglish
              ? "See other advisors"
                : "Voir d'autres conseillers"}
          </Link>
        </div>
        <ContactModal
          advisor={advisor}
          open={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </>
    );
  }

  if (variant === "mobile") {
    return (
      <>
        {mobileBarVisible && (
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white p-4 shadow-lg lg:hidden">
            <Link
              href={`/conseillers/${advisor.slug}/book`}
              className="btn-primary flex w-full items-center justify-center py-4"
            >
              {isEnglish ? "Request a meeting" : "Réserver un rendez-vous"}
            </Link>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="mt-2 block w-full text-center text-sm text-gray-500 hover:text-gray-700"
            >
              {isEnglish
                ? "Prefer to send a message instead?"
                : "Préférer envoyer un message ?"}
            </button>
          </div>
        )}
        <ContactModal
          advisor={advisor}
          open={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <Link
          id={trigger === "hero" ? "hero-cta" : undefined}
          href={`/conseillers/${advisor.slug}/book`}
          className={className}
        >
          {isEnglish ? "Request a meeting" : "Réserver un rendez-vous"}
        </Link>
        <button
          type="button"
          onClick={() => setContactOpen(true)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {isEnglish
            ? "Prefer to send a message instead?"
            : "Préférer envoyer un message ?"}
        </button>
      </div>
      <ContactModal
        advisor={advisor}
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
