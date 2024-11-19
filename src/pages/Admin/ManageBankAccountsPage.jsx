import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/ManageBankAccountsPage.css';

function ManageBankAccountsPage() {
    const [bankAccounts, setBankAccounts] = useState([]);

    useEffect(() => {
        const fetchBankAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/accounts', {
                    withCredentials: true
                });
                setBankAccounts(response.data);
            } catch (error) {
                console.error("Error fetching bank accounts", error);
            }
        };

        fetchBankAccounts();
    }, []);

    const handleUpdateStatus = async (accountId, newStatus) => {
        try {
            await axios.put(`http://localhost:8080/api/admin/accounts/${accountId}/status`, null, {
                params: { status: newStatus },
                withCredentials: true
            });
            setBankAccounts(bankAccounts.map(account =>
                account.id === accountId ? { ...account, status: newStatus } : account
            ));
            alert('Account status updated successfully');
        } catch (error) {
            console.error("Error updating account status", error);
        }
    };

    return (
        <div className="manage-accounts-page">
            <h2 className="text-3xl font-bold text-center mb-8 bank-title">Manage Bank Accounts</h2>
            {bankAccounts.length === 0 ? (
                <p className="text-center text-xl text-white bank-text">No bank accounts available.</p>
            ) : (
                <div className="overflow-x-auto shadow-2xl rounded-lg">
                    <table className="min-w-full bg-dark-table text-white rounded-xl overflow-hidden">
                        <thead>
                        <tr className="bg-dark-header text-white">
                            <th className="py-4 px-6 border-b border-dark-border text-lg tracking-wider bank-header">ID</th>
                            <th className="py-4 px-6 border-b border-dark-border text-lg tracking-wider bank-header">Account Number</th>
                            <th className="py-4 px-6 border-b border-dark-border text-lg tracking-wider bank-header">Username</th>
                            <th className="py-4 px-6 border-b border-dark-border text-lg tracking-wider bank-header">Balance</th>
                            <th className="py-4 px-6 border-b border-dark-border text-lg tracking-wider bank-header">Status</th>
                            <th className="py-4 px-6 border-b border-dark-border text-lg tracking-wider bank-header">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bankAccounts.map((account) => (
                            <tr key={account.id} className="text-center border-b border-dark-border hover:bg-dark-hover transition ease-in-out duration-300">
                                <td className="py-4 px-6 font-semibold text-lg bank-text">{account.id}</td>
                                <td className="py-4 px-6 font-semibold text-lg bank-text">{account.accountNumber}</td>
                                <td className="py-4 px-6 font-semibold text-lg bank-text">{account.user.username}</td>
                                <td className="py-4 px-6 font-semibold text-lg bank-text">{account.balance} DH</td>
                                <td className="py-4 px-6 font-semibold text-lg bank-text">{account.status}</td>
                                <td className="py-4 px-6">
                                    <select
                                        value={account.status}
                                        onChange={(e) => handleUpdateStatus(account.id, e.target.value)}
                                        className="w-full px-3 py-2 border border-dark-border rounded-lg bg-dark-input text-white focus:outline-none focus:ring-2 focus:ring-blue-400 bank-select"
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
            )}
        </div>
    );
}

export default ManageBankAccountsPage;