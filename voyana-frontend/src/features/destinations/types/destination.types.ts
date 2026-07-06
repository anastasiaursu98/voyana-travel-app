type DestinationImage = {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

type DestinationGalleryImage = DestinationImage & {
  id: string;
};

export type DashboardDestination = {
  _id: string;
  countryCode: string;
  coverImage: DestinationImage;
  description: string;
  galleryImages: DestinationGalleryImage[];
  name: string;
  publishing?: {
    isActive?: boolean;
    isFeatured?: boolean;
  };
  slug: string;
  startingPrice?: number;
};
