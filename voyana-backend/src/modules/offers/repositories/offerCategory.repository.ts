import OfferCategory from "../models/OfferCategory.model";

export const categoriesRepository = {
  findActiveCategories() {
    return OfferCategory.find({ isActive: true }).sort({
      displayOrder: 1,
      label: 1,
    });
  },
  findActiveCategoryIdByValue(value: string) {
    return OfferCategory.find({ value, isActive: true }).select("_id");
  },
};
