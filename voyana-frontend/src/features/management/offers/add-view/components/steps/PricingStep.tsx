import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import { AppBadge, AppButton, AppSurface, AppTypography } from "../../../../../../shared/ui";
import { AddOfferCalendarField } from "../AddOfferCalendarField";
import { AddOfferFormSection } from "../AddOfferFormSection";
import { AddOfferSelectField } from "../AddOfferSelectField";
import {
  formInputClassName,
  formLabelClassName,
  formLabelStyle,
} from "../../../../../../shared/ui";

const priceVariants = [
  { name: "Standard double room", amount: "1890", occupancy: "2 adults", room: "Double room" },
  { name: "Family room", amount: "2890", occupancy: "2 adults + 2 children", room: "Family room" },
];

export function PricingStep() {
  return (
    <>
      <AddOfferFormSection
        number="3"
        title="Pricing strategy & variants"
        description="Choose how prices are calculated, then add one or more bookable room or package variants."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <AddOfferSelectField
            label="Pricing model"
            required
            defaultValue="PER_PERSON_PACKAGE"
            options={[
              { label: "Per person / full package", value: "PER_PERSON_PACKAGE" },
              { label: "Per full package", value: "PER_PACKAGE" },
              { label: "Per room / night", value: "PER_ROOM_NIGHT" },
              { label: "Per person / night", value: "PER_PERSON_NIGHT" },
              { label: "Price on request", value: "ON_REQUEST" },
            ]}
          />
          <AddOfferSelectField
            label="Default currency"
            defaultValue="EUR"
            options={[
              { label: "EUR", value: "EUR" },
              { label: "USD", value: "USD" },
              { label: "RON", value: "RON" },
            ]}
          />
          <AddOfferSelectField
            label="Display price"
            defaultValue="TOTAL_AND_UNIT"
            options={[
              { label: "Total and unit price", value: "TOTAL_AND_UNIT" },
              { label: "Total only", value: "TOTAL_ONLY" },
              { label: "Starting from", value: "FROM_PRICE" },
            ]}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <AppTypography variant="formTitle" className="text-(--voyana-color-text-strong)">Price variants</AppTypography>
            <p className="mt-1 text-xs font-(--voyana-font-weight-regular) text-(--voyana-color-text-muted)">Room, occupancy, board, and price combinations.</p>
          </div>
          <AppButton intent="dark" type="button" className="min-h-10 px-4 text-xs" startIcon={<AddRoundedIcon className="text-[1rem]" />}>
            Add variant
          </AppButton>
        </div>

        <div className="mt-4 grid gap-4">
          {priceVariants.map((variant, index) => (
            <AppSurface key={variant.name} variant="plain" className="overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[rgb(var(--voyana-rgb-background-section)/0.55)] px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <AppBadge tone="teal">{index + 1}</AppBadge>
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-(--voyana-font-weight-label) text-(--voyana-color-text-strong)">{variant.name}</h4>
                    <p className="mt-0.5 text-xs font-(--voyana-font-weight-regular) text-(--voyana-color-text-muted)">
                      {variant.room} · {variant.occupancy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-(--voyana-font-weight-label) text-(--voyana-color-text-strong)">
                    €{variant.amount}
                  </span>
                  <AppButton intent="control" type="button" aria-label={`Remove ${variant.name}`} icon={<DeleteOutlineRoundedIcon className="text-[1.1rem]" />} className="grid h-9 w-9 place-items-center rounded-(--voyana-radius-card) text-(--voyana-color-danger) hover:bg-(--voyana-color-danger-surface)" />
                </div>
              </div>
              <div className="grid gap-4 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] p-4 sm:grid-cols-2 lg:grid-cols-3">
                <label className={formLabelClassName} style={formLabelStyle}>
                  Variant name
                  <input className={formInputClassName} defaultValue={variant.name} />
                </label>
                <label className={formLabelClassName} style={formLabelStyle}>
                  Room type
                  <input className={formInputClassName} defaultValue={variant.room} />
                </label>
                <label className={formLabelClassName} style={formLabelStyle}>
                  Occupancy
                  <input className={formInputClassName} defaultValue={variant.occupancy} />
                </label>
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
                <label className={formLabelClassName} style={formLabelStyle}>
                  Selling price
                  <input type="number" className={formInputClassName} defaultValue={variant.amount} />
                </label>
                <label className={formLabelClassName} style={formLabelStyle}>
                  Original price
                  <input type="number" className={formInputClassName} placeholder="Optional" />
                </label>
                <label className={formLabelClassName} style={formLabelStyle}>
                  Included nights
                  <input type="number" className={formInputClassName} defaultValue="7" />
                </label>
                <label className={formLabelClassName} style={formLabelStyle}>
                  Variant inventory
                  <input type="number" className={formInputClassName} placeholder="6" />
                </label>
                <label className={formLabelClassName} style={formLabelStyle}>
                  Extra child price
                  <input type="number" className={formInputClassName} placeholder="Optional" />
                </label>
              </div>
            </AppSurface>
          ))}
        </div>
      </AddOfferFormSection>

      <AddOfferFormSection
        number="4"
        title="Rate periods & promotions"
        description="Set seasonal or weekday rates and define controlled discount rules."
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <AppTypography variant="formTitle" className="text-(--voyana-color-text-strong)">Seasonal rate periods</AppTypography>
            <p className="mt-1 text-xs font-(--voyana-font-weight-regular) text-(--voyana-color-text-muted)">Applied only to nightly pricing models.</p>
          </div>
          <AppButton intent="secondary" surface="light" type="button" className="min-h-10 px-4 text-xs" startIcon={<AddRoundedIcon className="text-[1rem]" />}>
            Add rate period
          </AppButton>
        </div>
        <AppSurface variant="plain" className="mt-4 p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className={formLabelClassName} style={formLabelStyle}>Period name<input className={formInputClassName} defaultValue="High season" /></label>
            <AddOfferCalendarField label="From" />
            <AddOfferCalendarField label="Until" />
            <label className={formLabelClassName} style={formLabelStyle}>Minimum nights<input type="number" className={formInputClassName} defaultValue="3" /></label>
            <label className={formLabelClassName} style={formLabelStyle}>Sun–Thu / night<input type="number" className={formInputClassName} placeholder="120" /></label>
            <label className={formLabelClassName} style={formLabelStyle}>Fri–Sat / night<input type="number" className={formInputClassName} placeholder="150" /></label>
            <label className={formLabelClassName} style={formLabelStyle}>Priority<input type="number" className={formInputClassName} defaultValue="1" /></label>
            <label className={formLabelClassName} style={formLabelStyle}>Availability<input type="number" className={formInputClassName} placeholder="8" /></label>
          </div>
        </AppSurface>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.82)] pt-6">
          <div>
            <AppTypography variant="formTitle" className="text-(--voyana-color-text-strong)">Promotion rules</AppTypography>
            <p className="mt-1 text-xs font-(--voyana-font-weight-regular) text-(--voyana-color-text-muted)">Discounts are applied by eligibility, not by manually replacing prices.</p>
          </div>
          <AppButton intent="secondary" surface="light" type="button" className="min-h-10 px-4 text-xs" startIcon={<AddRoundedIcon className="text-[1rem]" />}>
            Add promotion
          </AppButton>
        </div>
        <AppSurface variant="soft" className="mt-4 border-[rgb(var(--voyana-rgb-accent-teal)/0.28)] bg-[rgb(var(--voyana-rgb-accent-teal)/0.055)] p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className={formLabelClassName} style={formLabelStyle}>Promotion name<input className={formInputClassName} defaultValue="Early booking" /></label>
            <AddOfferSelectField
              label="Discount type"
              defaultValue="PERCENTAGE"
              options={[
                { label: "Percentage", value: "PERCENTAGE" },
                { label: "Fixed amount", value: "FIXED" },
                { label: "Free night", value: "FREE_NIGHT" },
              ]}
            />
            <label className={formLabelClassName} style={formLabelStyle}>Discount value<input type="number" className={formInputClassName} defaultValue="15" /></label>
            <AddOfferCalendarField label="Booking until" />
            <AddOfferCalendarField label="Stay from" />
            <AddOfferCalendarField label="Stay until" />
            <label className={formLabelClassName} style={formLabelStyle}>Minimum nights<input type="number" className={formInputClassName} placeholder="5" /></label>
            <label className={formLabelClassName} style={formLabelStyle}>Maximum uses<input type="number" className={formInputClassName} placeholder="Optional" /></label>
            <AddOfferSelectField
              label="Stacking"
              defaultValue="EXCLUSIVE"
              options={[
                { label: "Cannot combine", value: "EXCLUSIVE" },
                { label: "Can combine", value: "STACKABLE" },
              ]}
            />
          </div>
          <fieldset className="mt-5">
            <legend className={formLabelClassName} style={formLabelStyle}>Applicable stay days</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <label key={day} className="inline-flex cursor-pointer items-center gap-2 rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] bg-(--voyana-color-background-card) px-3 py-2 text-xs font-(--voyana-font-weight-label) text-(--voyana-color-text-muted)">
                  <input type="checkbox" defaultChecked className="accent-(--voyana-color-accent-teal-strong)" />
                  {day}
                </label>
              ))}
            </div>
          </fieldset>
        </AppSurface>
      </AddOfferFormSection>
    </>
  );
}
