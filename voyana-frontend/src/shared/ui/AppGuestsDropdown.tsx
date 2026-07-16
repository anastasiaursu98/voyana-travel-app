import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import {
  Box,
  Popover,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { designTokens, tokenAlpha } from "../constants/designTokens";
import { AppButton } from "./AppButton";

export type AppGuestsValue = {
  adults: number;
  children: number;
  infants: number;
  pets: number;
};

type AppGuestsDropdownProps = {
  displayValue?: string;
  label?: string;
  size?: "default" | "compact";
  value: AppGuestsValue;
  onChange: (value: AppGuestsValue) => void;
};

type GuestCounterKey = keyof AppGuestsValue;

const guestRows: {
  key: GuestCounterKey;
  label: string;
  helperText: string;
  min: number;
}[] = [
  {
    key: "adults",
    label: "Adults",
    helperText: "Ages 13 or above",
    min: 0,
  },
  {
    key: "children",
    label: "Children",
    helperText: "Ages 2 - 12",
    min: 0,
  },
  {
    key: "infants",
    label: "Infants",
    helperText: "Under 2",
    min: 0,
  },
  {
    key: "pets",
    label: "Pets",
    helperText: "Service animals welcome",
    min: 0,
  },
];

const getGuestsLabel = ({ adults, children, infants, pets }: AppGuestsValue) => {
  const totalGuests = adults + children;
  const labelParts: string[] = [];

  if (totalGuests > 0) {
    labelParts.push(totalGuests === 1 ? "1 guest" : `${totalGuests} guests`);
  }

  if (infants > 0) {
    labelParts.push(infants === 1 ? "1 infant" : `${infants} infants`);
  }

  if (pets > 0) {
    labelParts.push(pets === 1 ? "1 pet" : `${pets} pets`);
  }

  return labelParts.length > 0 ? labelParts.join(", ") : "Add guests";
};

export function AppGuestsDropdown({
  displayValue,
  label = "Guests",
  size = "default",
  value,
  onChange,
}: AppGuestsDropdownProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorElement);
  const isCompact = size === "compact";

  const handleCounterChange = (key: GuestCounterKey, direction: -1 | 1) => {
    const row = guestRows.find((guestRow) => guestRow.key === key);
    const minimumValue = row?.min ?? 0;
    const nextValue = Math.max(minimumValue, value[key] + direction);

    onChange({ ...value, [key]: nextValue });
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
          <Box
            sx={{
              alignItems: "center",
              bgcolor: isCompact
                ? "transparent"
                : tokenAlpha(designTokens.rgb.backgroundInput, 0.9),
              borderRadius: isCompact ? 0 : 1.5,
              color: isCompact
                ? designTokens.colors.textMuted
                : designTokens.colors.textStrong,
              display: "grid",
              flexShrink: 0,
              height: isCompact ? 28 : 42,
              placeItems: "center",
              width: isCompact ? 28 : 42,
            }}
          >
            <PersonRoundedIcon fontSize="small" />
          </Box>
        }
        sx={{
          alignItems: "center",
          border: `1px solid ${tokenAlpha(designTokens.rgb.borderSubtle, 0.95)}`,
          borderRadius: designTokens.radius.card,
          display: "flex",
          gap: isCompact ? 1.25 : 1.5,
          justifyContent: "flex-start",
          minHeight: isCompact ? 62 : 72,
          px: isCompact ? 1.25 : 2,
          py: isCompact ? 1.1 : 1.5,
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
          <Typography
            sx={{
              color: designTokens.colors.textMuted,
              fontSize: isCompact ? 11 : 12,
              fontWeight: designTokens.typography.labelWeight,
              lineHeight: 1.1,
            }}
          >
            {label}
          </Typography>
          <Typography
            noWrap
            sx={{
              color: designTokens.colors.textPrimary,
              fontSize: isCompact ? 15 : 16,
              fontWeight: designTokens.typography.labelWeight,
              lineHeight: 1.25,
              mt: isCompact ? 0.45 : 0.75,
            }}
          >
            {displayValue ?? getGuestsLabel(value)}
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
              p: 2.5,
              width: { xs: "calc(100vw - 32px)", sm: 360 },
            },
          },
        }}
      >
        <Box sx={{ display: "grid", gap: 2.25 }}>
          {guestRows.map((row) => {
            const currentValue = value[row.key];
            const canDecrease = currentValue > row.min;

            return (
              <Box
                key={row.key}
                sx={{
                  alignItems: "center",
                  display: "flex",
                  gap: 2,
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: designTokens.colors.textPrimary,
                      fontSize: 16,
                      fontWeight: designTokens.typography.headingWeight,
                    }}
                  >
                    {row.label}
                  </Typography>
                  <Typography
                    sx={{
                      color: designTokens.colors.textMuted,
                      fontSize: 14,
                      fontWeight: designTokens.typography.regularWeight,
                      mt: 0.25,
                    }}
                  >
                    {row.helperText}
                  </Typography>
                </Box>

                <Box sx={{ alignItems: "center", display: "flex", gap: 1.25 }}>
                  <AppButton
                    intent="icon"
                    aria-label={`Decrease ${row.label.toLowerCase()}`}
                    disabled={!canDecrease}
                    onClick={() => handleCounterChange(row.key, -1)}
                    icon={<RemoveRoundedIcon fontSize="small" />}
                    sx={{
                      bgcolor: tokenAlpha(designTokens.rgb.backgroundInput, 0.9),
                      color: designTokens.colors.textStrong,
                      "&:hover": {
                        bgcolor: tokenAlpha(
                          designTokens.rgb.buttonPrimary,
                          0.22,
                        ),
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      color: designTokens.colors.textPrimary,
                      fontSize: 16,
                      fontWeight: designTokens.typography.labelWeight,
                      minWidth: 20,
                      textAlign: "center",
                    }}
                  >
                    {currentValue}
                  </Typography>
                  <AppButton
                    intent="icon"
                    aria-label={`Increase ${row.label.toLowerCase()}`}
                    onClick={() => handleCounterChange(row.key, 1)}
                    icon={<AddRoundedIcon fontSize="small" />}
                    sx={{
                      bgcolor: tokenAlpha(designTokens.rgb.backgroundInput, 0.9),
                      color: designTokens.colors.textStrong,
                      "&:hover": {
                        bgcolor: tokenAlpha(
                          designTokens.rgb.buttonPrimary,
                          0.22,
                        ),
                      },
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Popover>
    </>
  );
}
