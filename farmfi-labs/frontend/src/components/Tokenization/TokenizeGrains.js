import React, { useState } from 'react';
import TokenizationService from '../../services/TokenizationService';
import './TokenizeGrain.css'; // Assuming a CSS file for tokenization-specific styling

const TokenizeGrain = () => {
  const [cropName, setCropName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [isTokenizing, setIsTokenizing] = useState(false);
  const [message, setMessage] = useState('');

  const handleTokenize = async () => {
    setIsTokenizing(true);
    try {
      await TokenizationService.tokenizeCrop({
        cropName,
        quantity,
        tokenSymbol,
      });
      setMessage(`Successfully tokenized ${quantity} units of ${cropName} into ${tokenSymbol} tokens.`);
      setCropName('');
      setQuantity('');
      setTokenSymbol('');
    } catch (error) {
      console.error('Failed to tokenize crop', error);
      setMessage('Failed to tokenize crop. Please try again.');
    } finally {
      setIsTokenizing(false);
    }
  };

  return (
    <div className="tokenize-grain-container">
      <h2>Tokenize Your Grain</h2>
      <p className="tokenize-intro">
        Convert your crops into blockchain-backed tokens to enable trading and DeFi opportunities.
      </p>

      {message && <div className="message">{message}</div>}

      <div className="tokenize-form">
        <label htmlFor="cropName">Crop Name</label>
        <input
          type="text"
          id="cropName"
          name="cropName"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
          placeholder="Enter the crop name"
          required
        />

        <label htmlFor="quantity">Quantity (in tons)</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter the quantity"
          min="1"
          required
        />

        <label htmlFor="tokenSymbol">Token Symbol</label>
        <input
          type="text"
          id="tokenSymbol"
          name="tokenSymbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          placeholder="Enter the token symbol (e.g., SOY)"
          required
        />

        <button onClick={handleTokenize} disabled={isTokenizing || !cropName || !quantity || !tokenSymbol}>
          {isTokenizing ? 'Tokenizing...' : 'Tokenize Grain'}
        </button>
      </div>
    </div>
  );
};

export default TokenizeGrain;
