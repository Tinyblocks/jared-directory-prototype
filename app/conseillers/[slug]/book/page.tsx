import { notFound } from "next/navigation";
import { getAdvisorBySlug } from "@/data/advisors";
import { BookingPageClient } from "./BookingPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const advisor = getAdvisorBySlug(slug);
  if (!advisor) return { title: "Advisor not found | Jared" };
  return {
    title: `Book a meeting with ${advisor.firstName} ${advisor.lastName} | Jared`,
    description: "Choose a time for your introductory call. 30 min, free and with no commitment.",
  };
}

export default async function BookingPage({ params }: PageProps) {
  const { slug } = await params;
  const advisor = getAdvisorBySlug(slug);
  if (!advisor) notFound();

  return <BookingPageClient advisor={advisor} />;
}
