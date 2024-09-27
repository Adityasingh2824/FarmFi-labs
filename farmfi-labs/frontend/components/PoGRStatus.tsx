import React from 'react';
import Card from '../components/Card';
import { faWarehouse, faCheckCircle, faChartBar } from '@fortawesome/free-solid-svg-icons';
import './PoGRStatus.css';

// Define an interface for the PoGR data
interface PoGRData {
    totalGrainReserve: string;
    reserveBackedTokens: string;
    lastAuditDate: string;
    auditReports: string[];
}

const PoGRStatus: React.FC = () => {
    // Dummy data for demonstration purposes
    const poGRData: PoGRData = {
        totalGrainReserve: "2,000 Tons",
        reserveBackedTokens: "1,800 Tokens",
        lastAuditDate: "2024-09-05",
        auditReports: [
            "Audit 1: All reserves verified and secured.",
            "Audit 2: Grain reserve balance matches issued tokens.",
            "Audit 3: No discrepancies found in the reserve."
        ]
    };

    return (
        <div className="pogr-status">
            <div className="pogr-header">
                <h2>Proof of Grain Reserve (PoGR) Status</h2>
                <div className="pogr-stats">
                    <Card
                        title="Total Grain Reserve"
                        value={poGRData.totalGrainReserve}
                        icon={faWarehouse}
                        description="Total grain currently held in reserve."
                    />
                    <Card
                        title="Reserve-Backed Tokens"
                        value={poGRData.reserveBackedTokens}
                        icon={faChartBar}
                        description="Total tokens backed by grain reserves."
                    />
                    <Card
                        title="Last Audit Date"
                        value={poGRData.lastAuditDate}
                        icon={faCheckCircle}
                        description="The date of the most recent audit."
                    />
                </div>
            </div>

            <div className="pogr-audit-reports">
                <h3>Recent Audit Reports</h3>
                <ul>
                    {poGRData.auditReports.map((report, index) => (
                        <li key={index}>
                            {report}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PoGRStatus;
