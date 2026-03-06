import { HomePrimaryFlow } from "@/components/HomePrimaryFlow";
import { SearchSection } from "@/components/SearchSection";
import { CoveredDomainsSection } from "@/components/CoveredDomainsSection";
import { AdvisorPreviewSection } from "@/components/AdvisorPreviewSection";
import { MobileAppPromo } from "@/components/MobileAppPromo";

export default function HomePage() {
  return (
    <>
      <HomePrimaryFlow />
      <SearchSection />
      <CoveredDomainsSection />
      <AdvisorPreviewSection />
      <MobileAppPromo />
    </>
  );
}
