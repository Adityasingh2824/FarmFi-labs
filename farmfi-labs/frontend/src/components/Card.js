import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Card.css';

const Card = ({ title, value, icon, description }) => {
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
