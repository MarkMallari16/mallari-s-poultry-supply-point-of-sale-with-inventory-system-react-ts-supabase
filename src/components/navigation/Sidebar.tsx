import { Box, ChartColumn, House, LogOut, Receipt, ShoppingCart, Tags, User, Warehouse, Truck, Settings, Shield, CircleHelp } from "lucide-react";
import { NavLink } from "react-router";
import { useAuthStore } from "../../stores/useAuthStore";
import { useSidebarStore } from "../../stores/useSidebarStore";

interface RoleProps {
  role: string;
}
const Sidebar = ({ role }: RoleProps) => {
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role;
  const logout = useAuthStore((state) => state.logout);
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  const navClass = ({ isActive }: any) => `flex items-center gap-3 py-3 px-4 w-full rounded-xl font-medium text-[13px] transition-all ease-in-out duration-200 ${isActive ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`
  const iconClass = "w-5 h-5 flex-shrink-0"
  const sidebarTextClass = `${isSidebarOpen ?
    "opacity-100 w-auto translate-x-0 transition-opacity duration-300 ease-in-out"
    : "opacity-0 w-0 overflow-hidden -translate-x-2"}
    text-nowrap`;

  const groupLabelClass = `text-[10px] uppercase font-bold text-gray-400 tracking-wider px-4 mb-2 mt-6 ${isSidebarOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300 whitespace-nowrap overflow-hidden`;

  return (
    <div className="h-screen flex flex-col justify-between py-6 transition-all ease-in-out duration-300 bg-white border-r border-gray-100">
      <div className="flex flex-col h-full overflow-hidden">
        {/* Brand Header */}
        <div className="px-5 mb-2">
          <div className={`flex items-center gap-3`}>
            <div className="bg-gradient-to-r  rounded-xl p-2 bg-emerald-600">
              <h1 className="text-2xl text-white font-black">M</h1>
            </div>
            <div className={`${isSidebarOpen ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 h-0 overflow-hidden -translate-x-2"} transition-all duration-300`}>
              <h1 className="font-bold text-gray-800 text-base leading-tight">Mallari's Poultry</h1>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Supply POS</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-0.5">
          {role === "admin" ?
            <>
              {/* Group: General */}
              <p className={groupLabelClass}>General</p>
              <NavLink to="/admin/dashboard" caseSensitive className={navClass}>
                <House className={iconClass} />
                <p className={sidebarTextClass}>Dashboard</p>
              </NavLink>
              <NavLink to="/admin/pos" caseSensitive className={navClass}>
                <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 -960 960 960" fill="currentColor"><path d="M280-640q-33 0-56.5-23.5T200-720v-80q0-33 23.5-56.5T280-880h400q33 0 56.5 23.5T760-800v80q0 33-23.5 56.5T680-640H280Zm0-80h400v-80H280v80ZM160-80q-33 0-56.5-23.5T80-160v-40h800v40q0 33-23.5 56.5T800-80H160ZM80-240l139-313q10-22 30-34.5t43-12.5h376q23 0 43 12.5t30 34.5l139 313H80Zm260-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Z" /></svg>
                <p className={sidebarTextClass}>POS Terminal</p>
              </NavLink>

              {/* Group: Inventory Management */}
              <p className={groupLabelClass}>Inventory Management</p>
              <NavLink to="/admin/category" caseSensitive className={navClass}>
                <Tags className={iconClass} />
                <p className={sidebarTextClass}>Category</p>
              </NavLink>
              <NavLink to="/admin/products" caseSensitive className={navClass}>
                <Box className={iconClass} />
                <p className={sidebarTextClass}>Products</p>
              </NavLink>
              <NavLink to="/admin/inventory" caseSensitive className={navClass}>
                <Warehouse className={iconClass} />
                <p className={sidebarTextClass}>Inventory</p>
              </NavLink>
              <NavLink to="/admin/suppliers" caseSensitive className={navClass}>
                <Truck className={iconClass} />
                <p className={sidebarTextClass}>Suppliers</p>
              </NavLink>

              {/* Group: Reports & Insights */}
              <p className={groupLabelClass}>Reports & Insights</p>
              <NavLink to="/admin/sales-history" caseSensitive className={navClass}>
                <Receipt className={iconClass} />
                <p className={sidebarTextClass}>Sales History</p>
              </NavLink>
              <NavLink to="/admin/analytics" caseSensitive className={navClass}>
                <ChartColumn className={iconClass} />
                <p className={sidebarTextClass}>Analytics</p>
              </NavLink>
              <NavLink to="/admin/users" caseSensitive className={navClass}>
                <User className={iconClass} />
                <p className={sidebarTextClass}>Users</p>
              </NavLink>

              {/* Group: Support */}
              <p className={groupLabelClass}>Support</p>
              <button className={`${navClass({ isActive: false })} w-full text-left`}>
                <Settings className={iconClass} />
                <p className={sidebarTextClass}>Settings</p>
              </button>
              <button className={`${navClass({ isActive: false })} w-full text-left`}>
                <Shield className={iconClass} />
                <p className={sidebarTextClass}>Security</p>
              </button>
              <button className={`${navClass({ isActive: false })} w-full text-left`}>
                <CircleHelp className={iconClass} />
                <p className={sidebarTextClass}>Help Center</p>
              </button>
            </>
            :
            <>
              <p className={groupLabelClass}>General</p>
              <NavLink to="/cashier/dashboard" className={navClass}>
                <House className={iconClass} />
                <p className={sidebarTextClass}>Dashboard</p>
              </NavLink>
              <NavLink to="/cashier/pos" className={navClass}>
                <ShoppingCart className={iconClass} />
                <p className={sidebarTextClass}>POS Terminal</p>
              </NavLink>
              <p className={groupLabelClass}>Reports</p>
              <NavLink to="/cashier/sales-history" caseSensitive className={navClass}>
                <Receipt className={iconClass} />
                <p className={sidebarTextClass}>Sales History</p>
              </NavLink>
              <NavLink to="/cashier/analytics" caseSensitive className={navClass}>
                <ChartColumn className={iconClass} />
                <p className={sidebarTextClass}>Analytics</p>
              </NavLink>
            </>
          }
        </div>

        {/* Logout Section */}
        <div className="px-3 mt-auto">
          <button onClick={logout} className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200 group">
            <LogOut className={`${iconClass} group-hover:text-red-500`} />
            <span className={`${sidebarTextClass} font-medium`}>Logout</span>
          </button>
        </div>
      </div >
    </div >
  )
}

export default Sidebar