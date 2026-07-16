import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { AppButton, AppSearchField } from "../../../../../shared/ui";

const filterLabels = ["All roles", "All accounts"] as const;

export function UsersToolbar() {
  return (
    <div className="flex flex-col gap-4 border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <AppSearchField
        aria-label="Search users"
        placeholder="Search by name or email"
        className="max-w-md"
      />
      <div className="flex flex-wrap gap-2">
        {filterLabels.map((label) => (
          <AppButton
            key={label}
            intent="secondary"
            surface="light"
            type="button"
            className="min-h-11 px-4"
            startIcon={<FilterListRoundedIcon fontSize="small" />}
          >
            {label}
          </AppButton>
        ))}
      </div>
    </div>
  );
}
