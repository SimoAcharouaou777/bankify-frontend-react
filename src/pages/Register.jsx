import React, {useState} from "react";
import {Link} from "react-router-dom";

function Register(){
    const [formData,setFormData] = useState({
        username : "",
        password : "",
    });
    const [message , setMessage] = useState("");
    const [isSuccess , setIsSuccess] = useState(false);
    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData({
            ...formData,
            [id] : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if(response.ok){
                const data = await response.json();
                setMessage(data.message);
                setIsSuccess(true);
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || "An error occurred during registration");
                setIsSuccess(false);
            }
        }catch (error){
            console.error("Error: " , error);
            setMessage("Failed to connect to the server");
            setIsSuccess(false);
        }
    };
    return(
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
                <h1 className="text-2xl font-bold text-center">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label htmlFor="username" className="block text-sm">Username</label>
                        <input type="text" id="username" className="w-full px-4 py-2 border rounded-md" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm">Password</label>
                        <input type="password" id="password" className="w-full px-4 py-2 border rounded-md" value={formData.password} onChange={handleChange} />
                    </div>
                    <button type="submit" className="w-full py-2 font-semibold text-center text-white bg-blue-500 rounded-md hover:bg-blue-700">Register</button>
                </form>
                {message && (
                    <p className={`text-center mt-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}
                       >{message}</p>
                )}
                <p className="text-center text-sm mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;