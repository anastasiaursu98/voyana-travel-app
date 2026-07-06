import { axiosClient } from "../../../shared/services/axiosClient";
import type { ApiSuccessResponse } from "../../../shared/types/api.types";
import type { OfferCategory } from "../types/offerCategory.types";

export const offerCategoriesApi = {
  async getOfferCategories(): Promise<OfferCategory[]> {
    const data = axiosClient
      .get<ApiSuccessResponse<OfferCategory[]>>("/offers/categories")
      .then((response) => response.data.data);
    return data;
  },
};
