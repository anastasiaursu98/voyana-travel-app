import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { NavLink, Link as RouterLink } from "react-router-dom";
import { routes } from "../../router/routes";
import { usePublicVacationCategoryLinks } from "./hooks/usePublicVacationCategoryLinks";

type PublicHeaderVacationPackagesDropdownProps = {
  getNavLinkClassName: (isActive: boolean) => string;
  isLightHeader: boolean;
};

export function PublicHeaderVacationPackagesDropdown({
  getNavLinkClassName,
  isLightHeader,
}: PublicHeaderVacationPackagesDropdownProps) {
  const { categoriesError, categoriesStatus, vacationCategoryLinks } =
    usePublicVacationCategoryLinks();
  const isLoading =
    categoriesStatus === "idle" || categoriesStatus === "loading";
  const hasCategories = vacationCategoryLinks.length > 0;

  return (
    <div className="group relative">
      <NavLink
        to={routes.vacationPackages}
        className={({ isActive }) => getNavLinkClassName(isActive)}
      >
        <span className="inline-flex items-center gap-1">
          Vacation packages
          <KeyboardArrowDownRoundedIcon
            className="text-[1rem] transition group-hover:rotate-180 group-focus-within:rotate-180"
            aria-hidden="true"
          />
        </span>
      </NavLink>

      <div className="invisible absolute left-1/2 top-full z-50 w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div
          className={`voyana-scrollbar max-h-[min(34rem,calc(100vh-6rem))] overflow-y-auto rounded-(--voyana-radius-card) border p-3 shadow-(--voyana-shadow-popover) backdrop-blur-xl ${
            isLightHeader
              ? "border-[rgb(var(--voyana-rgb-border-subtle)/0.92)] bg-[rgb(var(--voyana-rgb-white)/0.96)]"
              : "border-[rgb(var(--voyana-rgb-white)/0.18)] bg-[rgb(var(--voyana-rgb-background-dark)/0.88)]"
          }`}
        >
          {hasCategories ? (
            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {vacationCategoryLinks.map((item) => (
                <RouterLink
                  key={item.value}
                  to={item.to}
                  className={`block min-h-28 rounded-(--voyana-radius-card) border px-4 py-3 text-left no-underline transition focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.22)] ${
                    isLightHeader
                      ? "border-[rgb(var(--voyana-rgb-border-subtle)/0.68)] hover:border-[rgb(var(--voyana-rgb-accent-teal)/0.38)] hover:bg-(--voyana-color-background-section)"
                      : "border-[rgb(var(--voyana-rgb-white)/0.12)] hover:border-[rgb(var(--voyana-rgb-accent-teal)/0.4)] hover:bg-[rgb(var(--voyana-rgb-white)/0.08)]"
                  }`}
                >
                  <span
                    className={`block text-sm font-black ${
                      isLightHeader
                        ? "text-(--voyana-color-text-strong)"
                        : "text-(--voyana-color-white)"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`mt-1 line-clamp-3 block text-xs font-medium leading-5 ${
                      isLightHeader
                        ? "text-(--voyana-color-text-muted)"
                        : "text-[rgb(var(--voyana-rgb-white)/0.68)]"
                    }`}
                  >
                    {item.description}
                  </span>
                </RouterLink>
              ))}
            </div>
          ) : (
            <p
              className={`rounded-(--voyana-radius-card) px-4 py-3 text-sm font-bold ${
                isLightHeader
                  ? "text-(--voyana-color-text-muted)"
                  : "text-[rgb(var(--voyana-rgb-white)/0.68)]"
              }`}
            >
              {isLoading
                ? "Loading vacation categories..."
                : (categoriesError ?? "No vacation categories available.")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
