import { PublicPageShell } from "../../../shared/components/PublicPageShell";
import { VacationPackageDetails } from "../single-view";

export function VacationPackageDetailsPage() {
  return (
    <PublicPageShell containerClassName="bg-(--voyana-color-background-card) pt-3" spacing="detail">
      <VacationPackageDetails />
    </PublicPageShell>
  );
}
