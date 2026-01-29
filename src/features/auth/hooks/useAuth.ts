import { authService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useAuth = () => {
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else {
        console.error(err);
      }
    },
  });
};
