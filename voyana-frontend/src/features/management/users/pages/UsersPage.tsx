import { PublicPageShell } from "../../../../shared/components/PublicPageShell";
import { UsersManagementPanel } from "../list-view/components/UsersManagementPanel";
import { UsersPageHeader } from "../list-view/components/UsersPageHeader";
import { mockUsers } from "../data/userManagement.mock";

export function UsersPage() {
  return (
    <PublicPageShell className="bg-(--voyana-color-background-section)!">
      <div className="grid gap-7">
        <UsersPageHeader usersCount={mockUsers.length} />
        <UsersManagementPanel users={mockUsers} />
      </div>
    </PublicPageShell>
  );
}
