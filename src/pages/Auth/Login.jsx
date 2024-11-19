import React, {useState} from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                username,
                password,
            }, {
                withCredentials: true
            });
            if(response.status === 200){
                const { roles } = response.data;

                if(roles.includes("ADMIN")){
                    navigate("/admin/dashboard");
                }else if(roles.includes("EMPLOYEE")){
                    navigate("/employee/dashboard");
                }else if(roles.includes("USER")){
                    navigate("/user/dashboard");
                }
            }
        } catch (error){
            setError("Invalid username or password");
        }
    };
    return(
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-1">
                        <label htmlFor="username" className="block text-sm">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm text-center mt-2">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-center text-white bg-blue-500 rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Don’t have an account?{" "}
                    <Link to="/public" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Login;