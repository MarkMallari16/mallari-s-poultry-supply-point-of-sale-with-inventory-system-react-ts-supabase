import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

interface ProtectedRouteProps {
    children: JSX.Element;
    allowedRole: "admin" | "cashier";
}

const ProtectedRoutes = ({ children, allowedRole }: ProtectedRouteProps) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen bg-white"></div>
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to={`/${user.role}`} replace />
    }
    return children;
}

export default ProtectedRoutes