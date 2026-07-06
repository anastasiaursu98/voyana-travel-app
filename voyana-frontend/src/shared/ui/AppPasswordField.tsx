import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, InputAdornment } from "@mui/material";
import { designTokens, tokenAlpha } from "../constants/designTokens";
import { AppTextField } from "./AppTextField";
import type { AppTextFieldProps } from "./AppTextField";

export type AppPasswordFieldProps = Omit<
  AppTextFieldProps,
  "slotProps" | "type"
> & {
  isVisible: boolean;
  onToggleVisibility: () => void;
};

export function AppPasswordField({
  isVisible,
  onToggleVisibility,
  ...props
}: AppPasswordFieldProps) {
  return (
    <AppTextField
      fullWidth
      type={isVisible ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={isVisible ? "Hide password" : "Show password"}
                edge="end"
                onClick={onToggleVisibility}
                sx={{
                  mr: -0.5,
                  color: isVisible
                    ? designTokens.colors.buttonPrimary
                    : tokenAlpha(designTokens.rgb.textInverseMuted, 0.72),
                  transition:
                    "background-color 0.2s ease-out, color 0.2s ease-out",
                  "& .MuiSvgIcon-root": {
                    color: "inherit",
                    fontSize: 21,
                  },
                  "&:hover": {
                    bgcolor: tokenAlpha(designTokens.rgb.buttonPrimary, 0.12),
                    color: designTokens.colors.textInverse,
                  },
                  "&:focus-visible": {
                    bgcolor: tokenAlpha(designTokens.rgb.buttonPrimary, 0.16),
                    color: designTokens.colors.buttonPrimary,
                  },
                }}
              >
                {isVisible ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
}
