import { useMutation, useQuery } from "@tanstack/react-query";
import { productService } from "../services/product.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import type {
  CreateModifierT,
  CreateProductT,
  CreateVariantT,
} from "../schemas/product.schema";

export const useProductList = (
  page: number,
  limit: number,
  search?: string,
  category?: string,
) => {
  return useQuery({
    queryKey: ["list", "products", { page, limit, search, category }],
    queryFn: () => productService.getAllProducts(page, limit, search, category),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create", "product"],
    mutationFn: (product: CreateProductT) =>
      productService.createProduct(product),
    onMutate: () => {
      toast.loading("Creando producto...", { id: "create-product" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", "products"] });
      toast.success("Producto creado exitosamente", { id: "create-product" });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al crear el producto";
      toast.error(message, { id: "create-product" });
    },
  });
};

export const useUpdateStattusProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update", "product", "status"],
    mutationFn: (dto: {
      productId: string;
      values: { is_available: boolean };
    }) => productService.updateStatus(dto),
    onMutate: () => {
      toast.loading("Actualizando estado del producto...", {
        id: "update-product-status",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", "products"] });
      toast.success("Estado del producto actualizado exitosamente", {
        id: "update-product-status",
      });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al actualizar el estado del producto";
      toast.error(message, { id: "update-product-status" });
    },
  });
};

export const useCreateVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create", "variant"],
    mutationFn: (data: CreateVariantT) => productService.createVariant(data),
    onMutate: () => {
      toast.loading("Creando variante...", { id: "create-variant" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", "products"] });
      toast.success("Variante creada exitosamente", { id: "create-variant" });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al crear la variante";
      toast.error(message, { id: "create-variant" });
    },
  });
};

export const useCreateModifier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create", "modifier"],
    mutationFn: (data: CreateModifierT) => productService.createModifier(data),
    onMutate: () => {
      toast.loading("Creando modificador...", { id: "create-modifier" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", "products"] });
      toast.success("Modificador creado exitosamente", {
        id: "create-modifier",
      });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al crear el modificador";
      toast.error(message, { id: "create-modifier" });
    },
  });
};
