import { Box, ShoppingCart, TrendingUp, TriangleAlert } from "lucide-react";
import { getTotalProducts } from "../../services/api/products";
import { useEffect, useState } from "react";
import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";
import DoughnutChart from "../../components/charts/DoughnutChart";

const Dashboard = () => {
    const overviewClasses = "flex justify-between items-center bg-white  p-5 rounded-md ring-1 ring-inset ring-gray-300"

    const [totalProducts, setTotalProducts] = useState<number>();

    //fetch total products eg: 3
    const fetchTotalProducts = async () => {
        const totalProducts = await getTotalProducts();
        //set the total products to display it
        setTotalProducts(totalProducts);
    }

    useEffect(() => {
        fetchTotalProducts();
    }, [])

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                <div className={overviewClasses}>
                    <div>
                        <h3 className=" font-medium">Product</h3>
                        <h1 className=" pt-2 text-3xl font-bold">{totalProducts}</h1>
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
            <section className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                <div className="bg-white  p-5 rounded-md ring-1 ring-inset ring-gray-300">
                    <BarChart />
                </div>
                <div className="bg-white  p-5 rounded-md ring-1 ring-inset ring-gray-300">
                    <LineChart />
                </div>
                <div className="bg-white  p-5 rounded-md ring-1 ring-inset ring-gray-300">
                    <PieChart />
                </div>
                <div className="bg-white  p-5 rounded-md ring-1 ring-inset ring-gray-300">
                    <DoughnutChart />
                </div>
            </section>
        </div>
    )
}

export default Dashboard