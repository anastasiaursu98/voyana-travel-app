import "dotenv/config";
import mongoose from "mongoose";
import Destination from "../modules/destinations/models/Destination.model";
import Offer from "../modules/offers/models/Offer.model";
import OfferCategory from "../modules/offers/models/OfferCategory.model";
import OfferType from "../modules/offers/models/OfferType.model";

type SeedOffer = {
  code: string;
  destinationSlug: string;
  payload: SeedOfferPayload;
};

type SeedOfferPayload = Record<string, unknown> & {
  classification: {
    category: string;
    offerType: string;
  };
};

type OfferLookupSeed = {
  displayOrder: number;
  id: string;
  isActive: boolean;
  label: string;
  value: string;
};

type OfferCategoryLookupSeed = OfferLookupSeed & {
  description: string;
};

type OfferTypeLookupSeed = OfferLookupSeed & {
  categoryValue: string;
};

const allInclusiveStartDate = new Date("2026-07-10T00:00:00.000Z");
const allInclusiveEndDate = new Date("2026-07-17T00:00:00.000Z");
const maldivesAllInclusiveStartDate = new Date("2026-08-05T00:00:00.000Z");
const maldivesAllInclusiveEndDate = new Date("2026-08-13T00:00:00.000Z");
const dubaiAllInclusiveStartDate = new Date("2026-09-12T00:00:00.000Z");
const dubaiAllInclusiveEndDate = new Date("2026-09-19T00:00:00.000Z");
const costaBravaAllInclusiveStartDate = new Date("2026-07-24T00:00:00.000Z");
const costaBravaAllInclusiveEndDate = new Date("2026-07-31T00:00:00.000Z");
const switzerlandSkiStartDate = new Date("2026-12-12T00:00:00.000Z");
const switzerlandSkiEndDate = new Date("2026-12-19T00:00:00.000Z");
const tanzaniaSafariStartDate = new Date("2026-08-18T00:00:00.000Z");
const tanzaniaSafariEndDate = new Date("2026-08-26T00:00:00.000Z");
const spainTourStartDate = new Date("2026-10-06T00:00:00.000Z");
const spainTourEndDate = new Date("2026-10-13T00:00:00.000Z");
const egyptLastMinuteStartDate = new Date("2026-07-18T00:00:00.000Z");
const egyptLastMinuteEndDate = new Date("2026-07-22T00:00:00.000Z");

const hurghadaOfferCode = "hurghada-red-sea-resort-all-inclusive";
const maldivesOfferCode = "maldives-lagoon-all-inclusive";
const dubaiOfferCode = "dubai-palm-all-inclusive-resort";
const costaBravaOfferCode = "barcelona-costa-brava-all-inclusive";
const switzerlandSkiOfferCode = "switzerland-alpine-ski-retreat";
const tanzaniaSafariOfferCode = "tanzania-guided-safari-adventure";
const spainTourOfferCode = "spain-guided-culture-tour";
const egyptLastMinuteOfferCode = "egypt-last-minute-red-sea-break";

const offerCategorySeeds: OfferCategoryLookupSeed[] = [
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
      "Premium hotels, private villas, upgraded experiences, refined dining, and high-comfort travel.",
    displayOrder: 7,
    id: "luxury",
    isActive: true,
    label: "Luxury",
    value: "LUXURY",
  },
  {
    description:
      "Sea and river cruise holidays with planned routes, onboard services, and port-based experiences.",
    displayOrder: 8,
    id: "cruises",
    isActive: true,
    label: "Cruises",
    value: "CRUISES",
  },
  {
    description:
      "Winter stays with ski access, alpine resorts, snow activities, chalets, and seasonal mountain trips.",
    displayOrder: 9,
    id: "ski-and-winter",
    isActive: true,
    label: "Ski and winter",
    value: "SKI_AND_WINTER",
  },
  {
    description:
      "Multi-stop guided routes, day-by-day itineraries, local guides, cultural visits, and planned transportation.",
    displayOrder: 10,
    id: "tours",
    isActive: true,
    label: "Tours",
    value: "TOURS",
  },
  {
    description:
      "Ready-to-book offers for flexible travelers with near departure dates, visible savings, and quick decisions.",
    displayOrder: 11,
    id: "last-minute",
    isActive: true,
    label: "Last minute",
    value: "LAST_MINUTE",
  },
];

const offerTypeSeeds: OfferTypeLookupSeed[] = [
  {
    categoryValue: "BEACH_HOLIDAYS",
    displayOrder: 1,
    id: "all-inclusive-resort",
    isActive: true,
    label: "All inclusive resort",
    value: "ALL_INCLUSIVE_RESORT",
  },
  {
    categoryValue: "BEACH_HOLIDAYS",
    displayOrder: 2,
    id: "island-escape",
    isActive: true,
    label: "Island escape",
    value: "ISLAND_ESCAPE",
  },
  {
    categoryValue: "BEACH_HOLIDAYS",
    displayOrder: 3,
    id: "beach-family-package",
    isActive: true,
    label: "Beach family package",
    value: "BEACH_FAMILY_PACKAGE",
  },
  {
    categoryValue: "ADVENTURE_AND_OUTDOOR",
    displayOrder: 4,
    id: "safari-package",
    isActive: true,
    label: "Safari package",
    value: "SAFARI_PACKAGE",
  },
  {
    categoryValue: "ADVENTURE_AND_OUTDOOR",
    displayOrder: 5,
    id: "trekking-trip",
    isActive: true,
    label: "Trekking trip",
    value: "TREKKING_TRIP",
  },
  {
    categoryValue: "ADVENTURE_AND_OUTDOOR",
    displayOrder: 6,
    id: "diving-trip",
    isActive: true,
    label: "Diving trip",
    value: "DIVING_TRIP",
  },
  {
    categoryValue: "CITY_BREAKS",
    displayOrder: 7,
    id: "city-weekend",
    isActive: true,
    label: "City weekend",
    value: "CITY_WEEKEND",
  },
  {
    categoryValue: "CULTURE_AND_HISTORY",
    displayOrder: 8,
    id: "heritage-experience",
    isActive: true,
    label: "Heritage experience",
    value: "HERITAGE_EXPERIENCE",
  },
  {
    categoryValue: "FAMILY",
    displayOrder: 9,
    id: "family-holiday-package",
    isActive: true,
    label: "Family holiday package",
    value: "FAMILY_HOLIDAY_PACKAGE",
  },
  {
    categoryValue: "WELLNESS_AND_SPA",
    displayOrder: 10,
    id: "wellness-retreat",
    isActive: true,
    label: "Wellness retreat",
    value: "WELLNESS_RETREAT",
  },
  {
    categoryValue: "LUXURY",
    displayOrder: 11,
    id: "honeymoon-package",
    isActive: true,
    label: "Honeymoon package",
    value: "HONEYMOON_PACKAGE",
  },
  {
    categoryValue: "LUXURY",
    displayOrder: 12,
    id: "luxury-city-escape",
    isActive: true,
    label: "Luxury city escape",
    value: "LUXURY_CITY_ESCAPE",
  },
  {
    categoryValue: "CRUISES",
    displayOrder: 13,
    id: "cruise-package",
    isActive: true,
    label: "Cruise package",
    value: "CRUISE_PACKAGE",
  },
  {
    categoryValue: "LUXURY",
    displayOrder: 14,
    id: "luxury-cruise",
    isActive: true,
    label: "Luxury cruise",
    value: "LUXURY_CRUISE",
  },
  {
    categoryValue: "SKI_AND_WINTER",
    displayOrder: 15,
    id: "ski-package",
    isActive: true,
    label: "Ski package",
    value: "SKI_PACKAGE",
  },
  {
    categoryValue: "TOURS",
    displayOrder: 16,
    id: "guided-tour-package",
    isActive: true,
    label: "Guided tour package",
    value: "GUIDED_TOUR_PACKAGE",
  },
  {
    categoryValue: "LAST_MINUTE",
    displayOrder: 17,
    id: "last-minute-deal",
    isActive: true,
    label: "Last minute deal",
    value: "LAST_MINUTE_DEAL",
  },
];

