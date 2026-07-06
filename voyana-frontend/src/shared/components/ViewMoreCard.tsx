import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import type { ReactNode } from "react";
import { Link as RouterLink, type To } from "react-router-dom";

type ViewMoreCardProps = {
  actionLabel: string;
  ariaLabel?: string;
  className?: string;
  eyebrow: string;
  icon?: ReactNode;
  title: string;
  to: To;
};

export function ViewMoreCard({
  actionLabel,
  ariaLabel,
  className = "",
  eyebrow,
  icon,
  title,
  to,
}: ViewMoreCardProps) {
  return (
    <RouterLink
      to={to}
      className={`group relative flex min-h-88 flex-col justify-between overflow-hidden rounded-lg border border-[rgb(var(--voyana-rgb-accent-teal)/0.24)] bg-(--voyana-color-background-dark) p-5 text-(--voyana-color-white) no-underline shadow-[0_18px_46px_rgb(var(--voyana-rgb-text-strong)/0.1)] transition duration-300 hover:-translate-y-1 hover:border-[rgb(var(--voyana-rgb-accent-teal)/0.5)] hover:shadow-[0_24px_58px_rgb(var(--voyana-rgb-text-strong)/0.16)] focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.24)] ${className}`}
      aria-label={ariaLabel ?? title}
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgb(var(--voyana-rgb-background-dark)/0.98)_0%,rgb(var(--voyana-rgb-accent-teal-strong)/0.74)_58%,rgb(var(--voyana-rgb-accent-warm)/0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgb(var(--voyana-rgb-white)/0.18)_0,transparent_34%)]" />

      <div className="relative z-10">
        {icon ? (
          <span className="grid size-12 place-items-center rounded-lg bg-[rgb(var(--voyana-rgb-white)/0.12)] text-(--voyana-color-white) ring-1 ring-[rgb(var(--voyana-rgb-white)/0.18)] transition group-hover:bg-[rgb(var(--voyana-rgb-white)/0.18)]">
            {icon}
          </span>
        ) : null}
      </div>

      <div className="relative z-10">
        <p className="text-xs font-black uppercase tracking-normal text-[rgb(var(--voyana-rgb-accent-warm)/0.92)]">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-black leading-tight text-(--voyana-color-white)">
          {title}
        </h3>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-(--voyana-color-white)">
          {actionLabel}
          <ArrowForwardRoundedIcon
            fontSize="small"
            className="transition group-hover:translate-x-1"
          />
        </span>
      </div>
    </RouterLink>
  );
}
