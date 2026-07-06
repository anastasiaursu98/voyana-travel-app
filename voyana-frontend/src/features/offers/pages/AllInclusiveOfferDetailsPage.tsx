import { PublicPageShell } from "../../../shared/components/PublicPageShell";
import { AllInclusiveOfferDetails } from "../components/single-view";

export function AllInclusiveOfferDetailsPage() {
  return (
    <PublicPageShell
      containerClassName="bg-white pt-3"
      spacing="detail"
    >
      <AllInclusiveOfferDetails />
    </PublicPageShell>
  );
}
