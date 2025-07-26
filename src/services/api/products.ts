import type { Product } from "../../types/product";
import { supabase } from "../supabaseClient";

export const getAllProducts = async (): Promise<Product[]> => {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true })

    if (error) {
        console.error("Error fetching products", error.message);

        return [];
    }

    return data as Product[];
}