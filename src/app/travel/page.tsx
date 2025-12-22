import { redirect } from "next/navigation";

export default function TravelPage() {
  // For now, redirect to login - later this will be the landing page
  redirect("/travel/login");
}

