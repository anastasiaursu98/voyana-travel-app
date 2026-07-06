import { PublicPageShell } from "../../../shared/components/PublicPageShell";
import { TourTemplateOfferDetails } from "../components/single-view";

export function TourTemplateOfferDetailsPage() {
  return (
    <PublicPageShell containerClassName="bg-white pt-3" spacing="detail">
      <TourTemplateOfferDetails />
    </PublicPageShell>
  );
}
