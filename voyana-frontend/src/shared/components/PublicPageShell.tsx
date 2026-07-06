import type { ReactNode } from "react";
import { PublicContentContainer } from "./PublicContentContainer";

type PublicPageShellProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  spacing?: "default" | "detail" | "none";
};

const spacingClasses = {
  default: "pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-24",
  detail: "pb-20 pt-16",
  none: "",
} as const;

export function PublicPageShell({
  children,
  className = "",
  containerClassName = "",
  spacing = "default",
}: PublicPageShellProps) {
  return (
    <section
      className={`min-h-screen overflow-hidden bg-white text-(--voyana-color-text-primary) ${spacingClasses[spacing]} ${className}`}
    >
      <PublicContentContainer className={containerClassName}>
        {children}
      </PublicContentContainer>
    </section>
  );
}
