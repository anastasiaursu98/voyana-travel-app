import { Link as RouterLink } from "react-router-dom";
import { VoyanaLogoMark } from "../../../shared/components/VoyanaLogoMark";
import { routes } from "../../router/routes";

type PublicHeaderBrandProps = {
  isLightHeader: boolean;
};

export function PublicHeaderBrand({ isLightHeader }: PublicHeaderBrandProps) {
  return (
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
  );
}
