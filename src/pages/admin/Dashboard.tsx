import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Product = {
    id: number,
    name: string,
    brand: string,
    price: number,
    stock: number,
    unit: string,
    created_at: string
}
const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetcthProducts = async () => {
        try {
            const { data: products, error } = await supabase
                .from('products')
                .select('*')

            if (error) {
                console.error("Error fetching products")
            } else {
                setProducts(products);
            }
            setLoading(false)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetcthProducts();
    }, [])

    console.log(products)
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