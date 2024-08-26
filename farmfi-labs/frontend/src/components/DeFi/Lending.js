import React, { useEffect, useState } from 'react';
import DefiService from '../../services/DefiService';
import './Lending.css'; // Assuming a CSS file for lending-specific styling

const Lending = () => {
  const [lendingPools, setLendingPools] = useState([]);
  const [selectedPool, setSelectedPool] = useState(null);
  const [amountToLend, setAmountToLend] = useState('');
  const [isLending, setIsLending] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLendingPools = async () => {
      try {
        const pools = await DefiService.getLendingPools();
        setLendingPools(pools);
      } catch (error) {
        console.error('Failed to fetch lending pools', error);
      }
    };
    fetchLendingPools();
  }, []);

  const handleLendTokens = async () => {
    setIsLending(true);
    try {
      await DefiService.lendToPool(selectedPool.id, amountToLend);
      setMessage(`Successfully lent ${amountToLend} tokens to ${selectedPool.name}`);
    } catch (error) {
      console.error('Failed to lend tokens', error);
      setMessage('Failed to lend tokens. Please try again.');
    } finally {
      setIsLending(false);
      setAmountToLend('');
      setSelectedPool(null);
    }
  };

  return (
    <div className="lending-container">
      <h2>Lending Pools</h2>
      <p className="lending-intro">
        Lend your tokens to available pools and earn interest. Select a pool below and enter the amount to lend.
      </p>

      {message && <div className="message">{message}</div>}

      <div className="lending-pools">
        {lendingPools.length > 0 ? (
          lendingPools.map((pool) => (
            <div key={pool.id} className={`lending-pool ${selectedPool && selectedPool.id === pool.id ? 'selected' : ''}`} onClick={() => setSelectedPool(pool)}>
              <h3>{pool.name}</h3>
              <p>Interest Rate: {pool.interestRate}%</p>
              <p>Available Liquidity: {pool.availableLiquidity} Tokens</p>
            </div>
          ))
        ) : (
          <p>No lending pools available at the moment.</p>
        )}
      </div>

      {selectedPool && (
        <div className="lend-form">
          <h3>Lend to {selectedPool.name}</h3>
          <label htmlFor="amountToLend">Amount to Lend</label>
          <input
            type="number"
            id="amountToLend"
            name="amountToLend"
            value={amountToLend}
            onChange={(e) => setAmountToLend(e.target.value)}
            placeholder="Enter amount"
            min="1"
            required
          />
          <button onClick={handleLendTokens} disabled={isLending || !amountToLend}>
            {isLending ? 'Lending...' : 'Lend Tokens'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Lending;
