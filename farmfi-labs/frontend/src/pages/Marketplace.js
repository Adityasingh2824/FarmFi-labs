import React, { useState, useEffect } from 'react';
import './Marketplace.css'; // Custom CSS for styling

const Marketplace = () => {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCrop, setSelectedCrop] = useState(null); // To manage the purchase of the selected crop

    // Simulate fetching crops with mock demo data
    useEffect(() => {
        const fetchCrops = () => {
            try {
                // Demo data simulating crop listings
                const demoData = [
                    {
                        id: 1,
                        type: 'Wheat',
                        price: 300,
                        quantity: 50,
                        location: 'Warehouse A',
                    },
                    {
                        id: 2,
                        type: 'Corn',
                        price: 250,
                        quantity: 80,
                        location: 'Warehouse B',
                    },
                    {
                        id: 3,
                        type: 'Rice',
                        price: 400,
                        quantity: 60,
                        location: 'Warehouse C',
                    },
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

    // Handle purchasing tokens for a specific crop
    const handlePurchase = (cropId) => {
        try {
            // Simulate purchase logic
            console.log(`Buying tokens for crop with ID: ${cropId}`);
            setSelectedCrop(cropId); // Mark the crop as purchased
        } catch (error) {
            console.error('Error purchasing tokens:', error);
        }
    };

    if (loading) {
        return <p>Loading crops...</p>;
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
                            <p>Price per ton: ${crop.price}</p>
                            <p>Available Quantity: {crop.quantity} tons</p>
                            <p>Storage Location: {crop.location}</p>
                            <button
                                className="buy-button"
                                onClick={() => handlePurchase(crop.id)}
                                disabled={selectedCrop === crop.id} // Disable button if already purchased
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
