import { useState } from "react";
import { OfferDescription } from "../../shared/components";

interface AllInclusiveDescriptionProps {
  name: string | undefined;
  description: string | undefined;
}
export const AllInclusiveDescription = ({
  name,
  description,
}: AllInclusiveDescriptionProps) => {
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);
  const descriptionText =
    description && description.length > 500 && !showFullDescription
      ? `${description.slice(0, 500)}...`
      : description;
  return (
    <OfferDescription
      action={
        <>
          {description && description.length > 500 ? (
            <button
              type="button"
              className="mt-5 text-sm font-semibold text-(--voyana-color-text-body) transition-colors hover:text-(--voyana-color-text-primary)"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          ) : undefined}
        </>
      }
      description={descriptionText ?? ""}
      location="Hurghada, Egypt"
      rating={5}
      ratingLabel="5"
      title={name ?? ""}
    />
  );
};
