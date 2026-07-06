import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { useState, type ComponentType, type ReactNode } from "react";

type CollapsibleFilterSectionProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ComponentType<SvgIconProps>;
  title: string;
};

export function CollapsibleFilterSection({
  children,
  defaultOpen = true,
  icon: Icon,
  title,
}: CollapsibleFilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.82)] pt-5">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 text-left"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[rgb(var(--voyana-rgb-accent-teal)/0.12)] text-(--voyana-color-accent-teal-strong)">
            {Icon && <Icon className="text-[1.05rem]" />}
          </span>
          <span className="truncate text-sm font-black uppercase leading-none tracking-normal text-(--voyana-color-text-primary)">
            {title}
          </span>
        </span>
        <ExpandMoreRoundedIcon
          className={`shrink-0 text-[1.35rem] text-(--voyana-color-text-muted) transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen ? <div className="mt-3 grid gap-2">{children}</div> : null}
    </section>
  );
}
