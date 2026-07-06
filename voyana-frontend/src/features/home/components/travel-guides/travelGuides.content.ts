import { homeImages } from "../../constants/homeImages";

export const travelGuides = [
  {
    title: "Best time for island stays",
    description: "Weather windows, quieter weeks, and when prices soften.",
    imageUrl: homeImages.boraBoraLagoon,
  },
  {
    title: "How to plan a safari route",
    description: "Match lodge locations, transfer times, and wildlife seasons.",
    imageUrl: homeImages.africaSafari,
  },
  {
    title: "Coastal city weekends",
    description: "Local food, compact itineraries, and hotel areas that work.",
    imageUrl: homeImages.europeCoastalTown,
  },
] as const;
