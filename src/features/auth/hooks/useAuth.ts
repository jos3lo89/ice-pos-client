import { authService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import type { LoginT } from "../schemas/auth.schema";

export const useLogin = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginT) => authService.login(data),
    onMutate: () => {
      toast.loading("Logging in...", { id: "login" });
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success("Login successful", { id: "login" });
    },
    onError: (err) => {
      const message =
        err instanceof AxiosError
          ? err.response?.data.message
          : "Something went wrong";
      toast.error(message, { id: "login" });
    },
  });
};
