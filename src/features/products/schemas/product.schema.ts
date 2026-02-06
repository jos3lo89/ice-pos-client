import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  category_id: z.uuid("La categoría debe ser un UUID válido"),
  description: z.string().optional(),
  area_impresion: z.enum(["cocina", "bar"]),
});

export type CreateProductT = z.infer<typeof createProductSchema>;
export type PrinterTarget = z.infer<
  typeof createProductSchema
>["area_impresion"];
