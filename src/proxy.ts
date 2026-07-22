import { NextRequest, NextResponse } from "next/server";

import env from "./config/env";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "./constant/routesConstant";
import { tokenConstant } from "./constant/tokenConstant";
import { verifyToken } from "./utils/jwt";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let accessToken =
    request.cookies.get(tokenConstant.accessToken)?.value ?? null;

  let isAuthenticated = false;

  if (accessToken) {
    let decoded = verifyToken(accessToken, env.jwt_access_secret);

    if (decoded?.error?.name === "TokenExpiredError") {
      const refreshToken = request.cookies.get(
        tokenConstant.refreshToken,
      )?.value;

      if (refreshToken) {
        try {
          const refreshResponse = await fetch(
            `${env.api_url}/auth/refresh-token`,
            {
              method: "POST",
              headers: {
                Cookie: `${tokenConstant.refreshToken}=Bearer ${refreshToken}`,
              },
            },
          );

          if (refreshResponse.ok) {
            const result = await refreshResponse.json();

            accessToken = result?.data?.accessToken;

            decoded = verifyToken(accessToken as string, env.jwt_access_secret);
          }
        } catch {
          accessToken = null;
        }
      }
    }

    isAuthenticated = !!decoded?.success;
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // Redirect authenticated users away from auth routes
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users
  if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.next();

  if (accessToken) {
    response.cookies.set(tokenConstant.accessToken, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
