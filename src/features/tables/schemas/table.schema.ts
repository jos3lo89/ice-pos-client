import z from "zod";

export const createTableSchema = z.object({
  numero_mesa: z.string().min(1, "El número de mesa es obligatorio"),
  piso_id: z.uuid("El piso debe ser un UUID válido"),
});

export type CreateTableT = z.infer<typeof createTableSchema>;
