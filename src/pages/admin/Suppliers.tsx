import { Truck, Plus, Filter } from "lucide-react";

const Suppliers = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Truck className="text-emerald-500" />
                        Supplier Management
                    </h1>
                    <p className="text-gray-500">Manage your product suppliers and orders.</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-ghost border border-gray-200">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="btn bg-emerald-500 hover:bg-emerald-600 text-white border-none flex items-center gap-2">
                        <Plus size={18} />
                        Add Supplier
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 text-center text-gray-400 py-12">
                    <Truck size={48} className="mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-medium text-gray-900">No Suppliers Found</h3>
                    <p>Get started by adding your first supplier.</p>
                </div>
            </div>
        </div>
    );
};

export default Suppliers;
