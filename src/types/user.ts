export interface User {
    id: string;
    email: string;
    full_name?: string;
    role?: "admin" | "cashier";
    is_active?: string;
}