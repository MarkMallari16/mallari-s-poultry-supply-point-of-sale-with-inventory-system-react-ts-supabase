import { useAuth } from "../../hooks/useAuth"

const DashboardCashier = () => {
    const { logout } = useAuth();

    return (
        <div>
            <h1 className="text-4xl">Hello I'm cashier</h1>
        </div>
    )
}

export default DashboardCashier