import { axiosClient } from "../../../shared/services/axiosClient";
import type { ApiSuccessResponse } from "../../../shared/types/api.types";
import type { VacationPackage, VacationPackageFilters } from "../types/vacationPackage.types";

export const vacationPackagesApi = {
  async getVacationPackages(params?: VacationPackageFilters): Promise<VacationPackage[]> {
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
      .get<ApiSuccessResponse<VacationPackage[]>>(`/vacation-packages${query ? `?${query}` : ""}`)
      .then((response) => response.data.data);
    return data;
  },

  async getVacationPackageById(vacationPackageId: string, vacationPackageCode: string): Promise<VacationPackage> {
    const data = axiosClient
      .get<ApiSuccessResponse<VacationPackage>>(`/vacation-packages/${vacationPackageId}/${vacationPackageCode}`)
      .then((response) => response.data.data);
    return data;
  },

};
