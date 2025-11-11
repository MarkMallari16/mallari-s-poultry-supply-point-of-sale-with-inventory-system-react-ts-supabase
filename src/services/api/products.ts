import type { ProductWithUrl } from "../../types/product";
import { supabase } from "../supabaseClient";

export const getAllProducts = async (): Promise<ProductWithUrl[]> => {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

    if (error || !data) {
        console.error("Error fetching products", error.message);
        return [];
    }

    return data.map((product) => {
        if (!product.image_url) {
            return { ...product, publicUrl: "" }
        }
        const { data: imageData } = supabase.storage
            .from("product-images")
            .getPublicUrl(product.image_url)

        return {
            ...product,
            publicUrl: imageData.publicUrl
        }
    })
}

export const getTotalProducts = async (): Promise<number> => {
    const { count, error } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })

    if (error) {
        console.error("Error counting products: ", error.message)
        return 0
    }

    return count || 0;
}

export const updateStocks = async (productId: number, newStock: number) => {
    const { data, error } = await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", productId)
        .select();

    if (error) {
        console.error("Error updating stock:", error.message);

        return null;
    }

    return data;
}