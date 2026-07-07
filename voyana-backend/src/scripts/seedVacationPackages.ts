import "dotenv/config";
import mongoose from "mongoose";
import Destination from "../modules/destinations/models/Destination.model";
import VacationPackage from "../modules/vacation-packages/models/VacationPackage.model";
import VacationCategory from "../modules/vacation-packages/models/VacationCategory.model";
import { vacationCategorySeeds } from "./data/vacationCategorySeeds";

type SeedVacationPackage = {
  code: string;
  destinationSlug: string;
  payload: SeedVacationPackagePayload;
};

type SeedVacationPackagePayload = Record<string, unknown> & {
  classification: {
    category: string;
  };
};

type SeedVacationPackageFact = {
  id?: string;
  label?: string;
  value?: string;
};

type SeedVacationPackageLogistics = {
  amenities?: SeedVacationPackageFact[];
  stayDetails?: SeedVacationPackageFact[];
};

type SeedVacationPackagePricing = {
  amount: number;
  currency: string;
  discountLabel?: string;
  originalAmount?: number;
  unit?: string;
};

type SeedVacationPackageTravelPeriod = {
  duration?: string;
  endDate?: Date;
  startDate?: Date;
};

type EnrichedSeedVacationPackagePayload = Record<string, unknown> & {
  accommodation: Record<string, unknown>;
  availability: Record<string, unknown>;
  categoryDetails: Record<string, unknown>;
  commercial: Record<string, unknown>;
  inclusions: Record<string, unknown>;
  policies: Record<string, unknown>;
  transport: Record<string, unknown>;
};

type SeedVacationPackageVideo = {
  caption: string;
  licenseUrl: string;
  provider: string;
  thumbnailUrl?: string;
  title: string;
  url: string;
};

const formatSeedLabel = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const addDays = (date: Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);

  return nextDate;
};

const getPayloadText = (payload: Record<string, unknown>) =>
  [
    payload.code,
    payload.slug,
    payload.name,
    payload.description,
    (payload.pricing as SeedVacationPackagePricing | undefined)?.discountLabel,
  ]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();

const pexelsLicenseUrl = "https://www.pexels.com/license/";

const pexelsVideoByPackageCode: Record<string, Omit<SeedVacationPackageVideo, "thumbnailUrl">> = {
  "hurghada-red-sea-resort-all-inclusive": {
    caption: "Beach resort video inspiration from Pexels.",
    licenseUrl: pexelsLicenseUrl,
    provider: "Pexels",
    title: "Beach resort video",
    url: "https://www.pexels.com/search/videos/beach%20resort/",
  },
  "maldives-lagoon-all-inclusive": {
    caption: "Island lagoon and tropical resort video inspiration from Pexels.",
    licenseUrl: pexelsLicenseUrl,
    provider: "Pexels",
    title: "Maldives island video",
    url: "https://www.pexels.com/search/videos/maldives%20island/",
  },
  "switzerland-alpine-ski-retreat": {
    caption: "Alpine ski and winter resort video inspiration from Pexels.",
    licenseUrl: pexelsLicenseUrl,
    provider: "Pexels",
    title: "Ski resort video",
    url: "https://www.pexels.com/search/videos/ski%20resort/",
  },
  "tanzania-guided-safari-adventure": {
    caption: "Safari and wildlife route video inspiration from Pexels.",
    licenseUrl: pexelsLicenseUrl,
    provider: "Pexels",
    title: "Safari adventure video",
    url: "https://www.pexels.com/search/videos/safari/",
  },
  "spain-guided-culture-tour": {
    caption: "Spain guided travel video inspiration from Pexels.",
    licenseUrl: pexelsLicenseUrl,
    provider: "Pexels",
    title: "Spain guided tour video",
    url: "https://www.pexels.com/search/videos/spain%20travel/",
  },
  "egypt-last-minute-red-sea-break": {
    caption: "Last-minute Red Sea beach break video inspiration from Pexels.",
    licenseUrl: pexelsLicenseUrl,
    provider: "Pexels",
    title: "Red Sea beach break video",
    url: "https://www.pexels.com/search/videos/red%20sea%20beach/",
  },
};

