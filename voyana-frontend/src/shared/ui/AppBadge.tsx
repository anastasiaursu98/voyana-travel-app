import type { HTMLAttributes, ReactNode } from "react";

export type AppBadgeTone =
  | "danger"
  | "dark"
  | "neutral"
  | "success"
  | "teal"
  | "warning";

export type AppBadgeSize = "sm" | "md";

type AppBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  className?: string;
  showDot?: boolean;
  size?: AppBadgeSize;
  tone?: AppBadgeTone;
};

const toneClassNames: Record<AppBadgeTone, string> = {
  danger:
    "bg-(--voyana-color-danger-surface) text-(--voyana-color-danger) ring-(--voyana-color-danger-border)",
  dark:
    "bg-[rgb(var(--voyana-rgb-background-dark)/0.08)] text-(--voyana-color-text-strong) ring-transparent",
  neutral:
    "bg-(--voyana-color-background-section) text-(--voyana-color-text-muted) ring-(--voyana-color-border-subtle)",
  success:
    "bg-(--voyana-color-success-surface) text-(--voyana-color-success) ring-(--voyana-color-success-border)",
  teal:
    "bg-[rgb(var(--voyana-rgb-accent-teal)/0.1)] text-(--voyana-color-accent-teal-strong) ring-[rgb(var(--voyana-rgb-accent-teal)/0.18)]",
  warning:
    "bg-(--voyana-color-warning-surface) text-(--voyana-color-warning) ring-(--voyana-color-warning-border)",
};

const sizeClassNames: Record<AppBadgeSize, string> = {
  md: "min-h-11 px-4 text-sm",
  sm: "px-2.5 py-1 text-xs",
};

export function AppBadge({
  children,
  className = "",
  showDot = false,
  size = "sm",
  tone = "neutral",
  ...props
}: AppBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-(--voyana-radius-pill) font-(--voyana-font-weight-label) ring-1 ring-inset ${sizeClassNames[size]} ${toneClassNames[tone]} ${className}`}
      {...props}
    >
      {showDot ? (
        <span className="h-1.5 w-1.5 rounded-(--voyana-radius-pill) bg-current" aria-hidden="true" />
      ) : null}
      {children}
    </span>
  );
}
