import { AppBadge } from "../../../../../shared/ui";
import { ManagementActionMenu } from "../../../shared/ManagementActionMenu";
import type { UserManagementItem } from "../../types/userManagement.types";
import { UserAvatar } from "./UserAvatar";
import {
  accountStatusTones,
  roleTones,
} from "./userManagementStyles";

const tableHeaders = [
  "User",
  "Role",
  "Email",
  "Account",
  "Last login",
  "Joined",
  "",
] as const;

type UsersTableProps = {
  users: UserManagementItem[];
};

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-235 border-collapse text-left">
        <thead>
          <tr className="bg-[rgb(var(--voyana-rgb-background-section)/0.72)]">
            {tableHeaders.map((header) => (
              <th
                key={header || "actions"}
                className="border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] px-4 py-3 text-[0.7rem] font-black uppercase tracking-[0.09em] text-(--voyana-color-text-muted) first:pl-5 last:pr-5"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] transition last:border-b-0 hover:bg-[rgb(var(--voyana-rgb-background-section)/0.58)]"
            >
              <td className="px-4 py-4 pl-5">
                <div className="flex min-w-64 items-center gap-3">
                  <UserAvatar user={user} />
                  <div className="min-w-0">
                    <p className="font-black text-(--voyana-color-text-strong)">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="mt-1 truncate text-xs font-semibold text-(--voyana-color-text-muted)">
                      {user.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <AppBadge tone={roleTones[user.role]}>{user.role}</AppBadge>
              </td>
              <td className="px-4 py-4">
                <span
                  className={`text-sm font-black ${
                    user.emailStatus === "Verified"
                      ? "text-(--voyana-color-success)"
                      : "text-(--voyana-color-warning)"
                  }`}
                >
                  {user.emailStatus}
                </span>
              </td>
              <td className="px-4 py-4">
                <AppBadge tone={accountStatusTones[user.accountStatus]}>
                  {user.accountStatus}
                </AppBadge>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-(--voyana-color-text-body)">
                {user.lastLogin}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-(--voyana-color-text-muted)">
                {user.joinedAt}
              </td>
              <td className="px-4 py-4 pr-5">
                <ManagementActionMenu
                  itemLabel={`${user.firstName} ${user.lastName}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
