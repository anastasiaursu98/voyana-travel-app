import type { ReactNode } from "react";
import { AppButton } from "../../../../../shared/ui";
import type { VacationPackagePriceBreakdownItem } from "../../../types/vacationPackageDetails.types";
import type { VacationPackagePrice } from "../../../types/vacationPackage.types";

type VacationPackagePriceSummaryProps = {
  breakdown?: readonly VacationPackagePriceBreakdownItem[];
  children?: ReactNode;
  ctaLabel?: string;
  onReserve?: () => void;
  price: VacationPackagePrice;
};

const formatPrice = ({
  amount,
  currency,
}: Pick<VacationPackagePrice, "amount" | "currency">) =>
  new Intl.NumberFormat("en-US", {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);

export function VacationPackagePriceSummary({
  breakdown = [],
  children,
  ctaLabel = "Reserve",
  onReserve,
  price,
}: VacationPackagePriceSummaryProps) {
  return (
    <aside className="w-full min-w-0 rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.96)] bg-white p-4 shadow-none sm:p-5 xl:sticky xl:top-24 xl:self-start">
      <h2 className="text-xl font-medium tracking-normal text-(--voyana-color-text-primary)">
        Details
      </h2>

      <div className="my-4 border-t border-(--voyana-color-border-subtle)" />

      {children}

      {breakdown.length > 0 ? (
        <div className={children ? "mt-4 grid gap-2" : "grid gap-2"}>
          {breakdown.map((item) => (
            <p
              key={item.id}
              className="flex items-center justify-between gap-4 text-sm font-medium text-(--voyana-color-text-muted)"
            >
              <span>{item.label}</span>
              <span className="text-right text-(--voyana-color-text-body)">
                {formatPrice(item)}
              </span>
            </p>
          ))}
        </div>
      ) : null}

      <div className="mt-4 rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] bg-white px-3.5 py-4">
        <p className="flex items-center justify-between gap-4 text-sm text-(--voyana-color-text-muted)">
          <span>Pricing</span>
          <span className="text-right text-lg font-medium text-(--voyana-color-text-primary)">
            {formatPrice(price)}
            {price.unit ? (
              <span className="text-base font-medium text-(--voyana-color-text-primary)">
                {" "}
                /{price.unit}
              </span>
            ) : null}
          </span>
        </p>
      </div>

      <div className="mt-4 w-full">
        <AppButton
          type="button"
          fullWidth
          sx={{ borderRadius: 1.5, minHeight: 48 }}
          onClick={onReserve}
        >
          {ctaLabel}
        </AppButton>
      </div>
    </aside>
  );
}
