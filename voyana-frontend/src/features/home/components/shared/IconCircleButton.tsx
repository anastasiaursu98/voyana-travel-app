import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconCircleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: "light" | "dark";
};

const toneClasses = {
  dark:
    "bg-(--voyana-color-button-primary) text-(--voyana-color-button-primary-text) shadow-[0_14px_32px_rgb(var(--voyana-rgb-button-primary)/0.24)] hover:bg-(--voyana-color-button-primary-hover)",
  light:
    "border border-[rgb(var(--voyana-rgb-border-subtle)/0.86)] bg-transparent text-(--voyana-color-text-strong) shadow-[0_14px_32px_rgb(var(--voyana-rgb-text-strong)/0.08)] hover:border-[rgb(var(--voyana-rgb-text-strong)/0.32)] hover:bg-[rgb(var(--voyana-rgb-text-strong)/0.04)]",
} as const;

export function IconCircleButton({
  children,
  className = "",
  tone = "light",
  type = "button",
  ...props
}: IconCircleButtonProps) {
  return (
    <button
      type={type}
      className={`grid h-11 w-11 place-items-center rounded-full transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-button-primary)/0.24)] disabled:pointer-events-none disabled:opacity-40 ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
