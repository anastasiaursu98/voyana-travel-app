import { AppBadge } from "../../../../../shared/ui";
import type { AppBadgeTone } from "../../../../../shared/ui";
import type { OfferManagementStatus } from "../../types/offerManagement.types";

const statusTone: Record<OfferManagementStatus, AppBadgeTone> = {
  Active: "success",
  Draft: "warning",
  "Sold out": "danger",
};

export function OfferStatusBadge({ status }: { status: OfferManagementStatus }) {
  return (
    <AppBadge tone={statusTone[status]} showDot>
      {status}
    </AppBadge>
  );
}
