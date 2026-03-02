import z from "zod";

export const createCategorieSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  slug: z.string(),
  descripcion: z.string().optional(),
});

export type CreateCategorieT = z.infer<typeof createCategorieSchema>;
