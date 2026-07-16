import { AppBadge, AppSurface, AppTypography } from "../../../../../shared/ui";
import { ManagementActionMenu } from "../../../shared/ManagementActionMenu";
import type { UserManagementItem } from "../../types/userManagement.types";
import { UserAvatar } from "./UserAvatar";
import {
  accountStatusTones,
  roleTones,
} from "./userManagementStyles";

type UsersMobileCardsProps = {
  users: UserManagementItem[];
};

export function UsersMobileCards({ users }: UsersMobileCardsProps) {
  return (
    <div className="grid gap-3 p-4 md:hidden">
      {users.map((user) => (
        <AppSurface
          as="article"
          key={user.id}
          variant="plain"
          className="p-4"
        >
          <div className="flex items-start gap-3">
            <UserAvatar user={user} />
            <div className="min-w-0 flex-1">
              <AppTypography
                variant="cardTitle"
                className="font-black text-(--voyana-color-text-strong)"
              >
                {user.firstName} {user.lastName}
              </AppTypography>
              <p className="mt-1 truncate text-xs font-semibold text-(--voyana-color-text-muted)">
                {user.email}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <AppBadge tone={roleTones[user.role]}>{user.role}</AppBadge>
                <AppBadge tone={accountStatusTones[user.accountStatus]}>
                  {user.accountStatus}
                </AppBadge>
              </div>
            </div>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.8)] pt-4">
            <div>
              <dt className="text-xs font-bold text-(--voyana-color-text-muted)">
                Email status
              </dt>
              <dd className="mt-1 text-sm font-black text-(--voyana-color-text-strong)">
                {user.emailStatus}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold text-(--voyana-color-text-muted)">
                Last login
              </dt>
              <dd className="mt-1 text-sm font-black text-(--voyana-color-text-strong)">
                {user.lastLogin}
              </dd>
            </div>
          </dl>
          <div className="mt-4 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.8)] pt-3">
            <ManagementActionMenu
              itemLabel={`${user.firstName} ${user.lastName}`}
            />
          </div>
        </AppSurface>
      ))}
    </div>
  );
}
