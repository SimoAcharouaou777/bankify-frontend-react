import React, { useState, useEffect } from 'react';
import axios from "axios";


function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [bankAccounts, setBankAccounts] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        roles: ['USER'],
    });


    const apiUrl = "http://localhost:8080/api/admin";

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const response = await axios.get('http://localhost:8080/api/admin/users',{
                    withCredentials: true
                });

                setUsers(response.data);
            }catch (error){
                console.error("Error fetching users", error);
            }
        };

        const fetchBankAccounts = async () => {
            try{
                const response = await axios.get('http://localhost:8080/api/admin/accounts', {
                    withCredentials: true
                });
                setBankAccounts(response.data);
            }catch (error){
                console.error("Error fetching bank accounts", error);
            }
        };

        fetchUsers();
        fetchBankAccounts();
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

    const handleUpdateStatus = async (accountId,newStatus) => {
        try{
            await axios.put(`${apiUrl}/accounts/${accountId}/status`, null, {
                params: { status: newStatus },
                withCredentials: true
            });
            setBankAccounts(bankAccounts.map(account =>
                account.id === accountId ? { ...account,status: newStatus } : account
            ));
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
                            onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">First Name</label>
                        <input
                            type="text"
                            value={newUser.firstName}
                            onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Last Name</label>
                        <input
                            type="text"
                            value={newUser.lastName}
                            onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Role</label>
                        <select
                            value={newUser.roles[0]}
                            onChange={(e) => setNewUser({...newUser, roles: [e.target.value]})}
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

            {/* Bank account list */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Bank Accounts</h2>
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Account Number</th>
                        <th className="py-2 px-4">Username</th>
                        <th className="py-2 px-4">Balance</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bankAccounts.map((account) => (
                        <tr key={account.id} className="text-center border-b">
                            <td className="py-2 px-4">{account.id}</td>
                            <td className="py-2 px-4">{account.accountNumber}</td>
                            <td className="py-2 px-4">{account.user.username}</td>
                            <td className="py-2 px-4">{account.balance} DH</td>
                            <td className="py-2 px-4">{account.status}</td>
                            <td className="py-2 px-4">
                                <select
                                    value={account.status}
                                    onChange={(e) => handleUpdateStatus(account.id, e.target.value)}
                                    className="w-full px-2 py-1 border rounded-md"
                                >
                                    <option value="ACTIVE">Active</option>
                                    <option value="SUSPENDED">Suspended</option>
                                    <option value="BLOCKED">Blocked</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
