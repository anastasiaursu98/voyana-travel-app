import type { VacationPackage } from "../../..";
import type { VacationPackageDetailsSidebarSection } from "../../types/vacationPackageDetailsSections.types";
import { VacationPackagePriceSummary } from "./VacationPackagePriceSummary";

type VacationPackageDetailsSidebarProps = {
  ctaLabel?: string;
  vacationPackage: VacationPackage;
  sections: VacationPackageDetailsSidebarSection[];
};

export function VacationPackageDetailsSidebar({
  ctaLabel = "Check availability",
  vacationPackage,
  sections,
}: VacationPackageDetailsSidebarProps) {
  return (
    <div className="grid gap-6 xl:sticky xl:top-24 xl:self-start">
      {sections.includes("priceSummary") ? (
        <VacationPackagePriceSummary ctaLabel={ctaLabel}>
          <div className="grid gap-2 text-sm font-medium text-(--voyana-color-text-muted)">
            <p>{vacationPackage.category.label}</p>
            {vacationPackage.travelPeriod.duration ? (
              <p>{vacationPackage.travelPeriod.duration}</p>
            ) : null}
          </div>
        </VacationPackagePriceSummary>
      ) : null}
    </div>
  );
}
