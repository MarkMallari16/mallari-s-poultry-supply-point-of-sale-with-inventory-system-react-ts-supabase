import { MoveLeft, Rabbit } from "lucide-react"
import { useNavigate } from "react-router"


const NotFound = () => {
    const navigate = useNavigate();
    const backToHome = () => {
        navigate("/");
    }
    return (
        <div className="min-h-screen grid place-items-center text-center bg-emerald-50">
            <div>
                <Rabbit className="size-96" />
                <h1 className="text-7xl font-black">404</h1>
                <p className="text-gray-600 mt-2 max-w-md">
                    Looks like this pet ran off with the page you’re looking for. 🐾
                </p>
                <button onClick={backToHome} className="mt-2 btn bg-emerald-500 "><MoveLeft />Back to Home</button>
            </div>
        </div>
    )
}

export default NotFound