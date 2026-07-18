"use server";

import { tokenConstant } from "@/constant/tokenConstant";
import { cookies } from "next/headers";

export const logoutService = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(tokenConstant.accessToken);
  cookieStore.delete(tokenConstant.refreshToken);
};
