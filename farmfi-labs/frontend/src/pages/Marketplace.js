import React, { useEffect, useState } from 'react';
import MarketplaceService from '../services/MarketplaceService';
import './Marketplace.css'; // Assuming a CSS file for marketplace-specific styling

const Marketplace = () => {
  const [grainTokens, setGrainTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrainTokens = async () => {
      try {
        const tokens = await MarketplaceService.getAvailableGrainTokens();
        setGrainTokens(tokens);
      } catch (error) {
        console.error('Failed to fetch grain tokens', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGrainTokens();
  }, []);

  return (
    <div className="marketplace-container">
      <header className="marketplace-header">
        <h1>Marketplace</h1>
        <p>Buy and sell tokenized agricultural commodities directly on the blockchain.</p>
      </header>

      {loading ? (
        <div className="loading">
          <p>Loading available commodities...</p>
        </div>
      ) : (
        <section className="marketplace-grid">
          {grainTokens.length > 0 ? (
            grainTokens.map((token) => (
              <div key={token.id} className="grain-token-item">
                <h3>{token.name}</h3>
                <p>Price: {token.price} USD per token</p>
                <p>Available Supply: {token.availableSupply} tokens</p>
                <button className="buy-button">Buy</button>
                <button className="sell-button">Sell</button>
              </div>
            ))
          ) : (
            <p>No commodities available at the moment.</p>
          )}
        </section>
      )}

      <footer className="marketplace-footer">
        <p>&copy; 2024 FarmFi Labs. Empowering agriculture with blockchain technology.</p>
      </footer>
    </div>
  );
};

export default Marketplace;
