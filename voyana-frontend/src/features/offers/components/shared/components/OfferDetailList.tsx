import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ComponentType } from "react";

import type { OfferFact } from "../../../types/offerDetails.types";
import { getOfferIconComponent } from "./offerIconMap";
import { OfferSectionPanel } from "./OfferSectionPanel";

type OfferDetailListItem = Omit<OfferFact, "icon"> & {
  icon?: ComponentType<SvgIconProps> | OfferFact["icon"];
};

type OfferDetailListProps = {
  description?: string;
  gridClassName?: string;
  items: readonly OfferDetailListItem[];
  title: string;
  truncateText?: boolean;
};

export function OfferDetailList({
  description,
  gridClassName = "grid gap-x-10 gap-y-4 sm:grid-cols-2",
  items,
  title,
  truncateText = false,
}: OfferDetailListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <OfferSectionPanel description={description} title={title}>
      <div className={gridClassName}>
        {items.map((item) => {
          const Icon =
            typeof item.icon === "function"
              ? item.icon
              : getOfferIconComponent(item.icon);

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
    </OfferSectionPanel>
  );
}
