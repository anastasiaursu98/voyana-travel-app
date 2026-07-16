import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Dialog, DialogContent } from "@mui/material";

import { AppButton, AppTypography } from "../../../../../shared/ui";
import { VacationPackageDescription } from "../../../../vacation-packages/single-view/components/vacation-package-details/VacationPackageDescription";
import { VacationPackageDetailList } from "../../../../vacation-packages/single-view/components/vacation-package-details/VacationPackageDetailList";
import { VacationPackageDetailsImageGallery } from "../../../../vacation-packages/single-view/components/vacation-package-details/VacationPackageDetailsImageGallery";
import { VacationPackagePriceSummary } from "../../../../vacation-packages/single-view/components/vacation-package-details/VacationPackagePriceSummary";
import type { VacationPackageFact } from "../../../../vacation-packages/types/vacationPackageDetails.types";
import type { VacationPackageImage } from "../../../../vacation-packages/types/vacationPackage.types";

type AddOfferPreviewModalProps = {
  onClose: () => void;
  open: boolean;
};

const previewCoverImage: VacationPackageImage = {
  alt: "Amalfi Coast preview cover",
  url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=80",
};

const previewGalleryImages: VacationPackageImage[] = [
  {
    alt: "Coastal town preview gallery image",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    alt: "Hotel terrace preview gallery image",
    url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
  },
];

const previewPackageFacts: VacationPackageFact[] = [
  { id: "destination", icon: "location", label: "Destination", value: "Amalfi Coast, Italy" },
  { id: "duration", icon: "calendar", label: "Duration", value: "7 nights" },
  { id: "departure", icon: "transport", label: "Departure", value: "Bucharest" },
  { id: "availability", icon: "check", label: "Availability", value: "Limited places" },
];

const previewStayDetails: VacationPackageFact[] = [
  { id: "hotel", icon: "hotel", label: "Accommodation", value: "4★ hotel" },
  { id: "room", icon: "roomService", label: "Room", value: "Standard double room" },
  { id: "meal", icon: "breakfast", label: "Meal plan", value: "Breakfast included" },
  { id: "payment", icon: "briefcase", label: "Payment", value: "30% deposit option" },
];

const previewIncludedServices: VacationPackageFact[] = [
  { id: "support", icon: "check", label: "Support", value: "Voyana travel assistance" },
  { id: "rates", icon: "calendar", label: "Rates", value: "Seasonal pricing rules" },
  { id: "promotions", icon: "activity", label: "Promotions", value: "Early booking discount" },
];

export function AddOfferPreviewModal({
  onClose,
  open,
}: AddOfferPreviewModalProps) {
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "var(--voyana-radius-panel)",
            overflow: "hidden",
          },
        },
      }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] bg-(--voyana-color-background-card) px-5 py-4">
        <div>
          <AppTypography variant="caption" className="uppercase tracking-[0.18em] text-(--voyana-color-accent-teal-strong)">
            Offer preview
          </AppTypography>
          <AppTypography variant="caption" className="mt-1 text-(--voyana-color-text-muted)">
            Public view simulation before publishing
          </AppTypography>
        </div>
        <AppButton
          intent="icon"
          type="button"
          aria-label="Close offer preview"
          icon={<CloseRoundedIcon />}
          onClick={onClose}
          className="grid h-10 w-10 place-items-center rounded-(--voyana-radius-pill) text-(--voyana-color-text-strong) hover:bg-(--voyana-color-background-section)"
        />
      </div>

      <DialogContent sx={{ p: 0 }}>
        <div className="bg-(--voyana-color-background-card) p-5 lg:p-7">
          <VacationPackageDetailsImageGallery
            coverImage={previewCoverImage}
            galleryImages={previewGalleryImages}
          />

          <div className="grid w-full min-w-0 gap-6 bg-(--voyana-color-background-card) py-8 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] xl:items-start xl:gap-6">
            <div className="min-w-0">
              <VacationPackageDescription
                description="A polished public-style preview of how the offer will read once persistence is connected. This copy will eventually come from the add-offer form, but the visual shell should match the real offer page."
                location="Amalfi Coast, Italy"
                rating={4.8}
                title="Amalfi Coast Summer Escape"
              />

              <div className="mt-10 grid gap-6">
                <VacationPackageDetailList
                  gridClassName="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3"
                  items={previewPackageFacts}
                  title="Vacation package details"
                />
                <VacationPackageDetailList
                  gridClassName="grid gap-x-8 gap-y-4 sm:grid-cols-2"
                  items={previewStayDetails}
                  title="Stay details"
                />
                <VacationPackageDetailList
                  gridClassName="grid gap-x-8 gap-y-4 sm:grid-cols-2"
                  items={previewIncludedServices}
                  title="Included services"
                />
              </div>
            </div>

            <div className="grid gap-6 xl:sticky xl:top-24 xl:self-start">
              <VacationPackagePriceSummary ctaLabel="Reserve preview">
                <div className="grid gap-2 text-sm font-medium text-(--voyana-color-text-muted)">
                  <p>Beach holidays</p>
                  <p>7 nights · Breakfast included</p>
                  <AppTypography variant="sectionTitle" className="pt-2 text-(--voyana-color-text-strong)">
                    €1,890
                    <AppTypography component="span" variant="caption" className="text-(--voyana-color-text-muted)"> / person</AppTypography>
                  </AppTypography>
                </div>
              </VacationPackagePriceSummary>

              <div className="rounded-(--voyana-radius-panel) border border-[rgb(var(--voyana-rgb-accent-teal)/0.24)] bg-[rgb(var(--voyana-rgb-accent-teal)/0.08)] p-5">
                <AppTypography variant="label" className="text-(--voyana-color-accent-teal-strong)">Preview mode</AppTypography>
                <AppTypography variant="caption" className="mt-2 text-(--voyana-color-text-body)">
                  This modal reuses the public offer details layout. Admin-only copy stays outside the reusable offer components.
                </AppTypography>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
