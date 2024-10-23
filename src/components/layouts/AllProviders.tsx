import { AuthProvider } from "@/store/AuthContext";
import { FC, ReactNode } from "react";

interface AllProvidersProps {
  children: ReactNode;
}

const AllProviders: FC<AllProvidersProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AllProviders;
