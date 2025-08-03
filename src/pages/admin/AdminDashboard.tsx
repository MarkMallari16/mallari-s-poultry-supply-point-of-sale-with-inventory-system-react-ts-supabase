// import { useEffect, useState } from "react";
// import type { Product } from "../../types/product";
// import { getAllProducts } from "../../services/api/products";
// import { useCountStore } from "../../stores/useCountStore";
import { Box, ShoppingCart, TrendingUp, TriangleAlert } from "lucide-react";


const Dashboard = () => {
    // const [products, setProducts] = useState<Product[]>([])
    // const [loading, setLoading] = useState<boolean>(true);

    // //sample zustand 
    // const count = useCountStore((state) => state.count);
    // const increment = useCountStore((state) => state.increment);
    // const decrement = useCountStore((state) => state.decrement);


    // const fetcthProducts = async () => {
    //     const result = await getAllProducts();
    //     setProducts(result)
    //     setLoading(false)
    // }

    // //run once it rendered
    // useEffect(() => {
    //     fetcthProducts();
    // }, [])

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="flex justify-between items-center bg-white bg-linear-to-tr from-emerald-200 to-emerald-100 p-5 rounded-md">
                    <div>
                        <h3 className="text-emerald-800 font-medium">Product</h3>
                        <h1 className="text-emerald-900 pt-2 text-3xl font-bold">29</h1>
                    </div>
                    <Box className="w-10 h-10 text-emerald-900" />
                </div>
                <div className="flex justify-between items-center bg-white bg-linear-to-tr from-yellow-100 to-yellow-200 p-5 rounded-md">
                    <div>
                        <h3 className="text-yellow-800 font-medium">Low Stock</h3>
                        <h1 className="text-yellow-900 pt-2 text-3xl font-bold">29</h1>
                    </div>
                    <TriangleAlert className="w-10 h-10 text-yellow-900" />
                </div>
                <div className="flex justify-between items-center bg-white bg-linear-to-tr from-blue-100 to-blue-200 p-5 rounded-md">
                    <div>
                        <h3 className="text-blue-800 font-medium">Transactions</h3>
                        <h1 className="text-blue-900 pt-2 text-3xl font-bold">29</h1>
                    </div>
                    <ShoppingCart className="w-10 h-10 text-blue-900" />
                </div>
                <div className="flex justify-between items-center bg-white bg-linear-to-tr from-purple-100 to-purple-200 p-5 rounded-md">
                    <div>
                        <h3 className="text-purple-800 font-medium">Revenue</h3>
                        <h1 className="text-purple-900 pt-2 text-3xl font-bold">29</h1>
                    </div>
                    <TrendingUp className="w-10 h-10 text-blue-900" />
                </div>
            </div>

            {/* 
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
            )} */}
        </div>
    )
}

export default Dashboard