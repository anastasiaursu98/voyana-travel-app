import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { Box, Popover, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { designTokens, tokenAlpha } from "../../../../../shared/constants/designTokens";
import { AppButton } from "../../../../../shared/ui";
import { formLabelClassName, formLabelStyle } from "../../../../../shared/ui";

type AddOfferCalendarFieldProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
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

const formatDate = (value: string) => {
  const date = parseIsoDate(value);

  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
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

export function AddOfferCalendarField({
  label,
  placeholder = "dd/mm/yyyy",
  required = false,
}: AddOfferCalendarFieldProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [value, setValue] = useState("");
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
  const isOpen = Boolean(anchorElement);
  const monthCells = useMemo(
    () => getMonthCells(visibleMonth),
    [visibleMonth],
  );
  const visibleMonthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);

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

  const handleDateClick = (date: Date) => {
    setValue(toIsoDate(date));
    setAnchorElement(null);
  };

  return (
    <div className={formLabelClassName} style={formLabelStyle}>
      <span>
        {label}{" "}
        {required ? <span className="text-(--voyana-color-danger)">*</span> : null}
      </span>
      <AppButton
        intent="control"
        type="button"
        aria-label={`Select ${label}`}
        onClick={(event) => setAnchorElement(event.currentTarget)}
        endIcon={<CalendarMonthRoundedIcon className="text-[1.15rem] text-(--voyana-color-text-muted)" />}
        className="mt-2 flex h-12 w-full items-center justify-between rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] bg-(--voyana-color-background-card) px-3.5 text-left text-sm font-(--voyana-font-weight-regular) outline-none transition hover:border-[rgb(var(--voyana-rgb-text-strong)/0.28)] focus-visible:border-(--voyana-color-accent-teal) focus-visible:ring-4 focus-visible:ring-[rgb(var(--voyana-rgb-accent-teal)/0.15)]"
      >
        <span
          className={
            value
              ? "font-medium text-(--voyana-color-text-muted)"
              : "font-medium text-(--voyana-color-text-soft)"
          }
        >
          {value ? formatDate(value) : placeholder}
        </span>
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
              width: { xs: "calc(100vw - 32px)", sm: 340 },
            },
          },
        }}
      >
        <Box sx={{ alignItems: "center", display: "flex", gap: 1 }}>
          <AppButton
            intent="icon"
            aria-label="Previous month"
            icon={<KeyboardArrowLeftRoundedIcon />}
            onClick={() => handleMonthChange(-1)}
            sx={{ color: designTokens.colors.textStrong }}
          />
          <Typography
            sx={{
              color: designTokens.colors.textPrimary,
              flex: 1,
              fontSize: 15,
              fontWeight: designTokens.typography.headingWeight,
              textAlign: "center",
            }}
          >
            {visibleMonthLabel}
          </Typography>
          <AppButton
            intent="icon"
            aria-label="Next month"
            icon={<KeyboardArrowRightRoundedIcon />}
            onClick={() => handleMonthChange(1)}
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
            const isSelected = value === isoDate;

            return (
              <AppButton
                intent="control"
                key={isoDate}
                type="button"
                onClick={() => handleDateClick(date)}
                sx={{
                  aspectRatio: "1 / 1",
                  bgcolor: isSelected
                    ? designTokens.colors.accentTeal
                    : "transparent",
                  borderRadius: designTokens.radius.pill,
                  color: isSelected
                    ? designTokens.colors.textInverse
                    : designTokens.colors.textPrimary,
                  fontSize: 13,
                  fontWeight: designTokens.typography.labelWeight,
                  minWidth: 0,
                  p: 0,
                  "&:hover": {
                    bgcolor: isSelected
                      ? designTokens.colors.accentTeal
                      : tokenAlpha(designTokens.rgb.accentTeal, 0.14),
                  },
                }}
              >
                {date.getDate()}
              </AppButton>
            );
          })}
        </Box>
      </Popover>
    </div>
  );
}
