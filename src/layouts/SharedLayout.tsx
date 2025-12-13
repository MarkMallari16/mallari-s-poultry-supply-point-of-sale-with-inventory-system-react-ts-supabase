import { useState } from "react"
import { Outlet } from "react-router"
import { useAuthStore } from "../stores/useAuthStore"
import Sidebar from "../components/navigation/Sidebar"
import { usePageTitle } from "../hooks/usePageTitle"
import { PanelLeftClose, PanelRightClose, Check, AlertTriangle, Info } from "lucide-react"
import { useSidebarStore } from "../stores/useSidebarStore"

type ShareLayoutProps = {
    role: "admin" | "cashier"
}

const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        title: "New Order Received",
        message: "Order #12345 has been placed",
        time: "2 mins ago",
        type: "success",
        read: false
    },
    {
        id: 2,
        title: "Low Stock Alert",
        message: "Dog Food - Premium is running low",
        time: "1 hour ago",
        type: "warning",
        read: false
    },
    {
        id: 3,
        title: "System Update",
        message: "System maintenance scheduled for tonight",
        time: "4 hours ago",
        type: "info",
        read: true
    }
];

const SharedLayout = ({ role }: ShareLayoutProps) => {


    const user = useAuthStore((state) => state.user);
    const pageTitle = usePageTitle();
    const { isSidebarOpen, toggleSidebar } = useSidebarStore();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    if (!user) {
        throw new Error("User not found");
    }

    return (
        <div className="min-h-screen flex bg-gray-50/50">
            {/**Sidebar */}
            <aside className={`min-h-screen fixed transition-all duration-300 z-50 top-0 left-0 ${isSidebarOpen ? "w-[240px]" : "w-[4.5rem]"} bg-white`}>
                <Sidebar role={role} />
            </aside>

            {/**Navigation Bar */}
            <div className={`flex-1 flex flex-col ${isSidebarOpen ? "md:ml-[240px]" : "ml-[4.5rem]"} transition-all ease-in-out duration-300 `}>
                <header className="flex items-center justify-between bg-white px-8 py-4 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button className="hidden lg:block cursor-pointer text-gray-500 hover:text-gray-700 transition-colors" onClick={toggleSidebar}>
                            {
                                isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelRightClose size={20} />
                            }
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>

                        {/* Search bar placeholder */}
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-400 ml-8 w-64 ring-1 ring-gray-100 focus-within:ring-emerald-500 focus-within:text-gray-600 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400" />
                            <span className="text-xs border border-gray-200 rounded px-1.5 py-0.5">⌘F</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="cursor-pointer relative text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationsOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-30"
                                        onClick={() => setIsNotificationsOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-40 overflow-hidden animation-fade-in origin-top-right">
                                        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                                            <button className="text-xs text-emerald-600 font-medium hover:text-emerald-700">
                                                Mark all read
                                            </button>
                                        </div>
                                        <div className="max-h-[400px] overflow-y-auto">
                                            {MOCK_NOTIFICATIONS.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-emerald-50/30' : ''}`}
                                                >
                                                    <div className="flex gap-3">
                                                        <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notification.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                                            notification.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                                                'bg-blue-100 text-blue-600'
                                                            }`}>
                                                            {notification.type === 'success' ? <Check size={14} /> :
                                                                notification.type === 'warning' ? <AlertTriangle size={14} /> :
                                                                    <Info size={14} />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                                                    {notification.title}
                                                                </p>
                                                                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                                                                    {notification.time}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-gray-500 line-clamp-2">
                                                                {notification.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-2 border-t border-gray-50 bg-gray-50/50 text-center">
                                            <button className="text-xs font-medium text-gray-500 hover:text-gray-900 py-1 w-full">
                                                View all notifications
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                            <div className="text-right hidden sm:block">
                                <h3 className="text-sm font-semibold text-gray-900 leading-none">{user.full_name}</h3>
                                <p className="text-xs text-gray-500 mt-1 capitalize">{user.role}</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                                {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </div>
                    </div>
                </header>
                {/*Content Here */}
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div >
    )
}

export default SharedLayout