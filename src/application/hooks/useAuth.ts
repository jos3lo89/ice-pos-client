import { authApi } from "@/infrastructure/api/auth.api";
import { useAuthStore } from "@/application/stores/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { roleBasedRedirection } from "@/utils/role-based-redirection";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/get-error-message";
import type { LoginRequest } from "@/core/entities/auth.entity";

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginRequest) => authApi.login(data),
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
    mutationFn: () => authApi.logout(),
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