const getSeedMedia = (
  payload: Record<string, unknown>,
): Record<string, unknown> | undefined => {
  const media = payload.media as
    | {
        coverImage?: { url?: string };
      }
    | undefined;
  const packageCode = typeof payload.code === "string" ? payload.code : "";
  const featuredVideo = pexelsVideoByPackageCode[packageCode];

  if (!payload.media || !featuredVideo) {
    return payload.media as Record<string, unknown> | undefined;
  }

  return {
    ...(payload.media as Record<string, unknown>),
    featuredVideo: {
      ...featuredVideo,
      thumbnailUrl: media?.coverImage?.url,
    },
  };
};

const getSeedLogistics = (payload: Record<string, unknown>) =>
  (payload.logistics as SeedVacationPackageLogistics | undefined) ?? {};

const getSeedFacts = (payload: Record<string, unknown>) => {
  const logistics = getSeedLogistics(payload);

  return [...(logistics.amenities ?? []), ...(logistics.stayDetails ?? [])];
};

const hasSeedFact = (payload: Record<string, unknown>, searchTerm: string) =>
  getSeedFacts(payload).some((fact) =>
    [fact.id, fact.label, fact.value]
      .filter((value): value is string => typeof value === "string")
      .some((value) => value.toLowerCase().includes(searchTerm)),
  );

const getSeedFactValue = (
  payload: Record<string, unknown>,
  factIds: string[],
) => {
  const fact = getSeedFacts(payload).find(
    (item) => typeof item.id === "string" && factIds.includes(item.id),
  );

  return fact?.value;
};

const parseSeedFactNumber = (
  payload: Record<string, unknown>,
  factIds: string[],
) => {
  const value = getSeedFactValue(payload, factIds);

  if (!value) {
    return undefined;
  }

  const numericValue = Number.parseInt(value, 10);

  return Number.isNaN(numericValue) ? undefined : numericValue;
};

const getSeedMealPlan = (payload: Record<string, unknown>) => {
  const text = getPayloadText(payload);

  if (text.includes("all inclusive") || text.includes("all-inclusive")) {
    return "ALL_INCLUSIVE";
  }

  if (text.includes("half board")) {
    return "HALF_BOARD";
  }

  if (text.includes("full board")) {
    return "FULL_BOARD";
  }

  if (text.includes("breakfast") || hasSeedFact(payload, "breakfast")) {
    return "BREAKFAST";
  }

  return "SELECTED_MEALS";
};

const getSeedCommercial = (payload: Record<string, unknown>) => {
  const pricing = payload.pricing as SeedVacationPackagePricing | undefined;
  const travelPeriod = payload.travelPeriod as
    | SeedVacationPackageTravelPeriod
    | undefined;
  const text = getPayloadText(payload);
  const isLastMinute = text.includes("last minute");
  const isEarlyBooking = text.includes("early");
  const hasDiscount =
    typeof pricing?.originalAmount === "number" &&
    pricing.originalAmount > pricing.amount;
  const campaignType = isLastMinute
    ? "LAST_MINUTE"
    : isEarlyBooking
      ? "EARLY_BOOKING"
      : hasDiscount
        ? "SPECIAL_OFFER"
        : "STANDARD";
  const badges = [
    campaignType !== "STANDARD" ? campaignType : undefined,
    isLastMinute ? "LIMITED_AVAILABILITY" : undefined,
    getSeedMealPlan(payload) === "ALL_INCLUSIVE" ? "ALL_INCLUSIVE" : undefined,
  ].filter((badge): badge is string => typeof badge === "string");

  return {
    badges,
    bookingDeadline: travelPeriod?.startDate
      ? addDays(travelPeriod.startDate, isLastMinute ? -3 : -30)
      : undefined,
    campaignLabel:
      pricing?.discountLabel ??
      (campaignType === "STANDARD" ? "Standard package" : formatSeedLabel(campaignType.toLowerCase())),
    campaignType,
  };
};

