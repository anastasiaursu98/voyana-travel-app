import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Box, ButtonBase, Popover, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useState } from "react";
import { designTokens, tokenAlpha } from "../constants/designTokens";

export type AppOptionDropdownOption<TValue extends string = string> = {
  description?: string;
  label: string;
  value: TValue;
};

type AppOptionDropdownProps<TValue extends string = string> = {
  icon: ReactNode;
  label: string;
  onChange: (value: TValue) => void;
  options: readonly AppOptionDropdownOption<TValue>[];
  value: TValue;
};

export function AppOptionDropdown<TValue extends string = string>({
  icon,
  label,
  onChange,
  options,
  value,
}: AppOptionDropdownProps<TValue>) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorElement);
  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  const handleSelect = (nextValue: TValue) => {
    onChange(nextValue);
    setAnchorElement(null);
  };

  return (
    <>
      <ButtonBase
        onClick={(event) => setAnchorElement(event.currentTarget)}
        sx={{
          alignItems: "center",
          border: `1px solid ${tokenAlpha(designTokens.rgb.borderSubtle, 0.95)}`,
          borderRadius: 2,
          display: "flex",
          gap: 1.25,
          justifyContent: "flex-start",
          minHeight: 62,
          px: 1.25,
          py: 1.1,
          textAlign: "left",
          width: "100%",
          transition:
            "border-color 0.2s ease-out, box-shadow 0.2s ease-out, transform 0.2s ease-out",
          "&:hover": {
            borderColor: tokenAlpha(designTokens.rgb.textStrong, 0.28),
            boxShadow: `0 12px 28px ${tokenAlpha(designTokens.rgb.textStrong, 0.07)}`,
            transform: "translateY(-1px)",
          },
        }}
      >
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

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: designTokens.colors.textMuted,
              fontSize: 11,
              fontWeight: 650,
              lineHeight: 1.1,
            }}
          >
            {label}
          </Typography>
          <Typography
            noWrap
            sx={{
              color: designTokens.colors.textPrimary,
              fontSize: 15,
              fontWeight: 650,
              lineHeight: 1.25,
              mt: 0.45,
            }}
          >
            {selectedOption.label}
          </Typography>
        </Box>

        <KeyboardArrowDownRoundedIcon
          sx={{
            color: designTokens.colors.textMuted,
            flexShrink: 0,
            ml: "auto",
          }}
        />
      </ButtonBase>

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
              borderRadius: 3,
              boxShadow: `0 24px 70px ${tokenAlpha(designTokens.rgb.textStrong, 0.14)}`,
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
              <ButtonBase
                key={option.value}
                onClick={() => handleSelect(option.value)}
                sx={{
                  alignItems: "center",
                  borderRadius: 2,
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
                      fontWeight: 800,
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
                        fontWeight: 600,
                        lineHeight: 1.4,
                        mt: 0.45,
                      }}
                    >
                      {option.description}
                    </Typography>
                  ) : null}
                </Box>

                {isSelected ? (
                  <CheckRoundedIcon
                    sx={{
                      color: designTokens.colors.accentTealStrong,
                      flexShrink: 0,
                    }}
                  />
                ) : null}
              </ButtonBase>
            );
          })}
        </Box>
      </Popover>
    </>
  );
}
