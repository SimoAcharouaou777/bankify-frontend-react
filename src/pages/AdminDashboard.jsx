import React, { useState, useEffect } from 'react';
import axios from "axios";


function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        roles: ['USER'],
    });
    const [statusUpdate, setStatusUpdate] = useState({
        accountId: '',
        status: '',
    });

    const apiUrl = "http://localhost:8080/api/admin";

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const response = await axios.get('http://localhost:8080/api/admin/users',{
                    withCredentials: true
                });
                console.log(response.data);
                setUsers(response.data);
            }catch (error){
                console.error("Error fetching users", error);
            }
        };
        fetchUsers();
    }, []);


    // create new user
    const handleCreateUser = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/admin/users`, newUser, {
                withCredentials: true
            });
            setUsers([...users, response.data]);
            setNewUser({username: '', firstName: '', lastName: '', password: '', roles: ['USER'] });
        } catch (error) {
            console.error("Error creating user", error);
        }
    };

    const handleDeleteUser = async (id) => {
       try{
           await axios.delete(`${apiUrl}/users/${id}`,{
               withCredentials: true
           });
           setUsers(users.filter((user) => user.id !== id));
       }catch (error){
           console.error("Error deleting user" , error);
       }
    };

    const handleUpdateStatus = async () => {
        try{
            await axios.put(`${apiUrl}/accounts/${statusUpdate.accountId}/status`, null, {
                params: {
                    status: statusUpdate.status
                },
                withCredentials: true
            });
            setStatusUpdate({ accountId: '', status: '' });
            alert('Account status updated successfully');
        }catch (error){
            console.error("Error updating account status", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

            {/* User List */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-2 px-4">Username</th>
                        <th className="py-2 px-4">First Name</th>
                        <th className="py-2 px-4">Last Name</th>
                        <th className="py-2 px-4">Role</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="text-center border-b">
                            <td className="py-2 px-4">{user.username}</td>
                            <td className="py-2 px-4">{user.firstName}</td>
                            <td className="py-2 px-4">{user.lastName}</td>
                            <td className="py-2 px-4">{user.roles.map((role) => role.name).join(', ')}</td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Create User Form */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Create User</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Username</label>
                        <input
                            type="text"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">First Name</label>
                        <input
                            type="text"
                            value={newUser.firstName}
                            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Last Name</label>
                        <input
                            type="text"
                            value={newUser.lastName}
                            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Role</label>
                        <select
                            value={newUser.roles[0]}
                            onChange={(e) => setNewUser({ ...newUser, roles: [e.target.value] })}
                            className="w-full px-4 py-2 border rounded-md"
                        >
                            <option value="USER">USER</option>
                            <option value="EMPLOYEE">EMPLOYEE</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={handleCreateUser}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Create User
                    </button>
                </form>
            </div>

            {/* Update Account Status Form */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Update Account Status</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Account ID</label>
                        <input
                            type="text"
                            value={statusUpdate.accountId}
                            onChange={(e) => setStatusUpdate({ ...statusUpdate, accountId: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Status</label>
                        <input
                            type="text"
                            value={statusUpdate.status}
                            onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleUpdateStatus}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Update Status
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminDashboard;
