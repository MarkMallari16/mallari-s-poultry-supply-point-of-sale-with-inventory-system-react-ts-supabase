export interface SaleItem {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

export interface Sale {
    id: string;
    transactionId: string;
    date: string;
    totalAmount: number;
    paymentMethod: 'Cash' | 'Card' | 'E-Wallet';
    status: 'Completed' | 'Refunded' | 'Cancelled';
    cashierName: string;
    items: SaleItem[];
}
