import { create } from "zustand";
import type { AuthState } from "../types/auth-state";
import { persist } from "zustand/middleware";


export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            login: (user) => set({ user }),
            logout: () => set({ user: null }),
            setRole: (role) =>
                set((state) =>
                    state.user ? { user: { ...state.user, role } } : state)
        }),
        {
            name: "auth-storage"
        }
    )
)