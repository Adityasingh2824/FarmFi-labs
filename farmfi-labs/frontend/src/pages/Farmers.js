import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faMapMarkerAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Farmers.css';

const Farmers = () => {
    // Dummy data for demonstration purposes
    const farmersList = [
        {
            id: 1,
            name: "Ramu Kaka",
            location: "Kansas, USA",
            totalTokens: "500 Tokens",
            profileImage: "/assets/farmer1.jpg"
        },
        {
            id: 2,
            name: "Mary Smith",
            location: "Iowa, USA",
            totalTokens: "350 Tokens",
            profileImage: "/assets/farmer2.jpg"
        },
        {
            id: 3,
            name: "Carlos Gomez",
            location: "Buenos Aires, Argentina",
            totalTokens: "700 Tokens",
            profileImage: "/assets/farmer3.jpg"
        }
    ];

    return (
        <div className="farmers">
            <header className="farmers-header">
                <h1>Our Farmers</h1>
                <p>Meet the dedicated farmers who are part of the FarmFi Labs ecosystem. Learn about their contributions and how they are using blockchain technology to tokenize and manage their grain assets.</p>
            </header>

            <section className="farmers-list">
                {farmersList.map(farmer => (
                    <div className="farmer-card" key={farmer.id}>
                        <div className="card-header">
                            <img src={farmer.profileImage} alt={farmer.name} className="farmer-image" />
                        </div>
                        <div className="card-content">
                            <h3>{farmer.name}</h3>
                            <p className="location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {farmer.location}</p>
                            <p className="token-info"><FontAwesomeIcon icon={faSeedling} /> Total Tokens: {farmer.totalTokens}</p>
                            <Link to={`/farmers/${farmer.id}`} className="view-profile">
                                <FontAwesomeIcon icon={faInfoCircle} /> View Profile
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Farmers;
