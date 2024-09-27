import React, { useState } from 'react';
import Card from '../components/Card';
import { faWarehouse, faMapMarkerAlt, faPhone, faEnvelope, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './GrainHolders.css';

// Define the GrainHolder type
interface GrainHolder {
    id: number;
    name: string;
    location: string;
    totalGrains: string;
    profileImage: string;
    contactInfo: string;
    phone: string;
    farmType: string;
    details: string;
}

const GrainHolders: React.FC = () => {
    const [selectedGrainHolder, setSelectedGrainHolder] = useState<GrainHolder | null>(null);

    const grainHoldersList: GrainHolder[] = [
        {
            id: 1,
            name: "Sunrise Farms",
            location: "Nebraska, USA",
            totalGrains: "600 Tons",
            profileImage: "/assets/images/grainholder1.jpg",
            contactInfo: "info@sunrisefarms.com",
            phone: "+1 123 456 789",
            farmType: "Organic Grains",
            details: "Sunrise Farms is a leading producer of organic grains in Nebraska, known for their sustainable farming practices."
        },
        {
            id: 2,
            name: "Golden Harvest",
            location: "California, USA",
            totalGrains: "450 Tons",
            profileImage: "/assets/images/grainholder2.jpg",
            contactInfo: "contact@goldenharvest.com",
            phone: "+1 987 654 321",
            farmType: "Wheat and Barley",
            details: "Golden Harvest specializes in wheat and barley production, serving customers across the USA."
        },
        {
            id: 3,
            name: "Harvest Gold",
            location: "Ontario, Canada",
            totalGrains: "800 Tons",
            profileImage: "/assets/images/grainholder3.jpg",
            contactInfo: "hello@harvestgold.ca",
            phone: "+1 555 444 333",
            farmType: "Corn and Soybeans",
            details: "Harvest Gold is one of Ontario's largest farms, known for their high-quality corn and soybeans."
        }
    ];

    const handleViewDetails = (grainHolder: GrainHolder) => {
        setSelectedGrainHolder(grainHolder);
    };

    const closeModal = () => {
        setSelectedGrainHolder(null);
    };

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
                        <button className="view-details" onClick={() => handleViewDetails(grainHolder)}>View Details</button>
                    </div>
                ))}
            </section>

            {/* Modal for Viewing Details */}
            {selectedGrainHolder && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={closeModal}>X</button>
                        <img src={selectedGrainHolder.profileImage} alt={selectedGrainHolder.name} className="modal-image" />
                        <h2>{selectedGrainHolder.name}</h2>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {selectedGrainHolder.location}</p>
                        <p><FontAwesomeIcon icon={faSeedling} /> Farm Type: {selectedGrainHolder.farmType}</p>
                        <p><FontAwesomeIcon icon={faPhone} /> Phone: {selectedGrainHolder.phone}</p>
                        <p><FontAwesomeIcon icon={faEnvelope} /> Email: {selectedGrainHolder.contactInfo}</p>
                        <p>{selectedGrainHolder.details}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GrainHolders;