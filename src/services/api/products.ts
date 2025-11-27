import type { ProductWithUrl } from "../../types/product";
import { supabase } from "../supabaseClient";

export const getAllProducts = async (): Promise<ProductWithUrl[]> => {
    try {
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
    } catch (err) {
        console.error("Error fetching products.", err);
        return [];
    }
}

export const addProduct = async (
    product: Omit<ProductWithUrl, "id" | "publicUrl">
): Promise<ProductWithUrl | null> => {
    try {
        // Step 1: Insert new product into the "products" table
        const { data, error } = await supabase
            .from("products")
            .insert([product])
            .select()
            .single(); // returns the inserted row


        if (error || !data) {
            console.error("Error adding product:", error?.message);
            return null;
        }

        let publicUrl = "";

        // Step 3: Return the product with its public image URL
        if (data.image_url) {
            const { data: imageData } = supabase.storage
                .from("product-images")
                .getPublicUrl(data.image_url);
            publicUrl = imageData.publicUrl;
        }

        return {
            ...data,
            publicUrl,
        };

    } catch (err) {
        console.error("Unexpected error adding product:", err);
        return null;
    }
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

export const deleteProduct = async (id: number, imagePath?: string): Promise<boolean> => {
    try {
        // Delete image from storage (optional)
        if (imagePath) {
            await supabase.storage.from("product-images").remove([imagePath]);
        }

        // Delete product from table
        const { error } = await supabase.from("products").delete().eq("id", id);

        if (error) {
            console.error("Error deleting product:", error.message);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Unexpected error deleting product:", err);
        return false;
    }
};

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

export const resetAllStocks = async (productId: number) => {
    const { data, error } = await supabase
        .from("products")
        .update({ stock: 0 })
        .eq("id", productId)
        .select();

    if (error) {
        console.error("Error updating stock: ", error.message);

        return null;
    }

    return data;
}

export const updateProduct = async (
    id: number,
    updates: Partial<Omit<ProductWithUrl, "id" | "publicUrl">>
): Promise<ProductWithUrl | null> => {
    try {
        const { data, error } = await supabase
            .from("products")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (error || !data) {
            console.error("Error updating product:", error?.message);
            return null;
        }

        let publicUrl = "";
        if (data.image_url) {
            const { data: imageData } = supabase.storage
                .from("product-images")
                .getPublicUrl(data.image_url);
            publicUrl = imageData.publicUrl;
        }

        return { ...data, publicUrl };
    } catch (err) {
        console.error("Unexpected error updating product:", err);
        return null;
    }
}