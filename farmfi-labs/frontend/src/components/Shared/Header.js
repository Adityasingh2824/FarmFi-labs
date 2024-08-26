import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import './Header.css'; // Assuming a CSS file for header-specific styling

const Header = () => {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="/assets/images/logo.png" alt="FarmFi Labs Logo" className="logo-image" />
          <span className="logo-text">FarmFi Labs</span>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/defi-dashboard">DeFi Dashboard</Link>
          {user && user.role === 'farmer' && <Link to="/farmer-dashboard">Farmer Dashboard</Link>}
          {user && user.role === 'merchant' && <Link to="/merchant-dashboard">Merchant Dashboard</Link>}
        </nav>

        {/* User Profile / Login Links */}
        <div className="auth-links">
          {user ? (
            <>
              <span className="welcome-message">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
