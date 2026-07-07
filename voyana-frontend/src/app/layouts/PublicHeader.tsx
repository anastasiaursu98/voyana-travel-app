import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useEffect, useRef, useState } from "react";
import {
  Link as RouterLink,
  NavLink,
  useLocation,
} from "react-router-dom";
import { PublicContentContainer } from "../../shared/components/PublicContentContainer";
import { VoyanaLogoMark } from "../../shared/components/VoyanaLogoMark";
import { routes } from "../router/routes";
import { PUBLIC_NAV_ITEMS } from "./constants/publicLayout.constants";
import { usePublicHeaderMobileMenu } from "./hooks/usePublicHeaderMobileMenu";
import { PublicHeaderMobileMenu } from "./PublicHeaderMobileMenu";
import { PublicHeaderVacationPackagesDropdown } from "./PublicHeaderVacationPackagesDropdown";

export function PublicHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { pathname } = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isHomePage = pathname === routes.home;
  const isLightHeader = !isHomePage;
  const hasSolidHeader = !isHomePage || hasScrolled;
  const {
    handleMobileMenuClose,
    handleMobileMenuToggle,
    handleVacationCategoriesToggle,
    isVacationCategoriesOpen,
    isMobileMenuOpen,
    mobileMenuRef,
  } = usePublicHeaderMobileMenu();
  const getNavLinkClassName = (isActive: boolean) => {
    const baseClassName =
      "public-header__nav-link relative px-1 py-2 text-sm font-bold transition-[color,transform] duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-center after:rounded-full after:transition-transform after:duration-200 focus:outline-none focus-visible:after:scale-x-100";

    if (isLightHeader) {
      return `${baseClassName} ${
        isActive
          ? "text-(--voyana-color-accent-teal-strong) after:scale-x-100 after:bg-(--voyana-color-accent-teal-strong)"
          : "text-slate-700 after:scale-x-0 after:bg-(--voyana-color-text-strong) hover:-translate-y-0.5 hover:text-(--voyana-color-text-strong) hover:after:scale-x-100"
      }`;
    }

    return `${baseClassName} ${
      isActive
        ? "text-(--voyana-color-white) after:scale-x-100 after:bg-(--voyana-color-white)"
        : "text-[rgb(var(--voyana-rgb-white)/0.82)] after:scale-x-0 after:bg-(--voyana-color-white) hover:-translate-y-0.5 hover:text-(--voyana-color-white) hover:after:scale-x-100"
    }`;
  };

  useEffect(() => {
    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 12);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  return (
    <header
      data-header-style={isLightHeader ? "light" : "hero"}
      className={`public-header fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        isLightHeader
          ? "border-[rgb(var(--voyana-rgb-border-subtle)/0.86)] bg-white shadow-[0_10px_30px_rgb(var(--voyana-rgb-text-strong)/0.045)]"
          : hasSolidHeader
            ? "border-[rgb(var(--voyana-rgb-white)/0.1)] bg-[rgb(var(--voyana-rgb-background-dark)/0.72)] shadow-[0_18px_44px_rgb(var(--voyana-rgb-black)/0.18)] backdrop-blur-xl"
            : "border-transparent bg-transparent shadow-none backdrop-blur-none"
      }`}
    >
      <PublicContentContainer className="flex h-16 min-w-0 items-center justify-between">
        <RouterLink
          to={routes.home}
          className={`public-header__brand flex items-center gap-3 transition focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.25)] ${
            isLightHeader
              ? "text-slate-950 hover:text-(--voyana-color-text-strong)"
              : "text-(--voyana-color-white) hover:text-(--voyana-color-text-inverse-muted)"
          }`}
          aria-label="Voyana home"
        >
          <VoyanaLogoMark sx={{ width: 38, height: 38 }} />
          <span className="text-xl font-black leading-none tracking-normal">
            Voyana
          </span>
        </RouterLink>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary navigation"
        >
          {PUBLIC_NAV_ITEMS.map((item) => {
            const shouldUseExactMatch = item.to === routes.home;

            if (item.label === "Vacation packages") {
              return (
                <PublicHeaderVacationPackagesDropdown
                  key={item.label}
                  getNavLinkClassName={getNavLinkClassName}
                  isLightHeader={isLightHeader}
                />
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={shouldUseExactMatch}
                className={({ isActive }) =>
                  getNavLinkClassName(
                    isActive &&
                      (item.label === "Home" ||
                        item.label === "Destinations"),
                  )
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className={`hidden h-11 items-center overflow-hidden rounded-full bg-(--voyana-color-white) text-(--voyana-color-text-primary) transition-[width,background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-(--voyana-color-background-input) sm:flex ${
              isLightHeader
                ? "border border-white shadow-none"
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
                    setIsSearchOpen(false);
                  }
                }}
                className="h-full min-w-0 flex-1 bg-transparent text-sm font-bold text-(--voyana-color-text-primary) outline-none placeholder:text-(--voyana-color-text-muted)"
                aria-label="Search destinations"
              />
            ) : null}
            <button
              type="button"
              onClick={() => setIsSearchOpen((currentValue) => !currentValue)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-white)/0.3)]"
              aria-label={isSearchOpen ? "Close search" : "Search destinations"}
              aria-expanded={isSearchOpen}
            >
              {isSearchOpen ? (
                <CloseRoundedIcon fontSize="small" />
              ) : (
                <SearchRoundedIcon fontSize="small" />
              )}
            </button>
          </div>
          <RouterLink
            to={routes.login}
            className={`public-header__start-link hidden h-11 items-center justify-center rounded-2xl px-5 text-sm font-black transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 sm:inline-flex ${
              isLightHeader
                ? "border-2 border-[rgb(var(--voyana-rgb-text-strong)/0.28)] bg-transparent text-(--voyana-color-text-strong) hover:border-[rgb(var(--voyana-rgb-text-strong)/0.52)] focus:ring-[rgb(var(--voyana-rgb-text-strong)/0.14)]"
                : "border-2 border-[rgb(var(--voyana-rgb-white)/0.82)] bg-transparent text-(--voyana-color-white) hover:border-(--voyana-color-white) focus:ring-[rgb(var(--voyana-rgb-white)/0.18)]"
            }`}
          >
            Start
          </RouterLink>
          <PublicHeaderMobileMenu
            isLightHeader={isLightHeader}
            isVacationCategoriesOpen={isVacationCategoriesOpen}
            isOpen={isMobileMenuOpen}
            menuRef={mobileMenuRef}
            onClose={handleMobileMenuClose}
            onVacationCategoriesToggle={handleVacationCategoriesToggle}
            onToggle={handleMobileMenuToggle}
          />
        </div>
      </PublicContentContainer>
    </header>
  );
}
