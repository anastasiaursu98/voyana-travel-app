import { SectionHeader } from "../../../../shared/components/SectionHeader";
import { ReviewCard } from "../../../reviews";
import { homeImages } from "../../constants/homeImages";
import { HorizontalRail } from "../shared/HorizontalRail";
import { OnboardingSectionShell } from "../shared/OnboardingSectionShell";
import { testimonials } from "./trust.content";

export function ReviewsTrustSection() {
  return (
    <OnboardingSectionShell
      tone="dark"
      backgroundImage={homeImages.japaneseTemple}
      backgroundOverlayClassName="bg-[linear-gradient(90deg,rgb(var(--voyana-rgb-background-dark)/0.74)_0%,rgb(var(--voyana-rgb-background-dark)/0.48)_48%,rgb(var(--voyana-rgb-background-dark)/0.28)_100%)]"
      className="py-12 sm:py-16 lg:py-24"
    >
      <SectionHeader
        eyebrow="Testimonials"
        title="Unforgettable Travel Experience"
        description="Real-like guest stories, ratings, and trip details that build trust before travelers choose a package."
        inverse
        align="responsiveCenter"
        titleTransform="none"
      />

      <HorizontalRail className="-mx-6 mt-8 px-6 text-(--voyana-color-background-section) sm:-mx-10 sm:mt-10 sm:px-10 lg:mx-auto lg:mt-12 lg:max-w-370 lg:px-0">
        {testimonials.map((testimonial) => (
          <ReviewCard key={testimonial.name} review={testimonial} />
        ))}
      </HorizontalRail>
    </OnboardingSectionShell>
  );
}
