import type { ReactNode } from "react";

import { SectionHeader } from "../../../shared/components/SectionHeader";

type ManagementPageHeaderProps = {
  actions?: ReactNode;
  description?: string;
  eyebrow?: string;
  title: string;
  titleSize?: "display" | "small";
};

export function ManagementPageHeader({
  actions,
  description,
  eyebrow,
  title,
  titleSize = "display",
}: ManagementPageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] pb-7 lg:flex-row lg:items-end lg:justify-between">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        titleAs="h1"
        titleSize={titleSize}
        titleTransform="none"
        className="max-w-3xl"
      />
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