const legacyOfferTypeByClassification = new Map<string, string>([
  ["BEACH_HOLIDAYS:ALL_INCLUSIVE_BEACH_RESORT", "ALL_INCLUSIVE_RESORT"],
  ["BEACH_HOLIDAYS:ADVENTURE_TRIP", "DIVING_TRIP"],
  ["CITY_BREAKS:CITY_BREAK", "CITY_WEEKEND"],
  ["CULTURE_AND_HISTORY:CULTURAL_EXPERIENCE", "HERITAGE_EXPERIENCE"],
  ["FAMILY:FAMILY_HOLIDAY", "FAMILY_HOLIDAY_PACKAGE"],
  ["WELLNESS_AND_SPA:WELLNESS_RETREAT", "WELLNESS_RETREAT"],
  ["LUXURY:HONEYMOON", "HONEYMOON_PACKAGE"],
  ["LUXURY:CITY_BREAK", "LUXURY_CITY_ESCAPE"],
  ["LUXURY:CRUISE", "LUXURY_CRUISE"],
  ["CRUISES:CRUISE", "CRUISE_PACKAGE"],
  ["SKI_AND_WINTER:SKI_RESORT", "SKI_PACKAGE"],
  ["ADVENTURE_AND_OUTDOOR:ADVENTURE_TRIP", "TREKKING_TRIP"],
  ["ADVENTURE_AND_OUTDOOR:GUIDED_TOUR", "SAFARI_PACKAGE"],
  ["TOURS:GUIDED_TOUR", "GUIDED_TOUR_PACKAGE"],
  ["LAST_MINUTE:LAST_MINUTE_DEAL", "LAST_MINUTE_DEAL"],
]);

const getSeedOfferTypeValue = ({
  category,
  offerType,
}: SeedOfferPayload["classification"]) => {
  const mappedOfferType = legacyOfferTypeByClassification.get(
    `${category}:${offerType}`,
  );

  if (!mappedOfferType) {
    throw new Error(
      `Missing offer type mapping for classification ${category}:${offerType}`,
    );
  }

  return mappedOfferType;
};

