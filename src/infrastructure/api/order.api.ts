import http from "@/config/axios";
import type { CurrentOrderRes } from "@/core/entities/current-order.entity";
import type { OrderDetailToPayRes } from "@/core/entities/order-detail-to-pay.entity";
import type {
  AddProductToOrderI,
  AddProductToOrderRes,
  CreateOrderI,
  CreateOrderRes,
  DeleteOrderItemRes,
  DeleteOrderRes,
  OrderTakeAwayRes,
  SendComandT,
} from "@/core/entities/order.entity";
import type { OrderRepository } from "@/core/repositories/order.repository";

class OrderApi implements OrderRepository {
  private readonly baseUrl = "/orders";

  async create(order: CreateOrderI) {
    const { data } = await http.post<CreateOrderRes>(this.baseUrl, order);
    return data;
  }

  async addProductToOrder(dto: { orderId: string; order: AddProductToOrderI }) {
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
  async cancelOrder(dto: { orderId: string; reason: string }) {
    const { data } = await http.patch(`${this.baseUrl}/${dto.orderId}/cancel`, {
      reason: dto.reason,
    });
    return data;
  }

  // detalles de order para pagar
  async getOrderDetails(orderId: string) {
    const { data } = await http.get<OrderDetailToPayRes>(
      `${this.baseUrl}/${orderId}/detail`,
    );
    return data;
  }

  async getOrderTakeAway() {
    const { data } = await http.get<OrderTakeAwayRes[]>(
      `${this.baseUrl}/takeout-order-list`,
    );
    return data;
  }
}

export const orderApi = new OrderApi();
