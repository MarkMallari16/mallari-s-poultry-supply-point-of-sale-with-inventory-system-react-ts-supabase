import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import { getAllProducts } from "../../services/api/products";
import { useCountStore } from "../../stores/useCountStore";


const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    //sample zustand 
    const count = useCountStore((state) => state.count);
    const increment = useCountStore((state) => state.increment);
    const decrement = useCountStore((state) => state.decrement);


    const fetcthProducts = async () => {
        const result = await getAllProducts();
        setProducts(result)
        setLoading(false)
    }

    //run once it rendered
    useEffect(() => {
        fetcthProducts();
    }, [])

    return (
        <div>
            <h1 className="text-xl font-bold pt-4 mb-4">Product Inventory</h1>
            <h1 className="text-4xl">{count}</h1>
            <button onClick={() => increment(1)}>Increment</button>
            <button onClick={() => decrement(1)}>Decrement</button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="space-y-2">
                    {products.map((product) => (
                        <li key={product.id} className="border p-2 rounded">
                            <strong>{product.name}</strong> — {product.brand},  <br />
                            Price: ₱{product.price} • Stock: {product.stock} {product.unit}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dashboard