import React from 'react';
import {   Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import ManageUsersPage from './ManageUsersPage';
import CreateUserPage from './CreateUserPage';
import ManageBankAccountsPage from './ManageBankAccountsPage';

function AdminDashboard() {
    return (
        <div className="flex">
            <Sidebar /> {/* Sidebar with links to different admin sections */}
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                <Routes>
                    <Route path="/" element={<Navigate to="/admin/manage-users" />} />
                    <Route path="/manage-users" element={<ManageUsersPage />} />
                    <Route path="/create-user" element={<CreateUserPage />} />
                    <Route path="/manage-bank-accounts" element={<ManageBankAccountsPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminDashboard;
