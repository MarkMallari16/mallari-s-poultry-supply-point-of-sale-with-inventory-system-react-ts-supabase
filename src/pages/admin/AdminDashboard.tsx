import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import { getAllProducts } from "../../services/api/products";


const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    const fetcthProducts = async () => {
        const result = await getAllProducts();
        setProducts(result)
        setLoading(false)
    }

    useEffect(() => {
        fetcthProducts();
    }, [])

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Product Inventory</h1>
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