import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  profileImageUrl: string;
  socialProvider: string;
}

interface AuthState {
  isLoggedIn: boolean;
  accessToken?: string;
  exprTime?: number;
  user?: User;
  login: (token: string, exprTime: number, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      isLoggedIn: false,
      accessToken: undefined,
      exprTime: undefined,
      user: undefined,

      login: (token, exprTime, user) => {
        set({ isLoggedIn: true, accessToken: token, exprTime, user });
      },

      logout: () => {
        set({
          isLoggedIn: false,
          accessToken: undefined,
          exprTime: undefined,
          user: undefined,
        });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
