import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Basic-auth gate for /admin.
 *
 * Credentials MUST be supplied via env vars (ADMIN_USERNAME / ADMIN_PASSWORD).
 * If they're missing in production we fail closed to avoid leaving the admin
 * panel reachable with a hard-coded default. In development a single fallback
 * pair is allowed so local work doesn't require .env.local on day one.
 */
export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const envUser = process.env.ADMIN_USERNAME;
  const envPass = process.env.ADMIN_PASSWORD;
  const isDev = process.env.NODE_ENV !== "production";
  const validUser = envUser ?? (isDev ? "admin" : undefined);
  const validPass = envPass ?? (isDev ? "admin" : undefined);

  if (!validUser || !validPass) {
    return new NextResponse(
      "Admin credentials not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD environment variables.",
      { status: 503 },
    );
  }

  const basicAuth = request.headers.get("authorization");
  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    try {
      const [user, pwd] = atob(authValue).split(":");
      if (user === validUser && pwd === validPass) {
        return NextResponse.next();
      }
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Owlighting Admin"',
    },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
