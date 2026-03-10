import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { Check } from "lucide-react";
import { getAdvisorBySlug } from "@/data/advisors";
import { tAdvisorTitle } from "@/components/advisorI18n";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const advisor = getAdvisorBySlug(slug);
  if (!advisor) return { title: "Booking confirmed | Jared" };
  return {
    title: `Booking confirmed with ${advisor.firstName} ${advisor.lastName} | Jared`,
  };
}

export default async function BookingConfirmationPage({
  params,
  searchParams,
}: PageProps) {
  const cookieStore = await cookies();
  const isEnglish = cookieStore.get("jared-language")?.value === "en";
  const { slug } = await params;
  const { date: dateParam, time: timeParam } = await searchParams;
  const advisor = getAdvisorBySlug(slug);
  if (!advisor) notFound();

  let dateTimeLabel: string | null = null;
  if (dateParam && timeParam) {
    try {
      const d = new Date(dateParam + "T" + timeParam + ":00");
      if (!Number.isNaN(d.getTime())) {
        dateTimeLabel = d.toLocaleDateString(isEnglish ? "en-GB" : "fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    } catch {
      // ignore
    }
  }

  const copy = isEnglish
    ? {
        title: "Request sent",
        contacted: `We've contacted ${advisor.firstName}. You'll hear from them soon.`,
        requested: "Requested:",
        emailSent: "We've sent a confirmation to your email.",
        backProfile: "Back to profile",
        backHome: "Back to home",
      }
    : {
        title: "Demande envoyée",
        contacted: `Nous avons prévenu ${advisor.firstName}. Il ou elle vous recontactera rapidement.`,
        requested: "Créneau demandé :",
        emailSent: "Un email de confirmation vous a été envoyé.",
        backProfile: "Retour au profil",
        backHome: "Retour à l'accueil",
      };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="mt-6 text-center text-xl font-semibold text-gray-900 sm:text-2xl">
            {copy.title}
          </h1>
          <p className="mt-2 text-center text-gray-600">
            {copy.contacted}
          </p>
          {dateTimeLabel && (
            <p className="mt-4 text-center text-sm font-medium text-gray-700">
              {copy.requested} {dateTimeLabel}
            </p>
          )}
          <p className="mt-6 text-center text-sm text-gray-600">
            {copy.emailSent}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={`/conseillers/${advisor.slug}`}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              {copy.backProfile}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:brightness-110"
            >
              {copy.backHome}
            </Link>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href={`/conseillers/${advisor.slug}`}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:bg-gray-50"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100">
              <Image
                src={advisor.photo}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">
                {advisor.firstName} {advisor.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {tAdvisorTitle(advisor.title, isEnglish)}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
