// CreateUserPage.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/styles/CreateUserPage.css';

function CreateUserPage() {
    const [newUser, setNewUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        identityNumber: '',
        dateOfBirth: '',
        roles: ['USER'],
    });
    const [error, setError] = useState('');

    const handleCreateUser = async (e) => {
        e.preventDefault();
        // Validate that none of the fields are empty or contain only whitespace
        if (!newUser.username.trim() || !newUser.firstName.trim() || !newUser.lastName.trim() || !newUser.password.trim() || !newUser.identityNumber.trim() || !newUser.dateOfBirth.trim()) {
            setError('All fields are required and cannot be empty or contain only spaces. Please fill in all the information.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/admin/users', newUser, {
                withCredentials: true
            });
            alert('User created successfully');
            setNewUser({ username: '', firstName: '', lastName: '', password: '', identityNumber: '', dateOfBirth: '', roles: ['USER'] });
            setError('');
        } catch (error) {
            console.error("Error creating user", error);
            setError('Failed to create user. Please try again later.');
        }
    };

    return (
        <div className="create-user-page">
            <h2 className="text-3xl font-bold text-center mb-8 bank-title">Create User</h2>
            <form className="space-y-4" onSubmit={handleCreateUser}>
                <div>
                    <label className="block text-sm mb-1" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md bank-input"
                        placeholder="Enter username"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1" htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md bank-input"
                        placeholder="Enter first name"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1" htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md bank-input"
                        placeholder="Enter last name"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md bank-input"
                        placeholder="Enter password"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1" htmlFor="identityNumber">Identity Number</label>
                    <input
                        type="text"
                        id="identityNumber"
                        value={newUser.identityNumber}
                        onChange={(e) => setNewUser({ ...newUser, identityNumber: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md bank-input"
                        placeholder="Enter identity number"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1" htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        value={newUser.dateOfBirth}
                        onChange={(e) => setNewUser({ ...newUser, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-2 border rounded-md bank-input"
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1" htmlFor="roles">Role</label>
                    <select
                        id="roles"
                        value={newUser.roles[0]}
                        onChange={(e) => setNewUser({ ...newUser, roles: [e.target.value] })}
                        className="w-full px-4 py-2 border rounded-md bank-select"
                    >
                        <option value="USER">USER</option>
                        <option value="EMPLOYEE">EMPLOYEE</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition ease-in-out duration-300 bank-button">
                    Create User
                </button>
            </form>
        </div>
    );
}

export default CreateUserPage;


