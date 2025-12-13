import { Banknote, Minus, Plus, ShoppingCart, Trash2, LayoutGrid } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { ProductWithUrl } from "../../types/product"
import type { Category } from "../../types/categories";
import { getAllProducts } from "../../services/api/products";
import { getAllCategories } from "../../services/api/categories";
import ProductCard from "../../components/POS/ProductCard";
import { useCartStore } from "../../stores/useCartStore";

const POS = () => {
    const [products, setProducts] = useState<ProductWithUrl[]>();
    const [categories, setCategories] = useState<Category[]>();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const fetchProducts = async () => {
        const results = await getAllProducts();
        setProducts(results);
    }

    const fetchCategories = async () => {
        const results = await getAllCategories();
        setCategories(results);
    }
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [])

    const cart = useCartStore((s) => s.cart);
    const increment = useCartStore((s) => s.increment);
    const decrement = useCartStore((s) => s.decrement);
    const clearCart = useCartStore((s) => s.clearCart);
    const totalItems = useCartStore((s) => s.totalItems);
    const totalAmount = useCartStore((s) => s.totalAmount);

    const checkoutModalRef = useRef<HTMLDialogElement>(null);

    const openCheckout = () => {
        if (cart.length === 0) return;
        checkoutModalRef.current?.showModal();
    }

    const confirmCheckout = async () => {
        // TODO: integrate orders and stock deduction
        clearCart();
        checkoutModalRef.current?.close();
    }

    // Compute filtered products by category.
    const filteredProducts = (() => {
        if (!products) return [] as ProductWithUrl[];
        if (!selectedCategoryId) return products;
        const cat = categories?.find(c => c.id === selectedCategoryId);
        // Prefer category_id if present on product; fallback to brand === category name
        return products.filter((p: any) =>
            (typeof p.category_id === 'number' && p.category_id === selectedCategoryId) ||
            (cat && p.brand === cat.name)
        );
    })();

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col lg:flex-row gap-6">
            {/* Left Section: Products & Categories */}
            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                {/* Categories Header */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
                    <button
                        className={`btn btn-sm px-6 rounded-full border-0 ${selectedCategoryId === null ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                        onClick={() => setSelectedCategoryId(null)}
                    >
                        <LayoutGrid size={16} className="mr-2" />
                        All Items
                    </button>
                    {categories?.map(category => (
                        <button
                            key={category.id}
                            className={`btn btn-sm px-6 rounded-full border-0 whitespace-nowrap ${selectedCategoryId === category.id ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                            onClick={() => setSelectedCategoryId(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    {filteredProducts.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <p>No products found in this category.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Section: Cart */}
            <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
                {/* Cart Header */}
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                            <ShoppingCart size={20} />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-gray-800">Current Order</h2>
                            <p className="text-xs text-gray-500 font-medium">Transaction ID: #0000</p>
                        </div>
                    </div>
                    <button 
                        className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50 px-2" 
                        onClick={clearCart}
                        disabled={cart.length === 0}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                    {cart.length === 0 ? (
                        <div className="flex flex-col justify-center items-center h-full text-gray-400 gap-3">
                            <div className="bg-gray-100 p-4 rounded-full">
                                <ShoppingCart size={32} className="opacity-50" />
                            </div>
                            <p className="font-medium">Cart is empty</p>
                            <p className="text-sm text-gray-400 text-center max-w-[200px]">Select items from the menu to start a new order</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex gap-3 group hover:border-emerald-200 transition-colors">
                                <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                    {item.publicUrl ? (
                                        <img className="w-full h-full object-cover" src={item.publicUrl} alt={item.name} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <ShoppingCart size={20} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-0.5">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-800 line-clamp-1 text-sm">{item.name}</h3>
                                        <p className="font-bold text-emerald-600 text-sm">₱{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="text-xs text-gray-500">{item.unit} • ₱{item.price}</p>
                                    
                                    <div className="flex items-center gap-3 mt-2">
                                        <button 
                                            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors" 
                                            onClick={() => decrement(item.id)}
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                        <button 
                                            className="w-6 h-6 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center text-emerald-700 transition-colors" 
                                            onClick={() => increment(item.id)}
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Cart Footer */}
                <div className="p-5 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Items ({totalItems()})</span>
                            <span>₱{totalAmount().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Tax (0%)</span>
                            <span>₱0.00</span>
                        </div>
                        <div className="flex justify-between items-end pt-2 border-t border-dashed border-gray-200">
                            <span className="font-bold text-gray-800 text-lg">Total</span>
                            <span className="font-bold text-2xl text-emerald-600">₱{totalAmount().toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <button 
                        className="btn btn-success w-full text-white font-bold text-lg h-12 shadow-emerald-200 shadow-lg hover:shadow-emerald-300 transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:border-none" 
                        onClick={openCheckout} 
                        disabled={cart.length === 0}
                    >
                        <Banknote className="mr-2" />
                        Charge ₱{totalAmount().toFixed(2)}
                    </button>
                </div>
            </div>

            {/* Checkout Modal */}
            <dialog ref={checkoutModalRef} className="modal backdrop-blur-sm">
                <div className="modal-box max-w-2xl p-0 overflow-hidden rounded-2xl">
                    <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-xl text-gray-800">Order Summary</h3>
                        <button className="btn btn-sm btn-circle btn-ghost" onClick={() => checkoutModalRef.current?.close()}>✕</button>
                    </div>
                    
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="text-gray-500 border-b border-gray-100">
                                    <th className="bg-transparent font-medium">Item</th>
                                    <th className="bg-transparent text-right font-medium">Price</th>
                                    <th className="bg-transparent text-center font-medium">Qty</th>
                                    <th className="bg-transparent text-right font-medium">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-50 last:border-0">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                                    {item.publicUrl && (
                                                        <img src={item.publicUrl} alt={item.name} className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-800">{item.name}</div>
                                                    <div className="text-xs text-gray-500">{item.unit}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-right text-gray-600">₱{item.price.toFixed(2)}</td>
                                        <td className="text-center font-medium">{item.quantity}</td>
                                        <td className="text-right font-bold text-emerald-600">₱{(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-500 font-medium">Total Amount</span>
                            <span className="text-3xl font-bold text-emerald-600">₱{totalAmount().toFixed(2)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="btn btn-outline border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400" onClick={() => checkoutModalRef.current?.close()}>Cancel</button>
                            <button className="btn btn-success text-white shadow-lg shadow-emerald-200" onClick={confirmCheckout} disabled={cart.length === 0}>Confirm Payment</button>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default POS