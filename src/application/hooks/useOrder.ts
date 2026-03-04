import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { orderApi } from "@/infrastructure/api/order.api";
import type {
  AddProductToOrderI,
  CreateOrderI,
  SendComandT,
} from "@/core/entities/order.entity";
import { toast } from "sonner";

// crear orden
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create", "order"],
    mutationFn: (order: CreateOrderI) => orderApi.create(order),
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
    mutationFn: (dto: { orderId: string; order: AddProductToOrderI }) =>
      orderApi.addProductToOrder(dto),
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
    queryFn: () => orderApi.getOrderById(orderId),
    enabled: !!orderId,
  });
};

// delete order item
export const useDeleteOrderItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete", "order", "item"],
    mutationFn: (itemId: string) => orderApi.deleteOrderItem(itemId),
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
    mutationFn: (orderId: string) => orderApi.deleteOrder(orderId),
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

// send comand
export const useSendComand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["send", "comand"],
    mutationFn: (dto: SendComandT) => orderApi.sendComand(dto),
    onMutate: () => {
      toast.loading("Enviando comanda...", { id: "send-comand" });
    },
    onSuccess: () => {
      toast.success("Comanda enviada correctamente", { id: "send-comand" });
      queryClient.invalidateQueries({ queryKey: ["current", "order"] });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al enviar la comanda";
      toast.error(message, { id: "send-comand" });
    },
  });
};

// cancel order item
export const useCancelOrderItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cancel", "order", "item"],
    mutationFn: (dto: { orderId: string; itemId: string }) =>
      orderApi.cancelOrderItem(dto),
    onMutate: () => {
      toast.loading("Cancelando producto de la orden...", {
        id: "cancel-order-item",
      });
    },
    onSuccess: () => {
      toast.success("Producto cancelado correctamente", {
        id: "cancel-order-item",
      });
      queryClient.invalidateQueries({ queryKey: ["current", "order"] });
      queryClient.invalidateQueries({ queryKey: ["order", "details"] });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al cancelar el producto de la orden";
      toast.error(message, { id: "cancel-order-item" });
    },
  });
};

// cancel order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["cancel", "order"],
    mutationFn: (dto: { orderId: string; reason: string }) =>
      orderApi.cancelOrder(dto),
    onMutate: () => {
      toast.loading("Cancelando orden...", { id: "cancel-order" });
    },
    onSuccess: () => {
      toast.success("Orden cancelada correctamente", { id: "cancel-order" });
      queryClient.invalidateQueries({ queryKey: ["current", "order"] });
      queryClient.invalidateQueries({ queryKey: ["floors", "with-tables"] });
      queryClient.invalidateQueries({ queryKey: ["order", "details"] });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Error al cancelar la orden";
      toast.error(message, { id: "cancel-order" });
    },
  });
};

// get order details
export const useGetOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ["order", "details", orderId],
    queryFn: () => orderApi.getOrderDetails(orderId),
    enabled: !!orderId,
  });
};
