import React, { useEffect, useState } from 'react';
import MarketplaceService from '../../services/MarketplaceService';
import './BuyGrainTokens.css'; // Assuming a CSS file for buy grain token-specific styling

const BuyGrainTokens = () => {
  const [grainTokens, setGrainTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [amountToBuy, setAmountToBuy] = useState('');
  const [isBuying, setIsBuying] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchGrainTokens = async () => {
      try {
        const tokens = await MarketplaceService.getAvailableGrainTokens();
        setGrainTokens(tokens);
      } catch (error) {
        console.error('Failed to fetch grain tokens', error);
      }
    };
    fetchGrainTokens();
  }, []);

  const handleBuyTokens = async () => {
    setIsBuying(true);
    try {
      await MarketplaceService.buyGrainToken(selectedToken.id, amountToBuy);
      setMessage(`Successfully purchased ${amountToBuy} ${selectedToken.name} tokens.`);
    } catch (error) {
      console.error('Failed to buy grain tokens', error);
      setMessage('Failed to purchase tokens. Please try again.');
    } finally {
      setIsBuying(false);
      setAmountToBuy('');
      setSelectedToken(null);
    }
  };

  return (
    <div className="buy-grain-tokens-container">
      <h2>Buy Grain Tokens</h2>
      <p className="buy-grain-intro">
        Select from the available grain tokens and enter the amount to purchase.
      </p>

      {message && <div className="message">{message}</div>}

      <div className="grain-tokens">
        {grainTokens.length > 0 ? (
          grainTokens.map((token) => (
            <div key={token.id} className={`grain-token ${selectedToken && selectedToken.id === token.id ? 'selected' : ''}`} onClick={() => setSelectedToken(token)}>
              <h3>{token.name}</h3>
              <p>Price: {token.price} USD per token</p>
              <p>Available Supply: {token.availableSupply} tokens</p>
            </div>
          ))
        ) : (
          <p>No grain tokens available at the moment.</p>
        )}
      </div>

      {selectedToken && (
        <div className="buy-form">
          <h3>Buy {selectedToken.name} Tokens</h3>
          <label htmlFor="amountToBuy">Amount to Buy</label>
          <input
            type="number"
            id="amountToBuy"
            name="amountToBuy"
            value={amountToBuy}
            onChange={(e) => setAmountToBuy(e.target.value)}
            placeholder="Enter amount"
            min="1"
            required
          />
          <button onClick={handleBuyTokens} disabled={isBuying || !amountToBuy}>
            {isBuying ? 'Buying...' : 'Buy Tokens'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyGrainTokens;
