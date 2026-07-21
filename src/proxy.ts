import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import env from "./config/env";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "./constant/routesConstant";
import { tokenConstant } from "./constant/tokenConstant";
import { UserRole } from "./constant/userRole";
import { verifyToken } from "./utils/jwt";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  let accessToken = request.cookies.get(tokenConstant.accessToken)?.value;
  const decode = accessToken
    ? verifyToken(accessToken as string, env.jwt_access_secret)
    : null;
  const role = decode?.success ? (decode.data as JwtPayload).role : null;

  console.log("DECODE: ERROR: ", decode?.error?.name);
  if (accessToken && decode?.error?.name === "TokenExpiredError") {
    const { name, value } = request.cookies.get(tokenConstant.refreshToken);
    const response = await fetch(`${env.api_url}/auth/refresh-token`, {
      method: "POST",
      headers: {
        Cookie: `${name}=Bearer ${value}`,
      },
    });

    const result = await response.json();
    const cookieStore = await cookies();
    cookieStore.set(tokenConstant.accessToken, result.data.accessToken);
    accessToken = result.data.accessToken;
  }

  // Prevent authenticated users from accessing auth routes
  if (accessToken && decode?.success && AUTH_ROUTES.includes(path)) {
    switch (role) {
      case UserRole.ADMIN:
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
      case UserRole.AUTHOR:
        return NextResponse.redirect(new URL("/author-dashboard", request.url));
      default:
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => path === route || path.startsWith(route + "/"),
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => path === route || path.startsWith(route + "/"),
  );
  // Redirect unauthenticated users to login page from protected routes
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect unauthorized users to not found page from protected routes
  if (path.startsWith("/dashboard") && role !== UserRole.USER) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  } else if (path.startsWith("/admin-dashboard") && role !== UserRole.ADMIN) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  } else if (path.startsWith("/author-dashboard") && role !== UserRole.AUTHOR) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
