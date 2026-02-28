import { STORAGE_NAME } from "@/constants/auht.constant";
import type { AuthState, UserState } from "@/interfaces/auth-store.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
