import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Assuming a CSS file for sidebar-specific styling
import AuthService from '../../services/AuthService';

const Sidebar = () => {
  const user = AuthService.getCurrentUser();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>FarmFi Labs</h2>
        <p className="sidebar-welcome">Welcome, {user ? user.name : "Guest"}</p>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/marketplace">Marketplace</Link>
          </li>
          <li>
            <Link to="/defi-dashboard">DeFi Dashboard</Link>
          </li>
          {user && user.role === 'farmer' && (
            <>
              <li>
                <Link to="/farmer-dashboard">Farmer Dashboard</Link>
              </li>
              <li>
                <Link to="/tokenize-crops">Tokenize Crops</Link>
              </li>
            </>
          )}
          {user && user.role === 'merchant' && (
            <>
              <li>
                <Link to="/merchant-dashboard">Merchant Dashboard</Link>
              </li>
              <li>
                <Link to="/purchase-crops">Purchase Crops</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
