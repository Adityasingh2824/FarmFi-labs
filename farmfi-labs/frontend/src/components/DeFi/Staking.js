import React, { useEffect, useState } from 'react';
import DefiService from '../../services/DefiService';
import './Staking.css'; // Assuming a CSS file for staking-specific styling

const Staking = () => {
  const [stakingPools, setStakingPools] = useState([]);
  const [selectedPool, setSelectedPool] = useState(null);
  const [amountToStake, setAmountToStake] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStakingPools = async () => {
      try {
        const pools = await DefiService.getStakingPools();
        setStakingPools(pools);
      } catch (error) {
        console.error('Failed to fetch staking pools', error);
      }
    };
    fetchStakingPools();
  }, []);

  const handleStakeTokens = async () => {
    setIsStaking(true);
    try {
      await DefiService.stakeToPool(selectedPool.id, amountToStake);
      setMessage(`Successfully staked ${amountToStake} tokens to ${selectedPool.name}`);
    } catch (error) {
      console.error('Failed to stake tokens', error);
      setMessage('Failed to stake tokens. Please try again.');
    } finally {
      setIsStaking(false);
      setAmountToStake('');
      setSelectedPool(null);
    }
  };

  return (
    <div className="staking-container">
      <h2>Staking Pools</h2>
      <p className="staking-intro">
        Stake your tokens in the available pools and earn rewards. Select a pool below and enter the amount to stake.
      </p>

      {message && <div className="message">{message}</div>}

      <div className="staking-pools">
        {stakingPools.length > 0 ? (
          stakingPools.map((pool) => (
            <div key={pool.id} className={`staking-pool ${selectedPool && selectedPool.id === pool.id ? 'selected' : ''}`} onClick={() => setSelectedPool(pool)}>
              <h3>{pool.name}</h3>
              <p>APY: {pool.apy}%</p>
              <p>Available Rewards: {pool.availableRewards} Tokens</p>
            </div>
          ))
        ) : (
          <p>No staking pools available at the moment.</p>
        )}
      </div>

      {selectedPool && (
        <div className="stake-form">
          <h3>Stake in {selectedPool.name}</h3>
          <label htmlFor="amountToStake">Amount to Stake</label>
          <input
            type="number"
            id="amountToStake"
            name="amountToStake"
            value={amountToStake}
            onChange={(e) => setAmountToStake(e.target.value)}
            placeholder="Enter amount"
            min="1"
            required
          />
          <button onClick={handleStakeTokens} disabled={isStaking || !amountToStake}>
            {isStaking ? 'Staking...' : 'Stake Tokens'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Staking;
