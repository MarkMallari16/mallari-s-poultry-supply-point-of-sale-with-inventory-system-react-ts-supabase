import { useAuth } from "../../hooks/useAuth"

const DashboardCashier = () => {
    const { logout } = useAuth();
    return (
        <div>
            DashboardCashier
            <button className="btn btn-error" onClick={logout}>Logout</button>
        </div>
    )
}

export default DashboardCashier