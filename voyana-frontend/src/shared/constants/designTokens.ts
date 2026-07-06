const cssVar = (name: string) => `var(${name})`;
const rgbVar = (name: string, opacity: number) =>
  `rgb(var(${name}) / ${opacity})`;

export const designTokens = {
  muiColors: {
    backgroundDark: "rgb(4, 17, 23)",
    backgroundDarkSoft: "rgb(12, 24, 27)",
    textStrong: "rgb(28, 30, 30)",
    textMuted: "rgb(92, 99, 99)",
    textInverse: "rgb(255, 255, 255)",
    textInverseMuted: "rgb(214, 222, 220)",
    buttonPrimary: "rgb(255, 200, 87)",
    buttonPrimaryHover: "rgb(255, 213, 112)",
    buttonPrimaryActive: "rgb(239, 181, 58)",
    accentTeal: "rgb(89, 171, 174)",
  },
  colors: {
    textPrimary: cssVar("--voyana-color-text-primary"),
    textStrong: cssVar("--voyana-color-text-strong"),
    textBody: cssVar("--voyana-color-text-body"),
    textMuted: cssVar("--voyana-color-text-muted"),
    textInverse: cssVar("--voyana-color-white"),
    textInverseMuted: cssVar("--voyana-color-text-inverse-muted"),
    backgroundDark: cssVar("--voyana-color-background-dark"),
    backgroundDarkSoft: cssVar("--voyana-color-background-dark-soft"),
    backgroundSection: cssVar("--voyana-color-background-section"),
    backgroundCard: cssVar("--voyana-color-background-card"),
    backgroundInput: cssVar("--voyana-color-background-input"),
    borderSubtle: cssVar("--voyana-color-border-subtle"),
    buttonPrimary: cssVar("--voyana-color-button-primary"),
    buttonPrimaryHover: cssVar("--voyana-color-button-primary-hover"),
    buttonPrimaryActive: cssVar("--voyana-color-button-primary-active"),
    buttonPrimaryText: cssVar("--voyana-color-button-primary-text"),
    accentWarm: cssVar("--voyana-color-accent-warm"),
    accentTeal: cssVar("--voyana-color-accent-teal"),
    accentTealStrong: cssVar("--voyana-color-accent-teal-strong"),
  },
  rgb: {
    textPrimary: "--voyana-rgb-text-primary",
    textStrong: "--voyana-rgb-text-strong",
    textBody: "--voyana-rgb-text-body",
    textMuted: "--voyana-rgb-text-muted",
    textInverseMuted: "--voyana-rgb-text-inverse-muted",
    backgroundDark: "--voyana-rgb-background-dark",
    backgroundDarkSoft: "--voyana-rgb-background-dark-soft",
    backgroundSection: "--voyana-rgb-background-section",
    backgroundCard: "--voyana-rgb-background-card",
    backgroundInput: "--voyana-rgb-background-input",
    borderSubtle: "--voyana-rgb-border-subtle",
    buttonPrimary: "--voyana-rgb-button-primary",
    buttonPrimaryHover: "--voyana-rgb-button-primary-hover",
    buttonPrimaryActive: "--voyana-rgb-button-primary-active",
    accentWarm: "--voyana-rgb-accent-warm",
    accentTeal: "--voyana-rgb-accent-teal",
    accentTealStrong: "--voyana-rgb-accent-teal-strong",
    white: "--voyana-rgb-white",
    black: "--voyana-rgb-black",
  },
  radius: {
    card: cssVar("--voyana-radius-card"),
    pill: cssVar("--voyana-radius-pill"),
  },
  shadows: {
    control: cssVar("--voyana-shadow-control"),
    authBack: cssVar("--voyana-shadow-auth-back"),
    text: cssVar("--voyana-shadow-text"),
  },
  gradients: {
    heroHorizontal: cssVar("--voyana-gradient-hero-horizontal"),
    heroBottom: cssVar("--voyana-gradient-hero-bottom"),
    brandTint: cssVar("--voyana-gradient-brand-tint"),
    authImageVertical: cssVar("--voyana-gradient-auth-image-vertical"),
    authImageHorizontal: cssVar("--voyana-gradient-auth-image-horizontal"),
    authContent: cssVar("--voyana-gradient-auth-content"),
    authMobileScrim: cssVar("--voyana-gradient-auth-mobile-scrim"),
    authMobileTint: cssVar("--voyana-gradient-auth-mobile-tint"),
  },
} as const;

export function tokenAlpha(
  rgbToken: (typeof designTokens.rgb)[keyof typeof designTokens.rgb],
  opacity: number,
) {
  return rgbVar(rgbToken, opacity);
}
