import type { HeroSearchPanel } from "./types";

type CalendarDay = {
  label: string;
  muted?: boolean;
} | null;

type CalendarMonth = {
  days: readonly CalendarDay[];
  title: string;
};

type GuestGroup = {
  label: string;
  note: string;
  underlined?: boolean;
};

export const heroSearchSegments: readonly {
  id: HeroSearchPanel;
  label: string;
  value: string;
}[] = [
  {
    id: "where",
    label: "Where",
    value: "Search destinations",
  },
  {
    id: "when",
    label: "When",
    value: "Add dates",
  },
  {
    id: "who",
    label: "Who",
    value: "Add guests",
  },
] as const;

export const destinationSuggestions = [
  {
    accent: "rgb(var(--voyana-rgb-button-primary) / 0.12)",
    icon: "nearby",
    iconColor: "rgb(var(--voyana-rgb-button-primary))",
    subtitle: "Find what's around you",
    title: "Nearby",
  },
  {
    accent: "rgb(var(--voyana-rgb-button-primary) / 0.16)",
    icon: "city",
    iconColor: "rgb(var(--voyana-rgb-accent-teal-strong))",
    subtitle: "For sights like Central Park",
    title: "Cluj-Napoca, Romania",
  },
  {
    accent: "rgb(var(--voyana-rgb-accent-teal) / 0.14)",
    icon: "forest",
    iconColor: "rgb(var(--voyana-rgb-accent-teal-strong))",
    subtitle: "For a quiet weekend abroad",
    title: "Iasi, Romania",
  },
  {
    accent: "rgb(var(--voyana-rgb-background-section) / 0.96)",
    icon: "temple",
    iconColor: "rgb(var(--voyana-rgb-text-strong))",
    subtitle: "For its bustling nightlife",
    title: "Budapest, Hungary",
  },
  {
    accent: "rgb(var(--voyana-rgb-button-primary) / 0.12)",
    icon: "apartment",
    iconColor: "rgb(var(--voyana-rgb-button-primary-active))",
    subtitle: "For its stunning architecture",
    title: "Sibiu, Romania",
  },
  {
    accent: "rgb(255 111 97 / 0.12)",
    icon: "church",
    iconColor: "rgb(220 66 55)",
    subtitle: "For sights like Trevi Fountain",
    title: "Rome, Italy",
  },
  {
    accent: "rgb(var(--voyana-rgb-button-primary) / 0.12)",
    icon: "mountain",
    iconColor: "rgb(var(--voyana-rgb-button-primary))",
    subtitle: "For nature-lovers",
    title: "Brasov, Romania",
  },
] as const;

export const calendarTabs = ["Dates", "Flexible"] as const;

export const calendarMonths: readonly CalendarMonth[] = [
  {
    days: [
      null,
      { label: "1", muted: true },
      { label: "2", muted: true },
      { label: "3", muted: true },
      { label: "4", muted: true },
      { label: "5", muted: true },
      { label: "6", muted: true },
      { label: "7", muted: true },
      { label: "8", muted: true },
      { label: "9", muted: true },
      { label: "10", muted: true },
      { label: "11", muted: true },
      { label: "12", muted: true },
      { label: "13", muted: true },
      { label: "14", muted: true },
      { label: "15", muted: true },
      { label: "16", muted: true },
      { label: "17", muted: true },
      { label: "18", muted: true },
      { label: "19", muted: true },
      { label: "20", muted: true },
      { label: "21", muted: true },
      { label: "22" },
      { label: "23" },
      { label: "24" },
      { label: "25" },
      { label: "26" },
      { label: "27" },
      { label: "28" },
      { label: "29" },
      { label: "30" },
    ],
    title: "June 2026",
  },
  {
    days: [
      null,
      null,
      null,
      { label: "1" },
      { label: "2" },
      { label: "3" },
      { label: "4" },
      { label: "5" },
      { label: "6" },
      { label: "7" },
      { label: "8" },
      { label: "9" },
      { label: "10" },
      { label: "11" },
      { label: "12" },
      { label: "13" },
      { label: "14" },
      { label: "15" },
      { label: "16" },
      { label: "17" },
      { label: "18" },
      { label: "19" },
      { label: "20" },
      { label: "21" },
      { label: "22" },
      { label: "23" },
      { label: "24" },
      { label: "25" },
      { label: "26" },
      { label: "27" },
      { label: "28" },
      { label: "29" },
      { label: "30" },
      { label: "31" },
    ],
    title: "July 2026",
  },
] as const;

export const flexibleDateOptions = [
  "Exact dates",
  "+ 1 day",
  "+ 2 days",
  "+ 3 days",
  "+ 7 days",
  "+ 14 days",
] as const;

export const guestGroups: readonly GuestGroup[] = [
  {
    label: "Adults",
    note: "Ages 13 or above",
  },
  {
    label: "Children",
    note: "Ages 2 - 12",
  },
  {
    label: "Infants",
    note: "Under 2",
  },
  {
    label: "Pets",
    note: "Bringing a service animal?",
    underlined: true,
  },
] as const;

export const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"] as const;
