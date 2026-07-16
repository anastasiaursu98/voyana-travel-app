import { AppButton } from "../../../../../shared/ui";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link as RouterLink, type To } from "react-router-dom";

type VacationPackageDetailsTopBarProps = {
  backLabel: string;
  backTo: To;
  className?: string;
  currentLabel: string;
  moreActionsLabel?: string;
  onMoreActionsClick?: () => void;
  onShareClick?: () => void;
  shareLabel?: string;
  showMoreActions?: boolean;
  showShareAction?: boolean;
};

const actionButtonClassName =
  "grid size-8 place-items-center rounded-(--voyana-radius-pill) text-(--voyana-color-text-primary) transition hover:bg-(--voyana-color-background-card) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.18)]";

export function VacationPackageDetailsTopBar({
  backLabel,
  backTo,
  className = "",
  currentLabel,
  moreActionsLabel = "More vacation package actions",
  onMoreActionsClick,
  onShareClick,
  shareLabel = "Share vacation package",
  showMoreActions = true,
  showShareAction = true,
}: VacationPackageDetailsTopBarProps) {
  return (
    <div
      className={`mb-5 flex h-8 min-w-0 items-center gap-2 text-xs font-medium text-(--voyana-color-text-muted) ${className}`}
    >
      <RouterLink
        to={backTo}
        className="inline-flex shrink-0 items-center gap-1.5 text-(--voyana-color-text-muted) no-underline transition hover:text-(--voyana-color-text-primary) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.18)]"
      >
        <ArrowBackRoundedIcon sx={{ fontSize: 16 }} />
        {backLabel}
      </RouterLink>
      <span className="text-[rgb(var(--voyana-rgb-text-muted)/0.45)]">-</span>
      <span className="min-w-0 truncate font-semibold text-(--voyana-color-text-primary)">
        {currentLabel}
      </span>
      <div className="ml-auto flex shrink-0 items-center gap-2">
        {showShareAction ? (
          <AppButton intent="control"
            type="button"
            className={actionButtonClassName}
            aria-label={shareLabel}
            icon={<ShareOutlinedIcon fontSize="small" />}
            onClick={onShareClick}
          />
        ) : null}
        {showMoreActions ? (
          <AppButton intent="control"
            type="button"
            className={actionButtonClassName}
            aria-label={moreActionsLabel}
            icon={<MoreHorizRoundedIcon fontSize="small" />}
            onClick={onMoreActionsClick}
          />
        ) : null}
      </div>
    </div>
  );
}
