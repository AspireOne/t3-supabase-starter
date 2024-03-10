import { type CookieOptions, createServerClient, serialize } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";

export function createClient(req: NextRequest, res: NextResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          console.log("cookie options: ", options);
          res.cookies.set({ name: name, value: value, ...options });
          // res.appendHeader("Set-Cookie", serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.delete(name);
          // res.appendHeader("Set-Cookie", serialize(name, "", options));
        },
      },
    },
  );

  return supabase;
}
