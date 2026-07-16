import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Link as RouterLink } from "react-router-dom";
import { AppButton } from "../../../../../shared/ui";
import { ManagementPageHeader } from "../../../shared/ManagementPageHeader";
import { managementPaths } from "../../../routes/management.paths";

export function OffersPageHeader() {
  return (
    <ManagementPageHeader
      eyebrow="Offer management"
      title="Offers"
      description="Review the travel offers currently prepared for Voyana. This preview uses local mock data and does not change the public catalogue."
      actions={
        <AppButton
          component={RouterLink}
          to={managementPaths.addOffer}
          startIcon={<AddRoundedIcon fontSize="small" />}
        >
          Add offer
        </AppButton>
      }
    />
  );
}
