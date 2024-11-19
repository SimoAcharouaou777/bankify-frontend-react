import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from './pages/Admin/AdminDashboard';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import UserDashboard from './pages/User/UserDashboard';
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register';

function App() {
    return (
        <Router>
            <div className="min-h-screen">
                <Routes>
                    {/* Set the Register page as the default route */}
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin/*" element={<AdminDashboard />} />
                    <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
