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
    <label className="flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2 text-sm font-semibold text-(--voyana-color-text-primary) transition-colors hover:bg-[rgb(var(--voyana-rgb-background-section)/0.86)]">
      <span className="flex min-w-0 items-center gap-2.5">
        <input
          className="h-4 w-4 shrink-0 accent-[var(--voyana-color-accent-teal-strong)]"
          checked={checked}
          type="checkbox"
          onChange={onChange}
        />
        <span className="truncate">{label}</span>
      </span>
      {count !== undefined ? (
        <span className="shrink-0 text-xs font-bold text-(--voyana-color-text-muted)">
          {count}
        </span>
      ) : null}
    </label>
  );
}
