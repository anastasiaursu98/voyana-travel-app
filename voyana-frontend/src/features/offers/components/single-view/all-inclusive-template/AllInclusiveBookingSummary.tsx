import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import { useState } from "react";
import {
  AppDateRangePicker,
  AppGuestsDropdown,
  AppOptionDropdown,
  type AppDateRangeValue,
  type AppGuestsValue,
} from "../../../../../shared/ui";
import { OfferPriceSummary } from "../../shared/components";
import {
  allInclusiveMealPlanOptions,
  allInclusiveRatePlanOptions,
  allInclusiveRoomTypeOptions,
  allInclusiveTransferOptions,
} from "./content/allInclusiveBookingOptions.content";

const getPackageGuestsLabel = ({
  adults,
  children,
  infants,
  pets,
}: AppGuestsValue) => {
  const parts: string[] = ["1 Room"];

  if (adults > 0) {
    parts.push(adults === 1 ? "1 Adult" : `${adults} Adults`);
  }

  if (children > 0) {
    parts.push(children === 1 ? "1 Child" : `${children} Children`);
  }

  if (infants > 0) {
    parts.push(infants === 1 ? "1 Infant" : `${infants} Infants`);
  }

  if (pets > 0) {
    parts.push(pets === 1 ? "1 Pet" : `${pets} Pets`);
  }

  return parts.join(", ");
};

export const AllInclusiveBookingSummary = () => {
  const [travelDates, setTravelDates] = useState<AppDateRangeValue>({
    startDate: "2026-07-10",
    endDate: "2026-07-17",
  });
  const [guests, setGuests] = useState<AppGuestsValue>({
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [roomType, setRoomType] = useState(
    allInclusiveRoomTypeOptions[0].value,
  );
  const [mealPlan, setMealPlan] = useState(
    allInclusiveMealPlanOptions[0].value,
  );
  const [transfer, setTransfer] = useState(
    allInclusiveTransferOptions[0].value,
  );
  const [ratePlan, setRatePlan] = useState(
    allInclusiveRatePlanOptions[0].value,
  );

  return (
    <OfferPriceSummary
      price={{
        amount: 600,
        currency: "EUR",
        unit: "person",
      }}
    >
      <div className="grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-1">
        <AppDateRangePicker
          label="Dates"
          size="compact"
          value={travelDates}
          onChange={setTravelDates}
        />
        <AppGuestsDropdown
          displayValue={getPackageGuestsLabel(guests)}
          label="Guests"
          size="compact"
          value={guests}
          onChange={setGuests}
        />

        <AppOptionDropdown
          icon={<KingBedOutlinedIcon fontSize="small" />}
          label="Room type"
          options={allInclusiveRoomTypeOptions}
          value={roomType}
          onChange={setRoomType}
        />
        <AppOptionDropdown
          icon={<LocalDiningOutlinedIcon fontSize="small" />}
          label="Meal plan"
          options={allInclusiveMealPlanOptions}
          value={mealPlan}
          onChange={setMealPlan}
        />
        <AppOptionDropdown
          icon={<AirportShuttleOutlinedIcon fontSize="small" />}
          label="Transfer"
          options={allInclusiveTransferOptions}
          value={transfer}
          onChange={setTransfer}
        />
        <AppOptionDropdown
          icon={<PolicyOutlinedIcon fontSize="small" />}
          label="Rate plan"
          options={allInclusiveRatePlanOptions}
          value={ratePlan}
          onChange={setRatePlan}
        />
      </div>
    </OfferPriceSummary>
  );
};
