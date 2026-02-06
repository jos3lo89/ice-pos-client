import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categorieService } from "../services/categories.service";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCategorie = () => {
  const qryClient = useQueryClient();

  const getAllCategories = (page: number, limit: number, search?: string) => {
    return useQuery({
      queryKey: ["categories", "list", page, limit, search],
      queryFn: () => categorieService.getAllCategories(page, limit, search),
    });
  };

  const createCategorie = useMutation({
    mutationKey: ["create", "categorie"],
    mutationFn: categorieService.createCategorie,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["categories", "list"],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error("Error  create la categoria", {
          description: error.response?.data.message,
        });
      } else {
        toast.error("Error al crear la categoria", {
          description: "error desconcido crea la categoria",
        });
      }
    },
    onMutate: () => {
      toast.loading("Creando categoria...", { id: "create-categorie" });
    },
    onSettled: () => {
      toast.dismiss("create-categorie");
    },
  });

  const changeCategorieState = useMutation({
    mutationKey: ["cahnge", "state", "categorie"],
    mutationFn: categorieService.changeCategorieState,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["categories", "list"],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error("Error al cambiar es estado", {
          description: error.response?.data.message,
        });
      } else {
        toast.error("Error al cambiar es estado", {
          description: "error desconcido al cambiar es estado",
        });
      }
    },
    onMutate: () => {
      toast.loading("Cambiando de estado...", { id: "change-state-categorie" });
    },
    onSettled: () => {
      toast.dismiss("change-state-categorie");
    },
  });

  const listAllCategories = useQuery({
    queryKey: ["categories", "list", "all"],
    queryFn: categorieService.listAllCategories,
  });

  return {
    listCategories: getAllCategories,
    listAllCategories,
    changeState: changeCategorieState,
    createCategorie,
  };
};
