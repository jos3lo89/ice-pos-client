import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { floorService } from "../services/floor.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import type { CreateFloorT } from "../schemas/floor.schema";

// listar todos los pisos con paginacion
export const useFloors = (page: number, limit: number, search?: string) => {
  return useQuery({
    queryKey: ["floors", { page, limit, search }],
    queryFn: () => floorService.getAllPaginated(page, limit, search),
    placeholderData: keepPreviousData,
  });
};

// listar todos los pisos
export const useAllFloors = () => {
  return useQuery({
    queryKey: ["floors", "all"],
    queryFn: () => floorService.getAll(),
  });
};

// crear piso
export const useCreateFloor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create", "floor"],
    mutationFn: (data: CreateFloorT) => floorService.create(data),
    onMutate: () => {
      toast.loading("Creando piso...", { id: "create-floor" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["floors"] });
      toast.success("Piso creado correctamente", { id: "create-floor" });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al crear el piso";
      toast.error(message, { id: "create-floor" });
    },
  });
};
