import { homeImages } from "../../constants/homeImages";

export const curatedCollections = [
  {
    title: "Family resorts",
    description: "Pools, family rooms, kids clubs, and relaxed dining.",
    image: homeImages.africaSafari,
    accent: "var(--voyana-color-button-primary)",
    icon: "family",
  },
  {
    title: "Adults-only hotels",
    description: "Quiet stays with spa access, fine dining, and calm beaches.",
    image: homeImages.japaneseTemple,
    accent: "var(--voyana-color-accent-teal)",
    icon: "adults",
  },
  {
    title: "Beach holidays",
    description: "Waterfront hotels, easy transfers, and soft-sand days.",
    image: homeImages.boraBoraLagoon,
    accent: "var(--voyana-color-accent-teal-strong)",
    icon: "beach",
  },
  {
    title: "City breaks",
    description: "Central stays with short flights and local highlights.",
    image: homeImages.goldenGate,
    accent: "var(--voyana-color-button-primary)",
    icon: "city",
  },
  {
    title: "Villas",
    description: "Private spaces for longer stays, families, and groups.",
    image: homeImages.europeCoastalTown,
    accent: "var(--voyana-color-accent-warm)",
    icon: "villa",
  },
] as const;
