import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { faStore, faMapMarkerAlt, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import './Merchants.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Merchants = () => {
    // Dummy data for demonstration purposes
    const merchantsList = [
        {
            id: 1,
            name: "Green Valley Grain",
            location: "Kansas, USA",
            totalInventory: "1,200 Tons",
            profileImage: "/assets/images/merchant1.jpg"
        },
        {
            id: 2,
            name: "Harvest Hub",
            location: "Iowa, USA",
            totalInventory: "850 Tons",
            profileImage: "/assets/images/merchant2.jpg"
        },
        {
            id: 3,
            name: "Global Grain Traders",
            location: "Ontario, Canada",
            totalInventory: "1,500 Tons",
            profileImage: "/assets/images/merchant3.jpg"
        }
    ];

    return (
        <div className="merchants">
            <header className="merchants-header">
                <h1>Our Merchants</h1>
                <p>Discover the merchants who are part of the FarmFi Labs ecosystem. Learn how they are utilizing our platform to manage and trade their grain inventory efficiently and securely.</p>
            </header>

            <section className="merchants-list">
                {merchantsList.map(merchant => (
                    <div className="merchant-card" key={merchant.id}>
                        <img src={merchant.profileImage} alt={merchant.name} className="merchant-image" />
                        <h3>{merchant.name}</h3>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {merchant.location}</p>
                        <Card
                            title="Total Inventory"
                            value={merchant.totalInventory}
                            icon={faBoxOpen}
                            description={`Inventory managed by ${merchant.name}.`}
                        />
                        <Link to={`/merchants/${merchant.id}`} className="view-profile">View Profile</Link>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Merchants;
