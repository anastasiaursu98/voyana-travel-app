import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import type { OfferHighlight } from "../../../types/offerDetails.types";
import { OfferSectionPanel } from "./OfferSectionPanel";

type OfferHighlightsProps = {
  description?: string;
  highlights: readonly OfferHighlight[];
  title?: string;
};

export function OfferHighlights({
  description,
  highlights,
  title = "Highlights",
}: OfferHighlightsProps) {
  if (highlights.length === 0) {
    return null;
  }

  return (
    <OfferSectionPanel description={description} title={title}>
      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="flex min-w-0 items-start gap-3 text-sm"
          >
            <CheckCircleOutlineRoundedIcon
              fontSize="small"
              className="mt-0.5 shrink-0 text-[rgb(var(--voyana-rgb-text-muted)/0.72)]"
            />
            <div className="min-w-0">
              <p className="text-[0.84rem] font-semibold text-(--voyana-color-text-primary)">
                {highlight.label}
              </p>
              {highlight.description ? (
                <p className="mt-1 text-xs font-medium leading-5 text-(--voyana-color-text-muted)">
                  {highlight.description}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </OfferSectionPanel>
  );
}
