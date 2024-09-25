import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        walletAddress: '',
    });

    const [identityProof, setIdentityProof] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleIdentityProofUpload = (e) => {
        setIdentityProof(e.target.files[0]);
    };

    const handleWalletConnect = () => {
        // Mock function for wallet connect (replace with actual logic)
        const mockWalletAddress = "0x1234567890abcdef1234567890abcdef12345678";
        setFormData({ ...formData, walletAddress: mockWalletAddress });
        alert("Wallet Connected: " + mockWalletAddress);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Basic form validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (!formData.walletAddress) {
            alert("Please connect your wallet.");
            setIsLoading(false);
            return;
        }

        if (!identityProof) {
            alert("Please upload a government-issued identity proof.");
            setIsLoading(false);
            return;
        }

        // Simulate registration process
        setTimeout(() => {
            console.log('Registration Successful:', formData, 'Identity Proof:', identityProof);
            setIsLoading(false);
            alert('Registration Successful!');
        }, 1500);
    };

    return (
        <div className="register-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleRegister}>
                {/* Name Input */}
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>

                {/* Email Input */}
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                    />
                </div>

                {/* Password Inputs */}
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Create a password"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        placeholder="Confirm your password"
                    />
                </div>

                {/* Role Selection */}
                <div className="input-group">
                    <label htmlFor="role">Select your role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="farmer">Farmer</option>
                        <option value="merchant">Merchant</option>
                    </select>
                </div>

                {/* Identity Proof Upload */}
                <div className="input-group">
                    <label htmlFor="identityProof">Upload Identity Proof</label>
                    <input
                        type="file"
                        id="identityProof"
                        name="identityProof"
                        accept="image/*,.pdf"
                        onChange={handleIdentityProofUpload}
                        required
                    />
                </div>

                {/* Wallet Connect */}
                <div className="input-group wallet-connect">
                    <label>Connect Wallet</label>
                    <button
                        type="button"
                        onClick={handleWalletConnect}
                        className="wallet-connect-button"
                        disabled={formData.walletAddress}
                    >
                        {formData.walletAddress ? "Wallet Connected" : "Connect Wallet"}
                    </button>
                    {formData.walletAddress && (
                        <p className="wallet-address">Wallet: {formData.walletAddress}</p>
                    )}
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="register-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {/* Footer */}
            <div className="register-footer">
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>
        </div>
    );
};

export default Register;
