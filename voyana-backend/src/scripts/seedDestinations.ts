import "dotenv/config";
import mongoose from "mongoose";
import Destination from "../modules/destinations/models/Destination.model";

type DestinationSeed = {
  countryCode: string;
  coverImage: {
    alt: string;
    caption?: string;
    url: string;
  };
  description: string;
  galleryImages: {
    alt: string;
    caption?: string;
    id: string;
    url: string;
  }[];
  legacySlugs?: string[];
  name: string;
  publishing: {
    isActive: boolean;
    isFeatured: boolean;
  };
  slug: string;
  startingPrice: number;
};

const destinationSeeds: DestinationSeed[] = [
  {
    countryCode: "EG",
    coverImage: {
      alt: "Egypt Red Sea coastline",
      caption: "Egypt",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    },
    description:
      "Egypt brings together Red Sea resort holidays, historic city stays, desert landscapes, diving routes, and warm-weather escapes.",
    galleryImages: [
      {
        alt: "Red Sea beach in Egypt",
        caption: "Red Sea coast",
        id: "egypt-red-sea",
        url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Clear sea water in Egypt",
        caption: "Beach escapes",
        id: "egypt-clear-water",
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    legacySlugs: ["hurghada-red-sea-resort", "hurghada"],
    name: "Egypt",
    publishing: {
      isActive: true,
      isFeatured: true,
    },
    slug: "egypt",
    startingPrice: 680,
  },
  {
    countryCode: "ES",
    coverImage: {
      alt: "Spain coastline and city architecture",
      caption: "Spain",
      url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=80",
    },
    description:
      "Spain supports city breaks, Mediterranean beach holidays, food and wine routes, cultural weekends, and family-friendly coastal stays.",
    galleryImages: [
      {
        alt: "Spanish city architecture",
        caption: "Culture and architecture",
        id: "spain-architecture",
        url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Spanish coastal skyline",
        caption: "City and beach",
        id: "spain-coast",
        url: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    legacySlugs: ["barcelona-city-breaks", "barcelona"],
    name: "Spain",
    publishing: {
      isActive: true,
      isFeatured: true,
    },
    slug: "spain",
    startingPrice: 520,
  },
  {
    countryCode: "CH",
    coverImage: {
      alt: "Swiss Alps mountain landscape",
      caption: "Switzerland",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    },
    description:
      "Switzerland is suited for alpine nature escapes, ski holidays, hiking trips, mountain retreats, and premium scenic travel.",
    galleryImages: [
      {
        alt: "Mountain hiking trail in Switzerland",
        caption: "Alpine hiking",
        id: "switzerland-hiking",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Snowy Swiss mountain village",
        caption: "Winter holidays",
        id: "switzerland-ski",
        url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    legacySlugs: ["zermatt-mountain-nature", "zermatt"],
    name: "Switzerland",
    publishing: {
      isActive: true,
      isFeatured: true,
    },
    slug: "switzerland",
    startingPrice: 890,
  },
  {
    countryCode: "TZ",
    coverImage: {
      alt: "Tanzania safari landscape",
      caption: "Tanzania",
      url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    },
    description:
      "Tanzania is known for safari routes, national parks, mountain trekking, wildlife lodges, and guided outdoor adventures.",
    galleryImages: [
      {
        alt: "Safari vehicle in Tanzania",
        caption: "Guided safari",
        id: "tanzania-safari",
        url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Wildlife on safari in Tanzania",
        caption: "National parks",
        id: "tanzania-wildlife",
        url: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    legacySlugs: ["arusha-safari-adventure", "arusha"],
    name: "Tanzania",
    publishing: {
      isActive: true,
      isFeatured: true,
    },
    slug: "tanzania",
    startingPrice: 1120,
  },
  {
    countryCode: "MV",
    coverImage: {
      alt: "Maldives island resort lagoon",
      caption: "Maldives",
      url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
    },
    description:
      "Maldives is focused on island resorts, lagoon villas, honeymoon packages, wellness retreats, and premium beach escapes.",
    galleryImages: [
      {
        alt: "Water villas in the Maldives",
        caption: "Lagoon villas",
        id: "maldives-water-villas",
        url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Tropical Maldives beach",
        caption: "Island escape",
        id: "maldives-beach",
        url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    legacySlugs: ["maldives-luxury-island", "kaafu-atoll"],
    name: "Maldives",
    publishing: {
      isActive: true,
      isFeatured: false,
    },
    slug: "maldives",
    startingPrice: 1480,
  },
  {
    countryCode: "AE",
    coverImage: {
      alt: "United Arab Emirates skyline",
      caption: "United Arab Emirates",
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    },
    description:
      "The United Arab Emirates supports luxury city stays, business travel, winter sun breaks, resort escapes, and premium stopovers.",
    galleryImages: [
      {
        alt: "Modern hotel in the United Arab Emirates",
        caption: "Luxury stays",
        id: "uae-hotel",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      },
      {
        alt: "Conference venue in the United Arab Emirates",
        caption: "Business travel",
        id: "uae-business",
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    legacySlugs: ["dubai-business-luxury", "dubai"],
    name: "United Arab Emirates",
    publishing: {
      isActive: true,
      isFeatured: false,
    },
    slug: "united-arab-emirates",
    startingPrice: 760,
  },
];

const obsoleteDestinationFields = {
  activeDestination: "",
  city: "",
  coordinates: "",
  country: "",
  featuredDestination: "",
  fullDescription: "",
  offerCategories: "",
  offerSubtypes: "",
  primaryOfferCategory: "",
  vacationCategories: "",
  vacationPackageSubtypes: "",
  pageMetadata: "",
  parentDestinationId: "",
  parentSlug: "",
  primaryVacationCategory: "",
  region: "",
  seo: "",
  shortDescription: "",
  type: "",
};

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing from the environment");
  }

  await mongoose.connect(mongoUri);
};

const seedDestinations = async () => {
  await connectToDatabase();

  let createdCount = 0;
  let updatedCount = 0;

  for (const destinationSeed of destinationSeeds) {
    const { legacySlugs = [], ...destination } = destinationSeed;
    const lookupSlugs = [destination.slug, ...legacySlugs];
    const existingDestination = await Destination.findOne({
      slug: { $in: lookupSlugs },
    }).select("_id");
    const filter =
      existingDestination === null
        ? { slug: destination.slug }
        : { _id: existingDestination._id };

    const result = await Destination.updateOne(
      filter,
      {
        $set: destination,
        $unset: obsoleteDestinationFields,
      },
      { upsert: true, strict: false },
    );

    if (result.upsertedCount > 0) {
      createdCount += result.upsertedCount;
    } else if (result.modifiedCount > 0) {
      updatedCount += result.modifiedCount;
    }
  }

  await Destination.deleteMany({
    slug: { $nin: destinationSeeds.map((destination) => destination.slug) },
  });

  await Destination.collection.updateMany(
    {},
    { $unset: obsoleteDestinationFields },
  );

  console.log(
    `Seeded destinations successfully. Created: ${createdCount}, updated: ${updatedCount}.`,
  );
};

seedDestinations()
  .catch((error) => {
    console.error("Failed to seed destinations:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
