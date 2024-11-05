import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

async function authMiddleware(
  req: NextRequest
): Promise<NextResponse<unknown>> {
  const session = await getToken({ req, secret: process.env.AUTH_SECRET });
  const url = req.nextUrl.clone();

  if (!session) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export { authMiddleware };
