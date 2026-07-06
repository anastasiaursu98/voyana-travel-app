import type { ReactNode } from "react";
import { HomeContentContainer } from "./HomeContentContainer";

type OnboardingSectionShellProps = {
  id?: string;
  children: ReactNode;
  tone?: "light" | "white" | "dark";
  backgroundImage?: string;
  backgroundOverlayClassName?: string;
  className?: string;
  contentClassName?: string;
};

const toneClasses = {
  dark: "bg-(--voyana-color-background-dark) text-(--voyana-color-white)",
  light: "bg-(--voyana-color-background-section) text-(--voyana-color-text-primary)",
  white: "bg-(--voyana-color-white) text-(--voyana-color-text-primary)",
} as const;

export function OnboardingSectionShell({
  backgroundImage,
  backgroundOverlayClassName = "bg-[linear-gradient(90deg,rgb(var(--voyana-rgb-background-dark)/0.76)_0%,rgb(var(--voyana-rgb-background-dark)/0.48)_52%,rgb(var(--voyana-rgb-background-dark)/0.22)_100%)]",
  id,
  children,
  tone = "light",
  className = "",
  contentClassName = "",
}: OnboardingSectionShellProps) {
  return (
    <section
      id={id}
      className={`relative isolate w-full overflow-hidden py-14 sm:py-16 lg:py-20 ${toneClasses[tone]} ${className}`}
    >
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className={`absolute inset-0 -z-10 ${backgroundOverlayClassName}`} />
        </>
      ) : null}
      <HomeContentContainer className={contentClassName}>
        {children}
      </HomeContentContainer>
    </section>
  );
}
