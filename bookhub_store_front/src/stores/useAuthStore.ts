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
  accessToken: string | null;
  exprTime: number | null;
  user: User | null;
  login: (token: string, exprTime: number, user: User) => void;
  logout: () => void;
}

let logoutTimer: NodeJS.Timeout | null = null;

const startLogoutTimer = (remainingMs: number, logout: () => void) => {
  if (logoutTimer) clearTimeout(logoutTimer);

  if (remainingMs > 0) {
    logoutTimer = setTimeout(logout, remainingMs);
  } else {
    logout();
  }
};

const clearLogoutTimer = () => {
  if (logoutTimer) clearTimeout(logoutTimer);
};

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      isLoggedIn: false,
      accessToken: null,
      exprTime: null,
      user: null,

      login: (token, exprTime, user) => {
        set({ isLoggedIn: true, accessToken: token, exprTime, user });
        startLogoutTimer(exprTime, get().logout);
      },

      logout: () => {
        clearLogoutTimer();
        set({
          isLoggedIn: false,
          accessToken: null,
          exprTime: null,
          user: null,
        });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.exprTime) {
          startLogoutTimer(state.exprTime, () =>
            useAuthStore.getState().logout()
          );
        }
      },
    }
  )
);
