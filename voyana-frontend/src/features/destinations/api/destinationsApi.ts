import { axiosClient } from "../../../shared/services/axiosClient";
import type { ApiSuccessResponse } from "../../../shared/types/api.types";
import type { DashboardDestination } from "../types/destination.types";

export const destinationsApi = {
  async getDestinations(): Promise<DashboardDestination[]> {
    const { data } =
      await axiosClient.get<ApiSuccessResponse<DashboardDestination[]>>(
        "/destinations",
      );

    return data.data;
  },
};
