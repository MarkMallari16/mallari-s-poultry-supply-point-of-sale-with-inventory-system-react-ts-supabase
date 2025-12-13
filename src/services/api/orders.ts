import type { Order, CreateOrderInput, OrderItem } from "../../types/orders";
import { supabase } from "../supabaseClient";
import { updateStocks } from "./products";

/**
 * Generate a unique transaction ID in format: TXN-YYYYMMDD-XXX
 */
export const generateTransactionId = async (): Promise<string> => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');

    // Get count of orders from today to generate sequence
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

    const { count, error } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startOfDay)
        .lte("created_at", endOfDay);

    if (error) {
        console.error("Error getting order count:", error.message);
    }

    const sequence = String((count || 0) + 1).padStart(3, '0');
    return `TXN-${dateStr}-${sequence}`;
};

/**
 * Create a new order with items and deduct stock
 */
export const createOrder = async (input: CreateOrderInput): Promise<Order | null> => {
    try {
        // Generate transaction ID
        const transaction_id = await generateTransactionId();

        // Step 1: Insert order
        const { data: orderData, error: orderError } = await supabase
            .from("orders")
            .insert([{
                transaction_id,
                total_amount: input.total_amount,
                payment_method: input.payment_method,
                status: 'Completed',
                cashier_id: input.cashier_id,
                cashier_name: input.cashier_name
            }])
            .select()
            .single();

        if (orderError || !orderData) {
            console.error("Error creating order:", orderError?.message);
            return null;
        }

        // Step 2: Insert order items
        const orderItems = input.items.map(item => ({
            order_id: orderData.id,
            product_id: item.product_id,
            product_name: item.product_name,
            quantity: item.quantity,
            unit_price: item.unit_price,
            subtotal: item.subtotal
        }));

        const { error: itemsError } = await supabase
            .from("order_items")
            .insert(orderItems);

        if (itemsError) {
            console.error("Error creating order items:", itemsError.message);
            // Rollback: delete the order
            await supabase.from("orders").delete().eq("id", orderData.id);
            return null;
        }

        // Step 3: Deduct stock for each product
        for (const item of input.items) {
            // Get current stock
            const { data: productData } = await supabase
                .from("products")
                .select("stock")
                .eq("id", item.product_id)
                .single();

            if (productData) {
                const newStock = Math.max(0, productData.stock - item.quantity);
                await updateStocks(item.product_id, newStock);
            }
        }

        return {
            ...orderData,
            items: orderItems as OrderItem[]
        } as Order;

    } catch (err) {
        console.error("Unexpected error creating order:", err);
        return null;
    }
};

/**
 * Get all orders with their items
 */
export const getAllOrders = async (): Promise<Order[]> => {
    try {
        const { data, error } = await supabase
            .from("orders")
            .select(`
                *,
                order_items (*)
            `)
            .order("created_at", { ascending: false });

        if (error || !data) {
            console.error("Error fetching orders:", error?.message);
            return [];
        }

        return data.map(order => ({
            ...order,
            items: order.order_items
        })) as Order[];

    } catch (err) {
        console.error("Unexpected error fetching orders:", err);
        return [];
    }
};

/**
 * Get order by ID
 */
export const getOrderById = async (id: string): Promise<Order | null> => {
    try {
        const { data, error } = await supabase
            .from("orders")
            .select(`
                *,
                order_items (*)
            `)
            .eq("id", id)
            .single();

        if (error || !data) {
            console.error("Error fetching order:", error?.message);
            return null;
        }

        return {
            ...data,
            items: data.order_items
        } as Order;

    } catch (err) {
        console.error("Unexpected error fetching order:", err);
        return null;
    }
};
