import type { ReactNode } from "react";

import { AppSurface } from "../../../shared/ui";

type ManagementPanelProps = {
  children: ReactNode;
  footerEnd: ReactNode;
  footerStart: ReactNode;
};

export function ManagementPanel({
  children,
  footerEnd,
  footerStart,
}: ManagementPanelProps) {
  return (
    <AppSurface as="section" variant="panel" className="overflow-hidden">
      {children}
      <div className="flex items-center justify-between border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] px-5 py-4 text-sm font-semibold text-(--voyana-color-text-muted)">
        <span>{footerStart}</span>
        <span>{footerEnd}</span>
      </div>
    </AppSurface>
  );
}
