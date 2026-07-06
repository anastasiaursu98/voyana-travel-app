import { CuratedCollectionsSection } from "../components/curated-collections/CuratedCollectionsSection";
import { HeroSection } from "../components/hero/HeroSection";
import { FlexibleInspirationSection } from "../components/inspiration/FlexibleInspirationSection";
import { OfferCategoriesSection } from "../components/offer-categories/OfferCategoriesSection";
import { PopularDestinationsSection } from "../components/popular-destinations/PopularDestinationsSection";
import { SeasonalCampaignsSection } from "../components/seasonal-campaigns/SeasonalCampaignsSection";
import { SpecialOffersSection } from "../components/special-offers/SpecialOffersSection";
import { TravelGuidesSection } from "../components/travel-guides/TravelGuidesSection";
import { ReviewsTrustSection } from "../components/trust/ReviewsTrustSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <SpecialOffersSection />
      <FlexibleInspirationSection />
      <PopularDestinationsSection />
      <OfferCategoriesSection />
      <SeasonalCampaignsSection />
      <CuratedCollectionsSection />
      <ReviewsTrustSection />
      <TravelGuidesSection />
    </>
  );
}
