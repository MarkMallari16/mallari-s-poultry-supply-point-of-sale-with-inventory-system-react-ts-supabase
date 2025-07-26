import { useState } from "react";
import { useAuth } from "../hooks/useAuth"

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //login user
    const handleLogin = async () => {
        await login(email, password)
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    return (
        <div className="bg-base-300 min-h-screen grid place-items-center">
            <div className="bg-white px-8 py-10 rounded-md w-full lg:w-1/4  ring-1 ring-inset ring-gray-200">
                <div className="text-center">
                    <h1 className="text-4xl font-black">Logo Here</h1>
                    <p>Pet Supplies</p>
                </div>
                <div className="mt-10">
                    <label htmlFor="username" className="font-medium">Email</label>
                    <input type="email" value={email} onChange={handleEmailChange} className="mt-1 input w-full focus:outline-success" placeholder="Enter username" />
                </div>
                <div className="mt-4">
                    <label htmlFor="username" className="font-medium">Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange} className="mt-1 input  w-full focus:outline-success" placeholder="Enter password" />
                </div>
                <div className="mt-4">
                    <button onClick={handleLogin} className="btn btn-success w-full">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login