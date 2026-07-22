import { UserRole } from "@/constant/userRole";
import { requireRole } from "@/utils/auth";

export default async function AuthorDashboardPage() {
  await requireRole(UserRole.AUTHOR);
  return (
    <div>
      <h1>Author Dashboard Page</h1>
    </div>
  );
}
