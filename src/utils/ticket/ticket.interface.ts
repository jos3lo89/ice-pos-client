export type TicketOutput = "print" | "b64";

export interface PdfResponse {
  success: boolean;
  content: string | null;
  message: string;
}
