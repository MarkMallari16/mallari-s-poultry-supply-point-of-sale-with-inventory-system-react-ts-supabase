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