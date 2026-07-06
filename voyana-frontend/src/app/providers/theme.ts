import { createTheme } from "@mui/material/styles";
import { designTokens, tokenAlpha } from "../../shared/constants/designTokens";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: designTokens.muiColors.buttonPrimary,
      light: designTokens.muiColors.buttonPrimaryHover,
      dark: designTokens.muiColors.buttonPrimaryActive,
      contrastText: designTokens.muiColors.backgroundDark,
    },
    secondary: {
      main: designTokens.muiColors.textStrong,
      light: designTokens.muiColors.textInverseMuted,
      dark: designTokens.muiColors.backgroundDark,
      contrastText: designTokens.muiColors.textInverse,
    },
    text: {
      primary: designTokens.muiColors.textStrong,
      secondary: designTokens.muiColors.textMuted,
    },
    background: {
      default: designTokens.muiColors.textInverse,
      paper: designTokens.colors.backgroundCard,
    },
  },
  typography: {
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: 0,
    },
    h2: {
      fontWeight: 800,
      letterSpacing: 0,
    },
    button: {
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          backgroundColor: `${designTokens.colors.textInverse} !important`,
        },
        body: {
          backgroundColor: `${designTokens.colors.textInverse} !important`,
          color: designTokens.colors.textPrimary,
        },
        "#root": {
          backgroundColor: `${designTokens.colors.textInverse} !important`,
          minHeight: "100%",
        },
        main: {
          backgroundColor: `${designTokens.colors.textInverse} !important`,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: 54,
          borderRadius: designTokens.radius.card,
          backgroundColor: tokenAlpha(designTokens.rgb.white, 0.065),
          transition:
            "background-color 0.2s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: tokenAlpha(designTokens.rgb.textInverseMuted, 0.2),
          },
          "& .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: tokenAlpha(designTokens.rgb.textInverseMuted, 0.72),
            transition: "color 0.2s ease-out",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: tokenAlpha(designTokens.rgb.buttonPrimary, 0.56),
          },
          "&:hover": {
            backgroundColor: tokenAlpha(designTokens.rgb.white, 0.085),
          },
          "&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: designTokens.colors.textInverse,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: designTokens.colors.buttonPrimary,
            borderWidth: 1.5,
          },
          "&.Mui-focused": {
            backgroundColor: tokenAlpha(designTokens.rgb.white, 0.105),
            boxShadow: `0 0 0 4px ${tokenAlpha(designTokens.rgb.buttonPrimary, 0.16)}`,
          },
          "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: designTokens.colors.buttonPrimary,
          },
        },
        input: {
          paddingTop: 15.5,
          paddingBottom: 15.5,
          color: designTokens.colors.textInverse,
          fontSize: 15,
          lineHeight: 1.2,
          caretColor: designTokens.colors.buttonPrimary,
          "&::placeholder": {
            color: designTokens.colors.textInverseMuted,
            opacity: 0.64,
          },
          "&:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 100px ${designTokens.colors.backgroundDarkSoft} inset`,
            WebkitTextFillColor: designTokens.colors.textInverse,
            caretColor: designTokens.colors.buttonPrimary,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: tokenAlpha(designTokens.rgb.textInverseMuted, 0.86),
          fontWeight: 700,
          fontSize: 14,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: tokenAlpha(designTokens.rgb.textInverseMuted, 0.46),
          "&.Mui-checked": {
            color: designTokens.colors.buttonPrimary,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: designTokens.colors.textInverseMuted,
        },
      },
    },
  },
});
