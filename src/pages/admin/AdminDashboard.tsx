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
    const overviewClasses = "flex justify-between items-center bg-white  p-5 rounded-md ring-1 ring-inset ring-gray-300"
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                <div className={overviewClasses}>
                    <div>
                        <h3 className=" font-medium">Product</h3>
                        <h1 className=" pt-2 text-3xl font-bold">29</h1>
                    </div>
                    <Box className="w-10 h-10 text-gray-500" />
                </div>
                <div className={overviewClasses}>
                    <div>
                        <h3 className=" font-medium">Low Stock</h3>
                        <h1 className=" pt-2 text-3xl font-bold">29</h1>
                    </div>
                    <TriangleAlert className="w-10 h-10 text-yellow-600" />
                </div>
                <div className={overviewClasses}>
                    <div>
                        <h3 className=" font-medium">Transactions</h3>
                        <h1 className=" pt-2 text-3xl font-bold">29</h1>
                    </div>
                    <ShoppingCart className="w-10 h-10 text-gray-500" />
                </div>
                <div className={overviewClasses}>
                    <div>
                        <h3 className=" font-medium">Revenue</h3>
                        <h1 className=" pt-2 text-3xl font-bold">29</h1>
                    </div>
                    <TrendingUp className="w-10 h-10 text-gray-500" />
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