"use server";

import env from "@/config/env";

export const loginAction = async (formdata: FormData): Promise<void> => {
  const payload = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };
  const url = `${env.api_url}/auth/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  console.log(result);
};
