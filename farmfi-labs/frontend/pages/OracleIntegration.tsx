import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import './OracleIntegration.css';

// Define types for the oracle data structure
interface OracleData {
    lastUpdate: string;
    grainPrice: string;
    marketConditions: string;
    recentUpdates: string[];
}

interface OracleState {
    wheat: OracleData;
    corn: OracleData;
    soybean: OracleData;
}

const OracleIntegration: React.FC = () => {
    const [oracleData, setOracleData] = useState<OracleState>({
        wheat: {
            lastUpdate: '',
            grainPrice: '',
            marketConditions: '',
            recentUpdates: []
        },
        corn: {
            lastUpdate: '',
            grainPrice: '',
            marketConditions: '',
            recentUpdates: []
        },
        soybean: {
            lastUpdate: '',
            grainPrice: '',
            marketConditions: '',
            recentUpdates: []
        }
    });

    const API_KEY = 'swTxqUSKzWPAOIB8VKvplw==rpjF6KZ6nt0z8YCg';
    const apiUrlWheat = 'https://api.api-ninjas.com/v1/commodityprice?name=wheat';
    const apiUrlCorn = 'https://api.api-ninjas.com/v1/commodityprice?name=corn';
    const apiUrlSoybean = 'https://api.api-ninjas.com/v1/commodityprice?name=soybean';

    useEffect(() => {
        const fetchOracleData = async () => {
            try {
                const responses = await Promise.all([
                    axios.get(apiUrlWheat, { headers: { 'X-Api-Key': API_KEY } }),
                    axios.get(apiUrlCorn, { headers: { 'X-Api-Key': API_KEY } }),
                    axios.get(apiUrlSoybean, { headers: { 'X-Api-Key': API_KEY } })
                ]);

                const wheatData = responses[0].data;
                const cornData = responses[1].data;
                const soybeanData = responses[2].data;

                setOracleData({
                    wheat: {
                        lastUpdate: new Date().toISOString(),
                        grainPrice: `${wheatData.price}/ton`,
                        marketConditions: wheatData.marketConditions || "Stable",
                        recentUpdates: ["Wheat price feed updated.", "Market conditions synchronized."]
                    },
                    corn: {
                        lastUpdate: new Date().toISOString(),
                        grainPrice: `${cornData.price}/ton`,
                        marketConditions: cornData.marketConditions || "Stable",
                        recentUpdates: ["Corn price feed updated.", "Market conditions synchronized."]
                    },
                    soybean: {
                        lastUpdate: new Date().toISOString(),
                        grainPrice: `${soybeanData.price}/ton`,
                        marketConditions: soybeanData.marketConditions || "Stable",
                        recentUpdates: ["Soybean price feed updated.", "Market conditions synchronized."]
                    }
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
                <h1>Real Time Updates</h1>
                <p>FarmFi Labs integrates with trusted oracles to provide real-time data feeds for grain prices, market conditions, and more. These integrations enhance transparency and accuracy across the platform.</p>
            </header>

            <section className="oracle-status">
                <h2>Real Time Feeds</h2>
                <div className="oracle-cards">
                    <Card
                        title="Wheat"
                        value={oracleData.wheat.grainPrice}
                        icon={faChartLine}
                        description="Current market price of wheat."
                    />
                    <Card
                        title="Corn"
                        value={oracleData.corn.grainPrice}
                        icon={faChartLine}
                        description="Current market price of corn."
                    />
                    <Card
                        title="Soybean"
                        value={oracleData.soybean.grainPrice}
                        icon={faChartLine}
                        description="Current market price of soybean."
                    />
                </div>
            </section>

            <section className="oracle-updates">
                <h2>Recent Oracle Updates</h2>
                <ul>
                    {oracleData.wheat.recentUpdates.map((update, index) => (
                        <li key={index}>{update}</li>
                    ))}
                    {oracleData.corn.recentUpdates.map((update, index) => (
                        <li key={index}>{update}</li>
                    ))}
                    {oracleData.soybean.recentUpdates.map((update, index) => (
                        <li key={index}>{update}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default OracleIntegration;