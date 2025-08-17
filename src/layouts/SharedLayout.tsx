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
        <div className="min-h-screen flex bg-gray-100">
            {/**Sidebar */}
            <aside className="sm:fixed top-0 left-0 h-screen w-[4.5rem] md:w-[240px] lg:w-[280px] xl:w-[320px] bg-white border-r border-gray-300">
                <Sidebar role={role} />
            </aside>

            {/**Navigation Bar */}
            <div className="flex-1 sm:ml-[4.5rem] md:ml-[240px] lg:ml-[280px] xl:ml-[320px]">
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
                {/*Content Here */}
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div >
    )
}

export default SharedLayout