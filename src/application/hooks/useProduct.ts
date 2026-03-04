import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/get-error-message";
import { productApi } from "@/infrastructure/api/product.api";
import type {
  CreateModifierT,
  CreateProductT,
  CreateVariantI,
} from "@/core/entities/product.entity";

export const useProductList = (
  page: number,
  limit: number,
  search?: string,
  category?: string,
) => {
  return useQuery({
    queryKey: ["list", "products", { page, limit, search, category }],
    queryFn: () => productApi.getAllProducts(page, limit, search, category),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create", "product"],
    mutationFn: (product: CreateProductT) => productApi.createProduct(product),
    onMutate: () => {
      toast.loading("Creando producto...", { id: "create-product" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", "products"] });
      toast.success("Producto creado exitosamente", { id: "create-product" });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Error al crear el producto"), { id: "create-product" });
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
    }) => productApi.updateStatus(dto),
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
      toast.error(getErrorMessage(error, "Error al actualizar el estado del producto"), { id: "update-product-status" });
    },
  });
};

export const useCreateVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create", "variant"],
    mutationFn: (data: CreateVariantI) => productApi.createVariant(data),
    onMutate: () => {
      toast.loading("Creando variante...", { id: "create-variant" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list", "products"] });
      toast.success("Variante creada exitosamente", { id: "create-variant" });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Error al crear la variante"), { id: "create-variant" });
    },
  });
};

export const useCreateModifier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create", "modifier"],
    mutationFn: (data: CreateModifierT) => productApi.createModifier(data),
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
      toast.error(getErrorMessage(error, "Error al crear el modificador"), { id: "create-modifier" });
    },
  });
};
