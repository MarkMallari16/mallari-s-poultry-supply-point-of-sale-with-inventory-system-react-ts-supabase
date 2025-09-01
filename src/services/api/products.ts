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