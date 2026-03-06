import { Suspense } from "react";
import { cookies } from "next/headers";
import { DirectoryGrid } from "@/components/DirectoryGrid";

export default async function ConseillersPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("jared-language")?.value ?? "fr";
  const loadingText = lang === "en" ? "Loading..." : "Chargement...";
  return (
    <Suspense fallback={<div className="py-12 text-center">{loadingText}</div>}>
      <DirectoryGrid />
    </Suspense>
  );
}
