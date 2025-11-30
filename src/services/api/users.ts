import type { User } from "../../types/user";
import { supabase } from "../supabaseClient";

export const getAllUsers = async (): Promise<User[]> => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("id", { ascending: true })

    if (error || !data) {
        console.error("Error fetching products", error.message);
        return [];
    }

    return data;
}
export const deleteUserById = async (id: string) => {
    try {
        const { error } = await supabase
            .from("users")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Delete user error:", error.message);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Unexpected error deleting product:", err);
        return false;
    }
}

export const updateUserById = async (
    id: string,
    updates: Partial<Pick<User, "email" | "full_name" | "role" | "is_active">>
): Promise<User | null> => {
    try {
        const { data, error } = await supabase
            .from("users")
            .update(updates)
            .eq("id", id)
            .select("*")
            .single();

        if (error || !data) {
            console.error("Update user error:", error?.message);
            return null;
        }

        return data as User;
    } catch (err) {
        console.error("Unexpected error updating user:", err);
        return null;
    }
}