import z from "zod";

// crear orden
export const CreateOrderSchema = z.object({
  table_id: z.string(),
  notes: z.string().trim().optional(),
});

export type CreateOrderT = z.infer<typeof CreateOrderSchema>;

// agregar producto a la orden
export const AddProductToOrderSchema = z.object({
  product_id: z.string(),
  quantity: z.number().min(1, "La cantidad debe ser mayor a 0"),
  variant_id: z.string().optional(),
  modifier_ids: z.array(z.string()).optional(),
  notes: z.string().trim().optional(),
});

export type AddProductToOrderT = z.infer<typeof AddProductToOrderSchema>;
