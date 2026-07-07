import { axiosClient } from "../../../shared/services/axiosClient";
import type { ApiSuccessResponse } from "../../../shared/types/api.types";
import type { VacationCategory } from "../../vacation-packages/types/vacationPackage.types";

export const vacationCategoriesApi = {
  async getVacationCategories(): Promise<VacationCategory[]> {
    const data = axiosClient
      .get<ApiSuccessResponse<VacationCategory[]>>("/vacation-packages/categories")
      .then((response) => response.data.data);
    return data;
  },
};
