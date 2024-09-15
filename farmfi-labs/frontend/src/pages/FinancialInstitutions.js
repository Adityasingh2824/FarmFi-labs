import React from 'react';
import Card from '../components/Card';
import { faUniversity, faChartPie, faLock, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './FinancialInstitutions.css';

const FinancialInstitutions = () => {
    return (
        <div className="financial-institutions">
            <header className="financial-institutions-header">
                <h1>Solutions for Financial Institutions</h1>
                <p>FarmFi Labs offers a suite of secure and transparent solutions tailored for financial institutions. Our platform provides opportunities to invest in grain-backed assets, manage transactions securely, and access in-depth market analytics.</p>
            </header>

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

            <section className="financial-benefits">
                <h2>Benefits for Financial Institutions</h2>
                <p>
                    Our platform offers financial institutions the ability to diversify portfolios with stable, asset-backed tokens. With FarmFi Labs, you gain access to a secure and transparent marketplace, in-depth analytics, and tools designed to enhance investment strategies and risk management.
                </p>
            </section>

            <section className="financial-cta">
                <h2>Partner with FarmFi Labs</h2>
                <p>Ready to explore new opportunities in the agricultural finance sector? Contact us to learn how FarmFi Labs can help your institution harness the power of blockchain technology.</p>
                <button className="contact-us">Contact Us</button>
            </section>
        </div>
    );
};

export default FinancialInstitutions;
