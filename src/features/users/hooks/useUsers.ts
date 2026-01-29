import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useUsers = () => {
  const qryClient = useQueryClient();

  const listUsersQuery = useQuery({
    queryFn: usersService.getAllUsers,
    queryKey: ["users", "list"],
  });

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

  return {
    users: listUsersQuery,
    createUser: createUserMutation,
  };
};
