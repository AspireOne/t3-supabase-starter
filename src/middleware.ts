import { onlyUnprotectedRoutes, protectedRoutes, routes } from "@/utils/routes";
import { createClient } from "@/utils/supabase/middleware";
import type { NextURL } from "next/dist/server/web/next-url";
import { NextFetchEvent, type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const res = NextResponse.next();
  const supabase = createClient(req, res);

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    // biome-ignore format: off.
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return redirectUserTo(req.nextUrl, routes.signIn);
    }
  }

  if (onlyUnprotectedRoutes.includes(req.nextUrl.pathname)) {
    // biome-ignore format: off.
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      return redirectUserTo(req.nextUrl, routes.app);
    }
  }

  return res;
}

function redirectUserTo(
  currentUrl: NextURL,
  pathname: string,
  redirectedFrom?: string,
): NextResponse {
  const redirectUrl = currentUrl.clone();
  redirectUrl.pathname = pathname;
  if (redirectedFrom) {
    redirectUrl.searchParams.set("redirectedFrom", redirectedFrom);
  }
  return NextResponse.redirect(redirectUrl);
}

// The paths need to be manually edited if any of them changes. Variables cannot ba passed.
// That is a limitation of NextJS.
export const config = {};
