import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export type FilterCheckboxOptionProps = {
  count?: number;
  checked?: boolean;
  label: string;
  onChange?: () => void;
};

export function FilterCheckboxOption({
  count,
  checked = false,
  label,
  onChange,
}: FilterCheckboxOptionProps) {
  return (
    <label
      className={`flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm font-semibold transition-colors focus-within:ring-4 focus-within:ring-[rgb(var(--voyana-rgb-accent-teal)/0.14)] ${
        checked
          ? "border-[rgb(var(--voyana-rgb-accent-teal)/0.26)] bg-[rgb(var(--voyana-rgb-accent-teal)/0.06)] text-(--voyana-color-text-primary)"
          : "border-transparent text-(--voyana-color-text-primary) hover:bg-(--voyana-color-background-section)"
      }`}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <input
          className="sr-only"
          checked={checked}
          type="checkbox"
          onChange={onChange}
        />
        <span
          aria-hidden="true"
          className={`grid h-[1.125rem] w-[1.125rem] shrink-0 place-items-center rounded border transition-colors ${
            checked
              ? "border-(--voyana-color-accent-teal-strong) bg-(--voyana-color-accent-teal-strong) text-(--voyana-color-white)"
              : "border-[rgb(var(--voyana-rgb-border-subtle)/0.96)] bg-white"
          }`}
        >
          {checked ? <CheckRoundedIcon className="text-[0.82rem]" /> : null}
        </span>
        <span className="truncate leading-5">{label}</span>
      </span>
      {count !== undefined ? (
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-black leading-5 ${
            checked
              ? "bg-white text-(--voyana-color-accent-teal-strong)"
              : "bg-(--voyana-color-background-section) text-[rgb(var(--voyana-rgb-text-muted)/0.76)]"
          }`}
        >
          {count}
        </span>
      ) : null}
    </label>
  );
}
