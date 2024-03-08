import { RegisterService } from "@/services/auth/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const res = await RegisterService(req);

  if (res.status) {
    return NextResponse.json(
      {
        status: res.status,
        message: res.message,
      },
      {
        status: res.status_code,
      }
    );
  } else {
    return NextResponse.json(
      {
        status: res.status,
        message: res.message,
      },
      { status: res.status_code }
    );
  }
}
