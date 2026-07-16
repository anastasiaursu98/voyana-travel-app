import type { SxProps, Theme } from "@mui/material";
import { AppTypography, type AppTypographyVariant } from "../ui";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  inverse?: boolean;
  align?: "left" | "center" | "responsiveCenter";
  descriptionSize?: "default" | "large";
  titleAs?: "h1" | "h2" | "h3";
  titleSize?: "small" | "default" | "large" | "display";
  titleTransform?: "uppercase" | "none";
  className?: string;
};

const alignClasses = {
  center: "mx-auto text-center",
  left: "text-left",
  responsiveCenter: "mx-auto text-left sm:text-center",
} as const;

const centeredContentClasses = {
  center: "mx-auto",
  left: "",
  responsiveCenter: "sm:mx-auto",
} as const;

const titleSizeSx: Record<
  NonNullable<SectionHeaderProps["titleSize"]>,
  SxProps<Theme>
> = {
  small: {
    fontSize: "clamp(1.35rem, 2.2vw, 1.9rem)",
    lineHeight: 1.16,
  },
  default: {
    fontSize: "clamp(1.7rem, 3vw, 2.45rem)",
    lineHeight: 1.12,
  },
  large: {
    fontSize: "clamp(1.95rem, 3.4vw, 2.75rem)",
    lineHeight: 1.1,
  },
  display: {
    fontSize: "clamp(2.35rem, 5vw, 4rem)",
    lineHeight: 1.04,
  },
};

const descriptionSizeSx: Record<
  NonNullable<SectionHeaderProps["descriptionSize"]>,
  SxProps<Theme>
> = {
  default: {
    fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
    lineHeight: 1.7,
  },
  large: {
    fontSize: "clamp(1rem, 1.5vw, 1.12rem)",
    lineHeight: 1.75,
  },
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  inverse = false,
  align = "left",
  descriptionSize = "default",
  titleAs = "h2",
  titleSize = "default",
  titleTransform = "uppercase",
  className = "",
}: SectionHeaderProps) {
  const titleVariant: AppTypographyVariant =
    titleSize === "display" || titleAs === "h1" ? "pageTitle" : "sectionTitle";

  return (
    <div className={`max-w-4xl ${alignClasses[align]} ${className}`}>
      {eyebrow ? (
        <AppTypography
          variant="label"
          component="p"
          className={`uppercase leading-none ${
            inverse
              ? "text-[rgb(var(--voyana-rgb-accent-warm)/0.92)]"
              : "text-(--voyana-color-text-muted)"
          }`}
        >
          {eyebrow}
        </AppTypography>
      ) : null}
      <AppTypography
        variant={titleVariant}
        component={titleAs}
        sx={titleSizeSx[titleSize]}
        className={`${eyebrow ? "mt-4" : ""} max-w-4xl ${
          titleTransform === "uppercase" ? "uppercase" : ""
        } ${centeredContentClasses[align]} ${
          inverse
            ? "text-(--voyana-color-white)"
            : "text-(--voyana-color-text-primary)"
        }`}
      >
        {title}
      </AppTypography>
      {description ? (
        <AppTypography
          variant="body"
          component="p"
          sx={descriptionSizeSx[descriptionSize]}
          className={`max-w-3xl ${descriptionSize === "large" ? "mt-6" : "mt-5"} ${centeredContentClasses[align]} ${
            inverse
              ? "text-[rgb(var(--voyana-rgb-white)/0.84)]"
              : "text-(--voyana-color-text-body)"
          }`}
        >
          {description}
        </AppTypography>
      ) : null}
    </div>
  );
}
