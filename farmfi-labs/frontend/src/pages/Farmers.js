import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { faSeedling, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Farmers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Farmers = () => {
    // Dummy data for demonstration purposes
    const farmersList = [
        {
            id: 1,
            name: "John Doe",
            location: "Kansas, USA",
            totalTokens: "500 Tokens",
            profileImage: "/assets/images/farmer1.jpg"
        },
        {
            id: 2,
            name: "Mary Smith",
            location: "Iowa, USA",
            totalTokens: "350 Tokens",
            profileImage: "/assets/images/farmer2.jpg"
        },
        {
            id: 3,
            name: "Carlos Gomez",
            location: "Buenos Aires, Argentina",
            totalTokens: "700 Tokens",
            profileImage: "/assets/images/farmer3.jpg"
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
                        <img src={farmer.profileImage} alt={farmer.name} className="farmer-image" />
                        <h3>{farmer.name}</h3>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {farmer.location}</p>
                        <Card
                            title="Total Tokenized Assets"
                            value={farmer.totalTokens}
                            icon={faSeedling}
                            description={`Tokens issued by ${farmer.name}.`}
                        />
                        <Link to={`/farmers/${farmer.id}`} className="view-profile">View Profile</Link>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Farmers;
