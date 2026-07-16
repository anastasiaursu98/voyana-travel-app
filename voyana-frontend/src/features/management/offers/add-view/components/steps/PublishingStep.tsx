import { AppTypography } from "../../../../../../shared/ui";
import { AddOfferFormSection } from "../AddOfferFormSection";

export function PublishingStep() {
  return (
    <AddOfferFormSection
      number="7"
      title="Publishing"
      description="Choose how the offer should appear once persistence is connected."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex min-h-20 cursor-pointer items-start gap-3 rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] p-4">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-(--voyana-color-accent-teal-strong)" />
          <span>
            <AppTypography variant="formTitle" className="text-(--voyana-color-text-strong)">Active offer</AppTypography>
            <AppTypography variant="caption" className="mt-1 text-(--voyana-color-text-muted)">Visible in the public catalogue.</AppTypography>
          </span>
        </label>
        <label className="flex min-h-20 cursor-pointer items-start gap-3 rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] p-4">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-(--voyana-color-accent-teal-strong)" />
          <span>
            <AppTypography variant="formTitle" className="text-(--voyana-color-text-strong)">Featured offer</AppTypography>
            <AppTypography variant="caption" className="mt-1 text-(--voyana-color-text-muted)">Highlighted in promotional areas.</AppTypography>
          </span>
        </label>
      </div>
    </AddOfferFormSection>
  );
}
