import type { UserRole } from "@/common/types/roles";
import z from "zod";

export const userRoles: UserRole[] = [
  "admin",
  "cajero",
  "mesero",
  "cocinero",
  "bartender",
];

export const createUserSchema = z.object({
  username: z
    .string()
    .min(1, "El nombre de usuario es obligatorio.")
    .max(20, "El nombre de usuario no puede tener más de 20 caracteres."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
  full_name: z.string().min(1, "El nombre completo es obligatorio."),
  role: z.enum(userRoles),
  phone: z
    .string()
    .min(1, "El telefono es obligatorio.")
    .max(9, "Maximo 9 caracteres."),
});

export type CreateUserT = z.infer<typeof createUserSchema>;
