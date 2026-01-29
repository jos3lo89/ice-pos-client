import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useAuth = () => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log("login ok -> ", data);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else {
        console.error("login any error");
      }
    },
  });
};
