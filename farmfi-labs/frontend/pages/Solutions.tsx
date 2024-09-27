import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faExchangeAlt, faChartLine, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import './Solutions.css';

const Solutions: React.FC = () => {
    return (
        <div className="solutions">
            {/* Enhanced Header with Background */}
            <header className="solutions-header">
                <div className="header-content">
                    <h1>Our Solutions</h1>
                    <p>
                        FarmFi Labs leverages cutting-edge blockchain technology to offer transparency, efficiency, and liquidity to the agricultural industry. Explore our range of tailored solutions.
                    </p>
                </div>
            </header>

            {/* Interactive Solutions Section */}
            <section className="solutions-overview">
                <div className="solutions-grid">
                    {/* Grain Tokenization */}
                    <div className="solution-card">
                        <FontAwesomeIcon icon={faSeedling} className="solution-icon" />
                        <h3>Grain Tokenization</h3>
                        <p>Convert your grain assets into digital tokens, enabling easy trading and global liquidity.</p>
                        <button className="learn-more-btn">Learn More</button>
                    </div>
                    
                    {/* Decentralized Finance (DeFi) */}
                    <div className="solution-card">
                        <FontAwesomeIcon icon={faExchangeAlt} className="solution-icon" />
                        <h3>Decentralized Finance (DeFi)</h3>
                        <p>Unlock the power of DeFi with staking, lending, and borrowing using grain-backed tokens.</p>
                        <button className="learn-more-btn">Learn More</button>
                    </div>
                    
                    {/* Global Marketplace */}
                    <div className="solution-card">
                        <FontAwesomeIcon icon={faChartLine} className="solution-icon" />
                        <h3>Global Marketplace</h3>
                        <p>Trade tokens on our transparent marketplace, reaching a global audience of buyers and sellers.</p>
                        <button className="learn-more-btn">Learn More</button>
                    </div>
                    
                    {/* Proof of Grain Reserve */}
                    <div className="solution-card">
                        <FontAwesomeIcon icon={faWarehouse} className="solution-icon" />
                        <h3>Proof of Grain Reserve</h3>
                        <p>Ensure your tokens are backed by real-world grain reserves with our PoGR verification system.</p>
                        <button className="learn-more-btn">Learn More</button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="solutions-details">
                <h2>Why Choose Our Solutions?</h2>
                <p>
                    At FarmFi Labs, we merge the best of blockchain technology with agricultural needs, offering farmers, investors, and merchants secure and efficient tools to tokenize, trade, and manage grain assets.
                </p>
                <button className="cta-btn">Get Started</button> {/* Call-to-action */}
            </section>
        </div>
    );
};

export default Solutions;
