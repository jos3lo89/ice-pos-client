import { z } from "zod";

export const paymentSchema = z
  .object({
    orderId: z.string(),
    method: z.enum(["efectivo", "tarjeta", "yape", "plin"]),
    tipoDocumento: z.enum(["ticket", "boleta", "factura"]),
    montoRecibido: z.union([z.number(), z.string()]).nullable().optional(),
    transactionId: z.string().nullable().optional(),
    clienteId: z.string().optional(),
    notes: z
      .string()
      .max(200, "Las notas no pueden exceder los 200 caracteres")
      .nullable()
      .optional(),
    lines: z.array(
      z.object({
        orderItemId: z.string(),
      }),
    ),
  })
  .refine(
    (data) => {
      if (data.method === "efectivo") {
        const monto = Number(data.montoRecibido);
        return !isNaN(monto) && monto > 0;
      }
      return true;
    },
    {
      message: "Requerido mayor a 0",
      path: ["montoRecibido"],
    },
  );

export type PaymentFormValues = z.infer<typeof paymentSchema>;
