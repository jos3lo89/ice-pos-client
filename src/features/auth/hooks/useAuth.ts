import { authService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { LoginT } from "../schemas/auth.schema";
import { roleBasedRedirection } from "@/utils/role-based-redirection";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/get-error-message";

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginT) => authService.login(data),
    onMutate: () => {
      toast.loading("Iniciando sesión...", { id: "login" });
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success("Inicio de sesión exitoso", { id: "login" });
      const redirectPath = roleBasedRedirection(data.rol);
      navigate(redirectPath, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      toast.error(getErrorMessage(err, "Ocurrió un error al iniciar sesión"), {
        id: "login",
      });
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onMutate: () => {
      toast.loading("Cerrando sesión...", { id: "logout" });
    },
    onSuccess: () => {
      logout();
      toast.success("Sesión cerrada exitosamente", { id: "logout" });
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(getErrorMessage(err, "Ocurrió un error al cerrar sesión"), {
        id: "logout",
      });
    },
  });
};
