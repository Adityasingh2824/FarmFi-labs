import React from 'react';
import Card from '../components/Card';
import { faCoins, faWallet, faShoppingCart, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './Products.css';

const Products = () => {
    return (
        <div className="products">
            <header className="products-header">
                <h1>Our Products</h1>
                <p>FarmFi Labs offers a range of innovative products designed to bring the benefits of blockchain technology to the agricultural sector. Explore our products to see how we can help you tokenize, trade, and manage your grain assets.</p>
            </header>

            <section className="products-overview">
                <div className="products-grid">
                    <div className="product-card">
                        <Card
                            title="Grain-Backed Tokens"
                            value="Stable"
                            icon={faCoins}
                            description="Digital tokens backed by real-world grain reserves, offering a stable asset for trading and investment."
                        />
                        <button className="learn-more-btn">Learn More</button>
                    </div>
                    <div className="product-card">
                        <Card
                            title="DeFi Staking"
                            value="Profitable"
                            icon={faWallet}
                            description="Stake your grain-backed tokens in our DeFi pools to earn rewards and maximize your returns."
                        />
                        <button className="learn-more-btn">Learn More</button>
                    </div>
                    <div className="product-card">
                        <Card
                            title="Marketplace"
                            value="Accessible"
                            icon={faShoppingCart}
                            description="Buy and sell grain tokens on our global marketplace, connecting farmers, merchants, and investors."
                        />
                        <button className="learn-more-btn">Learn More</button>
                    </div>
                    <div className="product-card">
                        <Card
                            title="Price Analytics"
                            value="Insightful"
                            icon={faChartLine}
                            description="Access real-time price analytics and market trends to make informed trading decisions."
                        />
                        <button className="learn-more-btn">Learn More</button>
                    </div>
                </div>
            </section>

            <section className="products-details">
                <h2>Why Choose Our Products?</h2>
                <p>
                    Our products are designed to provide a seamless and secure experience for everyone in the agricultural value chain. Whether you're a farmer looking to tokenize your grains, a merchant seeking liquidity, or an investor exploring new opportunities, FarmFi Labs offers a comprehensive suite of products to meet your needs.
                </p>
                <button className="explore-btn">Explore Products</button>
            </section>
        </div>
    );
};

export default Products;
