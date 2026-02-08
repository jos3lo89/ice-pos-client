import http from "@/config/axios";
import type { AddProductToOrderT, CreateOrderT } from "../schemas/order.schema";
import type {
  AddProductToOrderRes,
  CreateOrderRes,
} from "../interfaces/order.interface";

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
}

export const orderService = new OrderService();
