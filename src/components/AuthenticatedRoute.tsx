import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth"

const AuthenticatedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>
    }
    if (!user) return <Navigate to="/login" replace />

    return children
}

export default AuthenticatedRoute