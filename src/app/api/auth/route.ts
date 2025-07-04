import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const isAuthenticated = authenticateUser(email, password);

  if (isAuthenticated) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("session", "active", {
      httpOnly: true,
      path: "/",
    });
    return response;
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
