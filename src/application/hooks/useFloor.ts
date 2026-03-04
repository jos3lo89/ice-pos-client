import type { CreateFloorI } from "@/core/entities/floors.entity";
import { floorApi } from "@/infrastructure/api/floor.api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";

// listar todos los pisos con paginacion
export const useFloors = (page: number, limit: number, search?: string) => {
  return useQuery({
    queryKey: ["floors", { page, limit, search }],
    queryFn: () => floorApi.getAllPaginated(page, limit, search),
    placeholderData: keepPreviousData,
  });
};

// listar todos los pisos
export const useAllFloors = () => {
  return useQuery({
    queryKey: ["floors", "all"],
    queryFn: () => floorApi.getAll(),
  });
};

// crear piso
export const useCreateFloor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create", "floor"],
    mutationFn: (data: CreateFloorI) => floorApi.create(data),
    onMutate: () => {
      toast.loading("Creando piso...", { id: "create-floor" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["floors"] });
      toast.success("Piso creado correctamente", { id: "create-floor" });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Error al crear el piso"), { id: "create-floor" });
    },
  });
};

// listar pisos con mesas
export const useFloorsWithTables = () => {
  return useQuery({
    queryKey: ["floors", "with-tables"],
    queryFn: () => floorApi.getAllWithTables(),
  });
};
