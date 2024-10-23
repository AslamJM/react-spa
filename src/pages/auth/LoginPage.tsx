import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();

  const user = {
    id: 33,
    username: "Fakerrr",
    role: "Jaskj",
  };

  const token = "fry";

  return (
    <div>
      <Button onClick={() => login(user, token)}>Login</Button>
    </div>
  );
};

export default LoginPage;
