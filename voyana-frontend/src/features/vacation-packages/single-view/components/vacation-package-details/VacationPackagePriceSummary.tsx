import type { ReactNode } from "react";
import { AppButton } from "../../../../../shared/ui";

type VacationPackagePriceSummaryProps = {
  children?: ReactNode;
  ctaLabel?: string;
  onReserve?: () => void;
};

export function VacationPackagePriceSummary({
  children,
  ctaLabel = "Reserve",
  onReserve,
}: VacationPackagePriceSummaryProps) {
  return (
    <aside className="w-full min-w-0 rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.96)] bg-white p-4 shadow-none sm:p-5 xl:sticky xl:top-24 xl:self-start">
      {children}

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
