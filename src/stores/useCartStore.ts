import { create } from 'zustand';
import type { ProductWithUrl } from '../types/product';

export interface CartItem extends ProductWithUrl {
	quantity: number;
}

interface CartState {
	cart: CartItem[];
	addToCart: (product: ProductWithUrl) => void;
	removeFromCart: (productId: number) => void;
	increment: (productId: number) => void;
	decrement: (productId: number) => void;
	clearCart: () => void;
	totalItems: () => number;
	totalAmount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
	cart: [],
	addToCart: (product) => {
		const existing = get().cart.find((i) => i.id === product.id);
		if (existing) {
			set({
				cart: get().cart.map((i) =>
					i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
				),
			});
		} else {
			set({ cart: [...get().cart, { ...product, quantity: 1 }] });
		}
	},
	removeFromCart: (productId) => {
		set({ cart: get().cart.filter((i) => i.id !== productId) });
	},
	increment: (productId) => {
		set({
			cart: get().cart.map((i) =>
				i.id === productId ? { ...i, quantity: i.quantity + 1 } : i
			),
		});
	},
	decrement: (productId) => {
		set({
			cart: get().cart
				.map((i) => (i.id === productId ? { ...i, quantity: i.quantity - 1 } : i))
				.filter((i) => i.quantity > 0),
		});
	},
	clearCart: () => set({ cart: [] }),
	totalItems: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
	totalAmount: () => get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));

