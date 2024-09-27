import React from 'react';
import Card from '../components/Card';
import { faSeedling, faCoins, faUsers, faShoppingCart, faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon
import './Dashboard.css';

// Define the type for the dashboard data
interface DashboardData {
    totalTokenized: string;
    totalGrainReserve: string;
    activeFarmers: number;
    activeMerchants: number;
    recentActivities: string[];
}

const Dashboard: React.FC = () => {
    // Dummy data for demonstration purposes
    const dashboardData: DashboardData = {
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
                <div className="header-overlay">
                    <h1>FarmFi Dashboard</h1>
                    <p>Monitor your farm's tokenized assets, see recent activities, and track performance metrics, all in one place.</p>
                </div>
            </header>

            <section className="dashboard-overview">
                <div className="dashboard-cards">
                    <Card
                        title="Total Tokenized"
                        value={dashboardData.totalTokenized}
                        icon={faCoins}
                        description="Grain assets tokenized on the platform."
                    />
                    <Card
                        title="Total Grain Reserve"
                        value={dashboardData.totalGrainReserve}
                        icon={faSeedling}
                        description="Amount of grain reserves secured."
                    />
                    <Card
                        title="Active Farmers"
                        value={dashboardData.activeFarmers}
                        icon={faUsers}
                        description="Farmers contributing to the platform."
                    />
                    <Card
                        title="Active Merchants"
                        value={dashboardData.activeMerchants}
                        icon={faShoppingCart}
                        description="Merchants trading on the platform."
                    />
                </div>
            </section>

            <section className="dashboard-activities">
                <div className="activity-header">
                    <FontAwesomeIcon icon={faHistory} className="activity-icon" /> {/* Using FontAwesomeIcon */}
                    <h2>Recent Activities</h2>
                </div>
                <ul>
                    {dashboardData.recentActivities.map((activity, index) => (
                        <li key={index} className="activity-item">
                            <span>{activity}</span>
                            <div className="activity-date">Today</div> {/* Mock date */}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;