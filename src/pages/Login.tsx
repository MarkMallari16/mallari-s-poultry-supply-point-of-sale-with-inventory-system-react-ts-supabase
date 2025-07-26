const Login = () => {
    return (
        <div className="bg-base-300 min-h-screen grid place-items-center">
            <div className="bg-white px-8 py-10 rounded-md w-full lg:w-1/4  ring-1 ring-inset ring-gray-200">
                <div className="text-center">
                    <h1 className="text-4xl font-black">Logo Here</h1>
                    <p>Pet Supplies</p>
                </div>
                <div className="mt-10">
                    <label htmlFor="username" className="font-medium">Username</label>
                    <input type="text" className="mt-1 input w-full focus:outline-success" placeholder="Enter username" />
                </div>
                <div className="mt-4">
                    <label htmlFor="username" className="font-medium">Password</label>
                    <input type="password" className="mt-1 input  w-full focus:outline-success" placeholder="Enter password" />
                </div>
                <div className="mt-4">
                    <button className="btn btn-success w-full">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login