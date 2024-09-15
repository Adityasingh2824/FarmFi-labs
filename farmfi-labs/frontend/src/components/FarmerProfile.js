import React from 'react';
import Card from '../components/Card';
import { faSeedling, faChartLine, faUser } from '@fortawesome/free-solid-svg-icons';
import './FarmerProfile.css';

const FarmerProfile = () => {
    // Dummy data for demonstration purposes
    const farmerData = {
        name: "John Doe",
        location: "Kansas, USA",
        totalTokens: 300,
        grainReserve: "500 Tons",
        recentActivity: [
            { date: "2024-09-01", action: "Tokenized 50 Tons of wheat." },
            { date: "2024-08-28", action: "Staked 100 Tokens in DeFi pool." },
            { date: "2024-08-20", action: "Redeemed 30 Tokens for cash." }
        ]
    };

    return (
        <div className="farmer-profile">
            <div className="farmer-header">
                <div className="farmer-details">
                    <h2>{farmerData.name}</h2>
                    <p>Location: {farmerData.location}</p>
                </div>
                <div className="farmer-stats">
                    <Card
                        title="Total Tokens"
                        value={farmerData.totalTokens}
                        icon={faSeedling}
                        description="Grain tokens issued to this farmer."
                    />
                    <Card
                        title="Grain Reserve"
                        value={farmerData.grainReserve}
                        icon={faChartLine}
                        description="Total grain reserve backing tokens."
                    />
                </div>
            </div>

            <div className="farmer-activity">
                <h3>Recent Activity</h3>
                <ul>
                    {farmerData.recentActivity.map((activity, index) => (
                        <li key={index}>
                            <span>{activity.date}:</span> {activity.action}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FarmerProfile;
