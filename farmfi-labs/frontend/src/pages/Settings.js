import React from 'react';
import Card from '../components/Card';
import { faSeedling, faExchangeAlt, faChartLine, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import './Solutions.css';

const Solutions = () => {
    return (
        <div className="solutions">
            {/* Enhanced Header Section */}
            <header className="solutions-header">
                <div className="header-overlay">
                    <h1>Our Solutions</h1>
                    <p>
                        Discover how FarmFi Labs is transforming agriculture with blockchain technology. We bring transparency, efficiency, and liquidity to grain trading and management.
                    </p>
                </div>
            </header>

            {/* Solutions Overview Section */}
            <section className="solutions-overview">
                <h2>Our Core Solutions</h2>
                <div className="solutions-grid">
                    <Card
                        title="Grain Tokenization"
                        value="Seamless"
                        icon={faSeedling}
                        description="Easily convert grain assets into digital tokens, unlocking new financial opportunities."
                    />
                    <Card
                        title="Decentralized Finance (DeFi)"
                        value="Integrated"
                        icon={faExchangeAlt}
                        description="Access a decentralized ecosystem for staking, lending, and borrowing using grain-backed tokens."
                    />
                    <Card
                        title="Global Marketplace"
                        value="Reach"
                        icon={faChartLine}
                        description="Trade your grain tokens on a secure marketplace, connecting farmers and buyers globally."
                    />
                    <Card
                        title="Proof of Grain Reserve (PoGR)"
                        value="Verified"
                        icon={faWarehouse}
                        description="Guarantee token value with verified grain reserves through our trusted PoGR system."
                    />
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="solutions-details">
                <h2>Why Choose Our Solutions?</h2>
                <p>
                    At FarmFi Labs, we blend the best of blockchain with the agricultural sector’s needs, creating a secure and efficient ecosystem. Whether you’re a farmer, investor, or merchant, our platform empowers you with the tools you need to grow.
                </p>
                <a href="/contact-us" className="cta-button">Contact Us</a> {/* Call-to-action button */}
            </section>
        </div>
    );
};

export default Solutions;
