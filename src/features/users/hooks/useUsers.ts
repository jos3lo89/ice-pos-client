import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import type { CreateUserT } from "../schemas/user.schema";
import type { ChangeUserStateReq } from "../interfaces/users.interface";

export const useUsersList = (page: number, limit: number, search?: string) => {
  return useQuery({
    queryKey: ["users", "list", { page, limit, search }],
    queryFn: () => usersService.getAllUsers(page, limit, search),
  });
};

export const useCreateUser = () => {
  const qryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create", "user"],
    mutationFn: (data: CreateUserT) => usersService.createUser(data),
    onMutate: () => {
      toast.loading("Creando usuario...", { id: "create-user" });
    },
    onSuccess: (data) => {
      qryClient.invalidateQueries({ queryKey: ["users", "list"] });

      toast.success("¡Usuario creado!", {
        description: `El usuario "${data.full_name}" se creó exitosamente.`,
        id: "create-user",
      });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error desconocido al crear usuario";

      toast.error("Error al crear usuario", {
        description: message,
        id: "create-user",
      });
    },
  });
};

export const useUserChangeState = () => {
  const qryClient = useQueryClient();
  return useMutation({
    mutationKey: ["change", "user", "state"],
    mutationFn: (data: ChangeUserStateReq) =>
      usersService.changeUserState(data),
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
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error desconocido al cambiar el estado";

      toast.error("Error al cambiar el estado", {
        description: message,
        id: "change-user-state",
      });
    },
  });
};
