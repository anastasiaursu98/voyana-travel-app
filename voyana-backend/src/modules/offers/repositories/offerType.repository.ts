import OfferType from "../models/OfferType.model";

export const offerTypeRepository = {
  findActiveOfferTypes() {
    return OfferType.find({ isActive: true }).sort({
      displayOrder: 1,
      label: 1,
    });
  },

  findActiveOfferTypeIdByValue(value: string) {
    return OfferType.findOne({
      isActive: true,
      value,
    }).select("_id");
  },
};
