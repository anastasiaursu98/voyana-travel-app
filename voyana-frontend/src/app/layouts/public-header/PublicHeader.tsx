import { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { PublicContentContainer } from "../../../shared/components/PublicContentContainer";
import { selectAuthUser } from "../../../features/auth/store/authSlice";
import { routes } from "../../router/routes";
import { useAppSelector } from "../../store/hooks";
import { PublicHeaderBrand } from "./PublicHeaderBrand";
import { PublicHeaderMobileMenu } from "./PublicHeaderMobileMenu";
import { PublicHeaderNav } from "./PublicHeaderNav";
import { PublicHeaderSearch } from "./PublicHeaderSearch";
import { usePublicHeaderMobileMenu } from "./hooks/usePublicHeaderMobileMenu";

export function PublicHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { pathname } = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isHomePage = pathname === routes.home;
  const isLightHeader = !isHomePage;
  const hasSolidHeader = !isHomePage || hasScrolled;
  const user = useAppSelector(selectAuthUser);
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
          ? "!text-(--voyana-color-accent-teal-strong) after:scale-x-100 after:bg-(--voyana-color-accent-teal-strong)"
          : "text-slate-700 after:scale-x-0 after:bg-(--voyana-color-text-strong) hover:-translate-y-0.5 hover:text-(--voyana-color-text-strong) hover:after:scale-x-100"
      }`;
    }

    return `${baseClassName} ${
      isActive
        ? "!text-(--voyana-color-white) after:scale-x-100 after:bg-(--voyana-color-white)"
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

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsSearchOpen(false);
      handleMobileMenuClose();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [handleMobileMenuClose, pathname]);

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
        <PublicHeaderBrand isLightHeader={isLightHeader} />

        <PublicHeaderNav
          getNavLinkClassName={getNavLinkClassName}
          isLightHeader={isLightHeader}
        />

        <div className="flex items-center gap-3">
          <PublicHeaderSearch
            isLightHeader={isLightHeader}
            isSearchOpen={isSearchOpen}
            searchInputRef={searchInputRef}
            onClose={() => setIsSearchOpen(false)}
            onToggle={() => setIsSearchOpen((current) => !current)}
          />
          {!user ? (
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
          ) : (
            <div
              className={`hidden max-w-44 items-center rounded-full px-4 py-2 text-sm font-black sm:flex ${
                isLightHeader
                  ? "bg-(--voyana-color-background-section) text-(--voyana-color-text-strong)"
                  : "bg-[rgb(var(--voyana-rgb-white)/0.14)] text-(--voyana-color-white)"
              }`}
              title={`${user.firstName} ${user.lastName}`}
            >
              <span className="truncate">
                {user.firstName} {user.lastName}
              </span>
            </div>
          )}
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
