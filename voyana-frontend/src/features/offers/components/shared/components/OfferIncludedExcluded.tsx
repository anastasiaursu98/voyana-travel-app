import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import type { OfferChecklistItem } from "../../../types/offerDetails.types";
import { OfferSectionPanel } from "./OfferSectionPanel";

type OfferIncludedExcludedProps = {
  excluded?: readonly OfferChecklistItem[];
  included?: readonly OfferChecklistItem[];
  title?: string;
};

export function OfferIncludedExcluded({
  excluded = [],
  included = [],
  title = "Included in this offer",
}: OfferIncludedExcludedProps) {
  if (included.length === 0 && excluded.length === 0) {
    return null;
  }

  return (
    <OfferSectionPanel title={title}>
      <div className="grid gap-6 md:grid-cols-2">
        {included.length > 0 ? (
          <ChecklistColumn icon="included" items={included} title="Included" />
        ) : null}
        {excluded.length > 0 ? (
          <ChecklistColumn
            icon="excluded"
            items={excluded}
            title="Not included"
          />
        ) : null}
      </div>
    </OfferSectionPanel>
  );
}

type ChecklistColumnProps = {
  icon: "excluded" | "included";
  items: readonly OfferChecklistItem[];
  title: string;
};

function ChecklistColumn({ icon, items, title }: ChecklistColumnProps) {
  const Icon =
    icon === "included"
      ? CheckCircleOutlineRoundedIcon
      : RemoveCircleOutlineRoundedIcon;

  return (
    <div className="min-w-0">
      <h3 className="text-sm font-semibold text-(--voyana-color-text-primary)">
        {title}
      </h3>
      <div className="mt-3 grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex min-w-0 items-start gap-3">
            <Icon
              fontSize="small"
              className="mt-0.5 shrink-0 text-[rgb(var(--voyana-rgb-text-muted)/0.72)]"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-(--voyana-color-text-body)">
                {item.label}
              </p>
              {item.description ? (
                <p className="mt-1 text-xs font-medium leading-5 text-(--voyana-color-text-muted)">
                  {item.description}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
