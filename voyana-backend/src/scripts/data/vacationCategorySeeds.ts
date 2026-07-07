export type VacationCategorySeed = {
  description: string;
  displayOrder: number;
  id: string;
  isActive: boolean;
  label: string;
  value: string;
};

export const vacationCategorySeeds: VacationCategorySeed[] = [
  {
    description:
      "Sunny resort stays, sea views, island escapes, and relaxed all-inclusive beach packages.",
    displayOrder: 1,
    id: "beach-holidays",
    isActive: true,
    label: "Beach holidays",
    value: "BEACH_HOLIDAYS",
  },
  {
    description:
      "Short urban breaks with culture, food, shopping, events, and convenient flight options.",
    displayOrder: 2,
    id: "city-breaks",
    isActive: true,
    label: "City breaks",
    value: "CITY_BREAKS",
  },
  {
    description:
      "Heritage routes, guided cultural visits, museums, local traditions, and historic city stays.",
    displayOrder: 3,
    id: "culture-and-history",
    isActive: true,
    label: "Culture and history",
    value: "CULTURE_AND_HISTORY",
  },
  {
    description:
      "Active itineraries with nature routes, safaris, hikes, outdoor tours, and guided exploration.",
    displayOrder: 4,
    id: "adventure-and-outdoor",
    isActive: true,
    label: "Adventure and outdoor",
    value: "ADVENTURE_AND_OUTDOOR",
  },
  {
    description:
      "Family-friendly holidays with flexible rooms, kids activities, easy logistics, and comfortable stays.",
    displayOrder: 5,
    id: "family",
    isActive: true,
    label: "Family",
    value: "FAMILY",
  },
  {
    description:
      "Spa hotels, wellness retreats, restorative stays, thermal facilities, and slower-paced escapes.",
    displayOrder: 6,
    id: "wellness-and-spa",
    isActive: true,
    label: "Wellness and spa",
    value: "WELLNESS_AND_SPA",
  },
  {
    description:
      "Sea and river cruise holidays with planned routes, onboard services, and port-based experiences.",
    displayOrder: 7,
    id: "cruises",
    isActive: true,
    label: "Cruises",
    value: "CRUISES",
  },
  {
    description:
      "Winter stays with ski access, alpine resorts, snow activities, chalets, and seasonal mountain trips.",
    displayOrder: 8,
    id: "ski-and-winter",
    isActive: true,
    label: "Ski and winter",
    value: "SKI_AND_WINTER",
  },
  {
    description:
      "Multi-stop guided routes, day-by-day itineraries, local guides, cultural visits, and planned transportation.",
    displayOrder: 9,
    id: "tours-and-itineraries",
    isActive: true,
    label: "Tours and itineraries",
    value: "TOURS_AND_ITINERARIES",
  },
];
