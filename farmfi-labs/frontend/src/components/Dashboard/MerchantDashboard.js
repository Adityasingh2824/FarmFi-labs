import React, { useState, useEffect } from 'react';
import MarketplaceService from '../../services/MarketplaceService';
import DefiService from '../../services/DefiService';
import './MerchantDashboard.css'; // Assuming there is a CSS file for dashboard-specific styling

const MerchantDashboard = () => {
  const [purchasedCrops, setPurchasedCrops] = useState([]);
  const [stakedTokens, setStakedTokens] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const crops = await MarketplaceService.getPurchasedCrops();
        const staked = await DefiService.getStakedTokens();
        const activities = await MarketplaceService.getRecentActivities();
        
        setPurchasedCrops(crops);
        setStakedTokens(staked);
        setRecentActivities(activities);
      } catch (error) {
        console.error('Failed to fetch merchant data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="merchant-dashboard-container">
      <h2>Merchant Dashboard</h2>
      <p className="welcome-text">Manage your tokenized crop purchases and staked tokens on FarmFi Labs.</p>

      {isLoading ? (
        <div className="loading">Loading dashboard...</div>
      ) : (
        <div className="dashboard-content">
          {/* Purchased Crops Section */}
          <div className="purchased-crops">
            <h3>Your Purchased Crops</h3>
            {purchasedCrops.length > 0 ? (
              <div className="crop-list">
                {purchasedCrops.map((crop, index) => (
                  <div key={index} className="crop-item">
                    <h4>{crop.name}</h4>
                    <p>Purchased Amount: {crop.purchasedAmount} {crop.tokenSymbol}</p>
                    <p>Market Value: ${crop.marketValue}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>You have not purchased any tokenized crops yet.</p>
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

export default MerchantDashboard;
