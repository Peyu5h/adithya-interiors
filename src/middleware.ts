import { NextResponse, type NextRequest } from "next/server";
// import { auth } from "~/lib/auth";

export default async function authMiddleware(request: NextRequest) {
  // Skip middleware for API routes completely
  // if (request.nextUrl.pathname.startsWith("/api/")) {
  if (request.nextUrl.pathname.startsWith("/")) {
    return NextResponse.next();
  }

  // // Public paths that don't require authentication
  // const publicPaths = ["/sign-in", "/sign-up"];
  // const isPublicPath = publicPaths.some((path) =>
  //   request.nextUrl.pathname.startsWith(path),
  // );

  // // Skip middleware for public paths
  // if (isPublicPath) {
  //   return NextResponse.next();
  // }

  // try {
  //   // Check if user is authenticated
  //   const session = await auth.api.getSession({
  //     headers: request.headers,
  //   });

  //   // Redirect to sign-in if not authenticated
  //   if (!session) {
  //     const signInUrl = new URL("/sign-in", request.url);
  //     // Add the return URL as a query parameter
  //     signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  //     return NextResponse.redirect(signInUrl);
  //   }

  //   return NextResponse.next();
  // } catch (error) {
  //   console.error("Auth middleware error:", error);

  //   // In case of error, allow the request to proceed
  //   return NextResponse.next();
  // }
}

export const config = {
  matcher: [
    // Match all paths except static files and favicon
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
