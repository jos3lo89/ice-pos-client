import z from "zod";

export const createCategorieSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  slug: z.string(),
  description: z.string().optional(),
});

export type CreateCategorieT = z.infer<typeof createCategorieSchema>;