const curatedSeedOffers: SeedOffer[] = [
  {
    code: hurghadaOfferCode,
    destinationSlug: "egypt",
    payload: {
      code: hurghadaOfferCode,
      slug: hurghadaOfferCode,
      name: "All Inclusive Beach Resort",
      description:
        "Seven-night Red Sea resort package with all-inclusive meals, beach access, pool facilities, optional transfers, and family-friendly room choices.",
      classification: {
        offerType: "ALL_INCLUSIVE_BEACH_RESORT",
        category: "BEACH_HOLIDAYS",
      },
      media: {
        coverImage: {
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
          alt: "Sunny Red Sea beach resort with umbrellas and blue water",
          caption: "Hurghada Red Sea coast",
        },
        galleryImages: [
          {
            id: "hurghada-resort-pool",
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
            alt: "Resort pool near the coast",
            caption: "Lagoon pool and resort facilities",
          },
          {
            id: "hurghada-snorkeling",
            url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
            alt: "Snorkeling in clear sea water",
            caption: "Optional Red Sea activities",
          },
        ],
      },
      pricing: {
        amount: 680,
        currency: "EUR",
        unit: "person",
        originalAmount: 820,
        discountLabel: "Early summer rate",
      },
      travelPeriod: {
        duration: "7 nights",
        startDate: allInclusiveStartDate,
        endDate: allInclusiveEndDate,
      },
      rating: 4.8,
      logistics: {
        amenities: [
          {
            id: "resort-rooms",
            label: "Resort rooms",
            value: "124",
            icon: "hotel",
          },
          {
            id: "swimming-pools",
            label: "Swimming pools",
            value: "5",
            icon: "pool",
          },
          {
            id: "airport-shuttle",
            label: "Airport shuttle",
            value: "Available",
            icon: "airportShuttle",
          },
          {
            id: "fitness-center",
            label: "Fitness center",
            value: "Included",
            icon: "fitness",
          },
          {
            id: "restaurants",
            label: "Restaurants",
            value: "4",
            icon: "restaurant",
          },
          {
            id: "non-smoking-rooms",
            label: "Non-smoking rooms",
            value: "Available",
            icon: "smokeFree",
          },
          {
            id: "room-service",
            label: "Room service",
            value: "Available",
            icon: "roomService",
          },
          {
            id: "tea-coffee-maker",
            label: "Tea/Coffee Maker in All Rooms",
            value: "Included",
            icon: "coffee",
          },
          {
            id: "bar",
            label: "Bar",
            value: "Available",
            icon: "bar",
          },
          {
            id: "private-beach-area",
            label: "Private beach area",
            value: "Included",
            icon: "beach",
          },
          {
            id: "excellent-breakfast",
            label: "Excellent Breakfast",
            value: "Included",
            icon: "breakfast",
          },
          {
            id: "kids-club",
            label: "Kids club",
            value: "Seasonal",
            icon: "family",
          },
        ],
        stayDetails: [
          {
            id: "check-in",
            label: "Check in",
            value: "15:00",
            icon: "calendar",
          },
          {
            id: "check-out",
            label: "Check out",
            value: "12:00",
            icon: "calendar",
          },
          {
            id: "minimum-age",
            label: "Minimum age to check in",
            value: "17",
            icon: "hotel",
          },
        ],
      },
      publishing: {
        isActive: true,
        isFeatured: true,
        priority: 1,
      },
      pageMetadata: {
        pageTitle: "All Inclusive Beach Resort in Hurghada | Voyana",
      },
    },
  },
  {
    code: maldivesOfferCode,
    destinationSlug: "maldives",
    payload: {
      code: maldivesOfferCode,
      slug: maldivesOfferCode,
      name: "Maldives Lagoon All Inclusive Escape",
      description:
        "Eight-night island resort vacation with all-inclusive dining, lagoon access, snorkeling equipment, seaplane transfer options, and overwater room upgrades.",
      classification: {
        offerType: "ALL_INCLUSIVE_BEACH_RESORT",
        category: "BEACH_HOLIDAYS",
      },
      media: {
        coverImage: {
          url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
          alt: "Maldives island resort with turquoise lagoon",
          caption: "Maldives lagoon resort",
        },
        galleryImages: [
          {
            id: "maldives-overwater-villa",
            url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
            alt: "Overwater villas in a Maldives lagoon",
            caption: "Overwater villa upgrade",
          },
          {
            id: "maldives-private-beach",
            url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
            alt: "Tropical beach with clear water",
            caption: "Private beach access",
          },
          {
            id: "maldives-spa-deck",
            url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
            alt: "Seaside spa deck at a resort",
            caption: "Spa and wellness add-ons",
          },
        ],
      },
      pricing: {
        amount: 1480,
        currency: "EUR",
        unit: "person",
        originalAmount: 1760,
        discountLabel: "Island escape",
      },
      travelPeriod: {
        duration: "8 nights",
        startDate: maldivesAllInclusiveStartDate,
        endDate: maldivesAllInclusiveEndDate,
      },
      rating: 4.9,
      logistics: {
        amenities: [
          {
            id: "island-villas",
            label: "Island villas",
            value: "86",
            icon: "hotel",
          },
          {
            id: "infinity-pools",
            label: "Infinity pools",
            value: "3",
            icon: "pool",
          },
          {
            id: "lagoon-access",
            label: "Lagoon access",
            value: "Included",
            icon: "beach",
          },
          {
            id: "snorkeling-gear",
            label: "Snorkeling gear",
            value: "Included",
            icon: "beach",
          },
          {
            id: "restaurants",
            label: "Restaurants",
            value: "5",
            icon: "restaurant",
          },
          {
            id: "spa",
            label: "Spa",
            value: "Available",
            icon: "fitness",
          },
          {
            id: "airport-transfer",
            label: "Airport transfer",
            value: "Optional",
            icon: "airportShuttle",
          },
          {
            id: "bar",
            label: "Sunset bar",
            value: "Available",
            icon: "bar",
          },
        ],
        stayDetails: [
          {
            id: "check-in",
            label: "Check in",
            value: "14:00",
            icon: "calendar",
          },
          {
            id: "check-out",
            label: "Check out",
            value: "11:00",
            icon: "calendar",
          },
          {
            id: "minimum-age",
            label: "Minimum age to check in",
            value: "18",
            icon: "hotel",
          },
        ],
      },
      publishing: {
        isActive: true,
        isFeatured: true,
        priority: 2,
      },
      pageMetadata: {
        pageTitle: "Maldives Lagoon All Inclusive Escape | Voyana",
      },
    },
  },
  {
    code: dubaiOfferCode,
    destinationSlug: "united-arab-emirates",
    payload: {
      code: dubaiOfferCode,
      slug: dubaiOfferCode,
      name: "Dubai Palm All Inclusive Resort",
      description:
        "Seven-night Palm resort vacation with all-inclusive restaurants, private beach access, family pools, waterpark shuttle options, and premium suite upgrades.",
      classification: {
        offerType: "ALL_INCLUSIVE_BEACH_RESORT",
        category: "BEACH_HOLIDAYS",
      },
      media: {
        coverImage: {
          url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
          alt: "Dubai skyline and coastal resort area",
          caption: "Dubai beach resort",
        },
        galleryImages: [
          {
            id: "dubai-resort-pool",
            url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
            alt: "Luxury city hotel pool",
            caption: "Resort pool and beach club",
          },
          {
            id: "dubai-family-resort",
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
            alt: "Modern luxury resort lobby",
            caption: "Family resort facilities",
          },
          {
            id: "dubai-beach-dining",
            url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
            alt: "Restaurant table with resort dining",
            caption: "All-inclusive dining",
          },
        ],
      },
      pricing: {
        amount: 960,
        currency: "EUR",
        unit: "person",
        originalAmount: 1180,
        discountLabel: "Family beach deal",
      },
      travelPeriod: {
        duration: "7 nights",
        startDate: dubaiAllInclusiveStartDate,
        endDate: dubaiAllInclusiveEndDate,
      },
      rating: 4.7,
      logistics: {
        amenities: [
          {
            id: "resort-rooms",
            label: "Resort rooms",
            value: "212",
            icon: "hotel",
          },
          {
            id: "pools",
            label: "Swimming pools",
            value: "4",
            icon: "pool",
          },
          {
            id: "private-beach",
            label: "Private beach area",
            value: "Included",
            icon: "beach",
          },
          {
            id: "airport-transfer",
            label: "Airport transfer",
            value: "Available",
            icon: "airportShuttle",
          },
          {
            id: "restaurants",
            label: "Restaurants",
            value: "6",
            icon: "restaurant",
          },
          {
            id: "fitness-center",
            label: "Fitness center",
            value: "Included",
            icon: "fitness",
          },
          {
            id: "kids-club",
            label: "Kids club",
            value: "Included",
            icon: "family",
          },
          {
            id: "room-service",
            label: "Room service",
            value: "Available",
            icon: "roomService",
          },
        ],
        stayDetails: [
          {
            id: "check-in",
            label: "Check in",
            value: "15:00",
            icon: "calendar",
          },
          {
            id: "check-out",
            label: "Check out",
            value: "12:00",
            icon: "calendar",
          },
          {
            id: "minimum-age",
            label: "Minimum age to check in",
            value: "18",
            icon: "hotel",
          },
        ],
      },
      publishing: {
        isActive: true,
        isFeatured: true,
        priority: 3,
      },
      pageMetadata: {
        pageTitle: "Dubai Palm All Inclusive Resort | Voyana",
      },
    },
  },
  {
    code: costaBravaOfferCode,
    destinationSlug: "spain",
    payload: {
      code: costaBravaOfferCode,
      slug: costaBravaOfferCode,
      name: "Costa Brava All Inclusive Vacation",
      description:
        "Seven-night Mediterranean beach vacation near Barcelona with all-inclusive meals, family activities, coastal excursions, and optional city transfer days.",
      classification: {
        offerType: "ALL_INCLUSIVE_BEACH_RESORT",
        category: "BEACH_HOLIDAYS",
      },
      media: {
        coverImage: {
          url: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=1600&q=80",
          alt: "Barcelona beach coastline on a sunny day",
          caption: "Costa Brava and Barcelona coast",
        },
        galleryImages: [
          {
            id: "costa-brava-coast",
            url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
            alt: "Sunny Mediterranean coastline",
            caption: "Mediterranean beach days",
          },
          {
            id: "barcelona-architecture-day-trip",
            url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80",
            alt: "Barcelona architecture for a day trip",
            caption: "Optional Barcelona day trip",
          },
          {
            id: "costa-brava-food",
            url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80",
            alt: "Mediterranean market food",
            caption: "Local food and wine routes",
          },
        ],
      },
      pricing: {
        amount: 720,
        currency: "EUR",
        unit: "person",
        originalAmount: 890,
        discountLabel: "Mediterranean week",
      },
      travelPeriod: {
        duration: "7 nights",
        startDate: costaBravaAllInclusiveStartDate,
        endDate: costaBravaAllInclusiveEndDate,
      },
      rating: 4.6,
      logistics: {
        amenities: [
          {
            id: "resort-rooms",
            label: "Resort rooms",
            value: "158",
            icon: "hotel",
          },
          {
            id: "swimming-pools",
            label: "Swimming pools",
            value: "3",
            icon: "pool",
          },
          {
            id: "beach-access",
            label: "Beach access",
            value: "Included",
            icon: "beach",
          },
          {
            id: "airport-transfer",
            label: "Airport transfer",
            value: "Optional",
            icon: "airportShuttle",
          },
          {
            id: "restaurants",
            label: "Restaurants",
            value: "4",
            icon: "restaurant",
          },
          {
            id: "family-activities",
            label: "Family activities",
            value: "Included",
            icon: "family",
          },
          {
            id: "bar",
            label: "Pool bar",
            value: "Available",
            icon: "bar",
          },
          {
            id: "breakfast",
            label: "Breakfast",
            value: "Included",
            icon: "breakfast",
          },
        ],
        stayDetails: [
          {
            id: "check-in",
            label: "Check in",
            value: "14:00",
            icon: "calendar",
          },
          {
            id: "check-out",
            label: "Check out",
            value: "11:00",
            icon: "calendar",
          },
          {
            id: "minimum-age",
            label: "Minimum age to check in",
            value: "16",
            icon: "hotel",
          },
        ],
      },
      publishing: {
        isActive: true,
        isFeatured: true,
        priority: 4,
      },
      pageMetadata: {
        pageTitle: "Costa Brava All Inclusive Vacation | Voyana",
      },
    },
  },
  {
    code: switzerlandSkiOfferCode,
    destinationSlug: "switzerland",
    payload: {
      code: switzerlandSkiOfferCode,
      slug: switzerlandSkiOfferCode,
      name: "Switzerland Alpine Ski Retreat",
      description:
        "Seven-night Swiss Alps winter package with mountain hotel stay, ski pass options, guided snow activities, wellness access, and rail transfer choices.",
      classification: {
        offerType: "SKI_RESORT",
        category: "SKI_AND_WINTER",
      },
      media: {
        coverImage: {
          url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
          alt: "Snowy Swiss alpine village and mountain slopes",
          caption: "Swiss Alps winter retreat",
        },
        galleryImages: [
          {
            id: "switzerland-ski-slopes",
            url: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=80",
            alt: "Ski slopes in the Alps",
            caption: "Ski area access",
          },
          {
            id: "switzerland-mountain-lodge",
            url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
            alt: "Mountain lodge with alpine view",
            caption: "Mountain hotel stay",
          },
          {
            id: "switzerland-hiking-trail",
            url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
            alt: "Swiss Alps hiking trail",
            caption: "Snowshoe and nature routes",
          },
        ],
      },
      pricing: {
        amount: 1180,
        currency: "EUR",
        unit: "person",
        originalAmount: 1390,
        discountLabel: "Winter week",
      },
      travelPeriod: {
        duration: "7 nights",
        startDate: switzerlandSkiStartDate,
        endDate: switzerlandSkiEndDate,
      },
      rating: 4.7,
      logistics: {
        amenities: [
          {
            id: "mountain-hotel",
            label: "Mountain hotel",
            value: "Included",
            icon: "hotel",
          },
          {
            id: "ski-area",
            label: "Ski area",
            value: "Nearby",
            icon: "mountain",
          },
          {
            id: "wellness-access",
            label: "Wellness access",
            value: "Included",
            icon: "spa",
          },
          {
            id: "breakfast",
            label: "Breakfast",
            value: "Included",
            icon: "breakfast",
          },
          {
            id: "rail-transfer",
            label: "Rail transfer",
            value: "Optional",
            icon: "transport",
          },
        ],
        stayDetails: [
          {
            id: "check-in",
            label: "Check in",
            value: "15:00",
            icon: "calendar",
          },
          {
            id: "check-out",
            label: "Check out",
            value: "11:00",
            icon: "calendar",
          },
          {
            id: "ski-season",
            label: "Best season",
            value: "December to March",
            icon: "mountain",
          },
        ],
      },
      publishing: {
        isActive: true,
        isFeatured: true,
        priority: 5,
      },
      pageMetadata: {
        pageTitle: "Switzerland Alpine Ski Retreat | Voyana",
      },
    },
  },
  {
    code: tanzaniaSafariOfferCode,
    destinationSlug: "tanzania",
    payload: {
      code: tanzaniaSafariOfferCode,
      slug: tanzaniaSafariOfferCode,
      name: "Tanzania Guided Safari Adventure",
      description:
        "Eight-night guided Tanzania safari with lodge stays, national park drives, wildlife viewing, optional trekking extension, and airport transfer choices.",
      classification: {
        offerType: "ADVENTURE_TRIP",
        category: "ADVENTURE_AND_OUTDOOR",
      },
      media: {
        coverImage: {
          url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
          alt: "Safari landscape in Tanzania",
          caption: "Tanzania safari route",
        },
        galleryImages: [
          {
            id: "tanzania-safari-drive",
            url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
            alt: "Safari vehicle on an open route",
            caption: "Guided park drives",
          },
          {
            id: "tanzania-wildlife",
            url: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?auto=format&fit=crop&w=1200&q=80",
            alt: "Wildlife on safari",
            caption: "Wildlife viewing",
          },
          {
            id: "tanzania-trekking",
            url: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1200&q=80",
            alt: "Mountain trekking landscape",
            caption: "Optional trekking extension",
          },
        ],
      },
      pricing: {
        amount: 1320,
        currency: "EUR",
        unit: "person",
        originalAmount: 1540,
        discountLabel: "Safari route",
      },
      travelPeriod: {
        duration: "8 nights",
        startDate: tanzaniaSafariStartDate,
        endDate: tanzaniaSafariEndDate,
      },
      rating: 4.8,
      logistics: {
        amenities: [
          {
            id: "safari-lodges",
            label: "Safari lodges",
            value: "Included",
            icon: "hotel",
          },
          {
            id: "guided-drives",
            label: "Guided drives",
            value: "5",
            icon: "activity",
          },
          {
            id: "park-access",
            label: "Park access",
            value: "Included",
            icon: "location",
          },
          {
            id: "airport-transfer",
            label: "Airport transfer",
            value: "Available",
            icon: "airportShuttle",
          },
          {
            id: "meals",
            label: "Meals",
            value: "Half board",
            icon: "meal",
          },
        ],
        stayDetails: [
          {
            id: "arrival",
            label: "Arrival",
            value: "Arusha airport",
            icon: "airportShuttle",
          },
          {
            id: "group-size",
            label: "Group size",
            value: "2 to 8 travelers",
            icon: "family",
          },
          {
            id: "guide",
            label: "Local guide",
            value: "Included",
            icon: "activity",
          },
        ],
      },
      publishing: {
        isActive: true,
        isFeatured: true,
        priority: 6,
      },
      pageMetadata: {
        pageTitle: "Tanzania Guided Safari Adventure | Voyana",
      },
    },
  },
  {
    code: spainTourOfferCode,
    destinationSlug: "spain",
    payload: {
      code: spainTourOfferCode,
      slug: spainTourOfferCode,
      name: "Spain Guided Culture Tour",
      description:
        "Seven-night guided Spain tour with Barcelona, coastal towns, cultural visits, selected meals, planned transfers, and a day-by-day sightseeing route.",
      classification: {
        offerType: "GUIDED_TOUR",
        category: "TOURS",
      },
      media: {
        coverImage: {
          url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1600&q=80",
          alt: "Barcelona architecture and city streets",
          caption: "Spain guided culture route",
        },
        galleryImages: [
          {
            id: "spain-tour-barcelona",
            url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
            alt: "Barcelona city architecture",
            caption: "Barcelona city visit",
          },
          {
            id: "spain-tour-coast",
            url: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=1200&q=80",
            alt: "Mediterranean coast in Spain",
            caption: "Coastal town day",
          },
          {
            id: "spain-tour-food",
            url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80",
            alt: "Spanish market food and local tasting",
            caption: "Food and culture stop",
          },
        ],
      },
      pricing: {
        amount: 980,
        currency: "EUR",
        unit: "person",
        originalAmount: 1160,
        discountLabel: "Guided tour",
      },
      travelPeriod: {
        duration: "7 nights",
        startDate: spainTourStartDate,
        endDate: spainTourEndDate,
      },
      rating: 4.7,
      logistics: {
        amenities: [
          {
            id: "city-hotels",
            label: "City hotels",
            value: "Included",
            icon: "hotel",
          },
          {
            id: "local-guide",
            label: "Local guide",
            value: "Included",
            icon: "activity",
          },
          {
            id: "planned-transport",
            label: "Planned transport",
            value: "Included",
            icon: "transport",
          },
          {
            id: "selected-meals",
            label: "Selected meals",
            value: "Included",
            icon: "meal",
          },
          {
            id: "cultural-visits",
            label: "Cultural visits",
            value: "6",
            icon: "location",
          },
        ],
        stayDetails: [
          {
            id: "group-size",
            label: "Group size",
            value: "6 to 14 travelers",
            icon: "family",
          },
          {
            id: "route",
            label: "Route",
            value: "Barcelona and coast",
            icon: "location",
          },
          {
            id: "guide",
            label: "Tour guide",
            value: "Included",
            icon: "activity",
          },
        ],
      },
      publishing: {
        isActive: true,
        isFeatured: true,
        priority: 7,
      },
      pageMetadata: {
        pageTitle: "Spain Guided Culture Tour | Voyana",
      },
    },
  },
  {
    code: egyptLastMinuteOfferCode,
    destinationSlug: "egypt",
    payload: {
      code: egyptLastMinuteOfferCode,
      slug: egyptLastMinuteOfferCode,
      name: "Egypt Last Minute Red Sea Break",
      description:
        "Four-night Red Sea last-minute escape with beach hotel stay, breakfast, quick booking availability, optional airport transfer, and flexible room choices.",
      classification: {
        offerType: "LAST_MINUTE_DEAL",
        category: "LAST_MINUTE",
      },
      media: {
        coverImage: {
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
          alt: "Sunny beach and sea for a last-minute escape",
          caption: "Red Sea last-minute beach break",
        },
        galleryImages: [
          {
            id: "egypt-last-minute-beach",
            url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
            alt: "Clear water and beach",
            caption: "Beach days",
          },
          {
            id: "egypt-last-minute-hotel",
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
            alt: "Comfortable hotel pool",
            caption: "Quick stay hotel",
          },
          {
            id: "egypt-last-minute-snorkeling",
            url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
            alt: "Snorkeling in clear sea water",
            caption: "Optional activities",
          },
        ],
      },
      pricing: {
        amount: 390,
        currency: "EUR",
        unit: "person",
        originalAmount: 540,
        discountLabel: "Last minute",
      },
      travelPeriod: {
        duration: "4 nights",
        startDate: egyptLastMinuteStartDate,
        endDate: egyptLastMinuteEndDate,
      },
      rating: 4.5,
      logistics: {
        amenities: [
          {
            id: "hotel-stay",
            label: "Hotel stay",
            value: "Included",
            icon: "hotel",
          },
          {
            id: "breakfast",
            label: "Breakfast",
            value: "Included",
            icon: "breakfast",
          },
          {
            id: "beach-access",
            label: "Beach access",
            value: "Included",
            icon: "beach",
          },
          {
            id: "airport-transfer",
            label: "Airport transfer",
            value: "Optional",
            icon: "airportShuttle",
          },
          {
            id: "instant-confirmation",
            label: "Quick confirmation",
            value: "Available",
            icon: "calendar",
          },
        ],
        stayDetails: [
          {
            id: "booking-window",
            label: "Booking window",
            value: "Near departure",
            icon: "calendar",
          },
          {
            id: "duration",
            label: "Duration",
            value: "4 nights",
            icon: "calendar",
          },
          {
            id: "room-options",
            label: "Room options",
            value: "Flexible",
            icon: "hotel",
          },
        ],
      },
      publishing: {
        isActive: true,
        isFeatured: true,
        priority: 8,
      },
      pageMetadata: {
        pageTitle: "Egypt Last Minute Red Sea Break | Voyana",
      },
    },
  },
];

