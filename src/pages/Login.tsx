import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { loginUser } from "../services/api/login";
import { useNavigate } from "react-router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    //login user
    const handleLogin = async () => {
        const user = await loginUser(email, password);

        if (user) {
            login(user)
            navigate(`/${user.role}/dashboard`)
        } else {
            alert("Login failed.")
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <div className="bg-emerald-50 min-h-screen grid place-items-center">
            <div className="bg-white shadow-xl px-10 py-14 rounded-md w-full lg:w-1/4  ring-1 ring-inset ring-gray-200">

                <div className="flex flex-col justify-center items-center text-center">
                    <div className="bg-linear-to-r from-emerald-400 to-emerald-500 mb-4 rounded-md">
                        <span className="material-symbols-outlined p-4">
                            pets
                        </span>

                    </div>
                    <div>
                        <h2 className="text-xl font-medium">Mallari's Poultry Supply</h2>
                        <p>Pet Supplies</p>
                    </div>
                </div>
                <div className="mt-10">
                    <label htmlFor="username" className="font-medium">Email</label>
                    <input type="email" value={email} onChange={handleEmailChange} className="mt-1 input input-md w-full focus:outline-success" placeholder="Enter username" />
                </div>
                <div className="mt-4">
                    <label htmlFor="username" className="font-medium">Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange} className="mt-1 input input-md   w-full focus:outline-success" placeholder="Enter password" />
                </div>
                <div className="mt-4">
                    <button onClick={handleLogin} className="btn btn-md bg-linear-to-r from-emerald-400 to-emerald-500  w-full">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login