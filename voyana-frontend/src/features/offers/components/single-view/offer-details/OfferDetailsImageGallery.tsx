import { ResponsiveImage } from "../../../../../shared/components/ResponsiveImage";
import type { OfferImage } from "../../../types/offer.types";

type OfferDetailsImageGalleryProps = {
  coverImage: OfferImage;
  galleryImages?: OfferImage[];
};

export function OfferDetailsImageGallery({
  coverImage,
  galleryImages = [],
}: OfferDetailsImageGalleryProps) {
  const visibleGalleryImages = galleryImages.slice(0, 3);

  return (
    <section className="grid gap-3 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
      <div className="aspect-[16/9] overflow-hidden rounded-lg bg-(--voyana-color-background-section)">
        <ResponsiveImage src={coverImage.url} alt={coverImage.alt} />
      </div>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {visibleGalleryImages.map((image) => (
          <div
            key={image.id ?? image.url}
            className="aspect-[16/10] overflow-hidden rounded-lg bg-(--voyana-color-background-section)"
          >
            <ResponsiveImage src={image.url} alt={image.alt} />
          </div>
        ))}
      </div>
    </section>
  );
}
