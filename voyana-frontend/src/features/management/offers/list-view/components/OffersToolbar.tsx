import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { AppBadge, AppButton, AppSearchField } from "../../../../../shared/ui";

type OffersToolbarProps = {
  offersCount: number;
};

export function OffersToolbar({ offersCount }: OffersToolbarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <AppSearchField
        aria-label="Search offers"
        placeholder="Search by offer name or code"
        className="max-w-md"
      />

      <div className="flex flex-wrap items-center gap-2">
        <AppButton
          intent="secondary"
          surface="light"
          type="button"
          className="min-h-11 px-4"
          startIcon={<FilterListRoundedIcon fontSize="small" />}
        >
          All statuses
        </AppButton>
        <AppBadge tone="teal" size="md">{offersCount} offers</AppBadge>
      </div>
    </div>
  );
}
