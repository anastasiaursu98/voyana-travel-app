import { AppButton } from "../../ui";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { useState, type ComponentType, type ReactNode } from "react";

type CollapsibleFilterSectionProps = {
  activeLabel?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ComponentType<SvgIconProps>;
  selectedCount?: number;
  supportingText?: string;
  title: string;
  totalCount?: number;
};

export function CollapsibleFilterSection({
  activeLabel,
  children,
  defaultOpen = false,
  icon: Icon,
  selectedCount = 0,
  supportingText,
  title,
  totalCount,
}: CollapsibleFilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const hasSelectedOptions = selectedCount > 0;

  return (
    <section className="border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.7)] last:border-b-0">
      <AppButton intent="control"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 py-4 text-left transition-colors focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.12)]"
        endIcon={
          <span className="flex shrink-0 items-center gap-2">
            {hasSelectedOptions ? (
              <span className="rounded-(--voyana-radius-pill) bg-[rgb(var(--voyana-rgb-accent-teal)/0.1)] px-2.5 py-1 text-xs font-black text-(--voyana-color-accent-teal-strong)">
                {activeLabel ?? `${selectedCount} selected`}
              </span>
            ) : totalCount !== undefined ? (
              <span className="text-xs font-black text-[rgb(var(--voyana-rgb-text-muted)/0.72)]">
                {totalCount}
              </span>
            ) : null}
            <ExpandMoreRoundedIcon
              className={`text-[1.25rem] text-(--voyana-color-text-muted) transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        }
        onClick={() => setIsOpen((current) => !current)}
        startIcon={
          Icon ? (
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-(--voyana-radius-card) border ${
                hasSelectedOptions
                  ? "border-[rgb(var(--voyana-rgb-accent-teal)/0.26)] bg-[rgb(var(--voyana-rgb-accent-teal)/0.08)] text-(--voyana-color-accent-teal-strong)"
                  : "border-[rgb(var(--voyana-rgb-border-subtle)/0.76)] bg-(--voyana-color-background-section) text-(--voyana-color-text-muted)"
              }`}
            >
              <Icon className="text-[1rem]" />
            </span>
          ) : undefined
        }
        type="button"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="min-w-0">
            <span className="block truncate text-sm font-black leading-none tracking-normal text-(--voyana-color-text-primary)">
              {title}
            </span>
            {supportingText ? (
              <span className="mt-1 block truncate text-xs font-semibold text-(--voyana-color-text-muted)">
                {supportingText}
              </span>
            ) : null}
          </span>
        </span>
      </AppButton>
      {isOpen ? <div className="grid gap-1 pb-4">{children}</div> : null}
    </section>
  );
}
