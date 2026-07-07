import VacationCategory from "../models/VacationCategory.model";

export const categoriesRepository = {
  findActiveCategories() {
    return VacationCategory.find({ isActive: true }).sort({
      displayOrder: 1,
      label: 1,
    });
  },
  findActiveCategoryIdByValue(value: string) {
    return VacationCategory.find({ value, isActive: true }).select("_id");
  },
};
