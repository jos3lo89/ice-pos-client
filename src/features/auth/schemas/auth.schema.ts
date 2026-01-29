import z from "zod";

export const loginSchema = z.object({
  userName: z.string().trim().min(1, "El nombre de usuario es obligatorio"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type LoginT = z.infer<typeof loginSchema>;