type GeneratedOfferTemplate = {
  category: string;
  durationNights: number;
  imageId: string;
  imageUrl: string;
  offerType: string;
  priceOffset: number;
  title: string;
  theme: string;
};

type GeneratedDestinationConfig = {
  basePrice: number;
  destinationName: string;
  destinationSlug: string;
  templates: GeneratedOfferTemplate[];
};

const generatedDestinationConfigs: GeneratedDestinationConfig[] = [
  {
    basePrice: 680,
    destinationName: "Egypt",
    destinationSlug: "egypt",
    templates: [
      {
        category: "BEACH_HOLIDAYS",
        durationNights: 7,
        imageId: "egypt-diving",
        imageUrl:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
        offerType: "ADVENTURE_TRIP",
        priceOffset: 140,
        theme: "Red Sea diving",
        title: "Red Sea Diving Week",
      },
      {
        category: "CULTURE_AND_HISTORY",
        durationNights: 5,
        imageId: "egypt-culture",
        imageUrl:
          "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1600&q=80",
        offerType: "CULTURAL_EXPERIENCE",
        priceOffset: 90,
        theme: "historic temples",
        title: "Egypt Culture and Coast",
      },
      {
        category: "FAMILY",
        durationNights: 7,
        imageId: "egypt-family",
        imageUrl:
          "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80",
        offerType: "FAMILY_HOLIDAY",
        priceOffset: 120,
        theme: "family beach",
        title: "Egypt Family Beach Holiday",
      },
      {
        category: "WELLNESS_AND_SPA",
        durationNights: 6,
        imageId: "egypt-wellness",
        imageUrl:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
        offerType: "WELLNESS_RETREAT",
        priceOffset: 210,
        theme: "sea spa",
        title: "Egypt Red Sea Wellness Stay",
      },
      {
        category: "LUXURY",
        durationNights: 7,
        imageId: "egypt-luxury",
        imageUrl:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
        offerType: "HONEYMOON",
        priceOffset: 340,
        theme: "romantic resort",
        title: "Egypt Romantic Resort Escape",
      },
      {
        category: "ADVENTURE_AND_OUTDOOR",
        durationNights: 4,
        imageId: "egypt-desert",
        imageUrl:
          "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80",
        offerType: "ADVENTURE_TRIP",
        priceOffset: 160,
        theme: "desert adventure",
        title: "Egypt Desert Adventure",
      },
      {
        category: "CITY_BREAKS",
        durationNights: 4,
        imageId: "egypt-city",
        imageUrl:
          "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1600&q=80",
        offerType: "CITY_BREAK",
        priceOffset: 80,
        theme: "city and coast",
        title: "Egypt City and Coast Break",
      },
      {
        category: "CRUISES",
        durationNights: 6,
        imageId: "egypt-cruise",
        imageUrl:
          "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=80",
        offerType: "CRUISE",
        priceOffset: 260,
        theme: "river cruise",
        title: "Egypt River Cruise Discovery",
      },
      {
        category: "BEACH_HOLIDAYS",
        durationNights: 10,
        imageId: "egypt-long-stay",
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
        offerType: "ALL_INCLUSIVE_BEACH_RESORT",
        priceOffset: 280,
        theme: "long beach stay",
        title: "Egypt Long Stay Beach Deal",
      },
    ],
  },
  {
    basePrice: 520,
    destinationName: "Spain",
    destinationSlug: "spain",
    templates: [
      {
        category: "CITY_BREAKS",
        durationNights: 3,
        imageId: "spain-city-break",
        imageUrl:
          "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=80",
        offerType: "CITY_BREAK",
        priceOffset: 0,
        theme: "city break",
        title: "Spain Weekend City Break",
      },
      {
        category: "CULTURE_AND_HISTORY",
        durationNights: 4,
        imageId: "spain-culture",
        imageUrl:
          "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1600&q=80",
        offerType: "CULTURAL_EXPERIENCE",
        priceOffset: 95,
        theme: "culture tour",
        title: "Spain Architecture and Culture",
      },
      {
        category: "FAMILY",
        durationNights: 7,
        imageId: "spain-family",
        imageUrl:
          "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=1600&q=80",
        offerType: "FAMILY_HOLIDAY",
        priceOffset: 160,
        theme: "family coast",
        title: "Spain Family Coast Holiday",
      },
      {
        category: "CULTURE_AND_HISTORY",
        durationNights: 5,
        imageId: "spain-food",
        imageUrl:
          "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1600&q=80",
        offerType: "CULTURAL_EXPERIENCE",
        priceOffset: 140,
        theme: "food and wine",
        title: "Spain Food and Wine Route",
      },
      {
        category: "BEACH_HOLIDAYS",
        durationNights: 6,
        imageId: "spain-beach",
        imageUrl:
          "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80",
        offerType: "ALL_INCLUSIVE_BEACH_RESORT",
        priceOffset: 220,
        theme: "beach escape",
        title: "Spain Mediterranean Beach Escape",
      },
      {
        category: "CRUISES",
        durationNights: 7,
        imageId: "spain-cruise",
        imageUrl:
          "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=80",
        offerType: "CRUISE",
        priceOffset: 380,
        theme: "mediterranean cruise",
        title: "Spain Mediterranean Cruise",
      },
      {
        category: "LUXURY",
        durationNights: 5,
        imageId: "spain-luxury",
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
        offerType: "HONEYMOON",
        priceOffset: 360,
        theme: "boutique luxury",
        title: "Spain Boutique Luxury Stay",
      },
      {
        category: "ADVENTURE_AND_OUTDOOR",
        durationNights: 5,
        imageId: "spain-hiking",
        imageUrl:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
        offerType: "ADVENTURE_TRIP",
        priceOffset: 180,
        theme: "coastal hiking",
        title: "Spain Coastal Hiking Trip",
      },
      {
        category: "WELLNESS_AND_SPA",
        durationNights: 4,
        imageId: "spain-wellness",
        imageUrl:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
        offerType: "WELLNESS_RETREAT",
        priceOffset: 260,
        theme: "wellness weekend",
        title: "Spain Wellness Weekend",
      },
    ],
  },
  {
    basePrice: 890,
    destinationName: "Switzerland",
    destinationSlug: "switzerland",
    templates: [
      {
        category: "ADVENTURE_AND_OUTDOOR",
        durationNights: 6,
        imageId: "switzerland-hiking",
        imageUrl:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
        offerType: "ADVENTURE_TRIP",
        priceOffset: 120,
        theme: "alpine hiking",
        title: "Switzerland Alpine Hiking Week",
      },
      {
        category: "SKI_AND_WINTER",
        durationNights: 5,
        imageId: "switzerland-ski-short",
        imageUrl:
          "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1600&q=80",
        offerType: "SKI_RESORT",
        priceOffset: 240,
        theme: "ski break",
        title: "Switzerland Ski Break",
      },
      {
        category: "LUXURY",
        durationNights: 5,
        imageId: "switzerland-luxury",
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
        offerType: "HONEYMOON",
        priceOffset: 520,
        theme: "luxury chalet",
        title: "Switzerland Luxury Chalet Stay",
      },
      {
        category: "WELLNESS_AND_SPA",
        durationNights: 4,
        imageId: "switzerland-spa",
        imageUrl:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
        offerType: "WELLNESS_RETREAT",
        priceOffset: 340,
        theme: "alpine spa",
        title: "Switzerland Alpine Spa Retreat",
      },
      {
        category: "CITY_BREAKS",
        durationNights: 3,
        imageId: "switzerland-city",
        imageUrl:
          "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1600&q=80",
        offerType: "CITY_BREAK",
        priceOffset: 90,
        theme: "city and lake",
        title: "Switzerland City and Lake Break",
      },
      {
        category: "FAMILY",
        durationNights: 6,
        imageId: "switzerland-family",
        imageUrl:
          "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
        offerType: "FAMILY_HOLIDAY",
        priceOffset: 280,
        theme: "family winter",
        title: "Switzerland Family Winter Holiday",
      },
      {
        category: "ADVENTURE_AND_OUTDOOR",
        durationNights: 7,
        imageId: "switzerland-train",
        imageUrl:
          "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
        offerType: "GUIDED_TOUR",
        priceOffset: 360,
        theme: "scenic rail",
        title: "Switzerland Scenic Rail Tour",
      },
      {
        category: "SKI_AND_WINTER",
        durationNights: 8,
        imageId: "switzerland-snow",
        imageUrl:
          "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80",
        offerType: "SKI_RESORT",
        priceOffset: 430,
        theme: "snow week",
        title: "Switzerland Snow Week",
      },
      {
        category: "CULTURE_AND_HISTORY",
        durationNights: 4,
        imageId: "switzerland-culture",
        imageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
        offerType: "CULTURAL_EXPERIENCE",
        priceOffset: 180,
        theme: "alpine villages",
        title: "Switzerland Alpine Villages",
      },
    ],
  },
  {
    basePrice: 1120,
    destinationName: "Tanzania",
    destinationSlug: "tanzania",
    templates: [
      {
        category: "ADVENTURE_AND_OUTDOOR",
        durationNights: 7,
        imageId: "tanzania-national-park",
        imageUrl:
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
        offerType: "GUIDED_TOUR",
        priceOffset: 160,
        theme: "national parks",
        title: "Tanzania National Park Tour",
      },
      {
        category: "ADVENTURE_AND_OUTDOOR",
        durationNights: 9,
        imageId: "tanzania-wildlife",
        imageUrl:
          "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?auto=format&fit=crop&w=1600&q=80",
        offerType: "ADVENTURE_TRIP",
        priceOffset: 330,
        theme: "wildlife lodge",
        title: "Tanzania Wildlife Lodge Safari",
      },
      {
        category: "ADVENTURE_AND_OUTDOOR",
        durationNights: 6,
        imageId: "tanzania-trekking",
        imageUrl:
          "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1600&q=80",
        offerType: "ADVENTURE_TRIP",
        priceOffset: 260,
        theme: "trekking",
        title: "Tanzania Trekking Expedition",
      },
      {
        category: "FAMILY",
        durationNights: 7,
        imageId: "tanzania-family",
        imageUrl:
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
        offerType: "FAMILY_HOLIDAY",
        priceOffset: 220,
        theme: "family safari",
        title: "Tanzania Family Safari",
      },
      {
        category: "LUXURY",
        durationNights: 8,
        imageId: "tanzania-luxury",
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
        offerType: "HONEYMOON",
        priceOffset: 620,
        theme: "luxury safari",
        title: "Tanzania Luxury Safari Escape",
      },
      {
        category: "CULTURE_AND_HISTORY",
        durationNights: 5,
        imageId: "tanzania-culture",
        imageUrl:
          "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=80",
        offerType: "CULTURAL_EXPERIENCE",
        priceOffset: 170,
        theme: "local culture",
        title: "Tanzania Culture and Safari",
      },
      {
        category: "ADVENTURE_AND_OUTDOOR",
        durationNights: 10,
        imageId: "tanzania-great-migration",
        imageUrl:
          "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?auto=format&fit=crop&w=1600&q=80",
        offerType: "GUIDED_TOUR",
        priceOffset: 480,
        theme: "migration route",
        title: "Tanzania Migration Route",
      },
      {
        category: "WELLNESS_AND_SPA",
        durationNights: 6,
        imageId: "tanzania-wellness",
        imageUrl:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
        offerType: "WELLNESS_RETREAT",
        priceOffset: 300,
        theme: "bush wellness",
        title: "Tanzania Bush Wellness Retreat",
      },
      {
        category: "BEACH_HOLIDAYS",
        durationNights: 9,
        imageId: "tanzania-beach",
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
        offerType: "ALL_INCLUSIVE_BEACH_RESORT",
        priceOffset: 400,
        theme: "safari and beach",
        title: "Tanzania Safari and Beach",
      },
    ],
  },
  {
    basePrice: 1480,
    destinationName: "Maldives",
    destinationSlug: "maldives",
    templates: [
      {
        category: "LUXURY",
        durationNights: 7,
        imageId: "maldives-private-villa",
        imageUrl:
          "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
        offerType: "HONEYMOON",
        priceOffset: 420,
        theme: "private villa",
        title: "Maldives Private Villa Escape",
      },
      {
        category: "WELLNESS_AND_SPA",
        durationNights: 6,
        imageId: "maldives-spa",
        imageUrl:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
        offerType: "WELLNESS_RETREAT",
        priceOffset: 260,
        theme: "island spa",
        title: "Maldives Island Spa Retreat",
      },
      {
        category: "BEACH_HOLIDAYS",
        durationNights: 5,
        imageId: "maldives-short",
        imageUrl:
          "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
        offerType: "ALL_INCLUSIVE_BEACH_RESORT",
        priceOffset: -180,
        theme: "short island stay",
        title: "Maldives Short Island Stay",
      },
      {
        category: "ADVENTURE_AND_OUTDOOR",
        durationNights: 6,
        imageId: "maldives-diving",
        imageUrl:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
        offerType: "ADVENTURE_TRIP",
        priceOffset: 120,
        theme: "diving",
        title: "Maldives Diving Trip",
      },
      {
        category: "FAMILY",
        durationNights: 7,
        imageId: "maldives-family",
        imageUrl:
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
        offerType: "FAMILY_HOLIDAY",
        priceOffset: 220,
        theme: "family island",
        title: "Maldives Family Island Holiday",
      },
      {
        category: "LUXURY",
        durationNights: 8,
        imageId: "maldives-yacht",
        imageUrl:
          "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=80",
        offerType: "CRUISE",
        priceOffset: 520,
        theme: "yacht lagoon",
        title: "Maldives Yacht Lagoon Experience",
      },
      {
        category: "BEACH_HOLIDAYS",
        durationNights: 10,
        imageId: "maldives-long",
        imageUrl:
          "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
        offerType: "ALL_INCLUSIVE_BEACH_RESORT",
        priceOffset: 380,
        theme: "long island stay",
        title: "Maldives Long Island Escape",
      },
      {
        category: "LUXURY",
        durationNights: 7,
        imageId: "maldives-romantic",
        imageUrl:
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
        offerType: "HONEYMOON",
        priceOffset: 470,
        theme: "honeymoon",
        title: "Maldives Honeymoon Package",
      },
      {
        category: "WELLNESS_AND_SPA",
        durationNights: 9,
        imageId: "maldives-yoga",
        imageUrl:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
        offerType: "WELLNESS_RETREAT",
        priceOffset: 440,
        theme: "yoga retreat",
        title: "Maldives Yoga Retreat",
      },
    ],
  },
  {
    basePrice: 760,
    destinationName: "United Arab Emirates",
    destinationSlug: "united-arab-emirates",
    templates: [
      {
        category: "LUXURY",
        durationNights: 5,
        imageId: "uae-luxury",
        imageUrl:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
        offerType: "HONEYMOON",
        priceOffset: 280,
        theme: "luxury city",
        title: "UAE Luxury City Stay",
      },
      {
        category: "CITY_BREAKS",
        durationNights: 3,
        imageId: "uae-city",
        imageUrl:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
        offerType: "CITY_BREAK",
        priceOffset: -40,
        theme: "city stopover",
        title: "UAE City Stopover",
      },
      {
        category: "FAMILY",
        durationNights: 6,
        imageId: "uae-family",
        imageUrl:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80",
        offerType: "FAMILY_HOLIDAY",
        priceOffset: 210,
        theme: "family resort",
        title: "UAE Family Resort Holiday",
      },
      {
        category: "LUXURY",
        durationNights: 4,
        imageId: "uae-business",
        imageUrl:
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80",
        offerType: "CITY_BREAK",
        priceOffset: 160,
        theme: "business travel",
        title: "UAE Business Travel Package",
      },
      {
        category: "ADVENTURE_AND_OUTDOOR",
        durationNights: 4,
        imageId: "uae-desert",
        imageUrl:
          "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80",
        offerType: "ADVENTURE_TRIP",
        priceOffset: 130,
        theme: "desert",
        title: "UAE Desert Adventure",
      },
      {
        category: "BEACH_HOLIDAYS",
        durationNights: 7,
        imageId: "uae-beach",
        imageUrl:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
        offerType: "ALL_INCLUSIVE_BEACH_RESORT",
        priceOffset: 260,
        theme: "beach resort",
        title: "UAE Beach Resort Week",
      },
      {
        category: "WELLNESS_AND_SPA",
        durationNights: 5,
        imageId: "uae-wellness",
        imageUrl:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
        offerType: "WELLNESS_RETREAT",
        priceOffset: 230,
        theme: "spa city",
        title: "UAE Spa City Retreat",
      },
      {
        category: "CULTURE_AND_HISTORY",
        durationNights: 4,
        imageId: "uae-culture",
        imageUrl:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80",
        offerType: "CULTURAL_EXPERIENCE",
        priceOffset: 100,
        theme: "culture",
        title: "UAE Culture and Skyline",
      },
      {
        category: "CRUISES",
        durationNights: 6,
        imageId: "uae-cruise",
        imageUrl:
          "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=80",
        offerType: "CRUISE",
        priceOffset: 340,
        theme: "gulf cruise",
        title: "UAE Gulf Cruise Break",
      },
    ],
  },
];

