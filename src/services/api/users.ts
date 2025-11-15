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