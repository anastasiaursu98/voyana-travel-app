import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useState } from "react";

import { AppBreadcrumbs } from "../../../../../shared/components/AppBreadcrumbs";
import { PublicPageShell } from "../../../../../shared/components/PublicPageShell";
import { AppButton, AppSurface, AppTypography } from "../../../../../shared/ui";
import { managementPaths } from "../../../routes/management.paths";
import { AddOfferPageHeader } from "./AddOfferPageHeader";
import { AddOfferPreviewModal } from "./AddOfferPreviewModal";
import { AddOfferStepper } from "./AddOfferStepper";
import { AvailabilityStep } from "./steps/AvailabilityStep";
import { BasicsStep } from "./steps/BasicsStep";
import { DetailsStep } from "./steps/DetailsStep";
import { PricingStep } from "./steps/PricingStep";
import { PublishingStep } from "./steps/PublishingStep";

const addOfferSteps = [
  {
    title: "Basics",
    description: "Name, destination, category",
  },
  {
    title: "Availability",
    description: "Dates, inventory, nights",
  },
  {
    title: "Pricing",
    description: "Variants, rates, promotions",
  },
  {
    title: "Details",
    description: "Fees, payment, media",
  },
  {
    title: "Publish",
    description: "Visibility and final review",
  },
];

const stepContent = [
  <BasicsStep key="basics" />,
  <AvailabilityStep key="availability" />,
  <PricingStep key="pricing" />,
  <DetailsStep key="details" />,
  <PublishingStep key="publishing" />,
];

export function AddOfferView() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === addOfferSteps.length - 1;
  const currentStep = addOfferSteps[activeStep];

  return (
    <PublicPageShell className="bg-(--voyana-color-background-section)!">
      <div className="grid gap-7">
        <AppBreadcrumbs
          items={[
            { label: "Offers", to: managementPaths.offers },
            { label: "Add offer" },
          ]}
        />
        <AddOfferPageHeader />

        <div className="grid gap-6 xl:grid-cols-[15rem_minmax(0,1fr)] xl:items-start">
          <AddOfferStepper
            activeStep={activeStep}
            onStepClick={setActiveStep}
            steps={addOfferSteps}
          />

          <form aria-label="Add offer preview form">
            <AppSurface variant="panel" className="overflow-hidden">
              <div className="flex flex-col gap-4 border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.82)] bg-(--voyana-color-background-card) px-5 py-5 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <AppTypography variant="caption" className="uppercase tracking-[0.08em] text-(--voyana-color-text-soft)">
                    Step {activeStep + 1} of {addOfferSteps.length}
                  </AppTypography>
                  <AppTypography
                    variant="cardTitle"
                    component="h2"
                    className="mt-2 text-(--voyana-color-text-strong)"
                  >
                    {currentStep.title}
                  </AppTypography>
                  <AppTypography variant="caption" className="mt-1.5 max-w-2xl text-(--voyana-color-text-muted)">
                    {currentStep.description}. Use preview to validate the public offer view before publishing.
                  </AppTypography>
                </div>
                <AppButton
                  intent="secondary"
                  surface="light"
                  type="button"
                  startIcon={<VisibilityRoundedIcon className="text-[1rem]" />}
                  onClick={() => setIsPreviewOpen(true)}
                  className="min-h-11 px-4"
                >
                  Preview
                </AppButton>
              </div>

              <div className="grid gap-7 px-5 py-6 sm:px-6">
                {stepContent[activeStep]}
              </div>

              <div className="sticky bottom-0 z-10 flex flex-wrap gap-2 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.82)] bg-[rgb(var(--voyana-rgb-background-card)/0.96)] p-4 backdrop-blur-md sm:justify-end sm:px-6">
                <AppButton
                  intent="secondary"
                  surface="light"
                  type="button"
                  disabled={isFirstStep}
                  startIcon={<ArrowBackRoundedIcon className="text-[1rem]" />}
                  onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
                  className="min-h-11 px-4"
                >
                  Back
                </AppButton>
                <AppButton
                  intent="secondary"
                  surface="light"
                  type="button"
                  startIcon={<SaveRoundedIcon className="text-[1rem]" />}
                  className="min-h-11 px-4"
                >
                  Save draft
                </AppButton>
                <AppButton
                  type="button"
                  startIcon={isLastStep ? <SaveRoundedIcon className="text-[1rem]" /> : undefined}
                  endIcon={isLastStep ? undefined : <ArrowForwardRoundedIcon className="text-[1rem]" />}
                  onClick={() => {
                    if (!isLastStep) {
                      setActiveStep((step) => Math.min(addOfferSteps.length - 1, step + 1));
                    }
                  }}
                  className="min-h-11 px-5"
                >
                  {isLastStep ? "Save" : "Next"}
                </AppButton>
              </div>
            </AppSurface>
          </form>
        </div>
      </div>

      <AddOfferPreviewModal
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </PublicPageShell>
  );
}
