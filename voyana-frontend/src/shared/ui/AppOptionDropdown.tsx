import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Box, Popover, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useState } from "react";
import { designTokens, tokenAlpha } from "../constants/designTokens";
import { AppButton } from "./AppButton";

export type AppOptionDropdownOption<TValue extends string = string> = {
  description?: string;
  label: string;
  value: TValue;
};

type AppOptionDropdownProps<TValue extends string = string> = {
  icon: ReactNode;
  label: string;
  minHeight?: number;
  onChange: (value: TValue) => void;
  options: readonly AppOptionDropdownOption<TValue>[];
  placeholder?: string;
  showIcon?: boolean;
  showLabel?: boolean;
  value: TValue;
};

export function AppOptionDropdown<TValue extends string = string>({
  icon,
  label,
  minHeight = 62,
  onChange,
  options,
  placeholder = "Select option",
  showIcon = true,
  showLabel = true,
  value,
}: AppOptionDropdownProps<TValue>) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorElement);
  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];
  const hasSelectedValue = options.some((option) => option.value === value);

  const handleSelect = (nextValue: TValue) => {
    onChange(nextValue);
    setAnchorElement(null);
  };

  return (
    <>
      <AppButton
        intent="control"
        onClick={(event) => setAnchorElement(event.currentTarget)}
        endIcon={
          <KeyboardArrowDownRoundedIcon
            sx={{
              color: designTokens.colors.textMuted,
              flexShrink: 0,
            }}
          />
        }
        startIcon={
          showIcon ? (
          <Box
            sx={{
              alignItems: "center",
              color: designTokens.colors.textMuted,
              display: "grid",
              flexShrink: 0,
              height: 28,
              placeItems: "center",
              width: 28,
            }}
          >
            {icon}
          </Box>
          ) : undefined
        }
        sx={{
          alignItems: "center",
          border: `1px solid ${tokenAlpha(designTokens.rgb.borderSubtle, 0.95)}`,
          borderRadius: designTokens.radius.card,
          display: "flex",
          gap: 1.25,
          height: showLabel ? "auto" : minHeight,
          justifyContent: "flex-start",
          minHeight,
          px: showLabel ? 1.25 : 1.75,
          py: showLabel ? 1.1 : 0,
          textAlign: "left",
          width: "100%",
          transition:
            "border-color 0.2s ease-out, box-shadow 0.2s ease-out, transform 0.2s ease-out",
          "&:hover": {
            borderColor: tokenAlpha(designTokens.rgb.textStrong, 0.28),
            boxShadow: designTokens.shadows.search,
            transform: "translateY(-1px)",
          },
          "& .MuiButton-endIcon": {
            ml: "auto",
          },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          {showLabel ? (
            <Typography
              sx={{
                color: designTokens.colors.textMuted,
                fontSize: 11,
                fontWeight: designTokens.typography.labelWeight,
                lineHeight: 1.1,
              }}
            >
              {label}
            </Typography>
          ) : null}
          <Typography
            noWrap
            sx={{
              color: hasSelectedValue
                ? designTokens.colors.textMuted
                : designTokens.colors.textSoft,
              fontSize: 15,
              fontWeight: designTokens.typography.regularWeight,
              lineHeight: 1.25,
              mt: showLabel ? 0.45 : 0,
            }}
          >
            {hasSelectedValue ? selectedOption.label : placeholder}
          </Typography>
        </Box>
      </AppButton>

      <Popover
        open={isOpen}
        anchorEl={anchorElement}
        onClose={() => setAnchorElement(null)}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: designTokens.colors.backgroundCard,
              border: `1px solid ${tokenAlpha(designTokens.rgb.borderSubtle, 0.9)}`,
              borderRadius: "var(--voyana-radius-panel)",
              boxShadow: designTokens.shadows.popover,
              color: designTokens.colors.textPrimary,
              mt: 1,
              overflow: "hidden",
              p: 1,
              width: { xs: "calc(100vw - 32px)", sm: 360 },
            },
          },
        }}
      >
        <Box sx={{ display: "grid", gap: 0.5 }}>
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <AppButton
                intent="control"
                key={option.value}
                onClick={() => handleSelect(option.value)}
                endIcon={
                  isSelected ? (
                    <CheckRoundedIcon
                      sx={{
                        color: designTokens.colors.accentTealStrong,
                        flexShrink: 0,
                      }}
                    />
                  ) : undefined
                }
                sx={{
                  alignItems: "center",
                  borderRadius: designTokens.radius.control,
                  display: "flex",
                  gap: 1.5,
                  justifyContent: "space-between",
                  px: 1.5,
                  py: 1.4,
                  textAlign: "left",
                  width: "100%",
                  "&:hover": {
                    bgcolor: tokenAlpha(designTokens.rgb.backgroundInput, 0.78),
                  },
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      color: designTokens.colors.textPrimary,
                      fontSize: 14,
                      fontWeight: designTokens.typography.labelWeight,
                      lineHeight: 1.2,
                    }}
                  >
                    {option.label}
                  </Typography>
                  {option.description ? (
                    <Typography
                      sx={{
                        color: designTokens.colors.textMuted,
                        fontSize: 12,
                        fontWeight: designTokens.typography.regularWeight,
                        lineHeight: 1.4,
                        mt: 0.45,
                      }}
                    >
                      {option.description}
                    </Typography>
                  ) : null}
                </Box>
              </AppButton>
            );
          })}
        </Box>
      </Popover>
    </>
  );
}
