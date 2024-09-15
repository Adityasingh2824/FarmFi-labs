import React from 'react';
import Card from '../components/Card';
import { faSeedling, faCoins, faUsers, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
    // Dummy data for demonstration purposes
    const dashboardData = {
        totalTokenized: "1,200 Tokens",
        totalGrainReserve: "800 Tons",
        activeFarmers: 250,
        activeMerchants: 100,
        recentActivities: [
            "Tokenized 50 tons of wheat.",
            "Farmer John Doe staked 100 tokens.",
            "Merchant Green Valley Grain sold 200 tokens."
        ]
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome to your FarmFi Labs Dashboard. Get an overview of your assets, recent activities, and key metrics of the platform.</p>
            </header>

            <section className="dashboard-overview">
                <div className="dashboard-cards">
                    <Card
                        title="Total Tokenized"
                        value={dashboardData.totalTokenized}
                        icon={faCoins}
                        description="Total tokens backed by grain reserves."
                    />
                    <Card
                        title="Grain Reserve"
                        value={dashboardData.totalGrainReserve}
                        icon={faSeedling}
                        description="Current total grain reserves in the platform."
                    />
                    <Card
                        title="Active Farmers"
                        value={dashboardData.activeFarmers}
                        icon={faUsers}
                        description="Number of farmers actively participating in the platform."
                    />
                    <Card
                        title="Active Merchants"
                        value={dashboardData.activeMerchants}
                        icon={faShoppingCart}
                        description="Number of merchants actively trading on the platform."
                    />
                </div>
            </section>

            <section className="dashboard-activities">
                <h2>Recent Activities</h2>
                <ul>
                    {dashboardData.recentActivities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;
