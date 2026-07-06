import { axiosClient } from "../../../shared/services/axiosClient";
import type { ApiSuccessResponse } from "../../../shared/types/api.types";
import type { Offer, OfferFilters } from "../types/offer.types";
import type { OfferCategory } from "../types/offerCategory.types";

export const offersApi = {
  async getOffers(params?: OfferFilters): Promise<Offer[]> {
    const searchParams = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value === undefined) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => {
          searchParams.append(key, item);
        });
        return;
      }

      searchParams.append(key, String(value));
    });
    const query = searchParams.toString();
    const data = axiosClient
      .get<ApiSuccessResponse<Offer[]>>(`/offers${query ? `?${query}` : ""}`)
      .then((response) => response.data.data);
    return data;
  },

  async getOfferById(offerId: string, offerCode: string): Promise<Offer> {
    const data = axiosClient
      .get<ApiSuccessResponse<Offer>>(`/offers/${offerId}/${offerCode}`)
      .then((response) => response.data.data);
    return data;
  },

  async getOfferCategories(): Promise<OfferCategory[]> {
    const data = axiosClient
      .get<ApiSuccessResponse<OfferCategory[]>>(`/offers/categories`)
      .then((response) => response.data.data);
    return data;
  },
};
