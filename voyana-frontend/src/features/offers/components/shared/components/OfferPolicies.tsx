import PolicyOutlinedIcon from "@mui/icons-material/PolicyOutlined";
import type { OfferPolicy } from "../../../types/offerDetails.types";
import { OfferSectionPanel } from "./OfferSectionPanel";

type OfferPoliciesProps = {
  policies: readonly OfferPolicy[];
  title?: string;
};

export function OfferPolicies({
  policies,
  title = "Policies",
}: OfferPoliciesProps) {
  if (policies.length === 0) {
    return null;
  }

  return (
    <OfferSectionPanel title={title}>
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
    </OfferSectionPanel>
  );
}
