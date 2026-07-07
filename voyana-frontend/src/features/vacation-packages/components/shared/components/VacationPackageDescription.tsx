import type { ReactNode } from "react";
import { VacationPackageMetaInfo } from "./VacationPackageMetaInfo";

type VacationPackageDescriptionProps = {
  action?: ReactNode;
  description: string;
  location: string;
  rating?: number;
  ratingLabel?: string;
  title: string;
};

export function VacationPackageDescription({
  action,
  description,
  location,
  rating,
  ratingLabel,
  title,
}: VacationPackageDescriptionProps) {
  return (
    <div className="max-w-4xl">
      <h2 className="text-4xl font-medium leading-[1.05] tracking-normal text-(--voyana-color-text-primary) sm:text-5xl">
        {title}
      </h2>

      <VacationPackageMetaInfo
        className="mt-5"
        location={location}
        rating={rating}
        ratingLabel={ratingLabel}
      />

      <p className="mt-8 max-w-4xl text-sm font-medium leading-7 text-(--voyana-color-text-body) sm:text-base sm:leading-8">
        {description}
      </p>
      {action}
    </div>
  );
}
