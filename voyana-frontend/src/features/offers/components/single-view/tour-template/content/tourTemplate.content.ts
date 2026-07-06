import type { OfferFact, OfferHighlight } from "../../../../types/offerDetails.types";
import type { OfferImage, OfferPrice } from "../../../../types/offer.types";

export type TourTemplateItineraryDay = {
  accommodation: {
    description: string;
    highlights: string[];
    imageUrl?: string;
    meta: string;
    nights: string;
    title: string;
  };
  activities: string[];
  cityDescription: string;
  day: number;
  departure?: string;
  image: OfferImage;
  location: string;
  stayLabel: string;
  title: string;
  transportation: {
    arrival: string;
    carrier: string;
    departure: string;
    description: string;
    duration: string;
    luggage: string;
    route: string;
    type: "flight" | "rail" | "transfer" | "walk";
  };
};

export const tourTemplateHero = {
  title: "Japan Cultural Tour",
  description:
    "An eight-day Japan route through Tokyo, Hakone, Kyoto, Nara, and Osaka with guided cultural visits, selected meals, rail transportation, and comfortable city accommodation.",
  duration: "8 days / 7 nights",
  location: "Tokyo, Hakone, Kyoto, Nara and Osaka",
  rating: 4.8,
} as const;

export const tourTemplatePrice: OfferPrice = {
  amount: 2140,
  currency: "EUR",
  originalAmount: 2490,
  unit: "person",
  discountLabel: "Japan tour rate",
};

export const tourTemplateImages: {
  coverImage: OfferImage;
  galleryImages: OfferImage[];
} = {
  coverImage: {
    url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=80",
    alt: "Japanese temple with cherry blossoms",
    caption: "Japan cultural route",
  },
  galleryImages: [
    {
      id: "tour-template-tokyo",
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
      alt: "Tokyo city lights and crossing",
      caption: "Tokyo city arrival",
    },
    {
      id: "tour-template-kyoto",
      url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      alt: "Kyoto temple and traditional architecture",
      caption: "Kyoto heritage days",
    },
    {
      id: "tour-template-japan-food",
      url: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1200&q=80",
      alt: "Japanese street and local cultural route",
      caption: "Local culture and food",
    },
  ],
};

export const tourTemplateFacts: OfferFact[] = [
  {
    id: "duration",
    label: "Duration",
    value: tourTemplateHero.duration,
    icon: "calendar",
  },
  {
    id: "group-size",
    label: "Group size",
    value: "2 to 12 travelers",
    icon: "family",
  },
  {
    id: "guide",
    label: "Guide",
    value: "Local guides on touring days",
    icon: "activity",
  },
  {
    id: "meals",
    label: "Meals",
    value: "Breakfast and selected dinners",
    icon: "meal",
  },
  {
    id: "route",
    label: "Route",
    value: "Tokyo to Osaka",
    icon: "transport",
  },
  {
    id: "support",
    label: "Travel support",
    value: "Available during the tour",
    icon: "check",
  },
];

export const tourTemplateHighlights: OfferHighlight[] = [
  {
    id: "tokyo-neighborhoods",
    label: "Tokyo neighborhoods",
    description: "Asakusa, Shibuya, Ginza, and selected food streets.",
  },
  {
    id: "hakone-ryokan",
    label: "Hakone ryokan stay",
    description: "A traditional inn night with hot spring access.",
  },
  {
    id: "kyoto-heritage",
    label: "Kyoto temples",
    description: "Heritage walks through temple gardens and historic lanes.",
  },
  {
    id: "osaka-food",
    label: "Osaka food evening",
    description: "A guided Dotonbori-style food and city lights route.",
  },
];

