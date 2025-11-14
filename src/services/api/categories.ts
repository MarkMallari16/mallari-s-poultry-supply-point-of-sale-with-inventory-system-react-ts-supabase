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
''
export const deleteCategory = async (id: number): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from("categories")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting product:", error.message);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Unexpected error deleting product:", err);
        return false;
    }
}