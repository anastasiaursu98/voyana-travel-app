import Slider from "@mui/material/Slider";
import { CollapsibleFilterSection } from "./CollapsibleFilterSection";

type AmountSliderFilterProps = {
  currency?: string;
  max?: number;
  min?: number;
  onChange?: (value: [number, number]) => void;
  premiumLabel?: string;
  step?: number;
  title?: string;
  value?: [number, number];
};

export function AmountSliderFilter({
  currency = "EUR",
  max = 2500,
  min = 0,
  onChange,
  premiumLabel = "Premium",
  step = 100,
  title = "Amount",
  value = [min, max],
}: AmountSliderFilterProps) {
  const handleChange = (_: Event, nextValue: number | number[]) => {
    if (!Array.isArray(nextValue)) {
      return;
    }

    onChange?.([nextValue[0], nextValue[1]]);
  };

  const hasCustomRange = value[0] !== min || value[1] !== max;
  const supportingText = `${currency} ${value[0].toLocaleString("en-US")} - ${currency} ${value[1].toLocaleString("en-US")}`;

  return (
    <CollapsibleFilterSection
      activeLabel="Custom"
      defaultOpen
      selectedCount={hasCustomRange ? 1 : 0}
      supportingText={supportingText}
      title={title}
    >
      <div className="grid gap-4 px-1 pb-1 pt-2">
        <div className="flex items-center justify-between gap-3 text-sm font-black text-(--voyana-color-text-primary)">
          <span>
            {currency} {value[0].toLocaleString("en-US")}
          </span>
          <span>
            {currency} {value[1].toLocaleString("en-US")}
          </span>
        </div>
        <Slider
          aria-label={`${title} range`}
          disableSwap
          max={max}
          min={min}
          onChange={handleChange}
          step={step}
          sx={{
            color: "var(--voyana-color-accent-teal-strong)",
            "& .MuiSlider-rail": {
              backgroundColor: "rgb(var(--voyana-rgb-border-subtle) / 0.9)",
              opacity: 1,
            },
            "& .MuiSlider-thumb": {
              backgroundColor: "var(--voyana-color-white)",
              border: "2px solid var(--voyana-color-accent-teal-strong)",
              boxShadow: "0 8px 18px rgb(var(--voyana-rgb-text-strong) / 0.14)",
            },
          }}
          value={value}
        />
        <div className="flex items-center justify-between text-xs font-bold text-(--voyana-color-text-muted)">
          <span>Budget</span>
          <span>{premiumLabel}</span>
        </div>
      </div>
    </CollapsibleFilterSection>
  );
}
