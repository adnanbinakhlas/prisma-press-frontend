"use server";

import env from "@/config/env";
import { tokenConstant } from "@/constant/tokenConstant";
import { cookies } from "next/headers";

export const getMyProfile = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(tokenConstant.accessToken);

  if (!accessToken) {
    return { success: false, message: "User not logged in." };
  }

  const { name, value } = accessToken;

  const response = await fetch(`${env.api_url}/users/me`, {
    headers: {
      Cookie: `${name}=Bearer ${value}`,
    },
  });

  const result = await response.json();
  return result;
};
