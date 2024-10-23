import { Button } from "@/components/ui/button";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad(ctx) {
    if (!ctx.context.auth.isAuthenticated) {
      throw redirect({
        to: "/sign-in",
      });
    }
  },
  component: () => (
    <div>
      Hello /dashboard!
      <div>
        <Button>Sign Out</Button>
      </div>
    </div>
  ),
});
