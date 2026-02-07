import z from "zod";

// crear piso schema
export const createFloorSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  level: z.number().min(1, "El nivel es requerido"),
});

export type CreateFloorT = z.infer<typeof createFloorSchema>;