const getSeedAvailability = (payload: Record<string, unknown>) => {
  const text = getPayloadText(payload);
  const isLastMinute = text.includes("last minute");

  return {
    remainingUnits: isLastMinute ? 4 : undefined,
    status: isLastMinute ? "LIMITED" : "AVAILABLE",
    totalUnits: isLastMinute ? 12 : undefined,
    urgencyLabel: isLastMinute ? "Ultimele 4 locuri" : undefined,
  };
};

const getSeedInclusions = (
  payload: Record<string, unknown>,
  categoryValue: string,
) => {
  const text = getPayloadText(payload);
  const transport = [
    text.includes("flight") ? "FLIGHT" : undefined,
    text.includes("airport transfer") ||
    text.includes("airport shuttle") ||
    hasSeedFact(payload, "airport")
      ? "AIRPORT_TRANSFER"
      : undefined,
    categoryValue === "CRUISES" ? "CRUISE" : undefined,
    categoryValue === "TOURS_AND_ITINERARIES" ||
    categoryValue === "CULTURE_AND_HISTORY" ||
    hasSeedFact(payload, "planned transport")
      ? "LOCAL_TRANSPORT"
      : undefined,
  ].filter((item): item is string => typeof item === "string");
  const services = [
    "LOCAL_SUPPORT",
    categoryValue === "TOURS_AND_ITINERARIES" ||
    categoryValue === "CULTURE_AND_HISTORY"
      ? "GUIDED_TOURS"
      : undefined,
    categoryValue === "WELLNESS_AND_SPA" || hasSeedFact(payload, "spa")
      ? "SPA_ACCESS"
      : undefined,
    categoryValue === "FAMILY" || hasSeedFact(payload, "kids")
      ? "KIDS_CLUB"
      : undefined,
    categoryValue === "SKI_AND_WINTER" ? "SKI_PASS_OPTION" : undefined,
    categoryValue === "ADVENTURE_AND_OUTDOOR" ? "ACTIVITY_PLANNING" : undefined,
  ].filter((item): item is string => typeof item === "string");

  return {
    mealPlan: getSeedMealPlan(payload),
    services: Array.from(new Set(services)),
    transport: Array.from(new Set(transport)),
  };
};

const getSeedAccommodation = (
  payload: Record<string, unknown>,
  categoryValue: string,
) => {
  const accommodationType =
    categoryValue === "CRUISES"
      ? "CRUISE_CABIN"
      : categoryValue === "SKI_AND_WINTER"
        ? "CHALET"
        : categoryValue === "ADVENTURE_AND_OUTDOOR"
          ? "LODGE"
          : categoryValue === "BEACH_HOLIDAYS" ||
              categoryValue === "FAMILY" ||
              categoryValue === "WELLNESS_AND_SPA"
            ? "RESORT"
            : "HOTEL";
  const rating = payload.rating;

  return {
    boardBasis: formatSeedLabel(getSeedMealPlan(payload).toLowerCase()),
    rating: typeof rating === "number" ? Math.min(5, Math.floor(rating)) : undefined,
    roomType:
      categoryValue === "CRUISES"
        ? "Standard cabin"
        : categoryValue === "SKI_AND_WINTER"
          ? "Mountain room"
          : "Standard double room",
    type: accommodationType,
  };
};

const getSeedTransport = (
  payload: Record<string, unknown>,
  destinationSlug: string,
  categoryValue: string,
) => {
  const inclusions = getSeedInclusions(payload, categoryValue);

  return {
    arrivalCity: formatSeedLabel(destinationSlug),
    departureCity: "Bucharest",
    included:
      inclusions.transport.includes("FLIGHT") ||
      inclusions.transport.includes("LOCAL_TRANSPORT") ||
      inclusions.transport.includes("CRUISE"),
    types: inclusions.transport,
  };
};

