import { redirect } from "next/navigation";

export default function LoginPage() {
  // Redirect to Auth0 login - middleware handles auth protection
  redirect("/auth/login?returnTo=/travel/trip");
}

