import type { ComponentPropsWithoutRef, ReactNode } from "react";

type OnboardingCardProps = ComponentPropsWithoutRef<"article"> & {
  children: ReactNode;
  tone?: "solid" | "glass" | "darkGlass";
};

const toneClasses = {
  darkGlass:
    "border-[rgb(var(--voyana-rgb-white)/0.18)] bg-[rgb(var(--voyana-rgb-white)/0.13)] text-(--voyana-color-white) shadow-[0_18px_46px_rgb(var(--voyana-rgb-background-dark)/0.22)] backdrop-blur-md hover:bg-[rgb(var(--voyana-rgb-white)/0.18)]",
  glass:
    "border-[rgb(var(--voyana-rgb-white)/0.72)] bg-[rgb(var(--voyana-rgb-white)/0.9)] text-(--voyana-color-text-primary) shadow-[0_22px_60px_rgb(var(--voyana-rgb-background-dark)/0.24)] backdrop-blur-md hover:bg-(--voyana-color-white)",
  solid:
    "border-[rgb(var(--voyana-rgb-border-subtle)/0.88)] bg-(--voyana-color-white) text-(--voyana-color-text-primary) shadow-[0_14px_34px_rgb(var(--voyana-rgb-text-strong)/0.06)]",
} as const;

export function OnboardingCard({
  children,
  tone = "solid",
  className = "",
  ...props
}: OnboardingCardProps) {
  return (
    <article
      className={`rounded-lg border transition hover:-translate-y-0.5 ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </article>
  );
}
