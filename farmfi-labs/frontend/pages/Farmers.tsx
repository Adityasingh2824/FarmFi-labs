import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faMapMarkerAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Farmers.css';

// Define the type for Farmer data
interface Farmer {
    id: number;
    name: string;
    location: string;
    totalTokens: string;
    profileImage: string;
    bio: string;
    farmSize: string;
    crops: string;
}

const Farmers: React.FC = () => {
    // Dummy data for demonstration purposes
    const farmersList: Farmer[] = [
        {
            id: 1,
            name: "Ramu Kaka",
            location: "Kansas, USA",
            totalTokens: "500 Tokens",
            profileImage: "/assets/farmer1.jpg",
            bio: "Ramu has been farming for over 20 years, specializing in grain and corn.",
            farmSize: "120 Acres",
            crops: "Grain, Corn",
        },
        {
            id: 2,
            name: "Mary Smith",
            location: "Iowa, USA",
            totalTokens: "350 Tokens",
            profileImage: "/assets/farmer2.jpg",
            bio: "Mary has introduced sustainable farming techniques and is an advocate of organic farming.",
            farmSize: "90 Acres",
            crops: "Organic Vegetables, Wheat",
        },
        {
            id: 3,
            name: "Carlos Gomez",
            location: "Buenos Aires, Argentina",
            totalTokens: "700 Tokens",
            profileImage: "/assets/farmer3.jpg",
            bio: "Carlos runs one of the largest grain farms in Argentina with modern agricultural practices.",
            farmSize: "200 Acres",
            crops: "Grain, Soybeans",
        }
    ];

    const [selectedFarmer, setSelectedFarmer] = useState<number | null>(null);

    const handleViewProfile = (id: number) => {
        setSelectedFarmer(selectedFarmer === id ? null : id);
    };

    return (
        <div className="farmers">
            <header className="farmers-header">
                <h1>Our Farmers</h1>
                <p>Meet the dedicated farmers who are part of the FarmFi Labs ecosystem. Learn about their contributions and how they are using blockchain technology to tokenize and manage their grain assets.</p>
            </header>

            <section className="farmers-list">
                {farmersList.map(farmer => (
                    <div className={`farmer-card ${selectedFarmer === farmer.id ? 'active' : ''}`} key={farmer.id}>
                        <div className="card-header">
                            <img src={farmer.profileImage} alt={farmer.name} className="farmer-image" />
                        </div>
                        <div className="card-content">
                            <h3>{farmer.name}</h3>
                            <p className="location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {farmer.location}</p>
                            <p className="token-info"><FontAwesomeIcon icon={faSeedling} /> Total Tokens: {farmer.totalTokens}</p>
                            <button
                                className="view-profile"
                                onClick={() => handleViewProfile(farmer.id)}
                            >
                                <FontAwesomeIcon icon={faInfoCircle} /> {selectedFarmer === farmer.id ? "Hide Profile" : "View Profile"}
                            </button>

                            {selectedFarmer === farmer.id && (
                                <div className="farmer-details">
                                    <p><strong>Bio:</strong> {farmer.bio}</p>
                                    <p><strong>Farm Size:</strong> {farmer.farmSize}</p>
                                    <p><strong>Crops:</strong> {farmer.crops}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </section>
            </div>
        );
    };

export default Farmers;