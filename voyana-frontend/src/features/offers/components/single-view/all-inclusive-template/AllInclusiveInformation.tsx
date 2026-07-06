import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalParkingRoundedIcon from "@mui/icons-material/LocalParkingRounded";
import type { OfferLogistics } from "../../../types/offer.types";
import { OfferDetailList } from "../../shared/components";

const resortInformation = [
  {
    icon: AccessTimeRoundedIcon,
    id: "check-in",
    label: "Check in",
    value: "3:00 pm",
  },
  {
    icon: AccessTimeRoundedIcon,
    id: "check-out",
    label: "Check out",
    value: "12:00 pm",
  },
  {
    icon: InfoOutlinedIcon,
    id: "minimum-age",
    label: "Minimum age to check in",
    value: "17",
  },
  {
    icon: LocalParkingRoundedIcon,
    id: "beach-access",
    label: "Beach access",
    value: "Private resort beach",
  },
];

type AllInclusiveInformationProps = {
  stayDetails?: OfferLogistics["stayDetails"];
};

export const AllInclusiveInformation = ({
  stayDetails,
}: AllInclusiveInformationProps) => {
  return (
    <OfferDetailList
      items={
        stayDetails && stayDetails.length > 0 ? stayDetails : resortInformation
      }
      title="Resort Information"
      truncateText
    />
  );
};
