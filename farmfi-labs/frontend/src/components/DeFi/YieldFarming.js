import React, { useEffect, useState } from 'react';
import DefiService from '../../services/DefiService';
import './YieldFarming.css'; // Assuming a CSS file for yield farming-specific styling

const YieldFarming = () => {
  const [farmingPools, setFarmingPools] = useState([]);
  const [selectedPool, setSelectedPool] = useState(null);
  const [amountToFarm, setAmountToFarm] = useState('');
  const [isFarming, setIsFarming] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFarmingPools = async () => {
      try {
        const pools = await DefiService.getFarmingPools();
        setFarmingPools(pools);
      } catch (error) {
        console.error('Failed to fetch farming pools', error);
      }
    };
    fetchFarmingPools();
  }, []);

  const handleFarmTokens = async () => {
    setIsFarming(true);
    try {
      await DefiService.farmTokens(selectedPool.id, amountToFarm);
      setMessage(`Successfully farmed ${amountToFarm} tokens in ${selectedPool.name}`);
    } catch (error) {
      console.error('Failed to farm tokens', error);
      setMessage('Failed to farm tokens. Please try again.');
    } finally {
      setIsFarming(false);
      setAmountToFarm('');
      setSelectedPool(null);
    }
  };

  return (
    <div className="yield-farming-container">
      <h2>Yield Farming Pools</h2>
      <p className="yield-farming-intro">
        Stake your tokens in farming pools to earn high rewards. Select a pool below and enter the amount to farm.
      </p>

      {message && <div className="message">{message}</div>}

      <div className="farming-pools">
        {farmingPools.length > 0 ? (
          farmingPools.map((pool) => (
            <div key={pool.id} className={`farming-pool ${selectedPool && selectedPool.id === pool.id ? 'selected' : ''}`} onClick={() => setSelectedPool(pool)}>
              <h3>{pool.name}</h3>
              <p>APY: {pool.apy}%</p>
              <p>Available Rewards: {pool.availableRewards} Tokens</p>
            </div>
          ))
        ) : (
          <p>No farming pools available at the moment.</p>
        )}
      </div>

      {selectedPool && (
        <div className="farm-form">
          <h3>Farm in {selectedPool.name}</h3>
          <label htmlFor="amountToFarm">Amount to Farm</label>
          <input
            type="number"
            id="amountToFarm"
            name="amountToFarm"
            value={amountToFarm}
            onChange={(e) => setAmountToFarm(e.target.value)}
            placeholder="Enter amount"
            min="1"
            required
          />
          <button onClick={handleFarmTokens} disabled={isFarming || !amountToFarm}>
            {isFarming ? 'Farming...' : 'Farm Tokens'}
          </button>
        </div>
      )}
    </div>
  );
};

export default YieldFarming;
