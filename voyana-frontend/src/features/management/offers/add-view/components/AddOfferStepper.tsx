import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import { AppButton, AppTypography } from "../../../../../shared/ui";

export type AddOfferStep = {
  description: string;
  title: string;
};

type AddOfferStepperProps = {
  activeStep: number;
  onStepClick: (stepIndex: number) => void;
  steps: AddOfferStep[];
};

export function AddOfferStepper({
  activeStep,
  onStepClick,
  steps,
}: AddOfferStepperProps) {
  return (
    <nav aria-label="Add offer steps" className="xl:sticky xl:top-24">
      <AppTypography variant="caption" className="mb-3 px-1 uppercase tracking-[0.08em] text-(--voyana-color-text-soft)">
        Draft steps
      </AppTypography>
      <ol className="relative grid gap-1.5">
        <span
          aria-hidden="true"
          className="absolute bottom-5 left-6 top-5 w-px bg-[rgb(var(--voyana-rgb-border-subtle)/0.95)]"
        />
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isComplete = index < activeStep;

          return (
            <li key={step.title} className="relative">
              <AppButton
                intent="control"
                type="button"
                aria-current={isActive ? "step" : undefined}
                onClick={() => onStepClick(index)}
                className={`grid w-full grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 rounded-(--voyana-radius-card) px-2.5 py-2.5 text-left transition focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-button-primary)/0.2)] ${
                  isActive
                    ? "bg-[rgb(var(--voyana-rgb-button-primary)/0.18)]"
                    : "hover:bg-[rgb(var(--voyana-rgb-background-card)/0.72)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`relative z-10 grid h-7 w-7 place-items-center rounded-(--voyana-radius-pill) border text-xs font-(--voyana-font-weight-label) transition ${
                    isActive || isComplete
                      ? "border-(--voyana-color-button-primary) bg-(--voyana-color-button-primary) text-(--voyana-color-button-primary-text)"
                      : "border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] bg-(--voyana-color-background-card) text-(--voyana-color-text-soft)"
                  }`}
                >
                  {isComplete ? (
                    <CheckRoundedIcon className="text-[1rem]" />
                  ) : (
                    index + 1
                  )}
                </span>
                <AppTypography
                  variant="label"
                  className={`min-w-0 truncate ${
                    isActive
                      ? "text-(--voyana-color-text-strong)"
                      : "text-(--voyana-color-text-muted)"
                  }`}
                >
                  {step.title}
                </AppTypography>
              </AppButton>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
