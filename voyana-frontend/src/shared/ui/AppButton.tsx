import type { ButtonProps, SxProps, Theme } from "@mui/material";
import { Button } from "@mui/material";
import type { ElementType } from "react";
import { designTokens, tokenAlpha } from "../constants/designTokens";

export type AppButtonIntent = "primary" | "secondary" | "text";

export type AppButtonProps = ButtonProps & {
  component?: ElementType;
  intent?: AppButtonIntent;
  surface?: "dark" | "light";
  to?: string;
};

const baseButtonSx: SxProps<Theme> = {
  minHeight: 52,
  borderRadius: designTokens.radius.card,
  px: 3.5,
  fontSize: 15,
  fontWeight: 850,
  letterSpacing: 0,
  textTransform: "none",
  transition:
    "background-color 0.2s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out, color 0.2s ease-out, transform 0.2s ease-out",
  "&:hover": {
    transform: "translateY(-1px)",
  },
};

const buttonIntentSx: Record<AppButtonIntent, SxProps<Theme>> = {
  primary: {
    bgcolor: designTokens.colors.buttonPrimary,
    color: designTokens.colors.buttonPrimaryText,
    boxShadow: `0 14px 30px ${tokenAlpha(designTokens.rgb.buttonPrimary, 0.28)}`,
    "&:hover": {
      bgcolor: designTokens.colors.buttonPrimaryHover,
      boxShadow: `0 18px 38px ${tokenAlpha(designTokens.rgb.buttonPrimary, 0.34)}`,
    },
    "&:active": {
      bgcolor: designTokens.colors.buttonPrimary,
    },
    "&.Mui-disabled": {
      bgcolor: tokenAlpha(designTokens.rgb.buttonPrimary, 0.34),
      color: tokenAlpha(designTokens.rgb.backgroundDark, 0.52),
      boxShadow: "none",
    },
  },
  secondary: {
    bgcolor: "transparent",
    boxShadow: "none",
  },
  text: {
    minHeight: "auto",
    borderRadius: designTokens.radius.pill,
    bgcolor: "transparent",
    boxShadow: "none",
    px: 0.5,
    py: 0.25,
    "&:hover": {
      bgcolor: "transparent",
      boxShadow: "none",
      textDecoration: "underline",
      textUnderlineOffset: "0.18em",
      transform: "none",
    },
    "&:active": {
      bgcolor: "transparent",
    },
    "&.Mui-disabled": {
      bgcolor: "transparent",
      boxShadow: "none",
    },
  },
};

const defaultVariantByIntent: Record<AppButtonIntent, ButtonProps["variant"]> = {
  primary: "contained",
  secondary: "outlined",
  text: "text",
};

export function AppButton({
  intent = "primary",
  surface = "dark",
  sx,
  variant,
  ...props
}: AppButtonProps) {
  const sxList = Array.isArray(sx) ? sx : [sx];
  const secondarySurfaceSx: SxProps<Theme> =
    surface === "light"
      ? {
          borderColor: tokenAlpha(designTokens.rgb.textStrong, 0.24),
          color: designTokens.colors.textStrong,
          "&:hover": {
            borderColor: designTokens.colors.textStrong,
            bgcolor: tokenAlpha(designTokens.rgb.textStrong, 0.05),
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            borderColor: tokenAlpha(designTokens.rgb.textStrong, 0.16),
            color: tokenAlpha(designTokens.rgb.textStrong, 0.38),
            bgcolor: "transparent",
          },
        }
      : {
          borderColor: tokenAlpha(designTokens.rgb.white, 0.32),
          color: designTokens.colors.textInverse,
          "&:hover": {
            borderColor: tokenAlpha(designTokens.rgb.white, 0.62),
            bgcolor: tokenAlpha(designTokens.rgb.white, 0.08),
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            borderColor: tokenAlpha(designTokens.rgb.white, 0.16),
            color: tokenAlpha(designTokens.rgb.white, 0.38),
            bgcolor: "transparent",
          },
        };
  const textSurfaceSx: SxProps<Theme> =
    surface === "light"
      ? {
          color: designTokens.colors.textStrong,
          "&:hover": {
            color: designTokens.colors.textPrimary,
          },
          "&.Mui-disabled": {
            color: tokenAlpha(designTokens.rgb.textStrong, 0.38),
          },
        }
      : {
          color: designTokens.colors.textInverse,
          "&:hover": {
            color: designTokens.colors.textInverseMuted,
          },
          "&.Mui-disabled": {
            color: tokenAlpha(designTokens.rgb.white, 0.38),
          },
        };

  return (
    <Button
      disableElevation
      variant={variant ?? defaultVariantByIntent[intent]}
      sx={[
        baseButtonSx,
        buttonIntentSx[intent],
        intent === "secondary" ? secondarySurfaceSx : null,
        intent === "text" ? textSurfaceSx : null,
        ...sxList,
      ] as SxProps<Theme>}
      {...props}
    />
  );
}
