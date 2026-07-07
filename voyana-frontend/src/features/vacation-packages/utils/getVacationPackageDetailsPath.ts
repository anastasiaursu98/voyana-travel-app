import { generatePath } from "react-router-dom";
import { routes } from "../../../app/router/routes";
import type { VacationPackage } from "../types/vacationPackage.types";

export function getVacationPackageDetailsPath(vacationPackage: VacationPackage) {
  return generatePath(routes.vacationPackageDetails, {
    vacationPackageCode: vacationPackage.code,
    vacationPackageId: vacationPackage._id,
  });
}
