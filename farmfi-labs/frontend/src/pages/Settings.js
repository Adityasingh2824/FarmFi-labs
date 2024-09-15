// src/pages/Settings.js
import React, { useState, useContext } from 'react'; // Added useState to the import statement
import { ThemeContext } from '../context/ThemeContext'; // Import the ThemeContext
import './Settings.css';

const Settings = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const { theme, toggleTheme } = useContext(ThemeContext); // Use ThemeContext

    const handleToggleEmailNotifications = () => {
        setEmailNotifications(!emailNotifications);
    };

    // Function to handle the change of theme
    const handleThemeChange = (event) => {
        toggleTheme(event.target.value);
    };

    return (
        <div className="settings-page">
            <h1>Settings</h1>
            <div className="settings-section">
                <h2>Notification Preferences</h2>
                <label>
                    <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={handleToggleEmailNotifications}
                    />
                    Enable Email Notifications
                </label>
            </div>
            <div className="settings-section">
                <h2>Theme</h2>
                <select value={theme} onChange={handleThemeChange}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            {/* Add more settings as needed */}
        </div>
    );
};

export default Settings;
