import React, { useState } from 'react';

const PasswordModal = ({ isOpen, onClose, onConfirm }) => {
    const [password, setPassword] = useState('');

    const handleConfirm = () => {
        onConfirm(password);
        setPassword('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md z-60">
                <h2 className="text-lg font-bold mb-4">Confirm Account Deletion</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="border p-2 w-full mb-4"
                />

                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                    <button onClick={handleConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordModal;

