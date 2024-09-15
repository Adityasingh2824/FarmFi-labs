import React from 'react';
import Card from '../components/Card';
import { faSyncAlt, faChartLine, faDatabase } from '@fortawesome/free-solid-svg-icons';
import './OracleIntegration.css';

const OracleIntegration = () => {
    // Dummy data for demonstration purposes
    const oracleData = {
        lastUpdate: "2024-09-08 14:00 UTC",
        grainPrice: "$200/ton",
        marketConditions: "Stable",
        recentUpdates: [
            "Grain price feed updated.",
            "Market conditions synchronized.",
            "New oracle integration added for weather analysis."
        ]
    };

    return (
        <div className="oracle-integration">
            <header className="oracle-integration-header">
                <h1>Oracle Integration</h1>
                <p>FarmFi Labs integrates with trusted oracles to provide real-time data feeds for grain prices, market conditions, and more. These integrations enhance transparency and accuracy across the platform.</p>
            </header>

            <section className="oracle-status">
                <h2>Oracle Data Feeds</h2>
                <div className="oracle-cards">
                    <Card
                        title="Last Update"
                        value={oracleData.lastUpdate}
                        icon={faSyncAlt}
                        description="The last time oracle data was updated."
                    />
                    <Card
                        title="Grain Price"
                        value={oracleData.grainPrice}
                        icon={faChartLine}
                        description="Current market price of grains."
                    />
                    <Card
                        title="Market Conditions"
                        value={oracleData.marketConditions}
                        icon={faDatabase}
                        description="Current market conditions as reported by the oracle."
                    />
                </div>
            </section>

            <section className="oracle-updates">
                <h2>Recent Oracle Updates</h2>
                <ul>
                    {oracleData.recentUpdates.map((update, index) => (
                        <li key={index}>{update}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default OracleIntegration;
