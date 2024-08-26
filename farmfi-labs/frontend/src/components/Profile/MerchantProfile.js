import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import ProfileService from '../../services/ProfileService';
import './MerchantProfile.css'; // Assuming a CSS file for profile-specific styling

const MerchantProfile = () => {
  const [merchantData, setMerchantData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    businessLocation: '',
    purchasedCrops: [],
  });

  useEffect(() => {
    const fetchMerchantData = async () => {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        const profileData = await ProfileService.getMerchantProfile(currentUser.id);
        setMerchantData(profileData);
        setFormData({
          name: profileData.name,
          email: profileData.email,
          businessName: profileData.businessName,
          businessLocation: profileData.businessLocation,
          purchasedCrops: profileData.purchasedCrops,
        });
      }
    };
    fetchMerchantData();
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
      await ProfileService.updateMerchantProfile(merchantData.id, formData);
      setMerchantData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  if (!merchantData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="merchant-profile-container">
      <h2>Merchant Profile</h2>

      <div className="profile-details">
        {!isEditing ? (
          <div className="profile-info">
            <p><strong>Name:</strong> {merchantData.name}</p>
            <p><strong>Email:</strong> {merchantData.email}</p>
            <p><strong>Business Name:</strong> {merchantData.businessName}</p>
            <p><strong>Business Location:</strong> {merchantData.businessLocation}</p>

            <h3>Purchased Crops</h3>
            <ul className="purchased-crops-list">
              {merchantData.purchasedCrops.length > 0 ? (
                merchantData.purchasedCrops.map((crop, index) => (
                  <li key={index}>
                    <strong>{crop.name}</strong>: {crop.purchasedAmount} {crop.tokenSymbol}
                  </li>
                ))
              ) : (
                <li>No purchased crops yet.</li>
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
              Business Name:
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Business Location:
              <input
                type="text"
                name="businessLocation"
                value={formData.businessLocation}
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

export default MerchantProfile;
