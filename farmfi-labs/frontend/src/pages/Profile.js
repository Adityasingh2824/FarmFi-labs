import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import './Profile.css'; // Assuming a CSS file for profile-specific styling

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tokenizedAssets, setTokenizedAssets] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = AuthService.getCurrentUser();
        setUser(currentUser);
        const assets = await AuthService.getTokenizedAssets(currentUser.id);
        const transactions = await AuthService.getTransactionHistory(currentUser.id);
        setTokenizedAssets(assets);
        setTransactionHistory(transactions);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>{user.role === 'farmer' ? 'Farmer Profile' : 'Merchant Profile'}</h1>
        <p>Welcome, {user.name}. Here you can manage your account, assets, and transactions.</p>
      </header>

      <section className="profile-details">
        <h2>Your Details</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
      </section>

      <section className="tokenized-assets">
        <h2>Your Tokenized Assets</h2>
        {tokenizedAssets.length > 0 ? (
          <ul>
            {tokenizedAssets.map((asset) => (
              <li key={asset.id}>
                <strong>{asset.cropName}:</strong> {asset.quantity} tokens ({asset.tokenSymbol})
              </li>
            ))}
          </ul>
        ) : (
          <p>No tokenized assets available.</p>
        )}
      </section>

      <section className="transaction-history">
        <h2>Transaction History</h2>
        {transactionHistory.length > 0 ? (
          <ul>
            {transactionHistory.map((transaction) => (
              <li key={transaction.id}>
                <strong>{transaction.type}:</strong> {transaction.amount} tokens on {transaction.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No transactions available.</p>
        )}
      </section>

      <footer className="profile-footer">
        <p>&copy; 2024 FarmFi Labs. Empowering farmers and merchants with blockchain technology.</p>
      </footer>
    </div>
  );
};

export default Profile;
