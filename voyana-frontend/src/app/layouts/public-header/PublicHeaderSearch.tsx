import { AppButton } from "../../../shared/ui";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import type { RefObject } from "react";

type PublicHeaderSearchProps = {
  isLightHeader: boolean;
  isSearchOpen: boolean;
  searchInputRef: RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onToggle: () => void;
};

export function PublicHeaderSearch({
  isLightHeader,
  isSearchOpen,
  searchInputRef,
  onClose,
  onToggle,
}: PublicHeaderSearchProps) {
  return (
    <div
      className={`hidden h-11 items-center overflow-hidden rounded-(--voyana-radius-pill) bg-(--voyana-color-white) text-(--voyana-color-text-primary) transition-[width,background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-(--voyana-color-background-input) sm:flex ${
        isLightHeader
          ? "border border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] shadow-none"
          : "shadow-(--voyana-shadow-control)"
      } ${isSearchOpen ? "w-64 pl-4" : "w-11"}`}
    >
      {isSearchOpen ? (
        <input
          ref={searchInputRef}
          type="search"
          placeholder="Search destinations"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              onClose();
            }
          }}
          className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-(--voyana-color-text-muted) outline-none placeholder:text-(--voyana-color-text-soft)"
          aria-label="Search destinations"
        />
      ) : null}
      <AppButton intent="control"
        type="button"
        onClick={onToggle}
        icon={
          isSearchOpen ? (
            <CloseRoundedIcon fontSize="small" />
          ) : (
            <SearchRoundedIcon fontSize="small" />
          )
        }
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-(--voyana-radius-pill) focus:outline-none focus:ring-4 ${
          isLightHeader
            ? "focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.18)]"
            : "focus:ring-[rgb(var(--voyana-rgb-white)/0.3)]"
        }`}
        aria-label={isSearchOpen ? "Close search" : "Search destinations"}
        aria-expanded={isSearchOpen}
      />
    </div>
  );
}
