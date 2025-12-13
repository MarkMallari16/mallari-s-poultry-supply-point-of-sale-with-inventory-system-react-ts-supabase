import type { Supplier, CreateSupplierInput, UpdateSupplierInput } from "../../types/supplier";
import { supabase } from "../supabaseClient";

/**
 * Get all suppliers
 */
export const getAllSuppliers = async (): Promise<Supplier[]> => {
    try {
        const { data, error } = await supabase
            .from("suppliers")
            .select("*")
            .order("id", { ascending: true });

        if (error || !data) {
            console.error("Error fetching suppliers:", error?.message);
            return [];
        }

        return data as Supplier[];
    } catch (err) {
        console.error("Unexpected error fetching suppliers:", err);
        return [];
    }
};

/**
 * Get supplier by ID
 */
export const getSupplierById = async (id: number): Promise<Supplier | null> => {
    try {
        const { data, error } = await supabase
            .from("suppliers")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            console.error("Error fetching supplier:", error?.message);
            return null;
        }

        return data as Supplier;
    } catch (err) {
        console.error("Unexpected error fetching supplier:", err);
        return null;
    }
};

/**
 * Add a new supplier
 */
export const addSupplier = async (supplier: CreateSupplierInput): Promise<Supplier | null> => {
    try {
        const { data, error } = await supabase
            .from("suppliers")
            .insert([supplier])
            .select()
            .single();

        if (error || !data) {
            console.error("Error adding supplier:", error?.message);
            return null;
        }

        return data as Supplier;
    } catch (err) {
        console.error("Unexpected error adding supplier:", err);
        return null;
    }
};

/**
 * Update an existing supplier
 */
export const updateSupplier = async (
    id: number,
    updates: UpdateSupplierInput
): Promise<Supplier | null> => {
    try {
        const { data, error } = await supabase
            .from("suppliers")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (error || !data) {
            console.error("Error updating supplier:", error?.message);
            return null;
        }

        return data as Supplier;
    } catch (err) {
        console.error("Unexpected error updating supplier:", err);
        return null;
    }
};

/**
 * Delete a supplier
 */
export const deleteSupplier = async (id: number): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from("suppliers")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting supplier:", error.message);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Unexpected error deleting supplier:", err);
        return false;
    }
};
