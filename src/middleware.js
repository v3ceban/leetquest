import { auth } from "@/lib/auth";

export default auth((req) => {
  if (!req.auth && !["/", "/login"].includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login|img/*|quest).*)",
  ],
};
