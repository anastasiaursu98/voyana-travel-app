import { homeImages } from "../../constants/homeImages";

export const testimonials = [
  {
    avatarUrl: homeImages.boraBoraLagoon,
    destination: "Maldives island package",
    location: "San Francisco",
    name: "Jennifer and Mark",
    quote:
      "My husband and I have been using this travel agency for years and they have never disappointed us.",
    rating: 5,
  },
  {
    avatarUrl: homeImages.europeCoastalTown,
    destination: "Europe city escape",
    location: "Miami",
    name: "Dylan and Emily",
    quote:
      "This travel agency made my dream trip to Europe a reality. They worked with me every step of the way.",
    rating: 5,
  },
  {
    avatarUrl: homeImages.goldenGate,
    destination: "Boutique coastal hotel",
    location: "Bucharest",
    name: "Marta and Alex",
    quote:
      "The package was easy to compare, the price was clear, and our hotel matched exactly what we booked.",
    rating: 4,
  },
  {
    avatarUrl: homeImages.africaSafari,
    destination: "Safari lodge escape",
    location: "Paris",
    name: "Sophie Laurent",
    quote:
      "When our flight time changed, support helped us adjust the transfer quickly and kept the trip stress-free.",
    rating: 5,
  },
  {
    avatarUrl: homeImages.europeCoastalTown,
    destination: "Family resort week",
    location: "Cluj-Napoca",
    name: "Andrei and Ioana",
    quote:
      "We found a better family resort in minutes and the total price was easy to understand.",
    rating: 5,
  },
  {
    avatarUrl: homeImages.japaneseTemple,
    destination: "Kyoto guide itinerary",
    location: "Berlin",
    name: "Nora Weiss",
    quote:
      "The guides helped us choose the right season, and the booking flow felt clear from start to finish.",
    rating: 4,
  },
] as const;
