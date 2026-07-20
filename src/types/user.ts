export type UserRole = "USER" | "AUTHOR" | "ADMIN";

export type ActiveStatus = "ACTIVE" | "BLOCKED";

export type User = {
  id: string;
  name: string;
  email: string;
  activeStatus: ActiveStatus;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};
