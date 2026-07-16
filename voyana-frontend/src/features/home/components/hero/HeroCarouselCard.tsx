import { AppButton } from "../../../../shared/ui";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import type { DashboardDestination } from "../../../destinations/types/destination.types";

interface HeroCarouselCardProps {
  destination: DashboardDestination;
  galleryImageIndexByDestinationId: Record<string, number>;
  onGalleryImageClick: (
    destination: DashboardDestination,
    selectedGalleryImageIndex: number,
  ) => void;
}

export function HeroCarouselCard({
  destination,
  galleryImageIndexByDestinationId,
  onGalleryImageClick,
}: HeroCarouselCardProps) {
  const savedGalleryImageIndex =
    galleryImageIndexByDestinationId[destination._id] ?? 0;
  const selectedGalleryImageIndex =
    destination.galleryImages[savedGalleryImageIndex] === undefined
      ? 0
      : savedGalleryImageIndex;
  const previewImage =
    destination.galleryImages[selectedGalleryImageIndex] ??
    destination.coverImage;

  return (
    <div className="relative h-[clamp(13.5rem,54vw,16.5rem)] w-[clamp(8rem,40vw,10rem)] shrink-0 overflow-hidden rounded-(--voyana-radius-modal) sm:h-[290px] sm:w-[190px] sm:rounded-(--voyana-radius-carousel-card) md:h-[310px] md:w-[198px] lg:h-[330px] lg:w-[206px] xl:h-[340px] xl:w-[212px] 2xl:h-[360px] 2xl:w-[228px]">
      <img
        src={previewImage.url}
        alt={previewImage.alt}
        className="h-full w-full cursor-pointer object-cover transition duration-500 hover:scale-[1.03]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgb(var(--voyana-rgb-background-dark)/0)_0%,rgb(var(--voyana-rgb-background-dark)/0.74)_78%)] px-3 pb-3 pt-16 sm:px-4 sm:pb-4">
        <p className="truncate text-sm font-black leading-tight text-(--voyana-color-white) drop-shadow-[0_1px_8px_rgb(var(--voyana-rgb-background-dark)/0.5)]">
          {destination.countryCode}
        </p>
        <div className="mt-2 inline-flex h-2 max-w-full items-center justify-start gap-1.5">
          {destination.galleryImages.map((galleryImage, index) => {
            const isSelected = selectedGalleryImageIndex === index;

            return (
              <AppButton intent="control"
                onClick={() => onGalleryImageClick(destination, index)}
                key={`${destination._id}-${galleryImage.id || index}`}
                type="button"
                aria-label={`Show ${galleryImage.alt}`}
                aria-pressed={isSelected}
                className={`h-1.5 w-1.5 shrink-0 rounded-(--voyana-radius-pill) transition-[transform,background-color,box-shadow,opacity] hover:scale-125 hover:bg-(--voyana-color-white) focus:outline-none focus:ring-2 focus:ring-[rgb(var(--voyana-rgb-accent-warm)/0.7)] ${
                  isSelected
                    ? "bg-(--voyana-color-accent-warm) opacity-100 shadow-[0_0_14px_rgb(var(--voyana-rgb-accent-warm)/0.72)]"
                    : "bg-[rgb(var(--voyana-rgb-white)/0.58)] opacity-80 shadow-[0_0_10px_rgb(var(--voyana-rgb-white)/0.24)]"
                }`}
              />
            );
          })}
        </div>
      </div>
      <AppButton intent="control"
        type="button"
        aria-label={`Save ${destination.name}`}
        icon={<BookmarkRoundedIcon fontSize="small" />}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-(--voyana-radius-pill) bg-[rgb(var(--voyana-rgb-white)/0.9)] text-[rgb(var(--voyana-rgb-background-dark)/0.54)] shadow-[0_12px_30px_rgb(var(--voyana-rgb-background-dark)/0.22)] transition hover:-translate-y-0.5 hover:bg-(--voyana-color-white) hover:text-[rgb(var(--voyana-rgb-background-dark)/0.82)] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--voyana-rgb-accent-warm)/0.7)] sm:right-4 sm:top-4 sm:h-10 sm:w-10"
      />
    </div>
  );
}
