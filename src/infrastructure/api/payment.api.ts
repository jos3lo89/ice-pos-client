import http from "@/config/axios";
import type {
  CreatePaymentDto,
  CreatePaymentRes,
  GetTicketRes,
} from "@/core/entities/payment.entity";
import type { PaymentRepository } from "@/core/repositories/payment.repository";

class PaymentApi implements PaymentRepository {
  private readonly baseUrl = "payments/";

  async createPayment(dto: CreatePaymentDto): Promise<CreatePaymentRes> {
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

  async getTicket(paymentId: string): Promise<GetTicketRes> {
    const { data } = await http.get<GetTicketRes>(
      `${this.baseUrl}${paymentId}/ticket`,
    );
    return data;
  }
}

export const paymentApi = new PaymentApi();
