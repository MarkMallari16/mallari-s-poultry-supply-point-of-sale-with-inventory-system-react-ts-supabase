import { Navigate } from "react-router";
import type { JSX } from "react";
import { useAuthStore } from "../../stores/useAuthStore";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRole: "admin" | "cashier";
}

const ProtectedRoutes = ({ children, allowedRole }: ProtectedRouteProps) => {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        return <Navigate to="/login" />
    }

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to={`/${user.role}`} replace />
    }
    
    return children;
}

export default ProtectedRoutes