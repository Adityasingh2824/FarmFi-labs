import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Card from '../components/Card';
import { faBuilding, faExchangeAlt, faLock, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './Enterprise.css';

const Enterprise: React.FC = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    return (
        <div className="enterprise">
            {/* Hero Section */}
            <header className="enterprise-header">
                <div className="hero-overlay">
                    <h1>Enterprise Solutions</h1>
                    <p>
                        Leverage the power of blockchain technology with FarmFi Labs' enterprise-grade solutions for managing
                        grain assets and participating in global markets.
                    </p>
                    <button className="explore-btn" onClick={() => navigate('/solutions')}>
                        {/* Navigate to Solutions page */}
                        Explore Our Solutions
                    </button>
                </div>
            </header>

            {/* Key Features Section */}
            <section className="enterprise-features">
                <h2>Key Features for Enterprises</h2>
                <div className="enterprise-features-grid">
                    <Card
                        title="Asset Management"
                        value="Comprehensive"
                        icon={faBuilding}
                        description="Efficiently manage and tokenize grain assets on our secure blockchain network."
                    />
                    <Card
                        title="DeFi Integration"
                        value="Innovative"
                        icon={faExchangeAlt}
                        description="Unlock decentralized finance opportunities such as staking and lending."
                    />
                    <Card
                        title="Secure Transactions"
                        value="Encrypted"
                        icon={faLock}
                        description="Protect transactions with advanced encryption for enhanced security."
                    />
                    <Card
                        title="Market Analytics"
                        value="Insightful"
                        icon={faChartLine}
                        description="Use powerful analytics to make informed, data-driven business decisions."
                    />
                </div>
            </section>

            {/* Benefits Section */}
            <section className="enterprise-benefits">
                <h2>Benefits for Your Business</h2>
                <p>
                    Integrate blockchain technology with your business operations using FarmFi Labs' cutting-edge solutions.
                    Streamline asset management, optimize your supply chain, and tap into global markets with secure, transparent,
                    and efficient tools designed for enterprises.
                </p>
            </section>

            {/* CTA Section */}
            <section className="enterprise-cta">
                <h2>Get Started with FarmFi Labs</h2>
                <p>
                    Ready to elevate your business with blockchain technology? Contact us to explore how our enterprise solutions
                    can help you succeed.
                </p>
                <button className="contact-us" onClick={() => navigate('/contact-us')}>
                    {/* Navigate to Contact Us page */}
                    Contact Us
                </button>
            </section>
        </div>
    );
};

export default Enterprise;