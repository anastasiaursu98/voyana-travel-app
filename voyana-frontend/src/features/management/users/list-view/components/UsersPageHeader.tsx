import { AppBadge } from "../../../../../shared/ui";
import { ManagementPageHeader } from "../../../shared/ManagementPageHeader";

type UsersPageHeaderProps = {
  usersCount: number;
};

export function UsersPageHeader({ usersCount }: UsersPageHeaderProps) {
  return (
    <ManagementPageHeader
      eyebrow="Account management"
      title="Users"
      description="A visual overview of Voyana accounts, roles, verification, and account states. All records on this page are mock data."
      actions={<AppBadge tone="teal" size="md">{usersCount} users</AppBadge>}
    />
  );
}
