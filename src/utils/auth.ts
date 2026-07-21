import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import env from "@/config/env";
import { tokenConstant } from "@/constant/tokenConstant";
import { verifyToken } from "@/utils/jwt";
import { UserRole } from "@/types/user";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(tokenConstant.accessToken)?.value;

  if (!accessToken) {
    return null;
  }

  const decoded = verifyToken(accessToken, env.jwt_access_secret);

  if (!decoded?.success) {
    return null;
  }

  return decoded.data as JwtPayload;
}

export async function requireRole(role: UserRole) {
  const user = await getCurrentUser();

  if (!user || user.role !== role) {
    notFound();
  }

  return user;
}
