import React from 'react';
import Card from '../components/Card';
import { faCubes, faSeedling, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './TokenizationInfo.css';

interface TokenizationData {
    totalTokenizedAssets: string;
    availableGrains: string;
    tokenizationSteps: string[];
    currentStatus: string;
}

const TokenizationInfo: React.FC = () => {
    // Dummy data for demonstration purposes
    const tokenizationData: TokenizationData = {
        totalTokenizedAssets: "1,200 Tokens",
        availableGrains: "300 Tons",
        tokenizationSteps: [
            "Step 1: Verify grain reserves.",
            "Step 2: Request tokenization.",
            "Step 3: Issue grain-backed tokens.",
            "Step 4: Monitor token status on the blockchain."
        ],
        currentStatus: "Active"
    };

    return (
        <div className="tokenization-info">
            <div className="tokenization-header">
                <h2>Tokenization Overview</h2>
                <div className="tokenization-stats">
                    <Card
                        title="Total Tokenized Assets"
                        value={tokenizationData.totalTokenizedAssets}
                        icon={faCubes}
                        description="Total grain assets currently tokenized on the platform."
                    />
                    <Card
                        title="Available Grains"
                        value={tokenizationData.availableGrains}
                        icon={faSeedling}
                        description="Total grains available for tokenization."
                    />
                    <Card
                        title="Current Status"
                        value={tokenizationData.currentStatus}
                        icon={faCheckCircle}
                        description="Current tokenization process status."
                    />
                </div>
            </div>

            <div className="tokenization-steps">
                <h3>Tokenization Steps</h3>
                <ul>
                    {tokenizationData.tokenizationSteps.map((step, index) => (
                        <li key={index}>
                            {step}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TokenizationInfo;
