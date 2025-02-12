import ProvincePage from "@/pages/dashboard/ProvincePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard")({
  component: () => (
    <div>
      Hello /dashboard!
      <div>
        <ProvincePage />
      </div>
    </div>
  ),
});
