
import { Box, ChartColumn, House, Receipt, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router";

interface RoleProps {
  role: string;
}
const Sidebar = ({ role }: RoleProps) => {
  const navClass = ({ isActive }: any) => `flex items-center gap-2 py-2 ps-4 py-2 w-full rounded-md  font-medium ${isActive ? 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200' : 'hover:bg-gray-100 text-gray-500'}`
  const iconClass = "w-5 h-5 "
  return (
    <div className="pt-4 bg-white border-r border-gray-300">
      <div className="pb-6  border-b border-gray-50">
        <div className="flex items-center gap-3 ps-2 pe-4">
          <div className="bg-linear-to-r from-emerald-400 to-emerald-500 rounded-md">
            <span className="material-symbols-outlined py-2 px-3">
              pets
            </span>
          </div>
          <div>
            <h1 className="text-md font-medium">Mallari's Poultry Supply</h1>
            <span className="text-sm text-gray-500">POS system</span>
          </div>
        </div>
      </div>
      <div className="pt-4 flex flex-col gap-1 mx-2 ">
        {role === "admin" ?
          <>
            <NavLink to="/admin/dashboard" caseSensitive className={navClass}>
              <House className={iconClass} />
              Dashboard
            </NavLink>
            <NavLink to="/admin/pos" caseSensitive className={navClass}>
              <ShoppingCart className={iconClass} />
              Point of Sale
            </NavLink>
            <NavLink to="/admin/inventory" caseSensitive className={navClass}>
              <Box className={iconClass} />
              Inventory
            </NavLink>
            <NavLink to="/admin/sales-history" caseSensitive className={navClass}>
              <Receipt className={iconClass} />
              Sales History
            </NavLink>
            <NavLink to="/admin/analytics" caseSensitive className={navClass}>
              <ChartColumn className={iconClass} />
              Analytics
            </NavLink>
            <NavLink to="/admin/users" caseSensitive className={navClass}>
              <User className={iconClass} />
              Users
            </NavLink>

          </>
          :
          <>
            <NavLink to="/cashier/dashboard" className={navClass}>
              <House className={iconClass} />
              Dashboard
            </NavLink>
            <NavLink to="/cashier/pos" className={navClass}>
              <ShoppingCart className={iconClass} />
              Point of Sale
            </NavLink>
            <NavLink to="/cashier/sales-history" caseSensitive className={navClass}>
              <Receipt className={iconClass} />
              Sales History
            </NavLink>
            <NavLink to="/cashier/analytics" caseSensitive className={navClass}>
              <ChartColumn className={iconClass} />
              Analytics
            </NavLink>
          </>
        }
      </div>
    </div>
  )
}

export default Sidebar