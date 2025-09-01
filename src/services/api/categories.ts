import type { Category } from "../../types/categories";
import { supabase } from "../supabaseClient";

export const getAllCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("id", { ascending: true })

    if (error) {
        console.error("Error fetching categories", error.message);
        throw new Error(error.message);
    }

    return data as Category[];
}