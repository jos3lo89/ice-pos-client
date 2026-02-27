import http from "@/config/axios";
import type {
  CreatePaymentDto,
  CreatePaymentRes,
} from "../interfaces/payment.interface";

class PaymentService {
  private readonly baseUrl = "payments/";

  async createPayment(dto: CreatePaymentDto) {
    const payload = {
      orderId: dto.orderId,
      method: dto.method,
      tipoDocumento: dto.tipoDocumento,
      lines: dto.lines,
      ...(dto.method === "efectivo" && { montoRecibido: dto.montoRecibido }),
      ...(dto.transactionId && { transactionId: dto.transactionId }),
      ...(dto.clienteId && { clienteId: dto.clienteId }),
      ...(dto.notes && { notes: dto.notes }),
    };
    const { data } = await http.post<CreatePaymentRes>(this.baseUrl, payload);
    return data;
  }
}

export const paymentService = new PaymentService();
