import { useMutation, useQuery } from "@tanstack/react-query";
import { categorieService } from "../services/categories.service";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCategorie = () => {
  const getAllCategories = useQuery({
    queryKey: ["categories", "list"],
    queryFn: categorieService.getAllCategories,
  });

  const createCategorie = useMutation({
    mutationKey: ["create", "categorie"],
    mutationFn: categorieService.createCategorie,
    onSuccess: () => {
      console.log("exito crear la categoria");
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
      console.log("exito al cambiar el estado de la categoria");
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

  return {
    listCategories: getAllCategories,
    changeState: changeCategorieState,
    createCategorie,
  };
};
