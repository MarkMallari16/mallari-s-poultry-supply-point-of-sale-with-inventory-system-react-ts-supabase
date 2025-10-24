import { Box, ShoppingCart, TrendingUp, TriangleAlert } from "lucide-react";

const Dashboard = () => {
    const overviewClasses = "flex justify-between items-center bg-white  p-5 rounded-md ring-1 ring-inset ring-gray-300"
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                <div className={overviewClasses}>
                    <div>
                        <h3 className=" font-medium">Product</h3>
                        <h1 className=" pt-2 text-3xl font-bold">29</h1>
                    </div>
                    <Box className="w-10 h-10 text-gray-600" />
                </div>
                <div className={overviewClasses}>
                    <div>
                        <h3 className=" font-medium">Low Stock</h3>
                        <h1 className=" pt-2 text-3xl font-bold">29</h1>
                    </div>
                    <TriangleAlert className="w-10 h-10 text-amber-500" />
                </div>
                <div className={overviewClasses}>
                    <div>
                        <h3 className=" font-medium">Transactions</h3>
                        <h1 className=" pt-2 text-3xl font-bold">29</h1>
                    </div>
                    <ShoppingCart className="w-10 h-10 text-gray-600" />
                </div>
                <div className={overviewClasses}>
                    <div>
                        <h3 className=" font-medium">Revenue</h3>
                        <h1 className=" pt-2 text-3xl font-bold">29</h1>
                    </div>
                    <TrendingUp className="w-10 h-10 text-gray-600" />
                </div>
            </div>
            <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                <div className="bg-white  p-5 rounded-md ring-1 ring-inset ring-gray-300">
                    <h1>Chart 1</h1>
                </div>
                <div className="bg-white  p-5 rounded-md ring-1 ring-inset ring-gray-300">
                    <h1>Chart 2</h1>
                </div>
            </section>
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