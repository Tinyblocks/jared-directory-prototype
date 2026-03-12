import { HomePrimaryFlow } from "@/components/HomePrimaryFlow";
import { PartnersBanner } from "@/components/PartnersBanner";
import { SearchSection } from "@/components/SearchSection";
import { HomeHowItWorksSection } from "@/components/HomeHowItWorksSection";
import { CoveredDomainsSection } from "@/components/CoveredDomainsSection";
import { AdvisorPreviewSection } from "@/components/AdvisorPreviewSection";
import { MobileAppPromo } from "@/components/MobileAppPromo";

export default function HomePage() {
  return (
    <>
      <HomePrimaryFlow />
      <PartnersBanner />
      <SearchSection />
      <HomeHowItWorksSection />
      <CoveredDomainsSection />
      <AdvisorPreviewSection />
      <MobileAppPromo />
    </>
  );
}
