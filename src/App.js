import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login'
import Register from './pages/Register';

function App() {
    return (
        <Router>
            <div className="min-h-screen">
                <Routes>
                    {/* Set the Register page as the default route */}
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
