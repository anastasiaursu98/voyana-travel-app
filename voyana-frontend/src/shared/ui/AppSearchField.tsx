import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import type { InputHTMLAttributes } from "react";

type AppSearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  className?: string;
  inputClassName?: string;
};

export function AppSearchField({
  className = "",
  inputClassName = "",
  ...props
}: AppSearchFieldProps) {
  return (
    <label className={`relative block w-full ${className}`}>
      <SearchRoundedIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.15rem] text-(--voyana-color-text-soft)" />
      <input
        type="search"
        className={`h-12 w-full rounded-(--voyana-radius-card) border border-[rgb(var(--voyana-rgb-border-subtle)/0.95)] bg-(--voyana-color-background-section) pl-11 pr-4 text-sm font-medium text-(--voyana-color-text-muted) outline-none transition placeholder:text-(--voyana-color-text-soft) focus:border-(--voyana-color-accent-teal) focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.15)] ${inputClassName}`}
        {...props}
      />
    </label>
  );
}
