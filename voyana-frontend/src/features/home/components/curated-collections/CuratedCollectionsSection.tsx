import BeachAccessRoundedIcon from "@mui/icons-material/BeachAccessRounded";
import FamilyRestroomRoundedIcon from "@mui/icons-material/FamilyRestroomRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import VillaRoundedIcon from "@mui/icons-material/VillaRounded";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import type { ComponentType, CSSProperties } from "react";
import { ResponsiveImage } from "../../../../shared/components/ResponsiveImage";
import { SectionHeader } from "../../../../shared/components/SectionHeader";
import { OnboardingSectionShell } from "../shared/OnboardingSectionShell";
import { curatedCollections } from "./curatedCollections.content";

const collectionIcons = {
  adults: FavoriteRoundedIcon,
  beach: BeachAccessRoundedIcon,
  city: LocationCityRoundedIcon,
  family: FamilyRestroomRoundedIcon,
  villa: VillaRoundedIcon,
} satisfies Record<
  (typeof curatedCollections)[number]["icon"],
  ComponentType<SvgIconProps>
>;

export function CuratedCollectionsSection() {
  return (
    <OnboardingSectionShell tone="white">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <SectionHeader
          titleSize="large"
          titleTransform="none"
          eyebrow="Curated collections"
          title="Choose the right stay style"
          description="Collections group common booking intents into scan-friendly entry points."
        />

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-4xl xl:grid-cols-3">
          {curatedCollections.map((collection) => {
            const Icon = collectionIcons[collection.icon];
            const accentStyle = {
              "--collection-accent": collection.accent,
            } as CSSProperties;

            return (
              <article
                key={collection.title}
                className="group relative min-h-28 overflow-hidden rounded-lg border border-[rgb(var(--voyana-rgb-white)/0.78)] bg-(--voyana-color-background-dark) shadow-[0_16px_38px_rgb(var(--voyana-rgb-text-strong)/0.12)] transition hover:-translate-y-1 hover:shadow-[0_22px_52px_rgb(var(--voyana-rgb-text-strong)/0.18)]"
                style={accentStyle}
              >
                <ResponsiveImage
                  src={collection.image}
                  alt=""
                  className="absolute inset-0 scale-105 opacity-95 transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--voyana-rgb-background-dark)/0.78)_0%,rgb(var(--voyana-rgb-background-dark)/0.5)_54%,rgb(var(--voyana-rgb-background-dark)/0.18)_100%)]" />
                <div className="absolute -left-7 top-0 h-full w-28 skew-x-[-14deg] bg-[var(--collection-accent)]" />

                <div className="relative flex min-h-28 items-center gap-4 p-4 pl-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--voyana-rgb-white)/0.92)] text-(--voyana-color-text-strong) shadow-[0_12px_26px_rgb(var(--voyana-rgb-background-dark)/0.18)]">
                    <Icon fontSize="small" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-black leading-5 text-(--voyana-color-white) shadow-[0_8px_20px_rgb(var(--voyana-rgb-black)/0.24)]">
                      {collection.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-[rgb(var(--voyana-rgb-white)/0.82)]">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </OnboardingSectionShell>
  );
}
