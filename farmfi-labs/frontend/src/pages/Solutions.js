import React from 'react';
import Card from '../components/Card';
import { faSeedling, faExchangeAlt, faChartLine, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import './Solutions.css';

const Solutions = () => {
    return (
        <div className="solutions">
            <header className="solutions-header">
                <h1>Our Solutions</h1>
                <p>FarmFi Labs offers a range of solutions tailored to the agricultural industry, leveraging blockchain technology to bring transparency, efficiency, and liquidity to grain trading and management.</p>
            </header>

            <section className="solutions-overview">
                <div className="solutions-grid">
                    <Card
                        title="Grain Tokenization"
                        value="Seamless"
                        icon={faSeedling}
                        description="Convert your grain assets into digital tokens for easy trading and liquidity."
                    />
                    <Card
                        title="Decentralized Finance (DeFi)"
                        value="Integrated"
                        icon={faExchangeAlt}
                        description="Access DeFi services such as staking, lending, and borrowing using grain-backed tokens."
                    />
                    <Card
                        title="Marketplace"
                        value="Global"
                        icon={faChartLine}
                        description="Buy and sell grain tokens on our secure and transparent marketplace, reaching a global audience."
                    />
                    <Card
                        title="Proof of Grain Reserve"
                        value="Verified"
                        icon={faWarehouse}
                        description="Ensure that all tokens are backed by real-world grain reserves through our PoGR system."
                    />
                </div>
            </section>

            <section className="solutions-details">
                <h2>Why Choose Our Solutions?</h2>
                <p>
                    FarmFi Labs combines the power of blockchain with the needs of the agricultural industry to provide secure, transparent, and efficient solutions.
                    Whether you're a farmer looking to tokenize your grains, an investor seeking new opportunities, or a merchant wanting to access a global market,
                    our platform offers tools and services to help you achieve your goals.
                </p>
            </section>
        </div>
    );
};

export default Solutions;
