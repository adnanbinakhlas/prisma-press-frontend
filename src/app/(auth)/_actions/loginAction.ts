"use server";

import env from "@/config/env";
import { tokenConstant } from "@/constant/tokenConstant";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginData = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = ApiResponse<LoginData>;

export const loginAction = async (
  prevState: LoginResponse,
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

  const result = (await response.json()) as LoginResponse;

  if (result.success) {
    const data = result.data;

    const cookieStore = await cookies();
    cookieStore.set(tokenConstant.accessToken, data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1,
      sameSite: "lax",
    });
    cookieStore.set(tokenConstant.refreshToken, data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    const role = data.user.role;

    switch (role) {
      case "ADMIN":
        redirect("/admin-dashboard");
        break;
      case "AUTHOR":
        redirect("/author-dashboard");
        break;
      default:
        redirect("/dashboard");
        break;
    }
  }

  return result;
};
