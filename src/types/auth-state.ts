import type { User } from "./user"

export interface AuthState {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    setRole: (role: "admin" | "cashier") => void;
}
