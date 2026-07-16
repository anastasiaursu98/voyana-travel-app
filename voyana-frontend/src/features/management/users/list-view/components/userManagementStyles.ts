import type { AppBadgeTone } from "../../../../../shared/ui";
import type { UserManagementItem } from "../../types/userManagement.types";

export const accountStatusTones: Record<
  UserManagementItem["accountStatus"],
  AppBadgeTone
> = {
  Active: "success",
  Inactive: "neutral",
  Locked: "danger",
};

export const roleTones: Record<UserManagementItem["role"], AppBadgeTone> = {
  Admin: "dark",
  "Travel agent": "teal",
  User: "neutral",
};
