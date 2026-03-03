import { STORAGE_NAME } from "@/constants/auht.constant";
import type { UserRole } from "@/core/entities/employe.entity";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserState {
  id: string;
  usuario: string;
  nombre_completo: string;
  rol: UserRole;
  esta_activo: boolean;
  telefono: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface AuthState {
  user: UserState | null;
  isAuthenticated: boolean;
  logout: () => void;
  setUser: (user: UserState) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: UserState) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
        localStorage.removeItem(STORAGE_NAME);
      },
    }),
    {
      name: STORAGE_NAME,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
