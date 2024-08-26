import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming a CSS file for home-specific styling

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to FarmFi Labs</h1>
        <p>Empowering Agriculture with Blockchain</p>
      </header>

      <section className="home-intro">
        <div className="home-hero">
          <img
            src="/assets/images/farm-hero.jpg" // Ensure this image path exists
            alt="Farm and crops"
            className="hero-image"
          />
        </div>
        <div className="home-intro-text">
          <h2>Revolutionizing Agriculture</h2>
          <p>
            At FarmFi Labs, we harness the power of blockchain technology to tokenize agricultural commodities,
            enabling farmers and merchants to access decentralized finance (DeFi), trade their tokenized crops, and participate in governance.
          </p>
          <Link to="/marketplace" className="cta-button">
            Explore the Marketplace
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Our Key Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Marketplace</h3>
            <p>
              Trade tokenized crops seamlessly in our decentralized marketplace. Buy and sell grains backed by real-world assets.
            </p>
            <Link to="/marketplace" className="feature-link">Visit Marketplace</Link>
          </div>

          <div className="feature-item">
            <h3>Tokenization</h3>
            <p>
              Farmers can convert their crops into blockchain-backed tokens, unlocking liquidity and financial opportunities.
            </p>
            <Link to="/tokenize-crops" className="feature-link">Tokenize Crops</Link>
          </div>

          <div className="feature-item">
            <h3>DeFi for Agriculture</h3>
            <p>
              Access DeFi solutions tailored to agriculture, including staking, lending, and yield farming to grow your assets.
            </p>
            <Link to="/defi-dashboard" className="feature-link">Explore DeFi</Link>
          </div>

          <div className="feature-item">
            <h3>Governance</h3>
            <p>
              Participate in shaping the future of FarmFi Labs by voting on proposals and contributing to protocol governance.
            </p>
            <Link to="/governance" className="feature-link">Join Governance</Link>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2024 FarmFi Labs. Growing the future of agriculture.</p>
      </footer>
    </div>
  );
};

export default Home;