const generatedSeedOffers: SeedOffer[] = generatedDestinationConfigs.flatMap(
  (destinationConfig) =>
    destinationConfig.templates.map((template, templateIndex) => {
      const code = `${destinationConfig.destinationSlug}-${template.imageId}-offer`;
      const startDate = new Date(
        Date.UTC(2026, templateIndex % 12, 5 + templateIndex),
      );
      const endDate = new Date(startDate);
      endDate.setUTCDate(startDate.getUTCDate() + template.durationNights);
      const amount = Math.max(
        360,
        destinationConfig.basePrice + template.priceOffset,
      );

      return {
        code,
        destinationSlug: destinationConfig.destinationSlug,
        payload: {
          code,
          slug: code,
          name: template.title,
          description: `${template.durationNights}-night ${template.theme} package in ${destinationConfig.destinationName} with curated stays, practical transfers, and flexible upgrade choices.`,
          classification: {
            category: template.category,
            offerType: template.offerType,
          },
          media: {
            coverImage: {
              url: template.imageUrl,
              alt: `${template.title} in ${destinationConfig.destinationName}`,
              caption: template.theme,
            },
            galleryImages: [
              {
                id: `${template.imageId}-primary`,
                url: template.imageUrl,
                alt: `${template.theme} preview`,
                caption: template.title,
              },
              {
                id: `${template.imageId}-stay`,
                url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
                alt: "Comfort travel accommodation",
                caption: "Stay options",
              },
            ],
          },
          pricing: {
            amount,
            currency: "EUR",
            unit: "person",
            originalAmount: amount + 160,
            discountLabel: "Curated deal",
          },
          travelPeriod: {
            duration: `${template.durationNights} nights`,
            startDate,
            endDate,
          },
          rating: Number((4.4 + (templateIndex % 5) * 0.1).toFixed(1)),
          logistics: {
            amenities: [
              {
                id: "accommodation",
                label: "Accommodation",
                value: "Included",
                icon: "hotel",
              },
              {
                id: "transfer",
                label: "Transfer",
                value: "Optional",
                icon: "airportShuttle",
              },
              {
                id: "activities",
                label: "Activities",
                value: "Available",
                icon: "activity",
              },
              {
                id: "meals",
                label: "Meals",
                value: "Selected plans",
                icon: "meal",
              },
            ],
            stayDetails: [
              {
                id: "duration",
                label: "Duration",
                value: `${template.durationNights} nights`,
                icon: "calendar",
              },
              {
                id: "destination",
                label: "Destination",
                value: destinationConfig.destinationName,
                icon: "location",
              },
            ],
          },
          publishing: {
            isActive: true,
            isFeatured: templateIndex < 2,
            priority: 20 + templateIndex,
          },
          pageMetadata: {
            pageTitle: `${template.title} | Voyana`,
          },
        },
      };
    }),
);

