import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import './Merchants.css';

// Define the Merchant type
interface Merchant {
    id: number;
    name: string;
    location: string;
    totalInventory: string;
    profileImage: string;
    description: string;
}

const Merchants: React.FC = () => {
    // Dummy data for demonstration purposes
    const merchantsList: Merchant[] = [
        {
            id: 1,
            name: "Green Valley Grain",
            location: "Kansas, USA",
            totalInventory: "1,200 Tons",
            profileImage: "/assets/farmer1.jpg",
            description: "Green Valley Grain is known for providing high-quality grain. Trusted by thousands of farmers across the Midwest."
        },
        {
            id: 2,
            name: "Harvest Hub",
            location: "Iowa, USA",
            totalInventory: "850 Tons",
            profileImage: "/assets/farmer2.jpg",
            description: "Harvest Hub focuses on sustainable farming and efficient grain storage methods."
        },
        {
            id: 3,
            name: "Global Grain Traders",
            location: "Ontario, Canada",
            totalInventory: "1,500 Tons",
            profileImage: "/assets/farmer3.jpg",
            description: "Global Grain Traders operates in multiple countries, offering competitive prices and top-tier grain quality."
        }
    ];

    // State to manage selected merchant for profile display
    const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);

    // Handle View Profile click
    const handleViewProfile = (merchant: Merchant) => {
        setSelectedMerchant(merchant);
    };

    return (
        <div className="merchants-container">
            {/* Hero Section */}
            <header className="merchants-header">
                <div className="header-overlay">
                    <h1>Our Merchants</h1>
                    <p>Discover how our merchants efficiently manage and trade their grain inventory with the power of FarmFi Labs.</p>
                </div>
            </header>

            {/* Merchants List Section */}
            <section className="merchants-list">
                {merchantsList.map(merchant => (
                    <div className="merchant-card" key={merchant.id}>
                        <img src={merchant.profileImage} alt={merchant.name} className="merchant-image" />
                        <h3>{merchant.name}</h3>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {merchant.location}</p>
                        <div className="inventory">
                            <FontAwesomeIcon icon={faBoxOpen} /> {merchant.totalInventory}
                        </div>
                        <button className="view-profile" onClick={() => handleViewProfile(merchant)}>
                            View Profile
                        </button>
                    </div>
                ))}
            </section>

            {/* Profile Details Section */}
            {selectedMerchant && (
                <section className="merchant-profile">
                    <div className="profile-card">
                        <img src={selectedMerchant.profileImage} alt={selectedMerchant.name} className="profile-image" />
                        <div className="profile-details">
                            <h2>{selectedMerchant.name}</h2>
                            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {selectedMerchant.location}</p>
                            <p><FontAwesomeIcon icon={faBoxOpen} /> {selectedMerchant.totalInventory}</p>
                            <p>{selectedMerchant.description}</p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Merchants;