import { NextResponse } from "next/server";
export const getUsers = async (url: string) => {
  const res = await fetch(url, {
    cache: "no-store",
    next: {
      tags: ["users"],
    },
  });

  if (!res.ok) {
    return NextResponse.json({
      status: 404,
      message: "Not Found",
      data: []
    });
  }

  return res.json();
};
