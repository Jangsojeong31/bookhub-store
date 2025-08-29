import { create } from "zustand";

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
  token: string | null;
  exprTime: number | null;
  user: User | null;
  setAuth: (token: string, exprTime: number, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  exprTime: null,
  user: null,
  setAuth: (token, exprTime, user) => set({ token, exprTime, user }),
  clearAuth: () => set({ token: null, exprTime: null, user: null }),
}));
