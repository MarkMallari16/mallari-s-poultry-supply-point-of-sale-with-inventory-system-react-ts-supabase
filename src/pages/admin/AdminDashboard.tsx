
import { useEffect, useState } from "react";
import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";
import StatCard from "../../components/dashboard/StatCard";
import IntegrationListV2 from "../../components/dashboard/IntegrationList";
import { DollarSign, ShoppingCart, AlertTriangle, Loader2 } from "lucide-react";
import { getAllProducts } from "../../services/api/products";
import { getAllOrders } from "../../services/api/orders";
import type { ProductWithUrl } from "../../types/product";
import type { Order } from "../../types/orders";

const LOW_STOCK_THRESHOLD = 10;

const Dashboard = () => {
    const [products, setProducts] = useState<ProductWithUrl[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [productsData, ordersData] = await Promise.all([
                    getAllProducts(),
                    getAllOrders()
                ]);
                setProducts(productsData);
                setOrders(ordersData);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Calculate statistics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
    const lowStockProducts = products.filter(p => p.stock <= LOW_STOCK_THRESHOLD);
    const criticalStockProducts = products.filter(p => p.stock <= 5);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2
        }).format(amount);
    };

    // Format number with commas
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-PH').format(num);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                <span className="ml-2 text-gray-600">Loading dashboard...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Oct 18 - Nov 18
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50">
                        <span>Monthly</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Orders"
                    value={formatNumber(totalOrders)}
                    trend={`${products.length} products`}
                    trendUp={true}
                    icon={<ShoppingCart size={20} />}
                />
                <StatCard
                    title="Total Revenue"
                    value={formatCurrency(totalRevenue)}
                    trend="All time"
                    trendUp={true}
                    icon={<DollarSign size={20} />}
                />
                <StatCard
                    title="Low Stock Alerts"
                    value={String(lowStockProducts.length)}
                    trend={`${criticalStockProducts.length} Critical`}
                    trendUp={false}
                    subtitle="Below threshold"
                    icon={<AlertTriangle size={20} />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                                Sales Overview
                            </h3>
                            <div className="flex items-baseline gap-2 mt-1">
                                <h2 className="text-2xl font-bold">₱ 124,500.00</h2>
                                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">12.5%</span>
                                <span className="text-xs text-gray-400">+₱ 12,400 increased</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                                Filter
                            </button>
                            <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18H3M21 6H3M17 12H3"></path></svg>
                                Sort
                            </button>
                            <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                            </button>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <LineChart />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            New Pet Owners
                        </h3>
                        <button className="text-xs font-medium text-gray-500 border border-gray-200 rounded px-2 py-1 flex items-center gap-1">
                            Weekly
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </button>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">482</h2>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">8.2%</span>
                            <span className="text-xs text-gray-400">+12 joined</span>
                        </div>
                    </div>
                    <div className="h-[200px] w-full">
                        <BarChart />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    {/* Sales Distribution Placeholder / Donut Chart */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                                Category Sales
                            </h3>
                            <button className="text-xs font-medium text-gray-500 border border-gray-200 rounded px-2 py-1 flex items-center gap-1">
                                Monthly
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                        </div>
                        <div className="border border-gray-100 rounded-xl p-4 mb-4 flex items-center justify-between">
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg font-bold text-gray-900">₱ 28k</span>
                                <span className="text-xs text-gray-500">Dog Food</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg font-bold text-gray-900">₱ 12k</span>
                                <span className="text-xs text-gray-500">Cat Food</span>
                            </div>
                        </div>

                        {/* Circle/Donut visual placeholder using CSS or SVG */}
                        <div className="relative w-48 h-48 mx-auto mt-6">
                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                {/* Base */}
                                <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                {/* Segments */}
                                <path className="text-indigo-600" strokeDasharray="50, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                <path className="text-emerald-400" strokeDasharray="30, 100" strokeDashoffset="-50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                {/* Center text if needed */}
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                                <span className="text-xs text-gray-500">Dog Food</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                                <span className="text-xs text-gray-500">Cat Food</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-gray-200"></span>
                                <span className="text-xs text-gray-500">Vitamins</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <IntegrationListV2 />
                </div>
            </div>
        </div>
    )
}

export default Dashboard