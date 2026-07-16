export type UserManagementItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "Admin" | "Travel agent" | "User";
  emailStatus: "Verified" | "Unverified";
  accountStatus: "Active" | "Inactive" | "Locked";
  lastLogin: string;
  joinedAt: string;
};
