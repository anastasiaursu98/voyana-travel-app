import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import type { VacationPackagePolicy } from "../../../types/vacationPackageDetails.types";
import { VacationPackageSectionPanel } from "./VacationPackageSectionPanel";

type VacationPackagePoliciesProps = {
  policies: readonly VacationPackagePolicy[];
  title?: string;
};

export function VacationPackagePolicies({
  policies,
  title = "Policies",
}: VacationPackagePoliciesProps) {
  if (policies.length === 0) {
    return null;
  }

  return (
    <VacationPackageSectionPanel title={title}>
      <div className="grid gap-4">
        {policies.map((policy) => (
          <div key={policy.id} className="flex min-w-0 items-start gap-3">
            <PolicyOutlinedIcon
              fontSize="small"
              className="mt-0.5 shrink-0 text-[rgb(var(--voyana-rgb-text-muted)/0.72)]"
            />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-(--voyana-color-text-primary)">
                {policy.title}
              </h3>
              <p className="mt-1 text-sm font-medium leading-6 text-(--voyana-color-text-body)">
                {policy.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </VacationPackageSectionPanel>
  );
}
