import React from 'react';
import { Link } from 'react-router-dom';
import './Merchants.css'; // Assuming a CSS file for merchant-specific styling

const Merchants = () => {
  return (
    <div className="merchants-container">
      <header className="merchants-header">
        <h1>Merchant Dashboard</h1>
        <p>Manage your tokenized assets, trade commodities, and explore DeFi services.</p>
      </header>

      <section className="merchants-features">
        <div className="feature-item">
          <h3>Manage Your Assets</h3>
          <p>View and manage all your tokenized commodities in one place.</p>
          <Link to="/merchant-profile" className="cta-button">View Profile</Link>
        </div>

        <div className="feature-item">
          <h3>Trade Commodities</h3>
          <p>Buy and sell tokenized crops in the marketplace to grow your business.</p>
          <Link to="/marketplace" className="cta-button">Visit Marketplace</Link>
        </div>

        <div className="feature-item">
          <h3>Access DeFi Services</h3>
          <p>Participate in staking, lending, and yield farming to maximize your returns.</p>
          <Link to="/defi-dashboard" className="cta-button">Explore DeFi</Link>
        </div>

        <div className="feature-item">
          <h3>Participate in Governance</h3>
          <p>Contribute to the future of FarmFi Labs by voting on important proposals.</p>
          <Link to="/governance" className="cta-button">Join Governance</Link>
        </div>
      </section>

      <footer className="merchants-footer">
        <p>&copy; 2024 FarmFi Labs. Empowering merchants with blockchain technology.</p>
      </footer>
    </div>
  );
};

export default Merchants;
