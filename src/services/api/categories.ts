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

export const addCategory = async (
    category: Pick<Category, "name" | "species">
): Promise<Category | null> => {
    try {
        const { data, error } = await supabase
            .from("categories")
            .insert([category])
            .select("*")
            .single();

        if (error || !data) {
            console.error("Error adding category:", error?.message);
            return null;
        }

        return data as Category;
    } catch (err) {
        console.error("Unexpected error adding category:", err);
        return null;
    }
}
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

export const updateCategory = async (
    id: number,
    updates: Partial<Pick<Category, "name" | "species">>
): Promise<Category | null> => {
    try {
        const { data, error } = await supabase
            .from("categories")
            .update(updates)
            .eq("id", id)
            .select("*")
            .single();

        if (error || !data) {
            console.error("Error updating category:", error?.message);
            return null;
        }

        return data as Category;
    } catch (err) {
        console.error("Unexpected error updating category:", err);
        return null;
    }
}