import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

import {
  AppTypography,
  formInputClassName,
  formLabelClassName,
  formLabelStyle,
} from "../../../../../../shared/ui";
import { AddOfferFormSection } from "../AddOfferFormSection";
import { AddOfferSelectField } from "../AddOfferSelectField";

export function DetailsStep() {
  return (
    <>
      <AddOfferFormSection
        number="5"
        title="Taxes, fees & payment terms"
        description="Make the payable total transparent and define how customers will pay for the booking."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AddOfferSelectField
            label="Tax display"
            defaultValue="INCLUDED"
            options={[
              { label: "Included in displayed price", value: "INCLUDED" },
              { label: "Added at checkout", value: "EXCLUDED" },
            ]}
          />
          <label className={formLabelClassName} style={formLabelStyle}>VAT / tax percentage<input type="number" className={formInputClassName} placeholder="19" /></label>
          <label className={formLabelClassName} style={formLabelStyle}>City tax<input type="number" className={formInputClassName} placeholder="Optional" /></label>
          <AddOfferSelectField
            label="City tax basis"
            defaultValue="PERSON_NIGHT"
            options={[
              { label: "Per person / night", value: "PERSON_NIGHT" },
              { label: "Per room / night", value: "ROOM_NIGHT" },
              { label: "Per stay", value: "STAY" },
              { label: "Percentage", value: "PERCENTAGE" },
            ]}
          />
          <label className={formLabelClassName} style={formLabelStyle}>Mandatory service fee<input type="number" className={formInputClassName} placeholder="Optional" /></label>
          <AddOfferSelectField
            label="Service fee basis"
            defaultValue="STAY"
            options={[
              { label: "Per stay", value: "STAY" },
              { label: "Per night", value: "NIGHT" },
              { label: "Percentage", value: "PERCENTAGE" },
            ]}
          />
        </div>

        <div className="mt-7 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.82)] pt-6">
          <AppTypography variant="formTitle" className="text-(--voyana-color-text-strong)">Customer payment schedule</AppTypography>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AddOfferSelectField
              label="Payment option"
              defaultValue="FULL_OR_DEPOSIT"
              options={[
                { label: "Full payment only", value: "FULL" },
                { label: "Deposit only", value: "DEPOSIT" },
                { label: "Full payment or deposit", value: "FULL_OR_DEPOSIT" },
              ]}
            />
            <label className={formLabelClassName} style={formLabelStyle}>Deposit percentage<input type="number" className={formInputClassName} defaultValue="30" /></label>
            <label className={formLabelClassName} style={formLabelStyle}>Balance due before arrival<input type="number" className={formInputClassName} defaultValue="30" /></label>
            <AddOfferSelectField
              label="Payment currency"
              defaultValue="OFFER_CURRENCY"
              options={[
                { label: "Offer currency", value: "OFFER_CURRENCY" },
                { label: "Always RON", value: "RON" },
                { label: "Always EUR", value: "EUR" },
              ]}
            />
            <AddOfferSelectField
              label="Refund policy"
              defaultValue="BY_POLICY"
              options={[
                { label: "According to cancellation policy", value: "BY_POLICY" },
                { label: "Non-refundable", value: "NON_REFUNDABLE" },
                { label: "Fully refundable", value: "FULLY_REFUNDABLE" },
              ]}
            />
            <label className={formLabelClassName} style={formLabelStyle}>Payment expiry<input type="number" className={formInputClassName} defaultValue="20" /><span className="mt-1.5 block text-xs font-(--voyana-font-weight-label) text-(--voyana-color-text-muted)">Minutes before inventory is released.</span></label>
          </div>
        </div>
      </AddOfferFormSection>

      <AddOfferFormSection
        number="6"
        title="Media & accommodation"
        description="Add the cover visual and the main stay details shown to travellers."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={`sm:col-span-2 ${formLabelClassName}`} style={formLabelStyle}>
            Cover image URL <span className="text-(--voyana-color-danger)">*</span>
            <div className="relative">
              <CloudUploadRoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[1.2rem] text-(--voyana-color-text-muted)" />
              <input className={`${formInputClassName} pl-11`} placeholder="https://images.example.com/offer-cover.jpg" />
            </div>
          </label>
          <AddOfferSelectField
            label="Accommodation type"
            defaultValue="HOTEL"
            options={[
              { label: "Hotel", value: "HOTEL" },
              { label: "Resort", value: "RESORT" },
              { label: "Apartment", value: "APARTMENT" },
              { label: "Villa", value: "VILLA" },
            ]}
          />
          <AddOfferSelectField
            label="Meal plan"
            defaultValue="BREAKFAST"
            options={[
              { label: "Room only", value: "ROOM_ONLY" },
              { label: "Breakfast", value: "BREAKFAST" },
              { label: "Half board", value: "HALF_BOARD" },
              { label: "All inclusive", value: "ALL_INCLUSIVE" },
            ]}
          />
          <AddOfferSelectField
            label="Rating"
            defaultValue="4"
            options={[
              { label: "5 stars", value: "5" },
              { label: "4 stars", value: "4" },
              { label: "3 stars", value: "3" },
            ]}
          />
          <label className={formLabelClassName} style={formLabelStyle}>
            Departure city
            <input className={formInputClassName} placeholder="Bucharest" />
          </label>
        </div>
      </AddOfferFormSection>
    </>
  );
}