export const tourTemplateItinerary: TourTemplateItineraryDay[] = [
  {
    day: 1,
    title: "Arrival in Tokyo",
    location: "Tokyo",
    stayLabel: "Tokyo hotel",
    departure: "Welcome evening",
    image: tourTemplateImages.galleryImages[0],
    cityDescription:
      "Tokyo introduces the tour with modern neighborhoods, historic temple areas, polished shopping streets, and a first evening orientation around the city rhythm.",
    accommodation: {
      title: "Hotel Metropolitan Tokyo Marunouchi",
      nights: "2 nights",
      meta: "Tokyo / central area / breakfast included",
      description:
        "Comfort city hotel close to rail links, useful for the first two Tokyo touring days.",
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
      highlights: ["Double or twin room", "Daily breakfast", "Easy rail access"],
    },
    transportation: {
      type: "transfer",
      carrier: "Private arrival transfer",
      route: "Haneda or Narita Airport -> Tokyo hotel",
      departure: "Flexible on arrival",
      arrival: "Hotel drop-off",
      duration: "45-90 min",
      luggage: "1 checked bag",
      description:
        "Optional meet-and-greet transfer followed by a short guided walking orientation near the hotel.",
    },
    activities: [
      "Arrival transfer to the hotel",
      "Welcome briefing with the tour host",
      "Evening walk through Ginza or Shibuya",
    ],
  },
  {
    day: 2,
    title: "Tokyo traditions and city life",
    location: "Tokyo",
    stayLabel: "Tokyo hotel",
    departure: "Free evening",
    image: {
      id: "tour-template-day-2",
      url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      alt: "Tokyo street with bright signs and city atmosphere",
      caption: "Tokyo neighborhoods",
    },
    cityDescription:
      "The day balances old and new Tokyo, from temple streets and craft shops to contemporary districts, local cafes, and high-energy crossings.",
    accommodation: {
      title: "Hotel Metropolitan Tokyo Marunouchi",
      nights: "2nd night",
      meta: "Tokyo / central area / breakfast included",
      description:
        "Same Tokyo base to keep the day efficient and avoid packing between city visits.",
      imageUrl:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80",
      highlights: ["Same room retained", "Breakfast included", "Evening at leisure"],
    },
    transportation: {
      type: "walk",
      carrier: "Tokyo Metro and guided walks",
      route: "Asakusa -> Omotesando -> Shibuya",
      departure: "09:30",
      arrival: "17:30",
      duration: "Full day",
      luggage: "No luggage movement",
      description:
        "Local metro hops with guided walking sections through old-town streets and modern districts.",
    },
    activities: [
      "Asakusa temple and old shopping street",
      "Tea or craft tasting stop",
      "Shibuya and Omotesando route",
    ],
  },
  {
    day: 3,
    title: "Hakone mountain route",
    location: "Hakone",
    stayLabel: "Ryokan stay",
    departure: "Seasonal dinner",
    image: {
      id: "tour-template-day-3",
      url: "https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?auto=format&fit=crop&w=1200&q=80",
      alt: "Mount Fuji and lake scenery near Hakone",
      caption: "Hakone route",
    },
    cityDescription:
      "Hakone adds a calmer mountain stop with lake views, hot spring culture, and a traditional ryokan atmosphere between Tokyo and Kyoto.",
    accommodation: {
      title: "Hakone Kowakien Ryokan",
      nights: "1 night",
      meta: "Hakone / ryokan / breakfast and dinner",
      description:
        "Traditional ryokan stay with tatami-style atmosphere, seasonal dinner, and hot spring access.",
      imageUrl:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80",
      highlights: ["Ryokan dinner", "Hot spring access", "Mountain setting"],
    },
    transportation: {
      type: "rail",
      carrier: "Odakyu / local Hakone route",
      route: "Tokyo -> Hakone-Yumoto",
      departure: "10:20",
      arrival: "12:05",
      duration: "1h 45m",
      luggage: "Forwarded to Kyoto",
      description:
        "Rail transfer toward Hakone with local mountain transport used for viewpoints and ryokan access.",
    },
    activities: [
      "Scenic transfer from Tokyo",
      "Lake and mountain viewpoint route",
      "Ryokan dinner and hot spring time",
    ],
  },
  {
    day: 4,
    title: "Kyoto arrival",
    location: "Kyoto",
    stayLabel: "Kyoto hotel",
    departure: "Evening at leisure",
    image: tourTemplateImages.galleryImages[1],
    cityDescription:
      "Kyoto is the cultural core of the route, known for temple gardens, wooden lanes, seasonal traditions, and quiet historic districts.",
    accommodation: {
      title: "Keio Prelia Hotel Kyoto Karasuma Gojo",
      nights: "3 nights",
      meta: "Kyoto / central area / breakfast included",
      description:
        "Comfortable Kyoto base near subway access, useful for temple routes and evening walks.",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      highlights: ["Standard twin room", "Breakfast included", "Central Kyoto access"],
    },
    transportation: {
      type: "rail",
      carrier: "JR Tokaido Shinkansen",
      route: "Odawara -> Kyoto",
      departure: "11:35",
      arrival: "13:45",
      duration: "2h 10m",
      luggage: "Forwarded from Hakone",
      description:
        "Reserved rail seats from the Hakone area to Kyoto, followed by a short local transfer to the hotel.",
    },
    activities: [
      "Rail transfer to Kyoto",
      "Hotel check-in and orientation",
      "Historic district evening walk",
    ],
  },
  {
    day: 5,
    title: "Kyoto temples and tea",
    location: "Kyoto",
    stayLabel: "Kyoto hotel",
    departure: "Gion evening",
    image: {
      id: "tour-template-day-5",
      url: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=1200&q=80",
      alt: "Kyoto temple gate and traditional pathway",
      caption: "Kyoto temples",
    },
    cityDescription:
      "This Kyoto day focuses on heritage sites, garden routes, tea culture, and the slower details of traditional city life.",
    accommodation: {
      title: "Keio Prelia Hotel Kyoto Karasuma Gojo",
      nights: "2nd Kyoto night",
      meta: "Kyoto / same hotel / breakfast included",
      description:
        "Same Kyoto hotel retained so the day can focus on temples, tea, and old-town routes.",
      imageUrl:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
      highlights: ["Same room retained", "Breakfast included", "Gion evening access"],
    },
    transportation: {
      type: "transfer",
      carrier: "Local charter and walking route",
      route: "Hotel -> temple districts -> Gion",
      departure: "09:00",
      arrival: "17:00",
      duration: "Full day",
      luggage: "No luggage movement",
      description:
        "Selected local transfers between temple areas, with guided walks through heritage lanes.",
    },
    activities: [
      "Guided temple and garden visits",
      "Traditional tea ceremony",
      "Free evening in Gion",
    ],
  },
  {
    day: 6,
    title: "Nara day trip",
    location: "Nara",
    stayLabel: "Return to Kyoto",
    departure: "Back by evening",
    image: {
      id: "tour-template-day-6",
      url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80",
      alt: "Japanese rail route through green scenery",
      caption: "Nara rail day",
    },
    cityDescription:
      "Nara offers a compact heritage day with temple grounds, park walks, and a quieter historic setting outside Kyoto.",
    accommodation: {
      title: "Keio Prelia Hotel Kyoto Karasuma Gojo",
      nights: "3rd Kyoto night",
      meta: "Kyoto / same hotel / breakfast included",
      description:
        "Return to the Kyoto hotel after the Nara day trip, keeping luggage stored and the evening simple.",
      imageUrl:
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=900&q=80",
      highlights: ["Same room retained", "Luggage stays at hotel", "Dinner in Kyoto"],
    },
    transportation: {
      type: "rail",
      carrier: "JR Nara Line",
      route: "Kyoto -> Nara -> Kyoto",
      departure: "09:15",
      arrival: "17:20",
      duration: "Return day trip",
      luggage: "No luggage movement",
      description:
        "Return rail day trip to Nara with walking routes around the park and heritage temple areas.",
    },
    activities: [
      "Rail day trip to Nara",
      "Heritage park and temple route",
      "Return to Kyoto for dinner",
    ],
  },
  {
    day: 7,
    title: "Osaka food evening",
    location: "Osaka",
    stayLabel: "Osaka hotel",
    departure: "Farewell evening",
    image: {
      id: "tour-template-day-7",
      url: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1200&q=80",
      alt: "Osaka city lights and night streets",
      caption: "Osaka evening",
    },
    cityDescription:
      "Osaka closes the trip with a livelier urban atmosphere, food streets, castle-area sightseeing, and a final night out.",
    accommodation: {
      title: "Hotel Monterey Le Frere Osaka",
      nights: "1 night",
      meta: "Osaka / city hotel / breakfast included",
      description:
        "City hotel positioned for the final Osaka food evening and straightforward airport transfer next day.",
      imageUrl:
        "https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=900&q=80",
      highlights: ["Standard room", "Breakfast included", "Dotonbori access"],
    },
    transportation: {
      type: "rail",
      carrier: "Japan Railway / Nozomi",
      route: "Kyoto Station -> Shin-Osaka",
      departure: "11:30",
      arrival: "11:45",
      duration: "15 min",
      luggage: "30 kg",
      description:
        "Short reserved rail transfer from Kyoto to Osaka before hotel check-in and the farewell food route.",
    },
    activities: [
      "Transfer from Kyoto to Osaka",
      "Castle area visit",
      "Guided food walk and farewell evening",
    ],
  },
  {
    day: 8,
    title: "Departure from Osaka",
    location: "Osaka",
    stayLabel: "Check-out day",
    departure: "Flexible departure",
    image: {
      id: "tour-template-day-8",
      url: "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?auto=format&fit=crop&w=1200&q=80",
      alt: "Japanese city and rail departure route",
      caption: "Departure day",
    },
    cityDescription:
      "The final day keeps the schedule flexible for airport transfers, extra shopping, or independent city time before departure.",
    accommodation: {
      title: "Check-out from Osaka hotel",
      nights: "No overnight",
      meta: "Osaka / departure day",
      description:
        "Rooms are held until standard check-out, with luggage support available before airport transfer.",
      imageUrl:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
      highlights: ["Breakfast included", "Luggage support", "Late checkout on request"],
    },
    transportation: {
      type: "flight",
      carrier: "Airport transfer or Emirates connection",
      route: "Osaka -> Kansai Airport",
      departure: "19:23 pickup",
      arrival: "Kansai Airport",
      duration: "50-70 min",
      luggage: "1 checked bag",
      description:
        "Optional private transfer to Kansai airport, with independent rail alternative if preferred.",
    },
    activities: [
      "Breakfast at the hotel",
      "Check-out and luggage support",
      "Optional airport transfer",
    ],
  },
];
