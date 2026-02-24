import z from "zod";

// crear piso schema
export const createFloorSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  nivel: z.number().min(1, "El nivel es requerido"),
});

export type CreateFloorT = z.infer<typeof createFloorSchema>;
