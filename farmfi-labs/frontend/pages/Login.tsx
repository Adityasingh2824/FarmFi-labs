import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        // Simulate login process (API call or authentication logic)
        console.log('Email:', email, 'Password:', password);

        // Clear error and navigate to dashboard if login is successful
        setError('');
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <h2>Welcome to FarmFi Labs</h2>
            <p>Log in to access your dashboard and manage your farm efficiently.</p>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder="Enter your email"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <div className="login-footer">
                <Link to="/forgot-password" className="login-link">Forgot Password?</Link>
                <span> | </span>
                <Link to="/register" className="login-link">Create an Account</Link>
            </div>
        </div>
    );
};

export default Login;