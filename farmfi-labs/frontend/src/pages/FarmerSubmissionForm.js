import React, { useState } from 'react';
import './FarmerSubmissionForm.css';

const FarmerSubmissionForm = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        cropType: '',
        quantity: '',
        location: '',
        deliveryDate: '',
        warehouse: '',
        identityProof: null,
    });

    // State to manage form errors
    const [errors, setErrors] = useState({});

    // State for submission success message
    const [submitted, setSubmitted] = useState(false);

    // Available warehouses as examples
    const warehouses = ['Warehouse A', 'Warehouse B', 'Warehouse C'];

    // Handle input change and update state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file upload for identity proof
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            identityProof: e.target.files[0],
        });
    };

    // Validate form before submission
    const validateForm = () => {
        let formErrors = {};
        if (!formData.cropType) {
            formErrors.cropType = 'Crop type is required';
        }
        if (!formData.quantity || formData.quantity <= 0) {
            formErrors.quantity = 'Quantity should be greater than zero';
        }
        if (!formData.location) {
            formErrors.location = 'Location is required';
        }
        if (!formData.deliveryDate) {
            formErrors.deliveryDate = 'Delivery date is required';
        }
        if (!formData.warehouse) {
            formErrors.warehouse = 'Please select a warehouse';
        }
        if (!formData.identityProof) {
            formErrors.identityProof = 'Please upload your identity proof';
        }

        return formErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        // If no errors, submit the form
        if (Object.keys(formErrors).length === 0) {
            try {
                // Simulate submission to the blockchain or backend
                console.log('Form submitted:', formData);

                // Add your logic here to interact with the backend or blockchain
                // Example: await submitCropToBlockchain(formData);

                // Reset form and show success message
                setSubmitted(true);
                setFormData({
                    cropType: '',
                    quantity: '',
                    location: '',
                    deliveryDate: '',
                    warehouse: '',
                    identityProof: null,
                });
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="farmer-form-container">
            <h2>Submit Your Crop for Tokenization</h2>

            {submitted && <p className="success-message">Crop submitted successfully!</p>}

            <form className="farmer-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="cropType">Crop Type:</label>
                    <input
                        type="text"
                        id="cropType"
                        name="cropType"
                        value={formData.cropType}
                        onChange={handleChange}
                        required
                    />
                    {errors.cropType && <span className="error-message">{errors.cropType}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity (in tons):</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                    {errors.quantity && <span className="error-message">{errors.quantity}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                    {errors.location && <span className="error-message">{errors.location}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="deliveryDate">Expected Delivery Date:</label>
                    <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                        required
                    />
                    {errors.deliveryDate && <span className="error-message">{errors.deliveryDate}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="warehouse">Select Warehouse:</label>
                    <select
                        id="warehouse"
                        name="warehouse"
                        value={formData.warehouse}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Warehouse</option>
                        {warehouses.map((warehouse) => (
                            <option key={warehouse} value={warehouse}>
                                {warehouse}
                            </option>
                        ))}
                    </select>
                    {errors.warehouse && <span className="error-message">{errors.warehouse}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="identityProof">Upload Identity Proof (Government-issued):</label>
                    <input
                        type="file"
                        id="identityProof"
                        name="identityProof"
                        onChange={handleFileChange}
                        required
                    />
                    {errors.identityProof && <span className="error-message">{errors.identityProof}</span>}
                </div>

                <button type="submit" className="submit-btn">Submit Crop</button>
            </form>
        </div>
    );
};

export default FarmerSubmissionForm;
