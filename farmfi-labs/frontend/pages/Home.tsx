import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { faSeedling, faChartPie, faShieldAlt, faSync } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home">
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to FarmFi Labs</h1>
                    <p>Empowering the agricultural revolution through blockchain technology. Tokenize, trade, and manage your grain assets seamlessly and securely.</p>
                    <Link to="/tokenization" className="hero-button">Get Started</Link>
                </div>
            </header>

            <section className="features-section">
                <h2>Our Key Features</h2>
                <div className="features-grid">
                    <Card
                        title="Grain Tokenization"
                        value="Instant"
                        icon={faSeedling}
                        description="Easily tokenize your grain assets to access global markets."
                    />
                    <Card
                        title="Proof of Grain Reserve"
                        value="Verified"
                        icon={faChartPie}
                        description="Our PoGR ensures transparency and trust in the ecosystem."
                    />
                    <Card
                        title="Secure Platform"
                        value="Top-notch"
                        icon={faShieldAlt}
                        description="Built with security as a priority to protect your assets."
                    />
                    <Card
                        title="Oracle Integration"
                        value="Real-time"
                        icon={faSync}
                        description="Integrating live market data and reserves for accurate pricing."
                    />
                </div>
            </section>

            <section className="cta-section">
                <h2>Why Choose FarmFi Labs?</h2>
                <p>Join the future of agriculture with a secure, transparent, and efficient platform designed for farmers, merchants, and investors.</p>
                <Link to="/about" className="cta-button">Learn More</Link>
            </section>
        </div>
    );
};

export default Home;