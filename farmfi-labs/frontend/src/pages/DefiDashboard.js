import React from 'react';
import { Link } from 'react-router-dom';
import './DefiDashboard.css'; // Assuming a CSS file for DeFi dashboard-specific styling

const DefiDashboard = () => {
  return (
    <div className="defi-dashboard-container">
      <header className="defi-header">
        <h1>DeFi Dashboard</h1>
        <p>Unlock the power of Decentralized Finance for your farm and assets.</p>
      </header>

      <section className="defi-intro">
        <div className="defi-intro-text">
          <h2>Grow Your Assets with DeFi</h2>
          <p>
            At FarmFi Labs, we provide tailored DeFi solutions for farmers and merchants to stake their grain tokens,
            lend assets, and participate in yield farming. Our goal is to help you maximize the potential of your tokenized crops.
          </p>
        </div>
        <div className="defi-hero">
          <img
            src="/assets/images/defi-farming.jpg" // Ensure this image path exists
            alt="DeFi and farming"
            className="hero-image"
          />
        </div>
      </section>

      <section className="defi-services">
        <h2>Available DeFi Services</h2>
        <div className="services-grid">
          <div className="service-item">
            <h3>Staking</h3>
            <p>Stake your grain tokens to earn rewards and secure the network.</p>
            <Link to="/defi/staking" className="cta-button">Start Staking</Link>
          </div>

          <div className="service-item">
            <h3>Lending</h3>
            <p>Lend your assets to other farmers and merchants to earn interest.</p>
            <Link to="/defi/lending" className="cta-button">Lend Assets</Link>
          </div>

          <div className="service-item">
            <h3>Yield Farming</h3>
            <p>Participate in yield farming to maximize your returns with flexible DeFi opportunities.</p>
            <Link to="/defi/yieldfarming" className="cta-button">Start Yield Farming</Link>
          </div>
        </div>
      </section>

      <footer className="defi-footer">
        <p>&copy; 2024 FarmFi Labs. Helping farmers grow with blockchain and DeFi.</p>
      </footer>
    </div>
  );
};

export default DefiDashboard;
