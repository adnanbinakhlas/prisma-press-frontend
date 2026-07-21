import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_ROUTES, PUBLIC_ROUTES } from "./constant/routesConstant";
import { tokenConstant } from "./constant/tokenConstant";
import { UserRole } from "./constant/userRole";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get(tokenConstant.accessToken)?.value;
  const decode = accessToken ? (jwt.decode(accessToken) as JwtPayload) : null;
  const role = decode?.role || null;

  // Prevent authenticated users from accessing auth routes
  if (accessToken && AUTH_ROUTES.includes(path)) {
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
