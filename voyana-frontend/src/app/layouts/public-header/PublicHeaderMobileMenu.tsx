import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import type { RefObject } from "react";
import { NavLink, Link as RouterLink } from "react-router-dom";
import { routes } from "../../router/routes";
import { PUBLIC_NAV_ITEMS } from "./constants/publicHeader.constants";
import { usePublicVacationCategoryLinks } from "./hooks/usePublicVacationCategoryLinks";

type PublicHeaderMobileMenuProps = {
  isVacationCategoriesOpen: boolean;
  isLightHeader: boolean;
  isOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onVacationCategoriesToggle: () => void;
  onToggle: () => void;
};

export function PublicHeaderMobileMenu({
  isVacationCategoriesOpen,
  isLightHeader,
  isOpen,
  menuRef,
  onClose,
  onVacationCategoriesToggle,
  onToggle,
}: PublicHeaderMobileMenuProps) {
  const { categoriesError, categoriesStatus, vacationCategoryLinks } =
    usePublicVacationCategoryLinks();
  const isLoading =
    categoriesStatus === "idle" || categoriesStatus === "loading";

  const getMobileLinkClassName = (isActive: boolean) =>
    `flex min-h-12 items-center justify-between rounded-lg px-4 text-base font-black transition focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.18)] ${
      isActive
        ? "bg-[rgb(var(--voyana-rgb-accent-teal)/0.12)] text-(--voyana-color-accent-teal-strong)"
        : "text-(--voyana-color-text-primary) hover:bg-(--voyana-color-background-section)"
    }`;

  return (
    <div ref={menuRef} className="relative md:hidden">
      <button
        type="button"
        onClick={onToggle}
        className={`grid h-11 w-11 place-items-center rounded-full border transition focus:outline-none focus:ring-4 ${
          isLightHeader
            ? "border-[rgb(var(--voyana-rgb-text-strong)/0.18)] bg-white text-(--voyana-color-text-strong) hover:bg-(--voyana-color-background-section) focus:ring-[rgb(var(--voyana-rgb-text-strong)/0.12)]"
            : "border-[rgb(var(--voyana-rgb-white)/0.34)] bg-[rgb(var(--voyana-rgb-white)/0.12)] text-(--voyana-color-white) hover:bg-[rgb(var(--voyana-rgb-white)/0.2)] focus:ring-[rgb(var(--voyana-rgb-white)/0.18)]"
        }`}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="public-mobile-navigation"
      >
        {isOpen ? (
          <CloseRoundedIcon fontSize="small" />
        ) : (
          <MenuRoundedIcon fontSize="small" />
        )}
      </button>

      {isOpen ? (
        <div
          id="public-mobile-navigation"
          aria-modal="true"
          aria-labelledby="public-mobile-navigation-title"
          className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.86)] bg-white px-5 py-5 shadow-[0_24px_70px_rgb(var(--voyana-rgb-background-dark)/0.14)]"
          role="dialog"
          tabIndex={-1}
        >
          <div className="mx-auto grid w-full max-w-md gap-5">
            <div className="border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.86)] pb-4">
              <p
                id="public-mobile-navigation-title"
                className="text-xs font-black uppercase tracking-normal text-(--voyana-color-text-muted)"
              >
                Navigation
              </p>
            </div>

            <nav className="grid gap-1.5" aria-label="Mobile navigation">
              {PUBLIC_NAV_ITEMS.map((item) => {
                const shouldUseExactMatch = item.to === routes.home;

                if (item.label === "Vacation packages") {
                  return (
                    <div key={item.label} className="grid gap-2">
                      <button
                        type="button"
                        onClick={onVacationCategoriesToggle}
                        className={getMobileLinkClassName(false)}
                        aria-expanded={isVacationCategoriesOpen}
                        aria-controls="mobile-vacation-categories"
                      >
                        <span>{item.label}</span>
                        <KeyboardArrowRightRoundedIcon
                          className={`text-[1.25rem] transition-transform ${
                            isVacationCategoriesOpen ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {isVacationCategoriesOpen ? (
                        <div
                          id="mobile-vacation-categories"
                          className="grid gap-1.5 rounded-lg bg-(--voyana-color-background-section) p-2"
                        >
                          <RouterLink
                            to={routes.vacationPackages}
                            onClick={onClose}
                            className="flex min-h-11 items-center justify-between gap-3 rounded-md bg-white px-3 text-sm font-extrabold text-(--voyana-color-text-primary) transition hover:text-(--voyana-color-accent-teal-strong) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.16)]"
                          >
                            <span className="min-w-0 truncate">
                              All vacation packages
                            </span>
                            <KeyboardArrowRightRoundedIcon className="shrink-0 text-[1rem] text-(--voyana-color-text-muted)" />
                          </RouterLink>

                          {vacationCategoryLinks.length > 0 ? (
                            vacationCategoryLinks.map((category) => (
                              <RouterLink
                                key={category.value}
                                to={category.to}
                                onClick={onClose}
                                className="flex min-h-11 items-center justify-between gap-3 rounded-md bg-white px-3 text-sm font-extrabold text-(--voyana-color-text-primary) transition hover:text-(--voyana-color-accent-teal-strong) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.16)]"
                              >
                                <span className="min-w-0 truncate">
                                  {category.label}
                                </span>
                                <KeyboardArrowRightRoundedIcon className="shrink-0 text-[1rem] text-(--voyana-color-text-muted)" />
                              </RouterLink>
                            ))
                          ) : (
                            <p className="rounded-md bg-white px-3 py-2.5 text-sm font-bold text-(--voyana-color-text-muted)">
                              {isLoading
                                ? "Loading vacation categories..."
                                : (categoriesError ??
                                  "No vacation categories available.")}
                            </p>
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={shouldUseExactMatch}
                    onClick={onClose}
                    className={({ isActive }) =>
                      getMobileLinkClassName(
                        isActive &&
                          (item.label === "Home" ||
                            item.label === "Destinations"),
                      )
                    }
                  >
                    <span>{item.label}</span>
                    <KeyboardArrowRightRoundedIcon className="text-[1.25rem]" />
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
