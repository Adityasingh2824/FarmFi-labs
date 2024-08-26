import React, { useState, useEffect } from 'react';
import DefiService from '../../services/DefiService';
import './DefiDashboard.css'; // Assuming there is a CSS file for DeFi dashboard-specific styling

const DefiDashboard = () => {
  const [stakedTokens, setStakedTokens] = useState(0);
  const [lendingPools, setLendingPools] = useState([]);
  const [yieldFarming, setYieldFarming] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const staked = await DefiService.getStakedTokens();
        const lending = await DefiService.getLendingPools();
        const yieldFarmingData = await DefiService.getYieldFarmingOpportunities();
        
        setStakedTokens(staked);
        setLendingPools(lending);
        setYieldFarming(yieldFarmingData);
      } catch (error) {
        console.error('Failed to fetch DeFi data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="defi-dashboard-container">
      <h2>DeFi Dashboard</h2>
      <p className="welcome-text">Manage your DeFi activities with FarmFi Labs.</p>

      {isLoading ? (
        <div className="loading">Loading DeFi data...</div>
      ) : (
        <div className="dashboard-content">
          {/* Staked Tokens Section */}
          <div className="staked-tokens">
            <h3>Staked Tokens</h3>
            <p>{stakedTokens} Tokens Staked</p>
            <button className="stake-btn">Stake More Tokens</button>
          </div>

          {/* Lending Pools Section */}
          <div className="lending-pools">
            <h3>Lending Pools</h3>
            {lendingPools.length > 0 ? (
              <div className="lending-list">
                {lendingPools.map((pool, index) => (
                  <div key={index} className="lending-item">
                    <h4>{pool.name}</h4>
                    <p>Interest Rate: {pool.interestRate}%</p>
                    <p>Available Liquidity: {pool.availableLiquidity} Tokens</p>
                    <button className="lend-btn">Lend to Pool</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No lending pools available.</p>
            )}
          </div>

          {/* Yield Farming Section */}
          <div className="yield-farming">
            <h3>Yield Farming Opportunities</h3>
            {yieldFarming.length > 0 ? (
              <div className="yield-list">
                {yieldFarming.map((farm, index) => (
                  <div key={index} className="yield-item">
                    <h4>{farm.name}</h4>
                    <p>APY: {farm.apy}%</p>
                    <p>Available Rewards: {farm.availableRewards} Tokens</p>
                    <button className="farm-btn">Start Farming</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No yield farming opportunities available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DefiDashboard;
