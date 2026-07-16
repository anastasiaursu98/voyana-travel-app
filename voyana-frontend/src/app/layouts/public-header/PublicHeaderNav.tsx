import { NavLink } from "react-router-dom";
import { routes } from "../../router/routes";
import { PUBLIC_NAV_ITEMS } from "./constants/publicHeader.constants";
import { PublicHeaderVacationPackagesDropdown } from "./PublicHeaderVacationPackagesDropdown";

type PublicHeaderNavProps = {
  getNavLinkClassName: (isActive: boolean) => string;
  isLightHeader: boolean;
};

export function PublicHeaderNav({
  getNavLinkClassName,
  isLightHeader,
}: PublicHeaderNavProps) {
  return (
    <nav
      className="hidden items-center gap-5 xl:flex 2xl:gap-8"
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
              getNavLinkClassName(isActive)
            }
          >
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
