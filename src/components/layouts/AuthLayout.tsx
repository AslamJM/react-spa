import { Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function AuthLayout() {
  const router = useRouter();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const logoutHandler = () => {
    logout();
    router.invalidate().finally(() => {
      navigate({ to: "/" });
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>Nav Bar Heare</div>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
