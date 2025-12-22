import { NextRequest, NextResponse } from "next/server";
import { verifyTraveler, initializeDemoData } from "@/lib/db-adapter";
import { createToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Initialize demo data on first request
    await initializeDemoData();

    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    const { tripId, travelerId, password } = body;

    if (!tripId || !travelerId || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await verifyTraveler(tripId, travelerId, password);

    if (!result.valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = createToken({
      tripId,
      travelerId,
      role: result.role || "traveler",
    });

    const response = NextResponse.json({
      success: true,
      tripId,
      travelerId,
      role: result.role,
    });

    // Set secure httpOnly cookie
    response.cookies.set("tripSession", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

