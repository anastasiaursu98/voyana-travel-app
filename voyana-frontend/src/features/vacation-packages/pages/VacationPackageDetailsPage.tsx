import { PublicPageShell } from "../../../shared/components/PublicPageShell";
import { VacationPackageDetails } from "../components/single-view";

export function VacationPackageDetailsPage() {
  return (
    <PublicPageShell containerClassName="bg-white pt-3" spacing="detail">
      <VacationPackageDetails />
    </PublicPageShell>
  );
}
