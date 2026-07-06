import { FinalCtaSection } from "../components/final-cta/FinalCtaSection";
import { HeroSection } from "../components/hero/HeroSection";
import { HowItWorksSection } from "../components/how-it-works/HowItWorksSection";
import { FlexibleInspirationSection } from "../components/inspiration/FlexibleInspirationSection";
import { PopularDestinationsSection } from "../components/popular-destinations/PopularDestinationsSection";
import { SpecialOffersSection } from "../components/special-offers/SpecialOffersSection";
import { TripStyleSection } from "../components/trip-style/TripStyleSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TripStyleSection />
      <FlexibleInspirationSection />
      <SpecialOffersSection />
      <HowItWorksSection />
      <PopularDestinationsSection />

      <FinalCtaSection />
    </>
  );
}
