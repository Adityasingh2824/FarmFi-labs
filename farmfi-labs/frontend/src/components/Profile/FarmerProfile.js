import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import ProfileService from '../../services/ProfileService';
import './FarmerProfile.css'; // Assuming there is a CSS file for profile-specific styling

const FarmerProfile = () => {
  const [farmerData, setFarmerData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    farmLocation: '',
    tokenizedCrops: [],
  });

  useEffect(() => {
    const fetchFarmerData = async () => {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        const profileData = await ProfileService.getFarmerProfile(currentUser.id);
        setFarmerData(profileData);
        setFormData({
          name: profileData.name,
          email: profileData.email,
          farmLocation: profileData.farmLocation,
          tokenizedCrops: profileData.tokenizedCrops,
        });
      }
    };
    fetchFarmerData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await ProfileService.updateFarmerProfile(farmerData.id, formData);
      setFarmerData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  if (!farmerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="farmer-profile-container">
      <h2>Farmer Profile</h2>

      <div className="profile-details">
        {!isEditing ? (
          <div className="profile-info">
            <p><strong>Name:</strong> {farmerData.name}</p>
            <p><strong>Email:</strong> {farmerData.email}</p>
            <p><strong>Farm Location:</strong> {farmerData.farmLocation}</p>

            <h3>Tokenized Crops</h3>
            <ul className="tokenized-crops-list">
              {farmerData.tokenizedCrops.length > 0 ? (
                farmerData.tokenizedCrops.map((crop, index) => (
                  <li key={index}>
                    <strong>{crop.name}</strong>: {crop.tokenizedAmount} {crop.tokenSymbol}
                  </li>
                ))
              ) : (
                <li>No tokenized crops yet.</li>
              )}
            </ul>

            <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="profile-edit">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Farm Location:
              <input
                type="text"
                name="farmLocation"
                value={formData.farmLocation}
                onChange={handleInputChange}
              />
            </label>

            <button className="save-profile-btn" onClick={handleSave}>
              Save Profile
            </button>
            <button className="cancel-edit-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerProfile;
