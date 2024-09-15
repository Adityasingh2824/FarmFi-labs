import React from 'react';
import Card from '../components/Card';
import { faWarehouse, faMapMarkerAlt, faSeedling } from '@fortawesome/free-solid-svg-icons';
import './GrainHolders.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GrainHolders = () => {
    // Dummy data for demonstration purposes
    const grainHoldersList = [
        {
            id: 1,
            name: "Sunrise Farms",
            location: "Nebraska, USA",
            totalGrains: "600 Tons",
            profileImage: "/assets/images/grainholder1.jpg"
        },
        {
            id: 2,
            name: "Golden Harvest",
            location: "California, USA",
            totalGrains: "450 Tons",
            profileImage: "/assets/images/grainholder2.jpg"
        },
        {
            id: 3,
            name: "Harvest Gold",
            location: "Ontario, Canada",
            totalGrains: "800 Tons",
            profileImage: "/assets/images/grainholder3.jpg"
        }
    ];

    return (
        <div className="grain-holders">
            <header className="grain-holders-header">
                <h1>Our Grain Holders</h1>
                <p>Meet the grain holders who are part of the FarmFi Labs ecosystem. Learn about their contributions and how they are securing and managing grain assets on the platform.</p>
            </header>

            <section className="grain-holders-list">
                {grainHoldersList.map(grainHolder => (
                    <div className="grain-holder-card" key={grainHolder.id}>
                        <img src={grainHolder.profileImage} alt={grainHolder.name} className="grain-holder-image" />
                        <h3>{grainHolder.name}</h3>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {grainHolder.location}</p>
                        <Card
                            title="Total Grains Held"
                            value={grainHolder.totalGrains}
                            icon={faWarehouse}
                            description={`Grains managed by ${grainHolder.name}.`}
                        />
                        <button className="view-details">View Details</button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default GrainHolders;
