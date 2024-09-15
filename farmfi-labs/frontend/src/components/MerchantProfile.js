import React from 'react';
import Card from '../components/Card';
import { faStore, faClipboardList, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import './MerchantProfile.css';

const MerchantProfile = () => {
    // Dummy data for demonstration purposes
    const merchantData = {
        name: "Green Valley Grain",
        location: "Iowa, USA",
        totalInventory: "800 Tons",
        totalSales: "$1,500,000",
        recentTransactions: [
            { date: "2024-09-03", action: "Sold 200 Tokens to XYZ Corporation." },
            { date: "2024-08-29", action: "Added 50 Tons of corn to inventory." },
            { date: "2024-08-22", action: "Participated in DeFi staking pool." }
        ]
    };

    return (
        <div className="merchant-profile">
            <div className="merchant-header">
                <div className="merchant-details">
                    <h2>{merchantData.name}</h2>
                    <p>Location: {merchantData.location}</p>
                </div>
                <div className="merchant-stats">
                    <Card
                        title="Total Inventory"
                        value={merchantData.totalInventory}
                        icon={faStore}
                        description="Total inventory of grain available for sale."
                    />
                    <Card
                        title="Total Sales"
                        value={merchantData.totalSales}
                        icon={faDollarSign}
                        description="Total sales made through the platform."
                    />
                </div>
            </div>

            <div className="merchant-transactions">
                <h3>Recent Transactions</h3>
                <ul>
                    {merchantData.recentTransactions.map((transaction, index) => (
                        <li key={index}>
                            <span>{transaction.date}:</span> {transaction.action}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MerchantProfile;
