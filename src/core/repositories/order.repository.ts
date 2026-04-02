import type { CurrentOrderRes } from "../entities/current-order.entity";
import type { OrderDetailToPayRes } from "../entities/order-detail-to-pay.entity";
import type {
  AddProductToOrderI,
  AddProductToOrderRes,
  CreateOrderI,
  CreateOrderRes,
  DeleteOrderItemRes,
  DeleteOrderRes,
  OrderTakeAwayRes,
  SendComandT,
} from "../entities/order.entity";

export interface OrderRepository {
  create(order: CreateOrderI): Promise<CreateOrderRes>;
  addProductToOrder(dto: {
    orderId: string;
    order: AddProductToOrderI;
  }): Promise<AddProductToOrderRes>;
  getOrderById(orderId: string): Promise<CurrentOrderRes>;
  deleteOrderItem(itemId: string): Promise<DeleteOrderItemRes>;
  deleteOrder(orderId: string): Promise<DeleteOrderRes>;
  sendComand(dto: SendComandT): Promise<void>;
  cancelOrderItem(dto: { orderId: string; itemId: string }): Promise<void>;
  cancelOrder(dto: { orderId: string; reason: string }): Promise<void>;
  getOrderDetails(orderId: string): Promise<OrderDetailToPayRes>;
  getOrderTakeAway(): Promise<OrderTakeAwayRes[]>;
}
