import z from "zod";

// crear producto
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

// crear variante de poroducto
export const createVariantSchema = z.object({
  variant_name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  additional_price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  product_id: z.uuid("El producto debe ser un UUID válido"),
});

export type CreateVariantT = z.infer<typeof createVariantSchema>;

// crear modificador de producto
export const createModifierSchema = z.object({
  modifier_name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  additional_price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  product_id: z.uuid("El producto debe ser un UUID válido"),
});

export type CreateModifierT = z.infer<typeof createModifierSchema>;
