import { NextRequest, NextResponse } from "next/server";
import { getTrip, initializeDemoData } from "@/lib/db-adapter";
import { auth0 } from "@/lib/auth0";

// Default trip ID - can be expanded to user-trip mapping later
const DEFAULT_TRIP_ID = "japan2026";

export async function GET(request: NextRequest) {
  try {
    // Check Auth0 session
    const session = await auth0.getSession(request);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Initialize trip data if it doesn't exist
    await initializeDemoData();

    // For now, load the default trip
    // TODO: Could expand to look up user's trips by email
    const trip = await getTrip(DEFAULT_TRIP_ID);
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json({
      trip,
      session: {
        tripId: DEFAULT_TRIP_ID,
        travelerId: session.user.email || session.user.sub,
        role: "admin" as const,
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

