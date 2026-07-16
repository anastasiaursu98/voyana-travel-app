import { Typography, type TypographyProps } from "@mui/material";
import type { ElementType } from "react";

export type AppTypographyVariant =
  | "pageTitle"
  | "sectionTitle"
  | "cardTitle"
  | "formTitle"
  | "body"
  | "caption"
  | "label";

export type AppTypographyProps = Omit<TypographyProps, "variant"> & {
  component?: ElementType;
  variant: AppTypographyVariant;
};

const defaultElementByVariant: Record<AppTypographyVariant, ElementType> = {
  pageTitle: "h2",
  sectionTitle: "h2",
  cardTitle: "h3",
  formTitle: "h3",
  body: "p",
  caption: "p",
  label: "span",
};

export function AppTypography({
  component,
  variant,
  ...props
}: AppTypographyProps) {
  return (
    <Typography
      component={component ?? defaultElementByVariant[variant]}
      variant={variant}
      {...props}
    />
  );
}
