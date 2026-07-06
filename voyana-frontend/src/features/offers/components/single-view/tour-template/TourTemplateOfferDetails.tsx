import { routes } from "../../../../../app/router/routes";
import {
  OfferDetailList,
  OfferDetailsTopBar,
  OfferHighlights,
} from "../../shared/components";
import { TourTemplateBookingCard } from "./TourTemplateBookingCard";
import { TourTemplateImageGallery } from "./TourTemplateImageGallery";
import { TourTemplateItinerary } from "./TourTemplateItinerary";
import { TourTemplateOverview } from "./TourTemplateOverview";
import {
  tourTemplateFacts,
  tourTemplateHighlights,
  tourTemplateImages,
} from "./content/tourTemplate.content";

export function TourTemplateOfferDetails() {
  return (
    <>
      <OfferDetailsTopBar
        backLabel="Search"
        backTo={routes.home}
        currentLabel="Japan Cultural Tour"
      />

      <TourTemplateImageGallery
        coverImage={tourTemplateImages.coverImage}
        galleryImages={tourTemplateImages.galleryImages}
      />

      <div className="grid w-full min-w-0 gap-6 bg-white py-8 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] xl:items-start xl:gap-6">
        <div className="min-w-0 bg-white">
          <TourTemplateOverview />

          <div className="mt-10 grid gap-6">
            <OfferDetailList
              gridClassName="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3"
              items={tourTemplateFacts}
              title="Tour details"
              truncateText
            />
            <OfferHighlights
              highlights={tourTemplateHighlights}
              title="Highlights"
            />
            <TourTemplateItinerary />
          </div>
        </div>

        <TourTemplateBookingCard />
      </div>
    </>
  );
}
