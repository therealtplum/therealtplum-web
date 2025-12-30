import { redirect } from "next/navigation";

export default function TravelPage() {
  // Auth is handled by middleware - redirect authenticated users to trip view
  redirect("/travel/trip");
}


