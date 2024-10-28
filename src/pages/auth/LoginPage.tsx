import { LoadingButton } from "@/components/ui/loading-button";
import { loginSchema, LoginSchemaType } from "@/schemas/auth";
import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { FALLBACK_ROUTE } from "@/constants/names";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const LoginPage = () => {
  const { login, state } = useAuth();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const search = useSearch({ from: "/sign-in" });
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      if (data) {
        await login(data.user, data.access_token);
        await router.invalidate();
        await navigate({ to: search.redirect || FALLBACK_ROUTE });
      }
    },
  });

  const handleLogin = async (values: LoginSchemaType) => {
    mutate({
      useranme: values.username,
      password: values.password,
    });
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      router.invalidate();
      navigate({ to: search.redirect || FALLBACK_ROUTE });
    }
  }, [navigate, router, search.redirect, state.isAuthenticated]);

  return (
    <div className="space-y-4">
      <div className="max-w-[500px]">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={isPending}>
              Sign In
            </LoadingButton>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
