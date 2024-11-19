// components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="w-64 bg-gray-800 text-white min-h-screen">
            <div className="p-4 text-2xl font-bold text-center">Admin Dashboard</div>
            <nav className="mt-10">
                <ul>
                    <li className="p-4 hover:bg-gray-600">
                        <Link to="/admin/manage-users" className="block">Manage Users</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-600">
                        <Link to="/admin/create-user" className="block">Create User</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-600">
                        <Link to="/admin/manage-bank-accounts" className="block">Manage Bank Accounts</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
