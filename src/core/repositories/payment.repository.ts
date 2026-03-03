import type {
  CreatePaymentDto,
  CreatePaymentRes,
  GetTicketRes,
} from "../entities/payment.entity";

export interface PaymentRepository {
  createPayment(dto: CreatePaymentDto): Promise<CreatePaymentRes>;
  getTicket(paymentId: string): Promise<GetTicketRes>;
}
