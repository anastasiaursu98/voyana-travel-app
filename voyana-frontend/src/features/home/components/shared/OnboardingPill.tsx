import type { ComponentPropsWithoutRef, ReactNode } from "react";

type OnboardingPillProps = ComponentPropsWithoutRef<"span"> & {
  children: ReactNode;
  tone?: "sun" | "teal" | "neutral";
};

const toneClasses = {
  neutral:
    "bg-[rgb(var(--voyana-rgb-background-input)/0.95)] text-(--voyana-color-text-primary)",
  sun: "bg-[rgb(var(--voyana-rgb-accent-warm)/0.94)] text-(--voyana-color-button-primary-text)",
  teal: "bg-[rgb(var(--voyana-rgb-background-input)/0.95)] text-(--voyana-color-text-strong)",
} as const;

export function OnboardingPill({
  children,
  tone = "neutral",
  className = "",
  ...props
}: OnboardingPillProps) {
  return (
    <span
      className={`rounded-(--voyana-radius-pill) px-3 py-1.5 text-xs font-black ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
