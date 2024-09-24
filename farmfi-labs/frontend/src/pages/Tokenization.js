import React, { useState } from 'react';
import Card from '../components/Card';
import { faSeedling, faCoins, faCheckCircle, faChartBar } from '@fortawesome/free-solid-svg-icons';
import './Tokenization.css';

const Tokenization = () => {
    const [grainType, setGrainType] = useState('');
    const [amount, setAmount] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    const handleTokenize = (event) => {
        event.preventDefault();
        // Add tokenization logic here
        console.log('Grain Type:', grainType, 'Amount:', amount);
        setCurrentStep(2); // Move to the next step in the process
    };

    return (
        <div className="tokenization">
            <header className="hero-section">
                <h1>Grain Tokenization</h1>
                <p>Unlock the potential of your agricultural assets by tokenizing them securely with FarmFi Labs. Reach global markets with ease and transparency.</p>
            </header>

            <section className="tokenization-process">
                <h2>Your Tokenization Overview</h2>
                <div className="tokenization-overview">
                    <Card
                        title="Total Tokenized Assets"
                        value="1,500 Tokens"
                        icon={faCoins}
                        description="Your total grain assets currently tokenized."
                    />
                    <Card
                        title="Tokenization Status"
                        value="Active"
                        icon={faCheckCircle}
                        description="Current status of your tokenized assets."
                    />
                    <Card
                        title="Market Value"
                        value="$12,000"
                        icon={faChartBar}
                        description="Current market value of your tokenized assets."
                    />
                </div>
            </section>

            <section className="process-bar">
                <h3>Tokenization Steps</h3>
                <div className="steps">
                    <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Submission</div>
                    <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Token Generation</div>
                    <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3. Market Availability</div>
                    <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>4. Trade</div>
                </div>
            </section>

            <section className="tokenization-form-container">
                <h2>Tokenize Your Grain</h2>
                <div className="tokenization-form-card">
                    <form onSubmit={handleTokenize}>
                        <div className="input-group">
                            <label htmlFor="grainType">Grain Type</label>
                            <select 
                                id="grainType" 
                                value={grainType} 
                                onChange={(e) => setGrainType(e.target.value)} 
                                required
                            >
                                <option value="">Select Grain Type</option>
                                <option value="Wheat">Wheat</option>
                                <option value="Corn">Corn</option>
                                <option value="Soybeans">Soybeans</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="amount">Amount (Tons)</label>
                            <input 
                                type="number" 
                                id="amount" 
                                value={amount} 
                                onChange={(e) => setAmount(e.target.value)} 
                                required 
                                min="1"
                            />
                        </div>
                        <button type="submit" className="tokenize-button">Tokenize Now</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Tokenization;
