import * as z from "zod";

export const paymentSchema = z
  .object({
    orderId: z.string().uuid(),
    method: z.enum(["efectivo", "tarjeta", "yape", "plin"]),
    tipoDocumento: z.enum(["ticket", "boleta", "factura"]),
    montoRecibido: z.number().nullable().optional(),
    transactionId: z.string().nullable().optional(),
    clienteId: z.string().optional(), // We'll handle the default in the component if needed
    notes: z
      .string()
      .max(200, "Las notas no pueden exceder los 200 caracteres")
      .nullable()
      .optional(),
    lines: z.array(
      z.object({
        orderItemId: z.string().uuid(),
      }),
    ),
  })
  .refine(
    (data) => {
      if (data.method === "efectivo") {
        return (
          data.montoRecibido !== undefined &&
          data.montoRecibido !== null &&
          data.montoRecibido > 0
        );
      }
      return true;
    },
    {
      message: "El monto recibido es requerido para pagos en efectivo",
      path: ["montoRecibido"],
    },
  );

export type PaymentFormValues = z.infer<typeof paymentSchema>;
