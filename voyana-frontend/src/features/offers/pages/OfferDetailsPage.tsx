import { PublicPageShell } from "../../../shared/components/PublicPageShell";
import { OfferDetails } from "../components/single-view";

export function OfferDetailsPage() {
  return (
    <PublicPageShell containerClassName="bg-white pt-3" spacing="detail">
      <OfferDetails />
    </PublicPageShell>
  );
}