const getSeedPolicies = (
  payload: Record<string, unknown>,
  categoryValue: string,
) => ({
  cancellation:
    getPayloadText(payload).includes("last minute")
      ? "Restricted cancellation close to departure."
      : "Standard supplier cancellation rules apply.",
  children:
    categoryValue === "FAMILY" || categoryValue === "BEACH_HOLIDAYS"
      ? "Children are welcome; age-based supplements may apply."
      : "Children policies depend on the selected accommodation.",
  payment: "Deposit required at booking; balance due before departure.",
});

const getSeedTourItineraryDays = (
  payload: Record<string, unknown>,
  destinationSlug: string,
) => {
  const destinationLabel = formatSeedLabel(destinationSlug);
  const media = payload.media as
    | {
        coverImage?: { alt?: string; caption?: string; url?: string };
        galleryImages?: { alt?: string; caption?: string; id?: string; url?: string }[];
      }
    | undefined;
  const coverImage = media?.coverImage;
  const galleryImages = media?.galleryImages ?? [];
  const fallbackImageUrl =
    coverImage?.url ??
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";
  const getDayImage = (index: number) => {
    const image = galleryImages[index] ?? coverImage;

    return {
      alt: image?.alt ?? `${destinationLabel} tour day ${index + 1}`,
      caption: image?.caption ?? `${destinationLabel} guided tour`,
      id: galleryImages[index]?.id ?? `tour-day-${index + 1}`,
      url: image?.url ?? fallbackImageUrl,
    };
  };

  return [
    {
      accommodation: {
        description:
          "Comfort hotel selected for practical access to the first guided visits.",
        highlights: ["Central area", "Breakfast included", "Easy meeting point"],
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        meta: `${destinationLabel} / central hotel / breakfast included`,
        nights: "2 nights",
        title: `${destinationLabel} city hotel`,
      },
      activities: [
        "Arrival and hotel check-in",
        "Welcome briefing with the tour guide",
        "Evening orientation walk in the central area",
      ],
      cityDescription: `Start the tour in ${destinationLabel} with an easy orientation day, local context, and time to settle into the route.`,
      day: 1,
      departure: "Welcome evening",
      image: getDayImage(0),
      location: destinationLabel,
      stayLabel: "City hotel",
      title: `Arrival in ${destinationLabel}`,
      transportation: {
        arrival: "Hotel drop-off",
        carrier: "Private transfer",
        departure: "Flexible on arrival",
        description:
          "Arrival transfer followed by a short guided orientation near the accommodation.",
        duration: "45-90 min",
        luggage: "1 checked bag",
        route: `Airport or station -> ${destinationLabel} hotel`,
        type: "transfer",
      },
    },
    {
      accommodation: {
        description:
          "Same hotel retained so the day can focus on guided visits instead of repacking.",
        highlights: ["Same room retained", "Breakfast included", "Evening at leisure"],
        imageUrl:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
        meta: `${destinationLabel} / guided visits / breakfast included`,
        nights: "Same stay",
        title: `${destinationLabel} city hotel`,
      },
      activities: [
        "Guided visit to the main historic district",
        "Local food or market stop",
        "Afternoon cultural visit with included admission",
        "Free evening for optional restaurants or walks",
      ],
      cityDescription: `A full guided day focused on the strongest cultural and local experiences in ${destinationLabel}.`,
      day: 2,
      image: getDayImage(1),
      location: destinationLabel,
      stayLabel: "Guided city day",
      title: `${destinationLabel} culture and landmarks`,
      transportation: {
        arrival: "Central area",
        carrier: "Walking route and local transport",
        departure: "Hotel lobby",
        description:
          "Short transfers and walkable sections are combined to keep the itinerary efficient.",
        duration: "Full day",
        luggage: "Luggage stays at hotel",
        route: `${destinationLabel} guided route`,
        type: "walk",
      },
    },
    {
      accommodation: {
        description:
          "Final overnight or late checkout arranged depending on the selected departure time.",
        highlights: ["Breakfast included", "Luggage support", "Late checkout on request"],
        imageUrl:
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80",
        meta: `${destinationLabel} / departure day`,
        nights: "Final night or departure",
        title: `${destinationLabel} departure hotel`,
      },
      activities: [
        "Morning at leisure or optional museum visit",
        "Guide-assisted departure briefing",
        "Transfer to airport or next route point",
      ],
      cityDescription: `The final day keeps the schedule lighter, with time for last visits and a supported departure from ${destinationLabel}.`,
      day: 3,
      departure: "Departure transfer",
      image: getDayImage(2),
      location: destinationLabel,
      stayLabel: "Departure day",
      title: `Final day in ${destinationLabel}`,
      transportation: {
        arrival: "Airport or station",
        carrier: "Private departure transfer",
        departure: "Hotel lobby",
        description:
          "Transfer timing is aligned with the selected flight, train, or onward route.",
        duration: "45-90 min",
        luggage: "1 checked bag",
        route: `${destinationLabel} hotel -> airport or station`,
        type: "transfer",
      },
    },
  ];
};

