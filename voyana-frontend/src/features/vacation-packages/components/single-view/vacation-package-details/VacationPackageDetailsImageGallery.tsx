import type { VacationPackageImage } from "../../../types/vacationPackage.types";

type VacationPackageDetailsImageGalleryProps = {
  coverImage: VacationPackageImage;
  galleryImages?: VacationPackageImage[];
};

export function VacationPackageDetailsImageGallery({
  coverImage,
  galleryImages = [],
}: VacationPackageDetailsImageGalleryProps) {
  return (
    <div className="grid w-full min-w-0 gap-3 bg-white sm:gap-4 xl:grid-cols-[minmax(0,2.15fr)_minmax(17rem,0.85fr)]">
      <div className="overflow-hidden rounded-lg bg-white">
        {coverImage && (
          <img
            src={coverImage.url}
            alt={coverImage.alt}
            className="h-64 w-full object-cover sm:h-80 md:h-96 xl:h-120"
          />
        )}
      </div>

      <div className="grid min-w-0 grid-cols-2 gap-3 bg-white sm:gap-4 xl:grid-cols-1">
        {galleryImages?.slice(0, 2).map((image) => (
          <div key={image.url} className="overflow-hidden rounded-lg bg-white">
            <img
              src={image.url}
              alt={image.alt}
              className="h-36 w-full object-cover sm:h-44 md:h-48 xl:h-58"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
