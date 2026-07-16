import { AppBadge } from "../../../../../shared/ui";
import { ManagementPageHeader } from "../../../shared/ManagementPageHeader";

export function AddOfferPageHeader() {
  return (
    <ManagementPageHeader
      title="Add a new offer"
      titleSize="small"
      actions={<AppBadge tone="warning">UI preview · not saved</AppBadge>}
    />
  );
}