const getSeedCategoryDetails = (
  payload: Record<string, unknown>,
  categoryValue: string,
  destinationSlug: string,
) => {
  const destinationLabel = formatSeedLabel(destinationSlug);

  switch (categoryValue) {
    case "BEACH_HOLIDAYS":
      return {
        beachAccess: hasSeedFact(payload, "private beach") ? "PRIVATE" : "NEARBY",
        distanceToBeachMeters: hasSeedFact(payload, "beach") ? 100 : 500,
        kidsClub: hasSeedFact(payload, "kids"),
        poolCount: parseSeedFactNumber(payload, [
          "swimming-pools",
          "pools",
          "infinity-pools",
        ]),
        resortFacilities: ["Beach access", "Pool area", "Dining venues"],
      };
    case "TOURS_AND_ITINERARIES":
      return {
        groupSize: 24,
        guideLanguages: ["English"],
        includedAdmissions: ["Selected guided visits"],
        itinerary: [destinationLabel],
        itineraryDays: getSeedTourItineraryDays(payload, destinationSlug),
        pace: "MODERATE",
      };
    case "CRUISES":
      return {
        cabinType: "Standard outside cabin",
        disembarkationPort: destinationLabel,
        embarkationPort: destinationLabel,
        ports: [destinationLabel],
        route: [destinationLabel],
        shipName: "Selected cruise ship",
      };
    case "SKI_AND_WINTER":
      return {
        difficulty: "MIXED",
        distanceToLiftMeters: 450,
        equipmentRentalIncluded: false,
        liftPassIncluded: false,
        skiArea: destinationLabel,
      };
    case "CITY_BREAKS":
      return {
        centralLocation: true,
        includedTickets: ["Optional city experiences"],
        neighborhood: "Central area",
        publicTransportAccess: true,
        recommendedStayStyle: "Short urban stay",
      };
    case "WELLNESS_AND_SPA":
      return {
        adultsOnly: false,
        spaAccessIncluded: true,
        treatmentsIncluded: ["Selected spa access"],
        wellnessProgram: "Relaxation and wellness stay",
      };
    case "FAMILY":
      return {
        babysittingAvailable: false,
        childAgeBands: ["2-11", "12-17"],
        childPricing: "Age-based child rates available on request.",
        familyRooms: true,
        kidsClub: true,
      };
    case "ADVENTURE_AND_OUTDOOR":
      return {
        difficulty: "MODERATE",
        equipmentIncluded: false,
        fitnessLevel: "ACTIVE",
        guideIncluded: true,
        permitsIncluded: false,
      };
    case "CULTURE_AND_HISTORY":
    default:
      return {
        guideLanguages: ["English"],
        includedAdmissions: ["Selected cultural visits"],
        itinerary: [destinationLabel],
        pace: "RELAXED",
      };
  }
};

