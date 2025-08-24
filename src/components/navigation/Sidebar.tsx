
import { Box, ChartColumn, House, LogOut, Receipt, ShoppingCart, User } from "lucide-react";
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

  const navClass = ({ isActive }: any) => `flex items-center gap-2 py-2 ps-4 w-full rounded-md font-medium ${isActive ? 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200' : 'hover:bg-gray-100 text-gray-500'} transition-all ease-in-out duration-300`
  const iconClass = "w-5 h-5 "
  const sidebarTextClass = `${isSidebarOpen ?
    "opacity-100 w-auto translate-x-0 transition-all duration-300 ease-in-out"
    : "opacity-0  h-0 w-0 overflow-hidden -translate-x-2 transition-all duration-300 ease-in-out"}
    text-nowrap`;

  return (
    <div className="h-screen flex flex-col justify-between pt-4 transition-all ease-in-out duration-300">
      <div>
        <div className="pb-4 border-b border-gray-50">
          <div className={`flex items-center gap-2 px-3`}>
            <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-md">
              <span className="material-symbols-outlined py-2 px-3">
                pets
              </span>
            </div>
            <div className={`${isSidebarOpen ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 h-0 overflow-hidden -translate-x-2"} transition-all duration-300 delay-100`}>
              <h1 className={`text-md font-semibold transition-all duration-300 text-nowrap`}>Mallari's Poultry Supply</h1>
              <span className="text-sm text-gray-500 text-nowrap">POS system</span>
            </div>
          </div>
        </div>
        <div className="pt-4 flex flex-col gap-1 mx-2">
          {role === "admin" ?
            <>
              <NavLink to="/admin/dashboard" caseSensitive className={navClass}>
                <House className={iconClass} />
                <p className={sidebarTextClass}>Dashboard</p>
              </NavLink>
              <NavLink to="/admin/pos" caseSensitive className={navClass}>
                <ShoppingCart className={iconClass} />
                <p className={sidebarTextClass}>Point of Sale</p>
              </NavLink>
              <NavLink to="/admin/inventory" caseSensitive className={navClass}>
                <Box className={iconClass} />
                <p className={sidebarTextClass}>Inventory</p>
              </NavLink>
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
            </>
            :
            <>
              <NavLink to="/cashier/dashboard" className={navClass}>
                <House className={iconClass} />
                <p className={sidebarTextClass}>Dashboard</p>
              </NavLink>
              <NavLink to="/cashier/pos" className={navClass}>
                <ShoppingCart className={iconClass} />
                <p className={sidebarTextClass}>Point of Sale</p>
              </NavLink>
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
      </div>

      <div className={`${isSidebarOpen ? "mx-2 gap-2 justify-between " : "-mx-1"} flex items-center p-2 rounded-md mb-4 transition-all duration-300 text-nowrap`}>
        <div className="flex items-center gap-2">
          <div className={`${sidebarTextClass} avatar transition-all duration-300`}>
            <div className="w-10 h-10 rounded-full">
              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
            </div>
          </div>
          <div className={`${sidebarTextClass} transition-all duration-300`}>
            <h2 className="font-medium">{user?.full_name}</h2>
            <p className="text-gray-600">{userRole}</p>
          </div>
        </div>
        <div>
          <button onClick={logout} className="btn bg-base-200 btn-ghost border">
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar