import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { faSyncAlt, faChartLine, faDatabase } from '@fortawesome/free-solid-svg-icons';
import './OracleIntegration.css'

const OracleIntegration = () => {
    const [oracleData, setOracleData] = useState({
        lastUpdate: '',
        grainPrice: '',
        marketConditions: '',
        recentUpdates: []
    })

    const API_KEY = 'swTxqUSKzWPAOIB8VKvplw==rpjF6KZ6nt0z8YCg'; // Your API key
    const apiUrl = 'https://api.api-ninjas.com/v1/commodityprice?name=wheat'

    useEffect(() => {
        const fetchOracleData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: { 'X-Api-Key': API_KEY }
                });
                const data = response.data;

                // Assuming API returns fields like 'lastUpdate', 'grainPrice', 'marketConditions'
                setOracleData({
                    lastUpdate: new Date().toISOString(),
                    grainPrice: `$${data.price}/ton`,
                    marketConditions: data.marketConditions || "Stable", // If the field is available
                    recentUpdates: ["Grain price feed updated.", "Market conditions synchronized."]
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOracleData();
    }, []); // Empty dependency array means this runs once after the component mounts

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