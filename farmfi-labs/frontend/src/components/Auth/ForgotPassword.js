import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import './Auth.css'; // Shared styling for the authentication components

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      await AuthService.forgotPassword(email);
      setSuccessMessage('Password reset instructions have been sent to your email.');
    } catch (error) {
      setErrorMessage('Failed to send password reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2>Reset Your Password</h2>
        <p className="subtitle">Enter your email address and we'll send you a link to reset your password.</p>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="reset-btn" disabled={isLoading}>
            {isLoading ? 'Sending Instructions...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="auth-links">
          <p>Remember your password? <a href="/login">Login here</a></p>
        </div>
      </div>
      <div className="forgot-password-image">
        <img src="/assets/images/farm-background.jpg" alt="Farm" />
      </div>
    </div>
  );
};

export default ForgotPassword;
