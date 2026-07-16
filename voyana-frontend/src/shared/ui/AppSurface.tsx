import { createElement, type ElementType, type HTMLAttributes, type ReactNode } from "react";

type AppSurfaceVariant = "card" | "panel" | "soft" | "plain";

type AppSurfaceProps<TElement extends ElementType = "div"> =
  HTMLAttributes<HTMLElement> & {
    as?: TElement;
    children: ReactNode;
    className?: string;
    variant?: AppSurfaceVariant;
  };

const surfaceClassNames: Record<AppSurfaceVariant, string> = {
  card:
    "rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-(--voyana-color-background-card) shadow-(--voyana-shadow-card)",
  panel:
    "rounded-(--voyana-radius-panel) border border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] bg-(--voyana-color-background-card) shadow-(--voyana-shadow-panel)",
  plain:
    "rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-(--voyana-color-background-card)",
  soft:
    "rounded-(--voyana-radius-panel) border border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] bg-[rgb(var(--voyana-rgb-background-section)/0.55)]",
};

export function AppSurface<TElement extends ElementType = "div">({
  as,
  children,
  className = "",
  variant = "card",
  ...props
}: AppSurfaceProps<TElement>) {
  return createElement(
    as ?? "div",
    {
      className: `${surfaceClassNames[variant]} ${className}`.trim(),
      ...props,
    },
    children,
  );
}
