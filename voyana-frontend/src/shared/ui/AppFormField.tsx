/* eslint-disable react-refresh/only-export-components */
import type { CSSProperties, ReactNode } from "react";

import { designTokens } from "../constants/designTokens";

export const formInputClassName =
  "mt-2 h-12 w-full rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] bg-(--voyana-color-background-card) px-3.5 text-sm font-medium text-(--voyana-color-text-muted) outline-none transition placeholder:font-medium placeholder:text-(--voyana-color-text-soft) placeholder:opacity-100 focus:border-(--voyana-color-accent-teal) focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.15)]";

export const formLabelClassName = "text-sm";

export const formLabelStyle = {
  color: designTokens.colors.textMuted,
  fontWeight: designTokens.typography.labelWeight,
} satisfies CSSProperties;

type AppFormFieldProps = {
  children: ReactNode;
  className?: string;
  label: ReactNode;
  required?: boolean;
};

export function AppFormField({
  children,
  className = "",
  label,
  required = false,
}: AppFormFieldProps) {
  return (
    <label
      className={`${formLabelClassName} ${className}`}
      style={formLabelStyle}
    >
      {label}{" "}
      {required ? (
        <span className="text-(--voyana-color-danger)">*</span>
      ) : null}
      {children}
    </label>
  );
}
