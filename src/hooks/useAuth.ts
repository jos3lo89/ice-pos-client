import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAuth = () => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log("login ok -> ", data);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        console.log("login error");
      } else {
        console.log("login any error");
      }
    },
  });
};
