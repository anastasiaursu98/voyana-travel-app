import type { UserManagementItem } from "../../types/userManagement.types";

type UserAvatarProps = {
  user: UserManagementItem;
};

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-(--voyana-radius-pill) bg-(--voyana-color-background-dark) text-xs font-black text-(--voyana-color-white)">
      {user.firstName[0]}
      {user.lastName[0]}
    </span>
  );
}
