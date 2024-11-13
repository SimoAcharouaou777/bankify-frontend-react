import React from "react";
import {Link} from "react-router-dom";

function Login() {
    return(
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form className="space-y-6">
                    <div className="space-y-1">
                        <label htmlFor="username" className="block text-sm">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-center text-white bg-blue-500 rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Don’t have an account?{" "}
                    <Link to="/" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Login;