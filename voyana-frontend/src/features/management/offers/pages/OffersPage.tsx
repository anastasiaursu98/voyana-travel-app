import { PublicPageShell } from "../../../../shared/components/PublicPageShell";
import { OffersManagementPanel } from "../list-view/components/OffersManagementPanel";
import { OffersPageHeader } from "../list-view/components/OffersPageHeader";
import { mockOffers } from "../data/offerManagement.mock";

export function OffersPage() {
  return (
    <PublicPageShell className="bg-(--voyana-color-background-section)!">
      <div className="grid gap-7">
        <OffersPageHeader />
        <OffersManagementPanel offers={mockOffers} />
      </div>
    </PublicPageShell>
  );
}
