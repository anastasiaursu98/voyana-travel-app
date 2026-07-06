import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";

import { OfferPriceSummary } from "../../shared/components";
import {
  tourTemplateHero,
  tourTemplatePrice,
} from "./content/tourTemplate.content";

export function TourTemplateBookingCard() {
  return (
    <OfferPriceSummary ctaLabel="Request tour" price={tourTemplatePrice}>
      <div className="grid min-w-0 gap-3">
        <div className="flex min-w-0 items-center gap-3 rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] px-3.5 py-3">
          <CalendarMonthRoundedIcon className="shrink-0 text-[1.15rem] text-(--voyana-color-text-muted)" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-(--voyana-color-text-muted)">
              Duration
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-(--voyana-color-text-primary)">
              {tourTemplateHero.duration}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] px-3.5 py-3">
          <GroupsRoundedIcon className="shrink-0 text-[1.15rem] text-(--voyana-color-text-muted)" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-(--voyana-color-text-muted)">
              Travelers
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-(--voyana-color-text-primary)">
              2 adults, small group
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] px-3.5 py-3">
          <HotelRoundedIcon className="shrink-0 text-[1.15rem] text-(--voyana-color-text-muted)" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-(--voyana-color-text-muted)">
              Accommodation
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-(--voyana-color-text-primary)">
              City hotels and Hakone ryokan
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] px-3.5 py-3">
          <RouteRoundedIcon className="shrink-0 text-[1.15rem] text-(--voyana-color-text-muted)" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-(--voyana-color-text-muted)">
              Route
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-(--voyana-color-text-primary)">
              Tokyo to Osaka by rail
            </p>
          </div>
        </div>
      </div>
    </OfferPriceSummary>
  );
}