const enrichSeedVacationPackagePayload = (
  payload: Record<string, unknown>,
  categoryValue: string,
  destinationSlug: string,
): EnrichedSeedVacationPackagePayload => {
  const inclusions = getSeedInclusions(payload, categoryValue);

  return {
    ...payload,
    accommodation: getSeedAccommodation(payload, categoryValue),
    availability: getSeedAvailability(payload),
    categoryDetails: getSeedCategoryDetails(payload, categoryValue, destinationSlug),
    commercial: getSeedCommercial(payload),
    inclusions,
    media: getSeedMedia(payload),
    policies: getSeedPolicies(payload, categoryValue),
    transport: getSeedTransport(payload, destinationSlug, categoryValue),
  };
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

const hurghadaVacationPackageCode = "hurghada-red-sea-resort-all-inclusive";
const maldivesVacationPackageCode = "maldives-lagoon-all-inclusive";
const dubaiVacationPackageCode = "dubai-palm-all-inclusive-resort";
const costaBravaVacationPackageCode = "barcelona-costa-brava-all-inclusive";
const switzerlandSkiVacationPackageCode = "switzerland-alpine-ski-retreat";
const tanzaniaSafariVacationPackageCode = "tanzania-guided-safari-adventure";
const spainTourVacationPackageCode = "spain-guided-culture-tour";
const egyptLastMinuteVacationPackageCode = "egypt-last-minute-red-sea-break";

const curatedSeedVacationPackages: SeedVacationPackage[] = [
  {
    code: hurghadaVacationPackageCode,
    destinationSlug: "egypt",
    payload: {
      code: hurghadaVacationPackageCode,
      slug: hurghadaVacationPackageCode,
      name: "All Inclusive Beach Resort",
      description:
        "Seven-night Red Sea resort package with all-inclusive meals, beach access, pool facilities, optional transfers, and family-friendly room choices.",
      classification: {
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
    code: maldivesVacationPackageCode,
    destinationSlug: "maldives",
    payload: {
      code: maldivesVacationPackageCode,
      slug: maldivesVacationPackageCode,
      name: "Maldives Lagoon All Inclusive Escape",
      description:
        "Eight-night island resort vacation with all-inclusive dining, lagoon access, snorkeling equipment, seaplane transfer options, and overwater room upgrades.",
      classification: {
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
    code: dubaiVacationPackageCode,
    destinationSlug: "united-arab-emirates",
    payload: {
      code: dubaiVacationPackageCode,
      slug: dubaiVacationPackageCode,
      name: "Dubai Palm All Inclusive Resort",
      description:
        "Seven-night Palm resort vacation with all-inclusive restaurants, private beach access, family pools, waterpark shuttle options, and premium suite upgrades.",
      classification: {
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
    code: costaBravaVacationPackageCode,
    destinationSlug: "spain",
    payload: {
      code: costaBravaVacationPackageCode,
      slug: costaBravaVacationPackageCode,
      name: "Costa Brava All Inclusive Vacation",
      description:
        "Seven-night Mediterranean beach vacation near Barcelona with all-inclusive meals, family activities, coastal excursions, and optional city transfer days.",
      classification: {
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
    code: switzerlandSkiVacationPackageCode,
    destinationSlug: "switzerland",
    payload: {
      code: switzerlandSkiVacationPackageCode,
      slug: switzerlandSkiVacationPackageCode,
      name: "Switzerland Alpine Ski Retreat",
      description:
        "Seven-night Swiss Alps winter package with mountain hotel stay, ski pass options, guided snow activities, wellness access, and rail transfer choices.",
      classification: {
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
    code: tanzaniaSafariVacationPackageCode,
    destinationSlug: "tanzania",
    payload: {
      code: tanzaniaSafariVacationPackageCode,
      slug: tanzaniaSafariVacationPackageCode,
      name: "Tanzania Guided Safari Adventure",
      description:
        "Eight-night guided Tanzania safari with lodge stays, national park drives, wildlife viewing, optional trekking extension, and airport transfer choices.",
      classification: {
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
    code: spainTourVacationPackageCode,
    destinationSlug: "spain",
    payload: {
      code: spainTourVacationPackageCode,
      slug: spainTourVacationPackageCode,
      name: "Spain Guided Culture Tour",
      description:
        "Seven-night guided Spain tour with Barcelona, coastal towns, cultural visits, selected meals, planned transfers, and a day-by-day sightseeing route.",
      classification: {
        category: "TOURS_AND_ITINERARIES",
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
    code: egyptLastMinuteVacationPackageCode,
    destinationSlug: "egypt",
    payload: {
      code: egyptLastMinuteVacationPackageCode,
      slug: egyptLastMinuteVacationPackageCode,
      name: "Egypt Last Minute Red Sea Break",
      description:
        "Four-night Red Sea last-minute escape with beach hotel stay, breakfast, quick booking availability, optional airport transfer, and flexible room choices.",
      classification: {
        category: "BEACH_HOLIDAYS",
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

type GeneratedVacationPackageTemplate = {
  category: string;
  durationNights: number;
  imageId: string;
  imageUrl: string;
  priceOffset: number;
  title: string;
  theme: string;
};

type GeneratedDestinationConfig = {
  basePrice: number;
  destinationName: string;
  destinationSlug: string;
  templates: GeneratedVacationPackageTemplate[];
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
        priceOffset: 210,
        theme: "sea spa",
        title: "Egypt Red Sea Wellness Stay",
      },
      {
        category: "CITY_BREAKS",
        durationNights: 7,
        imageId: "egypt-luxury",
        imageUrl:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
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
        priceOffset: 380,
        theme: "mediterranean cruise",
        title: "Spain Mediterranean Cruise",
      },
      {
        category: "SKI_AND_WINTER",
        durationNights: 5,
        imageId: "spain-luxury",
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
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
        priceOffset: 240,
        theme: "ski break",
        title: "Switzerland Ski Break",
      },
      {
        category: "ADVENTURE_AND_OUTDOOR",
        durationNights: 5,
        imageId: "switzerland-luxury",
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
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
        priceOffset: 220,
        theme: "family safari",
        title: "Tanzania Family Safari",
      },
      {
        category: "BEACH_HOLIDAYS",
        durationNights: 8,
        imageId: "tanzania-luxury",
        imageUrl:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
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
        category: "CRUISES",
        durationNights: 7,
        imageId: "maldives-private-villa",
        imageUrl:
          "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1600&q=80",
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
        priceOffset: 220,
        theme: "family island",
        title: "Maldives Family Island Holiday",
      },
      {
        category: "BEACH_HOLIDAYS",
        durationNights: 8,
        imageId: "maldives-yacht",
        imageUrl:
          "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=80",
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
        priceOffset: 380,
        theme: "long island stay",
        title: "Maldives Long Island Escape",
      },
      {
        category: "CITY_BREAKS",
        durationNights: 7,
        imageId: "maldives-romantic",
        imageUrl:
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
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
        category: "CITY_BREAKS",
        durationNights: 5,
        imageId: "uae-luxury",
        imageUrl:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
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
        priceOffset: 210,
        theme: "family resort",
        title: "UAE Family Resort Holiday",
      },
      {
        category: "CITY_BREAKS",
        durationNights: 4,
        imageId: "uae-business",
        imageUrl:
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80",
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
        priceOffset: 340,
        theme: "gulf cruise",
        title: "UAE Gulf Cruise Break",
      },
    ],
  },
];

const generatedSeedVacationPackages: SeedVacationPackage[] = generatedDestinationConfigs.flatMap(
  (destinationConfig) =>
    destinationConfig.templates.map((template, templateIndex) => {
      const code = `${destinationConfig.destinationSlug}-${template.imageId}-vacationPackage`;
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

const seedVacationPackages: SeedVacationPackage[] = [
  ...curatedSeedVacationPackages,
  ...generatedSeedVacationPackages,
];
const activeVacationPackageCodes = seedVacationPackages.map(
  (seedVacationPackage) => seedVacationPackage.code,
);
const activeCategoryValues = vacationCategorySeeds.map((category) => category.value);

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from the environment");
  }

  await mongoose.connect(mongoUri);
};

const seedVacationCategories = async () => {
  let createdCount = 0;
  let updatedCount = 0;

  for (const categorySeed of vacationCategorySeeds) {
    const result = await VacationCategory.updateOne(
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

const dropLegacyCollections = async () => {
  const db = mongoose.connection.db;

  if (!db) {
    return [];
  }

  const existingCollections = await db
    .listCollections({}, { nameOnly: true })
    .toArray();
  const existingCollectionNames = new Set(
    existingCollections.map((collection) => collection.name),
  );
  const legacyCollectionNames = ["offers", "offercategories", "offertypes"];
  const droppedCollections: string[] = [];

  for (const collectionName of legacyCollectionNames) {
    if (!existingCollectionNames.has(collectionName)) {
      continue;
    }

    await db.dropCollection(collectionName);
    droppedCollections.push(collectionName);
  }

  return droppedCollections;
};

const seedVacationPackageExamples = async () => {
  await connectToDatabase();

  const categorySeedStats = await seedVacationCategories();
  const seededCategories = await VacationCategory.find({
    value: { $in: activeCategoryValues },
  }).select("_id value");
  const categoryIdByValue = new Map<string, mongoose.Types.ObjectId>();

  for (const category of seededCategories) {
    categoryIdByValue.set(
      category.value,
      category._id as mongoose.Types.ObjectId,
    );
  }

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const seedVacationPackage of seedVacationPackages) {
    const destination = await Destination.findOne({
      slug: seedVacationPackage.destinationSlug,
    });

    if (!destination) {
      skippedCount += 1;
      console.warn(
        `Skipped vacation package ${seedVacationPackage.code}. Destination ${seedVacationPackage.destinationSlug} was not found.`,
      );
      continue;
    }

    const categoryValue = seedVacationPackage.payload.classification.category;
    const categoryId = categoryIdByValue.get(categoryValue);

    if (!categoryId) {
      skippedCount += 1;
      console.warn(
        `Skipped vacation package ${seedVacationPackage.code}. Category ${categoryValue} was not found.`,
      );
      continue;
    }

    const { classification: _seedClassification, ...vacationPackagePayload } =
      seedVacationPackage.payload;
    const enrichedVacationPackagePayload = enrichSeedVacationPackagePayload(
      vacationPackagePayload,
      categoryValue,
      seedVacationPackage.destinationSlug,
    );

    const result = await VacationPackage.updateOne(
      { code: seedVacationPackage.code },
      {
        $set: {
          ...enrichedVacationPackagePayload,
          category: categoryId,
          destinationId: destination._id,
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
          type: "",
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

  const deleteResult = await VacationPackage.deleteMany({
    code: { $nin: activeVacationPackageCodes },
  });
  const deleteCategoriesResult = await VacationCategory.deleteMany({
    value: { $nin: activeCategoryValues },
  });
  const droppedLegacyCollections = await dropLegacyCollections();

  const cleanupResult = await VacationPackage.collection.updateMany(
    {},
    {
      $unset: {
        attributes: "",
        classification: "",
        sections: "",
        shortDescription: "",
        trip: "",
        type: "",
        typeSpecificData: "",
        "categoryDetails.kind": "",
        "pageMetadata.pageDescription": "",
      },
    },
  );

  console.log(
    `Seeded vacation packages successfully. Categories created: ${categorySeedStats.createdCount}, categories updated: ${categorySeedStats.updatedCount}, categories deleted: ${deleteCategoriesResult.deletedCount}, vacation packages created: ${createdCount}, vacation packages updated: ${updatedCount}, vacation packages skipped: ${skippedCount}, vacation packages deleted: ${deleteResult.deletedCount}, vacation packages cleaned: ${cleanupResult.modifiedCount}, legacy collections dropped: ${droppedLegacyCollections.length}.`,
  );
};

seedVacationPackageExamples()
  .catch((error) => {
    console.error("Failed to seed vacation packages:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