const seedOffers: SeedOffer[] = [...curatedSeedOffers, ...generatedSeedOffers];
const activeOfferCodes = seedOffers.map((seedOffer) => seedOffer.code);
const activeCategoryValues = offerCategorySeeds.map((category) => category.value);
const activeOfferTypeValues = offerTypeSeeds.map((offerType) => offerType.value);

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from the environment");
  }

  await mongoose.connect(mongoUri);
};

const seedOfferCategories = async () => {
  let createdCount = 0;
  let updatedCount = 0;

  for (const categorySeed of offerCategorySeeds) {
    const result = await OfferCategory.updateOne(
      { value: categorySeed.value },
      { $set: categorySeed },
      { upsert: true },
    );

    if (result.upsertedCount > 0) {
      createdCount += result.upsertedCount;
    } else if (result.modifiedCount > 0) {
      updatedCount += result.modifiedCount;
    }
  }

  return { createdCount, updatedCount };
};

const seedOfferTypes = async () => {
  const seededCategories = await OfferCategory.find({
    value: { $in: activeCategoryValues },
  }).select("_id value");
  const categoryIdByValue = new Map<string, mongoose.Types.ObjectId>();
  let createdCount = 0;
  let updatedCount = 0;

  for (const category of seededCategories) {
    categoryIdByValue.set(
      category.value,
      category._id as mongoose.Types.ObjectId,
    );
  }

  for (const { categoryValue, ...offerTypeSeed } of offerTypeSeeds) {
    const categoryId = categoryIdByValue.get(categoryValue);

    if (!categoryId) {
      throw new Error(
        `Missing category ${categoryValue} for offer type ${offerTypeSeed.value}`,
      );
    }

    const result = await OfferType.updateOne(
      { value: offerTypeSeed.value },
      {
        $set: {
          ...offerTypeSeed,
          categoryId,
        },
      },
      { upsert: true },
    );

    if (result.upsertedCount > 0) {
      createdCount += result.upsertedCount;
    } else if (result.modifiedCount > 0) {
      updatedCount += result.modifiedCount;
    }
  }

  return { createdCount, updatedCount };
};

