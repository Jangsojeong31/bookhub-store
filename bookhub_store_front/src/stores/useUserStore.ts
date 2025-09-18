// src/store/useUserStore.ts
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

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  setNickname: (nickname: string) => void;
  setProfileImageUrl: (profileImageUrl: string) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      setNickname: (nickname) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, nickname }
            : ({ nickname } as User),
        })),
      setProfileImageUrl: (profileImageUrl) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, profileImageUrl }
            : ({ profileImageUrl } as User),
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
