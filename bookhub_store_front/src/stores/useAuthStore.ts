import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  accessToken?: string;
  exprTime?: number;
  login: (token: string, exprTime: number) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      isLoggedIn: false,
      accessToken: undefined,
      exprTime: undefined,

      login: (token, exprTime) => {
        set({ isLoggedIn: true, accessToken: token, exprTime,});
      },

      logout: () => {
        set({
          isLoggedIn: false,
          accessToken: undefined,
          exprTime: undefined,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
