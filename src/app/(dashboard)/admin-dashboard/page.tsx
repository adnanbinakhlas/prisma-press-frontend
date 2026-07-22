import { UserRole } from "@/constant/userRole";
import { requireRole } from "@/utils/auth";

export default async function AdminDashboardPage() {
  await requireRole(UserRole.ADMIN);
  return (
    <div>
      <h1>Admin Dashboard Page</h1>
    </div>
  );
}
