import type { AuthState, UserState } from "@/interfaces/auth-store.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const STORAGE_NAME = "auth-store";

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
