import { AppTypography } from "../../../../../shared/ui";
import type { PropsWithChildren } from "react";

type VacationPackageSectionPanelProps = PropsWithChildren<{
  className?: string;
  description?: string;
  title: string;
}>;

export function VacationPackageSectionPanel({
  children,
  className = "",
  description,
  title,
}: VacationPackageSectionPanelProps) {
  return (
    <section
      className={`rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.96)] bg-(--voyana-color-background-card) p-4 shadow-none sm:p-5 ${className}`}
    >
      <div>
        <AppTypography variant="cardTitle" className=" leading-none tracking-normal text-(--voyana-color-text-primary)">
          {title}
        </AppTypography>
        {description ? (
          <p className="mt-2 text-sm font-medium leading-6 text-(--voyana-color-text-body)">
            {description}
          </p>
        ) : null}
      </div>

      <div className="my-4 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.62)]" />

      {children}
    </section>
  );
}
