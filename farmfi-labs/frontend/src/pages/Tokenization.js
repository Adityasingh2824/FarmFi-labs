import React, { useState } from 'react';
import Card from '../components/Card';
import { faSeedling, faCoins, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Tokenization.css';

const Tokenization = () => {
    const [grainType, setGrainType] = useState('');
    const [amount, setAmount] = useState('');

    const handleTokenize = (event) => {
        event.preventDefault();
        // Add tokenization logic here
        console.log('Grain Type:', grainType, 'Amount:', amount);
    };

    return (
        <div className="tokenization">
            <header className="tokenization-header">
                <h1>Grain Tokenization</h1>
                <p>Tokenize your grain assets to gain access to global markets and DeFi opportunities. Secure, transparent, and efficient tokenization process with FarmFi Labs.</p>
            </header>

            <section className="tokenization-process">
                <h2>Tokenization Process</h2>
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
                </div>
            </section>

            <section className="tokenization-form">
                <h2>Tokenize Your Grain</h2>
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
                    <button type="submit" className="tokenize-button">Tokenize</button>
                </form>
            </section>
        </div>
    );
};

export default Tokenization;
