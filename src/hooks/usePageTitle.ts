import { useLocation } from "react-router"
import { useAuthStore } from "../stores/useAuthStore";

export const usePageTitle = () => {
    const location = useLocation();
    const { pathname } = location;
    const user = useAuthStore((state) => state.user);
    const role = user?.role;

    const commonTitles: Record<string, string> = {
        "/dashboard": "Dashboard",
        "/pos": "POS",
        "/analytics": "Analytics",
        "/sales-history": "Sales History"
    }

    const adminTitles: Record<string, string> = {
        "/inventory": "Inventory",
        "/users": "Users"
    }

    const basePath = `/${role}`;
    const subPath = pathname.replace(basePath, "");

    const titles = role === "admin" ? { ...commonTitles, ...adminTitles } : commonTitles

    return titles[subPath] || "Page";
}