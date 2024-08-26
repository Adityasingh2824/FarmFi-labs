import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import './Auth.css'; // Assuming there is a shared CSS file for Auth components

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      await AuthService.login(email, password);
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome Back to FarmFi Labs</h2>
        <p className="subtitle">Empowering Agriculture through Blockchain</p>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="auth-links">
          <a href="/forgot-password">Forgot your password?</a>
          <p>Don’t have an account? <a href="/register">Register here</a></p>
        </div>
      </div>
      <div className="login-image">
        <img src="/assets/images/farm-background.jpg" alt="Farm" />
      </div>
    </div>
  );
};

export default Login;
