import type {
  ChangeUserStateReq,
  CreateUserT,
} from "@/core/entities/employe.entity";
import { employeApi } from "@/infrastructure/api/employe.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

export const useUsersList = (page: number, limit: number, search?: string) => {
  return useQuery({
    queryKey: ["users", "list", { page, limit, search }],
    queryFn: () => employeApi.getAllUsers(page, limit, search),
  });
};

export const useCreateUser = () => {
  const qryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create", "user"],
    mutationFn: (data: CreateUserT) => employeApi.createUser(data),
    onMutate: () => {
      toast.loading("Creando usuario...", { id: "create-user" });
    },
    onSuccess: (data) => {
      qryClient.invalidateQueries({ queryKey: ["users", "list"] });

      toast.success("¡Usuario creado!", {
        description: `El usuario "${data.nombre_completo}" se creó exitosamente.`,
        id: "create-user",
      });
    },
    onError: (error) => {
      toast.error("Error al crear usuario", {
        description: getErrorMessage(
          error,
          "Error desconocido al crear usuario",
        ),
        id: "create-user",
      });
    },
  });
};

export const useUserChangeState = () => {
  const qryClient = useQueryClient();
  return useMutation({
    mutationKey: ["change", "user", "state"],
    mutationFn: (data: ChangeUserStateReq) => employeApi.changeUserState(data),
    onMutate: () => {
      toast.loading("Cambiando de estado...", { id: "change-user-state" });
    },
    onSuccess: () => {
      qryClient.invalidateQueries({ queryKey: ["users", "list"] });
      toast.success("Estado cambiado exitosamente", {
        id: "change-user-state",
      });
    },
    onError: (error) => {
      toast.error("Error al cambiar el estado", {
        description: getErrorMessage(
          error,
          "Error desconocido al cambiar el estado",
        ),
        id: "change-user-state",
      });
    },
  });
};

// get profile
export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => employeApi.getProfile(),
  });
};

// get cashier users

export const useCashierUsers = () => {
  return useQuery({
    queryKey: ["cashier", "users"],
    queryFn: () => employeApi.getCashierUsers(),
  });
};
