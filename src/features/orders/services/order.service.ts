import http from "@/config/axios";
import type { AddProductToOrderT, CreateOrderT } from "../schemas/order.schema";
import type {
  AddProductToOrderRes,
  CreateOrderRes,
  DeleteOrderItemRes,
  DeleteOrderRes,
  SendComandT,
} from "../interfaces/order.interface";
import type { CurrentOrderRes } from "../interfaces/current-order.interface";
import type { OrderDetailToPayRes } from "../interfaces/order-detail-to-pay.interface";

class OrderService {
  private readonly baseUrl = "/orders";

  async create(order: CreateOrderT) {
    const { data } = await http.post<CreateOrderRes>(this.baseUrl, order);
    return data;
  }

  async addProductToOrder(dto: { orderId: string; order: AddProductToOrderT }) {
    const { data } = await http.post<AddProductToOrderRes>(
      `${this.baseUrl}/${dto.orderId}/items`,
      dto.order,
    );
    return data;
  }

  async getOrderById(orderId: string) {
    const { data } = await http.get<CurrentOrderRes>(
      `${this.baseUrl}/${orderId}/current`,
    );
    return data;
  }

  async deleteOrderItem(itemId: string) {
    const { data } = await http.delete<DeleteOrderItemRes>(
      `${this.baseUrl}/${itemId}/delete-item`,
    );
    return data;
  }

  async deleteOrder(orderId: string) {
    const { data } = await http.delete<DeleteOrderRes>(
      `${this.baseUrl}/${orderId}/delete-order`,
    );
    return data;
  }

  async sendComand(dto: SendComandT) {
    const { data } = await http.post(
      `${this.baseUrl}/${dto.orderId}/send-comand`,
      {
        itemsId: dto.itemsId,
      },
    );
    return data;
  }

  async cancelOrderItem(dto: { orderId: string; itemId: string }) {
    const { data } = await http.patch(
      `${this.baseUrl}/${dto.orderId}/cancel-item`,
      {
        itemId: dto.itemId,
      },
    );
    return data;
  }

  // cancelar orden
  async cancelOrder(orderId: string) {
    const { data } = await http.patch(`${this.baseUrl}/${orderId}/cancel`);
    return data;
  }

  // detalles de order para pagar
  async getOrderDetails(orderId: string) {
    const { data } = await http.get<OrderDetailToPayRes>(
      `${this.baseUrl}/${orderId}/detail`,
    );
    return data;
  }
}

export const orderService = new OrderService();
