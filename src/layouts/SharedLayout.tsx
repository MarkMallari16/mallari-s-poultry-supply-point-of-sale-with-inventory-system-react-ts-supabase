import { NavLink, Outlet } from "react-router"
import { useAuthStore } from "../stores/useAuthStore"

type ShareLayoutProps = {
    role: "admin" | "cashier"
}

const SharedLayout = ({ role }: ShareLayoutProps) => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    if (!user) {
        throw new Error("User not found");
    }

    const navClass = ({ isActive }: any) => `py-2 w-full rounded-md  font-medium ${isActive ? 'bg-emerald-500 text-white' : 'hover:bg-gray-200 text-gray-500'}`

    return (
        <div className="min-h-screen container mx-auto ">
            <header className="pt-2 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Mallari's Poultry Supply</h1>
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-medium">{user?.full_name}</h3>
                    <button onClick={logout} className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>

                    </button>
                </div>
            </header>
            <div className="mt-10 mb-2 flex justify-between items-center text-center gap-2 p-1 bg-base-200 rounded-md">
                {role === "admin" ?
                    <>
                        <NavLink to="/admin/dashboard" caseSensitive className={navClass}>Dashboard</NavLink>
                        <NavLink to="/admin/pos" caseSensitive className={navClass}>Point of Sale</NavLink>
                        <NavLink to="/admin/inventory" caseSensitive className={navClass}>Inventory</NavLink>
                        <NavLink to="/admin/sales-history" caseSensitive className={navClass}>Sales History</NavLink>
                        <NavLink to="/admin/analytics" caseSensitive className={navClass}>Analytics</NavLink>
                        <NavLink to="/admin/users" caseSensitive className={navClass}>Users</NavLink>

                    </>
                    :
                    <>
                        <NavLink to="/cashier/dashboard" className={navClass}>Dashboard</NavLink>
                        <NavLink to="/cashier/pos" className={navClass}>Point of Sale</NavLink>
                        <NavLink to="/cashier/sales-history" className={navClass}>Sales History</NavLink>
                        <NavLink to="/cashier/analytics" className={navClass}>Analytics</NavLink>
                    </>
                }
            </div>
            <main>
                <Outlet />
            </main>
        </div >
    )
}

export default SharedLayout