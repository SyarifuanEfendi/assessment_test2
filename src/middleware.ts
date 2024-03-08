import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middleware/withAuth";

export function mainmiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainmiddleware, ['/users'])