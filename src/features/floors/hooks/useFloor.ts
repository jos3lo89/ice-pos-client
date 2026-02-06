import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { floorService } from "../services/floor.service";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useFloor = () => {
  const queryClient = useQueryClient();
  // crear piso
  const createFloor = useMutation({
    mutationKey: ["create", "floor"],
    mutationFn: floorService.createFloor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get", "floors"] });
      queryClient.invalidateQueries({ queryKey: ["get", "all", "floors"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error al crear el piso");
      }
    },
    onMutate: () => {
      toast.loading("Creando piso...", { id: "create-floor" });
    },
    onSettled: () => {
      toast.dismiss("create-floor");
    },
  });

  // obtener pisos
  const getFloors = (page: number, limit: number, search?: string) => {
    return useQuery({
      queryKey: ["get", "floors", page, limit, search],
      queryFn: () => floorService.getFloors(page, limit, search),
    });
  };

  // obtener todos los pisos
  const getAllFloors = useQuery({
    queryKey: ["get", "all", "floors"],
    queryFn: () => floorService.getAllFloors(),
  });

  return {
    createFloor,
    getFloors,
    getAllFloors,
  };
};
