import React from 'react';
import Card from '../components/Card';
import { faBuilding, faExchangeAlt, faLock, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './Enterprise.css';

const Enterprise = () => {
    return (
        <div className="enterprise">
            <header className="enterprise-header">
                <h1>Enterprise Solutions</h1>
                <p>FarmFi Labs provides a suite of enterprise-grade solutions designed to help businesses leverage blockchain technology in the agricultural sector. Our platform offers secure, transparent, and efficient tools for managing grain assets and participating in the global market.</p>
            </header>

            <section className="enterprise-features">
                <h2>Key Features for Enterprises</h2>
                <div className="enterprise-features-grid">
                    <Card
                        title="Asset Management"
                        value="Comprehensive"
                        icon={faBuilding}
                        description="Manage and tokenize grain assets efficiently on a secure blockchain network."
                    />
                    <Card
                        title="DeFi Integration"
                        value="Innovative"
                        icon={faExchangeAlt}
                        description="Access decentralized finance opportunities, including staking and lending."
                    />
                    <Card
                        title="Secure Transactions"
                        value="Encrypted"
                        icon={faLock}
                        description="Ensure the security and integrity of transactions with advanced encryption."
                    />
                    <Card
                        title="Market Analytics"
                        value="Insightful"
                        icon={faChartLine}
                        description="Utilize market analytics tools to make data-driven decisions."
                    />
                </div>
            </section>

            <section className="enterprise-benefits">
                <h2>Benefits for Your Business</h2>
                <p>
                    By integrating with FarmFi Labs, enterprises can enhance their operations with the latest blockchain technology. Our solutions offer transparency, security, and efficiency, enabling businesses to streamline asset management, optimize supply chains, and participate in the global marketplace with confidence.
                </p>
            </section>

            <section className="enterprise-cta">
                <h2>Get Started with FarmFi Labs</h2>
                <p>If you're ready to take your business to the next level with blockchain technology, contact us to learn more about our enterprise solutions and how we can help you achieve your goals.</p>
                <button className="contact-us">Contact Us</button>
            </section>
        </div>
    );
};

export default Enterprise;
