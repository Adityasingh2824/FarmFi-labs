import React, { useState, useEffect } from 'react';
import TokenizationService from '../../services/TokenizationService';
import DefiService from '../../services/DefiService';
import './FarmerDashboard.css'; // Assuming there is a CSS file for dashboard-specific styling

const FarmerDashboard = () => {
  const [tokenizedCrops, setTokenizedCrops] = useState([]);
  const [stakedTokens, setStakedTokens] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const crops = await TokenizationService.getTokenizedCrops();
        const staked = await DefiService.getStakedTokens();
        const activities = await TokenizationService.getRecentActivities();
        
        setTokenizedCrops(crops);
        setStakedTokens(staked);
        setRecentActivities(activities);
      } catch (error) {
        console.error('Failed to fetch farmer data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="farmer-dashboard-container">
      <h2>Farmer Dashboard</h2>
      <p className="welcome-text">Welcome to FarmFi Labs, where your crops turn into tokens.</p>

      {isLoading ? (
        <div className="loading">Loading dashboard...</div>
      ) : (
        <div className="dashboard-content">
          {/* Tokenized Crops Section */}
          <div className="tokenized-crops">
            <h3>Your Tokenized Crops</h3>
            {tokenizedCrops.length > 0 ? (
              <div className="crop-list">
                {tokenizedCrops.map((crop, index) => (
                  <div key={index} className="crop-item">
                    <h4>{crop.name}</h4>
                    <p>Tokenized Amount: {crop.tokenizedAmount} {crop.tokenSymbol}</p>
                    <p>Market Value: ${crop.marketValue}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>You have no tokenized crops yet.</p>
            )}
          </div>

          {/* Staked Tokens Section */}
          <div className="staked-tokens">
            <h3>Staked Tokens</h3>
            <p>{stakedTokens} Tokens Staked</p>
            <button className="stake-btn">Stake More Tokens</button>
          </div>

          {/* Recent Activities Section */}
          <div className="recent-activities">
            <h3>Recent Activities</h3>
            {recentActivities.length > 0 ? (
              <ul className="activity-list">
                {recentActivities.map((activity, index) => (
                  <li key={index}>
                    {activity.description} - {new Date(activity.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent activities.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
