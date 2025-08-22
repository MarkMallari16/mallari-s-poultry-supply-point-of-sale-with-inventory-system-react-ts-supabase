
import { Box, ChartColumn, House, LogOut, Receipt, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router";
import { useAuthStore } from "../../stores/useAuthStore";

interface RoleProps {
  role: string;
}
const Sidebar = ({ role }: RoleProps) => {
  const user = useAuthStore((state) => state.user);
  const userRole = user?.role;
  const logout = useAuthStore((state) => state.logout);


  const navClass = ({ isActive }: any) => `flex items-center gap-2 py-2 ps-4 py-2 w-full rounded-md  font-medium ${isActive ? 'bg-emerald-100 text-emerald-800 ring-1 ring-inset ring-emerald-200' : 'hover:bg-gray-100 text-gray-500'}`
  const iconClass = "w-5 h-5 "
  const linkTextClass = "hidden md:block";
  return (
    <div className="h-screen flex flex-col justify-between pt-4">
      <div>
        <div className="pb-6 border-b border-gray-50">
          <div className="flex  items-center gap-3 px-3 lg-px-0 lg:ps-2 lg:pe-4">
            <div className="bg-linear-to-r from-emerald-400 to-emerald-500 rounded-md">
              <span className="material-symbols-outlined py-2 px-3">
                pets
              </span>
            </div>
            <div>
              <h1 className="text-md font-medium hidden md:block">Mallari's Poultry Supply</h1>
              <span className="text-sm text-gray-500  hidden md:block">POS system</span>
            </div>
          </div>
        </div>
        <div className="pt-4 flex flex-col gap-1 mx-2">
          {role === "admin" ?
            <>
              <NavLink to="/admin/dashboard" caseSensitive className={navClass}>
                <House className={iconClass} />
                <p className={linkTextClass}>Dashboard</p>
              </NavLink>
              <NavLink to="/admin/pos" caseSensitive className={navClass}>
                <ShoppingCart className={iconClass} />
                <p className={linkTextClass}>Point of Sale</p>
              </NavLink>
              <NavLink to="/admin/inventory" caseSensitive className={navClass}>
                <Box className={iconClass} />
                <p className={linkTextClass}>Inventory</p>
              </NavLink>
              <NavLink to="/admin/sales-history" caseSensitive className={navClass}>
                <Receipt className={iconClass} />
                <p className={linkTextClass}>Sales History</p>
              </NavLink>
              <NavLink to="/admin/analytics" caseSensitive className={navClass}>
                <ChartColumn className={iconClass} />
                <p className={linkTextClass}>Analytics</p>
              </NavLink>
              <NavLink to="/admin/users" caseSensitive className={navClass}>
                <User className={iconClass} />
                <p className={linkTextClass}>Users</p>
              </NavLink>
            </>
            :
            <>
              <NavLink to="/cashier/dashboard" className={navClass}>
                <House className={iconClass} />
                <p className={linkTextClass}>Dashboard</p>
              </NavLink>
              <NavLink to="/cashier/pos" className={navClass}>
                <ShoppingCart className={iconClass} />
                <p className={linkTextClass}>Point of Sale</p>
              </NavLink>
              <NavLink to="/cashier/sales-history" caseSensitive className={navClass}>
                <Receipt className={iconClass} />
                <p className={linkTextClass}>Sales History</p>
              </NavLink>
              <NavLink to="/cashier/analytics" caseSensitive className={navClass}>
                <ChartColumn className={iconClass} />
                <p className={linkTextClass}>Analytics</p>
              </NavLink>
            </>
          }
        </div>
      </div>

      <div className="sm:flex sm:justify-between items-center lg:gap-2 p-2 rounded-md lg:mx-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="avatar hidden md:block">
            <div className="w-10 h-10 rounded-full">
              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
            </div>
          </div>
          <div className="hidden md:block">
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