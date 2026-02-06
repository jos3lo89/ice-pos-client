import { useMutation, useQuery } from "@tanstack/react-query";
import { productService } from "../services/product.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useProduct = () => {
  const queryClient = useQueryClient();

  const getAllProducts = (
    page: number = 1,
    limit: number = 5,
    search?: string,
    category?: string,
  ) => {
    return useQuery({
      queryKey: ["list", "products", page, limit, search, category],
      queryFn: () =>
        productService.getAllProducts(page, limit, search, category),
    });
  };

  const createProduct = useMutation({
    mutationKey: ["create", "product"],
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", "products"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error al crear el producto");
      }
    },
    onMutate: () => {
      toast.loading("Creando producto...", { id: "create-product" });
    },
    onSettled: () => {
      toast.dismiss("create-product");
    },
  });

  const updateStatusProduct = useMutation({
    mutationKey: ["update", "product", "status"],
    mutationFn: productService.updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", "products"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error al actualizar el estado del producto");
      }
    },
    onMutate: () => {
      toast.loading("Actualizando estado del producto...", {
        id: "update-product-status",
      });
    },
    onSettled: () => {
      toast.dismiss("update-product-status");
    },
  });

  const createVariant = useMutation({
    mutationKey: ["create", "variant"],
    mutationFn: productService.createVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", "products"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error al crear la variante");
      }
    },
    onMutate: () => {
      toast.loading("Creando variante...", { id: "create-variant" });
    },
    onSettled: () => {
      toast.dismiss("create-variant");
    },
  });

  const createModifier = useMutation({
    mutationKey: ["create", "modifier"],
    mutationFn: productService.createModifier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", "products"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Error al crear el modificador");
      }
    },
    onMutate: () => {
      toast.loading("Creando modificador...", { id: "create-modifier" });
    },
    onSettled: () => {
      toast.dismiss("create-modifier");
    },
  });

  return {
    getAllProducts,
    createProduct,
    updateStatusProduct,
    createVariant,
    createModifier,
  };
};