const seedOfferExamples = async () => {
  await connectToDatabase();

  const categorySeedStats = await seedOfferCategories();
  const offerTypeSeedStats = await seedOfferTypes();
  const seededOfferTypes = await OfferType.find({
    value: { $in: activeOfferTypeValues },
  }).select("_id categoryId value");
  const offerTypeByValue = new Map<
    string,
    {
      categoryId: mongoose.Types.ObjectId;
      typeId: mongoose.Types.ObjectId;
    }
  >();

  for (const offerType of seededOfferTypes) {
    offerTypeByValue.set(
      offerType.value,
      {
        categoryId: offerType.categoryId as mongoose.Types.ObjectId,
        typeId: offerType._id as mongoose.Types.ObjectId,
      },
    );
  }

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const seedOffer of seedOffers) {
    const destination = await Destination.findOne({
      slug: seedOffer.destinationSlug,
    });

    if (!destination) {
      skippedCount += 1;
      console.warn(
        `Skipped offer ${seedOffer.code}. Destination ${seedOffer.destinationSlug} was not found.`,
      );
      continue;
    }

    const offerTypeValue = getSeedOfferTypeValue(
      seedOffer.payload.classification,
    );
    const taxonomy = offerTypeByValue.get(offerTypeValue);

    if (!taxonomy) {
      skippedCount += 1;
      console.warn(
        `Skipped offer ${seedOffer.code}. Offer type ${offerTypeValue} was not found.`,
      );
      continue;
    }

    const { classification: _seedClassification, ...offerPayload } =
      seedOffer.payload;

    const result = await Offer.updateOne(
      { code: seedOffer.code },
      {
        $set: {
          ...offerPayload,
          category: taxonomy.categoryId,
          destinationId: destination._id,
          type: taxonomy.typeId,
        },
        $unset: {
          active: "",
          attributes: "",
          classification: "",
          details: "",
          duration: "",
          endDate: "",
          imageUrl: "",
          price: "",
          sections: "",
          shortDescription: "",
          startDate: "",

          trip: "",
          typeSpecificData: "",
        },
      },
      { upsert: true, strict: false },
    );
    if (result.upsertedCount > 0) {
      createdCount += result.upsertedCount;
    } else if (result.modifiedCount > 0) {
      updatedCount += result.modifiedCount;
    }
  }

  const deleteResult = await Offer.deleteMany({
    code: { $nin: activeOfferCodes },
  });
  const deleteOfferTypesResult = await OfferType.deleteMany({
    value: { $nin: activeOfferTypeValues },
  });
  const deleteCategoriesResult = await OfferCategory.deleteMany({
    value: { $nin: activeCategoryValues },
  });

  const cleanupResult = await Offer.collection.updateMany(
    {},
    {
      $unset: {
        attributes: "",
        classification: "",
        sections: "",
        shortDescription: "",
        trip: "",
        typeSpecificData: "",
        "pageMetadata.pageDescription": "",
      },
    },
  );

  console.log(
    `Seeded offer examples successfully. Categories created: ${categorySeedStats.createdCount}, categories updated: ${categorySeedStats.updatedCount}, categories deleted: ${deleteCategoriesResult.deletedCount}, offer types created: ${offerTypeSeedStats.createdCount}, offer types updated: ${offerTypeSeedStats.updatedCount}, offer types deleted: ${deleteOfferTypesResult.deletedCount}, offers created: ${createdCount}, offers updated: ${updatedCount}, offers skipped: ${skippedCount}, offers deleted: ${deleteResult.deletedCount}, offers cleaned: ${cleanupResult.modifiedCount}.`,
  );
};

seedOfferExamples()
  .catch((error) => {
    console.error("Failed to seed offer examples:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
