"use server";

import env from "@/config/env";
import { tokenConstant } from "@/constant/tokenConstant";
import { cookies } from "next/headers";

type TLoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
};

export const loginAction = async (
  prevState: TLoginState,
  formData: FormData,
) => {
  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const url = `${env.api_url}/auth/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set(
      tokenConstant.accessToken,
      result.data[tokenConstant.accessToken],
      { httpOnly: true, maxAge: 60 * 60 * 24 * 1, sameSite: "lax" },
    );
    cookieStore.set(
      tokenConstant.refreshToken,
      result.data[tokenConstant.refreshToken],
      { httpOnly: true, maxAge: 60 * 60 * 24 * 7, sameSite: "lax" },
    );
  }

  return result;
};
