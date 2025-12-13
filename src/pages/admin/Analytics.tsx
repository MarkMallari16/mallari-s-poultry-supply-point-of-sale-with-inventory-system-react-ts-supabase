
import BarChart from "../../components/charts/BarChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";
import { DollarSign, ShoppingBag, Package, TrendingUp } from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <span className="text-gray-500">Track and analyze your sales performance.</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue" 
          value="$12,345" 
          icon={<DollarSign className="w-6 h-6 text-green-500" />} 
          trend="+12%" 
        />
        <StatCard 
          title="Total Orders" 
          value="1,234" 
          icon={<ShoppingBag className="w-6 h-6 text-blue-500" />} 
          trend="+5%" 
        />
        <StatCard 
          title="Total Products" 
          value="456" 
          icon={<Package className="w-6 h-6 text-orange-500" />} 
          trend="+2%" 
        />
        <StatCard 
          title="Growth" 
          value="23%" 
          icon={<TrendingUp className="w-6 h-6 text-purple-500" />} 
          trend="+4%" 
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <div className="h-64">
            <LineChart />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
          <div className="h-64">
            <BarChart />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
          <div className="h-64">
            <PieChart />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Inventory Status</h2>
          <div className="h-64">
            <DoughnutChart />
          </div>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
      <span className="text-green-500 text-sm font-medium flex items-center mt-1">
        {trend} <span className="text-gray-400 ml-1">vs last month</span>
      </span>
    </div>
    <div className="p-3 bg-gray-50 rounded-full">
      {icon}
    </div>
  </div>
)

export default Analytics