import LoginPage from "@/pages/auth/LoginPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  component: () => <LoginPage />,
});
