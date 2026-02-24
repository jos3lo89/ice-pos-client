import { useMutation, useQuery } from "@tanstack/react-query";
import type { AddProductToOrderT, CreateOrderT } from "../schemas/order.schema";
import { orderService } from "../services/order.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

// crear orden
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create", "order"],
    mutationFn: (order: CreateOrderT) => orderService.create(order),
    onMutate: () => {
      toast.loading("Creando orden...", { id: "create-order" });
    },
    onSuccess: () => {
      toast.success("Orden creada correctamente", { id: "create-order" });
      queryClient.invalidateQueries({ queryKey: ["floors", "with-tables"] });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al crear la orden";
      toast.error(message, { id: "create-order" });
    },
  });
};

// agregar producto a la orden
export const useAddProductToOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add", "product", "to", "order"],
    mutationFn: (dto: { orderId: string; order: AddProductToOrderT }) =>
      orderService.addProductToOrder(dto),
    onMutate: () => {
      toast.loading("Agregando producto a la orden...", {
        id: "add-product-to-order",
      });
    },
    onSuccess: () => {
      toast.success("Producto agregado correctamente", {
        id: "add-product-to-order",
      });
      queryClient.invalidateQueries({ queryKey: ["current", "order"] });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al agregar el producto a la orden";
      toast.error(message, { id: "add-product-to-order" });
    },
  });
};

// get current order by id

export const useGetCurrentOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ["current", "order", orderId],
    queryFn: () => orderService.getOrderById(orderId),
    enabled: !!orderId,
  });
};

// delete order item
export const useDeleteOrderItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete", "order", "item"],
    mutationFn: (itemId: string) => orderService.deleteOrderItem(itemId),
    onMutate: () => {
      toast.loading("Eliminando producto de la orden...", {
        id: "delete-order-item",
      });
    },
    onSuccess: () => {
      toast.success("Producto eliminado correctamente", {
        id: "delete-order-item",
      });
      queryClient.invalidateQueries({ queryKey: ["current", "order"] });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al eliminar el producto de la orden";
      toast.error(message, { id: "delete-order-item" });
    },
  });
};

// delete order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete", "order"],
    mutationFn: (orderId: string) => orderService.deleteOrder(orderId),
    onMutate: () => {
      toast.loading("Eliminando orden...", { id: "delete-order" });
    },
    onSuccess: () => {
      toast.success("Orden eliminada correctamente", { id: "delete-order" });
      queryClient.invalidateQueries({ queryKey: ["floors", "with-tables"] });
      // queryClient.invalidateQueries({ queryKey: ["current", "order"] });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al eliminar la orden";
      toast.error(message, { id: "delete-order" });
    },
  });
};
