import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Link as RouterLink } from "react-router-dom";

import { AppButton } from "../ui";

export type AppBreadcrumbItem = {
  label: string;
  to?: string;
};

type AppBreadcrumbsProps = {
  homeLabel?: string;
  homeTo?: string;
  items: AppBreadcrumbItem[];
};

const itemClassName =
  "inline-flex min-h-8 items-center gap-1.5 rounded-(--voyana-radius-pill) px-1.5 text-sm font-medium text-(--voyana-color-text-soft) transition hover:bg-[rgb(var(--voyana-rgb-background-card)/0.72)] hover:text-(--voyana-color-text-muted) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-border-subtle)/0.45)]";

function BreadcrumbSeparator() {
  return (
    <ChevronRightRoundedIcon
      aria-hidden="true"
      className="text-[1rem] text-(--voyana-color-text-subtle)"
    />
  );
}

function BreadcrumbOverflow() {
  return (
    <span className="inline-flex min-h-8 items-center rounded-(--voyana-radius-pill) px-1.5 text-(--voyana-color-text-subtle)">
      <MoreHorizRoundedIcon className="text-[1.1rem]" />
    </span>
  );
}

export function AppBreadcrumbs({
  homeLabel = "Home",
  homeTo = "/",
  items,
}: AppBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex min-w-0 flex-wrap items-center gap-1">
        <li>
          <AppButton
            component={RouterLink}
            intent="control"
            to={homeTo}
            aria-label={homeLabel}
            icon={<HomeRoundedIcon className="text-[1.15rem]" />}
            className="grid h-8 w-8 place-items-center rounded-(--voyana-radius-pill) text-(--voyana-color-text-soft) transition hover:bg-[rgb(var(--voyana-rgb-background-card)/0.72)] hover:text-(--voyana-color-text-muted) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-border-subtle)/0.45)]"
          />
        </li>

        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          const shouldCollapse = items.length > 4 && index > 0 && index < items.length - 2;

          if (shouldCollapse && index === 1) {
            return (
              <li key="breadcrumb-overflow" className="flex items-center gap-1">
                <BreadcrumbSeparator />
                <BreadcrumbOverflow />
              </li>
            );
          }

          if (shouldCollapse) {
            return null;
          }

          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1">
              <BreadcrumbSeparator />
              {item.to && !isCurrent ? (
                <RouterLink to={item.to} className={itemClassName}>
                  {item.label}
                </RouterLink>
              ) : (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  className="inline-flex min-h-8 min-w-0 items-center rounded-(--voyana-radius-pill) px-1.5 text-sm font-medium text-(--voyana-color-text-muted)"
                >
                  <span className="truncate">{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
