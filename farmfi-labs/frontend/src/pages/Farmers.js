import React from 'react';
import { Link } from 'react-router-dom';
import './Farmers.css'; // Assuming a CSS file for farmer-specific styling

const Farmers = () => {
  return (
    <div className="farmers-container">
      <header className="farmers-header">
        <h1>Farmer Dashboard</h1>
        <p>Welcome to your personalized dashboard, where you can manage your crops, assets, and participate in decentralized finance opportunities.</p>
      </header>

      <section className="farmers-features">
        <div className="feature-item">
          <h3>Tokenize Your Crops</h3>
          <p>Convert your harvested crops into blockchain-backed tokens to trade, stake, and earn rewards.</p>
          <Link to="/tokenize-crops" className="cta-button">Tokenize Crops</Link>
        </div>

        <div className="feature-item">
          <h3>Manage Your Assets</h3>
          <p>View and manage all of your tokenized crops and other digital assets in one place.</p>
          <Link to="/farmer-profile" className="cta-button">View Profile</Link>
        </div>

        <div className="feature-item">
          <h3>Access DeFi Services</h3>
          <p>Stake your grain tokens, participate in lending, or yield farm to maximize your returns.</p>
          <Link to="/defi-dashboard" className="cta-button">Explore DeFi</Link>
        </div>

        <div className="feature-item">
          <h3>Participate in Governance</h3>
          <p>Have a say in the future of FarmFi Labs by voting on proposals and making your voice heard.</p>
          <Link to="/governance" className="cta-button">Join Governance</Link>
        </div>
      </section>

      <footer className="farmers-footer">
        <p>&copy; 2024 FarmFi Labs. Empowering farmers with blockchain technology.</p>
      </footer>
    </div>
  );
};

export default Farmers;
