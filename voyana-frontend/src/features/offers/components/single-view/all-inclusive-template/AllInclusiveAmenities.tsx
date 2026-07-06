import type { OfferLogistics } from "../../../types/offer.types";
import { OfferDetailList } from "../../shared/components";

type AllInclusiveAmenitiesProps = {
  amenities?: OfferLogistics["amenities"];
};

export const AllInclusiveAmenities = ({
  amenities,
}: AllInclusiveAmenitiesProps) => {
  return (
    <OfferDetailList
      gridClassName="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3"
      items={
        amenities?.map((amenity) => ({
          id: amenity.id,
          label: amenity.label,
          value: amenity.value,
          icon: amenity.icon,
        })) ?? []
      }
      title="Resort Amenities"
      truncateText
    />
  );
};
