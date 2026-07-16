import { ManagementPanel } from "../../../shared/ManagementPanel";
import type { OfferManagementItem } from "../../types/offerManagement.types";
import { OffersMobileCards } from "./OffersMobileCards";
import { OffersTable } from "./OffersTable";
import { OffersToolbar } from "./OffersToolbar";

type OffersManagementPanelProps = {
  offers: OfferManagementItem[];
};

export function OffersManagementPanel({ offers }: OffersManagementPanelProps) {
  return (
    <ManagementPanel
      footerStart={`Showing 1-${offers.length} of ${offers.length}`}
      footerEnd="Page 1 of 1"
    >
      <OffersToolbar offersCount={offers.length} />
      <OffersTable offers={offers} />
      <OffersMobileCards offers={offers} />
    </ManagementPanel>
  );
}
