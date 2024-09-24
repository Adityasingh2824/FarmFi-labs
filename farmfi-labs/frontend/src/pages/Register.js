import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(''); // For Farmer or Merchant
    const [identityProof, setIdentityProof] = useState(null); // File input for identity proof
    const [walletAddress, setWalletAddress] = useState(''); // Wallet connect state

    const handleRegister = (event) => {
        event.preventDefault();
        // Add registration logic here
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!walletAddress) {
            alert("Please connect your wallet.");
            return;
        }

        if (!identityProof) {
            alert("Please upload your government-issued identity proof.");
            return;
        }

        console.log('Name:', name, 'Email:', email, 'Password:', password, 'Role:', role, 'Identity Proof:', identityProof, 'Wallet Address:', walletAddress);
    };

    const handleWalletConnect = () => {
        // Mock function for wallet connect (e.g., via MetaMask or WalletConnect)
        const mockWalletAddress = "0x1234567890abcdef1234567890abcdef12345678"; // Replace with real wallet connect logic
        setWalletAddress(mockWalletAddress);
        alert("Wallet Connected: " + mockWalletAddress);
    };

    const handleIdentityProofUpload = (event) => {
        setIdentityProof(event.target.files[0]);
    };

    return (
        <div className="register-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleRegister}>
                {/* Name Field */}
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                
                {/* Email Field */}
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>

                {/* Password Fields */}
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>

                {/* Role Selection: Farmer or Merchant */}
                <div className="input-group">
                    <label htmlFor="role">You are a:</label>
                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Select Role</option>
                        <option value="farmer">Farmer</option>
                        <option value="merchant">Merchant</option>
                    </select>
                </div>

                {/* Identity Proof Upload */}
                <div className="input-group">
                    <label htmlFor="identityProof">Upload Government-issued Identity Proof</label>
                    <input 
                        type="file" 
                        id="identityProof" 
                        onChange={handleIdentityProofUpload} 
                        accept="image/*,.pdf" 
                        required 
                    />
                </div>

                {/* Wallet Connect Button */}
                <div className="input-group">
                    <label htmlFor="wallet">Connect Wallet</label>
                    <button type="button" onClick={handleWalletConnect} className="wallet-connect-button">
                        {walletAddress ? "Wallet Connected" : "Connect Wallet"}
                    </button>
                    {walletAddress && <p>Wallet Address: {walletAddress}</p>}
                </div>

                {/* Register Button */}
                <button type="submit" className="register-button">Register</button>
            </form>
            <div className="register-footer">
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>
        </div>
    );
};

export default Register;
