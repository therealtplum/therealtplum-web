import { NextRequest, NextResponse } from "next/server";
import { getTrip, initializeDemoData } from "@/lib/db-adapter";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Check traveler session cookie
    const token = request.cookies.get("tripSession")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = verifyToken(token);
    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    // Initialize trip data if it doesn't exist
    await initializeDemoData();

    // Load the trip for this session
    const trip = await getTrip(session.tripId);
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json({
      trip,
      session: {
        tripId: session.tripId,
        travelerId: session.travelerId,
        role: session.role,
      },
    });
  } catch (error) {
    console.error("Get trip error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

