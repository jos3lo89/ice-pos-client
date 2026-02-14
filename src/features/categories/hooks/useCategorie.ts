import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categorieService } from "../services/categories.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import type { CreateCategorieT } from "../schemas/categorie.schema";
import type { UpdateStateCategoryReq } from "../interfaces/categories.interface";

export const UseCategorieList = (
  page: number,
  limit: number,
  search?: string,
) => {
  return useQuery({
    queryKey: ["categories", "list", { page, limit, search }],
    queryFn: () => categorieService.getAll(page, limit, search),
  });
};

export const useCreateCategorie = () => {
  const qryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create", "categorie"],
    mutationFn: (data: CreateCategorieT) => categorieService.create(data),
    onMutate: () => {
      toast.loading("Creando categoria...", { id: "create-categorie" });
    },
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["categories", "list"],
      });

      toast.success("Categoria creada exitosamente", {
        id: "create-categorie",
      });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al crear la categoria";

      toast.error("Error al crear la categoria", {
        description: message,
        id: "create-categorie",
      });
    },
  });
};

export const useChangeCategorieState = () => {
  const qryClient = useQueryClient();
  return useMutation({
    mutationKey: ["cahnge", "state", "category"],
    mutationFn: (data: UpdateStateCategoryReq) =>
      categorieService.changeState(data),
    onMutate: () => {
      toast.loading("Cambiando de estado...", { id: "change-state-category" });
    },
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["categories", "list"],
      });
      toast.success("Estado cambiado exitosamente", {
        id: "change-state-category",
      });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al cambiar el estado de la categoria";

      toast.error("Error al cambiar el estado de la categoria", {
        description: message,
        id: "change-state-category",
      });
    },
  });
};

export const useCategorieListAll = () => {
  return useQuery({
    queryKey: ["categories", "list", "all"],
    queryFn: () => categorieService.listAll(),
  });
};

export const useCategoriesWithProducts = () => {
  return useQuery({
    queryKey: ["categories", "with-products"],
    queryFn: () => categorieService.getWithProducts(),
  });
};
