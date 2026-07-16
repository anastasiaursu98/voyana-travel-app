import { AppButton } from "../../../shared/ui";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Menu, MenuItem } from "@mui/material";
import { useState, type MouseEvent } from "react";

type ManagementActionMenuProps = {
  itemLabel: string;
};

export function ManagementActionMenu({
  itemLabel,
}: ManagementActionMenuProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorElement);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <div className="ml-auto w-fit">
      <AppButton intent="control"
        type="button"
        onClick={handleOpen}
        aria-label={`Open actions for ${itemLabel}`}
        aria-expanded={isOpen ? "true" : undefined}
        aria-haspopup="menu"
        icon={<MoreHorizRoundedIcon fontSize="small" />}
        className="grid h-10 w-10 place-items-center rounded-(--voyana-radius-card) text-(--voyana-color-text-muted) transition hover:bg-(--voyana-color-background-section) hover:text-(--voyana-color-text-strong) focus:outline-none focus:ring-4 focus:ring-[rgb(var(--voyana-rgb-accent-teal)/0.14)]"
      />

      <Menu
        anchorEl={anchorElement}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        slotProps={{
          paper: {
            sx: {
              border: "1px solid rgb(var(--voyana-rgb-border-subtle) / 0.95)",
              borderRadius: "var(--voyana-radius-panel)",
              boxShadow:
                "0 18px 45px rgb(var(--voyana-rgb-background-dark) / 0.16)",
              mt: 0.75,
              p: 0.75,
              width: 176,
            },
          },
          list: { sx: { p: 0 } },
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            borderRadius: "var(--voyana-radius-control)",
            fontSize: 14,
            fontWeight: 800,
            gap: 1.25,
            minHeight: 40,
          }}
        >
          <VisibilityOutlinedIcon className="text-[1.1rem] text-(--voyana-color-accent-teal-strong)" />
          View more
        </MenuItem>
        <div className="my-1 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.8)]" />
        <MenuItem
          onClick={handleClose}
          sx={{
            borderRadius: "var(--voyana-radius-control)",
            color: "var(--voyana-color-danger)",
            fontSize: 14,
            fontWeight: 800,
            gap: 1.25,
            minHeight: 40,
            "&:hover": { backgroundColor: "var(--voyana-color-danger-surface)" },
          }}
        >
          <DeleteOutlineRoundedIcon className="text-[1.1rem]" />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
