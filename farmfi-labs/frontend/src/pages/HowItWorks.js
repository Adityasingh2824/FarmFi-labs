// src/pages/HowItWorks.js
import React from 'react';
import './HowItWorks.css'; // CSS file for styling

const HowItWorks = () => {
    return (
        <div className="how-it-works">
            <h1>How FarmFi Works</h1>

            {/* Farmer's Workflow Section */}
            <section className="workflow-section">
                <h2>Farmer's Workflow</h2>
                <p>Farmers can tokenize their crops and store them securely using FarmFi's platform. Here's how the process works:</p>
                
                <div className="workflow-steps">
                    <div className="step">
                        <h3>Step 1: Crop Submission</h3>
                        <p>Farmers submit crop details such as type, quantity, and location via the submission form.</p>
                    </div>
                    <div className="step">
                        <h3>Step 2: Token Generation</h3>
                        <p>Once the crop is submitted, it is tokenized on the blockchain. Farmers can track the progress through their dashboard.</p>
                    </div>
                    <div className="step">
                        <h3>Step 3: Storage & Delivery</h3>
                        <p>Farmers can choose to store their crops in certified warehouses. Token holders can later redeem the tokens for physical delivery through FarmFi's logistics partners.</p>
                    </div>
                </div>

                {/* Visual representation or infographic for farmer workflow */}
                <div className="infographic">
                    <img src="/path-to-your-infographic.png" alt="Farmer Workflow Infographic" />
                </div>
            </section>

            {/* Merchant's Workflow Section */}
            <section className="workflow-section">
                <h2>Merchant's Workflow</h2>
                <p>Merchants can buy tokenized crops and redeem them for physical products. Here's how the process works:</p>
                
                <div className="workflow-steps">
                    <div className="step">
                        <h3>Step 1: Browse Marketplace</h3>
                        <p>Merchants can view available crops on the marketplace, showing details like crop type, price per ton, and storage location.</p>
                    </div>
                    <div className="step">
                        <h3>Step 2: Buy Crop Tokens</h3>
                        <p>Merchants can purchase tokens representing the crops. These tokens are securely stored in their wallet.</p>
                    </div>
                    <div className="step">
                        <h3>Step 3: Redeem & Delivery</h3>
                        <p>Merchants can redeem tokens for physical crops, which will be delivered from certified warehouses to the chosen location.</p>
                    </div>
                </div>

                {/* Visual representation or infographic for merchant workflow */}
                <div className="infographic">
                    <img src="/path-to-your-infographic-merchant.png" alt="Merchant Workflow Infographic" />
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
