import { OfferDescription } from "../../shared/components";
import { tourTemplateHero } from "./content/tourTemplate.content";

export function TourTemplateOverview() {
  return (
    <OfferDescription
      description={tourTemplateHero.description}
      location={tourTemplateHero.location}
      rating={tourTemplateHero.rating}
      title={tourTemplateHero.title}
    />
  );
}
