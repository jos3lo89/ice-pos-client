import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useUsers = () => {
  const qryClient = useQueryClient();

  const listUsersQuery = (page: number, limit: number, search?: string) => {
    return useQuery({
      queryKey: ["users", "list", page, limit, search],
      queryFn: () => usersService.getAllUsers(page, limit, search),
    });
  };

  const createUserMutation = useMutation({
    mutationKey: ["create", "user"],
    mutationFn: usersService.createUser,
    onSuccess: (data) => {
      qryClient.invalidateQueries({ queryKey: ["users", "list"] });

      toast.success("¡Usuario creado!", {
        description: `El usuario "${data.full_name}" se creó exitosamente.`,
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error("Error al crear usuario", {
          description: error.response?.data.message,
        });
      } else {
        toast.error("Error al crear usuario", {
          description: "Error desconocido al crear usuario",
        });
      }
    },
    onMutate: () => {
      toast.loading("Creando usuario...", { id: "create-user" });
    },
    onSettled: () => {
      toast.dismiss("create-user");
    },
  });

  const changeUserSate = useMutation({
    mutationKey: ["change", "user", "state"],
    mutationFn: usersService.changeUserState,
    onSuccess: () => {
      qryClient.invalidateQueries({ queryKey: ["users", "list"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error("Error al cambiar el estado", {
          description: error.response?.data.message,
        });
      } else {
        toast.error("Error al cambiar el estado", {
          description: "Error desconcido al cambiar de estado",
        });
      }
    },
    onMutate: () => {
      toast.loading("Cambiando de estado...", { id: "change-user-state" });
    },
    onSettled: () => {
      toast.dismiss("change-user-state");
    },
  });

  return {
    users: listUsersQuery,
    createUser: createUserMutation,
    changeUserSate,
  };
};
