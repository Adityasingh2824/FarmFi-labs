import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { faUniversity, faChartPie, faLock, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './FinancialInstitutions.css';

const FinancialInstitutions = () => {
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    const handleContactUsClick = () => {
        navigate('/contactus'); // Navigate to Contact Us page
    };

    return (
        <div className="financial-institutions">
            {/* Hero Section */}
            <header className="financial-institutions-header">
                <div className="hero-content">
                    <h1>Solutions for Financial Institutions</h1>
                    <p>Explore secure and transparent investment opportunities with FarmFi Labs. Harness the power of blockchain to manage grain-backed assets and access advanced analytics.</p>
                </div>
            </header>

            {/* Key Features Section */}
            <section className="financial-features">
                <h2>Key Features for Financial Institutions</h2>
                <div className="financial-features-grid">
                    <Card
                        title="Grain-Backed Investments"
                        value="Stable"
                        icon={faUniversity}
                        description="Invest in stable, grain-backed tokens that offer a hedge against market volatility."
                    />
                    <Card
                        title="Market Analytics"
                        value="Insightful"
                        icon={faChartPie}
                        description="Access comprehensive market analytics to make informed investment decisions."
                    />
                    <Card
                        title="Secure Transactions"
                        value="Encrypted"
                        icon={faLock}
                        description="Ensure all transactions are secure with our advanced encryption and blockchain technology."
                    />
                    <Card
                        title="Risk Management"
                        value="Comprehensive"
                        icon={faChartLine}
                        description="Utilize risk management tools to safeguard investments and maximize returns."
                    />
                </div>
            </section>

            {/* Benefits Section */}
            <section className="financial-benefits">
                <h2>Benefits for Financial Institutions</h2>
                <p>
                    FarmFi Labs empowers financial institutions to diversify portfolios using asset-backed tokens. Our platform provides access to a secure marketplace, in-depth analytics, and powerful tools to optimize investment strategies.
                </p>
            </section>

            {/* Call-to-Action Section */}
            <section className="financial-cta">
                <h2>Partner with FarmFi Labs</h2>
                <p>Explore how FarmFi Labs can help your institution leverage blockchain technology in agricultural finance. Contact us to get started.</p>
                <button className="contact-us" onClick={() => navigate('/contact-us')}> {/* Navigate to Contact Us page */}
                    Contact Us
                </button>
            </section>
        </div>
    );
};

export default FinancialInstitutions;
