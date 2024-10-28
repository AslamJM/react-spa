import { AuthProvider } from "@/store/AuthContext";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AllProvidersProps {
  children: ReactNode;
}

const client = new QueryClient();

const AllProviders: FC<AllProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default AllProviders;
