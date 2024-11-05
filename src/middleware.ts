import type { NextRequest } from "next/server";
import { authMiddleware } from "../middleware/authMiddleware";

export async function middleware(req: NextRequest) {
  return authMiddleware(req);
}

export const config = {
  matcher: ["/panel/:path*"],
};
