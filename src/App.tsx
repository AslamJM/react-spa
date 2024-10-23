import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { useAuth } from "./store/AuthContext";

function App() {
  const { state } = useAuth();
  return <RouterProvider router={router} context={{ auth: state }} />;
}

export default App;
