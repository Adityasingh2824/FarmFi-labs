
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'; // Import the type for FontAwesome icons
import './Card.css';

// Define the props interface for the Card component
interface CardProps {
    title: string;
    value: string | number;
    icon: IconDefinition;
    description: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, description }) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-icon">
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div className="card-title">{title}</div>
            </div>
            <div className="card-value">{value}</div>
            <div className="card-description">{description}</div>
        </div>
    );
};

export default Card;
