import React, { useEffect, useState } from 'react';
import MarketplaceService from '../../services/MarketplaceService';
import './SellGrainTokens.css'; // Assuming a CSS file for selling grain tokens

const SellGrainTokens = () => {
  const [userTokens, setUserTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [amountToSell, setAmountToSell] = useState('');
  const [isSelling, setIsSelling] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserTokens = async () => {
      try {
        const tokens = await MarketplaceService.getUserGrainTokens();
        setUserTokens(tokens);
      } catch (error) {
        console.error('Failed to fetch user tokens', error);
      }
    };
    fetchUserTokens();
  }, []);

  const handleSellTokens = async () => {
    setIsSelling(true);
    try {
      await MarketplaceService.sellGrainToken(selectedToken.id, amountToSell);
      setMessage(`Successfully sold ${amountToSell} ${selectedToken.name} tokens.`);
    } catch (error) {
      console.error('Failed to sell grain tokens', error);
      setMessage('Failed to sell tokens. Please try again.');
    } finally {
      setIsSelling(false);
      setAmountToSell('');
      setSelectedToken(null);
    }
  };

  return (
    <div className="sell-grain-tokens-container">
      <h2>Sell Grain Tokens</h2>
      <p className="sell-grain-intro">
        Select from your available grain tokens and enter the amount to sell.
      </p>

      {message && <div className="message">{message}</div>}

      <div className="user-tokens">
        {userTokens.length > 0 ? (
          userTokens.map((token) => (
            <div key={token.id} className={`grain-token ${selectedToken && selectedToken.id === token.id ? 'selected' : ''}`} onClick={() => setSelectedToken(token)}>
              <h3>{token.name}</h3>
              <p>Available: {token.balance} tokens</p>
              <p>Current Market Price: {token.price} USD per token</p>
            </div>
          ))
        ) : (
          <p>You do not have any tokens available to sell.</p>
        )}
      </div>

      {selectedToken && (
        <div className="sell-form">
          <h3>Sell {selectedToken.name} Tokens</h3>
          <label htmlFor="amountToSell">Amount to Sell</label>
          <input
            type="number"
            id="amountToSell"
            name="amountToSell"
            value={amountToSell}
            onChange={(e) => setAmountToSell(e.target.value)}
            placeholder="Enter amount"
            min="1"
            max={selectedToken.balance}
            required
          />
          <button onClick={handleSellTokens} disabled={isSelling || !amountToSell || amountToSell > selectedToken.balance}>
            {isSelling ? 'Selling...' : 'Sell Tokens'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SellGrainTokens;
