"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Check, Sparkles } from "lucide-react";
import type { Advisor } from "@/data/advisors";
import { useLanguage } from "./useLanguage";
import { tAdvisorTitle, tSpecialty } from "./advisorI18n";

interface AdvisorCardProps {
  advisor: Advisor;
  variant?: "default" | "contact";
  layout?: "default" | "directory" | "preview";
  matchReason?: string;
  showAiTag?: boolean;
  isBestMatch?: boolean;
  /** Override photo URL (e.g. for preview section placeholder images) */
  photoOverride?: string;
}

export function AdvisorCard({
  advisor,
  variant = "default",
  layout = "default",
  matchReason,
  showAiTag = false,
  isBestMatch = false,
  photoOverride,
}: AdvisorCardProps) {
  const photoUrl = photoOverride ?? advisor.photo;
  const { isEnglish } = useLanguage();
  const displayCity = advisor.district
    ? `${advisor.city} ${advisor.district}`
    : advisor.city;
  const trustSignal = advisor.clientReviews
    ? `${advisor.clientReviews} ${
        isEnglish ? "client reviews" : "avis clients"
      }`
    : `${advisor.experienceYears} ${
        isEnglish ? "years of experience" : "ans d'expérience"
      }`;

  const ctaLabel =
    variant === "contact"
      ? isEnglish
        ? "Contact"
        : "Contacter"
      : isEnglish
        ? "View profile"
        : "Voir le profil";

  if (layout === "preview") {
    return (
      <Link
        href={`/conseillers/${advisor.slug}`}
        className="group flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-[var(--color-primary)] hover:shadow-md"
      >
        <div className="relative h-40 w-40 shrink-0 overflow-hidden bg-gray-100 sm:h-48 sm:w-48">
          <Image
            src={photoUrl}
            alt={`${advisor.firstName} ${advisor.lastName}`}
            fill
            className="object-cover object-center"
            sizes="192px"
            unoptimized
          />
        </div>
        <div className="flex flex-1 flex-col justify-center p-4">
          <h3 className="text-base font-bold text-gray-900">
            {advisor.firstName} {advisor.lastName}
          </h3>
          <p className="mt-0.5 text-sm text-gray-600">
            {tAdvisorTitle(advisor.title, isEnglish)}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {advisor.specialties.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700"
              >
                {tSpecialty(s, isEnglish)}
              </span>
            ))}
          </div>
          <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3 w-3 shrink-0" />
            {displayCity}
          </p>
          {advisor.verified && (
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-green-700">
              <Check className="h-3 w-3" />
              {isEnglish ? "Jared Verified" : "Jared Vérifié"}
            </span>
          )}
        </div>
      </Link>
    );
  }

  if (layout === "directory") {
    return (
      <Link
        href={`/conseillers/${advisor.slug}`}
        className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
      >
        {isBestMatch && (
          <span className="absolute right-3 top-3 rounded-md bg-[var(--color-primary)] px-2 py-0.5 text-xs font-medium text-white">
            {isEnglish ? "Best match" : "Recommandé pour vous"}
          </span>
        )}
        <div className="flex flex-1 flex-row gap-4 p-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-28 sm:w-28">
            <Image
              src={photoUrl}
              alt={`${advisor.firstName} ${advisor.lastName}`}
              fill
              className="object-cover object-center"
              sizes="112px"
              unoptimized
            />
          </div>
          <div className="min-w-0 flex-1 flex flex-col">
            <h3 className="text-base font-bold text-gray-900">
              {advisor.firstName} {advisor.lastName}
            </h3>
            <p className="text-[13px] text-gray-600">
              {tAdvisorTitle(advisor.title, isEnglish)}
            </p>
            {advisor.verified && (
              <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-green-700">
                <Check className="h-3 w-3" />
                {isEnglish ? "Jared Verified" : "Jared Vérifié"}
              </span>
            )}
            <div className="mt-2 flex flex-wrap gap-1">
              {advisor.specialties.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700"
                >
                  {tSpecialty(s, isEnglish)}
                </span>
              ))}
            </div>
            <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3 w-3 shrink-0" />
              {displayCity} · {trustSignal}
            </p>
            <div className="mt-auto flex justify-end pt-3">
              <span
                className={`inline-flex shrink-0 rounded-[var(--radius-button)] px-3 py-2 text-center text-sm font-bold transition-colors ${
                  variant === "contact"
                    ? "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-muted)]"
                    : "btn-primary"
                }`}
              >
                {ctaLabel}
              </span>
            </div>
          </div>
        </div>
        {showAiTag && matchReason && (
          <div className="flex w-full items-start gap-2 border-t border-blue-100 bg-blue-50 px-4 py-3">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
            <p className="text-xs leading-snug text-blue-900">
              {isEnglish ? "Matched because" : "Recommandé car"} {matchReason}
            </p>
          </div>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={`/conseillers/${advisor.slug}`}
      className="group flex h-full items-stretch gap-3 rounded-[8px] border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={photoUrl}
          alt={`${advisor.firstName} ${advisor.lastName}`}
          fill
          className="object-cover"
          sizes="80px"
          unoptimized
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <h3 className="text-base font-bold text-gray-900">
          {advisor.firstName} {advisor.lastName}
        </h3>
        {matchReason ? (
          <p className="mt-0.5 text-xs text-gray-500">{matchReason}</p>
        ) : null}
        <p className="text-[13px] text-gray-600">
          {tAdvisorTitle(advisor.title, isEnglish)}
        </p>
        {advisor.verified && (
          <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-green-700">
            <Check className="h-3 w-3" />
            {isEnglish ? "Jared Verified" : "Jared Vérifié"}
          </span>
        )}
        <div className="mt-1 flex flex-wrap gap-1">
          {advisor.specialties.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700"
            >
              {tSpecialty(s, isEnglish)}
            </span>
          ))}
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="h-3 w-3 shrink-0" />
          {displayCity} · {trustSignal}
        </p>
        <span
          className={`mt-auto block rounded-[var(--radius-button)] px-3 py-2 text-center text-sm font-bold transition-colors ${
            variant === "contact"
              ? "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-muted)]"
              : "btn-primary"
          }`}
        >
          {ctaLabel}
        </span>
      </div>
    </Link>
  );
}
