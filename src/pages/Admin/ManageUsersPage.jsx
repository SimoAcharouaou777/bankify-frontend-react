// ManageUsersPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/ManageUsersPage.css';

function ManageUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/users', {
                    withCredentials: true
                });
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users", error);
                setError("Failed to fetch users. Please try again later.");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
                withCredentials: true
            });
            setUsers(users.filter(user => user.id !== id));
            alert('User deleted successfully');
        } catch (error) {
            console.error("Error deleting user", error);
            setError("Failed to delete user. Please try again later.");
        }
    };

    return (
        <div className="manage-users-page">
            <h2 className="text-3xl font-bold text-center mb-8 bank-title">Manage Users</h2>
            {loading ? (
                <p className="text-center text-xl text-white bank-text">Loading users...</p>
            ) : error ? (
                <p className="text-center text-red-500 bank-text">{error}</p>
            ) : (
                <div className="overflow-x-auto shadow-2xl rounded-lg">
                    <table className="min-w-full bg-dark-table text-white rounded-xl overflow-hidden">
                        <thead>
                        <tr className="bg-dark-header text-white">
                            <th className="py-4 px-6 border-b border-dark-border text-lg tracking-wider bank-header">Username</th>
                            <th className="py-4 px-6 border-b border-dark-border text-lg tracking-wider bank-header">First Name</th>
                            <th className="py-4 px-6 border-b border-dark-border text-lg tracking-wider bank-header">Last Name</th>
                            <th className="py-4 px-6 border-b border-dark-border text-lg tracking-wider bank-header">Role</th>
                            <th className="py-4 px-6 border-b border-dark-border text-lg tracking-wider bank-header">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="text-center border-b border-dark-border hover:bg-dark-hover transition ease-in-out duration-300">
                                <td className="py-4 px-6 font-semibold text-lg bank-text">{user.username}</td>
                                <td className="py-4 px-6 font-semibold text-lg bank-text">{user.firstName}</td>
                                <td className="py-4 px-6 font-semibold text-lg bank-text">{user.lastName}</td>
                                <td className="py-4 px-6 font-semibold text-lg bank-text">{user.roles.map(role => role.name).join(', ')}</td>
                                <td className="py-4 px-6">
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="bg-dark-button text-white px-4 py-1 rounded hover:bg-dark-button-hover transition ease-in-out duration-300 bank-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ManageUsersPage;
