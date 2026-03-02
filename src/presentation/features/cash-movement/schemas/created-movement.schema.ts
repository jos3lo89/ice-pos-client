import z from "zod";

export const cashMovementSchema = z.object({
  tipo: z.enum(["ingreso_manual", "egreso_manual", "egreso_gasto"]),
  monto: z
    .number("El monto debe ser un número")
    .min(0.1, "El monto debe ser mayor a 0"),
  descripcion: z.string().optional(),
});

export type CashMovementFormValues = z.infer<typeof cashMovementSchema>;
