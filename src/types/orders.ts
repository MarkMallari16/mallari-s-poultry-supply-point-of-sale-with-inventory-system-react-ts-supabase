export interface OrderItem {
    id?: number;
    order_id?: string;
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
}

export interface Order {
    id?: string;
    transaction_id: string;
    total_amount: number;
    payment_method: 'Cash' | 'Card' | 'E-Wallet';
    status: 'Completed' | 'Refunded' | 'Cancelled';
    cashier_id: string;
    cashier_name: string;
    created_at?: string;
    items?: OrderItem[];
}

export interface CreateOrderInput {
    total_amount: number;
    payment_method: 'Cash' | 'Card' | 'E-Wallet';
    cashier_id: string;
    cashier_name: string;
    items: Omit<OrderItem, 'id' | 'order_id'>[];
}
