import { Banknote, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import type { ProductWithUrl } from "../../types/product"
import type { Category } from "../../types/categories";
import { getAllProducts } from "../../services/api/products";
import { getAllCategories } from "../../services/api/categories";
import ProductCard from "../../components/POS/ProductCard";
import { useCartStore } from "../../stores/useCartStore";

const POS = () => {

    const [products, setProducts] = useState<ProductWithUrl[]>();
    const [categories, setCategories] = useState<Category[]>();

    const fetchProducts = async () => {
        const results = await getAllProducts();
        setProducts(results);
    }

    const fetchCategories = async () => {
        const results = await getAllCategories();
        setCategories(results);
        console.log(results);
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

    const handleCheckout = async () => {
        // Placeholder: integrate with orders table later
        // For now, just clear cart after 'checkout'
        alert(`Checked out ${totalItems()} item(s) totaling ₱${totalAmount().toFixed(2)}`);
        clearCart();
    }

    return (
        <>
            <div>
                <h1 className="text-xl font-bold">Category</h1>
                <div className="mt-2 flex gap-2">
                    {
                        categories?.map(category => (
                            <button key={category.id} className="btn">{category.name}</button>
                        ))
                    }
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_30%] gap-6">
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {
                            products?.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        }
                    </div>
                </div>
                <div>
                    <div className="bg-white p-5 rounded-md border border-gray-300 shadow-xs">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="text-emerald-500" />
                                <h2 className="text-xl font-medium">Cart ({totalItems()})</h2>
                            </div>
                            <button className="btn cursor-pointer text-error font-medium bg-error/10 rounded-md" onClick={clearCart}><Trash2 className="size-4" /> Clear All</button>
                        </div>

                        <div className="pt-6 overflow-y-auto h-96">
                            {cart.length === 0 ? (
                                <p className="text-gray-500">Cart is empty.</p>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {cart.map((item) => (
                                        <div key={item.id} className="bg-gray-100 p-5 rounded-sm flex w-full gap-5">
                                            <div className="w-28 object-cover">
                                                {item.publicUrl && (
                                                    <img className="rounded-md" src={item.publicUrl} alt={item.name} />
                                                )}
                                            </div>
                                            <div className="w-full">
                                                <h3 className="text-lg font-bold">{item.name}</h3>
                                                <p className="text-sm">{item.unit}</p>

                                                <div className="flex justify-between gap-2 w-full">
                                                    <p className="text-xl font-medium">₱{item.price}</p>
                                                    <div className="flex justify-between items-center gap-5">
                                                        <button className="btn btn-circle  cursor-pointer bg-white border border-gray-300" onClick={() => decrement(item.id)}>
                                                            <Minus className="size-4" />
                                                        </button>
                                                        <p className="text-lg">{item.quantity}</p>
                                                        <button className="btn btn-circle cursor-pointer bg-white border border-gray-300" onClick={() => increment(item.id)}>
                                                            <Plus className="size-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end pt-4 ">
                                                    <h2 className="text-end  text-emerald-500 font-bold">₱{(item.price * item.quantity).toFixed(2)}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <h3 className="font-medium text-xl">Total</h3>
                            <h1 className="text-2xl font-bold text-emerald-500">₱{totalAmount().toFixed(2)}</h1>
                        </div>
                        <div>
                            <button className="btn btn-success font-bold w-full mt-4" onClick={handleCheckout} disabled={cart.length === 0}>
                                <Banknote />
                                CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default POS