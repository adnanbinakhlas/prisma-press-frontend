"use server";

import env from "@/config/env";

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
  return result;
};
