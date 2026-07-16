import { AddOfferCalendarField } from "../AddOfferCalendarField";
import { AddOfferFormSection } from "../AddOfferFormSection";
import { AddOfferSelectField } from "../AddOfferSelectField";
import {
  formInputClassName,
  formLabelClassName,
  formLabelStyle,
} from "../../../../../../shared/ui";

export function AvailabilityStep() {
  return (
    <AddOfferFormSection
      number="2"
      title="Travel period & inventory"
      description="Define when the offer can be booked, when guests can travel, and how much inventory is available."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AddOfferCalendarField label="Sales start" />
        <AddOfferCalendarField label="Booking deadline" />
        <AddOfferSelectField
          label="Inventory type"
          defaultValue="ROOMS"
          options={[
            { label: "Rooms", value: "ROOMS" },
            { label: "Places", value: "PLACES" },
            { label: "Packages", value: "PACKAGES" },
            { label: "On request", value: "ON_REQUEST" },
          ]}
        />
        <AddOfferCalendarField label="Travel from" required />
        <AddOfferCalendarField label="Travel until" required />
        <label className={formLabelClassName} style={formLabelStyle}>
          Available units
          <input type="number" className={formInputClassName} placeholder="12" />
        </label>
        <label className={formLabelClassName} style={formLabelStyle}>
          Minimum nights
          <input type="number" className={formInputClassName} placeholder="2" />
        </label>
        <label className={formLabelClassName} style={formLabelStyle}>
          Maximum nights
          <input type="number" className={formInputClassName} placeholder="14" />
        </label>
        <AddOfferSelectField
          label="Availability status"
          defaultValue="AVAILABLE"
          options={[
            { label: "Available", value: "AVAILABLE" },
            { label: "Limited", value: "LIMITED" },
            { label: "On request", value: "ON_REQUEST" },
            { label: "Sold out", value: "SOLD_OUT" },
          ]}
        />
      </div>
    </AddOfferFormSection>
  );
}
