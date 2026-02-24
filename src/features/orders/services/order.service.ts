import http from "@/config/axios";
import type { AddProductToOrderT, CreateOrderT } from "../schemas/order.schema";
import type {
  AddProductToOrderRes,
  CreateOrderRes,
  DeleteOrderItemRes,
} from "../interfaces/order.interface";
import type { CurrentOrderRes } from "../interfaces/current-order.interface";

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
}

export const orderService = new OrderService();
