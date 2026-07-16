import type { ButtonProps, SxProps, Theme } from "@mui/material";
import { Button } from "@mui/material";
import { createElement, type ElementType } from "react";
import type { CSSProperties, ReactNode } from "react";
import { designTokens, tokenAlpha } from "../constants/designTokens";

export type AppButtonIntent =
  | "primary"
  | "secondary"
  | "dark"
  | "text"
  | "control"
  | "icon";

export type AppButtonProps = ButtonProps & {
  component?: ElementType;
  icon?: ReactNode;
  intent?: AppButtonIntent;
  surface?: "dark" | "light";
  to?: string;
};

const baseButtonSx: SxProps<Theme> = {
  minHeight: 48,
  borderRadius: designTokens.radius.pill,
  px: 3,
  fontFamily: "var(--voyana-font-family)",
  fontSize: 14,
  fontWeight: designTokens.typography.actionWeight,
  lineHeight: 1,
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
    fontWeight: designTokens.typography.actionWeight,
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
  dark: {
    bgcolor: designTokens.colors.backgroundDark,
    color: designTokens.colors.textInverse,
    boxShadow: `0 12px 28px ${tokenAlpha(designTokens.rgb.backgroundDark, 0.18)}`,
    "&:hover": {
      bgcolor: designTokens.colors.accentTealStrong,
      boxShadow: `0 16px 34px ${tokenAlpha(designTokens.rgb.backgroundDark, 0.22)}`,
    },
    "&:active": {
      bgcolor: designTokens.colors.textStrong,
    },
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
  control: {
    minHeight: "auto",
    minWidth: 0,
    borderRadius: designTokens.radius.control,
    bgcolor: "transparent",
    boxShadow: "none",
    color: "inherit",
    p: 0,
    "&:hover": {
      bgcolor: "transparent",
      boxShadow: "none",
      transform: "none",
    },
  },
  icon: {
    width: 40,
    height: 40,
    minHeight: 40,
    minWidth: 40,
    borderRadius: designTokens.radius.pill,
    bgcolor: "transparent",
    boxShadow: "none",
    color: "inherit",
    p: 0,
    "&:hover": {
      bgcolor: tokenAlpha(designTokens.rgb.backgroundInput, 0.85),
      boxShadow: "none",
      transform: "none",
    },
  },
};

const defaultVariantByIntent: Record<AppButtonIntent, ButtonProps["variant"]> = {
  primary: "contained",
  secondary: "outlined",
  dark: "contained",
  text: "text",
  control: "text",
  icon: "text",
};

function renderButtonContent({
  children,
  endIcon,
  icon,
  startIcon,
}: {
  children: ReactNode;
  endIcon?: ReactNode;
  icon?: ReactNode;
  startIcon?: ReactNode;
}) {
  if (icon) {
    return (
      <>
        {children}
        <span className="app-button__icon">{icon}</span>
      </>
    );
  }

  if (!startIcon && !endIcon) {
    return children;
  }

  return (
    <>
      {startIcon ? <span className="app-button__icon">{startIcon}</span> : null}
      {children}
      {endIcon ? <span className="app-button__icon">{endIcon}</span> : null}
    </>
  );
}

export function AppButton({
  children,
  component,
  endIcon,
  fullWidth,
  icon,
  intent = "primary",
  surface = "dark",
  startIcon,
  style,
  sx,
  variant,
  ...props
}: AppButtonProps) {
  const sxList = Array.isArray(sx) ? sx : [sx];
  const hasCustomSx = sxList.some(Boolean);

  if ((intent === "control" || intent === "icon") && !hasCustomSx) {
    const controlStyle = {
      ...(fullWidth ? { width: "100%" } : null),
      ...style,
    } satisfies CSSProperties;

    return createElement(
      component ?? "button",
      {
        type: component ? undefined : "button",
        ...props,
        style: controlStyle,
      },
      renderButtonContent({ children, endIcon, icon, startIcon }),
    );
  }

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
      component={component ?? "button"}
      disableElevation
      endIcon={endIcon}
      fullWidth={fullWidth}
      startIcon={startIcon}
      variant={variant ?? defaultVariantByIntent[intent]}
      sx={[
        baseButtonSx,
        buttonIntentSx[intent],
        intent === "secondary" ? secondarySurfaceSx : null,
        intent === "text" ? textSurfaceSx : null,
        ...sxList,
      ] as SxProps<Theme>}
      {...props}
    >
      {icon ?? children}
    </Button>
  );
}
