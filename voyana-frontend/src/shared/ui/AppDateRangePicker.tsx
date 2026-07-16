import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import {
  Box,
  Popover,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { designTokens, tokenAlpha } from "../constants/designTokens";
import { AppButton } from "./AppButton";

export type AppDateRangeValue = {
  startDate: string;
  endDate: string;
};

type AppDateRangePickerProps = {
  label?: string;
  size?: "default" | "compact";
  value: AppDateRangeValue;
  onChange: (value: AppDateRangeValue) => void;
};

const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"] as const;

const toIsoDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseIsoDate = (value: string) => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
};

const formatShortDate = (value: string) => {
  const date = parseIsoDate(value);

  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  }).format(date);
};

const formatDetailDate = (value: string) => {
  const date = parseIsoDate(value);

  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getMonthCells = (visibleMonth: Date) => {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const cells: (Date | null)[] = Array.from({ length: firstDay }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
};

export function AppDateRangePicker({
  label = "Dates",
  size = "default",
  value,
  onChange,
}: AppDateRangePickerProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const selectedStartDate = parseIsoDate(value.startDate);

    return selectedStartDate ?? new Date();
  });
  const isOpen = Boolean(anchorElement);
  const monthCells = useMemo(
    () => getMonthCells(visibleMonth),
    [visibleMonth],
  );
  const visibleMonthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);
  const isCompact = size === "compact";
  const rangeLabel =
    value.startDate && value.endDate
      ? isCompact
        ? `${formatDetailDate(value.startDate)} -> ${formatDetailDate(value.endDate)}`
        : `${formatShortDate(value.startDate)} - ${formatShortDate(value.endDate)}`
      : "Select dates";

  const handleDateClick = (date: Date) => {
    const selectedDate = toIsoDate(date);

    if (!value.startDate || value.endDate) {
      onChange({ startDate: selectedDate, endDate: "" });
      return;
    }

    if (selectedDate < value.startDate) {
      onChange({ startDate: selectedDate, endDate: value.startDate });
      return;
    }

    onChange({ startDate: value.startDate, endDate: selectedDate });
  };

  const handleMonthChange = (direction: -1 | 1) => {
    setVisibleMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + direction,
          1,
        ),
    );
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
            <CalendarMonthRoundedIcon fontSize="small" />
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
              color: value.startDate
                ? designTokens.colors.textPrimary
                : designTokens.colors.textBody,
              fontSize: isCompact ? 15 : 16,
              fontWeight: value.startDate
                ? designTokens.typography.labelWeight
                : designTokens.typography.regularWeight,
              lineHeight: 1.25,
              mt: isCompact ? 0.45 : 0.75,
            }}
          >
            {rangeLabel}
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
              p: 2,
              width: { xs: "calc(100vw - 32px)", sm: 360 },
            },
          },
        }}
      >
        <Box sx={{ alignItems: "center", display: "flex", gap: 1 }}>
          <AppButton
            intent="icon"
            aria-label="Previous month"
            onClick={() => handleMonthChange(-1)}
            icon={<KeyboardArrowLeftRoundedIcon />}
            sx={{ color: designTokens.colors.textStrong }}
          />
          <Typography
            sx={{
              color: designTokens.colors.textPrimary,
              flex: 1,
              fontSize: 16,
              fontWeight: designTokens.typography.headingWeight,
              textAlign: "center",
            }}
          >
            {visibleMonthLabel}
          </Typography>
          <AppButton
            intent="icon"
            aria-label="Next month"
            onClick={() => handleMonthChange(1)}
            icon={<KeyboardArrowRightRoundedIcon />}
            sx={{ color: designTokens.colors.textStrong }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 0.75,
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            mt: 2,
          }}
        >
          {weekdayLabels.map((weekday) => (
            <Typography
              key={weekday}
              sx={{
                color: designTokens.colors.textMuted,
                fontSize: 12,
                fontWeight: designTokens.typography.labelWeight,
                py: 0.5,
                textAlign: "center",
              }}
            >
              {weekday}
            </Typography>
          ))}

          {monthCells.map((date, index) => {
            if (!date) {
              return <Box key={`empty-${index}`} />;
            }

            const isoDate = toIsoDate(date);
            const isStartDate = value.startDate === isoDate;
            const isEndDate = value.endDate === isoDate;
            const isInRange =
              Boolean(value.startDate && value.endDate) &&
              isoDate > value.startDate &&
              isoDate < value.endDate;
            const isSelected = isStartDate || isEndDate;

            return (
              <AppButton
                intent="control"
                key={isoDate}
                type="button"
                onClick={() => handleDateClick(date)}
                sx={{
                  aspectRatio: "1 / 1",
                  bgcolor: isSelected
                    ? designTokens.colors.buttonPrimary
                    : isInRange
                      ? tokenAlpha(designTokens.rgb.buttonPrimary, 0.22)
                      : "transparent",
                  borderRadius: designTokens.radius.pill,
                  color: isSelected
                    ? designTokens.colors.buttonPrimaryText
                    : designTokens.colors.textPrimary,
                  fontSize: 13,
                  fontWeight: designTokens.typography.labelWeight,
                  minWidth: 0,
                  p: 0,
                  "&:hover": {
                    bgcolor: isSelected
                      ? designTokens.colors.buttonPrimaryHover
                      : tokenAlpha(designTokens.rgb.buttonPrimary, 0.18),
                  },
                }}
              >
                {date.getDate()}
              </AppButton>
            );
          })}
        </Box>
      </Popover>
    </>
  );
}
