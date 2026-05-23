import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pathName = request.nextUrl.pathname;

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathName);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/addIdea", "/ideas/:path", "/myIdeas", "/myInteractions"],
};
