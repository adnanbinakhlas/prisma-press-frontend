import { UserRole } from "@/constant/userRole";
import { requireRole } from "@/utils/auth";

export default async function UserDashboardPage() {
  await requireRole(UserRole.USER);
  return (
    <div>
      <h1>User Dashboard Page</h1>
    </div>
  );
}
