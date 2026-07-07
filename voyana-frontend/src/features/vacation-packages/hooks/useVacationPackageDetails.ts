import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import type { VacationPackageFact } from "../types/vacationPackageDetails.types";
import type { VacationPackage } from "../types/vacationPackage.types";
import {
  fetchVacationPackageById,
  selectVacationPackageById,
  selectVacationPackageByIdError,
  selectVacationPackageByIdRequest,
  selectVacationPackageByIdStatus,
} from "../store/vacationPackagesSlice";

const formatTravelDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const buildVacationPackageFacts = (
  vacationPackage: VacationPackage | null,
): VacationPackageFact[] => {
  if (!vacationPackage) {
    return [];
  }

  return [
    {
      icon: "check",
      id: "category",
      label: "Category",
      value: vacationPackage.category.label,
    },
    ...(vacationPackage.travelPeriod.duration
      ? [
          {
            icon: "calendar" as const,
            id: "duration",
            label: "Duration",
            value: vacationPackage.travelPeriod.duration,
          },
        ]
      : []),
    {
      icon: "calendar",
      id: "start-date",
      label: "Start date",
      value: formatTravelDate(vacationPackage.travelPeriod.startDate),
    },
    {
      icon: "calendar",
      id: "end-date",
      label: "End date",
      value: formatTravelDate(vacationPackage.travelPeriod.endDate),
    },
  ];
};

export function useVacationPackageDetails() {
  const { vacationPackageCode, vacationPackageId } = useParams<{
    vacationPackageCode: string;
    vacationPackageId: string;
  }>();
  const dispatch = useAppDispatch();
  const vacationPackage = useAppSelector(selectVacationPackageById);
  const vacationPackageStatus = useAppSelector(selectVacationPackageByIdStatus);
  const vacationPackageError = useAppSelector(selectVacationPackageByIdError);
  const vacationPackageRequest = useAppSelector(selectVacationPackageByIdRequest);
  const currentVacationPackage =
    vacationPackage !== null && vacationPackage._id === vacationPackageId && vacationPackage.code === vacationPackageCode
      ? vacationPackage
      : null;
  const vacationPackageFacts = useMemo(() => buildVacationPackageFacts(currentVacationPackage), [currentVacationPackage]);

  useEffect(() => {
    const isCurrentRequest =
      vacationPackageRequest !== null &&
      vacationPackageRequest.vacationPackageId === vacationPackageId &&
      vacationPackageRequest.vacationPackageCode === vacationPackageCode;

    if (
      vacationPackageId !== undefined &&
      vacationPackageCode !== undefined &&
      vacationPackageStatus !== "loading" &&
      currentVacationPackage === null &&
      !isCurrentRequest
    ) {
      void dispatch(fetchVacationPackageById({ vacationPackageCode, vacationPackageId }));
    }
  }, [currentVacationPackage, dispatch, vacationPackageCode, vacationPackageId, vacationPackageRequest, vacationPackageStatus]);

  return {
    currentVacationPackage,
    vacationPackageError,
    vacationPackageFacts,
    vacationPackageStatus,
  };
}
