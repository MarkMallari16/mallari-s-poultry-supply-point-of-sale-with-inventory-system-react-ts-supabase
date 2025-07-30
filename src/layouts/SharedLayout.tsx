import { Outlet } from "react-router"
import { useAuthStore } from "../stores/useAuthStore"
import Sidebar from "../components/navigation/Sidebar"

type ShareLayoutProps = {
    role: "admin" | "cashier"
}

const SharedLayout = ({ role }: ShareLayoutProps) => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    if (!user) {
        throw new Error("User not found");
    }

    return (
        <div className="min-h-screen grid grid-cols-[250px_1fr] bg-gray-100 ">
            {/**Sidebar */}
            <Sidebar role={role} />
            {/**Navigation Bar */}
            <div>
                <header className="flex items-center justify-between border-b border-gray-300 bg-white p-4">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-medium">{user?.full_name}</h3>
                        <button onClick={logout} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>

                        </button>
                    </div>
                </header>

                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div >
    )
}

export default SharedLayout