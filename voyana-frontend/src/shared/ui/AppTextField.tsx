import type { SxProps, TextFieldProps, Theme } from "@mui/material";
import { Box, InputLabel, TextField } from "@mui/material";
import type { ReactNode } from "react";
import { designTokens, tokenAlpha } from "../constants/designTokens";

export type AppTextFieldTone = "dark" | "light";

export type AppTextFieldProps = Omit<TextFieldProps, "label" | "variant"> & {
  label?: ReactNode;
  tone?: AppTextFieldTone;
};

const fieldSxByTone: Record<AppTextFieldTone, SxProps<Theme>> = {
  dark: {
    "& .MuiOutlinedInput-root": {
      minHeight: 54,
      borderRadius: designTokens.radius.card,
      bgcolor: tokenAlpha(designTokens.rgb.white, 0.065),
      transition:
        "background-color 0.2s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: tokenAlpha(designTokens.rgb.textInverseMuted, 0.2),
      },
      "&:hover": {
        bgcolor: tokenAlpha(designTokens.rgb.white, 0.085),
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: tokenAlpha(designTokens.rgb.buttonPrimary, 0.56),
      },
      "&.Mui-focused": {
        bgcolor: tokenAlpha(designTokens.rgb.white, 0.105),
        boxShadow: `0 0 0 4px ${tokenAlpha(designTokens.rgb.buttonPrimary, 0.16)}`,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: designTokens.colors.buttonPrimary,
        borderWidth: 1.5,
      },
      "& .MuiInputAdornment-root .MuiSvgIcon-root": {
        color: tokenAlpha(designTokens.rgb.textInverseMuted, 0.72),
        transition: "color 0.2s ease-out",
      },
      "&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
        color: designTokens.colors.textInverse,
      },
      "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
        color: designTokens.colors.buttonPrimary,
      },
    },
    "& .MuiOutlinedInput-input": {
      py: 1.95,
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
  light: {
    "& .MuiOutlinedInput-root": {
      minHeight: 54,
      borderRadius: designTokens.radius.card,
      bgcolor: designTokens.colors.backgroundCard,
      boxShadow: designTokens.shadows.search,
      transition:
        "background-color 0.2s ease-out, box-shadow 0.2s ease-out, border-color 0.2s ease-out",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: tokenAlpha(designTokens.rgb.textStrong, 0.14),
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: tokenAlpha(designTokens.rgb.textStrong, 0.36),
      },
      "&.Mui-focused": {
        boxShadow: `0 0 0 4px ${tokenAlpha(designTokens.rgb.buttonPrimary, 0.18)}`,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: designTokens.colors.textStrong,
        borderWidth: 1.5,
      },
      "& .MuiInputAdornment-root .MuiSvgIcon-root": {
        color: tokenAlpha(designTokens.rgb.textStrong, 0.58),
      },
    },
    "& .MuiOutlinedInput-input": {
      py: 1.95,
      color: designTokens.colors.textStrong,
      fontSize: 15,
      lineHeight: 1.2,
      caretColor: designTokens.colors.textStrong,
      "&::placeholder": {
        color: designTokens.colors.textSoft,
        opacity: 1,
      },
    },
  },
};

export function AppTextField({
  label,
  sx,
  tone = "dark",
  ...props
}: AppTextFieldProps) {
  const sxList = Array.isArray(sx) ? sx : [sx];

  return (
    <Box>
      {label ? (
        <InputLabel
          disableAnimation
          sx={{
            mb: 0.875,
            color:
              tone === "dark"
                ? designTokens.colors.textInverseMuted
                : designTokens.colors.textStrong,
            fontSize: 14,
            fontWeight: designTokens.typography.labelWeight,
            lineHeight: 1.3,
            position: "static",
            transform: "none",
            whiteSpace: "normal",
          }}
        >
          {label}
        </InputLabel>
      ) : null}

      <TextField
        fullWidth
        variant="outlined"
        sx={[fieldSxByTone[tone], ...sxList] as SxProps<Theme>}
        {...props}
      />
    </Box>
  );
}
