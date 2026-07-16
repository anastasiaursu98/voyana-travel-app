import { ManagementPanel } from "../../../shared/ManagementPanel";
import type { UserManagementItem } from "../../types/userManagement.types";
import { UsersMobileCards } from "./UsersMobileCards";
import { UsersTable } from "./UsersTable";
import { UsersToolbar } from "./UsersToolbar";

type UsersManagementPanelProps = {
  users: UserManagementItem[];
};

export function UsersManagementPanel({ users }: UsersManagementPanelProps) {
  return (
    <ManagementPanel
      footerStart={`Showing 1-${users.length} of ${users.length}`}
      footerEnd="Mock records"
    >
      <UsersToolbar />
      <UsersTable users={users} />
      <UsersMobileCards users={users} />
    </ManagementPanel>
  );
}
