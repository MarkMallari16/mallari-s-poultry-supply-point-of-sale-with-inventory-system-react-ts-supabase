import { Outlet } from "react-router"
import { useAuthStore } from "../stores/useAuthStore"
import Sidebar from "../components/navigation/Sidebar"
import { usePageTitle } from "../hooks/usePageTitle"

type ShareLayoutProps = {
    role: "admin" | "cashier"
}

const SharedLayout = ({ role }: ShareLayoutProps) => {
    const user = useAuthStore((state) => state.user);
    const pageTitle = usePageTitle();

    if (!user) {
        throw new Error("User not found");
    }

    return (
        <div className="min-h-screen grid grid-cols-[4.5rem_1fr] sm:grid-cols-[200px_1fr] md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] bg-gray-100">
            {/**Sidebar */}
            <Sidebar role={role} />
            {/**Navigation Bar */}
            <div>
                <header className="flex items-center justify-between border-b border-gray-300 bg-white p-4">
                    <h1 className="text-2xl font-bold">{pageTitle}</h1>
                    <div className="flex items-center gap-2">
                        <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                            </div>
                        </div>
                        <h3 className="text-lg  text-gray-600 ">{user?.role}</h3>
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