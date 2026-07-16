import { AddOfferFormSection } from "../AddOfferFormSection";
import { AddOfferSelectField } from "../AddOfferSelectField";
import {
  formInputClassName,
  formLabelClassName,
  formLabelStyle,
} from "../../../../../../shared/ui";

export function BasicsStep() {
  return (
    <AddOfferFormSection
      number="1"
      title="Offer basics"
      description="Name the offer and connect it to its destination and travel category."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={`sm:col-span-2 ${formLabelClassName}`} style={formLabelStyle}>
          Offer name <span className="text-(--voyana-color-danger)">*</span>
          <input className={formInputClassName} placeholder="e.g. Amalfi Coast Summer Escape" />
        </label>
        <label className={formLabelClassName} style={formLabelStyle}>
          Offer code <span className="text-(--voyana-color-danger)">*</span>
          <input className={formInputClassName} placeholder="VOY-IT-001" />
        </label>
        <label className={formLabelClassName} style={formLabelStyle}>
          URL slug <span className="text-(--voyana-color-danger)">*</span>
          <input className={formInputClassName} placeholder="amalfi-coast-summer-escape" />
        </label>
        <AddOfferSelectField
          label="Destination"
          required
          defaultValue="AMALFI"
          options={[
            { label: "Amalfi Coast, Italy", value: "AMALFI" },
            { label: "Kyoto, Japan", value: "KYOTO" },
            { label: "Bora Bora, French Polynesia", value: "BORA_BORA" },
          ]}
        />
        <AddOfferSelectField
          label="Category"
          required
          defaultValue="BEACH_HOLIDAYS"
          options={[
            { label: "Beach holidays", value: "BEACH_HOLIDAYS" },
            { label: "City breaks", value: "CITY_BREAKS" },
            { label: "Culture & history", value: "CULTURE_HISTORY" },
            { label: "Adventure & outdoor", value: "ADVENTURE_OUTDOOR" },
          ]}
        />
        <label className={`sm:col-span-2 ${formLabelClassName}`} style={formLabelStyle}>
          Description <span className="text-(--voyana-color-danger)">*</span>
          <textarea
            rows={5}
            className={`${formInputClassName} h-auto resize-y py-3`}
            placeholder="Describe the experience, highlights, and what makes this offer special."
          />
          <span className="mt-2 block text-xs font-(--voyana-font-weight-label) text-(--voyana-color-text-muted)">
            Recommended length: 120–300 characters.
          </span>
        </label>
      </div>
    </AddOfferFormSection>
  );
}
