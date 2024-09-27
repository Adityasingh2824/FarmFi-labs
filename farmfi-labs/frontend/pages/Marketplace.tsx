import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faWarehouse, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import './Marketplace.css';

// Define the Crop type
interface Crop {
    id: number;
    type: string;
    price: number;
    quantity: number;
    location: string;
}

const Marketplace: React.FC = () => {
    const [crops, setCrops] = useState<Crop[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCrop, setSelectedCrop] = useState<number | null>(null);

    // Simulate fetching crops with mock demo data
    useEffect(() => {
        const fetchCrops = () => {
            try {
                const demoData: Crop[] = [
                    { id: 1, type: 'Wheat', price: 300, quantity: 50, location: 'Warehouse A' },
                    { id: 2, type: 'Corn', price: 250, quantity: 80, location: 'Warehouse B' },
                    { id: 3, type: 'Soya', price: 400, quantity: 60, location: 'Warehouse C' },
                ];
                setCrops(demoData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching crops:', error);
                setError('Error fetching crop data.');
                setLoading(false);
            }
        };
        fetchCrops();
    }, []);

    const handlePurchase = (cropId: number) => {
        try {
            console.log(`Buying tokens for crop with ID: ${cropId}`);
            setSelectedCrop(cropId);
        } catch (error) {
            console.error('Error purchasing tokens:', error);
        }
    };

    if (loading) {
        return <div className="loading-spinner"></div>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="marketplace">
            <h1>Tokenized Crops Marketplace</h1>
            <div className="crops-list">
                {crops.length === 0 ? (
                    <p>No crops available for sale.</p>
                ) : (
                    crops.map((crop) => (
                        <div key={crop.id} className="crop-card">
                            <h3>{crop.type}</h3>
                            <div className="crop-info">
                                <div className="info-item">
                                    <FontAwesomeIcon icon={faDollarSign} />
                                    <p>${crop.price} / ton</p>
                                </div>
                                <div className="info-item">
                                    <FontAwesomeIcon icon={faBalanceScale} />
                                    <p>{crop.quantity} tons</p>
                                </div>
                                <div className="info-item">
                                    <FontAwesomeIcon icon={faWarehouse} />
                                    <p>{crop.location}</p>
                                </div>
                            </div>
                            <button
                                className="buy-button"
                                onClick={() => handlePurchase(crop.id)}
                                disabled={selectedCrop === crop.id}
                            >
                                {selectedCrop === crop.id ? 'Purchased' : 'Buy Tokens'}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Marketplace;