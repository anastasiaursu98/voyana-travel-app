import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ComponentType } from "react";

import type { VacationPackageFact } from "../../../types/vacationPackageDetails.types";
import { VacationPackageSectionPanel } from "../shared/VacationPackageSectionPanel";
import { getVacationPackageIconComponent } from "./vacationPackageIconMap";

type VacationPackageDetailListItem = Omit<VacationPackageFact, "icon"> & {
  icon?: ComponentType<SvgIconProps> | VacationPackageFact["icon"];
};

type VacationPackageDetailListProps = {
  description?: string;
  gridClassName?: string;
  items: readonly VacationPackageDetailListItem[];
  title: string;
  truncateText?: boolean;
};

export function VacationPackageDetailList({
  description,
  gridClassName = "grid gap-x-10 gap-y-4 sm:grid-cols-2",
  items,
  title,
  truncateText = false,
}: VacationPackageDetailListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <VacationPackageSectionPanel description={description} title={title}>
      <div className={gridClassName}>
        {items.map((item) => {
          const Icon =
            typeof item.icon === "function"
              ? item.icon
              : getVacationPackageIconComponent(item.icon);

          return (
            <div
              key={item.id}
              className="flex min-w-0 items-center gap-3 text-sm"
            >
              <Icon
                fontSize="small"
                className="shrink-0 text-[rgb(var(--voyana-rgb-text-muted)/0.72)]"
              />
              <p
                className={`min-w-0 text-[0.84rem] font-medium text-(--voyana-color-text-muted) ${
                  truncateText ? "truncate" : ""
                }`}
              >
                {item.label}:{" "}
                <span className="font-medium text-(--voyana-color-text-body)">
                  {item.value}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </VacationPackageSectionPanel>
  );
}
