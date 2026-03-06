import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { MapPin, Check, Video } from "lucide-react";
import { getAdvisorBySlug } from "@/data/advisors";
import { AdvisorProfileClient } from "./AdvisorProfileClient";
import {
  tAdvisorLongform,
  tAdvisorTitle,
  tResponseTime,
  tSpecialty,
  tSpecialtyDescription,
} from "@/components/advisorI18n";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const advisor = getAdvisorBySlug(slug);
  if (!advisor) return { title: "Conseiller non trouvé | Jared" };
  const cityDisplay = advisor.district
    ? `${advisor.city} ${advisor.district}`
    : advisor.city;
  return {
    title: `${advisor.firstName} ${advisor.lastName} | Conseiller financier à ${advisor.city} | Jared`,
    description: `${advisor.firstName} est conseiller ${advisor.specialties[0] ?? "financier"} à ${advisor.city}. Vérifié par Jared. Contactez-le gratuitement, sans engagement.`,
  };
}

export default async function AdvisorProfilePage({ params }: PageProps) {
  const cookieStore = await cookies();
  const isEnglish = cookieStore.get("jared-language")?.value === "en";
  const { slug } = await params;
  const advisor = getAdvisorBySlug(slug);
  if (!advisor) notFound();

  const displayCity = advisor.district
    ? `${advisor.city} ${advisor.district}`
    : advisor.city;
  const cityRegion = `${displayCity}, ${advisor.region}`;
  const longform = tAdvisorLongform(advisor, isEnglish);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="pt-4">
        <Link href="/your-advisors" className="text-sm text-blue-600 hover:underline">
          {isEnglish ? "← Back to results" : "← Retour aux résultats"}
        </Link>
      </div>
      <nav className="border-b border-gray-200 py-3 text-sm">
        <ol className="flex gap-2 text-gray-600">
          <li>
            <Link href="/" className="hover:text-gray-900">
              {isEnglish ? "Home" : "Accueil"}
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/conseillers" className="hover:text-gray-900">
              {isEnglish ? "Advisors" : "Conseillers"}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900">
            {advisor.firstName} {advisor.lastName}
          </li>
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <section className="py-8 lg:grid lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={advisor.photo}
                  alt={`${advisor.firstName} ${advisor.lastName}`}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
            </div>
            <div className="mt-6 lg:col-span-3 lg:mt-0">
              <h1 className="text-3xl font-bold text-gray-900">
                {advisor.firstName} {advisor.lastName}
              </h1>
              <p className="mt-1 text-lg text-gray-600">
                {tAdvisorTitle(advisor.title, isEnglish)}
              </p>
              {advisor.verified && (
                <span
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-green-700"
                  title={
                    isEnglish
                      ? "This advisor was verified by the Jared team."
                      : "Ce conseiller a été vérifié par l'équipe Jared."
                  }
                >
                  <Check className="h-4 w-4" />
                  {isEnglish ? "Jared Verified" : "Jared Vérifié"}
                </span>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {advisor.specialties.slice(0, 5).map((s) => (
                  <Link
                    key={s}
                    href={`/conseillers?specialite=${encodeURIComponent(s)}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
                  >
                    {tSpecialty(s, isEnglish)}
                  </Link>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                {displayCity}
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {advisor.experienceYears}{" "}
                {isEnglish ? "years of experience" : "ans d'expérience"}
              </p>
              <p className="text-sm text-gray-600">
                {tResponseTime(advisor.responseTime, isEnglish)}
              </p>
              <div className="mt-6">
                <AdvisorProfileClient
                  advisor={advisor}
                  trigger="hero"
                  className="btn-primary inline-flex px-5 py-3 text-sm"
                />
              </div>
            </div>
          </section>

          <section className="border-t border-gray-200 py-8">
            <h2 className="text-lg font-semibold text-gray-900">
              {isEnglish ? "About" : "À propos"}
            </h2>
            <p className="mt-3 whitespace-pre-line text-gray-600">
              {longform.bio ||
                (isEnglish
                  ? `${advisor.firstName} hasn't completed this profile yet. Contact them to learn more.`
                  : `${advisor.firstName} n'a pas encore complété son profil. Contactez-le pour en savoir plus.`)}
            </p>
          </section>

          <section className="border-t border-gray-200 py-8">
            <h2 className="text-lg font-semibold text-gray-900">
              {isEnglish ? "My specialties" : "Mes spécialités"}
            </h2>
            <ul className="mt-4 space-y-3">
              {advisor.specialties.map((s) => (
                <li key={s}>
                  <span className="font-medium text-gray-900">
                    {tSpecialty(s, isEnglish)}
                  </span>
                  {advisor.specialtyDescriptions[s] && (
                    <span className="text-gray-600">
                      {" "}
                      {" "}-{" "}
                      {tSpecialtyDescription(
                        advisor.specialtyDescriptions[s],
                        isEnglish
                      )}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-gray-200 py-8">
            <h2 className="text-lg font-semibold text-gray-900">
              {isEnglish ? "Who I work with" : "À qui je m'adresse"}
            </h2>
            <p className="mt-3 text-gray-600">{longform.whoIHelp}</p>
          </section>

          <section className="border-t border-gray-200 py-8">
            <h2 className="text-lg font-semibold text-gray-900">
              {isEnglish
                ? "What you can expect"
                : "Ce à quoi vous pouvez vous attendre"}
            </h2>
            <p className="mt-3 text-gray-600">{longform.whatToExpect}</p>
          </section>

          <section className="border-t border-gray-200 py-8">
            <h2 className="text-lg font-semibold text-gray-900">
              {isEnglish ? "Location" : "Localisation"}
            </h2>
            <p className="mt-3 text-gray-600">{cityRegion}</p>
            {advisor.mode === "visio" || advisor.mode === "both" ? (
              <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <Video className="h-4 w-4" />
                {isEnglish
                  ? "Remote consultations available"
                  : "Consultations en visio disponibles"}
              </p>
            ) : null}
            <div className="mt-4 h-48 rounded-lg bg-gray-200">
              {/* Map placeholder */}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1 lg:pt-8">
          <div className="sticky top-32 hidden lg:block">
            <AdvisorProfileClient
              advisor={advisor}
              trigger="sidebar"
              variant="sidebar"
            />
          </div>
        </div>
      </div>

      <AdvisorProfileClient advisor={advisor} trigger="mobile" variant="mobile" />
      </div>
    </div>
  );
}
