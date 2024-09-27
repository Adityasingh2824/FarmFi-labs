import React from 'react';
import Card from '../components/Card';
import { faSync, faClock, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './OracleStatus.css';

// Define an interface for the oracle data
interface OracleData {
    lastUpdate: string;
    dataAccuracy: string;
    recentUpdates: string[];
}

const OracleStatus: React.FC = () => {
    // Dummy data for demonstration purposes
    const oracleData: OracleData = {
        lastUpdate: "2024-09-08 14:00 UTC",
        dataAccuracy: "99.8%",
        recentUpdates: [
            "Price feed updated: Corn - $200/ton, Wheat - $180/ton.",
            "Grain reserve data synced successfully.",
            "New oracle integration added for market analysis."
        ]
    };

    return (
        <div className="oracle-status">
            <div className="oracle-header">
                <h2>Oracle Integration Status</h2>
                <div className="oracle-stats">
                    <Card
                        title="Last Update"
                        value={oracleData.lastUpdate}
                        icon={faClock}
                        description="The last time oracle data was updated."
                    />
                    <Card
                        title="Data Accuracy"
                        value={oracleData.dataAccuracy}
                        icon={faChartLine}
                        description="The accuracy of the data provided by oracles."
                    />
                    <Card
                        title="Oracle Sync"
                        value="Active"
                        icon={faSync}
                        description="The current status of oracle data synchronization."
                    />
                </div>
            </div>

            <div className="oracle-updates">
                <h3>Recent Oracle Updates</h3>
                <ul>
                    {oracleData.recentUpdates.map((update, index) => (
                        <li key={index}>
                            {update}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OracleStatus;
