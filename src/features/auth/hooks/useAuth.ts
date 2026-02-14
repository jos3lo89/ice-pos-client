import { authService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import type { LoginT } from "../schemas/auth.schema";
import { roleBasedRedirection } from "@/utils/role-based-redirection";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginT) => authService.login(data),
    onMutate: () => {
      toast.loading("Iniciando sesión...", { id: "login" });
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success("Inicio de sesión exitoso", { id: "login" });
      const redirectPath = roleBasedRedirection(data.role);
      navigate(redirectPath, { replace: true });
    },
    onError: (err) => {
      const message =
        err instanceof AxiosError
          ? err.response?.data.message
          : "Ocurrió un error al iniciar sesión";
      toast.error(message, { id: "login" });
    },
  });
};
