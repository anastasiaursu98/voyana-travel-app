import type { ReactNode } from "react";

import { AppTypography } from "../../../../../shared/ui";

type AddOfferFormSectionProps = {
  children: ReactNode;
  description: string;
  number: string;
  title: string;
};

export function AddOfferFormSection({
  children,
  description,
  number,
  title,
}: AddOfferFormSectionProps) {
  return (
    <section className="border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] pb-7 last:border-b-0 last:pb-0">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-(--voyana-radius-pill) bg-(--voyana-color-background-dark) text-xs font-(--voyana-font-weight-label) text-(--voyana-color-white)">
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <AppTypography variant="formTitle" component="h3" className="text-(--voyana-color-text-strong)">
            {title}
          </AppTypography>
          <AppTypography variant="caption" className="mt-1 text-(--voyana-color-text-muted)">
            {description}
          </AppTypography>
        </span>
      </div>
      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}
