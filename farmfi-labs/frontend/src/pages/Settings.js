import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [storageLimit, setStorageLimit] = useState(50);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Toggle Email Notifications
    const handleToggleEmailNotifications = () => {
        setEmailNotifications(!emailNotifications);
    };

    // Toggle Two-Factor Authentication
    const handleToggleTwoFactorAuth = () => {
        setTwoFactorAuth(!twoFactorAuth);
    };

    // Dark Mode Toggle
    const handleToggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Handle storage limit slider
    const handleStorageLimitChange = (e) => {
        setStorageLimit(e.target.value);
    };

    // Modal control for deleting the account
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleAccountDeletion = () => {
        // Logic to delete the account
        alert('Account Deleted');
        closeModal();
    };

    return (
        <div className={`settings ${isDarkMode ? 'dark-mode' : ''}`}>
            <header className="settings-header">
                <h1>Settings</h1>
                <p>Manage your account settings, preferences, and notifications.</p>
            </header>

            <section className="settings-content">
                {/* Account Settings */}
                <div className="settings-group">
                    <h2>Account Settings</h2>
                    <div className="settings-item">
                        <label>Email Notifications</label>
                        <div className="toggle-switch" onClick={handleToggleEmailNotifications}>
                            <input type="checkbox" checked={emailNotifications} readOnly />
                            <span className="slider"></span>
                        </div>
                    </div>

                    <div className="settings-item">
                        <label>Two-Factor Authentication</label>
                        <div className="toggle-switch" onClick={handleToggleTwoFactorAuth}>
                            <input type="checkbox" checked={twoFactorAuth} readOnly />
                            <span className="slider"></span>
                        </div>
                    </div>

                    <div className="settings-item">
                        <label>Storage Limit: {storageLimit}GB</label>
                        <input
                            type="range"
                            min="10"
                            max="200"
                            value={storageLimit}
                            onChange={handleStorageLimitChange}
                        />
                    </div>
                </div>

                {/* Appearance Settings */}
                <div className="settings-group">
                    <h2>Appearance Settings</h2>
                    <div className="settings-item">
                        <label>Dark Mode</label>
                        <div className="toggle-switch" onClick={handleToggleDarkMode}>
                            <input type="checkbox" checked={isDarkMode} readOnly />
                            <span className="slider"></span>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="settings-group danger-zone">
                    <h2>Danger Zone</h2>
                    <button className="delete-account-btn" onClick={openModal}>
                        Delete Account
                    </button>
                </div>
            </section>

            {/* Account Deletion Modal */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Delete Account</h2>
                        <p>Are you sure you want to permanently delete your account? This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="confirm-btn" onClick={handleAccountDeletion}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
